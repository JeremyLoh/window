"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers" // Only used in server components

// Only used in server components
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#creating-a-supabase-client
export async function getServer() {
  return createServerComponentClient({ cookies })
}

export async function getServerSession() {
  const supabase = await getServer()
  const response = await supabase.auth.getSession()
  return response.data.session
}
