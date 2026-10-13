# Results

One file per eval run, named `<yyyymmdd>-<commit>.md`. Keep them, so each run can be compared with the last.

Each file has:

- the commit, the date, and which scenarios ran;
- a table with one row per scenario: the "Every scenario" marks (helped, grounded, proportion, boundaries, noticed), the scenario's own points, and time taken;
- what the agents noticed that nobody asked about;
- harness problems, with file and line, grouped where several runs hit the same one;
- what changed since the previous file: better, worse, the same.
