"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Only used in server components
export function getServer() {
  return createServerComponentClient({ cookies })
}
