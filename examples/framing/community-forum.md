# Framing: Community forum

- **Verdict:** stop
- **Scope:** flow
- **PRD:** `../prd/community-forum.md`
- **Context:** `product/` and `design-system/` still hold (example) content about Helpline, a made-up help desk. This framing treats it as real, so every ID below is a placeholder.

## Who it's for, and the job

| | ID | Confidence | How this PRD helps |
|---|---|---|---|
| User | U-03 | fact | Main user. But U-03 never logs in, and this PRD needs them to. |
| User | U-01 | fact | Marks best answers and moderates: new work on top of answering requests. |
| Job | none | — | No job in `jobs.md` is for U-03. The goal, fewer repeat requests, isn't a job either, and "many questions are the same" has no source. See question 2. |

## How it fits

- **Principles:** PP-01 against: it's built for customers and adds moderation work for agents. PP-03 against: a forum is a second product. PP-02 is a risk: a forum question nobody answers is a customer waiting where no agent looks.
- **Decisions:** PD-01 against, directly: customers would sign in, and PD-01 rejected a customer portal. This alone stops it.
- **Constraints:** CON-02 against: public pages, URLs and search would show customers' questions and names. CON-01: customer pages would need phones, which CON-01 rules out (it was written for agents). CON-03 would apply to every page.
- **Concepts:** all new, none in `concepts.md`: forum, question and answer, best answer, vote, customer account, moderation. Unclear whether a forum question is a Request.

## Screens

None of these exist, and none are approved in `design-system/screens/`.

| Screen | Exists today? | Leads to |
|---|---|---|
| Customer sign-in | no | Forum home |
| Forum home and search | no | Question; Ask a question |
| Question, with answers and votes (agents mark the best answer here) | no | Forum home |
| Ask a question | no | Question |
| Moderation queue (agents) | no | Question |

## Questions for a product owner

1. Should customers be able to log in? That needs a new decision that changes PD-01, made by the product lead. Until then, this stays stopped.
2. How many requests really are repeats? Nothing in `product/` says. (FB-06)
3. If repeats are common, could we help agents instead, without customer log-ins? For example, reuse past answers inside Helpline. That fits PP-01 and PD-01, and would be a new PRD.
4. If a forum does go ahead: what may be public (CON-02), who moderates, and does an unanswered forum question become a request (PP-02)?

## For design-builder

- Don't design this. It goes against PD-01 and CON-02.
- If PD-01 changes, frame it again first: it needs new users, jobs and concepts in `product/`.
