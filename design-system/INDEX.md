# Index

> Answers: Which file answers which question, and what should I read for this task?

Every question has exactly one file. Read only what's marked for the task you're on. What to build and why lives in `product/` — see `product/INDEX.md`.

**Plane** is where a file sits among the five planes of user experience. `design-system/` covers the top of them: structure (how screens and flows fit together), skeleton (components, layout, words) and surface (the look). Strategy, scope and the product's own structure are in `product/`.

● always · ○ when it's relevant · blank: skip

| File | Answers | Plane | Build | Review: components | Review: layout | Review: copy | Promote |
|---|---|---|---|---|---|---|---|
| `INDEX.md` | Which file answers which question, and what should I read for this task? | — | ● | ● | ● | ● | ● |
| `tokens/tokens.css` | Which CSS variables can I use? | surface | ● | ● | ○ |  |  |
| `tokens/tokens.json` | Which exact values do we use? | surface |  |  |  |  | ○ |
| `foundations/principles.md` | What do we prioritize, and why? | all | ● | ● | ● | ○ | ● |
| `foundations/rules.md` | What must we never do, and who catches it? | skeleton, surface | ● | ● | ● | ● | ● |
| `foundations/writing.md` | How do we write UI text? | skeleton | ● |  |  | ● | ○ |
| `components/GUIDE.md` | Which component should I use? | skeleton | ○ | ● |  |  | ○ |
| `components/inventory.md` | Which components exist in our code? | skeleton | ○ | ● |  |  |  |
| `components/*.md` | How does this component behave? | skeleton | ○ | ○ |  |  | ○ |
| `patterns/GUIDE.md` | How do components come together into screens and flows? | structure, skeleton | ● |  | ● |  | ○ |
| `screens/README.md` | What do the approved screens look like? | skeleton, surface | ● |  | ○ |  |  |
| `decisions.md` | Why did we decide this? | all |  |  |  |  | ● |

## When you write here

- Use token names, never raw values. `tokens.json` is the only source; `tokens.css` is generated from it.
- Say each thing once. Elsewhere, point to it by ID or heading.
- Decisions that only apply to one screen stay in `work/features/`. If you're not sure, log it in `work/feedback.md`.
- New file? Add a row here and put the same "Answers" line at the top of the file. `npm run check` catches mismatches.
