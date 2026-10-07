---
name: design-review
description: Review a screen, flow or design proposal against the product and the design system, one area at a time (components, layout, copy). Use for "review this screen", "check this design", "critique this UI".
argument-hint: <path to an HTML file or proposal.html>
---

# design-review

Find where a design drifts from its intent and from the rules. Report, don't fix — unless you're asked to. Being called from step 8 of design-builder counts as being asked.

- **In:** an HTML page, or a `proposal.html` (then review its recommended option).
- **Out:** `review.md` with findings, and new rows in `work/feedback.md` for anything that applies beyond this screen.

Review the path you were given. If there isn't one, ask.

## Steps

1. **Know the intent.** Which screen or flow, whose job? If there's a `framing.md` next to it, read it and the `product/` entries it cites. Otherwise ask.

2. **Run the automatic checks first.** `npm run check`.

3. **Look at it rendered.** If you can open a browser, capture it 1280px and 768px wide, in each `?state=`, and for a flow, each `?screen=`. Watch the console for errors, and make sure hidden things are actually hidden. The iframes in `proposal.html` come out blank in full-page captures, so open the files in `options/` directly.

4. **Does it do the job?** Does it make the job in the framing (J-xx) easier, and does it keep to the constraints (CON-xx)? Then look at the whole screen with the quality bar in `principles.md`.

5. **Then one area at a time.** Before each area, re-read only the files the INDEX marks for it. Don't mix areas.

   | Area | Look for |
   |---|---|
   | Components | The right component for the job? Its states covered? Values that break R-01? |
   | Layout | One main thing? Levels and layout as in `patterns/GUIDE.md`? All four screen states? In line with approved screens? For a flow: way in, way out, back, and the same thing in the same place on every screen. |
   | Copy | Words from the table in `writing.md` and the concepts in `product/concepts.md`? Patterns followed? Anything that shouldn't be on screen? |

6. **Write it down.** Findings go in `review.md` in the same feature folder. If the target isn't in `work/features/`, just return them.

7. **Log what applies beyond this screen.** Anything likely to come up on other screens, or that `product/` or the design system had no answer for, goes into `work/feedback.md` as `open`, with layer `product` (wrong thing) or `design` (wrong way). List the new IDs at the end of `review.md`.

## Findings

| # | Area | Severity | Where | What's off | Based on | Fix |
|---|---|---|---|---|---|---|

Severity is **must** (breaks a rule or a constraint, or blocks the job), **should** (a principle says it would be better) or **taste** (nothing in `product/` or the design system backs it).

"Based on" is an ID or a file and heading, like R-03, P-02, J-01 or CON-01. If you can't point to anything, it's taste — and the missing answer is worth logging.
