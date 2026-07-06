"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher un thème, un passage, une personne...",
  ariaLabel = "Rechercher dans les messages"
}: SearchBarProps) {
  return (
    <label className="search-bar">
      <Search size={24} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </label>
  );
}
