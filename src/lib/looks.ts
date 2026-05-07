import natural from "@/assets/look-natural.jpg";
import glam from "@/assets/look-glam.jpg";
import bold from "@/assets/look-bold.jpg";
import office from "@/assets/look-office.jpg";
import evening from "@/assets/look-evening.jpg";

export type Category = "Natural" | "Glam" | "Bold" | "Office" | "Evening";

export const looks = [
  { id: "rose-petal", name: "Rose Petal", category: "Natural" as Category, img: natural, tag: "Trending" },
  { id: "midnight-glam", name: "Midnight Glam", category: "Glam" as Category, img: glam, tag: "New" },
  { id: "scarlet-kiss", name: "Scarlet Kiss", category: "Bold" as Category, img: bold },
  { id: "soft-office", name: "Soft Office", category: "Office" as Category, img: office },
  { id: "golden-hour", name: "Golden Hour", category: "Evening" as Category, img: evening, tag: "Editor's Pick" },
  { id: "peach-bloom", name: "Peach Bloom", category: "Natural" as Category, img: natural },
];

export const categories: ("All" | Category)[] = ["All", "Natural", "Glam", "Bold", "Office", "Evening"];

export const occasions = ["All", "Everyday", "Wedding", "Party", "Festival", "Date Night"] as const;
export const colorTones = ["All", "Nude", "Pink", "Red", "Bronze", "Berry", "Coral"] as const;
export const skinTones = ["All", "Fair", "Light", "Medium", "Tan", "Deep"] as const;
export const regions = ["All", "Korean", "Japanese", "Indian", "European", "American", "Middle Eastern"] as const;

export type TutorialCategoryId =
  | "mascara"
  | "foundation"
  | "eyeliner"
  | "lipstick"
  | "blush-contour"
  | "eyeshadow";

export interface TutorialStyle {
  id: string;
  name: string;
  description: string;
  recommendation: string;
  tips: string[];
  steps: { title: string; instruction: string }[];
}

export interface TutorialCategory {
  id: TutorialCategoryId;
  name: string;
  emoji: string;
  blurb: string;
  styles: TutorialStyle[];
}

const mascaraSteps = [
  { title: "Curl your lashes", instruction: "Use a clean lash curler at the root for 10 seconds." },
  { title: "Wiggle from the root", instruction: "Start at the base and zig-zag upward to the tips." },
  { title: "Second coat for volume", instruction: "Apply a second layer while the first is still wet." },
  { title: "Clean smudges", instruction: "Use a cotton bud dipped in micellar water to tidy edges." },
];

