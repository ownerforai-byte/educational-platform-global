# -*- coding: utf-8 -*-
# Hydrocarbons figures batch 2: rows 115-117 (alkene properties, alkyne prep, alkyne properties)
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

# ---------- 115 ----------
MARK = "ar115a"
fig("markovnikov-rule-panel", "MarkovnikovRulePanel", "\n".join([
  text(330,24,"Markovnikov's rule \u2014 the negative part chooses",14,weight=600),
  text(120,60,"CH\u2083\u2013CH=CH\u2082",13,weight=600),
  text(120,80,"propene",10,SLATE),
  arrow(210,55,250,55,BLUE), text(230,42,"+HBr",10,BLUE),
  text(300,60,"CH\u2083\u2013CHBr\u2013CH\u2083",12,GREEN,weight=600),
  text(300,80,"2-bromopropane (major)",10,SLATE),
  rect(60,100,540,55,stroke=SLATE), text(330,122,"The negative part (Br\u207b) attaches to the carbon bearing FEWER hydrogens;",11,SLATE),
  text(330,142,"H\u207a goes to the carbon already holding more H \u2014 via the stabler carbocation.",11,SLATE),
  rect(60,170,540,40,stroke=BLUE), text(330,192,"Every Markovnikov question is a carbocation-stability question in disguise.",11,BLUE),
]))

MARK = "ar115b"
fig("propene-hbr-demo", "PropeneHbrDemo", "\n".join([
  text(330,24,"Propene + HBr \u2014 the carbocation fork",14,weight=600),
  text(140,55,"CH\u2082=CH\u2013CH\u2083",12,weight=600),
  text(140,75,"C1: 2H \u00b7 C2: 1H",10,SLATE),
  arrow(230,50,270,40,BLUE), text(250,30,"H\u207a \u2192 C1",9,BLUE),
  arrow(230,60,270,80,SLATE), text(250,95,"H\u207a \u2192 C2",9,SLATE),
  circle(310,38,14,stroke=RED,sw=2), text(310,42,"2\u00b0",10,RED,weight=600),
  text(390,42,"CH\u2083\u2013C\u207aH\u2013CH\u2083",10),
  circle(310,85,14,stroke=SLATE,sw=1.5), text(310,89,"1\u00b0",10,SLATE),
  text(390,89,"CH\u2082\u207a\u2013CH\u2082\u2013CH\u2083",10),
  text(330,120,"secondary carbocation wins \u2192 Br\u207b attacks C2",11,SLATE),
  rect(120,140,420,45,stroke=GREEN,sw=2), text(330,162,"CH\u2083\u2013CH=CH\u2082 + HBr \u2192 CH\u2083\u2013CHBr\u2013CH\u2083",12,GREEN,weight=600),
  text(330,178,"2-bromopropane \u2014 the Markovnikov product",10,SLATE),
  text(330,215,"1-bromopropane would need the unstable 1\u00b0 cation \u2014 it barely forms.",11,SLATE),
]))

MARK = "ar115c"
fig("peroxide-effect-panel", "PeroxideEffectPanel", "\n".join([
  text(330,24,"The peroxide effect \u2014 HBr's private reversal",14,weight=600),
  rect(40,50,260,55,stroke=BLUE), text(170,72,"No peroxide (Markovnikov)",11,BLUE,weight=600),
  text(170,92,"propene + HBr \u2192 2-bromopropane",10,SLATE),
  rect(360,50,260,55,stroke=RED,sw=2), text(490,72,"With peroxides (anti-M)",11,RED,weight=600),
  text(490,92,"propene + HBr \u2192 1-bromopropane",10,SLATE),
  rect(60,125,540,50,stroke=SLATE), text(330,147,"Peroxides homolyse \u2192 radicals \u2192 Br\u00b7 adds FIRST \u2192 radical chain.",11,SLATE),
  text(330,167,"The stabler radical puts Br on the H-rich carbon \u2014 opposite of the ionic path.",11,SLATE),
  rect(60,185,540,40,stroke=AMBER), text(330,207,"Only HBr flips: Cl\u00b7 too fast, I\u00b7 too weak \u2014 bond energetics police the exception.",11,AMBER),
]))

