---
name: design-builder
description: Turn a PRD into a one-page proposal with research, a few options, a recommendation and a spec. Use for "design this screen", "give me some options", "explore layouts".
argument-hint: <path to PRD>
---

# design-builder

Walk through what a designer does in their head — read, frame, research, explore, pick, write it up — and end with something a person can review. Don't settle on one option before step 6.

Use the PRD at the path you were given. If there isn't one, ask for a path or pasted text.

## Where things go

Start by creating `work/features/<yyyymmdd>-<slug>/`. The slug is a few lowercase words joined with hyphens. Redoing the same thing later? Same slug, new date — never overwrite.

```
work/features/<yyyymmdd>-<slug>/
  _inputs/         a copy of the PRD and anything else you were given
  research/        screenshots, and sources.md (source, what you noticed, what to borrow)
  options/         a.html, b.html, c.html — working options
  proposal.html    the one-page proposal
  review.md        what design-review found
```

Never write to `design-system/`.

## What to read

- The Build column in `design-system/INDEX.md`.
- If this slug was explored before, its last `proposal.html` and `review.md`.
- Rows in `work/feedback.md` about the same screen or components, so earlier `local` decisions carry over.

## Steps

1. **Read.** Copy the PRD into `_inputs/` first. Pasted text goes to `_inputs/spec.md`.

2. **Frame it.** In one or two sentences: whose job, on which screen, gets better how. Decide whether this is new ground or an improvement. On new ground, stop at options and let a person choose — step 6 becomes a comparison.

3. **Ask, one question at a time.** Only ask what would change the design, five questions at most. If nobody answers, write down your assumption and mark it "open (assumed)".

4. **Research.** Inside: the closest screens in `design-system/screens/` ("none" if it's empty). Outside: two to four products that solve the same job. Save screenshots in `research/` and write the source, what you noticed and what to borrow in `research/sources.md`. Borrow reasons, not looks. Offline? Write what you know and mark the source "unverified".

5. **Explore.** Pick two or three axes — list-first or detail-first, batch or one at a time, show everything or reveal gradually — and build about three options that land in different places. No color swaps.
   - Each option is one working HTML file in `options/`, loading tokens with `<link rel="stylesheet" href="../../../../design-system/tokens/tokens.css">`.
   - Follow R-01 for values. If you need something the design system doesn't have, build it, tag the line with an FB ID and log it as `missing` or `deviation`.
   - Support `?state=loading|empty|error|done` (see `patterns/GUIDE.md`) without showing a switcher on screen (R-05).
   - Write real copy, following `writing.md`.

6. **Recommend.** Pick one, and tie the reason to the PRD and to a principle (P-xx). Say what the others were missing. Then write the spec: structure, behaviour in each state, copy, edge cases, open questions.

7. **Write it up.** Copy `templates/proposal.html` to `proposal.html` and fill in every `{{ }}`.

8. **Review before you hand it over.** Run `design-review` on the pick and fix anything marked must. Add new FB IDs to the proposal. Then share the path with a three-line summary, and ask whether to open a PR.

## Done when

- [ ] The problem fits in one or two sentences
- [ ] Research has sources, or says "unverified"
- [ ] The options differ on real axes
- [ ] The pick is tied to the problem and a P-xx (on new ground, a comparison is enough)
- [ ] Normal plus four states work through `?state=`
- [ ] `npm run check` shows nothing for this feature
- [ ] `review.md` exists and has no open must-fix items
- [ ] Every rule you broke is tagged and logged
- [ ] Nothing in `design-system/` changed
