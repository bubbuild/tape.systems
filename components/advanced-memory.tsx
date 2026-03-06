"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function AdvancedMemory() {
  const { t } = useI18n()

  return (
    <section id="advanced" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="07"
          title={t("advanced.memory.title")}
          subtitle={t("advanced.memory.subtitle")}
        />

        <div className="rounded-xl border border-border bg-card p-4 md:p-8 mb-6">
          <MemoryGraphDiagram />
        </div>

        <div className="rounded-xl bg-foreground p-5 md:p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-background/50 mb-3">
            {t("advanced.memory.why.title")}
          </div>
          <div className="flex flex-col gap-2">
            {["advanced.memory.why.1", "advanced.memory.why.2", "advanced.memory.why.3"].map((key, i) => (
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

function MemoryGraphDiagram() {
  return (
    <svg viewBox="0 0 700 260" className="w-full" fill="none">
      <defs>
        <marker id="memg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="memg-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Tape */}
      <rect x="60" y="18" width="580" height="28" rx="6" className="fill-secondary/30 stroke-border" strokeWidth="1" />
      <text x="95" y="37" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">Tape</text>

      {[120, 300, 480].map((x, i) => (
        <g key={x}>
          <rect x={x - 18} y="23" width="36" height="18" rx="4" className="fill-card stroke-border" strokeWidth="0.6" />
          <text x={x} y="36" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
            e{101 + i}
          </text>
        </g>
      ))}

      {/* Anchors from tape */}
      {[
        { id: "A1", x: 200 },
        { id: "A2", x: 420 },
      ].map((anchor) => (
        <g key={anchor.id}>
          <path d={`M ${anchor.x} 16 L ${anchor.x + 8} 28 L ${anchor.x} 40 L ${anchor.x - 8} 28 Z`} className="fill-accent/15 stroke-accent" strokeWidth="1" />
          <text x={anchor.x} y="32" textAnchor="middle" className="fill-accent text-[8px] font-mono">
            {anchor.id}
          </text>
          <line x1={anchor.x} y1="40" x2={anchor.x} y2="86" className="stroke-muted-foreground/40" strokeWidth="1" strokeDasharray="4 3" />
        </g>
      ))}

      {/* Anchor graph */}
      <text x="200" y="104" textAnchor="middle" className="fill-muted-foreground/50 text-[9px] font-mono">
        Anchor Graph
      </text>
      <circle cx="200" cy="130" r="18" className="fill-card stroke-foreground" strokeWidth="1.2" />
      <text x="200" y="135" textAnchor="middle" className="fill-foreground text-[10px] font-mono">A1</text>

      <circle cx="140" cy="190" r="18" className="fill-card stroke-border" strokeWidth="1" />
      <text x="140" y="195" textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono">A2</text>

      <circle cx="260" cy="190" r="18" className="fill-card stroke-border" strokeWidth="1" />
      <text x="260" y="195" textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono">A3</text>

      <line x1="200" y1="148" x2="155" y2="172" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#memg-arr)" />
      <line x1="200" y1="148" x2="245" y2="172" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#memg-arr)" />

      {/* Memory view + index */}
      <rect x="360" y="96" width="280" height="70" rx="10" className="fill-accent/8 stroke-accent" strokeWidth="1.2" />
      <text x="500" y="118" textAnchor="middle" className="fill-accent text-[12px] font-mono font-semibold">Memory View</text>
      <text x="500" y="136" textAnchor="middle" className="fill-accent/60 text-[9px] font-mono">assembled by policy</text>

      <rect x="360" y="186" width="280" height="40" rx="8" className="fill-secondary stroke-border" strokeWidth="1" />
      <text x="500" y="210" textAnchor="middle" className="fill-foreground text-[11px] font-mono">Memory Index</text>

      <line x1="200" y1="190" x2="360" y2="120" className="stroke-accent/60" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#memg-arr-a)" />
      <line x1="200" y1="190" x2="360" y2="140" className="stroke-accent/60" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#memg-arr-a)" />
      <line x1="500" y1="186" x2="500" y2="166" className="stroke-accent" strokeWidth="1.2" markerEnd="url(#memg-arr-a)" />
    </svg>
  )
}
