"use client"

import type { ReactNode } from "react"
import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function Appendix() {
  const { t, locale } = useI18n()

  return (
    <section id="appendix" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="10"
          title={t("appendix.title")}
          subtitle={t("appendix.subtitle")}
        />

        <div className="flex flex-col gap-8">
          <AppendixCard
            label="A"
            title={t("appendix.access.title")}
            description={t("appendix.access.desc")}
            note={t("appendix.access.note")}
            diagram={<AccessControlDiagram />}
          />

          <AppendixCard
            label="B"
            title={t("appendix.observability.title")}
            description={t("appendix.observability.desc")}
            note={t("appendix.observability.note")}
            referenceLabel={t("appendix.observability.ref")}
            referenceHref="https://bub.build/architecture/"
            diagram={<ObservabilityDiagram />}
          />

          <AppendixCard
            label="C"
            title={t("appendix.eval.title")}
            description={t("appendix.eval.desc")}
            note={t("appendix.eval.note")}
            referenceLabel={t("appendix.eval.ref")}
            referenceHref="https://arize.com/docs/phoenix"
            diagram={<EvaluationDiagram />}
          />

          <AppendixCard
            label="D"
            title={t("appendix.training.title")}
            description={
              <>
                {t("appendix.training.desc.before")}{" "}
                <a
                  href="https://github.com/inclusionAI/AReaL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground/60 transition-colors"
                >
                  AReaL
                </a>
                {locale === "zh" ? " " : ""}
                {t("appendix.training.desc.after")}
              </>
            }
            note={t("appendix.training.note")}
            referenceLabel={t("appendix.training.ref")}
            referenceHref="https://github.com/inclusionAI/AReaL/tree/main/examples/openclaw"
            diagram={<TrainingDiagram />}
          />
        </div>
      </div>
    </section>
  )
}

