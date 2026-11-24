# Chemistry class-11 — States of matter part B (liquid, solid, liquid crystals, crystals)
PART_A = [
    {
        "file": "class-11/chemistry/states-of-matter/04-liquid-state.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the properties that make liquids 'in-between'\n\n"
                    "Liquids keep the fixed volume of a solid but adopt the fluidity of a gas, and every "
                    "physical property in this topic is a negotiation between the two:\n\n"
                    "- **Vapour pressure** — escaping molecules build pressure above the liquid; it rises "
                    "exponentially with temperature (Clausius–Clapeyron behaviour) and falls with stronger "
                    "intermolecular forces. Boiling happens when vapour pressure equals the external pressure, "
                    "which is why water boils below 100 °C on Everest and pressure cookers raise the boiling "
                    "point.\n"
                    "- **Surface tension** — surface molecules are pulled inward (no neighbours above), so the "
                    "surface behaves like a stretched film: spherical drops, capillary rise, meniscus shape. "
                    "Surfactants (detergents) lower it by displacing water molecules from the surface.\n"
                    "- **Viscosity** — internal friction between layers; strong H-bonding (glycerol) or long "
                    "molecules (honey) raise it. Heating weakens the intermolecular grip, so viscosity falls "
                    "sharply with temperature — the opposite of gases, where viscosity *rises* with T because "
                    "faster molecules collide more.\n\n"
                    "The exam pairing to remember: liquid viscosity and surface tension both *decrease* with "
                    "temperature; gas viscosity *increases*.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the properties that make liquids 'in-between'\n\n"
                    "Liquids keep the fixed volume of a solid but adopt the fluidity of a gas, and every "
                    "physical property in this topic is a negotiation between the two:\n\n"
                    "- **Vapour pressure** — escaping molecules build pressure above the liquid; it rises "
                    "exponentially with temperature (Clausius–Clapeyron behaviour) and falls with stronger "
                    "intermolecular forces. Boiling happens when vapour pressure equals the external pressure, "
                    "which is why water boils below 100 °C on Everest and pressure cookers raise the boiling "
                    "point.\n"
                    "- **Surface tension** — surface molecules are pulled inward (no neighbours above), so the "
                    "surface behaves like a stretched film: spherical drops, capillary rise, meniscus shape. "
                    "Surfactants (detergents) lower it by displacing water molecules from the surface.\n"
                    "- **Viscosity** — internal friction between layers; strong H-bonding (glycerol) or long "
                    "molecules (honey) raise it. Heating weakens the intermolecular grip, so viscosity falls "
                    "sharply with temperature — the opposite of gases, where viscosity *rises* with T because "
                    "faster molecules collide more.\n\n"
                    "The exam pairing to remember: liquid viscosity and surface tension both *decrease* with "
                    "temperature; gas viscosity *increases*."),
             "table": ("Liquid properties — cause, effect, temperature response",
                       ["Property", "Molecular cause", "Everyday evidence", "Effect of ↑T"],
                       [["Vapour pressure", "Escape of surface molecules", "Nail-varnish remover smells strongly", "Rises sharply"],
                        ["Boiling point", "Vapour pressure = external pressure", "Water boils ~70 °C on Everest", "Boiling point is the marker"],
                        ["Surface tension", "Inward pull on surface molecules", "Drops spherical; insects on water", "Decreases"],
                        ["Viscosity", "Friction between flowing layers", "Honey vs water; glycerol thick", "Decreases sharply"],
                        ["Evaporative cooling", "Fastest molecules leave first", "Sweating; earthen-pot water cooling", "Cooling of the liquid left behind"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Vapour pressure vs temperature — boiling is where the curve meets the external pressure",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<line x1=\"70\" y1=\"260\" x2=\"590\" y2=\"260\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<line x1=\"70\" y1=\"260\" x2=\"70\" y2=\"40\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<text x=\"330\" y=\"290\" text-anchor=\"middle\" fill=\"#111827\">temperature &#8594;</text>"
                     "<text x=\"48\" y=\"150\" text-anchor=\"middle\" fill=\"#111827\" transform=\"rotate(-90 48 150)\">vapour pressure</text>"
                     "<path d=\"M90 250 C 200 240, 260 200, 330 140 C 400 85, 470 60, 580 50\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<line x1=\"70\" y1=\"120\" x2=\"590\" y2=\"120\" stroke=\"#991b1b\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"585\" y=\"112\" text-anchor=\"end\" fill=\"#991b1b\" font-size=\"12\">1 atm (sea level)</text>"
                     "<line x1=\"70\" y1=\"170\" x2=\"590\" y2=\"170\" stroke=\"#991b1b\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\"/>"
                     "<text x=\"585\" y=\"163\" text-anchor=\"end\" fill=\"#991b1b\" font-size=\"12\">low P (Everest)</text>"
                     "<circle cx=\"352\" cy=\"120\" r=\"5\" fill=\"#166534\"/>"
                     "<text x=\"368\" y=\"112\" fill=\"#166534\" font-size=\"13\">boils at 100&#176;C</text>"
                     "<circle cx=\"262\" cy=\"170\" r=\"5\" fill=\"#166534\"/>"
                     "<text x=\"278\" y=\"188\" fill=\"#166534\" font-size=\"13\">boils ~70&#176;C</text>"
                     "<text x=\"320\" y=\"310\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">a pressure cooker raises the external line — boiling point climbs with it</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/05-solid-state.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — crystalline vs amorphous at the particle level\n\n"
                    "A crystalline solid is an **ordered, repeating array**: the same group of particles (the "
                    "unit cell) repeats by translation in three dimensions, giving long-range order, sharp "
                    "melting points, anisotropy (different properties along different directions) and clean "
                    "geometric faces. An amorphous solid only has **short-range order** — like a frozen liquid: "
                    "it softens over a temperature range (glass transition), cuts along random surfaces, and is "
                    "isotropic.\n\n"
                    "Classify crystalline solids by the particles at the lattice points and the forces between "
                    "them — the four-way table below is the single most examined classification in this unit. "
                    "Remember the borderline cases NEB loves: graphite (covalent network yet soft and "
                    "conducting, because strong in-plane covalent bonds coexist with weak van der Waals layers "
                    "and delocalised π electrons), and ice (hydrogen-bonded molecular solid, less dense than "
                    "the liquid because the open H-bond lattice collapses on melting).")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — crystalline vs amorphous at the particle level\n\n"
                    "A crystalline solid is an **ordered, repeating array**: the same group of particles (the "
                    "unit cell) repeats by translation in three dimensions, giving long-range order, sharp "
                    "melting points, anisotropy (different properties along different directions) and clean "
                    "geometric faces. An amorphous solid only has **short-range order** — like a frozen liquid: "
                    "it softens over a temperature range (glass transition), cuts along random surfaces, and is "
                    "isotropic.\n\n"
                    "Classify crystalline solids by the particles at the lattice points and the forces between "
                    "them — the four-way table below is the single most examined classification in this unit. "
                    "Remember the borderline cases NEB loves: graphite (covalent network yet soft and "
                    "conducting, because strong in-plane covalent bonds coexist with weak van der Waals layers "
                    "and delocalised π electrons), and ice (hydrogen-bonded molecular solid, less dense than "
                    "the liquid because the open H-bond lattice collapses on melting)."),
             "table": ("Types of crystalline solids",
                       ["Type", "Particles at lattice points", "Force between particles", "Typical properties", "Examples"],
                       [["Ionic", "Cations and anions", "Electrostatic (strong, non-directional)", "High m.p., brittle, conduct when molten/aqueous", "NaCl, MgO, CaF₂"],
                        ["Covalent network", "Atoms", "Covalent bonds throughout", "Very high m.p., extremely hard, insulators (graphite conducts)", "diamond, quartz, SiC"],
                        ["Molecular", "Molecules", "van der Waals / H-bonds / dipole", "Low m.p., soft, volatile, insulators", "I₂, dry ice, ice, naphthalene"],
                        ["Metallic", "Metal cations + delocalised e⁻", "Metallic bonding", "Malleable, ductile, conducting, lustrous", "Cu, Fe, Al, Na"]])},
            {"after": "## 7. Exam Application",
             "svg": ("The four solid types — particles, forces, properties",
                     "<svg viewBox=\"0 0 640 330\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"330\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<rect x=\"30\" y=\"30\" width=\"130\" height=\"110\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"65\" cy=\"65\" r=\"7\"/><circle cx=\"95\" cy=\"65\" r=\"5\" fill=\"#991b1b\"/>"
                     "<circle cx=\"125\" cy=\"65\" r=\"7\"/><circle cx=\"65\" cy=\"100\" r=\"5\" fill=\"#991b1b\"/>"
                     "<circle cx=\"95\" cy=\"100\" r=\"7\"/><circle cx=\"125\" cy=\"100\" r=\"5\" fill=\"#991b1b\"/>"
                     "<circle cx=\"65\" cy=\"125\" r=\"7\"/><circle cx=\"95\" cy=\"125\" r=\"5\" fill=\"#991b1b\"/>"
                     "<circle cx=\"125\" cy=\"125\" r=\"7\"/>"
                     "</g>"
                     "<text x=\"95\" y=\"160\" text-anchor=\"middle\" fill=\"#111827\">ionic: &#177; lattice</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"180\" y=\"30\" width=\"130\" height=\"110\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<g stroke=\"#166534\" stroke-width=\"2\">"
                     "<line x1=\"200\" y1=\"60\" x2=\"230\" y2=\"90\"/><line x1=\"230\" y1=\"90\" x2=\"260\" y2=\"60\"/>"
                     "<line x1=\"260\" y1=\"60\" x2=\"290\" y2=\"90\"/><line x1=\"230\" y1=\"90\" x2=\"230\" y2=\"125\"/>"
                     "<line x1=\"290\" y1=\"90\" x2=\"290\" y2=\"125\"/><line x1=\"200\" y1=\"60\" x2=\"200\" y2=\"95\"/>"
                     "</g>"
                     "<text x=\"245\" y=\"160\" text-anchor=\"middle\" fill=\"#111827\">covalent network</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"330\" y=\"30\" width=\"130\" height=\"110\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<g fill=\"#a16207\">"
                     "<circle cx=\"360\" cy=\"70\" r=\"9\"/><circle cx=\"400\" cy=\"90\" r=\"9\"/>"
                     "<circle cx=\"440\" cy=\"65\" r=\"9\"/><circle cx=\"380\" cy=\"120\" r=\"9\"/>"
                     "</g>"
                     "<text x=\"395\" y=\"160\" text-anchor=\"middle\" fill=\"#111827\">molecular: discrete units</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"480\" y=\"30\" width=\"130\" height=\"110\" rx=\"8\" fill=\"#fdf2f8\" stroke=\"#be185d\"/>"
                     "<g fill=\"#be185d\">"
                     "<circle cx=\"505\" cy=\"65\" r=\"6\"/><circle cx=\"530\" cy=\"65\" r=\"6\"/>"
                     "<circle cx=\"555\" cy=\"65\" r=\"6\"/><circle cx=\"580\" cy=\"65\" r=\"6\"/>"
                     "<circle cx=\"505\" cy=\"105\" r=\"6\"/><circle cx=\"530\" cy=\"105\" r=\"6\"/>"
                     "<circle cx=\"555\" cy=\"105\" r=\"6\"/><circle cx=\"580\" cy=\"105\" r=\"6\"/>"
                     "</g>"
                     "<text x=\"545\" y=\"160\" text-anchor=\"middle\" fill=\"#111827\">metallic: + sea of e&#8722;</text>"
                     "</g>"
                     "<text x=\"320\" y=\"205\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">order decides everything: crystalline = repeating unit cells, sharp m.p., anisotropic</text>"
                     "<text x=\"320\" y=\"230\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">amorphous = short-range order only, softening range, isotropic (glass, plastic)</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">borderline classics: graphite (covalent yet soft + conducting), ice (H-bonded, floats)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/06-liquid-crystals-and-their-applications.json",
        "blocks": [
            {            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — the mesophase between solid and liquid\n\n"
                    "Liquid crystals flow like liquids but keep some orientational order like crystals; they "
                    "exist in a temperature window between the crystal (below) and the clear liquid (above). "
                    "The two families:\n\n"
                    "- **Thermotropic** — order changes with temperature alone. Nematic (thread-like): "
                    "rod-shaped molecules all point the same average direction but with no layer order — the "
                    "working phase of LCDs. Smectic (soap-like): molecules arranged in layers, more ordered. "
                    "Cholesteric (chiral nematic): director twists layer by layer into a helix; the pitch "
                    "selectively reflects colours and shifts with temperature — the basis of thermometry "
                    "films and mood rings.\n"
                    "- **Lyotropic** — order depends on concentration in a solvent: soap micelles and cell "
                    "membrane phospholipid bilayers are everyday lyotropic liquid crystals.\n\n"
                    "In an LCD, a voltage re-orients the nematic molecules and so twists or untwists the "
                    "polarised light passing through them — each pixel is a light valve. The material must "
                    "behave this way near room temperature (e.g. cyanobiphenyl mixtures), which is why mixture "
                    "engineering, not a single compound, is used.")},
{            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — the mesophase between solid and liquid\n\n"
                    "Liquid crystals flow like liquids but keep some orientational order like crystals; they "
                    "exist in a temperature window between the crystal (below) and the clear liquid (above). "
                    "The two families:\n\n"
                    "- **Thermotropic** — order changes with temperature alone. Nematic (thread-like): "
                    "rod-shaped molecules all point the same average direction but with no layer order — the "
                    "working phase of LCDs. Smectic (soap-like): molecules arranged in layers, more ordered. "
                    "Cholesteric (chiral nematic): director twists layer by layer into a helix; the pitch "
                    "selectively reflects colours and shifts with temperature — the basis of thermometry "
                    "films and mood rings.\n"
                    "- **Lyotropic** — order depends on concentration in a solvent: soap micelles and cell "
                    "membrane phospholipid bilayers are everyday lyotropic liquid crystals.\n\n"
                    "In an LCD, a voltage re-orients the nematic molecules and so twists or untwists the "
                    "polarised light passing through them — each pixel is a light valve. The material must "
                    "behave this way near room temperature (e.g. cyanobiphenyl mixtures), which is why mixture "
                    "engineering, not a single compound, is used."),
             "table": ("Liquid-crystal phases and where each is used",
                       ["Phase", "Order present", "Signature property", "Application"],
                       [["Nematic", "Orientational only (common direction)", "Birefringent; re-orients in an electric field", "LCD displays, switches"],
                        ["Smectic", "Orientational + layered", "Viscous, soap-like layers", "Research materials, some displays"],
                        ["Cholesteric (chiral nematic)", "Twisted layers (helix)", "Pitch reflects specific colours; colour shifts with T", "Temperature-indicator films, mood rings"],
                        ["Lyotropic (in solvent)", "Concentration-dependent", "Micelles and bilayers form", "Soaps/detergents, biological membranes"]])},
{            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — the mesophase between solid and liquid\n\n"
                    "Liquid crystals flow like liquids but keep some orientational order like crystals; they "
                    "exist in a temperature window between the crystal (below) and the clear liquid (above). "
                    "The two families:\n\n"
                    "- **Thermotropic** — order changes with temperature alone. Nematic (thread-like): "
                    "rod-shaped molecules all point the same average direction but with no layer order — the "
                    "working phase of LCDs. Smectic (soap-like): molecules arranged in layers, more ordered. "
                    "Cholesteric (chiral nematic): director twists layer by layer into a helix; the pitch "
                    "selectively reflects colours and shifts with temperature — the basis of thermometry "
                    "films and mood rings.\n"
                    "- **Lyotropic** — order depends on concentration in a solvent: soap micelles and cell "
                    "membrane phospholipid bilayers are everyday lyotropic liquid crystals.\n\n"
                    "In an LCD, a voltage re-orients the nematic molecules and so twists or untwists the "
                    "polarised light passing through them — each pixel is a light valve. The material must "
                    "behave this way near room temperature (e.g. cyanobiphenyl mixtures), which is why mixture "
                    "engineering, not a single compound, is used."),
             "table": ("Liquid-crystal phases and where each is used",
                       ["Phase", "Order present", "Signature property", "Application"],
                       [["Nematic", "Orientational only (common direction)", "Birefringent; re-orients in an electric field", "LCD displays, switches"],
                        ["Smectic", "Orientational + layered", "Viscous, soap-like layers", "Research materials, some displays"],
                        ["Cholesteric (chiral nematic)", "Twisted layers (helix)", "Pitch reflects specific colours; colour shifts with T", "Temperature-indicator films, mood rings"],
                        ["Lyotropic (in solvent)", "Concentration-dependent", "Micelles and bilayers form", "Soaps/detergents, biological membranes"]]),
             "svg": ("Nematic vs cholesteric order — the two phases behind LCDs and thermometry",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"3\">"
                     "<line x1=\"70\" y1=\"70\" x2=\"130\" y2=\"70\"/>"
                     "<line x1=\"70\" y1=\"105\" x2=\"130\" y2=\"105\"/>"
                     "<line x1=\"70\" y1=\"140\" x2=\"130\" y2=\"140\"/>"
                     "</g>"
                     "<text x=\"100\" y=\"180\" text-anchor=\"middle\" fill=\"#111827\">nematic: one common direction</text>"
                     "<text x=\"100\" y=\"200\" text-anchor=\"middle\" fill=\"#6b7280\">LCD light valve</text>"
                     "<g stroke=\"#991b1b\" stroke-width=\"3\">"
                     "<line x1=\"330\" y1=\"60\" x2=\"390\" y2=\"60\"/>"
                     "<line x1=\"340\" y1=\"95\" x2=\"400\" y2=\"95\" transform=\"rotate(30 370 95)\"/>"
                     "<line x1=\"330\" y1=\"130\" x2=\"390\" y2=\"130\" transform=\"rotate(60 360 130)\"/>"
                     "<line x1=\"340\" y1=\"165\" x2=\"400\" y2=\"165\" transform=\"rotate(90 370 165)\"/>"
                     "</g>"
                     "<path d=\"M415 60 C 445 80, 445 120, 415 140 C 385 160, 385 190, 415 210\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"370\" y=\"240\" text-anchor=\"middle\" fill=\"#111827\">cholesteric: director twists into a helix</text>"
                     "<text x=\"370\" y=\"260\" text-anchor=\"middle\" fill=\"#6b7280\">pitch selects colour &#8594; temperature films</text>"
                     "<text x=\"320\" y=\"290\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">rod-like molecules; order survives melting but layers/direction respond to T, concentration or voltage</text>"
                     "</svg>")},
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/08-efflorescent-deliquescent-and-hygroscopic-solids-crystallization-and-crystal-growth-water-of-cry.json",
        "blocks": [
            {            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — water of crystallisation as part of the formula\n\n"
                    "Water of crystallisation is structural water: it occupies definite positions in the "
                    "lattice and its count belongs in the formula. CuSO₄·5H₂O (blue vitriol) loses water in "
                    "stages on heating — 2H₂O at ~100 °C, 2 more by ~230 °C, the last (coordinated to the "
                    "Cu²⁺ itself) only above 250 °C, leaving the white anhydrous CuSO₄; adding water restores "
                    "the blue, which is the classic test and the reason anhydrous CuSO₄ detects water in "
                    "organic liquids. Gypsum CaSO₄·2H₂O sets as plaster of Paris after partial dehydration to "
                    "CaSO₄·½H₂O.\n\n"
                    "The three humidity behaviours are a competition between the solid's affinity for water "
                    "and the vapour pressure of its saturated solution:\n"
                    "- **Efflorescent** — the salt's saturated-solution vapour pressure exceeds atmospheric "
                    "moisture, so it *loses* water: washing soda Na₂CO₃·10H₂O crumbles to a monohydrate "
                    "powder.\n"
                    "- **Deliquescent** — the saturated-solution vapour pressure is so low that the solid "
                    "pulls water from the air until it *dissolves itself*: CaCl₂, MgCl₂, NaOH, P₄O₁₀.\n"
                    "- **Hygroscopic** — absorbs moisture (damp surface) without dissolving: NaCl turns damp, "
                    "quicklime cakes; silica gel adsorbs on its surface.")},
{            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — water of crystallisation as part of the formula\n\n"
                    "Water of crystallisation is structural water: it occupies definite positions in the "
                    "lattice and its count belongs in the formula. CuSO₄·5H₂O (blue vitriol) loses water in "
                    "stages on heating — 2H₂O at ~100 °C, 2 more by ~230 °C, the last (coordinated to the "
                    "Cu²⁺ itself) only above 250 °C, leaving the white anhydrous CuSO₄; adding water restores "
                    "the blue, which is the classic test and the reason anhydrous CuSO₄ detects water in "
                    "organic liquids. Gypsum CaSO₄·2H₂O sets as plaster of Paris after partial dehydration to "
                    "CaSO₄·½H₂O.\n\n"
                    "The three humidity behaviours are a competition between the solid's affinity for water "
                    "and the vapour pressure of its saturated solution:\n"
                    "- **Efflorescent** — the salt's saturated-solution vapour pressure exceeds atmospheric "
                    "moisture, so it *loses* water: washing soda Na₂CO₃·10H₂O crumbles to a monohydrate "
                    "powder.\n"
                    "- **Deliquescent** — the saturated-solution vapour pressure is so low that the solid "
                    "pulls water from the air until it *dissolves itself*: CaCl₂, MgCl₂, NaOH, P₄O₁₀.\n"
                    "- **Hygroscopic** — absorbs moisture (damp surface) without dissolving: NaCl turns damp, "
                    "quicklime cakes; silica gel adsorbs on its surface."),
             "table": ("Efflorescent vs deliquescent vs hygroscopic",
                       ["Behaviour", "Direction of water movement", "End state", "Examples"],
                       [["Efflorescent", "Salt loses water to air", "Lower hydrate or amorphous powder", "Na₂CO₃·10H₂O, CuSO₄·5H₂O (partial), Glauber's salt"],
                        ["Deliquescent", "Air loses water to salt", "Saturated solution (solid disappears)", "CaCl₂, MgCl₂, NaOH, KOH, P₄O₁₀"],
                        ["Hygroscopic", "Moisture absorbed on surfaces", "Damp solid, still solid", "NaCl, quicklime, silica gel, conc. H₂SO₄ (liquid case)"]])},
{            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — water of crystallisation as part of the formula\n\n"
                    "Water of crystallisation is structural water: it occupies definite positions in the "
                    "lattice and its count belongs in the formula. CuSO₄·5H₂O (blue vitriol) loses water in "
                    "stages on heating — 2H₂O at ~100 °C, 2 more by ~230 °C, the last (coordinated to the "
                    "Cu²⁺ itself) only above 250 °C, leaving the white anhydrous CuSO₄; adding water restores "
                    "the blue, which is the classic test and the reason anhydrous CuSO₄ detects water in "
                    "organic liquids. Gypsum CaSO₄·2H₂O sets as plaster of Paris after partial dehydration to "
                    "CaSO₄·½H₂O.\n\n"
                    "The three humidity behaviours are a competition between the solid's affinity for water "
                    "and the vapour pressure of its saturated solution:\n"
                    "- **Efflorescent** — the salt's saturated-solution vapour pressure exceeds atmospheric "
                    "moisture, so it *loses* water: washing soda Na₂CO₃·10H₂O crumbles to a monohydrate "
                    "powder.\n"
                    "- **Deliquescent** — the saturated-solution vapour pressure is so low that the solid "
                    "pulls water from the air until it *dissolves itself*: CaCl₂, MgCl₂, NaOH, P₄O₁₀.\n"
                    "- **Hygroscopic** — absorbs moisture (damp surface) without dissolving: NaCl turns damp, "
                    "quicklime cakes; silica gel adsorbs on its surface."),
             "table": ("Efflorescent vs deliquescent vs hygroscopic",
                       ["Behaviour", "Direction of water movement", "End state", "Examples"],
                       [["Efflorescent", "Salt loses water to air", "Lower hydrate or amorphous powder", "Na₂CO₃·10H₂O, CuSO₄·5H₂O (partial), Glauber's salt"],
                        ["Deliquescent", "Air loses water to salt", "Saturated solution (solid disappears)", "CaCl₂, MgCl₂, NaOH, KOH, P₄O₁₀"],
                        ["Hygroscopic", "Moisture absorbed on surfaces", "Damp solid, still solid", "NaCl, quicklime, silica gel, conc. H₂SO₄ (liquid case)"]]),
             "svg": ("Water movement decides the label — efflorescent, deliquescent, hygroscopic",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<rect x=\"50\" y=\"70\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"125\" y=\"100\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"15\">efflorescent</text>"
                     "<line x1=\"125\" y1=\"115\" x2=\"125\" y2=\"45\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M125 45 L119 58 L131 58 Z\" fill=\"#1d4ed8\"/>"
                     "<text x=\"125\" y=\"140\" text-anchor=\"middle\" fill=\"#374151\">Na&#8322;CO&#8323;&#183;10H&#8322;O loses water</text>"
                     "<text x=\"125\" y=\"185\" text-anchor=\"middle\" fill=\"#6b7280\">crumbles to powder</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"245\" y=\"70\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"100\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"15\">deliquescent</text>"
                     "<line x1=\"320\" y1=\"115\" x2=\"320\" y2=\"45\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<path d=\"M320 115 L314 102 L326 102 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"140\" text-anchor=\"middle\" fill=\"#374151\">CaCl&#8322;, NaOH pull water in</text>"
                     "<text x=\"320\" y=\"185\" text-anchor=\"middle\" fill=\"#6b7280\">dissolve into solution</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"440\" y=\"70\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"515\" y=\"100\" text-anchor=\"middle\" fill=\"#a16207\" font-size=\"15\">hygroscopic</text>"
                     "<line x1=\"515\" y1=\"115\" x2=\"515\" y2=\"45\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<path d=\"M515 115 L509 102 L521 102 Z\" fill=\"#a16207\"/>"
                     "<text x=\"515\" y=\"140\" text-anchor=\"middle\" fill=\"#374151\">NaCl, silica gel absorb</text>"
                     "<text x=\"515\" y=\"185\" text-anchor=\"middle\" fill=\"#6b7280\">damp but still solid</text>"
                     "</g>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">deciding factor: vapour pressure of the saturated solution vs moisture in the air</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">water of crystallisation is lattice water — CuSO&#8324;&#183;5H&#8322;O &#8594; white anhydrous salt on heating, blue again with water</text>"
                     "</svg>")},
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/09-introduction-to-unit-crystal-lattice-and-unit-cell.json",
        "blocks": [
            {            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — lattice, unit cell and the counting that follows\n\n"
                    "The **crystal lattice** is the infinite three-dimensional array of points; the **unit "
                    "cell** is the smallest block which, stacked by translation, rebuilds the whole lattice. "
                    "A unit cell is described by six parameters — edge lengths a, b, c and the angles α, β, γ "
                    "— giving the seven crystal systems (cubic, tetragonal, orthorhombic, monoclinic, "
                    "triclinic, hexagonal, rhombohedral).\n\n"
                    "Particle counting per unit cell is pure geometry: a corner particle is shared by 8 cells "
                    "(1/8 each), a face-centre by 2 (1/2), an edge-centre by 4 (1/4), a body-centre by 1. "
                    "Hence: simple cubic Z = 8 × ⅛ = 1; body-centred cubic Z = 1 + 8 × ⅛ = 2; face-centred "
                    "cubic Z = 8 × ⅛ + 6 × ½ = 4. Coordination numbers follow: 6 (simple), 8 (bcc), 12 (fcc "
                    "and hcp). These counts feed every packing-efficiency and density numerical in the "
                    "chapter.")},
{            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — lattice, unit cell and the counting that follows\n\n"
                    "The **crystal lattice** is the infinite three-dimensional array of points; the **unit "
                    "cell** is the smallest block which, stacked by translation, rebuilds the whole lattice. "
                    "A unit cell is described by six parameters — edge lengths a, b, c and the angles α, β, γ "
                    "— giving the seven crystal systems (cubic, tetragonal, orthorhombic, monoclinic, "
                    "triclinic, hexagonal, rhombohedral).\n\n"
                    "Particle counting per unit cell is pure geometry: a corner particle is shared by 8 cells "
                    "(1/8 each), a face-centre by 2 (1/2), an edge-centre by 4 (1/4), a body-centre by 1. "
                    "Hence: simple cubic Z = 8 × ⅛ = 1; body-centred cubic Z = 1 + 8 × ⅛ = 2; face-centred "
                    "cubic Z = 8 × ⅛ + 6 × ½ = 4. Coordination numbers follow: 6 (simple), 8 (bcc), 12 (fcc "
                    "and hcp). These counts feed every packing-efficiency and density numerical in the "
                    "chapter."),
             "table": ("Unit-cell counting and the three cubic cells",
                       ["Position of particle", "Share belonging to one cell", "Simple cubic", "Body-centred", "Face-centred"],
                       [["Corner", "1/8", "8 × 1/8 = 1", "8 × 1/8 = 1", "8 × 1/8 = 1"],
                        ["Face centre", "1/2", "—", "—", "6 × 1/2 = 3"],
                        ["Body centre", "1", "—", "1", "—"],
                        ["Total Z", "—", "1", "2", "4"],
                        ["Coordination number", "—", "6", "8", "12"]])},
{            "after": "## 5. Comparison Tables",
             "md": ("### Deep dive — lattice, unit cell and the counting that follows\n\n"
                    "The **crystal lattice** is the infinite three-dimensional array of points; the **unit "
                    "cell** is the smallest block which, stacked by translation, rebuilds the whole lattice. "
                    "A unit cell is described by six parameters — edge lengths a, b, c and the angles α, β, γ "
                    "— giving the seven crystal systems (cubic, tetragonal, orthorhombic, monoclinic, "
                    "triclinic, hexagonal, rhombohedral).\n\n"
                    "Particle counting per unit cell is pure geometry: a corner particle is shared by 8 cells "
                    "(1/8 each), a face-centre by 2 (1/2), an edge-centre by 4 (1/4), a body-centre by 1. "
                    "Hence: simple cubic Z = 8 × ⅛ = 1; body-centred cubic Z = 1 + 8 × ⅛ = 2; face-centred "
                    "cubic Z = 8 × ⅛ + 6 × ½ = 4. Coordination numbers follow: 6 (simple), 8 (bcc), 12 (fcc "
                    "and hcp). These counts feed every packing-efficiency and density numerical in the "
                    "chapter."),
             "table": ("Unit-cell counting and the three cubic cells",
                       ["Position of particle", "Share belonging to one cell", "Simple cubic", "Body-centred", "Face-centred"],
                       [["Corner", "1/8", "8 × 1/8 = 1", "8 × 1/8 = 1", "8 × 1/8 = 1"],
                        ["Face centre", "1/2", "—", "—", "6 × 1/2 = 3"],
                        ["Body centre", "1", "—", "1", "—"],
                        ["Total Z", "—", "1", "2", "4"],
                        ["Coordination number", "—", "6", "8", "12"]]),
             "svg": ("Corner, face and body sharing — how unit-cell counts arise",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#111827\" stroke-width=\"2\" fill=\"none\">"
                     "<rect x=\"70\" y=\"70\" width=\"120\" height=\"120\"/>"
                     "</g>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"70\" cy=\"70\" r=\"8\"/><circle cx=\"190\" cy=\"70\" r=\"8\"/>"
                     "<circle cx=\"70\" cy=\"190\" r=\"8\"/><circle cx=\"190\" cy=\"190\" r=\"8\"/>"
                     "</g>"
                     "<text x=\"130\" y=\"240\" text-anchor=\"middle\" fill=\"#111827\">corners: 8 cells share each &#8594; 1/8</text>"
                     "<text x=\"130\" y=\"262\" text-anchor=\"middle\" fill=\"#6b7280\">4 visible here, 4 hidden behind</text>"
                     "<g stroke=\"#111827\" stroke-width=\"2\" fill=\"none\">"
                     "<rect x=\"330\" y=\"70\" width=\"120\" height=\"120\"/>"
                     "</g>"
                     "<circle cx=\"390\" cy=\"70\" r=\"8\" fill=\"#1d4ed8\"/>"
                     "<circle cx=\"390\" cy=\"130\" r=\"8\" fill=\"#166534\"/>"
                     "<text x=\"390\" y=\"240\" text-anchor=\"middle\" fill=\"#111827\">face centre: 2 cells share &#8594; 1/2</text>"
                     "<text x=\"390\" y=\"262\" text-anchor=\"middle\" fill=\"#6b7280\">green = face-centre particle</text>"
                     "<g stroke=\"#111827\" stroke-width=\"2\" fill=\"none\">"
                     "<rect x=\"510\" y=\"70\" width=\"90\" height=\"90\"/>"
                     "</g>"
                     "<circle cx=\"555\" cy=\"115\" r=\"8\" fill=\"#991b1b\"/>"
                     "<text x=\"555\" y=\"240\" text-anchor=\"middle\" fill=\"#111827\">body centre: wholly inside &#8594; 1</text>"
                     "<text x=\"555\" y=\"262\" text-anchor=\"middle\" fill=\"#6b7280\">red = body-centre particle</text>"
                     "<text x=\"320\" y=\"300\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">Z: simple = 1, bcc = 2, fcc = 4 — the counts behind every packing and density problem</text>"
                     "</svg>")},
        ],
    },
]
TOPICS = list(PART_A)
