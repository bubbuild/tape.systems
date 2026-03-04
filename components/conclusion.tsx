"use client"

import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function Conclusion() {
  const { t, locale } = useI18n()
  const refBase = locale === "zh" ? "https://psiace.me/zh/posts" : "https://psiace.me/posts"

  return (
    <section className="py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="08"
          title={t("conclusion.title")}
          subtitle={t("conclusion.text")}
        />

        {/* Conclusion flow as a tight vertical diagram */}
        <div className="rounded-xl border border-border bg-card p-4 md:p-8 mb-10">
          <ConclusionDiagram />
        </div>

        {/* References */}
        <div className="rounded-xl bg-foreground p-5 md:p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-background/50 mb-4">
            {t("ref.title")}
          </div>
          <div className="flex flex-col gap-3">
            {[
              { key: "ref.1", slug: "carpenter-hammer-nail" },
              { key: "ref.2", slug: "prometheus-bound" },
              { key: "ref.3", slug: "reinvent-the-punch-tape" },
            ].map((ref, i) => (
              <a
                key={ref.key}
                href={`${refBase}/${ref.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors"
              >
                <span className="text-xs font-mono text-background/30">{String(i + 1).padStart(2, "0")}</span>
                <span className="group-hover:underline underline-offset-4">{t(ref.key)}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" className="text-background/30 group-hover:text-background/60 transition-colors">
                  <path d="M 2 8 L 8 2 M 4 2 L 8 2 L 8 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ConclusionDiagram() {
  const { locale } = useI18n()

  const steps = [
    {
      num: "01",
      label: locale === "zh" ? "定义事实" : "Define Facts",
      detail: "tape / append",
    },
    {
      num: "02",
      label: locale === "zh" ? "阶段边界" : "Phase Boundaries",
      detail: "anchor / handoff",
    },
    {
      num: "03",
      label: locale === "zh" ? "装配策略" : "Assembly Strategy",
      detail: "compact / summary / memory",
    },
    {
      num: "04",
      label: locale === "zh" ? "高阶执行" : "Advanced Execution",
      detail: "fork / merge",
    },
  ]

  return (
    <svg viewBox="0 0 700 220" className="w-full" fill="none">
      <defs>
        <marker id="con-arrow" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 5 10 L 10 0" className="fill-accent" />
        </marker>
      </defs>

      {steps.map((step, i) => {
        const x = 30 + i * 170
        const isLast = i === steps.length - 1
        return (
          <g key={step.num}>
            {/* Card */}
            <rect
              x={x}
              y={40}
              width={145}
              height={100}
              rx={10}
              className={isLast ? "fill-accent/10 stroke-accent" : "fill-secondary stroke-border"}
              strokeWidth={isLast ? 1.5 : 1}
            />

            {/* Number */}
            <text x={x + 20} y={72} className="fill-muted-foreground/30 text-[22px] font-mono font-bold">{step.num}</text>

            {/* Label */}
            <text
              x={x + 72.5}
              y={105}
              textAnchor="middle"
              className={`text-[12px] font-mono font-semibold ${isLast ? "fill-accent" : "fill-foreground"}`}
            >
              {step.label}
            </text>

            {/* Detail */}
            <text
              x={x + 72.5}
              y={125}
              textAnchor="middle"
              className={`text-[9px] font-mono ${isLast ? "fill-accent/60" : "fill-muted-foreground/60"}`}
            >
              {step.detail}
            </text>

            {/* Arrow */}
            {i < steps.length - 1 && (
              <line x1={x + 148} y1={90} x2={x + 167} y2={90} className="stroke-accent/50" strokeWidth="1.5" markerEnd="url(#con-arrow)" />
            )}
          </g>
        )
      })}

      {/* Bottom label */}
      <text x={350} y={190} textAnchor="middle" className="fill-muted-foreground/40 text-[10px] font-mono">
        {locale === "zh" ? "稳定的研究框架" : "a stable research framework"}
      </text>
    </svg>
  )
}
