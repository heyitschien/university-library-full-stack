import FeaturedBook from "@/components/FeaturedBook";
import PopularBooks from "@/components/PopularBooks";
import { getFeaturedBook, getPopularBooks } from "@/lib/books";

export default async function WebHomePage() {
  const [featured, popular] = await Promise.all([
    getFeaturedBook(),
    getPopularBooks(12),
  ]);

  return (
    <main className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25)_0%,transparent_70%)]" />
        <div className="absolute right-[-18%] top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(44,87,255,0.4)_0%,transparent_75%)] blur-3xl" />
      </div>
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
