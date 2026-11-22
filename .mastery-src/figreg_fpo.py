# Verifies figure keywords against canonical Fundamental Principles of Organic Chemistry JSONs, then inserts registry entries.
import json, io, re
BASE = "content/notes/concepts/class-11/chemistry/fundamental-principles-of-organic-chemistry/"
FILES = {
 103: "01-iupac-nomenclature-of-organic-compounds-up-to-chain-having-6-carbon-atoms.json",
 104: "02-qualitative-analysis-of-organic-compounds-detection-of-n-s-and-halogens-by-lassaigne-s-test.json",
 105: "03-isomerism-in-organic-compounds-definition-and-classification-of-isomerism.json",
 106: "04-structural-isomerism-and-its-types-chain-isomerism-position-isomerism-functional-isomerism-metam.json",
 107: "05-concept-of-geometrical-isomerism-cis-and-trans-and-optical-isomerism-d-and-l-form.json",
 108: "06-preliminary-idea-of-reaction-mechanism-homolytic-and-heterolytic-fission.json",
 109: "07-electrophiles-nucleophiles-and-free-radicals.json",
 110: "08-inductive-effect-i-and-i-effect.json",
 111: "09-resonance-effect-r-and-r-effect.json",
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
 (103, "iupac-naming-workflow.tsx", "IupacNamingWorkflow", "The five-step IUPAC naming workflow", "nomenclature"),
 (103, "carbon-root-ladder.tsx", "CarbonRootLadder", "Root names meth through hex", "hex"),
 (103, "suffix-priority-panel.tsx", "SuffixPriorityPanel", "The suffix ladder of functional groups", "suffix"),
 (103, "locant-rule-demo.tsx", "LocantRuleDemo", "The lowest-locant rule on pentane", "locant"),
 (103, "butan-2-ol-naming.tsx", "Butan2olNaming", "NEB 2024 PYQ: naming butan-2-ol", "butan-2-ol"),
 (103, "neb-2023-name-walkthrough.tsx", "Neb2023NameWalkthrough", "NEB 2023 PYQ: 2-ethyl-5-methylhexan-1-ol", "ethyl"),
 (103, "common-vs-iupac-names.tsx", "CommonVsIupacNames", "Common versus IUPAC names", "acetic"),
 (104, "lassaigne-test-flow.tsx", "LassaigneTestFlow", "Lassaigne's test workflow", "fusion"),
 (104, "sodium-fusion-extract.tsx", "SodiumFusionExtract", "The sodium fusion extract", "sodium"),
 (104, "nitrogen-prussian-blue.tsx", "NitrogenPrussianBlue", "Nitrogen test: Prussian blue", "prussian blue"),
 (104, "sulphur-tests-panel.tsx", "SulphurTestsPanel", "Sulphur tests: nitroprusside and lead acetate", "nitroprusside"),
 (104, "halide-silver-tests.tsx", "HalideSilverTests", "Halide tests with silver nitrate", "agno₃"),
 (104, "blood-red-complication.tsx", "BloodRedComplication", "N plus S giving blood-red thiocyanate", "blood red"),
 (104, "element-detection-map.tsx", "ElementDetectionMap", "Complete Lassaigne detection map", "lassaigne"),
 (105, "isomerism-definition-panel.tsx", "IsomerismDefinitionPanel", "Isomerism: the definition", "same molecular formula"),
 (105, "isomerism-family-tree.tsx", "IsomerismFamilyTree", "The isomerism family tree", "stereoisomerism"),
 (105, "structural-branch-overview.tsx", "StructuralBranchOverview", "Five types of structural isomerism", "structural"),
 (105, "stereo-branch-overview.tsx", "StereoBranchOverview", "Two types of stereoisomerism", "geometrical"),
 (105, "c4h10-isomer-pair.tsx", "C4H10IsomerPair", "Butane chain isomers of C4H10", "butane"),
 (105, "c2h6o-functional-pair.tsx", "C2H6OFunctionalPair", "Ethanol and dimethyl ether", "dimethyl ether"),
 (105, "isomer-count-ladder.tsx", "IsomerCountLadder", "Isomer count rising with carbon number", "isomers"),
 (106, "chain-isomerism-demo.tsx", "ChainIsomerismDemo", "Chain isomerism: pentane skeletons", "chain"),
 (106, "position-isomerism-demo.tsx", "PositionIsomerismDemo", "Position isomerism: propanols", "position"),
 (106, "functional-isomerism-demo.tsx", "FunctionalIsomerismDemo", "Functional isomerism pairs", "ethanol"),
 (106, "metamerism-demo.tsx", "MetamerismDemo", "Metamerism: ether alkyl splits", "metamerism"),
 (106, "tautomerism-demo.tsx", "TautomerismDemo", "Tautomerism: keto-enol equilibrium", "tautomerism"),
 (106, "five-types-quick-id.tsx", "FiveTypesQuickId", "Quick identification of the five types", "skeleton"),
 (106, "structural-vs-stereo-line.tsx", "StructuralVsStereoLine", "Connectivity divides structural from stereo", "connectivity"),
 (107, "cis-trans-but2ene.tsx", "CisTransBut2ene", "Cis and trans but-2-ene", "but-2-ene"),
 (107, "pi-bond-rotation-lock.tsx", "PiBondRotationLock", "Pi bond rotation lock", "rotation"),
 (107, "cis-trans-property-contrast.tsx", "CisTransPropertyContrast", "Property contrast of cis and trans", "dipole"),
 (107, "chiral-centre-lactic.tsx", "ChiralCentreLactic", "Chiral carbon of lactic acid", "lactic"),
 (107, "plane-polarised-light-test.tsx", "PlanePolarisedLightTest", "Polarimeter test of optical activity", "plane"),
 (107, "d-l-pair-panel.tsx", "DLPairPanel", "Dextrorotatory and laevorotatory pair", "dextrorotatory"),
 (107, "racemic-mixture-panel.tsx", "RacemicMixturePanel", "Racemic mixture optical cancellation", "racemic"),
 (108, "bond-fission-two-ways.tsx", "BondFissionTwoWays", "Homolytic versus heterolytic fission", "homolytic"),
 (108, "homolysis-radical-birth.tsx", "HomolysisRadicalBirth", "Chlorine homolysis in sunlight", "cl\u2082"),
 (108, "heterolysis-ion-birth.tsx", "HeterolysisIonBirth", "Heterolysis of tert-butyl chloride", "carbocation"),
 (108, "radical-vs-ion-species.tsx", "RadicalVsIonSpecies", "Radical, carbocation, carbanion", "carbanion"),
 (108, "curly-arrow-notation.tsx", "CurlyArrowNotation", "Curly arrow notation", "arrow"),
 (108, "methane-chlorination-chain.tsx", "MethaneChlorinationChain", "Methane chlorination chain steps", "chlorination"),
 (108, "fission-condition-map.tsx", "FissionConditionMap", "Conditions selecting the fission mode", "polar"),
 (109, "three-attacker-classes.tsx", "ThreeAttackerClasses", "The three reagent classes", "electrophile"),
 (109, "electrophile-roster.tsx", "ElectrophileRoster", "Electrophile roster with BF3", "bf\u2083"),
 (109, "nucleophile-roster.tsx", "NucleophileRoster", "Nucleophile roster", "nucleophile"),
 (109, "radical-chain-stages.tsx", "RadicalChainStages", "Initiation, propagation, termination", "initiation"),
 (109, "attacker-target-match.tsx", "AttackerTargetMatch", "Attacker to target matching", "electron-rich"),
 (109, "lewis-acid-base-link.tsx", "LewisAcidBaseLink", "Lewis acid-base connection", "lewis"),
 (109, "neutral-member-examples.tsx", "NeutralMemberExamples", "Neutral electrophiles and nucleophiles", "ammonia"),
 (110, "inductive-effect-concept.tsx", "InductiveEffectConcept", "Inductive effect concept", "inductive"),
 (110, "minus-i-group-roster.tsx", "MinusIGroupRoster", "Minus I electron-withdrawing groups", "electron-withdrawing"),
 (110, "plus-i-group-roster.tsx", "PlusIGroupRoster", "Plus I alkyl electron releasers", "alkyl"),
 (110, "distance-decay-panel.tsx", "DistanceDecayPanel", "Inductive effect fading with distance", "distance"),
 (110, "acidity-ladder-ccx.tsx", "AcidityLadderCcx", "Acidity ladder of chloroacetic acids", "chloroacetic"),
 (110, "carbocation-stability-order.tsx", "CarbocationStabilityOrder", "Carbocation stability order", "tertiary"),
 (110, "charge-dispersal-logic.tsx", "ChargeDispersalLogic", "Charge dispersal stabilises ions", "dispersal"),
 (111, "resonance-hybrid-idea.tsx", "ResonanceHybridIdea", "The resonance hybrid idea", "hybrid"),
 (111, "canonical-rules-panel.tsx", "CanonicalRulesPanel", "Rules for canonical structures", "atoms"),
 (111, "ozone-canonical-structures.tsx", "OzoneCanonicalStructures", "Ozone canonical structures", "ozone"),
 (111, "benzene-kekule-pair.tsx", "BenzeneKekulePair", "Benzene Kekule pair", "kekul\u00e9"),
 (111, "resonance-energy-bar.tsx", "ResonanceEnergyBar", "Resonance energy of benzene", "150"),
 (111, "plus-r-group-flow.tsx", "PlusRGroupFlow", "Plus R groups enrich ortho para", "ortho"),
 (111, "minus-r-group-flow.tsx", "MinusRGroupFlow", "Minus R groups direct meta", "meta"),
]

