---
name: frame
description: Check a PRD against the product before anyone designs it — who it's for, which job it serves, whether it clashes with past decisions or constraints, and whether it's one screen or a flow. Use for "should we build this", "frame this PRD", and before design-builder.
argument-hint: <path to PRD>
---

# frame

Answer "should we build this, and what exactly?" before any design work. A clean UI for the wrong problem is the most expensive mistake this harness can make.

- **In:** a PRD, as a path or pasted text.
- **Out:** `framing.md` in a new feature folder, with a verdict: **go**, **decide first** or **stop**.
- **Asks:** only when the PRD can't be matched to a user or a job. If nobody answers, write the question under "Questions for a product owner" and carry on.

Never edit `product/`. If something there is missing or out of date, log it.

## Steps

1. **Start the feature folder.** Create `work/features/<yyyymmdd>-<slug>/` (design-builder uses the same folder later) and copy the PRD into `_inputs/`. Pasted text goes to `_inputs/prd.md`.

2. **Read** the Frame column of `product/INDEX.md`. Skim `design-system/screens/README.md` to see which screens exist, and the `framing.md` of other open features in `work/features/`, so PRDs that pull against each other get caught.

3. **Match the PRD to the product.**
   - Who: which users (U-xx).
   - Job: which jobs (J-xx), with their confidence. If no job covers the PRD's main goal, write "none" and say what the missing job would be. Don't invent one.
   - Concepts: which ones it touches. A new name for something already in `concepts.md` only needs logging. A new concept — something the product doesn't have yet — affects the verdict.
   - Constraints (CON-xx) it touches.
   - Decisions (PD-xx) it supports or goes against.
   - Principles (PP-xx) that pull for or against it.

4. **Decide the scope.** `screen` (one screen) or `flow` (several screens doing one job together). For a flow, list the screens, whether each is approved in `design-system/screens/`, whether it's live in the product today, and how someone moves between them.

5. **Give a verdict.** Check in this order; the first that matches wins.
   1. **stop** — it goes against a product decision or breaks a constraint. Say which, and what would have to change first (usually a new decision by a product owner).
   2. **decide first** — no job covers the main goal; or the main job is only a hypothesis and the work is big (a flow or a new screen); or it brings in a new concept. List the questions for a product owner, and for each, the assumption to design on if they say go ahead anyway.
   3. **go** — none of the above.

6. **Write** `framing.md` from `templates/framing.md`. Cite IDs; don't restate what they say. If `product/` still has `(example)` content, say so in the Context line.

7. **Log** anything that should change `product/` — a missing job, a new name or concept, a decision that looks out of date, two PRDs that disagree — in `work/feedback.md` with layer `product` and status `open`. If an open row already covers it, add this feature to that row's Where instead.

For a small change to a known job, keep it short: name the user, the job and the scope, and say go.
