import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/queryClient";

interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  maxAttendees?: number;
  price?: string;
  isVipOnly?: boolean;
  isFeatured?: boolean;
}

type FilterType = "all" | "upcoming" | "vip";

export function useEvents(filter: FilterType) {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", { vipOnly: filter === "vip" }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter === "vip") params.set("vipOnly", "true");
      const res = await fetch(`/api/events?${params}`);
      return res.json();
    },
  });

  const rsvpMutation = useMutation({
    mutationFn: async ({ eventId, status }: { eventId: number; status: string }) => {
      const res = await apiRequest("POST", `/api/events/${eventId}/rsvp`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
    },
  });

  const featuredEvent = events.find((e) => e.isFeatured);
  const regularEvents = events.filter((e) => !e.isFeatured);

  return {
    events,
    featuredEvent,
    regularEvents,
    isLoading,
    rsvp: (eventId: number) => rsvpMutation.mutate({ eventId, status: "going" }),
    isRsvping: rsvpMutation.isPending,
  };
}
