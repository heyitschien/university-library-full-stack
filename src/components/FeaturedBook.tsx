import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/book";

type Props = {
  book: Book;
};

export default function FeaturedBook({ book }: Props) {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-card/80 px-8 py-10 shadow-[0_35px_90px_-50px_rgba(5,8,35,0.95)] backdrop-blur-lg sm:px-12 sm:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_120%_at_0%_0%,hsl(var(--primary)/0.18)_0%,transparent_75%)]" />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary/90">
              Featured Book
            </span>
            <div className="space-y-3">
              <h1 className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                {book.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>
                  By <span className="text-primary/90">{book.author}</span>
                </span>
                <span className="text-muted-foreground">
                  Category: {" "}
                  <span className="text-primary/90">{book.genre}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-primary/90">
                  <Star className="h-4 w-4 fill-current" />
                  {book.rating.toFixed(1)}/5
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span>
                Total books: {" "}
                <span className="font-semibold text-primary/90">
                  {book.totalCopies}
                </span>
              </span>
              <span>
                Available books: {" "}
                <span className="font-semibold text-primary/90">
                  {book.availableCopies}
                </span>
              </span>
            </div>
            {book.description ? (
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {book.description}
              </p>
            ) : null}
            <div>
              <Button
                size="lg"
                className="rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-[0_15px_40px_-20px_hsl(var(--primary))] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Image src="/icons/book.svg" alt="Book icon" width={16} height={16} className="mr-2" />
                Borrow book request
              </Button>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm justify-center sm:max-w-md lg:justify-end">
            <div className="absolute inset-0 translate-x-6 translate-y-8 rounded-[2.5rem] bg-primary/15 blur-3xl" />
            <div className="from-white/12 via-white/6 relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br to-transparent p-6 shadow-[0_25px_70px_-30px_rgba(12,16,60,0.8)]">
              <div className="absolute inset-0 bg-[radial-gradient(80%_100%_at_20%_0%,rgba(255,255,255,0.12),transparent)]" />
              <div className="relative flex items-center justify-center">
                <Image
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  width={320}
                  height={480}
                  className="h-auto w-64 rounded-2xl shadow-2xl sm:w-72 lg:w-[260px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
