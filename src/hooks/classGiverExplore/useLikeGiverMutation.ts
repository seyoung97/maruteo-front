import { useMutation } from '@tanstack/react-query';
import { likeGiver, LikeGiverRequest, LikeGiverResponse } from '@/services/classGiverExploreServices';

export const useLikeGiverMutation = () => {
  return useMutation<LikeGiverResponse, unknown, LikeGiverRequest>(likeGiver);
}; 