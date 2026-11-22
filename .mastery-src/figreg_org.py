# Verifies figure keywords against canonical Basic Concept of Organic Chemistry JSONs, then inserts registry entries.
import json, io
BASE = "content/notes/concepts/class-11/chemistry/basic-concept-of-organic-chemistry/"
FILES = {
 96: "01-introduction-to-organic-chemistry-and-organic-compounds.json",
 97: "02-reasons-for-the-separate-study-of-organic-compounds-from-inorganic-compounds.json",
 98: "03-tetra-covalency-and-catenation-properties-of-carbon.json",
 99: "04-classification-of-organic-compounds.json",
 100: "05-alkyl-groups-functional-groups-and-homologous-series.json",
 101: "06-idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula.json",
 102: "07-preliminary-idea-of-cracking-and-reforming-quality-of-gasoline-octane-number-cetane-number-and-g.json",
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
 (96, "wohler-urea-experiment.tsx", "WohlerUreaExperiment", "Wohler 1828: ammonium cyanate into urea", "vital force"),
 (96, "organic-compound-sources.tsx", "OrganicCompoundSources", "Sources of organic compounds", "petroleum"),
 (96, "organic-vs-inorganic-props.tsx", "OrganicVsInorganicProps", "Organic vs inorganic properties", "flammable"),
 (96, "carbon-compound-exclusions.tsx", "CarbonCompoundExclusions", "Carbon compounds excluded from organic chemistry", "cyanide"),
 (96, "vital-force-timeline.tsx", "VitalForceTimeline", "From vital force to synthetic chemistry", "berzelius"),
 (96, "organic-property-six.tsx", "OrganicPropertySix", "Six characteristic properties", "isomerism"),
 (96, "isomer-pair-c2h6o.tsx", "IsomerPairC2H6O", "One formula, two compounds", "dimethyl ether"),
 (97, "separate-study-reasons.tsx", "SeparateStudyReasons", "Three reasons for separate study", "chromatography"),
 (97, "catenation-count-contrast.tsx", "CatenationCountContrast", "The count gap between organic and inorganic", "tens of millions"),
 (97, "covalent-vs-ionic-lattice.tsx", "CovalentVsIonicLattice", "Molecules versus ionic lattices", "ionic"),
 (97, "study-methods-toolkit.tsx", "StudyMethodsToolkit", "The organic toolkit of methods", "crystallisation"),
 (97, "reaction-speed-contrast.tsx", "ReactionSpeedContrast", "Fast ionic versus slow molecular reactions", "catalysed"),
 (97, "border-compounds-panel.tsx", "BorderCompoundsPanel", "The conventional border compounds", "carbides"),
 (97, "wohler-verdict-panel.tsx", "WohlerVerdictPanel", "What died and what survived", "behavioural"),
 (98, "carbon-excited-state.tsx", "CarbonExcitedState", "Excited state gives four unpaired electrons", "excited"),
 (98, "tetravalency-energy-ledger.tsx", "TetravalencyEnergyLedger", "The energy ledger of tetravalency", "406"),
 (98, "methane-tetrahedral.tsx", "MethaneTetrahedral", "Methane: four equivalent bonds", "tetrahedral"),
 (98, "catenation-chain-types.tsx", "CatenationChainTypes", "Straight, branched and cyclic chains", "branched"),
 (98, "cc-vs-sisi-ladder.tsx", "CcVsSisiLadder", "C-C versus Si-Si bond strengths", "226"),
 (98, "isomer-explosion-chart.tsx", "IsomerExplosionChart", "The isomer explosion with carbon count", "300,000"),
 (98, "allotrope-variety.tsx", "AllotropeVariety", "Allotropic variety of carbon", "diamond"),
 (99, "organic-classification-tree.tsx", "OrganicClassificationTree", "The classification tree of organic compounds", "heterocyclic"),
 (99, "saturation-ladder.tsx", "SaturationLadder", "Saturated versus unsaturated bonds", "ethyne"),
 (99, "alicyclic-vs-aromatic.tsx", "AlicyclicVsAromatic", "Alicyclic versus aromatic rings", "cyclohexane"),
 (99, "heterocycle-trio.tsx", "HeterocycleTrio", "Pyridine, furan and pyrrole", "pyrrole"),
 (99, "functional-family-map.tsx", "FunctionalFamilyMap", "Functional groups mapped to families", "ester"),
 (99, "aromatic-stability-note.tsx", "AromaticStabilityNote", "Aromaticity as pi-electron stability", "delocalised"),
 (99, "classification-examples.tsx", "ClassificationExamples", "Sorting compounds into their leaves", "naphthalene"),
 (100, "alkyl-group-derivation.tsx", "AlkylGroupDerivation", "Alkane minus one hydrogen gives an alkyl group", "isopropyl"),
 (100, "functional-group-gallery.tsx", "FunctionalGroupGallery", "Gallery of functional groups", "amine"),
 (100, "homologous-ladder-alkanols.tsx", "HomologousLadderAlkanols", "The alkanol ladder of boiling points", "propan-1-ol"),
 (100, "ch2-increment-rule.tsx", "Ch2IncrementRule", "Successive homologues differ by CH2", "14 u"),
 (100, "gradation-vs-uniformity.tsx", "GradationVsUniformity", "Gradation in physics, uniformity in chemistry", "gradation"),
 (100, "neb2022-homologue-panel.tsx", "Neb2022HomologuePanel", "NEB 2022: functional group and homologous series", "alkanol"),
 (100, "r-group-anatomy.tsx", "RGroupAnatomy", "Anatomy of an organic molecule: R plus X", "monovalent"),
 (101, "formula-notation-ladder.tsx", "FormulaNotationLadder", "Four notations for one molecule", "bond-line"),
 (101, "c2h6o-isomer-test.tsx", "C2H6OIsomerTest", "Where the molecular formula fails", "c2h6o"),
 (101, "bond-line-conventions.tsx", "BondLineConventions", "Conventions of bond-line formulas", "vertex"),
 (101, "ethanol-three-ways.tsx", "EthanolThreeWays", "Ethanol written three ways", "ch3ch2oh"),
 (101, "zigzag-reading-drill.tsx", "ZigzagReadingDrill", "Reading a zig-zag as pentane", "pentane"),
 (101, "condensed-formula-examples.tsx", "CondensedFormulaExamples", "Condensed formulas of three compounds", "acetic acid"),
 (101, "multiple-bond-lines.tsx", "MultipleBondLines", "Drawing single double and triple bonds", "butane"),
 (102, "cracking-vs-reforming.tsx", "CrackingVsReforming", "Cracking cuts, reforming reshapes", "c10h22"),
 (102, "catalytic-cracking-flow.tsx", "CatalyticCrackingFlow", "Catalytic cracking over zeolite", "zeolite"),
 (102, "reforming-platforming.tsx", "ReformingPlatforming", "Platforming with platinum catalyst", "platforming"),
 (102, "octane-scale-panel.tsx", "OctaneScalePanel", "The octane number scale", "iso-octane"),
 (102, "cetane-scale-panel.tsx", "CetaneScalePanel", "The cetane number scale", "methylnaphthalene"),
 (102, "knocking-mechanism.tsx", "KnockingMechanism", "Knocking and why branching prevents it", "knock"),
 (102, "fuel-additive-timeline.tsx", "FuelAdditiveTimeline", "The gasoline additive story", "mtbe"),
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
 96: "introduction-to-organic-chemistry-and-organic-compounds",
 97: "reasons-for-the-separate-study-of-organic-compounds-from-inorganic-compounds",
 98: "tetra-covalency-and-catenation-properties-of-carbon",
 99: "classification-of-organic-compounds",
 100: "alkyl-groups-functional-groups-and-homologous-series",
 101: "idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula",
 102: "preliminary-idea-of-cracking-and-reforming-quality-of-gasoline-octane-number-cetane-number-and-g",
}
imports, entries = [], []
for row in range(96, 103):
    items = [r for r in REG if r[0] == row]
    imports.extend("import { %s } from \"./%s\";" % (c, f[:-4]) for _, f, c, _, _ in items)
    figs = ",\n".join(
        "    { Component: %s, caption: %s, alt: %s, keyword: %s }" % (c, json.dumps(t), json.dumps("Diagram: " + t.lower()), json.dumps(k))
        for _, f, c, t, k in items)
    entries.append('  "%s": {\n    title: %s,\n    figures: [\n%s,\n  ],\n  },' % (SLUGS[row], json.dumps(items[0][3]), figs))

anchor = "\n};\n\n/**\n * Look up figures"
assert anchor in src
lines = src.split("\n")
last_imp = max(i for i, l in enumerate(lines) if l.startswith("import "))
lines.insert(last_imp + 1, "\n".join(imports))
src = "\n".join(lines)
src = src.replace(anchor, "\n" + "\n".join(entries) + "\n" + anchor)
io.open(regp, "w", encoding="utf-8", newline="\n").write(src)
print("registry updated:", len(imports), "imports,", len(entries), "entries")
