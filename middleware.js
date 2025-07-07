import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Configuration object for maintainability
const routeConfig = {
  publicPaths: [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/products(.*)',
    '/api/public(.*)',
    '/auth/(.*)'
  ],
  authPaths: [
    '/account(.*)',
    '/checkout',
    '/orders(.*)'
  ],
  sellerPaths: [
    '/seller(.*)',
    '/api/seller(.*)'
  ],
  adminPaths: [
    '/admin(.*)',
    '/api/admin(.*)'
  ]
};

export default async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Skip middleware for next internal paths and static files
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/static') || 
      /\.(ico|svg|png|jpg|jpeg|gif|webp)$/.test(pathname)) {
    return NextResponse.next();
  }

  // Check if path matches any public route pattern
  const isPublicPath = routeConfig.publicPaths.some(path => 
    path.includes('(.*)') 
      ? new RegExp(path.replace('(.*)', '.*')).test(pathname)
      : pathname.startsWith(path)
  );

  // Public route handling
  if (isPublicPath) {
    // Redirect authenticated users away from auth pages
    if (['/login', '/register'].includes(pathname) && token) {
      const redirectUrl = token.role === 'seller' ? '/seller/dashboard' : '/account';
      return NextResponse.redirect(new URL(redirectUrl, origin));
    }
    return NextResponse.next();
  }

  // API route protection
  if (pathname.startsWith('/api')) {
    // Seller API routes
    if (pathname.startsWith('/api/seller') && token?.role !== 'seller') {
      return apiErrorResponse('Seller access required', 403);
    }

    // Admin API routes
    if (pathname.startsWith('/api/admin') && token?.role !== 'admin') {
      return apiErrorResponse('Admin access required', 403);
    }

    // General API authentication
    if (!token) {
      return apiErrorResponse('Authentication required', 401);
    }

    return NextResponse.next();
  }

  // Frontend route protection
  if (!token) {
    return redirectToLogin(req, pathname);
  }

  // Seller route protection
  if (pathname.startsWith('/seller') && token.role !== 'seller') {
    return NextResponse.redirect(new URL('/', origin));
  }

  // Admin route protection
  if (pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', origin));
  }

  return NextResponse.next();
}

// Helper functions
function apiErrorResponse(message, status = 401) {
  return new NextResponse(
    JSON.stringify({ success: false, message }),
    { status, headers: { 'content-type': 'application/json' } }
  );
}

function redirectToLogin(req, currentPath) {
  const loginUrl = new URL('/login', req.nextUrl.origin);
  loginUrl.searchParams.set('callbackUrl', currentPath);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|public/|api/public/).*)',
    '/(api|trpc)(.*)'
  ]
};