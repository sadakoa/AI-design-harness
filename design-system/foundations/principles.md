# Principles

> Answers: What do we prioritize, and why?

How screens should feel. Who the product is for and what it stands for are in `product/`. Values live in `tokens/tokens.json`; hard limits live in `rules.md`.

## Quality bar

<!-- replace -->
A review starts with three questions about the whole screen:

1. Does it stay calm when there's a lot of information?
2. Is it obvious where to look first?
3. Is the next step easy to take?

## Principles

<!-- replace: keep three to seven, numbered P-01, P-02… -->

### P-01 One screen, one main thing (example)

Each screen does one job. If two things compete for attention, neither gets read.

Ask: what does someone do first here?

### P-02 Keep only what helps the next step (example)

Put every requirement on screen and the useful parts get buried.

Ask: will they use this for what they do next? If not, remove it, fold it away or move it.

### P-03 No dead ends (example)

Loading, empty, error, done — any of them can leave people stuck.

Ask: in every state, is it clear what to do next? A sentence is enough; it doesn't have to be a button. The states are listed in `patterns/GUIDE.md`.
