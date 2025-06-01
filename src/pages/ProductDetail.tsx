import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import ProductCard from '@/components/product/ProductCard';
import { fetchFeaturedProducts } from '@/services/productApi';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { 
    data: products = [], 
    isLoading 
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchFeaturedProducts,
  });

  const product = products.find(p => p.slug === slug);
  const relatedProducts = products.filter(p => p.id !== product?.id).slice(0, 3);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Producto añadido",
        description: `${product.name} ha sido añadido a tu carrito`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <Navbar />
        <Container className="py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-[#f0f5f3] rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-[#f0f5f3] rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-[#f0f5f3] rounded w-3/4"></div>
                <div className="h-4 bg-[#f0f5f3] rounded w-1/4"></div>
                <div className="h-24 bg-[#f0f5f3] rounded"></div>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <Navbar />
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#111816] mb-4">Producto no encontrado</h1>
            <Link to="/productos" className="text-[#0cf2a5] hover:underline">
              Volver a la tienda
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Navbar />
      
      <main>
        <Container className="py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#608a7c] mb-8">
            <Link to="/" className="hover:text-[#0cf2a5]">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/productos" className="hover:text-[#0cf2a5]">Productos</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#111816]">{product.name}</span>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#111816] mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-[#0cf2a5]">
                  {formatCurrency(product.price)}
                </span>
                {product.discountedPrice && (
                  <span className="text-lg text-[#608a7c] line-through">
                    {formatCurrency(product.discountedPrice)}
                  </span>
                )}
              </div>

              <p className="text-[#608a7c] mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-[#f0f5f3] rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-[#f0f5f3] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-[#f0f5f3] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0cf2a5] text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Añadir al Carrito
                </button>

                <button className="p-3 border border-[#f0f5f3] rounded-xl hover:bg-[#f0f5f3] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111816] mb-3">
                    Detalles del Producto
                  </h3>
                  <ul className="space-y-2 text-[#608a7c]">
                    <li><strong>Material:</strong> Fibras naturales del Pacífico</li>
                    <li><strong>Origen:</strong> Chocó, Colombia</li>
                    <li><strong>Técnica:</strong> Tejido artesanal tradicional</li>
                    <li><strong>Tiempo de elaboración:</strong> 2-3 semanas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#111816] mb-3">
                    Historia del Artesano
                  </h3>
                  <p className="text-[#608a7c] leading-relaxed">
                    Esta pieza fue cuidadosamente elaborada por maestros artesanos de las comunidades 
                    afrocolombianas del Chocó, quienes han preservado estas técnicas ancestrales 
                    por generaciones, transmitiendo su conocimiento de padres a hijos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111816] mb-8 text-center">
                Productos Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
