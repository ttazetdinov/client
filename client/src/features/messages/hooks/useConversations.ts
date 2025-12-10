import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/shared/hooks/useAuth";
import { apiRequest } from "@/shared/lib/queryClient";

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  otherUser: User;
  lastMessage?: Message;
  lastMessageAt: string;
}

export function useConversations() {
  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
  });

  return { conversations };
}

export function useMessages(conversationId: number | null) {
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: [`/api/conversations/${conversationId}/messages`],
    enabled: !!conversationId,
  });

  return { messages };
}

export function useSendMessage(conversationId: number | null, receiverId: number | undefined) {
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", `/api/conversations/${conversationId}/messages`, {
        content,
        receiverId,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/conversations/${conversationId}/messages`] });
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  return {
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
}
