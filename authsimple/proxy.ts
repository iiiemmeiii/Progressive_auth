import { NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/proxy"

export async function proxy(re: NextRequest) {
    return await updateSession(re)
} 

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}