"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function CoreMechanisms() {
  const { t, locale } = useI18n()

  return (
    <section id="mechanisms" className="py-24 md:py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        {/* ═══ APPEND ═══ */}
        <SectionHeader
          number="02"
          title={t("append.title")}
          subtitle={t("append.subtitle")}
        />

        <div className="rounded-xl border border-border bg-card p-5 md:p-8 mb-5">
          <AppendDiagram />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-24">
          {["append.sem1", "append.sem2", "append.sem3"].map((key, i) => (
            <div key={key} className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border border-border bg-card">
              <span className="flex-shrink-0 text-[10px] font-mono text-accent mt-px">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{t(key)}</p>
            </div>
          ))}
        </div>

        {/* ═══ ANCHOR ═══ */}
        <SectionHeader
          number="03"
          title={t("anchor.title")}
          subtitle={t("anchor.subtitle")}
        />

        <div className="rounded-xl border border-border bg-card p-5 md:p-8 mb-5">
          <AnchorDiagram />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-24">
          {["anchor.sem1", "anchor.sem2", "anchor.sem3"].map((key, i) => (
            <div key={key} className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border border-border bg-card">
              <span className="flex-shrink-0 text-[10px] font-mono text-accent mt-px">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{t(key)}</p>
            </div>
          ))}
        </div>

        {/* ═══ HANDOFF ═══ */}
        <SectionHeader
          number="04"
          title={t("handoff.title")}
          subtitle={t("handoff.subtitle")}
        />

        <div className="rounded-xl border border-border bg-card p-5 md:p-8 mb-5">
          <HandoffDiagram />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-5">
          {["handoff.step1", "handoff.step2", "handoff.step3"].map((key, i) => (
            <div key={key} className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border border-border bg-card">
              <span className="flex-shrink-0 text-[10px] font-mono text-accent mt-px">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{t(key)}</p>
            </div>
          ))}
        </div>

        {/* State contract */}
        <div className="rounded-lg bg-foreground px-5 py-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-primary-foreground/35 mb-2">
            {locale === "zh" ? "State 契约示例" : "State Contract Example"}
          </div>
          <pre className="text-[11px] font-mono text-primary-foreground/70 leading-relaxed overflow-x-auto">
{`{ phase: "implement",
  summary: "Discovery complete.",
  next_steps: ["Run migration", "Integration tests"],
  source_ids: [128, 130, 131],
  owner: "agent" }`}
          </pre>
        </div>
      </div>
    </section>
  )
}

function AppendDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 660 230" className="w-full" fill="none">
      <defs>
        <marker id="s-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Participants */}
      <rect x="110" y="12" width="90" height="30" rx="5" className="fill-foreground" />
      <text x="155" y="32" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Worker</text>
      <line x1="155" y1="46" x2="155" y2="215" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" />

      <rect x="400" y="12" width="90" height="30" rx="5" className="fill-foreground" />
      <text x="445" y="32" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Tape</text>
      <line x1="445" y1="46" x2="445" y2="215" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" />

      {/* Message 1 */}
      <line x1="160" y1="76" x2="435" y2="76" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#s-arr)" />
      <text x="300" y="68" textAnchor="middle" className="fill-foreground text-[10px] font-mono">append(entry_101)</text>

      {/* Message 2 */}
      <line x1="160" y1="116" x2="435" y2="116" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#s-arr)" />
      <text x="300" y="108" textAnchor="middle" className="fill-foreground text-[10px] font-mono">append(entry_102)</text>

      {/* Message 3: correction */}
      <line x1="160" y1="156" x2="435" y2="156" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#s-arr)" />
      <text x="300" y="148" textAnchor="middle" className="fill-accent text-[10px] font-mono">append(correction_103)</text>
      <text x="300" y="178" textAnchor="middle" className="fill-accent/50 text-[8px] font-mono">
        {locale === "zh" ? "修正 101, 不删除 101" : "corrects 101, does not delete 101"}
      </text>

      {/* Tape state */}
      <rect x="380" y="195" width="180" height="22" rx="4" className="fill-accent/8 stroke-accent/40" strokeWidth="0.8" />
      <text x="470" y="210" textAnchor="middle" className="fill-accent text-[9px] font-mono">
        [... 101, 102, 103]
      </text>

      {/* Time */}
      <line x1="42" y1="55" x2="42" y2="205" className="stroke-muted-foreground/20" strokeWidth="0.8" />
      <path d="M39 201L42 210L45 201" className="fill-muted-foreground/20" />
      <text x="36" y="135" textAnchor="middle" transform="rotate(-90,36,135)" className="fill-muted-foreground/25 text-[8px] font-mono">time</text>
    </svg>
  )
}

