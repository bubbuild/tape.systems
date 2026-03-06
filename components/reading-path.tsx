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
        />
        <div className="mt-2">
          <ReadingDirectory />
        </div>
      </div>
    </section>
  )
}

function ReadingDirectory() {
  const { locale } = useI18n()

  const items = [
    {
      num: "01",
      href: "#model",
      title: locale === "zh" ? "最小模型" : "Minimal Model",
      detail: "tape / entry / anchor / view",
      group: locale === "zh" ? "基础" : "Core",
    },
    {
      num: "02",
      href: "#mechanisms",
      title: locale === "zh" ? "核心机制" : "Mechanisms",
      detail: "append / anchor / handoff",
      group: locale === "zh" ? "基础" : "Core",
    },
    {
      num: "03",
      href: "#sessions",
      title: locale === "zh" ? "会话模型" : "Sessions",
      detail: "single / multi / thread",
      group: locale === "zh" ? "会话" : "Session",
    },
    {
      num: "04",
      href: "#strategies",
      title: locale === "zh" ? "上下文策略" : "Strategies",
      detail: "compact / summary / fork-merge",
      group: locale === "zh" ? "策略" : "Strategy",
    },
    {
      num: "05",
      href: "#advanced",
      title: locale === "zh" ? "Memory" : "Memory",
      detail: "anchor graph",
      group: locale === "zh" ? "进阶" : "Advanced",
    },
    {
      num: "06",
      href: "#teams",
      title: "Teams",
      detail: "shared / cross",
      group: locale === "zh" ? "进阶" : "Advanced",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item) => (
        <a
          key={item.num}
          href={item.href}
          className="group rounded-xl border border-border bg-card px-4 py-3 hover:border-foreground/40 transition-colors"
        >
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-mono text-muted-foreground/60">{item.num}</span>
              <span className="text-sm font-mono font-semibold text-foreground group-hover:text-foreground">
                {item.title}
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/50">{item.group}</span>
          </div>
          <div className="mt-1 text-[11px] font-mono text-muted-foreground/70">{item.detail}</div>
        </a>
      ))}
    </div>
  )
}
