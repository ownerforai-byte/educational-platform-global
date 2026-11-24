# Class 12 Biology — Biotechnology Applications (4) + Food Production 01-02.

PART_B = [
{
    "file": "class-12/biology/biotechnology-applications/01-biotechnological-applications-in-agriculture-bt-cotton-nematode-resistant-tobacco.json",
    "blocks": [
        {"after": "# Biotechnological applications in agriculture: Bt cotton, nematode-resistant tobacco",
         "md": "Agricultural biotechnology puts new genes into crop plants. Two NEB exemplars: **Bt cotton**, which carries toxin genes (cry) from the soil bacterium *Bacillus thuringiensis* and kills bollworm caterpillars from within; and **nematode-resistant tobacco**, which uses **RNA interference (RNAi)** — feeding the plant dsRNA so the parasite's own genes are silenced when it feeds. One kills with protein, the other with silencing."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — two very different plant-protection tricks (study in this order)",
                   ["Step", "Concept", "Mechanism"],
                   [["1", "The problem", "Bollworm destroys cotton; nematode (Meloidogyne) destroys tobacco roots — chemical sprays costly and toxic"],
                    ["2", "Bt solution — protein toxin", "cry genes from B. thuringiensis inserted into cotton; plant makes inactive protoxin"],
                    ["3", "Why it kills only insects", "Alkaline insect gut activates the toxin; acidic human gut does not"],
                    ["4", "RNAi solution — gene silencing", "Nematode-specific genes introduced into tobacco as dsRNA"],
                    ["5", "RNAi in action", "Nematode feeds, takes up dsRNA → its mRNA is degraded → parasite cannot survive"],
                    ["6", "Result", "Protection grown into the plant, not sprayed on it"]])},
        {"after": "## 3. Classified tables",
         "table": ("Bt toxin vs RNAi — the two strategies compared",
                   ["Feature", "Bt (protein-based)", "RNAi (gene-silencing)"],
                   [["Agent", "cry protein from Bacillus thuringiensis", "Double-stranded RNA matching parasite genes"],
                    ["Mode of action", "Toxin ruptures insect gut cells after alkaline activation", "Host RNAi machinery degrades the parasite's mRNA"],
                    ["Target", "Insects (bollworm, beetle, fly larvae)", "Nematodes (Meloidogyne incognita in tobacco)"],
                    ["Why safe for humans", "Acidic gut does not activate the protoxin", "Species-specific sequence — human genes unaffected"],
                    ["Textbook example", "Bt cotton, Bt corn, Bt brinjal", "Nematode-resistant tobacco (classic RNAi experiment)"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Bt cotton — the toxin pathway from bacterium to bollworm",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">How Bt cotton protects itself</text>'
                 '<ellipse cx="110" cy="110" rx="65" ry="42" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2"/>'
                 '<text x="110" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#581c87">Bacillus</text>'
                 '<text x="110" y="125" text-anchor="middle" font-size="12" fill="#581c87">thuringiensis</text>'
                 '<text x="110" y="175" text-anchor="middle" font-size="12" fill="#581c87">cry genes (toxin)</text>'
                 '<line x1="178" y1="110" x2="245" y2="110" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="243,105 243,115 253,110" fill="#475569"/>'
                 '<rect x="255" y="80" width="130" height="60" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="320" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#14532d">Cotton plant</text>'
                 '<text x="320" y="125" text-anchor="middle" font-size="12" fill="#14532d">expresses protoxin</text>'
                 '<ellipse cx="320" cy="270" rx="60" ry="38" fill="#fde68a" stroke="#b45309" stroke-width="2"/>'
                 '<text x="320" y="266" text-anchor="middle" font-size="13" font-weight="bold" fill="#854d0e">bollworm</text>'
                 '<text x="320" y="286" text-anchor="middle" font-size="12" fill="#854d0e">eats the leaf</text>'
                 '<line x1="320" y1="142" x2="320" y2="228" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="315,226 325,226 320,236" fill="#475569"/>'
                 '<text x="450" y="250" font-size="13" fill="#14161a">Alkaline gut dissolves</text>'
                 '<text x="450" y="272" font-size="13" fill="#14161a">the crystal &#8594; toxin</text>'
                 '<text x="450" y="294" font-size="13" fill="#14161a">activates &#8594; gut cells</text>'
                 '<text x="450" y="316" font-size="13" fill="#14161a">rupture &#8594; larva dies.</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">Human stomach is acidic &#8212; the protoxin stays inactive. That is the safety argument.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — the RNAi logic chain.** Step 1: identify nematode genes essential to its survival. Step 2: introduce DNA copies of those genes into tobacco, oriented so the plant transcribes **both strands** — the two RNAs pair into dsRNA. Step 3: the plant's own RNAi machinery processes the dsRNA into siRNA. Step 4: the nematode feeds on the plant, ingests the siRNA, and its corresponding mRNA is sliced — essential proteins stop, the parasite dies. The plant was never poisoned; it weaponised information."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Name the bacterium and the gene family behind Bt crops. (2) Why is Bt toxin harmless to humans? (3) Explain RNA interference step by step. (4) Which pest does each strategy target (Bt: insects; RNAi: nematode in tobacco)? (5) Two advantages of built-in protection over spraying."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Plant biotech protects crops two ways: Bt kills insects with an alkaline-activated protein toxin; RNAi silences nematode genes with dsRNA. Both turn the crop into its own pesticide. **Self-check:** can you explain why the same Bt protoxin is lethal to a caterpillar and inert in your stomach?"},
    ],
},
{
    "file": "class-12/biology/biotechnology-applications/02-biotechnological-applications-in-medicine-insulin-gene-therapy-therapeutic-proteins.json",
    "blocks": [
        {"after": "# Biotechnological applications in medicine: insulin, gene therapy, therapeutic proteins",
         "md": "Medical biotech manufactures what the body fails to make, or fixes the gene itself. **Recombinant insulin** (1982) replaced animal pancreas extract. **Gene therapy** attempts to deliver a working gene into a patient's cells — the classic case being ADA-SCID ('bubble boy' immune deficiency), treated with the ADA gene delivered in a disabled vector. **Therapeutic proteins** — growth hormone, clotting factors, interferon — are all made by cloned genes in fermenters."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from protein replacement to gene repair (study in this order)",
                   ["Step", "Concept", "Status"],
                   [["1", "Recombinant protein replacement", "Mature, routine: insulin, hGH, factor VIII, interferon"],
                    ["2", "Vaccines by cloning", "Hepatitis B vaccine made from the cloned surface antigen gene in yeast"],
                    ["3", "Gene therapy — somatic", "Deliver a functional gene to the patient's cells (ADA-SCID, 1990); changes NOT inherited"],
                    ["4", "Gene therapy — germline", "Would change eggs/sperm — banned on ethical grounds"],
                    ["5", "Personalised medicine", "Genotype-based drug choice and dosing (pharmacogenomics)"]])},
        {"after": "## 3. Classified tables",
         "table": ("Recombinant medical products — the master table",
                   ["Product", "Treats", "Produced in"],
                   [["Human insulin (Humulin)", "Diabetes mellitus", "E. coli / yeast"],
                    ["Growth hormone (hGH)", "Pituitary dwarfism", "E. coli"],
                    ["Factor VIII", "Haemophilia A", "Mammalian cell culture"],
                    ["Interferon", "Viral infections, some cancers", "E. coli / yeast"],
                    ["Hepatitis B vaccine", "Hepatitis B", "Yeast (cloned HBsAg gene)"],
                    ["Erythropoietin (EPO)", "Anaemia of kidney failure", "Mammalian cells"]])},
        {"after": "## 3. Classified tables",
         "table": ("Gene therapy — the ADA-SCID template",
                   ["Stage", "What happens", "Note"],
                   [["1", "Diagnose the defect", "ADA enzyme missing → toxic metabolites destroy T cells → severe combined immunodeficiency"],
                    ["2", "Clone the normal ADA gene", "Into a disabled retroviral vector"],
                    ["3", "Harvest the patient's bone-marrow / lymphocyte cells", "Ex vivo approach"],
                    ["4", "Transduce the cells with the vector", "Cells now carry the working gene"],
                    ["5", "Reinfuse into the patient", "First successful human gene therapy, 1990 (Ashanti DeSilva)"],
                    ["6", "Limitations", "Effects temporary (cells die); vector safety (immunoreaction); high cost; somatic only — not heritable"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Gene therapy — ex vivo ADA treatment flow",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Gene therapy for ADA-SCID (ex vivo)</text>'
                 '<rect x="60" y="80" width="130" height="60" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>'
                 '<text x="125" y="105" text-anchor="middle" font-weight="bold" fill="#7f1d1d">Patient cells</text>'
                 '<text x="125" y="125" text-anchor="middle" font-size="12" fill="#7f1d1d">ADA gene defective</text>'
                 '<rect x="255" y="80" width="130" height="60" rx="10" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>'
                 '<text x="320" y="105" text-anchor="middle" font-weight="bold" fill="#581c87">Clone ADA gene</text>'
                 '<text x="320" y="125" text-anchor="middle" font-size="12" fill="#581c87">into disabled vector</text>'
                 '<rect x="450" y="80" width="130" height="60" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="515" y="105" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Transduce cells</text>'
                 '<text x="515" y="125" text-anchor="middle" font-size="12" fill="#1e3a8a">outside the body</text>'
                 '<line x1="192" y1="110" x2="251" y2="110" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="249,105 249,115 259,110" fill="#475569"/>'
                 '<line x1="387" y1="110" x2="446" y2="110" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="444,105 444,115 454,110" fill="#475569"/>'
                 '<rect x="255" y="230" width="130" height="60" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="320" y="255" text-anchor="middle" font-weight="bold" fill="#14532d">Corrected cells</text>'
                 '<text x="320" y="275" text-anchor="middle" font-size="12" fill="#14532d">make ADA enzyme</text>'
                 '<line x1="515" y1="142" x2="390" y2="245" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="392,240 384,248 396,254" fill="#475569"/>'
                 '<rect x="60" y="230" width="130" height="60" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="125" y="255" text-anchor="middle" font-weight="bold" fill="#14532d">Reinfuse patient</text>'
                 '<text x="125" y="275" text-anchor="middle" font-size="12" fill="#14532d">immune function restored</text>'
                 '<line x1="253" y1="260" x2="194" y2="260" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="196,255 196,265 186,260" fill="#475569"/>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">First success: 1990, four-year-old with ADA-SCID. Somatic only &#8212; not inherited.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — why ADA-SCID was the right first case.** The disease is caused by ONE known gene; the target cells (bone marrow/lymphocytes) can be removed, treated outside the body and reinfused; and even partial ADA restoration gives clear clinical benefit. Perfect first trial: single gene, accessible target, measurable outcome. Most diseases fail at least one of those three — which is why gene therapy has been slow to generalise despite this landmark success."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Name three recombinant medical products. (2) Describe the ADA-SCID gene therapy procedure step by step. (3) Why is the therapy not heritable (somatic vs germline)? (4) What are the limitations of gene therapy? (5) How is the hepatitis B vaccine made by cloning?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Medicine runs on cloned genes at two levels: manufacture the missing protein (insulin, factor VIII) or deliver the missing gene (ADA-SCID). The first is routine; the second remains limited by vector safety and transience. **Self-check:** can you list the five steps of the ex vivo gene therapy protocol?"},
    ],
},
{
    "file": "class-12/biology/biotechnology-applications/03-transgenic-animals.json",
    "blocks": [
        {"after": "# Transgenic animals",
         "md": "A **transgenic animal** carries a deliberately introduced foreign gene in every cell. Over 95% of transgenic animals are mice — the research workhorses; pigs, cows, sheep, rabbits and fish follow. Uses: studying how genes work and how diseases develop, producing human pharmaceuticals in milk (molecular farming), testing vaccine safety, and improving livestock traits."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — why make a transgenic animal (study in this order)",
                   ["Step", "Purpose", "Example"],
                   [["1", "Study gene function", "Knockout mice: delete a gene and see what breaks"],
                    ["2", "Disease models", "Oncomouse (cancer-prone); Alzheimer-model mice for drug testing"],
                    ["3", "Molecular farming", "Human alpha-1-antitrypsin in sheep milk; human protein C in pig milk"],
                    ["4", "Vaccine and chemical safety testing", "Transgenic mice more sensitive to polio — safer vaccine testing than monkeys"],
                    ["5", "Livestock improvement", "Fast-growing transgenic salmon; leaner pigs; Rosie the cow's human-protein-enriched milk"]])},
        {"after": "## 3. Classified tables",
         "table": ("Transgenic animals — the classic cases",
                   ["Animal", "Introduced change", "Use"],
                   [["Knockout mouse", "A target gene disabled", "Reveals what the gene does in the body"],
                    ["Oncomouse", "Cancer-promoting oncogene added", "Cancer research model (first patented animal, 1988)"],
                    ["Rosie the transgenic cow", "Human alpha-lactalbumin gene", "Milk nutritionally closer to human breast milk"],
                    ["Transgenic sheep (Tracy)", "Human alpha-1-antitrypsin gene", "Drug for emphysema produced in milk (molecular farming)"],
                    ["Transgenic salmon", "Growth hormone gene", "Reaches market size in ~half the time"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Making a transgenic animal — the workflow",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">How a transgenic animal is made</text>'
                 '<rect x="60" y="90" width="140" height="60" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="130" y="115" text-anchor="middle" font-weight="bold" fill="#854d0e">Foreign gene</text>'
                 '<text x="130" y="135" text-anchor="middle" font-size="12" fill="#854d0e">cloned in vector</text>'
                 '<rect x="250" y="90" width="140" height="60" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="320" y="115" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Microinject into</text>'
                 '<text x="320" y="135" text-anchor="middle" font-size="12" fill="#1e3a8a">fertilised egg</text>'
                 '<rect x="440" y="90" width="140" height="60" rx="10" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>'
                 '<text x="510" y="115" text-anchor="middle" font-weight="bold" fill="#581c87">Implant into</text>'
                 '<text x="510" y="135" text-anchor="middle" font-size="12" fill="#581c87">surrogate mother</text>'
                 '<line x1="202" y1="120" x2="246" y2="120" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="244,115 244,125 254,120" fill="#475569"/>'
                 '<line x1="392" y1="120" x2="436" y2="120" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="434,115 434,125 444,120" fill="#475569"/>'
                 '<rect x="200" y="230" width="240" height="70" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="320" y="258" text-anchor="middle" font-weight="bold" fill="#14532d">Offspring tested for the gene</text>'
                 '<text x="320" y="282" text-anchor="middle" font-size="12" fill="#14532d">positive animals = transgenic founders</text>'
                 '<line x1="510" y1="152" x2="400" y2="240" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="402,234 394,242 406,248" fill="#475569"/>'
                 '<text x="320" y="340" text-anchor="middle" font-size="13" fill="#4b5563">The gene is in EVERY cell &#8212; and can be passed to the next generation.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — molecular farming in milk.** A human drug gene is linked to a milk-protein promoter (so it switches on only in the mammary gland) and microinjected into a fertilised sheep egg. The lamb grows up; when she lactates, her milk contains grams per litre of the human protein — alpha-1-antitrypsin for emphysema patients. The animal is the fermenter: self-replicating, self-feeding, and the product is collected twice daily by milking."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define transgenic animal. (2) Why are most transgenic animals mice? (3) Name three uses with one example each (disease model, molecular farming, safety testing). (4) What was Rosie the cow engineered for? (5) How is the gene delivered into the egg?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Transgenic animals put a chosen gene into a whole organism: to study genes, model disease, test safety, or farm human proteins in milk. **Self-check:** can you name the four steps from cloned gene to transgenic founder?"},
    ],
},
{
    "file": "class-12/biology/biotechnology-applications/04-biopiracy-and-patent-issues.json",
    "blocks": [
        {"after": "# Biopiracy and patent issues",
         "md": "**Biopiracy** is the commercial use of biological material or traditional knowledge — usually from developing countries and indigenous communities — without permission or payment. Patents are meant to reward invention, but they have been used to claim what communities knew and grew for centuries. The classic cases: turmeric, neem and basmati rice patents in the West; the remedy is documentation of traditional knowledge and defensive publication."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from traditional knowledge to legal battle (study in this order)",
                   ["Step", "Concept", "Example"],
                   [["1", "Traditional knowledge exists for centuries", "Turmeric as wound-healer; neem as pesticide; basmati as aromatic rice — all South Asian heritage"],
                    ["2", "A foreign party patents it", "US patent on turmeric's wound-healing use (1995); neem patent; basmati rice varieties"],
                    ["3", "The challenge", "India's CSIR challenged the turmeric patent with ancient Sanskrit texts as prior art — patent REVOKED"],
                    ["4", "The lesson", "Prior art must be documented and searchable — traditional knowledge databases (TKDL) prevent fresh piracy"],
                    ["5", "The framework", "Convention on Biological Diversity: sovereign rights over genetic resources; benefit sharing; Nagoya Protocol"]])},
        {"after": "## 3. Classified tables",
         "table": ("The three classic cases — what was claimed and how it ended",
                   ["Case", "What was patented / claimed", "Outcome"],
                   [["Turmeric", "US patent (1995) on wound-healing use of turmeric", "Revoked 1997 — CSIR produced ancient Sanskrit medical texts as prior art"],
                    ["Neem", "European patent on neem-based fungicide/pesticide", "Opposed by India + Green Party; patent revoked (2000, upheld 2005)"],
                    ["Basmati", "US firm's claim to 'basmati' rice varieties and the name", 'Claim narrowed; India won protection of the name in key markets'],
                    ["General rule", "Life forms and traditional knowledge are NOT free for the taking", "CBD 1992: national sovereignty + benefit sharing; TKDL documents 1000s of remedies"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Biopiracy — the loop and the defence",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Biopiracy and its remedy</text>'
                 '<rect x="60" y="90" width="160" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="140" y="118" text-anchor="middle" font-weight="bold" fill="#14532d">Traditional knowledge</text>'
                 '<text x="140" y="140" text-anchor="middle" font-size="12" fill="#14532d">turmeric, neem, basmati</text>'
                 '<line x1="222" y1="110" x2="290" y2="110" stroke="#b45309" stroke-width="2.5"/>'
                 '<polygon points="288,105 288,115 298,110" fill="#b45309"/>'
                 '<text x="258" y="96" text-anchor="middle" font-size="11" fill="#b45309">taken without consent</text>'
                 '<rect x="300" y="75" width="150" height="70" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>'
                 '<text x="375" y="103" text-anchor="middle" font-weight="bold" fill="#7f1d1d">Foreign patent</text>'
                 '<text x="375" y="125" text-anchor="middle" font-size="12" fill="#7f1d1d">monopoly claimed</text>'
                 '<rect x="300" y="210" width="150" height="70" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="375" y="238" text-anchor="middle" font-weight="bold" fill="#854d0e">Legal challenge</text>'
                 '<text x="375" y="260" text-anchor="middle" font-size="12" fill="#854d0e">prior art produced</text>'
                 '<line x1="375" y1="147" x2="375" y2="206" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="370,204 380,204 375,214" fill="#475569"/>'
                 '<rect x="60" y="210" width="160" height="70" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="140" y="238" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Patent revoked</text>'
                 '<text x="140" y="260" text-anchor="middle" font-size="12" fill="#1e3a8a">knowledge stays public</text>'
                 '<line x1="298" y1="245" x2="224" y2="245" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="226,240 226,250 216,245" fill="#475569"/>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">Prevention: TKDL databases + CBD benefit-sharing make future piracy hard.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — how the turmeric patent fell.** The 1995 US patent claimed wound-healing use of turmeric as an invention. India's CSIR filed re-examination evidence: Sanskrit and Hindi medical texts and field use documented turmeric's wound healing for millennia. The US Patent Office accepted this as **prior art** — the 'invention' was not new — and revoked the patent in 1997. The legal weapon was documentation, which is exactly why India built the Traditional Knowledge Digital Library."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define biopiracy with one example. (2) How did India revoke the turmeric patent? (3) What is prior art? (4) Name the three classic cases (turmeric, neem, basmati). (5) What do the CBD and the Nagoya Protocol require (benefit sharing)? (6) What is TKDL and why was it built?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Biopiracy claims centuries-old knowledge as invention; the defence is documentation (prior art, TKDL) plus international law (CBD, Nagoya) requiring consent and benefit sharing. **Self-check:** can you recount the turmeric case end to end?"},
    ],
},
{
    "file": "class-12/biology/strategies-for-food-production/01-plant-breeding-methods-and-examples.json",
    "blocks": [
        {"after": "# Plant breeding — methods and examples",
         "md": "**Plant breeding** is the purposeful genetic improvement of crop plants: cross parents carrying desirable traits, select the best offspring over generations, and release a stable, superior variety. The classic steps: collection of germplasm → hybridisation → selection → testing → release. Success stories: high-yielding wheat and rice of the Green Revolution, and fortified crops like iron-rich spinach varieties."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the five steps of classical plant breeding (study in this order)",
                   ["Step", "Stage", "What happens"],
                   [["1", "Germplasm collection", "Gather all available wild relatives, landraces and improved varieties — the raw material"],
                    ["2", "Hybridisation", "Cross selected parents carrying complementary traits (emasculation + bagging for controlled pollination)"],
                    ["3", "Selection", "Over generations, keep only the progeny with the best combination of traits"],
                    ["4", "Testing and evaluation", "Grow candidates in multi-location field trials vs the best existing varieties"],
                    ["5", "Release and distribution", "Officially released variety; seed multiplied and sold to farmers"]])},
        {"after": "## 3. Classified tables",
         "table": ("Breeding achievements — the classic examples",
                   ["Achievement", "Crop / organism", "What was bred for"],
                   [["Green Revolution wheat", "Sonora 64, Lerma Rojo (Norman Borlaug era)", "Semi-dwarf, high-yield, fertiliser-responsive"],
                    ["Green Revolution rice", "IR-8 and derivatives", "High yield, short straw, wide adaptability"],
                    ["Fortified spinach", "Iron-enriched spinach varieties", "Higher iron content to fight anaemia"],
                    ["Hybrid maize and sorghum", "Single-cross hybrids", "Vigour (heterosis) and uniformity"],
                    ["Disease resistance", "Various crops vs rust, blight", "Resistance genes from wild relatives"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Plant breeding pipeline — from germplasm to farmer's field",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">The five steps of plant breeding</text>'
                 '<rect x="40" y="90" width="105" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="92" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">1. Germplasm</text>'
                 '<text x="92" y="138" text-anchor="middle" font-size="11" fill="#14532d">collection</text>'
                 '<rect x="165" y="90" width="105" height="70" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="217" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">2. Hybridisation</text>'
                 '<text x="217" y="138" text-anchor="middle" font-size="11" fill="#1e3a8a">cross the parents</text>'
                 '<rect x="290" y="90" width="105" height="70" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="342" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#854d0e">3. Selection</text>'
                 '<text x="342" y="138" text-anchor="middle" font-size="11" fill="#854d0e">over generations</text>'
                 '<rect x="415" y="90" width="105" height="70" rx="10" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>'
                 '<text x="467" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#581c87">4. Field testing</text>'
                 '<text x="467" y="138" text-anchor="middle" font-size="11" fill="#581c87">multi-location</text>'
                 '<rect x="540" y="90" width="70" height="70" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>'
                 '<text x="575" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#7f1d1d">5. Release</text>'
                 '<text x="575" y="138" text-anchor="middle" font-size="11" fill="#7f1d1d">to farmers</text>'
                 '<line x1="145" y1="125" x2="163" y2="125" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="161,120 161,130 171,125" fill="#475569"/>'
                 '<line x1="270" y1="125" x2="288" y2="125" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="286,120 286,130 296,125" fill="#475569"/>'
                 '<line x1="395" y1="125" x2="413" y2="125" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="411,120 411,130 421,125" fill="#475569"/>'
                 '<line x1="520" y1="125" x2="538" y2="125" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="536,120 536,130 546,125" fill="#475569"/>'
                 '<text x="320" y="230" text-anchor="middle" font-size="13" fill="#14161a">Emasculation + bagging = no unwanted pollen; pure cross.</text>'
                 '<text x="320" y="260" text-anchor="middle" font-size="13" fill="#14161a">Every Green Revolution variety walked this exact path.</text>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">The breeder&#8217;s art: choosing which parents to cross in step 2.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — the semi-dwarf wheat that fed billions.** Borlaug's team crossed a Japanese dwarf wheat (carrying height-reducing genes) with high-yielding American varieties. Selection over generations fixed semi-dwarf stature: short, stiff straw that stands up under heavy grain and fertiliser without lodging (falling over). Released as Sonora 64 and Lerma Rojo, adapted to India and Pakistan, yields doubled — the Green Revolution. One trait (short straw) unlocked the whole yield package."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) List the five steps of plant breeding in order. (2) Why are emasculation and bagging done? (3) Name two Green Revolution varieties and their breeder (Borlaug). (4) What is biofortification — give an example (iron-fortified spinach). (5) Why is germplasm collection step 1 and not an afterthought?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Plant breeding = germplasm + controlled crossing + selection + testing + release. It doubled world food supply once already, and biofortification is its nutrition chapter. **Self-check:** can you name all five steps and explain emasculation?"},
    ],
},
{
    "file": "class-12/biology/strategies-for-food-production/02-single-cell-protein-scp.json",
    "blocks": [
        {"after": "# Single cell protein (SCP)",
         "md": "**Single cell protein** is edible protein from microbes — bacteria, yeast, fungi, algae — grown on cheap substrates (whey, molasses, straw, even petroleum wastes). The name is a marketing choice: 'microbial protein' sounded unappetising. SCP can supply protein without farmland: a 250-kg cow gains ~200 g of protein per day; the same mass of microbes can produce tonnes of protein in hours."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — why microbes as food (study in this order)",
                   ["Step", "Concept", "Key fact"],
                   [["1", "The protein gap", "Growing population vs limited cropland and pasture"],
                    ["2", "Microbes' speed", "Doubling in minutes-hours vs months for animals; huge biomass fast"],
                    ["3", "Cheap substrates", "Whey, molasses, waste starch, methanol — value added to waste"],
                    ["4", "Product", "Protein-rich biomass (60–80% protein dry weight) with vitamins and minerals"],
                    ["5", "Uses", "Human food supplements, animal feed (e.g. Spirulina, Quorn mycoprotein)"],
                    ["6", "Limitations", "Consumer acceptance, nucleic-acid content, quality control"]])},
        {"after": "## 3. Classified tables",
         "table": ("SCP sources — microbe, substrate and product",
                   ["Microbe", "Type", "Substrate", "Product / use"],
                   [["Spirulina", "Cyanobacterium (blue-green alga)", "Open ponds, alkaline water", "Health-food supplement; traditional food (Chad dihe)"],
                    ["Chlorella", "Green alga", "Sunlight + CO2 in ponds", "Protein and vitamin supplement"],
                    ["Saccharomyces / Candida", "Yeasts", "Molasses, whey, petroleum fractions", "Animal feed, baker's/brewer's yeast biomass"],
                    ["Fusarium venenatum", "Filamentous fungus", "Glucose syrup", "Quorn mycoprotein — the commercial SCP success"],
                    ["Methylophilus", "Methylotrophic bacterium", "Methanol", "High-protein feed; ~25 g protein per 100 g growth in hours"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("SCP — waste substrate to protein biomass",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Single cell protein production</text>'
                 '<rect x="60" y="100" width="150" height="70" rx="10" fill="#e7e5e4" stroke="#57534e" stroke-width="2.5"/>'
                 '<text x="135" y="128" text-anchor="middle" font-weight="bold" fill="#44403c">Cheap substrate</text>'
                 '<text x="135" y="150" text-anchor="middle" font-size="12" fill="#44403c">whey, molasses, straw</text>'
                 '<rect x="290" y="85" width="140" height="100" rx="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="360" y="118" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Fermenter</text>'
                 '<text x="360" y="140" text-anchor="middle" font-size="12" fill="#1e3a8a">microbes double</text>'
                 '<text x="360" y="160" text-anchor="middle" font-size="12" fill="#1e3a8a">every few hours</text>'
                 '<line x1="212" y1="135" x2="286" y2="135" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="284,130 284,140 294,135" fill="#475569"/>'
                 '<rect x="500" y="100" width="120" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="560" y="128" text-anchor="middle" font-weight="bold" fill="#14532d">Protein biomass</text>'
                 '<text x="560" y="150" text-anchor="middle" font-size="12" fill="#14532d">60&#8211;80% protein</text>'
                 '<line x1="432" y1="135" x2="496" y2="135" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="494,130 494,140 504,135" fill="#475569"/>'
                 '<text x="180" y="240" font-size="13" fill="#14161a">250-kg cow: ~200 g protein/day.</text>'
                 '<text x="180" y="265" font-size="13" fill="#14161a">Same microbial mass: tonnes/day.</text>'
                 '<text x="500" y="240" font-size="13" fill="#14161a">Uses: animal feed,</text>'
                 '<text x="500" y="265" font-size="13" fill="#14161a">human supplements</text>'
                 '<text x="500" y="290" font-size="13" fill="#14161a">(Spirulina, Quorn).</text>'
                 '<text x="320" y="345" text-anchor="middle" font-size="13" fill="#4b5563">Speed is the whole point: protein without waiting for a cow to grow.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — the speed comparison.** A 250-kg cow adds about 200 g of protein per day. Microbial biomass doubling in ~2 hours means the same 250 kg of microbes, growing exponentially, can produce roughly 25 tonnes of protein in a single day (given substrate and oxygen). That 100,000× speed advantage is the entire argument for SCP — and why it matters most where land, not money, is the constraint."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define SCP and explain the name. (2) Name four microbes used for SCP with their substrates. (3) Why is SCP attractive for food security (speed, substrate, land)? (4) What is Spirulina and who eats it traditionally? (5) List the limitations (acceptance, nucleic acids, quality control)."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** SCP converts cheap waste into protein-rich microbial biomass at speeds no animal can match; Spirulina and Quorn prove it works commercially. **Self-check:** can you state the cow-vs-microbe protein rate comparison?"},
    ],
},
]
