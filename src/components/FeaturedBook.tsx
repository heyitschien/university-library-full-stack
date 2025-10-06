import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export default function FeaturedBook({ book }: Props) {
  return (
    <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:grid-cols-2 sm:py-16 md:gap-14">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          By {book.author} • Category:{" "}
          <span className="font-semibold text-foreground">{book.genre}</span> •
          ⭐ {book.rating}/5
        </span>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {book.title}
        </h1>
        <div className="text-sm text-muted-foreground">
          <span className="mr-6">
            Total books:{" "}
            <span className="font-semibold text-foreground">
              {book.totalCopies}
            </span>
          </span>
          <span>
            Available books:{" "}
            <span className="font-semibold text-foreground">
              {book.availableCopies}
            </span>
          </span>
        </div>
        {book.description ? (
          <p className="max-w-prose text-base text-muted-foreground">
            {book.description}
          </p>
        ) : null}
        <div className="mt-2">
          <Button size="lg" className="shadow">
            Borrow book request
          </Button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" />
        <Image
          src={book.coverUrl}
          alt={`${book.title} cover`}
          width={360}
          height={520}
          className="h-auto w-[220px] rotate-2 rounded-md shadow-2xl sm:w-[280px] md:w-[320px]"
          priority
        />
      </div>
    </section>
  );
}
