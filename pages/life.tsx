import React, { FC, useState } from "react"
import Head from "next/head"
import Navbar from "../components/navbar"
import NavTab, { Tab } from "../components/navTab/navTab"
import LifeCalendarComponent from "../components/life/lifeCalendar/lifeCalendarComponent"

const tabs: Tab[] = [
  {
    dataTest: "life-calendar-tab",
    name: "Life Calendar",
  },
  {
    dataTest: "photography-tab",
    name: "Photography",
  },
]

const Life: FC<any> = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

  function setActiveTabContent(activeTabIndex: number): void {
    setActiveTabIndex(activeTabIndex)
  }

  function getActiveContent(): JSX.Element {
    if (activeTabIndex === 0) {
      return <LifeCalendarComponent />
    }
    if (activeTabIndex === 1) {
      // TODO replace placeholder JSX element
      return <>Photography</>
    }
    return <></>
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Window - Life</title>
        <meta name="description" content="Manage your Life" />
      </Head>
      <Navbar />
      <NavTab tabs={tabs} setActiveTabContent={setActiveTabContent} />
      <div className="m-auto w-full p-4 md:w-4/5">{getActiveContent()}</div>
    </div>
  )
}

export default Life
