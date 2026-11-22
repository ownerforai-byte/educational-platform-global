import io
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 25 - Bio-inorganic Chemistry figures (rows 91-95): 35 theme-aware SVG figures (7 per topic x 5) via .mastery-src/figbio_b1-b2.py + figreg_bio.py. "
 "Highlights: essential-element tiers, metal-jobs map, log-scale requirement chart, metalloenzyme/carbonic anhydrase panel, chelate ring, chlorophyll-vs-haemoglobin flagships, dose window; macro seven, trace ten, deficiency disease table, iodine-thyroxine flow, two anaemias, chlorosis panel, macro-vs-micro table; ten-ion roster, Na-out/K-in pair, calcium careers, function-picks-the-metal, CO hijack (carboxyhaemoglobin 200-250x), s-block vs d-block, Zn-Ni-Cr panel; passive-vs-active, primary-vs-secondary, Na+/K+ ATPase 3-out-2-in cycle, pump importance, Na+-glucose symport, ORS panel, gradient economy; toxic five table, soft-metal-sulphur mechanism, Pb-Ca/Cd-Zn mimicry, Minamata bioaccumulation story, lead haem block, arsenic groundwater (10 ppb), chelation therapy antidotes. All 35 keywords verified against first-entry canonical JSONs (0 misses); imports placed at file top this time (no object-literal mishap); tsc clean; topic-doc-view 14/14.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 25 note inserted")
