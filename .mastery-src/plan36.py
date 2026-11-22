import io
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 31 - Hydrocarbons figure campaign (rows 112-120): 63 theme-aware figures (7/topic x 9 topics) via "
 "fighc_b1-b3.py (alkane prep incl. Wurtz/dry-ether/decarboxylation/hydrogenation-surface/carbon-count; alkane properties "
 "incl. chlorination ladder/halogen reactivity/radical mechanism/nitration/sulphonation/oxidation/combustion; alkene prep "
 "incl. temperature fork/Saytzeff/Lindlar/hydrogenation mechanism; alkene properties incl. Markovnikov fork/peroxide effect/"
 "hydration/ozonolysis workflow+map; alkyne prep incl. carbide two-step/vicinal dihalide/haloform-Ag/double-elimination "
 "logic; alkyne properties incl. addition map/enol tautomer/sp-acidity ladder/acetylide/ammoniacal Ag+Cu tests/terminal-vs-"
 "internal; unsaturation tests incl. bromine water/Baeyer/glycol/tetrabromoethane/decision tree/verdict table; comparative "
 "physical incl. formulas/state ladder/bp ladder/branching/solubility/flame/density; Kolbe incl. anode-cathode roles/acetate "
 "flow/carbon rule/succinate flow/product table/cathode half-reaction/legacy). figreg_hc.py verified all 63 keywords against "
 "canonical JSONs before inserting 9 per-topic blocks into registry.ts. JSX escapes fixed in 3 files (rho < 1, density < 1, "
 "F2 > Cl2 > Br2 > I2 -> &lt;/&gt;). tsc clean; topic-doc-view test 14/14 green.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 31 note added")
