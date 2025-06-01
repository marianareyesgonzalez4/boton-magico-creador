import { describe, it, expect, beforeEach } from 'vitest';
import { 
  cartReducer, 
  calculateTotal, 
  CartState, // Imported from CartContext
  CartAction  // Imported from CartContext
} from './CartContext'; // Adjust path as necessary, assuming it's in the parent directory
import { Product, CartItem } from '@/types'; // Using the centralized Product and CartItem types

// Mock Product Data
const mockProduct1: Product = {
  id: 1, name: 'Product 1', slug: 'product-1', description: 'Desc 1', price: 100,
  image: 'img1.jpg', categoryId: 1, producerId: 1, stock: 10, featured: false, createdAt: new Date().toISOString()
};
const mockProduct2: Product = {
  id: 2, name: 'Product 2', slug: 'product-2', description: 'Desc 2', price: 50, discountedPrice: 40,
  image: 'img2.jpg', categoryId: 1, producerId: 1, stock: 5, featured: true, createdAt: new Date().toISOString()
};

// Initial state for tests, conforming to the imported CartState
const initialTestState: CartState = {
  items: [],
  total: 0,
};

describe('cartReducer', () => {
  let state: CartState;

  beforeEach(() => {
    // Deep copy items array to ensure test isolation for state modifications
    state = { ...initialTestState, items: [] }; 
  });

  it('should add a new item to the cart', () => {
    const action: CartAction = { type: 'ADD_TO_CART', payload: { product: mockProduct1, quantity: 1 } };
    const newState = cartReducer(state, action);
    
    // Ensure the CartItem in the state matches the structure used by the reducer.
    // The centralized CartItem type has `product?: Product` and `productId: number`.
    // The CartContext's internal structure (and what its exported CartItem implies for its state)
    // is `{ product: Product; quantity: number; }`.
    // The `items: CartItem[]` in CartState uses the CartItem from `@/types`.
    // This means `state.items` will be `Array<{ productId: number; quantity: number; product?: Product }>`
    // However, the reducer logic in CartContext.tsx consistently populates `product` field.
    // So, `newState.items[0].product` should be defined.

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].product).toBeDefined();
    expect(newState.items[0].product!.id).toBe(mockProduct1.id); // Use non-null assertion if product is guaranteed
    expect(newState.items[0].quantity).toBe(1);
    expect(newState.total).toBe(100);
  });

  it('should increment quantity if item already exists', () => {
    // The CartItem in state should have a defined product object for calculateTotal to work.
    const initialItem: CartItem = { productId: mockProduct1.id, product: mockProduct1, quantity: 1 };
    state.items = [initialItem];
    state.total = calculateTotal(state.items); 
    
    const action: CartAction = { type: 'ADD_TO_CART', payload: { product: mockProduct1, quantity: 2 } };
    const newState = cartReducer(state, action);
    
    expect(newState.items.length).toBe(1);
    expect(newState.items[0].quantity).toBe(3);
    expect(newState.total).toBe(300);
  });

  it('should remove an item from the cart', () => {
    const item1: CartItem = { productId: mockProduct1.id, product: mockProduct1, quantity: 1 };
    const item2: CartItem = { productId: mockProduct2.id, product: mockProduct2, quantity: 1 };
    state.items = [item1, item2];
    state.total = calculateTotal(state.items);

    const action: CartAction = { type: 'REMOVE_FROM_CART', payload: mockProduct1.id };
    const newState = cartReducer(state, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].product!.id).toBe(mockProduct2.id);
    expect(newState.total).toBe(40); // mockProduct2 has discountedPrice of 40
  });

  it('should update an item quantity', () => {
    const initialItem: CartItem = { productId: mockProduct1.id, product: mockProduct1, quantity: 1 };
    state.items = [initialItem];
    state.total = calculateTotal(state.items);

    const action: CartAction = { type: 'UPDATE_QUANTITY', payload: { productId: mockProduct1.id, quantity: 5 } };
    const newState = cartReducer(state, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].quantity).toBe(5);
    expect(newState.total).toBe(500);
  });

  it('should remove item if updated quantity is 0 or less', () => {
    const item1: CartItem = { productId: mockProduct1.id, product: mockProduct1, quantity: 2 };
    const item2: CartItem = { productId: mockProduct2.id, product: mockProduct2, quantity: 1 };
    state.items = [item1, item2];
    state.total = calculateTotal(state.items);

    const action: CartAction = { type: 'UPDATE_QUANTITY', payload: { productId: mockProduct1.id, quantity: 0 } };
    const newState = cartReducer(state, action);
    
    expect(newState.items.length).toBe(1);
    expect(newState.items[0].product!.id).toBe(mockProduct2.id);
    expect(newState.total).toBe(40);
  });

  it('should clear the cart', () => {
    const item1: CartItem = { productId: mockProduct1.id, product: mockProduct1, quantity: 1 };
    const item2: CartItem = { productId: mockProduct2.id, product: mockProduct2, quantity: 1 };
    state.items = [item1, item2];
    state.total = calculateTotal(state.items);

    const action: CartAction = { type: 'CLEAR_CART' };
    const newState = cartReducer(state, action);

    expect(newState.items.length).toBe(0);
    expect(newState.total).toBe(0);
  });

  describe('calculateTotal', () => {
    it('should calculate total correctly for empty cart', () => {
      expect(calculateTotal([])).toBe(0);
    });

    it('should calculate total correctly for items with regular price', () => {
      // For calculateTotal, items need the product property defined.
      const items: CartItem[] = [{ productId: mockProduct1.id, product: mockProduct1, quantity: 2 }]; // 2 * 100
      expect(calculateTotal(items)).toBe(200);
    });

    it('should calculate total correctly for items with discounted price', () => {
      const items: CartItem[] = [{ productId: mockProduct2.id, product: mockProduct2, quantity: 3 }]; // 3 * 40 (discounted)
      expect(calculateTotal(items)).toBe(120);
    });

    it('should calculate total correctly for mixed items', () => {
      const items: CartItem[] = [
        { productId: mockProduct1.id, product: mockProduct1, quantity: 1 }, // 100
        { productId: mockProduct2.id, product: mockProduct2, quantity: 2 }  // 2 * 40 = 80
      ];
      expect(calculateTotal(items)).toBe(180);
    });
  });
});
