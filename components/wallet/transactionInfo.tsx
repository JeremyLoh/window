import React, { FC, useContext } from "react"
import {
  DeleteTransactionContext,
  DeleteTransactionType,
  Transaction,
} from "../../pages/wallet"

interface TransactionInfoProps {
  transaction: Transaction
}

const TransactionInfo: FC<TransactionInfoProps> = (props) => {
  const deleteTransaction: DeleteTransactionType = useContext(
    DeleteTransactionContext
  )
  const transactionTypeStyle: string = props.transaction.isExpense
    ? "bg-red-700"
    : "bg-green-700"
  const containerStyle =
    "flex flex-col items-start justify-start rounded-2xl gap-3 p-4 py-4 mb-1 last:mb-0 " +
    "sm:flex-row md:items-center"

  return (
    <div
      className={`${containerStyle} ${transactionTypeStyle}`}
      aria-label="transaction"
    >
      <h1 className="mr-auto max-w-prose break-all">
        {props.transaction.name}
      </h1>
      <div className="flex flex-col">
        <h2 className="w-full whitespace-nowrap text-center font-bold text-white xl:text-xl">
          {props.transaction.amount.format()}
        </h2>
        <h3 className="w-full whitespace-nowrap text-center text-white">
          {props.transaction.transactionDate.toLocaleDateString()}
        </h3>
      </div>
      <button
        className="inline-flex aspect-square items-center rounded-full
                   bg-white p-3 text-lg font-extrabold text-black hover:bg-gray-300"
        data-test="delete-transaction"
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
