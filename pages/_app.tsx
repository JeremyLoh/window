import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Special_Elite } from "@next/font/google"

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={specialElite.className}>
      <Component {...pageProps} />
    </main>
  )
}
