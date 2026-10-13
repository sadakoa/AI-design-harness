# AI Design Harness

A template repo for teams that design with AI agents (Claude Code or Codex) — with or without a designer, and with or without a design system.

Before anyone writes code, it does three things:

1. **Finds out what's already known.** It searches your docs, chats and tickets, and looks at other products for bigger work. No PRD yet? It drafts one.
2. **Checks you're building the right thing.** The request is matched against your users, the jobs they're trying to get done and the decisions you've already made. If it clashes, it stops there.
3. **Designs it the way your team would.** For bigger work it first sketches rough directions for you to pick from. Then it drafts a few clickable options, recommends one, writes the spec and reviews it against your rules.

What it learns along the way goes back into your product and design notes, so the next round starts from there.

![How it fits together: discover, frame, build, review, then your team ships; what you learn is promoted back into product/ and design-system/](docs/images/flow.svg)

## See it (2 minutes)

Clone the repo and open `examples/support-inbox/proposal.html` in a browser. It's a full run for a made-up support inbox: the framing, three clickable mockups, the recommendation, the spec and the review.

![One of the three mockups: a support inbox grouped by priority](docs/images/example-option-a.png)

## Try it (15 minutes, nothing to set up)

The repo ships with example content for Helpline, a made-up help desk, so the skills work straight away. Open the repo in Claude Code and type:

| Type | What happens |
|---|---|
| `/frame examples/prd/community-forum.md` | It stops: customer log-ins go against a decision the product already made, and public posts break a privacy constraint. |
| `/frame examples/prd/hand-off.md` | It treats it as a flow of four screens, and asks a product owner to decide first: no job covers the main goal yet. |
| `/design-builder examples/prd/support-inbox.md` | It frames the PRD, asks a few questions, builds three options and reviews its pick. Open the proposal it writes in `work/features/`. |

In Codex, ask for the skill by name: "run frame on examples/prd/hand-off.md".

You need Claude Code or Codex, Node 20 or later, and git.

## Use it on your product

Start with one product and one screen. You set it up once; after that, you just talk to the agent.

1. **Add the plugin to Claude Code**, once per machine:

   ```
   /plugin marketplace add sadakoa/AI-design-harness
   /plugin install design-harness@ai-design-harness
   ```

2. **In your product's repo, ask it to set the design harness up.** It makes a branch and starts small: four product files (users, jobs, constraints, decisions), your tokens, rules and words, the feedback log, and a few small scripts. The rest gets added when a task first needs it. It drafts them from your code, docs and commit history, and never overwrites anything. What it drafts depends on what you have:
   - **You have a design system or a component library.** It points `sync.json` at your CSS variables and component folder and drafts the rest. `npm run sync` keeps the harness in step with your code, one way: your code stays the source.
   - **You don't.** It drafts a starting point from the colors, type and words your product already uses. You need less than you'd think.
3. **Check the drafts and merge.** Read `work/bootstrap-report.md`, fix the users, jobs and decisions in `product/` where they're wrong, and merge the branch.
4. **Connect your team's tools** to Claude Code, like Notion, Slack or Google Drive, so the agent can look things up itself. List where things live in `product/sources.md`.

Expect the first framings to say go or decide first: a stop needs a decision someone wrote down. Each framing and each look into your tools logs the decisions it finds that nobody wrote down, so the record fills in as you use it.

After that, for each feature: ask the agent to make a branch, say what you want in your own words, and ask for a pull request when you're happy. The proposal and its notes live in `work/`. Merge them too, so the next round can see what's already in flight. Engineers build from the proposal's spec as usual; the harness doesn't write production code. If your product has its own components, the options are built with them; if your team designs in Figma or straight in code, skip the design step, and framing and review still work.

**Keeping it up to date.** Turn on auto-update for the marketplace in `/plugin`, or run `/plugin update design-harness@ai-design-harness`. Then ask the agent to update the harness in your repo, which refreshes the few files copied into it: the scripts, `AGENTS.md` and the CI check. `product/`, `design-system/` and `work/` are never touched, and if your team edited one of the copied files, the new version lands next to it as `.harness-new`.

