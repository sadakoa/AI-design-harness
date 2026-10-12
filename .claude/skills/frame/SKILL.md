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

2. **Read** the Frame column of `product/INDEX.md`. If you can open the docs in `product/sources.md` that the PRD relies on, read the parts it touches; if you can't, work from the summaries in `product/`. If the PRD names a doc that isn't listed there, say so in the Sources line and log it. For a change to a screen or to words that exist today, also skim `design-system/foundations/rules.md`, `design-system/components/GUIDE.md` and `design-system/foundations/writing.md`, so you see what the design system already says. Skim `design-system/screens/README.md` to see which screens exist, and the `framing.md` of other open features in `work/features/`, so PRDs that pull against each other get caught.

3. **Match the PRD to the product.**
   - Who: which users (U-xx).
   - Job: which jobs (J-xx), with their confidence. If no job covers the PRD's main goal, write "none" and say what the missing job would be. Don't invent one.
   - Concepts: which ones it touches. A new name for something already in `concepts.md` only needs logging. A new concept — something the product doesn't have yet — affects the verdict.
   - Places in `structure.md` it changes, and any it adds. New places go in the framing, not the log.
   - Constraints (CON-xx) it touches.
   - Decisions (PD-xx) it supports or goes against, and any whose Why the PRD's premise changes (say, a decision made for small teams when the PRD plans for large ones).
   - Principles (PP-xx) that pull for or against it.

4. **Decide the scope.** `screen` (one screen) or `flow` (several screens doing one job together). For a flow, list the screens, whether each is approved in `design-system/screens/`, whether it's live in the product today, and how someone moves between them. `structure.md` says which places exist and how they connect.

5. **Give a verdict.** Check in this order; the first that matches wins.
   1. **stop** — it goes against a product decision or breaks a constraint. Say which, and what would have to change first (usually a new decision by a product owner). If the clash depends on how you read an unclear PRD, say which reading, and how the PRD could be changed to avoid it.
   2. **decide first** — no job covers the main goal (unless it's a fix to a place that exists today, backed by a principle or constraint and by evidence from real use: that's a go, and you log the missing job); or the main job is only a hypothesis and the work is big (a flow or a new screen); or it brings in a new concept. List the questions for a product owner, and for each, the assumption to design on if they say go ahead anyway.
   3. **go** — none of the above.

6. **Write** `framing.md` from `templates/framing.md`. Start with the reply for the person who asked, in their words rather than IDs; a PM or someone from Sales should be able to stop reading there. Below it, cite IDs and don't restate what they say. If `product/` still has `(example)` content, say so in the Context line. For a stop, keep it short: skip the Screens table, and list only what would have to change.

7. **Log** anything that should change `product/` — a missing job, a new concept, a place the PRD says exists that `structure.md` doesn't have or calls something else, a decision that looks out of date, two PRDs that disagree — in `work/feedback.md` with layer `product` and status `open`. A word on screen that people disagree about goes in with layer `design`: its home is `design-system/foundations/writing.md`. If an open row already covers it, add this feature to that row's Where instead.

For a small change to a known job, keep it short: name the user, the job and the scope, and say go. If the change is only words on screen, there's nothing to design: log it for `promote-feedback` and say so in the reply.
