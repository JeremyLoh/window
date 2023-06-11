import "mapbox-gl/dist/mapbox-gl.css"
import "../styles/globals.css"
import React from "react"
import Image from "next/image"
import { Special_Elite } from "next/font/google"
import { enableMapSet, enablePatches } from "immer"
import profilePicture from "../public/profilePicture.jpg"
import Navbar from "../components/navbar"

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
        <Navbar />
        {children}
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
      </body>
    </html>
  )
}
