import { createFileRoute } from "@tanstack/react-router";
import { Camera, RefreshCw, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { looks } from "@/lib/looks";
import { useState } from "react";

export const Route = createFileRoute("/try-on")({
  head: () => ({
    meta: [
      { title: "Try On — Lumière" },
      { name: "description", content: "Try makeup looks live with our AR camera." },
    ],
  }),
  component: TryOn,
});

function TryOn() {
  const [selected, setSelected] = useState(looks[0].id);
  return (
    <MobileShell>
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Studio</p>
          <h1 className="font-display text-2xl font-semibold">Try It On</h1>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card transition-smooth active:scale-95">
          <RefreshCw size={18} />
        </button>
      </header>

      <div className="mx-6 mt-2 aspect-[3/4] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-secondary to-muted shadow-card">
        <div className="relative grid h-full w-full place-items-center">
          {/* Face outline guide */}
          <svg viewBox="0 0 200 260" className="h-3/4 w-auto opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6">
            <ellipse cx="100" cy="130" rx="70" ry="100" className="text-primary" />
            <circle cx="75" cy="115" r="4" className="text-primary" />
            <circle cx="125" cy="115" r="4" className="text-primary" />
            <path d="M75 170 Q100 185 125 170" className="text-primary" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-card/80 shadow-soft backdrop-blur">
                <Camera size={22} className="text-primary" />
              </span>
              <p className="text-xs font-medium">Center your face in the frame</p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-primary/20" />
        </div>
      </div>

      <section className="mt-6 px-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">Choose a look</h2>
          <Sparkles size={16} className="text-accent" />
        </div>
        <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 pb-2">
          {looks.map((look) => {
            const active = selected === look.id;
            return (
              <button
                key={look.id}
                onClick={() => setSelected(look.id)}
                className={`shrink-0 overflow-hidden rounded-2xl border-2 transition-smooth active:scale-95 ${active ? "border-primary shadow-soft" : "border-transparent"}`}
              >
                <div className="relative h-20 w-20">
                  <img src={look.img} alt={look.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="bg-card px-1 py-1 text-center text-[10px] font-semibold">{look.name}</p>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-6 px-6">
        <button className="w-full rounded-2xl bg-gradient-blush px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth active:scale-[0.98]">
          Apply Look
        </button>
      </div>
    </MobileShell>
  );
}
