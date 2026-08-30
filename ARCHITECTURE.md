# Architecture Decision Record (ADR) — Maison Maeta

## Overview

Maison Maeta is engineered for **luxury, performance, security, and scalability**. Every architectural decision prioritizes user experience and production reliability.

---

## 1. Framework: Next.js 14 App Router (Decision: APPROVED)

### Choice
**Next.js 14 with App Router** over traditional React SPA.

### Rationale
- **Server Components by Default (RSC)** - Reduces JavaScript bundle, improves LCP
- **File-based Routing** - Intuitive, maintainable route organization
- **Built-in Optimizations** - Image optimization, automatic code splitting, font optimization
- **API Routes** - Backend logic without separate server
- **Middleware Support** - Security headers, redirects, auth checks
- **Vercel Edge Deployment** - Global performance with serverless edge functions

### Trade-offs
- Learning curve for RSC patterns (mitigated with examples)
- SSR complexity (solved with proper data fetching patterns)

---

## 2. Type Safety: TypeScript Strict Mode (Decision: APPROVED)

### Choice
**TypeScript with `strict: true`** in all codebases.

### Rationale
- **Compile-time Error Detection** - Catches bugs before runtime
- **Self-Documenting Code** - Types serve as inline documentation
- **Refactoring Confidence** - Safe refactors with full type checking
- **IDE Support** - Excellent intellisense and autocomplete
- **Production Reliability** - Reduced runtime surprises

### Enforcement
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUnusedLocals": true
}
```

---

## 3. Styling: Tailwind CSS + Framer Motion (Decision: APPROVED)

### Choice
**Tailwind CSS** for utility-first styling + **Framer Motion** for micro-interactions.

### Rationale

#### Tailwind CSS
- **Luxury Aesthetic** - Fine-grained control over spacing, colors, typography
- **Tree-Shakeable** - Only used classes end up in bundle (14KB gzipped)
- **Responsive First** - Mobile-first luxury experience
- **Custom Design System** - Tailored color palette, typography hierarchy
- **DX** - Hot-reload, consistent spacing system, no CSS bloat

#### Framer Motion
- **Performance** - GPU-accelerated animations (smooth 60fps)
- **Intuitive API** - Gesture recognition, layout animations
- **Premium Feel** - Micro-interactions that feel luxury

### Trade-offs
- Tailwind requires mental model shift from traditional CSS (well worth it)
- Framer Motion adds ~40KB to bundle (negligible for luxury experience)

---

## 4. State Management: Zustand + React Context (Decision: APPROVED)

### Choice
**Zustand** for global state (cart, auth) + **React Context** for theme/preferences.

### Rationale
- **Zustand over Redux** - Simpler boilerplate, better DX, smaller bundle (2.2KB)
- **Context over Zustand** - Theme switching is local, doesn't need persistence
- **No Redux Devtools Needed** - Zustand is transparent enough
- **Scalable** - Can evolve to proper state machine if needed

### Example: Cart Store
```typescript
const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, product]
  }))
}));
```

---

## 5. Data Fetching: Server Components + SWR for Client (Decision: APPROVED)

### Choice
- **Server Components** for initial page load (product list, details)
- **SWR** for client-side refetching (cart updates, favorites)

### Rationale
- **RSC Advantages** - Database queries happen on server, zero JS overhead
- **SWR Benefits** - Background sync, stale-while-revalidate, minimal bundle (5.8KB)
- **Hybrid Approach** - Get best of both worlds

---

## 6. Database: PostgreSQL + Prisma ORM (Decision: APPROVED)

### Choice
**PostgreSQL** with **Prisma** as the ORM.

### Rationale
- **PostgreSQL** - ACID compliance, JSON support, proven at scale
- **Prisma** - Type-safe queries, migrations, seed scripts, Prisma Studio
- **Developer Experience** - Auto-generated types from schema
- **Performance** - Connection pooling, query optimization

---

## 7. Authentication: NextAuth.js (Decision: APPROVED)

### Choice
**NextAuth.js** for session management and OAuth integration.

### Rationale
- **Session Management** - Automatic JWT/cookie handling
- **OAuth Support** - Google, GitHub, Apple with single config
- **Security** - Built-in CSRF protection, secure defaults
- **TypeScript Support** - Excellent type safety
- **Vercel Optimized** - First-class support on Vercel Edge Functions

---

## 8. Payment Processing: Stripe (Decision: APPROVED)

### Choice
**Stripe** for payment processing.

### Rationale
- **PCI Compliance** - Payment handling is PCI Level 1 certified
- **Global Reach** - Supports 135+ currencies, all major payment methods
- **Webhooks** - Reliable event-driven order fulfillment
- **Idempotency Keys** - Prevent double-charging on network failures
- **Documentation** - Industry-leading clarity

---

## 9. Image Optimization: Next.js Image + Cloudinary (Decision: APPROVED)

### Choice
- **Next.js Image** component for all product images
- **Cloudinary** as CDN + image transformation service

### Rationale
- **Automatic WebP/AVIF** - Adaptive image formats based on browser
- **Lazy Loading** - Images load only when near viewport
- **Responsive Srcsets** - Device-specific image sizes (640px, 1200px, etc.)
- **Quality Optimization** - Automatic compression with perceptual quality
- **Core Web Vitals** - Optimized for LCP, CLS metrics

---

## 10. Testing Strategy: Vitest + Playwright (Decision: APPROVED)

### Choice
- **Vitest** for unit/integration tests (80%+ coverage target)
- **Playwright** for E2E tests (critical user flows)

### Rationale
- **Vitest over Jest** - Faster, built on Vite, same DX
- **React Testing Library** - Tests behavior, not implementation
- **Playwright over Cypress** - Cross-browser, cross-OS, headless-first
- **Coverage Target 80%** - Balances safety with development speed

---

## 11. Security: Defense-in-Depth (Decision: APPROVED)

### Implemented Controls

| Control | Method | Status |
|---------|--------|--------|
| CSP | Strict directives in middleware | ✅ Implemented |
| HSTS | 1-year max-age with preload | ✅ Implemented |
| HTTPS Only | Redirects in middleware | ✅ Implemented |
| CSRF | NextAuth.js tokens | ✅ Implemented |
| Input Validation | Zod schema validation | ✅ Implemented |
| SQL Injection | Prisma parameterized queries | ✅ Implemented |
| XSS | React auto-escaping + CSP | ✅ Implemented |
| Secrets | Environment variables only | ✅ Implemented |
| Rate Limiting | Redis-backed (configurable) | ✅ Implemented |
| HTTPS Cert | Let's Encrypt (via Vercel) | ✅ Implemented |

---

## 12. Accessibility: WCAG 2.1 AA Target (Decision: APPROVED)

### Standards Compliance
- ✅ Semantic HTML (proper heading hierarchy)
- ✅ ARIA labels on interactive elements
- ✅ Color contrast >= 4.5:1 (AAA for primary text)
- ✅ Keyboard navigation (full keyboard support)
- ✅ Focus indicators (visible on tab)
- ✅ Screen reader support (role, aria-label, aria-pressed)
- ✅ Motion: `prefers-reduced-motion` respected
- ✅ Skip to content link

### Testing
- Axe accessibility scanner (automated)
- Manual keyboard testing
- Screen reader testing (NVDA, JAWS)

---

## 13. Performance: Core Web Vitals Optimization (Decision: APPROVED)

### Targets
- **LCP** < 2.5s (Largest Contentful Paint)
- **INP** < 200ms (Interaction to Next Paint)
- **CLS** < 0.1 (Cumulative Layout Shift)

### Techniques
- Server-side rendering for initial content
- Image optimization (WebP, AVIF)
- Code splitting with dynamic imports
- CSS-in-JS tree shaking
- Caching headers (static: 1 year, dynamic: 1 hour)
- Vercel Edge Functions for geo-distributed latency

---

## 14. Deployment: Vercel (Decision: APPROVED)

### Rationale
- **Native Next.js Support** - Built by Vercel team
- **Edge Functions** - Global latency optimization
- **Automatic SSL** - HTTPS with Let's Encrypt
- **Preview Deployments** - Pre-merge review links
- **Analytics** - Built-in Core Web Vitals monitoring
- **Serverless Database** - Vercel Postgres option
- **Environment Variables** - Secure, easy management

---

## 15. Code Organization: Feature-Based (Decision: APPROVED)

### Structure Rationale
```
components/
  ├── ui/          # Generic UI components
  ├── common/      # Cross-feature components
  ├── products/    # Product-specific
  ├── cart/        # Cart-specific
  └── auth/        # Auth-specific
