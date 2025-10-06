import FeaturedBook from "@/components/FeaturedBook";
import PopularBooks from "@/components/PopularBooks";
import { getFeaturedBook, getPopularBooks } from "@/lib/books";

export default async function HomePage() {
  const [featured, popular] = await Promise.all([
    getFeaturedBook(),
    getPopularBooks(12),
  ]);

  return (
    <main className="relative w-full overflow-hidden">
      {featured ? (
        <FeaturedBook book={featured} />
      ) : (
        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <h1 className="text-2xl font-semibold">Welcome to the Library</h1>
          <p className="text-muted-foreground">No books available right now.</p>
        </section>
      )}
      <PopularBooks books={popular} />
    </main>
  );
}
