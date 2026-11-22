# Verifies figure keywords against canonical Chemistry of Metals JSONs, then inserts registry entries.
import json, io, re, os
BASE = "content/notes/concepts/class-11/chemistry/chemistry-of-metals/"
FILES = {
 1: "01-metals-and-metallurgical-principles-definition-of-metallurgy-and-its-types-hydrometallurgy-pyrom.json",
 2: "02-introduction-of-ores-gangue-or-matrix-flux-and-slag-alloy-and-amalgam.json",
 3: "03-general-principles-of-extraction-of-metals-concentration-calcination-and-roasting-smelting-carbo.json",
 4: "04-refining-of-metals-poling-and-electro-refinement.json",
 5: "05-alkali-metals-general-characteristics-of-alkali-metals.json",
 6: "06-sodium-extraction-from-down-s-process-properties-action-with-oxygen-water-acids-nonmetals-and-am.json",
 7: "07-sodium-hydroxide-properties-precipitation-reaction-and-action-with-carbon-monoxide-and-uses.json",
 8: "08-sodium-carbonate-properties-action-with-co2-so2-water-precipitation-reactions-and-uses.json",
 9: "09-alkaline-earth-metals-general-characteristics-of-alkaline-earth-metals.json",
 10: "10-molecular-formula-and-uses-of-quick-lime-bleaching-powder-magnesia-plaster-of-paris-and-epsom-sa.json",
 11: "11-solubility-of-hydroxides-carbonates-and-sulphates-of-alkaline-earth-metals-general-trend-with-ex.json",
 12: "12-stability-of-carbonate-and-nitrate-of-alkaline-earth-metals-general-trend-with-explanation.json",
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
 (1, "metallurgy-three-routes.tsx", "MetallurgyThreeRoutes", "Three routes to the metal", "hydrometallurgy"),
 (1, "activity-series-routing.tsx", "ActivitySeriesRouting", "The activity series as a routing table", "activity series"),
 (1, "cyanide-leaching-loop.tsx", "CyanideLeachingLoop", "Hydrometallurgy: cyanide leaching of gold", "cyanide"),
 (1, "blast-furnace-route.tsx", "BlastFurnaceRoute", "Pyrometallurgy: the blast furnace route", "blast furnace"),
 (1, "molten-salt-electrolysis.tsx", "MoltenSaltElectrolysis", "Electrometallurgy: molten salt electrolysis", "electrometallurgy"),
 (1, "ore-vs-mineral-test.tsx", "OreVsMineralTest", "Is this mineral an ore? The profit test", "profitable"),
 (1, "five-steps-of-metallurgy.tsx", "FiveStepsOfMetallurgy", "The five steps of metallurgy", "crushing"),
 (2, "ore-gangue-flux-slag-map.tsx", "OreGangueFluxSlagMap", "Ore, gangue, flux, slag — one line", "gangue"),
 (2, "flux-families-panel.tsx", "FluxFamiliesPanel", "Acidic and basic fluxes", "acidic flux"),
 (2, "blast-furnace-slag-layer.tsx", "BlastFurnaceSlagLayer", "Slag floating on molten iron", "slag"),
 (2, "alloy-composition-table.tsx", "AlloyCompositionTable", "Brass, bronze, stainless steel", "brass"),
 (2, "amalgam-panel.tsx", "AmalgamPanel", "Amalgams — mercury as the solvent metal", "amalgam"),
 (2, "alloy-why-better.tsx", "AlloyWhyBetter", "Why alloys outperform pure metals", "alloying"),
 (2, "limestone-journey.tsx", "LimestoneJourney", "Limestone's journey through the furnace", "limestone"),
 (3, "concentration-three-ways.tsx", "ConcentrationThreeWays", "Three ways to concentrate an ore", "concentration"),
 (3, "froth-flotation-cell.tsx", "FrothFlotationCell", "Froth flotation of sulphide ores", "froth flotation"),
 (3, "calcination-vs-roasting.tsx", "CalcinationVsRoasting", "Calcination vs roasting", "calcination"),
 (3, "carbon-reduction-furnace.tsx", "CarbonReductionFurnace", "Carbon reduction in the furnace", "carbon reduction"),
 (3, "thermite-reaction.tsx", "ThermiteReaction", "The thermite reaction", "thermite"),
 (3, "hall-heroult-cell.tsx", "HallHeroultCell", "Hall–Héroult cell for aluminium", "cryolite"),
 (3, "reduction-method-map.tsx", "ReductionMethodMap", "Choosing the reduction method", "electrochemical reduction"),
 (4, "refining-method-picker.tsx", "RefiningMethodPicker", "Choosing the refining method", "refining"),
 (4, "distillation-refining.tsx", "DistillationRefining", "Distillation: volatile zinc", "distillation"),
 (4, "liquation-hearth.tsx", "LiquationHearth", "Liquation: tin on a sloping hearth", "liquation"),
 (4, "poling-green-wood.tsx", "PolingGreenWood", "Poling with green wood", "poling"),
 (4, "copper-electrorefining.tsx", "CopperElectrorefining", "Electrorefining of copper", "electrolytic refining"),
 (4, "anode-mud-value.tsx", "AnodeMudValue", "Anode mud — the profitable sludge", "anode mud"),
 (4, "electrorefining-selectivity.tsx", "ElectrorefiningSelectivity", "Why baser and noble impurities behave differently", "electrode potentials"),
 (5, "alkali-metal-family.tsx", "AlkaliMetalFamily", "The alkali metal family", "alkali metals"),
 (5, "alkali-trend-ladder.tsx", "AlkaliTrendLadder", "Trends down Group IA", "ionisation energy"),
 (5, "alkali-water-reaction.tsx", "AlkaliWaterReaction", "Alkali metals and water", "water"),
 (5, "alkali-flame-colours.tsx", "AlkaliFlameColours", "Flame colours of alkali metals", "flame"),
 (5, "oxide-ladder-ia.tsx", "OxideLadderIa", "The oxide ladder: Li₂O, Na₂O₂, KO₂", "superoxide"),
 (5, "lithium-exceptions.tsx", "LithiumExceptions", "Lithium — the diagonal dissenter", "lithium"),
 (5, "alkali-property-table.tsx", "AlkaliPropertyTable", "Alkali metals: property numbers", "melting point"),
 (6, "downs-cell-diagram.tsx", "DownsCellDiagram", "The Downs cell", "downs cell"),
 (6, "downs-why-cacl2.tsx", "DownsWhyCacl2", "Why CaCl₂ is added in the Downs cell", "600"),
 (6, "sodium-reactions-map.tsx", "SodiumReactionsMap", "Sodium's reaction map", "sodamide"),
 (6, "sodium-water-skate.tsx", "SodiumWaterSkate", "Sodium skates on water", "skates"),
 (6, "na2o2-bleach.tsx", "Na2o2Bleach", "Sodium peroxide as a bleaching agent", "peroxide"),
 (6, "sodium-uses-map.tsx", "SodiumUsesMap", "Uses of sodium metal", "coolant"),
 (6, "nacl-vs-mgcl2-cells.tsx", "NaclVsMgcl2Cells", "Downs cell vs fused MgCl₂ electrolysis", "magnesium"),
 (7, "naoh-properties-panel.tsx", "NaohPropertiesPanel", "NaOH — caustic soda", "deliquescent"),
 (7, "naoh-precipitation-colours.tsx", "NaohPrecipitationColours", "The precipitate colour chart", "pale blue"),
 (7, "amphoteric-dissolve.tsx", "AmphotericDissolve", "Amphoteric hydroxides dissolve in excess", "excess"),
 (7, "naoh-co2-stages.tsx", "NaohCo2Stages", "CO₂ into NaOH — two stages", "bicarbonate"),
 (7, "chlor-alkali-cell.tsx", "ChlorAlkaliCell", "The chlor-alkali cell", "chlor-alkali"),
 (7, "naoh-uses-map.tsx", "NaohUsesMap", "Uses of sodium hydroxide", "saponification"),
 (7, "naoh-vs-na2co3.tsx", "NaohVsNa2co3", "Caustic soda vs washing soda", "washing soda"),
 (8, "washing-soda-anatomy.tsx", "WashingSodaAnatomy", "Washing soda and efflorescence", "effloresc"),
 (8, "carbonate-hydrolysis-ph.tsx", "CarbonateHydrolysisPh", "Carbonate hydrolysis and pH", "hydrolysis"),
 (8, "na2co3-reaction-map.tsx", "Na2co3ReactionMap", "Na₂CO₃ reaction checklist", "sulphite"),
 (8, "water-softening-reaction.tsx", "WaterSofteningReaction", "Softening permanent hardness", "hardness"),
 (8, "na2co3-vs-naoh-nh3.tsx", "Na2co3VsNaohNh3", "The test that separates NaOH and Na₂CO₃", "ammonia"),
 (8, "solvay-loop.tsx", "SolvayLoop", "The Solvay process loop", "solvay"),
 (8, "na2co3-uses-map.tsx", "Na2co3UsesMap", "Uses of sodium carbonate", "glass"),
 (9, "alkaline-earth-family.tsx", "AlkalineEarthFamily", "The alkaline earth family", "alkaline earth metals"),
 (9, "iia-trend-panel.tsx", "IiaTrendPanel", "Trends down Group IIA", "ionisation energy"),
 (9, "iia-water-reaction.tsx", "IiaWaterReaction", "Water — the IIA escalation", "steam"),
 (9, "iia-flame-colours.tsx", "IiaFlameColours", "Flame colours of Group IIA", "apple-green"),
 (9, "iia-vs-ia-table.tsx", "IiaVsIaTable", "Group IA vs Group IIA", "alkali metals"),
 (9, "sulphate-ladder.tsx", "SulphateLadder", "The sulphate solubility ladder", "sulphate"),
 (9, "iia-compounds-panel.tsx", "IiaCompoundsPanel", "Nitrides and hydrides of Group IIA", "hydrolith"),
 (10, "quick-lime-cycle.tsx", "QuickLimeCycle", "The lime cycle", "slaking"),
 (10, "bleaching-powder-prep.tsx", "BleachingPowderPrep", "Bleaching powder preparation", "hasenclever"),
 (10, "available-chlorine-panel.tsx", "AvailableChlorinePanel", "Available chlorine and the bleaching agent", "available chlorine"),
 (10, "plaster-setting-panel.tsx", "PlasterSettingPanel", "Plaster of Paris: make and set", "dead-burnt"),
 (10, "magnesia-panel.tsx", "MagnesiaPanel", "Magnesia — MgO", "magnesite"),
 (10, "epsom-salt-panel.tsx", "EpsomSaltPanel", "Epsom salt", "epsom"),
 (10, "five-compounds-table.tsx", "FiveCompoundsTable", "Five compounds, five formulae, five jobs", "molecular formulae"),
 (11, "two-energies-balance.tsx", "TwoEnergiesBalance", "Solubility: a two-bill balance", "lattice energy"),
 (11, "hydroxide-ladder.tsx", "HydroxideLadder", "Hydroxides — the rising ladder", "56 g/l"),
 (11, "sulphate-ladder-detail.tsx", "SulphateLadderDetail", "Sulphates — the collapsing ladder", "2.4"),
 (11, "carbonate-ladder.tsx", "CarbonateLadder", "Carbonates — sinking gently", "practically insoluble"),
 (11, "anion-size-rule.tsx", "AnionSizeRule", "The anion-size rule", "anion"),
 (11, "baso4-test-panel.tsx", "Baso4TestPanel", "BaSO₄ — the test and the barium meal", "barium meal"),
 (11, "hydration-energies-chart.tsx", "HydrationEnergiesChart", "Hydration energies fall fast", "hydration"),
 (12, "carbonate-decomp-ladder.tsx", "CarbonateDecompLadder", "Carbonate decomposition temperature ladder", "below 100"),
 (12, "fajans-carbonate-polarisation.tsx", "FajansCarbonatePolarisation", "Fajans polarisation", "polaris"),
 (12, "nitrate-split-panel.tsx", "NitrateSplitPanel", "Nitrates — two product families", "nitrite"),
 (12, "mg-no3-decomp.tsx", "MgNo3Decomp", "Heating Mg(NO₃)₂ — read the fumes", "no₂"),
 (12, "li-mg-diagonal.tsx", "LiMgDiagonal", "The Li–Mg diagonal similarity", "diagonal"),
 (12, "ia-vs-iia-carbonates.tsx", "IaVsIiaCarbonates", "Why IA carbonates shrug off heat", "851"),
 (12, "kiln-temperature-panel.tsx", "KilnTemperaturePanel", "Two ores, two kilns", "limestone"),
]

