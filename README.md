# OpenCode Extensions

A collection of plugins, skills, and commands for [OpenCode](https://opencode.ai) and other AI coding agents to enhance development workflows.

[![Agent Skills Compatible](https://img.shields.io/badge/Agent%20Skills-Compatible-green)](https://agentskills.io)

## Quick Install

### Via skills-installer (Recommended)

Install skills for any [Agent Skills compatible](https://agentskills.io) client:

```bash
# Install scratchpad skills
npx skills-installer install @BootstrapBits/opencode-extensions/scratchpad-init
npx skills-installer install @BootstrapBits/opencode-extensions/scratchpad-update

# Install orchestration skill
npx skills-installer install @BootstrapBits/opencode-extensions/subagent-orchestration
```

**Supported clients:** Claude Code, OpenCode, Cursor, VS Code, Codex, Amp Code, Goose, Letta, GitHub

```bash
# Example: Install for Cursor
npx skills-installer install @BootstrapBits/opencode-extensions/scratchpad-init --client cursor

# Example: Install for OpenCode
npx skills-installer install @BootstrapBits/opencode-extensions/scratchpad-init --client opencode
```

### Via claude-plugins (Claude Code)

```bash
# Add as marketplace
npx claude-plugins marketplace add BootstrapBits/opencode-extensions

# Or install directly
npx claude-plugins install @BootstrapBits/opencode-extensions/scratchpad-skills
npx claude-plugins install @BootstrapBits/opencode-extensions/orchestration-skills
```

## Contents

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

### Plugins (OpenCode-specific)

#### scratchpad-loader
Automatically detects scratchpad context when users mention planning-related keywords. Shows TUI toast notifications when scratchpad context is available.

**Triggers on:** "plan", "planning", "task", "tasks", "roadmap", "milestone", "status", "scratchpad"

### Commands (OpenCode-specific)

#### /orchestrate
Slash command to invoke the subagent-orchestration skill for creating multi-agent plans.

## Manual Installation

For OpenCode-specific components or manual setup:

```bash
# Clone the repo
git clone https://github.com/BootstrapBits/opencode-extensions.git
cd opencode-extensions

# Copy skills (works with any Agent Skills compatible client)
cp -r skills/scratchpad-init ~/.claude/skills/
cp -r skills/scratchpad-update ~/.claude/skills/
cp -r skills/subagent-orchestration ~/.claude/skills/

# OpenCode-specific: Copy plugins
cp plugins/scratchpad-loader.ts ~/.config/opencode/plugin/

# OpenCode-specific: Copy commands
cp commands/orchestrate.md ~/.config/opencode/command/

# Install plugin dependencies (OpenCode only)
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

## Compatibility

| Component | Claude Code | OpenCode | Cursor | VS Code | Other Agent Skills Clients |
|-----------|-------------|----------|--------|---------|---------------------------|
| scratchpad-init | Yes | Yes | Yes | Yes | Yes |
| scratchpad-update | Yes | Yes | Yes | Yes | Yes |
| subagent-orchestration | Yes | Yes | Yes | Yes | Yes |
| scratchpad-loader plugin | No | Yes | No | No | No |
| /orchestrate command | No | Yes | No | No | No |

## License

O'Saasy License - see [LICENSE](LICENSE) for details.
