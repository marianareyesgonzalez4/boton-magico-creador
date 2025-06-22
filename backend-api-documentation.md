
# API REST Documentation - Chocó Artesanal Backend

Esta documentación describe todos los servicios REST que debe implementar el backend en .NET con SQL Server para la aplicación Chocó Artesanal.

## Base URL
```
Base URL: http://localhost:3001/api
```

## Autenticación
Todos los endpoints protegidos requieren un Bearer Token en el header:
```
Authorization: Bearer {token}
```

---

## 1. Autenticación (Authentication)

### POST /auth/login
**Propósito:** Iniciar sesión de usuario
**Método:** POST
**URL:** `/auth/login`

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "usuario@email.com",
    "phone": "+57 300 123 4567",
    "address": "Calle 123 #45-67",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600
}
```

### POST /auth/register
**Propósito:** Registrar nuevo usuario
**Método:** POST
**URL:** `/auth/register`

**Request Body:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "usuario@email.com",
  "password": "contraseña123",
  "phone": "+57 300 123 4567",
  "address": "Calle 123 #45-67"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "usuario@email.com",
    "phone": "+57 300 123 4567",
    "address": "Calle 123 #45-67",
    "avatar": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600
}
```

### POST /auth/refresh
**Propósito:** Renovar token de acceso
**Método:** POST
**URL:** `/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "accessToken": "new_access_token",
  "refreshToken": "new_refresh_token",
  "expiresIn": 3600
}
```

### POST /auth/logout
**Propósito:** Cerrar sesión
**Método:** POST
**URL:** `/auth/logout`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

### GET /auth/profile
**Propósito:** Obtener perfil del usuario actual
**Método:** GET
**URL:** `/auth/profile`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "usuario@email.com",
  "phone": "+57 300 123 4567",
  "address": "Calle 123 #45-67",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### PUT /auth/profile
**Propósito:** Actualizar perfil del usuario
**Método:** PUT
**URL:** `/auth/profile`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez",
  "phone": "+57 300 123 4567",
  "address": "Nueva dirección",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response (200):**
```json
{
  "id": 1,
  "firstName": "Juan Carlos",
  "lastName": "Pérez",
  "email": "usuario@email.com",
  "phone": "+57 300 123 4567",
  "address": "Nueva dirección",
  "avatar": "https://example.com/new-avatar.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

---

## 2. Productos (Products)

### GET /products
**Propósito:** Obtener lista de productos con filtros y paginación
**Método:** GET
**URL:** `/products`

**Query Parameters:**
```
?category=tejidos&minPrice=10000&maxPrice=100000&artisan=Carmen&region=Chocó&inStock=true&featured=false&sortBy=price&sortOrder=asc&page=1&limit=10
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Canasta Artesanal",
      "slug": "canasta-artesanal",
      "description": "Hermosa canasta tejida a mano con técnicas tradicionales",
      "price": 85000,
      "discountedPrice": null,
      "image": "https://example.com/canasta.jpg",
      "images": ["https://example.com/canasta1.jpg", "https://example.com/canasta2.jpg"],
      "categoryId": 1,
      "producerId": 1,
      "stock": 12,
      "featured": true,
      "rating": 4.8,
      "artisan": "Carmen López",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

### GET /products/{id}
**Propósito:** Obtener producto por ID
**Método:** GET
**URL:** `/products/{id}`

