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
