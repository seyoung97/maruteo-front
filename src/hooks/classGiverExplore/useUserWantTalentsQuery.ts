import { useQuery } from '@tanstack/react-query';
import { getUserWantTalents } from '@/services/classGiverExploreServices';
import type { GetUserWantTalentsRequest, GetUserWantTalentsResponse } from '@/services/classGiverExploreServices';
import { USER_WANT_TALENTS } from '@/services/queryKeys';

export const useUserWantTalentsQuery = (params: GetUserWantTalentsRequest) => {
  return useQuery<GetUserWantTalentsResponse>({
    queryKey: [...USER_WANT_TALENTS, params],
    queryFn: () => getUserWantTalents(params),
  });
}; 