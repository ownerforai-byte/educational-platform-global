# Class 12 Biology — Human Health and Diseases, topics 01-03.

PART_A = [
{
    "file": "class-12/biology/human-health-and-diseases/01-pathogens-and-diseases-malaria-dengue-filariasis-ascariasis-pneumonia-typhoid-tuberculosis-commo.json",
    "blocks": [
        {"after": "# Pathogens and diseases: malaria, dengue, filariasis, ascariasis, pneumonia, typhoid, tuberculosis, common cold, AIDS, ringworm",
         "md": "A **pathogen** is any organism or agent that causes disease — viruses, bacteria, protozoa, helminth worms and fungi. For every disease in the NEB list you need five facts: the pathogen (with its type), how it spreads, the main symptom, how it is diagnosed, and how it is prevented or treated. The tables below carry all five columns for all ten diseases."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — how any infectious disease is analysed (study in this order)",
                   ["Step", "Question", "Example (malaria)"],
                   [["1", "What is the pathogen?", "Plasmodium — a protozoan parasite"],
                    ["2", "How is it transmitted?", "Bite of female Anopheles mosquito"],
                    ["3", "What does it attack?", "Liver cells, then red blood cells"],
                    ["4", "Main symptoms?", "Recurring fever with shaking chills every 3–4 days"],
                    ["5", "How is it diagnosed?", "Blood smear under the microscope"],
                    ["6", "How is it controlled?", "Antimalarial drugs + mosquito control (drains, nets, sprays)"]])},
        {"after": "## 3. Classified tables",
         "table": ("The ten NEB diseases — master table",
                   ["Disease", "Pathogen (type)", "Transmission", "Key symptom / damage", "Control"],
                   [["Malaria", "Plasmodium vivax / falciparum (protozoan)", "Female Anopheles mosquito bite", "Recurring fever with chills; RBC destruction", "Quinine/antimalarials; mosquito control"],
                    ["Dengue", "Dengue virus (RNA virus)", "Female Aedes aegypti mosquito", "High fever, severe joint-muscle pain, bleeding, platelet drop", "No vaccine for routine use; Aedes control, avoid stagnant water"],
                    ["Filariasis (elephantiasis)", "Wuchereria bancrofti (nematode)", "Culex / Anopheles mosquito bite", "Lymph vessel blockage → gross swelling of limbs/genitals", "Antifilarial drugs; mosquito control"],
                    ["Ascariasis", "Ascaris lumbricoides (roundworm)", "Faecal contamination of food/water; eggs swallowed", "Abdominal pain, blockage of intestinal passage", "Deworming; sanitation"],
                    ["Typhoid", "Salmonella typhi (bacterium)", "Contaminated food and water", "Sustained high fever, weakness, stomach pain, constipation; Widal test", "Chloramphenicol/antibiotics; safe water, sanitation"],
                    ["Pneumonia", "Streptococcus pneumoniae / Haemophilus influenzae (bacteria)", "Inhaling droplets/aerosols", "Alveoli fill with fluid; fever, chills, cough, headache", "Antibiotics; vaccination of children and elderly"],
                    ["Tuberculosis", "Mycobacterium tuberculosis (bacterium)", "Airborne droplets from cough/sneeze", "Chronic cough, weight loss, night sweats; lung damage", "DOTS course of several antibiotics for months; BCG vaccine"],
                    ["Common cold", "Rhinoviruses (group of viruses)", "Droplets and contaminated surfaces", "Nasal congestion, sore throat, cough, sneezing — self-limiting", "Rest and symptomatic care; hygiene"],
                    ["AIDS", "HIV (retrovirus, RNA)", "Sexual contact, infected blood, shared needles, mother-to-child", "Attacks helper T cells → immune failure, opportunistic infections", "No cure; ART drugs slow it; safe practices, screened blood"],
                    ["Ringworm", "Microsporum / Trichophyton (fungi)", "Direct contact, shared towels/clothes", "Dry scaly round lesions with intense itch on skin, scalp, nails", "Antifungal creams; personal hygiene"]])},
        {"after": "## 3. Classified tables",
         "table": ("Pathogens classified by type — what each group is and how it is fought",
                   ["Pathogen type", "Diseases in the list", "Why it matters for treatment"],
                   [["Virus (RNA/DNA)", "Dengue, common cold, AIDS", "Live inside host cells — antibiotics useless; vaccines and antivirals"],
                    ["Bacterium", "Typhoid, pneumonia, tuberculosis", "Antibiotics work; resistance (MDR-TB) is the danger"],
                    ["Protozoan", "Malaria", "Antiprotozoal drugs; vector control is decisive"],
                    ["Helminth (nematode)", "Filariasis, ascariasis", "Anthelmintic drugs; sanitation breaks the cycle"],
                    ["Fungus", "Ringworm", "Antifungals; spreads by contact — hygiene matters"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Plasmodium life cycle — the mosquito is the definitive host",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Life cycle of Plasmodium (malaria)</text>'
                 '<ellipse cx="120" cy="120" rx="55" ry="40" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="120" y="115" text-anchor="middle" font-size="13" font-weight="bold">Human liver</text>'
                 '<text x="120" y="133" text-anchor="middle" font-size="12">sporozoites multiply</text>'
                 '<ellipse cx="120" cy="280" rx="55" ry="40" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="120" y="275" text-anchor="middle" font-size="13" font-weight="bold">Red blood cells</text>'
                 '<text x="120" y="293" text-anchor="middle" font-size="12">rupture &#8594; fever chills</text>'
                 '<line x1="120" y1="162" x2="120" y2="238" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="115,236 125,236 120,246" fill="#475569"/>'
                 '<text x="150" y="205" font-size="12">merozoites</text>'
                 '<ellipse cx="330" cy="280" rx="55" ry="40" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>'
                 '<text x="330" y="275" text-anchor="middle" font-size="13" font-weight="bold">Gametocytes</text>'
                 '<text x="330" y="293" text-anchor="middle" font-size="12">in circulating blood</text>'
                 '<line x1="177" y1="280" x2="273" y2="280" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="271,275 271,285 281,280" fill="#475569"/>'
                 '<ellipse cx="330" cy="120" rx="62" ry="42" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="330" y="112" text-anchor="middle" font-size="13" font-weight="bold">Female Anopheles</text>'
                 '<text x="330" y="130" text-anchor="middle" font-size="12">takes infected blood meal</text>'
                 '<line x1="330" y1="238" x2="330" y2="164" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="325,166 335,166 330,156" fill="#475569"/>'
                 '<text x="360" y="205" font-size="12">gametes taken up</text>'
                 '<line x1="394" y1="120" x2="500" y2="120" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="498,115 498,125 508,120" fill="#475569"/>'
                 '<ellipse cx="545" cy="120" rx="40" ry="30" fill="#e9d5ff" stroke="#7e22ce" stroke-width="2"/>'
                 '<text x="545" y="118" text-anchor="middle" font-size="12" font-weight="bold">Sporozoites</text>'
                 '<text x="545" y="136" text-anchor="middle" font-size="11">in salivary gland</text>'
                 '<line x1="545" y1="152" x2="545" y2="240" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="540,238 550,238 545,248" fill="#475569"/>'
                 '<line x1="545" y1="250" x2="180" y2="100" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="183,104 174,94 190,96" fill="#475569"/>'
                 '<text x="470" y="205" font-size="12" fill="#7e22ce">next bite injects</text>'
                 '<text x="470" y="223" font-size="12" fill="#7e22ce">sporozoites &#8594; new host</text>'
                 '<text x="320" y="360" text-anchor="middle" font-size="13" fill="#4b5563">Sexual cycle in the mosquito; asexual cycle in the human.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — reading a case.** A patient has fever that returns every 48 hours with violent shills, lives near a stagnant pond, and a blood smear shows parasites inside red blood cells. Pathogen: *Plasmodium vivax* (tertian pattern). Vector: female *Anopheles*. Control: antimalarial drug + drain the pond + bed nets. **Exam trap:** only the female mosquito bites (needs blood for eggs); the male feeds on plant sap."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Name the pathogen and vector of malaria, dengue and filariasis — the vectors differ (Anopheles vs Aedes vs Culex). (2) Why is AIDS called a syndrome, not a disease? (3) Why do antibiotics fail against the common cold? (4) Name the diagnostic test for typhoid (Widal) and the disease's bacterium. (5) Which diseases spread by contaminated food/water vs by air vs by vector — classify all ten. (6) What is MDR-TB?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Ten diseases, five pathogen types, three transmission routes: vector-borne (malaria, dengue, filariasis), contaminated food/water (typhoid, ascariasis), airborne/contact (TB, pneumonia, cold, ringworm, AIDS by body fluids). Treatment follows pathogen type. **Self-check:** can you fill the master table's five columns for malaria and AIDS without notes?"},
    ],
},
{
    "file": "class-12/biology/human-health-and-diseases/02-immune-system-innate-and-adaptive-immunity.json",
    "blocks": [
        {"after": "# Immune system — innate and adaptive immunity",
         "md": "The immune system is the body's defence network, arranged in layers. **Innate immunity** is inborn, non-specific and immediate — barriers, phagocytes, inflammation. **Adaptive (acquired) immunity** is specific to each antigen, learns, remembers, and is carried by lymphocytes (B and T cells). Cell-mediated immunity (T cells) kills infected cells; humoral immunity (B cells → antibodies) neutralises free pathogens."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the layers of defence (study in this order)",
                   ["Step", "Layer", "What it does", "Speed"],
                   [["1", "Physical / chemical barriers", "Skin, mucus, cilia, stomach acid, saliva, tears", "Instant — blocks entry"],
                    ["2", "Innate cellular defence", "Neutrophils, macrophages, NK cells phagocytose / kill; inflammation and fever", "Minutes to hours"],
                    ["3", "Humoral adaptive immunity", "B lymphocytes → plasma cells → antibodies neutralise free antigen", "Days on first meeting"],
                    ["4", "Cell-mediated adaptive immunity", "Cytotoxic T cells destroy virus-infected and cancer cells; helper T cells coordinate", "Days on first meeting"],
                    ["5", "Immunological memory", "Memory B and T cells — the basis of vaccination", "Hours on re-exposure"]])},
        {"after": "## 3. Classified tables",
         "table": ("Innate vs adaptive immunity — classified comparison",
                   ["Feature", "Innate immunity", "Adaptive immunity"],
                   [["Origin", "Present from birth", "Develops after exposure to antigen"],
                    ["Specificity", "Non-specific — attacks anything foreign", "Specific to one antigen (epitope)"],
                    ["Memory", "None — same response every time", "Memory cells — faster and stronger on re-exposure"],
                    ["Main players", "Skin, mucus, acid, phagocytes (neutrophils, macrophages), NK cells", "B lymphocytes (antibodies), T lymphocytes (helper, cytotoxic)"],
                    ["Speed", "Immediate", "Slow on first exposure (primary), rapid afterwards (secondary)"],
                    ["Diversity", "Fixed set of receptors", "Millions of antigen receptors by rearrangement"]])},
        {"after": "## 3. Classified tables",
         "table": ("Cells of the immune system — who does what",
                   ["Cell", "Class", "Job"],
                   [["Neutrophil", "Innate, phagocyte", "First responder; engulfs bacteria at wounds"],
                    ["Macrophage", "Innate, phagocyte", "Engulfs debris and pathogens; presents antigen to T cells"],
                    ["Natural killer (NK) cell", "Innate, cytotoxic", "Kills virus-infected and tumour cells without prior exposure"],
                    ["B lymphocyte", "Adaptive, humoral", "Makes antibodies; becomes memory B cell"],
                    ["Helper T cell (CD4)", "Adaptive, coordinator", "Activates B cells and cytotoxic T cells — the cell HIV destroys"],
                    ["Cytotoxic T cell (CD8)", "Adaptive, cell-mediated", "Punches holes in infected / cancerous cells (perforin)"],
                    ["Memory B / T cell", "Adaptive, memory", "Persists for years; drives the fast secondary response"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Three lines of defence — from barrier to memory",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Organised defence: barrier &#8594; innate &#8594; adaptive</text>'
                 '<rect x="60" y="60" width="520" height="70" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="320" y="88" text-anchor="middle" font-weight="bold" fill="#1e3a8a">1st line — barriers (innate, instant)</text>'
                 '<text x="320" y="112" text-anchor="middle" font-size="13" fill="#1e3a8a">skin &#183; mucus &#183; cilia &#183; stomach acid &#183; lysozyme in tears</text>'
                 '<rect x="60" y="155" width="520" height="70" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>'
                 '<text x="320" y="183" text-anchor="middle" font-weight="bold" fill="#854d0e">2nd line — innate cellular (minutes&#8211;hours)</text>'
                 '<text x="320" y="207" text-anchor="middle" font-size="13" fill="#854d0e">phagocytes &#183; NK cells &#183; inflammation &#183; fever</text>'
                 '<rect x="60" y="250" width="250" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="185" y="278" text-anchor="middle" font-weight="bold" fill="#14532d">3rd line A — humoral</text>'
                 '<text x="185" y="302" text-anchor="middle" font-size="13" fill="#14532d">B cells &#8594; antibodies</text>'
                 '<rect x="330" y="250" width="250" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="455" y="278" text-anchor="middle" font-weight="bold" fill="#14532d">3rd line B — cell-mediated</text>'
                 '<text x="455" y="302" text-anchor="middle" font-size="13" fill="#14532d">cytotoxic T cells kill infected cells</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">Both adaptive arms leave memory cells &#8212; the principle behind vaccination.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A splinter enters the skin. Barriers fail (step 1). Neutrophils and macrophages arrive within hours; the area reddens and swells — inflammation (step 2). Macrophages present antigen to helper T cells, which activate B cells; antibodies appear after ~5–7 days (step 3). Cytotoxic T cells clear any infected cells (step 4). Memory cells persist — a second splinter with the same bacteria is cleared in 1–2 days (step 5)."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Differentiate innate and adaptive immunity in five points. (2) Name the two arms of adaptive immunity and their effector cells. (3) Which cell does HIV attack and why does that collapse the whole adaptive response? (4) What is cell-mediated immunity — give one situation where it matters (transplant rejection, tumour surveillance). (5) Define immunological memory."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Defence is layered: instant barriers, fast non-specific innate cells, then specific adaptive humoral and cell-mediated arms that remember. Vaccination works because of that memory. **Self-check:** can you place neutrophil, B cell, helper T cell and NK cell in the right layer from memory?"},
    ],
},
{
    "file": "class-12/biology/human-health-and-diseases/03-antigens-and-antibodies-immune-response.json",
    "blocks": [
        {"after": "# Antigens and antibodies, immune response",
         "md": "An **antigen** is any substance that the immune system recognises as foreign and reacts against (toxin, protein on a pathogen surface, pollen). An **antibody (immunoglobulin)** is the Y-shaped protein a plasma B cell secretes to bind that antigen specifically. Antibodies never kill directly — they tag: neutralise toxins, coat pathogens for phagocytes (opsonisation), clump them (agglutination), or trigger complement."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from antigen encounter to immune memory (study in this order)",
                   ["Step", "Event", "Key cell / molecule"],
                   [["1", "Antigen enters and is captured", "Macrophage / dendritic cell presents it"],
                    ["2", "Helper T cell activates the right clone", "CD4 helper T + interleukins"],
                    ["3", "B cells divide into plasma cells", "Clonal selection and expansion"],
                    ["4", "Antibodies flood the blood (primary response)", "IgM first, then IgG"],
                    ["5", "Antigen cleared; most plasma cells die", "Feedback shuts the response off"],
                    ["6", "Memory B and T cells persist", "Years of protection"],
                    ["7", "Re-exposure → fast, massive secondary response", "IgG dominated, no illness"]])},
        {"after": "## 3. Classified tables",
         "table": ("The five antibody classes — classified by structure and role",
                   ["Class", "Structure", "Where found", "Main role"],
                   [["IgG", "Monomer", "Blood, tissue fluid, crosses placenta", "Main defender of secondary response; gives newborn passive immunity"],
                    ["IgM", "Pentamer (5 Y units)", "Blood — first on the scene", "First antibody of the primary response; powerful agglutinator"],
                    ["IgA", "Dimer (2 Y units)", "Tears, saliva, milk, gut mucus", "Mucosal defence; protects the newborn via colostrum"],
                    ["IgE", "Monomer", "Mast cells and basophils", "Allergy and anti-parasite response; triggers histamine release"],
                    ["IgD", "Monomer", "B cell surface", "B cell receptor — antigen recognition"]])},
        {"after": "## 3. Classified tables",
         "table": ("Primary vs secondary immune response; active vs passive immunity",
                   ["Feature", "Primary response", "Secondary response"],
                   [["Trigger", "First meeting with the antigen", "Re-exposure to the same antigen"],
                    ["Lag period", "5–7 days or more", "1–2 days"],
                    ["Main antibody", "IgM, then some IgG", "Massive IgG"],
                    ["Magnitude", "Moderate, short-lived", "Much larger, long-lasting"],
                    ["Driving cells", "Naive B cells", "Memory B cells"],
                   ],
                   [["Feature", "Active immunity", "Passive immunity"],
                    ["How obtained", "Own immune system makes antibodies (infection or vaccine)", "Ready-made antibodies given (colostrum, antivenom, maternal transfer)"],
                    ["Onset", "Slow", "Immediate"],
                    ["Duration", "Years — memory persists", "Days to weeks — no memory"],
                    ["Example", "Post-vaccination immunity to polio", "Antitetanus serum after an injury"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Antibody structure — the Y-shaped immunoglobulin, labelled",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Antibody (IgG) — two heavy + two light chains</text>'
                 '<line x1="240" y1="110" x2="300" y2="200" stroke="#1d4ed8" stroke-width="10" stroke-linecap="round"/>'
                 '<line x1="400" y1="110" x2="340" y2="200" stroke="#1d4ed8" stroke-width="10" stroke-linecap="round"/>'
                 '<line x1="300" y1="200" x2="300" y2="310" stroke="#1d4ed8" stroke-width="10" stroke-linecap="round"/>'
                 '<line x1="340" y1="200" x2="340" y2="310" stroke="#1d4ed8" stroke-width="10" stroke-linecap="round"/>'
                 '<line x1="262" y1="146" x2="378" y2="146" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>'
                 '<line x1="282" y1="178" x2="358" y2="178" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>'
                 '<circle cx="240" cy="103" r="9" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>'
                 '<circle cx="400" cy="103" r="9" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>'
                 '<text x="222" y="80" text-anchor="middle" font-size="13" fill="#b45309">antigen binds here</text>'
                 '<text x="418" y="80" text-anchor="middle" font-size="13" fill="#b45309">antigen binds here</text>'
                 '<text x="170" y="150" text-anchor="end" font-size="13" fill="#1e3a8a">heavy chains (blue)</text>'
                 '<text x="470" y="150" font-size="13" fill="#14532d">light chains (green)</text>'
                 '<text x="470" y="250" font-size="13" fill="#475569">Variable region: tips of the Y,</text>'
                 '<text x="470" y="270" font-size="13" fill="#475569">shape matches one antigen.</text>'
                 '<text x="470" y="300" font-size="13" fill="#475569">Constant region: stem &#8212;</text>'
                 '<text x="470" y="320" font-size="13" fill="#475569">attaches to phagocytes, complement.</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">Disulphide bonds hold the four chains together.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — reading an antibody titre.** A patient's blood shows high IgM against a virus but almost no IgG: the infection is **new** (primary response). A second sample two weeks later shows IgM falling and IgG rising steeply: the patient is clearing the infection and has gained memory. If the first sample already had high IgG with no IgM, the infection was old or the patient was vaccinated — IgG tells history, IgM tells news."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Draw and label the Y-shaped antibody (heavy, light, variable, constant). (2) Match the five immunoglobulin classes to their locations and roles. (3) Compare primary and secondary response (lag, magnitude, antibody class). (4) Active vs passive immunity with one example each. (5) Why does IgG crossing the placenta matter for the newborn?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Antigens trigger clonal selection; antibodies are specific Y-shaped tags with five classes (GAMED) each suited to a compartment and a job. The primary response is slow IgM; the secondary is fast massive IgG from memory cells. **Self-check:** can you sketch the antibody and name which class responds first?"},
    ],
},
]
