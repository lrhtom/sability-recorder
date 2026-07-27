# Guided Session Recorder

A single static page for recording usability sessions live. The observer keeps it open on a phone or a second screen while the participant works on the system under test.

**Live:** https://lrhtom.github.io/usability-recorder/

## What it records

Five fixed tasks. Four measures per task:

- **Outcome** — derived from the hint level: L0 independent · L1/L2 with hint · L3 or timeout counts as failed
- **Time on task** — built-in stopwatch, five-minute cap, turns red at the limit
- **Wrong turns** — wrong button, wrong page, duplicate submit; one each
- **Verbatim quote** — the participant's actual words

Then three spoken debrief questions, a per-session export, and a **Totals** screen that computes the aggregate table across every session on the device.

## Running a session

1. Open the page, type a name (it only separates one session from another)
2. Read the opening script word for word
3. Per task: read the script, start the timer, observe, tally wrong turns, set the hint level, record the quote, move on
4. On the wrap screen, answer the three debrief questions and hit **Copy this session**
5. After all five, open **Totals** and hit **Copy the table**

## Where the data goes

Everything is written to `localStorage` under two keys:

| Key | Contents |
|---|---|
| `usability_recorder_v1` | every session, as `{ "<name>": { name, date, tasks[5], debrief{} } }` |
| `usability_recorder_lang` | `en` or `zh` |

Each task entry is `{ secs, running, startedAt, wrong, hint, quote }`. Writes happen on every keystroke, every tally tap and every timer stop, so nothing is lost to a refresh or a locked phone.

There is no backend, no analytics, no telemetry and no `fetch` anywhere in the source. Nothing leaves the device.

Two consequences worth knowing before a session:

- Storage is **per origin**. Opening the page from `lrhtom.github.io` and opening `index.html` from disk give two separate stores that never see each other. Pick one and stay on it for all five sessions.
- Storage is **per device and per browser profile**. Private windows discard it on close, and "clear browsing data" deletes it. Export after every session rather than trusting it to survive to the fifth.

The name is a local label only. It becomes P1 to P5 before the data reaches the write-up.

## How the totals are computed

The **Totals** screen reads every saved session and, per task, reports:

- **Independent / With hint / Failed** as counts out of n, never as percentages. Five participants give 20% granularity; a percentage would imply precision that is not there.
- **Median time on task**, not the mean. With five values, one slow participant drags a mean to a place nobody actually sat.
- **Wrong turns**, summed across participants, as a blunt indicator of where people thrash.
- **Verbatim quotes grouped by task**, which is the raw material for the three-to-five issue themes that go alongside the table.

Tasks left unrecorded are excluded from the time and wrong-turn figures rather than counted as zero.

The exported Markdown is **always English**, whatever language the interface is showing, so it drops into the write-up without translation.

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

## Translations

Strings live in [i18next](https://www.i18next.com/) resource bundles, one file per language:

```
locales/en.js            English
locales/zh.js            简体中文
vendor/i18next.min.js    vendored, not a CDN
```

Three namespaces keep the concerns apart:

| Namespace | Holds |
|---|---|
| `ui` | interface chrome, labels, buttons |
| `script` | the sentences read aloud to the participant |
| `task` | task names, success criteria, what each task covers |

`script` is separate on purpose. Those sentences are spoken to a real person and have to stay identical across all five sessions, so they are the one thing that must never be casually reworded.

Each task card shows the script in the current language with the other language directly underneath, because the record wants English while the participant may want Chinese.

Adding a language: copy `locales/en.js`, translate the values, register it in the `resources` map in `index.html`, and add it to the toggle. The library is vendored rather than loaded from a CDN so a session survives the venue wifi dropping.

## Build

No dependencies beyond the vendored i18next, no build step, no external requests. Follows the system light or dark theme. Works on a phone, and works opened straight from disk.
