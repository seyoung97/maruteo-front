import { useMutation } from '@tanstack/react-query';
import { unlikeGiver, UnlikeGiverRequest, UnlikeGiverResponse } from '@/services/classGiverExploreServices';

export const useUnlikeGiverMutation = () => {
  return useMutation<UnlikeGiverResponse, unknown, UnlikeGiverRequest>(unlikeGiver);
}; 