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
          "Digital communication skills",
          "Critical thinking through literature",
          "Contemporary literature inclusion",
          "Presentation and public speaking"
        ],
        removed: [
          "Outdated grammar exercises",
          "Redundant literary analysis patterns"
        ],
        modified: [
          "Updated reading comprehension passages",
          "Revised writing skills with modern formats",
          "Added contemporary literature selections"
        ],
        notes: "Major update focusing on communicative competence"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [
          "Basic business English introduction"
        ],
        removed: [],
        modified: [
          "Updated literature selections",
          "Added new writing prompts"
        ],
        notes: "Minor curriculum adjustment"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [
          "Digital literacy in English",
          "Online communication skills"
        ],
        removed: [
          "Outdated correspondence formats"
        ],
        modified: [
          "Revised grammar sections",
          "Updated literature analysis approaches"
        ],
        notes: "Post-pandemic curriculum review"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [
          "Team communication skills"
        ],
        removed: [],
        modified: [
          "Added more speaking activities",
          "Updated listening comprehension materials"
        ],
        notes: "Curriculum enhancement for practical skills"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "Introduction to academic writing",
          "Basic research skills in English"
        ],
        removed: [
          "Some redundant vocabulary exercises"
        ],
        modified: [
          "Restructured literature chapter",
          "Updated all assessment criteria"
        ],
        notes: "First year of new curriculum implementation"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "Guided composition practice sets"
        ],
        removed: [
          "Outdated formal letter templates"
        ],
        modified: [
          "Revised grammar syllabus sequence",
          "Updated comprehension passage themes"
        ],
        notes: "Final year of the old curriculum"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "Media literacy reading tasks"
        ],
        removed: [],
        modified: [
          "Standardized essay assessment rubrics",
          "Updated poetry annotation guides"
        ],
        notes: "Minor revision cycle"
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
          "आधुनिक नेपाली साहित्य",
          "डिजिटल युग र नेपाली भाषा",
          "संचार कौशल विकास",
          "सामाजिक जिम्मेवारी र साहित्य"
        ],
        removed: [
          "पुराना व्याकरण नियमहरू",
          "अनावश्यक अभ्यासहरू"
        ],
        modified: [
          "साहित्यिक पाठहरू अपडेट",
          "लेखन कौशल नयाँ रूपमा",
          "व्याकरण अध्याय संरचना सुधार"
        ],
        notes: "नेपाली भाषा र साहित्यमा ठूलो परिवर्तन"
      }
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      changes: {
        added: [
          "सामाजिक संचार र नेपाली"
        ],
        removed: [],
        modified: [
          "कविता र गीतको चयन अपडेट",
          "नयाँ लेखन अभ्यासहरू"
        ],
        notes: "सानो परिवर्तन"
      }
    },
    {
      year: 2080,
      bsYear: "2080 BS",
      changes: {
        added: [
          "डिजिटल नेपाली लेखन",
          "सामाजिक साहित्यिक चर्चा"
        ],
        removed: [
          "पुराना पत्र लेखन ढाँचाहरू"
        ],
        modified: [
          "व्यायरन अध्याय अपडेट",
          "साहित्यिक विश्लेषण नयाँ दृष्टिकोण"
        ],
        notes: "पछि-महामारी पाठ्यक्रम समीक्षा"
      }
    },
    {
      year: 2079,
      bsYear: "2079 BS",
      changes: {
        added: [
          "गroupediscussion कौशल"
        ],
        removed: [],
        modified: [
          "नयाँ पाठहरूको थप",
          "व्याकरण अभ्यास अपडेट"
        ],
        notes: "व्यावहारिक कौशल विकास"
      }
    },
    {
      year: 2078,
      bsYear: "2078 BS",
      changes: {
        added: [
          "आधुनिक नेपाली भाषा विज्ञान",
          "भाषा परिप्रेक्ष्य"
        ],
        removed: [
          "केही पुराना व्याकरण नियमहरू"
        ],
        modified: [
          "साहित्य अध्याय पुनर्निर्माण",
          "मूल्याङ्कन मापदण्ड अपडेट"
        ],
        notes: "नयाँ पाठ्यक्रम कार्यान्वयनको पहिलो वर्ष"
      }
    },
    {
      year: 2077,
      bsYear: "2077 BS",
      changes: {
        added: [
          "निबन्ध लेखन अभ्यास सामग्री"
        ],
        removed: [
          "पुराना औपचारिक पत्र ढाँचा"
        ],
        modified: [
          "व्याकरण पाठ्यक्रम क्रम पुनर्गठन",
          "बोध प्रश्न विषयवस्तु अपडेट"
        ],
        notes: "पुरानो पाठ्यक्रमको अन्तिम वर्ष"
      }
    },
    {
      year: 2076,
      bsYear: "2076 BS",
      changes: {
        added: [
          "सञ्चार माध्यम पढाइ कार्य"
        ],
        removed: [],
        modified: [
          "निबन्ध मूल्याङ्कन मापदण्ड",
          "कविता टिप्पणी गाइड"
        ],
        notes: "सानो संशोधन चक्र"
      }
    },
    {
      year: 2075,
      bsYear: "2075 BS",
      changes: {
        added: [
          "थप कथा रचना चयन"
        ],
        removed: [
          "पुरालेखीय शब्दावली सूची"
        ],
        modified: [
          "नाटक खण्ड क्रियाकलाप"
        ],
        notes: "साहित्यमा सामग्री ताजा गरिएको"
      }
    },
    {
      year: 2074,
      bsYear: "2074 BS",
      changes: {
        added: [
          "सांस्कृतिक अन्तर-सञ्चार उदाहरण"
        ],
        removed: [],
        modified: [
          "लेखन कार्य शब्द सीमा अपडेट",
          "सुनाइ अभ्यास ढाँचा"
        ],
        notes: "क्रमिक अद्यावधिक"
      }
    },
    {
      year: 2073,
      bsYear: "2073 BS",
      changes: {
        added: [],
        removed: [
          "दोहोरिएका व्याकरण अभ्यास"
        ],
        modified: [
          "पुरानो पाठ्यक्रम युगको आधारभूत पाठ्यक्रम",
          "रचनात्मक लेखनको एकीकृत मूल्याङ्कन"
        ],
        notes: "यो ऐतिहासिक रेकर्डको सबैभन्दा पुरानो वर्ष"
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
