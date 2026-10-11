# Sources

> Answers: Where do the full strategy and requirements docs live, and who owns them?
> Reviewed: 2026-10-12

Strategy decks, research, roadmaps and PRDs usually live somewhere else: a wiki, Notion, a shared drive. Don't copy them into `product/`. List them here, so people and agents can find the original, and so the Source columns in `users.md`, `jobs.md` and `constraints.md` point to something.

If the agent can open these links, through a Notion or Google Drive connector for example, `frame` reads the parts a PRD relies on (see step 2 of its SKILL.md).

<!-- replace: one row per doc. Plane is strategy (why, and for whom) or scope (what we build and don't). -->

| Doc | Plane | Where | Owner | Last checked |
|---|---|---|---|---|
| (example) Product plan 2026 | strategy | (example) link to the planning doc | (example) Product lead | 2026-10-12 |
| (example) Interviews, 2026-08 (12 agents, 5 team leads) | strategy | (example) link to the research folder | (example) Design lead | 2026-10-12 |
| (example) Support tickets about missed requests, 2026-Q3 | strategy | (example) link to the ticket report | (example) Support lead | 2026-10-12 |
| (example) PRDs | scope | (example) link to the PRD folder | (example) Product lead | 2026-10-12 |
| (example) Data processing agreement | scope | (example) link to the signed agreement | (example) Legal | 2026-10-12 |
| (example) Accessibility policy | scope | (example) link to the policy | (example) Design lead | 2026-10-12 |

## When a doc changes

Nothing in `product/` has to change just because a doc was edited. When a doc changes something `product/` summarizes, like a new group of users, a dropped constraint or a reversed decision, log it in `work/feedback.md` with layer `product`. An owner updates the file through `promote-feedback`.

PRDs for a feature are copied into that feature's `_inputs/` folder by `frame`, so the design keeps the version it was based on.
