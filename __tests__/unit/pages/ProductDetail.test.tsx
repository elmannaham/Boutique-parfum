import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductDetailPage from '@/app/products/[id]/page'

vi.mock('@/lib/services/productService', () => ({
  getProductById: vi.fn((id) =>
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

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('Not found')
  }),
}))

describe('ProductDetailPage', () => {
  it('should render product details', async () => {
    const page = await ProductDetailPage({ params: { id: '1' } })
    await render(page)
    expect(screen.getByText('Essence Nocturne')).toBeInTheDocument()
    expect(screen.getByText('$89.99')).toBeInTheDocument()
  })

  it('should throw for invalid id', async () => {
    try {
      await ProductDetailPage({ params: { id: 'invalid' } })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
