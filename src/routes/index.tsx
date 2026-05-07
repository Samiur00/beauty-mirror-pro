import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import hero from "@/assets/hero-beauty.jpg";

export const Route = createFileRoute("/")({
  component: Onboarding,
});

function Onboarding() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col overflow-hidden">
        <div className="relative flex-1">
          <img
            src={hero}
            alt="Luxury makeup flatlay with roses"
            className="absolute inset-0 h-full w-full object-cover"
            width={832}
            height={1216}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/10 to-background" />
          <div className="relative z-10 flex h-full flex-col justify-between p-7 pt-14">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-rose-gold shadow-soft">
                <Sparkles size={18} className="text-primary-foreground" />
              </span>
              <span className="font-display text-xl font-semibold">Lumière</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-background px-7 pb-10 pt-9 shadow-soft">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Your beauty, reimagined</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-balance text-foreground">
            Discover your<br />perfect look.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Try on trending makeup looks with AI, save your favorites, and shop the products behind every style.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              to="/home"
              className="block w-full rounded-2xl bg-gradient-blush px-6 py-4 text-center text-sm font-semibold text-primary-foreground shadow-soft transition-smooth active:scale-[0.98]"
            >
              Get Started
            </Link>
            <Link
              to="/home"
              className="block w-full rounded-2xl border border-border bg-card px-6 py-4 text-center text-sm font-semibold text-foreground transition-smooth active:scale-[0.98]"
            >
              Log In
            </Link>
          </div>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            By continuing you agree to our Terms & Privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
