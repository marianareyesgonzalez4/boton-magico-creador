
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/apiConfig';
import type { 
  CreateOrderRequestDto, 
  OrderDto, 
  PaginatedResponse 
} from '@/types/api';

interface OrderListParams {
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

class OrderService {
  async createOrder(orderData: CreateOrderRequestDto): Promise<OrderDto> {
    console.log('Creating new order');
    return apiClient.post<OrderDto>(API_CONFIG.ENDPOINTS.ORDERS, orderData);
  }

  async getUserOrders(params?: OrderListParams): Promise<PaginatedResponse<OrderDto>> {
    console.log('Fetching user orders');
    return apiClient.get<PaginatedResponse<OrderDto>>(API_CONFIG.ENDPOINTS.ORDERS, params);
  }

  async getOrderById(id: number): Promise<OrderDto> {
    console.log(`Fetching order with ID: ${id}`);
    return apiClient.get<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}`);
  }

  async cancelOrder(id: number, reason?: string): Promise<OrderDto> {
    console.log(`Cancelling order with ID: ${id}`);
    return apiClient.patch<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/cancel`, {
      reason,
    });
  }

  async updateOrderStatus(id: number, status: string): Promise<OrderDto> {
    console.log(`Updating order ${id} status to: ${status}`);
    return apiClient.patch<OrderDto>(`${API_CONFIG.ENDPOINTS.ORDERS}/${id}/status`, {
      status,
    });
  }
}

export const orderService = new OrderService();
