# Instructions for agents

Two folders hold the truth. `product/` says what to build and why. `design-system/` says how it should look and behave. Each has an `INDEX.md` that tells you what to read for the task you're on. Start there, and don't read whole folders.

## Working with people

People won't name a skill or a file. They'll say what they want, in their own words and language. Work out which case below it is and follow it. They should never have to learn the harness to use it.

- Keep the bookkeeping to yourself. Framings, log rows, IDs and paths are for you and the owners. In the conversation, give the person what they need: an answer, a recommendation, or one question.
- Ask one or two questions at a time, in plain words, and only ones that change what you'd do.
- Reply in the language they wrote in, in about 90 words (about 250 characters in Japanese). No IDs, @handles or harness words unless they used them first.
- Any clear yes is a go-ahead: "sure", "go for it", "進めて".
- At the end, send one reply, not one per skill.

## When someone asks…

| They say or share something like | Do this |
|---|---|
| An idea, a PRD, "can we build…", a request from Sales or a PM | `frame` it, then `design-builder` if it's a go or they say go ahead |
| "Check this page", a screen someone built | `design-review` it; no framing needed |
| Feedback on a proposal: "change B so…" | `design-builder`, revising (see "Revising a proposal" there) |
| A word or label should change | `frame` it (short), then log it for `promote-feedback` |
| Research, data, a note from Sales or Legal | Log it in `work/feedback.md` with its source, then `promote-feedback` up to its Ask step |
| A change to the design system itself: a theme, colors, a new component | Log it with layer `design`, then `promote-feedback`; no mockups |
| "This design is approved, add it to the design system" | Follow `design-system/screens/README.md` |
| "How do I use this?" | Answer from `README.md` in a few lines, and offer to start on what they need |
| Only a name or a link, no goal | Ask what problem it solves before anything else |
| "Set this up for our repo" | `bootstrap` |
| "Go through the feedback" | `promote-feedback` |

## Rules

- Before designing anything, frame it: `frame` checks the request against `product/`.
- Entries in `product/` marked `hypothesis` or `open` aren't facts. Say so whenever you rely on one.
- `design-system/tokens/tokens.json` is the only source for values. If anything disagrees with it, trust the tokens and log the mismatch in `work/feedback.md`.
- If a file still has `(example)` content, use it as a placeholder and say so in your output.

## Skills

| Task | Skill |
|---|---|
| Set the harness up for an existing product | `bootstrap` |
| Check a request before anyone designs it | `frame` |
| Design a screen or a flow, or revise a proposal | `design-builder` |
| Review a screen, flow or proposal | `design-review` |
| Turn feedback into product or design changes | `promote-feedback` |

## Don't

- Write outside `work/`, except on a new branch as a pull request an owner merges: `bootstrap`'s drafts, the changes `promote-feedback` got a yes for, and an approved screen going into `design-system/screens/`. Owners are listed in `.github/CODEOWNERS`.
- Edit tokens or the component inventory that `sync.json` maps. They come from the product's code; change them there and run `npm run sync`.
- Add components, colors or wording to the design system. If you need something that isn't there, build it inside `work/`, tag the line with a feedback ID and log it.
- Guess. Ask, or write it down as an open question and keep going.
- Make people learn the harness. Don't ask them to run a skill, open a file or look up an ID.
