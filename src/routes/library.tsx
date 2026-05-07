import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { categories, looks } from "@/lib/looks";
import { useState } from "react";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Style Library — Lumière" },
      { name: "description", content: "Browse curated makeup looks by category." },
    ],
  }),
  component: Library,
});

function Library() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const filtered = active === "All" ? looks : looks.filter((l) => l.category === active);

  const toggle = (id: string) => setSaved((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  return (
    <MobileShell>
      <header className="px-6 pt-12 pb-2">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Style</p>
        <h1 className="font-display text-2xl font-semibold">Library</h1>
      </header>

      <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-6 pb-2">
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-smooth active:scale-95 ${isActive ? "bg-foreground text-background" : "bg-card text-muted-foreground border border-border"}`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <section className="mt-4 grid grid-cols-2 gap-4 px-6">
        {filtered.map((look) => {
          const isSaved = saved.has(look.id);
          return (
            <article key={look.id} className="overflow-hidden rounded-3xl bg-card shadow-card">
              <div className="relative aspect-[3/4]">
                <img src={look.img} alt={look.name} className="h-full w-full object-cover" loading="lazy" />
                <button
                  aria-label="Save"
                  onClick={() => toggle(look.id)}
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-card/90 backdrop-blur transition-smooth active:scale-90"
                >
                  <Heart size={15} className={isSaved ? "fill-primary text-primary" : "text-foreground"} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-accent">{look.category}</p>
                <h3 className="font-display text-sm font-semibold">{look.name}</h3>
              </div>
            </article>
          );
        })}
      </section>
    </MobileShell>
  );
}
