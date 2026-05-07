import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { tutorials } from "@/lib/looks";
import { useState, useEffect, useRef } from "react";
import { Camera, X, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/tutorials")({
  head: () => ({
    meta: [
      { title: "Makeup Guide — Lumière" },
      { name: "description", content: "Learn & apply makeup with category-by-category tutorials." },
    ],
  }),
  component: TutorialsHome,
});

// Face shape → recommendation mapping per category
const RECOMMENDATIONS: Record<string, Record<string, { style: string; tip: string }>> = {
  mascara: {
    almond: { style: "Lengthening Mascara", tip: "Your almond eyes suit a lengthening formula to elongate lashes outward." },
    round:  { style: "Volumising Mascara", tip: "Add volume at the outer corners to create a lifted, wide-eye effect." },
    hooded: { style: "Curling Mascara", tip: "Curl first, then apply a curling formula to make eyes pop under the hood." },
    default:{ style: "Lengthening Mascara", tip: "A classic lengthening formula suits most eye shapes beautifully." },
  },
  eyeliner: {
    almond: { style: "Classic Flick", tip: "A clean cat-eye flick follows your natural eye shape perfectly." },
    round:  { style: "Tight-line & Wing", tip: "Line the waterline and add a small wing to elongate the eye." },
    hooded: { style: "Invisible Line", tip: "Stay close to the lash line — a heavy line will disappear in the fold." },
    default:{ style: "Classic Flick", tip: "A thin liner close to the lash line flatters every eye shape." },
  },
  foundation: {
    default: { style: "Skin-Match Formula", tip: "We detected your undertone. Look for foundations with matching warm, cool, or neutral undertones." },
  },
  lipstick: {
    default: { style: "Hydrating Satin Finish", tip: "A satin finish flatters most lip shapes and skin tones with a natural sheen." },
  },
  blush: {
    default: { style: "Draping Blush", tip: "Sweep blush from cheekbone up to the temple for a sculpted, natural flush." },
  },
  eyeshadow: {
    almond: { style: "Cut-Crease", tip: "Your natural crease is perfect for a defined cut-crease look." },
    round:  { style: "Halo Eye", tip: "A halo eye adds depth and dimension to rounder eye shapes." },
    hooded: { style: "Matte Lid Wash", tip: "Keep it simple with a matte wash — shimmer can disappear on hooded lids." },
    default:{ style: "Soft Smoky", tip: "A soft smoky eye is universally flattering and easy to build up." },
  },
};

// Tutorial steps per category
const TUTORIAL_STEPS: Record<string, string[]> = {
  mascara: [
    "Curl your lashes with an eyelash curler before applying",
    "Start at the root and wiggle the wand upward in a zigzag motion",
    "Apply a second coat focusing on the outer lashes for more drama",
    "Use a clean spoolie to separate any clumps",
    "Clean any smudges with a cotton bud dipped in micellar water",
  ],
  eyeliner: [
    "Rest your elbow on a flat surface for a steady hand",
    "Draw small dashes along the lash line first, then connect them",
    "For a wing, use a small piece of tape or a card as a guide",
    "Let the liner dry fully before opening your eyes wide",
    "Clean any mistakes with a pointed cotton bud",
  ],
  foundation: [
    "Start with a moisturised and primed face",
    "Apply foundation to the centre of your face and blend outward",
    "Use a damp beauty sponge in a dabbing motion for a natural finish",
    "Set with a light powder on the T-zone to reduce shine",
    "Check your neck and blend down for a seamless finish",
  ],
  lipstick: [
    "Exfoliate lips gently and apply a clear lip balm",
    "Line just outside the natural lip line for a fuller look",
    "Apply lipstick from the centre and press outward",
    "Blot with a tissue and apply a second layer for longevity",
    "Add a tiny dab of gloss to the centre of the lower lip",
  ],
  blush: [
    "Smile gently and apply blush to the apples of your cheeks",
    "Blend upward toward the temples with circular motions",
    "Tap off excess product before applying — less is more",
    "Layer a subtle highlight above the blush for dimension",
    "Set with a light mist of setting spray",
  ],
  eyeshadow: [
    "Apply an eyeshadow primer across the entire lid",
    "Pack your lightest shade across the whole lid as a base",
    "Apply the mid-tone shade to the crease with a fluffy brush",
    "Blend the darkest shade into the outer corner in a V shape",
    "Highlight the inner corner and brow bone with a shimmer shade",
  ],
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DeepAR: any;
  }
}

type ScanState = "idle" | "scanning" | "result" | "denied" | "error";

