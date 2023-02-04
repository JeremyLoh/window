import "../styles/globals.css"
import type { AppProps } from "next/app"
import { enableAllPlugins } from "immer"
import { Special_Elite } from "@next/font/google"
import Image from "next/image"
import profilePicture from "../public/profilePicture.jpg"

enableAllPlugins()

export const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  preload: true,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={specialElite.className}>
      <Component {...pageProps} />
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
    </main>
  )
}
