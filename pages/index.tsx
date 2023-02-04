import Head from "next/head"
import Emoji from "../components/emoji"
import Clock from "../components/clock"
import CardLink from "../components/cardLink"

export default function Home() {
  return (
    <div className="px-8">
      <Head>
        <title>Window</title>
        <meta name="description" content="Manage your finances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-x-8 sm:flex-row">
        <div>
          <h1 className="text-left text-6xl">Window</h1>
          <Clock />
        </div>
        <div className="flex max-w-2xl flex-col flex-wrap items-stretch justify-center sm:flex-row">
          <section>
            <CardLink href="/wallet" ariaLabel="wallet-feature">
              <h2 className="text-xl font-bold">
                Wallet <Emoji symbol="💵" label="money" /> &rarr;
              </h2>
              <p>Track your cash flow!</p>
            </CardLink>
          </section>
          <section>
            <CardLink href="/exchange" ariaLabel="exchange-feature">
              <h2 className="text-xl font-bold">
                Exchange <Emoji symbol="💱" label="currency-exchange" /> &rarr;
              </h2>
              <p>The World Exchange</p>
            </CardLink>
          </section>
        </div>
      </main>
    </div>
  )
}
