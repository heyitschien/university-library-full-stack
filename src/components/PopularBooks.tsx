import BookCard from "@/components/BookCard";
import type { Book } from "@/types/book";

type Props = {
  books: Book[];
};

export default function PopularBooks({ books }: Props) {
  if (!books?.length) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20">
      <div className="mb-6 flex items-center justify-between md:mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Popular Books
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
