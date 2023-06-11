import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getSession() {
  "use server"
  const supabase = createClientComponentClient()
  const session = await supabase.auth.getSession()
  console.log(session)

  return session
}
