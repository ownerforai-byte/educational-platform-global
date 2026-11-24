# Class 12 Biology — Organisms and Environment (ecology), topics 01-06.

PART_A = [
{
    "file": "class-12/biology/organisms-and-environment/01-adaptations-of-organisms-to-environmental-conditions.json",
    "blocks": [
        {"after": "# Adaptations of organisms to environmental conditions",
         "md": "An **adaptation** is any heritable trait — structural, physiological or behavioural — that improves an organism's survival and reproduction in its habitat. Natural selection builds them over generations: desert plants, high-altitude humans and deep-sea fish all carry solutions to the same problem (living where conditions are harsh) reached by different routes."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — how organisms cope with their habitat (study in this order)",
                   ["Step", "Concept", "Classic example"],
                   [["1", "Habitat sets the problems", "Desert: heat + water scarcity; altitude: low O2"],
                    ["2", "Morphological adaptation", "Cactus leaves reduced to spines; thick cuticle"],
                    ["3", "Physiological adaptation", "Kangaroo rat makes metabolic water; haemoglobin count rises at altitude"],
                    ["4", "Behavioural adaptation", "Desert lizards bask in sun when cold, hide in shade when hot"],
                    ["5", "Photosynthetic specialisation", "CAM plants open stomata at night (Opuntia, pineapple)"],
                    ["6", "Mimicry and escape", "Moths camouflaged on bark; desert animals active at night"]])},
        {"after": "## 3. Classified tables",
         "table": ("Adaptations classified by type — with the exam examples",
                   ["Type", "Meaning", "Examples"],
                   [["Morphological (structural)", "Body form and parts", "Xerophytes: thick cuticle, sunken stomata, spines; hydrophytes: flat floating leaves, aerenchyma"],
                    ["Physiological (functional)", "Internal chemistry and metabolism", "CAM photosynthesis (stomata open at night); kangaroo rat's concentrated urine; increased RBC count at altitude"],
                    ["Behavioural", "What the animal does", "Nocturnality in desert animals; lizard thermoregulation; migration of birds"],
                    ["Reproductive", "Timing and mode of breeding", "Desert plants bloom after rare rains; bamboo's mass flowering"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Desert plant adaptation — cactus, labelled",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Xerophyte adaptations (Opuntia)</text>'
                 '<rect x="250" y="90" width="70" height="200" rx="30" fill="#bbf7d0" stroke="#16a34a" stroke-width="3"/>'
                 '<line x1="240" y1="120" x2="215" y2="100" stroke="#166534" stroke-width="3"/>'
                 '<line x1="330" y1="140" x2="355" y2="120" stroke="#166534" stroke-width="3"/>'
                 '<line x1="240" y1="200" x2="215" y2="180" stroke="#166534" stroke-width="3"/>'
                 '<line x1="330" y1="230" x2="355" y2="210" stroke="#166534" stroke-width="3"/>'
                 '<line x1="240" y1="260" x2="215" y2="240" stroke="#166534" stroke-width="3"/>'
                 '<line x1="285" y1="290" x2="285" y2="330" stroke="#a16207" stroke-width="8"/>'
                 '<text x="285" y="350" text-anchor="middle" font-size="13" fill="#a16207">extensive roots reach deep water</text>'
                 '<text x="140" y="130" text-anchor="end" font-size="13" fill="#166534">leaves = spines</text>'
                 '<text x="140" y="150" text-anchor="end" font-size="13" fill="#166534">(no water loss)</text>'
                 '<text x="430" y="130" font-size="13" fill="#166534">thick fleshy stem stores water</text>'
                 '<text x="430" y="160" font-size="13" fill="#166534">green stem does photosynthesis</text>'
                 '<text x="430" y="200" font-size="13" fill="#475569">CAM: stomata open only at</text>'
                 '<text x="430" y="222" font-size="13" fill="#475569">night &#8212; CO2 stored as acid,</text>'
                 '<text x="430" y="244" font-size="13" fill="#475569">used in daylight with closed</text>'
                 '<text x="430" y="266" font-size="13" fill="#475569">stomata to save water.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — the kangaroo rat.** It lives in deserts without drinking water. Solutions: (1) physiological — its kidneys produce urine far more concentrated than ours; (2) metabolic — water released when fats are oxidised covers its needs; (3) behavioural — it stays in a cool burrow by day and feeds at night, cutting evaporative loss. One animal, three adaptation types: exactly the classification the exam asks for."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define adaptation and classify it into three types with examples. (2) Explain CAM photosynthesis and why it suits deserts. (3) How do desert lizards regulate body temperature behaviourally? (4) Compare xerophytic and hydrophytic leaf features. (5) Why do people at high altitude have more haemoglobin?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Adaptations are heritable solutions to habitat problems, classified as morphological, physiological or behavioural. The same environmental pressure can produce different answers in different lineages. **Self-check:** for cactus, kangaroo rat and mountain human, can you name the adaptation type each example illustrates?"},
    ],
},
{
    "file": "class-12/biology/organisms-and-environment/02-population-ecology-growth-regulation-interactions.json",
    "blocks": [
        {"after": "# Population ecology — growth, regulation, interactions",
         "md": "A **population** is a group of individuals of one species in one place and time. Its size (N) changes by four processes: natality (+), mortality (−), immigration (+), emigration (−). Growth follows two models — unlimited **exponential** growth or **logistic** growth limited by carrying capacity (K). Populations also interact: competition, predation, parasitism, commensalism, mutualism and amensalism."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from population size to interaction types (study in this order)",
                   ["Step", "Concept", "Key equation / example"],
                   [["1", "Population attributes", "N = size; density; birth rate, death rate; sex ratio; age pyramids"],
                    ["2", "Four processes change N", "Natality + immigration − mortality − emigration"],
                    ["3", "Exponential growth (unlimited resources)", "dN/dt = rN; J-shaped curve"],
                    ["4", "Logistic growth (real world)", "dN/dt = rN(K − N)/K; S-shaped curve"],
                    ["5", "Carrying capacity K", "Maximum sustainable population for the habitat"],
                    ["6", "Regulation", "Density-dependent factors (disease, competition) pull N back toward K"],
                    ["7", "Interspecific interactions", "Six pairs — see the classified table below"]])},
        {"after": "## 3. Classified tables",
         "table": ("Population interactions — who wins and who loses",
                   ["Interaction", "Species A", "Species B", "Example"],
                   [["Mutualism", "+", "+", "Mycorrhiza and plant; lichen alga + fungus; fig and wasp"],
                    ["Commensalism", "+", "0", "Cattle egret and cattle; barnacles on whale"],
                    ["Predation", "+", "−", "Tiger and deer; also herbivores on plants"],
                    ["Parasitism", "+", "−", "Flea on dog; Plasmodium in human; cuckoo brood parasitism"],
                    ["Competition", "−", "−", "Gause's Paramecium experiment; invasive species ousting natives"],
                    ["Amensalism", "0", "−", "Penicillium inhibits bacteria; shading by a large tree"]])},
        {"after": "## 3. Classified tables",
         "table": ("Exponential vs logistic growth; r- vs K-strategists",
                   ["Feature", "Exponential (J-curve)", "Logistic (S-curve)"],
                   [["Resources", "Unlimited (never true for long)", "Limited — the real world"],
                    ["Equation", "dN/dt = rN", "dN/dt = rN(K − N)/K"],
                    ["Final outcome", "Explosion, then crash", "Stabilises at carrying capacity K"],
                    ["Example", "Bacteria in fresh broth; reindeer introduced to island"],
                   ],
                   [["Feature", "r-strategist", "K-strategist"],
                    ["Body size and lifespan", "Small, short-lived", "Larger, long-lived"],
                    ["Offspring", "Many, tiny, no care", "Few, large, parental care"],
                    ["Population stability", "Boom-and-bust", "Near K"],
                    ["Examples", "Insects, weeds, mice", "Elephant, oak, human"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Logistic growth — the S-curve and carrying capacity K",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Logistic growth curve</text>'
                 '<line x1="90" y1="310" x2="590" y2="310" stroke="#475569" stroke-width="2"/>'
                 '<line x1="90" y1="310" x2="90" y2="60" stroke="#475569" stroke-width="2"/>'
                 '<text x="70" y="72" font-size="12" fill="#475569">N</text>'
                 '<text x="600" y="325" font-size="12" fill="#475569">time</text>'
                 '<line x1="90" y1="120" x2="590" y2="120" stroke="#dc2626" stroke-width="2" stroke-dasharray="7 5"/>'
                 '<text x="480" y="108" font-size="14" fill="#dc2626">carrying capacity K</text>'
                 '<path d="M 90 305 C 200 300 260 260 320 200 C 380 145 460 122 580 118" fill="none" stroke="#16a34a" stroke-width="3.5"/>'
                 '<text x="170" y="270" font-size="13" fill="#14532d">lag phase</text>'
                 '<text x="300" y="185" font-size="13" fill="#14532d">log phase (fastest)</text>'
                 '<text x="470" y="170" font-size="13" fill="#14532d">stationary phase at K</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">dN/dt = rN(K &#8722; N)/K &#8212; growth slows as N approaches K.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — Gause's competition.** Two *Paramecium* species grown together in one tube: *P. aurelia* outgrows *P. caudatum*, which dies out — **competitive exclusion**: two species with the same niche cannot coexist. In nature the loser survives by **resource partitioning** (different microhabitat, different feeding time). This one experiment explains why invasive species are so destructive: they occupy the native species' niche without its predators."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define population and list the four processes that change its size. (2) Write both growth equations and draw both curves. (3) Define carrying capacity. (4) Tabulate the six interactions with signs (+/−/0) and one example each. (5) Explain competitive exclusion and resource partitioning. (6) Contrast r- and K-strategists."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Population size is a balance of four flows; growth is J-shaped without limits and S-shaped with them; six interaction types (+/−/0) structure every community. **Self-check:** can you assign the correct +/−/0 signs to all six interactions and name one example for each?"},
    ],
},
{
    "file": "class-12/biology/organisms-and-environment/03-ecosystem-structure-and-function-productivity-decomposition.json",
    "blocks": [
        {"after": "# Ecosystem structure and function — productivity, decomposition",
         "md": "An **ecosystem** is the functional unit combining the living community and its non-living environment, with energy flow and nutrient cycling linking them. Four functional processes run it: productivity, decomposition, energy flow and nutrient cycling. Energy enters as sunlight, flows one way, and is lost as heat at every transfer — which is why nutrients must be recycled but energy never is."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — the four functions of an ecosystem (study in this order)",
                   ["Step", "Function", "Essence"],
                   [["1", "Productivity", "Producers fix solar energy as organic matter (GPP → NPP)"],
                    ["2", "Decomposition", "Dead matter broken back into minerals — the recycling step"],
                    ["3", "Energy flow", "One-way: sun → producers → consumers, 10% transferred per level"],
                    ["4", "Nutrient cycling", "Minerals return to the soil and are reused — cyclic, unlike energy"]])},
        {"after": "## 3. Classified tables",
         "table": ("Ecosystem components and productivity — classified",
                   ["Category", "Members", "Role"],
                   [["Producers (autotrophs)", "Plants, algae, cyanobacteria", "Fix solar energy into organic matter"],
                    ["Consumers", "Herbivores (primary), carnivores (secondary/tertiary)", "Eat other organisms for energy"],
                    ["Decomposers", "Bacteria, fungi", "Break dead matter into minerals — complete the cycle"],
                    ["Abiotic components", "Light, temperature, water, soil, minerals", "Physical setting and material reservoir"],
                    ["GPP (gross primary productivity)", "Total fixed by producers", "All the energy captured"],
                    ["NPP (net primary productivity)", "GPP − respiration (R)", "What is actually available to consumers; NPP = GPP − R"],
                    ["Secondary productivity", "Consumers' new biomass", "Energy converted into consumer tissue"]])},
        {"after": "## 3. Classified tables",
         "table": ("Decomposition — the five steps in order",
                   ["Step", "What happens", "Example"],
                   [["1. Fragmentation", "Detritivores break litter into small particles", "Earthworms, termites chew leaf litter"],
                    ["2. Leaching", "Water dissolves soluble compounds downward", "Sugars washed out of litter into soil"],
                    ["3. Catabolism", "Microbial enzymes chemically degrade the matter", "Fungal and bacterial secretions"],
                    ["4. Humification", "Dark amorphous humus forms", "Resistant, slow-decomposing store"],
                    ["5. Mineralisation", "Humus further degraded to simple minerals", "NH4+, PO4 3−, CO2 released for plants"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Energy flow — one-way passage with decomposers closing the nutrient loop",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Ecosystem energy flow</text>'
                 '<circle cx="90" cy="90" r="28" fill="#fde68a" stroke="#b45309" stroke-width="2"/>'
                 '<text x="90" y="135" text-anchor="middle" font-size="13">sunlight</text>'
                 '<rect x="190" y="70" width="120" height="60" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="250" y="98" text-anchor="middle" font-weight="bold" fill="#14532d">Producers</text>'
                 '<text x="250" y="118" text-anchor="middle" font-size="12" fill="#14532d">plants</text>'
                 '<rect x="380" y="70" width="120" height="60" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="440" y="98" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Herbivores</text>'
                 '<text x="440" y="118" text-anchor="middle" font-size="12" fill="#1e3a8a">deer, cattle</text>'
                 '<rect x="380" y="180" width="120" height="60" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="440" y="208" text-anchor="middle" font-weight="bold" fill="#7f1d1d">Carnivores</text>'
                 '<text x="440" y="228" text-anchor="middle" font-size="12" fill="#7f1d1d">tiger, hawk</text>'
                 '<line x1="122" y1="95" x2="186" y2="95" stroke="#b45309" stroke-width="2.5"/>'
                 '<polygon points="184,90 184,100 194,95" fill="#b45309"/>'
                 '<line x1="310" y1="100" x2="376" y2="100" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="374,95 374,105 384,100" fill="#475569"/>'
                 '<line x1="440" y1="132" x2="440" y2="176" stroke="#475569" stroke-width="2.5"/>'
                 '<polygon points="435,174 445,174 440,184" fill="#475569"/>'
                 '<rect x="190" y="250" width="120" height="60" rx="10" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2"/>'
                 '<text x="250" y="278" text-anchor="middle" font-weight="bold" fill="#581c87">Decomposers</text>'
                 '<text x="250" y="298" text-anchor="middle" font-size="12" fill="#581c87">bacteria, fungi</text>'
                 '<line x1="380" y1="120" x2="314" y2="262" stroke="#9ca3af" stroke-width="2" stroke-dasharray="6 4"/>'
                 '<line x1="380" y1="230" x2="314" y2="278" stroke="#9ca3af" stroke-width="2" stroke-dasharray="6 4"/>'
                 '<line x1="250" y1="248" x2="250" y2="134" stroke="#7e22ce" stroke-width="2" stroke-dasharray="6 4"/>'
                 '<polygon points="245,136 255,136 250,126" fill="#7e22ce"/>'
                 '<text x="140" y="195" font-size="12" fill="#581c87">minerals recycled</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">Energy flows ONE way (lost as heat); nutrients cycle back.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — the productivity budget.** A grassland fixes GPP = 20,000 kJ/m²/yr; the plants respire 7,000. NPP = GPP − R = 13,000 kJ/m²/yr — only this is available to herbivores. Of that, roughly 10% reaches the herbivore level (~1,300), 10% of that the carnivore level (~130). This single calculation explains why big predators are rare: the energy simply runs out as you climb the trophic ladder."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define ecosystem and list its four functions. (2) GPP, NPP and the relation NPP = GPP − R. (3) List the five steps of decomposition in order. (4) Why is energy flow one-way but nutrient cycling cyclic? (5) Which organisms are decomposers and why are they indispensable?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** The ecosystem runs on four functions: producers fix energy, decomposers recycle matter, energy flows one-way at ~10% per level, nutrients cycle endlessly. **Self-check:** can you compute NPP from GPP and R, and place the five decomposition steps in order?"},
    ],
},
{
    "file": "class-12/biology/organisms-and-environment/04-ecological-succession.json",
    "blocks": [
        {"after": "# Ecological succession",
         "md": "**Ecological succession** is the predictable, directional change in the species composition of a community over time, ending in a stable **climax community** matched to the climate. It starts from bare rock (primary) or from a disturbed site with soil intact (secondary). The sequence of temporary communities is the **sere**; the first colonisers are **pioneers**."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from bare ground to climax (study in this order)",
                   ["Step", "Stage", "What changes"],
                   [["1", "Nudation", "Disturbance creates a bare area (lava, flood, fire, landslide)"],
                    ["2", "Pioneer colonisation", "Lichens (rock) or hardy weeds (soil) arrive; soil begins to form"],
                    ["3", "Sere progression", "Moss → grass → shrub → young forest: each stage modifies the habitat for the next"],
                    ["4", "Climax community", "Stable, self-perpetuating community set by the climate (e.g. forest)"],
                    ["5", "Trends throughout", "Biomass, species diversity and niche specialisation all increase; net productivity rises then stabilises"]])},
        {"after": "## 3. Classified tables",
         "table": ("Primary vs secondary succession; hydrarch vs xerarch",
                   ["Feature", "Primary succession", "Secondary succession"],
                   [["Starting point", "Bare rock, lava, sand — no soil", "Disturbed site with soil intact (burnt forest, abandoned field)"],
                    ["Pioneers", "Lichens, mosses", "Grasses, weeds from surviving seeds"],
                    ["Speed", "Very slow (thousands of years — soil must form)", "Fast (decades — soil already there)"],
                    ["Example", "Lava flow colonised on Hawaii", "Farmland abandoned in Nepal's middle hills"],
                   ],
                   [["Feature", "Hydrarch (hydrosere)", "Xerarch (xerosere)"],
                    ["Starts in", "Water — pond, lake", "Dry rock, desert"],
                    ["Pioneers", "Phytoplankton → submerged plants", "Lichens on bare rock"],
                    ["Direction", "Community builds soil upward toward forest", "Community builds soil toward forest"],
                    ["Climax", "Forest (mesic)", "Forest (mesic) — both converge on the same climax"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Succession stages — pioneers to climax forest",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">The sere: each stage prepares the next</text>'
                 '<rect x="60" y="230" width="90" height="60" fill="#d6d3d1" stroke="#78716c" stroke-width="2"/>'
                 '<text x="105" y="315" text-anchor="middle" font-size="13">bare rock</text>'
                 '<rect x="170" y="215" width="90" height="75" fill="#a8a29e" stroke="#57534e" stroke-width="2"/>'
                 '<text x="215" y="315" text-anchor="middle" font-size="13">lichens, moss</text>'
                 '<rect x="280" y="195" width="90" height="95" fill="#bef264" stroke="#65a30d" stroke-width="2"/>'
                 '<text x="325" y="315" text-anchor="middle" font-size="13">grassland</text>'
                 '<rect x="390" y="160" width="90" height="130" fill="#86efac" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="435" y="315" text-anchor="middle" font-size="13">shrubland</text>'
                 '<rect x="500" y="100" width="90" height="190" fill="#22c55e" stroke="#15803d" stroke-width="2"/>'
                 '<text x="545" y="315" text-anchor="middle" font-size="13">climax forest</text>'
                 '<line x1="105" y1="100" x2="545" y2="80" stroke="#475569" stroke-width="0"/>'
                 '<line x1="150" y1="180" x2="170" y2="180" stroke="#475569" stroke-width="0"/>'
                 '<text x="320" y="70" text-anchor="middle" font-size="14" fill="#475569">soil deepens &#8594; biomass and diversity rise &#8594; stability increases</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">Every arrow is species replacing species until the climate-set climax.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A lava flow cools to bare basalt. Lichens secrete acids, etching the rock and trapping dust — the first soil. Mosses follow, then grasses, then shrubs, then trees; each stage adds organic matter and holds more water, making the site habitable for the next, larger species. Centuries later: forest. **Key insight:** succession is driven by the community modifying its own environment — the pioneers are engineers of their own replacement."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define succession, sere, pioneer and climax. (2) Contrast primary and secondary succession in four points. (3) Compare hydrarch and xerarch seres and note they converge on the same climax. (4) Name the pioneer of xerosere (lichens) and of hydrosere (phytoplankton). (5) State the trends: biomass, diversity, productivity."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Succession is directional community change driven by habitat modification, from pioneer to climax; primary starts without soil and is slow, secondary with soil and is fast; water-started and rock-started seres both end in mesic forest. **Self-check:** can you list five sere stages in order for a bare rock?"},
    ],
},
{
    "file": "class-12/biology/organisms-and-environment/05-nutrient-cycling-carbon-nitrogen-phosphorus.json",
    "blocks": [
        {"after": "# Nutrient cycling — carbon, nitrogen, phosphorus",
         "md": "Nutrient cycling (biogeochemical cycling) returns matter from organisms to the environment and back. Cycles are **gaseous** (reservoir in the atmosphere — carbon, nitrogen) or **sedimentary** (reservoir in rocks and soil — phosphorus, sulphur). The nitrogen cycle is the one with named bacterial specialists; the carbon cycle is the one we are now disturbing; the phosphorus cycle has no gas phase at all."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — how any nutrient cycle is read (study in this order)",
                   ["Step", "Question to ask", "Nitrogen example"],
                   [["1", "Where is the main reservoir?", "Atmosphere (78% N2)"],
                    ["2", "How does it enter living systems?", "Nitrogen fixation by bacteria"],
                    ["3", "How does it move through the food web?", "Assimilation → plants → animals"],
                    ["4", "How is it returned?", "Ammonification from dead matter and excreta"],
                    ["5", "How is it made reusable?", "Nitrification to nitrate — the form plants take up"],
                    ["6", "How does it leave the biosphere?", "Denitrification back to N2 gas"]])},
        {"after": "## 3. Classified tables",
         "table": ("Carbon vs nitrogen vs phosphorus — the three cycles compared",
                   ["Feature", "Carbon cycle", "Nitrogen cycle", "Phosphorus cycle"],
                   [["Reservoir", "Atmosphere CO2 + fossil fuels + limestone", "Atmosphere N2 (78%)", "Rocks and phosphate ores — SEDIMENTARY"],
                    ["Gas phase", "Yes (CO2, CH4)", "Yes (N2)", "None — no gaseous form"],
                    ["Entry to life", "Photosynthesis fixes CO2", "Nitrogen fixation by bacteria", "Weathering releases phosphate to soil"],
                    ["Key microbes", "—", "Rhizobium, Nitrosomonas, Nitrobacter, Pseudomonas", "Mycorrhiza helps uptake"],
                    ["Human disturbance", "Fossil fuel burning → rising CO2", "Fertiliser overuse → eutrophication", "Mining + detergent runoff → algal blooms"],
                    ["Speed", "Fast (living) + slow (fossil)", "Fast through life, slow in soil pools", "Slowest of the three"]])},
        {"after": "## 3. Classified tables",
         "table": ("The nitrogen cycle — each step and its named bacterium",
                   ["Step", "Change", "Organism"],
                   [["Nitrogen fixation", "N2 → NH3 / NH4+", "Rhizobium (nodules), Azotobacter (free-living), cyanobacteria"],
                    ["Assimilation", "NH4+ / NO3− built into amino acids", "Plants, then animals via food"],
                    ["Ammonification", "Proteins of dead matter and urea → NH3", "Decomposer bacteria and fungi"],
                    ["Nitrification (1)", "NH3 / NH4+ → NO2−", "Nitrosomonas"],
                    ["Nitrification (2)", "NO2− → NO3−", "Nitrobacter"],
                    ["Denitrification", "NO3− → N2 gas (lost to air)", "Pseudomonas and anaerobic bacteria"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Nitrogen cycle — simplified with the named bacteria",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">The nitrogen cycle</text>'
                 '<ellipse cx="320" cy="90" rx="90" ry="34" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="320" y="86" text-anchor="middle" font-weight="bold" fill="#1e3a8a">N2 atmosphere</text>'
                 '<text x="320" y="104" text-anchor="middle" font-size="12" fill="#1e3a8a">(78% of air)</text>'
                 '<rect x="230" y="220" width="180" height="60" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="320" y="245" text-anchor="middle" font-weight="bold" fill="#14532d">Soil: NH4+ / NO2&#8722; / NO3&#8722;</text>'
                 '<text x="320" y="265" text-anchor="middle" font-size="12" fill="#14532d">plants take up nitrate</text>'
                 '<rect x="60" y="130" width="130" height="46" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>'
                 '<text x="125" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#854d0e">fixation</text>'
                 '<text x="125" y="167" text-anchor="middle" font-size="11" fill="#854d0e">Rhizobium, Azotobacter</text>'
                 '<line x1="192" y1="153" x2="248" y2="218" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="243,215 250,224 254,214" fill="#475569"/>'
                 '<rect x="450" y="130" width="130" height="46" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="515" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#7f1d1d">denitrification</text>'
                 '<text x="515" y="167" text-anchor="middle" font-size="11" fill="#7f1d1d">Pseudomonas</text>'
                 '<line x1="412" y1="230" x2="470" y2="180" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="466,184 474,176 476,186" fill="#475569"/>'
                 '<line x1="515" y1="128" x2="380" y2="102" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="382,106 372,98 370,108" fill="#475569"/>'
                 '<text x="470" y="240" font-size="12" fill="#475569">nitrification:</text>'
                 '<text x="470" y="258" font-size="12" fill="#475569">Nitrosomonas &#8594; Nitrobacter</text>'
                 '<text x="80" y="240" font-size="12" fill="#475569">ammonification from</text>'
                 '<text x="80" y="258" font-size="12" fill="#475569">dead matter and excreta</text>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">Fixation brings N in; denitrification sends it back &#8212; a balanced loop.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example — why legumes enrich soil.** A farmer rotates maize with beans. The bean roots host *Rhizobium* in nodules; the bacteria fix atmospheric N2 into ammonia the plant builds into protein. After harvest the residues decompose (ammonification), nitrifiers convert the nitrogen to nitrate, and the next maize crop takes it up. The farmer bought nitrogen with a seed instead of a fertiliser bag — the cycle did the work."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Distinguish gaseous from sedimentary cycles with examples. (2) Draw the nitrogen cycle and name the bacterium at each step. (3) Why is the phosphorus cycle slower and without a gas phase? (4) How does the carbon cycle link to global warming? (5) Define ammonification and nitrification with their organisms."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Cycles return matter to life: gaseous reservoirs (C, N) make fast cycles, sedimentary ones (P) are slow. The nitrogen cycle runs on named bacteria — fixers, nitrifiers, denitrifiers. **Self-check:** can you place Nitrosomonas, Nitrobacter, Rhizobium and Pseudomonas at the right steps?"},
    ],
},
{
    "file": "class-12/biology/organisms-and-environment/06-ecological-pyramids-and-energy-flow.json",
    "blocks": [
        {"after": "# Ecological pyramids and energy flow",
         "md": "An **ecological pyramid** graphs a trophic property — number, biomass or energy — level by level, with producers at the base. The **10% law** (Lindeman): only about a tenth of the energy at one trophic level reaches the next; the rest is lost to respiration, waste and uneaten parts. Energy pyramids are always upright; the other two can sometimes invert."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from trophic levels to the 10% law (study in this order)",
                   ["Step", "Concept", "Key point"],
                   [["1", "Trophic levels", "T1 producers → T2 herbivores → T3 carnivores → T4 top carnivores"],
                    ["2", "Energy transfer", "Only ~10% passes up; 90% lost to respiration, heat, waste"],
                    ["3", "Pyramid of energy", "ALWAYS upright — energy must shrink upward (2nd law of thermodynamics)"],
                    ["4", "Pyramid of biomass", "Usually upright; inverted in the open ocean (phytoplankton stand small but turn over fast)"],
                    ["5", "Pyramid of numbers", "Usually upright; inverted for one tree → many insects → parasites"],
                    ["6", "Implication", "Top predators need vast territories — the reason they are rare and vulnerable"]])},
        {"after": "## 3. Classified tables",
         "table": ("The three pyramids — which can invert and why",
                   ["Pyramid", "Units", "Can it invert?", "Classic inversion example"],
                   [["Energy", "kJ/m²/time", "NEVER — always upright", "— (energy is lost at every transfer)"],
                    ["Biomass", "g/m² (dry weight)", "Sometimes", "Ocean: few phytoplankton grams support more zooplankton — fast turnover"],
                    ["Numbers", "count of individuals", "Often", "One large tree feeds thousands of insects, which feed thousands of parasites"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Energy pyramid — the 10% law in numbers",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Pyramid of energy (kJ per m2 per year)</text>'
                 '<polygon points="180,300 460,300 420,250 220,250" fill="#22c55e" stroke="#15803d" stroke-width="2"/>'
                 '<text x="320" y="282" text-anchor="middle" font-weight="bold" fill="#14532d">Producers &#8212; 100,000</text>'
                 '<polygon points="220,246 420,246 390,196 250,196" fill="#fde68a" stroke="#b45309" stroke-width="2"/>'
                 '<text x="320" y="228" text-anchor="middle" font-weight="bold" fill="#854d0e">Herbivores &#8212; 10,000</text>'
                 '<polygon points="250,192 390,192 365,142 275,142" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/>'
                 '<text x="320" y="174" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Carnivores &#8212; 1,000</text>'
                 '<polygon points="275,138 365,138 340,88 300,88" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="320" y="120" text-anchor="middle" font-weight="bold" fill="#7f1d1d">Top &#8212; 100</text>'
                 '<text x="500" y="160" font-size="13" fill="#475569">Each level keeps</text>'
                 '<text x="500" y="182" font-size="13" fill="#475569">only ~10%: the rest</text>'
                 '<text x="500" y="204" font-size="13" fill="#475569">is respired away as</text>'
                 '<text x="500" y="226" font-size="13" fill="#475569">heat &#8212; gone forever.</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">Energy can never flow back down &#8212; the pyramid can never invert.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** Producers fix 100,000 kJ/m²/yr. By the 10% law: herbivores get 10,000, first carnivores 1,000, top carnivores 100. To support one 200-kg tiger, the ecosystem must fix energy for tonnes of deer and hectares of grass. **Why it matters:** this arithmetic is why top predators need huge home ranges, why food chains rarely exceed 4–5 levels, and why eating lower on the chain (plants) feeds more people per hectare."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) State the 10% law and name Lindeman. (2) Draw the energy pyramid with numbers. (3) Which pyramids can invert, and give the ocean and tree-insect examples. (4) Why can the energy pyramid never invert? (5) Why are food chains limited to 4–5 trophic levels?"},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Energy shrinks ~10× at every step; the energy pyramid is always upright, biomass and number pyramids sometimes are not. The consequence: few top predators, short chains, and plants as the energy base of everything. **Self-check:** starting from 200,000 kJ at T1, can you compute T2, T3 and T4?"},
    ],
},
]
