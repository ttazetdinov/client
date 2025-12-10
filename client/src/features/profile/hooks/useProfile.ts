import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useAuth, User } from "@/shared/hooks/useAuth";
import { apiRequest } from "@/shared/lib/queryClient";

export function useProfile() {
  const params = useParams();
  const profileId = params.id ? parseInt(params.id) : null;
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  
  const isOwnProfile = !profileId || profileId === currentUser?.id;
  const targetId = isOwnProfile ? currentUser?.id : profileId;

  const { data: profile, isLoading } = useQuery<User>({
    queryKey: [`/api/profile/${targetId}`],
    enabled: !!targetId,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<User>) => {
      const res = await apiRequest("PUT", "/api/profile", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/profile/${currentUser?.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const displayProfile = profile || currentUser;

  return {
    profile: displayProfile,
    isLoading,
    isOwnProfile,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
}
