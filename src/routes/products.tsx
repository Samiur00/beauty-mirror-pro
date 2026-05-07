import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Featured Products — Lumière" },
      { name: "description", content: "Shop the products behind the looks." },
    ],
  }),
  component: Products,
});

const products = [
  { id: "1", name: "Velvet Blush Duo", brand: "Maison Rose", desc: "A satin matte blush in two flattering shades.", price: "$28", img: p1 },
  { id: "2", name: "Luminous Skin Tint", brand: "Lavelle", desc: "Buildable foundation with a natural dewy finish.", price: "$42", img: p2 },
  { id: "3", name: "Sunset Eyeshadow Palette", brand: "Auré", desc: "Twelve warm neutrals for every occasion.", price: "$54", img: p3 },
];

function Products() {
  return (
    <MobileShell>
      <header className="px-6 pt-12 pb-2">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Featured</p>
        <h1 className="font-display text-2xl font-semibold">Shop the Look</h1>
        <p className="mt-2 text-sm text-muted-foreground">Curated picks from our favorite beauty brands.</p>
      </header>

      <section className="mt-4 space-y-4 px-6">
        {products.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-3xl bg-card shadow-card">
            <div className="aspect-[16/10] w-full overflow-hidden bg-secondary">
              <img src={p.img} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{p.brand}</p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <span className="shrink-0 font-display text-base font-semibold">{p.price}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex gap-2">
                <Link to="/try-on" className="flex-1 rounded-2xl bg-gradient-blush px-4 py-3 text-center text-xs font-semibold text-primary-foreground shadow-soft transition-smooth active:scale-[0.98]">
                  Try On
                </Link>
                <button className="rounded-2xl border border-border bg-card px-4 py-3 text-xs font-semibold transition-smooth active:scale-95">
                  Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </MobileShell>
  );
}
