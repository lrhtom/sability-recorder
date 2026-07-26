# Guided Session Recorder

A single static page for recording usability sessions live. The observer keeps it open on a phone or a second screen while the participant works on the system under test.

**Live:** https://lrhtom.github.io/usability-recorder/

## What it records

Five fixed tasks. Four measures per task:

- **Outcome** — derived from the hint level: L0 independent · L1/L2 with hint · L3 or timeout counts as failed
- **Time on task** — built-in stopwatch, five-minute cap, turns red at the limit
- **Wrong turns** — wrong button, wrong page, duplicate submit; one each
- **Verbatim quote** — the participant's actual words

Then three spoken debrief questions, and a one-tap export to a Markdown table plus JSON.

## Running a session

1. Open the page, type a name (it only separates one session from another)
2. Read the opening script word for word
3. Per task: read the script, start the timer, observe, tally wrong turns, set the hint level, record the quote, move on
4. On the wrap screen, answer the three debrief questions and hit **Copy this session**
5. After all five, return to Setup and hit **Export all**

## Where the data lives

In `localStorage` on that one device. Nothing is uploaded; there is no backend and no network request of any kind. Switching device or clearing the cache loses it, so export every session as soon as it ends.

The name is a local label only. It becomes P1 to P5 before the data reaches the write-up.

## Hint ladder

No skipping levels. Wait 30 seconds after each hint before deciding to escalate.

| Level | What the observer says | Recorded as |
|---|---|---|
| L0 | nothing | Independent |
| L1 | "There is somewhere else on this page worth looking at." | With hint |
| L2 | "Try the navigation on the left." (a direction, never the button) | With hint |
| L3 | demonstrate it | Failed |
| — | five minutes elapsed | Failed |

Never say "yes", "no", or "you clicked the wrong thing". No prompting by tone or expression either.

## Build

One `index.html`. No dependencies, no build step, no external requests. Follows the system light or dark theme. Works on a phone.
