// 简体中文资源。以普通脚本加载，因此 file:// 直开和断网都能用。
// 命名空间：ui（界面与控件）· script（念给参与者听的）· task（任务细节）
window.__RES = window.__RES || {};
window.__RES.zh = {
  ui: {
    appTitle: "引导式会话记录器",
    appSub: "可用性 · 5 个任务 · 5 分钟上限",
    langName: "中文",

    stepSetup: "准备",
    stepWrap: "收尾",
    stepAnalysis: "汇总",

    setupTag: "开始",
    setupEyebrow: "这一场是谁",
    setupHeading: "填个名字就能开始",
    setupNote: "名字只用来区分不同场次，存在这台设备的浏览器里，不会上传。写进论文时会换成 P1 到 P5。",
    namePlaceholder: "例如 小王",
    beforeYouStart: "开场前确认",
    prep1: "同意书当场签",
    prep2: "这位<strong>没参加过上一轮问卷</strong>",
    prep3: "种子账号已备好，但<strong>仪表盘先别打开</strong>",
    prep4: "浏览器清干净：无历史、无自动填充",
    prep5: "准备一段 250 词现成作文，供 T5 粘贴",

    readAloudTag: "逐字念",
    sameWords: "五个人念同一套",
    openingLabel: "开场白",
    readToParticipant: "念给参与者听",
    alsoIn: "{{lang}}对照",

    taskOf: "任务 {{n}} / 5",
    success: "成功判据",
    covers: "考察",
    watchFor: "注意",

    wrongTurns: "走错次数",
    wrongTurnsHint: "点错按钮 · 进错页面 · 重复提交，各算一次",
    hintLevel: "提示级别",
    hintLevelHint: "不可跳级，给完等 30 秒再升",
    ladderNote: "（指方向，不指具体按钮）",
    ladderDemo: "L3 直接演示 = 记失败",
    timeoutBanner: "满 5 分钟，本任务记为失败。停表，进下一个。",
    verbatim: "关键事件原话",
    verbatimHint: "逐字记，别转述",
    verbatimPlaceholder: "他说：「我以为这个是搜索……」",

    outIndependent: "独立成功",
    outWithHint: "提示后成功",
    outFailTimeout: "失败 · 超时",
    outFailDemo: "失败 · 需演示",
    outNotRecorded: "未记录",

    wrapTag: "收尾",
    wrapEyebrow: "口头 debrief · 5 分钟",
    wrapHeading: "三个问题，记原话",
    wrapNote: "不要让参与者填站内问卷。那份样本已经封存，多几行会让已核对过数据库的统计对不上。",
    debriefPlaceholder: "记原话",

    exportTag: "导出",
    exportEyebrow: "复制走",
    exportNote: "五场全部跑完后一起汇总。n = 5 只写「5 人中 4 人」，<b>不要写百分比</b> —— 20% 的粒度撑不起那个精度。",

    thisDevice: "本机",
    sessionsSaved_other: "已保存 {{count}} 场",
    load: "载入",
    del: "删除",
    exportAll: "导出全部 {{count}} 场",
    allCopied: "已复制全部",
    copyManually: "请手动全选复制",
    storageNote: "数据只在这台设备的浏览器里，换设备或清缓存会丢，<b>每场跑完当场导出。</b>",

    analysisTag: "汇总",
    analysisEyebrow: "所有已保存场次",
    analysisHeading: "表 7.10，自动算好",
    analysisEmpty: "还没有记录。至少跑完一场，这里就会出统计。",
    analysisNote: "计数刻意写成「5 人中 4 人」。时间取中位数：五个值里只要有一个人特别慢，均值就会被拖到没人真正待过的位置。不管界面是哪种语言，导出一律英文，直接贴进章节即可。",
    quotesHeading: "按任务归拢的原话，用来分主题",

    btnStartT1: "开始 T1",
    btnStartTimer: "开始计时",
    btnResume: "继续",
    btnStop: "停表",
    btnNext: "下一个 →",
    btnWrapUp: "收尾 →",
    btnBack: "上一步",
    btnCopySession: "复制这一场",
    btnCopied: "已复制",
    btnCopyTable: "复制表格",
    btnSeeTotals: "看汇总 →",
    saved: "已存"
  },

  script: {
    opening: "今天测的是这个系统，不是你。做不出来是系统的问题，不是你的问题。<br><br>一共五个任务。每个任务请边做边说出你在想什么：你在找什么、你觉得点下去会发生什么、哪里让你犹豫。<br><br>过程中我不会回答「这个按钮在哪」这类问题，卡住了就继续试，实在过不去我会给提示。全程会记录你的操作和用时，不录像。<br><br>随时可以停下不做，不需要理由。",
    T1: "请登录，然后告诉我：今天有多少张单词卡等着复习。",
    T2: "请生成一篇阅读文章，读完，把后面的题目全部做完，然后告诉我你对了几道。",
    T3: "刚才那篇文章里，挑一个你不认识的词，把它加到你的单词学习计划里去。",
    T4: "现在去复习这个词，复习完以后告诉我：系统说下一次什么时候再让你见到它。",
    T5: "请提交一篇写作，拿到反馈以后告诉我：四个评分维度里，哪一个你的分最低。",
    L1: "这个页面上还有别的地方可以看看。",
    L2: "试试左边的导航栏。"
  },

  task: {
    T1_name: "进入系统并读懂今天的任务量",
    T1_pass: "说出的数字与仪表盘显示的到期卡数一致",
    T1_covers: "登录 · 仪表盘信息架构",
    T1_flag: "",
    T2_name: "生成一篇阅读并完成答题",
    T2_pass: "完整走完生成 → 阅读 → 答题 → 看到得分",
    T2_covers: "AI 生成链路 · 等待反馈",
    T2_flag: "等待时反复点击要计进走错次数",
    T3_name: "把生词加进学习计划",
    T3_pass: "该词事后能在词汇计划里查到",
    T3_covers: "跨模块词汇语境化",
    T3_flag: "整合主张的核心一环，卡在这里最值钱",
    T4_name: "复习这个词并读懂调度结果",
    T4_pass: "完成一次复习，并说出下次到期时间或间隔天数",
    T4_covers: "调度结果对学习者的可见性",
    T4_flag: "",
    T5_name: "提交写作并读懂四维反馈",
    T5_pass: "说出的最低维度与系统给出的一致",
    T5_covers: "对齐评分标准的反馈",
    T5_flag: "备一段 250 词现成文本供粘贴，别让人现场写",

    hintNone: "不提示",
    hintDirection: "指方向",
    hintLocation: "指位置",
    hintDemo: "演示",

    debrief_stuck: "刚才哪一步最让你卡？",
    debrief_useful: "这个系统哪一部分你觉得对备考真的有用？",
    debrief_change: "如果只能改一个地方，你改哪里？"
  }
};