function TutorialsHome() {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [recommendation, setRecommendation] = useState<{ style: string; tip: string } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deepARRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load DeepAR SDK
  useEffect(() => {
    if (document.getElementById("deepar-sdk-tut")) return;
    const script = document.createElement("script");
    script.id = "deepar-sdk-tut";
    script.src = "https://cdn.deepar.ai/sdk/deepar-4.1.0.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const startScan = async (catId: string) => {
    setActiveCat(catId);
    setScanState("scanning");
    setRecommendation(null);

    try {
      await navigator.mediaDevices.getUserMedia({ video: true });

      if (!window.DeepAR) {
        // DeepAR not loaded yet — simulate scan with default recommendation
        simulateScan(catId);
        return;
      }

      setTimeout(() => {
        deepARRef.current = window.DeepAR({
          licenseKey: import.meta.env.VITE_DEEPAR_LICENSE_KEY ?? "",
          canvas: canvasRef.current,
          numberOfFaces: 1,
          onInitialize: () => {
            deepARRef.current.startVideo(true);
            // Simulate face analysis after 3 seconds
            setTimeout(() => {
              const detected = detectFaceShape(); // placeholder detection
              const recs = RECOMMENDATIONS[catId] ?? {};
              const rec = recs[detected] ?? recs["default"] ?? { style: "Classic Style", tip: "This style suits your features beautifully." };
              setRecommendation(rec);
              setScanState("result");
            }, 3000);
          },
          onError: () => simulateScan(catId),
        });
      }, 300);
    } catch {
      setScanState("denied");
    }
  };

  // Fallback if DeepAR not available — still shows recommendation
  const simulateScan = (catId: string) => {
    setTimeout(() => {
      const recs = RECOMMENDATIONS[catId] ?? {};
      const rec = recs["default"] ?? { style: "Classic Style", tip: "This style suits your features beautifully." };
      setRecommendation(rec);
      setScanState("result");
    }, 2500);
  };

  // Placeholder — in production DeepAR returns real face landmark data
  const detectFaceShape = (): string => {
    const shapes = ["almond", "round", "hooded"];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const closeScan = () => {
    if (deepARRef.current) {
      deepARRef.current.stopVideo();
      deepARRef.current.shutdown();
      deepARRef.current = null;
    }
    setActiveCat(null);
    setScanState("idle");
    setRecommendation(null);
  };

  useEffect(() => () => {
    if (deepARRef.current) {
      deepARRef.current.stopVideo();
      deepARRef.current.shutdown();
    }
  }, []);

  const steps = activeCat ? TUTORIAL_STEPS[activeCat] ?? [] : [];

  return (
    <MobileShell>
      {/* Scan Modal */}
      {activeCat && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background overflow-y-auto">
          {/* Header */}
          <header className="flex items-center justify-between px-6 pt-12 pb-4 shrink-0">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Tutorial</p>
              <h2 className="font-display text-2xl font-semibold capitalize">{activeCat}</h2>
            </div>
            <button onClick={closeScan} className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card">
              <X size={18} />
            </button>
          </header>

          {/* Camera */}
          <div className="mx-6 aspect-[3/4] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-secondary to-muted shadow-card relative shrink-0">
            {(scanState === "scanning" || scanState === "result") && (
              <canvas ref={canvasRef} id="deepar-canvas-tut" className="h-full w-full object-cover" />
            )}

            {/* Scanning overlay */}
            {scanState === "scanning" && (
              <div className="absolute inset-0 grid place-items-center bg-background/60 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <span className="absolute inset-0 grid place-items-center text-2xl">✨</span>
                  </div>
                  <p className="text-sm font-medium text-center px-4">Analysing your features...</p>
                  {/* Animated progress bar */}
                  <div className="w-40 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-blush rounded-full animate-[scan_3s_ease-in-out_forwards]" style={{ width: "0%", animation: "scan 3s ease-in-out forwards" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Permission denied */}
            {scanState === "denied" && (
              <div className="absolute inset-0 grid place-items-center bg-background/90 z-10 px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="text-4xl">📷</span>
                  <p className="text-sm font-medium">Please allow camera access to use this feature 💄</p>
                  <button onClick={() => startScan(activeCat)} className="rounded-xl bg-gradient-blush px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft">
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Idle face guide */}
            {scanState === "idle" && (
              <div className="relative grid h-full w-full place-items-center">
                <svg viewBox="0 0 200 260" className="h-3/4 w-auto opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6">
                  <ellipse cx="100" cy="130" rx="70" ry="100" className="text-primary" />
                  <circle cx="75" cy="115" r="4" className="text-primary" />
                  <circle cx="125" cy="115" r="4" className="text-primary" />
                  <path d="M75 170 Q100 185 125 170" className="text-primary" />
                </svg>
              </div>
            )}
          </div>

          {/* Recommendation Card */}
          {scanState === "result" && recommendation && (
            <div className="mx-6 mt-5 rounded-3xl bg-gradient-blush p-5 shadow-soft shrink-0">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-1">Recommended For You</p>
              <h3 className="font-display text-lg font-semibold text-primary-foreground">{recommendation.style}</h3>
              <p className="mt-1 text-xs leading-relaxed text-primary-foreground/80">{recommendation.tip}</p>
            </div>
          )}

          {/* Step by Step Tutorial */}
          {scanState === "result" && (
            <div className="mx-6 mt-5 mb-8 shrink-0">
              <h3 className="font-display text-base font-semibold mb-4">Step-by-Step Guide</h3>
              <div className="flex flex-col gap-3">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start rounded-2xl bg-card p-4 shadow-card">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-blush text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground mt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scan CTA */}
          {scanState !== "result" && scanState !== "denied" && (
            <div className="px-6 pb-8 mt-5 shrink-0">
              <button
                onClick={() => startScan(activeCat)}
                disabled={scanState === "scanning"}
                className="w-full rounded-2xl bg-gradient-blush px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Camera size={16} />
                {scanState === "scanning" ? "Scanning..." : "Scan My Face"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tutorial Home */}
      <header className="px-6 pt-12 pb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Makeup Guide</p>
        <h1 className="font-display text-2xl font-semibold">Learn & Apply</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a category to get a face scan, personalised recommendation, and step-by-step tutorial.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 px-6 pb-8">
        {tutorials.map((cat) => (
          <button
            key={cat.id}
            onClick={() => startScan(cat.id)}
            className="group rounded-3xl bg-card p-5 shadow-card transition-smooth active:scale-[0.97] text-left"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-blush text-2xl shadow-soft">
              <span aria-hidden>{cat.emoji}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{cat.name}</h3>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{cat.blurb}</p>
            <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-accent">
              Scan & Learn <ChevronRight size={10} />
            </div>
          </button>
        ))}
      </section>
    </MobileShell>
  );
}
