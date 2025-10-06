import BookCard from "@/components/BookCard";
import type { Book } from "@/types/book";

type Props = {
  books: Book[];
};

export default function PopularBooks({ books }: Props) {
  if (!books?.length) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        Popular Books
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  );
}
