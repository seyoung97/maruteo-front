import { registerClass } from '@/services/classGiverExploreServices';
import { CLASS_LIST } from '@/services/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface RegisterClassFormData {
  title: string;
  description: string;
  place?: string;
  unavailable?: string;
  talentId: string;
  media?: File | null;
}

export const useRegisterClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: RegisterClassFormData) => {
      // RegisterClassFormData를 RegisterClassRequest로 변환
      const registerData = {
        title: formData.title,
        description: formData.description,
        location: formData.place || '',
        time: formData.unavailable || '',
        unavailable: formData.unavailable ? [formData.unavailable] : [],
        media_url: formData.media ? URL.createObjectURL(formData.media) : '',
      };
      return registerClass(registerData);
    },
    onSuccess: () => {
      // 수업 등록 성공 시 수업 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: CLASS_LIST });
    },
    onError: (error) => {
      console.error('수업 등록 실패:', error);
    },
  });
}; 