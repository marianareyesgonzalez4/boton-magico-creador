# Plan de Integración Frontend-Backend para Letra Creativa Generator

## Resumen del Estado Actual

**Proyecto:** Plataforma de comercio electrónico para artesanías del Chocó (Colombia)

**Frontend Actual:** React 18 + TypeScript + Vite + Zustand + TanStack Query + shadcn/ui

**Estado:** Frontend completamente desarrollado pero usando **datos mock**. Necesita integración completa con backend real.

---

## 1. SERVICIOS Y UTILIDADES A CREAR

### 1.1 Cliente HTTP Base

**Archivo:** `src/services/apiClient.ts`
```typescript
// Cliente HTTP centralizado con interceptores para autenticación
export class ApiClient {
  private baseURL: string;
  private token: string | null;
  
  constructor(baseURL: string);
  setAuthToken(token: string): void;
  clearAuthToken(): void;
  get<T>(url: string, params?: object): Promise<T>;
  post<T>(url: string, data?: object): Promise<T>;
  put<T>(url: string, data?: object): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

**Funcionalidades:**
- Manejo automático de tokens JWT
- Interceptores para requests/responses
- Manejo centralizado de errores HTTP
- Refresh automático de tokens
- Retry logic para requests fallidos

### 1.2 Servicios de API por Módulo

#### `src/services/authService.ts`
```typescript
export interface AuthService {
  login(credentials: LoginRequestDto): Promise<AuthResponseDto>;
  register(userData: RegisterRequestDto): Promise<AuthResponseDto>;
  logout(): Promise<void>;
  refreshToken(): Promise<AuthResponseDto>;
  getCurrentUser(): Promise<UserDto>;
}
```

#### `src/services/productService.ts`
```typescript
export interface ProductService {
  getProducts(filters?: ProductFilters): Promise<ProductListResponse>;
  getProductBySlug(slug: string): Promise<ProductDetailResponse>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: SearchParams): Promise<SearchResponse>;
  getProductReviews(productId: number): Promise<ReviewListResponse>;
  createReview(productId: number, review: CreateReviewDto): Promise<Review>;
}
```

#### `src/services/cartService.ts`
```typescript
export interface CartService {
  getCart(): Promise<CartDto>;
  addToCart(item: AddToCartDto): Promise<CartItemDto>;
  updateCartItem(itemId: string, quantity: number): Promise<CartItemDto>;
  removeFromCart(itemId: string): Promise<void>;
  clearCart(): Promise<void>;
  syncLocalCart(items: CartItem[]): Promise<CartDto>;
}
```

#### `src/services/orderService.ts`
```typescript
export interface OrderService {
  createOrder(orderData: CreateOrderRequestDto): Promise<OrderDto>;
  getUserOrders(params?: OrderListParams): Promise<OrderListResponse>;
  getOrderById(orderId: string): Promise<OrderDto>;
  cancelOrder(orderId: string, reason: string): Promise<OrderDto>;
  trackOrder(orderId: string): Promise<OrderTrackingDto>;
}
```

#### `src/services/userService.ts`
```typescript
export interface UserService {
  updateProfile(userData: UpdateProfileDto): Promise<UserDto>;
  addAddress(address: CreateAddressDto): Promise<AddressDto>;
  updateAddress(addressId: string, address: UpdateAddressDto): Promise<AddressDto>;
  deleteAddress(addressId: string): Promise<void>;
  setDefaultAddress(addressId: string): Promise<void>;
}
```

#### `src/services/wishlistService.ts`
```typescript
export interface WishlistService {
  getWishlist(): Promise<WishlistItemDto[]>;
  addToWishlist(productId: number): Promise<WishlistItemDto>;
  removeFromWishlist(productId: number): Promise<void>;
}
```

#### `src/services/adminService.ts`
```typescript
export interface AdminService {
  getDashboardStats(): Promise<AdminDashboardDto>;
  getProducts(params?: AdminProductListParams): Promise<AdminProductListResponse>;
  createProduct(product: CreateProductDto): Promise<ProductDto>;
  updateProduct(productId: number, product: UpdateProductDto): Promise<ProductDto>;
  deleteProduct(productId: number): Promise<void>;
  getOrders(params?: AdminOrderListParams): Promise<AdminOrderListResponse>;
  updateOrderStatus(orderId: string, status: OrderStatusUpdateDto): Promise<OrderDto>;
}
```

### 1.3 Hooks Personalizados para Integración

#### `src/hooks/api/useAuth.ts`
```typescript
export const useAuth = () => {
  const queryClient = useQueryClient();
  
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Actualizar estado global
      // Guardar token
      // Invalidar queries relacionadas
    }
  });
  
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Limpiar estado global
      // Remover token
      // Limpiar cache
    }
  });
  
  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    // ...otros métodos
  };
};
```

#### `src/hooks/api/useProducts.ts`
```typescript
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, review }: { productId: number, review: CreateReviewDto }) =>
      productService.createReview(productId, review),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    }
  });
};
```

#### `src/hooks/api/useCart.ts`
```typescript
export const useCart = () => {
  const queryClient = useQueryClient();
  
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    staleTime: 30 * 1000, // 30 segundos
  });
  
  const addToCartMutation = useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      // Manejo de errores (stock insuficiente, etc.)
    }
  });
  
  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addToCart: addToCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    // ...otros métodos
  };
};
```

#### `src/hooks/api/useOrders.ts`
```typescript
export const useOrders = (params?: OrderListParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderService.getUserOrders(params),
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
};
```

### 1.4 Gestión de Estado Mejorada

#### `src/store/authSlice.ts`
```typescript
// Slice de Zustand para autenticación
export interface AuthSlice {
  user: UserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (data: AuthResponseDto) => void;
  clearAuth: () => void;
  updateUser: (userData: Partial<UserDto>) => void;
  setLoading: (loading: boolean) => void;
}
```

#### `src/store/cartSlice.ts`
```typescript
// Slice para carrito con sincronización backend
export interface CartSlice {
  localCart: CartItem[];
  serverCart: CartDto | null;
  isSyncing: boolean;
  
