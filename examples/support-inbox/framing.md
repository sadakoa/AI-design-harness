# Framing: Support inbox, urgent requests first

- **Verdict:** go
- **Scope:** screen
- **PRD:** `../prd/support-inbox.md`
- **Context:** `product/` and `design-system/` still hold (example) content about Helpline, a made-up help desk. This framing treats it as real, so every ID below is a placeholder.

## Who it's for, and the job

| | ID | Confidence | How this PRD helps |
|---|---|---|---|
| User | U-01 | fact | Main user. The PRD describes U-01 exactly. |
| User | U-02 | fact | Not named in the PRD, but assigning several requests at once is how U-02 hands out work. |
| Job | J-01 | fact | Main job. Agents see high priority first and start there. |
| Job | J-02 | fact | Assigning, one or several at a time, sends requests to the right person. |

## How it fits

- **Principles:** PP-01 for: it speeds up the agent's own work. PP-02 is a risk: putting high priority on top must not push older low- and medium-priority requests out of sight. Sorting is fine; hiding is not. PP-03 for: one screen, one job.
- **Decisions:** PD-02 supports it: the order uses the priority a person set. The inbox must not guess urgency by itself. PD-01: no effect.
- **Constraints:** CON-01: six fields per row must fit at 1280px. CON-02: sort and filter can go in the URL, but customer names and subjects never do. CON-03: selecting several requests and assigning them must work with the keyboard alone.
- **Concepts:** Request, Priority, Status and Assignee, as in `concepts.md`. "Urgent" in the PRD means high priority (see J-01's measure). "Inbox" isn't in `concepts.md`; it's a new word, not a new concept (logged as FB-02).

## Questions for a product owner

None of these block the work.

1. Can any agent assign several requests at once, or only team leads (U-02)?
2. If a low-priority request waits a long time, may it move up the list? That comes close to automatic priority, which PD-02 rules out for now.

## For design-builder

- Make J-01 easier: high priority first, at a glance, without hiding the rest (PP-02).
- Shape: 1280px wide (CON-01); select and assign several with the keyboard alone (CON-03); no customer details in URLs (CON-02).
- Priority is shown, never set or guessed by the system (PD-02).
- Out of scope: the request detail page. `design-system/screens/` has no approved screens to build on yet.
