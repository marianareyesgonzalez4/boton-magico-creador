
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Contenedor from '@/components/layout/Container';
import ProductCard from '@/components/product/ProductCard';
import { fetchFeaturedProducts } from '@/services/productApi';
import { Product } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 'tejidos', name: 'Tejidos', slug: 'tejidos' },
  { id: 'ceramicas', name: 'Cerámicas', slug: 'ceramicas' },
  { id: 'joyeria', name: 'Joyería', slug: 'joyeria' },
  { id: 'madera', name: 'Madera', slug: 'madera' }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { 
    data: products = [], 
    isLoading, 
    isError 
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchFeaturedProducts,
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <Skeleton className="h-[300px] w-full rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Navbar />
      
      <main>
        <Contenedor className="py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111816] mb-4">
              Artesanías del Chocó
            </h1>
            <p className="text-lg text-[#608a7c] max-w-2xl mx-auto">
              Descubre nuestra colección completa de productos artesanales hechos a mano por maestros artesanos del Pacífico colombiano
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#608a7c] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#f0f5f3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-[#f0f5f3] text-[#111816]"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-[#0cf2a5] text-white'
                    : 'bg-[#f0f5f3] text-[#111816] hover:bg-[#0cf2a5] hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading && renderSkeletons()}

          {isError && (
            <div className="text-center text-red-500 py-12">
              <p>Error al cargar los productos. Por favor, intenta de nuevo.</p>
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="text-center text-[#608a7c] py-12">
              <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </Contenedor>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
