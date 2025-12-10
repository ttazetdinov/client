import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Avatar } from "@/shared/ui/Avatar";
import { User } from "@/shared/hooks/useAuth";

interface ChatHeaderProps {
  user: User;
  onBack: () => void;
}

export function ChatHeader({ user, onBack }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-white/5 glass-card">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onBack}
        data-testid="button-back"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <Avatar
        src={user?.avatar}
        name={user?.name || "User"}
        size="md"
        showOnline
        isOnline={user?.isOnline}
      />
      <div className="flex-1">
        <h2 className="font-medium">{user?.name}</h2>
        <span className="text-sm text-white/50">
          {user?.isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
