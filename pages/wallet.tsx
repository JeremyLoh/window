import React, { createContext, FC, useState } from "react"
import Head from "next/head"
import format from "date-fns/format"
import produce from "immer"
import Calendar from "react-calendar"
import WalletForm from "../components/wallet/walletAddTransactionForm"
import { WalletSummary } from "../components/wallet/walletSummary"
import TransactionHistory from "../components/wallet/transactionHistory"
import CardInfo from "../components/cardInfo"
import Currency from "../components/currency"

export interface Transaction {
  id: string
  name: string
  amount: Currency
  isExpense: boolean
  transactionDate: Date
}

export interface DeleteTransactionType {
  (transactionId: string, date: Date): void
}

export const TransactionContext = createContext<Array<Transaction>>([])
export const DeleteTransactionContext = createContext<DeleteTransactionType>(
  () => {}
)

const Wallet: FC<any> = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [transactionsByDate, setTransactionsByDate] = useState<
    Map<String, Array<Transaction>>
  >(new Map())

  function formatDate(date: Date): string {
    // e.g. "LLL d y" => Dec 1 2022
    return format(date, "LLL d y")
  }

  function displayNewTransaction(transaction: Transaction): void {
    const selectedDate: string = formatDate(date)
    if (!transactionsByDate.has(selectedDate)) {
      setTransactionsByDate(
        produce((draft) => {
          draft.set(selectedDate, [])
        })
      )
    }
    setTransactionsByDate(
      produce((draft) => {
        draft.get(selectedDate)?.unshift(transaction)
      })
    )
  }

  function deleteTransaction(transactionId: string, date: Date): void {
    setTransactionsByDate(
      produce((draft) => {
        const key = formatDate(date)
        const updatedTransactions =
          draft
            .get(key)
            ?.filter((transaction) => transaction.id !== transactionId) || []
        draft.set(key, updatedTransactions)
      })
    )
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Window</title>
        <meta name="description" content="Manage your Wallet" />
      </Head>

      <h1 className="my-6 w-[90%] text-end text-5xl xl:w-[80%]">Wallet</h1>

      <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <div aria-label="wallet-transaction-date">
          <CardInfo ariaLabel="wallet-transaction-date-selection">
            <h2 className="text-xl">Transaction Date</h2>
            <p className="text-lg">{date.toDateString()}</p>
          </CardInfo>
        </div>
        <Calendar
          className="rounded-xl p-3 text-lg"
          navigationAriaLabel="wallet-calendar-date-selection"
          onChange={setDate}
          value={date}
        />
      </div>

      <TransactionContext.Provider
        value={transactionsByDate.get(formatDate(date)) || []}
      >
        <div
          className="mb-4 flex flex-col items-center"
          aria-label="wallet-transactions"
        >
          <WalletSummary />
          <div className="flex w-[80%] flex-col justify-center gap-5 md:flex-row">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="bg-gray-700" aria-label="add-transaction-form">
                <WalletForm
                  handleNewTransaction={displayNewTransaction}
                  transactionDate={date}
                />
              </div>
            </div>
            <DeleteTransactionContext.Provider value={deleteTransaction}>
              <div className="flex grow rounded-xl">
                <TransactionHistory />
              </div>
            </DeleteTransactionContext.Provider>
          </div>
        </div>
      </TransactionContext.Provider>
    </div>
  )
}

export default Wallet
