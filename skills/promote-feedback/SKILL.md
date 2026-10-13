---
name: promote-feedback
description: Sort the feedback log and draft changes to product/ or the design system. Use whenever someone, in any language, asks to sort the feedback log or to bring research, data or other findings into the product context ("go through the feedback", "get this into the product context"). An owner decides and merges.
---

# promote-feedback

Turn what reviews and real use taught us into changes to `product/` or `design-system/`. You propose; an owner of that folder (listed in `.github/CODEOWNERS`) decides.

These steps are the usual path. Skip, merge or reorder them when the request calls for it, and say why in one line. The rules in `AGENTS.md` always hold.

## Steps

1. **Read.** Every `open` row in `work/feedback.md`, and the files in the Promote column of `product/INDEX.md` (layer `product`) or `design-system/INDEX.md` (layer `design`); for layer `harness`, the skill, template or script it names. Check both `decisions.md` files so you don't bring back something that was already rejected, unless there's a new reason.

2. **Group.** Merge rows that say the same thing and keep all their IDs. If a group would end up with different outcomes, split it. If a design finding is really a product problem (we built the wrong thing), move it to layer `product`

3. **Suggest.** Give each group `adopted`, `screen-only`, `dropped` or `keep open` (not enough evidence yet: say what would settle it), using "When to promote" in the log, with a one-line reason. When in doubt, `keep open`. A claim from one person usually stays open.

4. **Find the home.** Pick the one file in that layer's INDEX that answers the question, even if you don't suggest changing it. The INDEX heading it sits under is the group's plane. For a new entry, give the next free ID (CON-04, PD-03). If it's about how a skill or a script works, the home is that skill's `SKILL.md` or the script. If you can't settle on one file, the question is fuzzy or a new file is needed — say which.

5. **Ask.** If someone brought these rows (a researcher, a reviewer, Sales), start with a short plain reply for them, in their language: what will change, what needs an owner, what was too thin. Then one line that counts the open rows by plane ("5 of 12 are strategy") and what that suggests. Then show the table below and ask what to go ahead with. If nobody can answer now, save it as `work/promote-<yyyymmdd>.md` so it isn't lost. **Change nothing until you have an answer.**

6. **Do what was approved.**
   - `screen-only` or `dropped`: update the status and reason in the log straight away.
   - No answer: leave it `open`.
   - `adopted`: make one PR, on a new branch, for everything approved in this round. It
     - edits the home file (for values, edit only `tokens/tokens.json`, then run `npm run tokens`; name new tokens the way its `$description` says; if `sync.json` maps that token, change it in the product's code instead and run `npm run sync`),
     - adds a row to `product/decisions.md` (PD-xx) or `design-system/decisions.md` (D-xx) if it decides something; a change that only adds evidence or a source (a new confidence, a measure's baseline, a doc in `sources.md`) needs no decision,
     - adds an INDEX row if you created a file,
     - sets the log rows to `adopted` with the PD-xx or D-xx, or, for evidence only, the entry it updated (U-xx, J-xx, CON-xx) or `sources.md`,
     - passes `npm run check`.

   Ask before opening the PR. Never merge it.

## Harness rows

Rows with layer `harness` are about the harness, not this product. In a product's repo, they go back to the harness:

1. Draft one GitHub issue per row or group, for the repo in `.harness.json` (its `source`): a title, what happened, where (the skill, template or script), and what would have helped. Leave out anything about the product, its customers or the company: the harness repo may be public.
2. Show the drafts and ask. After a yes, file them with `gh issue create --repo <owner/repo>`, and set the rows to `sent` with the issue link as the result.

In the harness repo itself, sort them like any other row.

## Table

| Group | IDs | Plane | Suggestion | Why | Home | Change |
|---|---|---|---|---|---|---|

## Keep in mind

- One thing on one screen isn't a rule yet.
- `product/` and `design-system/` hold what's true now. When and why go in the `decisions.md` next to them.
- Say each thing once. If it's already written somewhere, edit it there.