  // Actions
  addToLocalCart: (item: CartItem) => void;
  syncWithServer: () => Promise<void>;
  mergeLocalWithServer: () => void;
  clearLocalCart: () => void;
}
```

### 1.5 Utilidades y Helpers

#### `src/utils/tokenManager.ts`
```typescript
export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_KEY = 'refresh_token';
  
  static setTokens(accessToken: string, refreshToken: string): void;
  static getAccessToken(): string | null;
  static getRefreshToken(): string | null;
  static clearTokens(): void;
  static isTokenExpired(token: string): boolean;
  static scheduleTokenRefresh(): void;
}
```

#### `src/utils/errorHandler.ts`
```typescript
export class ApiErrorHandler {
  static handleError(error: any): {
    message: string;
    type: 'network' | 'auth' | 'validation' | 'server';
    shouldRetry: boolean;
  };
  
  static isAuthError(error: any): boolean;
  static isNetworkError(error: any): boolean;
  static getErrorMessage(error: any): string;
}
```

#### `src/utils/cartSync.ts`
```typescript
export class CartSyncManager {
  static syncLocalCartToServer(localItems: CartItem[]): Promise<void>;
  static mergeServerCartWithLocal(serverCart: CartDto, localCart: CartItem[]): CartItem[];
  static shouldSyncCart(lastSync: Date): boolean;
}
```

---

## 2. COMPONENTES A CREAR/MODIFICAR

### 2.1 Componentes de Autenticación Mejorados

#### `src/components/auth/AuthProvider.tsx`
```typescript
// Provider que maneja autenticación real con backend
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Verificar token al cargar
  // Configurar refresh automático
  // Manejar logout automático en expiración
  // Sincronizar estado con servidor
};
```

#### `src/components/auth/ProtectedRoute.tsx`
```typescript
// Componente mejorado con verificación de roles
export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
  fallback?: React.ReactNode;
}> = ({ children, requiredRole, fallback });
```

### 2.2 Componentes de Carrito Mejorados

#### `src/components/cart/CartSyncIndicator.tsx`
```typescript
// Indicador visual de sincronización del carrito
export const CartSyncIndicator: React.FC = () => {
  // Mostrar estado de sincronización
  // Botón para forzar sincronización
  // Indicador de conflictos
};
```

#### `src/components/cart/CartMergeDialog.tsx`
```typescript
// Dialog para resolver conflictos entre carrito local y servidor
export const CartMergeDialog: React.FC<{
  localCart: CartItem[];
  serverCart: CartDto;
  onResolve: (mergedCart: CartItem[]) => void;
}> = ({ localCart, serverCart, onResolve });
```

### 2.3 Componentes de Productos

#### `src/components/product/ProductReviews.tsx` (Completar)
```typescript
// Componente completo para mostrar y crear reseñas
export const ProductReviews: React.FC<{
  productId: number;
  canReview?: boolean;
}> = ({ productId, canReview }) => {
  // Lista de reseñas paginada
  // Formulario para nueva reseña
  // Sistema de calificación
  // Filtros por rating
  // Botón "útil" para reseñas
};
```

#### `src/components/product/StockIndicator.tsx`
```typescript
// Indicador de stock en tiempo real
export const StockIndicator: React.FC<{
  stock: number;
  threshold?: number;
}> = ({ stock, threshold = 5 }) => {
  // Indicador visual de stock
  // Alertas de stock bajo
  // Actualización en tiempo real
};
```

### 2.4 Componentes de Pedidos (Nuevos)

#### `src/components/orders/OrderCard.tsx`
```typescript
export const OrderCard: React.FC<{
  order: OrderDto;
  detailed?: boolean;
}> = ({ order, detailed }) => {
  // Card resumen de pedido
  // Estados visuales
  // Acciones rápidas (cancelar, ver detalles)
};
```

#### `src/components/orders/OrderTracking.tsx`
```typescript
export const OrderTracking: React.FC<{
  orderId: string;
}> = ({ orderId }) => {
  // Timeline de estados del pedido
  // Información de envío
  // Tracking en tiempo real
};
```

#### `src/components/orders/OrderItemsList.tsx`
```typescript
export const OrderItemsList: React.FC<{
  items: OrderDetailDto[];
  showImages?: boolean;
}> = ({ items, showImages }) => {
  // Lista de productos del pedido
  // Links a productos
  // Información de precio
};
```

### 2.5 Componentes de Búsqueda Mejorados

#### `src/components/search/SearchAutocomplete.tsx`
```typescript
export const SearchAutocomplete: React.FC<{
  onSelect: (result: SearchResult) => void;
}> = ({ onSelect }) => {
  // Búsqueda con debounce
  // Sugerencias en tiempo real
  // Historial de búsquedas
  // Búsquedas populares
};
```

#### `src/components/search/AdvancedFilters.tsx`
```typescript
export const AdvancedFilters: React.FC<{
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}> = ({ filters, onFiltersChange }) => {
  // Filtros dinámicos desde API
  // Contadores de resultados
  // Filtros aplicados
  // Reset de filtros
};
```

### 2.6 Componentes de Notificaciones

#### `src/components/notifications/NotificationCenter.tsx`
```typescript
export const NotificationCenter: React.FC = () => {
  // Centro de notificaciones
  // Notificaciones no leídas
  // Historial de notificaciones
  // Configuración de notificaciones
};
```

#### `src/components/notifications/ToastProvider.tsx`
```typescript
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Provider para toasts globales
  // Diferentes tipos de toasts
  // Queue de notificaciones
  // Auto-dismiss configurable
};
```

### 2.7 Componentes de Estados

#### `src/components/ui/ErrorBoundary.tsx` (Mejorar)
```typescript
export const ErrorBoundary: React.FC<{
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}> = ({ children, fallback });
```

#### `src/components/ui/LoadingStates.tsx`
```typescript
// Diferentes tipos de loading states
export const ProductCardSkeleton: React.FC = ();
export const ProductDetailSkeleton: React.FC = ();
export const CartSkeleton: React.FC = ();
export const OrderHistorySkeleton: React.FC = ();
```

#### `src/components/ui/EmptyStates.tsx`
```typescript
// Estados vacíos para diferentes secciones
export const EmptyCart: React.FC = ();
export const EmptyWishlist: React.FC = ();
export const EmptyOrders: React.FC = ();
export const EmptySearch: React.FC<{ query: string }> = ({ query });
```

---

## 3. PÁGINAS A CREAR/MODIFICAR

### 3.1 Páginas de Autenticación (Modificar)

#### `src/pages/Login.tsx`
**Cambios Requeridos:**
- Integrar con `useAuth` hook real
- Manejar diferentes tipos de errores de autenticación
- Agregar "Recordar sesión"
- Redirect después de login exitoso
- Manejo de carga durante autenticación

#### `src/pages/Register.tsx`
**Cambios Requeridos:**
- Validación en tiempo real con backend
- Verificación de email único
- Términos y condiciones
- Verificación de email post-registro

### 3.2 Páginas de Productos (Modificar)

#### `src/pages/Products.tsx`
**Cambios Requeridos:**
- Integrar con API real de productos
- Filtros dinámicos desde backend
- Paginación real
- URLs con parámetros de búsqueda
- Loading states granulares

#### `src/pages/ProductDetail.tsx`
**Cambios Requeridos:**
- Cargar datos reales del producto
- Sistema de reseñas funcional
- Stock en tiempo real
- Productos relacionados desde API
- Breadcrumbs dinámicos

### 3.3 Páginas de Carrito y Checkout (Modificar)

#### `src/pages/Cart.tsx`
**Cambios Requeridos:**
- Sincronización con backend
- Validación de stock en tiempo real
- Aplicación de cupones/descuentos
- Estimación de envío
- Indicadores de sincronización

#### `src/pages/Checkout.tsx`
**Cambios Requeridos:**
- Integración con API de pedidos real
- Validación de inventario
- Cálculo de impuestos dinámico
- Integración con pasarelas de pago
- Manejo de errores de pago

### 3.4 Páginas de Usuario (Modificar/Crear)

#### `src/pages/Profile.tsx` (Modificar)
**Cambios Requeridos:**
- Integración con API de actualización de perfil
- Gestión real de direcciones
- Upload de avatar
- Configuración de notificaciones

#### `src/pages/OrderHistory.tsx` (Crear)
```typescript
export const OrderHistory: React.FC = () => {
  // Lista paginada de pedidos del usuario
  // Filtros por estado, fecha
  // Búsqueda de pedidos
  // Acciones rápidas (reordenar, cancelar)
};
```

#### `src/pages/OrderDetail.tsx` (Crear)
```typescript
export const OrderDetail: React.FC = () => {
  // Detalles completos del pedido
  // Tracking de envío
  // Posibilidad de cancelar
  // Descargar factura
  // Reordenar productos
};
```

#### `src/pages/Wishlist.tsx` (Crear)
```typescript
export const Wishlist: React.FC = () => {
  // Lista de productos deseados
  // Mover a carrito rápidamente
  // Notificaciones de precio
  // Compartir wishlist
  // Organizar en listas
};
```

### 3.5 Páginas Administrativas (Modificar)

#### `src/pages/AdminPanel.tsx` (Modificar)
**Cambios Requeridos:**
- Dashboard con datos reales
- Estadísticas en tiempo real
- Gráficos de ventas
- Métricas de productos
- Alertas administrativas

#### `src/pages/admin/ProductManagement.tsx` (Crear)
```typescript
export const ProductManagement: React.FC = () => {
  // CRUD completo de productos
  // Upload de imágenes
  // Gestión de categorías
  // Importación masiva
  // Previsualización de productos
};
```

#### `src/pages/admin/OrderManagement.tsx` (Crear)
```typescript
export const OrderManagement: React.FC = () => {
  // Gestión de todos los pedidos
  // Actualización de estados
  // Filtros avanzados
  // Exportación de reportes
  // Comunicación con clientes
};
```

#### `src/pages/admin/UserManagement.tsx` (Crear)
```typescript
export const UserManagement: React.FC = () => {
  // Gestión de usuarios
  // Roles y permisos
  // Estadísticas de usuarios
  // Soporte al cliente
};
```

---

## 4. ARCHIVOS DE CONFIGURACIÓN Y SETUP

### 4.1 Variables de Entorno

#### `.env.development`
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Letra Creativa
VITE_ENABLE_MOCK=false
VITE_TOKEN_REFRESH_MARGIN=5 # minutos antes de expiración
```

