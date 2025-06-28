import { useQuery } from '@tanstack/react-query';
import { getClassList } from '@/services/classGiverExploreServices';
import type { GetClassListRequest, GetClassListResponse } from '@/services/classGiverExploreServices';
import { CLASS_LIST } from '@/services/queryKeys';

export const useClassExploreQuery = (params: GetClassListRequest) => {
  return useQuery<GetClassListResponse>({
    queryKey: [...CLASS_LIST, params],
    queryFn: () => getClassList(params),
  });
}; 