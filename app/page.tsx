import { Metadata } from "next"
import Emoji from "../components/emoji"
import Clock from "../components/clock"
import CardLink from "../components/cardLink"

export const metadata: Metadata = {
  title: "Window",
  description: "Homepage",
}

interface Feature {
  href: string
  ariaLabel: string
  title: {
    feature: string
    emoji: {
      symbol: string
      label: string
    }
  }
  description: string
}

const features: Array<Feature> = getAppFeatures()

export default function Home() {
  return (
    <div className="px-8">
      <main className="flex min-h-screen flex-col items-center justify-center sm:flex-row">
        <div className="px-4">
          <h1 className="text-left text-6xl">Window</h1>
          <Clock />
        </div>
        <div className="flex max-w-4xl flex-col flex-wrap items-center justify-center sm:flex-row">
          {features &&
            features.map((feature: Feature) => {
              return (
                <section key={feature.href}>
                  <CardLink href={feature.href} ariaLabel={feature.ariaLabel}>
                    <h2 className="text-xl font-bold">
                      <span>{feature.title.feature} </span>
                      <Emoji
                        symbol={feature.title.emoji.symbol}
                        label={feature.title.emoji.label}
                      />{" "}
                      &rarr;
                    </h2>
                    <p className="w-32">{feature.description}</p>
                  </CardLink>
                </section>
              )
            })}
        </div>
      </main>
    </div>
  )
}

function getAppFeatures() {
  return [
    {
      href: "/bugTracker",
      ariaLabel: "bugTracker-feature",
      title: {
        feature: "Bug Tracker",
        emoji: { symbol: "🪲", label: "bug-tracker" },
      },
      description: "Squash your tasks",
    },
    {
      href: "/exchange",
      ariaLabel: "exchange-feature",
      title: {
        feature: "Exchange",
        emoji: { symbol: "💱", label: "currency-exchange" },
      },
      description: "The World Exchange",
    },
    {
      href: "/life",
      ariaLabel: "life-feature",
      title: {
        feature: "Life",
        emoji: { symbol: "🗓️", label: "life" },
      },
      description: "The Ultimate Game",
    },
  ]
}