#### `.env.production`
```
VITE_API_BASE_URL=https://api.letracreativa.com/api
VITE_APP_NAME=Letra Creativa
VITE_ENABLE_MOCK=false
VITE_TOKEN_REFRESH_MARGIN=5
```

### 4.2 Configuración de TanStack Query

#### `src/config/queryClient.ts`
```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: (failureCount, error) => {
        // Lógica de retry personalizada
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        // Manejo global de errores de mutación
      },
    },
  },
});
```

### 4.3 Configuración de Rutas

#### `src/router/index.tsx` (Modificar)
```typescript
// Agregar rutas protegidas y lazy loading
const router = createBrowserRouter([
  // Rutas públicas
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:slug", element: <ProductDetail /> },
    ],
  },
  // Rutas protegidas
  {
    path: "/",
    element: <ProtectedRoute><UserLayout /></ProtectedRoute>,
    children: [
      { path: "profile", element: <Profile /> },
      { path: "orders", element: <OrderHistory /> },
      { path: "orders/:orderId", element: <OrderDetail /> },
      { path: "wishlist", element: <Wishlist /> },
    ],
  },
  // Rutas administrativas
  {
    path: "/admin",
    element: <ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <ProductManagement /> },
      { path: "orders", element: <OrderManagement /> },
      { path: "users", element: <UserManagement /> },
    ],
  },
]);
```