function AnchorDiagram() {
  const { locale } = useI18n()

  const entries = [
    { id: "e1", x: 50, w: 55 },
    { id: "e2", x: 118, w: 55 },
    { id: "A1", x: 200, w: 65, isAnchor: true, label: "discovery" },
    { id: "e4", x: 300, w: 55 },
    { id: "A2", x: 380, w: 65, isAnchor: true, label: "implement" },
    { id: "e6", x: 480, w: 55 },
    { id: "e7", x: 548, w: 55 },
  ]

  return (
    <svg viewBox="0 0 660 180" className="w-full" fill="none">
      {/* Timeline track */}
      <line x1="30" y1="55" x2="625" y2="55" className="stroke-border" strokeWidth="1.5" />

      {entries.map((entry) => (
        <g key={entry.id}>
          <rect
            x={entry.x} y={34} width={entry.w} height={42} rx={5}
            className={entry.isAnchor ? "fill-accent/12 stroke-accent" : "fill-card stroke-border"}
            strokeWidth={entry.isAnchor ? 1.5 : 0.8}
          />
          <text
            x={entry.x + entry.w / 2} y={59} textAnchor="middle"
            className={`text-[11px] font-mono ${entry.isAnchor ? "fill-accent font-semibold" : "fill-foreground"}`}
          >
            {entry.id}
          </text>

          {entry.isAnchor && (
            <g>
              <line x1={entry.x + entry.w / 2} y1={80} x2={entry.x + entry.w / 2} y2={110} className="stroke-accent/50" strokeWidth="1" strokeDasharray="3 2" />
              <path
                d={`M${entry.x + entry.w / 2} 110L${entry.x + entry.w / 2 + 8} 118L${entry.x + entry.w / 2} 126L${entry.x + entry.w / 2 - 8} 118Z`}
                className="fill-accent/15 stroke-accent" strokeWidth="0.8"
              />
              <text x={entry.x + entry.w / 2} y={144} textAnchor="middle" className="fill-accent/60 text-[8px] font-mono">
                {entry.label}
              </text>
            </g>
          )}
        </g>
      ))}

      {/* Annotation: preserved */}
      <path d="M50 18L50 13L170 13L170 18" className="stroke-muted-foreground/30" strokeWidth="0.6" fill="none" />
      <text x="110" y="10" textAnchor="middle" className="fill-muted-foreground/35 text-[7px] font-mono">
        {locale === "zh" ? "preserved" : "preserved"}
      </text>

      {/* Annotation: rebuild from here */}
      <path d="M400 18L400 13L600 13L600 18" className="stroke-accent/40" strokeWidth="0.6" fill="none" />
      <text x="500" y="10" textAnchor="middle" className="fill-accent/50 text-[7px] font-mono">
        {locale === "zh" ? "rebuild from here" : "rebuild from here"}
      </text>
    </svg>
  )
}

function HandoffDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 660 190" className="w-full" fill="none">
      <defs>
        <marker id="h-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Start dot */}
      <circle cx="30" cy="60" r="5" className="fill-foreground" />
      <line x1="38" y1="60" x2="60" y2="60" className="stroke-border" strokeWidth="1" />

      {/* Phase 1 */}
      <rect x="65" y="36" width="130" height="48" rx="8" className="fill-card stroke-border" strokeWidth="1" />
      <text x="130" y="63" textAnchor="middle" className="fill-foreground text-[13px] font-mono font-semibold">Discovery</text>

      {/* Handoff 1 */}
      <line x1="200" y1="60" x2="278" y2="60" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#h-arr)" />
      <rect x="218" y="44" width="52" height="16" rx="3" className="fill-accent/12" />
      <text x="244" y="55" textAnchor="middle" className="fill-accent text-[8px] font-mono font-semibold">handoff</text>

      {/* Anchor diamond */}
      <path d="M244 84L252 92L244 100L236 92Z" className="fill-accent/15 stroke-accent" strokeWidth="0.8" />
      <line x1="244" y1="72" x2="244" y2="82" className="stroke-accent/40" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Phase 2 */}
      <rect x="283" y="36" width="130" height="48" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
      <text x="348" y="63" textAnchor="middle" className="fill-accent text-[13px] font-mono font-semibold">Implement</text>

      {/* Handoff 2 */}
      <line x1="418" y1="60" x2="496" y2="60" className="stroke-accent" strokeWidth="1.5" markerEnd="url(#h-arr)" />
      <rect x="436" y="44" width="52" height="16" rx="3" className="fill-accent/12" />
      <text x="462" y="55" textAnchor="middle" className="fill-accent text-[8px] font-mono font-semibold">handoff</text>

      {/* Phase 3 */}
      <rect x="501" y="36" width="120" height="48" rx="8" className="fill-card stroke-border" strokeWidth="1" />
      <text x="561" y="63" textAnchor="middle" className="fill-foreground text-[13px] font-mono font-semibold">Verify</text>

      {/* End dot */}
      <line x1="626" y1="60" x2="640" y2="60" className="stroke-border" strokeWidth="1" />
      <circle cx="648" cy="60" r="4" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      <circle cx="648" cy="60" r="1.5" className="fill-foreground" />

      {/* State payload */}
      <rect x="283" y="130" width="320" height="42" rx="6" className="fill-secondary/50 stroke-border" strokeWidth="0.5" />
      <line x1="348" y1="87" x2="348" y2="128" className="stroke-muted-foreground/20" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="296" y="148" className="fill-muted-foreground/60 text-[8px] font-mono">
        {'state: { phase: "implement", summary: "Discovery complete."'}
      </text>
      <text x="296" y="162" className="fill-muted-foreground/60 text-[8px] font-mono">
        {'         source_ids: [128, 130, 131], owner: "agent" }'}
      </text>
    </svg>
  )
}
