/**
 * Physics XI Unit Resources registry and data loader
 * Authoritative map connecting NEB Physics XI Units (1–26) with their .docx resource documents.
 */

export interface PhysicsUnitResourceMeta {
  unitNo: number;
  unitId: string;
  unitName: string;
  contentArea: string;
  docxFileName: string;
  docxUrl: string;
  jsonFile: string;
  titleBlock: {
    course: string;
    heading: string;
    subtitle: string;
  };
  stats: {
    paragraphCount: number;
    tableCount: number;
    questionCount: number;
    theoryCount: number;
    formulaCount: number;
  };
}

export interface PhysicsUnitResourceFullData extends PhysicsUnitResourceMeta {
  tables: { headers: string[]; rows: string[][] }[];
  questions: {
    type: string;
    question: string;
    answer: string;
    shortcut?: string;
    example?: string;
  }[];
  theoryItems: {
    type: string;
    category: string;
    question: string;
    answer: string;
    shortcut?: string;
    example?: string;
  }[];
  formulas: string[];
  rawParagraphs: string[];
}

export const PHYSICS_XI_UNIT_RESOURCES: PhysicsUnitResourceMeta[] = [
  {
    "unitNo": 1,
    "unitId": "physical-quantities",
    "unitName": "Physical Quantities",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_01_physical-quantities.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_01_physical-quantities.docx",
    "jsonFile": "/data/physics-xi-resources/unit-01-physical-quantities.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 1: PHYSICAL QUANTITIES   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 99,
      "tableCount": 4,
      "questionCount": 10,
      "theoryCount": 9,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 2,
    "unitId": "vectors",
    "unitName": "Vectors",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_02_vectors.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_02_vectors.docx",
    "jsonFile": "/data/physics-xi-resources/unit-02-vectors.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 2: VECTORS   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 108,
      "tableCount": 3,
      "questionCount": 13,
      "theoryCount": 8,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 3,
    "unitId": "kinematics",
    "unitName": "Kinematics",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_03_kinematics.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_03_kinematics.docx",
    "jsonFile": "/data/physics-xi-resources/unit-03-kinematics.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 3: KINEMATICS   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 151,
      "tableCount": 5,
      "questionCount": 21,
      "theoryCount": 9,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 4,
    "unitId": "dynamics",
    "unitName": "Dynamics",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_04_dynamics.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_04_dynamics.docx",
    "jsonFile": "/data/physics-xi-resources/unit-04-dynamics.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 4: DYNAMICS   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 133,
      "tableCount": 5,
      "questionCount": 16,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 5,
    "unitId": "work-energy-and-power",
    "unitName": "Work, Energy and Power",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_05_work-energy-power.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_05_work-energy-power.docx",
    "jsonFile": "/data/physics-xi-resources/unit-05-work-energy-and-power.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 5: WORK, ENERGY AND POWER   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 134,
      "tableCount": 5,
      "questionCount": 17,
      "theoryCount": 9,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 6,
    "unitId": "circular-motion",
    "unitName": "Circular Motion",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_06_circular-motion.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_06_circular-motion.docx",
    "jsonFile": "/data/physics-xi-resources/unit-06-circular-motion.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 6: CIRCULAR MOTION   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 129,
      "tableCount": 5,
      "questionCount": 15,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 7,
    "unitId": "gravitation",
    "unitName": "Gravitation",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_07_gravitation.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_07_gravitation.docx",
    "jsonFile": "/data/physics-xi-resources/unit-07-gravitation.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 7: GRAVITATION   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 156,
      "tableCount": 7,
      "questionCount": 20,
      "theoryCount": 11,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 8,
    "unitId": "elasticity",
    "unitName": "Elasticity",
    "contentArea": "Mechanics",
    "docxFileName": "Physics_XI_Unit_08_elasticity.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_08_elasticity.docx",
    "jsonFile": "/data/physics-xi-resources/unit-08-elasticity.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 8: ELASTICITY   Content Area: Mechanics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 112,
      "tableCount": 3,
      "questionCount": 12,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 9,
    "unitId": "heat-and-temperature",
    "unitName": "Heat and Temperature",
    "contentArea": "Heat & Thermodynamics",
    "docxFileName": "Physics_XI_Unit_09_heat-and-temperature.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_09_heat-and-temperature.docx",
    "jsonFile": "/data/physics-xi-resources/unit-09-heat-and-temperature.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 9: HEAT AND TEMPERATURE   Content Area: Heat & Thermodynamics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 97,
      "tableCount": 3,
      "questionCount": 10,
      "theoryCount": 9,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 10,
    "unitId": "thermal-expansion",
    "unitName": "Thermal Expansion",
    "contentArea": "Heat & Thermodynamics",
    "docxFileName": "Physics_XI_Unit_10_thermal-expansion.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_10_thermal-expansion.docx",
    "jsonFile": "/data/physics-xi-resources/unit-10-thermal-expansion.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 10: THERMAL EXPANSION   Content Area: Heat & Thermodynamics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 98,
      "tableCount": 3,
      "questionCount": 10,
      "theoryCount": 9,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 11,
    "unitId": "quantity-of-heat",
    "unitName": "Quantity of Heat",
    "contentArea": "Heat & Thermodynamics",
    "docxFileName": "Physics_XI_Unit_11_quantity-of-heat.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_11_quantity-of-heat.docx",
    "jsonFile": "/data/physics-xi-resources/unit-11-quantity-of-heat.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 11: QUANTITY OF HEAT   Content Area: Heat & Thermodynamics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 99,
      "tableCount": 4,
      "questionCount": 10,
      "theoryCount": 9,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 12,
    "unitId": "rate-of-heat-flow",
    "unitName": "Rate of Heat Flow",
    "contentArea": "Heat & Thermodynamics",
    "docxFileName": "Physics_XI_Unit_12_rate-of-heat-flow.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_12_rate-of-heat-flow.docx",
    "jsonFile": "/data/physics-xi-resources/unit-12-rate-of-heat-flow.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 12: RATE OF HEAT FLOW   Content Area: Heat & Thermodynamics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 102,
      "tableCount": 3,
      "questionCount": 10,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 13,
    "unitId": "ideal-gas",
    "unitName": "Ideal Gas",
    "contentArea": "Heat & Thermodynamics",
    "docxFileName": "Physics_XI_Unit_13_ideal-gas.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_13_ideal-gas.docx",
    "jsonFile": "/data/physics-xi-resources/unit-13-ideal-gas.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 13: IDEAL GAS   Content Area: Heat & Thermodynamics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 113,
      "tableCount": 4,
      "questionCount": 12,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 14,
    "unitId": "reflection-at-curved-mirror",
    "unitName": "Reflection at Curved Mirrors",
    "contentArea": "Waves & Optics",
    "docxFileName": "Physics_XI_Unit_14_curved-mirrors.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_14_curved-mirrors.docx",
    "jsonFile": "/data/physics-xi-resources/unit-14-reflection-at-curved-mirror.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 14: REFLECTION AT CURVED MIRRORS   Content Area: Waves & Optics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 103,
      "tableCount": 3,
      "questionCount": 10,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 15,
    "unitId": "refraction-at-plane-surfaces",
    "unitName": "Refraction at Plane Surfaces",
    "contentArea": "Waves & Optics",
    "docxFileName": "Physics_XI_Unit_15_refraction-plane.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_15_refraction-plane.docx",
    "jsonFile": "/data/physics-xi-resources/unit-15-refraction-at-plane-surfaces.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 15: REFRACTION AT PLANE SURFACES   Content Area: Waves & Optics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 117,
      "tableCount": 4,
      "questionCount": 13,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 16,
    "unitId": "refraction-through-prisms",
    "unitName": "Refraction through Prisms",
    "contentArea": "Waves & Optics",
    "docxFileName": "Physics_XI_Unit_16_prisms.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_16_prisms.docx",
    "jsonFile": "/data/physics-xi-resources/unit-16-refraction-through-prisms.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 16: REFRACTION THROUGH PRISMS   Content Area: Waves & Optics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 100,
      "tableCount": 2,
      "questionCount": 10,
      "theoryCount": 10,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 17,
    "unitId": "lenses",
    "unitName": "Lenses",
    "contentArea": "Waves & Optics",
    "docxFileName": "Physics_XI_Unit_17_lenses.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_17_lenses.docx",
    "jsonFile": "/data/physics-xi-resources/unit-17-lenses.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 17: LENSES   Content Area: Waves & Optics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 98,
      "tableCount": 3,
      "questionCount": 10,
      "theoryCount": 10,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 18,
    "unitId": "dispersion",
    "unitName": "Dispersion",
    "contentArea": "Waves & Optics",
    "docxFileName": "Physics_XI_Unit_18_dispersion.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_18_dispersion.docx",
    "jsonFile": "/data/physics-xi-resources/unit-18-dispersion.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 18: DISPERSION   Content Area: Waves & Optics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 104,
      "tableCount": 3,
      "questionCount": 11,
      "theoryCount": 10,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 19,
    "unitId": "electric-charges",
    "unitName": "Electric Charges",
    "contentArea": "Electricity & Magnetism",
    "docxFileName": "Physics_XI_Unit_19_electric-charges.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_19_electric-charges.docx",
    "jsonFile": "/data/physics-xi-resources/unit-19-electric-charges.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 19: ELECTRIC CHARGES   Content Area: Electricity & Magnetism",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 103,
      "tableCount": 4,
      "questionCount": 10,
      "theoryCount": 10,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 20,
    "unitId": "electric-field",
    "unitName": "Electric Field",
    "contentArea": "Electricity & Magnetism",
    "docxFileName": "Physics_XI_Unit_20_electric-field.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_20_electric-field.docx",
    "jsonFile": "/data/physics-xi-resources/unit-20-electric-field.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 20: ELECTRIC FIELD   Content Area: Electricity & Magnetism",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 105,
      "tableCount": 3,
      "questionCount": 10,
      "theoryCount": 11,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 21,
    "unitId": "potential-potential-difference-and-potential-energy",
    "unitName": "Potential & Potential Energy",
    "contentArea": "Electricity & Magnetism",
    "docxFileName": "Physics_XI_Unit_21_potential-energy.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_21_potential-energy.docx",
    "jsonFile": "/data/physics-xi-resources/unit-21-potential-potential-difference-and-potential-energy.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 21: POTENTIAL & POTENTIAL ENERGY   Content Area: Electricity & Magnetism",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 106,
      "tableCount": 4,
      "questionCount": 11,
      "theoryCount": 10,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 22,
    "unitId": "capacitor",
    "unitName": "Capacitor",
    "contentArea": "Electricity & Magnetism",
    "docxFileName": "Physics_XI_Unit_22_capacitor.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_22_capacitor.docx",
    "jsonFile": "/data/physics-xi-resources/unit-22-capacitor.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 22: CAPACITOR   Content Area: Electricity & Magnetism",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 115,
      "tableCount": 4,
      "questionCount": 13,
      "theoryCount": 10,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 23,
    "unitId": "dc-circuits",
    "unitName": "DC Circuits",
    "contentArea": "Electricity & Magnetism",
    "docxFileName": "Physics_XI_Unit_23_dc-circuits.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_23_dc-circuits.docx",
    "jsonFile": "/data/physics-xi-resources/unit-23-dc-circuits.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 23: DC CIRCUITS   Content Area: Electricity & Magnetism",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 116,
      "tableCount": 5,
      "questionCount": 13,
      "theoryCount": 10,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 24,
    "unitId": "nuclear-physics",
    "unitName": "Nuclear Physics",
    "contentArea": "Modern Physics",
    "docxFileName": "Physics_XI_Unit_24_nuclear-physics.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_24_nuclear-physics.docx",
    "jsonFile": "/data/physics-xi-resources/unit-24-nuclear-physics.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 24: NUCLEAR PHYSICS   Content Area: Modern Physics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 118,
      "tableCount": 6,
      "questionCount": 12,
      "theoryCount": 11,
      "formulaCount": 3
    }
  },
  {
    "unitNo": 25,
    "unitId": "solids",
    "unitName": "Solids",
    "contentArea": "Modern Physics",
    "docxFileName": "Physics_XI_Unit_25_solids.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_25_solids.docx",
    "jsonFile": "/data/physics-xi-resources/unit-25-solids.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 25: SOLIDS   Content Area: Modern Physics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 109,
      "tableCount": 4,
      "questionCount": 11,
      "theoryCount": 11,
      "formulaCount": 4
    }
  },
  {
    "unitNo": 26,
    "unitId": "recent-trends-in-physics",
    "unitName": "Recent Trends in Physics",
    "contentArea": "Modern Physics",
    "docxFileName": "Physics_XI_Unit_26_recent-trends.docx",
    "docxUrl": "/materials/physics-xi/Physics_XI_Unit_26_recent-trends.docx",
    "jsonFile": "/data/physics-xi-resources/unit-26-recent-trends-in-physics.json",
    "titleBlock": {
      "course": "Physics XI  |  NEB (Grade 11)  |  Phy. 101",
      "heading": "UNIT 26: RECENT TRENDS IN PHYSICS   Content Area: Modern Physics",
      "subtitle": "All-possible NEB questions  •  short precise answers  •  exam shortcuts  •  worked examples"
    },
    "stats": {
      "paragraphCount": 143,
      "tableCount": 6,
      "questionCount": 15,
      "theoryCount": 15,
      "formulaCount": 4
    }
  }
];

