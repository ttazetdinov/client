import { Bell, CheckCheck } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useNotifications } from "./hooks";
import { NotificationItem } from "./components";

export default function NotificationsPage() {
  const {
    notifications,
    isLoading,
    unreadCount,
    markRead,
    isMarkingRead,
    markAllRead,
    isMarkingAllRead,
  } = useNotifications();

  return (
    <div className="py-6">
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
        action={
          unreadCount > 0 && (
            <Button
              variant="ghost"
              onClick={() => markAllRead()}
              disabled={isMarkingAllRead}
              data-testid="button-mark-all-read"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </Button>
          )
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! Check back later for updates"
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              index={index}
              onMarkRead={markRead}
              isMarkingRead={isMarkingRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
