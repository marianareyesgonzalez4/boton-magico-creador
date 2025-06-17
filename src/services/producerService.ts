
import { apiRequest, API_CONFIG } from '@/config/api';
import type { ProducerDto } from '@/types/api';

export const producerService = {
  async getAllProducers(): Promise<ProducerDto[]> {
    console.log('Fetching all producers from API');
    return apiRequest<ProducerDto[]>(API_CONFIG.ENDPOINTS.PRODUCERS);
  },

  async getProducerById(id: number): Promise<ProducerDto> {
    console.log(`Fetching producer with ID: ${id}`);
    return apiRequest<ProducerDto>(`${API_CONFIG.ENDPOINTS.PRODUCERS}/${id}`);
  },
};
