---
name: promote-feedback
description: Sort the feedback log and draft changes to the design system. Use for "go through the feedback log", "promote feedback", "what should become a rule". An owner decides and merges.
---

# promote-feedback

Turn what reviews taught us into changes to the design system. You propose; an owner (listed in `.github/CODEOWNERS`) decides.

## Steps

1. **Read.** The files in the Promote column of the INDEX, and every `open` row in `work/feedback.md`. Check `decisions.md` so you don't bring back something that was already rejected, unless there's a new reason.

2. **Group.** Merge rows that say the same thing and keep all their IDs. If a group would end up with different outcomes, split it.

3. **Suggest.** Give each group `adopted`, `screen-only` or `dropped`, using "When to promote" in the log, with a one-line reason. When in doubt, `screen-only`.

4. **Find the home.** For `adopted`, pick the one file in the INDEX that answers the question. If it's about how a skill works, the home is that skill's `SKILL.md`. If you can't settle on one file, the question is fuzzy or a new file is needed — say which.

5. **Ask.** Show the table below and ask what to go ahead with. **Change nothing until you have an answer.**

6. **Do what was approved.**
   - `screen-only` or `dropped`: update the status and reason in the log straight away.
   - No answer: leave it `open`.
   - `adopted`: make one PR on a new branch that
     - edits the home file (for values, edit only `tokens/tokens.json`, then run `npm run tokens`; name new tokens the way its `$description` says),
     - adds a row to `decisions.md` (fill in the PR number once there is one),
     - adds an INDEX row if you created a file,
     - sets the log rows to `adopted` with the D-xx,
     - passes `npm run check`.

   Ask before opening the PR. Never merge it.

## Table

| Group | IDs | Suggestion | Why | Home | Change |
|---|---|---|---|---|---|

## Keep in mind

- One thing on one screen isn't a rule yet.
- The design system holds the rule. When and why go in `decisions.md`.
- Say each thing once. If it's already written somewhere, edit it there.
