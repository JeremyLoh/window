import { getClient } from "./supabaseClient"

export async function signUpUsingEmail(
  email: string,
  password: string,
  redirectUrl: string
) {
  const supabase = getClient()
  await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  })
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = getClient()
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  const supabase = getClient()
  return supabase.auth.signOut()
}

export async function resendSignUpConfirmEmail(email: string) {
  const supabase = getClient()
  return supabase.auth.resend({
    type: "signup",
    email: email,
  })
}

export async function deleteProfile(userId: string) {
  return getClient().from("delete_user_request").insert({ id: userId })
}
