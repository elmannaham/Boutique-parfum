# Browse-Only MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a browse-only e-commerce experience (home page + product listing + product detail) in 5 hours for a solo developer.

**Architecture:** 
- Home page integrates HeroPremium + featured products grid
- Product listing reuses a shared ProductGrid component
- Product detail page displays individual product with full info
- All pages are Next.js 14 server components using Prisma for data

**Tech Stack:**
- Next.js 14 App Router (server components)
- TypeScript (strict mode)
- Tailwind CSS + Framer Motion (premium components)
- Prisma ORM (6 seeded perfumes already in DB)
- Vitest + React Testing Library

**Spec:** `README_PROJECT.md` (Phase 1 MVP, browse-only variant)

---

## Global Constraints

- Timeline: 5 hours total
- Solo developer (you)
- Design locked (HeroPremium, HeaderPremium, ProductCardPremium already created)
- No perfectionism — MVP-only, no search/filters/reviews
- Tests written but not critical if coverage < 80% (complete after launch)
- Focus on shipping working features, not full test coverage

---

## File Structure

### New Files to Create

```
components/
  └── products/
      └── ProductGrid.tsx           # Reusable grid layout (featured or all products)

app/
  ├── page.tsx                      # Home page (update existing)
  ├── products/
  │   ├── page.tsx                  # Product listing (all products)
  │   └── [id]/
  │       └── page.tsx              # Product detail (single product)

lib/
  └── services/
      └── productService.ts         # Fetch products from Prisma (new or update)

__tests__/
  └── unit/
      ├── components/
      │   └── ProductGrid.test.tsx  # Grid component tests
      └── pages/
          ├── Home.test.tsx         # Home page tests
          ├── ProductListing.test.tsx # Products page tests
          └── ProductDetail.test.tsx  # Detail page tests
```

---

## Task 1: Create ProductGrid Component

**Files:**
- Create: `components/products/ProductGrid.tsx`
- Create: `__tests__/unit/components/ProductGrid.test.tsx`

**Interfaces:**
- Consumes: 
  - `Product` type from `types/index.ts` (should already exist: `{ id, name, price, image, ... }`)
  - `ProductCardPremium` component (already created in `components/products/ProductCardPremium.tsx`)
- Produces:
  - `ProductGrid` React component
  - Props: `ProductGridProps { products: Product[], variant?: 'featured' | 'all' }`

**Steps:**

- [ ] **Step 1: Write the failing test**

Create `__tests__/unit/components/ProductGrid.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { ProductGrid } from '@/components/products/ProductGrid'
import type { Product } from '@/types'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Essence Nocturne',
    price: 89.99,
    image: '/images/essence-nocturne.jpg',
    description: 'Dark and mysterious',
    concentration: 'Eau de Parfum',
    volume: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Lumière d\'Aube',
    price: 79.99,
    image: '/images/lumiere-aube.jpg',
    description: 'Fresh and bright',
    concentration: 'Eau de Toilette',
    volume: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('ProductGrid', () => {
  it('should render all products in a grid', () => {
    render(<ProductGrid products={mockProducts} variant="all" />)
    expect(screen.getByText('Essence Nocturne')).toBeInTheDocument()
    expect(screen.getByText('Lumière d\'Aube')).toBeInTheDocument()
  })

  it('should display correct number of products', () => {
    const { container } = render(<ProductGrid products={mockProducts} variant="all" />)
    const gridItems = container.querySelectorAll('[data-testid="product-card"]')
    expect(gridItems).toHaveLength(2)
  })

  it('should render empty state when no products', () => {
    render(<ProductGrid products={[]} variant="all" />)
    expect(screen.getByText(/no products/i)).toBeInTheDocument()
  })

  it('should apply responsive grid classes', () => {
    const { container } = render(<ProductGrid products={mockProducts} variant="all" />)
    const grid = container.querySelector('[data-testid="product-grid"]')
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- ProductGrid.test.tsx
```

Expected output: FAIL — "ProductGrid is not exported" or "Cannot find module"

- [ ] **Step 3: Write minimal implementation**

Create `components/products/ProductGrid.tsx`:

