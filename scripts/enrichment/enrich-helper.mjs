import fs from "node:fs";
import path from "node:path";

export function writeDual(pubRelPath, rkRelPath, data) {
  const json = JSON.stringify(data, null, 2) + "\n";
  // Bodies live in the gated dir (outside public/); see frontend/lib/content/gated-kinds.json.
  const gatedDir = JSON.parse(fs.readFileSync(path.join(process.cwd(), "frontend", "lib", "content", "gated-kinds.json"), "utf8")).gatedDir;
  const pubPath = path.join(process.cwd(), "frontend", gatedDir, "syllabus-notes", pubRelPath);
  const rkPath = path.join(process.cwd(), "content", rkRelPath);
  
  if (fs.existsSync(path.dirname(pubPath))) {
    fs.writeFileSync(pubPath, json, "utf8");
    console.log("Updated pub:", pubRelPath);
  }
  if (fs.existsSync(path.dirname(rkPath))) {
    fs.writeFileSync(rkPath, json, "utf8");
    console.log("Updated rk:", rkRelPath);
  }
}
