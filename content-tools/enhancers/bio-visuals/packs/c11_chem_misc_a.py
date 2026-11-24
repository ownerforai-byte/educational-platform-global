# Chemistry class-11 — Periodic classification + oxidation-reduction (part packs)
PART_A = [
    {
        "file": "class-11/chemistry/classification-of-elements-and-periodic-table/03-iupac-classification-and-periodic-trends.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the four blocks and the s/p/d/f address system\n\n"
                    "The modern long-form periodic table is sorted by the subshell being filled, giving "
                    "four blocks: **s-block** (groups 1–2, H and He aside; reactive metals), **p-block** "
                    "(groups 13–18; metals, metalloids, non-metals and the noble gases), **d-block** "
                    "(groups 3–12; transition metals, all solid conductors, variable oxidation states) and "
                    "**f-block** (lanthanides and actinides, placed below to keep the table compact). "
                    "Periods correspond to the highest principal quantum number in use: 2, 8, 8, 18, 18, "
                    "32 elements.\n\n"
                    "IUPAC temporary names decode directly from the digits: un = 1, bi = 2, tri = 3, quad "
                    "= 4, pent = 5, hex = 6, sept = 7, oct = 8, enn = 9, with suffix -ium and symbol from "
                    "first letters (element 114 → ununquadium → Uuq, now flerovium Fl). Drop a duplicate "
                    "letter in the symbol and the 'n' before 'enn' — the two spelling rules NEB checks."),
             "table": ("The four blocks — what fills, where they sit, who they are",
                       ["Block", "Subshell filling", "Groups", "Character"],
                       [["s", "ns&#185;&#8211;&#178;", "1&#8211;2 (+He)", "Very reactive metals; low IE; form +1/+2 ions"],
                        ["p", "np&#185;&#8211;&#8310;", "13&#8211;18", "Spread of properties: metals &#8594; metalloids &#8594; non-metals &#8594; noble gases"],
                        ["d", "(n&#8722;1)d&#185;&#8211;&#185;&#8304;", "3&#8211;12", "Transition metals; variable oxidation states; coloured ions"],
                        ["f", "(n&#8722;2)f&#185;&#8211;&#185;&#8308;", "La/Ac series", "Lanthanides, actinides; mostly +3; placed below"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("The periodic table as four blocks — sorted by the subshell being filled",
                     "<svg viewBox=\"0 0 640 340\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"340\" fill=\"#ffffff\"/>"
                     "<g fill=\"#eff6ff\" stroke=\"#1d4ed8\">"
                     "<rect x=\"60\" y=\"50\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"60\" y=\"85\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"60\" y=\"120\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"60\" y=\"155\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"60\" y=\"190\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"60\" y=\"225\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"60\" y=\"260\" width=\"90\" height=\"30\"/>"
                     "</g>"
                     "<text x=\"105\" y=\"180\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"15\">s-block</text>"
                     "<g fill=\"#f0fdf4\" stroke=\"#166534\">"
                     "<rect x=\"160\" y=\"120\" width=\"380\" height=\"30\"/>"
                     "<rect x=\"160\" y=\"155\" width=\"380\" height=\"30\"/>"
                     "<rect x=\"160\" y=\"190\" width=\"380\" height=\"30\"/>"
                     "<rect x=\"160\" y=\"225\" width=\"380\" height=\"30\"/>"
                     "<rect x=\"160\" y=\"260\" width=\"380\" height=\"30\"/>"
                     "<rect x=\"160\" y=\"50\" width=\"380\" height=\"60\"/>"
                     "</g>"
                     "<text x=\"350\" y=\"180\" text-anchor=\"middle\" fill=\"#166534\" font-size=\"15\">d-block (transition metals)</text>"
                     "<g fill=\"#fefce8\" stroke=\"#a16207\">"
                     "<rect x=\"460\" y=\"50\" width=\"60\" height=\"240\"/>"
                     "</g>"
                     "<text x=\"490\" y=\"180\" text-anchor=\"middle\" fill=\"#a16207\" font-size=\"14\">p-block</text>"
                     "<g fill=\"#fdf2f8\" stroke=\"#be185d\">"
                     "<rect x=\"160\" y=\"300\" width=\"230\" height=\"26\"/>"
                     "<rect x=\"160\" y=\"300\" width=\"0\" height=\"0\"/>"
                     "</g>"
                     "<text x=\"275\" y=\"318\" text-anchor=\"middle\" fill=\"#be185d\" font-size=\"12\">f-block (lanthanides, actinides)</text>"
                     "<text x=\"320\" y=\"30\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">periods = highest n in use; groups = outer electrons; blocks = subshell being filled</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/classification-of-elements-and-periodic-table/04-nuclear-charge-and-effective-nuclear-charge.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — Z_eff: the tug-of-war that drives every trend\n\n"
                    "Every outer electron feels the full nuclear pull Z minus the shielding of the "
                    "electrons between it and the nucleus: **Z_eff = Z − σ** (Slater's rules give σ "
                    "systematically). Z_eff is the single quantity from which the periodic trends follow:\n\n"
                    "- **Across a period** — Z rises while σ barely changes (electrons enter the same "
                    "shell): Z_eff climbs from Na (+2.5 effective) to Cl (+6.1) → radius shrinks, IE and "
                    "EN rise, metallic character falls.\n"
                    "- **Down a group** — Z grows but each new shell adds a full layer of shielding, so "
                    "Z_eff stays roughly constant while n grows → radius grows, IE falls, reactivity of "
                    "metals rises.\n"
                    "- **Shielding vs penetration** — shielding is what *other* electrons do to you; "
                    "penetration is how well *your* orbital avoids them: s > p > d > f (s electrons dive "
                    "closest). This ordering explains why 4s fills before 3d and why the Be→B and N→O IE "
                    "dips occur."),
             "table": ("Z_eff across period 3 — the numbers behind the trends",
                       ["Element", "Z", "σ (approx)", "Z_eff", "Radius (pm)"],
                       [["Na", "11", "8.8", "2.2", "186"],
                        ["Mg", "12", "9.15", "2.85", "160"],
                        ["Al", "13", "9.5", "3.5", "143"],
                        ["S", "16", "10.55", "5.45", "104"],
                        ["Cl", "17", "10.9", "6.1", "99"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Z_eff — across a period it climbs; down a group it stays put",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"60\" y1=\"240\" x2=\"300\" y2=\"240\"/>"
                     "<line x1=\"60\" y1=\"240\" x2=\"60\" y2=\"60\"/>"
                     "<line x1=\"360\" y1=\"240\" x2=\"600\" y2=\"240\"/>"
                     "<line x1=\"360\" y1=\"240\" x2=\"360\" y2=\"60\"/>"
                     "</g>"
                     "<line x1=\"75\" y1=\"200\" x2=\"290\" y2=\"80\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"270\" text-anchor=\"middle\" fill=\"#111827\">across a period: Z_eff &#8597; strongly</text>"
                     "<line x1=\"380\" y1=\"150\" x2=\"590\" y2=\"150\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"480\" y=\"270\" text-anchor=\"middle\" fill=\"#111827\">down a group: Z_eff &#8776; constant</text>"
                     "<text x=\"90\" y=\"52\" fill=\"#6b7280\" font-size=\"12\">Z_eff</text>"
                     "<text x=\"320\" y=\"292\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"13\">Z_eff = Z &#8722; &#963;; radius, IE, EN all follow this one number</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/classification-of-elements-and-periodic-table/05-periodic-trend-and-periodicity-atomic-radii-ionic-radii-ionization-energy-electron-affinity-elec.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — six trends, one engine (Z_eff vs n)\n\n"
                    "Every periodic trend is the balance between effective nuclear charge (pull in) and "
                    "the principal quantum number (push out):\n\n"
                    "- **Atomic radius** — falls across (Z_eff up), grows down (n up). Covalent radius = "
                    "half the bond length; van der Waals radius is larger (no sharing).\n"
                    "- **Ionic radius** — cations smaller (loss of shell + higher Z_eff per electron: Na "
                    "186 → Na⁺ 102 pm); anions larger (added electron, extra repulsion: Cl 99 → Cl⁻ 181 "
                    "pm). Isoelectronic series O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺ — radius falls as Z rises "
                    "with the same electron count.\n"
                    "- **Ionisation energy** — rises across, falls down; dips at Be→B (2s easier to "
                    "remove than 2p) and N→O (half-filled p³ pairing repulsion). Successive IEs jump "
                    "hugely after a noble-gas core.\n"
                    "- **Electron affinity** — Cl > F (F's compact 2p repels the incoming electron); "
                    "noble gases positive.\n"
                    "- **Electronegativity** — F 4.0 tops the scale; used to predict bond type and "
                    "dipole.\n"
                    "- **Metallic character** — falls across, rises down; Cs and F are the extremes."),
             "table": ("Periodic trends — across a period / down a group",
                       ["Property", "Across a period", "Down a group", "Famous exception"],
                       [["Atomic radius", "Decreases", "Increases", "noble-gas radii (van der Waals) larger"],
                        ["Ionisation energy", "Increases", "Decreases", "Be&#8594;B and N&#8594;O dips"],
                        ["Electron affinity", "Increases (overall)", "Decreases", "F &lt; Cl"],
                        ["Electronegativity", "Increases", "Decreases", "—"],
                        ["Metallic character", "Decreases", "Increases", "—"],
                        ["Oxide character", "Basic &#8594; acidic", "More basic down", "Al&#8322;O&#8323; amphoteric"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("The isoelectronic squeeze — same 10 electrons, shrinking radius",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"2\" fill=\"none\">"
                     "<circle cx=\"100\" cy=\"140\" r=\"80\"/>"
                     "<circle cx=\"250\" cy=\"140\" r=\"64\"/>"
                     "<circle cx=\"380\" cy=\"140\" r=\"50\"/>"
                     "<circle cx=\"490\" cy=\"140\" r=\"38\"/>"
                     "<circle cx=\"580\" cy=\"140\" r=\"28\"/>"
                     "</g>"
                     "<g font-size=\"13\" fill=\"#111827\" text-anchor=\"middle\">"
                     "<text x=\"100\" y=\"250\">O&#178;&#8722; (Z=8)</text>"
                     "<text x=\"250\" y=\"250\">F&#8315; (Z=9)</text>"
                     "<text x=\"380\" y=\"250\">Na&#8314; (Z=11)</text>"
                     "<text x=\"490\" y=\"250\">Mg&#178;&#8314; (Z=12)</text>"
                     "<text x=\"580\" y=\"250\">Al&#179;&#8314; (Z=13)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"50\" text-anchor=\"middle\" fill=\"#374151\">all hold 10 electrons — the higher Z pulls the same cloud tighter</text>"
                     "<text x=\"320\" y=\"80\" text-anchor=\"middle\" fill=\"#1d4ed8\">radius: O&#178;&#8722; &gt; F&#8315; &gt; Na&#8314; &gt; Mg&#178;&#8314; &gt; Al&#179;&#8314;</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/oxidation-and-reduction/01-general-and-electronic-concept-of-oxidation-and-reduction.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the three definitions and the electron bookkeeping\n\n"
                    "Oxidation and reduction have three layers of definition, each wider than the last: "
                    "**classical** (addition of oxygen/removal of hydrogen = oxidation; reverse = "
                    "reduction), **electron** (loss of electrons = oxidation, gain = reduction — "
                    "OIL RIG), and **oxidation number** (increase in O.N. = oxidation). Every redox "
                    "reaction is a matched pair: the species oxidised is the **reducing agent** (it gives "
                    "electrons away), and the species reduced is the **oxidising agent** (it takes them) — "
                    "the agent and the process always belong to opposite partners.\n\n"
                    "Oxidation-number rules in assignment order: free element 0; monatomic ion = its "
                    "charge; F = −1; O = −2 except peroxides (−1) and OF₂ (+2); H = +1 except metal "
                    "hydrides (−1); the sum equals the total charge. Example walkthrough: in MnO₄⁻, "
                    "Mn + 4(−2) = −1 → Mn = +7; in ClO⁻, Cl = +1. The oxidation-number method balances "
                    "equations by equating total increase and decrease of O.N."),
             "table": ("Three definitions of oxidation/reduction",
                       ["Definition level", "Oxidation is", "Reduction is", "Example"],
                       [["Classical", "Gain of O / loss of H", "Loss of O / gain of H", "2Mg + O&#8322; &#8594; 2MgO"],
                        ["Electronic", "Loss of e&#8315;", "Gain of e&#8315;", "Zn &#8594; Zn&#178;&#8314; + 2e&#8315;"],
                        ["Oxidation number", "O.N. increases", "O.N. decreases", "Mn: +7 &#8594; +2 in MnO&#8324;&#8315; + Fe&#178;&#8314;"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("The redox handshake — who loses gives; who gains takes",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"70\" y=\"80\" width=\"200\" height=\"80\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"170\" y=\"110\" text-anchor=\"middle\" fill=\"#991b1b\">Zn &#8594; Zn&#178;&#8314; + 2e&#8315;</text>"
                     "<text x=\"170\" y=\"135\" text-anchor=\"middle\" fill=\"#374151\">oxidised = reducing agent</text>"
                     "<rect x=\"370\" y=\"80\" width=\"200\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"470\" y=\"110\" text-anchor=\"middle\" fill=\"#1d4ed8\">Cu&#178;&#8314; + 2e&#8315; &#8594; Cu</text>"
                     "<text x=\"470\" y=\"135\" text-anchor=\"middle\" fill=\"#374151\">reduced = oxidising agent</text>"
                     "<path d=\"M270 110 L 365 110\" stroke=\"#a16207\" stroke-width=\"3\"/>"
                     "<text x=\"318\" y=\"98\" text-anchor=\"middle\" fill=\"#a16207\" font-size=\"13\">2e&#8315; travel</text>"
                     "<text x=\"320\" y=\"220\" text-anchor=\"middle\" fill=\"#111827\">Zn + CuSO&#8324; &#8594; ZnSO&#8324; + Cu</text>"
                     "<text x=\"320\" y=\"255\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">oxidation and reduction always occur together — one loses what the other gains</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
