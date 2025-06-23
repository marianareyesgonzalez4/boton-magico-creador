
import React, { createContext, useContext } from 'react';
import { useAuth as useApiAuth } from '@/hooks/api/useAuth';
import type { UserDto } from '@/types/api';

interface ApiAuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => void;
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => void;
  logout: () => void;
  updateProfile: (userData: Partial<UserDto>) => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isUpdatingProfile: boolean;
}

const ApiAuthContext = createContext<ApiAuthContextType | undefined>(undefined);

export const ApiAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authHook = useApiAuth();

  const contextValue: ApiAuthContextType = {
    user: authHook.user,
    isAuthenticated: authHook.isAuthenticated,
    isLoading: authHook.isLoading,
    login: authHook.login,
    register: authHook.register,
    logout: authHook.logout,
    updateProfile: authHook.updateProfile,
    isLoggingIn: authHook.isLoggingIn,
    isRegistering: authHook.isRegistering,
    isUpdatingProfile: authHook.isUpdatingProfile,
  };

  return (
    <ApiAuthContext.Provider value={contextValue}>
      {children}
    </ApiAuthContext.Provider>
  );
};

export const useApiAuthContext = () => {
  const context = useContext(ApiAuthContext);
  if (context === undefined) {
    throw new Error('useApiAuthContext must be used within an ApiAuthProvider');
  }
  return context;
};
