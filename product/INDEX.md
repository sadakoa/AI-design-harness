# Product index

> Answers: Which product file answers which question, and what should I read for this task?

`product/` says what to build and why. `design-system/` says how it should look and behave. Read only what's marked for the task you're on.

The files are grouped by the five planes of user experience, from Jesse James Garrett's *The Elements of User Experience*: strategy (why, and for whom), scope (what we build and don't), structure (how it's organized), skeleton and surface. The last two live in `design-system/`. A file that spans two planes sits under its main one.

Strategy and scope usually have full docs elsewhere. Keep a short version here of each user, job, principle, constraint and decision that work gets checked against, and list the full docs in `sources.md`.

● always · ○ only the entries the framing cites · blank: skip

| File | Answers | Frame | Build | Review | Promote |
|---|---|---|---|---|---|
| `INDEX.md` | Which product file answers which question, and what should I read for this task? | ● | ● | ● | ● |

### Strategy: why, and for whom

| File | Answers | Frame | Build | Review | Promote |
|---|---|---|---|---|---|
| `users.md` | Who uses the product? | ● | ○ | ○ | ● |
| `jobs.md` | What are they trying to get done? | ● | ○ | ● | ● |
| `principles.md` | What does the product stand for, and how do we make trade-offs? | ● | ○ | ○ | ● |
| `sources.md` | Where do the full strategy and requirements docs live, and who owns them? | ● |  |  | ○ |

### Scope: what we build, and what we don't

| File | Answers | Frame | Build | Review | Promote |
|---|---|---|---|---|---|
| `constraints.md` | What limits what we can build? | ● | ○ | ○ | ● |
| `decisions.md` | Which product decisions have we made, and why? | ● |  |  | ● |

### Structure: how it's organized

| File | Answers | Frame | Build | Review | Promote |
|---|---|---|---|---|---|
| `concepts.md` | What are the core things in our domain, and what do we call them? | ● | ○ | ○ | ○ |
| `structure.md` | What places does the product have, and how do people move between them? | ● | ○ | ○ | ○ |

## When you write here

- Mark every user and job as `fact` (we've seen it), `hypothesis` (we believe it) or `open` (we don't know yet), and say where it came from. Agents treat hypotheses as hypotheses.
- Put a `> Reviewed: YYYY-MM-DD` line under the Answers line, and update it when you check the file is still true. `npm run check` warns after 90 days.
- Don't copy strategy decks, roadmaps or PRDs here. Write a short version of what work gets checked against (a job, a constraint, a decision), and add the full doc to `sources.md`. Then this folder changes when the facts do, not every time a doc is edited.
