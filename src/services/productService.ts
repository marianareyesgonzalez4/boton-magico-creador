
import { apiRequest, API_CONFIG } from '@/config/api';
import type { ProductDto } from '@/types/api';

export const productService = {
  async getAllProducts(): Promise<ProductDto[]> {
    console.log('Fetching all products from API');
    return apiRequest<ProductDto[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
  },

  async getProductById(id: number): Promise<ProductDto> {
    console.log(`Fetching product with ID: ${id}`);
    return apiRequest<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  },

  async createProduct(product: Omit<ProductDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductDto> {
    console.log('Creating new product:', product.name);
    return apiRequest<ProductDto>(API_CONFIG.ENDPOINTS.PRODUCTS, {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  async updateProduct(id: number, product: Partial<ProductDto>): Promise<void> {
    console.log(`Updating product with ID: ${id}`);
    await apiRequest<void>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...product, id }),
    });
  },

  async deleteProduct(id: number): Promise<void> {
    console.log(`Deleting product with ID: ${id}`);
    await apiRequest<void>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
      method: 'DELETE',
    });
  },
};
