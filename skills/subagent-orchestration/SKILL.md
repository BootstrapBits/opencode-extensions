---
name: subagent-orchestration
description: Generate a multi-agent orchestration plan for complex refactoring or feature work. Conducts thorough interviews, explores codebase, and creates structured plans with dependency analysis, parallelization opportunities, and rollback strategies.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: planning
---

# Sub-Agent Orchestration Planning Skill

This skill guides you through creating a comprehensive multi-agent orchestration plan for complex development work (refactoring, multi-phase features, large migrations). It produces a structured plan document that another agent session can use to coordinate sub-agents.

## When to Use

Use this skill when:
- User has a spec/plan document for large-scale refactoring
- User asks to "split work across agents" or "orchestrate sub-agents"
- User mentions multi-phase work requiring coordination
- User wants to parallelize development across multiple agent sessions
- User is planning a complex feature with many interdependent tasks

## Prerequisites

Before starting, ensure:
1. The project has a spec or plan document describing the work
2. You have access to the target project directory
3. User can answer questions about their workflow preferences

---

## Phase 1: Initial Discovery

### Step 1.1: Gather Basic Inputs

Ask the user for:

```
I'll help you create a sub-agent orchestration plan. First, I need some basic information:

1. **Spec/Plan Location**: Where is your specification or plan document?
   (e.g., `scratchpad/spec.md`, `docs/PLAN.md`, or paste the content)

2. **Target Project**: What is the target project directory?
   (e.g., `/path/to/project` or current directory)

3. **Work Type**: What kind of work is this?
   - [ ] Refactoring (restructuring existing code)
   - [ ] New Feature (adding new functionality)
   - [ ] Migration (moving between technologies/patterns)
   - [ ] Mixed (combination of the above)
```

### Step 1.2: Check for Scratchpad

Check if `scratchpad/scratchpad-summary.md` exists in the project:
- **If exists**: Read it to understand existing context
- **If missing**: Inform user you'll create it using the `scratchpad-init` skill after the plan is complete

### Step 1.3: Read and Analyze the Spec

Read the provided spec document and extract:
- Overall goals and non-goals
- Phases or milestones defined
- Tasks or work items listed
- Dependencies mentioned
- Files/packages referenced

Summarize your understanding back to the user for confirmation.

---

## Phase 2: Codebase Exploration

### Step 2.1: Explore Project Structure

Use your judgment on when and how to explore the codebase. Consider using the Explore agent or direct file operations to understand:

1. **Directory Structure**
   - Main source directories
   - Test locations
   - Configuration files
   - Build/deployment files

2. **Package/Module Dependencies**
   - How modules relate to each other
   - Import/dependency graph (conceptual)
   - Shared utilities or common code

3. **Key Files for the Work**
   - Files mentioned in the spec
   - Files likely to be affected
   - Entry points and integration points

4. **Existing Patterns**
   - Testing conventions
   - Code organization patterns
   - Naming conventions

### Step 2.2: Create Dependency Map

Based on exploration, identify:
- Which tasks affect which files/packages
- Which tasks depend on other tasks completing first
- Which tasks can be done in parallel (no file conflicts)
- Integration points where work needs to merge

---

## Phase 3: User Interview

Conduct the interview in **category groups**. Before each category, ask:

```
I have [N] questions about [Category]. Would you like to:
1. Answer these questions
2. Skip this category (I'll use sensible defaults)
3. See the questions first, then decide
```

### Category A: Git & Version Control (4 questions)

