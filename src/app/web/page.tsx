import FeaturedBook from "@/components/FeaturedBook";
import PopularBooks from "@/components/PopularBooks";
import { getFeaturedBook, getPopularBooks } from "@/lib/books";

export default async function WebHomePage() {
  const [featured, popular] = await Promise.all([
    getFeaturedBook(),
    getPopularBooks(12),
  ]);

  return (
    <main className="relative w-full">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--primary)/0.08)_0%,transparent_60%)]" />
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
