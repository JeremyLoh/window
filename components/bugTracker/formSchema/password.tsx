// Min 8 chars, 1 uppercase letter, 1 lowercase letter, 1 numeric digit
export const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
export const passwordErrorMessage =
  "please create a stronger password: Min 8 chars, 1 uppercase letter, 1 lowercase letter, 1" +
  " numeric digit"