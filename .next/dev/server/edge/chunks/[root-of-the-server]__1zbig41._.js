(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__1zbig41._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    // ============================================================================
    // SECURITY HEADERS
    // ============================================================================
    // 1. Content-Security-Policy: Strict protection against XSS and injection attacks
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://api.stripe.com https://vitals.vercel-analytics.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
    ].join('; ');
    response.headers.set('Content-Security-Policy', csp);
    // 2. HSTS: Enforce HTTPS for 1 year (with subdomains)
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    // 3. X-Content-Type-Options: Prevent MIME sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');
    // 4. X-Frame-Options: Clickjacking protection
    response.headers.set('X-Frame-Options', 'DENY');
    // 5. X-XSS-Protection: Enable browser XSS filters (legacy, but defense in depth)
    response.headers.set('X-XSS-Protection', '1; mode=block');
    // 6. Referrer-Policy: Control referrer information
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // 7. Permissions-Policy: Disable unnecessary APIs
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(self)');
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
    const protectedRoutes = [
        '/dashboard',
        '/profile',
        '/orders'
    ];
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    if (isProtectedRoute) {
        // In production, integrate with NextAuth, Clerk, or Auth0
        // For now, we check for an auth token in httpOnly cookie
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/login?redirect=' + pathname, request.url));
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
    if (("TURBOPACK compile-time value", "development") === 'production' && request.headers.get('x-forwarded-proto') !== 'https') //TURBOPACK unreachable
    ;
    return response;
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */ '/((?!_next/static|_next/image|favicon.ico|public).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1zbig41._.js.map