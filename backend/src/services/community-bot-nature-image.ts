import {
  fetchGoogleDiagrams,
  hostOf,
  type GoogleDiagram,
} from "../ai/media/google-diagrams.js";

export type NatureScene = {
  title: string;
  body: string;
  category: string;
  /** Google image search phrase (Custom Search JSON API). */
  searchQuery: string;
  terms: string[];
  fallbackImage: string;
};

/** Rotates daily — one scene per calendar day (UTC bucket). */
export const NATURE_SCENES: ReadonlyArray<NatureScene> = [
  {
    title: "Pacific dawn",
    searchQuery: "Pacific ocean sunrise seascape",
    terms: ["ocean", "pacific", "sea", "coast"],
    category: "general",
    fallbackImage: "/community/vibes/dawn.svg",
    body: "Wide horizons calm racing thoughts. Before you study, take two slow breaths — then tackle one topic, not five.",
  },
  {
    title: "Amazon canopy",
    searchQuery: "Amazon rainforest canopy aerial",
    terms: ["amazon", "rainforest", "jungle", "forest"],
    category: "biology",
    fallbackImage: "/community/vibes/wildflower.svg",
    body: "Layers in a forest mirror layers in biology — structure first, then function. Sketch one system today (leaf, heart, circuit).",
  },
  {
    title: "Iceland fjord",
    searchQuery: "Iceland fjord glacier landscape",
    terms: ["iceland", "fjord", "glacier", "arctic"],
    category: "general",
    fallbackImage: "/community/vibes/himalaya.svg",
    body: "Cold air sharpens focus — use a fresh morning block for maths or physics while the day is still quiet.",
  },
  {
    title: "Redwood grove",
    searchQuery: "redwood forest California tall trees",
    terms: ["redwood", "forest", "trees", "grove"],
    category: "general",
    fallbackImage: "/community/vibes/wildflower.svg",
    body: "Tall goals grow from deep roots: one past question, one diagram, one definition — repeated daily.",
  },
  {
    title: "Coral reef",
    searchQuery: "tropical coral reef underwater clear water",
    terms: ["coral", "reef", "ocean", "marine"],
    category: "biology",
    fallbackImage: "/community/vibes/monsoon.svg",
    body: "Ecosystems link every topic — trace one food chain or energy flow from your syllabus notes.",
  },
  {
    title: "Sahara dunes",
    searchQuery: "Sahara desert sand dunes sunset",
    terms: ["desert", "dunes", "sahara", "sand"],
    category: "geography",
    fallbackImage: "/community/vibes/himalaya.svg",
    body: "Heat waves distort vision — like fuzzy formulas. Write the equation cleanly; units are non‑negotiable.",
  },
  {
    title: "Norwegian fjords",
    searchQuery: "Norway fjord mountains reflection water",
    terms: ["norway", "fjord", "mountain", "lake"],
    category: "general",
    fallbackImage: "/community/vibes/himalaya.svg",
    body: "Steep slopes need steady steps. Pick one chapter for depth review instead of skimming a whole book.",
  },
  {
    title: "Himalayan peaks",
    searchQuery: "Himalaya mountain range snow peaks Nepal",
    terms: ["himalaya", "mountain", "snow", "nepal"],
    category: "nepali",
    fallbackImage: "/community/vibes/himalaya.svg",
    body: "Exam week is a climb, not a sprint. Sleep, hydration, and one honest mock beat an all‑night cram.",
  },
  {
    title: "Monsoon valley",
    searchQuery: "monsoon valley mist Nepal hills green",
    terms: ["monsoon", "valley", "mist", "hills"],
    category: "nepali",
    fallbackImage: "/community/vibes/monsoon.svg",
    body: "Rainy afternoons suit 25‑minute revision sprints — one topic, then tea. Hydration matters in humidity.",
  },
  {
    title: "Bamboo forest",
    searchQuery: "bamboo forest Japan path green",
    terms: ["bamboo", "forest", "green", "path"],
    category: "general",
    fallbackImage: "/community/vibes/wildflower.svg",
    body: "Flexible stems survive wind — flexible study plans survive a busy week. Block time, then protect it.",
  },
  {
    title: "Arctic ice",
    searchQuery: "Arctic iceberg blue ice ocean",
    terms: ["arctic", "ice", "iceberg", "polar"],
    category: "physics",
    fallbackImage: "/community/vibes/himalaya.svg",
    body: "Phase changes hide in plain sight — tie today's chemistry lesson to melting ice and energy transfer.",
  },
  {
    title: "Savanna sunset",
    searchQuery: "African savanna acacia sunset wildlife",
    terms: ["savanna", "africa", "sunset", "grassland"],
    category: "biology",
    fallbackImage: "/community/vibes/dawn.svg",
    body: "Adaptation is survival — notice how one species fits its niche, then compare to a syllabus example.",
  },
  {
    title: "Alpine meadow",
    searchQuery: "alpine meadow wildflowers mountains summer",
    terms: ["alpine", "meadow", "wildflower", "mountain"],
    category: "biology",
    fallbackImage: "/community/vibes/wildflower.svg",
    body: "Symmetry in petals echoes symmetry in molecules. A quick sketch locks memory better than passive rereading.",
  },
  {
    title: "Great Barrier Reef",
    searchQuery: "Great Barrier Reef aerial turquoise",
    terms: ["barrier", "reef", "australia", "ocean"],
    category: "biology",
    fallbackImage: "/community/vibes/monsoon.svg",
    body: "Biodiversity needs balance — balance your subjects too; don't neglect the one that feels hardest.",
  },
  {
    title: "Patagonia peaks",
    searchQuery: "Patagonia mountains lake Chile Argentina",
    terms: ["patagonia", "andes", "lake", "mountain"],
    category: "general",
    fallbackImage: "/community/vibes/himalaya.svg",
    body: "Winds shift fast — like finally grasping a formula. Teach it aloud once; stumbling shows the gap.",
  },
  {
    title: "Terrace fields",
    searchQuery: "rice terrace Nepal green hills agriculture",
    terms: ["terrace", "rice", "nepal", "fields"],
    category: "nepali",
    fallbackImage: "/community/vibes/terrace.svg",
    body: "Terraces turn slopes into steps — turn your syllabus into weekly steps, not one scary cliff.",
  },
  {
    title: "Northern lights",
    searchQuery: "aurora borealis night sky Iceland",
    terms: ["aurora", "northern", "lights", "night"],
    category: "physics",
    fallbackImage: "/community/vibes/dawn.svg",
    body: "Charged particles paint the sky — a reminder that electromagnetism is not abstract. Draw one field line set.",
  },
  {
    title: "Mangrove coast",
    searchQuery: "mangrove forest coastal roots water",
    terms: ["mangrove", "coastal", "wetland", "roots"],
    category: "biology",
    fallbackImage: "/community/vibes/monsoon.svg",
    body: "Roots stabilize shorelines — your basics stabilize every advanced problem. Review fundamentals weekly.",
  },
  {
    title: "Scottish highlands",
    searchQuery: "Scottish highlands green hills loch fog",
    terms: ["highlands", "scotland", "loch", "hills"],
    category: "english",
    fallbackImage: "/community/vibes/terrace.svg",
    body: "Read one short paragraph aloud for English fluency — tone and pacing beat silent skimming.",
  },
  {
    title: "Kerala backwaters",
    searchQuery: "Kerala backwaters palm trees canal India",
    terms: ["kerala", "backwater", "canal", "palm"],
    category: "general",
    fallbackImage: "/community/vibes/monsoon.svg",
    body: "Still water reflects clearly — rewrite one definition in your own words to see if you truly understand.",
  },
] as const;

export function natureSceneForUtcDay(now = new Date()): NatureScene {
  const day = Math.floor(now.getTime() / 86_400_000);
  return NATURE_SCENES[Math.abs(day) % NATURE_SCENES.length]!;
}

export function formatNaturePostMarkdown(scene: NatureScene, image: GoogleDiagram | null): string {
  const src = image?.url ?? scene.fallbackImage;
  const alt = image?.title?.trim() || scene.title;
  const caption = image?.page
    ? `\n\n*Photo reference via ${hostOf(image.page)} — Google Images (Custom Search).*`
    : "\n\n*Study pause — local scenic placeholder (add GOOGLE_CSE_API_KEY for live nature photos).*";
  return `![${alt}](${src} "${scene.title}")\n\n${scene.body}${caption}`;
}

/** One large nature photo per day; falls back to bundled SVG when CSE is off or errors. */
export async function fetchDailyNatureImage(scene: NatureScene): Promise<GoogleDiagram | null> {
  try {
    const images = await fetchGoogleDiagrams(
      `${scene.searchQuery} high resolution nature photography`,
      scene.terms,
      1,
      { requireRelevance: false },
    );
    return images[0] ?? null;
  } catch {
    return null;
  }
}