# -*- coding: utf-8 -*-
# Insert 63 hydrocarbons figures into registry.ts as 9 per-topic blocks (keyword-verified)
import json, io, re, os

REG = r"C:\Users\ASUS\desktop\rn\frontend\features\docs\figures\registry.ts"
CONTENT = r"C:\Users\ASUS\desktop\rn\content\notes\concepts\class-11\chemistry\hydrocarbons"

FILES = {
 112: "01-saturated-hydrocarbons-alkanes-preparation-from-haloalkanes-reduction-and-wurtz-reaction-decarbo.json",
 113: "02-chemical-properties-of-alkanes-substitution-reactions-halogenation-nitration-and-sulphonation-on.json",
 114: "03-unsaturated-hydrocarbons-alkenes-preparation-by-dehydration-of-alcohol-dehydrohalogenation-catal.json",
 115: "04-chemical-properties-of-alkenes-addition-reaction-with-hx-markovnikov-s-addition-and-peroxide-eff.json",
 116: "05-alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane-chloroform-iodoform-only.json",
 117: "06-chemical-properties-of-alkynes-addition-reaction-with-h2-hx-h2o-acidic-nature-action-with-sodium.json",
 118: "07-test-of-unsaturation-ethene-and-ethyne-bromine-water-test-and-baeyer-s-test.json",
 119: "08-comparative-studies-of-physical-properties-of-alkane-alkene-and-alkyne.json",
 120: "09-kolbe-s-electrolysis-methods-for-the-preparation-of-alkanes-alkenes-and-alkynes.json",
}
SLUGS = {
 112: "saturated-hydrocarbons-alkanes-preparation-from-haloalkanes-reduction-and-wurtz-reaction-decarbo",
 113: "chemical-properties-of-alkanes-substitution-reactions-halogenation-nitration-and-sulphonation-on",
 114: "unsaturated-hydrocarbons-alkenes-preparation-by-dehydration-of-alcohol-dehydrohalogenation-catal",
 115: "chemical-properties-of-alkenes-addition-reaction-with-hx-markovnikov-s-addition-and-peroxide-eff",
 116: "alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane-chloroform-iodoform-only",
 117: "chemical-properties-of-alkynes-addition-reaction-with-h2-hx-h2o-acidic-nature-action-with-sodium",
 118: "test-of-unsaturation-ethene-and-ethyne-bromine-water-test-and-baeyer-s-test",
 119: "comparative-studies-of-physical-properties-of-alkane-alkene-and-alkyne",
 120: "kolbe-s-electrolysis-methods-for-the-preparation-of-alkanes-alkenes-and-alkynes",
}
TITLES = {
 112: "Four doors to an alkane",
 113: "The substitution ladder",
 114: "Three doors to an alkene",
 115: "The pi bond under attack",
 116: "Building the triple bond",
 117: "Add like an alkene, acid like no other",
 118: "Two drops that tell the truth",
 119: "Three families, one table",
 120: "Electricity builds hydrocarbons",
}
# (file, component, caption, alt, keyword)
DATA = {
112: [
 ("alkane-prep-routes","AlkanePrepRoutes","Four routes to alkanes at a glance","Diagram: Four routes to alkanes at a glance","wurtz"),
 ("wurtz-coupling-panel","WurtzCouplingPanel","Wurtz reaction needs dry ether","Diagram: Wurtz reaction needs dry ether","dry ether"),
 ("decarboxylation-flow","DecarboxylationFlow","Decarboxylation with soda-lime","Diagram: Decarboxylation with soda-lime","soda-lime"),
 ("haloalkane-reduction-panel","HaloalkaneReductionPanel","Three reducing agents for haloalkanes","Diagram: Three reducing agents for haloalkanes","lialh"),
 ("hydrogenation-surface","HydrogenationSurface","Catalytic hydrogenation on nickel","Diagram: Catalytic hydrogenation on nickel","ni "),
 ("wurtz-limitation-panel","WurtzLimitationPanel","Wurtz with mixed halides gives three products","Diagram: Wurtz with mixed halides gives three products","mixture"),
 ("carbon-count-rules","CarbonCountRules","Carbon accounting across the four routes","Diagram: Carbon accounting across the four routes","one carbon fewer"),
],
113: [
 ("methane-chlorination-ladder","MethaneChlorinationLadder","Methane chlorination ladder","Diagram: Methane chlorination ladder","ch\u2082cl\u2082"),
 ("halogen-reactivity-ladder","HalogenReactivityLadder","Halogen reactivity falls from fluorine to iodine","Diagram: Halogen reactivity falls from fluorine to iodine","f\u2082"),
 ("radical-mechanism-steps","RadicalMechanismSteps","Free radical chlorination mechanism","Diagram: Free radical chlorination mechanism","initiation"),
 ("vapour-phase-nitration","VapourPhaseNitration","Vapour phase nitration at 400 degrees","Diagram: Vapour phase nitration at 400 degrees","400"),
 ("sulphonation-panel","SulphonationPanel","Sulphonation needs long chains","Diagram: Sulphonation needs long chains","fuming"),
 ("controlled-oxidation-ethane","ControlledOxidationEthane","Controlled oxidation of ethane to acetaldehyde","Diagram: Controlled oxidation of ethane to acetaldehyde","acetaldehyde"),
 ("combustion-energy-panel","CombustionEnergyPanel","Combustion energy ledger","Diagram: Combustion energy ledger","890"),
],
114: [
 ("alkene-prep-routes","AlkenePrepRoutes","Three routes to alkenes","Diagram: Three routes to alkenes","dehydration"),
 ("dehydration-temperature-fork","DehydrationTemperatureFork","Dehydration temperature fork ether vs ethene","Diagram: Dehydration temperature fork ether vs ethene","170"),
 ("dehydrohalogenation-panel","DehydrohalogenationPanel","Dehydrohalogenation with alcoholic KOH","Diagram: Dehydrohalogenation with alcoholic KOH","alcoholic koh"),
 ("saytzeff-rule-panel","SaytzeffRulePanel","Saytzeff rule in action","Diagram: Saytzeff rule in action","saytzeff"),
 ("lindlar-catalyst-panel","LindlarCatalystPanel","Lindlar catalyst stops at the alkene","Diagram: Lindlar catalyst stops at the alkene","lindlar"),
 ("hydrogenation-mechanism-steps","HydrogenationMechanismSteps","Hydrogenation mechanism three steps","Diagram: Hydrogenation mechanism three steps","adsorption"),
 ("alkene-family-panel","AlkeneFamilyPanel","The alkene family cnh2n","Diagram: The alkene family cnh2n","c\u2099h\u2082\u2099"),
],
115: [
 ("markovnikov-rule-panel","MarkovnikovRulePanel","Markovnikov rule statement","Diagram: Markovnikov rule statement","markovnikov"),
 ("propene-hbr-demo","PropeneHbrDemo","Propene plus HBr carbocation fork","Diagram: Propene plus HBr carbocation fork","2-bromopropane"),
 ("peroxide-effect-panel","PeroxideEffectPanel","Peroxide effect reverses HBr addition","Diagram: Peroxide effect reverses HBr addition","peroxide"),
 ("hydration-of-ethene","HydrationOfEthene","Hydration of ethene to ethanol","Diagram: Hydration of ethene to ethanol","ethanol"),
 ("h2so4-addition-route","H2so4AdditionRoute","H2SO4 addition via ethyl hydrogen sulphate","Diagram: H2SO4 addition via ethyl hydrogen sulphate","ethyl hydrogen sulphate"),
 ("ozonolysis-workflow","OzonolysisWorkflow","Ozonolysis workflow to carbonyls","Diagram: Ozonolysis workflow to carbonyls","ozonide"),
 ("ozonolysis-product-map","OzonolysisProductMap","Ozonolysis product map","Diagram: Ozonolysis product map","hcho"),
],
116: [
 ("alkyne-prep-routes","AlkynePrepRoutes","Three routes to alkynes","Diagram: Three routes to alkynes","carbide"),
 ("calcium-carbide-two-step","CalciumCarbideTwoStep","Calcium carbide two step preparation","Diagram: Calcium carbide two step preparation","2000"),
 ("vicinal-dihalide-route","VicinalDihalideRoute","Vicinal dihalide to alkyne","Diagram: Vicinal dihalide to alkyne","vinyl"),
 ("haloform-silver-route","HaloformSilverRoute","Haloform and hot silver route","Diagram: Haloform and hot silver route","agcl"),
 ("double-elimination-logic","DoubleEliminationLogic","Why the second elimination is harder","Diagram: Why the second elimination is harder","nanh\u2082"),
 ("ethyne-identity-panel","EthyneIdentityPanel","Ethyne and acetylene identity","Diagram: Ethyne and acetylene identity","acetylene"),
 ("carbide-impurity-wash","CarbideImpurityWash","Washing impure carbide gas","Diagram: Washing impure carbide gas","ph\u2083"),
],
117: [
 ("alkyne-addition-map","AlkyneAdditionMap","Ethyne addition menu","Diagram: Ethyne addition menu","vinyl chloride"),
 ("ethyne-hydration-tautomer","EthyneHydrationTautomer","Ethyne hydration enol tautomer","Diagram: Ethyne hydration enol tautomer","enol"),
 ("sp-acidity-ladder","SpAcidityLadder","Acidity ladder s-character","Diagram: Acidity ladder s-character","25"),
 ("acetylide-formation","AcetylideFormation","Acetylide formation with sodium amide","Diagram: Acetylide formation with sodium amide","sodium acetylide"),
 ("ammoniacal-silver-test","AmmoniacalSilverTest","Ammoniacal silver nitrate white precipitate","Diagram: Ammoniacal silver nitrate white precipitate","white"),
 ("ammoniacal-copper-test","AmmoniacalCopperTest","Ammoniacal cuprous chloride red precipitate","Diagram: Ammoniacal cuprous chloride red precipitate","red"),
 ("terminal-vs-internal","TerminalVsInternal","Terminal versus internal alkynes","Diagram: Terminal versus internal alkynes","terminal"),
],
118: [
 ("bromine-water-test-panel","BromineWaterTestPanel","Bromine water decolourisation test","Diagram: Bromine water decolourisation test","decolouris"),
 ("baeyer-test-panel","BaeyerTestPanel","Baeyer test brown mno2","Diagram: Baeyer test brown mno2","mno\u2082"),
 ("glycol-product-panel","GlycolProductPanel","Baeyer test organic product glycol","Diagram: Baeyer test organic product glycol","glycol"),
 ("tetrabromoethane-panel","TetrabromoethanePanel","Ethyne takes bromine twice","Diagram: Ethyne takes bromine twice","tetrabromoethane"),
 ("test-conditions-honesty","TestConditionsHonesty","Conditions keep the tests honest","Diagram: Conditions keep the tests honest","dark"),
 ("unsaturation-decision-tree","UnsaturationDecisionTree","Unsaturation decision tree","Diagram: Unsaturation decision tree","unsaturation"),
 ("three-gas-verdicts","ThreeGasVerdicts","Verdict table for three gases","Diagram: Verdict table for three gases","ethane"),
],
119: [
 ("three-family-formulas","ThreeFamilyFormulas","Three family formulas","Diagram: Three family formulas","c\u2099h\u2082\u2099\u208a\u2082"),
 ("state-ladder-panel","StateLadderPanel","States across the carbon ladder","Diagram: States across the carbon ladder","gases"),
 ("bp-ladder-panel","BpLadderPanel","Boiling point ladder at equal carbon","Diagram: Boiling point ladder at equal carbon","alkyne"),
 ("branching-effect-demo","BranchingEffectDemo","Branching effect on boiling point","Diagram: Branching effect on boiling point","isobutane"),
 ("solubility-panel","SolubilityPanel","Like dissolves like solubility","Diagram: Like dissolves like solubility","like dissolves like"),
 ("flame-comparison-panel","FlameComparisonPanel","Flames as fingerprints","Diagram: Flames as fingerprints","smoky"),
 ("density-panel","DensityPanel","Density always below water","Diagram: Density always below water","float"),
],
120: [
 ("kolbe-anode-cathode","KolbeAnodeCathode","Kolbe anode and cathode roles","Diagram: Kolbe anode and cathode roles","anode"),
 ("acetate-electrolysis-flow","AcetateElectrolysisFlow","Acetate electrolysis to ethane","Diagram: Acetate electrolysis to ethane","ethane"),
 ("kolbe-carbon-rule","KolbeCarbonRule","Kolbe carbon counting rule","Diagram: Kolbe carbon counting rule","co\u2082"),
 ("succinate-electrolysis-flow","SuccinateElectrolysisFlow","Succinate electrolysis to ethyne","Diagram: Succinate electrolysis to ethyne","succinate"),
 ("kolbe-product-table","KolbeProductTable","Kolbe products by electrolyte","Diagram: Kolbe products by electrolyte","propionate"),
 ("cathode-half-reaction","CathodeHalfReaction","Cathode half reaction water reduction","Diagram: Cathode half reaction water reduction","h\u2082"),
 ("kolbe-legacy-panel","KolbeLegacyPanel","Kolbe legacy first total synthesis","Diagram: Kolbe legacy first total synthesis","1845"),
],
}

