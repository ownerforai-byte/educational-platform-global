import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data", "syllabus-notes", "physics");
const REQUIRED = ["summary","importantConcepts","importantStatements","importantTasks","keyPoints","specialNotes","examShortTricks","examNotes","practiceQuestions","mcs"];
function isBoilerplate(t){if(!t)return true;return /^Key Formula \d+:/i.test(t)||/^Key Point \d+:/i.test(t)||/^Example \d+:/i.test(t)||/^Q\d+\.\s*(Define and explain|Solve problems|Differentiate between|Derive the key formula|What are the applications)/i.test(t);}
function populated(v){if(v==null)return 0;if(typeof v==="string")return v.trim()?1:0;if(Array.isArray(v))return v.filter(x=>!isBoilerplate(String(x))).length;return Object.keys(v).length?1:0;}
async function* walk(d){let e;try{e=await readdir(d,{withFileTypes:true});}catch{return;}for(const x of e){const f=join(d,x.name);if(x.isDirectory())yield* walk(f);else if(x.name.endsWith(".json")&&x.name!=="_manifest.json")yield f;}}
let todo=0, skip=0;
const rows=[];
for await (const f of walk(ROOT)) {
  const rel=f.slice(ROOT.length+1).replace(/\\/g,"/");
  let j;try{j=JSON.parse(await readFile(f,"utf8"));}catch(e){console.log("PARSE_FAIL "+rel);continue;}
  const missing=REQUIRED.filter(k=>populated(j[k])===0);
  if(!missing.length){skip++;continue;}
  todo++;
  rows.push(rel+" :: "+missing.join(","));
}
console.log("INCOMPLETE: "+todo+"  COMPLETE(skipped): "+skip);
const bySig={};
for(const r of rows){const sig=r.split(" :: ")[1];bySig[sig]=(bySig[sig]||0)+1;}
console.log("\nSIGNATURES:");for(const[k,v]of Object.entries(bySig).sort((a,b)=>b[1]-a[1]))console.log("  "+v+" x  ["+k+"]");
console.log("\nALL:");for(const r of rows)console.log("  "+r);
await writeFile(join(dirname(fileURLToPath(import.meta.url)),"tmp-incomplete.txt"), rows.join("\n"));
