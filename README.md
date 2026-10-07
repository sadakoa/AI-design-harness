# AI Design Harness

A small starter kit for teams where people and AI agents design UI together.

Most design knowledge lives in designers' heads. This repo is a place to write it down so an agent can use it too: each decision lives in exactly one file, agents read only what the task needs, and whatever a review teaches you flows back into those files.

![Build, review, log, promote — and the design system in the middle](docs/images/loop.svg)

## The three ideas

1. **One question, one file.** "What color is this?", "Which component?", "How do we word errors?" — each has exactly one home.
2. **Build wide, review narrow.** When building you read to open up options. When reviewing you read to check, one lens at a time.
3. **Feed reviews back.** Findings go into a log. A person decides what becomes a rule.

[How it works](docs/how-it-works.md) explains each one, with pictures. There's also a short [slide deck](docs/slides/ai-design-harness.pdf); to present it from a browser, open `docs/slides/index.html`.

## What's inside

```
design-system/      the source of truth — start at INDEX.md
work/features/      explorations, proposals, reviews
work/feedback.md    the feedback log
.claude/skills/     design-builder, design-review, promote-feedback
scripts/            check and build-tokens
```

`.agents/skills` points to the same skills, for Codex.

## Using it

| To | Run | You get |
|---|---|---|
| Design a screen | `/design-builder path/to/prd.md` | A one-page proposal in `work/features/` |
| Review it | `/design-review path/to/proposal.html` | `review.md`, plus new rows in the feedback log |
| Turn feedback into rules | `/promote-feedback` | A PR against `design-system/` for a person to merge |
| Keep an approved screen | Follow [screens/README.md](design-system/screens/README.md) | `design-system/screens/<name>/` |

The `/name` form is Claude Code. In Codex, ask for the skill by name.

## Getting started

1. Replace everything marked `(example)` or `<!-- replace -->` with your own product. Delete the example rows and start IDs at 01.
2. Write component specs as you need them, starting from `components/_template.md`.
3. Put your own handles in `.github/CODEOWNERS`.
4. Build the tokens and run the check (Node 20+, no dependencies):

```bash
npm run tokens
```

```bash
npm run check
```

The check also runs on every pull request.

On Windows, run `git config core.symlinks true` before cloning so `.agents/skills` works.

## Credits

Built on ideas from Canary's [NestUI](https://github.com/SSK-TBD/NestUI) ([article](https://note.com/canary_inc/n/n538adfe8daee)) and Reiwa Travel's [design-builder write-up](https://note.com/toitoi1618/n/ndf35dbd2585b).
