"use client"

import { useI18n } from "@/lib/i18n"

export function SectionHeader({
  title,
  subtitle,
  id,
  number,
}: {
  title: string
  subtitle?: string
  id?: string
  number?: string
}) {
  return (
    <div id={id} className="scroll-mt-24 mb-10">
      {number && (
        <span className="font-mono text-[11px] text-accent tracking-wider mb-1.5 block">
          {number}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function ReadingPath() {
  const { t } = useI18n()

  return (
    <section id="reading-path" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="00"
          title={t("path.title")}
          subtitle={t("path.subtitle")}
        />
        <div className="mt-2">
          <ReadingFlowDiagram />
        </div>
      </div>
    </section>
  )
}

function ReadingFlowDiagram() {
  const { locale } = useI18n()

  const layers = [
    { num: "01", en: "Fact Layer", zh: "事实层", detail: "Append", fill: "fill-foreground" },
    { num: "02", en: "Phase Layer", zh: "阶段层", detail: "Anchor + Handoff", fill: "fill-foreground/80" },
    { num: "03", en: "Session Layer", zh: "会话层", detail: "Single / Multi / Isolation", fill: "fill-foreground/60" },
    { num: "04", en: "Strategy Layer", zh: "策略层", detail: "Compact / Summary / Memory", fill: "fill-foreground/45" },
    { num: "05", en: "Advanced", zh: "高级层", detail: "Fork / Merge", fill: "fill-accent" },
  ]

  return (
    <svg viewBox="0 0 640 300" className="w-full" fill="none">
      {layers.map((layer, i) => {
        const y = 8 + i * 58
        const barW = 420
        const barX = 120
        return (
          <g key={layer.num}>
            {/* Number */}
            <text x={60} y={y + 27} textAnchor="middle" className="fill-muted-foreground/25 text-[24px] font-mono font-bold">
              {layer.num}
            </text>

            {/* Bar */}
            <rect x={barX} y={y} width={barW} height={42} rx={6} className={layer.fill} />

            {/* Label */}
            <text x={barX + 20} y={y + 26} className="fill-primary-foreground text-[13px] font-semibold">
              {locale === "zh" ? layer.zh : layer.en}
            </text>

            {/* Detail */}
            <text x={barX + barW - 16} y={y + 26} textAnchor="end" className="fill-primary-foreground/60 text-[10px] font-mono">
              {layer.detail}
            </text>

            {/* Connector */}
            {i < layers.length - 1 && (
              <g>
                <line x1={barX + barW / 2} y1={y + 44} x2={barX + barW / 2} y2={y + 56} className="stroke-border" strokeWidth="1.5" />
                <circle cx={barX + barW / 2} cy={y + 56} r={1.5} className="fill-border" />
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}
