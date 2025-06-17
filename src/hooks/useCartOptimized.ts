
import { useStore } from '@/store/useStore';

export const useCartOptimized = () => {
  const { cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart } = useStore();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const items = cartItems.map(item => ({
    ...item,
    total: item.price * item.quantity
  }));

  return {
    items,
    total,
    addToCart,
    removeFromCart,
    updateQuantity: updateCartQuantity,
    clearCart
  };
};
