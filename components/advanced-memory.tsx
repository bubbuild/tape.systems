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
    <svg viewBox="0 0 700 230" className="w-full" fill="none">
      <defs>
        <marker id="memg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="memg-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Participants */}
      <rect x="50" y="12" width="140" height="32" rx="6" className="fill-foreground" />
      <text x="120" y="33" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Tape</text>
      <line x1="120" y1="46" x2="120" y2="204" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 4" />

      <rect x="280" y="12" width="140" height="32" rx="6" className="fill-secondary" />
      <text x="350" y="33" textAnchor="middle" className="fill-foreground text-[11px] font-mono font-semibold">Anchor Graph</text>
      <line x1="350" y1="46" x2="350" y2="204" className="stroke-border" strokeWidth="1.5" strokeDasharray="5 4" />

      <rect x="510" y="12" width="140" height="32" rx="6" className="fill-accent" />
      <text x="580" y="33" textAnchor="middle" className="fill-accent-foreground text-[11px] font-mono font-semibold">Memory View</text>
      <line x1="580" y1="46" x2="580" y2="204" className="stroke-accent/30" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* Tape entries */}
      {[80, 110, 140].map((y, i) => (
        <g key={y}>
          <rect x="95" y={y} width="50" height="20" rx="4" className="fill-card stroke-border" strokeWidth="0.6" />
          <text x="120" y={y + 14} textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
            e{101 + i}
          </text>
        </g>
      ))}

      {/* Anchor tree */}
      <circle cx="350" cy="86" r="14" className="fill-card stroke-border" strokeWidth="1" />
      <text x="350" y="90" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">A1</text>

      <circle cx="320" cy="130" r="13" className="fill-card stroke-border" strokeWidth="1" />
      <text x="320" y="134" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">A2</text>

      <circle cx="380" cy="130" r="13" className="fill-card stroke-border" strokeWidth="1" />
      <text x="380" y="134" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">A3</text>

      <circle cx="300" cy="168" r="12" className="fill-card stroke-border" strokeWidth="1" />
      <text x="300" y="172" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">A4</text>

      <line x1="350" y1="100" x2="328" y2="118" className="stroke-muted-foreground/60" strokeWidth="1" />
      <line x1="350" y1="100" x2="372" y2="118" className="stroke-muted-foreground/60" strokeWidth="1" />
      <line x1="320" y1="142" x2="307" y2="156" className="stroke-muted-foreground/60" strokeWidth="1" />

      {/* Memory view box */}
      <rect x="520" y="92" width="120" height="56" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="580" y="116" textAnchor="middle" className="fill-accent text-[10px] font-mono font-semibold">View</text>
      <text x="580" y="132" textAnchor="middle" className="fill-accent/60 text-[8px] font-mono">assembled</text>

      {/* Flows */}
      <line x1="150" y1="86" x2="330" y2="86" className="stroke-muted-foreground/50" strokeWidth="1" markerEnd="url(#memg-arr)" />
      <text x="242" y="78" textAnchor="middle" className="fill-muted-foreground/40 text-[8px] font-mono">anchors</text>

      <line x1="390" y1="120" x2="520" y2="120" className="stroke-accent" strokeWidth="1.2" markerEnd="url(#memg-arr-a)" />
      <text x="442" y="112" textAnchor="middle" className="fill-accent/70 text-[8px] font-mono">assemble</text>

      <line x1="150" y1="154" x2="520" y2="154" className="stroke-accent/40" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#memg-arr-a)" />
    </svg>
  )
}
