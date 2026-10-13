---
name: discover
description: Find out what's already known before anyone judges or designs something — size the task, search the team's own tools and docs, research outside for larger work, and write a short brief with sources; if there's no PRD, draft one. Use whenever someone, in any language, asks to look into a problem or a topic, brings a request without a PRD, or before framing a medium or large request ("look into…", "what do we know about…").
argument-hint: <a problem, a request or a path to a PRD>
---

# discover

Go and find what the team already knows, so the framing and the design start from evidence. People shouldn't have to hand you every doc.

- **In:** a problem, a request or a PRD, as a path or pasted text.
- **Out:** `research/brief.md` in a new feature folder; `_inputs/prd-draft.md` when there was no PRD; rows in `work/feedback.md` for facts worth keeping.
- **Asks:** only when you can't tell what the problem is.

These steps are the usual path. Skip, merge or reorder them when the request calls for it, and say why in one line. The rules in `AGENTS.md` always hold.

## Size it first

Say the size in one line before you start; the person can change it ("lighter is fine").

| Size | Looks like | What to do |
|---|---|---|
| small | words on screen, a small fix to a place that exists | Skip discover and go to `frame`. |
| medium | a change to a place that exists, using concepts the product has | Look inside only: this repo and the team's tools. About ten minutes. |
| large | a new screen or flow, a new concept, or a goal nobody has written down | Look inside and outside, and write the brief before anything else. |

With no PRD, a task is at least medium.

## Steps

1. **Start the feature folder.** Create `work/features/<yyyymmdd>-<slug>/` (`frame` and `design-builder` use the same one) and copy what you were given into `_inputs/`.

2. **Look in this repo.** The Frame column of `product/INDEX.md`; earlier features in `work/features/` that touch the same places or concepts; rows in `work/feedback.md` about them; `design-system/screens/`.

3. **Look in the team's tools.** Use whatever is connected: a wiki or Notion, Google Drive, Slack, the support tool, analytics. Start from the places in `product/sources.md`, then search for the topic, its synonyms, and the places and concepts it touches. Look for earlier PRDs and decisions, discussions, support tickets and numbers. A decision that was clearly made but never written into `product/decisions.md` (a thread that settled something, a PRD's "we won't…") gets logged as a decision to confirm, with its source. If nothing is connected, say so and ask for the two or three docs that matter most.

4. **Look outside** (large only). Two to four products that solve the same job, common patterns, platform guidelines. Save screenshots in `research/` and note the source, what you noticed and what to borrow in `research/sources.md`, so `design-builder` doesn't do it again.

5. **Write the brief.** Copy `templates/brief.md` to `research/brief.md` and fill it in. Every finding gets a source, a date and how sure it is: **seen** (data, a ticket, a recording), **said** (someone wrote or told it) or **guessed** (your inference).

6. **No PRD? Draft one.** Copy `templates/prd.md` to `_inputs/prd-draft.md`. Every line comes from the brief or is marked "(assumed)". It's a draft for the person who asked or a product owner to correct.

7. **Log what's worth keeping** beyond this feature, like a measure, a group of users, or a complaint that keeps coming back, in `work/feedback.md` as `observation`, with its source.

8. **Hand over.** Go on to `frame` with the PRD or the draft. If you ran on your own, reply with the brief's first section.

## Keep in mind

- Link, don't copy. Quote a line or two at most, and never copy customer or personal details out of Slack, tickets or analytics.
- Say where you looked, and where you couldn't.
- One Slack message is "said", not "seen". Two people saying it is still "said".
- Stop searching when new searches stop turning up anything new.
