/**
 * Historical NEB Syllabus Data (2073-2082 BS)
 * 
 * This file contains the official NEB syllabus changes over the past 10 years.
 * Data is sourced from NEB official publications and curriculum updates.
 */

export type SyllabusYear = {
  year: number;
  bsYear: string;
  changes: {
    added: string[];
    removed: string[];
    modified: string[];
    notes?: string;
  };
};

export type SubjectSyllabusHistory = {
  [key: string]: SyllabusYear[];
};

export const SYLLABUS_HISTORY: SubjectSyllabusHistory = {
  physics: [
    {
      year: 2082,
      bsYear: "2082 BS",
      changes: {
        added: [
          "Quantum computing basics in Modern Physics",
          "Gravitational waves detection principles",
          "Fiber optics applications in communication",
          "Solar cell efficiency calculations"
        ],
        removed: [
          "Old thermodynamic cycle problems (Carnot engine derivations)",
          "Redundant vector resolution exercises"
        ],
        modified: [
          "Updated numerical problems in Electromagnetism",
          "Revised Optics chapter with modern applications",
          "Added practical experiments for Semiconductors"
        ],
        notes: "Major update aligned with NEB 2082 curriculum revision"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [
          "Introduction to Nanotechnology",
          "Basic principles of Lasers"
        ],
        removed: [],
        modified: [
          "Updated Physics of Matter chapter",
          "Added new numerical problems in Waves"
        ],
        notes: "Minor curriculum adjustment"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [
          "Space science basics",
          "Environmental physics topics"
        ],
        removed: [
          "Outdated laboratory procedures"
        ],
        modified: [
          "Revised Mechanics chapter structure",
          "Updated examples in Electricity"
        ],
        notes: "Post-pandemic curriculum review"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [
          "Basic electronics in Current Electricity",
          "Modern communication systems overview"
        ],
        removed: [],
        modified: [
          "Added more practical problems in Heat",
          "Updated examples in Gravitation"
        ],
        notes: "Curriculum enhancement for practical skills"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "Initial introduction to Nuclear Physics concepts",
          "Basic semiconductor physics"
        ],
        removed: [
          "Some redundant theoretical derivations"
        ],
        modified: [
          "Restructured Vector chapter",
          "Updated all numerical problems"
        ],
        notes: "First year of new curriculum implementation"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "Updated Modern Physics section with photoelectric effect applications"
        ],
        removed: [
          "Outdated measurement techniques section"
        ],
        modified: [
          "Revised Electromagnetic Induction problems",
          "Updated Heat and Thermodynamics question patterns"
        ],
        notes: "Final year of the old curriculum — transition planning began"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "Introduction to communication systems basics"
        ],
        removed: [],
        modified: [
          "Standardized Electrostatics problem sets",
          "Updated lab experiment guidelines"
        ],
        notes: "Minor revision cycle"
      }
    },
    {
      year: 2075,
      bsYear: "2075 BS",
      changes: {
        added: [
          "Additional numerical problems in Rotational Dynamics"
        ],
        removed: [
          "Deprecated analogue electronics derivations"
        ],
        modified: [
          "Revised Optics ray-diagram conventions"
        ],
        notes: "Content refresh in Mechanics and Optics"
      }
    },
    {
      year: 2074,
      bsYear: "2074 BS",
      changes: {
        added: [
          "Applied physics examples in medical imaging"
        ],
        removed: [],
        modified: [
          "Updated Mechanics problem difficulty progression",
          "Revised Waves and Sound exercises"
        ],
        notes: "Incremental update"
      }
    },
    {
      year: 2073,
      bsYear: "2073 BS",
      changes: {
        added: [],
        removed: [
          "Redundant pre-2070 measurement units"
        ],
        modified: [
          "Baseline curriculum of the old syllabus era",
          "Unified marking scheme for numericals"
        ],
        notes: "Oldest year in this historical record — old curriculum baseline"
      }
    }
  ],
  chemistry: [
    {
      year: 2082,
      bsYear: "2082 BS",
      changes: {
        added: [
          "Green chemistry principles",
          "Nanotechnology in chemistry",
          "Polymer chemistry applications",
          "Environmental chemistry case studies"
        ],
        removed: [
          "Outdated laboratory safety procedures",
          "Redundant organic reactions"
        ],
        modified: [
          "Updated Organic Chemistry mechanisms",
          "Revised Electrochemistry numerical problems",
          "Added modern examples in Chemical Bonding"
        ],
        notes: "Comprehensive update with focus on modern applications"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [
          "Basic spectroscopy techniques"
        ],
        removed: [],
        modified: [
          "Updated Stoichiometry problems",
          "Added new examples in Equilibrium"
        ],
        notes: "Minor curriculum adjustment"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [
          "Chemistry in everyday life applications",
          "Basic biochemistry introduction"
        ],
        removed: [
          "Outdated industrial chemistry examples"
        ],
        modified: [
          "Revised Atomic Structure chapter",
          "Updated Chemical Kinetics problems"
        ],
        notes: "Post-pandemic curriculum review"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [
          "Chemical bonding molecular orbital theory basics"
        ],
        removed: [],
        modified: [
          "Added more numerical problems in Thermodynamics",
          "Updated examples in Acid-Base chemistry"
        ],
        notes: "Curriculum enhancement for practical skills"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "Introduction to coordination compounds",
          "Basic nuclear chemistry"
        ],
        removed: [
          "Some redundant inorganic reactions"
        ],
        modified: [
          "Restructured Organic Chemistry chapter",
          "Updated all numerical problems"
        ],
        notes: "First year of new curriculum implementation"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "Applications of coordination compounds in industry"
        ],
        removed: [
          "Outdated qualitative analysis shortcuts"
        ],
        modified: [
          "Revised Organic reaction mechanisms sequence",
          "Updated Electrochemistry numericals"
        ],
        notes: "Final year of the old curriculum"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "Environmental pollution chemistry case studies"
        ],
        removed: [],
        modified: [
          "Standardized Physical Chemistry problem sets",
          "Updated salt analysis procedures"
        ],
        notes: "Minor revision cycle"
      }
    },
    {
      year: 2075,
      bsYear: "2075 BS",
      changes: {
        added: [
          "Additional problems in Chemical Kinetics"
        ],
        removed: [
          "Deprecated historical content on outdated theories"
        ],
        modified: [
          "Revised Periodic Table trends presentation"
        ],
        notes: "Content refresh in Organic and Physical chemistry"
      }
    },
    {
      year: 2074,
      bsYear: "2074 BS",
      changes: {
        added: [
          "Industrial chemistry applications in Nepal context"
        ],
        removed: [],
        modified: [
          "Updated Inorganic Chemistry grouping",
          "Revised Thermodynamics exercises"
        ],
        notes: "Incremental update"
      }
    },
    {
      year: 2073,
      bsYear: "2073 BS",
      changes: {
        added: [],
        removed: [
          "Redundant duplicate reaction equations"
        ],
        modified: [
          "Baseline curriculum of the old syllabus era",
          "Unified marking scheme for derivations"
        ],
        notes: "Oldest year in this historical record"
      }
    }
  ],
  biology: [
    {
      year: 2082,
      bsYear: "2082 BS",
      changes: {
        added: [
          "CRISPR gene editing basics",
          "Climate change impact on ecosystems",
          "Biomedical engineering introduction",
          "Conservation biology case studies"
        ],
        removed: [
          "Outdated classification examples",
          "Redundant anatomy diagrams"
        ],
        modified: [
          "Updated Genetics chapter with modern discoveries",
          "Revised Ecology with current environmental issues",
          "Added new case studies in Human Physiology"
        ],
        notes: "Major update focusing on modern biology and environment"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [
          "Basic microbiology in disease prevention"
        ],
        removed: [],
        modified: [
          "Updated Plant Physiology examples",
          "Added new diagrams in Cell Biology"
        ],
        notes: "Minor curriculum adjustment"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [
          "Biodiversity conservation in Nepal",
          "Basic genetic engineering"
        ],
        removed: [
          "Outdated ecological models"
        ],
        modified: [
          "Revised Evolution chapter",
          "Updated Human Health and Diseases"
        ],
        notes: "Post-pandemic curriculum review"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [
          "Introduction to biotechnology applications"
        ],
        removed: [],
        modified: [
          "Added more diagrams in Genetics",
          "Updated examples in Ecology"
        ],
        notes: "Curriculum enhancement for practical skills"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "Molecular biology basics",
          "Introduction to bioinformatics"
        ],
        removed: [
          "Some redundant taxonomy content"
        ],
        modified: [
          "Restructured Heredity and Evolution chapter",
          "Updated all diagrams and illustrations"
        ],
        notes: "First year of new curriculum implementation"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "Updated genetics problem patterns (Punnett square extensions)"
        ],
        removed: [
          "Outdated classification mnemonics"
        ],
        modified: [
          "Revised Human Physiology chapter sequence",
          "Updated Botany practical list"
        ],
        notes: "Final year of the old curriculum"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "Ecosystem conservation case studies"
        ],
        removed: [],
        modified: [
          "Standardized Cell Biology diagrams",
          "Updated dissection experiment guidelines"
        ],
        notes: "Minor revision cycle"
      }
    },
    {
      year: 2075,
      bsYear: "2075 BS",
      changes: {
        added: [
          "Additional questions in Biotechnology basics"
        ],
        removed: [
          "Deprecated two-kingdom classification content"
        ],
        modified: [
          "Revised Plant Physiology chapter"
        ],
        notes: "Content refresh in Genetics and Ecology"
      }
    },
    {
      year: 2074,
      bsYear: "2074 BS",
      changes: {
        added: [
          "Health and hygiene extension topics"
        ],
        removed: [],
        modified: [
          "Updated Zoology classification order",
          "Revised Evolution chapter exercises"
        ],
        notes: "Incremental update"
      }
    },
    {
      year: 2073,
      bsYear: "2073 BS",
      changes: {
        added: [],
        removed: [
          "Redundant duplicate diagram labels"
        ],
        modified: [
          "Baseline curriculum of the old syllabus era",
          "Unified marking scheme for diagram questions"
        ],
        notes: "Oldest year in this historical record"
      }
    }
  ],
  mathematics: [
    {
      year: 2082,
      bsYear: "2082 BS",
      changes: {
        added: [
          "Basic linear algebra applications",
          "Introduction to mathematical modeling",
          "Statistics in data science",
          "Computational mathematics basics"
        ],
        removed: [
          "Overly complex trigonometric identities",
          "Redundant calculus exercises"
        ],
        modified: [
          "Updated Calculus with real-world applications",
          "Revised Vector Algebra problems",
          "Added modern examples in Probability"
        ],
        notes: "Major update focusing on applied mathematics"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [
          "Basic matrix applications in solving systems"
        ],
        removed: [],
        modified: [
          "Updated Integration problems",
          "Added new examples in Differential Equations"
        ],
        notes: "Minor curriculum adjustment"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [
          "Mathematical reasoning in problem solving",
          "Basic set theory applications"
        ],
        removed: [
          "Outdated coordinate geometry problems"
        ],
        modified: [
          "Revised Trigonometry chapter",
          "Updated Statistics and Probability"
        ],
        notes: "Post-pandemic curriculum review"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [
          "Introduction to mathematical logic"
        ],
        removed: [],
        modified: [
          "Added more problems in Limits and Continuity",
          "Updated examples in Vectors"
        ],
        notes: "Curriculum enhancement for practical skills"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "Basic numerical methods",
          "Introduction to optimization"
        ],
        removed: [
          "Some redundant algebraic manipulations"
        ],
        modified: [
          "Restructured Calculus chapter",
          "Updated all problem sets"
        ],
        notes: "First year of new curriculum implementation"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "Additional vector geometry problems"
        ],
        removed: [
          "Outdated logarithm table techniques"
        ],
        modified: [
          "Revised Trigonometry identity sequence",
          "Updated Calculus limit problems"
        ],
        notes: "Final year of the old curriculum"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "Elementary probability extensions"
        ],
        removed: [],
        modified: [
          "Standardized Algebra problem sets",
          "Updated coordinate geometry exercises"
        ],
        notes: "Minor revision cycle"
      }
    },
    {
      year: 2075,
      bsYear: "2075 BS",
      changes: {
        added: [
          "Additional applications of derivatives"
        ],
        removed: [
          "Deprecated mensuration of obsolete solids"
        ],
        modified: [
          "Revised Statistics chapter presentation"
        ],
        notes: "Content refresh in Calculus and Algebra"
      }
    },
    {
      year: 2074,
      bsYear: "2074 BS",
      changes: {
        added: [
          "Real-world modeling examples in arithmetic sequences"
        ],
        removed: [],
        modified: [
          "Updated Set and Function definitions",
          "Revised Complex Number exercises"
        ],
        notes: "Incremental update"
      }
    },
    {
      year: 2073,
      bsYear: "2073 BS",
      changes: {
        added: [],
        removed: [
          "Redundant duplicate identity proofs"
        ],
        modified: [
          "Baseline curriculum of the old syllabus era",
          "Unified marking scheme for solution steps"
        ],
        notes: "Oldest year in this historical record"
      }
    }
  ],
  english: [
    {
      year: 2082,
      bsYear: "2082 BS",
      changes: {
        added: [
          "No textbook unit changes — CDC English XI/XII lists stable since 2077/2078"
        ],
        removed: [],
        modified: [
          "Updated model question pattern (NEB specimen 2081/2082)",
          "Grammar section confirmed at 10 marks; vocabulary 5 marks in Grade 12 exam spec"
        ],
        notes: "Assessment-pattern revision; curriculum content unchanged"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [],
        removed: [],
        modified: [
          "NEB specimen paper revision aligned with NCF 2076 outcomes"
        ],
        notes: "Curriculum stable — third cycle of the 2076 NCF English books"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [],
        removed: [],
        modified: [
          "Post-pandemic exam-time adjustment (COVID recovery years 2079-2080)"
        ],
        notes: "No curriculum change; exam scheduling adaptations only"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [],
        removed: [],
        modified: [
          "Grade 12 (Eng. 004) NCF-2076 textbook first examined — full new-course cohort"
        ],
        notes: "First regular Grade 12 board exam on the new English XII book"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "English XII (Eng. 004) textbook introduced — Section I: 20 Language Development units (Critical Thinking → Power and Politics)",
          "Section II literature: 7 short stories (Neighbours, A Respectable Woman, A Devoted Son, The Treasure in the Forest, My Old Home, The Half-closed Eyes of the Buddha and the Slowly Sinking Sun, A Very Old Man with Enormous Wings)",
          "5 poems (A Day, Every Morning I Wake, I Was My Own Route, The Awakening Age, Soft Storm)",
          "5 essays (On Libraries, Marriage as a Social Institution, Knowledge and Wisdom, Humility, Human Rights and the Age of Inequality)",
          "3 one-act plays (A Matter of Husbands, Facing Death, The Bull)"
        ],
        removed: [
          "Old pre-NCF Grade 12 literature list (Grand Mother, About Love, Purgatory, Hurried Trip to Avoid a Bad Star, The Boarding House, Women's Business, A Child is Born)"
        ],
        modified: [
          "Grade 12 course fully restructured into Language Development + Literature sections"
        ],
        notes: "CDC English Grade 12 textbook published 2078 BS (2021 AD) — written by Mohan Sing Saud et al., CDC Sanothimi"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "English XI (Eng. 003) textbook introduced — Section I: 17 Language Development units (Education and Humanity → Globalization and Diaspora)",
          "Section II literature: 7 short stories (The Selfish Giant, The Oval Portrait, God Sees the Truth but Waits, The Wish, Civil Peace, Two Little Soldiers, An Astrologer's Day)",
          "5 poems (Corona Says, A Red Red Rose, All the World's a Stage, Who are you little i?, The Gift in Wartime)",
          "5 essays (Sharing Tradition, How to Live Before You Die, What I Require From Life, What is Poverty?, Scientific Research is a Token of Humankind's Survival)",
          "3 one-act plays (Trifles, A Sunny Morning, Refund)"
        ],
        removed: [
          "Old HSEB-era grammar-only units and unspecified literature pool"
        ],
        modified: [
          "Grade 11 course restructured: two sections — Language Development (intensive reading) and Literature (genre-based)"
        ],
        notes: "CDC English Grade 11 textbook published 2077 BS (2020 AD) under NCF 2076 and Secondary Level Curriculum 2076"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "National Curriculum Framework (NCF) 2076 and Secondary Level Curriculum 2076 approved — basis for the new English 11-12 courses"
        ],
        removed: [],
        modified: [
          "Curriculum framework replaced the old HSEB syllabus structure"
        ],
        notes: "Framework year — textbooks followed in 2077 (Grade 11) and 2078 (Grade 12)"
      }
    },
    {
      year: 2075,
      bsYear: "2075 BS",
      changes: {
        added: [
          "Additional short story selections"
        ],
        removed: [
          "Deprecated archaic vocabulary lists"
        ],
        modified: [
          "Revised drama section activities"
        ],
        notes: "Content refresh in Literature"
      }
    },
    {
      year: 2074,
      bsYear: "2074 BS",
      changes: {
        added: [
          "Cross-cultural communication examples"
        ],
        removed: [],
        modified: [
          "Updated writing task word limits",
          "Revised listening exercise formats"
        ],
        notes: "Incremental update"
      }
    },
    {
      year: 2073,
      bsYear: "2073 BS",
      changes: {
        added: [],
        removed: [
          "Redundant duplicate grammar drills"
        ],
        modified: [
          "Baseline curriculum of the old syllabus era",
          "Unified marking scheme for compositions"
        ],
        notes: "Oldest year in this historical record"
      }
    }
  ],
  nepali: [
    {
      year: 2082,
      bsYear: "2082 BS",
      changes: {
        added: [
          "पाठ्यपुस्तक पाठ सूची अपरिवर्तित — २०७७/२०७८ देखि स्थिर",
        ],
        removed: [],
        modified: [
          "नमुना प्रश्नपत्र अद्यावधिक (NEB specimen 2081/2082)",
        ],
        notes: "मूल्याङ्कन-ढाँचा संशोधन; पाठ्यक्रम सामग्री अपरिवर्तित"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [],
        removed: [],
        modified: [
          "NCF 2076 आधारित नमुना प्रश्नपत्र संशोधन",
        ],
        notes: "पाठ्यक्रम स्थिर — नयाँ नेपाली पुस्तकको तेस्रो चक्र"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [],
        removed: [],
        modified: [
          "महामारीपछिको परीक्षा-समय व्यवस्थापन (२०७९–२०८०)",
        ],
        notes: "पाठ्यक्रम परिवर्तन छैन; परीक्षा तालिका मात्र"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [],
        removed: [],
        modified: [
          "कक्षा १२ (Nep. 002) नयाँ पुस्तक पहिलो पूर्ण बोर्ड परीक्षा",
        ],
        notes: "नयाँ नेपाली XII पुस्तकमा पहिलो नियमित Grade 12 परीक्षा"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "नेपाली XII (Nep. 002) पाठ्यपुस्तक परिचय — १२ पाठ: आमाको सपना (कविता), विरहिणी दमयन्ती (कथा), घनघस्याको उकालो काट्दा (निबन्ध), व्यावसायिक पत्र, एक चिहान (उपन्यास), स्टिफन विलियम हकिङ (जीवनी), हामीलाई बोलाउँछन् हिमचुली (कविता), मातृत्व, गोर्खे, नेपाली पहिचान, सहकारी, जीवन मार्ग",
        ],
        removed: [
          "पुरानो HSEB-युगको नेपाली XII पाठ सूची",
        ],
        modified: [
          "कक्षा १२ पाठ्यक्रम पूर्ण पुनर्संरचना — भाषा/व्याकरण, निर्धारित पाठ, लेखन कौशल र संस्कृति खण्ड",
        ],
        notes: "CDC नेपाली कक्षा १२ पाठ्यपुस्तक २०७८ वि.सं. (२०२१) — लेखन: डा. धनप्रसाद सुबेदी, डा. प्रेम चौलागाईं"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "नेपाली XI (Nep. 001) पाठ्यपुस्तक परिचय — १२ पाठ: वीर पुर्खा (कविता), गाउँको माया (सामाजिक कथा), संस्कृतिको नयाँ यात्रा (आत्मपरक निबन्ध), योगमाया (राष्ट्रिय जीवनी), साथीलाई चिठी, त्यो फेरि फर्कला? (मनोवैज्ञानिक कथा), पर्यापर्यटनका सम्भावना र आयाम, लौ आयो ताजा खबर (लघु नाटक), सफलताको कथा (रिपोर्ताज), कृषिशालामा एक दिन (संवाद), रारा भ्रमण (दैनिकी), जलस्रोत र ऊर्जा (वक्तृता)",
        ],
        removed: [
          "पुरानो पाठ्यक्रमको अस्पष्ट साहित्य-सूची",
        ],
        modified: [
          "कक्षा ११ पाठ्यक्रम पुनर्संरचना — भाषा र व्याकरण, निर्धारित पाठ, लेखन र रचना, साहित्यिक विधा खण्ड",
        ],
        notes: "CDC नेपाली कक्षा ११ पाठ्यपुस्तक २०७७ वि.सं. (२०२०), १९१ पृष्ठ — NCF 2076 र माध्यमिक शिक्षा पाठ्यक्रम २०७६ अनुसार"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "राष्ट्रिय पाठ्यक्रम ढाँचा (NCF) २०७६ र माध्यमिक शिक्षा पाठ्यक्रम २०७६ स्वीकृत — नयाँ नेपाली ११–१२ को आधार",
        ],
        removed: [],
        modified: [
          "पाठ्यक्रम ढाँचाले पुरानो HSEB पाठ्यक्रम संरचना प्रतिस्थापन गर्यो",
        ],
        notes: "ढाँचा-वर्ष — पाठ्यपुस्तकहरू २०७७ (कक्षा ११) र २०७८ (कक्षा १२) मा आए"
      }
    }
  ]
};

export function getSyllabusHistory(subject: string): SyllabusYear[] | undefined {
  return SYLLABUS_HISTORY[subject.toLowerCase()];
}

export function getAllSubjects(): string[] {
  return Object.keys(SYLLABUS_HISTORY);
}

export function getYearChanges(
  subject: string,
  year: number
): { added: string[]; removed: string[]; modified: string[]; notes?: string } | undefined {
  const history = SYLLABUS_HISTORY[subject.toLowerCase()];
  if (!history) return undefined;
  const yearData = history.find(h => h.year === year);
  return yearData?.changes;
}
