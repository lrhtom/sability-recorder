// English resources for the Guided Session Recorder.
// Loaded as a plain script so the page works from file:// and with no network.
// Namespaces: ui (chrome and controls) · script (spoken aloud) · task (per-task detail)
window.__RES = window.__RES || {};
window.__RES.en = {
  ui: {
    appTitle: "Guided Session Recorder",
    appSub: "Usability · 5 tasks · 5 min cap",
    langName: "English",

    stepSetup: "Setup",
    stepWrap: "Wrap",
    stepAnalysis: "Totals",

    setupTag: "Start",
    setupEyebrow: "Who this session is with",
    setupHeading: "Enter a name to begin",
    setupNote: "The name only separates one session from another. It stays in this browser and is never uploaded. It becomes P1 to P5 when the data reaches the dissertation.",
    namePlaceholder: "e.g. Wang",
    beforeYouStart: "Before you start",
    prep1: "Consent form signed on the spot",
    prep2: "This person <strong>did not take the earlier questionnaire</strong>",
    prep3: "Seeded account ready, but <strong>leave the dashboard closed</strong>",
    prep4: "Browser cleared: no history, no autofill",
    prep5: "A 250-word text ready to paste for T5",

    readAloudTag: "Read aloud",
    sameWords: "Same words for all five",
    openingLabel: "Opening",
    readToParticipant: "Read to the participant",
    alsoIn: "Also in {{lang}}",

    taskOf: "Task {{n}} of 5",
    success: "Success",
    covers: "Covers",
    watchFor: "Watch for",

    wrongTurns: "Wrong turns",
    wrongTurnsHint: "wrong button · wrong page · duplicate submit, one each",
    hintLevel: "Hint level",
    hintLevelHint: "no skipping levels; wait 30 s before escalating",
    ladderNote: "(a direction, never the button itself)",
    ladderDemo: "L3 demonstrate it = counts as failed",
    timeoutBanner: "Five minutes reached. This task is failed. Stop the clock and move on.",
    verbatim: "Verbatim quote",
    verbatimHint: "word for word, not paraphrased",
    verbatimPlaceholder: "\"I thought this one was the search box...\"",

    outIndependent: "Independent",
    outWithHint: "With hint",
    outFailTimeout: "Failed · timeout",
    outFailDemo: "Failed · demonstrated",
    outNotRecorded: "Not recorded",

    wrapTag: "Wrap",
    wrapEyebrow: "Spoken debrief · 5 min",
    wrapHeading: "Three questions, recorded verbatim",
    wrapNote: "Do not let the participant fill in the in-platform questionnaire. That sample is closed, and extra rows would break statistics already checked against the database.",
    debriefPlaceholder: "record the actual words",

    exportTag: "Export",
    exportEyebrow: "Copy it out",
    exportNote: "Aggregate once all five are done. With n = 5, write \"4 of 5\", <b>never a percentage</b> — 20% granularity cannot carry that precision.",

    thisDevice: "This device",
    sessionsSaved_one: "{{count}} session saved",
    sessionsSaved_other: "{{count}} sessions saved",
    load: "Load",
    del: "Delete",
    exportAll: "Export all {{count}}",
    allCopied: "All copied",
    copyManually: "Select and copy manually",
    storageNote: "Everything lives in this browser only. Switching device or clearing the cache loses it, so <b>export each session as soon as it ends.</b>",

    analysisTag: "Totals",
    analysisEyebrow: "Across every saved session",
    analysisHeading: "Table 7.10, computed",
    analysisEmpty: "No sessions recorded yet. Totals appear here once at least one session has data.",
    analysisNote: "Counts are written as \"4 of 5\" on purpose. Times are medians, because five values with one slow participant would drag a mean somewhere no one actually sat. Export is English whatever language the interface is in, so it drops straight into the chapter.",
    quotesHeading: "Quotes by task, for thematic grouping",

    btnStartT1: "Start T1",
    btnStartTimer: "Start timer",
    btnResume: "Resume",
    btnStop: "Stop",
    btnNext: "Next →",
    btnWrapUp: "Wrap up →",
    btnBack: "Back",
    btnCopySession: "Copy this session",
    btnCopied: "Copied",
    btnCopyTable: "Copy the table",
    btnSeeTotals: "See totals →",
    saved: "Saved"
  },

  script: {
    opening: "What is being tested here is the system, not you. If something does not work, that is the system’s problem, not yours.<br><br>There are five tasks. Please think aloud as you go: what you are looking for, what you expect a click to do, where you hesitate.<br><br>I will not answer questions like “where is that button”. If you get stuck, keep trying, and if you really cannot get past it I will give you a hint. Your actions and timings are being recorded. Nothing is filmed.<br><br>You can stop at any point, and you do not need a reason.",
    T1: "Please log in, then tell me how many vocabulary cards are due for review today.",
    T2: "Please generate a reading passage, read it, answer all the questions that follow, then tell me how many you got right.",
    T3: "Pick a word from that passage you did not know, and add it to your vocabulary study plan.",
    T4: "Now go and review that word. When you are done, tell me when the system says you will see it again.",
    T5: "Please submit a piece of writing. Once the feedback is back, tell me which of the four scoring dimensions you scored lowest on.",
    L1: "There is somewhere else on this page worth looking at.",
    L2: "Try the navigation on the left."
  },

  task: {
    T1_name: "Read the daily load",
    T1_pass: "The number spoken matches the due count on the dashboard",
    T1_covers: "Login · dashboard information architecture",
    T1_flag: "",
    T2_name: "Generate a passage and answer it",
    T2_pass: "Runs generation to reading to answering to seeing a score",
    T2_covers: "AI generation path · waiting feedback",
    T2_flag: "Repeated clicking while waiting counts as a wrong turn",
    T3_name: "Add an unknown word to the plan",
    T3_pass: "The word can afterwards be found in the vocabulary plan",
    T3_covers: "Cross-module vocabulary contextualisation",
    T3_flag: "The core of the integration claim. Getting stuck here is the most valuable result",
    T4_name: "Review it and read the interval",
    T4_pass: "Completes one review and states the next due date or interval",
    T4_covers: "Whether the scheduler is visible to the learner",
    T4_flag: "",
    T5_name: "Submit writing and read the feedback",
    T5_pass: "The dimension named matches the one the system scored lowest",
    T5_covers: "Band-descriptor-aligned feedback",
    T5_flag: "Have a 250-word text ready to paste. Do not make anyone write on the spot",

    hintNone: "none",
    hintDirection: "direction",
    hintLocation: "location",
    hintDemo: "demo",

    debrief_stuck: "Which step was the most frustrating?",
    debrief_useful: "Which part of this would actually help your IELTS preparation?",
    debrief_change: "If you could change one thing, what would it be?"
  }
};
