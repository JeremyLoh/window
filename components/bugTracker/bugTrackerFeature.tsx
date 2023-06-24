import React, { FC } from "react"
import Link from "next/link"
import Quote from "../life/quote"

const BugTrackerFeature: FC<any> = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center py-2">
      <p className="mx-4 pt-2 text-xl hover:line-through">
        Squash your <span className="bg-stone-600 p-2">bugs</span> from a single
        source of truth
      </p>
      <Quote dataTest="agile-manifesto-quote">
        <ul className="group pb-4">
          <li>
            <span className="bg-teal-700 p-2 text-xl font-bold">
              Individuals and interactions
            </span>{" "}
            <span className="transition group-hover:blur-sm">
              over processes and tools
            </span>
          </li>
          <li>
            <span className="bg-teal-700 p-2 text-xl font-bold">
              Working software
            </span>{" "}
            <span className="transition group-hover:blur-sm">
              over comprehensive documentation
            </span>
          </li>
          <li>
            <span className="bg-teal-700 p-2 text-xl font-bold">
              Customer collaboration
            </span>{" "}
            <span className="transition group-hover:blur-sm">
              over contract negotiation
            </span>
          </li>
          <li>
            <span className="bg-teal-700 p-2 text-xl font-bold">
              Responding to change
            </span>{" "}
            <span className="transition group-hover:blur-sm">
              over following a plan
            </span>
          </li>
        </ul>
        <div className="pb-2 pr-2 text-right">
          <Link
            href="https://agilemanifesto.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://agilemanifesto.org/
          </Link>
        </div>
      </Quote>
    </section>
  )
}

export default BugTrackerFeature
