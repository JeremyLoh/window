import DineroFactory from "dinero.js"

class Currency {
  private amount: DineroFactory.Dinero

  constructor(amountInCents: number, currency: DineroFactory.Currency = "USD") {
    this.amount = DineroFactory({
      amount: Math.abs(Math.trunc(amountInCents)),
      currency
    })
  }

  public getAmountInCents(): number {
    return this.amount.getAmount()
  }

  public getAmountInDollars(): number {
    return this.amount.toUnit()
  }

  public getCurrency(): string {
    return this.amount.getCurrency()
  }

  public add(value: Currency): Currency {
    const sum: DineroFactory.Dinero = this.amount.add(DineroFactory({
      amount: value.getAmountInCents(),
      currency: this.amount.getCurrency()
    }))
    return new Currency(sum.getAmount(), this.amount.getCurrency())
  }

  public subtract(value: Currency): Currency {
    const result: DineroFactory.Dinero = this.amount.subtract(DineroFactory({
      amount: value.getAmountInCents(),
      currency: this.amount.getCurrency()
    }))
    return new Currency(result.getAmount(), this.amount.getCurrency())
  }

  public greaterThan(value: Currency): boolean {
    return this.amount.greaterThan(DineroFactory({
      amount: value.getAmountInCents(),
      currency: this.amount.getCurrency()
    }))
  }

  public format(): string {
    return "$" + (this.amount.getAmount() / 100).toFixed(2)
  }

  public formatNegative(): string {
    return "-$" + (this.amount.getAmount() / 100).toFixed(2)
  }
}

export default Currency