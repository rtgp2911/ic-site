import type { Message } from "@/lib/types";
import { MessageCard } from "@/components/MessageCard";
import Link from "next/link";

export function ContentRail({
  title,
  kicker,
  messages,
  href = "/messages"
}: {
  title: string;
  kicker?: string;
  messages: Message[];
  href?: string;
}) {
  return (
    <section className="rail-section">
      <div className="container">
        <div className="rail-heading">
          <div>
            {kicker && <p className="eyebrow">{kicker}</p>}
            <h2>{title}</h2>
          </div>
          <Link className="rail-see-all" href={href}>
            Tout voir
            <span>›</span>
          </Link>
        </div>
        <div className="content-rail">
          {messages.map((message) => (
            <div className="rail-item" key={message.video_id}>
              <MessageCard message={message} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
