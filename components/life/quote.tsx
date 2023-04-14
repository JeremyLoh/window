import React, { FC } from "react"

interface QuoteProps {
  dataTest: string
  children: any
}

const Quote: FC<QuoteProps> = (props) => {
  return (
    <blockquote data-test={props.dataTest}
                className="text-center pt-2 bg-gray-700 rounded-lg mt-4 w-4/5 lg:w-2/5 mx-auto"
    >
      <svg aria-hidden="true"
           className="w-10 h-10 text-gray-400 dark:text-white ml-5"
           viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor" />
      </svg>
      {props.children}
    </blockquote>
  )
}

export default Quote