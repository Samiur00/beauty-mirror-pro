import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Camera, ChevronLeft, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { tutorials } from "@/lib/looks";

export const Route = createFileRoute("/tutorials/$categoryId/$styleId")({
  component: StyleDetail,
  notFoundComponent: () => (
    <MobileShell>
      <div className="px-6 pt-20 text-center">
        <h1 className="font-display text-xl font-semibold">Style not found</h1>
        <Link to="/tutorials" className="mt-4 inline-block text-sm text-accent">Back to guide</Link>
      </div>
    </MobileShell>
  ),
});

function StyleDetail() {
  const { categoryId, styleId } = Route.useParams();
  const category = tutorials.find((t) => t.id === categoryId);
  const style = category?.styles.find((s) => s.id === styleId);
  if (!category || !style) throw notFound();

  const [phase, setPhase] = useState<"scan" | "analyzing" | "result">("scan");

  useEffect(() => {
    if (phase === "analyzing") {
      const t = setTimeout(() => setPhase("result"), 2200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <MobileShell>
      <header className="px-6 pt-12 pb-4">
        <Link to="/tutorials/$categoryId" params={{ categoryId }} className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <ChevronLeft size={14} /> Back
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{category.name}</p>
        <h1 className="font-display text-2xl font-semibold">{style.name}</h1>
      </header>

      {phase !== "result" ? (
        <div className="px-6">
          <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-secondary to-muted shadow-card">
            <div className="relative grid h-full w-full place-items-center">
              <svg viewBox="0 0 200 260" className="h-3/4 w-auto opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6">
                <ellipse cx="100" cy="130" rx="70" ry="100" className="text-primary" />
                <circle cx="75" cy="115" r="4" className="text-primary" />
                <circle cx="125" cy="115" r="4" className="text-primary" />
                <path d="M75 170 Q100 185 125 170" className="text-primary" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                {phase === "scan" ? (
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-card/80 shadow-soft backdrop-blur">
                      <Camera size={22} className="text-primary" />
                    </span>
                    <p className="text-xs font-medium">Center your face in the frame</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <span className="grid h-14 w-14 animate-spin place-items-center rounded-full border-2 border-primary border-t-transparent" />
                    <p className="text-xs font-medium text-foreground">Analyzing your features…</p>
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-primary/20" />
            </div>
          </div>

          {phase === "scan" && (
            <button
              onClick={() => setPhase("analyzing")}
              className="mt-6 w-full rounded-2xl bg-gradient-blush px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth active:scale-[0.98]"
            >
              Start Face Scan
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-5 px-6 pb-6">
          <article className="rounded-3xl bg-gradient-blush p-5 text-primary-foreground shadow-soft">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-90">
              <Sparkles size={14} /> Recommended for you
            </div>
            <p className="mt-2 font-display text-lg leading-snug">{style.recommendation}</p>
          </article>

          <article className="rounded-3xl bg-card p-5 shadow-card">
            <h3 className="font-display text-base font-semibold">Pro tips</h3>
            <ul className="mt-3 space-y-2">
              {style.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-card p-5 shadow-card">
            <h3 className="font-display text-base font-semibold">Step by step</h3>
            <ol className="mt-4 space-y-4">
              {style.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-rose-gold font-display text-sm font-bold text-primary-foreground shadow-soft">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{step.instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <button
            onClick={() => setPhase("scan")}
            className="w-full rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-smooth active:scale-[0.98]"
          >
            Scan again
          </button>
        </div>
      )}
    </MobileShell>
  );
}