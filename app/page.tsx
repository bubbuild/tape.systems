"use client"

import { I18nProvider } from "@/lib/i18n"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ReadingPath } from "@/components/reading-path"
import { MinimalModel } from "@/components/minimal-model"
import { CoreMechanisms } from "@/components/core-mechanisms"
import { SessionModel } from "@/components/session-model"
import { ContextStrategies } from "@/components/context-strategies"
import { ForkMerge } from "@/components/fork-merge"
import { ProgressionMap } from "@/components/progression-map"
import { Conclusion } from "@/components/conclusion"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <I18nProvider>
      <Navigation />
      <main>
        <Hero />
        <ReadingPath />
        <MinimalModel />
        <CoreMechanisms />
        <SessionModel />
        <ContextStrategies />
        <ForkMerge />
        <ProgressionMap />
        <Conclusion />
      </main>
      <Footer />
    </I18nProvider>
  )
}
