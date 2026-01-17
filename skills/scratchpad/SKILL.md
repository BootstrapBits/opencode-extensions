---
name: scratchpad
description: Manage a .scratchpad/ directory for cross-session context sharing between coding agents. Supports four operations - initialize (create new scratchpad), update (sync after work sessions), consult (read summary and review context), and rebuild (regenerate summary from existing files).
---

# Scratchpad Skill

This skill manages a `.scratchpad/` directory for persistent context sharing between agent sessions. The scratchpad serves as a central hub where agents can read and update project plans, architectural context, ideas, and current status.

## Operations

This skill supports four operations:

| Operation | When to Use |
|-----------|-------------|
| **Initialize** | Set up a new scratchpad in a project |
| **Update** | Sync scratchpad after completing work |
| **Consult** | Review scratchpad context before starting work |
| **Rebuild** | Regenerate scratchpad summary from existing files |

Determine which operation to use based on:
- If `.scratchpad/` doesn't exist → **Initialize**
- If `.scratchpad/` exists and user completed work → **Update**
- If user explicitly asks to "init", "setup", or "create" scratchpad → **Initialize**
- If user explicitly asks to "update", "sync", or "save" scratchpad → **Update**
- If user explicitly asks to "consult", "check", "review", or "look at" scratchpad → **Consult**
- If user explicitly asks to "rebuild", "regenerate", or "reindex" scratchpad → **Rebuild**

---

# Operation: Initialize

Use this operation when the user asks to:
- Initialize or set up a scratchpad
- Create a place for project plans and context
- Set up cross-session context sharing
- Organize project documentation for AI agents

## Initialize Steps

### Step 1: Check and Create Directory Structure

Create the `.scratchpad/` directory in the project root if it doesn't exist:

```
.scratchpad/
├── PLAN.md                 # Current roadmap and milestones
├── CONTEXT.md              # Architecture, background, key decisions
├── IDEAS.md                # Brainstorming, future possibilities
├── STATUS.md               # Current work in progress
└── scratchpad-summary.md   # Index file for agents (always read this first)
```

### Step 2: Create Core Files with Templates

Create each file with the following templates.

#### .scratchpad/PLAN.md

```markdown
# Project Plan

> Roadmap, milestones, and planned work for this project.
> Status: Active | Last Updated: [DATE]

## Current Milestone: [Milestone Name]

### Goals
- [ ] Goal 1 description
- [ ] Goal 2 description
- [ ] Goal 3 description

### Tasks
1. **Task Name** - Brief description
   - Subtask A
   - Subtask B

## Upcoming Milestones

### [Next Milestone Name]
- Goal 1
- Goal 2

## Completed Milestones

### [Previous Milestone] - Completed [DATE]
- Achieved X
- Delivered Y

---

## Notes

Add any planning notes, dependencies, or blockers here.
```

#### .scratchpad/CONTEXT.md

```markdown
# Project Context

> Architecture decisions, background information, and key context for understanding this project.
> Status: Reference | Last Updated: [DATE]

## Project Overview

Brief description of what this project does and its purpose.

## Architecture

### High-Level Structure
Describe the main components and how they interact.

### Key Technologies
- Technology 1: Why it was chosen
- Technology 2: Why it was chosen

## Key Decisions

### Decision 1: [Title]
- **Date**: [DATE]
- **Context**: What problem were we solving?
- **Decision**: What did we decide?
- **Rationale**: Why this approach?
- **Consequences**: What are the tradeoffs?

## Domain Knowledge

Important domain concepts that agents should understand:

- **Term 1**: Definition and context
- **Term 2**: Definition and context

## External Dependencies

- Dependency 1: What it does, why we use it
- Dependency 2: What it does, why we use it

---

## Historical Context

Any relevant history about the project evolution.
```

#### .scratchpad/IDEAS.md

```markdown
# Ideas

> Brainstorming, future features, and exploratory thoughts.
> Status: Draft | Last Updated: [DATE]

## Feature Ideas

### [Idea Name]
**Priority**: High/Medium/Low
**Effort**: Small/Medium/Large

Description of the idea and potential value.

**Open Questions**:
- Question 1?
- Question 2?

---

## Technical Improvements

### [Improvement Name]
Description of the technical improvement.

**Benefits**:
- Benefit 1
- Benefit 2

---

## Experiments to Try

- Experiment 1: What we'd learn
- Experiment 2: What we'd learn

---

## Parking Lot

Ideas that aren't actionable yet but worth remembering:

- Idea A
- Idea B
```

