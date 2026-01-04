---
name: scratchpad-init
description: Initialize a scratchpad directory for cross-session context sharing between coding agents. Creates structured files for plans, context, ideas, and status tracking.
---

# Scratchpad Initialization Skill

This skill sets up a `scratchpad/` directory in the current project for persistent context sharing between agent sessions. The scratchpad serves as a central hub where agents can read project plans, architectural context, ideas, and current status.

## When to Use

Use this skill when the user asks to:
- Initialize or set up a scratchpad
- Create a place for project plans and context
- Set up cross-session context sharing
- Organize project documentation for AI agents

## Steps to Execute

### Step 1: Check and Create Directory Structure

Create the `scratchpad/` directory in the project root if it doesn't exist:

```
scratchpad/
├── PLAN.md                 # Current roadmap and milestones
├── CONTEXT.md              # Architecture, background, key decisions
├── IDEAS.md                # Brainstorming, future possibilities
├── STATUS.md               # Current work in progress
└── scratchpad-summary.md   # Index file for agents (always read this first)
```

### Step 2: Create Core Files with Example Content

Create each file with the following templates. These include realistic examples to demonstrate the expected format.

#### scratchpad/PLAN.md

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

#### scratchpad/CONTEXT.md

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

#### scratchpad/IDEAS.md

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

#### scratchpad/STATUS.md

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

#### scratchpad/scratchpad-summary.md

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

### Step 3: Update or Create README.md

Check if `README.md` exists in the project root:

- **If it exists**: Append the scratchpad section at the very end
- **If it doesn't exist**: Create it with basic project info and the scratchpad section

#### Section to Append to README.md

```markdown

---

## Scratchpad (Agent Context)

This project uses a `scratchpad/` directory for cross-session context sharing between AI coding agents.

### What is the Scratchpad?

The scratchpad is a structured directory where agents can find:
- **PLAN.md**: Project roadmap and current milestones
- **CONTEXT.md**: Architecture decisions and background
- **IDEAS.md**: Future features and brainstorming
- **STATUS.md**: Current work in progress
- **scratchpad-summary.md**: Index of all scratchpad files (read this first)

### For AI Agents

When working on planning or tasks:
1. Read `scratchpad/scratchpad-summary.md` for an overview
2. Ask the user before reading additional files
3. Update relevant files after completing work
4. Keep `scratchpad-summary.md` in sync with changes

### Naming Convention

- Core documents: `UPPERCASE.md`
- Dated notes: `YYYY-MM-DD-topic-name.md`

### Status Values

| Status | Meaning |
|--------|---------|
| Draft | Initial ideas, not yet actionable |
| Active | Currently being worked on |
| Implemented | Completed and deployed |
| Archived | No longer relevant |
| Reference | Evergreen documentation |
```

### Step 4: Confirm with User

After creating the files, summarize what was created and ask if the user wants to:
1. Customize any of the template content
2. Add initial content to any of the files
3. Create any dated notes for current work

## Important Notes

- Always replace `[DATE]` placeholders with the actual current date in `YYYY-MM-DD` format
- The `scratchpad-summary.md` file is the primary entry point for agents
- When updating any scratchpad file, also update its entry in `scratchpad-summary.md`
- Dated notes should follow the `YYYY-MM-DD-topic-name.md` convention strictly
