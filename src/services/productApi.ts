
import { productService } from './productService';
import type { Product, Category, ProductWithStory } from '@/types';

// Utility function to convert API DTO to frontend types
const convertProductDto = (dto: any): Product => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  price: dto.price,
  image: dto.image,
  description: dto.description,
  categoryId: dto.categoryId,
  producerId: dto.producerId,
  stock: dto.stock,
  featured: dto.featured,
  rating: dto.rating,
  createdAt: dto.createdAt,
  artisan: dto.artisan,
  origin: dto.origin,
});

const convertCategoryDto = (dto: any): Category => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  image: dto.image,
  description: dto.description,
});

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.map(convertCategoryDto);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to mock data if API fails
    return [
      { id: 1, name: 'Tejidos', slug: 'tejidos', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
      { id: 2, name: 'Cerámicas', slug: 'ceramicas', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
      { id: 3, name: 'Joyería', slug: 'joyeria', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
    ];
  }
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const data = await productService.getFeaturedProducts();
    return data.map(convertProductDto);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to mock data if API fails
    return [
      {
        id: 1,
        name: 'Canasta Artesanal',
        slug: 'canasta-artesanal',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: 'Hermosa canasta tejida a mano con técnicas tradicionales',
        categoryId: 1,
        producerId: 1,
        stock: 12,
        featured: true,
        rating: 4.8,
        createdAt: new Date().toISOString(),
        artisan: 'Carmen López',
        origin: 'Chocó'
      },
      {
        id: 2,
        name: 'Collar Tradicional',
        slug: 'collar-tradicional',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: 'Collar elaborado con materiales naturales del Pacífico',
        categoryId: 3,
        producerId: 2,
        stock: 8,
        featured: true,
        rating: 4.9,
        createdAt: new Date().toISOString(),
        artisan: 'Ana Mosquera',
        origin: 'Chocó'
      },
      {
        id: 3,
        name: 'Vasija Ceremonial',
        slug: 'vasija-ceremonial',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        description: 'Vasija de barro cocido con diseños ancestrales',
        categoryId: 2,
        producerId: 3,
        stock: 5,
        featured: true,
        rating: 4.7,
        createdAt: new Date().toISOString(),
        artisan: 'Miguel Santos',
        origin: 'Chocó'
      }
    ];
  }
};

export const fetchProductBySlug = async (slug: string): Promise<ProductWithStory | null> => {
  try {
    const product = await productService.getProductBySlug(slug);
    
    return {
      ...convertProductDto(product),
      story: {
        id: product.id,
        title: `La Historia de ${product.name}`,
        content: `Esta pieza representa siglos de tradición artesanal afrocolombiana del Pacífico. ${product.description} Cada elemento tiene un significado profundo en la cultura chocoana.`,
        author: product.artisan || 'Artesano Tradicional',
        readTime: '3 min lectura',
        culturalSignificance: 'Patrimonio cultural inmaterial del Pacífico colombiano'
      }
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
};
