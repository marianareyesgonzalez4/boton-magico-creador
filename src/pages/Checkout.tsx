
import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCartOptimized } from '@/hooks/useCartOptimized';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { items, total } = useCartOptimized();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <Navbar />
        
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No hay productos en el carrito
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Agrega algunos productos antes de proceder al checkout
            </p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-[#0cf2a5] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0ae195] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Productos
            </Link>
          </div>
        </Container>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navbar />
      
      <Container className="py-16">
        <div className="mb-8">
          <Link
            to="/carrito"
            className="inline-flex items-center gap-2 text-[#0cf2a5] hover:text-[#0ae195] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Carrito
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario de checkout */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.product?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency((item.product?.price || 0) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Envío</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-[#0cf2a5]">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  🔒 Pago seguro y protegido
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Checkout;
