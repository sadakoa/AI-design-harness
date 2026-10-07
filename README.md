# AI Design Harness

A template repo for teams that design UI with AI agents (Claude Code or Codex), with or without a designer on the team.

You write your design rules down as small files. An agent uses them to draft and review screens. When a review turns up something new, an owner decides whether it becomes a rule. The "harness" is that set of files, three skills and one check that keeps an agent inside your rules.

![Build, review, log, promote — and the design system in the middle](docs/images/loop.svg)

## The three ideas

1. **One question, one file.** "What color is this?", "Which component?", "How do we word errors?" — each has exactly one home.
2. **Build wide, review narrow.** Building explores a few real options. Reviewing checks one area at a time: components, layout, then copy (the UI text).
3. **Feed reviews back.** Findings go into a log. Once a week an owner promotes the ones that matter — turns them into rules — and the next build reads them.

[How it works](docs/how-it-works.md) explains each one, with pictures. There's also a short [slide deck](docs/slides/ai-design-harness.pdf); to present it from a browser, open `docs/slides/index.html`.

## What you get

For each screen, a one-page HTML proposal: research notes, about three clickable mockups, a recommendation with reasons, a spec, and a review. You open it in a browser.

![One of three mockups from the example proposal: a support inbox grouped by priority](docs/images/example-option-a.png)

That's one of the three mockups from [a real example](examples/support-inbox/), made from a made-up PRD for a support inbox.

It doesn't write production code or use your component library. It gets you to a reviewed design; building it is still your job.

## Your first hour

1. **Get the files.** Use this repo as a template for a new repo. Or copy `design-system/`, `work/`, `.claude/skills/`, `scripts/` and `AGENTS.md` into your product repo, add the two scripts from `package.json`, and if you already have a `CLAUDE.md`, add the line `@AGENTS.md` to it.
2. **Fill in the minimum.** In `design-system/foundations/principles.md`, write who the product is for and your quality bar. In `design-system/tokens/tokens.json`, put your real colors (the values there are placeholders). Run `npm run tokens`. Everything else can stay as `(example)` for now; the agent will tell you when it relied on one.
3. **Write a short PRD** (product requirements doc) for one screen: who uses it, what job they're doing, what's wrong today, what has to be on it. Save it anywhere, e.g. `work/prd/invoice-list.md`.
4. **Run** `/design-builder work/prd/invoice-list.md`. It asks up to five questions, builds the options and reviews its own recommendation.
5. **Open** `work/features/<date>-<name>/proposal.html` in a browser.

## Setting it up for your team

- Replace the rest of the `(example)` content as you go. Delete `FB-01` in `work/feedback.md` and `D-01` in `design-system/decisions.md` together, or the check will complain.
- Keep the rule IDs `R-01`–`R-05` (reword them freely); the skills and the check refer to them. Add your own from `R-06`.
- Put your team's GitHub usernames in `.github/CODEOWNERS`. These people are the **owners**: they approve every change to `design-system/`. No designer on the team? Pick one owner anyway.
- `npm run check` runs on every pull request. It needs Node 20 or later and nothing else.

## Everyday use

| To | Run | You get |
|---|---|---|
| Design a screen | `/design-builder path/to/prd.md` | A reviewed proposal in `work/features/` |
| Review a screen made some other way | `/design-review path/to/page.html` | `review.md`, plus new entries in the feedback log |
| Turn feedback into rules (weekly) | `/promote-feedback` | A pull request against `design-system/` for an owner to merge |
| Keep an approved screen | Follow [screens/README.md](design-system/screens/README.md) | `design-system/screens/<name>/` |

Skills are saved instructions for the agent. The `/name` form is Claude Code; in Codex, ask for the skill by name.

IDs you'll see: `P-01` principle, `R-01` rule, `D-01` decision, `FB-01` feedback entry. They're never renumbered.

## Not for

Brand-new kinds of screens. The agent can draft options to compare, but a designer should choose and finish them. And if you only need lots of rough ideas fast, one long `DESIGN.md` is enough.

## Notes

On Windows, clone with `git clone -c core.symlinks=true <url>` so `.agents/skills` (the Codex copy of the skills) works.

Built on ideas from Canary's [NestUI](https://github.com/SSK-TBD/NestUI) ([article](https://note.com/canary_inc/n/n538adfe8daee)) and Reiwa Travel's [design-builder write-up](https://note.com/toitoi1618/n/ndf35dbd2585b).
