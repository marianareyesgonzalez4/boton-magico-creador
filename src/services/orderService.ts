
import { apiRequest, API_CONFIG } from '@/config/api';
import type { CreateOrderRequestDto, OrderDto } from '@/types/api';

export const orderService = {
  async createOrder(orderRequest: CreateOrderRequestDto): Promise<OrderDto> {
    console.log('Creating new order:', orderRequest);
    return apiRequest<OrderDto>(API_CONFIG.ENDPOINTS.ORDERS, {
      method: 'POST',
      body: JSON.stringify(orderRequest),
    });
  },

  async getOrderById(id: number): Promise<OrderDto> {
    console.log(`Fetching order with ID: ${id}`);
    return apiRequest<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
  },
};
