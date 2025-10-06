import path from "path";
import { promises as fs } from "fs";
import type { Book } from "@/types/book";

const DATA_FILE = path.join(process.cwd(), "public", "books.json");

export async function getBooks(): Promise<Book[]> {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) return [];
  // naive type assertion; optionally validate with zod
  return data as Book[];
}

export async function getFeaturedBook(): Promise<Book | null> {
  const books = await getBooks();
  if (!books.length) return null;
  // highest rating, then most available copies
  return (
    [...books].sort((a, b) => {
      const r = (b.rating ?? 0) - (a.rating ?? 0);
      if (r !== 0) return r;
      return (b.availableCopies ?? 0) - (a.availableCopies ?? 0);
    })[0] ?? null
  );
}

export async function getPopularBooks(limit = 10): Promise<Book[]> {
  const books = await getBooks();
  return [...books]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, limit);
}