export const tutorials: TutorialCategory[] = [
  {
    id: "mascara",
    name: "Mascara",
    emoji: "👁️",
    blurb: "Open up your eyes with the right lash look.",
    styles: [
      { id: "natural", name: "Natural & Subtle", description: "Soft definition for an everyday look.", recommendation: "A featherlight coat enhances lashes without clumps.", tips: ["Use a thin wand", "One coat only", "Focus on outer lashes", "Skip the bottom lashes"], steps: mascaraSteps },
      { id: "volumizing", name: "Volumizing", description: "Bold, fluttery lashes for impact.", recommendation: "Volumizing formulas thicken each lash for drama.", tips: ["Use a thick brush", "Wiggle at the root", "Layer 2–3 coats", "Comb out any clumps"], steps: mascaraSteps },
      { id: "lengthening", name: "Lengthening", description: "Stretch lashes skyward.", recommendation: "Based on your eye shape, lengthening mascara opens up your eyes the most.", tips: ["Use a fiber formula", "Tip-only application", "Curl first", "Apply 2 coats"], steps: mascaraSteps },
      { id: "dramatic", name: "Dramatic & Bold", description: "Inky, full-on lashes.", recommendation: "Pair with eyeliner for a striking finish.", tips: ["Use jet-black formula", "Layer wet on wet", "Add lower lashes", "Set with primer"], steps: mascaraSteps },
      { id: "lifted", name: "Curled & Lifted", description: "A wide-eyed, doll-like lift.", recommendation: "Heated curlers hold the lift longer.", tips: ["Warm curler with dryer", "Pulse 3 times", "Use waterproof formula", "Set with clear gel"], steps: mascaraSteps },
    ],
  },
  {
    id: "foundation",
    name: "Foundation",
    emoji: "🌸",
    blurb: "Find your perfect base.",
    styles: [
      { id: "dewy", name: "Dewy Glow", description: "Lit-from-within radiance.", recommendation: "Hydrating tints suit normal–dry skin.", tips: ["Prep with serum", "Use damp sponge", "Skip powder", "Highlight high points"], steps: mascaraSteps },
      { id: "matte", name: "Soft Matte", description: "Smooth, blurred finish.", recommendation: "Great for oily skin and humid days.", tips: ["Use mattifying primer", "Buff with brush", "Set T-zone", "Touch up with blot paper"], steps: mascaraSteps },
      { id: "sheer", name: "Sheer & Skin-like", description: "Barely-there coverage.", recommendation: "Lightweight tints let freckles shine.", tips: ["Apply with fingers", "Spot-conceal only", "Skip full face", "Add cream blush"], steps: mascaraSteps },
      { id: "full", name: "Full Coverage", description: "Flawless, photo-ready base.", recommendation: "Build in thin layers for a natural finish.", tips: ["Use stippling brush", "Layer slowly", "Set with powder", "Bake under eyes"], steps: mascaraSteps },
    ],
  },
  {
    id: "eyeliner",
    name: "Eyeliner",
    emoji: "✒️",
    blurb: "Define your eye shape.",
    styles: [
      { id: "tightline", name: "Tightline", description: "Subtle definition at the lash line.", recommendation: "Makes lashes look fuller without obvious liner.", tips: ["Use waterproof pencil", "Lift upper lid", "Press into lashes", "Smudge gently"], steps: mascaraSteps },
      { id: "winged", name: "Classic Winged", description: "Timeless feline flick.", recommendation: "Lift the wing to follow the lower lash line.", tips: ["Use tape as guide", "Draw outline first", "Fill in", "Clean up with concealer"], steps: mascaraSteps },
      { id: "smoked", name: "Smoked Liner", description: "Soft, smoldering effect.", recommendation: "Smudge while still tacky for the best blend.", tips: ["Use kohl pencil", "Smudge with brush", "Layer shadow on top", "Set with matte black"], steps: mascaraSteps },
      { id: "graphic", name: "Graphic Liner", description: "Editorial, bold shapes.", recommendation: "Plan with a light pencil sketch first.", tips: ["Use liquid liner", "Steady your elbow", "Use small strokes", "Build slowly"], steps: mascaraSteps },
    ],
  },
  {
    id: "lipstick",
    name: "Lipstick",
    emoji: "💄",
    blurb: "From soft tints to bold statements.",
    styles: [
      { id: "nude", name: "Everyday Nude", description: "Your-lips-but-better.", recommendation: "Pick a shade one tone deeper than your lips.", tips: ["Exfoliate first", "Line lightly", "Blot for staying power", "Add gloss for shine"], steps: mascaraSteps },
      { id: "red", name: "Classic Red", description: "Power-pout perfection.", recommendation: "Blue-reds brighten your smile.", tips: ["Line precisely", "Use a brush", "Blot and reapply", "Clean edges"], steps: mascaraSteps },
      { id: "berry", name: "Berry Stain", description: "Diffused, lived-in color.", recommendation: "Tap with fingers for a soft wash.", tips: ["Apply to lip center", "Blend outward", "Add balm", "Reapply midday"], steps: mascaraSteps },
      { id: "glossy", name: "Glossy Pink", description: "Juicy, plump finish.", recommendation: "Use plumping gloss over a tint base.", tips: ["Tint first", "Layer gloss", "Top middle for fullness", "Avoid overlining"], steps: mascaraSteps },
    ],
  },
  {
    id: "blush-contour",
    name: "Blush & Contour",
    emoji: "🍑",
    blurb: "Sculpt and warm up your features.",
    styles: [
      { id: "soft-flush", name: "Soft Flush", description: "Innocent, pinched-cheek glow.", recommendation: "Cream blush melts seamlessly into skin.", tips: ["Apply to apples", "Tap with fingers", "Layer slowly", "Set with powder"], steps: mascaraSteps },
      { id: "draped", name: "Draped Blush", description: "Sculpts as it warms.", recommendation: "Draw blush up toward the temple.", tips: ["Use a fluffy brush", "Sweep up and out", "Layer with bronzer", "Blend edges"], steps: mascaraSteps },
      { id: "snatched", name: "Snatched Contour", description: "Defined cheekbones.", recommendation: "Cool-toned contour mimics a real shadow.", tips: ["Find your hollow", "Use angled brush", "Diffuse hard lines", "Add highlight on top"], steps: mascaraSteps },
      { id: "sunkissed", name: "Sun-kissed", description: "Warm, just-back-from-vacation flush.", recommendation: "Warm bronzer + peach blush balances cool skin.", tips: ["Bronze the 3", "Add peach to apples", "Highlight nose tip", "Set with mist"], steps: mascaraSteps },
    ],
  },
  {
    id: "eyeshadow",
    name: "Eyeshadow",
    emoji: "🎨",
    blurb: "Color, depth and dimension.",
    styles: [
      { id: "neutral-wash", name: "Neutral Wash", description: "One-shadow soft eye.", recommendation: "A taupe wash brightens any eye color.", tips: ["Use one shade", "Blend in circles", "Stop at the crease", "Add mascara"], steps: mascaraSteps },
      { id: "smoky", name: "Smoky Eye", description: "Sultry blended depth.", recommendation: "Blend, blend, blend — no harsh edges.", tips: ["Start light", "Build dark in outer V", "Smudge along bottom", "Highlight inner corner"], steps: mascaraSteps },
      { id: "halo", name: "Halo Eye", description: "Spotlight on the lid center.", recommendation: "A shimmer center makes eyes look rounder.", tips: ["Dark on inner & outer", "Shimmer in center", "Pat with finger", "Wing out subtly"], steps: mascaraSteps },
      { id: "monochrome", name: "Monochrome Pop", description: "One bold color all over.", recommendation: "Pair with skin-toned lip and lots of mascara.", tips: ["Prime the lid", "Pack color flat", "Blend edges only", "Keep brows clean"], steps: mascaraSteps },
    ],
  },
];
