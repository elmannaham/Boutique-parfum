# Maison Maeta — Luxury Perfume E-Commerce Platform

A premium, high-performance e-commerce boutique for luxury perfumes, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Enterprise-grade security, accessibility, and performance.

## 🏗️ Architecture Overview

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js (App Router), React 18, TypeScript | Modern, performant web app |
| **Styling** | Tailwind CSS, Framer Motion | Elegant luxury UI with smooth animations |
| **Database** | PostgreSQL + Prisma ORM | Reliable data persistence |
| **Auth** | NextAuth.js + JWT | Secure user sessions |
| **Payments** | Stripe API | PCI-compliant payment processing |
| **Storage** | Cloudinary/S3 | Optimized image hosting |
| **Testing** | Vitest, Playwright, React Testing Library | Comprehensive test coverage (80%+) |
| **Deployment** | Vercel Edge Functions | Global performance with serverless |

### Project Structure

```
app/                  # Next.js App Router (route groups, layouts)
├── (public)/         # Public-facing pages (products, about)
├── (auth)/           # Authentication flows (login, register)
├── (dashboard)/      # Protected user dashboard
├── api/              # API routes (REST endpoints)
├── layout.tsx        # Root layout + providers
└── page.tsx          # Home page

components/           # Reusable React components
├── ui/               # Base UI components (Button, Card, etc.)
├── common/           # Cross-domain components (Header, Hero, Footer)
├── products/         # Product-specific components
├── cart/             # Shopping cart components
└── auth/             # Auth-related components

lib/                  # Business logic & utilities
├── api/              # API client functions
├── auth/             # Authentication utilities
├── db/               # Database queries
├── hooks/            # Custom React hooks
├── schemas/          # Zod validation schemas
└── utils/            # Utility functions

types/                # TypeScript type definitions
├── product.ts        # Product interface + enums
├── user.ts           # User & authentication types
├── order.ts          # Order & transaction types
├── cart.ts           # Shopping cart types
├── api.ts            # API response shapes
└── index.ts          # Central export

__tests__/            # Automated tests
├── unit/             # Unit tests (Vitest)
├── integration/      # Integration tests
└── e2e/              # End-to-end tests (Playwright)

styles/               # Global CSS & design system
├── globals.css       # Tailwind directives
├── variables.css     # CSS custom properties
└── animations.css    # Framer Motion presets

public/               # Static assets (images, fonts)
├── images/
├── fonts/
└── icons/

middleware.ts         # Security headers, auth middleware
next.config.js        # Next.js optimization config
tailwind.config.ts    # Design tokens & theme
tsconfig.json         # TypeScript strict mode
.eslintrc.json        # Linting rules
vitest.config.ts      # Test configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0
- PostgreSQL 14+

### Installation

```bash
# Clone repository
git clone <repo-url>
cd maison-maeta

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Initialize database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

Visit http://localhost:3000 to see the app.

---

## 🔒 Security Features

### Built-in Protections

- ✅ **Content Security Policy (CSP)** - Prevents XSS attacks
- ✅ **HSTS Headers** - Enforces HTTPS for 1 year
- ✅ **X-Frame-Options** - Prevents clickjacking
- ✅ **Input Validation** - Zod schema validation on all user inputs
- ✅ **SQL Injection Prevention** - Prisma parameterized queries
- ✅ **CSRF Protection** - NextAuth.js CSRF tokens
- ✅ **Rate Limiting** - API endpoint protection
- ✅ **Secure Cookies** - HttpOnly, Secure, SameSite
- ✅ **No Secrets in Code** - Environment variables only

### Authentication

- OAuth2 integration (Google, GitHub)
- Email/password with bcrypt hashing
- JWT tokens with refresh rotation
- Session management via NextAuth.js

---

## ♿ Accessibility & Inclusivity

- ✅ **WCAG 2.1 AA Compliant** - Full keyboard navigation, high contrast
- ✅ **Semantic HTML** - Proper heading hierarchy, ARIA labels
- ✅ **Color Contrast** - Minimum 4.5:1 text-to-background ratio
- ✅ **Screen Reader Support** - ARIA roles and live regions
- ✅ **Skip to Content** - Keyboard users can jump to main content
- ✅ **Focus Indicators** - Visible focus rings on interactive elements

---

## ⚡ Performance Optimization

### Core Web Vitals

- **LCP (Largest Contentful Paint)** < 2.5s
- **INP (Interaction to Next Paint)** < 200ms
- **CLS (Cumulative Layout Shift)** < 0.1

### Techniques

- Server-side Rendering (RSC) for critical content
- Image optimization (WebP, AVIF, lazy loading)
- Code splitting with dynamic imports
- CSS-in-JS tree shaking
- ISR (Incremental Static Regeneration) for product catalog
- Edge caching with Vercel

---

## 🧪 Testing Strategy

### Coverage Targets

- **Unit Tests**: 80%+ coverage (Vitest)
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Critical user flows (Playwright)

### Running Tests

```bash
# Unit & integration tests
npm run test           # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run test:ui       # Interactive UI

# End-to-end tests
npm run e2e           # Run Playwright tests
npm run e2e:debug    # Debug mode
npm run e2e:ui       # Interactive mode
```

---

## 🎯 Code Quality Standards

### Type Safety

- **Strict TypeScript** - All code must pass strict type checking
- **No `any` Types** - Use proper types everywhere
- **Exhaustive Checks** - Typescript ensures all cases are handled

### Code Style

- **ESLint** - Enforced linting rules
- **Prettier** - Automatic code formatting
- **Immutability** - Prefer new objects over mutations
- **DRY Principle** - Extract reusable logic

### Pre-commit Hooks

```bash
# Automatically runs linter & formatter
git commit -m "feat: add product filters"
# Husky hooks will lint and format staged files
```

---

## 📊 Database Schema

### Core Tables

- **products** - Perfume catalog
- **users** - Customer accounts
- **orders** - Transaction records
- **order_items** - Line items per order
- **reviews** - Product reviews & ratings
- **cart_items** - Shopping cart persistence
- **addresses** - Customer shipping/billing addresses

Run `npx prisma studio` to explore the database visually.

---

## 🔑 Environment Variables

Required variables (see `.env.example`):

```
NEXTAUTH_SECRET          # Generate with: openssl rand -hex 32
STRIPE_SECRET_KEY        # From Stripe dashboard
DATABASE_URL             # PostgreSQL connection string
CLOUDINARY_API_KEY       # For image hosting
RESEND_API_KEY           # For transactional emails
```

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build           # Optimized build
npm run validate       # Type check + lint + test
npm start              # Start production server
```

### Deploy to Vercel

```bash
vercel env add NEXTAUTH_SECRET <your-secret>
vercel env add STRIPE_SECRET_KEY <your-key>
vercel deploy --prod
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion)
- [Stripe Payments](https://stripe.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

---

## 👥 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit with conventional commits: `git commit -m "feat: add amazing feature"`
3. All tests must pass: `npm run validate`
4. Submit pull request with description

---

## 📄 License

PROPRIETARY - All rights reserved by Maison Maeta Studio.

---

## ✨ Built with ❤️ for Luxury Perfume Enthusiasts
