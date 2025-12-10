import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { User } from "@/shared/hooks/useAuth";
import { apiRequest } from "@/shared/lib/queryClient";
import { useToast } from "@/shared/hooks/useToast";

interface Ad {
  id: number;
  ownerId: number;
  title: string;
  description?: string;
  category: string;
  price?: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  images?: string[];
  status?: string;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  owner: User;
}

export function useAds() {
  const { data: ads = [], isLoading } = useQuery<Ad[]>({
    queryKey: ["/api/ads"],
  });

  return { ads, isLoading };
}

export function useAd() {
  const params = useParams();
  const adId = params.id ? parseInt(params.id) : null;

  const { data: ad, isLoading } = useQuery<Ad>({
    queryKey: [`/api/ads/${adId}`],
    enabled: !!adId,
  });

  return { ad, isLoading, adId };
}

export function useMyAds() {
  const { data: ads = [], isLoading } = useQuery<Ad[]>({
    queryKey: ["/api/my-ads"],
  });

  return { ads, isLoading };
}

export function useCreateAd() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createAdMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
      price: string;
      location: string;
      contactEmail: string;
      contactPhone: string;
      images: string[];
    }) => {
      const res = await apiRequest("POST", "/api/ads", data);
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/ads"] });
      toast({
        title: "Ad created",
        description: "Your advertisement has been posted successfully.",
      });
      setLocation(`/ads/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create ad. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    createAd: createAdMutation.mutate,
    isCreating: createAdMutation.isPending,
  };
}

export function useDeleteAd() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/ads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-ads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/ads"] });
      toast({
        title: "Ad deleted",
        description: "Your advertisement has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete ad. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    deleteAd: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}

export function useFilteredAds(ads: Ad[], search: string, category: string) {
  return ads.filter((ad) => {
    const matchesSearch = 
      ad.title.toLowerCase().includes(search.toLowerCase()) ||
      ad.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || ad.category === category;
    return matchesSearch && matchesCategory;
  });
}