---

## 5. TIPOS Y INTERFACES A ACTUALIZAR

### 5.1 Tipos de API Response

#### `src/types/api.ts` (Expandir)
```typescript
// Tipos base de respuesta
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
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

export interface ApiError {
  field?: string;
  code: string;
  message: string;
}

// Tipos específicos de respuesta
export interface ProductListResponse extends PaginatedResponse<ProductDto> {}
export interface OrderListResponse extends PaginatedResponse<OrderDto> {}
export interface ReviewListResponse extends PaginatedResponse<ReviewDto> {}

// Tipos de filtros y parámetros
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

export interface OrderListParams {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
```

### 5.2 Tipos de Estado

#### `src/types/store.ts` (Crear)
```typescript
// Tipos para el estado de la aplicación
export interface AppState {
  auth: AuthState;
  cart: CartState;
  ui: UIState;
  sync: SyncState;
}

export interface AuthState {
  user: UserDto | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  lastLogin: Date | null;
}

export interface CartState {
  items: CartItem[];
  serverCart: CartDto | null;
  isSyncing: boolean;
  lastSync: Date | null;
  hasLocalChanges: boolean;
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  loading: Record<string, boolean>;
}

export interface SyncState {
  isOnline: boolean;
  pendingOperations: PendingOperation[];
  lastSync: Date | null;
}
```

