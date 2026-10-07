# Index

> Answers: Which file answers which question, and what should I read for this task?

Every question has exactly one file. Read only what's marked for the task you're on.

● always · ○ when it's relevant · blank: skip

| File | Answers | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|
| `INDEX.md` | Which file answers which question, and what should I read for this task? | ● | ● | ● | ● | ● |
| `tokens/tokens.css` | Which CSS variables can I use? | ● | ● | ○ |  |  |
| `tokens/tokens.json` | Which exact values do we use? |  |  |  |  | ○ |
| `foundations/principles.md` | What do we prioritize, and why? | ● | ● | ● | ○ | ● |
| `foundations/rules.md` | What must we never do, and who catches it? | ● | ● | ● | ● | ● |
| `foundations/writing.md` | How do we write UI text? | ● |  |  | ● | ○ |
| `components/GUIDE.md` | Which component should I use? | ○ | ● |  |  | ○ |
| `components/*.md` | How does this component behave? | ○ | ○ |  |  | ○ |
| `patterns/GUIDE.md` | How do components come together into a screen? | ● |  | ● |  | ○ |
| `screens/README.md` | What do the approved screens look like? | ● |  | ○ |  |  |
| `decisions.md` | Why did we decide this? |  |  |  |  | ● |

## When you write here

- Use token names, never raw values. `tokens.json` is the only source; `tokens.css` is generated from it.
- Say each thing once. Elsewhere, point to it by ID or heading.
- Decisions that only apply to one screen stay in `work/features/`. If you're not sure, log it in `work/feedback.md`.
- New file? Add a row here and put the same "Answers" line at the top of the file. `npm run check` catches mismatches.
