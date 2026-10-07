# Feedback log

Everything we learn while building and reviewing goes here. An owner decides what becomes a rule; `promote-feedback` suggests how to sort it.

## How to log

Give each entry an ID — `FB-01`, `FB-02` and so on. Never renumber. If you drop one, keep the row and mark it `dropped`.

When you break a rule on purpose, put the ID on that line too: `/* FB-07 */` in CSS, `<!-- FB-07 -->` in HTML. `npm run check` skips tagged lines and makes sure the ID exists here.

"Who" is a person's name or a skill name.

| Type | Meaning |
|---|---|
| deviation | We broke a rule on purpose |
| missing | The design system didn't have it, so we built it in `work/` |
| bug | Something in the design system doesn't work |
| insight | A review finding that probably applies to other screens too |

| Status | Meaning | Result column |
|---|---|---|
| open | No owner has decided yet | — |
| adopted | It's in the design system now. Set this inside the PR that makes the change. | The decision ID (D-xx) |
| screen-only | It only applies to that one screen | Why |
| dropped | We let it go | Why |

## When to promote

<!-- replace with your own -->
Promote an entry when (1) or (2) is true, and (3) is true:

1. The same thing came up on two or more screens.
2. We broke the same rule twice.
3. You can name the one file that should answer it.

A mistake in the design system, or a missing token that affects every screen, can be promoted right away. An owner always makes the final call.

## Log

<!-- replace: delete the (example) row and start at FB-01 -->

| ID | Date | Type | What happened | Where | Who | Status | Result |
|---|---|---|---|---|---|---|---|
| FB-01 | (example) 2026-10-07 | insight | Two primary buttons side by side, and people hesitate | List, detail, settings | design-review | adopted | D-01 |