**Response (200):**
```json
{
  "id": 1,
  "name": "Canasta Artesanal",
  "slug": "canasta-artesanal",
  "description": "Hermosa canasta tejida a mano con técnicas tradicionales",
  "price": 85000,
  "discountedPrice": null,
  "image": "https://example.com/canasta.jpg",
  "images": ["https://example.com/canasta1.jpg", "https://example.com/canasta2.jpg"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 12,
  "featured": true,
  "rating": 4.8,
  "artisan": "Carmen López",
  "origin": "Chocó",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### GET /products/slug/{slug}
**Propósito:** Obtener producto por slug
**Método:** GET
**URL:** `/products/slug/{slug}`

**Response (200):**
```json
{
  "id": 1,
  "name": "Canasta Artesanal",
  "slug": "canasta-artesanal",
  "description": "Hermosa canasta tejida a mano con técnicas tradicionales",
  "price": 85000,
  "discountedPrice": null,
  "image": "https://example.com/canasta.jpg",
  "images": ["https://example.com/canasta1.jpg", "https://example.com/canasta2.jpg"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 12,
  "featured": true,
  "rating": 4.8,
  "artisan": "Carmen López",
  "origin": "Chocó",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### GET /products/featured
**Propósito:** Obtener productos destacados
**Método:** GET
**URL:** `/products/featured`

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Canasta Artesanal",
    "slug": "canasta-artesanal",
    "description": "Hermosa canasta tejida a mano con técnicas tradicionales",
    "price": 85000,
    "discountedPrice": null,
    "image": "https://example.com/canasta.jpg",
    "images": ["https://example.com/canasta1.jpg"],
    "categoryId": 1,
    "producerId": 1,
    "stock": 12,
    "featured": true,
    "rating": 4.8,
    "artisan": "Carmen López",
    "origin": "Chocó",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### GET /products/search
**Propósito:** Buscar productos
**Método:** GET
**URL:** `/products/search`

**Query Parameters:**
```
?query=canasta&category=tejidos&minPrice=10000&maxPrice=100000&page=1&limit=10
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Canasta Artesanal",
      "slug": "canasta-artesanal",
      "description": "Hermosa canasta tejida a mano con técnicas tradicionales",
      "price": 85000,
      "discountedPrice": null,
      "image": "https://example.com/canasta.jpg",
      "images": ["https://example.com/canasta1.jpg"],
      "categoryId": 1,
      "producerId": 1,
      "stock": 12,
      "featured": true,
      "rating": 4.8,
      "artisan": "Carmen López",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10
  }
}
```

### GET /products/category/{categoryId}
**Propósito:** Obtener productos por categoría
**Método:** GET
**URL:** `/products/category/{categoryId}`

**Query Parameters:**
```
?minPrice=10000&maxPrice=100000&sortBy=price&sortOrder=asc&page=1&limit=10
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Canasta Artesanal",
      "slug": "canasta-artesanal",
      "description": "Hermosa canasta tejida a mano con técnicas tradicionales",
      "price": 85000,
      "discountedPrice": null,
      "image": "https://example.com/canasta.jpg",
      "images": ["https://example.com/canasta1.jpg"],
      "categoryId": 1,
      "producerId": 1,
      "stock": 12,
      "featured": true,
      "rating": 4.8,
      "artisan": "Carmen López",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 15,
    "itemsPerPage": 10
  }
}
```

### POST /products
**Propósito:** Crear nuevo producto (Admin)
**Método:** POST
**URL:** `/products`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "name": "Nueva Canasta",
  "slug": "nueva-canasta",
  "description": "Descripción del producto",
  "price": 75000,
  "discountedPrice": 65000,
  "image": "https://example.com/nueva-canasta.jpg",
  "images": ["https://example.com/nueva1.jpg", "https://example.com/nueva2.jpg"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 8,
  "featured": false,
  "rating": 0,
  "artisan": "María González",
  "origin": "Chocó"
}
```

**Response (201):**
```json
{
  "id": 25,
  "name": "Nueva Canasta",
  "slug": "nueva-canasta",
  "description": "Descripción del producto",
  "price": 75000,
  "discountedPrice": 65000,
  "image": "https://example.com/nueva-canasta.jpg",
  "images": ["https://example.com/nueva1.jpg", "https://example.com/nueva2.jpg"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 8,
  "featured": false,
  "rating": 0,
  "artisan": "María González",
  "origin": "Chocó",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### PUT /products/{id}
**Propósito:** Actualizar producto (Admin)
**Método:** PUT
**URL:** `/products/{id}`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "name": "Canasta Actualizada",
  "description": "Nueva descripción",
  "price": 90000,
  "stock": 15,
  "featured": true
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Canasta Actualizada",
  "slug": "canasta-artesanal",
  "description": "Nueva descripción",
  "price": 90000,
  "discountedPrice": null,
  "image": "https://example.com/canasta.jpg",
  "images": ["https://example.com/canasta1.jpg"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 15,
  "featured": true,
  "rating": 4.8,
  "artisan": "Carmen López",
  "origin": "Chocó",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### DELETE /products/{id}
**Propósito:** Eliminar producto (Admin)
**Método:** DELETE
**URL:** `/products/{id}`
**Autenticación:** Requerida (Admin)

**Response (204):** Sin contenido

---

## 3. Categorías (Categories)

### GET /categories
**Propósito:** Obtener todas las categorías
**Método:** GET
**URL:** `/categories`

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Tejidos",
    "slug": "tejidos",
    "description": "Artesanías tejidas a mano",
    "image": "https://example.com/tejidos.jpg",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Cerámicas",
    "slug": "ceramicas",
    "description": "Piezas de cerámica tradicional",
    "image": "https://example.com/ceramicas.jpg",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### GET /categories/{id}
**Propósito:** Obtener categoría por ID
**Método:** GET
**URL:** `/categories/{id}`

**Response (200):**
```json
{
  "id": 1,
  "name": "Tejidos",
  "slug": "tejidos",
  "description": "Artesanías tejidas a mano",
  "image": "https://example.com/tejidos.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### POST /categories
**Propósito:** Crear nueva categoría (Admin)
**Método:** POST
**URL:** `/categories`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "name": "Joyería",
  "slug": "joyeria",
  "description": "Joyas artesanales",
  "image": "https://example.com/joyeria.jpg"
}
```

**Response (201):**
```json
{
  "id": 3,
  "name": "Joyería",
  "slug": "joyeria",
  "description": "Joyas artesanales",
  "image": "https://example.com/joyeria.jpg",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### PUT /categories/{id}
**Propósito:** Actualizar categoría (Admin)
**Método:** PUT
**URL:** `/categories/{id}`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "name": "Tejidos Tradicionales",
  "description": "Artesanías tejidas con técnicas ancestrales"
}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Tejidos Tradicionales",
  "slug": "tejidos",
  "description": "Artesanías tejidas con técnicas ancestrales",
  "image": "https://example.com/tejidos.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### DELETE /categories/{id}
**Propósito:** Eliminar categoría (Admin)
**Método:** DELETE
**URL:** `/categories/{id}`
**Autenticación:** Requerida (Admin)

**Response (204):** Sin contenido

---

## 4. Productores/Artesanos (Producers)

### GET /producers
**Propósito:** Obtener todos los productores
**Método:** GET
**URL:** `/producers`

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Carmen López",
    "description": "Artesana especializada en tejidos tradicionales",
    "location": "Quibdó, Chocó",
    "image": "https://example.com/carmen.jpg",
    "featured": true,
    "foundedYear": 1985,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### GET /producers/{id}
**Propósito:** Obtener productor por ID
**Método:** GET
**URL:** `/producers/{id}`

**Response (200):**
```json
{
  "id": 1,
  "name": "Carmen López",
  "description": "Artesana especializada en tejidos tradicionales",
  "location": "Quibdó, Chocó",
  "image": "https://example.com/carmen.jpg",
  "featured": true,
  "foundedYear": 1985,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### GET /producers/featured
**Propósito:** Obtener productores destacados
**Método:** GET
**URL:** `/producers/featured`

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Carmen López",
    "description": "Artesana especializada en tejidos tradicionales",
    "location": "Quibdó, Chocó",
    "image": "https://example.com/carmen.jpg",
    "featured": true,
    "foundedYear": 1985,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### POST /producers
**Propósito:** Crear nuevo productor (Admin)
**Método:** POST
**URL:** `/producers`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "name": "Miguel Santos",
  "description": "Especialista en cerámicas tradicionales",
  "location": "Istmina, Chocó",
  "image": "https://example.com/miguel.jpg",
  "featured": false,
  "foundedYear": 1990
}
```

**Response (201):**
```json
{
  "id": 2,
  "name": "Miguel Santos",
  "description": "Especialista en cerámicas tradicionales",
  "location": "Istmina, Chocó",
  "image": "https://example.com/miguel.jpg",
  "featured": false,
  "foundedYear": 1990,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### PUT /producers/{id}
**Propósito:** Actualizar productor (Admin)
**Método:** PUT
**URL:** `/producers/{id}`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "description": "Maestro artesano especializado en cerámicas tradicionales",
  "featured": true
}
```

**Response (200):**
```json
{
  "id": 2,
  "name": "Miguel Santos",
  "description": "Maestro artesano especializado en cerámicas tradicionales",
  "location": "Istmina, Chocó",
  "image": "https://example.com/miguel.jpg",
  "featured": true,
  "foundedYear": 1990,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### DELETE /producers/{id}
**Propósito:** Eliminar productor (Admin)
**Método:** DELETE
**URL:** `/producers/{id}`
**Autenticación:** Requerida (Admin)

**Response (204):** Sin contenido

---

## 5. Carrito de Compras (Cart)

### GET /cart
**Propósito:** Obtener carrito del usuario actual
**Método:** GET
**URL:** `/cart`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 120000
    }
  ],
  "total": 290000,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### POST /cart/add
**Propósito:** Agregar producto al carrito
**Método:** POST
**URL:** `/cart/add`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    }
  ],
  "total": 170000,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### PUT /cart/update
**Propósito:** Actualizar cantidad de producto en carrito
**Método:** PUT
**URL:** `/cart/update`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 3
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 85000
    }
  ],
  "total": 255000,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T10:30:00Z"
}
```

### DELETE /cart/remove/{productId}
**Propósito:** Eliminar producto del carrito
**Método:** DELETE
**URL:** `/cart/remove/{productId}`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [],
  "total": 0,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T10:45:00Z"
}
```

