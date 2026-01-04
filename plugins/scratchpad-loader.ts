/**
 * Scratchpad Loader Plugin
 *
 * Automatically detects scratchpad context when the user mentions planning or tasks.
 * Uses TUI toast notifications instead of console.log to avoid corrupting the TUI.
 *
 * Triggers on: "plan", "task", "planning", "roadmap", "milestone", "status"
 */

import type { Plugin } from "@opencode-ai/plugin"
import { readFile, stat } from "fs/promises"
import { join } from "path"

// Keywords that trigger scratchpad context injection
const TRIGGER_KEYWORDS = [
  "plan",
  "planning",
  "task",
  "tasks",
  "roadmap",
  "milestone",
  "status",
  "scratchpad",
]

/**
 * Check if text contains any trigger keywords.
 * Uses word boundary matching to avoid false positives.
 */
function containsTriggerKeywords(text: string): boolean {
  const lowerText = text.toLowerCase()
  return TRIGGER_KEYWORDS.some((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "i")
    return regex.test(lowerText)
  })
}

/**
 * Read the scratchpad summary file if it exists.
 */
async function readScratchpadSummary(
  projectDir: string
): Promise<string | null> {
  const summaryPath = join(projectDir, ".scratchpad", "scratchpad-summary.md")

  try {
    await stat(summaryPath)
    const content = await readFile(summaryPath, "utf-8")
    return content
  } catch {
    return null
  }
}

export const ScratchpadLoaderPlugin: Plugin = async ({
  client,
  directory,
  worktree,
}) => {
  const projectDir = worktree || directory
  let scratchpadExists = false
  let hasInjectedThisSession = false

  // Check if scratchpad exists at plugin load
  const summaryContent = await readScratchpadSummary(projectDir)
  scratchpadExists = summaryContent !== null

  return {
    /**
     * On session creation, reset the injection flag and check for scratchpad.
     * Uses TUI toast to notify user instead of console.log which corrupts TUI.
     */
    event: async ({ event }) => {
      if (event.type === "session.created") {
        hasInjectedThisSession = false
        const content = await readScratchpadSummary(projectDir)
        scratchpadExists = content !== null

        if (scratchpadExists) {
          // Use toast notification instead of console.log
          await client.tui.showToast({
            body: {
              message: "Scratchpad context available",
              variant: "info",
            },
          })
        }
      }
    },

    /**
     * Monitor message updates to detect when to inject context.
     * When a user message contains trigger keywords and we haven't injected yet,
     * show a toast notification that context is available.
     */
    "message.updated": async ({ message }) => {
      // Skip if no scratchpad or already injected this session
      if (!scratchpadExists || hasInjectedThisSession) return

      // Only process user messages
      if (message.role !== "user") return

      // Extract text from message parts
      const textParts = message.parts.filter(
        (part): part is { type: "text"; text: string } => part.type === "text"
      )
      const promptText = textParts.map((part) => part.text).join(" ")

      // Check for trigger keywords
      if (!containsTriggerKeywords(promptText)) return

      // Read and mark as injected
      const content = await readScratchpadSummary(projectDir)
      if (content) {
        hasInjectedThisSession = true
        // Show toast instead of console.log
        await client.tui.showToast({
          body: {
            message: "Scratchpad context detected for planning",
            variant: "info",
          },
        })
      }
    },

    /**
     * Intercept TodoWrite tool to remind about updating scratchpad.
     * When the agent creates todos, remind them to check scratchpad for context.
     */
    "tool.execute.after": async (input) => {
      if (!scratchpadExists) return

      // When using TodoWrite for planning, show toast reminder
      if (input.tool === "todowrite" && !hasInjectedThisSession) {
        const content = await readScratchpadSummary(projectDir)
        if (content) {
          await client.tui.showToast({
            body: {
              message: "Check .scratchpad/scratchpad-summary.md for context",
              variant: "info",
            },
          })
        }
      }
    },
  }
}

export default ScratchpadLoaderPlugin
