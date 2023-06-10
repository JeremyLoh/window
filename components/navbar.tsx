import { FC } from "react"
import Link from "next/link"
import Emoji from "./emoji"
import Clock from "./clock"

const Navbar: FC<any> = () => {
  return (
    <nav
      data-test="navbar"
      id="navbar"
      className="flex w-full flex-col items-center justify-center gap-x-8 bg-gradient-to-r
                  from-primary via-secondary pb-2 pt-4
                  text-white shadow-lg lg:flex-row"
    >
      <Link href="/" className="hover:text-gray-300 lg:text-3xl">
        <Emoji symbol="🗔" /> Window
      </Link>
      <Clock />
    </nav>
  )
}

export default Navbar
