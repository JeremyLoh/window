import { FC } from "react"
import Link from "next/link"
import Emoji from "../emoji"

const Navbar: FC<any> = () => {
  return (
    <nav
      data-test="bugTracker-navbar"
      id="navbar"
      className="flex w-full flex-col items-center justify-center gap-x-6 bg-gradient-to-r
                  from-primary via-secondary pb-2 pt-4
                  text-white shadow-lg lg:flex-row"
    >
      <Link href="/" className="hover:text-gray-300 lg:text-3xl">
        <Emoji symbol="🗔" />
      </Link>
      <Link href="/bugTracker" className="lg:text-3xl">
        Bug Tracker
      </Link>
    </nav>
  )
}

export default Navbar
