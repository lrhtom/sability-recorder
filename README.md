# Guided Session Recorder

A single static page for recording usability sessions live. The observer keeps it open on a phone or a second screen while the participant works on the system under test.

**Live:** https://lrhtom.github.io/sability-recorder/

Built for the guided sessions reported in §7.3.2 of the LD6053 dissertation. The commit history timestamps the task wording and the hint ladder before the first session ran, which is the point of publishing the protocol rather than only describing it.

## What it records

Five fixed tasks. Four measures per task:

- **Outcome** — derived from the hint level: L0 independent · L1/L2 with hint · L3 or timeout counts as failed
- **Time on task** — built-in stopwatch with a **per-task cap**, turning red at the limit
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
| — | the task's cap elapsed | Failed |

## Time caps, and why they differ

| Task | Cap | Why |
|---|---|---|
| T1 read the daily load | 5 min | navigation and comprehension only |
| T2 generate a passage and answer it | **10 min** | a full IELTS passage has to be read and answered; five minutes would fail almost everyone for reasons that have nothing to do with the interface |
| T3 add an unknown word | 5 min | pure discovery |
| T4 review it and read the interval | 5 min | one interaction plus reading the scheduler's output |
| T5 submit writing and read the feedback | 6 min | four dimensions to read and compare |

A cap that most people breach measures the protocol rather than the product, so the caps are set from what each task actually asks of a person.

## AI wait is banked separately

T2 and T5 make the learner wait on a model call. The deployed platform's own telemetry puts that wait at a median of 15 s, a 95th percentile of 80 s and a maximum of 169 s, which is long enough to dominate a task time and turn a usability measure into a latency measure.

So those two tasks carry a second counter. While the model is generating, park the clock on **AI wait**: the task clock stops, the wait clock runs, and the cap ignores it entirely. Time on task therefore means time the person spent working, and the wait is reported in its own column beside it.

Waiting still deserves a number, because waiting is part of the experience. It just is not evidence about the interface.

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

**One language per rendering, never mixed.** English shows only English and Chinese shows only Chinese, including table headers, the outcome labels and the exported text. To read a task aloud in the other language, switch the toggle. Only language-neutral tokens stay put: task ids `T1`–`T5`, hint levels `L0`–`L3`, participant labels `P1`–`Pn`, timings and `n`.

A consequence worth knowing: **the export follows the interface language too.** Run the sessions in whichever language suits the participants, and translate the task names once when the table reaches the write-up. The `outcome` field inside the JSON block stays in stable English codes so a merge across languages still aggregates correctly.

Adding a language: copy `locales/en.js`, translate the values, register it in the `resources` map in `index.html`, and add it to the toggle. The library is vendored rather than loaded from a CDN so a session survives the venue wifi dropping.

## Build

No dependencies beyond the vendored i18next, no build step, no external requests. Follows the system light or dark theme. Works on a phone, and works opened straight from disk.

## Analysis page

`admin.html`, linked from the foot of the Setup screen. Behind a passphrase gate.

It reads every session in `localStorage` and reports:

- per task: independent / with hint / failed, plus fastest, median and slowest time, and summed wrong turns
- a stacked bar per task, so where people got stuck is visible before reading a number
- per participant: tasks recorded, total time, wrong turns, and the P1..Pn label the write-up uses. Tapping a name opens that session task by task, showing the outcome, time, wrong turns, hint level and quote for each of the five, with the two ways of failing kept apart (`timeout` against `demonstrated`)
- verbatim quotes grouped by task, and debrief answers grouped by question
- the finished Table 7.10 Markdown and the raw JSON, both ready to copy

### Merging devices

Sessions live in the browser that recorded them, so a phone and a laptop hold separate sets. The analysis page takes a paste of another device's export and merges it in. It accepts the whole Markdown export, a bare JSON object, or several of either.

Merged records are kept under a **separate** key (`usability_recorder_merged_v1`) from sessions recorded on this device (`usability_recorder_v1`), and local records win on a name collision. A merge can therefore never overwrite a session this device actually recorded, and **Clear merged** removes only the imported ones. Rows that came from a merge carry a tag, so it is always visible which store a row belongs to.

### Deleting one participant

Each row in the participant table has a delete, behind a two-step confirm, which removes that session from whichever store holds it.

This exists because the ethics approval requires it. The opening script tells every participant they can stop at any point without giving a reason, and a participant who withdraws is entitled to have their data removed. The other legitimate use is a practice run that should not count.

Deleting a session because its numbers are inconvenient is falsification rather than tidying, and the note under the table says so on screen.

Deletion is permanent, with no undo, and P labels are positions in the list rather than stored identities, so removing one session renumbers everyone below it. Delete before quoting P numbers anywhere, not after.

### About the passphrase

It is a gate, not a lock. Two things are worth being clear about:

- The page is served from a public repository, so anyone can read its source. Only the SHA-256 of the passphrase is stored, never the string itself, but a short passphrase is recoverable from a hash by anyone who cares to try.
- There is nothing here for a network attacker to reach. The data never leaves the device. What the gate actually stops is someone picking up an unlocked phone and reading session notes.

Choose a passphrase that is not derived from personal data and is not reused anywhere else, precisely because the check is weak and the repository is public.

Changing it:

```bash
python -c "import hashlib;print(hashlib.sha256(b'NEW PASSPHRASE').hexdigest())"
```

Paste the result into `PASS_SHA256` at the top of the script block in `admin.html`.

## Why not SQLite

GitHub Pages is static hosting. It serves files and runs no code, so there is no process to hold a database connection and no way to write to disk. A SQLite file could be shipped and queried in the browser with a WASM build, but it would be read-only: every session recorded would be lost on refresh.

`localStorage` is what actually fits the job. Five sessions of five tasks is a few kilobytes, it survives a refresh and a locked phone, it needs no network, and it keeps participant notes on the observer's own device rather than on someone else's server.