```

**Rationale**
- Easier to find related code
- Reduce cross-feature dependencies
- Clear ownership boundaries
- Supports team scaling

---

## 16. Git Workflow: Conventional Commits (Decision: APPROVED)

### Convention
```
<type>: <description>

<optional body>
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `docs:` - Documentation
- `test:` - Tests
- `chore:` - Build, deps, config
- `perf:` - Performance improvement

**Benefits**
- Changelog generation
- Semantic versioning
- Commit history readability

---

## Summary of Key Decisions

| Aspect | Choice | Rationale |
|--------|--------|-----------|
| Framework | Next.js 14 | Performance, DX, serverless |
| Language | TypeScript (strict) | Type safety, compile-time checks |
| Styling | Tailwind + Framer | Luxury design, performance |
| State | Zustand + Context | Simplicity, small bundle |
| Data | RSC + SWR | Performance + flexibility |
| Database | PostgreSQL + Prisma | Type-safety, migrations |
| Auth | NextAuth.js | OAuth, session management |
| Payments | Stripe | PCI compliance, global |
| Images | Next.js + Cloudinary | Core Web Vitals optimization |
| Testing | Vitest + Playwright | Performance, reliability |
| Security | Defense-in-depth | CSP, HSTS, validation, secrets |
| A11y | WCAG 2.1 AA | Inclusive experience |
| Deploy | Vercel | Native Next.js, edge functions |

---

## Future Considerations

### Phase 2 (Future Iterations)
- [ ] Internationalization (i18n) with next-intl
- [ ] Advanced search with Algolia
- [ ] Real-time inventory with WebSockets
- [ ] Admin dashboard with analytics
- [ ] AI-powered product recommendations
- [ ] Mobile app with React Native/Expo

---

## Conclusion

This architecture prioritizes:
1. **Security** - Defense-in-depth, no shortcuts
2. **Performance** - Optimized for Core Web Vitals
3. **Accessibility** - Inclusive for all users
4. **Developer Experience** - Clear, maintainable code
5. **Scalability** - Foundation for growth

All decisions are documented, reversible, and justified.