---

## 6. MEJORAS DE UX/UI

### 6.1 Estados de Carga Mejorados

#### `src/components/ui/SmartSkeleton.tsx`
```typescript
// Skeleton que se adapta al contenido
export const SmartSkeleton: React.FC<{
  type: 'product-card' | 'product-detail' | 'order-item' | 'user-profile';
  count?: number;
}> = ({ type, count = 1 });
```

#### `src/components/ui/ProgressIndicators.tsx`
```typescript
// Indicadores de progreso para operaciones largas
export const SyncProgress: React.FC<{ progress: number }>;
export const UploadProgress: React.FC<{ files: FileUpload[] }>;
export const CheckoutProgress: React.FC<{ currentStep: number }>;
```

### 6.2 Manejo de Errores Mejorado

#### `src/components/error/ErrorDisplay.tsx`
```typescript
export const ErrorDisplay: React.FC<{
  error: ApiError | Error;
  retry?: () => void;
  type?: 'inline' | 'page' | 'toast';
}> = ({ error, retry, type = 'inline' });
```

#### `src/components/error/NetworkError.tsx`
```typescript
export const NetworkError: React.FC<{
  onRetry: () => void;
  showOfflineActions?: boolean;
}> = ({ onRetry, showOfflineActions });
```

### 6.3 Optimizaciones de Performance

