import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, User, Heart } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { looks } from "@/lib/looks";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Lumière" },
      { name: "description", content: "Discover trending makeup looks curated for you." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MobileShell>
      <header className="flex items-center justify-end px-6 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card text-foreground transition-smooth active:scale-95">
            <Search size={18} />
          </button>
          <Link to="/profile" className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-rose-gold text-primary-foreground transition-smooth active:scale-95">
            <User size={18} />
          </Link>
        </div>
      </header>

      <section className="mx-6 rounded-3xl bg-gradient-blush p-5 text-primary-foreground shadow-soft">
        <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-80">Today's pick</p>
        <h2 className="mt-1 font-display text-xl font-semibold">Soft Glow Spring</h2>
        <p className="mt-1 text-xs opacity-90">A dewy, fresh look in 30 seconds.</p>
        <Link to="/try-on" className="mt-3 inline-block rounded-full bg-card/95 px-4 py-2 text-[11px] font-semibold text-foreground transition-smooth active:scale-95">
          Try Now →
        </Link>
      </section>

      <section className="mt-8 px-6">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold">Trending looks</h2>
          <Link to="/library" className="text-xs font-medium text-accent">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {looks.map((look) => (
            <article key={look.id} className="group overflow-hidden rounded-3xl bg-card shadow-card transition-smooth active:scale-[0.98]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={look.img} alt={look.name} className="h-full w-full object-cover" loading="lazy" />
                {look.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur">
                    {look.tag}
                  </span>
                )}
                <button aria-label="Save" className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card/80 text-foreground backdrop-blur transition-smooth active:scale-95">
                  <Heart size={14} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-accent">{look.category}</p>
                <h3 className="mt-0.5 truncate font-display text-sm font-semibold">{look.name}</h3>
                <Link to="/try-on" className="mt-2 block w-full rounded-full bg-foreground px-3 py-1.5 text-center text-[11px] font-semibold text-background transition-smooth active:scale-95">
                  Try It
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
