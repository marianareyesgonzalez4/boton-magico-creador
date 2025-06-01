
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen choco-bg-primary transition-colors duration-300">
      <Header />
      <Navbar />
      
      <main>
        <Container className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="choco-card-bg p-8 rounded-2xl choco-border border">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold choco-text-primary mb-4">
                  ¡Pedido Confirmado!
                </h1>
                <p className="text-lg choco-text-secondary">
                  Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.
                </p>
              </div>

              <div className="bg-background p-6 rounded-xl mb-8 choco-border border">
                <h2 className="text-xl font-bold choco-text-primary mb-4">
                  Detalles del Pedido
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Número de pedido:</span>
                    <span className="font-medium choco-text-primary">#CHO-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Fecha:</span>
                    <span className="font-medium choco-text-primary">{new Date().toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Estado:</span>
                    <span className="font-medium text-green-600">Confirmado</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-background p-6 rounded-xl text-left choco-border border">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-choco-cta" />
                    <h3 className="font-bold choco-text-primary">Confirmación por Email</h3>
                  </div>
                  <p className="choco-text-secondary text-sm">
                    Recibirás un email de confirmación con todos los detalles de tu pedido en los próximos minutos.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-xl text-left choco-border border">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-6 h-6 text-choco-cta" />
                    <h3 className="font-bold choco-text-primary">Tiempo de Entrega</h3>
                  </div>
                  <p className="choco-text-secondary text-sm">
                    Tu pedido será enviado en 2-3 días hábiles. Recibirás un código de seguimiento una vez que sea despachado.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  to="/productos"
                  className="w-full choco-cta text-white py-3 rounded-xl font-medium hover:bg-choco-cta-hover transition-colors inline-block"
                >
                  Continuar Comprando
                </Link>
                <Link
                  to="/"
                  className="w-full choco-border border choco-text-primary py-3 rounded-xl font-medium hover:bg-choco-neutral-border transition-colors inline-block"
                >
                  Volver al Inicio
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="choco-text-secondary mb-4">
                ¿Tienes alguna pregunta sobre tu pedido?
              </p>
              <Link
                to="/"
                className="text-choco-cta font-medium hover:underline"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