```markdown
## Git Strategy Questions

**A1. Branch Strategy**: How should work be organized in git?
- [ ] **One branch per phase** (recommended) - e.g., `refactor/phase-1-foundation`
- [ ] One branch per agent task - More granular but more branches
- [ ] Single feature branch - All work in one branch
- [ ] Other (please specify)

*Default: One branch per phase*

**A2. Commit Granularity**: How should commits be structured?
- [ ] **One commit per agent task** (recommended) - Clear history, easy rollback
- [ ] One commit per phase - Fewer commits, squashed work
- [ ] Commit as you go - Most granular
- [ ] Other (please specify)

*Default: One commit per agent task*

**A3. Commit Workflow**: Who should commit changes?
- [ ] **Agent stages, human reviews, then commits** (recommended)
- [ ] Agent commits directly after completing task
- [ ] Human commits manually after reviewing
- [ ] Other (please specify)

*Default: Agent stages, human reviews, then commits*

**A4. Rollback Needs**: What level of rollback capability do you need?
- [ ] **Per-agent rollback** (recommended) - Can undo individual agent's work
- [ ] Per-phase rollback only - Can undo entire phases
- [ ] Full rollback only - All or nothing
- [ ] Other (please specify)

*Default: Per-agent rollback*
```

### Category B: Review & Workflow (4 questions)

```markdown
## Review & Workflow Questions

**B1. Review Cadence**: When should you review agent work?
- [ ] **After each agent completes** (recommended) - Maximum oversight
- [ ] After each phase completes - Batch review
- [ ] Only at the end - Trust the process
- [ ] Other (please specify)

*Default: After each agent completes*

**B2. Approval Workflow**: How should approvals work?
- [ ] **Explicit approval before next agent** (recommended)
- [ ] Auto-proceed unless you intervene
- [ ] Approval only at phase boundaries
- [ ] Other (please specify)

*Default: Explicit approval before next agent*

**B3. Test Requirements**: When should tests run?
- [ ] **After each agent task** (recommended)
- [ ] After each phase
- [ ] Only at the end
- [ ] No automated testing
- [ ] Other (please specify)

*Default: After each agent task*

**B4. Build Verification**: Should we verify the build compiles?
- [ ] **After each agent task** (recommended)
- [ ] After each phase
- [ ] Only at the end
- [ ] Not needed
- [ ] Other (please specify)

*Default: After each agent task*
```

### Category C: Agent Configuration (3 questions)

```markdown
## Agent Configuration Questions

**C1. Parallel Execution**: How should agents be parallelized?
- [ ] **Maximize parallelism** (recommended) - Run independent agents together
- [ ] Sequential only - One agent at a time
- [ ] User-controlled - Ask before parallelizing
- [ ] Other (please specify)

*Default: Maximize parallelism*

**C2. Agent Scope**: How much work per agent?
- [ ] **One logical task per agent** (recommended) - Clear boundaries
- [ ] One file per agent - Maximum granularity
- [ ] One package/module per agent - Coarser boundaries
- [ ] Other (please specify)

*Default: One logical task per agent*

**C3. Agent Communication**: How should agents share context?
- [ ] **Through plan document** (recommended) - Agents read the orchestration plan
- [ ] Through git commits - Agents see previous work via git
- [ ] Through shared files - Agents use scratchpad for notes
- [ ] All of the above
- [ ] Other (please specify)

*Default: Through plan document*
```

### Category D: Project-Specific (4 questions)

```markdown
## Project-Specific Questions

**D1. CI/CD Considerations**: Are there CI/CD pipelines to consider?
- [ ] Yes, agents should ensure CI passes
- [ ] Yes, but CI runs are manual
- [ ] **No CI/CD in place**
- [ ] Other (please specify)

*Default: No CI/CD in place*

**D2. Team Collaboration**: Is anyone else working on this codebase?
- [ ] **Solo developer** - No coordination needed
- [ ] Team, but on different areas - Low conflict risk
- [ ] Team, potentially overlapping - Need to coordinate
- [ ] Other (please specify)

*Default: Solo developer*

**D3. Breaking Changes**: Are breaking changes acceptable?
- [ ] **Yes, breaking changes are fine**
- [ ] Minimize breaking changes
- [ ] No breaking changes allowed
- [ ] Other (please specify)

*Default: Yes, breaking changes are fine*

**D4. Documentation**: Should agents update documentation?
- [ ] **Yes, update docs alongside code**
- [ ] Only update critical docs
- [ ] No, documentation is separate
- [ ] Other (please specify)

*Default: Yes, update docs alongside code*
```

