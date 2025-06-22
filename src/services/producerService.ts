
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/apiConfig';
import type { ProducerDto } from '@/types/api';

class ProducerService {
  async getAllProducers(): Promise<ProducerDto[]> {
    console.log('Fetching all producers');
    return apiClient.get<ProducerDto[]>('/producers');
  }

  async getProducerById(id: number): Promise<ProducerDto> {
    console.log(`Fetching producer with ID: ${id}`);
    return apiClient.get<ProducerDto>(`/producers/${id}`);
  }

  async getFeaturedProducers(): Promise<ProducerDto[]> {
    console.log('Fetching featured producers');
    return apiClient.get<ProducerDto[]>('/producers/featured');
  }

  async createProducer(producer: Omit<ProducerDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProducerDto> {
    console.log('Creating new producer:', producer.name);
    return apiClient.post<ProducerDto>('/producers', producer);
  }

  async updateProducer(id: number, producer: Partial<ProducerDto>): Promise<ProducerDto> {
    console.log(`Updating producer with ID: ${id}`);
    return apiClient.put<ProducerDto>(`/producers/${id}`, producer);
  }

  async deleteProducer(id: number): Promise<void> {
    console.log(`Deleting producer with ID: ${id}`);
    await apiClient.delete(`/producers/${id}`);
  }
}

export const producerService = new ProducerService();
