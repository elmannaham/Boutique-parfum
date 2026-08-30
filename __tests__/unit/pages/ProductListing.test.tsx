import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductListingPage from '@/app/products/page'

vi.mock('@/lib/services/productService', () => ({
  getProducts: vi.fn(() =>
    Promise.resolve([
      { id: '1', name: 'Product 1', priceInCents: 7999, imageUrl: '/img1.jpg' },
      { id: '2', name: 'Product 2', priceInCents: 8999, imageUrl: '/img2.jpg' },
      { id: '3', name: 'Product 3', priceInCents: 9999, imageUrl: '/img3.jpg' },
    ])
  ),
}))

describe('ProductListingPage', () => {
  it('should render product listing heading', async () => {
    await render(await ProductListingPage())
    const heading = screen.queryByText(/fragrances/i) || screen.queryByText(/products/i)
    expect(heading).toBeInTheDocument()
  })

  it('should render all products in grid', async () => {
    await render(await ProductListingPage())
    expect(screen.getByText(/Product 1/)).toBeInTheDocument()
    expect(screen.getByText(/Product 2/)).toBeInTheDocument()
  })
})
