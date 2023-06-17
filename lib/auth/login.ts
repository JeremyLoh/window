import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function signUpUsingEmail(
  email: string,
  password: string,
  redirectUrl: string
) {
  "use server"
  const supabase = createClientComponentClient()
  await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  })
}

export async function signInWithEmail(email: string, password: string) {
  "use server"
  const supabase = createClientComponentClient()
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  "use server"
  const supabase = createClientComponentClient()
  await supabase.auth.signOut()
}

export async function resendSignUpConfirmEmail(email: string) {
  "use server"
  const supabase = createClientComponentClient()
  return await supabase.auth.resend({
    type: "signup",
    email: email,
  })
}
