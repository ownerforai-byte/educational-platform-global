import io, re, json, glob, os

REG = r"frontend/features/docs/figures/registry.ts"
src_dir = r"content/notes/concepts/class-11/chemistry/states-of-matter"
SLUG = "introduction-to-unit-crystal-lattice-and-unit-cell"
CANON = "09-introduction-to-unit-crystal-lattice-and-unit-cell.json"

FIGS = [
 ("CrystalLatticeGrid","crystal-lattice-grid","Lattice — the map. Unit cell — one tile","Grid of lattice points with one unit cell highlighted and translation arrows building the crystal","lattice"),
 ("UnitCellSharing","unit-cell-sharing","A particle counts only its share","Sharing fractions of corner face and body centre particles between neighbouring unit cells","shared"),
 ("CellCountTrio","cell-count-trio","Particles per cell: 1, 2, 4","Particle count per unit cell for simple cubic body-centred and face-centred lattices","particles per cell"),
 ("RadiusEdgeRelations","radius-edge-relations","Where atoms touch decides r(a)","Relations between atomic radius and edge length for simple cubic body-centred and face-centred cells","body diagonal"),
 ("CrystalSystemsSeven","crystal-systems-seven","Seven systems cover every crystal","Table of the seven crystal systems with lattice parameters and examples","crystal systems"),
 ("BraggLawPanel","bragg-law-panel","Bragg: n lambda = 2d sin theta","Bragg diffraction X-rays reflecting off lattice planes with path difference 2d sin theta","bragg"),
 ("CrystalVsAmorphousOrder","crystal-vs-amorphous-order","Order versus chance","Comparison of the regular arrangement in crystals and the random arrangement in amorphous solids","amorphous"),
]

d = json.loads(open(os.path.join(src_dir, CANON), "rb").read().decode("utf-8-sig"))
blob = json.dumps(d, ensure_ascii=False).lower()
miss = [(c, k) for c, _, _, _, k in FIGS if k.lower() not in blob]
print("MISSING:", miss)
assert not miss

src = io.open(REG, "rb").read().decode("utf-8")
imports, seen = [], set()
for comp, fname, *_ in FIGS:
    imp = f'import {{ {comp} }} from "./{fname}";'
    if imp in seen or imp in src: continue
    seen.add(imp); imports.append(imp)
last_import = max(m.end() for m in re.finditer(r'^import .*$', src, re.M))
src = src[:last_import] + "\n" + "\n".join(imports) + src[last_import:]
lines = [f'  "{SLUG}": {{', '    title: "Crystal lattice and unit cell",', "    figures: ["]
for comp, _, cap, alt, kw in FIGS:
    lines.append(f'      {{ Component: {comp}, caption: "{cap}", alt: "{alt}", keyword: "{kw}" }},')
lines += ["    ],", "  },"]
anchor = "\n};\n\n/**\n * Look up figures"
assert anchor in src
src = src.replace(anchor, "\n" + "\n".join(lines) + anchor, 1)
io.open(REG, "wb").write(src.encode("utf-8"))
print("inserted 1 entry,", len(FIGS), "figures,", len(imports), "imports")