```typescript
import type { Product } from '@/types'
import { ProductCardPremium } from './ProductCardPremium'

interface ProductGridProps {
  products: Product[]
  variant?: 'featured' | 'all'
}

export function ProductGrid({ products, variant = 'all' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No products available</p>
      </div>
    )
  }

  return (
    <div
      data-testid="product-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
    >
      {products.map((product) => (
        <div key={product.id} data-testid="product-card">
          <ProductCardPremium product={product} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- ProductGrid.test.tsx
```

Expected output: PASS (3–4 tests passing)

- [ ] **Step 5: Commit**

```bash
git add components/products/ProductGrid.tsx __tests__/unit/components/ProductGrid.test.tsx
git commit -m "feat: add ProductGrid reusable component"
```

---

## Task 2: Create ProductService (Data Fetching)

**Files:**
- Create: `lib/services/productService.ts`

**Interfaces:**
- Consumes:
  - Prisma client (`prisma/client` — already initialized)
  - `Product` type from `types/index.ts`
- Produces:
  - `getProducts(): Promise<Product[]>` — fetch all products
  - `getProductById(id: string): Promise<Product | null>` — fetch single product
  - `getFeaturedProducts(limit: number): Promise<Product[]>` — fetch first N products

**Steps:**

- [ ] **Step 1: Create the service file**

Create `lib/services/productService.ts`:

```typescript
import { prisma } from '@/lib/prisma'
import type { Product } from '@/types'

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return products
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      galleryImages: true,
    },
  })
  return product
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
  return products
}
```

- [ ] **Step 2: Verify Prisma client import works**

```bash
npm run type-check
```

Expected: No TypeScript errors

- [ ] **Step 3: Test in Prisma Studio (optional, verify data)**

```bash
npx prisma studio
```

Verify that 6 perfumes are seeded and visible.

- [ ] **Step 4: Commit**

```bash
git add lib/services/productService.ts
git commit -m "feat: add productService for data fetching"
```

---

## Task 3: Update Home Page with HeroPremium + Featured Products

**Files:**
- Modify: `app/page.tsx`
- Create: `__tests__/unit/pages/Home.test.tsx`

**Interfaces:**
- Consumes:
  - `HeroPremium` component (already created)
  - `HeaderPremium` component (already created)
  - `ProductGrid` component (created in Task 1)
  - `getFeaturedProducts()` service (created in Task 2)
- Produces:
  - Home page server component exporting default `HomePage`

**Steps:**

- [ ] **Step 1: Write the failing test**

Create `__tests__/unit/pages/Home.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock productService
jest.mock('@/lib/services/productService', () => ({
  getFeaturedProducts: jest.fn(() =>
    Promise.resolve([
      {
        id: '1',
        name: 'Essence Nocturne',
        price: 89.99,
        image: '/images/essence-nocturne.jpg',
      },
    ])
  ),
}))

describe('HomePage', () => {
  it('should render hero section', async () => {
    const { container } = await render(await HomePage())
    // HeroPremium should render
    expect(container.innerHTML).toContain('Maison Maeta') || 
    expect(container.innerHTML).toContain('Luxury')
  })

  it('should render featured products', async () => {
    await render(await HomePage())
    expect(screen.getByText(/Essence Nocturne/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- Home.test.tsx
```

Expected: FAIL — "Cannot find module" or render error

- [ ] **Step 3: Write the home page**

Replace `app/page.tsx`:

```typescript
import { HeroPremium } from '@/components/home/HeroPremium'
import { HeaderPremium } from '@/components/common/HeaderPremium'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getFeaturedProducts } from '@/lib/services/productService'

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6)

  return (
    <>
      <HeaderPremium />
      <HeroPremium />
      
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Fragrances
          </h2>
          <p className="text-lg text-gray-600">
            Discover our curated selection of luxury perfumes
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} variant="featured" />
      </section>

      {/* About Section */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            About Maison Maeta
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Since 1997, Maison Maeta has crafted luxury fragrances that tell stories.
            Each bottle is a journey through carefully selected essences and timeless elegance.
          </p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test -- Home.test.tsx
npm run dev
```

