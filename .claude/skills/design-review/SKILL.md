---
name: design-review
description: Review a screen or design proposal against the design system, one lens at a time (parts, layout, copy). Use for "review this screen", "check this design", "critique this UI".
argument-hint: <path to an HTML file or proposal.html>
---

# design-review

Find where a design drifts from its intent and from the rules. Report, don't fix — unless you're asked to. Being called from step 8 of design-builder counts as being asked.

Review the path you were given. If there isn't one, ask.

## Steps

1. **Know the intent.** Which screen, whose job? For a proposal, read its problem statement. Ask if it's unclear.

2. **Let the machine go first.** Run `npm run check`, plus anything in `rules.md` that's caught by a check.

3. **Look at it rendered.** If you can open a browser, capture it 1280px and 768px wide, and in each `?state=`. Watch the console for errors, and make sure hidden things are actually hidden. The iframes in `proposal.html` come out blank in full-page captures, so open the files in `options/` directly.

4. **Whole screen first,** using the quality bar in `principles.md`.

5. **Then one lens at a time.** Before each lens, re-read only the files the INDEX marks for it. Don't mix lenses.

   | Lens | Look for |
   |---|---|
   | Parts | The right component for the job? Its states covered? Values that break R-01? |
   | Layout | One main thing? Levels and layout as in `patterns/GUIDE.md`? All four screen states? In line with approved screens? |
   | Copy | Words from the table? Patterns followed? Anything that shouldn't be on screen? |

6. **Write it down.** Findings go in `review.md` in the same feature folder. If the target isn't in `work/features/`, just return them.

7. **Log what travels.** Anything likely to come up elsewhere, or that the design system had no answer for, goes into `work/feedback.md` as `open`. List the new IDs at the end of `review.md`.

## Findings

| # | Lens | Severity | Where | What's off | Based on | Fix |
|---|---|---|---|---|---|---|

Severity is **must** (breaks a rule or blocks the job), **should** (a principle says it would be better) or **taste** (nothing in the design system backs it).

"Based on" is an ID or a file and heading, like `rules.md` R-03 or `principles.md` P-02. If you can't point to anything, it's taste — and the missing answer is worth logging.
