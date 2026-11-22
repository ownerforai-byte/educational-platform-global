# Verifies figure keywords against canonical bio-inorganic JSONs, then inserts registry entries.
import json, io, re
BASE = "content/notes/concepts/class-11/chemistry/bio-inorganic-chemistry/"
FILES = {
 91: "01-introduction-to-bio-inorganic-chemistry.json",
 92: "02-micro-and-macro-nutrients.json",
 93: "03-importance-of-metal-ions-in-biological-systems-ions-of-na-k-mg-ca-fe-cu-zn-ni-co-cr.json",
 94: "04-ion-pumps-sodium-potassium-and-sodium-glucose-pump.json",
 95: "05-metal-toxicity-toxicity-due-to-iron-arsenic-mercury-lead-and-cadmium.json",
}
TEXT = {}
for k, fn in FILES.items():
    d = json.loads(io.open(BASE + fn, "rb").read().decode("utf-8-sig"))
    blob = []
    for key in ["notes","keyPoints","importantConcepts","examples","universalFacts","importantStatements","importantNotes","examShortTricks","examNotes","formulas","practice","practiceQuestions"]:
        v = d.get(key, [])
        if isinstance(v, list):
            blob.extend(str(x) for x in v)
    blob.append(d.get("summary",""))
    TEXT[k] = " ".join(blob).lower()

REG = [
 (91, "essential-element-tiers.tsx", "EssentialElementTiers", "Three tiers of essential elements", "essential elements"),
 (91, "metal-jobs-map.tsx", "MetalJobsMap", "Four jobs for a metal ion", "transport"),
 (91, "tier-need-chart.tsx", "TierNeedChart", "Requirements span seven orders of magnitude", "bulk"),
 (91, "metalloenzyme-panel.tsx", "MetalloenzymePanel", "Metalloenzyme: carbonic anhydrase", "carbonic anhydrase"),
 (91, "chelate-ring-panel.tsx", "ChelateRingPanel", "Chelation — the ring grips the metal", "porphyrin"),
 (91, "flagship-complexes.tsx", "FlagshipComplexes", "Chlorophyll vs haemoglobin", "chlorophyll"),
 (91, "dose-window.tsx", "DoseWindow", "The window of safety", "window of safety"),
 (92, "macro-seven-panel.tsx", "MacroSevenPanel", "The macro seven minerals", "100 mg"),
 (92, "trace-element-roster.tsx", "TraceElementRoster", "The trace ten elements", "trace element"),
 (92, "deficiency-disease-table.tsx", "DeficiencyDiseaseTable", "The deficiency disease table", "goitre"),
 (92, "iodine-thyroxine-flow.tsx", "IodineThyroxineFlow", "Iodine to thyroxine to goitre", "iodised salt"),
 (92, "two-anaemias-panel.tsx", "TwoAnaemiasPanel", "Two anaemias, two metals", "pernicious"),
 (92, "chlorosis-panel.tsx", "ChlorosisPanel", "Chlorosis — the plant's anaemia", "chlorosis"),
 (92, "macro-vs-micro-table.tsx", "MacroVsMicroTable", "Macro vs micro nutrients", "macro-nutrients"),
 (93, "ten-ion-roster.tsx", "TenIonRoster", "Ten ions, ten one-line jobs", "haemocyanin"),
 (93, "na-k-pair-panel.tsx", "NaKPairPanel", "Na outside, K inside", "extracellular"),
 (93, "calcium-jobs-panel.tsx", "CalciumJobsPanel", "Calcium: four careers", "hydroxyapatite"),
 (93, "hb-vs-chlorophyll-fig.tsx", "HbVsChlorophyllFig", "Function picks the metal", "porphyrin"),
 (93, "co-hijack-panel.tsx", "CoHijackPanel", "CO hijacks the O2 seat", "carboxyhaemoglobin"),
 (93, "d-block-vs-s-block.tsx", "DBlockVsSBlock", "s-block vs d-block toolkits", "coordination chemistry"),
 (93, "zinc-ni-cr-panel.tsx", "ZincNiCrPanel", "Zn, Ni and Cr specialists", "urease"),
 (94, "passive-vs-active.tsx", "PassiveVsActive", "Passive vs active transport", "active transport"),
 (94, "primary-vs-secondary.tsx", "PrimaryVsSecondary", "Primary vs secondary active transport", "secondary active transport"),
 (94, "na-k-pump-cycle.tsx", "NaKPumpCycle", "Na+/K+ ATPase: one ATP, five ions", "atpase"),
 (94, "pump-importance-panel.tsx", "PumpImportancePanel", "Why the pump never clocks out", "resting"),
 (94, "na-glucose-symport.tsx", "NaGlucoseSymport", "Na+-glucose symport", "symport"),
 (94, "ors-panel.tsx", "OrsPanel", "ORS at the bedside", "oral rehydration"),
 (94, "gradient-economy.tsx", "GradientEconomy", "The gradient is a currency", "gradient"),
 (95, "toxic-five-table.tsx", "ToxicFiveTable", "The toxic five metals", "itai-itai"),
 (95, "soft-metal-sulphur.tsx", "SoftMetalSulphur", "Soft metals love soft sulphur", "thiol"),
 (95, "mimicry-panel.tsx", "MimicryPanel", "Mimicry: wrong ion, right seat", "imitates"),
 (95, "minamata-story.tsx", "MinamataStory", "Minamata: bioaccumulation", "minamata"),
 (95, "lead-haem-block.tsx", "LeadHaemBlock", "Lead blocks the haem line", "ala dehydratase"),
 (95, "arsenic-groundwater.tsx", "ArsenicGroundwater", "Arsenic in well water", "10 ppb"),
 (95, "chelation-therapy-panel.tsx", "ChelationTherapyPanel", "Chelation therapy antidotes", "chelation therapy"),
]

