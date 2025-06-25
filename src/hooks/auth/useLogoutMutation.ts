import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../services/authServices';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // 모든 쿼리 캐시 클리어
      queryClient.clear();
      
      // 로그인 페이지로 리다이렉트
      navigate('/auth/login');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 로컬 상태는 클리어
      queryClient.clear();
      navigate('/auth/login');
    },
  });
}; 