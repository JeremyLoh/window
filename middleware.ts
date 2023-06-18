import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const response = await supabase.auth.getSession()

  if (
    !response.data.session &&
    req.nextUrl.pathname.startsWith("/bugTracker/dashboard")
  ) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = "/bugTracker/login"
    return NextResponse.redirect(loginUrl)
  }
  return res
}
