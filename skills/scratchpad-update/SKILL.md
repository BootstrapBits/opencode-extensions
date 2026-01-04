---
name: scratchpad-update
description: Update scratchpad files after completing work. Syncs STATUS.md, PLAN.md, IDEAS.md based on recent changes, creates dated notes for significant work, and refreshes scratchpad-summary.md.
---

# Scratchpad Update Skill

This skill updates the `.scratchpad/` directory after completing work in an agent session. It ensures that project context stays current by updating relevant files, creating dated notes for significant work, and keeping the summary in sync.

## When to Use

Use this skill when:
- You've just created or modified a project plan
- You've been brainstorming ideas or features with the user
- You've completed a task or milestone
- You've made architecture decisions worth documenting
- The user asks to "update scratchpad", "sync scratchpad", or "save to scratchpad"

## Prerequisites

The `.scratchpad/` directory must already exist. If it doesn't, use the `scratchpad-init` skill first.

## Steps to Execute

### Step 1: Read Current State

Read `.scratchpad/scratchpad-summary.md` to understand:
- What documentation currently exists
- Current status of each file
- Last modified dates
- Any existing dated notes

### Step 2: Analyze Session Work

Review the current session to determine what type of work was completed:

| Work Type | Indicators | Files to Update |
|-----------|------------|-----------------|
| Plan creation/modification | Created roadmap, milestones, tasks | PLAN.md, STATUS.md |
| Idea brainstorming | Discussed features, improvements, experiments | IDEAS.md |
| Task completion | Finished implementing something | STATUS.md |
| Architecture decisions | Made significant technical choices | CONTEXT.md |
| Mixed/Multiple | Combination of above | Multiple files |

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

## Important Notes

- Always replace `[DATE]` placeholders with the actual current date in `YYYY-MM-DD` format
- Always ask for user confirmation before making changes (Step 3)
- Always ask how to handle PLAN.md updates when applicable (Step 4)
- Keep summaries concise but informative
- Dated notes should capture enough context that a future agent can understand the work without the full session history
- If the scratchpad doesn't exist, inform the user and suggest using `scratchpad-init` first
