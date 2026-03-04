"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function MinimalModel() {
  const { t } = useI18n()

  return (
    <section className="py-24 md:py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="01"
          title={t("model.title")}
          subtitle={t("model.subtitle")}
        />

        {/* Relationship diagram */}
        <div className="rounded-xl border border-border bg-card p-6 md:p-10">
          <RelationshipDiagram />
        </div>

        {/* Four concepts */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: "tape", icon: "M2 6h20M2 10h20M2 14h20" },
            { key: "entry", icon: "M5 5h14v14H5zM12 10v4M10 12h4" },
            { key: "anchor", icon: "M12 4v16M12 7a3 3 0 100-0M7 16l5 3 5-3" },
            { key: "view", icon: "M2 7h20M2 17h20M2 7v10M22 7v10M6 11h12M6 14h8" },
          ].map(({ key, icon }) => (
            <div key={key} className="p-4 rounded-lg border border-border bg-card">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted-foreground mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon} />
              </svg>
              <div className="text-sm font-mono font-semibold text-foreground">{t(`model.${key}`)}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t(`model.${key}.desc`)}</div>
            </div>
          ))}
        </div>

        {/* Invariants */}
        <div className="mt-6 rounded-xl bg-foreground p-5 md:p-6">
          <div className="text-[10px] font-mono uppercase tracking-wider text-primary-foreground/40 mb-3">
            {t("invariant.title")}
          </div>
          <div className="flex flex-col gap-1.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-baseline gap-3">
                <span className="text-[10px] font-mono text-primary-foreground/30">{String(n).padStart(2, '0')}</span>
                <p className="text-sm text-primary-foreground/75 leading-relaxed">{t(`invariant.${n}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RelationshipDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 680 220" className="w-full" fill="none">
      <defs>
        <marker id="r-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-muted-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="r-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Tape */}
      <rect x="20" y="40" width="140" height="48" rx="8" className="fill-foreground" />
      <text x="90" y="69" textAnchor="middle" className="fill-primary-foreground text-[14px] font-mono font-semibold">Tape</text>

      {/* Arrow: Tape -> Entries */}
      <line x1="165" y1="64" x2="215" y2="64" className="stroke-muted-foreground" strokeWidth="1.2" markerEnd="url(#r-arr)" />

      {/* Entries */}
      <rect x="220" y="40" width="140" height="48" rx="8" className="fill-secondary stroke-border" strokeWidth="1" />
      <text x="290" y="69" textAnchor="middle" className="fill-foreground text-[13px] font-mono">Entries</text>

      {/* Tape -> Anchors */}
      <line x1="90" y1="93" x2="90" y2="145" className="stroke-muted-foreground" strokeWidth="1.2" markerEnd="url(#r-arr)" />

      {/* Anchors */}
      <rect x="20" y="150" width="140" height="48" rx="8" className="fill-secondary stroke-border" strokeWidth="1" />
      <text x="90" y="179" textAnchor="middle" className="fill-foreground text-[13px] font-mono">Anchors</text>

      {/* Anchors -> View */}
      <line x1="165" y1="174" x2="435" y2="108" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#r-arr)" />

      {/* Entries -> Derived */}
      <line x1="290" y1="93" x2="290" y2="145" className="stroke-muted-foreground/50" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#r-arr)" />

      {/* Derived Index */}
      <rect x="220" y="150" width="140" height="48" rx="8" className="fill-secondary stroke-border" strokeWidth="1" />
      <text x="290" y="179" textAnchor="middle" className="fill-foreground text-[13px] font-mono">Index</text>
      <text x="290" y="192" textAnchor="middle" className="fill-muted-foreground/50 text-[9px] font-mono">derived</text>

      {/* Derived -> View */}
      <line x1="365" y1="174" x2="435" y2="120" className="stroke-muted-foreground/50" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#r-arr)" />

      {/* Context View */}
      <rect x="440" y="70" width="140" height="48" rx="8" className="fill-accent/12 stroke-accent" strokeWidth="1.5" />
      <text x="510" y="99" textAnchor="middle" className="fill-accent text-[13px] font-mono font-semibold">View</text>

      {/* View -> Execution */}
      <line x1="510" y1="123" x2="510" y2="145" className="stroke-accent" strokeWidth="1.2" markerEnd="url(#r-arr-a)" />

      {/* Execution */}
      <rect x="440" y="150" width="140" height="48" rx="8" className="fill-accent stroke-accent" strokeWidth="1.5" />
      <text x="510" y="179" textAnchor="middle" className="fill-accent-foreground text-[13px] font-mono font-semibold">Execution</text>

      {/* Execution -> Tape (loop) */}
      <path d="M580 174 C640 174 650 30 95 35" className="stroke-accent/40" strokeWidth="1" strokeDasharray="5 4" fill="none" markerEnd="url(#r-arr-a)" />
      <text x="638" y="100" className="fill-accent/35 text-[8px] font-mono">
        {locale === "zh" ? "new entries" : "new entries"}
      </text>
    </svg>
  )
}
