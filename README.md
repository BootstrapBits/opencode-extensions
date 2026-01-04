# OpenCode Extensions

A collection of plugins, skills, and commands for [OpenCode](https://opencode.ai) to enhance AI-assisted development workflows.

## Contents

### Plugins

#### scratchpad-loader
Automatically detects scratchpad context when users mention planning-related keywords. Shows TUI toast notifications when scratchpad context is available.

**Triggers on:** "plan", "planning", "task", "tasks", "roadmap", "milestone", "status", "scratchpad"

### Skills

#### scratchpad-init
Initialize a `.scratchpad/` directory for cross-session context sharing between coding agents. Creates structured files for:
- **PLAN.md** - Project roadmap and milestones
- **CONTEXT.md** - Architecture and background info
- **IDEAS.md** - Future features and brainstorming
- **STATUS.md** - Current work in progress
- **scratchpad-summary.md** - Index file for agents

Also adds `.scratchpad/` to `.gitignore` if the file exists.

#### scratchpad-update
Update scratchpad files after completing work sessions. Handles:
- Updating STATUS.md with completed tasks and current progress
- Updating PLAN.md with new milestones (asks user for approach)
- Adding ideas to IDEAS.md from brainstorming sessions
- Creating dated notes for significant work (`YYYY-MM-DD-topic-name.md`)
- Refreshing scratchpad-summary.md with current state

Always asks for user confirmation before making changes.

#### subagent-orchestration
Generate a multi-agent orchestration plan for complex refactoring or feature work. Guides through:
1. Initial discovery and spec analysis
2. Codebase exploration
3. User interview for workflow preferences
4. Plan generation with dependency analysis
5. Validation and finalization

### Commands

#### /orchestrate
Slash command to invoke the subagent-orchestration skill for creating multi-agent plans.

## Installation

Copy the desired components to your OpenCode config directory:

```bash
# Plugins
cp plugins/scratchpad-loader.ts ~/.config/opencode/plugin/

# Skills
cp -r skills/scratchpad-init ~/.config/opencode/skill/
cp -r skills/scratchpad-update ~/.config/opencode/skill/
cp -r skills/subagent-orchestration ~/.config/opencode/skill/

# Commands
cp commands/orchestrate.md ~/.config/opencode/command/
```

Then install dependencies:

```bash
cd ~/.config/opencode && bun install
```

## Usage

### Scratchpad

1. In any project, ask the agent to "initialize scratchpad" to set up the directory
2. The scratchpad-loader plugin will automatically detect when you mention planning keywords
3. Agents will read `.scratchpad/scratchpad-summary.md` for context
4. After completing work, ask the agent to "update scratchpad" to sync changes

### Multi-Agent Orchestration

1. Use the `/orchestrate` command or ask to "create an orchestration plan"
2. Provide your spec/plan document location
3. Answer the interview questions (or use defaults)
4. Review and execute the generated plan

## License

O'Saasy License - see [LICENSE](LICENSE) for details.
