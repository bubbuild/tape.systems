"use client"

import { useId } from "react"
import { useI18n } from "@/lib/i18n"
import { SectionHeader } from "./reading-path"

export function SidecarTape() {
  const { t } = useI18n()

  return (
    <section id="sidecar" className="scroll-mt-16 py-20 md:py-28 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          number="07"
          title={t("sidecar.title")}
          subtitle={t("sidecar.subtitle")}
        />

        <figure className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-5 pt-5 md:px-8 md:pt-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("sidecar.intro")}
            </p>
          </div>
          <div
            role="region"
            aria-label={t("sidecar.diagram.title")}
            tabIndex={0}
            className="overflow-x-auto px-4 md:px-8 py-5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2"
          >
            <SidecarDiagram />
          </div>
          <p className="px-5 mb-5 text-xs text-muted-foreground md:hidden">
            {t("sidecar.scroll")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 pb-6 md:px-8">
            {["support", "extend", "consume"].map((role) => (
              <div key={role}>
                <h3 className="text-sm font-mono font-semibold text-foreground mb-2">
                  {t(`sidecar.${role}.title`)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(`sidecar.${role}.desc`)}
                </p>
                <p className="mt-3 text-[11px] font-mono text-accent">
                  {t(`sidecar.${role}.example`)}
                </p>
              </div>
            ))}
          </div>

          <figcaption className="bg-foreground px-5 py-4 md:px-8">
            <p className="text-xs font-mono text-background/75 leading-relaxed">
              {t("sidecar.key")}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

function SidecarDiagram() {
  const { t } = useI18n()
  const id = useId()
  const arrow = `${id}-arrow`

  return (
    <svg
      viewBox="0 0 900 350"
      className="w-full min-w-[680px]"
      fill="none"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>{t("sidecar.diagram.title")}</title>
      <desc id={`${id}-desc`}>{t("sidecar.diagram.desc")}</desc>
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M1 1L9 5L1 9" className="stroke-accent" strokeWidth="1.3" />
        </marker>
      </defs>

      <text x="20" y="22" className="fill-foreground text-[14px] font-mono font-semibold">MAIN TAPE</text>
      <text x="145" y="22" className="fill-muted-foreground text-[11px] font-mono">{t("sidecar.main")}</text>
      <rect x="20" y="38" width="850" height="46" rx="6" className="fill-secondary/40 stroke-border" />
      <line x1="32" y1="61" x2="858" y2="61" className="stroke-border" />
      {[
        { x: 36, width: 72, label: "e1" },
        { x: 130, width: 72, label: "e2" },
        { x: 224, width: 94, label: "anchor" },
        { x: 340, width: 72, label: "e3" },
        { x: 434, width: 72, label: "e4" },
        { x: 528, width: 72, label: "…" },
        { x: 722, width: 130, label: t("sidecar.entry") },
      ].map((entry) => (
        <g key={entry.x}>
          <rect x={entry.x} y="47" width={entry.width} height="28" rx="4" className={entry.label === "anchor" || entry.x === 722 ? "fill-accent/10 stroke-accent" : "fill-card stroke-border"} />
          <text x={entry.x + entry.width / 2} y="65" textAnchor="middle" className="fill-foreground text-[11px] font-mono">{entry.label}</text>
        </g>
      ))}
      <path d="M615 61H708" className="stroke-accent" strokeWidth="1.3" markerEnd={`url(#${arrow})`} />

      <g className="stroke-accent" strokeWidth="1.3" markerEnd={`url(#${arrow})`}>
        <path d="M50 91V180" />
        <path d="M240 180V91" />
        <path d="M350 91V180" />
        <path d="M540 180V91" />
        <path d="M720 91V180" />
      </g>
      <g className="fill-accent text-[11px] font-mono">
        <text x="65" y="119">{t("sidecar.offload")}</text>
        <text x="225" y="157" textAnchor="end">{t("sidecar.read")}</text>
        <text x="365" y="119">{t("sidecar.overlay")}</text>
        <text x="525" y="157" textAnchor="end">{t("sidecar.merge")}</text>
        <text x="735" y="132">{t("sidecar.derive")}</text>
      </g>

      {[20, 320, 620].map((x) => (
        <g key={x}>
          <rect x={x} y="190" width="250" height="64" rx="6" className="fill-accent/8 stroke-accent" />
          <text x={x + 14} y="211" className="fill-accent text-[11px] font-mono">SIDECAR TAPE</text>
          <line x1={x + 12} y1="232" x2={x + 238} y2="232" className="stroke-accent/20" />
          {["s1", "s2", "…"].map((label, i) => (
            <g key={label}>
              <rect x={x + 14 + i * 77} y="220" width="68" height="23" rx="3" className="fill-card stroke-border" />
              <text x={x + 48 + i * 77} y="236" textAnchor="middle" className="fill-foreground text-[10px] font-mono">{label}</text>
            </g>
          ))}
        </g>
      ))}

      <path d="M20 285V293H570V285" className="stroke-border" />
      <text x="295" y="319" textAnchor="middle" className="fill-muted-foreground text-[11px] font-mono">{t("sidecar.mainSupport")}</text>
      <path d="M877 222H891V315H878" className="stroke-accent" strokeWidth="1.3" markerEnd={`url(#${arrow})`} />
      <rect x="620" y="295" width="250" height="40" rx="5" className="fill-foreground" />
      <text x="745" y="320" textAnchor="middle" className="fill-primary-foreground text-[12px] font-mono">{t("sidecar.downstream")}</text>
    </svg>
  )
}
