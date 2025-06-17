
// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
    },
    PRODUCTS: '/api/products',
    CATEGORIES: '/api/categories',
    PRODUCERS: '/api/producers',
    CART: '/api/cart',
    ORDERS: '/api/orders',
  },
};

// Token management
export const TokenManager = {
  getToken: (): string | null => localStorage.getItem('authToken'),
  setToken: (token: string): void => localStorage.setItem('authToken', token),
  removeToken: (): void => localStorage.removeItem('authToken'),
  isAuthenticated: (): boolean => !!localStorage.getItem('authToken'),
};

// HTTP helper with authentication
export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = TokenManager.getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text() as unknown as T;
};
