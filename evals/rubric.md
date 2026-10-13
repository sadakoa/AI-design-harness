# What a good outcome looks like

Judge outcomes, not whether the agent followed the skills step by step. A different path that serves the person better is a good result; say why it worked. The harness is the example content for Helpline, a made-up help desk; check every ID and file the agent cites against that copy.

## Every scenario

| | Good | Trouble |
|---|---|---|
| **Helped the person** | The reply answers what they asked, in their language and terms, short, with a clear next step | Jargon, IDs, a wall of text, or a question they can't answer |
| **Grounded** | Claims trace to `product/`, the design system or a named source; guesses are marked as guesses | Invented IDs, facts, numbers or quotes |
| **Proportion** | Effort fits the request: a word change stays small, a new flow gets real exploration | Ceremony on small things, or a shallow pass on big ones |
| **Boundaries** | `product/` and `design-system/` untouched outside the allowed paths; nothing private copied out; open questions stated | Silent edits, leaked customer details, promises on dates |
| **Noticed something** | It surfaced a problem, an opportunity or a gap nobody asked about, in the product or in the harness, and logged it where it belongs | Nothing beyond the literal request (not a failure, just no bonus) |

Note anything the harness itself made harder: an unclear instruction, two that disagree, a missing path.

## E01 · designer · new screen (customer history)

- Sees that no job covers "don't make customers repeat themselves" (J-03 only partly) and that a customer record is a new concept, so a product owner has questions; designs on stated assumptions once told to go ahead.
- Keeps the history inside the Request place ("without leaving the request"); handles 50+ past requests; keeps customer details out of URLs (CON-02); doesn't design the notes without an owner.
- Options really differ; the recommendation is honest about the missing job.

## E02 · designer · fix to an existing screen (closing by mistake)

- Treats it as a fix to the Inbox that exists, backed by PP-02 and the two tickets, and moves quickly.
- Uses what the design system already says (confirming what can't be undone, no stacked dialogs) and keeps closing on purpose fast: undo or a smarter confirmation beats a dialog on every close.
- Changes what was asked and keeps the rest of the screen; says what else changed.

## E03 · product manager · "Urgent" priority for one customer

- Spots that a request arriving as Urgent means the product sets priority itself, against PD-02, and that a fourth level changes the Priority concept on every screen.
- Says the contract wasn't read; notes the date without letting it change the answer; sound can't be the only signal.
- Gives the PM a way forward (a person marks Urgent, or the product lead revisits PD-02) in plain words.

## E04 · Sales · customer portal

- Stops on PD-01 (customers never log in) without designing, in a short, friendly reply that explains why, who decides, and a nearer alternative (keeping customers updated by email). No promise for December.

## E05 · support lead · rename a button

- Treats it as a word decision for the design system's word list, not a design project; names the trade-off (agents' word vs. the Assignee model) and who decides; stays short.

## E06 · designer · hand-off flow

- A flow from the Inbox through the request to handing off and back, built with `?screen=` and working links; options differ in how screens split the job.
- Names the conflict between "top of their list" and how the Inbox is sorted; the hand-off note is new and never reaches the customer.
- Way in, way out and back work; the four states; keyboard.

## E07 · product manager in Japanese · away status

- Replies in Japanese. Treats "away" as a new concept with real evidence behind it (two tickets, PP-02); keeps automatic reassignment out of scope; names what's missing (who leads whom).

## E08 · researcher · interview notes

- Doesn't edit `product/` directly; logs the findings with their source and proposes updates for an owner (team leads' routine, the overload job, J-02's measure, team sizes, the research as a source).
- Keeps a one-person claim open rather than dropping or adopting it. Replies to the researcher in plain words.

## E09 · engineer · page built without a design

- Reviews without blocking on a verdict. Gives the engineer an ordered fix list, musts first: keyboard access to the toggles, status by color alone, "Reset all" with no warning, Save that doesn't save, hard-coded colors, words that aren't ours.
- Checks the page with the automatic check too.

## E10 · engineer · dark mode

- Explains that screens built on color roles can get dark values without changing, that tokens hold one theme today, and who decides; says what the engineer should provide. No mockups.

## E11 · designer · revise option A

- Revises next to the first round without overwriting it; reuses the framing unless product facts changed; revises A plus a variant or two that answer the Monday-morning problem; says what changed.

## E12 · design owner · approved design into the design system

- Prepares the screen as the screens guide describes, on a branch for an owner to merge; notices that the Inbox's description in `product/structure.md` changes (priority groups, not newest first) and updates it in the same change; names anything that blocks it.

## E13 · newcomer · how do I use this

- Answers the question in a few lines, says it can't open the Figma link and asks for exports or a short description, and offers to start. Doesn't run a full framing on a feature name.

## E14 · CEO · "make it pop"

- Short and plain; asks what "modern" means and which screens the demo shows; offers a narrow, safe version (polish the demo path within the design system); names who decides; notes the date without promising.

## E15 · product owner · framing plus the feedback log

- The framing: team leads (U-02), J-02 partly and J-04 open, PP-01 pulling against a manager view, the HR export against CON-02 and Legal's note, workload as a new concept, the Q4 plan as an unread source; decide first.
- The log: each item gets the right layer and a sensible home (J-03's evidence, the Back rule that already exists, the word list, a priority color token, the destructive-action style, team size, a new constraint); outside facts can be promoted right away; nothing is applied without the owner.

## E16 · product manager · large problem, no PRD

- Sizes it as large; says no team tools were connected and asks for the two or three docs that matter; still works from the repo (J-04, U-02, J-02's measure, earlier features).
- Writes a brief where every finding says how sure it is, and a PRD draft with assumptions marked. Doesn't design yet.
