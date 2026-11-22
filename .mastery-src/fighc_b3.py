# -*- coding: utf-8 -*-
# Hydrocarbons figures batch 3: rows 118-120 (unsaturation tests, comparative physical properties, Kolbe)
import os
OUT = r"C:\Users\ASUS\desktop\rn\frontend\features\docs\figures"

def wrap(name, body):
    return '''export function %s({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
%s
    </svg>
  );
}
''' % (name, body)

BLUE = "rgb(59 130 246)"; GREEN = "rgb(16 185 129)"; AMBER = "rgb(245 158 11)"; RED = "rgb(239 68 68)"; PURPLE = "rgb(139 92 246)"; TEAL = "rgb(20 184 166)"; SLATE = "rgb(148 163 184)"; BROWN = "rgb(146 64 14)"

def text(x, y, s, size=13, fill=None, anchor="middle", weight=None):
    fill = fill or "currentColor"
    w = ' fontWeight="%d"' % weight if weight else ""
    return '      <text x="%d" y="%d" fontSize="%d" textAnchor="%s" fill="%s"%s>%s</text>' % (x, y, size, anchor, fill, w, s)

def line(x1,y1,x2,y2,stroke=None,w=2,dash=None):
    stroke = stroke or "currentColor"
    d = ' strokeDasharray="%s"' % dash if dash else ""
    return '      <line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" strokeWidth="%d"%s />' % (x1,y1,x2,y2,stroke,w,d)

def rect(x,y,w,h,fill="none",stroke=None,r=6,sw=1.5):
    stroke = stroke or "currentColor"
    return '      <rect x="%d" y="%d" width="%d" height="%d" rx="%d" fill="%s" stroke="%s" strokeWidth="%s" />' % (x,y,w,h,r,fill,stroke,sw)

def circle(cx,cy,r,fill="none",stroke=None,sw=1.5):
    stroke = stroke or "currentColor"
    return '      <circle cx="%d" cy="%d" r="%d" fill="%s" stroke="%s" strokeWidth="%s" />' % (cx,cy,r,fill,stroke,sw)

def arrow(x1,y1,x2,y2,stroke=None,w=2):
    stroke = stroke or "currentColor"
    return ('      <line x1="%d" y1="%d" x2="%d" y2="%d" stroke="%s" strokeWidth="%d" markerEnd="url(#%s)" />\n'
            % (x1,y1,x2,y2,stroke,w,MARK)) + '      <marker id="%s" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="%s" /></marker>' % (MARK, stroke)

FIGS = []
def fig(fname, comp, body):
    FIGS.append((fname, comp, wrap(comp, body)))

# ---------- 118 ----------
MARK = "ar118a"
fig("bromine-water-test-panel", "BromineWaterTestPanel", "\n".join([
  text(330,24,"Bromine water \u2014 the instant confession",14,weight=600),
  rect(60,50,240,55,stroke=AMBER), text(180,72,"Br\u2082(aq) red-brown",12,weight=600), text(180,92,"in the dark, cold",10,SLATE),
  arrow(315,77,355,77,GREEN),
  rect(370,50,230,55,stroke=GREEN,sw=2), text(485,72,"colour gone",12,GREEN,weight=600), text(485,92,"= \u03c0 bond present",10,SLATE),
  rect(40,125,280,50,stroke=BLUE), text(180,147,"CH\u2082=CH\u2082 + Br\u2082 \u2192 BrCH\u2082CH\u2082Br",10,weight=600),
  text(180,165,"1,2-dibromoethane (1 eq)",9,SLATE),
  rect(340,125,280,50,stroke=BLUE), text(480,147,"HC\u2261CH + 2Br\u2082 \u2192 CHBr\u2082CHBr\u2082",10,weight=600),
  text(480,165,"tetrabromoethane (2 eq)",9,SLATE),
  text(330,215,"Addition, not substitution \u2014 which is why it must happen in the dark.",11,SLATE),
]))