#### `src/components/optimization/LazyImage.tsx`
```typescript
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  placeholder?: string;
  onLoad?: () => void;
}> = ({ src, alt, placeholder, onLoad });
```

#### `src/components/optimization/VirtualizedList.tsx`
```typescript
export const VirtualizedProductList: React.FC<{
  products: Product[];
  onLoadMore: () => void;
  hasMore: boolean;
}> = ({ products, onLoadMore, hasMore });
```

---

## 7. FUNCIONALIDADES ADICIONALES

### 7.1 Modo Offline

#### `src/hooks/useOfflineSupport.ts`
```typescript
export const useOfflineSupport = () => {
  // Detectar estado online/offline
  // Queue de operaciones pendientes
  // Sincronización al reconectar
  // Cache local de datos críticos
};
```

#### `src/components/offline/OfflineIndicator.tsx`
```typescript
export const OfflineIndicator: React.FC = () => {
  // Indicador de estado offline
  // Acciones disponibles offline
  // Queue de operaciones pendientes
};
```

### 7.2 PWA Features

#### `src/utils/pwaUtils.ts`
```typescript
export class PWAManager {
  static registerServiceWorker(): void;
  static checkForUpdates(): Promise<boolean>;
  static promptInstall(): void;
  static enableNotifications(): Promise<boolean>;
}
```

### 7.3 Analytics y Tracking

#### `src/utils/analytics.ts`
```typescript
export class AnalyticsManager {
  static trackPageView(page: string): void;
  static trackEvent(event: string, properties?: object): void;
  static trackPurchase(order: OrderDto): void;
  static trackError(error: Error, context?: string): void;
}
```

---

## PLAN DE IMPLEMENTACIÓN

### Fase 1: Infraestructura Base (Semana 1-2)
1. ✅ Crear cliente HTTP base (`apiClient.ts`)
2. ✅ Configurar gestión de tokens (`tokenManager.ts`)
3. ✅ Implementar servicios de autenticación
4. ✅ Actualizar AuthContext para usar API real
5. ✅ Configurar error handling global

### Fase 2: Productos y Carrito (Semana 3-4)
1. ✅ Implementar servicios de productos
2. ✅ Actualizar páginas de productos con API real
3. ✅ Implementar servicio de carrito
4. ✅ Sincronización carrito local/servidor
5. ✅ Mejorar componentes de carrito

### Fase 3: Pedidos y Usuario (Semana 5-6)
1. ✅ Implementar servicios de pedidos
2. ✅ Crear páginas de historial de pedidos
3. ✅ Completar proceso de checkout
4. ✅ Mejorar gestión de perfil de usuario
5. ✅ Implementar sistema de direcciones

### Fase 4: Funcionalidades Avanzadas (Semana 7-8)
1. ✅ Sistema de reseñas completo
2. ✅ Lista de deseos con backend
3. ✅ Búsqueda avanzada
4. ✅ Panel administrativo funcional
5. ✅ Sistema de notificaciones

### Fase 5: Optimizaciones y Pulido (Semana 9-10)
1. ✅ Optimizaciones de performance
2. ✅ Mejores estados de carga
3. ✅ Manejo de errores robusto
4. ✅ Testing integral
5. ✅ Documentación

