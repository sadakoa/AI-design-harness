---
name: bootstrap
description: Set up the harness for an existing product, with or without a design system. Reads the product's code and docs and drafts product/ and design-system/ for an owner to confirm. Use for "set this up for my repo", "bootstrap the harness", "import our design system".
argument-hint: <path to your product's repo>
---

# bootstrap

Fill in `product/` and `design-system/` from what already exists, so a team doesn't start from blank files. You draft; an owner confirms. Anything a source doesn't state is a hypothesis.

- **In:** the path to the product's repo, plus any docs the person points you to (PRDs, a Notion export, a style guide).
- **Out:** drafts in `product/` and `design-system/`, a `sync.json` if the code has CSS variables or a component folder, and `work/bootstrap-report.md`.
- **Asks:** where the product docs live, if you can't find any.

This is the only skill that writes to `product/` and `design-system/` directly — on a new branch, as one pull request an owner reviews.

## Steps

1. **Look around, read-only.** The README and docs, `package.json`, styles (CSS variables, Tailwind config, theme files), the component folder, the main pages, and the text people see on them.

2. **Design system.**
   - **Tokens:** keep the token names that are already in `tokens.json` (the proposal template and the check rely on them) and change their values; add new ones beside them. If the code has CSS variables, write `sync.json` (see `sync.example.json`) mapping them to the roles in `tokens.json`, then run `npm run sync`. If it doesn't, read the colors, fonts, spacing and corner radii actually used and put them in `tokens.json` yourself. Run `npm run tokens`.
   - **Components:** if there's a component folder, add it to `sync.json` so `components/inventory.md` lists them.
   - **Writing:** collect the words the UI already uses for the same things (buttons, statuses, empty states) into the table in `writing.md`. Where it's inconsistent, write down both and leave it for an owner.
   - **Principles and rules:** draft only what the code or docs clearly show. Leave the rest as `(example)`.
   - **No design system at all?** That's fine. The colors, type and words the product already uses are enough to start.

3. **Product.** Draft users, jobs, concepts and constraints from the README, docs and the product itself. Mark each `hypothesis` unless a document states it, and cite the source. Leave decisions empty unless they're written down somewhere.

4. **Tidy up.** Delete example rows that don't apply, set `> Reviewed:` dates to today, and run `npm run check`.

5. **Report.** Write `work/bootstrap-report.md`: what you filled in and from where, what you guessed, what an owner should check first, and what's still missing.

6. **Hand over.** Commit on a new branch (for example `bootstrap`) and ask before opening a pull request.
