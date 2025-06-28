import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../../atoms/authAtoms';
import { authService } from '../../services/authServices';
import { AUTH_QUERY_KEY } from '../../services/queryKeys';

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // React Query 캐시에 사용자 데이터 저장
      if (data.user) {
        queryClient.setQueryData(AUTH_QUERY_KEY.user(), data.user);
      }
      
      // Jotai atom에 사용자 정보 저장
      setUser(data.user);
      
      // 홈페이지로 리다이렉트
      navigate('/');
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
}; 