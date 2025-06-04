
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { TutorialProvider } from '@/context/TutorialContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import TutorialSteps from '@/components/tutorial/TutorialSteps';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import GuestCheckout from '@/pages/GuestCheckout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Stories from '@/pages/Stories';
import StoryDetail from '@/pages/StoryDetail';
import NotFound from '@/pages/NotFound';
import Terms from '@/pages/Terms';
import OrderConfirmation from '@/pages/OrderConfirmation';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="choco-artesanal-theme">
        <TutorialProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/product-detail" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/guest-checkout" element={<GuestCheckout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/story-detail" element={<StoryDetail />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <TutorialSteps />
              <Toaster />
            </div>
          </Router>
        </TutorialProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
