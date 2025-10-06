import BookCard from "@/components/BookCard";
import type { Book } from "@/types/book";

type Props = {
  books: Book[];
};

export default function PopularBooks({ books }: Props) {
  if (!books?.length) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Popular Books
        </h2>
      </div>
      <div className="flex flex-wrap gap-6 md:gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
