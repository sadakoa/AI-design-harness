# Instructions for agents

Before you build, change or review any UI, read [design-system/INDEX.md](design-system/INDEX.md). It tells you what to read for the task. Don't read the whole folder.

`design-system/tokens/tokens.json` is the only source for values. If anything disagrees with it, trust the tokens and log the mismatch in `work/feedback.md`.

If a file still has `(example)` content, treat it as a placeholder and say so in your output.

## Skills

| Task | Skill |
|---|---|
| Design a screen from a PRD | `design-builder` |
| Review a screen or proposal | `design-review` |
| Turn feedback into design system changes | `promote-feedback` |

## Don't

- Edit `design-system/` on your own. Changes go through `promote-feedback` and need a person's OK.
- Add components, colors or wording to the design system. If you need something that isn't there, build it inside `work/`, tag the line with a feedback ID and log it.
- Guess. Ask, or write it down as an open question and keep going.
- Put output anywhere but `work/`. A screen only moves into `design-system/screens/` through a reviewed PR, and a person merges it.
