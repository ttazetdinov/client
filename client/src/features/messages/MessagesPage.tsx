import { useState, useEffect, useRef } from "react";
import { useParams } from "wouter";
import { Search, Send, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useAuth } from "@/shared/hooks/useAuth";
import { useConversations, useMessages, useSendMessage } from "./hooks";
import { ConversationItem, MessageBubble, ChatHeader } from "./components";

export default function MessagesPage() {
  const params = useParams();
  const conversationId = params.conversationId ? parseInt(params.conversationId) : null;
  const [showChat, setShowChat] = useState(!!conversationId);
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const { conversations } = useConversations();
  const selectedConvo = conversations.find((c) => c.id === conversationId);
  const { messages } = useMessages(conversationId);
  const { sendMessage, isSending } = useSendMessage(conversationId, selectedConvo?.otherUser?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      sendMessage(messageText);
      setMessageText("");
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.otherUser?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 pt-20 pb-24 md:pb-0 flex" style={{ backgroundColor: "#0a0a0f" }}>
      <div
        className={`w-full md:w-[340px] flex flex-col shrink-0 glass-card border-r border-white/5 ${
          showChat ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-heading text-2xl font-bold">Messages</h1>
            <Button size="icon" className="rounded-full" data-testid="button-new-message">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
              data-testid="input-search-messages"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          {filteredConversations.length === 0 ? (
            <div className="py-12 text-center text-white/50">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No conversations yet</p>
            </div>
          ) : (
            filteredConversations.map((convo) => (
              <ConversationItem
                key={convo.id}
                id={convo.id}
                otherUser={convo.otherUser}
                lastMessage={convo.lastMessage}
                isSelected={convo.id === conversationId}
                onClick={() => {
                  setShowChat(true);
                  window.history.pushState({}, "", `/messages/${convo.id}`);
                }}
              />
            ))
          )}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col ${showChat ? "flex" : "hidden md:flex"}`}
      >
        {selectedConvo ? (
          <>
            <ChatHeader user={selectedConvo.otherUser} onBack={() => setShowChat(false)} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  createdAt={message.createdAt}
                  isRead={message.isRead}
                  isMe={message.senderId === user?.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/5 glass-card">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                  data-testid="input-message"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!messageText.trim() || isSending}
                  data-testid="button-send"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={MessageCircle}
              title="Select a conversation"
              description="Choose a conversation from the list to start messaging"
            />
          </div>
        )}
      </div>
    </div>
  );
}
