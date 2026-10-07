# Framing: Hand a request off to a teammate

- **Verdict:** decide first
- **Scope:** flow
- **PRD:** `../prd/hand-off.md`
- **Context:** `product/` and `design-system/` still hold (example) content about Helpline, a made-up help desk. This framing treats it as real, so every ID below is a placeholder.

## Who it's for, and the job

| | ID | Confidence | How this PRD helps |
|---|---|---|---|
| User | U-01 | fact | Sends and receives hand-offs. The receiver gains the most. |
| User | U-02 | fact | Hands requests off when rebalancing work. |
| Job | J-02 | fact | Only in part. Moving the request is J-02, but J-02's measure (fewer reassignments) doesn't measure this PRD's goal. A hand-off is itself a reassignment. |
| Job | none | — | The main goal, picking up a request someone else started without asking the customer again, isn't in `jobs.md`. The PRD gives no evidence for it ("often"). See question 1. |

## How it fits

- **Principles:** PP-01 for: the receiver doesn't reread the whole conversation. PP-02 is a risk: the request must stay visible while it moves, including when the teammate is away. PP-03 for: one job; routing rules are out of scope.
- **Decisions:** PD-02: no clash as long as a hand-off doesn't change priority. But "at the top of their list" ranks the request above higher-priority ones, which works against J-01 (see question 3). PD-01: no effect, as long as the customer never sees the note.
- **Constraints:** CON-03: the whole flow works with the keyboard alone, including picking a teammate. CON-02: the note may hold customer details, so it never goes into URLs, exports or notifications outside Helpline. CON-01: the hand-off step fits at 1280px.
- **Concepts:** Request; Assignee (a hand-off changes it). New: the hand-off note, text for the next agent, not for the customer. It isn't in `concepts.md`, and it's unclear whether it is part of the request's conversation. "Inbox" and "their list": see FB-02.

## Screens

"Exists today?" means an approved screen in `design-system/screens/`. There are none yet. The inbox and the request are live in the product, but have no approved design.

| Screen | Exists today? | Leads to |
|---|---|---|
| Inbox (sender) | no; live in the product, being reframed in `../support-inbox/` | Request |
| Request | no; live in the product | Hand off |
| Hand off: pick a teammate, write a note, confirm | no | Inbox (sender) on confirm; back to Request on cancel |
| Inbox (receiver), request at the top with the note | no; the note is new | Request, with the note shown |

## Questions for a product owner

1. Should "pick up a request someone else started, without asking the customer again" be a new job for U-01? With what confidence, and how would we measure it? (FB-03)
2. Is the hand-off note a new concept? Who can see it: the receiver, the team, team leads? Does it stay on the request after pick-up? Confirm that the customer never sees it. (FB-04)
3. "At the top of their list": above high-priority requests (against J-01), at the top of its own priority group, or in a separate place? Nothing in `product/` says what decides list order. (FB-05)
4. Can an agent hand off to a teammate who is away or already full? What happens to a hand-off nobody picks up (PP-02)?
5. Does the assignee change as soon as the sender confirms, or does the receiver accept first?

**If the owner says go before answering**, design on these assumptions: the note is internal, stays on the request and the team can see it; a handed-off request goes to the top of its own priority group, marked as handed off; the assignee changes on confirm.

## For design-builder

- Make it easier for the receiver to pick up without rereading or asking the customer again (question 1); moving the request is J-02.
- Keep the note clearly apart from replies to the customer (PD-01, CON-02). Keyboard alone for the whole flow (CON-03).
- The request never drops out of sight during or after the hand-off (PP-02). Its place in the receiver's list follows question 3.
- Out of scope: automatic routing rules, and the inbox sort itself (`../support-inbox/`).
