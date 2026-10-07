# Instructions for agents

Two folders hold the truth. `product/` says what to build and why. `design-system/` says how it should look and behave. Each has an `INDEX.md` that tells you what to read for the task you're on. Start there, and don't read whole folders.

- Before designing anything, frame it: `frame` checks the PRD against `product/`.
- Entries in `product/` marked `hypothesis` or `open` aren't facts. Say so whenever you rely on one.
- `design-system/tokens/tokens.json` is the only source for values. If anything disagrees with it, trust the tokens and log the mismatch in `work/feedback.md`.
- If a file still has `(example)` content, use it as a placeholder and say so in your output.

## Skills

| Task | Skill |
|---|---|
| Set the harness up for an existing product | `bootstrap` |
| Check a PRD before anyone designs it | `frame` |
| Design a screen or a flow from a PRD | `design-builder` |
| Review a screen, flow or proposal | `design-review` |
| Turn feedback into product or design changes | `promote-feedback` |

## Don't

- Edit `product/` or `design-system/` on your own. Changes go through `promote-feedback` and need an owner's OK (owners are listed in `.github/CODEOWNERS`). The one exception is `bootstrap`, which drafts them on a branch for an owner to review.
- Edit tokens or the component inventory that `sync.json` maps. They come from the product's code; change them there and run `npm run sync`.
- Add components, colors or wording to the design system. If you need something that isn't there, build it inside `work/`, tag the line with a feedback ID and log it.
- Guess. Ask, or write it down as an open question and keep going.
- Put output anywhere but `work/`. A screen only moves into `design-system/screens/` through a reviewed pull request, and an owner merges it.
