
import { useState } from 'react';
import { authService } from '@/services/authService';
import { useNotifications } from '@/hooks/useNotifications';
import type { LoginRequestDto, RegisterRequestDto, UserDto } from '@/types/api';

export const useApiAuth = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const login = async (credentials: LoginRequestDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      showSuccess(`¡Bienvenido, ${response.user.firstName}!`);
      return true;
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Error al iniciar sesión');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequestDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      showSuccess(`¡Cuenta creada exitosamente! Bienvenido, ${response.user.firstName}!`);
      return true;
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Error al registrarse');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    showSuccess('Sesión cerrada correctamente');
  };

  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
  };
};
