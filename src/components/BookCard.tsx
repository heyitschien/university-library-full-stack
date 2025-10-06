import Image from "next/image";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <div className="group flex w-[11rem] flex-col gap-3">
      <div className="from-white/6 via-white/3 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br to-transparent p-1 shadow-[0_25px_60px_-40px_RGBA(4,8,40,0.9)] transition duration-300 group-hover:-translate-y-1">
        <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_50%_20%,rgba(255,255,255,0.18),transparent)]" />
        <Image
          src={book.coverUrl}
          alt={`${book.title} cover`}
          fill
          sizes="176px"
          className="relative rounded-[1.2rem] object-cover"
        />
      </div>
      <div className="flex min-h-16 flex-col gap-1 text-foreground/90">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">
          {book.title}
        </p>
        <p className="text-xs text-muted-foreground/80">By {book.author}</p>
        <p className="text-xs font-medium text-muted-foreground/70">
          {book.genre}
        </p>
      </div>
    </div>
  );
}