---

## Phase 4: Plan Generation

### Step 4.1: Analyze Tasks and Dependencies

Based on the spec and codebase exploration:

1. **Break down the spec into discrete tasks**
   - Each task should be completable by one agent
   - Tasks should have clear input/output boundaries
   - Tasks should map to specific files/packages

2. **Build dependency graph**
   - Which tasks must complete before others can start
   - Which tasks can run in parallel
   - Which tasks have potential file conflicts

3. **Group tasks into phases**
   - Phases should represent logical milestones
   - Tasks within a phase can have internal dependencies
   - Phase boundaries are merge/review points

### Step 4.2: Generate the Orchestration Plan

Create a file named `YYYY-MM-DD-orchestration-plan.md` in the project's `scratchpad/` directory using this template:

```markdown
# Multi-Agent Orchestration Plan: [Project Name]

## Document Information

| Field | Value |
|-------|-------|
| **Created** | [DATE] |
| **Based On** | [path to spec document] |
| **Target Directory** | [project path] |
| **Work Type** | [Refactoring/Feature/Migration/Mixed] |

---

## 1. Overview

[Brief summary of what this plan accomplishes - 2-3 sentences]

---

## 2. Git Strategy

### Branch Structure

```
main
  └── [branch-name-1]
        └── (Phase 1 work)
  └── [branch-name-2]
        └── (Phase 2 work)
  ...
```

### Commit Strategy

- **Granularity**: [One commit per agent task / per phase / etc.]
- **Workflow**: [Agent stages, human reviews, then commits / etc.]
- **Message Format**: `<type>(<scope>): <description>`

### Rollback Strategies

| Scenario | Action |
|----------|--------|
| Rollback uncommitted agent work | `git restore --staged . && git checkout -- .` |
| Rollback single committed agent task | `git revert <commit-sha>` |
| Rollback entire phase | `git checkout main && git branch -D <branch>` |

---

## 3. Agent Workflow Protocol

### Before Each Agent Task

1. Verify clean working directory: `git status`
2. Confirm on correct branch
3. Review the specific task requirements

### Agent Execution

1. Agent receives detailed prompt with:
   - Explicit file paths
   - Clear scope boundaries
   - Test requirements
   - What NOT to touch
2. Agent creates/modifies files
3. Agent writes tests for their work
4. Agent stages all changes

### After Each Agent Task

1. Run: `git status` and `git diff --staged`
2. Run: `[build command]` and `[test command]`
3. Human reviews staged changes
4. If approved: Commit with message
5. If rejected: Restore and discuss fixes

### Review Checklist

- [ ] Files created/modified match expected scope
- [ ] No unintended changes to other files
- [ ] Tests are included and pass
- [ ] Code compiles/builds successfully
- [ ] Tests pass

---

## 4. Phase [N]: [Phase Name]

### Pre-Phase Setup

```bash
git checkout -b [branch-name]
```

### Agent Tasks

#### Agent [N]-[A]: [Task Name]

**Scope**: [Brief description of what this agent does]

**Files to Create**:
- `path/to/file1.ext`
- `path/to/file2.ext`

**Files to Modify**:
- `path/to/existing.ext`

**Dependencies**: [None / Depends on Agent X-Y completing]

**Prompt Template**:
```
You are implementing [description].

Working directory: [path]

Create/modify the following files:
[list of files with detailed requirements]

Write tests in [test file path].

Reference [relevant documentation or code].

Stage all files with git add.
Do NOT commit.
```

**Expected Commit**: `<type>(<scope>): <description>`

---

[Repeat for each agent task in this phase]

---

### Post-Phase Checklist

- [ ] All agent tasks completed
- [ ] `[build command]` succeeds
- [ ] `[test command]` passes
- [ ] Manual verification: [any manual checks]

### Merge to Main

```bash
git checkout main
git merge [branch-name]
```

---

[Repeat for each phase]

---

## 5. Dependencies Between Agents

### Dependency Graph

```
[Phase N]
Agent A ─┬─> Agent B ─> Agent C
         │
         └─> Agent D (parallel with B)
