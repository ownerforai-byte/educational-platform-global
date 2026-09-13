export type KnowledgeTopic = {
  id: string;
  title: string;
  points: string[];
};

export type KnowledgeNote = {
  topicId: string;
  title: string;
  summary: string;
  facts: string[];
};

export type KnowledgePracticeQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type KnowledgeSection = {
  slug: string;
  name: string;
  description: string;
  basePath: string;
  topics: KnowledgeTopic[];
  notes?: KnowledgeNote[];
  practice?: KnowledgePracticeQuestion[];
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
    notes: [
      {
        topicId: "physical-features",
        title: "Ecological Belts, Peaks & River Systems",
        summary: "Nepal covers 147,516 km² across three distinct ecological zones: Mountain (15%), Hill (68%), and Terai (17%).",
        facts: [
          "Highest point: Mt. Everest / Sagarmatha (8,848.86 m). Lowest point: Kechana Kawal, Jhapa (58 m).",
          "8 of the world's 14 peaks above 8,000 meters lie within or on the border of Nepal.",
          "Three major river systems: Koshi (highest water volume, 7 tributaries), Gandaki/Narayani (deepest gorge - Kali Gandaki), and Karnali (longest river inside Nepal, 507 km).",
          "Major high-altitude lakes: Tilicho (4,919 m, Manang), Rara (largest freshwater lake, 10.8 km²), Shey Phoksundo (deepest lake, 145 m).",
          "10 recognized Ramsar wetland sites, including Koshi Tappu, Ghodaghodi Tal, Bishazari Tal, and Gokyo Lake complex.",
        ],
      },
      {
        topicId: "climate-and-resources",
        title: "Climatic Belts & Natural Resources",
        summary: "Nepal experiences five distinct climatic zones from subtropical in the south to alpine and arctic tundra in the high Himalayas.",
        facts: [
          "Over 80% of annual precipitation occurs during the summer South Asian Monsoon (June to September).",
          "Forest cover in Nepal stands at approximately 45.31% of the total geographic territory.",
          "High potential for clean renewable energy, with economically feasible hydroelectricity estimated at over 42,000 MW.",
          "Significant mineral occurrences include limestone for cement industry, magnesite, copper, and precious gemstones in Sankhuwasabha and Ruby Valley.",
        ],
      },
      {
        topicId: "administrative-geography",
        title: "Provinces, Districts & Boundaries",
        summary: "Under the Constitution of Nepal 2072, the country is organized into a three-tier federal structure: Federal, 7 Provinces, and 753 Local Units.",
        facts: [
          "7 Provinces and 77 administrative districts.",
          "Koshi, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, and Sudurpashchim.",
          "Nepal shares a 1,880 km border with India (south, east, west) and a 1,414 km border with China (north).",
          "Bagmati Province contains the capital (Kathmandu), while Karnali is the largest province by geographic area and Madhesh the most densely populated.",
        ],
      },
    ],
    practice: [
      {
        id: "geo-q1",
        question: "What is the lowest geographical elevation point in Nepal?",
        options: ["Kechana Kawal (Jhapa)", "Mukhiya Patti (Dhanusha)", "Lumbini (Rupandehi)", "Biratnagar (Morang)"],
        correctIndex: 0,
        explanation: "Kechana Kawal in Jhapa district is officially recognized as the lowest point in Nepal at 58 meters above sea level.",
      },
      {
        id: "geo-q2",
        question: "Which is the longest river flowing entirely within the territory of Nepal?",
        options: ["Koshi River", "Kali Gandaki River", "Karnali River", "Narayani River"],
        correctIndex: 2,
        explanation: "The Karnali River is Nepal's longest river inside national borders, flowing approximately 507 km before entering India as the Ghaghara.",
      },
      {
        id: "geo-q3",
        question: "Which of the following lakes is the largest freshwater lake in Nepal by surface area?",
        options: ["Tilicho Lake", "Shey Phoksundo Lake", "Rara Lake", "Phewa Lake"],
        correctIndex: 2,
        explanation: "Rara Lake in Mugu district is the largest lake in Nepal, with a surface area of approximately 10.8 km².",
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
    notes: [
      {
        topicId: "ancient-and-medieval",
        title: "From Kiratas to the Unification of Nepal",
        summary: "Kathmandu Valley and the surrounding principalities evolved through distinct dynastic eras that forged Nepal's architectural and cultural heritage.",
        facts: [
          "Kirata Dynasty: King Yalamber was the legendary first king; 32 kings ruled according to chronicles.",
          "Lichhavi Period (Golden Age): King Manadeva I erected the first verified historical stone inscription at Changu Narayan (464 AD / Sambat 386) and issued 'Mananka' coins.",
          "Amshuverma: Established the 'Mahasamanta' rule, founded Bhadaradhivasa palace, and promoted diplomatic marriages including Bhrikuti to Tibetan King Songtsen Gampo.",
          "Malla Era: Jayasthiti Malla codified the civil legal code and occupational caste structure. King Yakshya Malla partitioned the Kathmandu Valley into three independent kingdoms: Kantipur, Lalitpur, and Bhaktapur.",
          "National Unification: King Prithvi Narayan Shah of Gorkha initiated the unification in 1743 AD (1799 BS); conquered Nuwakot (1744), Makwanpur (1762), Kantipur (1768), Lalitpur (1768), and Bhaktapur (1769).",
        ],
      },
      {
        topicId: "modern-nepal",
        title: "Rana Autocracy, Democracy & Republic",
        summary: "Modern political evolution transitioned through the Sugauli Treaty, 104-year Rana autocracy, democratic struggles of 2007 BS, and the 2065 BS declaration of the Republic.",
        facts: [
          "Treaty of Sugauli (1816 AD): Concluded Anglo-Nepalese war, fixing the Mechi river in the east and Mahakali river in the west.",
          "Kot Massacre (1903 BS / Sept 14, 1846 AD): Jung Bahadur Rana seized absolute power and instituted 104 years of hereditary Rana prime ministership.",
          "Democratic Revolution of 2007 BS (1951 AD): Tripartite agreement in Delhi restored King Tribhuvan and established a democratic coalition government.",
          "People's Movement I (2046 BS / 1990 AD): Overthrew Panchayat regime, establishing constitutional monarchy and multi-party democracy.",
          "People's Movement II (2062/63 BS): Comprehensive Peace Accord signed Nov 21, 2006. First Constituent Assembly abolished monarchy on Jestha 15, 2065 BS (May 28, 2008). Constitution of Nepal promulgated on Ashoj 3, 2072 BS.",
        ],
      },
    ],
    practice: [
      {
        id: "hist-q1",
        question: "Which Lichhavi king issued the oldest dated stone inscription discovered at Changu Narayan?",
        options: ["King Manadeva I", "King Amshuverma", "King Shivadeva I", "King Narendra Deva"],
        correctIndex: 0,
        explanation: "King Manadeva I inscribed the pillar at Changu Narayan temple in 464 AD (Sambat 386), which serves as the earliest authenticated written record in Nepal's history.",
      },
      {
        id: "hist-q2",
        question: "In which year was the Treaty of Sugauli officially ratified between Nepal and the British East India Company?",
        options: ["1814 AD", "1816 AD", "1846 AD", "1857 AD"],
        correctIndex: 1,
        explanation: "The Treaty of Sugauli was ratified in March 1816 AD following the Anglo-Nepalese war, establishing Nepal's modern territorial limits.",
      },
      {
        id: "hist-q3",
        question: "On which date did the First Constituent Assembly formally declare Nepal a Federal Democratic Republic?",
        options: ["Jestha 15, 2065 BS (May 28, 2008)", "Baisakh 11, 2063 BS (April 24, 2006)", "Ashoj 3, 2072 BS (Sept 20, 2015)", "Falgun 7, 2007 BS (Feb 18, 1951)"],
        correctIndex: 0,
        explanation: "On Jestha 15, 2065 BS (May 28, 2008), the historic first meeting of the Constituent Assembly abolished the 240-year-old Shah monarchy.",
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
    notes: [
      {
        topicId: "biodiversity",
        title: "Protected Area System & Hallmark Wildlife",
        summary: "Nepal has protected over 23.39% of its total surface area through 12 National Parks, 1 Wildlife Reserve, 1 Hunting Reserve, and 6 Conservation Areas.",
        facts: [
          "Chitwan National Park (established 1973 AD): Nepal's first national park and UNESCO Natural World Heritage Site (1984).",
          "Sagarmatha National Park (established 1976 AD): World's highest national park and UNESCO World Heritage Site (1979).",
          "Shey Phoksundo National Park: Nepal's largest national park (3,555 km²) situated in Dolpa and Mugu districts.",
          "Tiger Conservation Triumph: Nepal achieved the St. Petersburg 'Tx2' goal by doubling its wild Royal Bengal tiger population to 355 in the 2022 census.",
          "Pioneering Community Forestry Program: Over 22,000 Community Forest User Groups (CFUGs) manage community forests, contributing to Nepal's 45% forest cover recovery.",
        ],
      },
      {
        topicId: "climate-policy",
        title: "Himalayan Glaciers & Climate Commitments",
        summary: "Nepal is among the most vulnerable countries to climate change despite contributing negligible greenhouse gases.",
        facts: [
          "Himalayan glaciers have experienced accelerated melting, forming hazardous glacial lakes prone to GLOFs (Glacial Lake Outburst Floods).",
          "Nationally Determined Contributions (NDC): Nepal committed at COP26 to achieve Net-Zero greenhouse gas emissions by 2045 and expand clean energy.",
          "National Climate Change Policy 2076 & Environment Protection Act 2076 govern environmental impact assessments (EIA) and disaster risk reduction.",
        ],
      },
    ],
    practice: [
      {
        id: "env-q1",
        question: "Which is the largest national park in Nepal by geographical area?",
        options: ["Chitwan National Park", "Sagarmatha National Park", "Shey Phoksundo National Park", "Makalu Barun National Park"],
        correctIndex: 2,
        explanation: "Shey Phoksundo National Park in Dolpa and Mugu is Nepal's largest national park, spanning 3,555 square kilometers.",
      },
      {
        id: "env-q2",
        question: "According to the 2022 national census, how many wild Royal Bengal tigers were recorded in Nepal?",
        options: ["121", "198", "235", "355"],
        correctIndex: 3,
        explanation: "Nepal recorded 355 wild tigers in the 2022 census, nearly tripling its baseline population from 2009 (121 tigers) and becoming the first nation to double its tiger population.",
      },
      {
        id: "env-q3",
        question: "What is Nepal's committed target year to achieve Net-Zero greenhouse gas emissions under its NDC?",
        options: ["2030", "2045", "2050", "2060"],
        correctIndex: 1,
        explanation: "Nepal pledged at COP26 to reach Net-Zero carbon emissions by 2045, ahead of the global 2050 milestone.",
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
    notes: [
      {
        topicId: "science-and-tech",
        title: "Core Scientific Discoveries & Principles",
        summary: "Fundamental science benchmarks frequently tested in competitive and academic evaluations.",
        facts: [
          "Speed of light in vacuum: 299,792,458 m/s (~3 × 10⁸ m/s).",
          "Human Blood Circulation: Discovered by William Harvey (1628). The human heart pumps ~5 liters of blood per minute at rest.",
          "Structure of DNA: Double-helix model formulated by James Watson and Francis Crick in 1953 (with Rosalind Franklin's Photo 51).",
          "SI Base Units (7 units): meter (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd).",
        ],
      },
      {
        topicId: "world-geography",
        title: "Global Landforms, Oceans & Extremes",
        summary: "Planetary records and geographical extremes across Earth's 7 continents and 5 oceans.",
        facts: [
          "Largest continent by area & population: Asia (~30% of Earth's land). Smallest: Australia.",
          "Deepest oceanic trench: Mariana Trench (Challenger Deep, ~10,994 m below sea level) in the western Pacific Ocean.",
          "Longest river: River Nile (~6,650 km); Largest river by discharge volume: Amazon River.",
          "Largest desert: Antarctic Polar Desert (cold); Largest hot desert: Sahara Desert (~9.2 million km²).",
        ],
      },
    ],
    practice: [
      {
        id: "gk-q1",
        question: "What is the deepest known location on the Earth's seabed?",
        options: ["Puerto Rico Trench", "Java Trench", "Challenger Deep in Mariana Trench", "Sunda Deep"],
        correctIndex: 2,
        explanation: "Challenger Deep at the southern end of the Mariana Trench is the deepest known point on Earth at approximately 10,994 meters.",
      },
      {
        id: "gk-q2",
        question: "Who discovered the double-helix structure of the DNA molecule in 1953?",
        options: ["Charles Darwin & Gregor Mendel", "James Watson & Francis Crick", "Louis Pasteur & Robert Koch", "Alexander Fleming"],
        correctIndex: 1,
        explanation: "James Watson and Francis Crick co-discovered the double-helix molecular structure of deoxyribonucleic acid (DNA) in 1953.",
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
    notes: [
      {
        topicId: "national-affairs",
        title: "National Development Milestones & Graduation",
        summary: "Key economic, infrastructural, and multilateral benchmarks shaping contemporary Nepal.",
        facts: [
          "LDC Graduation: UN General Assembly approved Nepal's graduation from the Least Developed Country (LDC) category by November 2026.",
          "Cross-Border Power Export: Historic tripartite energy agreement between Nepal, India, and Bangladesh to export 40 MW of hydroelectric power to Bangladesh.",
          "National Pride Projects: Pokhara International Airport and Gautam Buddha International Airport (Bhairahawa) inaugurated as secondary international gateways.",
        ],
      },
      {
        topicId: "international-affairs",
        title: "Global Multilateral Summits & Geopolitics",
        summary: "Key international summits and global policy treaties shaping world affairs.",
        facts: [
          "COP Climate Agreements: Ongoing COP summits operationalized the 'Loss and Damage Fund' to aid vulnerable developing nations.",
          "BRICS Expansion: BRICS grouping expanded membership to include Egypt, Ethiopia, Iran, Saudi Arabia, and the UAE.",
          "Global Artificial Intelligence Governance: European Union passed the EU AI Act (2024), establishing the world's first comprehensive risk-based legal framework for AI.",
        ],
      },
    ],
    practice: [
      {
        id: "ca-q1",
        question: "In which year is Nepal officially scheduled to graduate from the United Nations Least Developed Country (LDC) status?",
        options: ["2024", "2026", "2030", "2035"],
        correctIndex: 1,
        explanation: "The UN General Assembly endorsed a five-year preparatory transition period scheduling Nepal's graduation from LDC status for November 2026.",
      },
      {
        id: "ca-q2",
        question: "Under the historic 2024 tripartite power pact, Nepal agreed to export hydroelectricity to which country via the Indian transmission grid?",
        options: ["Bhutan", "Bangladesh", "Sri Lanka", "Maldives"],
        correctIndex: 1,
        explanation: "Nepal, India, and Bangladesh signed a landmark tripartite agreement in 2024 to export 40 MW of electricity from Nepal to Bangladesh.",
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
    notes: [
      {
        topicId: "organizations",
        title: "The United Nations System & Regional Blocs",
        summary: "The institutional architecture governing global cooperation, peace, security, and economic development.",
        facts: [
          "United Nations: Established on October 24, 1945 in San Francisco. 193 member states. 6 principal organs: General Assembly, Security Council, ECOSOC, ICJ, Trusteeship Council, and Secretariat.",
          "UN Security Council: 15 members (5 permanent members with veto power: USA, UK, France, Russia, China; 10 non-permanent members elected for 2-year terms).",
          "International Court of Justice (ICJ): The principal judicial organ of the UN, situated in the Peace Palace at The Hague, Netherlands (the only principal organ not in New York).",
          "SAARC (South Asian Association for Regional Cooperation): Founded on Dec 8, 1985 in Dhaka. Secretariat headquartered in Kathmandu, Nepal. 8 member nations.",
          "Bretton Woods Institutions: Established in 1944: International Monetary Fund (IMF) and International Bank for Reconstruction and Development (World Bank) in Washington, D.C.",
        ],
      },
      {
        topicId: "global-challenges",
        title: "Sustainable Development Goals & Treaties",
        summary: "The 2030 Agenda for Sustainable Development and global environmental treaties.",
        facts: [
          "17 Sustainable Development Goals (SDGs): Adopted by all 193 UN member states in 2015 as a universal call to action to end poverty, protect the planet, and ensure peace and prosperity by 2030.",
          "Paris Climate Agreement: Adopted at COP21 in December 2015; legally binding international treaty to limit global warming to well below 2.0°C and preferably 1.5°C above pre-industrial levels.",
        ],
      },
    ],
    practice: [
      {
        id: "glob-q1",
        question: "Where is the permanent Secretariat of the South Asian Association for Regional Cooperation (SAARC) located?",
        options: ["Dhaka, Bangladesh", "New Delhi, India", "Kathmandu, Nepal", "Colombo, Sri Lanka"],
        correctIndex: 2,
        explanation: "The SAARC Secretariat was established in Kathmandu, Nepal, and officially inaugurated on January 16, 1987.",
      },
      {
        id: "glob-q2",
        question: "Which of the six principal organs of the United Nations is located in The Hague, Netherlands?",
        options: ["Economic and Social Council (ECOSOC)", "International Court of Justice (ICJ)", "Trusteeship Council", "UN Secretariat"],
        correctIndex: 1,
        explanation: "The International Court of Justice (ICJ) is headquartered in The Hague, Netherlands, while the other five principal organs are located in New York City.",
      },
      {
        id: "glob-q3",
        question: "How many Sustainable Development Goals (SDGs) were established under the UN 2030 Agenda?",
        options: ["8", "12", "15", "17"],
        correctIndex: 3,
        explanation: "The 2030 Agenda establishes 17 Sustainable Development Goals (SDGs) with 169 specific targets.",
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
  { slug: "class-12-notes", name: "Class 12 Notes" },
] as const;