### DELETE /cart
**Propósito:** Vaciar carrito completamente
**Método:** DELETE
**URL:** `/cart`
**Autenticación:** Requerida

**Response (204):** Sin contenido

### PUT /cart
**Propósito:** Actualizar carrito completo
**Método:** PUT
**URL:** `/cart`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 1,
      "price": 85000
    },
    {
      "productId": 2,
      "quantity": 2,
      "price": 45000
    }
  ],
  "total": 175000
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 1,
      "price": 85000
    },
    {
      "productId": 2,
      "quantity": 2,
      "price": 45000
    }
  ],
  "total": 175000,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T11:00:00Z"
}
```

### POST /cart/sync
**Propósito:** Sincronizar carrito local con servidor
**Método:** POST
**URL:** `/cart/sync`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 120000
    }
  ]
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 120000
    }
  ],
  "total": 290000,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T11:00:00Z"
}
```

---

## 6. Lista de Deseos (Wishlist)

### GET /wishlist
**Propósito:** Obtener lista de deseos del usuario
**Método:** GET
**URL:** `/wishlist`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "products": [
    {
      "id": 1,
      "name": "Canasta Artesanal",
      "slug": "canasta-artesanal",
      "description": "Hermosa canasta tejida a mano",
      "price": 85000,
      "discountedPrice": null,
      "image": "https://example.com/canasta.jpg",
      "images": ["https://example.com/canasta1.jpg"],
      "categoryId": 1,
      "producerId": 1,
      "stock": 12,
      "featured": true,
      "rating": 4.8,
      "artisan": "Carmen López",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T08:00:00Z"
}
```

### POST /wishlist/add
**Propósito:** Agregar producto a lista de deseos
**Método:** POST
**URL:** `/wishlist/add`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "productId": 2
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "products": [
    {
      "id": 1,
      "name": "Canasta Artesanal",
      "slug": "canasta-artesanal",
      "description": "Hermosa canasta tejida a mano",
      "price": 85000,
      "discountedPrice": null,
      "image": "https://example.com/canasta.jpg",
      "images": ["https://example.com/canasta1.jpg"],
      "categoryId": 1,
      "producerId": 1,
      "stock": 12,
      "featured": true,
      "rating": 4.8,
      "artisan": "Carmen López",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Collar Tradicional",
      "slug": "collar-tradicional",
      "description": "Collar elaborado con materiales naturales",
      "price": 45000,
      "discountedPrice": null,
      "image": "https://example.com/collar.jpg",
      "images": ["https://example.com/collar1.jpg"],
      "categoryId": 3,
      "producerId": 2,
      "stock": 8,
      "featured": true,
      "rating": 4.9,
      "artisan": "Ana Mosquera",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T09:00:00Z"
}
```

### DELETE /wishlist/remove/{productId}
**Propósito:** Eliminar producto de lista de deseos
**Método:** DELETE
**URL:** `/wishlist/remove/{productId}`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "products": [
    {
      "id": 1,
      "name": "Canasta Artesanal",
      "slug": "canasta-artesanal",
      "description": "Hermosa canasta tejida a mano",
      "price": 85000,
      "discountedPrice": null,
      "image": "https://example.com/canasta.jpg",
      "images": ["https://example.com/canasta1.jpg"],
      "categoryId": 1,
      "producerId": 1,
      "stock": 12,
      "featured": true,
      "rating": 4.8,
      "artisan": "Carmen López",
      "origin": "Chocó",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T09:30:00Z"
}
```

### DELETE /wishlist
**Propósito:** Vaciar lista de deseos completamente
**Método:** DELETE
**URL:** `/wishlist`
**Autenticación:** Requerida

**Response (204):** Sin contenido

---

## 7. Pedidos (Orders)

### GET /orders
**Propósito:** Obtener pedidos del usuario con filtros
**Método:** GET
**URL:** `/orders`
**Autenticación:** Requerida

**Query Parameters:**
```
?status=pending&startDate=2024-01-01&endDate=2024-01-31&page=1&limit=10
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "status": "pending",
      "items": [
        {
          "productId": 1,
          "quantity": 2,
          "price": 85000
        }
      ],
      "shippingAddress": {
        "name": "Juan Pérez",
        "address": "Calle 123 #45-67",
        "city": "Bogotá",
        "zipCode": "110111",
        "phone": "+57 300 123 4567"
      },
      "paymentMethod": "credit_card",
      "total": 170000,
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 15,
    "itemsPerPage": 10
  }
}
```

### GET /orders/{id}
**Propósito:** Obtener pedido específico por ID
**Método:** GET
**URL:** `/orders/{id}`
**Autenticación:** Requerida

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "status": "pending",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 120000
    }
  ],
  "shippingAddress": {
    "name": "Juan Pérez",
    "address": "Calle 123 #45-67",
    "city": "Bogotá",
    "zipCode": "110111",
    "phone": "+57 300 123 4567"
  },
  "paymentMethod": "credit_card",
  "total": 290000,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### POST /orders
**Propósito:** Crear nuevo pedido
**Método:** POST
**URL:** `/orders`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 120000
    }
  ],
  "shippingAddress": {
    "name": "Juan Pérez",
    "address": "Calle 123 #45-67",
    "city": "Bogotá",
    "zipCode": "110111",
    "phone": "+57 300 123 4567"
  },
  "paymentMethod": "credit_card",
  "total": 290000
}
```

