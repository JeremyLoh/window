import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AuthTokenResponse } from "@supabase/gotrue-js"

export async function getSession() {
  "use server"
  const supabase = createClientComponentClient()
  return await supabase.auth.getSession()
}

export function isEmailNotConfirmed(token: AuthTokenResponse): boolean {
  if (!token.error) {
    return false
  }
  return token.error.message === "Email not confirmed"
}
