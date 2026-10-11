# Structure

> Answers: What places does the product have, and how do people move between them?
> Reviewed: 2026-10-12

The map of this product: the places people go, what each one shows, and how they get from one to the next. It's the only part of the five planes that usually has no doc anywhere else, so it lives here.

A place is where someone goes to do part of a job, like a list, one item or a settings area. The Place column is the one home for place names; name what each place shows with the words in `concepts.md`. How screens are laid out in any product is in `design-system/patterns/GUIDE.md`, and what the approved screens look like is in `design-system/screens/`.

<!-- replace: start with the places that exist today. It can stay as (example) until you design your first flow. -->

| Place | What it shows | Jobs | Way in | Leads to |
|---|---|---|---|---|
| (example) Inbox | Open requests, newest first, with priority, status and assignee | J-01, J-02 | Home after signing in | Request |
| (example) Request | One request and its whole conversation | J-02, J-03 | Inbox | Back to the Inbox |

## When you change it

When a PRD needs a place that isn't here, or calls one by another name, `frame` logs it as `open`. Add the place through `promote-feedback` once its screen is merged into `design-system/screens/`, not when it's first proposed.