MARK = "ar118b"
fig("baeyer-test-panel", "BaeyerTestPanel", "\n".join([
  text(330,24,"Baeyer's test \u2014 purple surrenders to brown",14,weight=600),
  rect(60,50,250,55,stroke=PURPLE), text(185,72,"Cold dilute alk. KMnO\u2084",12,weight=600), text(185,92,"Baeyer's reagent",10,SLATE),
  arrow(325,77,365,77,SLATE),
  rect(380,50,220,55,stroke=BROWN,sw=2), text(490,72,"MnO\u2082 \u2193 (brown)",12,BROWN,weight=600), text(490,92,"purple discharged",10,SLATE),
  rect(60,125,540,50,stroke=BLUE), text(330,147,"3CH\u2082=CH\u2082 + 2KMnO\u2084 + 4H\u2082O \u2192 3CH\u2082(OH)CH\u2082(OH) + 2MnO\u2082\u2193 + 2KOH",10,weight=600),
  text(330,165,"ethene \u2192 ethane-1,2-diol (syn dihydroxylation)",10,SLATE),
  text(330,215,"Keep it cold and dilute \u2014 hot or concentrated KMnO\u2084 cleaves the bond to acids instead.",11,SLATE),
]))

MARK = "ar118c"
fig("glycol-product-panel", "GlycolProductPanel", "\n".join([
  text(330,24,"Baeyer's organic product \u2014 glycol",14,weight=600),
  rect(80,55,200,55,stroke=BLUE), text(180,77,"CH\u2082=CH\u2082",13,weight=600), text(180,97,"ethene",10,SLATE),
  arrow(295,82,335,82,GREEN), text(315,68,"[O] + H\u2082O",9,GREEN),
  rect(350,55,230,55,stroke=GREEN,sw=2), text(465,77,"HOCH\u2082\u2013CH\u2082OH",12,GREEN,weight=600), text(465,97,"ethane-1,2-diol",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Two OH groups add to the SAME face (syn) \u2014 Mn holds them in place.",11,SLATE),
  text(330,172,"Glycol = antifreeze, polyester precursor \u2014 a product with an industry.",11,SLATE),
  text(330,215,"The diol is the chemical receipt of the oxidation \u2014 MnO\u2082 is the visible one.",11,SLATE),
]))

MARK = "ar118d"
fig("tetrabromoethane-panel", "TetrabromoethanePanel", "\n".join([
  text(330,24,"Ethyne takes bromine twice",14,weight=600),
  rect(60,55,240,55,stroke=BLUE), text(180,77,"HC\u2261CH + Br\u2082 \u2192 CHBr=CHBr",11,weight=600), text(180,97,"first addition \u2014 still unsaturated",10,SLATE),
  arrow(315,82,355,82,AMBER), text(335,68,"+ Br\u2082",9,AMBER),
  rect(370,55,230,55,stroke=GREEN,sw=2), text(485,77,"CHBr\u2082\u2013CHBr\u2082",12,GREEN,weight=600), text(485,97,"1,1,2,2-tetrabromoethane",9,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Two equivalents consumed \u2014 twice the colour loss of ethene.",11,SLATE),
  text(330,172,"The intermediate dibromoalkene is itself a substrate for addition.",11,SLATE),
  text(330,215,"Quantitative tip: alkyne bleeds bromine water twice as fast per mole.",11,SLATE),
]))

MARK = "ar118e"
fig("test-conditions-honesty", "TestConditionsHonesty", "\n".join([
  text(330,24,"Conditions keep the tests honest",14,weight=600),
  rect(40,50,280,60,stroke=RED,sw=2), text(180,72,"Bromine water: DARK + cold",11,RED,weight=600),
  text(180,92,"UV would let alkanes substitute \u2192 false positive",10,SLATE),
  rect(340,50,280,60,stroke=BLUE,sw=2), text(480,72,"KMnO\u2084: COLD + dilute",11,BLUE,weight=600),
  text(480,92,"hot/conc would cleave \u2192 wrong products",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The discriminating power lives in the contrast: instant addition vs UV-only substitution.",11,SLATE),
  text(330,172,"Remove the condition and the negative control \u2014 ethane \u2014 stops being trustworthy.",11,SLATE),
  text(330,215,"State the conditions in the answer; they carry marks of their own.",11,SLATE),
]))

MARK = "ar118f"
fig("unsaturation-decision-tree", "UnsaturationDecisionTree", "\n".join([
  text(330,24,"Decision tree \u2014 three gases, two tests",14,weight=600),
  rect(230,40,200,40,stroke=SLATE), text(330,65,"Unknown gas",12,weight=600),
  line(330,80,180,105,SLATE), line(330,80,480,105,SLATE),
  rect(60,105,240,45,stroke=GREEN,sw=2), text(180,127,"Br\u2082 water decolourised?",11,weight=600), text(180,143,"dark, cold",9,SLATE),
  rect(360,105,240,45,stroke=GREEN,sw=2), text(480,127,"Baeyer's: brown MnO\u2082?",11,weight=600), text(480,143,"cold, dilute",9,SLATE),
  line(180,150,180,170,SLATE), line(480,150,480,170,SLATE),
  text(150,182,"no \u2192 ethane",11,RED,weight=600), text(230,182,"yes \u2192 unsat.",10,GREEN),
  text(450,182,"no \u2192 ethane",11,RED,weight=600), text(530,182,"yes \u2192 unsat.",10,GREEN),
  rect(60,195,540,35,stroke=BLUE), text(330,217,"Both positive? Split ethene vs ethyne with ammoniacal AgNO\u2083 (white ppt = ethyne).",10,BLUE),
]))

MARK = "ar118g"
fig("three-gas-verdicts", "ThreeGasVerdicts", "\n".join([
  text(330,24,"Verdict table \u2014 ethane, ethene, ethyne",14,weight=600),
  rect(50,45,560,30,stroke=SLATE), text(120,65,"Gas",11,weight=600), text(280,65,"Br\u2082 water",11,weight=600), text(430,65,"Baeyer's",11,weight=600), text(560,65,"AgNO\u2083/NH\u2083",11,weight=600),
  rect(50,75,560,30,stroke=SLATE), text(120,95,"Ethane",11), text(280,95,"no change",10,RED), text(430,95,"no change",10,RED), text(560,95,"none",10,SLATE),
  rect(50,105,560,30,stroke=SLATE), text(120,125,"Ethene",11), text(280,125,"decolourises",10,GREEN), text(430,125,"brown MnO\u2082",10,GREEN), text(560,125,"none",10,SLATE),
  rect(50,135,560,30,stroke=SLATE), text(120,155,"Ethyne",11), text(280,155,"decolourises \u00d72",10,GREEN), text(430,155,"brown MnO\u2082",10,GREEN), text(560,155,"white Ag\u2082C\u2082",10,PURPLE,weight=600),
  text(330,195,"One glance across the row identifies the gas \u2014 the table is the answer.",11,SLATE),
  text(330,215,"NEB 2024: bromine water column separates ethane from the rest; AgNO\u2083 splits the rest.",11,SLATE),
]))

# ---------- 119 ----------
MARK = "ar119a"
fig("three-family-formulas", "ThreeFamilyFormulas", "\n".join([
  text(330,24,"Three formulas, one ladder",14,weight=600),
  rect(40,50,180,60,stroke=BLUE), text(130,75,"C\u2099H\u2082\u2099\u208a\u2082",15,weight=600), text(130,97,"alkane (sp\u00b3)",10,SLATE),
  rect(240,50,180,60,stroke=GREEN), text(330,75,"C\u2099H\u2082\u2099",15,weight=600), text(330,97,"alkene (sp\u00b2)",10,SLATE),
  rect(440,50,180,60,stroke=AMBER), text(530,75,"C\u2099H\u2082\u2099\u208b\u2082",15,weight=600), text(530,97,"alkyne (sp)",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Each \u03c0 bond costs two hydrogens \u2014 the formulas are a hydrogen budget.",11,SLATE),
  text(330,172,"Same n across families: identical carbon count, different unsaturation.",11,SLATE),
  text(330,215,"C\u2082H\u2086 \u00b7 C\u2082H\u2084 \u00b7 C\u2082H\u2082 \u2014 ethane, ethene, ethyne: the whole story in six symbols.",11,SLATE),
]))

MARK = "ar119b"
fig("state-ladder-panel", "StateLadderPanel", "\n".join([
  text(330,24,"States across the carbon ladder",14,weight=600),
  rect(60,50,160,55,stroke=BLUE,sw=2), text(140,72,"C\u2081\u2013C\u2084",14,weight=600), text(140,92,"gases",11,SLATE),
  rect(250,50,160,55,stroke=GREEN,sw=2), text(330,72,"C\u2085\u2013C\u2081\u2087",14,weight=600), text(330,92,"liquids",11,SLATE),
  rect(440,50,160,55,stroke=AMBER,sw=2), text(520,72,"C\u2081\u2088+",14,weight=600), text(520,92,"waxy solids",11,SLATE),
  rect(60,125,540,50,stroke=SLATE), text(330,147,"Longer chains \u2192 more contact surface \u2192 stronger dispersion forces.",11,SLATE),
  text(330,167,"All three families obey the same ladder \u2014 unsaturation barely shifts it.",11,SLATE),
  text(330,215,"Pure members are odourless; fuel smells come from additives and impurities.",11,SLATE),
]))

MARK = "ar119c"
fig("bp-ladder-panel", "BpLadderPanel", "\n".join([
  text(330,24,"Boiling points at equal carbon (C\u2083+)",14,weight=600),
  line(80,170,600,170,SLATE),
  rect(100,90,90,80,fill="rgba(59 130 246 / 0.25)",stroke=BLUE), text(145,80,"alkane",10), text(145,105,"lowest",10,SLATE),
  rect(290,75,90,95,fill="rgba(16 185 129 / 0.25)",stroke=GREEN), text(335,65,"alkene",10), text(335,90,"middle",10,SLATE),
  rect(480,60,90,110,fill="rgba(245 158 11 / 0.25)",stroke=AMBER), text(525,50,"alkyne",10), text(525,75,"highest",10,SLATE),
  text(330,200,"\u03c0 electrons polarise more easily \u2192 stronger dispersion attraction",11,SLATE),
  text(330,220,"C\u2082 anomaly: ethene (\u2212104 \u00b0C) boils below ethane (\u221289 \u00b0C) \u2014 trust the ladder from C\u2083.",10,SLATE),
]))

MARK = "ar119d"
fig("branching-effect-demo", "BranchingEffectDemo", "\n".join([
  text(330,24,"Branching lowers the boiling point",14,weight=600),
  rect(60,55,240,55,stroke=BLUE), text(180,77,"n-Butane (straight)",12,weight=600), text(180,97,"b.p. \u22120.5 \u00b0C",11,AMBER),
  rect(360,55,240,55,stroke=GREEN), text(480,77,"Isobutane (branched)",12,weight=600), text(480,97,"b.p. \u221211.7 \u00b0C",11,AMBER),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Same formula C\u2084H\u2088 \u2014 the branched sphere offers less contact surface.",11,SLATE),
  text(330,172,"Less surface \u2192 weaker dispersion \u2192 easier to boil apart.",11,SLATE),
  text(330,215,"Branching can outweigh unsaturation: shape matters as much as \u03c0 bonds.",11,SLATE),
]))

MARK = "ar119e"
fig("solubility-panel", "SolubilityPanel", "\n".join([
  text(330,24,"Like dissolves like",14,weight=600),
  rect(60,55,240,55,stroke=BLUE), text(180,77,"Water (polar, H-bonded)",12,weight=600), text(180,97,"hydrocarbons insoluble \u2014 they float",10,SLATE),
  rect(360,55,240,55,stroke=GREEN), text(480,77,"Benzene, ether, CCl\u2084",12,weight=600), text(480,97,"hydrocarbons soluble",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Dissolving in water would break H-bonds with no compensating attraction.",11,SLATE),
  text(330,172,"In organic solvents, dispersion simply trades solute\u2013solute for solute\u2013solvent.",11,SLATE),
  text(330,215,"All three families: density < 1 g/cm\u00b3, oil-on-water physics.",11,SLATE),
]))

MARK = "ar119f"
fig("flame-comparison-panel", "FlameComparisonPanel", "\n".join([
  text(330,24,"Flames as fingerprints",14,weight=600),
  circle(140,110,30,stroke=BLUE,sw=2.5), text(140,165,"Alkane",11,weight=600), text(140,183,"clean blue",10,SLATE),
  circle(330,110,30,stroke=AMBER,sw=2.5), text(330,165,"Alkene",11,weight=600), text(330,183,"luminous",10,SLATE),
  circle(520,110,30,stroke=RED,sw=2.5), text(520,165,"Alkyne",11,weight=600), text(520,183,"smoky, luminous",10,SLATE),
  text(330,50,"Carbon percentage climbs across the families",12,SLATE),
  text(330,215,"Ethyne: ~92% carbon \u2192 oxygen-starved flame sheds glowing soot \u2014 the torch's signature.",11,SLATE),
]))

MARK = "ar119g"
fig("density-panel", "DensityPanel", "\n".join([
  text(330,24,"Density \u2014 always below water",14,weight=600),
  rect(60,50,540,60,stroke=BLUE), text(330,75,"All hydrocarbons: \u03c1 < 1 g/cm\u00b3",13,weight=600), text(330,97,"they float on water \u2014 every family, every chain length",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Density creeps up slowly with carbon number (\u22480.6 \u2192 0.8 g/cm\u00b3) but never crosses 1.",11,SLATE),
  text(330,172,"Weak dispersion packing cannot match water's hydrogen-bonded density.",11,SLATE),
  text(330,215,"Oil spills, floating fuels, separate layers \u2014 all one number: less than one.",11,SLATE),
]))

# ---------- 120 ----------
MARK = "ar120a"
fig("kolbe-anode-cathode", "KolbeAnodeCathode", "\n".join([
  text(330,24,"Kolbe electrolysis \u2014 the anode is the workshop",14,weight=600),
  rect(60,55,240,60,stroke=RED,sw=2), text(180,80,"ANODE (+)",13,RED,weight=600),
  text(180,102,"RCOO\u207b \u2192 R\u00b7 + CO\u2082 + e\u207b",10), text(180,112,"radicals couple \u2192 product",9,SLATE),
  rect(360,55,240,60,stroke=BLUE,sw=2), text(480,80,"CATHODE (\u2212)",13,BLUE,weight=600),
  text(480,102,"2H\u2082O + 2e\u207b \u2192 H\u2082 + 2OH\u207b",10), text(480,112,"H\u2082 gas + NaOH forms",9,SLATE),
  line(300,85,360,85,SLATE,dash="4 3"),
  rect(60,135,540,45,stroke=SLATE), text(330,157,"Every C\u2013C bond of the product is forged at the anode \u2014 the cathode merely makes hydrogen.",11,SLATE),
  text(330,215,"Putting the product at the cathode is the classic error \u2014 oxidation happens at the anode.",11,SLATE),
]))

MARK = "ar120b"
fig("acetate-electrolysis-flow", "AcetateElectrolysisFlow", "\n".join([
  text(330,24,"Sodium acetate \u2192 ethane",14,weight=600),
  rect(40,50,230,55,stroke=BLUE), text(155,72,"2CH\u2083COO\u207b",12,weight=600), text(155,92,"at the anode",10,SLATE),
  arrow(285,77,325,77,AMBER), text(305,64,"\u22122CO\u2082, \u22122e\u207b",9,AMBER),
  rect(340,50,120,55,stroke=PURPLE), text(400,72,"2CH\u2083\u00b7",12,weight=600), text(400,92,"radicals",10,SLATE),
  arrow(475,77,515,77,GREEN), text(495,64,"couple",9,GREEN),
  rect(60,125,540,55,stroke=GREEN,sw=2), text(330,147,"2CH\u2083COONa + 2H\u2082O \u2192 C\u2082H\u2086 + 2CO\u2082 + H\u2082 + 2NaOH",12,GREEN,weight=600),
  text(330,167,"Pt electrodes \u00b7 concentrated solution \u00b7 ethane at anode, H\u2082 at cathode",10,SLATE),
  text(330,215,"Both carboxyl carbons exit as CO\u2082 \u2014 the two methyls couple into ethane.",11,SLATE),
]))

MARK = "ar120c"
fig("kolbe-carbon-rule", "KolbeCarbonRule", "\n".join([
  text(330,24,"The carbon rule \u2014 count R, not the salt",14,weight=600),
  rect(60,50,240,55,stroke=BLUE), text(180,72,"Product carbons = 2 \u00d7 (R carbons)",11,weight=600), text(180,92,"carboxyl carbons always leave as CO\u2082",10,SLATE),
  rect(40,125,180,45,stroke=BLUE), text(130,147,"acetate: R=C\u2081",10,weight=600), text(130,162,"\u2192 ethane C\u2082",10,SLATE),
  rect(240,125,180,45,stroke=GREEN), text(330,147,"propionate: R=C\u2082",10,weight=600), text(330,162,"\u2192 butane C\u2084",10,SLATE),
  rect(440,125,180,45,stroke=AMBER), text(530,147,"succinate: 2\u00d7C\u2081",10,weight=600), text(530,162,"\u2192 ethyne C\u2082",10,SLATE),
  text(330,215,"One counting rule predicts every Kolbe product \u2014 check it before balancing.",11,SLATE),
]))

MARK = "ar120d"
fig("succinate-electrolysis-flow", "SuccinateElectrolysisFlow", "\n".join([
  text(330,24,"Potassium succinate \u2192 ethyne",14,weight=600),
  rect(40,50,250,55,stroke=BLUE), text(165,72,"KOOC\u2013CH\u2082\u2013CH\u2082\u2013COOK",11,weight=600), text(165,92,"both ends decarboxylate",10,SLATE),
  arrow(305,77,345,77,AMBER), text(325,64,"\u22122CO\u2082",9,AMBER),
  rect(360,50,130,55,stroke=PURPLE), text(425,72,"\u00b7CH\u2082\u2013CH\u2082\u00b7",11,weight=600), text(425,92,"diradical pair",10,SLATE),
  arrow(505,77,545,77,RED), text(525,64,"\u22122H",9,RED),
  rect(60,125,540,55,stroke=GREEN,sw=2), text(330,147,"KOOC\u2013CH\u2082\u2013CH\u2082\u2013COOK + 2KOH \u2192 HC\u2261CH + 2K\u2082CO\u2083 + 2H\u2082",11,GREEN,weight=600),
  text(330,167,"the succinate's own skeleton becomes the triple bond \u2014 intramolecular coupling",10,SLATE),
  text(330,215,"One molecule, two anodic exits, one alkyne \u2014 no partner molecule needed.",11,SLATE),
]))

MARK = "ar120e"
fig("kolbe-product-table", "KolbeProductTable", "\n".join([
  text(330,24,"Kolbe products by electrolyte",14,weight=600),
  rect(80,45,500,30,stroke=SLATE), text(180,65,"Electrolyte",11,weight=600), text(420,65,"Product",11,weight=600), text(540,65,"Family",11,weight=600),
  rect(80,75,500,28,stroke=SLATE), text(180,94,"sodium acetate",10), text(420,94,"ethane",10,weight=600), text(540,94,"alkane",10,SLATE),
  rect(80,103,500,28,stroke=SLATE), text(180,122,"sodium propionate",10), text(420,122,"n-butane",10,weight=600), text(540,122,"alkane",10,SLATE),
  rect(80,131,500,28,stroke=SLATE), text(180,150,"potassium succinate",10), text(420,150,"ethyne",10,weight=600), text(540,150,"alkyne",10,SLATE),
  rect(80,159,500,28,stroke=SLATE), text(180,178,"modified dicarboxylate",10), text(420,178,"ethene",10,weight=600), text(540,178,"alkene",10,SLATE),
  text(330,215,"One apparatus, three families \u2014 the electrolyte decides which.",11,SLATE),
]))

MARK = "ar120f"
fig("cathode-half-reaction", "CathodeHalfReaction", "\n".join([
  text(330,24,"The cathode's quiet half of the story",14,weight=600),
  rect(60,55,540,55,stroke=BLUE,sw=2), text(330,80,"2H\u2082O + 2e\u207b \u2192 H\u2082\u2191 + 2OH\u207b",14,weight=600),
  text(330,100,"water is reduced \u2014 not the carboxylate",10,SLATE),
  rect(60,130,260,50,stroke=GREEN), text(190,152,"H\u2082 evolves",12,GREEN,weight=600), text(190,170,"1 mol per 2 faradays",9,SLATE),
  rect(340,130,260,50,stroke=AMBER), text(470,152,"NaOH accumulates",12,AMBER,weight=600), text(470,170,"solution turns alkaline",9,SLATE),
  text(330,215,"The overall Kolbe equation is incomplete without these cathode products.",11,SLATE),
]))

MARK = "ar120g"
fig("kolbe-legacy-panel", "KolbeLegacyPanel", "\n".join([
  text(330,24,"Kolbe's legacy \u2014 where synthesis began",14,weight=600),
  rect(60,55,240,60,stroke=BLUE), text(180,80,"1845",16,weight=600), text(180,102,"first total synthesis of an organic compound (acetic acid from elements)",9,SLATE),
  rect(360,55,240,60,stroke=GREEN), text(480,80,"Electrolysis",14,weight=600), text(480,102,"electricity forges C\u2013C bonds",10,SLATE),
  rect(60,135,540,45,stroke=SLATE), text(330,157,"Anodic radical coupling is still used industrially \u2014 Kolbe dimers, sebacic acid.",11,SLATE),
  text(330,205,"From acetic acid to acetylene welding \u2014 one electrochemical idea, 180 years of chemistry.",11,SLATE),
]))

for fname, comp, code in FIGS:
    p = os.path.join(OUT, fname + ".tsx")
    assert not os.path.exists(p), "collision: " + fname
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(code)
    print("wrote", fname)
print("batch3 done:", len(FIGS))
