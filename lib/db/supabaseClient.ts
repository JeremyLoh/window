"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Only used for client components
export function getClient() {
  return createClientComponentClient()
}

export async function getClientSession() {
  const supabase = createClientComponentClient()
  const response = await supabase.auth.getSession()
  return response.data.session
}