SLUG = "fundamental-principles-of-organic-chemistry"
# 1) verify keywords
miss = []
for row, fn, comp, cap, kw in REG:
    if kw.lower() not in TEXT[row]:
        miss.append((row, fn, kw))
if miss:
    print("MISSES:")
    for m in miss: print(" ", m)
    raise SystemExit(1)
print("all", len(REG), "keywords verified")

# 2) insert imports after last top-level import; entries before tail anchor
regp = "frontend/features/docs/figures/registry.ts"
s = io.open(regp, encoding="utf-8").read()
assert "IupacNamingWorkflow" not in s, "already inserted"
lines = s.split("\n")
last_imp = max(i for i, l in enumerate(lines) if l.startswith("import "))
imports = "\n".join('import { %s } from "./%s";' % (c, f[:-4]) for _, _, c, _, f in [(r, fn, c, cap, fn) for r, fn, c, cap, kw in REG])
lines[last_imp+1:last_imp+1] = imports.split("\n")
s = "\n".join(lines)
anchor = "\n};\n\n/**\n * Look up figures"
i = s.find(anchor)
assert i > 0
entries = []
for row, fn, comp, cap, kw in REG:
    entries.append('    { Component: %s, caption: "%s", alt: "Diagram: %s", keyword: "%s" },' % (comp, cap, cap, kw))
block = "\n  \"%s\": [\n%s\n  ],\n" % (SLUG, "\n".join(entries))
s = s[:i] + block + s[i:]
io.open(regp, "w", encoding="utf-8", newline="").write(s)
print("registry updated:", len(REG), "entries")
