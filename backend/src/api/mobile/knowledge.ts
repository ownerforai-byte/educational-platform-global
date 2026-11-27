import { Router, type Request, type Response } from "express";

/**
 * Wave 2 GK bank endpoints — Loksewa and World Knowledge.
 * Data mirrors frontend/features/knowledge/data.ts exactly (parity rule).
 * Shape: { ok: true, data: ... } mobile-v1 envelope.
 */
const router = Router();

// ── Types ───────────────────────────────────────────────────────────────────
interface KnowledgeTopic {
  id: string;
  title: string;
  points: string[];
}

interface KnowledgeNote {
  topicId: string;
  title: string;
  summary: string;
  facts: string[];
}

interface KnowledgePracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface KnowledgeSection {
  slug: string;
  name: string;
  description: string;
  basePath: string;
  topics: KnowledgeTopic[];
  notes?: KnowledgeNote[];
  practice?: KnowledgePracticeQuestion[];
}

// ── Loksewa data (verbatim from frontend/features/knowledge/data.ts) ────────
const LOKSEWA_SECTIONS: KnowledgeSection[] = [
  {
    slug: "geography-of-nepal",
    name: "Geography of Nepal",
    description: "Physical features, climate, rivers, mountains, and administrative divisions of Nepal.",
    basePath: "/loksewa/geography-of-nepal",
    topics: [
      { id: "physical-features", title: "Physical features", points: ["Himalayan, Hilly, and Terai regions", "Major mountain peaks and ranges", "River systems and watersheds", "Lakes and wetlands"] },
      { id: "climate-and-resources", title: "Climate and natural resources", points: ["Climatic zones of Nepal", "Monsoon pattern", "Forests and biodiversity zones", "Minerals and energy resources"] },
      { id: "administrative-geography", title: "Administrative geography", points: ["Provinces and districts", "Population distribution", "Urban and rural settlement", "Border and neighboring countries"] },
    ],
    notes: [
      { topicId: "physical-features", title: "Ecological Belts, Peaks & River Systems", summary: "Nepal covers 147,516 km² across three distinct ecological zones.", facts: ["Highest point: Mt. Everest (8,848.86 m). Lowest: Kechana Kawal (58 m).", "8 of the world's 14 peaks above 8,000 m lie within Nepal.", "Three major river systems: Koshi, Gandaki/Narayani, and Karnali.", "Major lakes: Tilicho, Rara (largest), Shey Phoksundo (deepest)."] },
      { topicId: "climate-and-resources", title: "Climatic Belts & Natural Resources", summary: "Five distinct climatic zones from subtropical to alpine and arctic tundra.", facts: ["Over 80% of annual precipitation during summer monsoon (June–Sept).", "Forest cover approximately 45.31% of territory.", "Hydroelectricity potential over 42,000 MW."] },
      { topicId: "administrative-geography", title: "Provinces, Districts & Boundaries", summary: "Three-tier federal structure: Federal, 7 Provinces, 753 Local Units.", facts: ["7 Provinces and 77 administrative districts.", "1,880 km border with India, 1,414 km with China."] },
    ],
    practice: [
      { id: "geo-q1", question: "What is the lowest geographical elevation point in Nepal?", options: ["Kechana Kawal (Jhapa)", "Mukhiya Patti (Dhanusha)", "Lumbini (Rupandehi)", "Biratnagar (Morang)"], correctIndex: 0, explanation: "Kechana Kawal in Jhapa district is at 58 meters above sea level." },
      { id: "geo-q2", question: "Which is the longest river flowing entirely within Nepal?", options: ["Koshi", "Karnali", "Gandaki", "Bagmati"], correctIndex: 1, explanation: "The Karnali is the longest at 507 km within Nepal." },
    ],
  },
  {
    slug: "history",
    name: "Loksewa History",
    description: "Ancient, medieval, and modern history of Nepal and the region.",
    basePath: "/loksewa/history",
    topics: [
      { id: "ancient-nepal", title: "Ancient Nepal", points: ["Kirat dynasty", "Licchavi period", "Early settlements and trade routes"] },
      { id: "medieval-nepal", title: "Medieval Nepal", points: ["Malla kingdoms", "Three kingdoms of Kathmandu Valley", "Art, culture, and architecture"] },
      { id: "modern-nepal", title: "Modern Nepal", points: ["Shah dynasty unification", "Rana regime", "Democratic movements and Constitution of 2072"] },
    ],
    notes: [
      { topicId: "ancient-nepal", title: "Kirat & Licchavi Periods", summary: "The earliest documented dynasties of Nepal.", facts: ["Kirat dynasty: 29 kings, Yalambar the first.", "Licchavi period (c. 400–750 CE): golden age of art and inscriptions.", "Changu Narayan temple inscription (464 CE) — oldest stone inscription in Nepal."] },
      { topicId: "modern-nepal", title: "Unification to Republic", summary: "From Shah dynasty to federal democratic republic.", facts: ["Prithvi Narayan Shah unified small kingdoms into modern Nepal (1743–1775).", "104 years of Rana autocracy (1846–1951).", "Constitution of Nepal 2072 (2015) established a federal democratic republic with 7 provinces."] },
    ],
    practice: [
      { id: "hist-q1", question: "Who is credited with the unification of modern Nepal?", options: ["Prithvi Narayan Shah", "Jaya Prakash Malla", "Jung Bahadur Rana", "Ram Shah"], correctIndex: 0, explanation: "Prithvi Narayan Shah led the campaign to unify the Gorkha kingdom into Nepal." },
    ],
  },
  {
    slug: "environment",
    name: "Loksewa Environment",
    description: "Environmental science, conservation, and sustainable development in Nepal.",
    basePath: "/loksewa/environment",
    topics: [
      { id: "biodiversity", title: "Biodiversity and conservation", points: ["National parks and reserves", "Endangered species", "Community forestry model"] },
      { id: "pollution", title: "Pollution and waste", points: ["Air quality in Kathmandu Valley", "River pollution", "Solid waste management"] },
      { id: "climate-change", title: "Climate change impact", points: ["Glacial lake outburst floods (GLOFs)", "Impact on agriculture", "Nepal's adaptation strategies"] },
    ],
    notes: [
      { topicId: "biodiversity", title: "Protected Areas & Conservation", summary: "Nepal has 20 protected areas covering about 23.39% of the country.", facts: ["12 national parks, 1 wildlife reserve, 6 conservation areas, 1 hunting reserve.", "Chitwan National Park — first national park (1973), UNESCO World Heritage.", "One-horned rhinoceros, Bengal tiger, red panda, snow leopard among protected species."] },
      { topicId: "climate-change", title: "Climate Vulnerability & Adaptation", summary: "Nepal ranks as one of the most vulnerable countries to climate change.", facts: ["Over 2,070 glacial lakes identified; 21 classified as potentially dangerous.", "Agriculture employs ~65% of the population and is highly climate-sensitive."] },
    ],
    practice: [
      { id: "env-q1", question: "Which was Nepal's first national park?", options: ["Sagarmatha", "Chitwan", "Langtang", "Bardia"], correctIndex: 1, explanation: "Chitwan National Park was established in 1973 as Nepal's first national park." },
    ],
  },
];

