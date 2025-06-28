import { useQuery } from '@tanstack/react-query';

import { tokenManager } from '../../services/apiClient';
import { authService } from '../../services/authServices';
import { AUTH_QUERY_KEY } from '../../services/queryKeys';

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEY.user(),
    queryFn: authService.getCurrentUser,
    enabled: tokenManager.hasAccessToken(), // 토큰이 있을 때만 실행
    retry: false, // 401 에러 시 재시도하지 않음
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
  });
}; 