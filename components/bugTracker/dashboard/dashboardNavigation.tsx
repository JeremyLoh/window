"use client"

import React, { FC, useState } from "react"
import NavTab, { Tab } from "../../navTab/navTab"
import Project from "./project"

const tabs: Tab[] = [
  {
    dataTest: "dashboard-projects-tab",
    name: "Projects",
  },
]

const DashboardNavigation: FC<any> = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

  function setActiveTabContent(activeTabIndex: number): void {
    setActiveTabIndex(activeTabIndex)
  }

  function getActiveContent(): React.JSX.Element {
    if (activeTabIndex === 0) {
      return <Project />
    }
    return <></>
  }

  return (
    <div className="w-full">
      <NavTab tabs={tabs} setActiveTabContent={setActiveTabContent} />
      <div className="p-4">{getActiveContent()}</div>
    </div>
  )
}

export default DashboardNavigation
