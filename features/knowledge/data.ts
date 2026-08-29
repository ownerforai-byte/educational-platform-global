export type KnowledgeTopic = {
  id: string;
  title: string;
  points: string[];
};

export type KnowledgeSection = {
  slug: string;
  name: string;
  description: string;
  basePath: string;
  topics: KnowledgeTopic[];
};

export const LOKSEWA_SECTIONS: KnowledgeSection[] = [
  {
    slug: "geography-of-nepal",
    name: "Geography of Nepal",
    description:
      "Physical features, climate, rivers, mountains, and administrative divisions of Nepal.",
    basePath: "/loksewa/geography-of-nepal",
    topics: [
      {
        id: "physical-features",
        title: "Physical features",
        points: [
          "Himalayan, Hilly, and Terai regions",
          "Major mountain peaks and ranges",
          "River systems and watersheds",
          "Lakes and wetlands",
        ],
      },
      {
        id: "climate-and-resources",
        title: "Climate and natural resources",
        points: [
          "Climatic zones of Nepal",
          "Monsoon pattern",
          "Forests and biodiversity zones",
          "Minerals and energy resources",
        ],
      },
      {
        id: "administrative-geography",
        title: "Administrative geography",
        points: [
          "Provinces and districts",
          "Population distribution",
          "Urban and rural settlement",
          "Border and neighboring countries",
        ],
      },
    ],
  },
  {
    slug: "history",
    name: "History",
    description:
      "Nepalese history from ancient kingdoms to modern democratic movements.",
    basePath: "/loksewa/history",
    topics: [
      {
        id: "ancient-and-medieval",
        title: "Ancient and medieval Nepal",
        points: [
          "Kirata, Lichhavi, and Malla periods",
          "Kathmandu Valley civilization",
          "Unification under Prithvi Narayan Shah",
        ],
      },
      {
        id: "modern-nepal",
        title: "Modern Nepal",
        points: [
          "Rana rule",
          "Democratic movements",
          "Constitutional development",
          "Republic of Nepal",
        ],
      },
    ],
  },
  {
    slug: "environment",
    name: "Environment",
    description:
      "Biodiversity, conservation, climate change, and environmental policy in Nepal.",
    basePath: "/loksewa/environment",
    topics: [
      {
        id: "biodiversity",
        title: "Biodiversity and conservation",
        points: [
          "Protected areas and national parks",
          "Endangered species",
          "Community forestry",
        ],
      },
      {
        id: "climate-policy",
        title: "Climate and policy",
        points: [
          "Climate change impacts in Nepal",
          "Pollution and waste management",
          "Environmental laws and institutions",
        ],
      },
    ],
  },
];

export const WORLD_KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    description: "Core GK across science, history, geography, and culture.",
    basePath: "/world-knowledge/general-knowledge",
    topics: [
      {
        id: "science-and-tech",
        title: "Science and technology",
        points: ["Basic physics and chemistry facts", "Human body and health", "Inventions and discoveries"],
      },
      {
        id: "world-geography",
        title: "World geography",
        points: ["Continents and oceans", "Capitals and currencies", "Major landmarks"],
      },
      {
        id: "culture-and-society",
        title: "Culture and society",
        points: ["World religions", "Sports and awards", "International organizations"],
      },
    ],
  },
  {
    slug: "current-affairs",
    name: "Current Affairs",
    description: "Recent national and global developments for exam readiness.",
    basePath: "/world-knowledge/current-affairs",
    topics: [
      {
        id: "national-affairs",
        title: "National affairs",
        points: ["Governance and policy updates", "Economy and development", "Education and health"],
      },
      {
        id: "international-affairs",
        title: "International affairs",
        points: ["Global summits", "Treaties and diplomacy", "Major world events"],
      },
    ],
  },
  {
    slug: "global-topics",
    name: "Global Topics",
    description: "International issues, treaties, and world organizations.",
    basePath: "/world-knowledge/global-topics",
    topics: [
      {
        id: "organizations",
        title: "World organizations",
        points: ["UN system", "SAARC, BIMSTEC, and regional bodies", "WTO, IMF, and World Bank"],
      },
      {
        id: "global-challenges",
        title: "Global challenges",
        points: ["Climate agreements", "Human rights", "Sustainable development goals"],
      },
    ],
  },
];

export function getLoksewaSection(slug: string): KnowledgeSection | undefined {
  return LOKSEWA_SECTIONS.find((s) => s.slug === slug);
}

export function getWorldKnowledgeSection(slug: string): KnowledgeSection | undefined {
  return WORLD_KNOWLEDGE_SECTIONS.find((s) => s.slug === slug);
}

export const CORE_SUBJECTS = [
  { slug: "biology", name: "Biology" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "english", name: "English" },
  { slug: "mathematics", name: "Mathematics" },
  { slug: "nepali", name: "Nepali" },
  { slug: "physics", name: "Physics" },
] as const;

export const CLASS_TRACKS = [
  { slug: "class-11-notes", name: "Class 11 Notes" },
  { slug: "class-11e", name: "Class 11E" },
  { slug: "class-11-more", name: "Class 11 More" },
  { slug: "class-12-notes", name: "Class 12 Notes" },
  { slug: "class-12e", name: "Class 12E" },
  { slug: "class-12-more", name: "Class 12 More" },
] as const;