#### .scratchpad/STATUS.md

```markdown
# Current Status

> What's actively being worked on right now.
> Status: Active | Last Updated: [DATE]

## In Progress

### [Current Task Name]
**Started**: [DATE]
**Assigned to**: [Agent/Human]

Description of what's being done.

**Progress**:
- [x] Completed step
- [ ] Next step
- [ ] Future step

**Blockers**:
- None currently

---

## Recently Completed

### [Task Name] - Completed [DATE]
Brief summary of what was done.

---

## Up Next

1. Next task in queue
2. Following task

---

## Notes

Any relevant notes about current work state.
```

#### .scratchpad/scratchpad-summary.md

```markdown
# Scratchpad Summary

> This file helps agents quickly understand available context.
> Read this first, then ask the user before reading additional files.
> 
> Last Updated: [DATE]

## How to Use This Scratchpad

1. **Always read this summary first** when working on planning or tasks
2. **Review the tables below** to understand what documentation exists
3. **Ask the user** before reading full documents: "I see [file] might be relevant. Should I read it?"
4. **Update scratchpad-summary.md** after modifying any scratchpad files

## Core Documents

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| PLAN.md | Project roadmap and milestones | Active | [DATE] |
| CONTEXT.md | Architecture and background info | Reference | [DATE] |
| IDEAS.md | Future features and brainstorming | Draft | [DATE] |
| STATUS.md | Current work in progress | Active | [DATE] |

## Dated Notes

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| *(No dated notes yet)* | | | |

## Status Values

- **Draft**: Initial ideas, not yet actionable
- **Active**: Currently being worked on
- **Implemented**: Completed and deployed
- **Archived**: No longer relevant but kept for history
- **Reference**: Evergreen documentation

## Reading Guide

When working on:
- **Planning tasks**: Read PLAN.md, STATUS.md
- **Architecture questions**: Read CONTEXT.md
- **New features**: Read IDEAS.md and relevant dated notes
- **Current work context**: Read STATUS.md first

## Naming Convention

- **Core docs**: `UPPERCASE.md` (PLAN, CONTEXT, IDEAS, STATUS)
- **Dated notes**: `YYYY-MM-DD-topic-name.md` (e.g., `2026-01-03-api-redesign.md`)
```

### Step 3: Update .gitignore (if exists)

Check if `.gitignore` exists in the project root:

- **If it exists**: Check if `.scratchpad/` is already in the file
  - If not present, append the following lines to the end of the file:
    ```
    # AI agent scratchpad (cross-session context)
    .scratchpad/
    ```
- **If it doesn't exist**: Do NOT create the file. The scratchpad will be tracked by git.

### Step 4: Confirm with User

After creating the files, summarize what was created and ask if the user wants to:
1. Customize any of the template content
2. Add initial content to any of the files
3. Create any dated notes for current work

---

# Operation: Update

Use this operation when:
- You've just created or modified a project plan
- You've been brainstorming ideas or features with the user
- You've completed a task or milestone
- You've made architecture decisions worth documenting
- The user asks to "update scratchpad", "sync scratchpad", or "save to scratchpad"

## Prerequisites

The `.scratchpad/` directory must already exist. If it doesn't, use the **Initialize** operation first.

## Update Steps

### Step 1: Read Current State

Read `.scratchpad/scratchpad-summary.md` to understand:
- What documentation currently exists
- Current status of each file
- Last modified dates
- Any existing dated notes

### Step 2: Analyze Session Work

Review the **current conversation** and **existing scratchpad files** to determine what type of work was completed and what updates are needed.

**IMPORTANT:** Only analyze content from:
1. The current conversation (to find new content to add)
2. The existing scratchpad files (to understand current state)

Do NOT query external task management systems (like beads, GitHub issues, Jira, etc.) - the scratchpad captures discussion context, not task status from other tools. If the user wants to incorporate external task status, they will be asked in Step 2.6.

Determine what type of work was completed:

