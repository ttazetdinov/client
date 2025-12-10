import { motion } from "framer-motion";
import { Bell, Heart, MessageCircle, UserPlus, Calendar, Star, Check, LucideIcon } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { timeAgo } from "@/shared/lib/utils";

const notificationIcons: Record<string, LucideIcon> = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  event: Calendar,
  mention: Star,
  default: Bell,
};

interface NotificationItemProps {
  notification: {
    id: number;
    type: string;
    title: string;
    message?: string;
    isRead: boolean;
    createdAt: string;
  };
  index: number;
  onMarkRead: (id: number) => void;
  isMarkingRead: boolean;
}

export function NotificationItem({ notification, index, onMarkRead, isMarkingRead }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type] || notificationIcons.default;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover
        className={`p-4 cursor-pointer ${!notification.isRead ? "border-purple-500/30" : ""}`}
        data-testid={`notification-${notification.id}`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            !notification.isRead ? "gradient-bg" : "bg-white/10"
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className={`font-medium ${!notification.isRead ? "text-white" : "text-white/70"}`}>
                  {notification.title}
                </h3>
                {notification.message && (
                  <p className="text-sm text-white/50 mt-1">{notification.message}</p>
                )}
                <span className="text-xs text-white/40 mt-2 block">
                  {timeAgo(notification.createdAt)}
                </span>
              </div>
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(notification.id);
                  }}
                  disabled={isMarkingRead}
                  data-testid={`button-mark-read-${notification.id}`}
                >
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
