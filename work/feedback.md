# Feedback log

Everything we learn — while building, while reviewing, and from how people actually use what we shipped — goes here. An owner decides what changes; `promote-feedback` suggests how to sort it.

## How to log

Give each entry an ID — `FB-01`, `FB-02` and so on. Never renumber. If you drop one, keep the row and mark it `dropped`.

When you break a rule on purpose, put the ID on that line too: `/* FB-07 */` in CSS, `<!-- FB-07 -->` in HTML. `npm run check` skips tagged lines and makes sure the ID exists here.

If an open row already covers what you found, add where you saw it (a feature, a screen or a source) to its Where instead of adding a new row.

Date is the day you log it. Who is whoever raised it: a person's name, a role (Sales, Legal) or a skill name.

**Layer** says where it would go: `product` (users, jobs, places, decisions — we built the wrong thing) or `design` (rules, tokens, components — we built it the wrong way). When in doubt, look for the deepest cause: a screen that's hard to use because it serves the wrong job is a `product` problem.

| Type | Meaning |
|---|---|
| deviation | We broke a rule on purpose |
| missing | `product/` or the design system doesn't have it (a job, a concept, a place, a component, a token) |
| outdated | Something in `product/` or the design system no longer looks true (a decision's reason, a job's measure, a source) |
| bug | Something in the design system doesn't work |
| insight | A review finding that probably applies to other screens too |
| observation | Something seen in real use: support tickets, analytics, interviews, a note from Sales or Legal. Say where it came from in What happened, with a link if there is one. |

| Status | Meaning | Result column |
|---|---|---|
| open | No owner has decided yet | — |
| adopted | It's in `product/` or `design-system/` now. Set this inside the PR that makes the change. | The decision ID: PD-xx for product, D-xx for design |
| screen-only | It only applies to that one screen or feature | Why |
| dropped | We let it go | Why |

## When to promote

<!-- replace with your own -->
Promote an entry when (1) or (2) is true, and (3) is true:

1. The same thing came up on two or more screens, or more than once in real use (each support ticket counts).
2. We broke the same rule twice.
3. You can name the one file that should answer it.

Some can be promoted right away: a mistake in the design system, a missing token that affects every screen, a fact from outside the team (a legal limit, research, data, a plan) that changes an entry in `product/`, and a word people disagree about (`writing.md` says to add a row whenever they do).

If the design system already answers it, it isn't a new rule: mark it `screen-only` and say which rule the screen breaks. An owner always makes the final call.

## Log

<!-- replace: when you start using the harness, delete the (example) row; your first entry is FB-01. Until then, number after it. -->

| ID | Date | Layer | Type | What happened | Where | Who | Status | Result |
|---|---|---|---|---|---|---|---|---|
| FB-01 | (example) 2026-10-07 | design | insight | Two primary buttons side by side, and people hesitate | List, detail, settings | design-review | adopted | D-01 |
