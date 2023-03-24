import { FC } from "react"
import Link from "next/link"
import Emoji from "./emoji"
import Clock from "./clock"

const Navbar: FC<any> = () => {
  return (
    <nav
      id="navbar"
      className="flex w-full flex-col items-center justify-center gap-x-8 bg-gradient-to-r
                  from-primary via-secondary py-4
                  text-white shadow-lg lg:flex-row"
    >
      <Link href="/" className="hover:text-gray-300 lg:text-3xl">
        <Emoji symbol="🪟" /> Window
      </Link>
      <div className="flex justify-between gap-x-4">
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
      </div>

      <Clock />
    </nav>
  )
}

export default Navbar
