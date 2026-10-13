# Evals

Use these to see how the harness does after you change it. Each scenario is a request someone might bring: a designer with a PRD, a PM with a one-liner, Sales in Slack, an engineer with a page they built, a researcher with notes. A fresh agent handles each one in its own copy of the harness, and another agent grades the outcome.

They check outcomes, not whether the agent followed every step. A good run helps the person who asked, stays grounded and in proportion, keeps to the few hard rules, and ideally notices something nobody asked about.

| File | What it is |
|---|---|
| `scenarios.json` | The requests, who makes them, their input files, and how questions get answered |
| `rubric.md` | What a good outcome looks like, for every scenario and for each one |
| `inputs/` | PRDs, notes and pages the scenarios use |
| `fixtures/` | A small product repo (Helpline's own app, with its components and history) for setting up and designing in a real codebase |
| `prompt.md` | What each agent is told |
| `grade.md` | What each grader is told |
| `prepare.mjs` | Makes the copies and the prompts |
| `results/` | One file per run, so you can compare versions |

## Running them

Ask the agent in this repo to run the evals (all of them, or the ones a change touches). It should:

1. Run `node evals/prepare.mjs` with the scenario IDs, or none for all of them. Add `--ref <commit>` to test an older version. It makes one git worktree per scenario in a temporary folder, adds the inputs, removes `examples/` and `evals/` from the copies so the agents can't see the rubric, and writes `<id>.prompt.md` for each. Scenarios with a `repo` get a product repo built from a fixture, with its own commit history, next to a copy of the harness to install from.
2. Start one agent per scenario with its prompt, all at once. Don't tell them they're being tested.
3. When they're done, grade each run with `grade.md` against `rubric.md`, one grader per run or a few runs per grader.
4. Write `results/<yyyymmdd>-<commit>.md`: per scenario, the marks, what the agent noticed, and the harness problems; then what changed since the last results file.
5. Run `node evals/prepare.mjs --clean <folder>` to remove the copies.

All eighteen take a while: scenarios with design work run 15 to 25 minutes each, in parallel. Run the ones a change touches as you go, and all of them now and then.

## Adding a scenario

Add it to `scenarios.json`, put its files in `inputs/`, and add a section with the same ID to `rubric.md`. Good candidates are requests that went badly in real use: the harness got in the way, or the result missed something.
