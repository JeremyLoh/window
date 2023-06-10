import React, { FC, useState } from "react"
import Head from "next/head"
import Navbar from "../components/navbar"
import NavTab, { Tab } from "../components/navTab/navTab"
import LifeCalendarComponent from "../components/life/lifeCalendar/lifeCalendarComponent"
import Travel from "../components/life/travel/travel"

const tabs: Tab[] = [
  {
    dataTest: "life-calendar-tab",
    name: "Life Calendar",
  },
  {
    dataTest: "travel-tab",
    name: "Travel",
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
      return <Travel />
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
      <div className="m-auto w-full p-4">{getActiveContent()}</div>
    </div>
  )
}

export default Life
