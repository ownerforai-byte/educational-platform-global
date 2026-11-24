# Class 12 Biology — Human Health 04-05, Microbes in Human Welfare 01-02.

PART_B = [
{
    "file": "class-12/biology/human-health-and-diseases/04-vaccination-and-immunization.json",
    "blocks": [
        {"after": "# Vaccination and immunization",
         "md": "A **vaccine** is a preparation of antigen — killed, weakened, fragmented or synthesized — that trains the immune system without causing disease. Immunization is the process of becoming protected. The principle is Edward Jenner's (cowpox → smallpox, 1796): a mild first encounter produces memory cells, so the real pathogen meets a fast, massive secondary response."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — how a vaccine becomes protection (study in this order)",
                   ["Step", "Event", "Result"],
                   [["1", "Vaccine antigen delivered (injection / oral)", "Antigen reaches lymphoid tissue"],
                    ["2", "B and T cells with matching receptors activate", "Clonal expansion"],
                    ["3", "Antibodies produced; antigen cleared", "Mild or no symptoms"],
                    ["4", "Memory B and T cells form", "Long-term armed state"],
                    ["5", "Real pathogen arrives months or years later", "Secondary response in 1–2 days — pathogen destroyed before disease"]])},
        {"after": "## 3. Classified tables",
         "table": ("Types of vaccines — classified with examples",
                   ["Type", "What it contains", "Example", "Notes"],
                   [["Live attenuated", "Weakened living pathogen", "BCG (TB), MMR, oral polio (OPV)", "Strong, long-lasting immunity; caution in immune-suppressed people"],
                    ["Killed / inactivated", "Pathogen killed by heat or chemicals", "Injectable polio (IPV), rabies, whole-cell pertussis", "Safer, but usually needs boosters"],
                    ["Toxoid", "Inactivated toxin", "Tetanus, diphtheria", "Trains the body against the toxin, not the bacterium"],
                    ["Subunit / conjugate", "Purified protein or sugar-protein piece", "Hepatitis B (surface antigen), Hib, pneumococcal", "No live material at all — safest for the immune-compromised"],
                    ["mRNA / vector", "Instructions for cells to make one viral protein", "COVID-19 mRNA vaccines", "Newest class; rapid development"]])},
        {"after": "## 3. Classified tables",
         "table": ("Active vs passive immunization — the two ways to protect",
                   ["Feature", "Active immunization (vaccination)", "Passive immunization"],
                   [["What is given", "Antigen", "Ready-made antibodies"],
                    ["Example", "Polio drops, BCG, tetanus toxoid", "Antivenom for snake bite, antitetanus serum, colostrum IgA"],
                    ["Onset of protection", "Days to weeks (body must respond)", "Immediate"],
                    ["Duration", "Years — memory cells persist", "Short — antibodies decay, no memory"],
                    ["Use case", "Routine prevention", "Emergency after exposure, or people who cannot be vaccinated"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Antibody titre — primary vs secondary response after vaccination",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Why boosters work: antibody level over time</text>'
                 '<line x1="80" y1="300" x2="590" y2="300" stroke="#475569" stroke-width="2"/>'
                 '<line x1="80" y1="300" x2="80" y2="60" stroke="#475569" stroke-width="2"/>'
                 '<text x="60" y="70" font-size="12" fill="#475569">antibody</text>'
                 '<text x="600" y="315" font-size="12" fill="#475569">time</text>'
                 '<line x1="140" y1="300" x2="140" y2="308" stroke="#475569" stroke-width="2"/>'
                 '<text x="140" y="325" text-anchor="middle" font-size="12">1st dose</text>'
                 '<line x1="360" y1="300" x2="360" y2="308" stroke="#475569" stroke-width="2"/>'
                 '<text x="360" y="325" text-anchor="middle" font-size="12">2nd dose</text>'
                 '<path d="M 140 296 C 200 296 210 230 260 230 C 300 230 320 245 350 250" fill="none" stroke="#2563eb" stroke-width="3"/>'
                 '<path d="M 360 250 C 400 248 410 110 470 110 C 510 110 540 130 580 145" fill="none" stroke="#16a34a" stroke-width="3"/>'
                 '<text x="215" y="220" font-size="13" fill="#2563eb">primary: slow, moderate (IgM &#8594; IgG)</text>'
                 '<text x="445" y="100" font-size="13" fill="#14532d">secondary: fast, huge (IgG)</text>'
                 '<text x="320" y="358" text-anchor="middle" font-size="13" fill="#4b5563">Memory cells turn a second encounter into a rapid, massive response.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A child receives DPT at 6, 10 and 14 weeks. The first dose is the primary response — antibodies appear after about a week and fade. The second and third doses act as boosters: each triggers a bigger, faster IgG response and a larger memory pool. That is why the schedule has three doses, and why a tetanus booster every few years keeps protection high. A person stepped on a rusty nail who was never vaccinated gets **antitetanus serum** — passive immunization, immediate but temporary."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define vaccine and immunization. (2) Classify vaccine types with one example each. (3) Distinguish active from passive immunization in four points. (4) Why are boosters needed for killed vaccines but less so for live attenuated ones? (5) Name two diseases of the national immunization schedule (BCG — tuberculosis; OPV — polio)."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Vaccines present antigen safely; the immune system responds, then remembers. Killed and subunit vaccines need boosters; live attenuated ones usually do not; passive immunization is borrowed protection for emergencies. **Self-check:** can you draw the two-curve antibody graph and label primary vs secondary?"},
    ],
},
{
    "file": "class-12/biology/human-health-and-diseases/05-allergy-and-autoimmune-diseases.json",
    "blocks": [
        {"after": "# Allergy and autoimmune diseases",
         "md": "The immune system can fail in two opposite directions. **Allergy** is an over-reaction to a harmless antigen (pollen, dust, food) — IgE-coated mast cells dump histamine. **Autoimmunity** is the loss of self-tolerance: the immune system attacks the body's own tissues (rheumatoid arthritis, Type 1 diabetes). One is an attack on something harmless; the other on something that is self."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the two failures of recognition (study in this order)",
                   ["Step", "Concept", "Key event"],
                   [["1", "Normal tolerance", "Self-reactive lymphocytes deleted or silenced in development"],
                    ["2", "Allergy: false alarm", "IgE made against a harmless allergen; mast cells armed"],
                    ["3", "Re-exposure → degranulation", "Histamine, serotonin released → symptoms"],
                    ["4", "Anaphylactic shock (extreme allergy)", "Whole-body histamine → airway constriction, BP collapse; adrenaline is the rescue drug"],
                    ["5", "Autoimmunity: wrong target", "Self-tolerance breaks; immune attack on own organs"],
                    ["6", "Management", "Allergy: antihistamines, avoid allergen; autoimmunity: immunosuppression"]])},
        {"after": "## 3. Classified tables",
         "table": ("Allergy vs autoimmune disease — classified comparison",
                   ["Feature", "Allergy", "Autoimmune disease"],
                   [["Target", "Harmless external antigen (allergen)", "The body's own cells and tissues"],
                    ["Immune players", "IgE antibodies on mast cells", "Autoantibodies and self-reactive T cells"],
                    ["Mediator", "Histamine, serotonin from mast cell granules", "Chronic inflammation, tissue destruction"],
                    ["Onset", "Minutes after exposure", "Slow, chronic, relapsing"],
                    ["Common examples", "Hay fever, asthma, eczema, peanut allergy", "Rheumatoid arthritis, Type 1 diabetes, Graves' disease, lupus, multiple sclerosis"],
                    ["Treatment logic", "Antihistamines, adrenaline for shock, avoidance", "Immunosuppressant drugs; replace what is lost (insulin)"]])},
        {"after": "## 3. Classified tables",
         "table": ("Major autoimmune diseases — what is attacked and the result",
                   ["Disease", "Target attacked", "Main result"],
                   [["Rheumatoid arthritis", "Joint lining (synovium)", "Painful, swollen, deforming joints"],
                    ["Type 1 (insulin-dependent) diabetes", "Insulin-producing beta cells of pancreas", "No insulin → high blood sugar, insulin injections for life"],
                    ["Graves' disease", "TSH receptor on thyroid", "Overactive thyroid — hyperthyroidism, eye protrusion"],
                    ["Systemic lupus erythematosus", "Widespread nuclear antigens", "Multi-organ inflammation; skin, joints, kidneys"],
                    ["Multiple sclerosis", "Myelin sheath of neurons", "Slowed nerve signals — weakness, vision problems"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Allergic reaction — allergen, IgE, mast cell, histamine",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Mechanism of allergy (first and second exposure)</text>'
                 '<circle cx="120" cy="90" r="22" fill="#c4b5fd" stroke="#6d28d9" stroke-width="2"/>'
                 '<text x="120" y="130" text-anchor="middle" font-size="13">allergen (pollen)</text>'
                 '<ellipse cx="330" cy="150" rx="70" ry="55" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>'
                 '<text x="330" y="145" text-anchor="middle" font-size="13" font-weight="bold">mast cell</text>'
                 '<text x="330" y="165" text-anchor="middle" font-size="12">with IgE on surface</text>'
                 '<line x1="145" y1="95" x2="258" y2="130" stroke="#6d28d9" stroke-width="2"/>'
                 '<polygon points="256,124 266,132 254,138" fill="#6d28d9"/>'
                 '<text x="200" y="105" font-size="12" fill="#6d28d9">IgE arms the cell</text>'
                 '<circle cx="540" cy="150" r="18" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>'
                 '<circle cx="575" cy="190" r="14" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>'
                 '<circle cx="545" cy="230" r="16" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>'
                 '<text x="545" y="270" text-anchor="middle" font-size="13" fill="#b45309">histamine released</text>'
                 '<line x1="402" y1="150" x2="516" y2="150" stroke="#b45309" stroke-width="2"/>'
                 '<polygon points="514,145 514,155 524,150" fill="#b45309"/>'
                 '<text x="330" y="240" text-anchor="middle" font-size="13" fill="#14161a">2nd exposure: allergen bridges IgE &#8594; degranulation</text>'
                 '<text x="120" y="320" font-size="13" fill="#14161a">Effects: sneezing, watery eyes,</text>'
                 '<text x="120" y="342" font-size="13" fill="#14161a">wheezing, hives; shock if severe.</text>'
                 '<text x="450" y="320" font-size="13" fill="#4b5563">Antihistamines block the receptors;</text>'
                 '<text x="450" y="342" font-size="13" fill="#4b5563">adrenaline reverses anaphylaxis.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A teenager wheezes every spring and a skin-prick test raises a red weal within minutes for grass pollen. Mechanism: first exposures made IgE against pollen; the IgE now sits on mast cells in the airway; each spring the allergen bridges two IgE molecules, the mast cell degranulates, and histamine causes bronchoconstriction. Treatment: antihistamine blocks receptors; inhaled steroids calm the chronic inflammation; adrenaline is reserved for anaphylaxis."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define allergy and name the antibody and mediator involved (IgE, histamine). (2) Why is anaphylactic shock dangerous and which drug rescues? (3) Define autoimmunity and give two diseases with the tissue attacked. (4) Contrast allergy and autoimmunity in four points. (5) Which immune failure is an over-reaction and which a loss of tolerance?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Allergy = IgE + mast cells + histamine aimed at a harmless target; autoimmunity = tolerance lost, self attacked. Both are failures of recognition, in opposite directions. **Self-check:** can you name the antibody in allergy and the destroyed cells in Type 1 diabetes?"},
    ],
},
{
    "file": "class-12/biology/microbes-in-human-welfare/01-microorganisms-in-household-products.json",
    "blocks": [
        {"after": "# Microorganisms in household products",
         "md": "Fermentation is household chemistry. *Lactobacillus* turns milk into curd; yeast raises dough and ferments drinks; bacteria and fungi ripen cheese. Every one of these is a microbe digesting sugar and, as a by-product, changing the food — adding flavour, texture, preservation, and in the case of curd, nutrition (vitamin B12)."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — one principle behind every household fermentation (study in this order)",
                   ["Step", "Principle", "Example"],
                   [["1", "Microbes are grown on a sugar-rich food", "Milk lactose, flour starch, fruit juice"],
                    ["2", "They metabolise it anaerobically (or semi-anaerobically)", "Yeast respires without oxygen"],
                    ["3", "The products are acids, alcohol and CO2", "Lactic acid, ethanol, carbon dioxide"],
                    ["4", "The products change the food", "Curd sets, dough rises, drinks fizz"],
                    ["5", "Acid / alcohol also preserve the food", "Low pH inhibits spoilage bacteria"]])},
        {"after": "## 3. Classified tables",
         "table": ("Microbes in household food products — the master table",
                   ["Product", "Microbe used", "What the microbe does"],
                   [["Curd / yoghurt", "Lactobacillus (lactic acid bacteria)", "Converts lactose to lactic acid; acid coagulates milk protein (casein); also increases vitamin B12"],
                    ["Bread, dough", "Saccharomyces cerevisiae (baker's yeast)", "Ferments sugar to CO2; gas bubbles leaven the dough"],
                    ["Idli, dosa batter", "Yeasts + lactic acid bacteria", "Fermentation makes the batter rise and adds sour flavour"],
                    ["Swiss cheese", "Propionibacterium shermanii", "Produces CO2 holes and the characteristic flavour"],
                    ["Roquefort / blue cheese", "Penicillium roqueforti (a fungus)", "Grows through the cheese, ripens it with blue veins and sharp taste"],
                    ["Toddy (traditional drink)", "Yeasts (natural fermentation)", "Ferments sap of palm trees into an alcoholic drink"],
                    ["Dough for dosa kept overnight", "Mixed natural flora", "Souring + leavening in one step"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Milk to curd — lactic acid fermentation at home",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Curd: Lactobacillus converts lactose to lactic acid</text>'
                 '<rect x="70" y="90" width="130" height="90" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="135" y="125" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Milk</text>'
                 '<text x="135" y="150" text-anchor="middle" font-size="13" fill="#1e3a8a">lactose sugar</text>'
                 '<rect x="440" y="90" width="130" height="90" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="505" y="125" text-anchor="middle" font-weight="bold" fill="#14532d">Curd</text>'
                 '<text x="505" y="150" text-anchor="middle" font-size="13" fill="#14532d">set, sour, B12 rich</text>'
                 '<line x1="205" y1="135" x2="435" y2="135" stroke="#475569" stroke-width="3"/>'
                 '<polygon points="433,129 433,141 443,135" fill="#475569"/>'
                 '<text x="320" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#14532d">+ Lactobacillus</text>'
                 '<text x="320" y="132" text-anchor="middle" font-size="13" fill="#475569">lactose &#8594; lactic acid</text>'
                 '<text x="320" y="155" text-anchor="middle" font-size="13" fill="#475569">acid coagulates casein</text>'
                 '<text x="320" y="178" text-anchor="middle" font-size="13" fill="#475569">warmth speeds it (~40&#176;C)</text>'
                 '<text x="135" y="240" font-size="13" fill="#14161a">A spoon of old curd is the</text>'
                 '<text x="135" y="262" font-size="13" fill="#14161a">starter culture (inoculum).</text>'
                 '<text x="440" y="240" font-size="13" fill="#14161a">Low pH also stops spoilage</text>'
                 '<text x="440" y="262" font-size="13" fill="#14161a">bacteria &#8212; natural preservation.</text>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">Same logic: yeast CO2 raises dough, bacteria ripen cheese.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** Milk kept warm with a spoonful of curd sets in 4–6 hours, but the same milk left alone spoils instead. The difference is the **starter**: the inoculum gives lactic acid bacteria a huge head start, so they acidify the milk before spoilage organisms can take over. This is the whole logic of controlled fermentation — the right microbe, first and fast. It also explains why curd is safer than raw milk in places without refrigeration."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Name the microbe and the reaction in curd formation. (2) Why does dough rise — name the gas and the organism. (3) Which microbes ripen Swiss cheese and blue cheese? (4) What is toddy? (5) Why does curd formation improve nutrition (vitamin B12) and safety?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Household fermentation is one principle in many costumes: the right microbe on a sugary food produces acid, alcohol or CO2 that textures, flavours and preserves the product. **Self-check:** can you match all seven products in the master table to their microbes?"},
    ],
},
{
    "file": "class-12/biology/microbes-in-human-welfare/02-industrial-production-of-antibiotics-alcoholic-beverages-citric-acid.json",
    "blocks": [
        {"after": "# Industrial production of antibiotics, alcoholic beverages, citric acid",
         "md": "The same fermentation principle, scaled to tonnes: a **fermenter** (bioreactor) grows the microbe under controlled temperature, pH and aeration, and the product is harvested, purified and marketed. The three NEB exemplars: **penicillin** (the first antibiotic, discovered by Fleming in 1928, mass-produced in WWII), **ethanol** for beverages (*Saccharomyces*), and **citric acid** (*Aspergillus niger*)."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from lab discovery to industrial fermenter (study in this order)",
                   ["Step", "Stage", "What happens"],
                   [["1", "Discovery", "Fleming notices Penicillium killing staphylococci (1928); Florey and Chain purify it (1940s)"],
                    ["2", "Strain selection and improvement", "Highest-yielding strain chosen; mutated for more product"],
                    ["3", "Medium preparation", "Sterilised nutrient broth (sugar, nitrogen, minerals) loaded into the fermenter"],
                    ["4", "Inoculation and growth", "Pure culture added; temperature, pH, oxygen controlled by probes"],
                    ["5", "Production phase", "Microbe secretes the product into the broth (or into cells)"],
                    ["6", "Downstream processing", "Filtration, extraction, purification, drying, quality control, packaging"]])},
        {"after": "## 3. Classified tables",
         "table": ("Industrial products — microbe, substrate and product",
                   ["Product", "Microbe", "Substrate / process", "Use"],
                   [["Penicillin", "Penicillium notatum / chrysogenum (fungus)", "Aerobic fermentation on corn-steep liquor medium", "Antibiotic against Gram-positive bacteria"],
                    ["Ethanol (beer, wine)", "Saccharomyces cerevisiae (yeast)", "Barley malt (beer) or grape juice (wine), anaerobic fermentation", "Alcoholic beverages; industrial ethanol"],
                    ["Citric acid", "Aspergillus niger (fungus)", "Aerobic fermentation on molasses/sugar", "Food preservative, flavouring, soft drinks"],
                    ["Note — antibiotics kill other microbes", "Selected strains yield the most drug per litre", "Fermenter keeps conditions at the optimum", "Downstream purification is half the cost"]])},
        {"after": "## 3. Classified tables",
         "table": ("Inside the fermenter — the parts and their jobs",
                   ["Part", "Job"],
                   [["Stirrer (impeller)", "Mixes the broth evenly; keeps microbes suspended"],
                    ["Sparger / aeration system", "Delivers sterile air or oxygen for aerobic fermentations"],
                    ["Temperature and pH probes", "Keep conditions at the optimum for the strain"],
                    ["Sterile inlet / inoculum port", "Lets the pure culture in without contamination"],
                    ["Harvest outlet / product drain", "Removes broth for downstream processing"],
                    ["Cooling jacket", "Carries away metabolic heat — fermentation is exothermic"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Industrial fermenter — labelled bioreactor",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">A stirred-tank fermenter (bioreactor)</text>'
                 '<rect x="200" y="70" width="160" height="240" rx="20" fill="#dbeafe" stroke="#1d4ed8" stroke-width="3"/>'
                 '<rect x="188" y="70" width="12" height="240" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5"/>'
                 '<rect x="360" y="70" width="12" height="240" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5"/>'
                 '<text x="280" y="200" text-anchor="middle" font-size="13" fill="#1e3a8a">broth + microbes</text>'
                 '<line x1="280" y1="90" x2="280" y2="290" stroke="#475569" stroke-width="4"/>'
                 '<rect x="270" y="120" width="20" height="12" fill="#475569"/>'
                 '<rect x="270" y="200" width="20" height="12" fill="#475569"/>'
                 '<text x="280" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569">stirrer motor</text>'
                 '<line x1="280" y1="66" x2="280" y2="90" stroke="#475569" stroke-width="3"/>'
                 '<line x1="150" y1="250" x2="198" y2="250" stroke="#16a34a" stroke-width="2.5"/>'
                 '<polygon points="196,245 196,255 206,250" fill="#16a34a"/>'
                 '<text x="148" y="240" text-anchor="end" font-size="12" fill="#14532d">sparger: sterile air in</text>'
                 '<line x1="362" y1="290" x2="450" y2="330" stroke="#b45309" stroke-width="2.5"/>'
                 '<polygon points="448,324 448,334 458,330" fill="#b45309"/>'
                 '<text x="462" y="336" font-size="12" fill="#b45309">harvest outlet</text>'
                 '<line x1="374" y1="100" x2="450" y2="80" stroke="#7e22ce" stroke-width="2.5"/>'
                 '<polygon points="448,74 448,84 458,80" fill="#7e22ce"/>'
                 '<text x="462" y="84" font-size="12" fill="#7e22ce">inoculum + probes (pH, temp)</text>'
                 '<text x="120" y="120" font-size="12" fill="#475569">Cooling jacket (blue side</text>'
                 '<text x="120" y="140" font-size="12" fill="#475569">pipes) removes metabolic</text>'
                 '<text x="120" y="160" font-size="12" fill="#475569">heat; stirrer keeps cells</text>'
                 '<text x="120" y="180" font-size="12" fill="#475569">suspended and oxygen</text>'
                 '<text x="120" y="200" font-size="12" fill="#475569">dissolved evenly.</text>'
                 '<text x="320" y="358" text-anchor="middle" font-size="13" fill="#4b5563">Same vessel makes penicillin, ethanol or citric acid &#8212; only microbe and medium change.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — penicillin's scale-up.** Fleming's plate gave a halo of killed bacteria around a *Penicillium* colony, but the yield was tiny. Industrial production needed: (1) a higher-yielding strain (from *P. notatum* to *P. chrysogenum*, then X-ray-mutated strains), (2) a better medium (corn-steep liquor), (3) aerated stirred fermenters, because the mould is aerobic, and (4) downstream extraction. Lesson: a discovery becomes a drug only when the fermenter economics work — strain, medium and engineering all three."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Name the microbe for penicillin, ethanol and citric acid. (2) Draw and label a fermenter. (3) Why must the fermenter be aerated for penicillin but not for ethanol? (4) List the stages from discovery to market. (5) What is downstream processing?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Industrial fermentation = strain + medium + controlled bioreactor + downstream processing. Penicillin (fungus, aerobic), ethanol (yeast, anaerobic) and citric acid (fungus, aerobic) are the three exemplars. **Self-check:** can you label six parts of a fermenter and state each one's job?"},
    ],
},
]
