import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { VipBadge, Badge } from "@/shared/ui/Badge";
import { User } from "@/shared/hooks/useAuth";

interface MemberGridCardProps {
  member: User;
  index: number;
}

export function MemberGridCard({ member, index }: MemberGridCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/profile/${member.id}`}>
        <Card hover className="p-4 text-center cursor-pointer" data-testid={`member-card-${member.id}`}>
          <Avatar
            src={member.avatar}
            name={member.name}
            size="xl"
            showOnline
            isOnline={member.isOnline}
            isVip={member.isVip}
            className="mx-auto mb-3"
          />
          <h3 className="font-medium truncate">{member.name}</h3>
          <div className="flex items-center justify-center gap-1 text-sm text-white/50 mt-1">
            <MapPin className="w-3 h-3" />
            <span>{member.city || "Unknown"}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            {member.isVip && <VipBadge />}
            {member.isOnline && <Badge variant="online">Online</Badge>}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
