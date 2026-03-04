"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function ForkMerge() {
  const { t, locale } = useI18n()

  return (
    <section id="advanced" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="07"
          title={t("fork.title")}
          subtitle={t("fork.subtitle")}
        />

        {/* Main fork/merge diagram */}
        <div className="rounded-xl border border-border bg-card p-4 md:p-8 mb-6">
          <ForkMergeDiagram />
        </div>

        {/* Why complex - tight annotations */}
        <div className="rounded-xl bg-foreground p-5 md:p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-background/50 mb-3">
            {t("fork.why.title")}
          </div>
          <div className="flex flex-col gap-2">
            {["fork.why.1", "fork.why.2", "fork.why.3"].map((key, i) => (
              <div key={key} className="flex items-baseline gap-3">
                <span className="text-xs font-mono text-background/40">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-background/80 leading-relaxed">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ForkMergeDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 300" className="w-full" fill="none">
      <defs>
        <marker id="fm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
        </marker>
        <marker id="fm-arrow-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-accent" />
        </marker>
      </defs>

      {/* ── Participant: Main Tape ── */}
      <rect x="80" y="15" width="130" height="36" rx="6" className="fill-foreground" />
      <text x="145" y="38" textAnchor="middle" className="fill-primary-foreground text-[13px] font-mono font-semibold">Main Tape</text>
      <line x1="145" y1="55" x2="145" y2="280" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* ── Participant: Fork Tape ── */}
      <rect x="430" y="15" width="130" height="36" rx="6" className="fill-accent" />
      <text x="495" y="38" textAnchor="middle" className="fill-accent-foreground text-[13px] font-mono font-semibold">Fork Tape</text>
      <line x1="495" y1="55" x2="495" y2="280" className="stroke-accent/30" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* Time arrow */}
      <line x1="30" y1="60" x2="30" y2="270" className="stroke-muted-foreground/25" strokeWidth="1" />
      <path d="M 26 266 L 30 276 L 34 266" className="fill-muted-foreground/25" />
      <text x="25" y="170" textAnchor="middle" transform="rotate(-90,25,170)" className="fill-muted-foreground/30 text-[9px] font-mono">time</text>

      {/* ── Step 1: fork ── */}
      <line x1="150" y1="90" x2="485" y2="90" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#fm-arrow)" />
      <rect x="260" y="74" width="120" height="20" rx="5" className="fill-secondary" />
      <text x="320" y="88" textAnchor="middle" className="fill-foreground text-[10px] font-mono font-semibold">fork(at id=120)</text>

      {/* Main tape entries before fork */}
      <g>
        <rect x="110" y="78" width="28" height="20" rx="3" className="fill-secondary stroke-border" strokeWidth="0.5" />
        <text x="124" y="92" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">120</text>
      </g>

      {/* ── Step 2: fork appends ── */}
      <path d="M 500 130 Q 580 130 580 155 Q 580 180 500 180" className="stroke-accent" strokeWidth="1.5" fill="none" markerEnd="url(#fm-arrow-a)" />
      <text x="615" y="148" className="fill-accent text-[10px] font-mono">append</text>

      {/* Fork entries */}
      {[
        { id: "121", y: 128 },
        { id: "122", y: 155 },
        { id: "123", y: 182 },
      ].map((entry) => (
        <g key={entry.id}>
          <rect x="455" y={entry.y} width="35" height="20" rx="3" className="fill-accent/15 stroke-accent" strokeWidth="0.8" />
          <text x="472.5" y={entry.y + 14} textAnchor="middle" className="fill-accent text-[9px] font-mono">{entry.id}</text>
        </g>
      ))}

      {/* ── Step 3: merge ── */}
      <line x1="490" y1="230" x2="155" y2="230" className="stroke-accent" strokeWidth="2" markerEnd="url(#fm-arrow-a)" />
      <rect x="250" y="216" width="160" height="20" rx="5" className="fill-accent/15" />
      <text x="330" y="230" textAnchor="middle" className="fill-accent text-[10px] font-mono font-semibold">
        merge(new entries only)
      </text>

      {/* Result on main tape */}
      <rect x="60" y="255" width="230" height="28" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="175" y="273" textAnchor="middle" className="fill-accent text-[10px] font-mono">
        {'main: ...120, 121, 122, 123'}
      </text>

      {/* Annotation */}
      <text x="495" y="268" textAnchor="middle" className="fill-muted-foreground/40 text-[8px] font-mono">
        {locale === "zh" ? "只追加 delta，不重写主线" : "append delta only, no rewrite"}
      </text>
    </svg>
  )
}