| Work Type | Indicators | Files to Update |
|-----------|------------|-----------------|
| Plan creation/modification | Created roadmap, milestones, tasks | PLAN.md, STATUS.md |
| Idea brainstorming | Discussed features, improvements, experiments | IDEAS.md |
| Task completion | Finished implementing something | STATUS.md |
| Architecture decisions | Made significant technical choices | CONTEXT.md |
| Mixed/Multiple | Combination of above | Multiple files |

### Step 2.5: Content Extraction Guidelines

Use these guidelines to identify what content from the session should go into each file.

#### Signal Phrases Quick Reference

Scan the session for these signal phrases to identify extractable content:

| Target File | Signal Phrases to Look For |
|-------------|---------------------------|
| **STATUS.md** | "done", "finished", "completed", "fixed", "working now", "implemented", "tests pass", "merged", "blocked by", "waiting on", "working on", "currently" |
| **PLAN.md** | "plan is", "we'll", "milestone", "phase", "goal", "priority", "deadline", "in scope", "out of scope", "next we need", "first", "then", "after that" |
| **IDEAS.md** | "could also", "might", "what if", "future", "eventually", "nice to have", "experiment", "long-term", "stretch goal", "parking lot", "later we could" |
| **CONTEXT.md** | "because", "reason is", "decided", "chose", "architecture", "pattern", "constraint", "tradeoff", "convention", "we went with", "the approach is" |

#### Content Classification Rules

**STATUS.md - What's happening NOW or JUST HAPPENED:**
- Completed tasks: "Done!", "Finished X", "Implemented Y", "Fixed the bug"
- Active work: "Working on...", "Currently implementing...", "Started X"
- Progress updates: "Got X working, still need Y", "50% complete"
- Blockers: "Blocked by...", "Waiting on...", "Can't proceed until..."
- File changes: "Updated X.ts", "Created component Z", "Refactored Y"
- Test results: "All tests passing", "Found 3 failing tests"

**PLAN.md - COMMITTED future work:**
- Milestone definitions: "First milestone is...", "For v1.0 we need..."
- Task lists: "We need to: 1)... 2)... 3)..."
- Priority ordering: "Most important is...", "Focus on X first"
- Scope boundaries: "In scope: X, Y. Out of scope: Z"
- Dependencies: "X must happen before Y", "This blocks that"
- Timelines: "Target: end of Q1", "By next week"

**IDEAS.md - UNCOMMITTED possibilities:**
- Future possibilities: "In the future, we might...", "Long-term we could..."
- Brainstorming: "What if we...", "We could also...", "Another approach..."
- Improvements: "It would be better if...", "Should eventually..."
- Deferred items: "Not now, but later...", "Park that for now"
- Experiments: "Worth trying...", "Could experiment with..."

**CONTEXT.md - DECISIONS and KNOWLEDGE:**
- Decision rationale: "We chose X because...", "The reason for Y is..."
- Architecture notes: "The architecture works by...", "Components interact via..."
- Trade-offs: "The tradeoff is...", "We accepted X to get Y"
- Domain knowledge: "In this domain, X means...", "Users expect Y"
- Historical context: "Originally this was...", "We migrated from..."
- Patterns: "The pattern we follow is...", "Our convention is..."

#### Overlap Resolution

When content could fit multiple files, use this decision tree:

```
Is it about something COMPLETED or IN PROGRESS right now?
  YES → STATUS.md
  NO  → Continue...

Is it a COMMITTED plan with timeline or explicit priority?
  YES → PLAN.md
  NO  → Continue...

Is it a DECISION made or ARCHITECTURAL KNOWLEDGE?
  YES → CONTEXT.md
  NO  → Continue...

Is it SPECULATIVE or UNCOMMITTED?
  YES → IDEAS.md
  NO  → Ask user for clarification
```

**Common overlap scenarios:**
- "We decided to build X because Y" → PLAN.md (the task) + CONTEXT.md (the rationale)
- "Finished X, learned Y for next time" → STATUS.md (completion) + CONTEXT.md (learning)
- "Working on X, could later enable Y" → STATUS.md (current) + IDEAS.md (future)

#### What to Skip (Do NOT Extract)

