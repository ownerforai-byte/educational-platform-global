# Chemistry class-11 — Atomic structure part A (Rutherford, Bohr, spectrum)
PART_A = [
    {
        "file": "class-11/chemistry/atomic-structure/01-rutherford-model.json",
        "blocks": [
            {            "after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive — the experiment that replaced pudding with a nucleus\n\n"
                    "Rutherford, Geiger and Marsden (1909–1911) fired α-particles (He²⁺, ~7.7 × 10⁻²⁷ kg, "
                    "fast) at a gold foil ~1000 atoms thick and counted scintillations on a ZnS screen that "
                    "could be swung around the target. Three observations, three conclusions:\n\n"
                    "- **Most α passed straight through** → the atom is mostly empty space.\n"
                    "- **A few (≈1 in 8000) deflected > 90°** → a small, heavy, positively charged centre "
                    "repels them; the electrostatic repulsion of a distributed charge could never turn a fast "
                    "α through such angles.\n"
                    "- **About 1 in 10⁴ turned back** → the centre carries essentially all the mass.\n\n"
                    "The distance of closest approach for a head-on collision, d = 2 × (potential energy at "
                    "turning point) /(kinetic energy) = Ze²/(4πε₀ × KE), sets an upper bound on nuclear size "
                    "(for gold with 5.5 MeV α, ≈ 4 × 10⁻¹⁴ m) — the nucleus is ~10⁵ times smaller than the "
                    "atom. Scattering at angle θ follows sin⁻⁴(θ/2), the law Geiger and Marsden verified.")},
{            "after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive — the experiment that replaced pudding with a nucleus\n\n"
                    "Rutherford, Geiger and Marsden (1909–1911) fired α-particles (He²⁺, ~7.7 × 10⁻²⁷ kg, "
                    "fast) at a gold foil ~1000 atoms thick and counted scintillations on a ZnS screen that "
                    "could be swung around the target. Three observations, three conclusions:\n\n"
                    "- **Most α passed straight through** → the atom is mostly empty space.\n"
                    "- **A few (≈1 in 8000) deflected > 90°** → a small, heavy, positively charged centre "
                    "repels them; the electrostatic repulsion of a distributed charge could never turn a fast "
                    "α through such angles.\n"
                    "- **About 1 in 10⁴ turned back** → the centre carries essentially all the mass.\n\n"
                    "The distance of closest approach for a head-on collision, d = 2 × (potential energy at "
                    "turning point) /(kinetic energy) = Ze²/(4πε₀ × KE), sets an upper bound on nuclear size "
                    "(for gold with 5.5 MeV α, ≈ 4 × 10⁻¹⁴ m) — the nucleus is ~10⁵ times smaller than the "
                    "atom. Scattering at angle θ follows sin⁻⁴(θ/2), the law Geiger and Marsden verified."),
             "table": ("Observation → conclusion — the logic chain NEB asks for",
                       ["Observation", "Fraction", "Conclusion"],
                       [["α passes straight through", "≈ 99.86%", "Atom is mostly empty space"],
                        ["Small-angle deflection", "Common", "Electrons cannot deflect a heavy α; positive charge does"],
                        ["Deflection &gt; 90°", "≈ 1 in 8000", "Positive charge concentrated in a tiny volume"],
                        ["Back-scattering (≈180°)", "≈ 1 in 10⁴", "Nearly all mass sits in that volume"],
                        ["Angle dependence", "sin⁻⁴(θ/2)", "Coulomb scattering off a point-like nucleus"]])},
            {"after": "## 3. Conceptual Relationships",
             "svg": ("α-scattering — what each outcome proved about the atom",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<rect x=\"70\" y=\"80\" width=\"18\" height=\"160\" fill=\"#fde68a\" stroke=\"#a16207\"/>"
                     "<text x=\"79\" y=\"270\" text-anchor=\"middle\" fill=\"#a16207\" font-size=\"12\">Au foil</text>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"10\" y1=\"100\" x2=\"70\" y2=\"100\"/>"
                     "<line x1=\"10\" y1=\"140\" x2=\"70\" y2=\"140\"/>"
                     "<line x1=\"10\" y1=\"180\" x2=\"70\" y2=\"180\"/>"
                     "</g>"
                     "<path d=\"M88 100 C 200 100, 300 100, 420 100\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M88 140 C 180 140, 240 90, 330 70\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M88 180 C 150 180, 120 220, 60 240\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<text x=\"430\" y=\"104\" fill=\"#1d4ed8\" font-size=\"13\">most pass straight on (99.86%)</text>"
                     "<text x=\"336\" y=\"62\" fill=\"#991b1b\" font-size=\"13\">small-angle bends</text>"
                     "<text x=\"66\" y=\"256\" fill=\"#991b1b\" font-size=\"13\">~1 in 10&#8309; bounces back</text>"
                     "<circle cx=\"95\" cy=\"150\" r=\"6\" fill=\"#111827\"/>"
                     "<text x=\"112\" y=\"155\" fill=\"#111827\" font-size=\"12\">nucleus: all + charge, all mass, ~10&#8315;&#8309; of atom size</text>"
                     "<text x=\"320\" y=\"305\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">empty space + tiny dense core — the nuclear model is born</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/02-bohr-postulates.json",
        "blocks": [
            {            "after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive — Bohr's four rules and what each one buys\n\n"
                    "Bohr (1913) rescued the Rutherford atom with two quantisation rules and two classical "
                    "ones:\n\n"
                    "1. **Stationary states** — the electron moves only in certain circular orbits "
                    "(mvr = nh/2π), and while in one it does *not* radiate, although classical physics demands "
                    "that an accelerating charge must. This single non-classical assumption saves the atom "
                    "from the spiral-in death.\n"
                    "2. **Energy emission/absorption only on jump** — hν = E₂ − E₁, which turns the line "
                    "spectrum into atomic bookkeeping.\n"
                    "3. **Angular momentum quantisation** — n = 1, 2, 3… only; orbit radius rₙ = 0.529 n² Å "
                    "and energy Eₙ = −13.6/n² eV for hydrogen.\n"
                    "4. **Classical mechanics within an orbit** — Coulomb force supplies the centripetal "
                    "force: mv²/r = e²/(4πε₀r²).\n\n"
                    "Consequences worth memorising: velocity falls as 1/n, radius grows as n², and the "
                    "ionisation energy of hydrogen (jump from n = 1 to ∞) is exactly 13.6 eV = 1312 kJ/mol — "
                    "the number that validates the whole model.")},
{            "after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive — Bohr's four rules and what each one buys\n\n"
                    "Bohr (1913) rescued the Rutherford atom with two quantisation rules and two classical "
                    "ones:\n\n"
                    "1. **Stationary states** — the electron moves only in certain circular orbits "
                    "(mvr = nh/2π), and while in one it does *not* radiate, although classical physics demands "
                    "that an accelerating charge must. This single non-classical assumption saves the atom "
                    "from the spiral-in death.\n"
                    "2. **Energy emission/absorption only on jump** — hν = E₂ − E₁, which turns the line "
                    "spectrum into atomic bookkeeping.\n"
                    "3. **Angular momentum quantisation** — n = 1, 2, 3… only; orbit radius rₙ = 0.529 n² Å "
                    "and energy Eₙ = −13.6/n² eV for hydrogen.\n"
                    "4. **Classical mechanics within an orbit** — Coulomb force supplies the centripetal "
                    "force: mv²/r = e²/(4πε₀r²).\n\n"
                    "Consequences worth memorising: velocity falls as 1/n, radius grows as n², and the "
                    "ionisation energy of hydrogen (jump from n = 1 to ∞) is exactly 13.6 eV = 1312 kJ/mol — "
                    "the number that validates the whole model."),
             "table": ("Bohr's postulates → what each explains",
                       ["Postulate", "Statement", "Explains"],
                       [["Stationary states", "Electron radiates nothing while in an allowed orbit", "Why atoms are stable at all"],
                        ["Quantised angular momentum", "mvr = nh/2π", "Why only certain orbits exist"],
                        ["Jump condition", "h&#957; = E&#8322; &#8722; E&#8321;", "Line spectra and the Rydberg formula"],
                        ["Classical force balance", "mv&#178;/r = e&#178;/4&#960;&#949;&#8320;r&#178;", "Numerical radii and energies of H-like species"]])},
            {"after": "## 3. Conceptual Relationships",
             "svg": ("Bohr energy levels of hydrogen — jumps make the lines",
                     "<svg viewBox=\"0 0 640 330\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"330\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#111827\" stroke-width=\"2\">"
                     "<line x1=\"120\" y1=\"70\" x2=\"520\" y2=\"70\"/>"
                     "<line x1=\"120\" y1=\"130\" x2=\"520\" y2=\"130\"/>"
                     "<line x1=\"120\" y1=\"180\" x2=\"520\" y2=\"180\"/>"
                     "<line x1=\"120\" y1=\"220\" x2=\"520\" y2=\"220\"/>"
                     "<line x1=\"120\" y1=\"250\" x2=\"520\" y2=\"250\"/>"
                     "</g>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<text x=\"110\" y=\"74\" text-anchor=\"end\">n = &#8734;  0 eV</text>"
                     "<text x=\"110\" y=\"134\" text-anchor=\"end\">n = 3  &#8722;1.51 eV</text>"
                     "<text x=\"110\" y=\"184\" text-anchor=\"end\">n = 2  &#8722;3.40 eV</text>"
                     "<text x=\"110\" y=\"254\" text-anchor=\"end\">n = 1  &#8722;13.6 eV</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"220\" y1=\"130\" x2=\"220\" y2=\"250\"/>"
                     "<line x1=\"320\" y1=\"180\" x2=\"320\" y2=\"250\"/>"
                     "<line x1=\"420\" y1=\"70\" x2=\"420\" y2=\"250\"/>"
                     "</g>"
                     "<g font-size=\"12\" fill=\"#1d4ed8\">"
                     "<text x=\"228\" y=\"195\">3 &#8594; 1 Lyman (UV)</text>"
                     "<text x=\"328\" y=\"220\">2 &#8594; 1 Lyman</text>"
                     "<text x=\"428\" y=\"160\">&#8734; &#8594; 1 (limit)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"300\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">E&#8345; = &#8722;13.6/n&#178; eV; spacing shrinks as n grows — lines converge to a series limit</text>"
                     "<text x=\"320\" y=\"320\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">Balmer lines (n &#8594; 2) are visible: 656, 486, 434, 410 nm</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/03-hydrogen-spectrum.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the five series as one formula with a moving target\n\n"
                    "Every hydrogen line obeys 1/λ = R_H (1/n₁² − 1/n₂²), R_H = 1.097 × 10⁷ m⁻¹. The series "
                    "differ only in which level the electron *lands on* (n₁):\n\n"
                    "- **Lyman** (n₁ = 1, UV): discovered 1906; the series limit at 91.2 nm corresponds to "
                    "ionisation from the ground state — 13.6 eV exactly.\n"
                    "- **Balmer** (n₁ = 2, visible): Hα 656 nm red, Hβ 486 nm blue-green, Hγ 434 nm, Hδ "
                    "410 nm — the four lines every textbook shows and the first series ever fitted (Balmer, "
                    "1885, a schoolteacher working purely from wavelengths).\n"
                    "- **Paschen** (n₁ = 3, IR), **Brackett** (n₁ = 4, IR), **Pfund** (n₁ = 5, IR).\n\n"
                    "Numerical discipline: convert λ to m, keep R in m⁻¹, and remember the *first* line of a "
                    "series is n₂ = n₁ + 1 while the *second* line is n₂ = n₁ + 2 — the classic NEB trap. "
                    "Lines converge as n₂ → ∞ because level spacing shrinks as 1/n².")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the five series as one formula with a moving target\n\n"
                    "Every hydrogen line obeys 1/λ = R_H (1/n₁² − 1/n₂²), R_H = 1.097 × 10⁷ m⁻¹. The series "
                    "differ only in which level the electron *lands on* (n₁):\n\n"
                    "- **Lyman** (n₁ = 1, UV): discovered 1906; the series limit at 91.2 nm corresponds to "
                    "ionisation from the ground state — 13.6 eV exactly.\n"
                    "- **Balmer** (n₁ = 2, visible): Hα 656 nm red, Hβ 486 nm blue-green, Hγ 434 nm, Hδ "
                    "410 nm — the four lines every textbook shows and the first series ever fitted (Balmer, "
                    "1885, a schoolteacher working purely from wavelengths).\n"
                    "- **Paschen** (n₁ = 3, IR), **Brackett** (n₁ = 4, IR), **Pfund** (n₁ = 5, IR).\n\n"
                    "Numerical discipline: convert λ to m, keep R in m⁻¹, and remember the *first* line of a "
                    "series is n₂ = n₁ + 1 while the *second* line is n₂ = n₁ + 2 — the classic NEB trap. "
                    "Lines converge as n₂ → ∞ because level spacing shrinks as 1/n²."),
             "table": ("Hydrogen spectral series — the landing level decides the region",
                       ["Series", "n₁ (lands on)", "n₂ range", "Region", "First line λ"],
                       [["Lyman", "1", "2, 3, 4, …", "Ultraviolet", "121.6 nm"],
                        ["Balmer", "2", "3, 4, 5, …", "Visible", "656.3 nm (Hα)"],
                        ["Paschen", "3", "4, 5, 6, …", "Infrared", "1875 nm"],
                        ["Brackett", "4", "5, 6, 7, …", "Infrared", "4051 nm"],
                        ["Pfund", "5", "6, 7, 8, …", "Infrared", "7460 nm"]])},
            {"after": "## 7. Exam Application",
             "svg": ("The hydrogen spectrum — five series, one landing level each",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#111827\" stroke-width=\"2\">"
                     "<line x1=\"100\" y1=\"60\" x2=\"560\" y2=\"60\"/>"
                     "<line x1=\"100\" y1=\"110\" x2=\"560\" y2=\"110\"/>"
                     "<line x1=\"100\" y1=\"150\" x2=\"560\" y2=\"150\"/>"
                     "<line x1=\"100\" y1=\"185\" x2=\"560\" y2=\"185\"/>"
                     "<line x1=\"100\" y1=\"215\" x2=\"560\" y2=\"215\"/>"
                     "<line x1=\"100\" y1=\"240\" x2=\"560\" y2=\"240\"/>"
                     "</g>"
                     "<g font-size=\"12\" fill=\"#111827\">"
                     "<text x=\"92\" y=\"64\" text-anchor=\"end\">n = 5</text>"
                     "<text x=\"92\" y=\"114\" text-anchor=\"end\">n = 4</text>"
                     "<text x=\"92\" y=\"154\" text-anchor=\"end\">n = 3</text>"
                     "<text x=\"92\" y=\"189\" text-anchor=\"end\">n = 2</text>"
                     "<text x=\"92\" y=\"244\" text-anchor=\"end\">n = 1</text>"
                     "</g>"
                     "<g stroke-width=\"2\">"
                     "<line x1=\"160\" y1=\"110\" x2=\"160\" y2=\"240\" stroke=\"#7c3aed\"/>"
                     "<line x1=\"230\" y1=\"150\" x2=\"230\" y2=\"240\" stroke=\"#7c3aed\"/>"
                     "<line x1=\"300\" y1=\"185\" x2=\"300\" y2=\"240\" stroke=\"#7c3aed\"/>"
                     "<line x1=\"370\" y1=\"60\" x2=\"370\" y2=\"189\" stroke=\"#16a34a\"/>"
                     "<line x1=\"440\" y1=\"110\" x2=\"440\" y2=\"189\" stroke=\"#16a34a\"/>"
                     "<line x1=\"510\" y1=\"150\" x2=\"510\" y2=\"189\" stroke=\"#16a34a\"/>"
                     "</g>"
                     "<text x=\"160\" y=\"98\" text-anchor=\"middle\" fill=\"#7c3aed\">Lyman</text>"
                     "<text x=\"370\" y=\"48\" text-anchor=\"middle\" fill=\"#16a34a\">Balmer (visible)</text>"
                     "<text x=\"320\" y=\"280\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">to n&#8321; = 1 &#8594; UV (Lyman); to n&#8321; = 2 &#8594; visible (Balmer); to n&#8321; = 3,4,5 &#8594; IR (Paschen, Brackett, Pfund)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/04-bohr-defects.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — five defects, each pointing at a deeper truth\n\n"
                    "Bohr's model fails in ways that map exactly onto what quantum mechanics later supplied:\n\n"
                    "1. **Fine structure** — high-resolution spectroscopy shows each Balmer line is a close "
                    "doublet; Bohr's circular orbits give single lines. (Sommerfeld's elliptical orbits "
                    "partially patched this by adding the azimuthal quantum number.)\n"
                    "2. **Zeeman/Stark effects** — lines split in magnetic/electric fields; Bohr's model has "
                    "no way to orient an orbit.\n"
                    "3. **Multi-electron atoms** — the model cannot handle electron–electron repulsion; even "
                    "helium defeats it.\n"
                    "4. **No explanation of quantisation** — mvr = nh/2π is asserted, not derived; de Broglie "
                    "later derived it as a standing-wave condition (nλ = 2πr).\n"
                    "5. **Uncertainty violation** — a definite orbit fixes position and momentum "
                    "simultaneously, which Heisenberg forbids; the orbit becomes a probability cloud "
                    "(orbital).\n\n"
                    "A full-mark answer ends with the honest summary: Bohr succeeded exactly for one-electron "
                    "systems (H, He⁺, Li²⁺) and failed precisely where electron wave behaviour matters.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — five defects, each pointing at a deeper truth\n\n"
                    "Bohr's model fails in ways that map exactly onto what quantum mechanics later supplied:\n\n"
                    "1. **Fine structure** — high-resolution spectroscopy shows each Balmer line is a close "
                    "doublet; Bohr's circular orbits give single lines. (Sommerfeld's elliptical orbits "
                    "partially patched this by adding the azimuthal quantum number.)\n"
                    "2. **Zeeman/Stark effects** — lines split in magnetic/electric fields; Bohr's model has "
                    "no way to orient an orbit.\n"
                    "3. **Multi-electron atoms** — the model cannot handle electron–electron repulsion; even "
                    "helium defeats it.\n"
                    "4. **No explanation of quantisation** — mvr = nh/2π is asserted, not derived; de Broglie "
                    "later derived it as a standing-wave condition (nλ = 2πr).\n"
                    "5. **Uncertainty violation** — a definite orbit fixes position and momentum "
                    "simultaneously, which Heisenberg forbids; the orbit becomes a probability cloud "
                    "(orbital).\n\n"
                    "A full-mark answer ends with the honest summary: Bohr succeeded exactly for one-electron "
                    "systems (H, He⁺, Li²⁺) and failed precisely where electron wave behaviour matters."),
             "table": ("Bohr's defects and the concept that fixed each",
                       ["Defect", "What is observed", "Later resolution"],
                       [["Fine structure", "Spectral lines are close doublets", "Spin + azimuthal quantum number"],
                        ["Zeeman / Stark splitting", "Lines split in fields", "Magnetic quantum number m&#8342;"],
                        ["Multi-electron failure", "Cannot calculate He energies", "Wave mechanics with e&#8315;&#8315; repulsion"],
                        ["Quantisation unexplained", "mvr = nh/2&#960; is postulated", "de Broglie: n&#955; = 2&#960;r standing wave"],
                        ["Definite orbit impossible", "Position + momentum both fixed", "Heisenberg &#8594; orbitals (probability)"]])},
            {"after": "## 7. Exam Application",
             "svg": ("From orbit to orbital — how each defect forced a new idea",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#111827\" stroke-width=\"2\" fill=\"none\">"
                     "<circle cx=\"170\" cy=\"120\" r=\"70\"/>"
                     "<circle cx=\"170\" cy=\"120\" r=\"40\"/>"
                     "</g>"
                     "<circle cx=\"170\" cy=\"120\" r=\"7\" fill=\"#111827\"/>"
                     "<circle cx=\"240\" cy=\"120\" r=\"6\" fill=\"#1d4ed8\"/>"
                     "<text x=\"170\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">Bohr: fixed circular orbits</text>"
                     "<text x=\"170\" y=\"245\" text-anchor=\"middle\" fill=\"#991b1b\">breaks: fine structure, Zeeman, uncertainty</text>"
                     "<g fill=\"#93c5fd\">"
                     "<circle cx=\"470\" cy=\"120\" r=\"55\"/>"
                     "</g>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"445\" cy=\"105\" r=\"4\"/><circle cx=\"480\" cy=\"100\" r=\"4\"/>"
                     "<circle cx=\"500\" cy=\"125\" r=\"4\"/><circle cx=\"470\" cy=\"140\" r=\"4\"/>"
                     "<circle cx=\"440\" cy=\"135\" r=\"4\"/><circle cx=\"465\" cy=\"90\" r=\"4\"/>"
                     "<circle cx=\"490\" cy=\"145\" r=\"4\"/><circle cx=\"430\" cy=\"115\" r=\"4\"/>"
                     "</g>"
                     "<circle cx=\"470\" cy=\"120\" r=\"6\" fill=\"#111827\"/>"
                     "<text x=\"470\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">quantum: orbital = probability cloud</text>"
                     "<text x=\"470\" y=\"245\" text-anchor=\"middle\" fill=\"#166534\">fixes: quantum numbers, shapes, uncertainty</text>"
                     "<text x=\"320\" y=\"280\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">de Broglie standing wave (n&#955; = 2&#960;r) is the bridge between the two pictures</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