// ── World Knowledge data ────────────────────────────────────────────────────
const WORLD_KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    description: "Facts, figures, and essential knowledge for competitive exams.",
    basePath: "/world-knowledge/general-knowledge",
    topics: [
      { id: "nepal-facts", title: "Nepal facts", points: ["Geography, population, provinces", "Constitution and governance", "Economy and trade"] },
      { id: "world-facts", title: "World facts", points: ["Continents and oceans", "Major economies", "International organizations"] },
      { id: "science-tech", title: "Science and technology", points: ["Space exploration milestones", "Nobel Prize winners in science", "Digital and AI landmarks"] },
    ],
    notes: [
      { topicId: "nepal-facts", title: "Nepal at a Glance", summary: "Key facts about Nepal for competitive exams.", facts: ["Capital: Kathmandu. Area: 147,516 km². Population: ~30 million.", "7 Provinces, 77 districts, 753 local units.", "Currency: Nepalese Rupee (NPR). GDP: ~$40 billion."] },
      { topicId: "world-facts", title: "World Geography & Economy", summary: "Essential world facts.", facts: ["7 continents, 5 oceans. 195 countries recognized by the UN.", "Top economies by GDP: USA, China, Japan, Germany, India."] },
    ],
    practice: [
      { id: "gk-q1", question: "How many provinces does Nepal have under the 2015 Constitution?", options: ["5", "6", "7", "8"], correctIndex: 2, explanation: "The Constitution of Nepal 2072 (2015) established 7 provinces." },
    ],
  },
  {
    slug: "current-affairs",
    name: "Current Affairs",
    description: "Recent national and international events and developments.",
    basePath: "/world-knowledge/current-affairs",
    topics: [
      { id: "nepal-current", title: "Nepal current affairs", points: ["Recent government policies", "Infrastructure projects", "Education reforms"] },
      { id: "world-current", title: "World current affairs", points: ["International summits", "Global health updates", "Technology and innovation"] },
    ],
    notes: [
      { topicId: "nepal-current", title: "Nepal Recent Developments", summary: "Key developments in Nepal.", facts: ["Nepal's electricity export agreement with Bangladesh signed in 2024.", "Pokhara International Airport inaugurated as Nepal's second international airport."] },
      { topicId: "world-current", title: "Global Headlines", summary: "Major international developments.", facts: ["COP summits continue to push climate commitments.", "AI governance frameworks being established worldwide."] },
    ],
    practice: [
      { id: "ca-q1", question: "Which country signed a tripartite agreement with Nepal and India for electricity transmission?", options: ["Bhutan", "Bangladesh", "Sri Lanka", "Maldives"], correctIndex: 1, explanation: "Nepal, India, and Bangladesh signed the agreement in 2024 to export 40 MW." },
    ],
  },
  {
    slug: "global-topics",
    name: "Global Topics",
    description: "International issues, treaties, and world organizations.",
    basePath: "/world-knowledge/global-topics",
    topics: [
      { id: "organizations", title: "World organizations", points: ["UN system", "SAARC, BIMSTEC, and regional bodies", "WTO, IMF, and World Bank"] },
      { id: "global-challenges", title: "Global challenges", points: ["Climate agreements", "Human rights", "Sustainable development goals"] },
    ],
    notes: [
      { topicId: "organizations", title: "The United Nations System & Regional Blocs", summary: "Global cooperation institutions.", facts: ["UN: 193 member states, 6 principal organs.", "SAARC Secretariat in Kathmandu, Nepal.", "IMF and World Bank (Bretton Woods, 1944) in Washington, D.C."] },
      { topicId: "global-challenges", title: "SDGs & Treaties", summary: "The 2030 Agenda and environmental treaties.", facts: ["17 SDGs adopted in 2015 by all 193 UN members.", "Paris Climate Agreement (COP21, 2015): limit warming to 1.5°C."] },
    ],
    practice: [
      { id: "glob-q1", question: "Where is the SAARC Secretariat located?", options: ["Dhaka", "New Delhi", "Kathmandu", "Colombo"], correctIndex: 2, explanation: "The SAARC Secretariat is in Kathmandu, Nepal." },
      { id: "glob-q2", question: "How many SDGs were established under the UN 2030 Agenda?", options: ["8", "12", "15", "17"], correctIndex: 3, explanation: "17 Sustainable Development Goals with 169 targets." },
    ],
  },
];