- Debugging chatter: "Let me check...", "Hmm, that's odd"
- Temporary troubleshooting: "Try X... that didn't work... try Y"
- Raw tool output (unless results are significant)
- Clarifying questions: "Do you mean X or Y?"
- Acknowledgments: "Got it", "Makes sense", "Okay"
- Repeated commands without new results

#### Extraction Example

**Session fragment:**
> "Let's add OAuth2 with Google. We chose it over custom auth because we don't
> want to deal with password storage. Done! The OAuth flow is working now and
> tests are passing. Later we could also add GitHub and Apple sign-in options."

**Extractions:**
| Content | Target File | Entry |
|---------|-------------|-------|
| OAuth2 implementation complete, tests passing | STATUS.md | Recently Completed entry |
| Chose OAuth2 over custom auth (password storage concern) | CONTEXT.md | Key Decision entry |
| GitHub and Apple sign-in options | IDEAS.md | Feature Idea entry |

### Step 2.6: Ask About External Task Systems (Optional)

After analyzing the conversation and scratchpad files, if you detect that external task management systems might be relevant (e.g., user mentions beads, issues, or tasks), use the **AskUserQuestion tool** to ask if they want to incorporate that data.

**NOTE:** This step is OPTIONAL. Only ask if external systems seem relevant. The Update operation should ALWAYS proceed to propose content updates to scratchpad files based on conversation analysis - do NOT offer a "just refresh dates" or "no changes" option.

If asking about external systems, present these options:
- "No, skip external systems" (Recommended) - Proceed with conversation-based updates only
- "Yes, also check beads tasks" - Include beads task status in the update
- "Yes, check other system" - Let user specify which system

**IMPORTANT:** Regardless of the user's choice here, you MUST still propose content updates to scratchpad files (STATUS.md, PLAN.md, IDEAS.md, CONTEXT.md) based on your analysis. This question is ONLY about whether to query external systems for additional context.

### Step 3: Propose Updates to User

Present a summary of intended changes and ask for confirmation:

```
Based on our session, I'd like to update the scratchpad:

**Files to update:**
- STATUS.md: [brief summary of changes]
- PLAN.md: [brief summary of changes] (if applicable)
- IDEAS.md: [brief summary of changes] (if applicable)

**New dated note to create:**
- YYYY-MM-DD-topic-name.md: [brief description of what it will contain]

**scratchpad-summary.md:** Will be refreshed with updated dates and any new entries.

Would you like me to proceed with these updates? [yes/no/modify]
```

Wait for user confirmation before proceeding.

### Step 4: Handle PLAN.md Updates (if applicable)

When updating PLAN.md, ask the user how to incorporate the new content:

```
How would you like me to update PLAN.md?

1. **Replace** the current milestone section with the new plan
2. **Add** the new plan as a new milestone (keeping existing content)
3. **Other** - describe your preferred approach
```

Wait for user response before proceeding.

### Step 5: Create Dated Note (for significant work)

For significant work sessions, create a dated note at `.scratchpad/YYYY-MM-DD-topic-name.md`:

```markdown
# [Topic Name]

> [Brief one-line description of what this note covers]
> Status: [Draft/Active/Implemented/Reference] | Created: [DATE]

## Summary

[2-3 sentence summary of the work done or decision made]

## Details

[More detailed information, context, or implementation notes]

## Key Points

- [Key point 1]
- [Key point 2]
- [Key point 3]

## Related Files

- [List any code files, docs, or other scratchpad files that relate to this]

## Next Steps

- [ ] [Follow-up action 1]
- [ ] [Follow-up action 2]

---

## Session Notes

[Any additional context from the session that might be useful later]
```

**Topic naming guidelines:**
- Use lowercase with hyphens: `api-redesign`, `auth-implementation`, `performance-fixes`
- Be specific but concise: `telegram-parser-refactor` not `refactoring`
- Include the domain when relevant: `user-registration-flow`

### Step 6: Update STATUS.md

Update `.scratchpad/STATUS.md` to reflect current state:

**For completed work**, move items from "In Progress" to "Recently Completed":

```markdown
## Recently Completed

### [Task Name] - Completed [DATE]
[Brief summary of what was accomplished]

**Key changes:**
- [Change 1]
- [Change 2]
```

**For new work in progress**, add to "In Progress" section:

