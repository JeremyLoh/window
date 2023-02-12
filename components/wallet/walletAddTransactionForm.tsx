import React, { FC, useState } from "react"
import { Transaction } from "../../pages/wallet"
import Currency from "../currency"
import { HttpRequest, HttpResponse } from "../../lib/request"

interface handleNewTransaction {
  (transaction: Transaction): void
}

// TODO have a handleError function prop that can be called
interface WalletFormProps {
  handleNewTransaction: handleNewTransaction
  transactionDate: Date
}

const WalletForm: FC<WalletFormProps> = (props) => {
  const [isExpense, setIsExpense] = useState<boolean>(true)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = getRequestBody(event, props.transactionDate)
    const response: HttpResponse = await HttpRequest.post(
      "/api/wallet/transaction/create",
      body
    )
    const transaction = response.data
    props.handleNewTransaction({
      ...transaction,
      amount: new Currency(transaction.amount),
      transactionDate: new Date(transaction.transactionDate),
    })
  }

  return (
    <form
      className="flex flex-col gap-y-2 p-4"
      action="/api/wallet/transaction/create"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="text-lg" htmlFor="name">
        Name
      </label>
      <input
        className="rounded-lg border border-gray-500 p-2 text-lg text-black shadow-sm focus:border-cyan-500 focus:outline-none focus:ring"
        type="text"
        id="name"
        name="name"
        required
      />
      <div className="flex flex-row items-center justify-start gap-x-4 py-4">
        <label className="text-lg" htmlFor="expense">
          Expense
        </label>
        <input
          type="radio"
          id="expense"
          name="expense"
          value="expense"
          checked={isExpense}
          onChange={() => setIsExpense(true)}
        />
        <label className="text-lg" htmlFor="income">
          Income
        </label>
        <input
          type="radio"
          id="income"
          name="income"
          value="income"
          checked={!isExpense}
          onChange={() => setIsExpense(false)}
        />
      </div>
      <label className="text-lg" htmlFor="amount">
        Amount
      </label>
      <input
        className="rounded-lg border border-gray-500 p-2 text-lg text-black shadow-sm focus:border-cyan-500 focus:outline-none focus:ring"
        type="number"
        min="0.01"
        max="9999999999"
        step="0.01"
        id="amount"
        name="amount"
        required
      />
      <div />
      <label htmlFor="transactionDate" hidden>
        Transaction Date
      </label>
      <input
        type="text"
        hidden
        readOnly
        value={props.transactionDate.toDateString()}
        id="transactionDate"
        name="transactionDate"
      />
      <button
        className="rounded border-b-4 border-cyan-700 bg-cyan-500 py-2 px-4 font-bold text-white hover:border-cyan-500 hover:bg-cyan-400"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

function getRequestBody(
  event: React.FormEvent<HTMLFormElement>,
  transactionDate: Date
) {
  const name: string = (
    event.currentTarget.elements.namedItem("name") as HTMLInputElement
  ).value
  const amountInCents: number =
    Number(
      (event.currentTarget.elements.namedItem("amount") as HTMLInputElement)
        .value
    ) * 100
  const isExpense: boolean = (
    event.currentTarget.elements.namedItem("expense") as HTMLInputElement
  ).checked
  return {
    name,
    amount: amountInCents,
    isExpense,
    transactionDate,
  }
}

export default WalletForm