---

## ARCHIVOS A CREAR

### Servicios (11 archivos)
- `src/services/apiClient.ts`
- `src/services/authService.ts`
- `src/services/productService.ts`
- `src/services/cartService.ts`
- `src/services/orderService.ts`
- `src/services/userService.ts`
- `src/services/wishlistService.ts`
- `src/services/adminService.ts`
- `src/services/notificationService.ts`
- `src/services/searchService.ts`
- `src/services/categoryService.ts`

### Hooks (8 archivos)
- `src/hooks/api/useAuth.ts`
- `src/hooks/api/useProducts.ts`
- `src/hooks/api/useCart.ts`
- `src/hooks/api/useOrders.ts`
- `src/hooks/api/useUser.ts`
- `src/hooks/api/useWishlist.ts`
- `src/hooks/api/useAdmin.ts`
- `src/hooks/useOfflineSupport.ts`

### Componentes (25+ archivos)
- Componentes de autenticación mejorados (3)
- Componentes de carrito avanzados (3)
- Componentes de productos completos (4)
- Componentes de pedidos (6)
- Componentes de búsqueda mejorados (2)
- Componentes de notificaciones (2)
- Componentes de estados (3)
- Componentes de optimización (2)

### Páginas (8 archivos)
- `src/pages/OrderHistory.tsx`
- `src/pages/OrderDetail.tsx`
- `src/pages/Wishlist.tsx`
- `src/pages/admin/ProductManagement.tsx`
- `src/pages/admin/OrderManagement.tsx`
- `src/pages/admin/UserManagement.tsx`
- `src/pages/admin/Dashboard.tsx`
- `src/pages/admin/Analytics.tsx`

### Utilidades (6 archivos)
- `src/utils/tokenManager.ts`
- `src/utils/errorHandler.ts`
- `src/utils/cartSync.ts`
- `src/utils/analytics.ts`
- `src/utils/pwaUtils.ts`
- `src/utils/validation.ts`

### Configuración (4 archivos)
- `src/config/queryClient.ts`
- `src/config/apiConfig.ts`
- `src/config/constants.ts`
- `src/router/index.tsx` (modificar)

### Tipos (3 archivos)
- `src/types/api.ts` (expandir)
- `src/types/store.ts`
- `src/types/forms.ts`

---

## ARCHIVOS A MODIFICAR SIGNIFICATIVAMENTE

### Páginas Existentes (8 archivos)
- `src/pages/Login.tsx` - Integrar autenticación real
- `src/pages/Register.tsx` - Validación backend
- `src/pages/Products.tsx` - API real, filtros dinámicos
- `src/pages/ProductDetail.tsx` - Datos reales, reseñas
- `src/pages/Cart.tsx` - Sincronización backend
- `src/pages/Checkout.tsx` - Procesamiento real de pedidos
- `src/pages/Profile.tsx` - API de usuario real
- `src/pages/AdminPanel.tsx` - Dashboard con datos reales

### Componentes Existentes (10+ archivos)
- `src/context/AuthContext.tsx` - Eliminar mocks
- `src/store/useStore.ts` - Sincronización backend
- `src/services/productApi.ts` - Reemplazar mocks
- `src/components/ProductReviews.tsx` - Implementar funcionalidad
- `src/components/Header.tsx` - Estados de sincronización
- `src/components/Footer.tsx` - Links actualizados
- Y muchos más componentes menores

---

## TOTAL DE TRABAJO ESTIMADO

- **Archivos nuevos a crear:** ~65
- **Archivos existentes a modificar:** ~25
- **Líneas de código estimadas:** ~15,000-20,000
- **Tiempo estimado:** 8-10 semanas con 1 desarrollador
- **Complejidad:** Media-Alta

La mayor parte del trabajo está en **crear la capa de servicios** y **conectar el frontend existente** con APIs reales, eliminando todos los datos mock actuales.
