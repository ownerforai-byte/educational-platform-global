# -*- coding: utf-8 -*-
# Hydrocarbons figures batch 1: rows 112-114 (alkane prep, alkane properties, alkene prep)
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

BLUE = "rgb(59 130 246)"; GREEN = "rgb(16 185 129)"; AMBER = "rgb(245 158 11)"; RED = "rgb(239 68 68)"; PURPLE = "rgb(139 92 246)"; TEAL = "rgb(20 184 166)"; SLATE = "rgb(148 163 184)"

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

# ---------- 112 ----------
MARK = "ar112a"
fig("alkane-prep-routes", "AlkanePrepRoutes", "\n".join([
  text(330,24,"Four doors to an alkane",14,weight=600),
  rect(20,45,145,60,stroke=BLUE), text(92,70,"Haloalkane",12), text(92,88,"reduction",12,SLATE),
  rect(200,45,145,60,stroke=GREEN), text(272,70,"Wurtz",12), text(272,88,"reaction",12,SLATE),
  rect(380,45,145,60,stroke=AMBER), text(452,70,"Decarboxylation",12), text(452,88,"(soda-lime)",12,SLATE),
  rect(560,45,85,60,stroke=PURPLE), text(602,70,"Hydrogenation",12), text(602,88,"(Ni)",12,SLATE),
  line(92,105,92,130,SLATE), line(272,105,272,130,SLATE), line(452,105,452,130,SLATE), line(602,105,602,130,SLATE),
  rect(180,130,300,55,stroke=BLUE,sw=2), text(330,153,"Alkane C\u2099H\u2082\u2099\u208a\u2082",14,weight=600),
  text(330,172,"same carbon count (except Wurtz: +1 each)",11,SLATE),
  text(330,215,"Every route swaps a \u03c3-bond partner for H or for C \u2014 nothing else moves.",11,SLATE),
]))

MARK = "ar112b"
fig("wurtz-coupling-panel", "WurtzCouplingPanel", "\n".join([
  text(330,24,"Wurtz reaction \u2014 dry ether is non-negotiable",14,weight=600),
  text(180,60,"CH\u2083Br + 2Na + BrCH\u2083",12,weight=600),
  arrow(300,55,360,55,GREEN),
  text(420,60,"CH\u2083\u2013CH\u2083 + 2NaBr",12,GREEN,weight=600),
  text(330,88,"anhydrous dry ether \u2014 heat",11,SLATE),
  rect(60,105,240,70,stroke=RED), text(180,128,"If water is present",12,RED),
  text(180,150,"2Na + 2H\u2082O \u2192 2NaOH + H\u2082",11,RED),
  text(180,166,"Na is consumed \u2192 no coupling",11,SLATE),
  rect(360,105,240,70,stroke=BLUE), text(480,128,"Why dry ether?",12,BLUE),
  text(480,150,"dissolves both RX and Na",11,SLATE),
  text(480,166,"inert \u2014 refuses to react with Na",11,SLATE),
  text(330,215,"Ethyl bromide \u2192 butane; propyl bromide \u2192 hexane: +1 carbon each.",11,SLATE),
]))

MARK = "ar112c"
fig("decarboxylation-flow", "DecarboxylationFlow", "\n".join([
  text(330,24,"Decarboxylation \u2014 the carboxyl carbon exits as CO\u2082",14,weight=600),
  rect(40,50,200,55,stroke=BLUE), text(140,72,"CH\u2083COONa",13,weight=600), text(140,92,"sodium acetate",11,SLATE),
  text(255,80,"+",14), rect(285,50,110,55,stroke=SLATE), text(340,72,"NaOH + CaO",12), text(340,92,"soda-lime",11,SLATE),
  arrow(410,77,450,77,AMBER),
  rect(465,50,165,55,stroke=GREEN,sw=2), text(547,72,"CH\u2084 + Na\u2082CO\u2083",13,GREEN,weight=600),
  text(547,92,"methane",11,SLATE),
  line(140,105,140,130,SLATE,dash="4 3"), text(140,148,"heat \u2248 300 \u00b0C",11,SLATE),
  text(140,170,"RCOO\u207b Na\u207a \u2192 RH + Na\u2082CO\u2083",11),
  rect(60,185,540,40,stroke=SLATE), text(330,208,"Product carries ONE carbon fewer than the acid \u2014 count it: acetate C\u2082 \u2192 methane C\u2081.",11,SLATE),
]))

