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
