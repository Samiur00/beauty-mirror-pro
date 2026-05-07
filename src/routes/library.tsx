import { createFileRoute } from "@tanstack/react-router";
import { Heart, SlidersHorizontal, X } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { categories, colorTones, looks, occasions, regions, skinTones } from "@/lib/looks";
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

function FilterRow({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-1">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-smooth active:scale-95 ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground border border-border"}`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Library() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [occasion, setOccasion] = useState<(typeof occasions)[number]>("All");
  const [color, setColor] = useState<(typeof colorTones)[number]>("All");
  const [skin, setSkin] = useState<(typeof skinTones)[number]>("All");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const filtered = active === "All" ? looks : looks.filter((l) => l.category === active);
  const activeFilterCount = [occasion, color, skin, region].filter((v) => v !== "All").length;

  const toggle = (id: string) => setSaved((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  return (
    <MobileShell>
      <header className="flex items-end justify-between px-6 pt-12 pb-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Style</p>
          <h1 className="font-display text-2xl font-semibold">Library</h1>
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="relative grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card transition-smooth active:scale-95"
          aria-label="Filters"
        >
          <SlidersHorizontal size={18} />
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </button>
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

      {showFilters && (
        <div className="mx-6 mt-3 space-y-4 rounded-3xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold">Filters</h3>
            <button
              onClick={() => { setOccasion("All"); setColor("All"); setSkin("All"); setRegion("All"); }}
              className="text-[11px] font-semibold text-accent"
            >
              Reset
            </button>
          </div>
          <FilterRow label="Occasion" options={occasions as readonly string[]} value={occasion} onChange={(v) => setOccasion(v as typeof occasion)} />
          <FilterRow label="Color" options={colorTones as readonly string[]} value={color} onChange={(v) => setColor(v as typeof color)} />
          <FilterRow label="Skin tone" options={skinTones as readonly string[]} value={skin} onChange={(v) => setSkin(v as typeof skin)} />
          <FilterRow label="Region / Country" options={regions as readonly string[]} value={region} onChange={(v) => setRegion(v as typeof region)} />
          <button
            onClick={() => setShowFilters(false)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-xs font-semibold text-background transition-smooth active:scale-95"
          >
            <X size={14} /> Close
          </button>
        </div>
      )}

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