**Tell the harness what got in the way.** Say so while you work ("too many questions", "this step didn't help"), and the agent logs it. "Send it to the harness" turns those notes into issues on this repo, with nothing about your product in them.

**Without the plugin** (Codex, or if you'd rather keep everything in the repo), run the installer from a clone of this repo, reopen your agent, and ask the same:

```bash
node path/to/AI-design-harness/scripts/install.mjs path/to/your-repo
```

[Adopting it](docs/adopting.md) has the details.

## Day to day

You don't need to remember any commands. Tell the agent what you want in your own words and language: "can we add a customer history?", "check this page before Friday", "here's what five team leads told us". It works out the next step and does the bookkeeping. The commands in brackets are there if you want to be explicit.

| You say or share | The agent | You get |
|---|---|---|
| An idea, a PRD, a request from Sales or a PM | Looks into it unless it's small (`/discover`), checks it against the product (`/frame`), then designs it if it's a go or you say go ahead (`/design-builder`) | A plain answer first; for bigger work, rough directions to pick from; then a reviewed proposal |
| A problem to look into, with or without a PRD | Searches your docs, chats and tickets, and other products for bigger work (`/discover`) | A short brief with sources, and a PRD draft if there wasn't one |
| Feedback on a proposal | Revises it next to the first round | A second round that says what changed |
| "Check this page" | Reviews it against your rules (`/design-review`) | The fixes in order, the important ones first |
| A word on screen should change | Logs it for your word list | A row for the owners' weekly sort |
| Research, data, something from real use | Logs it with its source | Observations for the owners' weekly sort |
| "This design is approved" | Prepares it for `design-system/screens/` | A pull request for an owner |
| A feature's pull request merges, and once a week (owners) | Sorts the log (`/promote-feedback`), oldest first | Pull requests against `product/` or `design-system/` |

`npm run check` runs on every pull request and catches broken links between all of these. Run `npm run check -- path/to/page.html` to check a page built some other way.

## What's inside

```
product/            what to build and why: users, jobs, principles, concepts, structure,
                    constraints, decisions, and where the full docs live
design-system/      how it looks and behaves: tokens, rules, writing, components, layouts
work/features/      one folder per idea: brief, framing, mockups, proposal, review
work/feedback.md    what we've learned, waiting for an owner
skills/             bootstrap, discover, frame, design-builder, design-review, promote-feedback
scripts/            check, sync, build-tokens, install
.claude-plugin/     what makes this repo a Claude Code plugin
examples/           sample PRDs and a full example run
evals/              requests to check the harness against after a change
```

In your product's repo, only `product/`, `design-system/`, `work/` and a few small files are added. The skills come from the plugin.

Plans, research and PRDs stay where they already are. `product/` keeps a short version of each, with an ID, and links to the rest ([why](docs/how-it-works.md#what-lives-here-and-what-stays-elsewhere)).

IDs you'll see: `U-` user, `J-` job, `PP-` product principle, `PD-` product decision, `CON-` constraint, `P-` design principle, `R-` design rule, `D-` design decision, `FB-` feedback entry. They're never renumbered.

[How it works](docs/how-it-works.md) explains the ideas behind it, with pictures. There's also a [slide deck](docs/slides/ai-design-harness.pdf); to present it from a browser, open `docs/slides/index.html`.

## Working on the harness

Changed a skill or a template? Ask the agent in this repo to run the evals: eighteen requests, from a designer's PRD to a one-line ask from Sales, each handled by a fresh agent and graded on the outcome. See [evals/README.md](evals/README.md).

## Not for

Screens unlike anything your product has today, say your first dashboard: the agent can draft options, but someone with design experience should finish them. It also doesn't write production code. It gets you to a reviewed design; building it is still your job.
