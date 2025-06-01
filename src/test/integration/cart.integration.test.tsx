import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CartProvider, useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Toaster } from '@/components/ui/toaster'; // Needed for useToast

// Mock product data
const mockProduct1: Product = {
  id: 1, name: 'Test Product 1', slug: 'test-product-1', description: 'Description 1', price: 100,
  image: 'img1.jpg', categoryId: 1, producerId: 1, stock: 10, featured: false, createdAt: new Date().toISOString()
};

const mockProduct2: Product = {
  id: 2, name: 'Test Product 2', slug: 'test-product-2', description: 'Description 2', price: 50,
  image: 'img2.jpg', categoryId: 1, producerId: 1, stock: 5, featured: true, createdAt: new Date().toISOString()
};

// Test component that can add items to the cart
const AddToCartComponent: React.FC<{ product: Product; quantity?: number }> = ({ product, quantity = 1 }) => {
  const { addToCart } = useCart();
  return (
    <button onClick={() => addToCart(product, quantity)}>
      Add {product.name} to Cart
    </button>
  );
};

// Test component that displays cart information
const CartDisplayComponent: React.FC = () => {
  const { items, itemCount, total } = useCart();
  return (
    <div>
      <div data-testid="item-count">Item Count: {itemCount}</div>
      <div data-testid="total-price">Total: ${total}</div>
      <ul aria-label="cart-items">
        {items.map(item => (
          <li key={item.product?.id || item.productId}>
            {item.product?.name} - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrapper component that includes all necessary providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CartProvider>
    {/* Toaster is needed because CartContext.addToCart calls useToast -> toast() */}
    <Toaster /> 
    {children}
  </CartProvider>
);

describe('Cart Integration - Add to Cart', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure a clean state
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should add a product to the cart and update cart display & localStorage', async () => {
    render(
      <>
        <AddToCartComponent product={mockProduct1} />
        <CartDisplayComponent />
      </>,
      { wrapper: TestWrapper }
    );

    // Initially, cart should be empty
    expect(screen.getByTestId('item-count').textContent).toBe('Item Count: 0');
    expect(screen.getByTestId('total-price').textContent).toBe('Total: $0');
    
    const initialStoredCart = localStorage.getItem('campo-artesano-cart');
    // Depending on how loadCartFromStorage initializes, it might be null or '[]'
    if (initialStoredCart) {
        expect(JSON.parse(initialStoredCart)).toEqual([]);
    }


    // Find and click the "Add to Cart" button
    const addButton = screen.getByText(`Add ${mockProduct1.name} to Cart`);
    fireEvent.click(addButton);

    // Wait for UI to update (itemCount, total, and items list)
    // The toast message also needs to appear and disappear, so waitFor is good.
    await waitFor(() => {
      // Verify cart display is updated
      expect(screen.getByTestId('item-count').textContent).toBe('Item Count: 1');
      expect(screen.getByTestId('total-price').textContent).toBe(`Total: $${mockProduct1.price}`);
      expect(screen.getByRole('list', { name: 'cart-items' })).toHaveTextContent(mockProduct1.name);
      expect(screen.getByRole('list', { name: 'cart-items' }).children.length).toBe(1);
      expect(screen.getByText(`${mockProduct1.name} - Qty: 1`)).toBeInTheDocument();
    });

    // Verify localStorage is updated
    const storedCart = localStorage.getItem('campo-artesano-cart');
    expect(storedCart).not.toBeNull();
    const parsedStoredCart = JSON.parse(storedCart!);
    expect(parsedStoredCart).toEqual([{ productId: mockProduct1.id, quantity: 1 }]);
  });

  it('should add multiple different products to the cart', async () => {
    render(
      <>
        <AddToCartComponent product={mockProduct1} />
        <AddToCartComponent product={mockProduct2} />
        <CartDisplayComponent />
      </>,
      { wrapper: TestWrapper }
    );

    // Click to add first product
    fireEvent.click(screen.getByText(`Add ${mockProduct1.name} to Cart`));
    
    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('Item Count: 1');
    });

    // Click to add second product
    fireEvent.click(screen.getByText(`Add ${mockProduct2.name} to Cart`));

    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('Item Count: 2');
      expect(screen.getByTestId('total-price').textContent).toBe(`Total: $${mockProduct1.price + mockProduct2.price}`);
      expect(screen.getByText(`${mockProduct1.name} - Qty: 1`)).toBeInTheDocument();
      expect(screen.getByText(`${mockProduct2.name} - Qty: 1`)).toBeInTheDocument();
    });
    
    const storedCart = localStorage.getItem('campo-artesano-cart');
    expect(storedCart).not.toBeNull();
    const parsedStoredCart = JSON.parse(storedCart!);
    expect(parsedStoredCart).toEqual([
        { productId: mockProduct1.id, quantity: 1 },
        { productId: mockProduct2.id, quantity: 1 }
    ]);
  });

  it('should update quantity if the same product is added again', async () => {
    render(
      <>
        <AddToCartComponent product={mockProduct1} quantity={1} />
        <CartDisplayComponent />
      </>,
      { wrapper: TestWrapper }
    );

    const addButton = screen.getByText(`Add ${mockProduct1.name} to Cart`);

    // Add product first time
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('Item Count: 1');
      expect(screen.getByTestId('total-price').textContent).toBe(`Total: $${mockProduct1.price}`);
      expect(screen.getByText(`${mockProduct1.name} - Qty: 1`)).toBeInTheDocument();
    });

    // Add same product again
    fireEvent.click(addButton); // This will use quantity 1 again from the component prop
                                // The reducer logic should sum these quantities.

    await waitFor(() => {
      expect(screen.getByTestId('item-count').textContent).toBe('Item Count: 2'); // 1 + 1 = 2
      expect(screen.getByTestId('total-price').textContent).toBe(`Total: $${mockProduct1.price * 2}`);
      expect(screen.getByText(`${mockProduct1.name} - Qty: 2`)).toBeInTheDocument();
    });

    const storedCart = localStorage.getItem('campo-artesano-cart');
    expect(storedCart).not.toBeNull();
    const parsedStoredCart = JSON.parse(storedCart!);
    expect(parsedStoredCart).toEqual([{ productId: mockProduct1.id, quantity: 2 }]);
  });
});
