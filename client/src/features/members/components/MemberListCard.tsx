import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Avatar } from "@/shared/ui/Avatar";
import { VipBadge } from "@/shared/ui/Badge";
import { User } from "@/shared/hooks/useAuth";

interface MemberListCardProps {
  member: User;
  index: number;
}

export function MemberListCard({ member, index }: MemberListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/profile/${member.id}`}>
        <Card hover className="p-4 cursor-pointer" data-testid={`member-row-${member.id}`}>
          <div className="flex items-center gap-4">
            <Avatar
              src={member.avatar}
              name={member.name}
              size="lg"
              showOnline
              isOnline={member.isOnline}
              isVip={member.isVip}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{member.name}</h3>
                {member.isVip && <VipBadge />}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {member.city || "Unknown"}
                </span>
                {member.isOnline && (
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Online
                  </span>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" data-testid={`button-message-${member.id}`}>
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
