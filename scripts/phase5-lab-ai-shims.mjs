import fs from "node:fs";
import path from "node:path";

const FE = path.join(process.cwd(), "frontend");

const labFiles = [
  "lab-registry.tsx",
  "lab-metadata.ts",
  "lab-manifest.ts",
  "lab-visual-index.ts",
  "lab-activity-loaders.ts",
  "lab-progress.ts",
  "lab-visual-loaders.tsx",
  "lab-catalog.ts",
  "lab-types.ts",
  "lab-learning.ts",
  "lab-learning-class11.ts",
  "lab-unit-order.ts",
  "lab-annotations.ts",
];
for (const f of labFiles) {
  const libPath = path.join(FE, "lib", f);
  const base = f.replace(/\.tsx?$/, "");
  fs.writeFileSync(libPath, `export * from "@/features/lab/${base}";\n`);
}
fs.mkdirSync(path.join(FE, "lib/types"), { recursive: true });
fs.writeFileSync(
  path.join(FE, "lib/types/lab.ts"),
  'export * from "@/features/lab/types-lab";\n',
);

const aiFiles = fs.readdirSync(path.join(FE, "features/ai")).filter((f) => f.endsWith(".ts"));
fs.mkdirSync(path.join(FE, "lib/ai"), { recursive: true });
for (const f of aiFiles) {
  const base = f.replace(/\.ts$/, "");
  fs.writeFileSync(path.join(FE, "lib/ai", f), `export * from "@/features/ai/${base}";\n`);
}
fs.writeFileSync(
  path.join(FE, "features/ai/index.ts"),
  aiFiles.map((f) => `export * from "./${f.replace(/\.ts$/, "")}";`).join("\n") + "\n",
);
fs.writeFileSync(
  path.join(FE, "features/lab/index.ts"),
  labFiles.map((f) => `export * from "./${f.replace(/\.tsx?$/, "")}";`).join("\n") + "\n",
);

console.log("Lab + AI shims written.");
