
import { apiRequest, API_CONFIG } from '@/config/api';
import type { CategoryDto } from '@/types/api';

export const categoryService = {
  async getAllCategories(): Promise<CategoryDto[]> {
    console.log('Fetching all categories from API');
    return apiRequest<CategoryDto[]>(API_CONFIG.ENDPOINTS.CATEGORIES);
  },

  async getCategoryById(id: number): Promise<CategoryDto> {
    console.log(`Fetching category with ID: ${id}`);
    return apiRequest<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`);
  },
};
