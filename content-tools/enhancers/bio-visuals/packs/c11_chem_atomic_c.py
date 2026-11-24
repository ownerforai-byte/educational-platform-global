# Chemistry class-11 — Atomic structure part C (particles, Z, isotope families, Thomson, orbitals)
PART_A = [
    {
        "file": "class-11/chemistry/atomic-structure/20-atom-and-dalton-atomic-theory.json",
        "blocks": [
            {            "after": "### The particles, in order of discovery",
             "md": ("### Deep dive — the discovery chain and the particle data\n\n"
                    "The atom was dismantled in three steps: Thomson's cathode rays (1897) gave the electron "
                    "with charge-to-mass ratio e/m ≈ 1.76 × 10¹¹ C/kg; Millikan's oil-drop experiment (1909) "
                    "fixed the charge itself at 1.602 × 10⁻¹⁹ C, from which the mass 9.109 × 10⁻³¹ kg "
                    "(1/1837 of H) follows; Goldstein's canal rays (1886) contained the proton, and Chadwick "
                    "(1932) knocked the neutron out of beryllium with α-particles (⁹Be + α → ¹²C + n) — "
                    "neutral, so it had left no track in any electromagnetic experiment.\n\n"
                    "Each discovery forced a model change: Dalton's indivisible atom (1803) fell to "
                    "subatomic particles; Thomson's plum-pudding (1904) fell to α-scattering; Rutherford's "
                    "nuclear atom (1911) gained the neutron in 1932 and Bohr's quantum orbits (1913) "
                    "explained the electrons. Memorise the data row: e = 1.602 × 10⁻¹⁹ C, mₑ = 9.109 × "
                    "10⁻³¹ kg, m_p = 1.672 × 10⁻²⁷ kg, m_n = 1.675 × 10⁻²⁷ kg — neutron slightly heavier "
                    "than proton, electron negligible.")},
{            "after": "### The particles, in order of discovery",
             "md": ("### Deep dive — the discovery chain and the particle data\n\n"
                    "The atom was dismantled in three steps: Thomson's cathode rays (1897) gave the electron "
                    "with charge-to-mass ratio e/m ≈ 1.76 × 10¹¹ C/kg; Millikan's oil-drop experiment (1909) "
                    "fixed the charge itself at 1.602 × 10⁻¹⁹ C, from which the mass 9.109 × 10⁻³¹ kg "
                    "(1/1837 of H) follows; Goldstein's canal rays (1886) contained the proton, and Chadwick "
                    "(1932) knocked the neutron out of beryllium with α-particles (⁹Be + α → ¹²C + n) — "
                    "neutral, so it had left no track in any electromagnetic experiment.\n\n"
                    "Each discovery forced a model change: Dalton's indivisible atom (1803) fell to "
                    "subatomic particles; Thomson's plum-pudding (1904) fell to α-scattering; Rutherford's "
                    "nuclear atom (1911) gained the neutron in 1932 and Bohr's quantum orbits (1913) "
                    "explained the electrons. Memorise the data row: e = 1.602 × 10⁻¹⁹ C, mₑ = 9.109 × "
                    "10⁻³¹ kg, m_p = 1.672 × 10⁻²⁷ kg, m_n = 1.675 × 10⁻²⁷ kg — neutron slightly heavier "
                    "than proton, electron negligible."),
             "table": ("Subatomic particles — the memorised row",
                       ["Particle", "Discoverer (year)", "Charge (C)", "Mass (kg)", "Location"],
                       [["Electron e&#8315;", "J. J. Thomson (1897)", "&#8722;1.602 &#215; 10&#8315;&#185;&#8313;", "9.109 &#215; 10&#8315;&#179;&#185; (1/1837 of H)", "Around nucleus"],
                        ["Proton p&#8314;", "E. Goldstein (1886; named by Rutherford)", "+1.602 &#215; 10&#8315;&#185;&#8313;", "1.672 &#215; 10&#8315;&#178;&#183; (1 u)", "Nucleus"],
                        ["Neutron n", "J. Chadwick (1932)", "0", "1.675 &#215; 10&#8315;&#178;&#183; (1.008 u)", "Nucleus"]])},
            {"after": "### How each discovery reshaped the atom model",
             "svg": ("Model chain — Dalton to the quantum atom",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g font-size=\"12\" fill=\"#111827\">"
                     "<rect x=\"20\" y=\"60\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"75\" y=\"85\" text-anchor=\"middle\">Dalton 1803</text>"
                     "<text x=\"75\" y=\"103\" text-anchor=\"middle\" fill=\"#6b7280\">indivisible sphere</text>"
                     "<rect x=\"150\" y=\"60\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"205\" y=\"85\" text-anchor=\"middle\">Thomson 1904</text>"
                     "<text x=\"205\" y=\"103\" text-anchor=\"middle\" fill=\"#6b7280\">plum pudding</text>"
                     "<rect x=\"280\" y=\"60\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"335\" y=\"85\" text-anchor=\"middle\">Rutherford 1911</text>"
                     "<text x=\"335\" y=\"103\" text-anchor=\"middle\" fill=\"#6b7280\">nuclear atom</text>"
                     "<rect x=\"410\" y=\"60\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"465\" y=\"85\" text-anchor=\"middle\">Bohr 1913</text>"
                     "<text x=\"465\" y=\"103\" text-anchor=\"middle\" fill=\"#6b7280\">quantised orbits</text>"
                     "<rect x=\"540\" y=\"60\" width=\"90\" height=\"60\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"585\" y=\"85\" text-anchor=\"middle\">1932</text>"
                     "<text x=\"585\" y=\"103\" text-anchor=\"middle\" fill=\"#6b7280\">+ neutron</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"130\" y1=\"90\" x2=\"150\" y2=\"90\"/>"
                     "<line x1=\"260\" y1=\"90\" x2=\"280\" y2=\"90\"/>"
                     "<line x1=\"390\" y1=\"90\" x2=\"410\" y2=\"90\"/>"
                     "<line x1=\"520\" y1=\"90\" x2=\"540\" y2=\"90\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"170\" text-anchor=\"middle\" fill=\"#374151\">each model kept what survived measurement and discarded what failed</text>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#6b7280\">e/m (1897) &#8594; e (1909) &#8594; m&#8347; ; canal rays &#8594; proton ; &#945; + Be &#8594; neutron (1932)</text>"
                     "<text x=\"320\" y=\"235\" text-anchor=\"middle\" fill=\"#6b7280\">data row: e = 1.602 &#215; 10&#8315;&#185;&#8313; C &#183; m&#8347; = 9.109 &#215; 10&#8315;&#179;&#185; kg &#183; m&#8342; = 1.672 &#215; 10&#8315;&#178;&#183; kg &#183; m&#8345; = 1.675 &#215; 10&#8315;&#178;&#183; kg</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/24-atomic-number.json",
        "blocks": [
            {            "after": "### Moseley's X-ray evidence (1913)",
             "md": ("### Deep dive — Z as the true organiser of chemistry\n\n"
                    "Moseley measured the characteristic X-ray frequencies of dozens of elements and found "
                    "√ν = a(Z − b) — a straight line in √ν against Z, not against atomic weight. This did two "
                    "things at once: it gave every element an unambiguous integer (its proton count), and it "
                    "exposed the mis-ordered spots in the old periodic table — Te (127.6) correctly sits "
                    "before I (126.9) because Z(Te) = 52 < Z(I) = 53, and it revealed the gaps that became "
                    "technetium, promethium, hafnium and rhenium.\n\n"
                    "Z also powers the Bohr formulas for hydrogen-like species: rₙ ∝ n²/Z, Eₙ = −13.6 Z²/n² "
                    "eV, so He⁺ (Z = 2) has ionisation energy 4 × 13.6 = 54.4 eV and its Balmer lines sit in "
                    "the far UV. Chemically, Z fixes the electron count of the neutral atom (e⁻ = Z) and "
                    "therefore every property the periodic table organises — the modern periodic law is a law "
                    "about Z, not about mass.")},
{            "after": "### Moseley's X-ray evidence (1913)",
             "md": ("### Deep dive — Z as the true organiser of chemistry\n\n"
                    "Moseley measured the characteristic X-ray frequencies of dozens of elements and found "
                    "√ν = a(Z − b) — a straight line in √ν against Z, not against atomic weight. This did two "
                    "things at once: it gave every element an unambiguous integer (its proton count), and it "
                    "exposed the mis-ordered spots in the old periodic table — Te (127.6) correctly sits "
                    "before I (126.9) because Z(Te) = 52 < Z(I) = 53, and it revealed the gaps that became "
                    "technetium, promethium, hafnium and rhenium.\n\n"
                    "Z also powers the Bohr formulas for hydrogen-like species: rₙ ∝ n²/Z, Eₙ = −13.6 Z²/n² "
                    "eV, so He⁺ (Z = 2) has ionisation energy 4 × 13.6 = 54.4 eV and its Balmer lines sit in "
                    "the far UV. Chemically, Z fixes the electron count of the neutral atom (e⁻ = Z) and "
                    "therefore every property the periodic table organises — the modern periodic law is a law "
                    "about Z, not about mass."),
             "table": ("What Z decides — one number, many consequences",
                       ["Consequence", "Relation", "Example"],
                       [["Identity and periodic position", "Modern periodic law orders by Z", "Te (Z=52) before I (Z=53) despite higher mass"],
                        ["Electron count (neutral atom)", "e&#8315; = Z", "Na: Z = 11 &#8594; 11 electrons, config ends 3s&#185;"],
                        ["Ion electron count", "e&#8315; = Z &#8722; charge", "Fe&#179;&#8314;: 26 &#8722; 3 = 23 electrons"],
                        ["H-like species energies", "E&#8345; = &#8722;13.6 Z&#178;/n&#178; eV", "He&#8314; ionisation = 54.4 eV"],
                        ["X-ray position", "&#8730;&#957; = a(Z &#8722; b)", "Moseley's line predicted missing elements"]])},
            {"after": "### Uses of Z",
             "svg": ("Z on the periodic map — mass order vs proton order",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"80\" y=\"70\" width=\"90\" height=\"54\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"125\" y=\"92\" text-anchor=\"middle\">Te</text>"
                     "<text x=\"125\" y=\"112\" text-anchor=\"middle\" fill=\"#6b7280\">Z=52, A=127.6</text>"
                     "<rect x=\"190\" y=\"70\" width=\"90\" height=\"54\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"235\" y=\"92\" text-anchor=\"middle\">I</text>"
                     "<text x=\"235\" y=\"112\" text-anchor=\"middle\" fill=\"#6b7280\">Z=53, A=126.9</text>"
                     "</g>"
                     "<text x=\"160\" y=\"150\" text-anchor=\"middle\" fill=\"#166534\" font-size=\"13\">modern table: Z order — Te then I &#10003;</text>"
                     "<text x=\"160\" y=\"172\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"13\">mass order would wrongly put I first &#10007;</text>"
                     "<text x=\"470\" y=\"100\" text-anchor=\"middle\" fill=\"#111827\" font-size=\"14\">Moseley: &#8730;&#957; = a(Z &#8722; b)</text>"
                     "<text x=\"470\" y=\"124\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">straight line in &#8730;&#957; vs Z</text>"
                     "<text x=\"470\" y=\"146\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">gaps &#8594; Tc, Pm, Hf, Re found later</text>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">Z = proton count = the identity of an element; everything else follows</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/26-isobars-isotones-isodiaphers.json",
        "blocks": [
            {            "after": "### Definitions with examples",
             "md": ("### Deep dive — the family tree of atom pairs\n\n"
                    "The nucleus separates two independent labels: identity (Z) and mass (A = Z + N). "
                    "Varying one while holding the other fixed generates the family:\n\n"
                    "- **Isotopes** — same Z, different N: ¹H/²H/³H, ³⁵Cl/³⁷Cl, ¹²C/¹⁴C. Chemically nearly "
                    "identical (electrons decide chemistry), physically different (mass, radioactivity).\n"
                    "- **Isobars** — same A, different Z: ⁴⁰Ar/⁴⁰K/⁴⁰Ca. Different elements with the same "
                    "mass — common in decay chains because β-decay changes Z by one at fixed A.\n"
                    "- **Isotones** — same N: ³⁶S, ³⁷Cl, ³⁸Ar, ³⁹K, ⁴⁰Ca all have N = 20.\n"
                    "- **Isodiaphers** — same N − Z: ²³⁹U (92, 147) and ²³⁵Th (90, 145) both N − Z = 55.\n"
                    "- **Isoelectronic** — same electron count: N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺ all have "
                    "10 e⁻; ionic radii shrink across the series as Z grows.\n\n"
                    "Average atomic mass = Σ(fraction × isotopic mass): chlorine's 35.5 = 0.75 × 35 + 0.25 × "
                    "37 — the calculation NEB sets almost every year.")},
{            "after": "### Definitions with examples",
             "md": ("### Deep dive — the family tree of atom pairs\n\n"
                    "The nucleus separates two independent labels: identity (Z) and mass (A = Z + N). "
                    "Varying one while holding the other fixed generates the family:\n\n"
                    "- **Isotopes** — same Z, different N: ¹H/²H/³H, ³⁵Cl/³⁷Cl, ¹²C/¹⁴C. Chemically nearly "
                    "identical (electrons decide chemistry), physically different (mass, radioactivity).\n"
                    "- **Isobars** — same A, different Z: ⁴⁰Ar/⁴⁰K/⁴⁰Ca. Different elements with the same "
                    "mass — common in decay chains because β-decay changes Z by one at fixed A.\n"
                    "- **Isotones** — same N: ³⁶S, ³⁷Cl, ³⁸Ar, ³⁹K, ⁴⁰Ca all have N = 20.\n"
                    "- **Isodiaphers** — same N − Z: ²³⁹U (92, 147) and ²³⁵Th (90, 145) both N − Z = 55.\n"
                    "- **Isoelectronic** — same electron count: N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺ all have "
                    "10 e⁻; ionic radii shrink across the series as Z grows.\n\n"
                    "Average atomic mass = Σ(fraction × isotopic mass): chlorine's 35.5 = 0.75 × 35 + 0.25 × "
                    "37 — the calculation NEB sets almost every year."),
             "table": ("Same/different families — the one-table summary",
                       ["Family", "Same", "Different", "Examples", "Consequence"],
                       [["Isotopes", "Z", "N (A)", "&#185;H/&#178;H/&#179;H; &#179;&#8309;Cl/&#179;&#8311;Cl", "Same chemistry, different mass/radioactivity"],
                        ["Isobars", "A", "Z", "&#8308;&#8304;Ar/&#8308;&#8304;K/&#8308;&#8304;Ca", "Different elements, same mass"],
                        ["Isotones", "N", "Z and A", "&#179;&#8310;S, &#179;&#8311;Cl, &#179;&#8312;Ar (N=20)", "Same neutron count"],
                        ["Isodiaphers", "N &#8722; Z", "Z, A", "&#178;&#179;&#8313;U, &#178;&#179;&#8309;Th (N&#8722;Z=55)", "Same neutron excess"],
                        ["Isoelectronic", "e&#8315; count", "Z", "N&#179;&#8315; &#8594; Al&#179;&#8314; (10 e&#8315;)", "Radius shrinks as Z rises"]])},
            {"after": "### Chemical versus nuclear behaviour",
             "svg": ("Two independent labels — Z and N generate the whole family",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<line x1=\"90\" y1=\"250\" x2=\"560\" y2=\"250\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<line x1=\"90\" y1=\"250\" x2=\"90\" y2=\"50\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<text x=\"330\" y=\"280\" text-anchor=\"middle\" fill=\"#111827\">neutron number N &#8594;</text>"
                     "<text x=\"70\" y=\"150\" text-anchor=\"middle\" fill=\"#111827\" transform=\"rotate(-90 70 150)\">protons Z &#8594;</text>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"160\" cy=\"120\" r=\"7\"/><circle cx=\"200\" cy=\"120\" r=\"7\"/><circle cx=\"240\" cy=\"120\" r=\"7\"/>"
                     "</g>"
                     "<text x=\"200\" y=\"98\" text-anchor=\"middle\" fill=\"#1d4ed8\">isotopes: Z fixed, N varies</text>"
                     "<g fill=\"#991b1b\">"
                     "<circle cx=\"200\" cy=\"90\" r=\"7\"/><circle cx=\"200\" cy=\"150\" r=\"7\"/><circle cx=\"200\" cy=\"210\" r=\"7\"/>"
                     "</g>"
                     "<text x=\"310\" y=\"86\" fill=\"#991b1b\">isobars: A fixed &#8594; diagonal line</text>"
                     "<g fill=\"#166534\">"
                     "<circle cx=\"160\" cy=\"210\" r=\"7\"/><circle cx=\"200\" cy=\"210\" r=\"7\"/><circle cx=\"240\" cy=\"210\" r=\"7\"/>"
                     "</g>"
                     "<text x=\"310\" y=\"215\" fill=\"#166534\">isotones: N fixed &#8594; horizontal line</text>"
                     "<text x=\"320\" y=\"305\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">isodiaphers: constant N &#8722; Z &#8594; parallel diagonals; isoelectronic: same total e&#8315;</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/27-thomson-plum-pudding-model.json",
        "blocks": [
            {            "after": "### The plum-pudding (watermelon) model, 1904",
             "md": ("### Deep dive — why the pudding had to fail, quantitatively\n\n"
                    "Thomson's model (1904) spread the positive charge uniformly through a sphere of radius "
                    "≈ 10⁻¹⁰ m with electrons embedded like plums. Its fatal prediction is calculable: the "
                    "maximum electric field inside a uniformly charged sphere occurs at its surface, and the "
                    "maximum deflection a fast α can suffer from such a diffuse charge is a small fraction of "
                    "a degree. Geiger and Marsden measured deflections of 90° and beyond at a rate of 1 in "
                    "8000 — impossible for distributed charge, inevitable for a point-like nucleus whose "
                    "Coulomb repulsion at 10⁻¹⁴ m reaches tens of MeV of potential energy.\n\n"
                    "Credit where due: the model was the first built on measured particles (e/m from cathode "
                    "rays), it correctly demanded electrical neutrality, and its failure defined the two "
                    "requirements every later model must satisfy — a tiny massive positive core, and a "
                    "quantum rule that keeps the electrons from spiralling in. The chain Dalton → Thomson → "
                    "Rutherford → Bohr is the exam's favourite framing.")},
{            "after": "### The plum-pudding (watermelon) model, 1904",
             "md": ("### Deep dive — why the pudding had to fail, quantitatively\n\n"
                    "Thomson's model (1904) spread the positive charge uniformly through a sphere of radius "
                    "≈ 10⁻¹⁰ m with electrons embedded like plums. Its fatal prediction is calculable: the "
                    "maximum electric field inside a uniformly charged sphere occurs at its surface, and the "
                    "maximum deflection a fast α can suffer from such a diffuse charge is a small fraction of "
                    "a degree. Geiger and Marsden measured deflections of 90° and beyond at a rate of 1 in "
                    "8000 — impossible for distributed charge, inevitable for a point-like nucleus whose "
                    "Coulomb repulsion at 10⁻¹⁴ m reaches tens of MeV of potential energy.\n\n"
                    "Credit where due: the model was the first built on measured particles (e/m from cathode "
                    "rays), it correctly demanded electrical neutrality, and its failure defined the two "
                    "requirements every later model must satisfy — a tiny massive positive core, and a "
                    "quantum rule that keeps the electrons from spiralling in. The chain Dalton → Thomson → "
                    "Rutherford → Bohr is the exam's favourite framing."),
             "table": ("Plum pudding vs α-scattering — the decisive test",
                       ["Aspect", "Thomson predicts", "Geiger–Marsden observe", "Verdict"],
                       [["Deflection angles", "&lt; 1&#176; (diffuse charge)", "Many &gt; 90&#176;, ~1 in 10&#8308; back", "Model fails"],
                        ["Mass distribution", "Spread through the sphere", "Concentrated in ~10&#8315;&#185;&#8309; m core", "Nucleus required"],
                        ["Positive charge", "Uniform cloud", "Point-like centre", "Nucleus required"],
                        ["Neutrality", "Electrons embedded to balance", "Still true", "Survived"],
                        ["Electron arrangement", "Stable rings in the sphere", "Needs quantum rules", "Bohr's job"]])},
            {"after": "### Predictions versus the α-scattering result",
             "svg": ("Diffuse charge bends weakly; a point nucleus can turn an α back",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g fill=\"#fef3c7\" stroke=\"#a16207\">"
                     "<circle cx=\"170\" cy=\"150\" r=\"80\"/>"
                     "</g>"
                     "<g fill=\"#a16207\">"
                     "<circle cx=\"140\" cy=\"130\" r=\"5\"/><circle cx=\"180\" cy=\"110\" r=\"5\"/>"
                     "<circle cx=\"200\" cy=\"160\" r=\"5\"/><circle cx=\"150\" cy=\"180\" r=\"5\"/>"
                     "</g>"
                     "<path d=\"M30 150 L 90 150\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M250 150 C 290 148, 320 146, 360 146\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<text x=\"170\" y=\"250\" text-anchor=\"middle\" fill=\"#374151\">Thomson: diffuse + charge</text>"
                     "<text x=\"170\" y=\"270\" text-anchor=\"middle\" fill=\"#991b1b\">predicts &lt; 1&#176; bends — wrong</text>"
                     "<circle cx=\"470\" cy=\"150\" r=\"9\" fill=\"#111827\"/>"
                     "<path d=\"M330 150 L 440 150\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M478 142 C 520 110, 560 90, 600 80\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<text x=\"470\" y=\"250\" text-anchor=\"middle\" fill=\"#374151\">Rutherford: point nucleus</text>"
                     "<text x=\"470\" y=\"270\" text-anchor=\"middle\" fill=\"#166534\">large-angle turns &#8594; measured</text>"
                     "<text x=\"320\" y=\"292\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">the same α beam, two models, one decisive experiment</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
