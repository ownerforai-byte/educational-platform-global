import json, io, re, sys

FIELDS_LIST = ["notes","confusion","practice","universalFacts","examples","practiceQuestions",
               "formulas","keyPoints","specialNotes","importantStatements","importantNotes",
               "examShortTricks","examNotes","importantConcepts","importantTasks","mcs"]
FIELDS_STR = ["summary"]

def parse(md_text):
    fields = {}
    cur = None
    buf = []
    for line in md_text.splitlines():
        m = re.match(r"^@@([\w-]+)@@\s*$", line)
        if m:
            if cur is not None:
                fields[cur] = "\n".join(buf).strip()
            cur = m.group(1)
            buf = []
        elif cur is not None:
            buf.append(line)
    if cur is not None:
        fields[cur] = "\n".join(buf).strip()
    return fields

def split_blocks(text):
    return [b.strip() for b in text.split("%%%") if b.strip()]

def main(md_path, target_path):
    md = io.open(md_path, encoding="utf-8").read()
    fields = parse(md)
    d = json.load(io.open(target_path, encoding="utf-8"))
    ec = d.get("enrichedContent")
    if not isinstance(ec, dict):
        ec = {}
        d["enrichedContent"] = ec
    updated = []
    for f, val in fields.items():
        if f == "mcs" or f == "mcqs":
            arr = json.loads(val)
            d["mcqs"] = arr
            d.setdefault("mcs", arr)
            updated.append("mcqs")
        elif f in FIELDS_LIST:
            blocks = split_blocks(val)
            d[f] = blocks
            if f in ec or f in ("notes","confusion","keyPoints","importantConcepts","examples",
                                "universalFacts","importantStatements","importantNotes","specialNotes",
                                "examShortTricks","examNotes","practice","practiceQuestions"):
                ec[f] = blocks
            updated.append(f"{f}({len(blocks)})")
        elif f in FIELDS_STR:
            d[f] = val
            if "summary" in ec:
                ec["summary"] = val
            updated.append("summary")
        else:
            print("WARN unknown field:", f)
    json.dump(d, io.open(target_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    base = target_path.split("/")[-1].split("\\")[-1]
    print("updated", base[:60], "; ".join(updated), "chars:", sum(len(v) for v in fields.values()))

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
