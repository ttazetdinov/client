import { Clock, MapPin, Users, Check } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { VipBadge } from "@/shared/ui/Badge";

interface FeaturedEventCardProps {
  event: {
    id: number;
    title: string;
    description?: string;
    date: string;
    time: string;
    location: string;
    maxAttendees?: number;
    price?: string;
    isVipOnly?: boolean;
  };
  onRsvp: (eventId: number) => void;
  isLoading: boolean;
}

export function FeaturedEventCard({ event, onRsvp, isLoading }: FeaturedEventCardProps) {
  return (
    <Card
      className="overflow-hidden border-purple-500/30"
      data-testid={`event-featured-${event.id}`}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="w-full md:w-24 h-24 rounded-2xl gradient-bg flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-medium opacity-80">
              {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
            </span>
            <span className="text-3xl font-bold">
              {new Date(event.date).getDate()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-heading text-2xl font-bold">{event.title}</h2>
              {event.isVipOnly && <VipBadge />}
            </div>
            <p className="text-white/60 mb-4">{event.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {event.maxAttendees} spots
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-lg font-bold gradient-text">{event.price}</span>
            <Button
              onClick={() => onRsvp(event.id)}
              disabled={isLoading}
              data-testid={`button-rsvp-${event.id}`}
            >
              <Check className="w-4 h-4" />
              RSVP Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
