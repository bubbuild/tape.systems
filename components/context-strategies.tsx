"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function ContextStrategies() {
  const { t } = useI18n()

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

          {/* ── Fork / Merge ── */}
          <StrategyCard
            title={t("fork.title")}
            problem={t("fork.problem")}
            keyInsight={t("fork.key")}
            diagram={<ForkMergeStrategyDiagram />}
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
        {locale === "zh" ? "保留但不入默认窗" : "preserved, not in view"}
      </text>
      <path d="M 40 82 L 260 82" className="stroke-muted-foreground/20" strokeWidth="0.8" />
      <line x1="40" y1="78" x2="40" y2="86" className="stroke-muted-foreground/20" strokeWidth="0.8" />
      <line x1="260" y1="78" x2="260" y2="86" className="stroke-muted-foreground/20" strokeWidth="0.8" />

      <text x="430" y={95} textAnchor="middle" className="fill-accent text-[9px] font-mono">
        {locale === "zh" ? "默认读取集（缩小）" : "default read set"}
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
        {locale === "zh" ? "原始 entries（可回跳）" : "raw entries (jump back)"}
      </text>
    </svg>
  )
}

/* ═══════════════════════════════════════════
   FORK / MERGE STRATEGY DIAGRAM
   ═══════════════════════════════════════════ */
function ForkMergeStrategyDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 260" className="w-full" fill="none">
      <defs>
        <marker id="fm-s-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
        </marker>
        <marker id="fm-s-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-accent" />
        </marker>
      </defs>

      <rect x="80" y="12" width="130" height="32" rx="6" className="fill-foreground" />
      <text x="145" y="33" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Main Tape</text>
      <line x1="145" y1="45" x2="145" y2="238" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 4" />

      <rect x="430" y="12" width="130" height="32" rx="6" className="fill-accent" />
      <text x="495" y="33" textAnchor="middle" className="fill-accent-foreground text-[12px] font-mono font-semibold">Fork Tape</text>
      <line x1="495" y1="45" x2="495" y2="238" className="stroke-accent/30" strokeWidth="1.5" strokeDasharray="5 4" />

      <line x1="150" y1="80" x2="485" y2="80" className="stroke-foreground" strokeWidth="1.3" markerEnd="url(#fm-s-arr)" />
      <rect x="260" y="66" width="120" height="20" rx="5" className="fill-secondary" />
      <text x="320" y="80" textAnchor="middle" className="fill-foreground text-[10px] font-mono font-semibold">fork(at id=120)</text>

      <g>
        <rect x="110" y="68" width="28" height="20" rx="3" className="fill-secondary stroke-border" strokeWidth="0.5" />
        <text x="124" y="82" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">120</text>
      </g>

      <path d="M 500 120 Q 580 120 580 145 Q 580 170 500 170" className="stroke-accent" strokeWidth="1.4" fill="none" markerEnd="url(#fm-s-arr-a)" />
      <text x="615" y="138" className="fill-accent text-[10px] font-mono">append</text>

      {[
        { id: "121", y: 118 },
        { id: "122", y: 145 },
        { id: "123", y: 172 },
      ].map((entry) => (
        <g key={entry.id}>
          <rect x="455" y={entry.y} width="35" height="20" rx="3" className="fill-accent/15 stroke-accent" strokeWidth="0.8" />
          <text x="472.5" y={entry.y + 14} textAnchor="middle" className="fill-accent text-[9px] font-mono">{entry.id}</text>
        </g>
      ))}

      <line x1="490" y1="210" x2="155" y2="210" className="stroke-accent" strokeWidth="1.8" markerEnd="url(#fm-s-arr-a)" />
      <rect x="250" y="196" width="160" height="20" rx="5" className="fill-accent/15" />
      <text x="330" y="210" textAnchor="middle" className="fill-accent text-[10px] font-mono font-semibold">
        merge(new entries only)
      </text>

      <text x="495" y="238" textAnchor="middle" className="fill-muted-foreground/40 text-[8px] font-mono">
        {locale === "zh" ? "只追加 delta，不重写主线" : "append delta only, no rewrite"}
      </text>
    </svg>
  )
}
