import { createFileRoute } from "@tanstack/react-router";
import { Settings, Bell, Heart, Sparkles, ChevronRight, LogOut } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import avatar from "@/assets/avatar.jpg";
import { looks } from "@/lib/looks";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Lumière" },
      { name: "description", content: "Your saved looks, recent tries and account." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const saved = looks.slice(0, 4);
  const recent = looks.slice(2, 5);

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-6 pt-12">
        <h1 className="font-display text-2xl font-semibold">Profile</h1>
        <button className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card transition-smooth active:scale-95">
          <Settings size={18} />
        </button>
      </header>

      <section className="mx-6 mt-5 rounded-3xl bg-gradient-blush p-5 text-primary-foreground shadow-soft">
        <div className="flex items-center gap-4">
          <img src={avatar} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-card" />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold">Sophia Chen</h2>
            <p className="text-xs opacity-90">Beauty enthusiast · Member since '24</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 divide-x divide-card/30 text-center">
          <div><p className="font-display text-lg font-semibold">24</p><p className="text-[10px] opacity-80">Saved</p></div>
          <div><p className="font-display text-lg font-semibold">12</p><p className="text-[10px] opacity-80">Tried</p></div>
          <div><p className="font-display text-lg font-semibold">5</p><p className="text-[10px] opacity-80">Brands</p></div>
        </div>
      </section>

      <section className="mt-7 px-6">
        <div className="mb-3 flex items-center gap-2">
          <Heart size={16} className="text-primary" />
          <h3 className="font-display text-base font-semibold">Saved Looks</h3>
        </div>
        <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 pb-2">
          {saved.map((l) => (
            <div key={l.id} className="shrink-0 overflow-hidden rounded-2xl bg-card shadow-card">
              <img src={l.img} alt={l.name} className="h-28 w-24 object-cover" loading="lazy" />
              <p className="px-2 py-1.5 text-[11px] font-semibold">{l.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 px-6">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <h3 className="font-display text-base font-semibold">Recently Tried</h3>
        </div>
        <ul className="space-y-2">
          {recent.map((l) => (
            <li key={l.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card">
              <img src={l.img} alt={l.name} className="h-12 w-12 rounded-xl object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold">{l.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-accent">{l.category}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 px-6">
        <h3 className="mb-3 font-display text-base font-semibold">Settings</h3>
        <ul className="overflow-hidden rounded-3xl bg-card shadow-card">
          {[
            { Icon: Bell, label: "Notifications" },
            { Icon: Settings, label: "Account & Privacy" },
            { Icon: LogOut, label: "Sign Out" },
          ].map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 border-b border-border px-4 py-4 last:border-0">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary"><Icon size={16} /></span>
              <span className="flex-1 text-sm font-medium">{label}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </li>
          ))}
        </ul>
      </section>
    </MobileShell>
  );
}
