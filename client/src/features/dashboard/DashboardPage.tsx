import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Users, MessageCircle, Bell, ChevronRight } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { Card, CardHeader } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { PageHeader } from "@/shared/ui/PageHeader";
import { useDashboardData } from "./hooks";
import { StatCard, EventItem, MemberItem, VipUpgradeCard } from "./components";

export default function DashboardPage() {
  const { user } = useAuth();
  const { upcomingEvents, recentMembers, unreadCount } = useDashboardData();

  const stats = [
    { icon: Users, label: "Connections", value: recentMembers.length, color: "purple" as const },
    { icon: Calendar, label: "Upcoming Events", value: upcomingEvents.length, color: "pink" as const },
    { icon: MessageCircle, label: "Messages", value: 0, color: "purple" as const },
    { icon: Bell, label: "Notifications", value: unreadCount, color: "pink" as const },
  ];

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <PageHeader
          title={`Welcome back, ${user?.username?.split(" ")[0]}`}
          subtitle="Here's what's happening in your community"
        />
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            index={index}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader
              title="Upcoming Events"
              action={
                <Link href="/events">
                  <Button variant="ghost" size="sm" data-testid="button-view-events">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              }
            />
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-white/50">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No upcoming events</p>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader
              title="Community Members"
              action={
                <Link href="/members">
                  <Button variant="ghost" size="sm" data-testid="button-view-members">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              }
            />
            
           {/*  {recentMembers.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {recentMembers.map((member) => (
                  <MemberItem key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-white/50">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No members yet</p>
              </div>
            )} */}
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        {/* <VipUpgradeCard /> */}
      </motion.div>
    </div>
  );
}
