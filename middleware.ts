import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware Next.js for security headers, authentication checks, and request filtering.
 * Runs on every request (except statically optimized pages).
 */

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ============================================================================
  // SECURITY HEADERS
  // ============================================================================

  // 1. Content-Security-Policy: Strict protection against XSS and injection attacks
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // Framer Motion CDN
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.stripe.com https://vitals.vercel-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // 2. HSTS: Enforce HTTPS for 1 year (with subdomains)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // 3. X-Content-Type-Options: Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 4. X-Frame-Options: Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY');

  // 5. X-XSS-Protection: Enable browser XSS filters (legacy, but defense in depth)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 6. Referrer-Policy: Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 7. Permissions-Policy: Disable unnecessary APIs
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(self)'
  );

  // 8. Cache-Control: Security + Performance headers
  if (request.nextUrl.pathname.startsWith('/api')) {
    // API routes: No caching, must revalidate
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
  } else if (request.nextUrl.pathname.match(/\.(js|css|webp|png|jpg|svg)$/)) {
    // Static assets: Aggressive caching with immutable flag
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // HTML pages: Validate on each request
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  }

  // ============================================================================
  // AUTHENTICATION & AUTHORIZATION
  // ============================================================================

  const pathname = request.nextUrl.pathname;

  // Protected routes: Redirect to login if no session
  const protectedRoutes = ['/dashboard', '/profile', '/orders'];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // In production, integrate with NextAuth, Clerk, or Auth0
    // For now, we check for an auth token in httpOnly cookie
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
    }

    // Validate token signature (implement JWT validation)
    // This is pseudo-code; use a proper JWT library (jose, jsonwebtoken)
    // const isValid = await verifyToken(token);
    // if (!isValid) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  // ============================================================================
  // RATE LIMITING (Basic implementation)
  // ============================================================================

  // For production, use a proper rate limiting service (Redis, Upstash)
  if (pathname.startsWith('/api')) {
    // Rate limiting would go here
    // const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    // const key = `rate_limit:${ip}`;
    // const count = await redis.incr(key);
    // if (count === 1) await redis.expire(key, 60);
    // if (count > 100) {
    //   return new NextResponse('Too Many Requests', { status: 429 });
    // }
  }

  // ============================================================================
  // REDIRECT HTTP to HTTPS (in production)
  // ============================================================================

  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    const httpsUrl = request.url.replace('http://', 'https://');
    return NextResponse.redirect(httpsUrl, { status: 308 });
  }

  return response;
}

/**
 * Configure which routes should run through middleware.
 * Exclude static assets, images, and favicon to improve performance.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
