import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Star, Ticket } from "lucide-react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Button } from "@/shared/ui/Button";
import { Tabs } from "@/shared/ui/Tabs";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useEvents } from "./hooks";
import { FeaturedEventCard, EventCard } from "./components";

type FilterType = "all" | "upcoming" | "vip";

const filterTabs = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "vip", label: "VIP Only" },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { events, featuredEvent, regularEvents, isLoading, rsvp, isRsvping } = useEvents(filter);

  return (
    <div className="py-6">
      <PageHeader
        title="Events"
        subtitle="Discover upcoming gatherings"
        action={
          <Button data-testid="button-my-tickets">
            <Ticket className="w-4 h-4" />
            My Tickets
          </Button>
        }
      />

      <Tabs
        tabs={filterTabs}
        activeTab={filter}
        onChange={(id) => setFilter(id as FilterType)}
        className="mb-6"
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description="Check back later for upcoming events"
        />
      ) : (
        <>
          {featuredEvent && filter !== "vip" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-medium text-pink-400">Featured Event</span>
              </div>
              <FeaturedEventCard
                event={featuredEvent}
                onRsvp={rsvp}
                isLoading={isRsvping}
              />
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {regularEvents.map((event: any, index: number) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onRsvp={rsvp}
                isLoading={isRsvping}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
