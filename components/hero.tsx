"use client"

import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 tape-bg opacity-40 pointer-events-none" />

      {/* Left tape perforations */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 flex flex-col items-center gap-8 opacity-[0.06] pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="h-2 w-2 rounded-full bg-foreground" />
        ))}
      </div>
      {/* Right tape perforations */}
      <div className="absolute right-6 md:right-12 top-0 bottom-0 flex flex-col items-center gap-8 opacity-[0.06] pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="h-2 w-2 rounded-full bg-foreground" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl">
        {/* Hero tape diagram */}
        <div className="w-full max-w-xl mb-8">
          <HeroTapeDiagram />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-center text-balance leading-[1.05]">
          {t("hero.tagline")}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed text-center text-pretty max-w-md">
          <span>{t("hero.subtitle.line1")}</span>
          <br />
          <span>
            {t("hero.subtitle.line2Prefix")}
            <a
              href="https://bub.build"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground/60 transition-colors"
            >
              bub.build
            </a>
            {t("hero.subtitle.line2Between")}
            <a
              href="https://github.com/bubbuild/bub"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground/60 transition-colors"
            >
              {t("hero.subtitle.source")}
            </a>
          </span>
        </p>
        {/* CTA */}
        <a
          href="#reading-path"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t("hero.cta")}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-background">
            <path d="M7 2v10M3.5 8.5L7 12l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-20">
        <div className="h-8 w-px bg-foreground" />
        <div className="h-1 w-1 rounded-full bg-foreground animate-bounce" />
      </div>
    </section>
  )
}

function HeroTapeDiagram() {
  return (
    <svg viewBox="0 0 520 80" className="w-full" fill="none">
      {/* Tape track */}
      <rect x="10" y="15" width="500" height="50" rx="6" className="fill-secondary/50 stroke-border" strokeWidth="0.5" />

      {/* Entries */}
      {[
        { x: 24, w: 52, label: "fact", opacity: 0.25 },
        { x: 84, w: 52, label: "fact", opacity: 0.35 },
        { x: 144, w: 52, label: "fact", opacity: 0.45 },
        { x: 210, w: 68, label: "anchor", isAnchor: true, opacity: 0.9 },
        { x: 290, w: 52, label: "fact", opacity: 0.65 },
        { x: 350, w: 52, label: "fact", opacity: 0.8 },
        { x: 414, w: 48, label: "new", isNew: true, opacity: 1 },
      ].map((e, i) => (
        <g key={i} style={{ opacity: e.opacity }}>
          <rect
            x={e.x} y={24} width={e.w} height={32} rx={4}
            className={
              e.isAnchor ? "fill-accent/15 stroke-accent" :
              e.isNew ? "fill-foreground/8 stroke-foreground" :
              "fill-card stroke-border"
            }
            strokeWidth={e.isAnchor || e.isNew ? 1.2 : 0.5}
          />
          <text
            x={e.x + e.w / 2} y={44} textAnchor="middle"
            className={`text-[9px] font-mono ${
              e.isAnchor ? "fill-accent" : e.isNew ? "fill-foreground" : "fill-muted-foreground"
            }`}
          >
            {e.label}
          </text>
        </g>
      ))}

      {/* Append arrow */}
      <path d="M 472 40 L 496 40" className="stroke-foreground/50" strokeWidth="1" strokeLinecap="round" />
      <path d="M 492 36 L 498 40 L 492 44" className="stroke-foreground/50" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Time label */}
      <text x="260" y="78" textAnchor="middle" className="fill-muted-foreground/30 text-[8px] font-mono tracking-widest">
        append-only
      </text>
    </svg>
  )
}
