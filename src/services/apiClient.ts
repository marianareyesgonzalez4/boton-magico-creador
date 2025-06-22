
import { API_CONFIG, HTTP_STATUS } from '@/config/apiConfig';
import { TokenManager } from '@/utils/tokenManager';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Array<{
    field?: string;
    code: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        TokenManager.setTokens(data.accessToken, data.refreshToken, data.expiresIn);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    TokenManager.clearTokens();
    return false;
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    attempt: number = 1
  ): Promise<T> {
    try {
      const accessToken = TokenManager.getAccessToken();
      
      // Auto-refresh token if expired
      if (accessToken && TokenManager.isTokenExpired()) {
        const refreshed = await this.refreshToken();
        if (!refreshed) {
          throw new ApiError('Authentication expired', HTTP_STATUS.UNAUTHORIZED);
        }
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (TokenManager.getAccessToken()) {
        headers['Authorization'] = `Bearer ${TokenManager.getAccessToken()}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === HTTP_STATUS.UNAUTHORIZED) {
          // Try to refresh token once
          if (attempt === 1 && await this.refreshToken()) {
            return this.makeRequest<T>(url, options, attempt + 1);
          }
          TokenManager.clearTokens();
        }

        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.code,
          errorData.field
        );
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json();
      }

      return response.text() as unknown as T;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }

      if (error instanceof ApiError) {
        throw error;
      }

      if (attempt < this.retryAttempts && error.name === 'TypeError') {
        console.warn(`Request failed, retrying... (${attempt}/${this.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        return this.makeRequest<T>(url, options, attempt + 1);
      }

      throw new NetworkError(error.message);
    }
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.makeRequest<T>(`${url}${queryString}`, { method: 'GET' });
  }

  async post<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
