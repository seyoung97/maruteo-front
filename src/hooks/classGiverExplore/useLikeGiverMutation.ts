import type { LikeGiverRequest, LikeGiverResponse } from '@/services/classGiverExploreServices';
import { likeGiver } from '@/services/classGiverExploreServices';
import { useMutation } from '@tanstack/react-query';

export const useLikeGiverMutation = () => {
  return useMutation<LikeGiverResponse, unknown, LikeGiverRequest>({
    mutationFn: likeGiver,
  });
}; 