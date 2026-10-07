# Review: Support inbox, option A (priority groups)

- **Target:** `options/a.html`, the pick in `proposal.html`
- **Date:** 2026-10-07
- **Reviewer:** design-review, run from design-builder step 8 (so fixing must items was part of the job)

## Intent

Support agents handle 50–100 requests a day on a desktop. They should open the inbox, start with what's urgent, and assign requests to someone, one or several at a time. The request detail page is out of scope. (`proposal.html` §1, `_inputs/prd.md`)

Placeholders: `principles.md`, the word table in `writing.md`, `components/GUIDE.md` and `work/feedback.md` still have "(example)" content. Findings based on P-01 to P-03 or on the word table depend on those placeholders.

## Machine first

- `npm run tokens`: wrote `tokens.css` (41 variables), no change.
- `npm run check`: only the repo-wide "17 "(example)" entries left" warning. Nothing for this feature.
- Extra grep over `options/*.html`: no hex, `rgb()`/`hsl()`, named colors, `transparent` or `currentColor`. Every `var(--…)` is in `tokens.css`.

## Rendered

- Captured at 1280px in the normal, loading, empty, error and done states (`?state=`), plus the normal state at 768px.
- Exercised the main flows:
  - Selected two rows, pressed Assign, picked a person, saw the toast and used Undo.
  - Assigned a single row with the keyboard (arrows, then Enter).
  - Searched with no results and used Clear search.
  - Opened Assigned to me.
- Console: no errors or warnings in any state.
- Hidden things stay hidden: the menu and toast only appear when used, and there's no state switcher on screen (R-05).
- 1280px: no sideways overflow. 768px: the page itself doesn't overflow, but the Received column is cut off inside the table (#7).

## Whole screen (quality bar, `principles.md`)

1. **Calm with a lot of information?** Mostly. It's one table with three group headers, and color only appears in the priority bars and status icons. Bold subjects on every row make the middle column a little heavy, but that's acceptable.
2. **Obvious where to look first?** Yes. The High group is on top, and the line under the title names how many high-priority requests have no assignee.
3. **Next step easy to take?** Not at first. At rest, nothing showed that you could assign (#1). Fixed.

## Findings

Areas were reviewed one at a time. Before each one, only the files the INDEX marks for it were re-read:

- **Components:** `tokens.css`, `principles.md`, `rules.md`, `components/GUIDE.md`
- **Layout:** `principles.md`, `rules.md`, `patterns/GUIDE.md`
- **Copy:** `rules.md`, `writing.md`

| # | Area | Severity | Where | What's off | Based on | Fix |
|---|---|---|---|---|---|---|
| 1 | Layout | must | Assignee column, toolbar | At rest, nothing showed that you could assign. Unassigned rows said "Unassigned" in gray, and the chevron only appeared on hover. The bulk "Assign" button only appeared after you selected rows. So the PRD's main action was invisible to anyone who didn't hover. | `principles.md` quality bar Q3, P-03; PRD "Must support" | **Fixed.** Unassigned rows now show a bordered "Assign" button with the chevron always visible. The toolbar now says "Select several to assign them at once." |
| 2 | Layout | should | High group | Each group is ordered by age alone. So "Bookings stopped syncing overnight", which is in progress and already assigned, sits above two high-priority requests nobody has picked up. The eye lands first on the one that's already being handled. | P-01, P-02 | Inside a group, show unassigned requests first, then longest waiting, and update the sort note to match. A person needs to OK this, because it changes the order assumed in question 3. |
| 3 | Components | should | Priority bars, group headers | High uses `color.status.danger` and medium uses `color.status.warning`. `tokens.json` describes those as "Errors and destructive actions" and "Needs attention", not priority. | `tokens.json` descriptions; R-01 | Keep them for now: the bar shape and the label carry the meaning, so R-02 holds. Log the missing priority tokens. |
| 4 | Components | should | Selected rows | On selected rows, the customer line (`color.text.secondary`) sits on `color.action.primary.subtle` at about 4.3:1. That's below 4.5:1 for 14px text. | `principles.md` "Who it's for": reading fast, not getting tired | Use `color.text.primary` for the customer line on selected rows, or log a contrast rule. |
| 5 | Components | should | Loading placeholders | Placeholder bars use `color.border.default` as a fill, but that token is described as "Dividers and input borders". | `tokens.json` description; R-01 | Log a missing placeholder token. |
| 6 | Copy | should | Assign menu | "Remove assignee" uses "Remove", which the word table in `writing.md` lists under "Don't use" (for Delete). Here it means taking the assignee off, and the table has no word for that. | `writing.md` Words | Add a word to the table (for example "Unassign") and use it. |
| 7 | Layout | should | Table at 768px | Received is cut off. You can only reach it by scrolling the table sideways, and nothing hints that there's more. | P-02; PRD "Must show: received time" | Below about 900px, move Received into the customer line, or leave out the year when it's the current year. |
| 8 | Components | taste | Assign menu, toast | The menu and toast sit on top of rows with only a 1px border, so they blend into the table. | Nothing in the design system: there's no elevation token | Log missing elevation. |
| 9 | Copy | taste | Received column | "Oct 7, 2026," repeats on 7 of 10 rows. `writing.md` has one date format, and a short one for today ("10:52 AM") would scan faster in a list. | Nothing in the design system: `writing.md` has only one date format | Log it, and don't change it until `writing.md` says so. |

**Counts:** must 1 (fixed), should 6, taste 2. No open must items.

## Would log

In this example run, nothing was added to `work/feedback.md`. If it were, these rows would be added as `open`, with IDs continuing after FB-01 (the example row).

| Would be | Type | What happened | Where | Who | From |
|---|---|---|---|---|---|
| FB-02 | missing | No component specs for the table with group rows, assign menu, toast, priority indicator or status indicator, so they were built in `work/`. | Support inbox | design-builder | build |
| FB-03 | missing | No priority colors. `status.danger` and `status.warning` stand in for high and medium. | Support inbox | design-review | #3 |
| FB-04 | insight | Secondary text on the selected-row wash is about 4.3:1, and `rules.md` has no contrast rule. | Any list with selection | design-review | #4 |
| FB-05 | missing | No token for loading placeholders. | Any loading state | design-review | #5 |
| FB-06 | missing | No word for taking an assignee off, because "Remove" is reserved. | `writing.md` | design-review | #6 |
| FB-07 | missing | No elevation for menus and toasts. | Any popover | design-review | #8 |
| FB-08 | missing | Only one date format, while lists need a short one for today. | `writing.md` | design-review | #9 |
| FB-09 | insight | The main action on each row of a list has to be visible without hovering. | Any list with row actions | design-review | #1 |
