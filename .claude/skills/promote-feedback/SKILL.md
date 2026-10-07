---
name: promote-feedback
description: Sort the feedback log and draft changes to product/ or the design system. Use for "go through the feedback log", "promote feedback", "what should become a rule". An owner decides and merges.
---

# promote-feedback

Turn what reviews and real use taught us into changes to `product/` or `design-system/`. You propose; an owner of that folder (listed in `.github/CODEOWNERS`) decides.

## Steps

1. **Read.** Every `open` row in `work/feedback.md`, and the files in the Promote column of `product/INDEX.md` (layer `product`) or `design-system/INDEX.md` (layer `design`). Check both `decisions.md` files so you don't bring back something that was already rejected, unless there's a new reason.

2. **Group.** Merge rows that say the same thing and keep all their IDs. If a group would end up with different outcomes, split it. If a design finding is really a product problem (we built the wrong thing), move it to layer `product`.

3. **Suggest.** Give each group `adopted`, `screen-only` or `dropped`, using "When to promote" in the log, with a one-line reason. When in doubt, `screen-only`.

4. **Find the home.** For `adopted`, pick the one file in that layer's INDEX that answers the question. If it's about how a skill works, the home is that skill's `SKILL.md`. If you can't settle on one file, the question is fuzzy or a new file is needed — say which.

5. **Ask.** Show the table below and ask what to go ahead with. **Change nothing until you have an answer.**

6. **Do what was approved.**
   - `screen-only` or `dropped`: update the status and reason in the log straight away.
   - No answer: leave it `open`.
   - `adopted`: make one PR on a new branch that
     - edits the home file (for values, edit only `tokens/tokens.json`, then run `npm run tokens`; name new tokens the way its `$description` says; if `sync.json` maps that token, change it in the product's code instead and run `npm run sync`),
     - adds a row to `product/decisions.md` (PD-xx) or `design-system/decisions.md` (D-xx),
     - adds an INDEX row if you created a file,
     - sets the log rows to `adopted` with the PD-xx or D-xx,
     - passes `npm run check`.

   Ask before opening the PR. Never merge it.

## Table

| Group | IDs | Suggestion | Why | Home | Change |
|---|---|---|---|---|---|

## Keep in mind

- One thing on one screen isn't a rule yet.
- `product/` and `design-system/` hold what's true now. When and why go in the `decisions.md` next to them.
- Say each thing once. If it's already written somewhere, edit it there.
