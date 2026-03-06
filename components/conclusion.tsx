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
          number="09"
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
      detail: "compact / summary / fork-merge",
    },
    {
      num: "04",
      label: locale === "zh" ? "进阶" : "Advanced",
      detail: "memory / teams",
    },
  ]

  return (
    <svg viewBox="0 0 700 220" className="w-full" fill="none">
      <line x1="60" y1="30" x2="60" y2="190" className="stroke-border" strokeWidth="1.5" />

      {steps.map((step, i) => {
        const y = 45 + i * 40
        const isLast = i === steps.length - 1
        return (
          <g key={step.num}>
            <circle
              cx={60}
              cy={y}
              r={8}
              className={isLast ? "fill-accent/20 stroke-accent" : "fill-secondary stroke-border"}
              strokeWidth={isLast ? 1.5 : 1}
            />
            <text x={60} y={y + 3} textAnchor="middle" className={`text-[8px] font-mono ${isLast ? "fill-accent" : "fill-muted-foreground/70"}`}>
              {step.num}
            </text>

            <line x1={70} y1={y} x2={120} y2={y} className="stroke-border" strokeWidth="1" />

            <rect
              x={120}
              y={y - 16}
              width={500}
              height={32}
              rx={8}
              className={isLast ? "fill-accent/10 stroke-accent" : "fill-card stroke-border"}
              strokeWidth={isLast ? 1.2 : 1}
            />
            <text x={140} y={y + 5} className={`text-[11px] font-mono font-semibold ${isLast ? "fill-accent" : "fill-foreground"}`}>
              {step.label}
            </text>
            <text x={600} y={y + 5} textAnchor="end" className={`text-[9px] font-mono ${isLast ? "fill-accent/60" : "fill-muted-foreground/60"}`}>
              {step.detail}
            </text>
          </g>
        )
      })}

      <text x={350} y={205} textAnchor="middle" className="fill-muted-foreground/40 text-[9px] font-mono">
        {locale === "zh" ? "稳定的研究框架" : "a stable research framework"}
      </text>
    </svg>
  )
}
