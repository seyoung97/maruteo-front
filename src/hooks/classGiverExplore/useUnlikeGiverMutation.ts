import type { UnlikeGiverRequest, UnlikeGiverResponse } from '@/services/classGiverExploreServices';
import { unlikeGiver } from '@/services/classGiverExploreServices';
import { useMutation } from '@tanstack/react-query';

export const useUnlikeGiverMutation = () => {
  return useMutation<UnlikeGiverResponse, unknown, UnlikeGiverRequest>({
    mutationFn: unlikeGiver,
  });
}; 