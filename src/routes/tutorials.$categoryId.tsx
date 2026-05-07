import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { tutorials } from "@/lib/looks";

export const Route = createFileRoute("/tutorials/$categoryId")({
  component: CategoryDetail,
  notFoundComponent: () => (
    <MobileShell>
      <div className="px-6 pt-20 text-center">
        <h1 className="font-display text-xl font-semibold">Category not found</h1>
        <Link to="/tutorials" className="mt-4 inline-block text-sm text-accent">Back to guide</Link>
      </div>
    </MobileShell>
  ),
});

function CategoryDetail() {
  const { categoryId } = Route.useParams();
  const category = tutorials.find((t) => t.id === categoryId);
  if (!category) throw notFound();

  return (
    <MobileShell>
      <header className="px-6 pt-12 pb-4">
        <Link to="/tutorials" className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <ChevronLeft size={14} /> Back
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{category.emoji} {category.name}</p>
        <h1 className="font-display text-2xl font-semibold">Choose your style</h1>
        <p className="mt-2 text-sm text-muted-foreground">{category.blurb}</p>
      </header>

      <section className="space-y-3 px-6">
        {category.styles.map((style) => (
          <article key={style.id} className="overflow-hidden rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-blush text-2xl shadow-soft">
                <span aria-hidden>{category.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold">{style.name}</h3>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{style.description}</p>
              </div>
            </div>
            <Link
              to="/tutorials/$categoryId/$styleId"
              params={{ categoryId: category.id, styleId: style.id }}
              className="mt-3 block w-full rounded-full bg-foreground px-3 py-2 text-center text-[11px] font-semibold text-background transition-smooth active:scale-95"
            >
              Try This Look
            </Link>
          </article>
        ))}
      </section>
    </MobileShell>
  );
}