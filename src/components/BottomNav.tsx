import { Link } from "@tanstack/react-router";
import { Home, Camera, Sparkles, GraduationCap, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/try-on", label: "Try On", Icon: Camera },
  { to: "/library", label: "Library", Icon: Sparkles },
  { to: "/tutorials", label: "Tutorials", Icon: GraduationCap },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 mx-auto max-w-md border-t border-border bg-card/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-center justify-around px-2 py-2">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-muted-foreground transition-smooth"
              activeProps={{ className: "text-primary" }}
            >
              {({ isActive }) => (
                <>
                  <span className={`grid h-9 w-9 place-items-center rounded-2xl transition-smooth ${isActive ? "bg-gradient-blush shadow-soft" : ""}`}>
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-primary-foreground" : ""} />
                  </span>
                  <span className="text-[10px] font-medium tracking-wide">{label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
