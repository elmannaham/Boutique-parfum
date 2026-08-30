import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/types/product';

// Mock Framer Motion to avoid animation-related test complexity
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Sample product data
const mockProduct: Product = {
  id: '1',
  name: 'Essence Nocturne',
  slug: 'essence-nocturne',
  description: 'Un parfum envoûtant pour les nuits étoilées',
  price: 15999, // 159.99€ in cents
  original_price: 17999,
  fragrance_family: 'Oriental',
  image_url: '/images/products/essence-nocturne.webp',
  is_limited_edition: true,
  stock: 10,
  average_rating: 4.8,
  created_at: new Date('2025-01-01'),
  updated_at: new Date('2025-01-15'),
};

const mockProductOutOfStock: Product = {
  ...mockProduct,
  id: '2',
  stock: 0,
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================================
  // RENDERING & DISPLAY TESTS
  // ============================================================================

  it('should render product card with all essential information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.fragrance_family)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('should render product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(/Essence Nocturne.*parfum/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image_url);
  });

  it('should display price formatted correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // formatPrice should convert 15999 cents to 159,99€
    expect(screen.getByText(/159/)).toBeInTheDocument();
  });

  it('should show "Limité" badge when product is limited edition', () => {
    render(<ProductCard product={mockProduct} />);

    const badge = screen.getByText('Limité');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('should not show "Limité" badge for non-limited products', () => {
    const regularProduct = { ...mockProduct, is_limited_edition: false };
    render(<ProductCard product={regularProduct} />);

    expect(screen.queryByText('Limité')).not.toBeInTheDocument();
  });

  it('should display original price when on sale', () => {
    render(<ProductCard product={mockProduct} />);

    // Should show strikethrough original price
    const priceElements = screen.getAllByText(/179/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('should display average rating', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('should show "Rupture de stock" message when out of stock', () => {
    render(<ProductCard product={mockProductOutOfStock} />);

    expect(screen.getByText('Rupture de stock')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Rupture de stock');
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  it('should be keyboard navigable', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    // Product card should be an article with proper semantics
    const article = container.querySelector('article');
    expect(article).toHaveAttribute('role', 'region');
  });

  it('should have proper link semantics for product details', () => {
    render(<ProductCard product={mockProduct} />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', `/products/${mockProduct.slug}`);
  });

  it('should have accessible button labels', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByLabelText(/Ajouter aux favoris/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ajouter au panier/i)).toBeInTheDocument();
  });

  it('should announce favorite toggle state via aria-pressed', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    const favoriteButton = screen.getByLabelText(/Ajouter aux favoris/i);
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(favoriteButton);

    await waitFor(() => {
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  // ============================================================================
  // INTERACTION TESTS
  // ============================================================================

  it('should call onAddToCart callback when add to cart button is clicked', async () => {
    const user = userEvent.setup();
    const handleAddToCart = vi.fn();

    render(
      <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
    );

    const addButton = screen.getByLabelText(/Ajouter au panier/i);
    await user.click(addButton);

    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  it('should toggle favorite state on button click', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    const favoriteButton = screen.getByLabelText(/Ajouter aux favoris/i);

    // Initial state: not favorited
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');

    // Click to favorite
    await user.click(favoriteButton);
    await waitFor(() => {
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
    });

    // Click to unfavorite
    await user.click(favoriteButton);
    await waitFor(() => {
      expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('should show success state after adding to cart', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByLabelText(/Ajouter au panier/i);
    await user.click(addButton);

    // Button text should change to "Produit ajouté"
    await waitFor(() => {
      expect(addButton).toHaveAttribute('aria-label', 'Produit ajouté');
    });
  });

  it('should navigate to product details page on title click', () => {
    render(<ProductCard product={mockProduct} />);

    const productLink = screen.getByRole('link', { name: mockProduct.name });
    expect(productLink).toHaveAttribute('href', `/products/${mockProduct.slug}`);
  });

  // ============================================================================
  // PROP TESTS
  // ============================================================================

  it('should respect className prop for custom styling', () => {
    const { container } = render(
      <ProductCard product={mockProduct} className="custom-class" />
    );

    const article = container.querySelector('article');
    expect(article).toHaveClass('custom-class');
  });

  it('should pass priority prop to Image component', () => {
    render(<ProductCard product={mockProduct} priority={true} />);

    const image = screen.getByAltText(/Essence Nocturne/);
    // Checking if image was rendered (priority is a Next.js optimization)
    expect(image).toBeInTheDocument();
  });

  // ============================================================================
  // ERROR HANDLING TESTS
  // ============================================================================

  it('should handle image load errors gracefully', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <ProductCard product={mockProduct} />
    );

    const image = screen.getByAltText(/Essence Nocturne/);

    // Simulate image load error
    fireEvent.error(image);

    // Should display fallback message
    await waitFor(() => {
      expect(screen.getByText('Image indisponible')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  it('should handle products without description gracefully', () => {
    const productNoDesc = { ...mockProduct, description: undefined };
    render(<ProductCard product={productNoDesc} />);

    // Should not render description section if undefined
    expect(screen.queryByText(mockProduct.description)).not.toBeInTheDocument();
  });

  it('should handle products without rating', () => {
    const productNoRating = { ...mockProduct, average_rating: undefined };
    render(<ProductCard product={productNoRating} />);

    // Rating section should not be rendered
    const ratingElement = screen.queryByLabelText(/Note:/);
    expect(ratingElement).not.toBeInTheDocument();
  });

  it('should not show original price if product is not on sale', () => {
    const regularPricedProduct = { ...mockProduct, original_price: undefined };
    render(<ProductCard product={regularPricedProduct} />);

    // Should only show current price
    const priceElements = screen.getAllByText(/159/);
    expect(priceElements.length).toBe(1); // Only one price visible
  });
});