```

### Parallel Execution Opportunities

| Can Run Together | Notes |
|------------------|-------|
| Agent A + Agent D | No file conflicts |
| Agent B + Agent E | Different packages |

### Sequential Requirements

| Must Run After | Reason |
|----------------|--------|
| Agent B after Agent A | Uses types defined by A |
| Agent C after Agent B | Integrates B's work |

---

## 6. Success Criteria

### Per Agent

- [ ] Files created/modified match scope
- [ ] Tests included and passing
- [ ] No compilation errors
- [ ] No changes outside scope

### Per Phase

- [ ] All agent tasks completed
- [ ] Full test suite passes
- [ ] Application starts successfully
- [ ] Existing functionality preserved

### Overall

- [ ] All phases completed
- [ ] Clean merge to main
- [ ] [Project-specific success criteria from spec]

---

## 7. Orchestrator Commands Reference

### Starting a Phase

```
Create branch [branch-name] and begin executing agent tasks in order.
Review and commit after each agent completes.
```

### Invoking an Agent

```
Execute Agent [N]-[A] with the following task:
[paste prompt template]

Working directory: [path]
```

### After Agent Completes

```
1. Show me: git status && git diff --staged
2. Run: [build command] && [test command]
3. If all good, commit with message: "<commit message>"
4. If issues, let's discuss before proceeding
```

### Rolling Back

```bash
# Uncommitted changes
git restore --staged . && git checkout -- .

# Committed changes
git revert <sha>

# Entire phase
git checkout main && git branch -D [branch-name]
```
```

### Step 4.3: Update Scratchpad

1. **If scratchpad doesn't exist**: Invoke the `scratchpad-init` skill first

2. **Update STATUS.md**: Add entry for the orchestration plan

```markdown
## In Progress

### Multi-Agent Orchestration
**Started**: [DATE]
**Plan**: scratchpad/YYYY-MM-DD-orchestration-plan.md

Executing multi-phase [work type] with [N] phases and [M] total agent tasks.

**Current Phase**: Not started
**Progress**: Plan created, awaiting execution
```

3. **Update scratchpad-summary.md**: Add the new plan file

```markdown
## Dated Notes

| File | Summary | Status | Last Modified |
|------|---------|--------|---------------|
| YYYY-MM-DD-orchestration-plan.md | Multi-agent orchestration plan for [project] | Active | [DATE] |
```

---

## Phase 5: Validation

### Step 5.1: Present Plan Summary

Summarize the plan for the user:

```
## Orchestration Plan Summary

**Phases**: [N] phases
**Total Agent Tasks**: [M] tasks
**Estimated Parallelization**: [X]% of tasks can run in parallel

### Phase Overview
1. **[Phase 1 Name]**: [N] agents - [brief description]
2. **[Phase 2 Name]**: [N] agents - [brief description]
...

### Key Dependencies
- [Critical dependency 1]
- [Critical dependency 2]

### Files Created
- `scratchpad/YYYY-MM-DD-orchestration-plan.md` - Main orchestration plan
- Updated `scratchpad/STATUS.md` - Current status
- Updated `scratchpad/scratchpad-summary.md` - Index

Would you like me to:
1. Make any adjustments to the plan?
2. Add more detail to specific phases?
3. Proceed with creating the files?
```

### Step 5.2: Incorporate Feedback

If user requests changes:
- Adjust the plan accordingly
- Re-present the summary
- Repeat until user approves

### Step 5.3: Finalize

Once approved:
1. Create/update all files
2. Confirm file creation
3. Provide next steps for starting execution

---

## Important Notes

- Replace all `[DATE]` placeholders with actual current date in `YYYY-MM-DD` format
- Replace all `[bracketed placeholders]` with actual values
- The plan should be detailed enough that a new agent session can execute it without additional context
- Each agent prompt should be self-contained with all necessary information
- Always include explicit file paths in agent prompts
- Always specify what the agent should NOT touch
