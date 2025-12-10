import { Check, CheckCheck } from "lucide-react";
import { timeAgo } from "@/shared/lib/utils";

interface MessageBubbleProps {
  id: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  isMe: boolean;
}

export function MessageBubble({ id, content, createdAt, isRead, isMe }: MessageBubbleProps) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isMe
            ? "gradient-bg rounded-br-md"
            : "bg-white/10 rounded-bl-md"
        }`}
        data-testid={`message-${id}`}
      >
        <p className="text-sm">{content}</p>
        <div className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : ""}`}>
          <span className="text-[10px] text-white/40">
            {timeAgo(createdAt)}
          </span>
          {isMe && (
            isRead ? (
              <CheckCheck className="w-3 h-3 text-purple-400" />
            ) : (
              <Check className="w-3 h-3 text-white/40" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