**Response (201):**
```json
{
  "id": 1,
  "userId": 1,
  "status": "pending",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    },
    {
      "productId": 3,
      "quantity": 1,
      "price": 120000
    }
  ],
  "shippingAddress": {
    "name": "Juan Pérez",
    "address": "Calle 123 #45-67",
    "city": "Bogotá",
    "zipCode": "110111",
    "phone": "+57 300 123 4567"
  },
  "paymentMethod": "credit_card",
  "total": 290000,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T12:00:00Z"
}
```

### PATCH /orders/{id}/cancel
**Propósito:** Cancelar pedido
**Método:** PATCH
**URL:** `/orders/{id}/cancel`
**Autenticación:** Requerida

**Request Body:**
```json
{
  "reason": "Cambié de opinión"
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "status": "cancelled",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    }
  ],
  "shippingAddress": {
    "name": "Juan Pérez",
    "address": "Calle 123 #45-67",
    "city": "Bogotá",
    "zipCode": "110111",
    "phone": "+57 300 123 4567"
  },
  "paymentMethod": "credit_card",
  "total": 170000,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T14:00:00Z"
}
```

### PATCH /orders/{id}/status
**Propósito:** Actualizar estado del pedido (Admin)
**Método:** PATCH
**URL:** `/orders/{id}/status`
**Autenticación:** Requerida (Admin)

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "status": "shipped",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 85000
    }
  ],
  "shippingAddress": {
    "name": "Juan Pérez",
    "address": "Calle 123 #45-67",
    "city": "Bogotá",
    "zipCode": "110111",
    "phone": "+57 300 123 4567"
  },
  "paymentMethod": "credit_card",
  "total": 170000,
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-02T10:00:00Z"
}
```

---

## Estados de Respuesta HTTP

### Códigos de Éxito
- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Solicitud exitosa sin contenido de respuesta

### Códigos de Error
- **400 Bad Request**: Datos de entrada inválidos
- **401 Unauthorized**: No autenticado
- **403 Forbidden**: Sin permisos suficientes
- **404 Not Found**: Recurso no encontrado
- **409 Conflict**: Conflicto con el estado actual del recurso
- **500 Internal Server Error**: Error interno del servidor

### Formato de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "El formato del email es inválido"
    }
  ]
}
```

