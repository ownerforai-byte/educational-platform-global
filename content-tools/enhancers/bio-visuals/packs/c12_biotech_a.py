# Class 12 Biology — Biotechnology Principles, topics 01-04.

PART_A = [
{
    "file": "class-12/biology/biotechnology-principles/01-principles-of-biotechnology-recombinant-dna-technology.json",
    "blocks": [
        {"after": "# Principles of biotechnology — recombinant DNA technology",
         "md": "**Recombinant DNA (rDNA) technology** splices a gene from one organism into the DNA of another, so the recipient makes a protein it could never make alone. Three core principles make it work: (1) restriction enzymes cut DNA at specific sequences, (2) DNA ligase stitches pieces together, and (3) a vector carries the recombinant DNA into a host that then replicates and expresses it. Human insulin in bacteria is the textbook product."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the seven steps of gene cloning (study in this order)",
                   ["Step", "Action", "Tool used"],
                   [["1", "Identify and isolate the gene of interest", "Restriction enzymes, mRNA → cDNA"],
                    ["2", "Cut the vector (plasmid) with the same enzyme", "Restriction enzyme — matching sticky ends"],
                    ["3", "Insert the gene into the vector (ligation)", "DNA ligase"],
                    ["4", "Transfer the recombinant DNA into the host", "Transformation, microinjection, gene gun"],
                    ["5", "Select the cells that took up the construct", "Antibiotic-resistance marker"],
                    ["6", "Scale up and express", "Fermenter; host transcribes and translates the gene"],
                    ["7", "Harvest and purify the product", "Downstream processing"]])},
        {"after": "## 3. Classified tables",
         "table": ("The three founding principles — who showed what",
                   ["Principle", "Discovery", "Significance"],
                   [["Cutting DNA at specific sites", "Restriction enzymes; Cohen and Boyer's 1972–73 experiments", "Precise, reproducible cuts with matching 'sticky ends'"],
                    ["Joining DNA pieces", "DNA ligase", "Seals the sugar-phosphate backbone — makes the construct permanent"],
                    ["Carrying DNA into a host", "Plasmids and phage as vectors; Stanley Cohen and Herbert Boyer built the first recombinant plasmid", "The construct replicates and is expressed inside the host"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Recombinant DNA — gene spliced into a plasmid",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Building a recombinant plasmid</text>'
                 '<circle cx="180" cy="190" r="80" fill="none" stroke="#1d4ed8" stroke-width="10"/>'
                 '<text x="180" y="120" text-anchor="middle" font-size="13" fill="#1e3a8a">plasmid vector</text>'
                 '<path d="M 250 175 L 300 175 L 300 150 L 360 150 L 360 200 L 300 200 L 300 205 L 250 205 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"/>'
                 '<text x="330" y="105" text-anchor="middle" font-size="13" fill="#854d0e">gene of interest (insert)</text>'
                 '<text x="330" y="230" text-anchor="middle" font-size="12" fill="#475569">cut with the SAME restriction enzyme</text>'
                 '<text x="330" y="250" text-anchor="middle" font-size="12" fill="#475569">&#8594; matching sticky ends fit together</text>'
                 '<line x1="420" y1="175" x2="470" y2="175" stroke="#16a34a" stroke-width="3"/>'
                 '<polygon points="468,169 468,181 478,175" fill="#16a34a"/>'
                 '<text x="475" y="160" font-size="12" fill="#14532d">DNA ligase seals</text>'
                 '<circle cx="540" cy="190" r="55" fill="none" stroke="#16a34a" stroke-width="9"/>'
                 '<path d="M 505 165 L 545 165 L 545 150 L 585 150 L 585 185 L 545 185 L 545 195 L 505 195 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"/>'
                 '<text x="540" y="270" text-anchor="middle" font-size="13" font-weight="bold" fill="#14532d">recombinant plasmid</text>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">Transformed into E. coli &#8594; the bacterium makes the foreign protein (e.g. insulin).</text>'
                 '<text x="320" y="354" text-anchor="middle" font-size="13" fill="#4b5563">Antibiotic-resistance marker lets only the successful cells survive.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — why the same enzyme must cut both pieces.** EcoRI recognises GAATTC and cuts between G and A, leaving staggered 'sticky ends'. If the human DNA and the plasmid are both cut with EcoRI, every fragment ends with the same complementary overhang, so any gene can anneal into any plasmid — ligase then seals it permanently. Use two different enzymes and the ends will not match: no clone. Sticky ends are the Morse code that makes recombination specific."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define recombinant DNA technology and name the three core principles. (2) List the seven steps of gene cloning in order. (3) Who performed the first rDNA experiment (Cohen and Boyer, 1972–73)? (4) Why must vector and insert be cut with the same enzyme? (5) What is downstream processing?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** rDNA technology = cut (restriction enzymes) + join (ligase) + carry (vector) + express (host). Every biotech product, from insulin to Bt cotton, is this one logic at different scales. **Self-check:** can you list the seven steps from memory and say which enzyme does steps 2 and 3?"},
    ],
},
{
    "file": "class-12/biology/biotechnology-principles/02-tools-restriction-enzymes-vectors-competent-host.json",
    "blocks": [
        {"after": "# Tools: restriction enzymes, vectors, competent host",
         "md": "Genetic engineering needs a standard toolkit. **Restriction enzymes** — the molecular scissors — recognise specific palindromic sequences and cut, leaving sticky or blunt ends. **Vectors** — plasmids, phage, cosmids — carry the gene into cells and replicate there; they need an origin of replication, a selectable marker and cloning sites. The **competent host** (usually *E. coli*) is made permeable so it can take up the recombinant DNA."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the toolkit in working order (study in this order)",
                   ["Step", "Tool", "Job"],
                   [["1", "Restriction enzyme (e.g. EcoRI)", "Cuts source DNA and vector at the same recognition site"],
                    ["2", "DNA ligase", "Seals insert into vector"],
                    ["3", "Vector (plasmid pBR322, phage lambda)", "Replicates inside the host; carries selectable marker"],
                    ["4", "Competent host (E. coli)", "Takes up the recombinant DNA and expresses it"],
                    ["5", "Selectable marker", "Antibiotic resistance lets only transformed cells survive"]])},
        {"after": "## 3. Classified tables",
         "table": ("Restriction enzymes — naming, recognition and cut types",
                   ["Feature", "Detail", "Example"],
                   [["Naming", "First letter = genus, next two = species, then strain/number", "EcoRI = E. coli R strain, enzyme I"],
                    ["Recognition site", "Palindromic sequence, 4–8 bp", "EcoRI: GAATTC; BamHI: GGATCC"],
                    ["Sticky ends", "Staggered cut leaves single-stranded overhangs", "EcoRI cuts G^AATTC — the classic exam enzyme"],
                    ["Blunt ends", "Straight cut across both strands", "SmaI: CCC^GGG"],
                    ["Why 'restriction'", "Bacteria use them to restrict invading phage DNA; they protect their own DNA by methylation", "Part of the bacterial immune system"]])},
        {"after": "## 3. Classified tables",
         "table": ("Vectors — requirements and types",
                   ["Feature / type", "What it provides", "Example"],
                   [["Origin of replication (ori)", "The vector copies itself inside the host", "Every plasmid has one; copy number varies"],
                    ["Selectable marker", "Distinguishes transformed cells (antibiotic resistance)", "ampR, tetR genes on pBR322"],
                    ["Cloning sites (MCS)", "Recognised cutting sites for inserting the gene", "Cluster of restriction sites"],
                    ["Plasmid", "Small circular DNA; workhorse of cloning", "pBR322, pUC"],
                    ["Phage lambda", "Infects bacteria efficiently; carries larger inserts", "Lambda derivatives"],
                    ["Cosmid / BAC / YAC", "Carries very large DNA fragments", "Used in genome projects"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("EcoRI cuts GAATTC — sticky ends explained",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">EcoRI: the staggered cut</text>'
                 '<text x="320" y="70" text-anchor="middle" font-size="15" fill="#14161a">5&#8242; ... G A A T T C ... 3&#8242;</text>'
                 '<text x="320" y="95" text-anchor="middle" font-size="15" fill="#14161a">3&#8242; ... C T T A A G ... 5&#8242;</text>'
                 '<line x1="255" y1="80" x2="255" y2="100" stroke="#dc2626" stroke-width="3"/>'
                 '<line x1="385" y1="80" x2="385" y2="100" stroke="#dc2626" stroke-width="3"/>'
                 '<text x="320" y="125" text-anchor="middle" font-size="12" fill="#dc2626">cut between G and A on each strand &#8212; staggered</text>'
                 '<line x1="140" y1="180" x2="300" y2="180" stroke="#1d4ed8" stroke-width="4"/>'
                 '<line x1="340" y1="180" x2="500" y2="180" stroke="#1d4ed8" stroke-width="4"/>'
                 '<line x1="300" y1="180" x2="300" y2="200" stroke="#1d4ed8" stroke-width="4"/>'
                 '<line x1="340" y1="200" x2="340" y2="180" stroke="#1d4ed8" stroke-width="0"/>'
                 '<line x1="300" y1="200" x2="300" y2="220" stroke="#1d4ed8" stroke-width="0"/>'
                 '<text x="220" y="210" font-size="13" fill="#1e3a8a">AATT overhang (sticky end)</text>'
                 '<text x="220" y="250" font-size="13" fill="#475569">Two pieces cut by the same enzyme anneal</text>'
                 '<text x="220" y="272" font-size="13" fill="#475569">because their overhangs are complementary.</text>'
                 '<text x="220" y="300" font-size="13" fill="#14532d">DNA ligase then seals the backbone.</text>'
                 '<text x="320" y="345" text-anchor="middle" font-size="13" fill="#4b5563">Palindromic site: GAATTC reads the same on both strands (5&#8242;&#8594;3&#8242;).</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — reading a plasmid map.** pBR322 carries ampR and tetR. The gene is inserted at a site inside tetR. Cells grown on ampicillin survive if they carry any plasmid; cells grown on tetracycline die if the insert disrupted tetR. So the clone of interest is: ampicillin-resistant AND tetracycline-sensitive. This is **insertional inactivation** — using the disruption of a marker gene as the selection signal."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Explain the naming of EcoRI. (2) Define palindromic recognition site with an example. (3) Sticky ends vs blunt ends. (4) List the three features every vector needs and why. (5) How is a host made competent (CaCl2, heat shock; electroporation)? (6) What is insertional inactivation?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Scissors (restriction enzymes), tape (ligase), delivery truck (vector with ori + marker + cloning sites) and a willing factory (competent host) — four tools, one workflow. **Self-check:** can you draw EcoRI's cut and list the three vector requirements?"},
    ],
},
{
    "file": "class-12/biology/biotechnology-principles/03-processes-dna-isolation-pcr-gel-electrophoresis-gene-transfer.json",
    "blocks": [
        {"after": "# Processes: DNA isolation, PCR, gel electrophoresis, gene transfer",
         "md": "The working processes of biotech: **DNA isolation** (lyse cells, remove proteins, precipitate pure DNA), **PCR** (polymerase chain reaction — amplify a DNA segment a billion-fold in hours using Taq polymerase through denaturation, primer annealing and extension cycles), **gel electrophoresis** (separate DNA fragments by size through an agarose gel — DNA is negative, so it runs to the anode), and **gene transfer** into hosts or plants."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the processes in the order a cloning project uses them (study in this order)",
                   ["Step", "Process", "Purpose"],
                   [["1", "DNA isolation", "Extract clean DNA from cells (lysis → RNase/protease → ethanol precipitation)"],
                    ["2", "Cutting with restriction enzymes", "Produce fragments with usable ends"],
                    ["3", "PCR", "Amplify the specific fragment a billion-fold"],
                    ["4", "Gel electrophoresis", "Check fragment sizes; recover the right band"],
                    ["5", "Ligation into vector", "Build the recombinant DNA"],
                    ["6", "Gene transfer", "Deliver the construct to host or plant cells"]])},
        {"after": "## 3. Classified tables",
         "table": ("PCR — the three temperatures and what happens at each",
                   ["Step", "Temperature", "What happens"],
                   [["1. Denaturation", "~94–95°C", "Double helix separates into two single strands"],
                    ["2. Primer annealing", "~50–60°C", "Short primers bind the flanking sequences of the target"],
                    ["3. Extension", "~72°C", "Taq polymerase builds the new strand from the primers"],
                    ["Result after n cycles", "—", "Target copies ≈ 2ⁿ; 30 cycles → over a billion copies"],
                    ["Why Taq polymerase", "From Thermus aquaticus (hot-spring bacterium)", "Survives the denaturation step — the enzyme does not need re-adding"]])},
        {"after": "## 3. Classified tables",
         "table": ("Gene transfer methods — classified",
                   ["Method", "How it works", "Used for"],
                   [["Transformation (CaCl2 + heat shock)", "Cold calcium makes membranes permeable; brief heat shock lets DNA in", "Bacteria (E. coli)"],
                    ["Electroporation", "Electric pulses open temporary pores", "Bacteria, plant cells"],
                    ["Microinjection", "DNA injected directly into the cell/nucleus with a fine needle", "Animal cells, embryos"],
                    ["Biolistics (gene gun)", "Gold/tungsten particles coated with DNA shot into cells", "Plant cells"],
                    ["Agrobacterium tumefaciens", "Disarmed Ti plasmid carries the gene into plant genome naturally", "Dicot plants — nature's own genetic engineer"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("PCR — temperature cycles double the target each round",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Polymerase chain reaction (PCR)</text>'
                 '<line x1="90" y1="290" x2="590" y2="290" stroke="#475569" stroke-width="2"/>'
                 '<text x="600" y="295" font-size="12" fill="#475569">cycles</text>'
                 '<line x1="90" y1="290" x2="90" y2="80" stroke="#475569" stroke-width="2"/>'
                 '<text x="70" y="90" font-size="12" fill="#475569">&#176;C</text>'
                 '<path d="M 100 290 L 130 90 L 160 90 L 190 250 L 220 250 L 250 90 L 280 90 L 310 250 L 340 250 L 370 90 L 400 90 L 430 250 L 460 250 L 490 90 L 520 90 L 550 250" fill="none" stroke="#dc2626" stroke-width="2.5"/>'
                 '<text x="140" y="80" font-size="12" fill="#dc2626">95&#176;C denature</text>'
                 '<text x="230" y="270" font-size="12" fill="#2563eb">55&#176;C anneal primers</text>'
                 '<text x="380" y="270" font-size="12" fill="#14532d">72&#176;C Taq extends</text>'
                 '<text x="480" y="150" font-size="13" fill="#14161a">Each cycle doubles</text>'
                 '<text x="480" y="172" font-size="13" fill="#14161a">the target: 2, 4, 8,</text>'
                 '<text x="480" y="194" font-size="13" fill="#14161a">16 ... 30 cycles =</text>'
                 '<text x="480" y="216" font-size="13" fill="#14161a">~1 billion copies.</text>'
                 '<text x="320" y="340" text-anchor="middle" font-size="13" fill="#4b5563">Taq polymerase (Thermus aquaticus) survives the 95&#176;C step every cycle.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — PCR maths.** Starting with 1 copy and running 30 cycles: copies = 2³⁰ ≈ 1.07 billion. With 20 cycles: 2²⁰ ≈ 1 million. So the choice of cycle count sets sensitivity — forensic and diagnostic PCR use 30–40 cycles to detect vanishingly small starting amounts, which is also why contamination is fatal: one stray molecule becomes a billion too."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) List the three PCR steps with their temperatures. (2) Why is Taq polymerase used and where does it come from? (3) How does gel electrophoresis separate DNA, and which pole does DNA run toward? (4) Name four gene-transfer methods and one use each. (5) Why is Agrobacterium called nature's genetic engineer?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Isolate, cut, amplify (PCR), check (gel), join, transfer — the standard pipeline of every cloning project. PCR's exponential maths and electrophoresis's size sorting are the two skills the exam loves. **Self-check:** can you state the three PCR temperatures and compute 2²⁰?"},
    ],
},
{
    "file": "class-12/biology/biotechnology-principles/04-applications-of-recombinant-dna-technology.json",
    "blocks": [
        {"after": "# Applications of recombinant DNA technology",
         "md": "rDNA technology turned biology into an industry. Its products span medicine (human insulin, growth hormone, vaccines, interferon), agriculture (Bt crops, golden rice, herbicide tolerance), industry (enzymes for detergents and food) and research (gene therapy, DNA fingerprints, transgenic animals). The common thread: a gene, once cloned, can be manufactured in fermenters at scale."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from clone to product class (study in this order)",
                   ["Step", "Field", "Flagship products"],
                   [["1", "Medicine", "Human insulin (Humulin), growth hormone, interferon, hepatitis B vaccine, blood-clotting factors"],
                    ["2", "Agriculture", "Bt cotton/brinjal (insect resistance), golden rice (pro-vitamin A), herbicide-tolerant soybean"],
                    ["3", "Industry and environment", "Detergent enzymes (lipase, protease), cheese rennet (chymosin), oil-eating bacteria"],
                    ["4", "Diagnostics and research", "DNA fingerprinting, PCR-based disease tests, gene therapy trials, transgenic animals"]])},
        {"after": "## 3. Classified tables",
         "table": ("Flagship products — gene, host and benefit",
                   ["Product", "Gene / source", "Production host", "Benefit"],
                   [["Human insulin (Humulin, 1982)", "Human insulin gene", "E. coli / yeast fermenters", "Replaced pancreas-extracted insulin; unlimited, safe supply for diabetics"],
                    ["Growth hormone (hGH)", "Human GH gene", "E. coli", "Treats pituitary dwarfism without cadaver-derived hormone"],
                    ["Hepatitis B vaccine", "HBsAg surface antigen gene", "Yeast", "Safe vaccine with no live virus"],
                    ["Bt cotton", "cry genes from Bacillus thuringiensis", "Cotton plant itself", "Built-in bollworm resistance; less insecticide"],
                    ["Golden rice", "Beta-carotene pathway genes", "Rice plant", "Fights vitamin-A deficiency blindness"],
                    ["Chymosin (rennet)", "Calf chymosin gene", "Microbes", "Vegetarian-safe cheese at industrial scale"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("One technology, four industries",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Applications of rDNA technology</text>'
                 '<rect x="240" y="60" width="160" height="56" rx="12" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="320" y="85" text-anchor="middle" font-weight="bold" fill="#854d0e">Cloned gene</text>'
                 '<text x="320" y="105" text-anchor="middle" font-size="12" fill="#854d0e">in a fermenter host</text>'
                 '<line x1="320" y1="118" x2="320" y2="145" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="315,143 325,143 320,153" fill="#475569"/>'
                 '<rect x="40" y="160" width="130" height="110" rx="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="105" y="190" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Medicine</text>'
                 '<text x="105" y="215" text-anchor="middle" font-size="12" fill="#1e3a8a">insulin, hGH,</text>'
                 '<text x="105" y="235" text-anchor="middle" font-size="12" fill="#1e3a8a">vaccines,</text>'
                 '<text x="105" y="255" text-anchor="middle" font-size="12" fill="#1e3a8a">interferon</text>'
                 '<rect x="185" y="160" width="130" height="110" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="250" y="190" text-anchor="middle" font-weight="bold" fill="#14532d">Agriculture</text>'
                 '<text x="250" y="215" text-anchor="middle" font-size="12" fill="#14532d">Bt cotton,</text>'
                 '<text x="250" y="235" text-anchor="middle" font-size="12" fill="#14532d">golden rice,</text>'
                 '<text x="250" y="255" text-anchor="middle" font-size="12" fill="#14532d">herbicide tolerance</text>'
                 '<rect x="330" y="160" width="130" height="110" rx="12" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>'
                 '<text x="395" y="190" text-anchor="middle" font-weight="bold" fill="#581c87">Industry</text>'
                 '<text x="395" y="215" text-anchor="middle" font-size="12" fill="#581c87">detergent enzymes,</text>'
                 '<text x="395" y="235" text-anchor="middle" font-size="12" fill="#581c87">chymosin,</text>'
                 '<text x="395" y="255" text-anchor="middle" font-size="12" fill="#581c87">bioremediation</text>'
                 '<rect x="475" y="160" width="130" height="110" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>'
                 '<text x="540" y="190" text-anchor="middle" font-weight="bold" fill="#7f1d1d">Research</text>'
                 '<text x="540" y="215" text-anchor="middle" font-size="12" fill="#7f1d1d">DNA fingerprint,</text>'
                 '<text x="540" y="235" text-anchor="middle" font-size="12" fill="#7f1d1d">gene therapy,</text>'
                 '<text x="540" y="255" text-anchor="middle" font-size="12" fill="#7f1d1d">transgenics</text>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">Same workflow, four markets: the gene is the product.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — insulin, the first blockbuster.** Before 1982, insulin came from pig and cattle pancreases — limited supply, occasional allergic reactions. Genentech and Eli Lilly cloned the human insulin genes A and B into E. coli; fermenters now produce it in tonnes. The scientific trick: express the two chains separately, then join them, or express pro-insulin and cleave it. Humulin (1982) was the first FDA-approved recombinant drug — the moment biotech became an industry."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Name three recombinant medical products and what each treats. (2) Which was the first recombinant drug approved (Humulin, 1982)? (3) Name two agricultural applications with their genes. (4) Why did recombinant insulin beat pancreas-extracted insulin? (5) List two industrial enzyme applications."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Once a gene is cloned it can be manufactured: medicine, agriculture, industry and research all run on the same cloned-gene logic. **Self-check:** can you name the gene, the host and the benefit for insulin and Bt cotton?"},
    ],
},
]
