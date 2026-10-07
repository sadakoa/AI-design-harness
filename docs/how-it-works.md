# How it works

## One question, one file

![Each file in design-system/ answers one question](images/files.svg)

Design guidance tends to pile up in one long document: brand, principles, values, component behaviour, layout and one-off screen decisions, all mixed together. It gets repeated, it drifts, and nobody knows which copy is right.

Here every question gets one file, and [INDEX.md](../design-system/INDEX.md) is the map. When something changes there's one place to edit, and an agent only opens what the task needs.

Don't split by length. Split when something is said twice, when you can't name the one place to change it, or when team-wide rules and one-screen decisions are tangled up. If you mostly need lots of rough ideas fast, one long `DESIGN.md` is fine.

## Build wide, review narrow

![Build reads to open up options; review reads one lens at a time](images/build-vs-review.svg)

Building and reviewing are different jobs, so they read different things. Building pulls in principles, rules, writing, layouts and approved screens, then spreads out into a few real options. Reviewing goes one lens at a time — parts, layout, copy — and only re-reads the files for that lens.

The columns in INDEX.md are the source for who reads what. The skills follow them.

## Feed reviews back

![A log entry starts open and ends adopted, local or dropped](images/feedback.svg)

Anything a review turns up that might matter beyond one screen goes into [the feedback log](../work/feedback.md). Every entry starts `open`. Each week someone runs `/promote-feedback`, which groups the entries and suggests where each one should go. A person decides:

- **adopted** — the design system changes, in a PR, and `decisions.md` gets a row
- **local** — it stays a decision for that one screen
- **dropped** — the row stays, with the reason

When to promote is written in the log itself, so there's only one version of it.

## Running it as a team

For the first few months, only maintainers change `design-system/`. Collect findings in the log and decide in batches until the output feels steady.

Then let designers open PRs too. Copy and guidelines are a good place to start.

Once there are two or more of you, turn on branch protection with "Require review from Code Owners". GitHub won't let you approve your own PR, and some plans don't offer branch protection on private repos. Until then, let your own PR sit for a day and read the diff again before merging.

Whoever spots something in a PR comment that applies elsewhere adds a row to the log.

## What it's not for

Screens with no precedent. Agents can draft options there, but they won't reach a shippable bar on their own. Keep designers on the moments that change the experience, and use this for the steady stream of improvements.
