import { Link } from "wouter";
import { Avatar } from "@/shared/ui/Avatar";
import { User } from "@/shared/hooks/useAuth";

interface MemberItemProps {
  member: User;
}

export function MemberItem({ member }: MemberItemProps) {
  return (
    <Link href={`/profile/${member.id}`}>
      <div
        className="flex flex-col items-center text-center cursor-pointer group"
        data-testid={`member-item-${member.id}`}
      >
        <Avatar
          src={member.avatar}
          name={member.name}
          size="lg"
          showOnline
          isOnline={member.isOnline}
          isVip={member.isVip}
          className="mb-2 group-hover:scale-105 transition-transform"
        />
        <span className="text-sm font-medium truncate w-full">{member.name.split(" ")[0]}</span>
        <span className="text-xs text-white/50 truncate w-full">{member.city}</span>
      </div>
    </Link>
  );
}
