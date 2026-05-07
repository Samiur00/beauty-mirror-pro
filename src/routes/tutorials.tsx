import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { tutorials } from "@/lib/looks";

export const Route = createFileRoute("/tutorials")({
  head: () => ({
    meta: [
      { title: "Makeup Guide — Lumière" },
      { name: "description", content: "Learn & apply makeup with category-by-category tutorials." },
    ],
  }),
  component: TutorialsHome,
});

function TutorialsHome() {
  return (
    <MobileShell>
      <header className="px-6 pt-12 pb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Makeup Guide</p>
        <h1 className="font-display text-2xl font-semibold">Learn & Apply</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick a category to explore styles, get a personal recommendation and follow step-by-step tutorials.</p>
      </header>

      <section className="grid grid-cols-2 gap-4 px-6">
        {tutorials.map((cat) => (
          <Link
            key={cat.id}
            to="/tutorials/$categoryId"
            params={{ categoryId: cat.id }}
            className="group rounded-3xl bg-card p-5 shadow-card transition-smooth active:scale-[0.97]"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-blush text-2xl shadow-soft">
              <span aria-hidden>{cat.emoji}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{cat.name}</h3>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{cat.blurb}</p>
          </Link>
        ))}
      </section>
    </MobileShell>
  );
}