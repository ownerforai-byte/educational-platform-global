import io, re
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
# mark rows 91-95 Completed
s = re.sub(r"(\|\s*9[1-5]\s*\|[^|]*\|[^|]*\|[^|]*\|) TBD (\|)", r"\1 Completed \2", s)
note = ("- Session 24 - Bio-inorganic Chemistry notes (rows 91-95): cx91 introduction (three tiers bulk CHON/macro Ca-P-K-S-Na-Cl-Mg/trace Fe-Zn-Cu-I-Co-Mn-Mo-Cr-Se-F, metal jobs transport-structure-catalysis-light-signalling, metalloenzyme carbonic anhydrase Zn2+ CO2+H2O<->H2CO3, chelation porphyrin/corrin, chlorophyll a C55H72O5N4Mg, hydroxyapatite Ca10(PO4)6(OH)2; verified PYQ NEB 2024 metalloenzymes); cx92 micro/macro nutrients (100 mg/day line, deficiency pairs Fe-anaemia, I-goitre thyroxine ~150 ug/day iodised salt, Co-B12-pernicious anaemia, Mg-chlorosis, F-caries, Cr-glucose tolerance; verified PYQs NEB 2024 iodine + NEB 2022 MCQ iron trace element); cx93 ten-ion roster (Na+ extracellular/K+ intracellular pump 3:2, Ca2+ bones+clot+muscle, Mg2+ chlorophyll+ATP, Fe2+ 4 haem 4 O2, Cu haemocyanin, Zn2+ carbonic anhydrase d10 Lewis acid, Ni urease, Co B12, Cr glucose tolerance factor; CO binds Fe2+ 200-250x -> carboxyhaemoglobin fatal; verified PYQs NEB 2024 Na/K/Ca/Mg roles + Fe/Mg deficiency + cobalt-B12, NEB 2023 chlorophyll formula + Mg role + chlorosis, NEB 2021 haemoglobin + carboxyhaemoglobin); cx94 ion pumps (passive vs active, primary vs secondary, Na+/K+ ATPase 3 Na+ out : 2 K+ in per ATP -> resting potential -70 mV + cell volume + Na+ gradient, Na+-glucose SGLT symport intestine/kidney glucose up gradient on Na+ down, ORS rationale; no PYQ - NEB-style); cx95 metal toxicity (Fe overdose/haemochromatosis desferrioxamine, As(III) binds -SH enzymes arsenicosis WHO 10 ppb Terai, Hg vapour/methylmercury CNS Minamata bioaccumulation, Pb2+ mimics Ca2+ inhibits ALA dehydratase + ferrochelatase -> anaemia + child IQ loss, Cd2+ mimics Zn2+ kidney/bone itai-itai + tobacco smoke, chelation therapy EDTA-Pb BAL-As/Hg penicillamine-Cu; verified PYQ NEB 2024 lead + mercury effects). Build 255 entries, validator 0 broken. Rows 91-95 Completed; next unit Basic Concept of Organic Chemistry (rows 96-102).\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("rows 91-95 Completed; session 24 note inserted")
