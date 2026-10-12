# Approved screens

> Answers: What do the approved screens look like?

Only screens an owner has approved live here. Whatever is merged here is the current reference for that screen. Work in progress stays in `work/features/`.

## Adding a screen

Anyone, person or agent, can prepare it on a new branch. An owner merges it.

1. Settle the option's FB tags first: each one must be `adopted` or `screen-only` in the log, or the check fails. Run `promote-feedback` for any that are still open.
2. Copy the chosen option to `screens/<name>/index.html`. Leave the original in `work/features/`.
3. Change the token path to `../../tokens/tokens.css`. Keep the `?state=` switch.
4. Copy the spec section of the proposal into `screens/<name>/README.md`.
5. Add a row below; that row is the record, so `decisions.md` needs none. If the screen is a new place, or changes what a place shows or where it leads, update `product/structure.md` in the same PR.
6. Run `npm run check` and open a PR. In this folder, hard-coded colors and unknown CSS variables are errors, and any FB tag must be `adopted` or `screen-only` in the log.

## Screens

<!-- add a row for each screen -->

| Screen | Job it does | Approved | Came from |
|---|---|---|---|
|  |  |  |  |
