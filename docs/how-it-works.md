# How it works

![How it fits together](images/flow.svg)

## Check the problem first

A design can follow every rule and still be the wrong thing to build. So before any design work, `/frame` reads the PRD against `product/`:

- **Who** it's for, and **which job** it makes easier. If no job fits, that's the first thing to fix.
- **Decisions** it supports or goes against, and **constraints** it would break.
- **Scope:** one screen, or a flow of several.

It answers **go**, **decide first** (a product owner has questions to answer) or **stop** (it goes against a decision or breaks a constraint). Only a go reaches design. Try `/frame examples/prd/community-forum.md` to see a stop.

`product/` keeps facts and guesses apart. Every user and job is marked `fact`, `hypothesis` or `open`, with a source, so a confident-sounding PRD built on a guess gets caught.

## One question, one file

![Each file in design-system/ answers one question](images/files.svg)

Guidance tends to pile up in one long document: principles, values, component behavior, layout and one-off decisions, all mixed together. It gets repeated, it drifts, and nobody knows which copy is right.

Here every question gets one file, and each folder's `INDEX.md` is the map: [product/INDEX.md](../product/INDEX.md) for what to build and why, [design-system/INDEX.md](../design-system/INDEX.md) for how it looks and behaves. When something changes there's one place to edit, and the agent opens a short, named list of files for each task instead of everything. During a build it reads only the product entries the framing cites.

Don't split by length. Split when something is said twice, when you can't name the one place to change it, or when team-wide rules and one-screen decisions are tangled up.

## Build wide, review narrow

![Building reads to explore options; reviewing checks one area at a time](images/build-vs-review.svg)

Building and reviewing are different jobs, so they read different things. Building pulls in principles, rules, writing, layouts and approved screens, then spreads out into a few real options. Reviewing first asks whether the design does the job from the framing, then checks one area at a time — components, layout, copy — and only re-reads the files for that area. Each finding names the job, principle or rule it's based on, or says plainly that it's a matter of taste.

## Screens and flows

Some work is one screen. Some is a flow: a few screens doing one job together, like inbox → request → hand off → back to the inbox. The framing says which. For a flow, each option holds every screen in one file (`?screen=` picks one, and the links work), the options differ in how the screens split the job, and the review checks the way in, the way out, going back, and that the same thing sits in the same place on every screen.

## Feed what you learn back

![A log entry starts open and ends adopted, screen-only or dropped](images/feedback.svg)

Anything that could matter beyond one screen goes into [the feedback log](../work/feedback.md): review findings, and observations from real use like support tickets or analytics. Each entry has a layer: `product` if we built the wrong thing, `design` if we built it the wrong way.

Once a week an owner runs `/promote-feedback`, which groups the entries and suggests what to do with each. The owner decides:

- **adopted** — `product/` or `design-system/` changes, in a pull request, and the matching `decisions.md` gets a row
- **screen-only** — it stays a decision for that one screen
- **dropped** — it stays in the log, with the reason

The rules for when to promote are in `work/feedback.md`.

## Running it as a team

Owners are the people listed in `.github/CODEOWNERS`: product owners for `product/`, design owners for `design-system/`.

For the first few months, only owners change those folders. Collect findings in the log and decide once a week until the output feels steady. Then let others open pull requests too; the UI text rules in `writing.md` are a good place to start.

Once there are two or more owners, turn on branch protection with "Require review from Code Owners". GitHub won't let you approve your own pull request, and some plans don't offer branch protection on private repos. Until then, wait a day, then reread the diff before merging your own pull request.

If a pull request comment points out something that applies elsewhere, whoever wrote it adds a row to the log.
