# Class 11 Biology — Biomolecules & Cell Biology (7 topics).

PART_A = [
{
    "file": "class-11/biology/biomolecules-and-cell-biology/01-biomolecules-introduction-and-functions-of-carbohydrates-proteins-lipids-nucleic-acids-minerals-.json",
    "blocks": [
        {"after": "## 2. Fundamental Conceptual Understanding — The Chemical Basis of Life",
         "svg": ("Biomolecule map — four classes, one logic",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">The four biomolecules and their jobs</text>'
                 '<rect x="60" y="70" width="130" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="125" y="95" text-anchor="middle" font-weight="bold" fill="#14532d">Carbohydrates</text>'
                 '<text x="125" y="115" text-anchor="middle" font-size="11" fill="#14532d">(CH2O)n — fuel + walls</text>'
                 '<rect x="255" y="70" width="130" height="70" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="320" y="95" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Proteins</text>'
                 '<text x="320" y="115" text-anchor="middle" font-size="11" fill="#1e3a8a">amino acids — workers</text>'
                 '<rect x="450" y="70" width="130" height="70" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="515" y="95" text-anchor="middle" font-weight="bold" fill="#854d0e">Lipids</text>'
                 '<text x="515" y="115" text-anchor="middle" font-size="11" fill="#854d0e">fatty acids — store + barriers</text>'
                 '<rect x="255" y="220" width="130" height="70" rx="10" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>'
                 '<text x="320" y="245" text-anchor="middle" font-weight="bold" fill="#581c87">Nucleic acids</text>'
                 '<text x="320" y="265" text-anchor="middle" font-size="11" fill="#581c87">nucleotides — information</text>'
                 '<line x1="320" y1="140" x2="320" y2="218" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="315,216 325,216 320,226" fill="#475569"/>'
                 '<text x="320" y="170" text-anchor="middle" font-size="12" fill="#475569">DNA tells proteins what to build</text>'
                 '<text x="320" y="335" text-anchor="middle" font-size="13" fill="#4b5563">Water and minerals are the stage and the switches: they make every reaction above possible.</text>'
                 '</svg>')},
        {"after": "## 10. Master Comparison Tables",
         "md": "**Deep dive — the monomer-to-polymer principle.** Every biomolecule follows the same construction logic: small monomers join by removing water (condensation) into polymers, and polymers split by adding water (hydrolysis). Glucose → glycogen/starch/cellulose; amino acids → proteins; nucleotides → DNA/RNA. Even triglycerides follow it (glycerol + fatty acids). Learn the four monomers and you can reconstruct the whole chapter — the exam rewards exactly this structural thinking."},
    ],
},
{
    "file": "class-11/biology/biomolecules-and-cell-biology/01-biomolecules-introduction-and-functions.json",
    "blocks": [
        {"after": "Biomolecules are organic molecules essential to life: carbohydrates, proteins, lipids",
         "table": ("The biomolecules — highly classified master table",
                   ["Class", "Elements", "Monomer / unit", "Bond", "Main functions"],
                   [["Carbohydrates", "C, H, O", "Monosaccharide (glucose)", "Glycosidic", "Energy (4 kcal/g), storage, cell walls"],
                    ["Proteins", "C, H, O, N, S", "Amino acid (20 types)", "Peptide", "Enzymes, structure, transport, immunity"],
                    ["Lipids", "C, H, O (less O)", "Fatty acid + glycerol", "Ester", "Energy store (9 kcal/g), membranes, hormones"],
                    ["Nucleic acids", "C, H, O, N, P", "Nucleotide (base + sugar + phosphate)", "Phosphodiester", "Genetic information; ATP energy transfer"],
                    ["Water", "H, O", "Molecule", "H-bonds", "Solvent, reactant, temperature buffer"],
                    ["Minerals", "Ca, P, K, Na, Fe, I", "Ions", "—", "Skeleton, nerve impulses, haemoglobin, thyroxine"]])},
        {"after": "Enzymes: biological catalysts (mostly proteins); work by the lock-and-key / induced-f",
         "svg": ("Enzyme action — lock-and-key vs induced fit",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Enzymes: specificity and the active site</text>'
                 '<path d="M 90 120 q 0 -40 60 -40 q 60 0 60 40 q 0 30 -30 35 l 0 30 q -60 0 -60 -30 q -30 -5 -30 -35 Z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="150" y="240" text-anchor="middle" font-size="12" fill="#1e3a8a">enzyme with active site</text>'
                 '<path d="M 230 105 l 40 0 l 0 22 l -40 0 Z" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="250" y="90" text-anchor="middle" font-size="12" fill="#854d0e">substrate fits exactly</text>'
                 '<line x1="320" y1="120" x2="360" y2="120" stroke="#16a34a" stroke-width="3"/>'
                 '<polygon points="358,114 358,126 368,120" fill="#16a34a"/>'
                 '<text x="470" y="105" text-anchor="middle" font-size="12" fill="#14532d">products released</text>'
                 '<path d="M 430 130 l 30 0 M 480 130 l 30 0" stroke="#14532d" stroke-width="4"/>'
                 '<text x="470" y="125" text-anchor="middle" font-size="11" fill="#14532d">&#8593;&#8595;</text>'
                 '<text x="320" y="300" text-anchor="middle" font-size="13" fill="#4b5563">Enzyme is NOT used up. Activity depends on temperature, pH and substrate concentration —</text>'
                 '<text x="320" y="322" text-anchor="middle" font-size="13" fill="#4b5563">each enzyme has an optimum; extremes denature the protein shape permanently.</text>'
                 '</svg>')},
        {"after": "Water (major solvent, ~70% of cell) and minerals (Ca, P, K, Na, Fe, I) act as structu",
         "md": "**Deep dive — why enzymes decide life.** Without enzymes, glucose oxidation would take years at body temperature; with them, seconds. The cell does not change the laws of chemistry — it lowers the activation energy by holding substrates in a strained, ideal orientation inside the active site. That is why vitamins and minerals matter: many are cofactors or coenzyme precursors without which the protein catalyst cannot work at all."},
    ],
},
{
    "file": "class-11/biology/biomolecules-and-cell-biology/02-cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells.json",
    "blocks": [
        {"after": "## 3. Prokaryotic Cells — Life Before Organelles",
         "table": ("Prokaryote essentials — classified",
                   ["Feature", "Detail", "Consequence"],
                   [["Nucleus", "Naked circular DNA in a nucleoid region", "No nuclear envelope; transcription and translation simultaneous"],
                    ["Ribosomes", "70S type", "Target of several antibiotics that spare eukaryotic 80S"],
                    ["Cell wall", "Peptidoglycan (murein)", "Lysozyme and penicillin attack this wall"],
                    ["Organelles", "No membrane-bound organelles", "Respiration across the plasma membrane, not mitochondria"],
                    ["Size", "1–10 &#181;m typically", "High surface-to-volume ratio — fast exchange"],
                    ["Reproduction", "Binary fission", "Exponential growth; no mitosis apparatus"]])},
        {"after": "## 5. Master Comparison — Prokaryotic vs Eukaryotic Cell (the NEB classic)",
         "svg": ("Prokaryote vs eukaryote — the two cell plans",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Prokaryotic vs eukaryotic cell</text>'
                 '<rect x="70" y="90" width="200" height="180" rx="18" fill="#e7e5e4" stroke="#57534e" stroke-width="2.5"/>'
                 '<circle cx="170" cy="160" r="28" fill="#a8a29e" stroke="#44403c" stroke-width="2.5"/>'
                 '<text x="170" y="165" text-anchor="middle" font-size="11" fill="#1c1917">nucleoid DNA</text>'
                 '<circle cx="110" cy="220" r="7" fill="#7e22ce"/><circle cx="130" cy="235" r="7" fill="#7e22ce"/>'
                 '<circle cx="150" cy="225" r="7" fill="#7e22ce"/><circle cx="200" cy="230" r="7" fill="#7e22ce"/>'
                 '<text x="170" y="300" text-anchor="middle" font-size="13" font-weight="bold" fill="#44403c">Prokaryote</text>'
                 '<text x="170" y="318" text-anchor="middle" font-size="11" fill="#44403c">70S ribosomes (dots), no organelles</text>'
                 '<rect x="370" y="90" width="200" height="180" rx="18" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<circle cx="470" cy="150" r="30" fill="#93c5fd" stroke="#1e3a8a" stroke-width="2.5"/>'
                 '<text x="470" y="155" text-anchor="middle" font-size="11" fill="#1e3a8a">nucleus</text>'
                 '<ellipse cx="415" cy="225" rx="22" ry="13" fill="#fde68a" stroke="#b45309" stroke-width="2"/>'
                 '<ellipse cx="470" cy="235" rx="20" ry="11" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>'
                 '<ellipse cx="525" cy="225" rx="20" ry="12" fill="#fca5a5" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="470" y="300" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">Eukaryote</text>'
                 '<text x="470" y="318" text-anchor="middle" font-size="11" fill="#1e3a8a">80S ribosomes + membrane-bound organelles</text>'
                 '<text x="320" y="355" text-anchor="middle" font-size="13" fill="#4b5563">Same chemistry, different architecture: compartmentalisation is the eukaryote&#8217;s advantage.</text>'
                 '</svg>')},
        {"after": "## 6. Conceptual Relationships",
         "md": "**Deep dive — why compartmentalisation changed everything.** A eukaryote can run incompatible chemistries at once: lysosomes digest at pH ~5 while the cytosol stays near pH 7; the mitochondrion keeps its own proton gradient. A prokaryote must keep all reactions in one compartment, which caps its complexity. That single architectural difference — membranes inside membranes — is why eukaryotes could grow large, specialise into tissues, and ultimately build multicellular life."},
    ],
},
{
    "file": "class-11/biology/biomolecules-and-cell-biology/02-cell-introduction-prokaryotic-and-eukaryotic.json",
    "blocks": [
        {"after": "Key differences: nucleus, organelles, chromatin vs naked DNA, cell size, ribosome siz",
         "table": ("Cell theory and cell types — classified",
                   ["Item", "Statement / feature", "Author / example"],
                   [["Cell theory 1", "All organisms are made of one or more cells", "Schleiden and Schwann (1838-39)"],
                    ["Cell theory 2", "The cell is the basic unit of life", "Schleiden and Schwann"],
                    ["Cell theory 3", "Cells arise only from pre-existing cells", "Virchow (1855) — omnis cellula e cellula"],
                    ["Prokaryote", "Naked DNA, 70S ribosomes, peptidoglycan wall", "Bacteria, cyanobacteria, mycoplasma"],
                    ["Eukaryote", "True nucleus, 80S ribosomes, organelles", "Protists, fungi, plants, animals"],
                    ["Boundary exception", "Virus — not cellular at all", "Only replicates inside a host cell"]])},
        {"after": "Prokaryotes lack mitochondria: respiratory electron transport occurs across the plasm",
         "svg": ("Bacterial cell — the prokaryote plan in section",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Prokaryotic cell — everything in one room</text>'
                 '<rect x="120" y="110" width="400" height="170" rx="85" fill="#bbf7d0" stroke="#16a34a" stroke-width="3"/>'
                 '<rect x="126" y="116" width="388" height="158" rx="80" fill="none" stroke="#14532d" stroke-width="2" stroke-dasharray="8 6"/>'
                 '<text x="320" y="102" text-anchor="middle" font-size="12" fill="#14532d">capsule (outer) + cell wall + plasma membrane (dashed)</text>'
                 '<circle cx="320" cy="195" r="30" fill="#a8a29e" stroke="#44403c" stroke-width="2.5"/>'
                 '<text x="320" y="200" text-anchor="middle" font-size="11" fill="#1c1917">nucleoid</text>'
                 '<circle cx="200" cy="240" r="6" fill="#7e22ce"/><circle cx="230" cy="250" r="6" fill="#7e22ce"/>'
                 '<circle cx="430" cy="245" r="6" fill="#7e22ce"/><circle cx="460" cy="230" r="6" fill="#7e22ce"/>'
                 '<text x="200" y="285" font-size="11" fill="#581c87">70S ribosomes</text>'
                 '<circle cx="490" cy="160" r="16" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>'
                 '<text x="545" y="150" font-size="11" fill="#854d0e">plasmid</text>'
                 '<line x1="520" y1="115" x2="560" y2="90" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="565" y="85" font-size="11" fill="#854d0e">flagellum</text>'
                 '<text x="320" y="335" text-anchor="middle" font-size="13" fill="#4b5563">Respiration runs across the plasma membrane itself — no mitochondrion needed.</text>'
                 '</svg>')},
        {"after": "Chlorophylls are located in lamellae rather than in membrane-enclosed chloroplasts.",
         "md": "**Deep dive — the exceptions that prove the rule.** Mycoplasma has no cell wall at all (the smallest known cells, penicillin-proof for that reason). Cyanobacteria photosynthesise without chloroplasts — their thylakoid lamellae run free in the cytoplasm. Both show that 'prokaryote' is defined by architecture, not by chemistry: the reactions of respiration and photosynthesis are identical, only the housing differs."},
    ],
},
{
    "file": "class-11/biology/biomolecules-and-cell-biology/03-detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r.json",
    "blocks": [
        {"after": "## 8. Lysosomes — The Suicide Bags",
         "table": ("Organelle address book — who does what, where (highly classified)",
                   ["Organelle", "Membranes", "Core job", "Marker enzyme / feature"],
                   [["Mitochondrion", "Double (cristae inside)", "ATP by aerobic respiration", "Own circular DNA + 70S ribosomes"],
                    ["Chloroplast", "Double (grana inside)", "Photosynthesis", "Chlorophyll in thylakoids; own DNA"],
                    ["Rough ER", "Single, ribosome-studded", "Protein synthesis + transport", "Ribosomes on cytosolic face"],
                    ["Smooth ER", "Single, no ribosomes", "Lipids, detox, Ca2+ store", "Abundant in liver and muscle cells"],
                    ["Golgi apparatus", "Stacked cisternae", "Modify, package, dispatch", "cis (receiving) vs trans (shipping) faces"],
                    ["Lysosome", "Single vesicle", "Intracellular digestion", "Acid hydrolases working at pH ~5"],
                    ["Ribosome", "No membrane", "Protein synthesis", "80S; free or ER-bound"],
                    ["Nucleus", "Double envelope with pores", "Stores genome; transcription", "Nucleolus makes ribosome subunits"]])},
        {"after": "## 10. Nucleus — The Control Centre",
         "md": "**Deep dive — the endosymbiont clue.** Mitochondria and chloroplasts each carry their own circular DNA, their own 70S ribosomes and a double membrane — the signature of bacteria that moved inside larger cells and stayed. The inner membrane corresponds to the original bacterial membrane; the outer one is the host's engulfing vacuole. NEB loves this as a link between cell structure and evolution: organelle anatomy is fossil evidence you can see in every cell."},
        {"after": "## 13. Master Comparison Tables",
         "svg": ("Eukaryotic cell — the organelle map",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="13">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">The eukaryotic cell as a factory</text>'
                 '<rect x="90" y="60" width="460" height="260" rx="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<circle cx="200" cy="140" r="38" fill="#93c5fd" stroke="#1e3a8a" stroke-width="2.5"/>'
                 '<text x="200" y="145" text-anchor="middle" font-size="12" fill="#1e3a8a">nucleus</text>'
                 '<ellipse cx="330" cy="110" rx="34" ry="20" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="330" y="115" text-anchor="middle" font-size="11" fill="#854d0e">mitochondrion</text>'
                 '<ellipse cx="450" cy="120" rx="32" ry="20" fill="#bbf7d0" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="450" y="125" text-anchor="middle" font-size="11" fill="#14532d">chloroplast</text>'
                 '<path d="M 120 210 q 60 -15 120 0 q 60 15 120 0" fill="none" stroke="#7e22ce" stroke-width="4"/>'
                 '<text x="250" y="240" font-size="11" fill="#581c87">ER network</text>'
                 '<rect x="400" y="200" width="70" height="30" rx="10" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<text x="435" y="220" text-anchor="middle" font-size="11" fill="#831843">Golgi</text>'
                 '<circle cx="150" cy="280" r="16" fill="#fca5a5" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="150" y="315" text-anchor="middle" font-size="11" fill="#7f1d1d">lysosome</text>'
                 '<circle cx="320" cy="285" r="8" fill="#7e22ce"/><circle cx="340" cy="290" r="8" fill="#7e22ce"/>'
                 '<circle cx="360" cy="283" r="8" fill="#7e22ce"/>'
                 '<text x="360" y="315" text-anchor="middle" font-size="11" fill="#581c87">ribosomes</text>'
                 '<text x="320" y="355" text-anchor="middle" font-size="13" fill="#4b5563">Nucleus = office &#183; ER/Golgi = production line &#183; mitochondria = power plant &#183; lysosomes = demolition.</text>'
                 '</svg>')},
    ],
},
{
    "file": "class-11/biology/biomolecules-and-cell-biology/03-detail-structure-of-eukaryotic-cells.json",
    "blocks": [
        {"after": "Chloroplast: double membrane; thylakoids stacked into grana; stroma with Calvin-cycle",
         "svg": ("Mitochondrion and chloroplast — the two energy organelles",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Two power organelles, one blueprint</text>'
                 '<ellipse cx="170" cy="160" rx="95" ry="55" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<path d="M 100 140 q 15 20 0 40 q 20 15 40 0 q 15 20 40 0 q 15 20 40 0 q 15 20 40 0 q 10 15 25 5" fill="none" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="170" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#854d0e">Mitochondrion</text>'
                 '<text x="170" y="245" text-anchor="middle" font-size="12" fill="#854d0e">cristae fold the inner membrane —</text>'
                 '<text x="170" y="265" text-anchor="middle" font-size="12" fill="#854d0e">more folds, more ATP synthase</text>'
                 '<ellipse cx="470" cy="160" rx="95" ry="60" fill="#bbf7d0" stroke="#16a34a" stroke-width="2.5"/>'
                 '<ellipse cx="440" cy="140" rx="16" ry="26" fill="#16a34a" stroke="#14532d" stroke-width="2"/>'
                 '<ellipse cx="475" cy="140" rx="16" ry="26" fill="#16a34a" stroke="#14532d" stroke-width="2"/>'
                 '<ellipse cx="510" cy="140" rx="16" ry="26" fill="#16a34a" stroke="#14532d" stroke-width="2"/>'
                 '<text x="470" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#14532d">Chloroplast</text>'
                 '<text x="470" y="245" text-anchor="middle" font-size="12" fill="#14532d">grana stacks in a fluid stroma —</text>'
                 '<text x="470" y="265" text-anchor="middle" font-size="12" fill="#14532d">light reactions then Calvin cycle</text>'
                 '<text x="320" y="320" text-anchor="middle" font-size="13" fill="#4b5563">Both: double membrane, own circular DNA, own 70S ribosomes — the endosymbiont signature.</text>'
                 '<text x="320" y="342" text-anchor="middle" font-size="13" fill="#4b5563">One harvests food energy; the other harvests light. Same ancestor, different job.</text>'
                 '</svg>')},
        {"after": "Lysosomes: 8–12 nm vesicle, hydrolytic enzymes (acidic pH); digest food particles, wo",
         "table": ("Organelle specialisations — who has what (highly classified)",
                   ["Organelle", "Plant cell", "Animal cell", "Why the difference"],
                   [["Cell wall", "Present (cellulose)", "Absent", "Turgor pressure needs a rigid box"],
                    ["Plastids", "Present", "Absent", "Plants make their own food"],
                    ["Large central vacuole", "Present (up to 90% volume)", "Small vesicles only", "Water storage + turgor"],
                    ["Centrioles", "Absent (higher plants)", "Present", "Spindle forms differently in plants"],
                    ["Lysosomes", "Few (vacuole takes the role)", "Many", "Animals ingest whole particles"],
                    ["Mitochondria + ER + Golgi", "Present", "Present", "Core eukaryote machinery shared"]])},
        {"after": "Cell wall (plant): cellulose microfibrils (primary wall) + pectin; secondary wall wit",
         "md": "**Deep dive — the plasma membrane as a gatekeeper.** The phospholipid bilayer is hydrophobic in its core, so only small non-polar molecules cross freely. Everything else needs help: channels and carriers for ions and sugars (facilitated diffusion), and ATP-driven pumps against gradients (active transport — the sodium-potassium pump is the classic). Fluid-mosaic is the name because proteins drift in a fluid lipid sea, and the mosaic of glycoproteins is how cells recognise each other."},
    ],
},
{
    "file": "class-11/biology/biomolecules-and-cell-biology/04-cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign.json",
    "blocks": [
        {"after": "### Meiosis (reductional division)",
         "svg": ("Mitosis vs meiosis — the outcome comparison",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Mitosis vs meiosis — what each produces</text>'
                 '<circle cx="150" cy="120" r="26" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="150" y="125" text-anchor="middle" font-size="11" fill="#1e3a8a">2n</text>'
                 '<line x1="150" y1="150" x2="150" y2="195" stroke="#475569" stroke-width="2.5"/>'
                 '<circle cx="110" cy="235" r="20" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<circle cx="195" cy="235" r="20" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="152" y="290" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">Mitosis: 1 division</text>'
                 '<text x="152" y="312" text-anchor="middle" font-size="12" fill="#1e3a8a">2 identical 2n cells — growth, repair</text>'
                 '<circle cx="450" cy="120" r="26" fill="#f9a8d4" stroke="#db2777" stroke-width="2.5"/>'
                 '<text x="450" y="125" text-anchor="middle" font-size="11" fill="#831843">2n</text>'
                 '<line x1="450" y1="150" x2="450" y2="180" stroke="#475569" stroke-width="2.5"/>'
                 '<circle cx="415" cy="205" r="16" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<circle cx="490" cy="205" r="16" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<line x1="415" y1="225" x2="395" y2="262" stroke="#475569" stroke-width="2"/>'
                 '<line x1="490" y1="225" x2="510" y2="262" stroke="#475569" stroke-width="2"/>'
                 '<circle cx="390" cy="285" r="13" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<circle cx="428" cy="285" r="13" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<circle cx="495" cy="285" r="13" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<circle cx="533" cy="285" r="13" fill="#f9a8d4" stroke="#db2777" stroke-width="2"/>'
                 '<text x="460" y="330" text-anchor="middle" font-size="13" font-weight="bold" fill="#831843">Meiosis: 2 divisions</text>'
                 '<text x="460" y="352" text-anchor="middle" font-size="12" fill="#831843">4 different n cells — gametes, variation</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Deep dive — why meiosis matters more than mitosis.** Mitosis copies; meiosis shuffles. Crossing over in Prophase I and independent assortment in Metaphase I mean no two gametes carry the same gene combination — a human can make over 8 million genetically different gametes before fertilisation multiplies the variety again. Without that reshuffling, selection would have nothing new to select; meiosis is the engine that keeps evolution running."},
    ],
},
]
