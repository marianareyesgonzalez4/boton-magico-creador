
import { apiRequest, API_CONFIG } from '@/config/api';
import type { CartDto } from '@/types/api';

export const cartService = {
  async getCart(): Promise<CartDto> {
    console.log('Fetching user cart from API');
    return apiRequest<CartDto>(API_CONFIG.ENDPOINTS.CART);
  },

  async updateCart(cart: CartDto): Promise<CartDto> {
    console.log('Updating cart in API:', cart);
    return apiRequest<CartDto>(API_CONFIG.ENDPOINTS.CART, {
      method: 'POST',
      body: JSON.stringify(cart),
    });
  },

  async clearCart(): Promise<void> {
    console.log('Clearing cart in API');
    await apiRequest<void>(API_CONFIG.ENDPOINTS.CART, {
      method: 'DELETE',
    });
  },
};
