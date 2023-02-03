import React, { FC, useContext } from "react"
import {
  Transaction,
  DeleteTransactionContext,
  DeleteTransactionType,
} from "../../pages/wallet"

interface TransactionInfoProps {
  transaction: Transaction
}

const TransactionInfo: FC<TransactionInfoProps> = (props) => {
  const deleteTransaction: DeleteTransactionType = useContext(
    DeleteTransactionContext
  )
  const transactionTypeStyle: string = props.transaction.isExpense
    ? "bg-red-700 break-all"
    : "bg-green-700 break-all"
  const containerStyle =
    "mb-4 flex flex-col items-start justify-center rounded-2xl py-2 px-6 last:mb-0 sm:flex-row md:items-center md:gap-3"

  return (
    <div
      className={`${containerStyle} ${transactionTypeStyle}`}
      aria-label="transaction"
    >
      <h1 className="mb-4 flex-grow break-all">{props.transaction.name}</h1>
      <div className="flex w-full  flex-col items-end md:w-auto md:items-center">
        <h2 className="w-full rounded bg-white py-2 text-center text-black">
          {props.transaction.amount.format()}
        </h2>
        <h3 className="rounded bg-gray-300 py-1 px-4 text-black">
          {props.transaction.transactionDate.toLocaleDateString()}
        </h3>
      </div>
      <button
        className="inline-flex aspect-square items-center rounded-full border-2 border-gray-500 bg-gray-800 p-3 text-lg hover:bg-gray-600"
        aria-label="delete-transaction"
        onClick={() =>
          deleteTransaction(
            props.transaction.id,
            props.transaction.transactionDate
          )
        }
      >
        X
      </button>
    </div>
  )
}

export default TransactionInfo