const RESOURCE_MAP = new Map<string, PhysicsUnitResourceMeta>();
PHYSICS_XI_UNIT_RESOURCES.forEach((r) => {
  RESOURCE_MAP.set(r.unitId, r);
  // Also map with aliases if any
  if (r.unitId === "work-energy-and-power") {
    RESOURCE_MAP.set("work-energy-power", r);
  }
  if (r.unitId === "potential-potential-difference-and-potential-energy") {
    RESOURCE_MAP.set("potential-energy", r);
  }
  if (r.unitId === "reflection-at-curved-mirror") {
    RESOURCE_MAP.set("curved-mirrors", r);
    RESOURCE_MAP.set("reflection-at-curved-mirrors", r);
  }
  if (r.unitId === "refraction-at-plane-surfaces") {
    RESOURCE_MAP.set("refraction-plane", r);
  }
  if (r.unitId === "refraction-through-prisms") {
    RESOURCE_MAP.set("prisms", r);
  }
  if (r.unitId === "recent-trends-in-physics") {
    RESOURCE_MAP.set("recent-trends", r);
  }
});

export function getPhysicsUnitResource(unitId: string): PhysicsUnitResourceMeta | undefined {
  return RESOURCE_MAP.get(unitId);
}

export function getPhysicsUnitResourceByNumber(unitNo: number): PhysicsUnitResourceMeta | undefined {
  return PHYSICS_XI_UNIT_RESOURCES.find((r) => r.unitNo === unitNo);
}
