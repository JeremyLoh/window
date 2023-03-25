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
    ? "bg-gradient-to-b from-red-600 to-red-800 break-all"
    : "bg-gradient-to-b from-green-600 to-green-800 break-all"
  const containerStyle =
    "mb-4 flex flex-col items-start justify-center rounded-2xl p-4 py-4 last:mb-0 " +
    "sm:flex-row md:items-center md:gap-3"

  return (
    <div
      className={`${containerStyle} ${transactionTypeStyle}`}
      aria-label="transaction"
    >
      <h1 className="mb-4 w-full max-w-prose break-all text-xl">
        {props.transaction.name}
      </h1>
      <div className="flex w-full flex-col items-end gap-2 md:w-1/4">
        <h2 className="w-full rounded py-2 text-center text-lg text-white">
          {props.transaction.amount.format()}
        </h2>
        <h3 className="w-full rounded py-1 px-4 text-center text-white">
          {props.transaction.transactionDate.toLocaleDateString()}
        </h3>
      </div>
      <button
        className="my-4 inline-flex aspect-square items-center rounded-full border-2 border-cyan-600
                   bg-cyan-500 p-3 text-lg hover:bg-cyan-400"
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
