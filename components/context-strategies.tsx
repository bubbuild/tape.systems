"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function ContextStrategies() {
  const { t, locale } = useI18n()

  return (
    <section id="strategies" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="06"
          title={t("strategy.title")}
          subtitle={t("strategy.subtitle")}
        />

        <div className="flex flex-col gap-8">
          {/* ── Compact ── */}
          <StrategyCard
            title={t("compact.title")}
            problem={t("compact.problem")}
            keyInsight={t("compact.key")}
            diagram={<CompactDiagram />}
          />

          {/* ── Summary ── */}
          <StrategyCard
            title={t("summary.title")}
            problem={t("summary.problem")}
            keyInsight={t("summary.key")}
            diagram={<SummaryDiagram />}
          />

          {/* ── Memory ── */}
          <StrategyCard
            title={t("memory.title")}
            problem={t("memory.problem")}
            keyInsight={t("memory.key")}
            diagram={<MemoryDiagram />}
          />
        </div>
      </div>
    </section>
  )
}

function StrategyCard({
  title,
  problem,
  keyInsight,
  diagram,
}: {
  title: string
  problem: string
  keyInsight: string
  diagram: React.ReactNode
}) {
  const { locale } = useI18n()

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-2 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
        <h3 className="text-base font-mono font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-wider text-muted-foreground/50 mr-2">
            {locale === "zh" ? "问题" : "problem"}
          </span>
          {problem}
        </p>
      </div>

      {/* Diagram */}
      <div className="px-4 md:px-8 py-4">
        {diagram}
      </div>

      {/* Key insight footer */}
      <div className="bg-foreground px-5 py-3">
        <p className="text-xs font-mono text-background/70 leading-relaxed">
          <span className="text-background/40 uppercase tracking-wider mr-2">
            {locale === "zh" ? "关键:" : "key:"}
          </span>
          {keyInsight}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   COMPACT DIAGRAM
   ═══════════════════════════════════════════ */
function CompactDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 140" className="w-full" fill="none">
      {/* Full history tape */}
      <rect x="20" y="20" width="660" height="35" rx="6" className="fill-secondary/40 stroke-border" strokeWidth="1" />

      {/* Old entries (dimmed) */}
      {[40, 100, 160, 220].map((x, i) => (
        <g key={i}>
          <rect x={x} y={26} width={45} height={23} rx={3} className="fill-muted/60 stroke-border/50" strokeWidth="0.5" />
          <text x={x + 22.5} y={41} textAnchor="middle" className="fill-muted-foreground/30 text-[9px] font-mono">
            e{i + 1}
          </text>
        </g>
      ))}

      {/* Anchor divider */}
      <line x1="290" y1="15" x2="290" y2="65" className="stroke-accent" strokeWidth="2" />
      <path d="M 290 65 L 296 72 L 290 79 L 284 72 Z" className="fill-accent" />

      {/* Active entries (bright) */}
      {[310, 380, 450, 530].map((x, i) => (
        <g key={i}>
          <rect x={x} y={26} width={55} height={23} rx={3} className="fill-card stroke-foreground/50" strokeWidth="1" />
          <text x={x + 27.5} y={41} textAnchor="middle" className="fill-foreground text-[9px] font-mono">
            e{i + 5}
          </text>
        </g>
      ))}

      {/* Append arrow */}
      <text x="620" y={41} textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono">...</text>

      {/* Annotations */}
      <text x="150" y={95} textAnchor="middle" className="fill-muted-foreground/40 text-[9px] font-mono">
        {locale === "zh" ? "保留但不入默认窗口" : "preserved but not in default view"}
      </text>
      <path d="M 40 82 L 260 82" className="stroke-muted-foreground/20" strokeWidth="0.8" />
      <line x1="40" y1="78" x2="40" y2="86" className="stroke-muted-foreground/20" strokeWidth="0.8" />
      <line x1="260" y1="78" x2="260" y2="86" className="stroke-muted-foreground/20" strokeWidth="0.8" />

      <text x="430" y={95} textAnchor="middle" className="fill-accent text-[9px] font-mono">
        {locale === "zh" ? "默认读取集（缩小后）" : "default read set (shrunk)"}
      </text>
      <path d="M 310 82 L 590 82" className="stroke-accent/40" strokeWidth="0.8" />
      <line x1="310" y1="78" x2="310" y2="86" className="stroke-accent/40" strokeWidth="0.8" />
      <line x1="590" y1="78" x2="590" y2="86" className="stroke-accent/40" strokeWidth="0.8" />

      {/* handoff + anchor label */}
      <text x="290" y={125} textAnchor="middle" className="fill-accent/60 text-[8px] font-mono">
        handoff + anchor + selective view
      </text>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   SUMMARY DIAGRAM
   ═══════════════════════════════════════════ */
function SummaryDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 150" className="w-full" fill="none">
      <defs>
        <marker id="sum-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-accent" />
        </marker>
      </defs>

      {/* Source entries */}
      {[60, 140, 220].map((x, i) => (
        <g key={i}>
          <rect x={x} y={20} width={60} height={35} rx={5} className="fill-secondary stroke-border" strokeWidth="1" />
          <text x={x + 30} y={42} textAnchor="middle" className="fill-foreground text-[10px] font-mono">e{128 + i * 2}</text>
        </g>
      ))}

      {/* Provenance arrows */}
      {[90, 170, 250].map((x) => (
        <line key={x} x1={x} y1={60} x2={380} y2={85} className="stroke-accent/40" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#sum-arrow)" />
      ))}

      {/* Summary anchor block */}
      <rect x="360" y="70" width="200" height="55" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
      <text x="460" y="88" textAnchor="middle" className="fill-accent text-[11px] font-mono font-semibold">anchor.state</text>
      <text x="460" y="104" textAnchor="middle" className="fill-accent/60 text-[9px] font-mono">
        {locale === "zh" ? '"Discovery is complete."' : '"Discovery is complete."'}
      </text>
      <text x="460" y="118" textAnchor="middle" className="fill-accent/40 text-[8px] font-mono">
        source_entry_ids: [128, 130, 131]
      </text>

      {/* Arrow to next phase */}
      <line x1="565" y1="97" x2="630" y2="97" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#sum-arrow)" />
      <rect x="635" y="78" width="50" height="38" rx="6" className="fill-card stroke-border" strokeWidth="1" />
      <text x="660" y="101" textAnchor="middle" className="fill-foreground text-[10px] font-mono">
        {locale === "zh" ? "下一" : "next"}
      </text>

      {/* Annotation */}
      <text x="200" y="140" textAnchor="middle" className="fill-muted-foreground/40 text-[8px] font-mono">
        {locale === "zh" ? "原始 entries（可回跳）" : "raw entries (can jump back)"}
      </text>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   MEMORY DIAGRAM
   ═══════════════════════════════════════════ */
function MemoryDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 160" className="w-full" fill="none">
      <defs>
        <marker id="mem-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
        </marker>
        <marker id="mem-arrow-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-accent" />
        </marker>
      </defs>

      {/* Tape */}
      <rect x="20" y="20" width="200" height="45" rx="8" className="fill-foreground" />
      <text x="120" y="48" textAnchor="middle" className="fill-primary-foreground text-[13px] font-mono font-semibold">Tape</text>

      {/* BuildIndex arrow */}
      <line x1="120" y1="70" x2="120" y2="95" className="stroke-muted-foreground" strokeWidth="1.5" markerEnd="url(#mem-arrow)" />
      <text x="155" y="87" className="fill-muted-foreground text-[9px] font-mono">BuildIndex()</text>

      {/* Memory Index */}
      <rect x="30" y="100" width="180" height="45" rx="8" className="fill-secondary stroke-border" strokeWidth="1" />
      <text x="120" y="127" textAnchor="middle" className="fill-foreground text-[12px] font-mono">Memory Index</text>
      <text x="120" y="140" textAnchor="middle" className="fill-muted-foreground/50 text-[8px] font-mono">
        {locale === "zh" ? "（派生索引，非事实副本）" : "(derived index, not a copy)"}
      </text>

      {/* Query arrow */}
      <line x1="215" y1="122" x2="310" y2="80" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#mem-arrow-a)" />
      <text x="280" y="95" className="fill-accent text-[9px] font-mono">Query()</text>

      {/* EntryIDs result */}
      <rect x="315" y="58" width="120" height="35" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="375" y="80" textAnchor="middle" className="fill-accent text-[11px] font-mono">EntryIDs</text>

      {/* Load raw entries arrow */}
      <line x1="440" y1="75" x2="500" y2="45" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#mem-arrow-a)" />
      <text x="490" y="68" className="fill-accent text-[9px] font-mono">LoadRaw()</text>

      {/* Raw entries result */}
      <rect x="505" y="20" width="170" height="45" rx="8" className="fill-accent stroke-accent" strokeWidth="1.5" />
      <text x="590" y="48" textAnchor="middle" className="fill-accent-foreground text-[12px] font-mono font-semibold">
        Raw Entries
      </text>

      {/* Annotation */}
      <text x="590" y="90" textAnchor="middle" className="fill-muted-foreground/40 text-[8px] font-mono">
        {locale === "zh" ? "命中后回读原始事实" : "reload raw facts after hit"}
      </text>
    </svg>
  )
}
