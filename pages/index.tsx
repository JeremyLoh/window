import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Emoji from "../components/emoji"

import Clock from "../components/clock"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Window</title>
        <meta name="description" content="Manage your finances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Window
          </h1>
          <Clock />
        </div>

        <div className={styles.grid}>
          <section className={styles.card}>
            <h2>
              Wallet {" "}
              <Emoji symbol="💵" label="money"/>
              {" "} &rarr;
            </h2>
            <p>Track your cash flow!</p>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
