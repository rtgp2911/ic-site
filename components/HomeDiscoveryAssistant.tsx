"use client";

import { useState } from "react";
import { Search, Send } from "lucide-react";
import type { Message } from "@/lib/types";

export function HomeDiscoveryAssistant({ messages }: { messages: Message[] }) {
  const [query, setQuery] = useState("");

  return (
    <section className="section discovery-section">
      <div className="container discovery-minimal">
        <h2>Que recherchez-vous aujourd’hui ?</h2>
        <form className="home-search-form" action="/messages" method="get" role="search">
          <label>
            <Search size={20} />
            <input
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Rechercher parmi ${messages.length} messages`}
            />
            <button type="submit" aria-label="Rechercher">
              <Send size={18} />
            </button>
          </label>
        </form>
      </div>
    </section>
  );
}
