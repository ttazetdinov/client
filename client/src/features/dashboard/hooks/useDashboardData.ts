import { useQuery } from "@tanstack/react-query";
import { User } from "@/shared/hooks/useAuth";

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

interface Notification {
  id: number;
  type: string;
  title: string;
  message?: string;
  isRead: boolean;
  createdAt: string;
}

export function useDashboardData() {
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: members = [] } = useQuery<User[]>({
    queryKey: ["/api/members"],
  });

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const upcomingEvents = events.slice(0, 3);
  const recentMembers = members.slice(0, 6);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    events,
    members,
    notifications,
    upcomingEvents,
    recentMembers,
    unreadCount,
  };
}
