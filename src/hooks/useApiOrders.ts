
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { useNotifications } from '@/hooks/useNotifications';
import type { CreateOrderRequestDto } from '@/types/api';

export const useApiOrders = () => {
  const { showSuccess, showError } = useNotifications();

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (order) => {
      showSuccess(`¡Pedido #${order.id} creado exitosamente!`);
    },
    onError: (error) => {
      showError(error instanceof Error ? error.message : 'Error al crear el pedido');
    },
  });

  const createOrder = (orderData: CreateOrderRequestDto) => {
    return createOrderMutation.mutateAsync(orderData);
  };

  return {
    createOrder,
    isCreatingOrder: createOrderMutation.isPending,
  };
};

export const useApiOrder = (id: number) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
};