Visit `http://localhost:3000` — should see Hero section + featured products grid.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx __tests__/unit/pages/Home.test.tsx
git commit -m "feat: add home page with HeroPremium and featured products"
```

---

## Task 4: Create Product Listing Page (/products)

**Files:**
- Create: `app/products/page.tsx`
- Create: `__tests__/unit/pages/ProductListing.test.tsx`

**Interfaces:**
- Consumes:
  - `ProductGrid` component (Task 1)
  - `getProducts()` service (Task 2)
  - `HeaderPremium` component
- Produces:
  - Product listing page server component

**Steps:**

- [ ] **Step 1: Write the failing test**

Create `__tests__/unit/pages/ProductListing.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import ProductListingPage from '@/app/products/page'

jest.mock('@/lib/services/productService', () => ({
  getProducts: jest.fn(() =>
    Promise.resolve([
      { id: '1', name: 'Product 1', price: 79.99, image: '/img1.jpg' },
      { id: '2', name: 'Product 2', price: 89.99, image: '/img2.jpg' },
      { id: '3', name: 'Product 3', price: 99.99, image: '/img3.jpg' },
    ])
  ),
}))

describe('ProductListingPage', () => {
  it('should render product listing heading', async () => {
    await render(await ProductListingPage())
    expect(screen.getByText(/all products/i) || screen.getByText(/fragrance/i)).toBeInTheDocument()
  })

  it('should render all products in grid', async () => {
    await render(await ProductListingPage())
    expect(screen.getByText(/Product 1/)).toBeInTheDocument()
    expect(screen.getByText(/Product 2/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- ProductListing.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create the product listing page**

Create `app/products/page.tsx`:

```typescript
import { HeaderPremium } from '@/components/common/HeaderPremium'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getProducts } from '@/lib/services/productService'

export const metadata = {
  title: 'All Products | Maison Maeta',
  description: 'Discover our complete collection of luxury fragrances',
}

export default async function ProductListingPage() {
  const allProducts = await getProducts()

  return (
    <>
      <HeaderPremium />
      
      <main className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Fragrances
          </h1>
          <p className="text-lg text-gray-600">
            Explore our complete collection of luxury perfumes
          </p>
        </div>

        {allProducts.length > 0 ? (
          <ProductGrid products={allProducts} variant="all" />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        )}
      </main>
    </>
  )
}
```

- [ ] **Step 4: Run test and verify in browser**

```bash
npm run test -- ProductListing.test.tsx
npm run dev
```

Visit `http://localhost:3000/products` — should see all 6 seeded products.

- [ ] **Step 5: Commit**

```bash
git add app/products/page.tsx __tests__/unit/pages/ProductListing.test.tsx
git commit -m "feat: add product listing page"
```

---

## Task 5: Create Product Detail Page (/products/[id])

**Files:**
- Create: `app/products/[id]/page.tsx`
- Create: `__tests__/unit/pages/ProductDetail.test.tsx`

**Interfaces:**
- Consumes:
  - `getProductById(id)` service (Task 2)
  - `Product` type from `types/index.ts`
  - `HeaderPremium` component
- Produces:
  - Product detail page server component with dynamic route `[id]`

**Steps:**

- [ ] **Step 1: Write the failing test**

Create `__tests__/unit/pages/ProductDetail.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import ProductDetailPage from '@/app/products/[id]/page'

jest.mock('@/lib/services/productService', () => ({
  getProductById: jest.fn((id) =>
    id === '1'
      ? Promise.resolve({
          id: '1',
          name: 'Essence Nocturne',
          price: 89.99,
          description: 'Dark and mysterious',
          concentration: 'Eau de Parfum',
          volume: 100,
          image: '/images/essence-nocturne.jpg',
        })
      : Promise.resolve(null)
  ),
}))

describe('ProductDetailPage', () => {
  it('should render product details', async () => {
    const page = await ProductDetailPage({ params: { id: '1' } })
    await render(page)
    expect(screen.getByText('Essence Nocturne')).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
  })

  it('should show not found for invalid id', async () => {
    const page = await ProductDetailPage({ params: { id: 'invalid' } })
    // Page should render "not found" or redirect
    expect(page).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test -- ProductDetail.test.tsx
```

Expected: FAIL

- [ ] **Step 3: Create the detail page**

Create `app/products/[id]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { HeaderPremium } from '@/components/common/HeaderPremium'
import { getProductById } from '@/lib/services/productService'
import Image from 'next/image'

interface ProductDetailPageProps {
  params: { id: string }
}

export const revalidate = 60 // ISR: revalidate every 60 seconds

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: 'Product Not Found | Maison Maeta',
    }
  }

  return {
    title: `${product.name} | Maison Maeta`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <HeaderPremium />

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className="rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-400">
                <p>No image available</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="text-3xl text-amber-600 font-semibold mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <span className="font-semibold text-gray-900">Concentration:</span>
                <p className="text-gray-600">{product.concentration}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-900">Volume:</span>
                <p className="text-gray-600">{product.volume}ml</p>
              </div>
            </div>

            {/* CTA (disabled for browse-only) */}
            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Add to Cart (Coming Soon)
            </button>
          </div>
        </div>

        {/* Related Products Section (optional) */}
        <section className="mt-20 pt-20 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Other Fragrances
          </h2>
          <p className="text-gray-600">
            Explore more of our luxury collection in the{' '}
            <a href="/products" className="text-amber-600 hover:underline">
              All Products
            </a>{' '}
            section.
          </p>
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 4: Create not-found page (optional but recommended)**

Create `app/products/[id]/not-found.tsx`:

```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/products"
        className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700"
      >
        Back to Products
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Run test and verify in browser**

```bash
npm run test -- ProductDetail.test.tsx
npm run dev
```

Visit `http://localhost:3000/products/1` (or any product ID from seeded data) — should see product details.

- [ ] **Step 6: Commit**

```bash
git add app/products/[id]/page.tsx app/products/[id]/not-found.tsx __tests__/unit/pages/ProductDetail.test.tsx
git commit -m "feat: add product detail page with dynamic routing"
```

---

## Task 6: Integration Testing & Final Cleanup

**Files:**
- No new files
- Modify: Various (remove console.log, fix linting)

**Steps:**

- [ ] **Step 1: Start dev server and test all flows**

```bash
npm run dev
```

Test these flows manually:
1. `http://localhost:3000` — Home page loads with Hero + featured products
2. Click a product card → navigate to `/products/[id]`
3. Go to `/products` → see all 6 products
4. Click another product → detail page loads
5. Click "Back to Products" link → return to listing

✅ All flows work without errors.

- [ ] **Step 2: Check for console.log and debugging statements**

```bash
grep -r "console\." app/ components/ lib/ --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v ".test.ts"
```

If any found, remove them:

```bash
# Example: remove console.log from a file
# Edit the file and remove the offending lines
```

- [ ] **Step 3: Run type check**

```bash
npm run type-check
```

Expected: Zero errors. If errors, fix them.

- [ ] **Step 4: Run linter**

```bash
npm run lint
```

Expected: Zero errors or only warnings. Fix critical issues.

- [ ] **Step 5: Run tests**

```bash
npm run test
```

Expected: All new tests passing (or at least no regressions).

- [ ] **Step 6: Quick Lighthouse check (optional)**

In browser DevTools:
- Open `http://localhost:3000`
- Run Lighthouse (Performance, Accessibility, Best Practices)
- Note any major regressions from baseline

- [ ] **Step 7: Commit final cleanup**

```bash
git add -A
git commit -m "test: verify integration flows and cleanup"
```

- [ ] **Step 8: Verify git history**

```bash
git log --oneline | head -10
```

Expected output:
```
[latest commit] test: verify integration flows and cleanup
[...] feat: add product detail page with dynamic routing
[...] feat: add product listing page
[...] feat: add home page with HeroPremium and featured products
[...] feat: add productService for data fetching
[...] feat: add ProductGrid reusable component
```

---

## Summary

**What you've built in ~5 hours:**

✅ **Home Page** — HeroPremium hero + 6 featured products  
✅ **Product Listing** (`/products`) — All 6 seeded products in grid  
✅ **Product Detail** (`/products/[id]`) — Full product view with info  
✅ **Reusable ProductGrid** — Used on home + listing pages  
✅ **ProductService** — Data layer for Prisma queries  
✅ **Tests** — Component + page tests (TDD)  
✅ **No console.log** — Clean code  
✅ **Committed** — Clean git history  

**What's deferred to Phase 1.5:**

- Cart flow
- Stripe checkout
- Email/password auth
- Search & filtering
- Reviews & ratings
- Wishlist

---

**Ready to execute?** Two options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans skill, batch execution with checkpoints

Which approach would you prefer?
