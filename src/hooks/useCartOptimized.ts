
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/useToast';
import { Product } from '@/types';

export const useCartOptimized = () => {
  const { state, dispatch } = useAppContext();
  const { success, error } = useToast();

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) {
      error('Cantidad inválida');
      return;
    }

    if (product.stock < quantity) {
      error('Stock insuficiente');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity, product },
    });

    success(`${product.name} agregado al carrito`);
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    success('Producto eliminado del carrito');
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    success('Carrito vacío');
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => {
      const price = item.product?.discountedPrice || item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total: getCartTotal(),
    itemsCount: getCartItemsCount(),
  };
};
