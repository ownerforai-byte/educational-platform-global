import io, re, json, glob, os

REG = r"frontend/features/docs/figures/registry.ts"
CANON_DIR = r"frontend/public/data/syllabus-notes/chemistry/chemistry-of-non-metals"

ENTRIES = [
("chemical-properties-of-nitric-acid-hno3-as-an-acid-and-oxidizing-agent-action-with-zinc-magnesiu",
 "HNO3: acid, oxidant, and the brown ring",
 [("Hno3ReactionMatrix","hno3-reaction-matrix","HNO3 reaction matrix","Matrix of nitric acid reactions with copper zinc and non-metals at different concentrations showing the reduction product","nitric acid"),
  ("ConcentrationCodeLadder","concentration-code-ladder","The deeper the dilution, the deeper the cut","Ladder of nitric acid concentration against reduction product from nitrogen dioxide to ammonium nitrate","dilute"),
  ("NonmetalOxyacidMap","nonmetal-oxyacid-map","No cation? Then the oxyacid gets made","Non-metals sulphur carbon and phosphorus oxidised by concentrated nitric acid to their highest oxyacids","oxidis"),
  ("BrownRingJunction","brown-ring-junction","The brown ring at the junction","Test tube with layered sulphuric acid and ferrous sulphate showing the brown nitrosyl ring at the junction","brown ring"),
  ("Hno3LabPrepPanel","hno3-lab-prep-panel","Lab HNO3: distil, don't exceed 200 C","Laboratory preparation of nitric acid distilling potassium nitrate with concentrated sulphuric acid below 200 degrees","nitrate"),
  ("Hno3UseMap","hno3-use-map","Where the +5 state goes to work","Four uses of nitric acid in fertilisers explosives nylon and metal pickling","nitric acid"),
  ("PassivityFilmPanel","passivity-film-panel","Passivity: the acid that builds its own wall","Concentrated nitric acid passivating iron aluminium and chromium with a thin oxide film","passivity")]),
("halogens-general-characteristics-of-halogens-comparative-study-on-preparation-chemical-propertie",
 "Halogens: the family portrait",
 [("HalogenTrendLadder","halogen-trend-ladder","Down the group: bigger, softer, weaker","Ladder of halogens with state colour electronegativity and oxidising power from fluorine to iodine","fluorine"),
  ("HalogenDisplacementSeries","halogen-displacement-series","The bully always wins","Displacement series showing lighter halogens liberating heavier halides with observed colours","displacement"),
  ("ChlorineWaterEquilibrium","chlorine-water-equilibrium","Chlorine water is HOCl in disguise","Chlorine water equilibrium forming hydrochloric and hypochlorous acids with nascent oxygen bleaching","hypochlorous"),
  ("DisproportionationSplit","disproportionation-split","Same reagents, temperature picks the product","Chlorine disproportionation in cold dilute alkali stopping at plus one and in hot concentrated alkali reaching plus five","disproportionation"),
  ("OxoacidStrengthOrder","oxoacid-strength-order","More oxygen, stronger acid (NEB 2024)","Acid strength order of chlorine oxoacids from hypochlorous to perchloric explained by conjugate base charge delocalisation","perchloric"),
  ("HalogenPrepRoutes","halogen-prep-routes","Making the halogens","Preparation routes for chlorine bromine and iodine in laboratory and industry","mno2"),
  ("HalogenUseMap","halogen-use-map","Three halogens, three industries","Uses of chlorine bromine and iodine","photographic")]),
("test-for-cl2-br2-and-i2",
 "Tests for Cl2, Br2 and I2",
 [("HalogenFingerprintTable","halogen-fingerprint-table","Three gases, three fingerprints","Fingerprint table for chlorine bromine and iodine covering colour litmus starch and ammonia tests","starch"),
  ("StarchHelixComplex","starch-helix-complex","The guest in the helix","Iodine molecules inside the amylose helix forming the blue-black charge transfer complex reversible with heat","blue"),
  ("AgxColourLadder","agx-colour-ladder","The AgX colour ladder","Silver halide colour ladder white cream yellow with ammonia solubility","agno"),
  ("BleachingSpeedContrast","bleaching-speed-contrast","Bleaching power tracks oxidising power","Bleaching speed on moist litmus fast for chlorine slow for bromine and none for iodine","bleach"),
  ("IodineSublimationPanel","iodine-sublimation-panel","Sublimation: solid to violet cloud and back","Iodine subliming from grey black crystals to violet vapour and depositing back on the cold surface","sublim"),
  ("HalideTestFlowchart","halide-test-flowchart","Which halide? Follow the ladder","Flowchart for identifying chloride bromide and iodide using silver nitrate colour and ammonia solubility","ammonia"),
  ("WhiteFumesTest","white-fumes-test","Two rods, one white cloud","Ammonia and hydrogen chloride gases meeting to form dense white fumes of ammonium chloride","nh4cl")]),
("haloacids-hcl-hbr-and-hi-comparative-study-on-preparation-properties-reducing-strength-acidic-na",
 "Haloacids: HCl, HBr, HI",
 [("HalideBondLadder","halide-bond-ladder","The bond weakens, everything follows","Bond energy ladder of hydrogen halides 431 366 and 299 kilojoules per mole","bond"),
  ("H2so4VsH3po4Prep","h2so4-vs-h3po4-prep","Pick the acid to match the halide","Choice of sulphuric acid for hydrogen chloride and phosphoric acid for hydrogen bromide and iodide","h3po4"),
  ("HiReducesH2so4","hi-reduces-h2so4","The acid that eats its own product","Hydrogen iodide reducing concentrated sulphuric acid to iodine and sulphur dioxide contaminating its own preparation","sulphuric acid"),
  ("AcidityStabilityScissors","acidity-stability-scissors","One bond, two opposite arrows","Opposing trends of increasing acidity and decreasing thermal stability down the hydrogen halides","acidity"),
  ("HclGastricPickling","hcl-gastric-pickling","The same acid digests lunch and de-scales steel","Hydrochloric acid in the stomach at pH 1.5 to 3.5 and in steel pickling baths","stomach"),
  ("FumingHxMist","fuming-hx-mist","Why the bottle mouth smokes","Hydrogen halide gas meeting moist air to form white acidic mist of hydrohalic acid droplets","fumes"),
  ("HalideReducingLadder","halide-reducing-ladder","Reducing power climbs as the ion grows","Reducing power ladder of halides increasing from chloride to iodide","reducing")]),
("carbon-allotropes-of-carbon-crystalline-and-amorphous-including-fullerenes-structure-general-pro",
 "Carbon: allotropes and uses",
 [("CarbonHybridisationTrio","carbon-hybridisation-trio","Hybridisation is destiny","Three hybridisations of carbon building diamond graphite and fullerene","diamond"),
  ("DiamondGraphiteContrast","diamond-graphite-contrast","Same element, opposite characters","Comparison of diamond and graphite in bonding hardness conductivity and lubrication","graphite"),
  ("FullereneFootball","fullerene-football","C60: the football molecule","Buckminsterfullerene C60 football of twenty hexagons and twelve pentagons with endohedral doping","fullerene"),
  ("CatenationChampion","catenation-champion","Why carbon chains and silicon doesn't","Carbon carbon bond 355 versus silicon silicon 222 kilojoules per mole explaining catenation","catenation"),
  ("AmorphousAdsorptionPower","amorphous-adsorption-power","A tennis court folded into a sugar cube","Activated charcoal with enormous internal surface area about 1000 square metres per gram adsorbing gases and impurities","adsorption"),
  ("CarbonUseMap","carbon-use-map","One element, four industries","Uses of carbon allotropes and amorphous forms","lubricant"),
  ("C14DatingPanel","c14-dating-panel","C14: the radioactive clock","Carbon fourteen dating with 5730 year half-life decay curve","radioactive")]),
("properties-reducing-action-reaction-with-metals-and-nonmetals-and-uses-of-carbon-monoxide",
 "Carbon monoxide",
 [("CoPrepRoutes","co-prep-routes","Four doors into CO","Four routes to carbon monoxide from formic acid dehydration to fuel gases","formic"),
  ("CoBlueFlame","co-blue-flame","The blue flame test","Carbon monoxide burning with characteristic blue flame to carbon dioxide releasing 283 kilojoules per mole","blue"),
  ("CoBlastFurnaceReduction","co-blast-furnace-reduction","The blast furnace's quiet worker","Blast furnace reduction of iron oxide by carbon monoxide","blast furnace"),
  ("CarboxyhaemoglobinHijack","carboxyhaemoglobin-hijack","The hijacking ligand","Carbon monoxide binding haemoglobin iron 200 times more strongly than oxygen forming carboxyhaemoglobin","haemoglobin"),
  ("MondProcessLoop","mond-process-loop","Mond: nickel travels as a vapour","Mond process loop forming nickel tetracarbonyl at 50 degrees and decomposing at 230 degrees","nickel"),
  ("CoVsCo2Contrast","co-vs-co2-contrast","One oxygen apart, worlds apart","Five row comparison of carbon monoxide and carbon dioxide","co2"),
  ("CoUseMap","co-use-map","The formal anhydride earns its keep","Four uses of carbon monoxide as fuel reducer synthesis feedstock and nickel refining","phosgene")]),
("phosphorus-allotropes-of-phosphorus-name-only",
 "Phosphorus allotropes",
 [("P4StrainTetrahedron","p4-strain-tetrahedron","P4: a spring compressed into a tetrahedron","White phosphorus P4 tetrahedron with 60 degree bond angles versus normal 109.5 degrees showing strain","tetra"),
  ("WhiteVsRedPContrast","white-vs-red-p-contrast","Same element, different danger","Six row comparison of white and red phosphorus","white"),
  ("AllotropeConversionCycle","allotrope-conversion-cycle","Heat one way, heat further the other","Reversible conversion between white and red phosphorus at 250 to 300 degrees and above 400 degrees","red"),
  ("PGlowChemiluminescence","p-glow-chemiluminescence","Why white phosphorus glows","White phosphorus glowing in dark air by slow oxidation with phosphorus trioxide and ozone products","glow"),
  ("SafetyMatchAnatomy","safety-match-anatomy","Safety match: the reaction needs both sides","Safety match head of potassium chlorate and antimony sulphide striking on red phosphorus side of the box","match"),
  ("BlackPLayers","black-p-layers","Black P: the calm sibling","Black phosphorus puckered layered structure most stable allotrope made under high pressure","black"),
  ("PUseMap","p-use-map","Phosphorus at work","Uses of phosphorus in fertilisers matches pesticides and military applications","match")]),
("phosphine-preparation-properties-basic-nature-reducing-nature-action-with-halogens-and-oxygen-an",
 "Phosphine",
 [("Nh3VsPh3Contrast","nh3-vs-ph3-contrast","Same shape, weaker grip","Six row comparison of ammonia and phosphine","93.6"),
  ("Ph3PrepRoutes","ph3-prep-routes","Two prep routes, both from P3-","Preparation of phosphine from white phosphorus with sodium hydroxide and from calcium phosphide with water","sodium hydroxide"),
  ("Ph3MetalSaltTests","ph3-metal-salt-tests","Black precipitates and a mirror","Phosphine tests with copper mercury and silver salts giving black phosphides and silver mirror","copper"),
  ("HolmesSignalSequence","holmes-signal-sequence","Holme's signal: the sea's flare","Holmes signal of spontaneously burning phosphine used by wrecked ships","signal"),
  ("Ph4SaltFormation","ph4-salt-formation","A base, but barely","Phosphonium salts formed by phosphine with hydrogen iodide and hydrobromic acid","phosphonium"),
  ("Ph3CombustionH3po4","ph3-combustion-h3po4","PH3 burns where NH3 won't","Phosphine burning in air to phosphoric acid with white smoke of metaphosphoric acid","phosphoric"),
  ("P2h4SelfIgnition","p2h4-self-ignition","The P2H4 troublemaker","Diphosphine P2H4 impurity spontaneously igniting phosphine air mixture in the preparation flask","spontaneous")]),
("sulphur-allotropes-of-sulphur-name-only-and-uses-of-sulphur",
 "Sulphur: allotropes and uses",
 [("S8CrownRing","s8-crown-ring","S8: the puckered crown","S8 puckered crown ring of eight sulphur atoms in rhombic and monoclinic sulphur","rhombic"),
  ("SulphurAllotropeLadder","sulphur-allotrope-ladder","Three sulphurs, one 96 C border","Three allotropes of sulphur with temperature stability ranges and the 96 degree transition point","monoclinic"),
  ("ViscosityMountainCurve","viscosity-mountain-curve","The viscosity mountain","Viscosity of molten sulphur rising to a maximum near 200 degrees then falling as chains break","viscosity"),
  ("PlasticSulphurQuench","plastic-sulphur-quench","Making plastic sulphur","Molten sulphur boiled and poured into cold water forming plastic amorphous sulphur that slowly reverts to rhombic","plastic"),
  ("VulcanisationCrosslinks","vulcanisation-crosslinks","Sulphur as the bridge-builder","Vulcanisation adding 3 to 5 percent sulphur crosslinks between rubber chains versus 30 percent for ebonite","vulcanis"),
  ("FineSulphurForms","fine-sulphur-forms","Powder, milk and colloid","Three fine forms of sulphur flowers milk and colloidal with preparation","milk"),
  ("SulphurUseMap","sulphur-use-map","Brimstone's resume","Uses of sulphur in acid manufacture vulcanisation pyrotechnics and agriculture","gunpowder")]),
("hydrogen-sulphide-preparation-from-kipp-s-apparatus-with-diagram-properties-acidic-nature-reduci",
 "Hydrogen sulphide",
 [("KippsApparatus3bulb","kipps-apparatus-3bulb","Kipp's apparatus: gas on demand","Kipps apparatus three bulbs with acid reservoir marble and ferrous sulphide lumps stopcock and pressure valve action","Kipp"),
  ("H2sDibasicLadder","h2s-dibasic-ladder","Weak, dibasic, two steps","Hydrogen sulphide as weak dibasic acid losing two protons in steps","dibasic"),
  ("H2sReducerYellowS","h2s-reducer-yellow-s","H2S gives electrons, S rains out","Hydrogen sulphide reducing oxidants to precipitated yellow sulphur with equations","reducing"),
  ("SulphideGroupSplit","sulphide-group-split","The qualitative-analysis split","Qualitative analysis split of metal sulphides into acid insoluble group two and acid soluble group four","group"),
  ("H2sCombustionSplit","h2s-combustion-split","How much air decides the product","Hydrogen sulphide burning with limited air to sulphur and excess air to sulphur dioxide","combustion"),
  ("H2sHazardPanel","h2s-hazard-panel","The smell that switches itself off","Hydrogen sulphide hazard rotten egg smell paralysis of olfactory nerves making high concentrations odourless","rotten"),
  ("H2sPrepRoutes","h2s-prep-routes","FeS + acid, dried over P2O5","Hydrogen sulphide preparation from ferrous sulphide with dilute sulphuric acid dried by phosphorus pentoxide","fes")]),
("sulphur-dioxide-properties-acidic-nature-reducing-nature-oxidising-nature-and-bleaching-action-a",
 "Sulphur dioxide",
 [("So2DualRedoxMap","so2-dual-redox-map","+4: high enough to give, low enough to take","Sulphur dioxide dual redox nature as reducer to sulphate and oxidiser to sulphur","reducing"),
  ("So2PrepRoutes","so2-prep-routes","Four doors into SO2","Four routes to sulphur dioxide in laboratory and industry","sodium sulphite"),
  ("So2BleachVsCl2","so2-bleach-vs-cl2","Two chemistries, two fates for colour","Temporary reduction bleaching by sulphur dioxide versus permanent oxidation bleaching by chlorine","bleach"),
  ("SulphurFogDemo","sulphur-fog-demo","The sulphur fog demo","Sulphur fog demonstration mixing hydrogen sulphide and sulphur dioxide to precipitate fine sulphur","sulphur"),
  ("So2MoleculeShape","so2-molecule-shape","Bent, 119 degrees, resonating","Bent sulphur dioxide molecule with 119 degree bond angle and resonance structures","angle"),
  ("So2AcidAnhydride","so2-acid-anhydride","Acidic oxide: anhydride of H2SO3","Sulphur dioxide as acid anhydride of sulphurous acid forming bisulphite and sulphite in alkali","sulphurous"),
  ("So2UseMap","so2-use-map","From the acid plant to the raisin packet","Four uses of sulphur dioxide from sulphuric acid to food preservative","preservative")]),
("sulphuric-acid-properties-acidic-nature-oxidising-nature-dehydrating-nature-and-uses",
 "Sulphuric acid: three personalities",
 [("H2so4PersonalityTrio","h2so4-personality-trio","One molecule, three jobs","Three personalities of sulphuric acid as acid oxidant and dehydrating agent with equations","dehydrating"),
  ("DilVsConcSwitch","dil-vs-conc-switch","Same metal, different gas","Dilute sulphuric acid acting as ordinary acid releasing hydrogen and concentrated sulphuric acid acting as oxidant releasing sulphur dioxide","dilute"),
  ("NonvolatileDisplacer","nonvolatile-displacer","The acid that makes other acids","Concentrated sulphuric acid as high boiling nonvolatile acid displacing more volatile acids from their salts","volatile"),
  ("SugarSnakeDehydration","sugar-snake-dehydration","The sugar snake experiment","Concentrated sulphuric acid poured on sugar producing black carbon column steam and heat","sugar"),
  ("AcidToWaterRule","acid-to-water-rule","Dilution is a heat bomb","Always add acid to water slowly with stirring never water to acid because dilution is highly exothermic","water"),
  ("H2so4OxidationEqs","h2so4-oxidation-eqs","Hot conc. H2SO4 always ends at SO2","Hot concentrated sulphuric acid oxidising copper carbon sulphur and mercury with sulphur dioxide evolution","oxidising"),
  ("H2so4UseMap","h2so4-use-map","King of chemicals: production as GDP proxy","Four major uses of sulphuric acid","batter")]),
("sodium-thiosulphate-formula-and-uses",
 "Sodium thiosulphate (hypo)",
 [("ThiosulphateAnatomy","thiosulphate-anatomy","S2O3 2-: two sulphurs, two jobs","Thiosulphate ion structure sulphate-like sulphur plus sulfane sulphur with two different oxidation states","thiosulphate"),
  ("IodometryEndpoint","iodometry-endpoint","Iodometry: watch the blue vanish","Iodometric titration with thiosulphate reducing iodine to iodide with starch endpoint fading from blue black to colourless","iodine"),
  ("PhotoFixerComplex","photo-fixer-complex","Why the fixer is called hypo","Hypo fixing unexposed silver halide in photographic film by forming soluble silver thiosulphate complex","photograph"),
  ("AntichlorAction","antichlor-action","Antichlor: undoing the bleach","Sodium thiosulphate as antichlor removing excess chlorine after bleaching in textile mills","antichlor"),
  ("HypoAcidDecomposition","hypo-acid-decomposition","Acid + hypo = the milky test","Thiosulphate with dilute acid giving sulphur dioxide precipitated sulphur and water with milkiness","sulphur"),
  ("CyanideAntidotePath","cyanide-antidote-path","The cyanide antidote","Thiosulphate as cyanide antidote converting cyanide to harmless thiocyanate by trans-sulphuration enzyme rhodanese","cyanide"),
  ("HypoUseMap","hypo-use-map","One salt, four careers","Four uses of sodium thiosulphate in photography titration textiles and medicine","titration")]),
]

