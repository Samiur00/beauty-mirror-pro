import { BottomNav } from "./BottomNav";

export function MobileShell({ children, withNav = true }: { children: React.ReactNode; withNav?: boolean }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-background">
        <main className={`flex-1 ${withNav ? "pb-24" : ""}`}>{children}</main>
        {withNav && <BottomNav />}
      </div>
    </div>
  );
}
