import { useQuery } from '@tanstack/react-query';
import { getGiverDetail } from '@/services/classGiverExploreServices';
import type { GetGiverDetailResponse } from '@/services/classGiverExploreServices';
import { GIVER_DETAIL } from '@/services/queryKeys';

export const useGiverDetailQuery = (id: number) => {
  return useQuery<GetGiverDetailResponse>({
    queryKey: GIVER_DETAIL(id),
    queryFn: () => getGiverDetail(id),
    enabled: !!id,
  });
}; 