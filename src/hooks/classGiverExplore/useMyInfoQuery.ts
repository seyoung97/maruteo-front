import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/services/classGiverExploreServices';
import type { MyInfoResponse } from '@/services/classGiverExploreServices';
import { MY_INFO } from '@/services/queryKeys';

export const useMyInfoQuery = () => {
  return useQuery<MyInfoResponse>({
    queryKey: MY_INFO,
    queryFn: getMyInfo,
  });
}; 