import { useQuery } from '@tanstack/react-query';
import { getTalentList } from '@/services/classGiverExploreServices';
import type { TalentListResponse } from '@/services/classGiverExploreServices';
import { TALENT_LIST } from '@/services/queryKeys';

export const useTalentListQuery = () => {
  return useQuery<TalentListResponse>({
    queryKey: TALENT_LIST,
    queryFn: getTalentList,
  });
}; 