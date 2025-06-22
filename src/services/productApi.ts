
import { Product, Category, ProductWithStory } from '@/types';

// Mock data for categories
const mockCategories: Category[] = [
  { id: 1, name: 'Tejidos', slug: 'tejidos', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
  { id: 2, name: 'Cerámicas', slug: 'ceramicas', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
  { id: 3, name: 'Joyería', slug: 'joyeria', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400' },
];

// Products that match the shop data
const mockProducts: Product[] = [
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

export const fetchCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCategories;
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProducts;
};

export const fetchProductBySlug = async (slug: string): Promise<ProductWithStory | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const product = mockProducts.find(p => p.slug === slug);
  
  if (!product) return null;
  
  return {
    ...product,
    story: {
      id: product.id,
      title: `La Historia de ${product.name}`,
      content: `Esta pieza representa siglos de tradición artesanal afrocolombiana del Pacífico. ${product.description} Cada elemento tiene un significado profundo en la cultura chocoana.`,
      author: product.artisan || 'Artesano Tradicional',
      readTime: '3 min lectura',
      culturalSignificance: 'Patrimonio cultural inmaterial del Pacífico colombiano'
    }
  };
};
