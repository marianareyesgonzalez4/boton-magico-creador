
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen choco-bg-primary transition-colors duration-300">
        <Header />
        <Navbar />
        
        <main>
          <Container className="py-16">
            <div className="text-center">
              <div className="choco-card-bg p-8 rounded-2xl max-w-md mx-auto choco-border border">
                <ShoppingBag className="w-16 h-16 text-choco-cta mx-auto mb-4" />
                <h1 className="text-2xl font-bold choco-text-primary mb-4">
                  Tu carrito está vacío
                </h1>
                <p className="choco-text-secondary mb-6">
                  Descubre nuestras hermosas artesanías del Chocó
                </p>
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 choco-cta text-white px-6 py-3 rounded-xl font-medium hover:bg-choco-cta-hover transition-colors"
                >
                  Explorar Productos
                </Link>
              </div>
            </div>
          </Container>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen choco-bg-primary transition-colors duration-300">
      <Header />
      <Navbar />
      
      <main>
        <Container className="py-16">
          <h1 className="text-3xl md:text-4xl font-bold choco-text-primary mb-8">
            Tu Carrito
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-6 choco-card-bg rounded-2xl choco-border border"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.product?.image || ''}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold choco-text-primary mb-2">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm choco-text-secondary mb-4">
                      {formatCurrency(item.product?.price || 0)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center choco-border border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                          className="p-2 hover:bg-choco-neutral-border transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 hover:bg-choco-neutral-border transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold choco-text-primary">
                      {formatCurrency((item.product?.price || 0) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="choco-card-bg p-6 rounded-2xl sticky top-8 choco-border border">
                <h2 className="text-xl font-bold choco-text-primary mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Subtotal</span>
                    <span className="font-medium choco-text-primary">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Envío</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="choco-border border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="choco-text-primary">Total</span>
                      <span className="text-choco-cta">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full choco-cta text-white py-3 rounded-xl font-medium hover:bg-choco-cta-hover transition-colors flex items-center justify-center gap-2"
                  >
                    Proceder al Pago
                  </Link>
                  <Link
                    to="/productos"
                    className="w-full choco-border border choco-text-primary py-3 rounded-xl font-medium hover:bg-choco-neutral-border transition-colors text-center block"
                  >
                    Continuar Comprando
                  </Link>
                </div>

                <div className="mt-6 p-4 choco-card-bg rounded-xl choco-border border">
                  <p className="text-sm choco-text-secondary text-center">
                    🚚 Envío gratis en todos los pedidos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
