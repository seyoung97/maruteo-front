import { useQuery } from '@tanstack/react-query';
import { getClassDetail } from '@/services/classGiverExploreServices';
import type { GetClassDetailResponse } from '@/services/classGiverExploreServices';
import { CLASS_DETAIL } from '@/services/queryKeys';

export const useClassDetailQuery = (id: number) => {
  return useQuery<GetClassDetailResponse>({
    queryKey: CLASS_DETAIL(id),
    queryFn: () => getClassDetail(id),
    enabled: !!id,
  });
}; 