MARK = "ar112d"
fig("haloalkane-reduction-panel", "HaloalkaneReductionPanel", "\n".join([
  text(330,24,"Haloalkane \u2192 alkane: three reducing hands",14,weight=600),
  text(120,55,"RX",14,weight=600),
  line(190,55,240,55,BLUE), text(215,45,"LiAlH\u2084",10,BLUE),
  line(190,75,240,75,GREEN), text(215,95,"Zn/HCl",10,GREEN),
  line(190,95,240,95,AMBER), text(215,115,"H\u2082/Pt",10,AMBER),
  text(280,72,"RH",14,weight=600),
  rect(330,45,140,40,stroke=BLUE), text(400,62,"LiAlH\u2084 (ether)",11),
  rect(330,95,140,40,stroke=GREEN), text(400,112,"Zn + conc. HCl",11),
  rect(330,145,140,40,stroke=AMBER), text(400,162,"H\u2082 over Ni/Pt",11),
  text(330,215,"Each agent simply hands the carbon its hydrogen back \u2014 X\u207b departs as HX or salt.",11,SLATE),
]))

MARK = "ar112e"
fig("hydrogenation-surface", "HydrogenationSurface", "\n".join([
  text(330,24,"Catalytic hydrogenation \u2014 a surface story",14,weight=600),
  rect(60,60,180,50,stroke=BLUE), text(150,80,"CH\u2082=CH\u2082 + H\u2082",12,weight=600),
  text(150,98,"ethene",10,SLATE),
  arrow(255,85,300,85,GREEN), text(277,72,"Ni",12,GREEN,weight=600),
  rect(315,60,180,50,stroke=GREEN,sw=2), text(405,80,"CH\u2083\u2013CH\u2083",12,GREEN,weight=600),
  text(405,98,"ethane",10,SLATE),
  rect(60,130,540,60,stroke=SLATE), text(330,152,"Both reactants adsorb onto the metal surface \u2192 H\u2013H bond splits",11,SLATE),
  text(330,172,"H atoms add one to each carbon \u2192 alkane desorbs",11,SLATE),
  text(330,215,"Temperature: 200\u2013300 \u00b0C \u2014 the metal does in seconds what heat alone does never.",11,SLATE),
]))

MARK = "ar112f"
fig("wurtz-limitation-panel", "WurtzLimitationPanel", "\n".join([
  text(330,24,"Wurtz with mixed halides \u2014 three products",14,weight=600),
  text(150,58,"CH\u2083Br",12,BLUE,weight=600), text(210,58,"+",14), text(240,58,"C\u2082H\u2085Br",12,GREEN,weight=600),
  text(330,58,"+",14), text(360,58,"2Na",12,weight=600),
  arrow(430,55,470,55,AMBER),
  rect(40,80,180,45,stroke=BLUE), text(130,100,"CH\u2083\u2013CH\u2083 ethane",11),
  rect(240,80,180,45,stroke=GREEN,sw=2), text(330,100,"C\u2082H\u2085\u2013C\u2082H\u2085 butane",11),
  rect(440,80,180,45,stroke=RED), text(530,100,"CH\u2083\u2013C\u2082H\u2085 propane",11),
  text(330,155,"Self-coupling of each + cross-coupling of both \u2014 inseparable mixture.",12,SLATE),
  rect(60,175,540,40,stroke=SLATE), text(330,198,"Wurtz suits symmetric alkanes only; methane is beyond reach (needs C\u2081 + C\u2081 from methyl halide, which resists Wurtz).",11,SLATE),
]))

MARK = "ar112g"
fig("carbon-count-rules", "CarbonCountRules", "\n".join([
  text(330,24,"Carbon accounting across the four routes",14,weight=600),
  rect(30,45,140,55,stroke=BLUE), text(100,68,"Reduction",12,weight=600), text(100,88,"n stays same",11,SLATE),
  rect(185,45,140,55,stroke=GREEN), text(255,68,"Wurtz",12,weight=600), text(255,88,"2n \u2212 2H + 1",11,SLATE),
  rect(340,45,140,55,stroke=AMBER), text(410,68,"Decarboxylation",12,weight=600), text(410,88,"n \u2212 1",11,SLATE),
  rect(495,45,140,55,stroke=PURPLE), text(565,68,"Hydrogenation",12,weight=600), text(565,88,"n stays same",11,SLATE),
  line(100,100,100,125,SLATE), line(255,100,255,125,SLATE), line(410,100,410,125,SLATE), line(565,100,565,125,SLATE),
  rect(120,125,420,55,stroke=BLUE,sw=2), text(330,148,"Alkane C\u2099H\u2082\u2099\u208a\u2082",14,weight=600),
  text(330,168,"CH\u2083Br\u2192C\u2081 \u00b7 2CH\u2083Br\u2192C\u2082 \u00b7 CH\u2083COONa\u2192C\u2081 \u00b7 CH\u2082=CH\u2082\u2192C\u2082",10,SLATE),
  text(330,215,"Before any mechanism question, count carbons \u2014 it disqualifies half the options.",11,SLATE),
]))

