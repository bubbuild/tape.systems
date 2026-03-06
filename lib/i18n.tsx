"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "zh" | "en"

type Translations = {
  [key: string]: { zh: string; en: string }
}

const translations: Translations = {
  // Nav
  "nav.mechanisms": { zh: "核心机制", en: "Mechanisms" },
  "nav.sessions": { zh: "会话模型", en: "Sessions" },
  "nav.strategies": { zh: "上下文策略", en: "Strategies" },
  "nav.advanced": { zh: "进阶", en: "Advanced" },

  // Hero
  "hero.tagline": {
    zh: "Tape 即上下文",
    en: "Tape as Context",
  },
  "hero.subtitle.line1": {
    zh: "Append, Anchor, Handoff, Fork/Merge",
    en: "Append, Anchor, Handoff, Fork/Merge",
  },
  "hero.subtitle.line2Prefix": {
    zh: "",
    en: "A unified context model behind ",
  },
  "hero.subtitle.line2Between": {
    zh: " 背后的统一上下文模型，",
    en: ", ",
  },
  "hero.subtitle.source": {
    zh: "查看源码",
    en: "view source",
  },
  "hero.cta": { zh: "开始探索", en: "Explore" },

  // Reading path
  "path.title": { zh: "阅读路径", en: "Reading Path" },

  // Minimal Model
  "model.title": { zh: "最小模型", en: "The Minimal Model" },
  "model.subtitle": {
    zh: "四个核心概念",
    en: "Four core primitives",
  },
  "model.tape": { zh: "Tape", en: "Tape" },
  "model.tape.desc": { zh: "按时间增长的事实序列", en: "Chronological sequence of facts" },
  "model.entry": { zh: "Entry", en: "Entry" },
  "model.entry.desc": { zh: "一条不可变的事实记录", en: "An immutable fact record" },
  "model.anchor": { zh: "Anchor", en: "Anchor" },
  "model.anchor.desc": { zh: "状态重建的逻辑起点", en: "Logical checkpoint for state reconstruction" },
  "model.view": { zh: "View", en: "View" },
  "model.view.desc": { zh: "面向任务装配的上下文窗口", en: "Task-oriented assembled context window" },

  // Invariants
  "invariant.title": { zh: "不变量", en: "Invariants" },
  "invariant.1": {
    zh: "历史只追加，不覆写",
    en: "History is append-only, never overwritten",
  },
  "invariant.2": {
    zh: "派生物不替代原始事实",
    en: "Derivatives never replace original facts",
  },
  "invariant.3": {
    zh: "上下文是构造结果，不是默认全量继承",
    en: "Context is constructed, not inherited wholesale",
  },

  // Append
  "append.title": { zh: "Append", en: "Append" },
  "append.subtitle": {
    zh: "唯一改变事实面的操作 — 把新事实写入 tape 尾部",
    en: "The sole operation that mutates facts \u2014 writing to the tape\u2019s tail",
  },
  "append.sem1": {
    zh: "顺序可追踪（单调递增 ID）",
    en: "Order is trackable via monotonic IDs",
  },
  "append.sem2": {
    zh: "旧事实不可就地修改",
    en: "Old facts cannot be modified in-place",
  },
  "append.sem3": {
    zh: "修正通过追加新事实完成",
    en: "Corrections are made by appending, not deleting",
  },

  // Anchor
  "anchor.title": { zh: "Anchor", en: "Anchor" },
  "anchor.subtitle": {
    zh: "状态重建的起点标记，不是历史删除点",
    en: "A reconstruction marker, not a deletion point",
  },
  "anchor.sem1": {
    zh: "历史完整保留在 anchor 之前",
    en: "Full history preserved before the anchor",
  },
  "anchor.sem2": {
    zh: "从 anchor 起算重建，避免全量扫描",
    en: "Rebuild from anchor, skip full scans",
  },
  "anchor.sem3": {
    zh: "anchor 可携带结构化 state",
    en: "Anchors can carry structured state payloads",
  },

  // Handoff
  "handoff.title": { zh: "Handoff", en: "Handoff" },
  "handoff.subtitle": {
    zh: "受约束的阶段切换",
    en: "A constrained phase transition",
  },
  "handoff.step1": {
    zh: "写入新 anchor",
    en: "Write a new anchor",
  },
  "handoff.step2": {
    zh: "附带下一阶段的最小继承状态",
    en: "Attach minimum inherited state",
  },
  "handoff.step3": {
    zh: "将执行起点迁移至新 anchor 之后",
    en: "Shift execution origin past the new anchor",
  },

  // Sessions
  "session.title": { zh: "会话建模", en: "Session Modeling" },
  "session.subtitle": {
    zh: "定义上下文选择的边界",
    en: "Defining the boundaries of context selection",
  },
  "session.single.title": { zh: "单会话", en: "Single Session" },
  "session.single.desc": {
    zh: "entry 共用一条时间线",
    en: "Entries share one timeline",
  },
  "session.multi.title": { zh: "多轮会话", en: "Multi-turn" },
  "session.multi.desc": {
    zh: "从最近 anchor 装配",
    en: "Assembled from latest anchor",
  },
  "session.isolated.title": { zh: "多会话隔离", en: "Multi-session" },
  "session.isolated.desc": {
    zh: "独立时间线，跨会话需选择",
    en: "Independent timelines; cross-session is opt-in",
  },

  // Strategies
  "strategy.title": { zh: "上下文策略", en: "Context Strategies" },
  "strategy.subtitle": {
    zh: "用三种机制组合表达 compact / summary / fork-merge",
    en: "Three mechanism combos for compact, summary, and fork-merge",
  },
  "compact.title": { zh: "Compact", en: "Compact" },
  "compact.problem": {
    zh: "上下文太长，超出窗口",
    en: "Context exceeds the window limit",
  },
  "compact.solution": {
    zh: "handoff + anchor + selective view",
    en: "handoff + anchor + selective view",
  },
  "compact.key": {
    zh: "compact \u2260 删除历史；缩小默认读取集",
    en: "compact \u2260 delete history; shrink default read set",
  },
  "summary.title": { zh: "Summary", en: "Summary" },
  "summary.problem": {
    zh: "需要高阶概览驱动下一阶段",
    en: "Need a high-level overview for the next phase",
  },
  "summary.solution": {
    zh: "anchor.state + provenance",
    en: "anchor.state + provenance",
  },
  "summary.key": {
    zh: "摘要需指向来源区间，仅作执行提示",
    en: "Summaries cite sources; hints only",
  },
  "memory.title": { zh: "Memory", en: "Memory" },
  "memory.problem": {
    zh: "跨阶段/跨任务召回相关事实",
    en: "Recall relevant facts across phases or tasks",
  },
  "memory.solution": {
    zh: "derived index + raw reload",
    en: "derived index + raw reload",
  },
  "memory.key": {
    zh: "索引失效不破坏正确性；命中后回读原始事实",
    en: "Index failures ok; hits reload raw facts",
  },

  // Fork/Merge Strategy
  "fork.title": { zh: "Fork / Merge", en: "Fork / Merge" },
  "fork.problem": {
    zh: "需要并行探索，又要可控地合流",
    en: "Need parallel exploration with controlled convergence",
  },
  "fork.key": {
    zh: "merge 只追加 delta，不可重写主线",
    en: "Merge appends deltas only; no mainline rewrites",
  },
  "fork.why.title": { zh: "复杂性", en: "Why Complex" },
  "fork.why.1": {
    zh: "merge 只追加 delta，不可重写主线",
    en: "Merge appends deltas only \u2014 no mainline rewrites",
  },
  "fork.why.2": {
    zh: "并发 fork 的合并顺序影响 entry 排列",
    en: "Concurrent fork merge order affects entry ordering",
  },
  "fork.why.3": {
    zh: "需明确冲突与去重策略",
    en: "Explicit conflict & dedup strategies required",
  },

  // Advanced Memory
  "advanced.memory.title": { zh: "Memory", en: "Memory" },
  "advanced.memory.subtitle": {
    zh: "\u8fdb\u9636\u90e8\u5206\uff1a\u5229\u7528 anchor \u5f62\u6210\u56fe\u7ed3\u6784\u7684\u590d\u6742 memory",
    en: "Advanced: complex memory assembled from anchor graphs",
  },
  "advanced.memory.why.title": { zh: "\u590d\u6742\u6027", en: "Why Complex" },
  "advanced.memory.why.1": {
    zh: "anchor \u53ef\u5f62\u6210\u975e\u7ebf\u6027\u56fe\uff0c\u4e0d\u518d\u662f\u5355\u7ebf\u65f6\u95f4\u8f74",
    en: "Anchors can form non-linear graphs, not a single timeline",
  },
  "advanced.memory.why.2": {
    zh: "memory view \u9700\u4ece\u591a\u4e2a\u8282\u70b9\u88c5\u914d\uff0c\u4f9d\u8d56\u7b56\u7565",
    en: "Memory views assemble from multiple nodes, guided by policy",
  },
  "advanced.memory.why.3": {
    zh: "\u56fe\u7ed3\u6784\u5f15\u5165\u7236\u5b50\u5173\u7cfb\u4e0e provenance \u8981\u6c42",
    en: "Graph structure requires explicit lineage and provenance",
  },

  // Teams
  "teams.title": { zh: "\u56e2\u961f", en: "Teams" },
  "teams.subtitle": {
    zh: "\u591a\u56e2\u961f\u5171\u4eab\u4e00\u6761 tape\uff0c\u5e76\u901a\u8fc7 view \u4e92\u76f8\u901a\u4fe1",
    en: "Multiple teams share one tape and communicate through views",
  },
  "teams.shared.title": { zh: "\u5171\u4eab Tape", en: "Shared Tape" },
  "teams.shared.desc": {
    zh: "\u591a\u4e2a\u56e2\u961f append \u540c\u4e00\u6761 tape\uff0centry \u4fdd\u7559\u6765\u6e90\u8eab\u4efd",
    en: "Multiple teams append the same tape; entries keep their origin",
  },
  "teams.shared.note": {
    zh: "\u53ea\u8ffd\u52a0\uff0c\u4e0d\u91cd\u5199\uff1b\u6765\u6e90\u53ef\u8ffd\u8e2a",
    en: "Append-only; ownership remains traceable",
  },
  "teams.cross.title": { zh: "\u8de8 Tape View", en: "Cross-Tape View" },
  "teams.cross.desc": {
    zh: "\u56e2\u961f\u901a\u8fc7 view \u8bfb\u53d6\u5bf9\u65b9 tape\uff0c\u5f62\u6210\u534f\u4f5c\u4e0a\u4e0b\u6587",
    en: "Teams read each other's tapes via views to coordinate",
  },
  "teams.cross.note": {
    zh: "view \u7531\u88c5\u914d\u4ea7\u751f\uff1btape \u4ecd\u7136\u9694\u79bb",
    en: "Views are assembled; tapes remain isolated",
  },

  // Conclusion
  "conclusion.title": { zh: "结论", en: "Conclusion" },
  "conclusion.text": {
    zh: "将上下文问题放回模型，得到更稳定的研究框架",
    en: "Placing context problems back into this model yields a stable research framework",
  },

  // References
  "ref.title": { zh: "参考", en: "References" },
  "ref.1": { zh: "木匠，锤子，钉子", en: "Carpenter, Hammer, Nail" },
  "ref.2": { zh: "被缚的普罗米修斯", en: "Prometheus Bound" },
  "ref.3": { zh: "重新发明打孔纸带", en: "Reinventing the Punch Tape" },

  // Footer
  "footer.desc": {
    zh: "tape + anchor + handoff: 上下文问题的统一模型",
    en: "tape + anchor + handoff: a unified model for context",
  },
}

interface I18nContextType {
  locale: Locale
  toggleLocale: () => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "zh" ? "en" : "zh"))
  }, [])

  const t = useCallback(
    (key: string) => {
      const entry = translations[key]
      if (!entry) return key
      return entry[locale]
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
