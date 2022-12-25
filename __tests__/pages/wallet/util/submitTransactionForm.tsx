import { screen, within } from "@testing-library/react"
import { UserEvent } from "@testing-library/user-event/setup/setup"

export function getForm(): HTMLElement {
  return screen.getByLabelText("add-transaction-form")
}

export function getNameInput(): HTMLInputElement {
  const form: HTMLElement = getForm()
  return within(form).getByRole("textbox", { name: "Name" })
}

export function getAmountInput(): HTMLInputElement {
  const form: HTMLElement = getForm()
  return within(form).getByRole("spinbutton", { name: "Amount" })
}

export function getIncomeInput(): HTMLElement {
  return within(getForm()).getByRole("radio", { name: "Income" })
}

export function getExpenseInput(): HTMLElement {
  return within(getForm()).getByRole("radio", { name: "Expense" })
}

export function getSubmitButton(): HTMLButtonElement {
  const form: HTMLElement = getForm()
  return within(form).getByRole("button", { name: "Submit" })
}

export async function submitIncomeTransaction(user: UserEvent, name: string, amount: string) {
  const nameInput: HTMLInputElement = getNameInput()
  const amountInput: HTMLInputElement = getAmountInput()
  await pasteText(user, nameInput, name)
  await pasteText(user, amountInput, amount)
  await user.click(getIncomeInput())
  await user.click(getSubmitButton())
}

export async function submitExpenseTransaction(user: UserEvent, name: string, amount: string) {
  const nameInput: HTMLInputElement = getNameInput()
  const amountInput: HTMLInputElement = getAmountInput()
  await pasteText(user, nameInput, name)
  await pasteText(user, amountInput, amount)
  await user.click(getExpenseInput())
  await user.click(getSubmitButton())
}

async function pasteText(user: UserEvent, input: HTMLInputElement, text: string) {
  await user.clear(input)
  await user.click(input)
  await user.paste(text)
}