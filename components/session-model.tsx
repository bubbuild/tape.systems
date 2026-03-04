"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function SessionModel() {
  const { t, locale } = useI18n()

  return (
    <section id="sessions" className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="05"
          title={t("session.title")}
          subtitle={t("session.subtitle")}
        />

        {/* Three session diagrams stacked, each with large SVG */}
        <div className="flex flex-col gap-8">
          {/* Single Session */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex items-baseline gap-3">
              <span className="text-xs font-mono text-muted-foreground/50">A</span>
              <h3 className="text-sm font-mono font-semibold text-foreground">{t("session.single.title")}</h3>
              <p className="text-xs text-muted-foreground">{t("session.single.desc")}</p>
            </div>
            <div className="p-4 md:px-8 md:pb-6">
              <SingleSessionDiagram />
            </div>
          </div>

          {/* Multi-turn */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex items-baseline gap-3">
              <span className="text-xs font-mono text-muted-foreground/50">B</span>
              <h3 className="text-sm font-mono font-semibold text-foreground">{t("session.multi.title")}</h3>
              <p className="text-xs text-muted-foreground">{t("session.multi.desc")}</p>
            </div>
            <div className="p-4 md:px-8 md:pb-6">
              <MultiTurnDiagram />
            </div>
          </div>

          {/* Isolated */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 pt-5 pb-2 flex items-baseline gap-3">
              <span className="text-xs font-mono text-muted-foreground/50">C</span>
              <h3 className="text-sm font-mono font-semibold text-foreground">{t("session.isolated.title")}</h3>
              <p className="text-xs text-muted-foreground">{t("session.isolated.desc")}</p>
            </div>
            <div className="p-4 md:px-8 md:pb-6">
              <IsolatedSessionDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SingleSessionDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 100" className="w-full" fill="none">
      {/* Session label */}
      <rect x="20" y="30" width="90" height="40" rx="8" className="fill-foreground" />
      <text x="65" y="55" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Session A</text>

      {/* Arrow to tape */}
      <line x1="115" y1="50" x2="145" y2="50" className="stroke-border" strokeWidth="1.5" />

      {/* Tape track */}
      <rect x="150" y="35" width="500" height="30" rx="6" className="fill-secondary/50 stroke-border" strokeWidth="1" />

      {/* Turn blocks inside tape */}
      {[
        { label: "turn 1", x: 165 },
        { label: "turn 2", x: 270 },
        { label: "turn 3", x: 375 },
        { label: "turn 4", x: 480 },
      ].map((turn) => (
        <g key={turn.label}>
          <rect x={turn.x} y={40} width={80} height={20} rx={4} className="fill-card stroke-border" strokeWidth="0.5" />
          <text x={turn.x + 40} y={54} textAnchor="middle" className="fill-foreground text-[10px] font-mono">{turn.label}</text>
        </g>
      ))}

      {/* Arrow at end */}
      <text x="600" y={54} textAnchor="middle" className="fill-muted-foreground text-[12px] font-mono">...</text>

      {/* Time label */}
      <text x="400" y={85} textAnchor="middle" className="fill-muted-foreground/40 text-[9px] font-mono">
        {locale === "zh" ? "entry 共用一条时间线" : "entries share one timeline"}
      </text>
    </svg>
  )
}

function MultiTurnDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 140" className="w-full" fill="none">
      {/* Timeline */}
      <line x1="50" y1="50" x2="650" y2="50" className="stroke-border" strokeWidth="2" />

      {/* Turn nodes */}
      {[
        { label: "T1", x: 100, dim: true },
        { label: "T2", x: 190, dim: true },
        { label: "T3", x: 280, isAnchor: true },
        { label: "T4", x: 370, active: true },
        { label: "T5", x: 460, active: true },
        { label: "T6", x: 550, active: true },
      ].map((turn) => (
        <g key={turn.label}>
          <circle
            cx={turn.x}
            cy={50}
            r={18}
            className={
              turn.isAnchor
                ? "fill-accent/15 stroke-accent"
                : turn.dim
                ? "fill-secondary stroke-border"
                : turn.active
                ? "fill-card stroke-foreground"
                : "fill-card stroke-border"
            }
            strokeWidth={turn.isAnchor ? 2 : 1}
          />
          <text
            x={turn.x}
            y={55}
            textAnchor="middle"
            className={`text-[11px] font-mono font-medium ${
              turn.isAnchor ? "fill-accent" : turn.dim ? "fill-muted-foreground/50" : "fill-foreground"
            }`}
          >
            {turn.label}
          </text>
        </g>
      ))}

      {/* Anchor marker */}
      <line x1="280" y1="72" x2="280" y2="100" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M 280 100 L 290 110 L 280 120 L 270 110 Z" className="fill-accent/20 stroke-accent" strokeWidth="1" />
      <text x="280" y="136" textAnchor="middle" className="fill-accent text-[9px] font-mono">anchor</text>

      {/* Dimmed region bracket */}
      <path d="M 80 22 L 80 18 L 220 18 L 220 22" className="stroke-muted-foreground/30" strokeWidth="0.8" fill="none" />
      <text x="150" y="14" textAnchor="middle" className="fill-muted-foreground/30 text-[8px] font-mono">
        {locale === "zh" ? "默认不入窗" : "not in default view"}
      </text>

      {/* Active region bracket */}
      <path d="M 350 22 L 350 18 L 580 18 L 580 22" className="stroke-foreground/50" strokeWidth="0.8" fill="none" />
      <text x="465" y="14" textAnchor="middle" className="fill-foreground/50 text-[8px] font-mono">
        {locale === "zh" ? "按需装配" : "assembled on demand"}
      </text>
    </svg>
  )
}

