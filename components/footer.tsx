import React, { FC } from "react"
import Image from "next/image"
import profilePicture from "../public/profilePicture.jpg"

const Footer: FC<any> = () => {
  return (
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
  )
}

export default Footer