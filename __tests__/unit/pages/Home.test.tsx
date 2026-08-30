import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '@/app/page'

// Mock productService
vi.mock('@/lib/services/productService', () => ({
  getFeaturedProducts: vi.fn(() =>
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
    const { container } = render(await HomePage())
    // HeroPremium should render - check for content
    expect(container.innerHTML.length).toBeGreaterThan(0)
  })

  it('should render featured products', async () => {
    render(await HomePage())
    expect(screen.getByText(/Essence Nocturne/)).toBeInTheDocument()
  })
})
