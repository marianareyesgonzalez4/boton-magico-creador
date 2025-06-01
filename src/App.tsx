
import React, { Suspense } from "react"; // Import Suspense
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// AuthProvider and QueryClientProvider are now in main.tsx
import { CartProvider } from "@/context/CartContext";
import { ProveedorTutorial } from "@/context/TutorialContext";
import { ThemeProvider } from "@/context/ThemeContext";

// Lazy load page components
const Index = React.lazy(() => import("./pages/Index"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const ProducerProfile = React.lazy(() => import("./pages/ProducerProfile"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const OrderConfirmation = React.lazy(() => import("./pages/OrderConfirmation"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AccountManagement = React.lazy(() => import("./pages/AccountManagement"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Basic loading fallback component
const PageLoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
    <p>Cargando página...</p>
    {/* You could add a spinner here e.g. <Spinner /> */}
  </div>
);

const App = () => (
  // ThemeProvider and other app-specific providers remain here
  <ThemeProvider>
    <CartProvider>
      <ProveedorTutorial>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/producto/:slug" element={<ProductDetail />} />
                <Route path="/artesano/:id" element={<ProducerProfile />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido-confirmado" element={<OrderConfirmation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/account-management" element={<AccountManagement />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ProveedorTutorial>
    </CartProvider>
  </ThemeProvider>
);

export default App;
