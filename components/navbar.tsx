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
                  from-primary via-secondary pt-4 pb-2
                  text-white shadow-lg lg:flex-row"
    >
      <Link href="/" className="hover:text-gray-300 lg:text-3xl">
        <Emoji symbol="🗔" /> Window
      </Link>
      <div className="flex justify-between gap-x-4 mb-2 lg:mb-0">
        <Link
          href="/wallet"
          passHref
          className="hover:text-gray-300 lg:text-xl"
        >
          Wallet
        </Link>
        <Link
          href="/exchange"
          passHref
          className="hover:text-gray-300 lg:text-xl"
        >
          Exchange
        </Link>
        <Link
          href="/life"
          passHref
          className="hover:text-gray-300 lg:text-xl"
        >
          Life
        </Link>
      </div>

      <Clock />
    </nav>
  )
}

export default Navbar
