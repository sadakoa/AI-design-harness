You're grading how an AI design agent handled a request, in a copy of the AI Design Harness. Read only; don't edit anything or use git.

- The copy: {{workspace}} (what the agent made is in `work/`; compare with the rest of the copy, which it shouldn't have changed outside the allowed paths)
- The request: {{request}} (from {{who}})
- The agent's own report: {{report}}
- What a good outcome looks like: the "Every scenario" table and the section for {{id}} in {{rubric}}

Judge the outcome, not whether the agent followed the skills step by step. A different path that served the person better counts as good; say why it worked. Check every ID and file it cites against the copy's `product/` and `design-system/`. Run `npm run check` in the copy.

Report in under 400 words:

1. The "Every scenario" rows and the {{id}} points, each ✓ / partial / ✗ with a few words and a short quote with file:line.
2. What the agent noticed that nobody asked about. Was it right, and was it logged where it belongs?
3. Where the harness got in its way: file:line, what went wrong, and a fix in one sentence.
4. One line: would the person who asked be glad they asked?
