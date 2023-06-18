"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Only used for client components
export function getClient() {
  return createClientComponentClient()
}

export async function getSession() {
  const supabase = createClientComponentClient()
  return await supabase.auth.getSession()
}
