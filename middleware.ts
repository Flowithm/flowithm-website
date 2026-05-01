import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Stub — extend for auth or geo-restriction post-launch
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
