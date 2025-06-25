import { tokenManager } from '../../services/apiClient';
import { authService } from '../../services/authServices';
import { useCurrentUserQuery } from './useCurrentUserQuery';

export const useAuthStatus = () => {
  const { data: user, isLoading, error } = useCurrentUserQuery();
  
  return {
    isLoggedIn: !!user && tokenManager.hasAccessToken(),
    user,
    isLoading,
    error,
    isTokenValid: tokenManager.hasAccessToken() ? authService.isTokenValid() : false,
  };
}; 