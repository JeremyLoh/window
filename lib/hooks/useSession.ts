import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { getClientSession } from "../db/supabaseClient"

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    getClientSession().then((session) => {
      if (session) {
        setSession(session)
      } else {
        setSession(null)
      }
    })
  }, [])
  return session
}
