import React, { FC, useState } from "react"
import axios from "axios"
import {Transaction} from "../../pages/wallet"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "../../styles/components/wallet/WalletAddTransactionForm.module.css"

interface handleNewTransaction {
  (transaction: Transaction): void
}

// TODO have a handleError function prop that can be called
interface WalletFormProps {
  handleNewTransaction: handleNewTransaction
}

const WalletForm:FC<WalletFormProps> = (props) => {
  const [newTransactionDate, setNewTransactionDate] = useState<Date>(new Date())
  const [isExpense, setIsExpense] = useState<boolean>(true)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = getRequestBody(event, newTransactionDate)
    const response = await axios.post("/api/wallet/transaction/create", body)
    const transaction = response.data
    props.handleNewTransaction({
      ...transaction,
      transactionDate: new Date(transaction.transactionDate)
    })
  }

  return (
    <form className={styles.form}
      action="/api/wallet/transaction/create"
      method="post"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
      <div className={styles.expenseOrIncomeContainer}>
        <label htmlFor="expense">Expense</label>
        <input type="radio"
               id="expense"
               name="expense"
               value="expense"
               checked={isExpense}
               onChange={() => setIsExpense(true)} />
        <label htmlFor="income">Income</label>
        <input type="radio"
               id="income"
               name="income"
               value="income"
               checked={!isExpense}
               onChange={() => setIsExpense(false)} />
      </div>
      <label htmlFor="amount">Amount</label>
      <input type="number" min="0.01" max="9999999999" step="0.01" id="amount" name="amount" required />
      <div />
      <label htmlFor="transactionDate">Transaction Date</label>
      <input type="text"
        hidden
        readOnly
        value={newTransactionDate.toDateString()}
        id="transactionDate"
        name="transactionDate"
      />
      <DatePicker selected={newTransactionDate} 
        onChange={(date: Date) => setNewTransactionDate(date)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

function getRequestBody(event: React.FormEvent<HTMLFormElement>, newTransactionDate: Date) {
  const name: string = (event.currentTarget.elements.namedItem("name") as HTMLInputElement).value
  const amount: number = Number((event.currentTarget.elements.namedItem("amount") as HTMLInputElement).value)
  const isExpense: boolean = (event.currentTarget.elements.namedItem("expense") as HTMLInputElement).checked
  return {
    name,
    amount,
    isExpense,
    transactionDate: newTransactionDate
  }
}

export default WalletForm