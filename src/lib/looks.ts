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
