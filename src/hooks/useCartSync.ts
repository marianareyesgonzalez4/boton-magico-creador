
import { useEffect } from 'react';
import { useCart as useApiCart } from '@/hooks/api/useCart';
import { useAuth } from '@/hooks/api/useAuth';
import { useStore } from '@/store/useStore';

export const useCartSync = () => {
  const { isAuthenticated } = useAuth();
  const apiCart = useApiCart();
  const localCart = useStore(state => state.cartItems);
  const { clearCart: clearLocalCart } = useStore();

  // Sync local cart with server when user logs in
  useEffect(() => {
    if (isAuthenticated && localCart.length > 0 && !apiCart.isLoading) {
      // Convert local cart items to API format
      const cartItems = localCart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // Sync with server
      apiCart.syncCart(cartItems);
      
      // Clear local cart after sync
      clearLocalCart();
    }
  }, [isAuthenticated, localCart.length, apiCart.isLoading]);

  // Return combined cart data
  return {
    // Use API cart if authenticated, otherwise use local cart
    items: isAuthenticated ? apiCart.items : localCart,
    total: isAuthenticated ? apiCart.total : localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    itemCount: isAuthenticated ? apiCart.itemCount : localCart.reduce((sum, item) => sum + item.quantity, 0),
    
    // Loading states
    isLoading: isAuthenticated ? apiCart.isLoading : false,
    isSyncing: apiCart.isSyncing,
    
    // Actions - use API methods if authenticated, otherwise use local store
    addToCart: isAuthenticated ? apiCart.addToCart : useStore.getState().addToCart,
    updateQuantity: isAuthenticated ? apiCart.updateQuantity : useStore.getState().updateCartQuantity,
    removeFromCart: isAuthenticated ? apiCart.removeFromCart : useStore.getState().removeFromCart,
    clearCart: isAuthenticated ? apiCart.clearCart : clearLocalCart,
  };
};
