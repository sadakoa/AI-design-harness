# Index

> Answers: Which file answers which question, and what should I read for this task?

Every question has exactly one file. Read only what's marked for the task you're on. What to build and why lives in `product/` — see `product/INDEX.md`.

The files are grouped by the planes they're about. `design-system/` covers the top three of the five planes of user experience: structure (how screens and flows fit together), skeleton (components, layout, words) and surface (the look). Strategy, scope and the product's own map of places are in `product/`. A file that spans planes sits under its main one; each row in `decisions.md` says its own plane.

● always · ○ when it's relevant · blank: skip

| File | Answers | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|
| `INDEX.md` | Which file answers which question, and what should I read for this task? | ● | ● | ● | ● | ● |

### Across all three

| File | Answers | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|
| `foundations/principles.md` | What do we prioritize, and why? | ● | ● | ● | ○ | ● |
| `foundations/rules.md` | What must we never do, and who catches it? | ● | ● | ● | ● | ● |
| `decisions.md` | Why did we decide this? |  |  |  |  | ● |

### Structure: how screens and flows fit together

| File | Answers | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|
| `patterns/GUIDE.md` | How do components come together into screens and flows? | ● |  | ● |  | ○ |

### Skeleton: components, layout and words

| File | Answers | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|
| `components/GUIDE.md` | Which component should I use? | ○ | ● |  |  | ○ |
| `components/inventory.md` | Which components exist in our code? | ○ | ● |  |  |  |
| `components/*.md` | How does this component behave? | ○ | ○ |  |  | ○ |
| `foundations/writing.md` | How do we write UI text? | ● |  |  | ● | ○ |
| `screens/README.md` | What do the approved screens look like? | ● |  | ○ |  |  |

### Surface: the look

| File | Answers | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|
| `tokens/tokens.css` | Which CSS variables can I use? | ● | ● | ○ |  |  |
| `tokens/tokens.json` | Which exact values do we use? |  |  |  |  | ○ |

## When you write here

- Use token names, never raw values. `tokens.json` is the only source; `tokens.css` is generated from it.
- Say each thing once. Elsewhere, point to it by ID or heading.
- Decisions that only apply to one screen stay in `work/features/`. If you're not sure, log it in `work/feedback.md`.
- New file? Add a row here and put the same "Answers" line at the top of the file. `npm run check` catches mismatches.
