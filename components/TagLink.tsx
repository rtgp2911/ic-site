import Link from "next/link";
import { slugifyTheme } from "@/lib/themes";

const paramByKind = {
  year: "year",
  theme: "theme",
  testament: "testament",
  book: "book",
  chapter: "chapter",
  person: "person",
  passage: "passage",
  keyword: "keyword"
} as const;

type TagKind = keyof typeof paramByKind;

export function TagLink({ kind, value }: { kind: TagKind; value: string }) {
  if (kind === "theme") {
    return (
      <Link className="tag-link" href={`/themes/${slugifyTheme(value)}`}>
        {value}
      </Link>
    );
  }

  return (
    <Link className="tag-link" href={`/messages?${paramByKind[kind]}=${encodeURIComponent(value)}`}>
      {value}
    </Link>
  );
}
