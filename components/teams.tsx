"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function Teams() {
  const { t } = useI18n()

  return (
    <section id="teams" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="08"
          title={t("teams.title")}
          subtitle={t("teams.subtitle")}
        />

        <div className="flex flex-col gap-8">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex items-baseline gap-3">
              <span className="text-xs font-mono text-muted-foreground/50">A</span>
              <h3 className="text-sm font-mono font-semibold text-foreground">{t("teams.shared.title")}</h3>
              <p className="text-xs text-muted-foreground">{t("teams.shared.desc")}</p>
            </div>
            <div className="p-4 md:px-8 md:pb-4">
              <SharedTapeDiagram />
            </div>
            <div className="px-5 pb-5">
              <p className="text-[11px] font-mono text-muted-foreground/70">{t("teams.shared.note")}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex items-baseline gap-3">
              <span className="text-xs font-mono text-muted-foreground/50">B</span>
              <h3 className="text-sm font-mono font-semibold text-foreground">{t("teams.cross.title")}</h3>
              <p className="text-xs text-muted-foreground">{t("teams.cross.desc")}</p>
            </div>
            <div className="p-4 md:px-8 md:pb-4">
              <CrossTapeDiagram />
            </div>
            <div className="px-5 pb-5">
              <p className="text-[11px] font-mono text-muted-foreground/70">{t("teams.cross.note")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SharedTapeDiagram() {
  return (
    <svg viewBox="0 0 700 220" className="w-full" fill="none">
      <defs>
        <marker id="ma-shared-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="420" y="12" width="130" height="32" rx="6" className="fill-foreground" />
      <text x="485" y="33" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">
        Shared Tape
      </text>
      <line x1="485" y1="46" x2="485" y2="200" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 4" />

      {[
        { name: "Team A", y: 45 },
        { name: "Team B", y: 105 },
        { name: "Team C", y: 165 },
      ].map((agent) => (
        <g key={agent.name}>
          <rect x="40" y={agent.y} width="110" height="30" rx="6" className="fill-foreground" />
          <text x="95" y={agent.y + 20} textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">
            {agent.name}
          </text>
          <line x1="150" y1={agent.y + 15} x2="475" y2={agent.y + 15} className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#ma-shared-arr)" />
        </g>
      ))}

      {[
        { label: "A:201", y: 62, className: "fill-accent/15 stroke-accent" },
        { label: "B:202", y: 102, className: "fill-secondary stroke-border" },
        { label: "C:203", y: 142, className: "fill-secondary/80 stroke-border" },
        { label: "A:204", y: 182, className: "fill-accent/10 stroke-accent/60" },
      ].map((entry) => (
        <g key={entry.label}>
          <rect x="505" y={entry.y} width="60" height="20" rx="4" className={entry.className} strokeWidth="0.8" />
          <text x="535" y={entry.y + 14} textAnchor="middle" className="fill-foreground text-[9px] font-mono">
            {entry.label}
          </text>
        </g>
      ))}

      <text x="485" y="214" textAnchor="middle" className="fill-muted-foreground/40 text-[9px] font-mono">
        append-only timeline
      </text>
    </svg>
  )
}

function CrossTapeDiagram() {
  return (
    <svg viewBox="0 0 700 230" className="w-full" fill="none">
      <defs>
        <marker id="ma-cross-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="30" y="16" width="110" height="32" rx="6" className="fill-foreground" />
      <text x="85" y="37" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Team A</text>

      <rect x="560" y="16" width="110" height="32" rx="6" className="fill-foreground" />
      <text x="615" y="37" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Team B</text>

      <rect x="170" y="16" width="110" height="32" rx="6" className="fill-secondary" />
      <text x="225" y="37" textAnchor="middle" className="fill-foreground text-[11px] font-mono font-semibold">Tape A</text>

      <rect x="420" y="16" width="110" height="32" rx="6" className="fill-secondary" />
      <text x="475" y="37" textAnchor="middle" className="fill-foreground text-[11px] font-mono font-semibold">Tape B</text>

      <line x1="170" y1="80" x2="280" y2="80" className="stroke-border" strokeWidth="1.5" />
      <line x1="420" y1="80" x2="530" y2="80" className="stroke-border" strokeWidth="1.5" />

      {[
        { x: 182, label: "A1" },
        { x: 214, label: "A2" },
        { x: 246, label: "A3" },
      ].map((entry) => (
        <g key={entry.label}>
          <rect x={entry.x} y="68" width="24" height="22" rx="4" className="fill-card stroke-border" strokeWidth="0.6" />
          <text x={entry.x + 12} y="83" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">{entry.label}</text>
        </g>
      ))}

      {[
        { x: 432, label: "B1" },
        { x: 464, label: "B2" },
        { x: 496, label: "B3" },
      ].map((entry) => (
        <g key={entry.label}>
          <rect x={entry.x} y="68" width="24" height="22" rx="4" className="fill-card stroke-border" strokeWidth="0.6" />
          <text x={entry.x + 12} y="83" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">{entry.label}</text>
        </g>
      ))}

      <rect x="90" y="140" width="160" height="42" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="170" y="165" textAnchor="middle" className="fill-accent text-[11px] font-mono font-semibold">View from Tape B</text>

      <rect x="450" y="140" width="160" height="42" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="530" y="165" textAnchor="middle" className="fill-accent text-[11px] font-mono font-semibold">View from Tape A</text>

      <line x1="475" y1="92" x2="170" y2="140" className="stroke-accent" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#ma-cross-arr)" />
      <line x1="225" y1="92" x2="530" y2="140" className="stroke-accent" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#ma-cross-arr)" />

      <line x1="170" y1="140" x2="85" y2="58" className="stroke-accent/60" strokeWidth="1" markerEnd="url(#ma-cross-arr)" />
      <line x1="530" y1="140" x2="615" y2="58" className="stroke-accent/60" strokeWidth="1" markerEnd="url(#ma-cross-arr)" />

      <text x="350" y="208" textAnchor="middle" className="fill-muted-foreground/40 text-[9px] font-mono">
        views assemble cross-tape context
      </text>
    </svg>
  )
}
