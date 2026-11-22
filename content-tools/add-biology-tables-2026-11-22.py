"""One-shot: insert exam-grade comparison tables into canonical biology topics.

Owner request 2026-11-22: "add more tables to required places". Each table is
inserted AFTER the first note block containing its anchor keyword; the script
fails loudly if an anchor is missing rather than guessing.
"""
import json
import sys

BASE = "content/notes/concepts/"

def table(title, header, rows):
    lines = [f"**{title}**", ""]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("|" + "|".join(["---"] * len(header)) + "|")
    for r in rows:
        lines.append("| " + " | ".join(r) + " |")
    return "\n".join(lines)

# (file, [(anchor keyword, table string)])
JOBS = [
    ("class-11/biology/biomolecules-and-cell-biology/02-cell-introduction.json", [
        ("Key differences", table(
            "Prokaryotic vs eukaryotic cell — the full contrast",
            ["Feature", "Prokaryotic cell", "Eukaryotic cell"],
            [
                ["Nucleus", "None — naked DNA lies free in the nucleoid region", "True nucleus — DNA inside a double-membraned nuclear envelope with pores"],
                ["Genetic material", "Single circular DNA, no histones", "Linear chromosomes; DNA wrapped on histones into chromatin"],
                ["Membrane-bound organelles", "Absent — no mitochondria, ER, Golgi or plastids", "Present — mitochondria, ER, Golgi, plastids, lysosomes"],
                ["Ribosomes", "70S (50S + 30S) scattered in cytoplasm", "80S (60S + 40S) in cytosol; 70S inside organelles"],
                ["Cell wall", "Peptidoglycan (bacteria); absent in Mycoplasma", "Cellulose (plants), chitin (fungi), or none (animals)"],
                ["Typical size", "0.5–5 µm", "10–100 µm"],
                ["Cell division", "Binary fission — no spindle", "Mitosis / meiosis with a microtubule spindle"],
                ["Examples", "Bacteria, cyanobacteria, Mycoplasma", "Protists, fungi, plants, animals"],
            ])),
    ]),
    ("class-11/biology/biomolecules-and-cell-biology/03-detail-structure-of-eukaryotic-cells.json", [
        ("Cell wall (plant)", table(
            "Organelle summary — structure mapped onto function",
            ["Organelle", "Membranes", "Core structure", "Chief function"],
            [
                ["Mitochondrion", "Double, inner folded", "Cristae; matrix with circular DNA + 70S ribosomes", "Aerobic respiration — makes most of the cell's ATP"],
                ["Chloroplast", "Double", "Grana (thylakoid stacks) + stroma + starch granule", "Photosynthesis — light capture and CO₂ fixation"],
                ["Rough ER", "Single", "Sheets studded with ribosomes", "Synthesis and folding of proteins for export"],
                ["Smooth ER", "Single", "Tubules without ribosomes", "Lipid synthesis, detoxification, Ca²⁺ storage"],
                ["Golgi apparatus", "Single", "Stacked curved cisternae + vesicles", "Modify, package and ship cell products"],
                ["Lysosome", "Single", "Acidic sac of hydrolytic enzymes", "Intracellular digestion — the cell's stomach"],
                ["Nucleus", "Double, with pores", "Chromatin + nucleolus", "Stores genes; ribosome assembly; control centre"],
                ["Ribosome", "None", "Two rRNA + protein subunits", "Translation — protein synthesis"],
                ["Centriole", "None", "Microtubule triplet rings (9+0)", "Spindle organisation in animal cell division"],
                ["Vacuole", "Single (tonoplast)", "Large central sap-filled sac (plants)", "Turgor pressure, storage and waste disposal"],
            ])),
    ]),
    ("class-11/biology/biomolecules-and-cell-biology/04-cell-division.json", [
        ("Meiosis: two successive divisions", table(
            "Mitosis vs meiosis — side by side",
            ["Feature", "Mitosis", "Meiosis"],
            [
                ["Number of divisions", "One (equational)", "Two — meiosis I reductional, meiosis II equational"],
                ["Daughter cells", "2, diploid (2n)", "4, haploid (n)"],
                ["Synapsis", "Homologues never pair", "Homologous chromosomes pair in prophase I; chiasma forms"],
                ["Crossing over", "Absent — no recombination", "Present — exchanges segments at the chiasma"],
                ["Genetic outcome", "Daughters identical to the parent cell", "Daughters genetically unique — variation for evolution"],
                ["Occurs in", "Somatic (body) cells", "Germ (reproductive) cells"],
                ["Significance", "Growth, tissue repair, asexual reproduction", "Gamete formation; keeps the chromosome number constant across generations"],
            ])),
    ]),
    ("class-11/biology/introductory-microbiology/01-monera-bacteria.json", [
        ("Bacterial cell: capsule", table(
            "Bacterial cell — part by part",
            ["Part", "Structure and role"],
            [
                ["Capsule (slime layer)", "Sticky outer coat — protection against drying and phagocytosis"],
                ["Cell wall", "Rigid peptidoglycan; thick in Gram-positive (stays purple), thin with an outer LPS membrane in Gram-negative (stains pink)"],
                ["Plasma membrane", "Selectively permeable; carries respiratory enzymes — bacteria have no mitochondria"],
                ["Nucleoid", "Naked circular DNA, no nuclear envelope, no histones"],
                ["Plasmid", "Small accessory DNA ring — carries resistance genes; the workhorse of genetic engineering"],
                ["Ribosomes", "70S — the only organelle; protein synthesis"],
                ["Flagellum", "Rotating protein filament anchored by a basal-body motor — motility"],
                ["Pili / fimbriae", "Hair-like protein bristles — attachment; a special sex pilus transfers DNA in conjugation"],
            ])),
        ("Mode of nutrition", table(
            "Bacterial nutrition — the four combos",
            ["Mode", "Energy from", "Carbon from", "Example"],
            [
                ["Photoautotroph", "Sunlight", "CO₂", "Cyanobacteria, green sulfur bacteria"],
                ["Chemoautotroph", "Oxidising inorganic chemicals (NH₃, H₂S, Fe²⁺)", "CO₂", "Nitrosomonas, Nitrobacter, Thiobacillus"],
                ["Photoheterotroph", "Sunlight", "Organic compounds", "Purple non-sulfur bacteria"],
                ["Chemoheterotroph", "Organic chemicals", "Organic compounds", "Most bacteria — E. coli, Lactobacillus, Rhizobium"],
            ])),
    ]),
    ("class-11/biology/introductory-microbiology/02-virus.json", [
        ("Bacteriophage (T4): lytic life cycle", table(
            "Virus vs bacteria — why viruses are not cells",
            ["Feature", "Virus", "Bacterium"],
            [
                ["Nature", "Acellular — just nucleic acid + protein coat", "Cellular prokaryote"],
                ["Size", "20–300 nm (passes through bacterial filters)", "0.5–5 µm"],
                ["Genetic material", "DNA **or** RNA — never both", "Circular DNA, often plus plasmids"],
                ["Metabolism", "None — no enzymes for independent life", "Full independent metabolism"],
                ["Reproduction", "Only inside a living host cell (lytic / lysogenic)", "Binary fission on its own"],
                ["Ribosomes", "Absent", "70S present"],
                ["Sensitivity", "Blocked by vaccines; few antiviral drugs", "Killed by antibiotics"],
            ])),
        ("Adsorption", table(
            "T4 phage lytic cycle — the five acts",
            ["Step", "What happens"],
            [
                ["1. Adsorption", "Tail fibres recognise and bind the bacterial cell wall"],
                ["2. Injection", "The tail sheath contracts; phage DNA is injected into the host"],
                ["3. Replication", "Host DNA, ribosomes and enzymes are hijacked to make phage DNA and proteins"],
                ["4. Assembly", "New complete virions are pieced together inside the cell"],
                ["5. Lysis", "Lysozyme bursts the cell open; ~100–200 new phages escape to infect again"],
            ])),
    ]),
    ("class-11/biology/floral-diversity/03-algae.json", [
        ("Major groups", table(
            "The three classical algal classes at a glance",
            ["Feature", "Chlorophyceae (green)", "Phaeophyceae (brown)", "Rhodophyceae (red)"],
            [
                ["Key pigments", "Chlorophyll a + b", "Chlorophyll a + c, fucoxanthin", "Chlorophyll a + d, r-phycoerythrin"],
                ["Stored food", "Starch", "Laminarin, mannitol", "Floridean starch"],
                ["Flagella", "2–8, equal, apical", "2, unequal, lateral", "Absent"],
                ["Habitat", "Mostly fresh water", "Mostly marine (cold seas)", "Marine, often deep water"],
                ["Examples", "Chlamydomonas, Spirogyra, Volvox, Ulva", "Fucus, Sargassum, Ectocarpus, kelps", "Polysiphonia, Gelidium, Gracilaria"],
                ["Economic note", "Chlorella (food/space research)", "Algin; kelp as fertiliser", "Agar and carrageenan for food and culture media"],
            ])),
    ]),
    ("class-11/biology/floral-diversity/04-bryophytes.json", [
        ("Hornworts", table(
            "Liverworts vs mosses vs hornworts",
            ["Feature", "Liverworts", "Mosses", "Hornworts"],
            [
                ["Body form", "Flat ribbon-like thallus (or leafy)", "Erect stem-like cauloid with leaf-like phylloid", "Flat thallus"],
                ["Rhizoids", "Unicellular, unbranched", "Multicellular, branched", "Unicellular"],
                ["Sporophyte", "Short-lived, depends on the gametophyte", "Long-lived, green, upright capsule on a seta", "Horn-like; keeps growing from its base"],
                ["Gemma cups", "Present (Marchantia) — asexual buds", "Absent", "Absent"],
                ["Examples", "Marchantia, Riccia", "Funaria, Polytrichum, Sphagnum", "Anthoceros, Notothylas"],
            ])),
    ]),
    ("class-11/biology/floral-diversity/05-pteridophytes.json", [
        ("Key difference from bryophytes", table(
            "Bryophytes vs pteridophytes — the vascular leap",
            ["Feature", "Bryophytes", "Pteridophytes"],
            [
                ["Vascular tissue", "Absent — no true xylem or phloem", "True xylem and phloem — first vascular plants"],
                ["Dominant generation", "Gametophyte (n)", "Sporophyte (2n) — the leafy plant you see"],
                ["Roots / stems / leaves", "None — only rhizoids", "True roots, stems and leaves"],
                ["Sporophyte nutrition", "Lives on the gametophyte", "Independent, photosynthetic"],
                ["Spores", "Homosporous only", "Homosporous or heterosporous (Selaginella, Salvinia)"],
                ["Seeds", "None", "None — seedless vascular ('botanical snakes' of the plant world)"],
                ["Examples", "Marchantia, Funaria", "Dryopteris, Selaginella, Equisetum"],
            ])),
    ]),
    ("class-11/biology/floral-diversity/06-gymnosperms.json", [
        ("Key differences from angiosperms", table(
            "Gymnosperms vs angiosperms",
            ["Feature", "Gymnosperms", "Angiosperms"],
            [
                ["Seeds", "Naked — borne on megasporophylls of cones", "Enclosed in an ovary, which ripens into a fruit"],
                ["Flowers", "Absent — cones / strobili", "Present — the defining organ"],
                ["Double fertilisation", "Absent — no true endosperm", "Present — a 3n endosperm nourishes the embryo"],
                ["Xylem", "Tracheids only (vessels usually absent)", "Vessels + tracheids — efficient water flow"],
                ["Pollination", "Wind-carried pollen lands directly on the ovule", "Pollen lands on the stigma, then a pollen tube grows"],
                ["Ovules", "Uncovered", "Protected inside the ovary"],
                ["Examples", "Pinus, Cycas, Ginkgo, Ephedra", "Every flowering plant — from mango to rice"],
            ])),
    ]),
    ("class-11/biology/floral-diversity/02-fungi.json", [
        ("Ascomycetes produce spores in sac-like asci", table(
            "The four fungal groups compared",
            ["Group", "Hyphae", "Sexual spore", "Asexual spore", "Examples"],
            [
                ["Phycomycetes (lower fungi)", "Coenocytic (aseptate)", "Zygospores / oospores", "Sporangiospores, zoospores", "Rhizopus (bread mould), Mucor, Albugo"],
                ["Ascomycetes (sac fungi)", "Septate, branched", "Ascospores inside sac-like asci", "Conidia", "Yeast, Penicillium, Aspergillus, Neurospora"],
                ["Basidiomycetes (club fungi)", "Septate", "Basidiospores on club-shaped basidia", "Rare — conidia / fragmentation", "Puccinia (rust), Ustilago (smut), Agaricus (mushroom)"],
                ["Deuteromycetes (imperfect fungi)", "Septate", "Unknown — only the asexual stage is known", "Conidia", "Alternaria, Colletotrichum, Trichoderma"],
            ])),
    ]),
    ("class-11/biology/ecology/02-food-chain-web.json", [
        ("Productivity: gross primary productivity", table(
            "The three ecological pyramids compared",
            ["Pyramid", "Basis", "Usually upright?", "Classic inversion"],
            [
                ["Pyramid of numbers", "Count of individuals per level", "Usually", "A single tree (huge producer) feeds thousands of insects — inverted at the base"],
                ["Pyramid of biomass", "Dry biomass (g/m²) per level", "Usually", "Open ocean — the standing crop of phytoplankton can be less than that of zooplankton at sampling time"],
                ["Pyramid of energy", "Energy flow (kJ m⁻² yr⁻¹)", "ALWAYS — the 10% law drains ~90% of energy at every step", "Never inverted — energy is lost as heat and cannot be recycled"],
            ])),
    ]),
    ("class-11/biology/ecology/01-ecosystem-ecology.json", [
        ("Species interactions", table(
            "Species interactions — who wins, who loses",
            ["Interaction", "Species A", "Species B", "Example"],
            [
                ["Mutualism", "+", "+", "Lichen (alga + fungus); Rhizobium in legume nodules; mycorrhizae"],
                ["Commensalism", "+", "0", "Orchid perched on a mango branch; cattle egret near grazing cattle"],
                ["Parasitism", "+", "−", "Cuscuta on its host; Plasmodium in human blood"],
                ["Predation", "+", "−", "A snake eating a frog"],
                ["Competition", "−", "−", "Two zooplankton species filtering the same algae (Gause's experiments)"],
                ["Amensalism", "−", "0", "Penicillium releasing penicillin that inhibits bacteria (antibiosis)"],
            ])),
    ]),
    ("class-11/biology/faunal-diversity/02-animalia-phyla.json", [
        ("Phylum classification (up to class)", table(
            "The animal phyla — one row each",
            ["Phylum", "Level", "Symmetry", "Coelom", "Diagnostic features", "Examples"],
            [
                ["Porifera", "Cellular", "Asymmetric", "—", "Canal system with ostia; spicules; water flows through the body", "Sycon, Spongilla"],
                ["Cnidaria", "Tissue", "Radial", "Acoelomate", "Cnidoblasts (stinging cells); gastrovascular cavity; polyp ↔ medusa", "Hydra, Obelia, Aurelia"],
                ["Platyhelminthes", "Organ", "Bilateral", "Acoelomate", "Flat body; flame cells; mostly hermaphrodite", "Planaria, Taenia, Fasciola"],
                ["Aschelminthes (Nematoda)", "Organ-system", "Bilateral", "Pseudocoelomate", "Round body; complete gut; sexual dimorphism", "Ascaris, Wuchereria"],
                ["Annelida", "Organ-system", "Bilateral", "True coelom", "Metameric segmentation; nephridia; closed blood system", "Earthworm, Nereis, Leech"],
                ["Arthropoda", "Organ-system", "Bilateral", "True (reduced)", "Jointed legs; chitinous exoskeleton; open blood system — largest phylum", "Prawn, crab, butterfly, mosquito"],
                ["Mollusca", "Organ-system", "Bilateral", "True coelom", "Muscular foot; mantle; often a shell", "Pila, Unio, Octopus"],
                ["Echinodermata", "Organ-system", "Radial (adult)", "True coelom", "Water vascular system with tube feet; marine only", "Starfish, sea urchin"],
                ["Chordata", "Organ-system", "Bilateral", "True coelom", "Notochord; dorsal hollow nerve cord; pharyngeal slits", "Fishes, frog, birds, man"],
            ])),
    ]),
]

changed = []
for rel, inserts in JOBS:
    path = BASE + rel
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    notes = d["notes"]
    for anchor, tbl in inserts:
        idx = next((i for i, n in enumerate(notes) if anchor.lower() in n.lower()), None)
        if idx is None:
            print(f"ANCHOR NOT FOUND in {rel}: {anchor!r}")
            sys.exit(1)
        # never insert the same table twice (idempotent re-runs)
        if any(tbl[:60] in n for n in notes):
            print(f"SKIP (already present) {rel} :: {anchor}")
            continue
        notes.insert(idx + 1, tbl)
        changed.append((rel, idx + 1, tbl[:40]))
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")

print(f"inserted {len(changed)} tables:")
for rel, at, head in changed:
    print(f"  {rel} @block {at}: {head}...")
