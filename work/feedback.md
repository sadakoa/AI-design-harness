# Feedback log

Everything we learn — while building, while reviewing, and from how people actually use what we shipped — goes here. An owner decides what changes; `promote-feedback` suggests how to sort it.

## How to log

Give each entry an ID — `FB-01`, `FB-02` and so on. Never renumber. If you drop one, keep the row and mark it `dropped`.

When you break a rule on purpose, put the ID on that line too: `/* FB-07 */` in CSS, `<!-- FB-07 -->` in HTML. `npm run check` skips tagged lines and makes sure the ID exists here.

If an open row already covers what you found, add your feature to its Where instead of adding a new row.

"Who" is a person's name or a skill name.

**Layer** says where it would go: `product` (users, jobs, decisions — we built the wrong thing) or `design` (rules, tokens, components — we built it the wrong way).

| Type | Meaning |
|---|---|
| deviation | We broke a rule on purpose |
| missing | `product/` or the design system doesn't have it (a job, a concept, a component, a token) |
| bug | Something in the design system doesn't work |
| insight | A review finding that probably applies to other screens too |
| observation | Something seen in real use: support tickets, analytics, interviews. Link the source. |

| Status | Meaning | Result column |
|---|---|---|
| open | No owner has decided yet | — |
| adopted | It's in `product/` or `design-system/` now. Set this inside the PR that makes the change. | The decision ID: PD-xx for product, D-xx for design |
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

| ID | Date | Layer | Type | What happened | Where | Who | Status | Result |
|---|---|---|---|---|---|---|---|---|
| FB-01 | (example) 2026-10-07 | design | insight | Two primary buttons side by side, and people hesitate | List, detail, settings | design-review | adopted | D-01 |
