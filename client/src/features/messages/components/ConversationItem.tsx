import { motion } from "framer-motion";
import { Avatar } from "@/shared/ui/Avatar";
import { User } from "@/shared/hooks/useAuth";
import { timeAgo } from "@/shared/lib/utils";

interface Message {
  id: number;
  content: string;
  createdAt: string;
}

interface ConversationItemProps {
  id: number;
  otherUser: User;
  lastMessage?: Message;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationItem({ id, otherUser, lastMessage, isSelected, onClick }: ConversationItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all mb-1 ${
        isSelected
          ? "bg-purple-500/20 border border-purple-500/30"
          : "hover:bg-white/5"
      }`}
      data-testid={`conversation-${id}`}
    >
      <Avatar
        src={otherUser?.avatar}
        name={otherUser?.name || "User"}
        size="md"
        showOnline
        isOnline={otherUser?.isOnline}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium truncate">{otherUser?.name}</span>
          <span className="text-xs text-white/40">
            {lastMessage ? timeAgo(lastMessage.createdAt) : ""}
          </span>
        </div>
        <p className="text-sm text-white/50 truncate">
          {lastMessage?.content || "Start a conversation"}
        </p>
      </div>
    </motion.div>
  );
}
