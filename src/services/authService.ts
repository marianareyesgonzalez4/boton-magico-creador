
import { apiRequest, TokenManager, API_CONFIG } from '@/config/api';
import type { LoginRequestDto, RegisterRequestDto, AuthResponseDto } from '@/types/api';

export const authService = {
  async login(credentials: LoginRequestDto): Promise<AuthResponseDto> {
    console.log('Logging in user:', credentials.email);
    
    const response = await apiRequest<AuthResponseDto>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );
    
    if (response.token) {
      TokenManager.setToken(response.token);
      console.log('Login successful, token stored');
    }
    
    return response;
  },

  async register(userData: RegisterRequestDto): Promise<AuthResponseDto> {
    console.log('Registering user:', userData.email);
    
    const response = await apiRequest<AuthResponseDto>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );
    
    if (response.token) {
      TokenManager.setToken(response.token);
      console.log('Registration successful, token stored');
    }
    
    return response;
  },

  logout(): void {
    TokenManager.removeToken();
    console.log('User logged out, token removed');
  },

  isAuthenticated(): boolean {
    return TokenManager.isAuthenticated();
  },

  getToken(): string | null {
    return TokenManager.getToken();
  },
};
