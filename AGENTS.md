# Instructions for agents

Two folders hold the truth. `product/` says what to build and why. `design-system/` says how it should look and behave. Each has an `INDEX.md` that tells you what to read for the task you're on. Start there, and don't read whole folders.

## Working with people

People won't name a skill or a file. They'll say what they want, in their own words and language. Work out which case below it is and follow it. They should never have to learn the harness to use it.

- Keep the bookkeeping to yourself. Framings, log rows, IDs and paths are for you and the owners. In the conversation, give the person what they need: an answer, a recommendation, or one question.
- Ask one or two questions at a time, in plain words, and only ones that change what you'd do.
- Reply in the language they wrote in, in about 90 words (about 250 characters in Japanese). No IDs, @handles or harness words unless they used them first.
- Any clear yes is a go-ahead: "sure", "go for it", "進めて".
- Size the work yourself (small, medium or large; see `discover`) and say it in one line. They can change it.
- At the end, send one reply, not one per skill.

## When someone asks…

| They say or share something like | Do this |
|---|---|
| An idea, a PRD, "can we build…", a request from Sales or a PM | `discover` it at the size it needs (small skips this), `frame` it, then `design-builder` if it's a go or they say go ahead |
| "Look into…", "what do we know about…", a problem with no PRD | `discover` it; it drafts a PRD when there isn't one |
| "Check this page", a screen someone built | `design-review` it; no framing needed |
| Feedback on a proposal: "change B so…" | `design-builder`, revising (see "Revising a proposal" there) |
| A word or label should change | `frame` it (short), then log it for `promote-feedback` |
| Research, data, a note from Sales or Legal | Log it in `work/feedback.md` with its source, then `promote-feedback` up to its Ask step |
| A change to the design system itself: a theme, colors, a new component | Log it with layer `design`, then `promote-feedback`; no mockups |
| "This design is approved, add it to the design system" | Follow `design-system/screens/README.md` |
| "How do I use this?" | Answer from `README.md` in a few lines, and offer to start on what they need |
| Only a name or a link, no goal | Ask what problem it solves before anything else |
| "Set this up for our repo" | `bootstrap` |
| "Update the harness" | `bootstrap`, updating: it refreshes the harness's own files and leaves your content alone |
| "Go through the feedback" | `promote-feedback` |
| The harness got in the way: "too many questions", "this step is pointless" | Log it in `work/feedback.md` with layer `harness`, naming the skill or script, and carry on with what they asked |
| "Send it to the harness" | `promote-feedback`, harness rows: draft issues for the harness repo, and file them after a yes |

## Rules

These always hold.

- Change `product/` and `design-system/` only on a new branch, as a pull request an owner merges: `bootstrap`'s drafts, the changes `promote-feedback` got a yes for, and an approved screen going into `design-system/screens/`. Everything else you make goes in `work/`. Owners are listed in `.github/CODEOWNERS`.
- `design-system/tokens/tokens.json` is the only source for values. If anything disagrees with it, trust the tokens and log the mismatch. Tokens and components that `sync.json` maps come from the product's code: change them there and run `npm run sync`.
- Don't add components, colors or words to the design system yourself. If you need something that isn't there, build it in `work/`, tag the line with a feedback ID and log it.
- Say where every claim comes from. Entries marked `hypothesis` or `open` aren't facts, and neither are your guesses: say which is which, and what you couldn't check or open.
- Keep customer and personal details where they are. Never copy them into the repo, a URL or anything public, like an issue on the harness repo.
- Don't promise dates or decisions that belong to someone else.
- If a file still has `(example)` content, use it as a placeholder and say so.

## Everything else is a default

The skills describe the usual path: look into bigger requests first, frame before designing, explore a few options, keep replies short. Their numbers, like three options, five questions or about 90 words, are starting points. When a request calls for something else, do that instead and say why in one line. Don't make people learn the harness: never ask them to run a skill, open a file or look up an ID.

## Notice things

When you learn something nobody asked about, in the product, the design system or the harness itself, say so in one line and log it where it belongs. A pattern across requests, a decision whose reason no longer holds, a step that didn't help: that's how the harness and the product get better.

## Skills

| Task | Skill |
|---|---|
| Set the harness up for an existing product, or update it | `bootstrap` |
| Find out what's already known, with or without a PRD | `discover` |
| Check a request before anyone designs it | `frame` |
| Design a screen or a flow, or revise a proposal | `design-builder` |
| Review a screen, flow or proposal | `design-review` |
| Turn feedback into product or design changes | `promote-feedback` |
