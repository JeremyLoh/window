import React, { FC, useState } from "react"
import { nanoid } from "nanoid"

export interface Tab {
  dataTest: string
  name: string
}

interface NavTabProps {
  tabs: Tab[]
  setActiveTabContent: (activeTabIndex: number) => void
}

const NavTab: FC<NavTabProps> = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

  function getTabStyle(index: number): string {
    if (index === activeTabIndex) {
      return "mr-1 rounded border-b-2 bg-secondary px-2 py-1 text-sm font-semibold md:text-lg"
    } else {
      return "mr-1 rounded px-2 py-1 text-sm font-semibold md:text-lg"
    }
  }

  function handleTabChange(index: number): void {
    setActiveTabIndex(index)
    props.setActiveTabContent(index)
  }

  return (
    <div className="flex w-full flex-row gap-x-4 px-2 pt-2 text-2xl md:pl-10 lg:pl-32">
      {props.tabs.map((tab: Tab, index: number) => {
        return (
          <button
            key={`${tab.name}-${nanoid()}`}
            data-test={tab.dataTest}
            className={getTabStyle(index)}
            onClick={() => handleTabChange(index)}
          >
            {tab.name}
          </button>
        )
      })}
    </div>
  )
}

export default NavTab
