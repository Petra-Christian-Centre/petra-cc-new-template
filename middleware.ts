import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request url
  const url = request.nextUrl.clone()

  // Get pathname of request (e.g. /blog-slug)
  const { pathname } = request.nextUrl

  // Get hostname of request (e.g. demo.vercel.pub)
  const hostname = request.headers.get('host')

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
} 