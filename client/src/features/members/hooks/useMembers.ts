import { useQuery } from "@tanstack/react-query";
import { User } from "@/shared/hooks/useAuth";

type FilterType = "all" | "online" | "vip" | "nearby";

export function useMembers(filter: FilterType) {
  const { data: members = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/members", { vip: filter === "vip", online: filter === "online" }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter === "vip") params.set("vip", "true");
      if (filter === "online") params.set("online", "true");
      const res = await fetch(`/api/members?${params}`);
      return res.json();
    },
  });

  return {
    members,
    isLoading,
  };
}

export function useFilteredMembers(members: User[], search: string) {
  return members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.city?.toLowerCase().includes(search.toLowerCase())
  );
}
