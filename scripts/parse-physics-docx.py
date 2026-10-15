import os, re, json, csv, docx

DOCS_DIR = r"frontend\public\materials\physics-xi"
OUTPUT_DIR = r"frontend\public\data\physics-xi-resources"

os.makedirs(OUTPUT_DIR, exist_ok=True)

manifest_path = os.path.join(DOCS_DIR, "MANIFEST.csv")
manifest_entries = []

with open(manifest_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        if not row or len(row) < 4:
            continue
        manifest_entries.append({
            "unit_no": int(row[0].strip()),
            "unit_name": row[1].strip(),
            "content_area": row[2].strip(),
            "docx_file": row[3].strip()
        })

UNIT_ID_MAP = {
    1: "physical-quantities",
    2: "vectors",
    3: "kinematics",
    4: "dynamics",
    5: "work-energy-and-power",
    6: "circular-motion",
    7: "gravitation",
    8: "elasticity",
    9: "heat-and-temperature",
    10: "thermal-expansion",
    11: "quantity-of-heat",
    12: "rate-of-heat-flow",
    13: "ideal-gas",
    14: "reflection-at-curved-mirror",
    15: "refraction-at-plane-surfaces",
    16: "refraction-through-prisms",
    17: "lenses",
    18: "dispersion",
    19: "electric-charges",
    20: "electric-field",
    21: "potential-potential-difference-and-potential-energy",
    22: "capacitor",
    23: "dc-circuits",
    24: "nuclear-physics",
    25: "solids",
    26: "recent-trends-in-physics"
}

print(f"Loaded {len(manifest_entries)} manifest entries.")

results = []

for entry in manifest_entries:
    u_no = entry["unit_no"]
    d_file = entry["docx_file"]
    file_path = os.path.join(DOCS_DIR, d_file)
    unit_id = UNIT_ID_MAP[u_no]
    
    if not os.path.exists(file_path):
        print(f"ERROR: File not found: {file_path}")
        continue
        
    doc = docx.Document(file_path)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    
    p0 = paras[0] if len(paras) > 0 else ""
    p1 = paras[1] if len(paras) > 1 else ""
    p2 = paras[2] if len(paras) > 2 else ""
    
    tables_data = []
    for t in doc.tables:
        t_rows = []
        for r in t.rows:
            t_rows.append([c.text.strip().replace("\n", " ") for c in r.cells])
        if t_rows:
            tables_data.append({
                "headers": t_rows[0],
                "rows": t_rows[1:]
            })
            
    questions = []
    theory_items = []
    formulas = []
    current_q = None
    in_formulas = False
    in_theory = False
    current_theory_cat = ""
    
    for p in paras[3:]:
        if "★ Quick-formula memos" in p or "Quick-formula memos" in p:
            in_formulas = True
            in_theory = False
            continue
            
        if in_formulas:
            formulas.append(p)
            continue
            
        if p.startswith("▹"):
            in_theory = True
            current_theory_cat = p.replace("▹", "").strip()
            continue
            
        q_match = re.match(r"^(Q\d+\..*?|\[.*?\]\s*T\d+\..*?)$", p)
        if q_match:
            q_text = p
            if in_theory:
                current_q = {
                    "type": "theory",
                    "category": current_theory_cat,
                    "question": q_text,
                    "answer": "",
                    "shortcut": "",
                    "example": ""
                }
                theory_items.append(current_q)
            else:
                current_q = {
                    "type": "neb",
                    "question": q_text,
                    "answer": "",
                    "shortcut": "",
                    "example": ""
                }
                questions.append(current_q)
            continue
            
        if current_q:
            if p.startswith("Answer:"):
                current_q["answer"] = p.replace("Answer:", "").strip()
            elif "Shortcut:" in p or "Short / exam line:" in p:
                current_q["shortcut"] = re.sub(r"^.*?Shortcut:\s*", "", p)
                current_q["shortcut"] = re.sub(r"^.*?Short / exam line:\s*", "", current_q["shortcut"]).strip()
            elif p.startswith("Example:"):
                current_q["example"] = p.replace("Example:", "").strip()
            elif not current_q["answer"]:
                current_q["answer"] = p
            else:
                current_q["answer"] += " " + p
                
    unit_data = {
        "unitNo": u_no,
        "unitId": unit_id,
        "unitName": entry["unit_name"],
        "contentArea": entry["content_area"],
        "docxFileName": d_file,
        "docxUrl": f"/materials/physics-xi/{d_file}",
        "titleBlock": {
            "course": p0,
            "heading": p1,
            "subtitle": p2
        },
        "stats": {
            "paragraphCount": len(paras),
            "tableCount": len(tables_data),
            "questionCount": len(questions),
            "theoryCount": len(theory_items),
            "formulaCount": len(formulas)
        },
        "tables": tables_data,
        "questions": questions,
        "theoryItems": theory_items,
        "formulas": formulas,
        "rawParagraphs": paras
    }
    
    out_file = os.path.join(OUTPUT_DIR, f"unit-{u_no:02d}-{unit_id}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(unit_data, f, indent=2, ensure_ascii=False)
        
    results.append({
        "unitNo": u_no,
        "unitId": unit_id,
        "unitName": entry["unit_name"],
        "contentArea": entry["content_area"],
        "docxFileName": d_file,
        "docxUrl": unit_data["docxUrl"],
        "jsonFile": f"/data/physics-xi-resources/unit-{u_no:02d}-{unit_id}.json",
        "titleBlock": unit_data["titleBlock"],
        "stats": unit_data["stats"]
    })

manifest_out = os.path.join(OUTPUT_DIR, "manifest.json")
with open(manifest_out, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Successfully parsed and wrote ALL {len(results)} units to {OUTPUT_DIR}!")
