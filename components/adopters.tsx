"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"

type Adopter = {
  name: string
  href: string
  mark: string
}

const adopters: Adopter[] = [
  {
    name: "Bub",
    href: "https://bub.build",
    mark: "/marks/bub-mark.png",
  },
  {
    name: "DeepChat",
    href: "https://github.com/ThinkInAIXYZ/deepchat",
    mark: "/marks/deepchat-mark.png",
  },
]

export function Adopters() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="adopters-label" className="mt-12 w-full max-w-md">
      {/* Divider with a centred label, like a tape splice */}
      <div className="flex items-center gap-3 px-1">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <h2
          id="adopters-label"
          className="font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted-foreground/70"
        >
          {t("adopters.label")}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {adopters.map((adopter) => (
          <li key={adopter.name} className="flex-1 sm:flex-none">
            <a
              href={adopter.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-border bg-card/60 px-3 py-2 outline-none transition-colors hover:border-foreground/30 hover:bg-card focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto sm:justify-start"
            >
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[5px] border border-border/70 bg-background">
                <Image
                  src={adopter.mark}
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px] object-contain"
                />
              </span>

              <span className="flex min-w-0 items-center gap-1">
                <span className="font-mono text-[13px] font-semibold leading-none text-foreground">
                  {adopter.name}
                </span>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground/35 transition-colors group-hover:text-foreground/70 group-focus-visible:text-foreground/70"
                >
                  <path
                    d="M 2 8 L 8 2 M 4 2 L 8 2 L 8 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
