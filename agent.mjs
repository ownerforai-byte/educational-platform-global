import { init } from "@heyputer/puter.js/src/init.cjs";
import fs from "fs";
import path from "path";

const puter = init("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InYyIn0.eyJ0IjoidCIsInYiOiIyIiwidG9rZW5fdWlkIjoiMGYxOGY4MjktNTZkYi00ODQ5LWEzZjMtYjgyYTJjMjFjODhiIiwidXUiOiJCZkpJaXFRSVRlK2w1TEd1Zk92QmxRPT0iLCJzdSI6IjJCZ05QN0RkUlJtRlUyR29vYU5ya1E9PSIsImFpIjoiQmZKSWlxUUlUZStsNUxHdWZPdkJsUT09IiwiZnVsbF9hY2Nlc3MiOnRydWUsImlhdCI6MTc4ODU3MTQyNCwiZXhwIjoxNzk2MzQ3NDI0fQ.I9qsKb3o7sHWwYSkiwAWWe7vTq9Ei_gAcYTi9xCtIVI");
const MODEL = "qwen/qwen3-coder-480b-a35b-instruct";

// 1. List all code files in a folder (skip node_modules etc)
function listFiles(dir, exts, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!["node_modules", ".git", ".next", "dist"].includes(file)) {
        listFiles(fullPath, exts, fileList);
      }
    } else if (exts.some(ext => file.endsWith(ext))) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const scanDir = process.argv[2];      // e.g. "./frontend"
const task = process.argv[3];         // e.g. "Fix the map error in ProductList"

if (!scanDir || !task) {
  console.error('Usage: node agent.mjs <folder> "<task description>"');
  process.exit(1);
}

const allFiles = listFiles(scanDir, [".js", ".jsx", ".ts", ".tsx"]);
console.log(`Found ${allFiles.length} files. Asking Qwen which ones it needs...`);

// 2. Ask the model which files are relevant
const fileListText = allFiles.join("\n");
const pickPrompt = `Here is a list of file paths in a project:\n${fileListText}\n\nTask: ${task}\n\nWhich of these files do you need to see to complete this task? Reply with ONLY a JSON array of file paths, nothing else.`;

const pickResponse = await puter.ai.chat(pickPrompt, { model: MODEL });
let neededFiles;
try {
  const jsonMatch = pickResponse.message.content.match(/\[[\s\S]*\]/);
  neededFiles = JSON.parse(jsonMatch[0]);
} catch (e) {
  console.error("Could not parse file list from model. Raw response:");
  console.error(pickResponse.message.content);
  process.exit(1);
}

console.log("Files selected:", neededFiles);

// 3. Read those files and ask for the fix
let context = "";
neededFiles.forEach(f => {
  if (fs.existsSync(f)) {
    context += `\n\n--- FILE: ${f} ---\n${fs.readFileSync(f, "utf8")}`;
  }
});

const editPrompt = `Task: ${task}\n\nHere are the relevant files:${context}\n\nReturn ONLY a JSON object mapping each file path to its FULL corrected content. Example: {"path/to/file.js": "...full new content..."}. No explanation, no markdown fences.`;

console.log("Asking Qwen to generate the fix...");
const editResponse = await puter.ai.chat(editPrompt, { model: MODEL });

let edits;
try {
  const jsonMatch = editResponse.message.content.match(/\{[\s\S]*\}/);
  edits = JSON.parse(jsonMatch[0]);
} catch (e) {
  console.error("Could not parse edits. Raw response:");
  console.error(editResponse.message.content);
  process.exit(1);
}

// 4. Write the changes
Object.entries(edits).forEach(([filePath, newContent]) => {
  fs.writeFileSync(filePath, newContent);
  console.log("Updated:", filePath);
});

console.log("Done.");