import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/globals.css"
import React from "react"
import { Special_Elite } from "next/font/google"
import { enableMapSet, enablePatches } from "immer"
import Footer from "../components/footer"

enablePatches()
enableMapSet()

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  preload: true,
})

export const metadata = {
  title: "Window",
  description: "Made by Jeremy Loh",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${specialElite.className} bg-primary`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
