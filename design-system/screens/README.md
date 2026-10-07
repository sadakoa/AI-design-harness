# Approved screens

> Answers: What do the approved screens look like?

Only screens a person has reviewed and approved live here. Whatever is merged is the latest master for that screen. Work in progress stays in `work/features/`.

## Adding a screen

Anyone, person or agent, can prepare it. A person merges it after approval.

1. Copy the chosen option to `screens/<name>/index.html`. Leave the original in `work/features/`.
2. Change the token path to `../../tokens/tokens.css`. Keep the `?state=` switch.
3. Copy the spec section of the proposal into `screens/<name>/README.md`.
4. Add a row below.
5. Run `npm run check` and open a PR. In this folder, hard-coded colors and unknown CSS variables are errors, and any FB tag must be `adopted` or `local` in the log.

## Screens

<!-- add a row for each screen -->

| Screen | Job it does | Approved | Came from |
|---|---|---|---|
|  |  |  |  |
