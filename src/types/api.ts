
// API Data Transfer Objects
export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  categoryId: number;
  producerId: number;
  stock: number;
  featured: boolean;
  rating?: number;
  artisan?: string;
  origin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItemDto {
  productId: number;
  quantity: number;
  price: number;
}

export interface CartDto {
  id: number;
  userId: number;
  items: CartItemDto[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDto {
  id: number;
  userId: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItemDto[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Request DTOs
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponseDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface CreateOrderRequestDto {
  items: CartItemDto[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  total: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  artisan?: string;
  region?: string;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price' | 'name' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchParams {
  query: string;
  filters?: ProductFilters;
}
