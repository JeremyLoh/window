import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { enableMapSet, enablePatches } from "immer"
import { Special_Elite } from "next/font/google"
import Image from "next/image"
import profilePicture from "../public/profilePicture.jpg"
import Navbar from "../components/navbar"
import React from "react"

enablePatches()
enableMapSet()

export const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  preload: true,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${specialElite.className} bg-primary`}>
      <Navbar />
      <Component {...pageProps} />
      <footer
        className="flex items-center justify-center border-zinc-400
                         bg-gradient-to-r from-primary via-secondary py-4"
      >
        <a
          className="flex flex-grow items-center justify-center gap-x-3"
          href="https://github.com/JeremyLoh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"<"}
          <Image
            className="rounded-full"
            src={profilePicture}
            alt="Jeremy Loh Profile Picture"
            width={48}
            height={48}
          />
          {"/>"}
        </a>
      </footer>
    </main>
  )
}
