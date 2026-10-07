# Composition

> Answers: How do components come together into screens and flows?

Decisions that only apply to one screen stay in `work/features/`. When the same arrangement shows up on two screens, promote it here through the feedback log.

## Levels

Use the same levels and names in design and in code. Then an approved design can go to engineering without being rebuilt.

| Level | What it is | Examples |
|---|---|---|
| Component | The smallest piece | Button, input, table |
| Block | A few components that mean something together | Search bar with filters, status |
| Section | Blocks that make up one feature | List header, detail summary |
| Screen | Sections on one page | List screen, detail screen |

<!-- replace: write down your naming rule, e.g. blocks are noun-role, screens are object-list / object-detail -->

## Layouts

<!-- replace: keep the ones you actually use -->

| Layout | Good for |
|---|---|
| Single pane | Focusing on one thing, like settings or a form |
| List and detail | Working through many items |
| Nav, list and detail | Switching between groups of items |
| Tabs or steps on top | One object, different views or stages |

Not sure? Find the closest screen in `screens/` and follow it.

## Screen states

Every screen needs these four on top of its normal state. In mockups, switch between them with `?state=loading`, `?state=empty`, `?state=error` and `?state=done` at the end of the URL.

| State | When | What to decide |
|---|---|---|
| Loading | Waiting for data | Show what's coming — a skeleton or progress |
| Empty | Nothing to show | What's missing, and the first step (see `writing.md`) |
| Error | Something failed | What happened and what to do. Never wipe what they typed. |
| Done | Right after an action | What finished, and what they can do next |

## Flows

A flow is a few screens that do one job together, like list → detail → edit. When a change spans screens, decide these for the whole flow, not screen by screen:

| Question | What to decide |
|---|---|
| Way in | Where does someone start, and from where can they get here? |
| Way out | Where do they land when they finish, and when they cancel? |
| Back | Does going back keep what they entered and where they were? |
| Same thing, same place | Shared actions and information sit in the same spot on every screen |
| One job per screen | If a screen does two jobs, split it; if two screens do one, merge them |

In mockups, a flow is one HTML file per option, with `?screen=<name>` choosing the screen and real links between them.
