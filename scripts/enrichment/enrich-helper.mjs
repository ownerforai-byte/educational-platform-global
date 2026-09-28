import fs from "node:fs";
import path from "node:path";

export function writeDual(pubRelPath, rkRelPath, data) {
  const json = JSON.stringify(data, null, 2) + "\n";
  const pubPath = path.join(process.cwd(), "frontend", "public", "data", "syllabus-notes", pubRelPath);
  const rkPath = path.join(process.cwd(), "content", "ravikishan", rkRelPath);
  
  if (fs.existsSync(path.dirname(pubPath))) {
    fs.writeFileSync(pubPath, json, "utf8");
    console.log("Updated pub:", pubRelPath);
  }
  if (fs.existsSync(path.dirname(rkPath))) {
    fs.writeFileSync(rkPath, json, "utf8");
    console.log("Updated rk:", rkRelPath);
  }
}
