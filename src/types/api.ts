
// API Types matching your .NET backend DTOs

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserDto;
}

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  categoryId: number;
  producerId: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export interface ProducerDto {
  id: number;
  name: string;
  description: string;
  location: string;
  image?: string;
  isFeatured: boolean;
  foundationYear?: number;
}

export interface CartDto {
  userId: string;
  items: CartItemDto[];
  total: number;
}

export interface CartItemDto {
  productId: number;
  quantity: number;
  price: number;
  product?: ProductDto;
}

export interface CreateOrderRequestDto {
  shippingAddress: string;
  paymentMethod: string;
  orderDetails: CreateOrderDetailDto[];
}

export interface CreateOrderDetailDto {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: number;
  userId: string;
  orderDate: string;
  shippingAddress: string;
  paymentMethod: string;
  total: number;
  status: string;
  orderDetails: OrderDetailDto[];
}

export interface OrderDetailDto {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product?: ProductDto;
}
