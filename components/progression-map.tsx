"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function ProgressionMap() {
  const { t, locale } = useI18n()

  return (
    <section className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="08"
          title={locale === "zh" ? "递进关系" : "Progression"}
          subtitle={
            locale === "zh"
              ? "从事实追加到高阶执行隔离的完整路径"
              : "The complete path from fact appending to advanced execution isolation"
          }
        />

        {/* Full progression diagram */}
        <div className="rounded-xl border border-border bg-card p-4 md:p-8 mb-10">
          <ProgressionDiagram />
        </div>

        {/* Mapping table */}
        <h3 className="text-lg font-semibold text-foreground mb-4">{t("table.title")}</h3>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t("table.topic")}
                  </th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t("table.mechanisms")}
                  </th>
                  <th className="text-center px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t("table.factChange")}
                  </th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t("table.traceability")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    topic: "compact",
                    mech: "handoff + anchor + selective view",
                    change: locale === "zh" ? "否" : "No",
                    trace: locale === "zh" ? "可回溯到 anchor 前历史" : "Traceable to pre-anchor history",
                  },
                  {
                    topic: "summary",
                    mech: "anchor.state + provenance",
                    change: locale === "zh" ? "否" : "No",
                    trace: locale === "zh" ? "必须带 source refs" : "Must include source refs",
                  },
                  {
                    topic: "memory",
                    mech: "derived index + raw reload",
                    change: locale === "zh" ? "否" : "No",
                    trace: locale === "zh" ? "命中后回读 raw entries" : "Reload raw entries after hit",
                  },
                ].map((row, i) => (
                  <tr key={row.topic} className={i < 2 ? "border-b border-border/50" : ""}>
                    <td className="px-5 py-3 font-mono font-semibold text-foreground">{row.topic}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{row.mech}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                        {row.change}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{row.trace}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgressionDiagram() {
  const { locale } = useI18n()

  const levels = [
    {
      label: "Append",
      sub: locale === "zh" ? "事实增长" : "Facts Grow",
      w: 660, color: "fill-foreground", textColor: "fill-primary-foreground",
    },
    {
      label: "Anchor",
      sub: locale === "zh" ? "稳定检查点" : "Checkpoint",
      w: 560, color: "fill-foreground/85", textColor: "fill-primary-foreground",
    },
    {
      label: "Handoff",
      sub: locale === "zh" ? "阶段切换" : "Transition",
      w: 460, color: "fill-foreground/70", textColor: "fill-primary-foreground",
    },
    {
      label: "Session Model",
      sub: locale === "zh" ? "会话建模" : "Modeling",
      w: 360, color: "fill-foreground/55", textColor: "fill-primary-foreground",
    },
    {
      label: "Context Strategies",
      sub: locale === "zh" ? "上下文策略" : "Strategies",
      w: 260, color: "fill-foreground/40", textColor: "fill-primary-foreground",
    },
    {
      label: "Fork / Merge",
      sub: locale === "zh" ? "执行隔离" : "Isolation",
      w: 160, color: "fill-accent", textColor: "fill-accent-foreground",
    },
  ]

  const totalH = levels.length * 42 + 10

  return (
    <svg viewBox={`0 0 700 ${totalH}`} className="w-full" fill="none">
      {levels.map((level, i) => {
        const y = 5 + i * 42
        const x = (700 - level.w) / 2
        return (
          <g key={level.label}>
            <rect x={x} y={y} width={level.w} height={36} rx={6} className={level.color} />
            <text x={350} y={y + 22} textAnchor="middle" className={`${level.textColor} text-[12px] font-mono font-semibold`}>
              {level.label}
            </text>
            <text x={350} y={y + 34} textAnchor="middle" className={`${level.textColor} text-[8px] font-mono opacity-60`}>
              {level.sub}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
