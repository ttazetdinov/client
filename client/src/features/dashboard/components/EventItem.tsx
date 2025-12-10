import { Clock, MapPin, ChevronRight } from "lucide-react";
import { VipBadge } from "@/shared/ui/Badge";

interface EventItemProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    isVipOnly?: boolean;
  };
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div
      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
      data-testid={`event-item-${event.id}`}
    >
      <div className="w-14 h-14 rounded-xl gradient-bg flex flex-col items-center justify-center shrink-0">
        <span className="text-xs font-medium opacity-80">
          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
        </span>
        <span className="text-lg font-bold">
          {new Date(event.date).getDate()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium truncate">{event.title}</h4>
          {event.isVipOnly && <VipBadge />}
        </div>
        <div className="flex items-center gap-3 text-sm text-white/50 mt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {event.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {event.location}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-white/30" />
    </div>
  );
}
