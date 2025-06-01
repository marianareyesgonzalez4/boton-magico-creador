
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, UserPlus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Colombia',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      toast({
        title: "¡Pedido confirmado!",
        description: "Recibirás un email de confirmación pronto",
      });
      navigate('/pedido-confirmado');
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="min-h-screen choco-bg-primary transition-colors duration-300">
      <Header />
      <Navbar />
      
      <main>
        <Container className="py-16">
          <h1 className="text-3xl md:text-4xl font-bold choco-text-primary mb-8">
            Finalizar Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              {/* Authentication Status */}
              {isAuthenticated ? (
                <div className="choco-card-bg p-6 rounded-2xl mb-6 choco-border border">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-choco-cta" />
                    <h2 className="text-lg font-bold choco-text-primary">
                      Bienvenido, {user?.name}
                    </h2>
                  </div>
                  <p className="text-sm choco-text-secondary">
                    Tu información está guardada y lista para usar.
                  </p>
                </div>
              ) : (
                <div className="choco-card-bg p-6 rounded-2xl mb-6 choco-border border">
                  <div className="flex items-center gap-3 mb-4">
                    <UserPlus className="w-5 h-5 text-choco-cta" />
                    <h2 className="text-lg font-bold choco-text-primary">
                      Compra como invitado
                    </h2>
                  </div>
                  <p className="text-sm choco-text-secondary mb-4">
                    Puedes completar tu compra sin registrarte.
                  </p>
                  <div className="text-center">
                    <p className="text-xs choco-text-secondary">
                      ¿Ya tienes cuenta?{' '}
                      <button
                        onClick={() => navigate('/login')}
                        className="text-choco-cta hover:underline"
                      >
                        Inicia sesión
                      </button>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="choco-card-bg p-6 rounded-2xl choco-border border">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-choco-cta" />
                    <h2 className="text-xl font-bold choco-text-primary">
                      Información Personal
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="choco-card-bg p-6 rounded-2xl choco-border border">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-5 h-5 text-choco-cta" />
                    <h2 className="text-xl font-bold choco-text-primary">
                      Información de Envío
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="choco-card-bg p-6 rounded-2xl choco-border border">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-choco-cta" />
                    <h2 className="text-xl font-bold choco-text-primary">
                      Información de Pago
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium choco-text-primary mb-2">
                        Nombre en la Tarjeta
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium choco-text-primary mb-2">
                          Fecha de Vencimiento
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/AA"
                          required
                          className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium choco-text-primary mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 choco-border border rounded-xl focus:outline-none focus:ring-2 focus:ring-choco-cta bg-background text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full choco-cta text-white py-4 rounded-xl font-medium hover:bg-choco-cta-hover transition-colors disabled:opacity-50 text-lg"
                >
                  {isLoading ? 'Procesando...' : `Pagar ${formatCurrency(total)}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="choco-card-bg p-6 rounded-2xl sticky top-8 choco-border border">
                <h2 className="text-xl font-bold choco-text-primary mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium choco-text-primary text-sm">
                          {item.product?.name}
                        </h3>
                        <p className="choco-text-secondary text-sm">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium choco-text-primary">
                          {formatCurrency((item.product?.price || 0) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 choco-border border-t">
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Subtotal</span>
                    <span className="font-medium choco-text-primary">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="choco-text-secondary">Envío</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 choco-border border-t">
                    <span className="choco-text-primary">Total</span>
                    <span className="text-choco-cta">{formatCurrency(total)}</span>
                  </div>
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

export default Checkout;
