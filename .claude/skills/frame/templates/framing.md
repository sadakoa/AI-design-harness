# Framing: {{name}}

## For the person who asked

{{Five plain sentences at most, with no IDs: what you found, what's blocked and why, who decides, and what can happen now. Don't promise a date.}}

- **Verdict:** {{go / decide first / stop}}
- **Scope:** {{screen / flow}}
- **PRD:** `_inputs/{{file}}`
- **Context:** {{"product/ is real" — or which files still hold (example) content}}
- **Sources:** {{the docs from product/sources.md you opened, and any the PRD names that aren't listed — or "none needed"}}
- **Go-ahead:** {{for decide first: who said to go ahead on the assumptions below, and when — or "waiting". Delete for go or stop.}}
- **Dates:** {{any date the request mentions. It's noted, and it doesn't change the verdict. Delete if there's none.}}

## Who it's for, and the job

<!-- One row per user and job. If no job covers the main goal, add a row with ID "none" and say what the missing job would be. -->

| | ID | Confidence | How this PRD helps |
|---|---|---|---|
| User | {{U-xx}} | {{fact / hypothesis / open}} | {{}} |
| Job | {{J-xx or none}} | {{fact / hypothesis / open, or — for none}} | {{}} |

## How it fits

- **Principles:** {{PP-xx — for or against, and why}}
- **Decisions:** {{PD-xx — supports or goes against, and why}}
- **Constraints:** {{CON-xx — what it means for the design}}
- **Concepts:** {{the ones it uses; new names; new concepts}}
- **Places:** {{places in product/structure.md it uses, changes or adds}}
- **Design system:** {{for a change to a screen or words that exist today: what rules.md, components/GUIDE.md or writing.md already say about it. Delete otherwise.}}

## Screens

<!-- Flows only. Delete for a single screen, and for a stop. -->

| Screen | Approved in screens/? | Live today? | Leads to |
|---|---|---|---|
| {{}} | {{yes / no}} | {{yes / no}} | {{}} |

## Questions for a product owner

<!-- decide first: each question with the assumption to design on if the person who asked says go ahead anyway. stop: only what would have to change first and who can change it, with no assumptions. Delete if the verdict is go and there are none. -->

| # | Question | If we go ahead anyway, assume |
|---|---|---|
| 1 | {{}} | {{}} |

## For design-builder

{{Two to four bullets: the job to make easier, the constraints that shape the layout, what's out of scope. For a stop, write "Don't design this", why, and the nearest version that would be allowed.}}
