# Adopting it

Start with one product and one screen. You can fill in the rest as you go.

## 1. Add the plugin

In Claude Code, once per machine:

```
/plugin marketplace add sadakoa/AI-design-harness
/plugin install design-harness@ai-design-harness
```

The skills come from the plugin, so improving them improves every repo that uses it. Turn on auto-update for the marketplace in `/plugin`, or run `/plugin update design-harness@ai-design-harness` now and then.

Using Codex, or want everything inside your repo? Run the installer from a clone of this repo instead (add `--dry-run` first to see what it would do), then reopen your agent:

```bash
node path/to/AI-design-harness/scripts/install.mjs path/to/your-repo
```

## 2. Set it up in your repo

Open your product's repo and ask the agent to set the design harness up for this repo. It makes a branch and starts small: the files framing and review need (users, jobs, constraints and decisions in `product/`; tokens, rules, words and decisions in `design-system/`; the feedback log). The rest (product principles, sources, structure, components, layouts, approved screens) is added when a task first needs it; ask for everything up front if you'd rather. It also adds the check, sync and token scripts, `AGENTS.md`, a CI check, and `check`, `tokens` and `sync` in your `package.json`. It never overwrites anything: if a file already exists it's skipped and listed, and if a name is taken it uses another one (`AGENTS.harness.md`, `scripts/harness/`, `npm run harness:check`) and tells you. `.harness.json` records which files came from the harness, so asking it to update the harness later only touches those.

Then it reads your code and docs, fills in `product/` and `design-system/` as far as it can, and writes `work/bootstrap-report.md`: what it found, what it guessed, and what an owner should check first. Everything it couldn't confirm is marked `hypothesis`. You review it as one pull request.

Starting a new product instead? Use this repo as a template, have a look at `examples/`, then delete it.

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

- `from` can be one stylesheet or a list of them; it reads every top-level `:root` block, and later ones win, as in CSS. Blocks inside `@media`, like a dark theme, are skipped: `tokens.json` holds one theme for now. Supporting a second one is a change to `tokens.json` and `scripts/build-tokens.mjs`, which owners decide through `/promote-feedback`.
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
- `product/sources.md`: where your plans, research and PRDs live, and who owns them.
- Change `hypothesis` to `fact` only where you've seen it.

Connect the tools those docs live in (Notion, Slack, Google Drive…) to Claude Code, so `/discover` can search them. If your PRDs and decisions live in Notion or a wiki, list them in `product/sources.md`, and keep a short version of what work gets checked against in the other files. Don't copy whole docs. `product/structure.md`, the map of your product's places, can wait until you design your first flow.

## 4. Set up owners

Put GitHub usernames in `.github/CODEOWNERS`: product owners on `/product/`, design owners on `/design-system/`. They approve every change to those folders. With two or more people, turn on branch protection with "Require review from Code Owners".

Keep the rule IDs `R-01` to `R-05` (reword them freely); the skills and the check refer to them. Delete the example rows `FB-01` and `D-01` together, or the check will complain.

## 5. Try one screen

Write a short PRD for one screen: who uses it, what job they're doing, what's wrong today, what has to be on it. Then ask the agent to design it, in your own words, or run:

```
/design-builder work/prd/your-screen.md
```

It checks the PRD against the product first and answers in plain words. If it's a go, or you say go ahead, it asks up to five questions, builds about three options, recommends one and reviews it. Open `work/features/<date>-<name>/proposal.html` in a browser.
