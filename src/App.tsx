
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContextEnhanced";
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
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Basic loading fallback component
const PageLoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: 'var(--background)', 
    color: 'var(--foreground)' 
  }}>
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0cf2a5]"></div>
      <p>Cargando página...</p>
    </div>
  </div>
);

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppProvider>
        <ProveedorTutorial>
          <TooltipProvider>
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
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ProveedorTutorial>
      </AppProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
