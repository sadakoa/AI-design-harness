---
name: design-builder
description: Turn a PRD into a one-page proposal with research, a few options, a recommendation and a spec, for one screen or a flow of several. Use for "design this screen", "design this flow", "give me some options", "explore layouts".
argument-hint: <path to PRD>
---

# design-builder

Walk through what a designer does in their head — check the problem, ask, research, explore, recommend, write it up — and end with something a person can review. Don't settle on one option before step 6.

- **In:** a PRD (product requirements doc) for one screen or a flow — a path, or pasted text.
- **Out:** `proposal.html`, three clickable mockups in `options/`, `review.md`, and new rows in the feedback log if anything came up.
- **Asks:** up to five questions, one at a time.
- **Works best with:** web access for research and a browser tool for checking the mockups. Neither is required.

Use the PRD at the path you were given. If there isn't one, ask for a path or pasted text.

## Where things go

Everything goes in the feature folder `frame` creates: `work/features/<yyyymmdd>-<slug>/`. Redoing the same thing later? Same slug, new date — never overwrite.

```
work/features/<yyyymmdd>-<slug>/
  _inputs/         a copy of the PRD and anything else you were given
  framing.md       from frame: who it's for, the job, the verdict, the scope
  research/        screenshots, and sources.md (source, what you noticed, what to borrow)
  options/         a.html, b.html, c.html — clickable mockups
  proposal.html    the one-page proposal
  review.md        what design-review found
```

Never write to `product/` or `design-system/`.

## What to read

- `framing.md`, and only the `product/` entries it cites.
- The Build column in `design-system/INDEX.md`.
- If this slug was explored before, its last `proposal.html` and `review.md`.
- Rows in `work/feedback.md` about the same screens or components, so earlier `screen-only` decisions carry over.

## Steps

1. **Frame it first.** If there's no `framing.md` for this PRD, run `frame`.
   - **stop:** don't design. Pass on the framing's reason and its questions.
   - **decide first:** show the questions and the assumptions the framing lists for each, and ask whether to go ahead on those assumptions. Write the answer into `framing.md`.
   - **go:** carry on.

2. **Define the problem.** In one or two sentences, from the framing: whose job (U-xx, J-xx), on which screen or flow, gets better how.

3. **Ask, one question at a time.** Only ask what would change the design, five questions at most. If nobody answers, write down your assumption and mark it "open (assumed)".

4. **Research.** Inside: the closest screens in `design-system/screens/` ("none" if it's empty). Outside: two to four products that solve the same job. Save screenshots in `research/` and write the source, what you noticed and what to borrow in `research/sources.md`. Copy why it works, not how it looks. Offline? Write what you know and mark the source "unverified".

5. **Explore.** Build about three options that differ in structure, not just in color — list-first or detail-first, batch or one at a time, show everything or reveal gradually. For a flow, they differ in how the screens split the job: separate pages, one page with a side panel, step by step.
   - Each option is one working HTML file in `options/`, loading tokens with `<link rel="stylesheet" href="../../../../design-system/tokens/tokens.css">`.
   - For a flow, the file holds every screen: `?screen=<name>` picks one, and the buttons and links move between them for real. Follow the Flows table in `patterns/GUIDE.md`.
   - Use what `components/inventory.md` lists before inventing anything. Follow R-01 for values. If you need something the design system doesn't have, build it, tag the line with an FB ID and log it as `missing` or `deviation`.
   - Support the four screen states in `patterns/GUIDE.md` through `?state=` in the URL, without showing a switcher on screen (R-05).
   - Write real copy, following `writing.md` and the words in `product/concepts.md`.

6. **Recommend.** Pick one option. Tie the reason to the job (J-xx) and to a principle (P-xx or PP-xx). Say what the others were missing. Then write the spec: structure (for a flow, the screens and how they connect), behavior in each state, copy, edge cases, open questions.

7. **Write it up.** Copy `templates/proposal.html` to `proposal.html` and fill in every `{{ }}`.

8. **Review before you hand it over.** Run `design-review` on the recommended option and fix anything marked must. Add new FB IDs to the proposal. Then share the path with a three-line summary, and ask whether to open a pull request.

## Done when

- [ ] The framing says go, or a person said to go ahead
- [ ] The problem names the user and the job (U-xx, J-xx)
- [ ] Research has sources, or says "unverified"
- [ ] The options differ in structure, not just color
- [ ] The recommendation is tied to the job and a principle (for a screen unlike anything the product has, a comparison is enough)
- [ ] The normal state and all four `?state=` views work; for a flow, every `?screen=` too
- [ ] `npm run check` shows nothing for this feature
- [ ] `review.md` exists and has no open must-fix items
- [ ] Every rule you broke is tagged and logged
- [ ] Nothing in `product/` or `design-system/` changed
