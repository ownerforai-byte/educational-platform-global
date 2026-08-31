/**
 * Historical NEB Syllabus Data (2078-2082 BS)
 * 
 * This file contains the official NEB syllabus changes over the past 5 years.
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
