import type { NextApiRequest, NextApiResponse } from "next"
import { nanoid } from "nanoid"

export type Data = {
  id?: string,
  name?: string,
  amount?: number,
  isExpense?: boolean,
  transactionDate?: Date,
  error?: string
}

// TODO https://nextjs.org/docs/guides/building-forms#part-3-setting-up-a-nextjs-form-api-route

// TODO https://www.youtube.com/watch?v=syEWlxVFUrY

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method
  if (requestMethod === "POST") {
    const {name, amount, isExpense, transactionDate}:
      {name: string, amount: number, isExpense: boolean, transactionDate: Date}
      = req.body
    if (isInvalidName(name)) {
      return res.status(400).json({ error: "Invalid name" })
    }
    if (isInvalidAmount(amount)) {
      return res.status(400).json({ error: "Invalid amount" })
    }
    res.status(200).json({
      id: nanoid(),
      name,
      amount,
      isExpense,
      transactionDate
    })
  }
}

function isInvalidAmount(amount: number) {
  return !amount || amount < 0
}

function isInvalidName(name: string) {
  return !name || name.trim().length === 0
}