# 1) verify keywords
miss = []
for row, fn, comp, title, kw in REG:
    if kw.lower() not in TEXT[row]:
        miss.append((row, fn, kw))
if miss:
    print("MISSES:")
    for m in miss: print(" ", m)
    raise SystemExit(1)
print("all", len(REG), "keywords verified")

# 2) check components not already imported
regp = "frontend/features/docs/figures/registry.ts"
src = io.open(regp, encoding="utf-8").read()
for row, fn, comp, title, kw in REG:
    assert comp not in src, "already present: " + comp

# 3) build entries
SLUGS = {
 1: "metals-and-metallurgical-principles-definition-of-metallurgy-and-its-types-hydrometallurgy-pyrom",
 2: "introduction-of-ores-gangue-or-matrix-flux-and-slag-alloy-and-amalgam",
 3: "general-principles-of-extraction-of-metals-concentration-calcination-and-roasting-smelting-carbo",
 4: "refining-of-metals-poling-and-electro-refinement",
 5: "alkali-metals-general-characteristics-of-alkali-metals",
 6: "sodium-extraction-from-down-s-process-properties-action-with-oxygen-water-acids-nonmetals-and-am",
 7: "sodium-hydroxide-properties-precipitation-reaction-and-action-with-carbon-monoxide-and-uses",
 8: "sodium-carbonate-properties-action-with-co2-so2-water-precipitation-reactions-and-uses",
 9: "alkaline-earth-metals-general-characteristics-of-alkaline-earth-metals",
 10: "molecular-formula-and-uses-of-quick-lime-bleaching-powder-magnesia-plaster-of-paris-and-epsom-sa",
 11: "solubility-of-hydroxides-carbonates-and-sulphates-of-alkaline-earth-metals-general-trend-with-ex",
 12: "stability-of-carbonate-and-nitrate-of-alkaline-earth-metals-general-trend-with-explanation",
}
imports, entries = [], []
for row in range(1, 13):
    items = [r for r in REG if r[0] == row]
    imports.extend("import { %s } from \"./%s\";" % (c, f[:-4]) for _, f, c, _, _ in items)
    figs = ",\n".join(
        "    { Component: %s, caption: %s, alt: %s, keyword: %s }" % (c, json.dumps(t), json.dumps("Diagram: " + t.lower()), json.dumps(k))
        for _, f, c, t, k in items)
    alt = "Diagram: " + items[0][3].lower()
    entries.append('  "%s": {\n    title: %s,\n    figures: [\n%s,\n  ],\n  },' % (SLUGS[row], json.dumps(items[0][3]), figs))

anchor = "\n};\n\n/**\n * Look up figures"
assert anchor in src
block = "\n" + "\n".join(imports) + "\n\n" + "\n".join(entries) + "\n"
src = src.replace(anchor, block + anchor)
io.open(regp, "w", encoding="utf-8", newline="\n").write(src)
print("registry updated:", len(imports), "imports,", len(entries), "entries")
