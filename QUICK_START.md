# 🚀 Quick Start Guide — Maison Maeta

Get up and running with the Maison Maeta e-commerce platform in 5 minutes.

---

## Prerequisites

- **Node.js** >= 18.17.0 ([download](https://nodejs.org))
- **npm** >= 9.0.0
- **PostgreSQL** 14+ ([install guide](https://www.postgresql.org/download))
- **Git**

---

## 1️⃣ Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-org/maison-maeta.git
cd maison-maeta

# Install dependencies
npm install

# Verify installation
npm run type-check
```

---

## 2️⃣ Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and set these CRITICAL variables:
# - NEXTAUTH_SECRET (generate: openssl rand -hex 32)
# - DATABASE_URL (your PostgreSQL connection)
# - STRIPE_SECRET_KEY (from Stripe dashboard)
```

**Example `.env.local`:**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/maison_maeta
NEXTAUTH_SECRET=your-generated-secret-here
STRIPE_SECRET_KEY=sk_test_xxxxx
```

---

## 3️⃣ Setup Database

```bash
# Create database
createdb maison_maeta

# Run migrations
npx prisma migrate dev --name init

# Seed sample data (optional)
npx prisma db seed

# Open Prisma Studio to view data
npx prisma studio
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** in your browser.

---

## 5️⃣ Verify Everything Works

### Type Checking
```bash
npm run type-check
```
✅ Should have **zero errors**.

### Linting
```bash
npm run lint
```
✅ Should show no critical issues.

### Tests
```bash
npm run test
```
✅ All tests should **pass**.

### Build
```bash
npm run build
```
✅ Should complete without errors.

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `app/` | Next.js routes (App Router) |
| `components/` | React components |
| `lib/` | Business logic, utilities, hooks |
| `types/` | TypeScript type definitions |
| `middleware.ts` | Security headers, auth |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Design system (colors, fonts) |
| `tsconfig.json` | TypeScript strict mode |
| `.eslintrc.json` | Linting rules |

---

## 🛠️ Common Development Tasks

### Add a New Component

```bash
# Create file
touch components/products/YourComponent.tsx

# Template
export default function YourComponent() {
  return (
    <div className="...">
      {/* Your markup */}
    </div>
  );
}
```

### Add a Route

```bash
# Create folder
mkdir -p app/your-route

# Create page
touch app/your-route/page.tsx

# Example
export default function Page() {
  return <h1>Your Page</h1>;
}
```

### Create a Database Model

```bash
# Edit schema.prisma
nano prisma/schema.prisma

# Add your model, then:
npx prisma migrate dev --name add_your_model

# Generate types
npx prisma generate
```

### Write a Test

```bash
# Create test file
touch __tests__/unit/components/YourComponent.test.tsx

# Example
import { render, screen } from '@testing-library/react';
import YourComponent from '@/components/YourComponent';

it('renders correctly', () => {
  render(<YourComponent />);
  expect(screen.getByText('...')).toBeInTheDocument();
});
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

---

## 🔍 Debugging Tips

### Next.js Debug

```bash
DEBUG=* npm run dev
```

### PostgreSQL Debug

```bash
# Connect to database directly
psql -U postgres -d maison_maeta

# Show tables
\dt

# Quit
\q
```

### React Component Debug

```typescript
// Add console logs (will show in terminal during SSR)
console.log('Component mounted', props);

// Use React DevTools browser extension
```

### TypeScript Errors

```bash
# Get detailed error info
npm run type-check

# Check specific file
npx tsc lib/utils/formatPrice.ts --noEmit
```

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] All tests pass: `npm run test`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No lint issues: `npm run lint`
- [ ] Environment variables set in Vercel dashboard
- [ ] Database migrations run: `npx prisma migrate deploy`
- [ ] Build successful: `npm run build`
- [ ] Preview deployment tested

---

## 📚 Documentation

- **Architecture decisions**: See [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **API documentation**: See [`docs/API.md`](./docs/API.md) (create as needed)
- **Component library**: Run `npm run test:ui` for interactive component browser
- **Database schema**: Run `npx prisma studio` to visualize

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@/components/...'"

**Solution**: Check import path spelling and ensure `tsconfig.json` paths are correct.

### Issue: "Database connection refused"

**Solution**: Verify PostgreSQL is running and `DATABASE_URL` is correct.
```bash
psql -U postgres -c "SELECT 1"
```

### Issue: "Stripe API error"

**Solution**: Verify `STRIPE_SECRET_KEY` is valid test key (starts with `sk_test_`).

### Issue: "Styles not applying"

**Solution**: Restart dev server and clear Next.js cache:
```bash
npm run dev
# Press 'c' to clear cache, then reload browser
```

---

## 🚀 Next Steps

1. **Customize design**: Edit `tailwind.config.ts` for your brand colors
2. **Add products**: Use Prisma Studio or API endpoints
3. **Set up Stripe**: Link Stripe webhook and API keys
4. **Configure email**: Set up Resend or SendGrid for transactional emails
5. **Deploy**: Push to GitHub and connect Vercel

---

## 📞 Need Help?

- Check [`README.md`](./README.md) for detailed docs
- Review [`ARCHITECTURE.md`](./ARCHITECTURE.md) for design decisions
- Run tests in debug mode: `npm run test:watch`
- Inspect network requests in browser DevTools

---

## 🎉 You're Ready!

Start developing. Happy coding! ✨
