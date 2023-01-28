import Head from "next/head"
import Image from "next/image"
import Emoji from "../components/emoji"
import Clock from "../components/clock"
import CardLink from "../components/cardLink"
import profilePicture from "../public/profilePicture.jpg"

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
              <h2>
                Wallet <Emoji symbol="💵" label="money" /> &rarr;
              </h2>
              <p>Track your cash flow!</p>
            </CardLink>
          </section>
          <section>
            <CardLink href="/exchange" ariaLabel="exchange-feature">
              <h2>
                Exchange <Emoji symbol="💱" label="currency-exchange" /> &rarr;
              </h2>
              <p>The World Exchange</p>
            </CardLink>
          </section>
        </div>
      </main>

      <footer className="flex items-center justify-center border-t border-zinc-400 py-4">
        <a
          className="flex flex-grow items-center justify-center gap-x-3"
          href="https://github.com/JeremyLoh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by
          <Image
            className="rounded-full"
            src={profilePicture}
            alt="Jeremy Loh Profile Picture"
            width={88}
            height={88}
          />
        </a>
      </footer>
    </div>
  )
}
