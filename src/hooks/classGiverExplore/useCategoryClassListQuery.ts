import type { GetCategoryClassListResponse } from '@/services/classGiverExploreServices';
import { getCategoryClassList } from '@/services/classGiverExploreServices';
import { CLASS_QUERY_KEY } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useCategoryClassListQuery = (categoryId: string) => {
  return useQuery<GetCategoryClassListResponse>({
    queryKey: [...CLASS_QUERY_KEY.byCategory(categoryId)],
    queryFn: () => getCategoryClassList(categoryId),
    enabled: !!categoryId,
  });
}; 