# 1) keyword verification against canonical JSONs
def blob(fn):
    d = json.loads(open(os.path.join(CONTENT, fn), "rb").read().decode("utf-8-sig"))
    out = []
    for k in ["notes","keyPoints","importantConcepts","examples","universalFacts","importantStatements","importantNotes","examShortTricks","examNotes","formulas","practice","practiceQuestions","summary"]:
        v = d.get(k, [])
        if isinstance(v, list): out.extend(str(x) for x in v)
        elif v: out.append(str(v))
    return " ".join(out).lower()

misses = []
for row, entries in DATA.items():
    t = blob(FILES[row])
    for e in entries:
        if e[4].lower() not in t:
            misses.append((row, e[1], e[4]))
if misses:
    for m in misses: print("KEYWORD MISS", m)
    raise SystemExit(1)
print("all 63 keywords verified")

# 2) insert imports after last top-level import
src = io.open(REG, encoding="utf-8").read()
assert "KolbeAnodeCathode" not in src, "already inserted"
imports = []
for row in sorted(DATA):
    for e in DATA[row]:
        imports.append('import { %s } from "./%s";' % (e[1], e[0]))
imp_block = "\n".join(imports) + "\n"
last = 0
for m in re.finditer(r'(?m)^import .*$\n?', src):
    last = m.end()
src = src[:last] + imp_block + src[last:]

# 3) insert 9 per-topic blocks before the closing anchor
anchor = "\n};\n\n/**\n * Look up figures"
i = src.find(anchor)
assert i > 0, "anchor not found"
blocks = []
for row in sorted(DATA):
    lines = ['  "%s": {' % SLUGS[row],
             '    title: "%s",' % TITLES[row],
             "    figures: ["]
    for fname, comp, cap, alt, kw in DATA[row]:
        lines.append('{ Component: %s, caption: "%s", alt: "%s", keyword: "%s" },' % (comp, cap, alt, kw))
    lines.append("  ],")
    lines.append("  },")
    blocks.append("\n".join(lines))
src = src[:i] + "\n" + "\n".join(blocks) + "\n" + src[i:]
io.open(REG, "w", encoding="utf-8", newline="\n").write(src)
print("registry updated: 9 topic blocks, 63 figures")
