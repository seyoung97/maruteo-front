import { useQuery } from '@tanstack/react-query';
import { getGiverList } from '@/services/classGiverExploreServices';
import type { GetGiverListRequest, GetGiverListResponse } from '@/services/classGiverExploreServices';
import { GIVER_LIST } from '@/services/queryKeys';

export const useGiverExploreQuery = (params: GetGiverListRequest) => {
  return useQuery<GetGiverListResponse>({
    queryKey: [...GIVER_LIST, params],
    queryFn: () => getGiverList(params),
  });
}; 