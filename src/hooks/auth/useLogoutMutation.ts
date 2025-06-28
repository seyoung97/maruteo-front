import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../../atoms/authAtoms';
import { authService } from '../../services/authServices';

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // React Query 캐시 클리어
      queryClient.clear();
      
      // Jotai 사용자 정보 클리어
      setUser(null);
      
      // 로그인 페이지로 리다이렉트
      navigate('/login');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 로컬 상태는 클리어
      queryClient.clear();
      setUser(null);
      navigate('/login');
    },
  });
}; 