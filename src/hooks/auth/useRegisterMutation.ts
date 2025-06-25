import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../services/authServices';
import { AUTH_QUERY_KEY } from '../../services/queryKeys';

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // 회원가입 성공 시 사용자 데이터 캐시
      if (data.user) {
        queryClient.setQueryData(AUTH_QUERY_KEY.user(), data.user);
      }
      
      // 홈페이지로 리다이렉트
      navigate('/');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
}; 