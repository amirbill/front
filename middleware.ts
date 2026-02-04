import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Define paths
    const authPaths = ['/signin', '/signup', '/verify', '/forgot-password', '/reset-password']
    const adminPaths = ['/dashboard']
    const clientPaths = ['/', '/products', '/para', '/pricing', '/solutions', '/profile']

    const isAuthPath = authPaths.some(path => pathname.startsWith(path))
    const isAdminPath = adminPaths.some(path => pathname.startsWith(path))
    const isClientPath = clientPaths.some(path => pathname === path || pathname.startsWith(path + '/'))

    // No token - guest user
    if (!token) {
        // If trying to access protected routes without token, redirect to signin
        if (isAdminPath) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }
        // Allow access to auth pages and client pages
        return NextResponse.next()
    }

    // Has token - decode it to get role
    let userRole: string | null = null
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'YOUR_SUPER_SECRET_KEY_CHANGE_ME')
        const { payload } = await jwtVerify(token, secret)
        userRole = payload.role as string
    } catch (error) {
        // Invalid token - clear it and redirect to signin
        const response = NextResponse.redirect(new URL('/signin', request.url))
        response.cookies.delete('token')
        return response
    }

    // If on auth page and already logged in, redirect to appropriate area
    if (isAuthPath) {
        if (userRole === 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // Role-based access control
    if (userRole === 'admin') {
        // Admins default to dashboard but can visit other pages
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    } else if (userRole === 'client') {
        // Clients CANNOT access dashboard
        if (isAdminPath) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
}
