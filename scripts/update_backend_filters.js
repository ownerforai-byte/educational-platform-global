import fs from "fs";
import path from "path";

const filePath = path.resolve("backend/src/data/periodicTableFilters.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Find start of PERIODIC_ELEMENTS and start of PERIODIC_FILTERS
const elementArrayStart = content.indexOf("export const PERIODIC_ELEMENTS: PeriodicElement[] = [");
const filtersStart = content.indexOf("export const PERIODIC_FILTERS: Record<string, PeriodicFilterCategory> = {");

if (elementArrayStart === -1 || filtersStart === -1) {
  console.error("Could not find start/end markers in periodicTableFilters.ts");
  process.exit(1);
}

// Check if imports exist
let header = content.substring(0, elementArrayStart);
if (!header.includes('import fs from "fs";')) {
  header = 'import fs from "fs";\nimport path from "path";\n' + header;
}

// Update interface if needed
if (!header.includes("nebGradeLevel?: string;")) {
  header = header.replace(
    '  highYieldNote: string;\n}',
    `  highYieldNote: string;
  nebGradeLevel?: string;
  pastExamQuestions?: string[];
  futureExamTraps?: string[];
  keyOresAndCompounds?: string[];
  hallmarkReactions?: string[];
  examQuickRule?: string;
}`
  );
}

const loaderCode = `function loadElements(): PeriodicElement[] {
  const candidatePaths = [
    path.join(process.cwd(), "public", "all_elements.json"),
    path.join(process.cwd(), "..", "public", "all_elements.json"),
    path.join(process.cwd(), "all_elements.json"),
    path.join(process.cwd(), "..", "all_elements.json"),
  ];
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        const raw = fs.readFileSync(p, "utf-8");
        return JSON.parse(raw);
      } catch (e) {
        console.error("Failed to parse JSON from", p, e);
      }
    }
  }
  return [];
}

export const PERIODIC_ELEMENTS: PeriodicElement[] = loadElements();

`;

const restOfFile = content.substring(filtersStart);

const updatedContent = header + loaderCode + restOfFile;
fs.writeFileSync(filePath, updatedContent, "utf-8");
console.log("Successfully updated backend/src/data/periodicTableFilters.ts!");
