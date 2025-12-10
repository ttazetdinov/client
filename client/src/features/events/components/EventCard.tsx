import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { VipBadge } from "@/shared/ui/Badge";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    price?: string;
    isVipOnly?: boolean;
  };
  index: number;
  onRsvp: (eventId: number) => void;
  isLoading: boolean;
}

export function EventCard({ event, index, onRsvp, isLoading }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover className="p-5" data-testid={`event-card-${event.id}`}>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl gradient-bg flex flex-col items-center justify-center shrink-0">
            <span className="text-xs font-medium opacity-80">
              {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
            </span>
            <span className="text-xl font-bold">
              {new Date(event.date).getDate()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{event.title}</h3>
              {event.isVipOnly && <VipBadge />}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="font-medium gradient-text">{event.price}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onRsvp(event.id)}
                disabled={isLoading}
                data-testid={`button-rsvp-${event.id}`}
              >
                RSVP
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