miss = []
for row, fn, comp, title, kw in REG:
    if kw.lower() not in TEXT[row]:
        miss.append((row, fn, kw))
if miss:
    print("MISSES:")
    for m in miss: print(" ", m)
    raise SystemExit(1)
print("all", len(REG), "keywords verified")

regp = "frontend/features/docs/figures/registry.ts"
src = io.open(regp, encoding="utf-8").read()
for row, fn, comp, title, kw in REG:
    assert comp not in src, "already present: " + comp

SLUGS = {
 91: "introduction-to-bio-inorganic-chemistry",
 92: "micro-and-macro-nutrients",
 93: "importance-of-metal-ions-in-biological-systems-ions-of-na-k-mg-ca-fe-cu-zn-ni-co-cr",
 94: "ion-pumps-sodium-potassium-and-sodium-glucose-pump",
 95: "metal-toxicity-toxicity-due-to-iron-arsenic-mercury-lead-and-cadmium",
}
imports, entries = [], []
for row in range(91, 96):
    items = [r for r in REG if r[0] == row]
    imports.extend("import { %s } from \"./%s\";" % (c, f[:-4]) for _, f, c, _, _ in items)
    figs = ",\n".join(
        "    { Component: %s, caption: %s, alt: %s, keyword: %s }" % (c, json.dumps(t), json.dumps("Diagram: " + t.lower()), json.dumps(k))
        for _, f, c, t, k in items)
    entries.append('  "%s": {\n    title: %s,\n    figures: [\n%s,\n  ],\n  },' % (SLUGS[row], json.dumps(items[0][3]), figs))

# imports go after the last top-level import line; entries go before the closing anchor
anchor = "\n};\n\n/**\n * Look up figures"
assert anchor in src
lines = src.split("\n")
last_imp = max(i for i, l in enumerate(lines) if l.startswith("import "))
lines.insert(last_imp + 1, "\n".join(imports))
src = "\n".join(lines)
src = src.replace(anchor, "\n" + "\n".join(entries) + "\n" + anchor)
io.open(regp, "w", encoding="utf-8", newline="\n").write(src)
print("registry updated:", len(imports), "imports,", len(entries), "entries")
