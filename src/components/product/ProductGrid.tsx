
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductFilters, { ProductFilterState } from './ProductFilters';
import { Product, Category } from '@/types';
import { getProductsByCategory, searchProductsByName, getCategoryById, categories } from '@/data/mockData';

interface ProductGridProps {
  initialProducts?: Product[];
  categoryId?: number;
  searchQuery?: string;
}

const PRODUCTS_PER_PAGE = 12;

const ProductGrid: React.FC<ProductGridProps> = ({ 
  initialProducts,
  categoryId,
  searchQuery = ''
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilterState>({
    category: null,
    priceRange: [0, 500000],
    rating: null,
    availability: 'all',
    sortBy: 'newest'
  });

  const categoryName = useMemo(() => 
    categoryId ? getCategoryById(categoryId)?.name : null, 
    [categoryId]
  );

  // Memoized base products calculation
  const baseProducts = useMemo(() => {
    if (initialProducts) return [...initialProducts];
    if (categoryId) return getProductsByCategory(categoryId);
    if (searchQuery) return searchProductsByName(searchQuery);
    return [];
  }, [initialProducts, categoryId, searchQuery]);

  useEffect(() => {
    setProducts(baseProducts);
    setCurrentPage(1);
  }, [baseProducts]);

  // Memoized product filtering and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.categoryId === filters.category);
    }

    filtered = filtered.filter(product => {
      const price = product.discountedPrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    if (filters.rating) {
      filtered = filtered.filter(product => (product.rating || 0) >= filters.rating!);
    }

    if (filters.availability === 'in-stock') {
      filtered = filtered.filter(product => product.stock > 10);
    } else if (filters.availability === 'low-stock') {
      filtered = filtered.filter(product => product.stock > 0 && product.stock <= 10);
    }

    // Optimized sorting
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
        case 'price-desc':
          return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [products, filters]);

  const applyFilters = useCallback((newFilters: ProductFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Memoized pagination
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    return { totalPages, currentProducts };
  }, [filteredProducts, currentPage]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-modern-gray-700 dark:text-modern-gray-300">
          No se encontraron productos
        </h3>
        <p className="mt-2 text-modern-gray-500 dark:text-modern-gray-400 font-body">
          Intenta con otra búsqueda o categoría
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="section-modern">
          {categoryName ? `Categoría: ${categoryName}` : searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los productos'}
        </h2>
        <p className="text-modern-gray-500 dark:text-modern-gray-400 font-body">
          {filteredProducts.length} de {products.length} productos
          {paginationData.totalPages > 1 && ` · Página ${currentPage} de ${paginationData.totalPages}`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            onFiltersChange={applyFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />
        </div>

        <div className="lg:col-span-3">
          {paginationData.currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginationData.currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {paginationData.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-modern-gray-300 dark:border-modern-gray-600 text-modern-gray-600 dark:text-modern-gray-400 hover:bg-modern-gray-50 dark:hover:bg-modern-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-modern-green-600 text-white'
                          : 'text-modern-gray-600 dark:text-modern-gray-400 hover:bg-modern-gray-50 dark:hover:bg-modern-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === paginationData.totalPages}
                    className="p-2 rounded-xl border border-modern-gray-300 dark:border-modern-gray-600 text-modern-gray-600 dark:text-modern-gray-400 hover:bg-modern-gray-50 dark:hover:bg-modern-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-lg font-semibold text-modern-gray-700 dark:text-modern-gray-300 mb-2">
                No hay productos que coincidan con los filtros
              </h3>
              <p className="text-modern-gray-500 dark:text-modern-gray-400 font-body">
                Intenta ajustar los filtros para ver más resultados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