function AppendixCard({
  label,
  title,
  description,
  note,
  referenceLabel,
  referenceHref,
  diagram,
}: {
  label: string
  title: string
  description: ReactNode
  note: string
  referenceLabel?: string
  referenceHref?: string
  diagram: ReactNode
}) {
  const { locale } = useI18n()

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 pt-5 pb-2 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-mono text-muted-foreground/50">{label}</span>
          <h3 className="text-sm font-mono font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>

      <div className="px-4 md:px-8 py-4">{diagram}</div>

      <div className="bg-foreground px-5 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-xs font-mono text-background/70 leading-relaxed">{note}</p>
        {referenceLabel && referenceHref ? (
          <a
            href={referenceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-mono text-background/50 hover:text-background/75 transition-colors"
          >
            <span>{locale === "zh" ? "参考" : "ref"}</span>
            <span>{referenceLabel}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-current">
              <path
                d="M 2 8 L 8 2 M 4 2 L 8 2 L 8 6"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : null}
      </div>
    </div>
  )
}

function AccessControlDiagram() {
  const { locale, t } = useI18n()

  return (
    <svg viewBox="0 0 700 240" className="w-full" fill="none">
      <defs>
        <marker id="acl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="acl-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="28" y="90" width="120" height="64" rx="12" className="fill-foreground" />
      <text x="88" y="114" textAnchor="middle" className="fill-primary-foreground text-[11px] font-mono font-semibold">
        {locale === "zh" ? "Admin" : "Admin"}
      </text>
      <text x="88" y="132" textAnchor="middle" className="fill-primary-foreground/70 text-[8px] font-mono">
        {locale === "zh" ? "audit scope" : "audit scope"}
      </text>
      <text x="88" y="144" textAnchor="middle" className="fill-primary-foreground/70 text-[8px] font-mono">
        {locale === "zh" ? "read role" : "read role"}
      </text>

      <rect x="196" y="70" width="152" height="104" rx="12" className="fill-secondary/35 stroke-border" strokeWidth="1" />
      <text x="272" y="98" textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono font-semibold">
        {locale === "zh" ? "Boundary" : "Boundary"}
      </text>
      {[
        { y: 110, label: locale === "zh" ? "owner" : "owner" },
        { y: 134, label: locale === "zh" ? "grant" : "grant" },
        { y: 158, label: locale === "zh" ? "read-only" : "read-only" },
      ].map((item) => (
        <g key={item.label}>
          <rect x="224" y={item.y} width="96" height="14" rx="5" className="fill-card stroke-border" strokeWidth="0.8" />
          <text x="272" y={item.y + 9} textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">
            {item.label}
          </text>
        </g>
      ))}

      <rect x="390" y="36" width="132" height="78" rx="12" className="fill-card stroke-border" strokeWidth="1" />
      <text x="456" y="58" textAnchor="middle" className="fill-foreground text-[10px] font-mono font-semibold">
        {locale === "zh" ? "User A" : "User A"}
      </text>
      <text x="456" y="72" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
        {locale === "zh" ? "Database" : "Database"}
      </text>
      <rect x="416" y="80" width="80" height="20" rx="6" className="fill-secondary/30 stroke-border" strokeWidth="1" />
      <text x="456" y="93" textAnchor="middle" className="fill-foreground text-[8px] font-mono font-semibold">
        {locale === "zh" ? "Tape Table" : "Tape Table"}
      </text>

      <rect x="390" y="126" width="132" height="78" rx="12" className="fill-card stroke-border" strokeWidth="1" />
      <text x="456" y="148" textAnchor="middle" className="fill-foreground text-[10px] font-mono font-semibold">
        {locale === "zh" ? "User B" : "User B"}
      </text>
      <text x="456" y="162" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
        {locale === "zh" ? "Database" : "Database"}
      </text>
      <rect x="416" y="170" width="80" height="20" rx="6" className="fill-secondary/30 stroke-border" strokeWidth="1" />
      <text x="456" y="183" textAnchor="middle" className="fill-foreground text-[8px] font-mono font-semibold">
        {locale === "zh" ? "Tape Table" : "Tape Table"}
      </text>

      <rect x="560" y="84" width="112" height="76" rx="12" className="fill-accent/10 stroke-accent" strokeWidth="1" />
      <text x="616" y="108" textAnchor="middle" className="fill-accent text-[10px] font-mono font-semibold">
        {locale === "zh" ? "Audit" : "Audit"}
      </text>
      <text x="616" y="126" textAnchor="middle" className="fill-accent/70 text-[8px] font-mono">
        {locale === "zh" ? "read-only" : "read-only"}
      </text>
      <text x="616" y="142" textAnchor="middle" className="fill-accent/70 text-[8px] font-mono">
        {locale === "zh" ? "multi-user" : "multi-user"}
      </text>

      <line x1="148" y1="122" x2="196" y2="122" className="stroke-muted-foreground/40" strokeWidth="1" markerEnd="url(#acl-arr)" />

      <line x1="348" y1="122" x2="366" y2="122" className="stroke-muted-foreground/35" strokeWidth="1" />
      <line x1="366" y1="90" x2="366" y2="166" className="stroke-muted-foreground/25" strokeWidth="1" />
      <line x1="366" y1="90" x2="390" y2="90" className="stroke-muted-foreground/35" strokeWidth="1" markerEnd="url(#acl-arr)" />
      <line x1="366" y1="166" x2="390" y2="166" className="stroke-muted-foreground/35" strokeWidth="1" markerEnd="url(#acl-arr)" />

      <line x1="522" y1="90" x2="540" y2="90" className="stroke-accent/60" strokeWidth="1" />
      <line x1="522" y1="180" x2="540" y2="180" className="stroke-accent/60" strokeWidth="1" />
      <line x1="540" y1="90" x2="540" y2="180" className="stroke-accent/35" strokeWidth="1" />
      <line x1="540" y1="122" x2="560" y2="122" className="stroke-accent/60" strokeWidth="1" markerEnd="url(#acl-arr-a)" />

      <line x1="560" y1="176" x2="672" y2="176" className="stroke-muted-foreground/20" strokeWidth="1" strokeDasharray="4 3" />
      <text x="616" y="168" textAnchor="middle" className="fill-muted-foreground/45 text-[7px] font-mono">
        {t("appendix.access.writeBlock")}
      </text>
    </svg>
  )
}

function ObservabilityDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 210" className="w-full" fill="none">
      <defs>
        <marker id="obs-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="obs-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="28" y="18" width="120" height="34" rx="7" className="fill-foreground" />
      <text x="88" y="40" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">
        {locale === "zh" ? "Session" : "Session"}
      </text>

      <rect x="208" y="18" width="136" height="34" rx="7" className="fill-secondary" />
      <text x="276" y="40" textAnchor="middle" className="fill-foreground text-[12px] font-mono font-semibold">
        Tape
      </text>

      <line x1="148" y1="35" x2="198" y2="35" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#obs-arr)" />

      {[
        { x: 224, y: 82, label: locale === "zh" ? "anchor" : "anchor", className: "fill-accent/12 stroke-accent" },
        { x: 224, y: 114, label: locale === "zh" ? "msg" : "msg", className: "fill-card stroke-border" },
        { x: 224, y: 146, label: locale === "zh" ? "tool" : "tool", className: "fill-card stroke-border" },
        { x: 224, y: 178, label: locale === "zh" ? "event" : "event", className: "fill-card stroke-border" },
      ].map((entry) => (
        <g key={entry.label}>
          <rect x={entry.x} y={entry.y} width="104" height="20" rx="5" className={entry.className} strokeWidth="1" />
          <text x={entry.x + 52} y={entry.y + 13} textAnchor="middle" className="fill-foreground text-[9px] font-mono">
            {entry.label}
          </text>
        </g>
      ))}

      <text x="276" y="70" textAnchor="middle" className="fill-muted-foreground/45 text-[9px] font-mono">
        {locale === "zh" ? "same append-only facts" : "same append-only facts"}
      </text>

      <rect x="378" y="78" width="128" height="106" rx="12" className="fill-secondary/35 stroke-border" strokeWidth="1" />
      <text x="442" y="100" textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono font-semibold">
        {locale === "zh" ? "derived views" : "derived views"}
      </text>
      {["timeline", "replay", "qa context"].map((item, index) => (
        <g key={item}>
          <rect x="400" y={114 + index * 20} width="84" height="14" rx="5" className="fill-card stroke-border" strokeWidth="0.8" />
          <text x="442" y={123 + index * 20} textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">
            {item}
          </text>
        </g>
      ))}

      <rect x="548" y="104" width="108" height="28" rx="8" className="fill-accent/12 stroke-accent" strokeWidth="1" />
      <text x="562" y="116" className="fill-accent text-[9px] font-mono font-semibold">
        {locale === "zh" ? "Trace UI" : "Trace UI"}
      </text>
      <text x="562" y="125" className="fill-accent/65 text-[7px] font-mono">
        {locale === "zh" ? "timeline / replay" : "timeline / replay"}
      </text>

      <rect x="548" y="144" width="108" height="28" rx="8" className="fill-secondary/40 stroke-border" strokeWidth="1" />
      <text x="562" y="156" className="fill-foreground text-[9px] font-mono font-semibold">
        {locale === "zh" ? "Ask Bub" : "Ask Bub"}
      </text>
      <text x="562" y="165" className="fill-muted-foreground text-[7px] font-mono">
        {locale === "zh" ? "inspect / explain" : "inspect / explain"}
      </text>

      <line x1="328" y1="124" x2="378" y2="124" className="stroke-muted-foreground/35" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#obs-arr)" />
      <line x1="506" y1="126" x2="548" y2="118" className="stroke-accent/55" strokeWidth="1" markerEnd="url(#obs-arr-a)" />
      <line x1="506" y1="146" x2="548" y2="158" className="stroke-foreground/45" strokeWidth="1" markerEnd="url(#obs-arr)" />
    </svg>
  )
}

function EvaluationDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 220" className="w-full" fill="none">
      <defs>
        <marker id="eval-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="eval-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="28" y="18" width="132" height="34" rx="7" className="fill-foreground" />
      <text x="94" y="40" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">
        Tape Slice
      </text>

      <rect x="246" y="18" width="146" height="34" rx="7" className="fill-secondary" />
      <text x="319" y="40" textAnchor="middle" className="fill-foreground text-[12px] font-mono font-semibold">
        {locale === "zh" ? "Human Review" : "Human Review"}
      </text>

      <rect x="528" y="18" width="144" height="34" rx="7" className="fill-accent" />
      <text x="600" y="40" textAnchor="middle" className="fill-accent-foreground text-[12px] font-mono font-semibold">
        {locale === "zh" ? "Derived Facts" : "Derived Facts"}
      </text>

      <line x1="160" y1="35" x2="236" y2="35" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#eval-arr)" />
      <line x1="392" y1="35" x2="518" y2="35" className="stroke-accent" strokeWidth="1.2" markerEnd="url(#eval-arr-a)" />

      <rect x="44" y="82" width="100" height="24" rx="6" className="fill-card stroke-border" strokeWidth="1" />
      <text x="94" y="98" textAnchor="middle" className="fill-foreground text-[9px] font-mono">
        anchor A12
      </text>

      <rect x="44" y="116" width="100" height="22" rx="5" className="fill-card stroke-border" strokeWidth="1" />
      <text x="94" y="131" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
        tool / event / msg
      </text>

      <rect x="44" y="148" width="100" height="24" rx="6" className="fill-accent/12 stroke-accent" strokeWidth="1" />
      <text x="94" y="164" textAnchor="middle" className="fill-accent text-[9px] font-mono">
        anchor A13
      </text>

      <text x="94" y="190" textAnchor="middle" className="fill-muted-foreground/40 text-[8px] font-mono">
        {locale === "zh" ? "bounded by anchors" : "bounded by anchors"}
      </text>

      {[
        { x: 262, y: 84, label: locale === "zh" ? "history replay" : "history replay" },
        { x: 262, y: 118, label: locale === "zh" ? "decision check" : "decision check" },
        { x: 262, y: 152, label: locale === "zh" ? "notes" : "notes" },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y={item.y} width="114" height="22" rx="5" className="fill-card stroke-border" strokeWidth="1" />
          <text x={item.x + 57} y={item.y + 14} textAnchor="middle" className="fill-foreground text-[8px] font-mono">
            {item.label}
          </text>
        </g>
      ))}

      <rect x="422" y="90" width="78" height="76" rx="10" className="fill-secondary/35 stroke-border" strokeWidth="1" />
      <text x="461" y="111" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono font-semibold">
        {locale === "zh" ? "append" : "append"}
      </text>
      <text x="461" y="128" textAnchor="middle" className="fill-muted-foreground/70 text-[7px] font-mono">
        score
      </text>
      <text x="461" y="141" textAnchor="middle" className="fill-muted-foreground/70 text-[7px] font-mono">
        label
      </text>
      <text x="461" y="154" textAnchor="middle" className="fill-muted-foreground/70 text-[7px] font-mono">
        rationale
      </text>

      <line x1="144" y1="160" x2="262" y2="160" className="stroke-muted-foreground/35" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#eval-arr)" />
      <line x1="376" y1="95" x2="422" y2="114" className="stroke-accent/55" strokeWidth="1" markerEnd="url(#eval-arr-a)" />
      <line x1="376" y1="129" x2="422" y2="129" className="stroke-accent/55" strokeWidth="1" markerEnd="url(#eval-arr-a)" />
      <line x1="376" y1="163" x2="422" y2="144" className="stroke-accent/55" strokeWidth="1" markerEnd="url(#eval-arr-a)" />

      {[
        { y: 84, title: locale === "zh" ? "Replay" : "Replay", detail: locale === "zh" ? "history stays visible" : "history stays visible" },
        { y: 122, title: locale === "zh" ? "Check" : "Check", detail: locale === "zh" ? "decisions stay inspectable" : "decisions stay inspectable" },
        { y: 160, title: locale === "zh" ? "Recall" : "Recall", detail: locale === "zh" ? "labels stay linked" : "labels stay linked" },
      ].map((block) => (
        <g key={block.title}>
          <rect x="536" y={block.y} width="128" height="28" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1" />
          <text x="548" y={block.y + 12} className="fill-accent text-[9px] font-mono font-semibold">
            {block.title}
          </text>
          <text x="548" y={block.y + 21} className="fill-accent/60 text-[7px] font-mono">
            {block.detail}
          </text>
        </g>
      ))}
    </svg>
  )
}

function TrainingDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 220" className="w-full" fill="none">
      <defs>
        <marker id="train-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-foreground" strokeWidth="1.5" />
        </marker>
        <marker id="train-arr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1L9 5L0 9" className="fill-none stroke-accent" strokeWidth="1.5" />
        </marker>
      </defs>

      <rect x="28" y="18" width="126" height="34" rx="7" className="fill-foreground" />
      <text x="91" y="40" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">
        {locale === "zh" ? "Agent Runtime" : "Agent Runtime"}
      </text>

      <rect x="224" y="18" width="118" height="34" rx="7" className="fill-secondary" />
      <text x="283" y="40" textAnchor="middle" className="fill-foreground text-[12px] font-mono font-semibold">
        Tape
      </text>

      <rect x="514" y="18" width="154" height="34" rx="7" className="fill-accent" />
      <text x="591" y="40" textAnchor="middle" className="fill-accent-foreground text-[12px] font-mono font-semibold">
        RL Trainer
      </text>

      <line x1="154" y1="35" x2="214" y2="35" className="stroke-foreground" strokeWidth="1.2" markerEnd="url(#train-arr)" />
      <line x1="342" y1="35" x2="504" y2="35" className="stroke-accent" strokeWidth="1.2" markerEnd="url(#train-arr-a)" />

      <rect x="232" y="76" width="102" height="26" rx="6" className="fill-card stroke-border" strokeWidth="1" />
      <text x="283" y="93" textAnchor="middle" className="fill-foreground text-[10px] font-mono">
        session/start
      </text>

      {[
        { x: 232, y: 116, w: 102, label: locale === "zh" ? "tool + event trace" : "tool + event trace" },
        { x: 232, y: 150, w: 102, label: locale === "zh" ? "assistant turns" : "assistant turns" },
      ].map((item) => (
        <g key={item.label}>
          <rect x={item.x} y={item.y} width={item.w} height="22" rx="5" className="fill-card stroke-border" strokeWidth="1" />
          <text x={item.x + item.w / 2} y={item.y + 14} textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
            {item.label}
          </text>
        </g>
      ))}

      <line x1="283" y1="102" x2="283" y2="116" className="stroke-border" strokeWidth="1" />
      <line x1="283" y1="138" x2="283" y2="150" className="stroke-border" strokeWidth="1" />

      <rect x="404" y="88" width="72" height="72" rx="10" className="fill-secondary/35 stroke-border" strokeWidth="1" />
      <text x="440" y="109" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono font-semibold">
        {locale === "zh" ? "export" : "export"}
      </text>
      <text x="440" y="126" textAnchor="middle" className="fill-muted-foreground/70 text-[7px] font-mono">
        {locale === "zh" ? "episode" : "episode"}
      </text>
      <text x="440" y="139" textAnchor="middle" className="fill-muted-foreground/70 text-[7px] font-mono">
        reward
      </text>
      <text x="440" y="152" textAnchor="middle" className="fill-muted-foreground/70 text-[7px] font-mono">
        provenance
      </text>

      <line x1="334" y1="161" x2="404" y2="124" className="stroke-muted-foreground/35" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#train-arr)" />

      {[
        { y: 84, title: locale === "zh" ? "Proxy Input" : "Proxy Input", detail: locale === "zh" ? "OpenAI-compatible runtime" : "OpenAI-compatible runtime" },
        { y: 122, title: locale === "zh" ? "Async Update" : "Async Update", detail: locale === "zh" ? "train after enough episodes" : "train after enough episodes" },
        { y: 160, title: locale === "zh" ? "Next Session" : "Next Session", detail: locale === "zh" ? "serve newer weights" : "serve newer weights" },
      ].map((block) => (
        <g key={block.title}>
          <rect x="522" y={block.y} width="138" height="28" rx="6" className="fill-accent/10 stroke-accent" strokeWidth="1" />
          <text x="534" y={block.y + 12} className="fill-accent text-[9px] font-mono font-semibold">
            {block.title}
          </text>
          <text x="534" y={block.y + 21} className="fill-accent/60 text-[7px] font-mono">
            {block.detail}
          </text>
        </g>
      ))}

      <line x1="476" y1="124" x2="522" y2="98" className="stroke-accent/55" strokeWidth="1" markerEnd="url(#train-arr-a)" />
      <line x1="476" y1="124" x2="522" y2="136" className="stroke-accent/55" strokeWidth="1" markerEnd="url(#train-arr-a)" />
      <line x1="591" y1="188" x2="91" y2="188" className="stroke-accent/30" strokeWidth="1" strokeDasharray="5 4" markerEnd="url(#train-arr-a)" />
      <text x="340" y="203" textAnchor="middle" className="fill-accent/55 text-[8px] font-mono">
        {locale === "zh" ? "episode refresh / weight refresh" : "episode refresh / weight refresh"}
      </text>
    </svg>
  )
}