```markdown
## In Progress

### [Task Name]
**Started**: [DATE]
**Assigned to**: Agent

[Description of what's being worked on]

**Progress**:
- [x] [Completed step]
- [ ] [Next step]
```

**Update "Up Next"** if the queue has changed.

### Step 7: Update Other Files (as needed)

#### For PLAN.md (based on Step 4 response):

If replacing current milestone:
```markdown
## Current Milestone: [New Milestone Name]

### Goals
- [ ] [Goal 1]
- [ ] [Goal 2]

### Tasks
1. **[Task]** - [Description]
```

If adding new milestone:
```markdown
## Upcoming Milestones

### [New Milestone Name]
- [Goal 1]
- [Goal 2]
```

#### For IDEAS.md:

Add new ideas to the appropriate section:
```markdown
## Feature Ideas

### [New Idea Name]
**Priority**: [High/Medium/Low]
**Effort**: [Small/Medium/Large]

[Description from session discussion]

**Open Questions**:
- [Question raised during discussion]
```

#### For CONTEXT.md:

Add new decisions or context:
```markdown
## Key Decisions

### [Decision Title]
- **Date**: [DATE]
- **Context**: [What problem were we solving?]
- **Decision**: [What did we decide?]
- **Rationale**: [Why this approach?]
- **Consequences**: [What are the tradeoffs?]
```

### Step 8: Refresh scratchpad-summary.md

Update `.scratchpad/scratchpad-summary.md`:

1. **Update "Last Updated" date** at the top of the file

2. **Update Core Documents table** with new "Last Modified" dates for any files that changed:

```markdown
## Core Documents

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| PLAN.md | Project roadmap and milestones | Active | [NEW DATE] |
| CONTEXT.md | Architecture and background info | Reference | [DATE] |
| IDEAS.md | Future features and brainstorming | Draft | [NEW DATE if changed] |
| STATUS.md | Current work in progress | Active | [NEW DATE] |
```

3. **Add new dated notes** to the Dated Notes table:

```markdown
## Dated Notes

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| YYYY-MM-DD-topic-name.md | [Brief summary] | [Status] | [DATE] |
```

### Step 9: Confirm Completion

Summarize what was updated:

```
Scratchpad updated successfully:

**Modified files:**
- STATUS.md: [summary of changes]
- [other files]: [summary]

**Created:**
- YYYY-MM-DD-topic-name.md: [summary]

**Updated index:**
- scratchpad-summary.md refreshed with current dates

The scratchpad now reflects the work completed in this session.
```

---

# Operation: Consult

Use this operation when:
- The user asks to "consult", "check", "review", or "look at" the scratchpad
- The user wants to understand the current project context before starting work
- The user asks what's in the scratchpad or what the current status is

## Prerequisites

The `.scratchpad/` directory must already exist. If it doesn't, inform the user and suggest using the **Initialize** operation first.

## Consult Steps

### Step 1: Read Summary First

Read `.scratchpad/scratchpad-summary.md` and present a brief overview to the user:

```
I've read your scratchpad summary. Here's what's available:

**Core Documents:**
- PLAN.md: [summary from table] (Last updated: [date])
- CONTEXT.md: [summary from table] (Last updated: [date])
- IDEAS.md: [summary from table] (Last updated: [date])
- STATUS.md: [summary from table] (Last updated: [date])

**Dated Notes:**
- [List any dated notes with their summaries]

[Include any other relevant info from the summary]
```

### Step 2: Identify Relevant Files

Based on the summary tables and any context from the current conversation, identify which files might be relevant to the user's current task or question.

Consider:
- What is the user working on or asking about?
- Which files contain related information based on their summaries?
- Are there dated notes that might be particularly relevant?

### Step 3: Ask User for Confirmation

**IMPORTANT:** Use the AskUserQuestion tool to ask which files the user would like to read. Do NOT read additional scratchpad files without user confirmation.

Present options based on what's available in the scratchpad:

```
Would you like me to read any of these files for more detail?
```

Options to present (based on what exists):
- "STATUS.md" - If user is asking about current work
- "PLAN.md" - If user is asking about roadmap or goals
- "CONTEXT.md" - If user is asking about architecture or decisions
- "IDEAS.md" - If user is asking about future features
- Any relevant dated notes

### Step 4: Read Requested Files

