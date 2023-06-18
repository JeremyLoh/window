import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/globals.css"
import React from "react"
import type { AppProps } from "next/app"
import { enableMapSet, enablePatches } from "immer"
import { Special_Elite } from "next/font/google"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

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
      <Footer />
    </main>
  )
}
