# Guided Session Recorder

A single static page for recording usability sessions live. The observer keeps it open on a phone or a second screen while the participant works on the system under test.

**Live:** https://lrhtom.github.io/sability-recorder/

Built for the guided sessions reported in §7.3.2 of the LD6053 dissertation. The commit history timestamps the task wording and the hint ladder before the first session ran, which is the point of publishing the protocol rather than only describing it.

## What it records

Seven fixed tasks, covering all four skills. Four measures per task:

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

The name is the key, which is what makes an import with a matching name a replacement rather than a second copy.

Records written before a task existed carry a shorter `tasks` array, so everything read from storage or from a paste is normalised to the current task list first: missing tasks come back as unrecorded, missing fields take their defaults, and a malformed record is dropped rather than crashing the page.

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

### The answer still has to be right

Each task card carries a two-state control for whether the answer matched the success criterion. A participant can move through a flow without a single hint, in good time, and still name the wrong dimension or read the wrong number back. The criteria are about the answer, so **wrong answer outranks hint level** and the outcome reads `Failed · wrong answer`.

Without it the hint ladder alone would score that run as a clean independent success, which is the opposite of what happened. Imports honour a stated failure for the same reason, rather than recomputing it away.

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
| T6 set up listening and start it | 6 min | generation, then finding the audio controls |
| T7 hold a speaking turn and read the score | 8 min | a conversation turn, then the summary |

Seven tasks cover all four skills. A protocol that never opened listening or speaking would be testing half of a claim that names four.

**Session length is now the binding constraint.** Every task running to its cap would be 45 minutes, and with the opening and the debrief that is 55. Real sessions land well under it, because a cap is what a task is allowed rather than what it takes, but plan for 45 to 50 minutes and say so when recruiting.

A cap that most people breach measures the protocol rather than the product, so the caps are set from what each task actually asks of a person.

## AI wait is banked separately

T2, T5, T6 and T7 make the learner wait on a model call. The deployed platform's own telemetry puts that wait at a median of 15 s, a 95th percentile of 80 s and a maximum of 169 s, which is long enough to dominate a task time and turn a usability measure into a latency measure.

So those tasks carry a second counter. While the model is generating, park the clock on **AI wait**: the task clock stops, the wait clock runs, and the cap ignores it entirely. Time on task therefore means time the person spent working, and the wait is reported in its own column beside it.

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
- the finished Table 7.10 Markdown and the raw JSON, both ready to copy, plus downloads

### Downloads

Three files, and they answer different questions.

| File | Holds | Goes |
|---|---|---|
| `usability-summary-<stamp>.png` | the aggregate: a stacked bar per task, median time, median wait, wrong turns | the results section |
| `usability-observations-<stamp>.png` | every observation, one cell each, plus every quote and every debrief answer | the appendix |
| `usability-records-<stamp>.json` | the raw records, names included | the backup, and nowhere else |

Both figures are **drawn rather than screenshotted**, at three times scale, always on a light ground whatever theme the viewer is using, because they end up in a document rather than on a screen. Text follows the interface language.

**The summary figure is the claim. The observations figure is the material behind it**, which is what makes the claim checkable by someone who was not in the room. A table that reports "3 of 5 independent" without showing which three, how long each took and what they said is asking to be taken on trust.

The observations figure is a participant-by-task grid. Each cell carries the time on task, how the attempt ended, then wrong turns and time spent waiting on a model, tinted by outcome so the trouble spots surface before anything is read. The task's cap sits under its name, which is what a `fail: cap` is a failure against. A column total closes the grid, then the verbatim quotes grouped by task, then the debrief answers grouped by question.

**Names never reach either figure.** Both carry P labels only, and the passage below the grid says so on the figure itself. The JSON is the exception: it holds the names, because it is the working backup rather than a deliverable. Convert to P labels before any of it reaches the submitted document, and do not paste it into an appendix as it stands.

### Importing from another device

Sessions live in the browser that recorded them, so a phone and a laptop hold separate sets. The analysis page takes a paste of another device's export. It accepts the whole Markdown export, a bare JSON object, or several of either in one go.

**A record whose name is already stored is replaced outright.** Nothing is merged field by field, because a half-merged session would be a session that never happened. Re-importing a corrected export is therefore also how a session gets fixed.

Because replacing loses what was there, an import that would overwrite something names the affected records and waits for a second click. An import that only adds new names goes straight through.

### Deleting one participant

Each row in the participant table has a delete, behind a two-step confirm, which removes that session from whichever store holds it.

This exists because the ethics approval requires it. The opening script tells every participant they can stop at any point without giving a reason, and a participant who withdraws is entitled to have their data removed. The other legitimate use is a practice run that should not count.

Deleting a session because its numbers are inconvenient is falsification rather than tidying, and the note under the table says so on screen.

Deletion is permanent, with no undo, and P labels are positions in the list rather than stored identities, so removing one session renumbers everyone below it. Delete before quoting P numbers anywhere, not after.

**Delete everything** sits at the foot of the same card, clearing both stores at once. It is deliberately quiet rather than prominent, sits well away from the row deletes so it cannot be hit by mistake, states the exact count before it will act, and only exists behind the passphrase gate. The line beside it is the useful part: copy the export first, because nothing here can be recovered afterwards.

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