Only read the files that the user explicitly confirms they want to see. For each file read:

1. Read the file content
2. Present a concise summary highlighting the most relevant parts
3. Offer to read additional files if needed

### Step 5: Summarize Findings

After reading the requested files, provide a summary that:
- Highlights information relevant to the user's current task
- Notes any blockers or dependencies mentioned
- Suggests next steps if appropriate

```
Based on the scratchpad:

**Key Points:**
- [Relevant finding 1]
- [Relevant finding 2]

**Current Status:** [Brief status summary if relevant]

**Suggested Next Steps:** [If appropriate]
```

---

# Operation: Rebuild

Use this operation when:
- The user asks to "rebuild", "regenerate", or "reindex" the scratchpad
- The scratchpad summary is out of sync with existing files
- The user has manually cleaned up or reorganized scratchpad files
- Files were added/removed outside of the normal update flow

## Prerequisites

The `.scratchpad/` directory must exist with at least some files. If the directory doesn't exist, suggest using **Initialize** instead.

## Rebuild Steps

### Step 1: Scan Existing Files

List all files in the `.scratchpad/` directory to understand what exists:
- Core documents (PLAN.md, CONTEXT.md, IDEAS.md, STATUS.md)
- Dated notes (YYYY-MM-DD-*.md)
- Any other markdown files

### Step 2: Read and Analyze Each File

For each file found (excluding scratchpad-summary.md):
1. Read the file content
2. Extract the status line (if present): `> Status: [status] | Last Updated: [date]`
3. Generate a brief summary (1 sentence) of the file's contents
4. Note the file's last modified date

### Step 3: Delete Old Summary

Delete the existing `.scratchpad/scratchpad-summary.md` file (if it exists).

### Step 4: Generate New Summary

Create a fresh `.scratchpad/scratchpad-summary.md` with:

```markdown
# Scratchpad Summary

> This file helps agents quickly understand available context.
> Read this first, then ask the user before reading additional files.
>
> Last Updated: [TODAY'S DATE]

## How to Use This Scratchpad

1. **Always read this summary first** when working on planning or tasks
2. **Review the tables below** to understand what documentation exists
3. **Ask the user** before reading full documents: "I see [file] might be relevant. Should I read it?"
4. **Update scratchpad-summary.md** after modifying any scratchpad files

## Core Documents

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| [filename] | [generated summary] | [extracted status] | [date] |

## Dated Notes

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| [filename] | [generated summary] | [extracted status] | [date] |

## Status Values

- **Draft**: Initial ideas, not yet actionable
- **Active**: Currently being worked on
- **Implemented**: Completed and deployed
- **Archived**: No longer relevant but kept for history
- **Reference**: Evergreen documentation

## Reading Guide

When working on:
- **Planning tasks**: Read PLAN.md, STATUS.md
- **Architecture questions**: Read CONTEXT.md
- **New features**: Read IDEAS.md and relevant dated notes
- **Current work context**: Read STATUS.md first

## Naming Convention

- **Core docs**: `UPPERCASE.md` (PLAN, CONTEXT, IDEAS, STATUS)
- **Dated notes**: `YYYY-MM-DD-topic-name.md` (e.g., `2026-01-03-api-redesign.md`)
```

### Step 5: Confirm Completion

Report to user:

```
Scratchpad summary rebuilt successfully:

**Files indexed:**
- [X] core documents found
- [Y] dated notes found

**Summary:**
- PLAN.md: [brief summary]
- STATUS.md: [brief summary]
- [etc.]

The scratchpad-summary.md has been regenerated from existing files.
```

---

## Important Notes

- Always replace `[DATE]` placeholders with the actual current date in `YYYY-MM-DD` format
- The `scratchpad-summary.md` file is the primary entry point for agents
- When updating any scratchpad file, also update its entry in `scratchpad-summary.md`
- Dated notes should follow the `YYYY-MM-DD-topic-name.md` convention strictly
- For Update operation: Always ask for user confirmation before making changes
- For Update operation: Always ask how to handle PLAN.md updates when applicable
- For Consult operation: Always use AskUserQuestion before reading files beyond the summary
- For Update operation: Use AskUserQuestion to ask about external task systems before querying them
- For Rebuild operation: This regenerates the summary from existing files, useful after manual cleanup
