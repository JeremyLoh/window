import React, { FC, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "../../styles/components/wallet/WalletAddTransactionForm.module.css"
import axios from "axios";

export interface Transaction {
  id: string,
  name: string,
  amount: number,
  transactionDate: Date
}

interface handleNewTransaction {
  (transaction: Transaction): void
}

// TODO have a handleError function prop that can be called
interface WalletFormProps {
  handleNewTransaction: handleNewTransaction
}

const WalletForm:FC<WalletFormProps> = (props) => {
  const [newTransactionDate, setNewTransactionDate] = useState<Date>(new Date())

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
      <label htmlFor="amount">Amount</label>
      <input type="number" min="0" step="0.01" id="amount" name="amount" required />
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
  return {
    name,
    amount,
    transactionDate: newTransactionDate
  }
}

export default WalletForm