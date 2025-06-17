
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/cartService';
import { useNotifications } from '@/hooks/useNotifications';
import type { CartDto } from '@/types/api';

export const useApiCart = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotifications();

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    staleTime: 30 * 1000, // 30 seconds
  });

  const updateCartMutation = useMutation({
    mutationFn: cartService.updateCart,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart'], updatedCart);
      showSuccess('Carrito actualizado');
    },
    onError: (error) => {
      showError(error instanceof Error ? error.message : 'Error al actualizar el carrito');
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.setQueryData(['cart'], null);
      showSuccess('Carrito vacío');
    },
    onError: (error) => {
      showError(error instanceof Error ? error.message : 'Error al vaciar el carrito');
    },
  });

  const addToCart = (productId: number, quantity: number = 1) => {
    if (!cart) return;
    
    const existingItem = cart.items.find(item => item.productId === productId);
    const updatedItems = existingItem
      ? cart.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart.items, { productId, quantity, price: 0 }]; // Price will be calculated on backend

    const updatedCart: CartDto = {
      ...cart,
      items: updatedItems,
    };

    updateCartMutation.mutate(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    if (!cart) return;
    
    const updatedCart: CartDto = {
      ...cart,
      items: cart.items.filter(item => item.productId !== productId),
    };

    updateCartMutation.mutate(updatedCart);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (!cart || quantity < 1) return;
    
    const updatedCart: CartDto = {
      ...cart,
      items: cart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ),
    };

    updateCartMutation.mutate(updatedCart);
  };

  return {
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: clearCartMutation.mutate,
    isUpdating: updateCartMutation.isPending,
    isClearing: clearCartMutation.isPending,
  };
};
