import type { Message } from "@/lib/types";
import { MessageCard } from "@/components/MessageCard";

export function MessageGrid({ messages }: { messages: Message[] }) {
  if (!messages.length) {
    return <div className="empty">Aucun message ne correspond à cette recherche.</div>;
  }

  return (
    <div className="message-grid">
      {messages.map((message) => (
        <MessageCard key={message.video_id} message={message} />
      ))}
    </div>
  );
}
