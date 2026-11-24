# Class 11 Biology — Ecology (7 topics).

PART_B = [
{
    "file": "class-11/biology/ecology/01-ecosystem-ecology-concept-of-ecology-biotic-and-abiotic-factors-species-interactions.json",
    "blocks": [
        {"after": "## 3. Classified tables",
         "table": ("Species interactions — the +/- ledger (highly classified)",
                   ["Interaction", "Species A", "Species B", "Example"],
                   [["Mutualism", "+", "+", "Lichen (alga + fungus); Rhizobium + legume"],
                    ["Commensalism", "+", "0", "Epiphytes on trees; cattle egret + buffalo"],
                    ["Predation", "+", "&#8722;", "Tiger + deer; Venus flytrap + insect"],
                    ["Parasitism", "+", "&#8722;", "Plasmodium + human; tapeworm + man"],
                    ["Competition", "&#8722;", "&#8722;", "Two birds for one nest hole; crops + weeds"],
                    ["Amensalism", "&#8722;", "0", "Penicillium inhibits bacteria; allelopathy"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Ecology's hierarchy — individual to biosphere",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">The ecological ladder</text>'
                 '<ellipse cx="150" cy="90" rx="42" ry="24" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="150" y="95" text-anchor="middle" font-size="12" fill="#14532d">individual</text>'
                 '<ellipse cx="280" cy="90" rx="55" ry="24" fill="#bbf7d0" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="280" y="95" text-anchor="middle" font-size="12" fill="#14532d">population</text>'
                 '<ellipse cx="430" cy="90" rx="60" ry="24" fill="#86efac" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="430" y="95" text-anchor="middle" font-size="12" fill="#14532d">community</text>'
                 '<ellipse cx="580" cy="90" rx="55" ry="24" fill="#4ade80" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="580" y="95" text-anchor="middle" font-size="12" fill="#14532d">ecosystem</text>'
                 '<ellipse cx="320" cy="200" rx="90" ry="30" fill="#22c55e" stroke="#14532d" stroke-width="2.5"/>'
                 '<text x="320" y="205" text-anchor="middle" font-size="12" font-weight="bold" fill="#052e16">biome</text>'
                 '<ellipse cx="320" cy="300" rx="130" ry="34" fill="#166534" stroke="#052e16" stroke-width="2.5"/>'
                 '<text x="320" y="305" text-anchor="middle" font-size="12" font-weight="bold" fill="#dcfce7">biosphere (all life on Earth)</text>'
                 '<line x1="185" y1="90" x2="222" y2="90" stroke="#475569" stroke-width="2"/>'
                 '<line x1="337" y1="90" x2="367" y2="90" stroke="#475569" stroke-width="2"/>'
                 '<line x1="492" y1="90" x2="522" y2="90" stroke="#475569" stroke-width="2"/>'
                 '<line x1="430" y1="118" x2="370" y2="175" stroke="#475569" stroke-width="2"/>'
                 '<line x1="320" y1="232" x2="320" y2="263" stroke="#475569" stroke-width="2"/>'
                 '<text x="320" y="355" text-anchor="middle" font-size="13" fill="#4b5563">Each level adds new properties: interactions appear at community, energy flow at ecosystem.</text>'
                 '</svg>')},
    ],
},
{
    "file": "class-11/biology/ecology/02-concept-of-ecosystem-structural-and-functional-aspects-of-pond-and-forest-ecosystem.json",
    "blocks": [
        {"after": "## 2. Definition and Structure of an Ecosystem",
         "table": ("Pond vs forest ecosystem — structure classified",
                   ["Component", "Pond ecosystem", "Forest ecosystem"],
                   [["Producers", "Phytoplankton, floating and submerged plants", "Trees, shrubs, herbs"],
                    ["Consumers", "Zooplankton, fish, amphibians", "Insects, birds, mammals"],
                    ["Decomposers", "Bacteria, fungi in bottom mud", "Soil fungi, bacteria, earthworms"],
                    ["Abiotic substrate", "Water with dissolved nutrients; light zones", "Soil with litter; light canopy layers"],
                    ["Main energy input", "Sunlight through water column", "Sunlight captured by canopy"]])},
        {"after": "## 3. Functional Aspects — How the Machine Runs",
         "svg": ("Ecosystem functions — energy in, nutrients cycle",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">How an ecosystem runs</text>'
                 '<circle cx="110" cy="110" r="30" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="110" y="80" text-anchor="middle" font-size="12" fill="#854d0e">sun</text>'
                 '<line x1="140" y1="120" x2="230" y2="150" stroke="#ca8a04" stroke-width="3"/>'
                 '<polygon points="228,144 240,154 226,160" fill="#ca8a04"/>'
                 '<rect x="240" y="140" width="110" height="50" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="295" y="170" text-anchor="middle" font-size="12" fill="#14532d">producers</text>'
                 '<line x1="352" y1="155" x2="420" y2="155" stroke="#475569" stroke-width="3"/>'
                 '<polygon points="418,150 418,160 428,155" fill="#475569"/>'
                 '<rect x="430" y="130" width="110" height="50" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="485" y="160" text-anchor="middle" font-size="12" fill="#1e3a8a">consumers</text>'
                 '<path d="M 485 182 q -20 60 -110 60" fill="none" stroke="#475569" stroke-width="3"/>'
                 '<polygon points="376,242 388,236 388,250" fill="#475569"/>'
                 '<rect x="240" y="250" width="110" height="50" rx="10" fill="#e7e5e4" stroke="#57534e" stroke-width="2.5"/>'
                 '<text x="295" y="280" text-anchor="middle" font-size="12" fill="#44403c">decomposers</text>'
                 '<path d="M 240 275 q -60 -40 -55 -80" fill="none" stroke="#16a34a" stroke-width="3" stroke-dasharray="7 5"/>'
                 '<polygon points="180,192 194,190 188,204" fill="#16a34a"/>'
                 '<text x="120" y="230" font-size="12" fill="#14532d">nutrients RETURN</text>'
                 '<text x="320" y="340" text-anchor="middle" font-size="13" fill="#4b5563">Energy flows ONE way (sun &#8594; out as heat). Nutrients CYCLE. That asymmetry is the whole of ecology.</text>'
                 '</svg>')},
        {"after": "## 4. Conceptual Relationships",
         "md": "**Deep dive — why energy flow is one-way but nutrients cycle.** Every transfer loses about 90% of the energy as heat (the second law of thermodynamics); heat cannot be recycled by plants, so energy must be resupplied by the sun forever. Matter, however, is atoms — carbon, nitrogen, phosphorus — and atoms are neither created nor destroyed, so decomposers return them to the producers indefinitely. One arrow in, one arrow out; one loop closed. Keep those two shapes separate and every ecology answer becomes clearer."},
    ],
},
{
    "file": "class-11/biology/ecology/02-food-chain-food-web-trophic-level-ecological-pyramids-productivity.json",
    "blocks": [
        {"after": "## 3. Ecological Pyramids (NEB 2024 + 2023)",
         "svg": ("Energy pyramid — the 10 percent rule",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Energy pyramid — why big predators are rare</text>'
                 '<rect x="180" y="60" width="280" height="55" rx="8" fill="#f9a8d4" stroke="#db2777" stroke-width="2.5"/>'
                 '<text x="320" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#831843">T3 carnivores — 10 kJ</text>'
                 '<rect x="130" y="125" width="380" height="55" rx="8" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="320" y="160" text-anchor="middle" font-size="13" font-weight="bold" fill="#854d0e">T2 herbivores — 100 kJ</text>'
                 '<rect x="80" y="190" width="480" height="55" rx="8" fill="#bbf7d0" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="320" y="225" text-anchor="middle" font-size="13" font-weight="bold" fill="#14532d">T1 producers — 1,000 kJ</text>'
                 '<text x="320" y="280" text-anchor="middle" font-size="13" fill="#4b5563">~90% lost at each transfer as heat, respiration and waste — only ~10% climbs a level.</text>'
                 '<text x="320" y="305" text-anchor="middle" font-size="13" fill="#4b5563">Energy pyramids are ALWAYS upright. Number and biomass pyramids can invert (a tree, a parasite chain).</text>'
                 '</svg>')},
        {"after": "## 4. Productivity",
         "table": ("Food chain vs web; GPP vs NPP — the paired concepts",
                   ["Concept pair", "First term", "Second term", "Exam distinction"],
                   [["Chain vs web", "Food chain: one linear feeding sequence", "Food web: interconnected chains", "Webs show real ecosystems; chains are teaching models"],
                    ["GPP vs NPP", "GPP: total energy fixed by photosynthesis", "NPP = GPP &#8722; respiration (R)", "Only NPP is available to consumers"],
                    ["Trophic level", "Position in feeding sequence (T1, T2...)", "Each level loses ~90% of energy", "Caps chains at 4-5 levels"],
                    ["Pyramid types", "Number, biomass, energy", "Energy is always upright", "Inverted examples: tree ecosystem (numbers), sea (biomass)"]])},
    ],
},
{
    "file": "class-11/biology/ecology/03-food-chain-food-web-trophic-level-ecological-pyramids-productivity.json",
    "blocks": [
        {"after": "## 3. Classified tables",
         "table": ("Trophic structure — the master table",
                   ["Trophic level", "Who", "Energy share", "Example (grassland)"],
                   [["T1 producers", "Green plants", "100% of captured energy", "Grass"],
                    ["T2 primary consumers", "Herbivores", "~10%", "Rabbit, grasshopper"],
                    ["T3 secondary consumers", "Carnivores", "~1%", "Frog, snake"],
                    ["T4 tertiary consumers", "Top carnivores", "~0.1%", "Hawk"],
                    ["Decomposers", "Bacteria, fungi", "Operate at ALL levels", "Return nutrients to soil"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Food web — why interconnection means stability",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="13">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">A food web: many chains woven together</text>'
                 '<rect x="270" y="300" width="100" height="40" rx="8" fill="#bbf7d0" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="320" y="325" text-anchor="middle" font-size="12" fill="#14532d">grass</text>'
                 '<rect x="90" y="200" width="90" height="36" rx="8" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="135" y="223" text-anchor="middle" font-size="12" fill="#854d0e">grasshopper</text>'
                 '<rect x="280" y="200" width="80" height="36" rx="8" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="320" y="223" text-anchor="middle" font-size="12" fill="#854d0e">rabbit</text>'
                 '<rect x="470" y="200" width="80" height="36" rx="8" fill="#fde68a" stroke="#b45309" stroke-width="2.5"/>'
                 '<text x="510" y="223" text-anchor="middle" font-size="12" fill="#854d0e">deer</text>'
                 '<rect x="90" y="100" width="90" height="36" rx="8" fill="#f9a8d4" stroke="#db2777" stroke-width="2.5"/>'
                 '<text x="135" y="123" text-anchor="middle" font-size="12" fill="#831843">frog</text>'
                 '<rect x="280" y="100" width="80" height="36" rx="8" fill="#f9a8d4" stroke="#db2777" stroke-width="2.5"/>'
                 '<text x="320" y="123" text-anchor="middle" font-size="12" fill="#831843">fox</text>'
                 '<rect x="470" y="100" width="80" height="36" rx="8" fill="#f9a8d4" stroke="#db2777" stroke-width="2.5"/>'
                 '<text x="510" y="123" text-anchor="middle" font-size="12" fill="#831843">hawk</text>'
                 '<line x1="150" y1="298" x2="135" y2="238" stroke="#475569" stroke-width="2"/>'
                 '<line x1="300" y1="298" x2="320" y2="238" stroke="#475569" stroke-width="2"/>'
                 '<line x1="345" y1="298" x2="505" y2="238" stroke="#475569" stroke-width="2"/>'
                 '<line x1="135" y1="198" x2="135" y2="138" stroke="#475569" stroke-width="2"/>'
                 '<line x1="320" y1="198" x2="320" y2="138" stroke="#475569" stroke-width="2"/>'
                 '<line x1="510" y1="198" x2="510" y2="138" stroke="#475569" stroke-width="2"/>'
                 '<line x1="135" y1="118" x2="278" y2="112" stroke="#475569" stroke-width="2" stroke-dasharray="5 4"/>'
                 '<text x="320" y="360" text-anchor="middle" font-size="13" fill="#4b5563">If one prey fails, its predators fall back on alternatives — webs buffer shocks that would break a single chain.</text>'
                 '</svg>')},
    ],
},
{
    "file": "class-11/biology/ecology/04-biogeochemical-cycles-carbon-and-nitrogen-cycles-concept-of-succession.json",
    "blocks": [
        {"after": "## 3. The Nitrogen Cycle",
         "svg": ("The nitrogen cycle — five steps, five microbial jobs",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="13">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Nitrogen cycle — bacteria run the show</text>'
                 '<ellipse cx="320" cy="100" rx="90" ry="34" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="320" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">N2 in atmosphere (78%)</text>'
                 '<rect x="70" y="210" width="150" height="46" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>'
                 '<text x="145" y="238" text-anchor="middle" font-size="12" fill="#14532d">NH3 / ammonium in soil</text>'
                 '<rect x="420" y="210" width="150" height="46" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="495" y="238" text-anchor="middle" font-size="12" fill="#854d0e">NO3- nitrates to plants</text>'
                 '<line x1="250" y1="125" x2="150" y2="206" stroke="#16a34a" stroke-width="2.5"/>'
                 '<polygon points="146,200 152,214 160,204" fill="#16a34a"/>'
                 '<text x="120" y="165" font-size="11" fill="#14532d">1. fixation (Rhizobium, Azotobacter)</text>'
                 '<line x1="220" y1="233" x2="416" y2="233" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<polygon points="414,228 414,238 424,233" fill="#ca8a04"/>'
                 '<text x="320" y="222" text-anchor="middle" font-size="11" fill="#854d0e">2. nitrification (Nitrosomonas, Nitrobacter)</text>'
                 '<line x1="470" y1="258" x2="380" y2="128" stroke="#16a34a" stroke-width="2.5"/>'
                 '<polygon points="376,132 388,124 390,138" fill="#16a34a"/>'
                 '<text x="500" y="180" font-size="11" fill="#14532d">3. assimilation into plants</text>'
                 '<line x1="145" y1="258" x2="240" y2="330" stroke="#57534e" stroke-width="2.5"/>'
                 '<line x1="495" y1="258" x2="400" y2="330" stroke="#57534e" stroke-width="2.5"/>'
                 '<ellipse cx="320" cy="345" rx="110" ry="24" fill="#e7e5e4" stroke="#57534e" stroke-width="2.5"/>'
                 '<text x="320" y="350" text-anchor="middle" font-size="12" fill="#292524">4. ammonification (decomposers) &#183; 5. denitrification (Pseudomonas) &#8594; N2 back</text>'
                 '</svg>')},
        {"after": "## 4. Ecological Succession (NEB 2022 & 2024)",
         "table": ("Succession — primary vs secondary, xerarch vs hydrarch",
                   ["Feature", "Primary succession", "Secondary succession"],
                   [["Starting surface", "Bare rock, lava, sand — no soil, no life", "Disturbed area WITH soil (fire, flood, logging)"],
                    ["Pioneers", "Lichens and mosses", "Grasses and fast weeds"],
                    ["Speed", "Very slow — soil must be built first", "Fast — soil and seed bank already exist"],
                    ["Serules", "Xerarch (dry start) or hydrarch (wet start)", "Same climax, shortcut route"],
                    ["Climax community", "Stable, self-perpetuating end community", "Same climax as the region dictates"],
                    ["Nepal example", "Lichen colonising landslide rock", "Regrowth on abandoned shifting-cultivation plot"]])},
    ],
},
{
    "file": "class-11/biology/ecology/05-ecological-adaptation-concept-of-adaptation-hydrophytes-and-xerophytes.json",
    "blocks": [
        {"after": "## 3. Classified tables",
         "table": ("Hydrophytes vs xerophytes vs halophytes — the water ledger",
                   ["Feature", "Hydrophyte (water)", "Xerophyte (dry)", "Halophyte (salt)"],
                   [["Roots", "Poor or absent (water does the anchoring)", "Deep, extensive tap roots", "Shallow with pneumatophores (mangroves)"],
                    ["Leaves", "Thin, large, floating; stomata on upper surface", "Small, thick, spines; sunken stomata", "Thick, succulent, salt-secreting glands"],
                    ["Cuticle", "Thin or absent", "Thick waxy", "Thick"],
                    ["Mechanical tissue", "Reduced (water supports)", "Well developed", "Moderate"],
                    ["Internal air spaces (aerenchyma)", "Abundant", "Absent", "In pneumatophores"],
                    ["Examples", "Hydrilla, water hyacinth, lotus", "Cactus, Opuntia, pinus needle", "Rhizophora, Avicennia"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Hydrophyte vs xerophyte — opposite solutions",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Same problem (water), opposite directions</text>'
                 '<rect x="60" y="110" width="220" height="130" rx="10" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<line x1="170" y1="115" x2="170" y2="235" stroke="#1d4ed8" stroke-width="0"/>'
                 '<path d="M 110 118 q 60 -18 120 0" fill="none" stroke="#16a34a" stroke-width="4"/>'
                 '<text x="170" y="100" text-anchor="middle" font-size="12" fill="#14532d">floating leaf — stomata UP</text>'
                 '<path d="M 150 150 q 20 40 40 60" fill="none" stroke="#14532d" stroke-width="2"/>'
                 '<text x="170" y="235" text-anchor="middle" font-size="12" fill="#1e3a8a">Hydrilla: thin roots,</text>'
                 '<text x="170" y="255" text-anchor="middle" font-size="12" fill="#1e3a8a">aerenchyma air canals</text>'
                 '<rect x="360" y="110" width="220" height="130" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<rect x="450" y="130" width="40" height="80" rx="18" fill="#4ade80" stroke="#14532d" stroke-width="2.5"/>'
                 '<line x1="435" y1="140" x2="425" y2="120" stroke="#14532d" stroke-width="3"/>'
                 '<line x1="505" y1="140" x2="515" y2="120" stroke="#14532d" stroke-width="3"/>'
                 '<line x1="440" y1="215" x2="440" y2="238" stroke="#713f12" stroke-width="4"/>'
                 '<text x="470" y="255" text-anchor="middle" font-size="12" fill="#854d0e">Opuntia: succulent stem,</text>'
                 '<text x="470" y="275" text-anchor="middle" font-size="12" fill="#854d0e">spine leaves, deep roots</text>'
                 '<text x="320" y="330" text-anchor="middle" font-size="13" fill="#4b5563">Hydrophyte: get RID of water (thin cuticle, air spaces). Xerophyte: KEEP water</text>'
                 '<text x="320" y="352" text-anchor="middle" font-size="13" fill="#4b5563">(thick cuticle, sunken stomata, CAM-like metabolism). Adaptation is always a trade.</text>'
                 '</svg>')},
    ],
},
{
    "file": "class-11/biology/ecology/06-ecological-imbalances-greenhouse-effects-and-climate-change-depletion-of-ozone-layer-acid-rain-a.json",
    "blocks": [
        {"after": "## 4. Acid Rain",
         "svg": ("Three imbalances — greenhouse, ozone hole, acid rain",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="14">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Three human-made imbalances</text>'
                 '<rect x="40" y="70" width="170" height="120" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>'
                 '<text x="125" y="95" text-anchor="middle" font-weight="bold" fill="#854d0e">Greenhouse effect</text>'
                 '<text x="125" y="118" text-anchor="middle" font-size="11" fill="#854d0e">CO2, CH4 trap outgoing</text>'
                 '<text x="125" y="136" text-anchor="middle" font-size="11" fill="#854d0e">heat &#8594; global warming,</text>'
                 '<text x="125" y="154" text-anchor="middle" font-size="11" fill="#854d0e">sea rise, extreme weather</text>'
                 '<text x="125" y="176" text-anchor="middle" font-size="11" fill="#854d0e">Fix: cut emissions, forests</text>'
                 '<rect x="235" y="70" width="170" height="120" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>'
                 '<text x="320" y="95" text-anchor="middle" font-weight="bold" fill="#1e3a8a">Ozone depletion</text>'
                 '<text x="320" y="118" text-anchor="middle" font-size="11" fill="#1e3a8e">CFCs break O3 over poles</text>'
                 '<text x="320" y="136" text-anchor="middle" font-size="11" fill="#1e3a8a">&#8594; UV-B reaches ground:</text>'
                 '<text x="320" y="154" text-anchor="middle" font-size="11" fill="#1e3a8a">skin cancer, cataract</text>'
                 '<text x="320" y="176" text-anchor="middle" font-size="11" fill="#1e3a8a">Fix: Montreal Protocol 1987</text>'
                 '<rect x="430" y="70" width="170" height="120" rx="10" fill="#e7e5e4" stroke="#57534e" stroke-width="2.5"/>'
                 '<text x="515" y="95" text-anchor="middle" font-weight="bold" fill="#44403c">Acid rain</text>'
                 '<text x="515" y="118" text-anchor="middle" font-size="11" fill="#44403c">SO2 + NOx dissolve:</text>'
                 '<text x="515" y="136" text-anchor="middle" font-size="11" fill="#44403c">pH &#60; 5.6 kills fish,</text>'
                 '<text x="515" y="154" text-anchor="middle" font-size="11" fill="#44403c">leaches soil, erodes marble</text>'
                 '<text x="515" y="176" text-anchor="middle" font-size="11" fill="#44403c">Fix: scrubbers, low-S fuel</text>'
                 '<text x="320" y="250" text-anchor="middle" font-size="13" fill="#14161a">Common thread: all three come from burning and leaking — fossil fuel and chemistry.</text>'
                 '<text x="320" y="290" text-anchor="middle" font-size="13" fill="#4b5563">And all three were reduced when laws matched the science — proof that policy works.</text>'
                 '</svg>')},
        {"after": "## 6. Eutrophication (NEB 2024)",
         "table": ("Ecological imbalances — cause, effect, remedy (highly classified)",
                   ["Imbalance", "Main cause", "Key effect", "Remedy"],
                   [["Global warming", "CO2/CH4 from fossil fuel, deforestation", "Temperature rise, glacier melt, sea-level rise", "Emission cuts, afforestation, renewables"],
                    ["Ozone depletion", "CFCs, halons", "UV-B surge: cancer, cataracts, plankton loss", "Montreal Protocol — CFC phase-out"],
                    ["Acid rain", "SO2, NOx from burning", "pH &#60; 5.6: lake acidification, forest decline", "Scrubbers, catalytic converters, low-S fuel"],
                    ["Eutrophication", "Fertiliser runoff (N, P) into water", "Algal bloom &#8594; O2 crash &#8594; fish kill", "Runoff control, sewage treatment"],
                    ["Biological invasion", "Exotic species introduced", "Native species outcompeted, ecosystems homogenised", "Quarantine, early detection, eradication"]])},
    ],
},
]
