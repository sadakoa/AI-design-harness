# Product index

> Answers: Which product file answers which question, and what should I read for this task?

`product/` says what to build and why. `design-system/` says how it should look and behave. Read only what's marked for the task you're on.

**Plane** is where a file sits among the five planes of user experience: strategy (why, and for whom), scope (what we build and don't), structure (how it's organized), skeleton and surface. The last two live in `design-system/`. Strategy and scope usually live in docs elsewhere, so keep only what designs cite by ID here, and list the full docs in `sources.md`.

● always · ○ only the entries the framing cites · blank: skip

| File | Answers | Plane | Frame | Build | Review | Promote |
|---|---|---|---|---|---|---|
| `INDEX.md` | Which product file answers which question, and what should I read for this task? | — | ● | ● | ● | ● |
| `sources.md` | Where do the full strategy and requirements docs live, and who owns them? | strategy, scope | ● |  |  | ○ |
| `users.md` | Who uses the product? | strategy | ● | ○ | ○ | ● |
| `jobs.md` | What are they trying to get done? | strategy | ● | ○ | ● | ● |
| `principles.md` | What does the product stand for, and how do we make trade-offs? | strategy | ● | ○ | ○ | ● |
| `constraints.md` | What limits what we can build? | scope | ● | ○ | ○ | ● |
| `decisions.md` | Which product decisions have we made, and why? | strategy, scope | ● |  |  | ● |
| `concepts.md` | What are the core things in our domain, and what do we call them? | structure | ● | ○ | ○ | ○ |
| `structure.md` | What places does the product have, and how do people move between them? | structure | ● | ○ | ○ | ○ |

## When you write here

- Mark every user and job as `fact` (we've seen it), `hypothesis` (we believe it) or `open` (we don't know yet), and say where it came from. Agents treat hypotheses as hypotheses.
- Put a `> Reviewed: YYYY-MM-DD` line under the Answers line, and update it when you check the file is still true. `npm run check` warns after 90 days.
- Don't copy strategy decks, roadmaps or PRDs here. Write down the part designs cite (a job, a constraint, a decision) with its source, and add the full doc to `sources.md`. Then this folder only changes when the facts do, not every time a doc is edited.
