# Product index

> Answers: Which product file answers which question, and what should I read for this task?

`product/` says what to build and why. `design-system/` says how it should look and behave. Read only what's marked for the task you're on.

● always · ○ only the entries the framing cites · blank: skip

| File | Answers | Frame | Build | Review | Promote |
|---|---|---|---|---|---|
| `INDEX.md` | Which product file answers which question, and what should I read for this task? | ● | ● | ● | ● |
| `principles.md` | What does the product stand for, and how do we make trade-offs? | ● | ○ | ○ | ● |
| `users.md` | Who uses the product? | ● | ○ | ○ | ● |
| `jobs.md` | What are they trying to get done? | ● | ○ | ● | ● |
| `concepts.md` | What are the core things in our domain, and what do we call them? | ● | ○ | ○ | ○ |
| `constraints.md` | What limits what we can build? | ● | ○ | ○ | ● |
| `decisions.md` | Which product decisions have we made, and why? | ● |  |  | ● |

## When you write here

- Mark every user and job as `fact` (we've seen it), `hypothesis` (we believe it) or `open` (we don't know yet), and say where it came from. Agents treat hypotheses as hypotheses.
- Put a `> Reviewed: YYYY-MM-DD` line under the Answers line, and update it when you check the file is still true. `npm run check` warns after 90 days.
- If your product decisions live somewhere else (Notion, a wiki), link to them here instead of copying the whole thing.
