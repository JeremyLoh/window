import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getSession() {
  "use server"
  const supabase = createClientComponentClient()
  return await supabase.auth.getSession()
}