function IsolatedSessionDiagram() {
  const { locale } = useI18n()

  return (
    <svg viewBox="0 0 700 160" className="w-full" fill="none">
      {/* Session A */}
      <rect x="20" y="25" width="100" height="40" rx="8" className="fill-foreground" />
      <text x="70" y="50" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Session A</text>
      <line x1="125" y1="45" x2="155" y2="45" className="stroke-border" strokeWidth="1.5" />
      <rect x="160" y="30" width="340" height="30" rx="6" className="fill-secondary/50 stroke-border" strokeWidth="1" />
      <text x="330" y="50" textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono">tape A timeline</text>

      {/* Session B */}
      <rect x="20" y="95" width="100" height="40" rx="8" className="fill-foreground/80" />
      <text x="70" y="120" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono font-semibold">Session B</text>
      <line x1="125" y1="115" x2="155" y2="115" className="stroke-border" strokeWidth="1.5" />
      <rect x="160" y="100" width="340" height="30" rx="6" className="fill-secondary/50 stroke-border" strokeWidth="1" />
      <text x="330" y="120" textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono">tape B timeline</text>

      {/* Isolation barrier */}
      <line x1="155" y1="68" x2="505" y2="68" className="stroke-border" strokeWidth="1" strokeDasharray="6 4" />
      <rect x="280" y="62" width="100" height="14" rx="4" className="fill-background" />
      <text x="330" y="73" textAnchor="middle" className="fill-muted-foreground/50 text-[8px] font-mono">
        {locale === "zh" ? "默认隔离" : "isolated by default"}
      </text>

      {/* Cross-query arrow */}
      <line x1="540" y1="50" x2="540" y2="110" className="stroke-accent" strokeWidth="1.5" strokeDasharray="5 3" />
      <circle cx="540" cy="80" r="3" className="fill-accent" />
      <text x="610" y="78" textAnchor="middle" className="fill-accent text-[9px] font-mono">
        {locale === "zh" ? "显式跨会话检索" : "explicit cross-query"}
      </text>
      <text x="610" y="92" textAnchor="middle" className="fill-accent/50 text-[8px] font-mono">
        {locale === "zh" ? "（主动选择）" : "(actively chosen)"}
      </text>
    </svg>
  )
}