// ── Loksewa routes ──────────────────────────────────────────────────────────
router.get("/loksewa", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  const sections = LOKSEWA_SECTIONS.map(({ slug, name, description, basePath, topics }) => ({
    slug, name, description, basePath, topicCount: topics.length,
  }));
  res.json({ ok: true, data: { sections } });
});

router.get("/loksewa/:slug", (req: Request, res: Response) => {
  const section = LOKSEWA_SECTIONS.find((s) => s.slug === req.params.slug);
  if (!section) {
    res.status(404).json({ ok: false, error: "Section not found" });
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({ ok: true, data: section });
});

// ── World Knowledge routes ──────────────────────────────────────────────────
router.get("/world-knowledge", (_req: Request, res: Response) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  const sections = WORLD_KNOWLEDGE_SECTIONS.map(({ slug, name, description, basePath, topics }) => ({
    slug, name, description, basePath, topicCount: topics.length,
  }));
  res.json({ ok: true, data: { sections } });
});

router.get("/world-knowledge/:slug", (req: Request, res: Response) => {
  const section = WORLD_KNOWLEDGE_SECTIONS.find((s) => s.slug === req.params.slug);
  if (!section) {
    res.status(404).json({ ok: false, error: "Section not found" });
    return;
  }
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({ ok: true, data: section });
});

export default router;
