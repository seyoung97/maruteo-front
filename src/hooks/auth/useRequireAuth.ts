import { useNavigate } from 'react-router-dom';

import { useAuthStatus } from './useAuthStatus';

export const useRequireAuth = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuthStatus();

  if (!isLoading && !isLoggedIn) {
    navigate('/login');
    return { isAuthorized: false };
  }

  return { isAuthorized: isLoggedIn };
}; 