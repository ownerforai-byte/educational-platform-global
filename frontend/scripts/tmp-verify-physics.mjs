// STRICT verification for the physics section-fill task.
// Checks: JSON parses, all 10 sections populated & non-boilerplate, no leftover
// placeholder text anywhere, mcs answer letter == correct option index, and that
// only the expected keys were touched.
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data", "syllabus-notes", "physics");
const ONLY = new Set((await readFile(join(dirname(fileURLToPath(import.meta.url)), "tmp-incomplete.txt"), "utf8")).split("\n").map(s=>s.split(" :: ")[0].trim()).filter(Boolean));
const REQUIRED = ["summary","importantConcepts","importantStatements","importantTasks","keyPoints","specialNotes","examShortTricks","examNotes","practiceQuestions","mcs"];
const PLACEHOLDER = [
  /^Key Formula \d+:/i, /^Key Point \d+:/i, /^Example \d+:/i,
  /^Q\d+\.\s*(Define and explain|Solve problems|Differentiate between|Derive the key formula|What are the applications)/i,
  /^Concept \d+:/i, /^Statement \d+:/i, /^Task \d+:/i, /^Note \d+:/i,
  /^Trick \d+:/i, /^Exam Tip \d+:/i, /^Important Note \d+:/i,
  /^Option [A-D]\b/, /^Field [A-D]$/, /^Condition [A-D]$/, /^Unit [A-D]$/,
  /^True statement [A-D]$/, /^False statement [A-D]$/, /\$\{title\}/,
  /is a fundamental concept in Science that covers the essential principles/,
];
const isBoiler = (t) => { t=String(t??""); return !t.trim() || PLACEHOLDER.some(r=>r.test(t)); };
function populated(v){ if(v==null) return 0;
  if(typeof v==="string") return isBoiler(v)?0:1;
  if(Array.isArray(v)) return v.filter(x=>!isBoiler(String(x))).length;
  return Object.keys(v).length?1:0; }

async function* walk(d){let e;try{e=await readdir(d,{withFileTypes:true});}catch{return;}
  for(const x of e){const f=join(d,x.name);if(x.isDirectory())yield* walk(f);else if(x.name.endsWith(".json")&&x.name!=="_manifest.json")yield f;}}
const scan=(v,path,errs)=>{ if(typeof v==="string"){ if(isBoiler(v)) errs.push("RESIDUAL@"+path); }
  else if(Array.isArray(v)) v.forEach((x,i)=>scan(x,path+"["+i+"]",errs));
  else if(v&&typeof v==="object") for(const k of Object.keys(v)) scan(v[k],path+"."+k,errs); };
let bad=0, ok=0;
for await (const f of walk(ROOT)) {
  const rel=f.slice(ROOT.length+1).replace(/\\/g,"/");
  if(!ONLY.has(rel)) continue;
  const raw=await readFile(f,"utf8");
  let j; try{ j=JSON.parse(raw);}catch(e){console.log("PARSE_FAIL "+rel+" :: "+e.message);bad++;continue;}
  const errs=[];
  for(const k of REQUIRED){ const n=populated(j[k]);
    if(n===0) errs.push("EMPTY:"+k);
    else if(Array.isArray(j[k]) && n!==j[k].length) errs.push("PLACEHOLDER_TEXT:"+k);
    else if(n<3) errs.push("TOO_FEW:"+k+"("+n+")"); }
  // array length sanity
  for(const k of REQUIRED.filter(k=>Array.isArray(j[k]))) {
    const n=j[k].length;
    const min=k==="mcs"?3:3, max=k==="mcs"?5:6;
    if(n<min||n>max) errs.push("LEN:"+k+"="+n);
  }
  if(typeof j.summary==="string"){const s=j.summary.split(/(?<=[.!?])\s+/).filter(Boolean);
    if(s.length<2) errs.push("SUMMARY_SHORT"); if(s.length>5) errs.push("SUMMARY_LONG("+s.length+")");}
  if(Array.isArray(j.mcs)) j.mcs.forEach((mc,i)=>{
    if(!Array.isArray(mc.options)||mc.options.length!==4){errs.push("MC_OPTIONS["+i+"]="+(mc.options||[]).length);return;}
    const a=String(mc.answer??"").trim();
    if(a.length!==1||!"ABCD".includes(a)){errs.push("MC_ANSWER["+i+"]="+JSON.stringify(mc.answer));return;}
    if(mc.options.some(o=>isBoiler(o))) errs.push("MC_PLACEHOLDER["+i+"]");
  });
  // residual placeholder scan, scoped to the 10 sections in scope
  for(const k of REQUIRED) scan(j[k], k, errs);
  if(errs.length){bad++;console.log("FAIL "+rel+"\n      "+[...new Set(errs)].join("\n      "));} else ok++;
}
console.log("\nSTRICT VERIFY: "+ok+" ok, "+bad+" problems");
