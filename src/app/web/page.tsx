import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-10 px-4 py-16">
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
          Introducing the University Library App
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Discover, reserve, and manage your research materials in one place.
        </h1>
        <p className="text-balance text-base text-muted-foreground sm:text-lg">
          Build a modern library experience with curated collections, real-time
          availability, and collaborative study tools powered by a Next.js
          stack.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg">Explore catalog</Button>
          <Button size="lg" variant="outline">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