# ---------- 113 ----------
MARK = "ar113a"
fig("methane-chlorination-ladder", "MethaneChlorinationLadder", "\n".join([
  text(330,24,"Methane + Cl\u2082: the substitution ladder",14,weight=600),
  text(60,50,"CH\u2084",13,weight=600), arrow(100,46,150,46,BLUE), text(125,36,"Cl\u2082/h\u03bd",10,BLUE),
  text(180,50,"CH\u2083Cl",12), arrow(220,46,270,46,BLUE), text(245,36,"Cl\u2082/h\u03bd",10,BLUE),
  text(300,50,"CH\u2082Cl\u2082",12), arrow(340,46,390,46,BLUE), text(365,36,"Cl\u2082/h\u03bd",10,BLUE),
  text(420,50,"CHCl\u2083",12), arrow(440,46,490,46,BLUE), text(465,36,"Cl\u2082/h\u03bd",10,BLUE),
  text(520,50,"CCl\u2084",12,weight=600),
  text(180,75,"chloromethane",9,SLATE), text(300,75,"dichloro-",9,SLATE), text(420,75,"chloroform",9,SLATE), text(520,75,"carbon tet.",9,SLATE),
  rect(60,95,540,55,stroke=SLATE), text(330,118,"Each step swaps ONE H for ONE Cl; sunlight (h\u03bd) or 250\u2013400 \u00b0C drives it.",11,SLATE),
  text(330,138,"Uncontrolled \u2192 all four chlorides at once; control ratio/conditions to favour one.",11,SLATE),
  text(330,215,"The ladder never stops on its own \u2014 every product is still a substrate.",11,SLATE),
]))

MARK = "ar113b"
fig("halogen-reactivity-ladder", "HalogenReactivityLadder", "\n".join([
  text(330,24,"Halogen reactivity toward alkanes",14,weight=600),
  circle(120,110,32,stroke=RED,sw=3), text(120,115,"F\u2082",15,weight=600),
  circle(250,110,32,stroke=AMBER,sw=3), text(250,115,"Cl\u2082",15,weight=600),
  circle(380,110,32,stroke=GREEN,sw=3), text(380,115,"Br\u2082",15,weight=600),
  circle(510,110,32,stroke=SLATE,sw=3), text(510,115,"I\u2082",15,weight=600),
  text(120,165,"explosive",10,RED), text(250,165,"h\u03bd / heat",10,SLATE), text(380,165,"h\u03bd, slow",10,SLATE), text(510,165,"reversible",10,SLATE),
  text(330,50,"reactivity falls: F\u2082 > Cl\u2082 > Br\u2082 > I\u2082",12,weight=600),
  text(330,205,"Fluorine needs no activation at all; iodine must be coaxed with oxidant (HNO\u2083/HIO\u2083).",11,SLATE),
]))

MARK = "ar113c"
fig("radical-mechanism-steps", "RadicalMechanismSteps", "\n".join([
  text(330,24,"Free-radical chlorination \u2014 three acts",14,weight=600),
  rect(30,45,190,55,stroke=RED), text(125,68,"Initiation",12,RED,weight=600), text(125,88,"Cl\u2082 \u2192 2Cl\u00b7 (h\u03bd)",11),
  rect(235,45,190,55,stroke=BLUE), text(330,68,"Propagation",12,BLUE,weight=600), text(330,88,"Cl\u00b7+CH\u2084\u2192CH\u2083\u00b7+HCl",10), text(330,102,"CH\u2083\u00b7+Cl\u2082\u2192CH\u2083Cl+Cl\u00b7",9),
  rect(440,45,190,55,stroke=GREEN), text(535,68,"Termination",12,GREEN,weight=600), text(535,88,"Cl\u00b7+Cl\u00b7 / CH\u2083\u00b7+Cl\u00b7",10), text(535,102,"CH\u2083\u00b7+CH\u2083\u00b7\u2192C\u2082H\u2086",9),
  line(220,72,235,72,SLATE), line(425,72,440,72,SLATE),
  text(330,140,"Light (or heat) homolyses Cl\u2082 \u2014 the chain then runs itself.",12,SLATE),
  rect(60,160,540,45,stroke=SLATE), text(330,182,"Trace ethane among products is the fingerprint of CH\u2083\u00b7+CH\u2083\u00b7 termination \u2014 proof the mechanism is radical.",11,SLATE),
  text(330,215,"NEB 2020: the mechanism with its three steps and the ethane trace.",11,SLATE),
]))

