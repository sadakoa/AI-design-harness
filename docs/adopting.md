# Adopting it

Start with one product and one screen. You can fill in the rest as you go.

## 1. Get the files

Use this repo as a template for a new repo, or copy these into your product's repo: `product/`, `design-system/`, `work/`, `.claude/skills/`, `.agents/`, `.github/`, `scripts/`, `AGENTS.md`, and the three scripts in `package.json`. If you already have a `CLAUDE.md`, add the line `@AGENTS.md` to it.

Have a look at `examples/`, then delete it.

## 2. Let bootstrap draft the first version

In Claude Code, run:

```
/bootstrap path/to/your/app
```

It reads your code and docs, fills in `product/` and `design-system/` as far as it can, and writes `work/bootstrap-report.md`: what it found, what it guessed, and what an owner should check first. Everything it couldn't confirm is marked `hypothesis`. It commits on a branch called `bootstrap`, so you can review it as one pull request.

What happens next depends on what you have.

### You have a design system

Your code stays the source; the harness only reads it. Bootstrap writes `sync.json`, which maps your CSS variables to the roles in `tokens.json` and points at your component folder:

```json
{
  "tokens": {
    "from": "../my-app/src/app/globals.css",
    "map": { "color.action.primary": "--primary", "color.surface.base": "--background" }
  },
  "components": { "from": "../my-app/src/components/ui" }
}
```

- `npm run sync` copies the values into `tokens.json` and lists your components in `design-system/components/inventory.md`. It never writes to your code.
- When your code changes, `npm run check` fails until you run `npm run sync` again. In CI, where your app isn't checked out next to the harness, it only warns.
- Rules, writing and layouts don't sync. Bootstrap drafts them; after that, owners edit them here.
- If your design system lives in Figma, export its variables as CSS, or copy the values into `tokens.json` by hand.

### You don't have one

That's fine. To start, you only need:

- Colors, type and spacing in `tokens.json`. Bootstrap reads the ones your product already uses.
- The names for things in `writing.md`, so the same thing is always called the same.
- A quality bar in `design-system/foundations/principles.md`.

Everything else can stay as `(example)` until you need it. The agent says when it relied on one.

## 3. Check the product context

`product/` is what stops you building the wrong thing, so it's worth ten minutes before the first run:

- `users.md` and `jobs.md`: at least the users and the one or two jobs your next feature is for.
- `decisions.md`: the decisions people keep asking about again.
- Change `hypothesis` to `fact` only where you've seen it.

If your PRDs and decisions live in Notion or a wiki, link to them from these files instead of copying everything.

## 4. Set up owners

Put GitHub usernames in `.github/CODEOWNERS`: product owners on `/product/`, design owners on `/design-system/`. They approve every change to those folders. With two or more people, turn on branch protection with "Require review from Code Owners".

Keep the rule IDs `R-01` to `R-05` (reword them freely); the skills and the check refer to them. Delete the example rows `FB-01` and `D-01` together, or the check will complain.

## 5. Try one screen

Write a short PRD for one screen: who uses it, what job they're doing, what's wrong today, what has to be on it. Then:

```
/design-builder work/prd/your-screen.md
```

It frames the PRD first. If the framing says go, it asks up to five questions, builds about three options, recommends one and reviews it. Open `work/features/<date>-<name>/proposal.html` in a browser.