---

## Consideraciones de Implementación

### Base de Datos SQL Server
1. **Usuarios**: Tabla para almacenar información de usuarios
2. **Productos**: Tabla principal de productos con relaciones a categorías y productores
3. **Categorías**: Tabla de categorías de productos
4. **Productores**: Tabla de artesanos/productores
5. **Carritos**: Tabla para carritos de usuarios
6. **Items_Carrito**: Tabla de relación para items del carrito
7. **Pedidos**: Tabla de pedidos
8. **Items_Pedido**: Tabla de relación para items de pedidos
9. **Listas_Deseos**: Tabla para listas de deseos
10. **Items_Lista_Deseos**: Tabla de relación para items de listas de deseos

### Autenticación JWT
- Implementar autenticación basada en JWT
- Tokens de acceso con expiración de 1 hora
- Refresh tokens para renovación automática
- Middleware de autorización para endpoints protegidos

### Validaciones
- Validar todos los datos de entrada
- Implementar validaciones de negocio (stock, precios, etc.)
- Sanitizar datos para prevenir inyección SQL

### Paginación
- Implementar paginación consistente en todos los endpoints de lista
- Límite máximo de 100 items por página
- Incluir metadatos de paginación en respuestas

### Manejo de Errores
- Logging detallado de errores
- Respuestas consistentes de error
- No exponer detalles internos en producción

Esta documentación proporciona una base sólida para desarrollar el backend en .NET con SQL Server, manteniendo compatibilidad completa con el frontend existente.