MARK = "ar113d"
fig("vapour-phase-nitration", "VapourPhaseNitration", "\n".join([
  text(330,24,"Nitration \u2014 only in the vapour phase",14,weight=600),
  rect(60,50,220,55,stroke=BLUE), text(170,72,"CH\u2084 + HNO\u2083",12,weight=600), text(170,92,"vapour phase",10,SLATE),
  arrow(295,77,340,77,AMBER), text(317,64,"400\u2013425 \u00b0C",10,AMBER),
  rect(355,50,220,55,stroke=GREEN,sw=2), text(465,72,"CH\u2083NO\u2082 + H\u2082O",12,GREEN,weight=600), text(465,92,"nitromethane",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Higher alkanes give mixed nitroalkanes (substitution at several sites).",11,SLATE),
  text(330,172,"Why vapour? Aqueous acid would hydrolyse/oxidise \u2014 only the gas phase survives the temperature.",11,SLATE),
  text(330,215,"One H replaced by \u2013NO\u2082; the C\u2013C skeleton stays intact.",11,SLATE),
]))

MARK = "ar113e"
fig("sulphonation-panel", "SulphonationPanel", "\n".join([
  text(330,24,"Sulphonation \u2014 a long-chain privilege",14,weight=600),
  rect(60,55,240,55,stroke=BLUE), text(180,77,"C\u2081\u2086H\u2083\u2084 (hexane)",12,weight=600), text(180,97,"long-chain alkane",10,SLATE),
  arrow(315,82,360,82,AMBER), text(337,68,"fuming H\u2082SO\u2084",10,AMBER),
  rect(375,55,240,55,stroke=GREEN,sw=2), text(495,77,"C\u2081\u2086H\u2083\u2083SO\u2083H",12,GREEN,weight=600), text(495,97,"sulphonic acid",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Methane, ethane, propane refuse \u2014 the \u2013SO\u2083H needs a stable enough carbon framework.",11,SLATE),
  text(330,172,"Only higher alkanes (C\u2086 onward) accept the sulphonic group.",11,SLATE),
  text(330,215,"Product = arene-sulphonic-acid analogue of the alkyl chain: water-soluble surfactant chemistry.",11,SLATE),
]))

MARK = "ar113f"
fig("controlled-oxidation-ethane", "ControlledOxidationEthane", "\n".join([
  text(330,24,"Oxidation of ethane \u2014 complete vs controlled",14,weight=600),
  rect(40,50,170,55,stroke=RED), text(125,72,"Excess O\u2082",12,RED,weight=600), text(125,92,"complete",10,SLATE),
  arrow(225,77,265,77,SLATE),
  rect(280,50,130,55,stroke=SLATE), text(345,72,"CO\u2082 + H\u2082O",12), text(345,92,"+ 372 kcal",10,SLATE),
  rect(40,130,170,55,stroke=AMBER), text(125,152,"Controlled O\u2082",12,AMBER,weight=600), text(125,172,"(heated Cu, 100 atm)",9,SLATE),
  arrow(225,157,265,157,SLATE),
  rect(280,130,130,55,stroke=GREEN,sw=2), text(345,152,"CH\u2083CHO",12,GREEN,weight=600), text(345,172,"acetaldehyde",10,SLATE),
  rect(430,50,200,135,stroke=BLUE), text(530,75,"Incomplete oxidation",11,BLUE,weight=600),
  text(530,100,"limited O\u2082 stops at",10,SLATE), text(530,120,"the aldehyde \u2014 value",10,SLATE),
  text(530,140,"added to the fuel instead",10,SLATE), text(530,160,"of burning it away.",10,SLATE),
  text(330,215,"Same molecule, two oxygen budgets, two destinations.",11,SLATE),
]))

MARK = "ar113g"
fig("combustion-energy-panel", "CombustionEnergyPanel", "\n".join([
  text(330,24,"Combustion \u2014 the energy ledger",14,weight=600),
  rect(60,50,260,60,stroke=BLUE), text(190,75,"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",12,weight=600), text(190,98,"\u0394H = \u2212210 kcal (890 kJ)",11,AMBER),
  rect(340,50,260,60,stroke=GREEN), text(470,75,"C\u2082H\u2086 + 3.5O\u2082 \u2192 2CO\u2082 + 3H\u2082O",11,weight=600), text(470,98,"\u0394H = \u2212372 kcal",11,AMBER),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"More carbons \u2192 more heat per mole \u2014 the ledger scales with the skeleton.",11,SLATE),
  text(330,172,"Insufficient O\u2082 leaks carbon monoxide (or soot) instead of CO\u2082.",11,SLATE),
  text(330,215,"CO is the silent poison: it binds haemoglobin 200\u00d7 tighter than O\u2082.",11,SLATE),
]))

# ---------- 114 ----------
MARK = "ar114a"
fig("alkene-prep-routes", "AlkenePrepRoutes", "\n".join([
  text(330,24,"Three doors to an alkene",14,weight=600),
  rect(30,45,180,60,stroke=BLUE), text(120,68,"Dehydration",12,weight=600), text(120,88,"of alcohols",11,SLATE),
  rect(240,45,180,60,stroke=GREEN), text(330,68,"Dehydrohalogenation",12,weight=600), text(330,88,"of haloalkanes",11,SLATE),
  rect(450,45,180,60,stroke=AMBER), text(540,68,"Hydrogenation",12,weight=600), text(540,88,"of alkynes (partial)",11,SLATE),
  line(120,105,120,130,SLATE), line(330,105,330,130,SLATE), line(540,105,540,130,SLATE),
  rect(180,130,300,55,stroke=BLUE,sw=2), text(330,153,"Alkene C\u2099H\u2082\u2099",14,weight=600),
  text(330,172,"lose H\u2082O / HX / half the H\u2082",11,SLATE),
  text(330,215,"All three routes remove atoms in pairs from adjacent carbons.",11,SLATE),
]))

MARK = "ar114b"
fig("dehydration-temperature-fork", "DehydrationTemperatureFork", "\n".join([
  text(330,24,"Ethanol dehydration \u2014 temperature is the switch",14,weight=600),
  rect(60,50,220,55,stroke=AMBER), text(170,72,"~140 \u00b0C",14,AMBER,weight=600), text(170,92,"excess ethanol, lower T",10,SLATE),
  rect(60,130,220,55,stroke=BLUE), text(170,152,"~170 \u00b0C",14,BLUE,weight=600), text(170,172,"excess acid, higher T",10,SLATE),
  line(280,77,320,77,SLATE), line(280,157,320,157,SLATE),
  rect(335,50,290,55,stroke=AMBER), text(480,72,"C\u2082H\u2085\u2013O\u2013C\u2082H\u2085",12,weight=600), text(480,92,"diethyl ether (substitution)",10,SLATE),
  rect(335,130,290,55,stroke=BLUE,sw=2), text(480,152,"CH\u2082=CH\u2082",12,BLUE,weight=600), text(480,172,"ethene (elimination)",10,SLATE),
  text(330,215,"Same reagents, one dial: 30 degrees decide between ether and alkene.",11,SLATE),
]))

MARK = "ar114c"
fig("dehydrohalogenation-panel", "DehydrohalogenationPanel", "\n".join([
  text(330,24,"Dehydrohalogenation \u2014 alcoholic KOH, not aqueous",14,weight=600),
  rect(50,55,230,55,stroke=BLUE), text(165,77,"CH\u2083CH\u2082Br + KOH",12,weight=600), text(165,97,"alcoholic, heat",10,SLATE),
  arrow(295,82,340,82,AMBER),
  rect(355,55,240,55,stroke=GREEN,sw=2), text(475,77,"CH\u2082=CH\u2082 + KBr + H\u2082O",11,GREEN,weight=600),
  text(475,97,"ethene",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Aqueous KOH substitutes (gives alcohol); alcoholic KOH eliminates (gives alkene).",11,SLATE),
  text(330,172,"\u03b2-elimination: H leaves the neighbour carbon, X leaves its own \u2014 both must be adjacent.",11,SLATE),
  text(330,215,"The solvent is the switch here, just as temperature was for dehydration.",11,SLATE),
]))

MARK = "ar114d"
fig("saytzeff-rule-panel", "SaytzeffRulePanel", "\n".join([
  text(330,24,"Saytzeff \u2014 hydrogen leaves the poorer side",14,weight=600),
  text(150,60,"CH\u2083",11), text(215,60,"CHBr",12,weight=600), text(280,60,"CH\u2082\u2013CH\u2083",11),
  text(215,80,"2-bromobutane",10,SLATE),
  line(240,90,240,115,SLATE), text(240,132,"alc. KOH",10,AMBER),
  text(105,160,"H from C1",10,BLUE), arrow(150,155,190,155,BLUE),
  text(255,160,"but-1-ene",11), text(255,178,"minor",10,SLATE),
  text(320,160,"H from C3",10,GREEN), arrow(365,155,405,155,GREEN),
  text(470,160,"but-2-ene",11,GREEN,weight=600), text(470,178,"MAJOR",10,GREEN,weight=600),
  rect(60,190,540,35,stroke=SLATE), text(330,212,"The more substituted (stabler) alkene wins \u2014 hydrogen departs from the carbon that already has fewer H.",10,SLATE),
]))

MARK = "ar114e"
fig("lindlar-catalyst-panel", "LindlarCatalystPanel", "\n".join([
  text(330,24,"Lindlar \u2014 the poisoned catalyst stops on time",14,weight=600),
  rect(60,55,200,55,stroke=BLUE), text(160,77,"HC\u2261CH + H\u2082",12,weight=600), text(160,97,"alkyne",10,SLATE),
  arrow(275,82,320,82,GREEN), text(297,68,"Lindlar",10,GREEN,weight=600),
  rect(335,55,240,55,stroke=GREEN,sw=2), text(455,77,"CH\u2082=CH\u2082",12,GREEN,weight=600), text(455,97,"alkene only",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Pd/BaSO\u2084 poisoned with quinoline \u2014 weaker by design.",11,SLATE),
  text(330,172,"Full Ni would sail past the alkene to the alkane; Lindlar brakes exactly once.",11,SLATE),
  text(330,215,"Alkyne \u2192 alkene is thus the controlled step; alkane needs the unpoisoned metal.",11,SLATE),
]))

MARK = "ar114f"
fig("hydrogenation-mechanism-steps", "HydrogenationMechanismSteps", "\n".join([
  text(330,24,"Ethene \u2192 ethane: three surface acts",14,weight=600),
  rect(30,50,190,55,stroke=BLUE), text(125,72,"1. Adsorption",12,BLUE,weight=600), text(125,92,"both gases stick to Ni",10,SLATE),
  rect(235,50,190,55,stroke=AMBER), text(330,72,"2. Syn addition",12,AMBER,weight=600), text(330,92,"H atoms add same side",10,SLATE),
  rect(440,50,190,55,stroke=GREEN), text(535,72,"3. Desorption",12,GREEN,weight=600), text(535,92,"ethane leaves surface",10,SLATE),
  line(220,77,235,77,SLATE), line(425,77,440,77,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The metal splits H\u2013H into atoms \u2014 the real hydrogenating agent is surface-bound H.",11,SLATE),
  text(330,172,"Both H\u2019s arrive from the same face \u2192 syn stereochemistry.",11,SLATE),
  text(330,215,"NEB 2023/2024: name the three steps in order \u2014 adsorption, addition, desorption.",11,SLATE),
]))

MARK = "ar114g"
fig("alkene-family-panel", "AlkeneFamilyPanel", "\n".join([
  text(330,24,"The alkene family C\u2099H\u2082\u2099",14,weight=600),
  rect(60,50,160,55,stroke=BLUE), text(140,72,"CH\u2082=CH\u2082",12,weight=600), text(140,92,"ethene (C\u2082)",10,SLATE),
  rect(250,50,160,55,stroke=GREEN), text(330,72,"CH\u2083CH=CH\u2082",11,weight=600), text(330,92,"propene (C\u2083)",10,SLATE),
  rect(440,50,160,55,stroke=AMBER), text(520,72,"C\u2084H\u2088 isomers",11,weight=600), text(520,92,"butenes (C\u2084)",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Each CH\u2082 step adds 14 to the molar mass \u2014 the homologous ladder.",11,SLATE),
  text(330,172,"Double bond position matters: but-1-ene \u2260 but-2-ene (positional isomers).",11,SLATE),
  text(330,215,"C\u2099H\u2082\u2099 \u2014 two hydrogens short of the alkane formula, one \u03c0 bond to show for it.",11,SLATE),
]))

for fname, comp, code in FIGS:
    p = os.path.join(OUT, fname + ".tsx")
    assert not os.path.exists(p), "collision: " + fname
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(code)
    print("wrote", fname)
print("batch1 done:", len(FIGS))
