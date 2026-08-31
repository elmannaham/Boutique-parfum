# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📋 Quick Reference: Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm start                # Run production server

# Code Quality
npm run lint             # ESLint with auto-fix
npm run format           # Prettier formatting
npm run type-check       # TypeScript type checking
npm run validate         # All checks: type-check, lint, test

# Testing
npm run test             # Run unit & integration tests (Vitest)
npm run test:watch      # Watch mode for tests
npm run test:coverage   # Coverage report with UI
npm run test:ui         # Interactive test UI

# E2E Testing
npm run e2e             # Run Playwright tests
npm run e2e:debug       # Debug mode
npm run e2e:ui          # Interactive mode

# Database
npx prisma migrate dev  # Run migrations
npx prisma db seed      # Seed data
npx prisma studio      # Visual database explorer

# Cleanup
npm run clean           # Remove build artifacts, node_modules, coverage
```

---

## 🏗️ Architecture Overview

### High-Level Architecture

This is a **Next.js 16 App Router** luxury e-commerce platform with a **monolithic full-stack** design:

```
Client Layer (React/TSX)
    ↓ HTTP
API Routes (Next.js Route Handlers)
    ↓ Prisma ORM
PostgreSQL Database

Auth: NextAuth.js (JWT + sessions)
Payment: Stripe API
Storage: Cloudinary/S3
```

### Core Layers

| Layer | Tech | Key Files |
|-------|------|-----------|
| **Routing** | App Router (route groups) | `app/(public)`, `app/(auth)`, `app/(dashboard)`, `app/api` |
| **Components** | React 18 + TypeScript | `components/ui`, `components/common`, `components/products`, `components/cart`, `components/auth` |
| **State** | Zustand stores | `lib/store/*Store.ts` |
| **Database** | Prisma ORM | `prisma/schema.prisma`, `lib/prisma.ts` |
| **Validation** | Zod schemas | `lib/schemas/` |
| **Auth** | NextAuth.js | `lib/auth/`, `app/api/auth/[...]` |
| **Styling** | Tailwind CSS + Framer Motion | `styles/`, tailwind.config.ts |

### Route Groups

- **`(public)`** — Public-facing pages (products, home, about)
- **`(auth)`** — Authentication flows (login, register, forgot password)
- **`(dashboard)`** — Protected user area (profile, orders, wishlist)
- **`api`** — REST endpoints with proper error handling

### State Management

- **Zustand stores** in `lib/store/` for client-side state (cart, wishlist, notifications)
- **Server Components** (RSC) for critical content (product listing, SEO)
- **SWR** for client-side data fetching with caching

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18.17.0+
- npm 9.0.0+
- PostgreSQL 14+ (or use SQLite for local dev)

### Initial Setup

```bash
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local — see section below

# Initialize database
npx prisma migrate dev
npx prisma db seed

# Start dev server
npm run dev
```

### Environment Variables

Required for local development (see `.env.local`):

```
NEXTAUTH_SECRET           # Generate: openssl rand -hex 32
NEXTAUTH_URL              # http://localhost:3000 for dev
DATABASE_URL              # PostgreSQL or SQLite connection string
STRIPE_SECRET_KEY         # Stripe test key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
CLOUDINARY_API_KEY        # For image uploads
RESEND_API_KEY            # For email sending
```

Optional OAuth providers (for production):
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` / `GITHUB_SECRET`

---

## 📝 TypeScript & Type Safety

### Strict Mode Enabled

TypeScript uses **strict mode** with maximum safety checks (`noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, etc.). All code must pass `npm run type-check`.

### Path Aliases

Absolute imports configured in `tsconfig.json`:

```typescript
import { Button } from '@/components/ui/Button'    // components/ui/Button.tsx
import { formatPrice } from '@/lib/utils/formatPrice'  // lib/utils/formatPrice.ts
import { Product } from '@/types'                  // types/index.ts
```

### Key Type Locations

- **`types/index.ts`** — Central export for all types (Product, User, Order, Cart, etc.)
- **`lib/schemas/`** — Zod validation schemas for inputs
- **Component Props** — Always explicitly typed (no `React.FC` shorthand)

---

## 🧪 Testing Strategy

### Test Structure

- **Unit Tests** — Individual utilities, hooks, components (Vitest)
- **Integration Tests** — API endpoints, database operations
- **E2E Tests** — Critical user flows (Playwright)

### Test Locations & Running Specific Tests

```bash
# Unit/Integration Tests (Vitest)
npm run test                              # Run all tests
npm run test:watch                        # Watch mode (re-run on file change)
npm run test -- --grep "cart"             # Filter by test name
npm run test -- lib/utils/formatPrice.ts  # Single file

# E2E Tests (Playwright)
npm run e2e                               # Run all E2E tests
npm run e2e -- --grep "checkout"          # Filter by test
npm run e2e:debug                         # Debug in browser
npm run e2e:ui                            # Interactive UI
```

### Coverage

Target: **80%+ coverage**

```bash
npm run test:coverage     # Coverage report + HTML report in coverage/
```

### Test Naming Convention

Use descriptive test names that explain the behavior:

```typescript
test('calculates shipping cost correctly for different regions', () => {})
test('returns empty cart when user clears all items', () => {})
test('shows validation error when email is missing', () => {})
```

---

## 🔐 Security & Code Quality

### Pre-commit Hooks (Husky)

Automatically runs on `git commit`:
- ESLint with auto-fix
- Prettier formatting
- Only lints staged files

Configure in `package.json` under `lint-staged`.

### Code Quality Checklist

Before submitting a PR:

- [ ] `npm run validate` passes (type-check + lint + test)
- [ ] No console.log or debug statements
- [ ] No hardcoded secrets (use env vars)
- [ ] TypeScript strict mode errors cleared
- [ ] Test coverage ≥ 80%
- [ ] Commit messages follow conventional commits format

### Security Checks

- **No secrets in code** — Use environment variables only
- **Input validation** — All user inputs validated with Zod schemas
- **SQL injection prevention** — Prisma parameterized queries
- **CSRF protection** — NextAuth.js handles this
- **XSS prevention** — React escapes by default; sanitize if using `dangerouslySetInnerHTML`

---

## 📊 Database & Prisma

### Database Schema

Core tables: `users`, `products`, `orders`, `order_items`, `reviews`, `cart_items`, `addresses`

See `prisma/schema.prisma` for complete schema.

### Common Prisma Workflows

```bash
# Create a new migration
npx prisma migrate dev --name add_new_field

# Reset database (dev only!)
npx prisma migrate reset

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

### Database Client

Access the singleton Prisma client via:

```typescript
import { prisma } from '@/lib/prisma'

const user = await prisma.user.findUnique({ where: { id: userId } })
```

---

## 🚀 Build & Deployment

### Production Build

```bash
npm run build    # Runs prisma generate then next build
npm start        # Start production server
```

The build process:
1. Generates Prisma client
2. Runs Next.js build (App Router optimization, code splitting)
3. Outputs to `.next/` directory

### Deployment to Vercel

```bash
# Ensure all environment variables are set in Vercel dashboard
vercel env add DATABASE_URL "your-postgres-url"
vercel env add NEXTAUTH_SECRET "$(openssl rand -hex 32)"
vercel deploy --prod
```

### Performance Optimizations

- **Image optimization** — Next.js Image component (WebP, AVIF, lazy loading)
- **Code splitting** — Dynamic imports for heavy components
- **CSS optimization** — Tailwind purges unused styles
- **Edge caching** — Vercel caches static assets globally

---

## 📁 Important Files & Their Purposes

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js optimization settings (Image, Webpack config) |
| `tailwind.config.ts` | Design tokens, theme configuration |
| `.eslintrc.json` | Linting rules (extends Next.js + TypeScript) |
| `vitest.config.ts` | Test runner configuration |
| `middleware.ts` | Auth middleware, security headers |
| `tsconfig.json` | TypeScript strict mode + path aliases |
| `prisma/schema.prisma` | Database schema (source of truth) |
| `lib/auth/` | Authentication utilities & session management |

---

## 🎨 Styling & Animation

### Tailwind CSS

- Design tokens in `tailwind.config.ts`
- Global styles in `styles/globals.css`
- CSS variables for theming (light/dark mode)

### Framer Motion

Used for smooth animations and transitions:

```typescript
import { motion } from 'framer-motion'

export function FadeIn({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  )
}
```

---

## 🔍 Debugging Tips

### Development Server Issues

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server with full rebuild
npm run dev

# Check for type errors without running server
npm run type-check
```

### Database Issues

```bash
# Reset database (dev only)
npx prisma migrate reset

# View database in UI
npx prisma studio

# Check migration status
npx prisma migrate status
```

### Test Debugging

```bash
# Run tests with detailed output
npm run test -- --reporter=verbose

# Debug specific test
npm run test -- lib/utils/formatPrice.test.ts --inspect-brk

# UI for interactive debugging
npm run test:ui
```

---

## 🌐 API Endpoints Structure

All API routes in `app/api/` follow REST conventions:

```
GET    /api/products           → List all products
GET    /api/products/[id]      → Get product by ID
POST   /api/products           → Create product (admin)
PUT    /api/products/[id]      → Update product (admin)
DELETE /api/products/[id]      → Delete product (admin)

GET    /api/cart               → Get user's cart
POST   /api/cart               → Add to cart
DELETE /api/cart/[itemId]      → Remove from cart

POST   /api/auth/signin        → NextAuth signin
POST   /api/auth/signout       → NextAuth signout
```

All endpoints should:
- Return consistent JSON shape: `{ success: boolean, data?: T, error?: string }`
- Validate input with Zod schemas
- Handle errors gracefully
- Return appropriate HTTP status codes

---

## 📖 References & Links

- [Next.js 16 Docs](https://nextjs.org/docs) — Especially App Router & Server Components
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Strict mode, generics
- [Tailwind CSS Docs](https://tailwindcss.com/docs) — Utilities, customization
- [Framer Motion Docs](https://www.framer.com/motion/) — Animations, gesture handlers
- [Prisma Docs](https://www.prisma.io/docs/) — ORM queries, migrations, relations
- [NextAuth.js Docs](https://next-auth.js.org/) — Authentication, sessions
- [Zod Docs](https://zod.dev/) — Schema validation
- [Zustand Docs](https://zustand-demo.vercel.app/) — State management
- [Vitest Docs](https://vitest.dev/) — Unit testing
- [Playwright Docs](https://playwright.dev/) — E2E testing

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Implement feature with tests
3. Run `npm run validate` — all checks must pass
4. Commit with conventional commits: `git commit -m "feat: add new feature"`
5. Open PR with description of changes

---

## 📌 Next.js Version Notes

This project uses **Next.js 16.3.3** with breaking changes from earlier versions. Always check `node_modules/next/dist/docs/` for current API references before implementing features. Deprecation notices in the development console should be heeded immediately.

Key differences from Next.js 13:
- App Router is the standard (no Pages Router)
- Server Components are the default (mark client components with `'use client'`)
- Streaming and Suspense for better performance
- Automatic route segment optimization