# keyword check against canonical (first-entry) JSON text
src_dir = r"content/notes/concepts/class-11/chemistry/chemistry-of-non-metals"
canon = {}
for f in sorted(glob.glob(os.path.join(src_dir, "*.json"))):
    d = json.loads(open(f, "rb").read().decode("utf-8-sig"))
    canon.setdefault(d.get("topicSlug") or d.get("slug"), (os.path.basename(f), json.dumps(d, ensure_ascii=False).lower()))
misses = []
for slug, _, figs in ENTRIES:
    if slug not in canon:
        misses.append((slug, None, "NO CANONICAL JSON"))
        continue
    fname, blob = canon[slug]
    for comp, _, _, _, kw in figs:
        if kw.lower() not in blob:
            misses.append((slug, comp, kw))
print("MISSING:", len(misses))
for m in misses: print("  ", m)

if misses:
    raise SystemExit("fix keywords first")

src = io.open(REG, "rb").read().decode("utf-8")
imports = []
seen = set()
for _, _, figs in ENTRIES:
    for comp, fname, *_ in figs:
        imp = f'import {{ {comp} }} from "./{fname}";'
        if imp in seen: continue
        seen.add(imp); imports.append(imp)
last_import = max(m.end() for m in re.finditer(r'^import .*$', src, re.M))
src = src[:last_import] + "\n" + "\n".join(imports) + src[last_import:]
body = []
for slug, title, figs in ENTRIES:
    lines = [f'  "{slug}": {{', f'    title: "{title}",', "    figures: ["]
    for comp, _, cap, alt, kw in figs:
        lines.append(f'      {{ Component: {comp}, caption: "{cap}", alt: "{alt}", keyword: "{kw}" }},')
    lines += ["    ],", "  },"]
    body.append("\n".join(lines))
anchor = "\n};\n\n/**\n * Look up figures"
assert anchor in src
src = src.replace(anchor, "\n" + "\n".join(body) + anchor, 1)
io.open(REG, "wb").write(src.encode("utf-8"))
print("inserted", len(ENTRIES), "topic entries,", sum(len(f) for _, _, f in ENTRIES), "figures,", len(imports), "imports")
