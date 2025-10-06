import Image from "next/image";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <div className="group flex w-48 flex-col gap-2">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border bg-card shadow-sm">
        <Image
          src={book.coverUrl}
          alt={`${book.title} cover`}
          fill
          sizes="192px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex min-h-16 flex-col">
        <p className="line-clamp-2 text-sm font-medium text-foreground">
          {book.title}{" "}
          <span className="text-muted-foreground">- By {book.author}</span>
        </p>
        <p className="text-xs text-muted-foreground">{book.genre}</p>
      </div>
    </div>
  );
}
