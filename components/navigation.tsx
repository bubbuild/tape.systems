"use client"

import { useI18n } from "@/lib/i18n"
import { useState, useEffect } from "react"

export function Navigation() {
  const { t, locale, toggleLocale } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { key: "nav.mechanisms", href: "#mechanisms" },
    { key: "nav.sessions", href: "#sessions" },
    { key: "nav.strategies", href: "#strategies" },
    { key: "nav.advanced", href: "#advanced" },
    { key: "nav.appendix", href: "#appendix" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-3.5">
        <a href="#" className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-sm bg-foreground" />
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
            tape.systems
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
          aria-label="Toggle language"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="5.5" />
            <path d="M 1.5 7 L 12.5 7" />
            <path d="M 7 1.5 C 5 4, 5 10, 7 12.5" />
            <path d="M 7 1.5 C 9 4, 9 10, 7 12.5" />
          </svg>
          <span>{locale === "zh" ? "EN" : "ZH"}</span>
        </button>
      </div>
    </nav>
  )
}
