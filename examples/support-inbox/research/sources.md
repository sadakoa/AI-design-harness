# Research — support inbox triage list

Job: a support agent opens the list and needs to know what to pick up first, then make sure it has an assignee.

No screenshots. These notes come from general knowledge of each product, not from a fresh look, so every source is marked **unverified**. Check them against the live products before relying on the details.

## Inside: approved screens

None. `design-system/screens/` has no approved screens yet, so nothing to follow.

## Outside: other products

| Product | What we noticed | Why it works | What to borrow | Source |
|---|---|---|---|---|
| Zendesk Support | Agents work from saved "views" (for example "Unassigned tickets") instead of one raw stream. A view can be sorted by priority and then by age. Ticking several tickets opens a bulk edit where you set the assignee once for all of them. | The default list already answers "what should I look at", so nobody has to re-sort it every morning. Bulk edit means the lead triaging 30 new tickets does it once, not 30 times. | Ship the list pre-sorted by priority, then by how long it has waited. Assign many from one selection. | unverified |
| Intercom Inbox | "Unassigned" is its own place next to "Your inbox", and assigning is a quick action on each conversation. Priority conversations are pinned above the rest, not just tinted. | Ownership is visible: you can see at a glance what nobody has picked up. Pinning changes the order, which survives a quick scan better than a colored dot does. | Make "Unassigned" a one-click filter. Express priority through order and position, with color as a second signal only. | unverified |
| Linear (issue list) | Lists can be grouped by priority, with a header and count per group. Priority icons differ in shape (number of filled bars), not just color. Keyboard shortcuts select (X), move (J/K) and assign (A); several selected items can be changed at once. | Group headers with counts tell you how big each pile is before you read a row. Shape plus label works for people who can't tell the colors apart. Keyboard is an accelerator for heavy users, never the only way. | Group headers with counts. Priority icon with filled bars plus the word. Keyboard shortcuts as an extra, with the same actions reachable by mouse. | unverified |

## What we're not borrowing

- Looks. None of the above products' colors, icons or layouts are copied; only the reasons above.
- Extra priority levels such as "urgent". The PRD defines three: high, medium, low.
