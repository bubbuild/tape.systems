"use client"

import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm bg-foreground" />
            <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
              tape.systems
            </span>
          </div>
          <div className="h-3 w-px bg-border" />
          <p className="text-xs text-muted-foreground font-mono">
            {t("footer.desc")}
          </p>
        </div>
        <div className="text-xs text-muted-foreground/50 font-mono">
          2026
        </div>
      </div>
    </footer>
  )
}
