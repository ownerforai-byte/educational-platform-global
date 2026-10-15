import json

with open("frontend/public/data/physics-xi-resources/manifest.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)

manifest_json = json.dumps(manifest, indent=2, ensure_ascii=False)

ts_content = f'''/**
 * Physics XI Unit Resources registry and data loader
 * Authoritative map connecting NEB Physics XI Units (1–26) with their .docx resource documents.
 */

export interface PhysicsUnitResourceMeta {{
  unitNo: number;
  unitId: string;
  unitName: string;
  contentArea: string;
  docxFileName: string;
  docxUrl: string;
  jsonFile: string;
  titleBlock: {{
    course: string;
    heading: string;
    subtitle: string;
  }};
  stats: {{
    paragraphCount: number;
    tableCount: number;
    questionCount: number;
    theoryCount: number;
    formulaCount: number;
  }};
}}

export interface PhysicsUnitResourceFullData extends PhysicsUnitResourceMeta {{
  tables: {{ headers: string[]; rows: string[][] }}[];
  questions: {{
    type: string;
    question: string;
    answer: string;
    shortcut?: string;
    example?: string;
  }}[];
  theoryItems: {{
    type: string;
    category: string;
    question: string;
    answer: string;
    shortcut?: string;
    example?: string;
  }}[];
  formulas: string[];
  rawParagraphs: string[];
}}

export const PHYSICS_XI_UNIT_RESOURCES: PhysicsUnitResourceMeta[] = {manifest_json};

const RESOURCE_MAP = new Map<string, PhysicsUnitResourceMeta>();
PHYSICS_XI_UNIT_RESOURCES.forEach((r) => {{
  RESOURCE_MAP.set(r.unitId, r);
  // Also map with aliases if any
  if (r.unitId === "work-energy-and-power") {{
    RESOURCE_MAP.set("work-energy-power", r);
  }}
  if (r.unitId === "potential-potential-difference-and-potential-energy") {{
    RESOURCE_MAP.set("potential-energy", r);
  }}
  if (r.unitId === "reflection-at-curved-mirror") {{
    RESOURCE_MAP.set("curved-mirrors", r);
    RESOURCE_MAP.set("reflection-at-curved-mirrors", r);
  }}
  if (r.unitId === "refraction-at-plane-surfaces") {{
    RESOURCE_MAP.set("refraction-plane", r);
  }}
  if (r.unitId === "refraction-through-prisms") {{
    RESOURCE_MAP.set("prisms", r);
  }}
  if (r.unitId === "recent-trends-in-physics") {{
    RESOURCE_MAP.set("recent-trends", r);
  }}
}});

export function getPhysicsUnitResource(unitId: string): PhysicsUnitResourceMeta | undefined {{
  return RESOURCE_MAP.get(unitId);
}}

export function getPhysicsUnitResourceByNumber(unitNo: number): PhysicsUnitResourceMeta | undefined {{
  return PHYSICS_XI_UNIT_RESOURCES.find((r) => r.unitNo === unitNo);
}}
'''

with open("frontend/lib/physics-xi-resources.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Generated frontend/lib/physics-xi-resources.ts successfully!")
