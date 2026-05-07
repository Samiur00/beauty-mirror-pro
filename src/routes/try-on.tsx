import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw, Sparkles, X } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { looks } from "@/lib/looks";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/try-on")({
  head: () => ({
    meta: [
      { title: "Try On — Lumière" },
      { name: "description", content: "Try makeup looks live with our AR camera." },
    ],
  }),
  component: TryOn,
});

// DeepAR effect placeholder paths — replace with your real DeepAR effect files
const EFFECT_MAP: Record<string, string> = {
  "natural-glow": "/effects/natural_glow.deepar",
  "soft-glam": "/effects/soft_glam.deepar",
  "bold-eye": "/effects/bold_eye.deepar",
  "nude-lip": "/effects/nude_lip.deepar",
  "dewy-skin": "/effects/dewy_skin.deepar",
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DeepAR: any;
  }
}

function TryOn() {
  const [selected, setSelected] = useState(looks[0].id);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [deepARReady, setDeepARReady] = useState(false);
  const [sdkError, setSdkError] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deepARRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load DeepAR SDK script dynamically
  useEffect(() => {
    if (document.getElementById("deepar-sdk")) return;
    const script = document.createElement("script");
    script.id = "deepar-sdk";
    script.src = "https://cdn.deepar.ai/sdk/deepar-4.1.0.js";
    script.async = true;
    script.onload = () => console.log("DeepAR SDK loaded");
    script.onerror = () => setSdkError(true);
    document.head.appendChild(script);
  }, []);

  const startCamera = async () => {
    setLoading(true);
    setPermissionDenied(false);

    try {
      // Check camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });

      if (!window.DeepAR) {
        setSdkError(true);
        setLoading(false);
        return;
      }

      setCameraActive(true);

      // Short delay to let canvas render
      setTimeout(() => {
        deepARRef.current = window.DeepAR({
          licenseKey: import.meta.env.VITE_DEEPAR_LICENSE_KEY ?? "",
          canvas: canvasRef.current,
          numberOfFaces: 1,
          onInitialize: () => {
            deepARRef.current.startVideo(true);
            setDeepARReady(true);
            setLoading(false);
            // Apply first selected effect
            const effectPath = EFFECT_MAP[selected];
            if (effectPath) deepARRef.current.switchEffect(0, "slot", effectPath);
          },
          onError: (err: string) => {
            console.error("DeepAR error:", err);
            setSdkError(true);
            setLoading(false);
          },
        });
      }, 300);
    } catch {
      setPermissionDenied(true);
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (deepARRef.current) {
      deepARRef.current.stopVideo();
      deepARRef.current.shutdown();
      deepARRef.current = null;
    }
    setCameraActive(false);
    setDeepARReady(false);
    setLoading(false);
  };

  const applyEffect = (lookId: string) => {
    setSelected(lookId);
    if (deepARRef.current && deepARReady) {
      const effectPath = EFFECT_MAP[lookId] ?? EFFECT_MAP["natural-glow"];
      deepARRef.current.switchEffect(0, "slot", effectPath);
    }
  };

  // Cleanup on unmount
  useEffect(() => () => stopCamera(), []);

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Studio</p>
          <h1 className="font-display text-2xl font-semibold">Try It On</h1>
        </div>
        {cameraActive ? (
          <button
            onClick={stopCamera}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card transition-smooth active:scale-95"
          >
            <X size={18} />
          </button>
        ) : (
          <button
            onClick={startCamera}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-card shadow-card transition-smooth active:scale-95"
          >
            <RefreshCw size={18} />
          </button>
        )}
      </header>

      {/* Camera / Placeholder area */}
      <div className="mx-6 mt-2 aspect-[3/4] overflow-hidden rounded-[2rem] border border-border bg-gradient-to-b from-secondary to-muted shadow-card relative">

        {/* DeepAR Canvas — always mounted when camera is active */}
        {cameraActive && (
          <canvas
            ref={canvasRef}
            id="deepar-canvas"
            className="h-full w-full object-cover"
          />
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs font-medium text-muted-foreground">Scanning your face...</p>
            </div>
          </div>
        )}

        {/* Permission denied message */}
        {permissionDenied && (
          <div className="absolute inset-0 grid place-items-center bg-background/90 z-10 px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-4xl">📷</span>
              <p className="text-sm font-medium">Please allow camera access to use this feature 💄</p>
              <button
                onClick={startCamera}
                className="rounded-xl bg-gradient-blush px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* SDK error message */}
        {sdkError && (
          <div className="absolute inset-0 grid place-items-center bg-background/90 z-10 px-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl">⚠️</span>
              <p className="text-sm font-medium">AR could not load. Please check your licence key or connection.</p>
            </div>
          </div>
        )}

        {/* Idle placeholder — shown before camera starts */}
        {!cameraActive && !loading && !permissionDenied && !sdkError && (
          <div className="relative grid h-full w-full place-items-center">
            <svg viewBox="0 0 200 260" className="h-3/4 w-auto opacity-50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6">
              <ellipse cx="100" cy="130" rx="70" ry="100" className="text-primary" />
              <circle cx="75" cy="115" r="4" className="text-primary" />
              <circle cx="125" cy="115" r="4" className="text-primary" />
              <path d="M75 170 Q100 185 125 170" className="text-primary" />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <p className="text-xs font-medium">Tap "Start Camera" to begin</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-primary/20" />
          </div>
        )}
      </div>

      {/* Look selector */}
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
                onClick={() => applyEffect(look.id)}
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

      {/* CTA button */}
      <div className="mt-6 px-6 pb-6">
        {!cameraActive ? (
          <button
            onClick={startCamera}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-blush px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth active:scale-[0.98] disabled:opacity-60"
          >
            Start Camera ✨
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="w-full rounded-2xl bg-card border border-border px-6 py-4 text-sm font-semibold shadow-soft transition-smooth active:scale-[0.98]"
          >
            Stop Camera
          </button>
        )}
      </div>
    </MobileShell>
  );
}
