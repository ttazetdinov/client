import { Link } from "wouter";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { VipBadge } from "@/shared/ui/Badge";
import { User } from "@/shared/hooks/useAuth";

interface AdOwnerCardProps {
  owner: User;
}

export function AdOwnerCard({ owner }: AdOwnerCardProps) {
  return (
    <Card className="p-6 mb-6">
      <h3 className="font-semibold mb-4">Posted by</h3>
      <Link href={`/profile/${owner.id}`}>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
          <Avatar
            src={owner.avatar}
            name={owner.name}
            size="lg"
            isOnline={owner.isOnline}
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{owner.name}</span>
              {owner.isVip && <VipBadge />}
            </div>
            {owner.city && (
              <span className="text-sm text-white/50">{owner.city}</span>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