MARK = "ar115d"
fig("hydration-of-ethene", "HydrationOfEthene", "\n".join([
  text(330,24,"Industrial ethanol from ethene",14,weight=600),
  rect(60,55,220,55,stroke=BLUE), text(170,77,"CH\u2082=CH\u2082 + H\u2082O",12,weight=600), text(170,97,"ethene (from cracking)",10,SLATE),
  arrow(295,82,340,82,GREEN), text(317,68,"conc. H\u2082SO\u2084",10,GREEN),
  rect(355,55,240,55,stroke=GREEN,sw=2), text(475,77,"CH\u2083CH\u2082OH",12,GREEN,weight=600), text(475,97,"ethanol",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"H\u2082SO\u2084 first adds as ethyl hydrogen sulphate (CH\u2083CH\u2082OSO\u2083H),",11,SLATE),
  text(330,172,"then hydrolysis releases the alcohol and regenerates the acid.",11,SLATE),
  text(330,215,"Markovnikov hydration: propene would give isopropanol, not propan-1-ol.",11,SLATE),
]))

MARK = "ar115e"
fig("h2so4-addition-route", "H2so4AdditionRoute", "\n".join([
  text(330,24,"H\u2082SO\u2084 addition \u2014 the two-step detour",14,weight=600),
  rect(40,55,180,55,stroke=BLUE), text(130,77,"CH\u2082=CH\u2082",12,weight=600), text(130,97,"ethene",10,SLATE),
  arrow(235,82,275,82,AMBER), text(255,68,"H\u2082SO\u2084",10,AMBER),
  rect(290,55,180,55,stroke=PURPLE), text(380,77,"CH\u2083CH\u2082OSO\u2083H",10,weight=600), text(380,97,"ethyl hydrogen sulphate",9,SLATE),
  arrow(485,82,525,82,GREEN), text(505,68,"H\u2082O",10,GREEN),
  rect(525,55,110,55,stroke=GREEN,sw=2), text(580,77,"C\u2082H\u2085OH",11,GREEN,weight=600), text(580,97,"ethanol",9,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The acid is a reactant in step 1 and a catalyst overall \u2014 regenerated in step 2.",11,SLATE),
  text(330,172,"Direct water addition is too slow; the sulphate ester is the fast lane.",11,SLATE),
  text(330,215,"This is the same chemistry the hydration panel summarises \u2014 here in slow motion.",11,SLATE),
]))

MARK = "ar115f"
fig("ozonolysis-workflow", "OzonolysisWorkflow", "\n".join([
  text(330,24,"Ozonolysis \u2014 cut, then read",14,weight=600),
  rect(50,55,170,55,stroke=BLUE), text(135,77,"Alkene",12,weight=600), text(135,97,"unknown C=C site",10,SLATE),
  arrow(235,82,275,82,PURPLE), text(255,68,"O\u2083, ~195 K",9,PURPLE),
  rect(290,55,150,55,stroke=PURPLE), text(365,77,"Ozonide",12,PURPLE,weight=600), text(365,97,"cyclic peroxide",10,SLATE),
  arrow(455,82,495,82,GREEN), text(475,68,"Zn/H\u2082O",9,GREEN),
  rect(510,55,120,55,stroke=GREEN,sw=2), text(570,77,"Carbonyls",12,GREEN,weight=600), text(570,97,"aldehydes/ketones",9,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The C=C is cleaved completely \u2014 each former alkene carbon becomes C=O.",11,SLATE),
  text(330,172,"Zn (reductive work-up) stops at aldehydes; oxidative work-up would over-shoot to acids.",11,SLATE),
  text(330,215,"Structure-detection tool: reassemble the fragments to locate the original double bond.",11,SLATE),
]))

MARK = "ar115g"
fig("ozonolysis-product-map", "OzonolysisProductMap", "\n".join([
  text(330,24,"Ozonolysis products \u2014 read the fragments",14,weight=600),
  rect(40,50,180,50,stroke=BLUE), text(130,70,"CH\u2082=CH\u2082",12,weight=600), text(130,90,"ethene",10,SLATE),
  text(250,75,"\u2192",14), text(310,75,"2 HCHO",12,GREEN,weight=600), text(310,92,"formaldehyde",9,SLATE),
  rect(370,50,180,50,stroke=AMBER), text(460,70,"CH\u2083CH=CHCH\u2083",11,weight=600), text(460,90,"but-2-ene",10,SLATE),
  text(580,75,"\u2192",14),
  rect(40,130,180,50,stroke=RED), text(130,150,"CH\u2083CH=CH\u2082",12,weight=600), text(130,170,"propene",10,SLATE),
  text(250,155,"\u2192",14), text(305,155,"HCHO +",11), text(360,155,"CH\u2083CHO",11,weight=600),
  rect(420,130,200,50,stroke=SLATE), text(520,150,"Terminal =CH\u2082 \u2192 HCHO",11,weight=600),
  text(520,170,"symmetric internal \u2192 2 same",10,SLATE),
  text(330,215,"Two identical fragments = symmetric alkene; two different = reconstruct the bond site.",11,SLATE),
]))

# ---------- 116 ----------
MARK = "ar116a"
fig("alkyne-prep-routes", "AlkynePrepRoutes", "\n".join([
  text(330,24,"Three doors to an alkyne",14,weight=600),
  rect(30,45,180,60,stroke=BLUE), text(120,68,"CaC\u2082 + H\u2082O",12,weight=600), text(120,88,"carbide hydrolysis",11,SLATE),
  rect(240,45,180,60,stroke=GREEN), text(330,68,"Vicinal dihalide",12,weight=600), text(330,88,"2 alc. KOH",11,SLATE),
  rect(450,45,180,60,stroke=AMBER), text(540,68,"Haloform + hot Ag",12,weight=600), text(540,88,"dehalogenation",11,SLATE),
  line(120,105,120,130,SLATE), line(330,105,330,130,SLATE), line(540,105,540,130,SLATE),
  rect(180,130,300,55,stroke=BLUE,sw=2), text(330,153,"Alkyne C\u2099H\u2082\u2099\u208b\u2082",14,weight=600),
  text(330,172,"ethyne (acetylene) is the parent",11,SLATE),
  text(330,215,"A triple bond costs two eliminations \u2014 or one carbide's dianion.",11,SLATE),
]))

MARK = "ar116b"
fig("calcium-carbide-two-step", "CalciumCarbideTwoStep", "\n".join([
  text(330,24,"Calcium carbide \u2014 two equations, in order",14,weight=600),
  rect(40,50,220,55,stroke=AMBER), text(150,72,"CaO + 3C",12,weight=600), text(150,92,"electric furnace ~2000 \u00b0C",10,SLATE),
  arrow(275,77,315,77,SLATE),
  rect(330,50,130,55,stroke=PURPLE), text(395,72,"CaC\u2082 + CO",12,weight=600), text(395,92,"carbide",10,SLATE),
  arrow(475,77,515,77,BLUE), text(495,64,"H\u2082O",10,BLUE),
  rect(40,130,580,55,stroke=GREEN,sw=2), text(330,152,"CaC\u2082 + 2H\u2082O \u2192 HC\u2261CH + Ca(OH)\u2082",13,GREEN,weight=600),
  text(330,172,"ethyne + slaked lime \u2014 strongly exothermic",10,SLATE),
  text(330,215,"C\u2082\u00b2\u207b is the acetylide dianion \u2014 water simply protonates it twice.",11,SLATE),
]))

MARK = "ar116c"
fig("vicinal-dihalide-route", "VicinalDihalideRoute", "\n".join([
  text(330,24,"Vicinal dihalide \u2192 alkyne: two eliminations",14,weight=600),
  rect(40,50,220,55,stroke=BLUE), text(150,72,"BrCH\u2082CH\u2082Br",12,weight=600), text(150,92,"1,2-dibromoethane",10,SLATE),
  arrow(275,77,315,77,AMBER), text(295,64,"alc. KOH",9,AMBER),
  rect(330,50,140,55,stroke=PURPLE), text(400,72,"CH\u2082=CHBr",11,weight=600), text(400,92,"vinyl halide",10,SLATE),
  arrow(485,77,525,77,RED), text(505,64,"strong base",9,RED),
  rect(40,130,580,55,stroke=GREEN,sw=2), text(330,152,"BrCH\u2082CH\u2082Br + 2KOH \u2192 HC\u2261CH + 2KBr + 2H\u2082O",12,GREEN,weight=600),
  text(330,172,"first elimination easy; second strips HX off an sp\u00b2 carbon",10,SLATE),
  text(330,215,"Modern practice: NaNH\u2082 in liquid NH\u2083 for the tougher second step.",11,SLATE),
]))

MARK = "ar116d"
fig("haloform-silver-route", "HaloformSilverRoute", "\n".join([
  text(330,24,"Haloform + hot silver \u2014 halide scavenging",14,weight=600),
  rect(40,50,180,55,stroke=BLUE), text(130,72,"CHCl\u2083",13,weight=600), text(130,92,"chloroform",10,SLATE),
  arrow(235,77,275,77,AMBER), text(255,64,"2Ag, heat",9,AMBER),
  rect(290,50,140,55,stroke=GREEN,sw=2), text(360,72,"HC\u2261CH",12,GREEN,weight=600), text(360,92,"ethyne",10,SLATE),
  rect(445,50,175,55,stroke=SLATE), text(532,72,"+ 2AgCl",12), text(532,92,"white solid",10,SLATE),
  rect(40,130,580,55,stroke=TEAL), text(330,152,"CHI\u2083 + 2Ag \u2192 HC\u2261CH + 2AgI \u2014 same route, iodoform",12,TEAL,weight=600),
  text(330,172,"driving force: the stability of the silver halide lattice",10,SLATE),
  text(330,215,"Silver's love of halide pays for the whole dehalogenation.",11,SLATE),
]))

MARK = "ar116e"
fig("double-elimination-logic", "DoubleEliminationLogic", "\n".join([
  text(330,24,"Why the second elimination is harder",14,weight=600),
  rect(60,50,240,55,stroke=BLUE), text(180,72,"Step 1: sp\u00b3 \u2192 sp\u00b2",12,weight=600), text(180,92,"HBr leaves, alkene forms \u2014 easy",10,SLATE),
  rect(360,50,240,55,stroke=RED,sw=2), text(480,72,"Step 2: sp\u00b2 \u2192 sp",12,RED,weight=600), text(480,92,"HBr leaves the vinyl carbon \u2014 hard",10,SLATE),
  rect(60,125,540,50,stroke=SLATE), text(330,147,"s-character rises 25% \u2192 33% \u2192 50%: the carbon holds its H ever tighter.",11,SLATE),
  text(330,167,"Ordinary alc. KOH stalls at the vinyl halide; NaNH\u2082 finishes the job.",11,SLATE),
  text(330,215,"Difficulty tracks s-character \u2014 the same principle that makes \u2261C\u2013H acidic.",11,SLATE),
]))

MARK = "ar116f"
fig("ethyne-identity-panel", "EthyneIdentityPanel", "\n".join([
  text(330,24,"Ethyne = acetylene \u2014 one molecule, two names",14,weight=600),
  rect(60,55,240,60,stroke=BLUE), text(180,80,"HC\u2261CH",15,weight=600), text(180,102,"IUPAC: ethyne",11,SLATE),
  rect(360,55,240,60,stroke=GREEN), text(480,80,"C\u2082H\u2082",15,weight=600), text(480,102,"trivial: acetylene",11,SLATE),
  rect(60,135,540,50,stroke=SLATE), text(330,157,"sp carbons \u00b7 50% s-character \u00b7 linear 180\u00b0 \u00b7 pKa \u2248 25",11,SLATE),
  text(330,177,"the only hydrocarbon family with acidic C\u2013H bonds",10,SLATE),
  text(330,215,"Oxy-acetylene flame: ~3300 \u00b0C \u2014 hot enough to cut steel.",11,SLATE),
]))

MARK = "ar116g"
fig("carbide-impurity-wash", "CarbideImpurityWash", "\n".join([
  text(330,24,"Technical carbide \u2014 wash the gas before use",14,weight=600),
  rect(40,55,200,55,stroke=AMBER), text(140,77,"Crude ethyne",12,weight=600), text(140,97,"PH\u2083 + H\u2082S impurities",10,SLATE),
  arrow(255,82,295,82,BLUE), text(275,68,"wash",10,BLUE),
  rect(310,55,150,55,stroke=BLUE), text(385,77,"acid / CuCl",11), text(385,97,"ammoniacal wash",9,SLATE),
  arrow(475,82,515,82,GREEN),
  rect(525,55,105,55,stroke=GREEN,sw=2), text(577,77,"Pure",11,GREEN,weight=600), text(577,97,"C\u2082H\u2082",11,GREEN),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Ca\u2083P\u2082 and CaS in technical carbide hydrolyse to PH\u2083 and H\u2082S.",11,SLATE),
  text(330,172,"Impure acetylene is not just smelly \u2014 PH\u2083 is spontaneously flammable.",11,SLATE),
  text(330,215,"Pure ethyne's garlic note comes from residual phosphine \u2014 wash it out.",11,SLATE),
]))

# ---------- 117 ----------
MARK = "ar117a"
fig("alkyne-addition-map", "AlkyneAdditionMap", "\n".join([
  text(330,24,"Ethyne's addition menu",14,weight=600),
  rect(30,50,180,50,stroke=BLUE), text(120,70,"+ H\u2082 (Lindlar)",11,weight=600), text(120,90,"\u2192 ethene",10,SLATE),
  rect(240,50,180,50,stroke=GREEN), text(330,70,"+ H\u2082 (Ni, excess)",11,weight=600), text(330,90,"\u2192 ethane",10,SLATE),
  rect(450,50,180,50,stroke=AMBER), text(540,70,"+ HCl (HgCl\u2082)",11,weight=600), text(540,90,"\u2192 CH\u2082=CHCl",10,SLATE),
  rect(140,130,380,50,stroke=PURPLE,sw=2), text(330,150,"+ H\u2082O (H\u2082SO\u2084/HgSO\u2084) \u2192 CH\u2083CHO",12,PURPLE,weight=600),
  text(330,170,"via the enol \u2014 the family's only aldehyde",10,SLATE),
  text(330,215,"Two \u03c0 bonds \u2192 up to two equivalents of everything; the catalyst sets the stop.",11,SLATE),
]))

MARK = "ar117b"
fig("ethyne-hydration-tautomer", "EthyneHydrationTautomer", "\n".join([
  text(330,24,"Hydration of ethyne \u2014 the enol detour",14,weight=600),
  rect(40,55,170,55,stroke=BLUE), text(125,77,"HC\u2261CH",13,weight=600), text(125,97,"ethyne",10,SLATE),
  arrow(225,82,265,82,AMBER), text(245,68,"H\u2082O",9,AMBER), text(245,95,"H\u2082SO\u2084/HgSO\u2084",8,SLATE),
  rect(280,55,170,55,stroke=PURPLE), text(365,77,"CH\u2082=CHOH",11,weight=600), text(365,97,"vinyl alcohol (enol)",9,SLATE),
  arrow(465,82,505,82,GREEN), text(485,68,"tautomerise",9,GREEN),
  rect(520,55,110,55,stroke=GREEN,sw=2), text(575,77,"CH\u2083CHO",11,GREEN,weight=600), text(575,97,"acetaldehyde",9,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The O\u2013H hydrogen migrates to carbon; the \u03c0 bond shifts \u2014 enol \u2192 keto.",11,SLATE),
  text(330,172,"Ethyne is the only alkyne giving an aldehyde; all others give ketones.",11,SLATE),
  text(330,215,"Markovnikov addition puts OH on the internal carbon \u2014 hence the enol at all.",11,SLATE),
]))

MARK = "ar117c"
fig("sp-acidity-ladder", "SpAcidityLadder", "\n".join([
  text(330,24,"Acidity ladder \u2014 s-character is the engine",14,weight=600),
  rect(60,50,160,55,stroke=GREEN,sw=2), text(140,72,"Alkyne sp",12,GREEN,weight=600), text(140,92,"pKa \u2248 25",11),
  rect(250,50,160,55,stroke=AMBER), text(330,72,"Alkene sp\u00b2",12,AMBER,weight=600), text(330,92,"pKa \u2248 44",11),
  rect(440,50,160,55,stroke=RED), text(520,72,"Alkane sp\u00b3",12,RED,weight=600), text(520,92,"pKa \u2248 50",11),
  text(330,130,"50% \u00b7 33% \u00b7 25% s-character \u2014 the pair sits closer to the nucleus",11,SLATE),
  rect(60,150,540,45,stroke=BLUE), text(330,172,"HC\u2261CH + 2Na \u2192 2HC\u2261CNa + H\u2082 \u2014 metals pull off the only acidic hydrocarbon H",11,BLUE),
  text(330,215,"Weak acids in absolute terms \u2014 but 25 orders of magnitude ahead of ethane.",11,SLATE),
]))

MARK = "ar117d"
fig("acetylide-formation", "AcetylideFormation", "\n".join([
  text(330,24,"Acetylides \u2014 salts from a hydrocarbon",14,weight=600),
  rect(40,55,230,55,stroke=BLUE), text(155,77,"HC\u2261CH + NaNH\u2082",11,weight=600), text(155,97,"liquid ammonia",10,SLATE),
  arrow(285,82,325,82,GREEN),
  rect(340,55,200,55,stroke=GREEN,sw=2), text(440,77,"HC\u2261C\u207b Na\u207a",12,GREEN,weight=600), text(440,97,"sodium acetylide",10,SLATE),
  rect(40,130,580,50,stroke=SLATE), text(330,152,"With Na metal: HC\u2261CH + 2Na \u2192 2NaC\u2261CH... hydrogen gas bubbles out.",11,SLATE),
  text(330,172,"The acetylide anion is a carbon nucleophile \u2014 C\u2013C bond builder in synthesis.",11,SLATE),
  text(330,215,"Deprotonating a hydrocarbon with a base \u2014 possible only in the sp family.",11,SLATE),
]))

MARK = "ar117e"
fig("ammoniacal-silver-test", "AmmoniacalSilverTest", "\n".join([
  text(330,24,"Ammoniacal AgNO\u2083 \u2014 the white verdict",14,weight=600),
  rect(60,55,260,55,stroke=BLUE), text(190,77,"HC\u2261CH + 2[Ag(NH\u2083)\u2082]\u207a",11,weight=600), text(190,97,"Tollens-type reagent",10,SLATE),
  arrow(335,82,375,82,GREEN),
  rect(390,55,230,55,stroke=SLATE,sw=2), text(505,77,"Ag\u2082C\u2082 \u2193 (white)",12,weight=600), text(505,97,"silver acetylide",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The acidic \u2261C\u2013H proton is replaced by Ag \u2014 direct proof of acidity.",11,SLATE),
  text(330,172,"Only TERMINAL alkynes respond; internal ones have no \u2261C\u2013H.",11,SLATE),
  text(330,215,"Dry heavy-metal acetylides are explosive \u2014 keep wet, destroy after test.",11,SLATE),
]))

MARK = "ar117f"
fig("ammoniacal-copper-test", "AmmoniacalCopperTest", "\n".join([
  text(330,24,"Ammoniacal Cu\u2082Cl\u2082 \u2014 the red verdict",14,weight=600),
  rect(60,55,260,55,stroke=BLUE), text(190,77,"HC\u2261CH + 2[Cu(NH\u2083)\u2082]\u207a",11,weight=600), text(190,97,"ammoniacal cuprous chloride",10,SLATE),
  arrow(335,82,375,82,RED),
  rect(390,55,230,55,stroke=RED,sw=2), text(505,77,"Cu\u2082C\u2082 \u2193 (red)",12,RED,weight=600), text(505,97,"copper acetylide",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"Same chemistry as the silver test \u2014 different metal, different colour.",11,SLATE),
  text(330,172,"White with Ag, red with Cu: two witnesses, one terminal \u2261C\u2013H.",11,SLATE),
  text(330,215,"These precipitates separate ethyne from ethene \u2014 bromine water cannot.",11,SLATE),
]))

MARK = "ar117g"
fig("terminal-vs-internal", "TerminalVsInternal", "\n".join([
  text(330,24,"Terminal vs internal \u2014 one hydrogen of difference",14,weight=600),
  rect(40,50,280,60,stroke=GREEN,sw=2), text(180,72,"But-1-yne CH\u2083CH\u2082C\u2261C\u2013H",11,weight=600),
  text(180,92,"terminal \u2192 Ag\u2082C\u2082 white, Cu\u2082C\u2082 red",10,SLATE),
  rect(340,50,280,60,stroke=SLATE), text(480,72,"But-2-yne CH\u2083\u2013C\u2261C\u2013CH\u2083",11,weight=600),
  text(480,92,"internal \u2192 no precipitate, silent",10,SLATE),
  rect(60,130,540,50,stroke=SLATE), text(330,152,"The \u2261C\u2013H hydrogen exists only at a chain end \u2014 acidity is positional.",11,SLATE),
  text(330,172,"A negative test is information too: it certifies the internal isomer.",11,SLATE),
  text(330,215,"Structure probes: bromine water says unsaturated; ammoniacal tests say terminal.",11,SLATE),
]))

for fname, comp, code in FIGS:
    p = os.path.join(OUT, fname + ".tsx")
    assert not os.path.exists(p), "collision: " + fname
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(code)
    print("wrote", fname)
print("batch2 done:", len(FIGS))
