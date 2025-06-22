
// API Configuration and Base Settings
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
    PRODUCTS: {
      BASE: '/products',
      FEATURED: '/products/featured',
      SEARCH: '/products/search',
      BY_CATEGORY: '/products/category',
      BY_SLUG: '/products/slug',
    },
    CATEGORIES: '/categories',
    CART: '/cart',
    ORDERS: '/orders',
    WISHLIST: '/wishlist',
    USERS: '/users',
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
