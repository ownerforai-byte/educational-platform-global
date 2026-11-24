# Chemistry class-11 — Atomic structure part B (de Broglie → configurations)
PART_A = [
    {
        "file": "class-11/chemistry/atomic-structure/05-de-broglie-waves.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the wave nature of matter and the standing-wave derivation\n\n"
                    "de Broglie (1924) argued by symmetry: if light waves can behave as particles (photoelectric "
                    "effect), particles should behave as waves, with λ = h/p = h/mv. For macroscopic objects the "
                    "wavelength is absurdly small (a 100 g ball at 10 m/s: λ ≈ 6.6 × 10⁻³⁴ m), but for an "
                    "electron accelerated through 100 V, λ ≈ 1.2 × 10⁻¹⁰ m — atomic dimensions, which is why "
                    "electron diffraction (Davisson–Germer, 1927) shows ring patterns exactly like X-rays.\n\n"
                    "The derivation NEB loves: Bohr's rule mvr = nh/2π follows if the electron wave must form a "
                    "standing wave around the orbit — nλ = 2πr with λ = h/mv gives mvr = nh/2π. Quantisation is "
                    "no longer a postulate but a boundary condition, the same one that fixes guitar-string "
                    "frequencies. This is also why orbitals have nodes: a wave confined to an atom can only "
                    "vibrate in allowed patterns.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the wave nature of matter and the standing-wave derivation\n\n"
                    "de Broglie (1924) argued by symmetry: if light waves can behave as particles (photoelectric "
                    "effect), particles should behave as waves, with λ = h/p = h/mv. For macroscopic objects the "
                    "wavelength is absurdly small (a 100 g ball at 10 m/s: λ ≈ 6.6 × 10⁻³⁴ m), but for an "
                    "electron accelerated through 100 V, λ ≈ 1.2 × 10⁻¹⁰ m — atomic dimensions, which is why "
                    "electron diffraction (Davisson–Germer, 1927) shows ring patterns exactly like X-rays.\n\n"
                    "The derivation NEB loves: Bohr's rule mvr = nh/2π follows if the electron wave must form a "
                    "standing wave around the orbit — nλ = 2πr with λ = h/mv gives mvr = nh/2π. Quantisation is "
                    "no longer a postulate but a boundary condition, the same one that fixes guitar-string "
                    "frequencies. This is also why orbitals have nodes: a wave confined to an atom can only "
                    "vibrate in allowed patterns."),
             "table": ("Wave behaviour — where you see it and where you don't",
                       ["Particle", "Speed", "de Broglie λ", "Wave effects visible?"],
                       [["Electron (100 eV)", "~5.9 × 10⁶ m/s", "≈ 1.2 × 10⁻¹⁰ m", "Yes — Davisson–Germer diffraction"],
                        ["H₂ molecule at 300 K", "~1900 m/s", "≈ 1 × 10⁻¹⁰ m", "Yes — governs quantum states"],
                        ["Dust particle (10⁻⁹ g, 1 mm/s)", "10⁻³ m/s", "≈ 6.6 × 10⁻²² m", "No — far below any slit size"],
                        ["Cricket ball (150 g, 30 m/s)", "30 m/s", "≈ 1.5 × 10⁻³⁴ m", "No — utterly negligible"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Standing-wave condition — why orbits are quantised",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"90\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M320 60 C 380 75, 405 115, 402 150\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M402 150 C 398 190, 370 220, 320 240\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M320 240 C 265 222, 238 185, 238 150\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M238 150 C 238 112, 262 76, 320 60\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<text x=\"320\" y=\"42\" text-anchor=\"middle\" fill=\"#111827\">electron wave must close on itself</text>"
                     "<text x=\"497\" y=\"155\" fill=\"#111827\">n whole wavelengths around the orbit:</text>"
                     "<text x=\"497\" y=\"178\" fill=\"#1d4ed8\" font-size=\"16\">n&#955; = 2&#960;r</text>"
                     "<text x=\"497\" y=\"202\" fill=\"#374151\">with &#955; = h/mv</text>"
                     "<text x=\"497\" y=\"226\" fill=\"#166534\">&#8594; mvr = nh/2&#960;</text>"
                     "<text x=\"320\" y=\"280\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">a non-integer wave would self-cancel — so only certain radii survive</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/06-heisenberg-uncertainty.json",
        "blocks": [
            {            "after": "### 3. Consequence: the concept of probability",
             "md": ("### Deep dive — the three forms and the two standard numericals\n\n"
                    "Heisenberg's principle is not an instrument defect; it is a statement about nature. The "
                    "three canonical forms:\n\n"
                    "- **Position–momentum:** Δx·Δp ≥ h/4π — confining an electron to an atom (Δx ≈ 10⁻¹⁰ m) "
                    "forces Δv ≥ h/(4πmΔx) ≈ 5.8 × 10⁶ m/s, comparable to orbital speeds: a definite orbit is "
                    "impossible, hence the probability picture (|ψ|² gives the odds of finding the electron).\n"
                    "- **Energy–time:** ΔE·Δt ≥ h/4π — an excited state living ~10⁻⁸ s has a natural line "
                    "width ΔE ≈ 5 × 10⁻²⁷ J; short-lived states give broad lines.\n"
                    "- **Angular momentum–angle:** ΔL·Δθ ≥ h/4π.\n\n"
                    "The second standard numerical puts an electron inside a nucleus (Δx = 10⁻¹⁴ m): Δp ≈ "
                    "5.3 × 10⁻¹⁸ kg m/s implies kinetic energies of tens of MeV — far more than β-decay "
                    "electrons carry, proving electrons cannot live inside nuclei. For a 1 g object the "
                    "uncertainty is ~10⁻²⁸ of its momentum: the principle is real but invisible at macroscopic "
                    "scale.")},
{            "after": "### 3. Consequence: the concept of probability",
             "md": ("### Deep dive — the three forms and the two standard numericals\n\n"
                    "Heisenberg's principle is not an instrument defect; it is a statement about nature. The "
                    "three canonical forms:\n\n"
                    "- **Position–momentum:** Δx·Δp ≥ h/4π — confining an electron to an atom (Δx ≈ 10⁻¹⁰ m) "
                    "forces Δv ≥ h/(4πmΔx) ≈ 5.8 × 10⁶ m/s, comparable to orbital speeds: a definite orbit is "
                    "impossible, hence the probability picture (|ψ|² gives the odds of finding the electron).\n"
                    "- **Energy–time:** ΔE·Δt ≥ h/4π — an excited state living ~10⁻⁸ s has a natural line "
                    "width ΔE ≈ 5 × 10⁻²⁷ J; short-lived states give broad lines.\n"
                    "- **Angular momentum–angle:** ΔL·Δθ ≥ h/4π.\n\n"
                    "The second standard numerical puts an electron inside a nucleus (Δx = 10⁻¹⁴ m): Δp ≈ "
                    "5.3 × 10⁻¹⁸ kg m/s implies kinetic energies of tens of MeV — far more than β-decay "
                    "electrons carry, proving electrons cannot live inside nuclei. For a 1 g object the "
                    "uncertainty is ~10⁻²⁸ of its momentum: the principle is real but invisible at macroscopic "
                    "scale."),
             "table": ("The uncertainty principle in its three forms",
                       ["Form", "Relation", "Standard consequence"],
                       [["Position–momentum", "&#916;x&#183;&#916;p &#8805; h/4&#960;", "No definite orbit &#8594; orbitals; electron in atom: &#916;v &#8776; 5.8 &#215; 10&#8310; m/s"],
                        ["Energy–time", "&#916;E&#183;&#916;t &#8805; h/4&#960;", "Natural line width of spectral lines (~10&#8315;&#8308; eV for 10&#8315;&#8312; s states)"],
                        ["Angular momentum–angle", "&#916;L&#183;&#916;&#952; &#8805; h/4&#960;", "Rotational states cannot be perfectly sharp"]])},
            {"after": "### 4. Applications",
             "svg": ("Localization cost — the smaller the box, the wilder the momentum",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"2\">"
                     "<line x1=\"80\" y1=\"70\" x2=\"240\" y2=\"70\"/>"
                     "<line x1=\"80\" y1=\"130\" x2=\"240\" y2=\"130\"/>"
                     "<line x1=\"420\" y1=\"70\" x2=\"580\" y2=\"70\"/>"
                     "<line x1=\"420\" y1=\"130\" x2=\"580\" y2=\"130\"/>"
                     "</g>"
                     "<text x=\"160\" y=\"60\" text-anchor=\"middle\" fill=\"#374151\">&#916;x &#8776; 10&#8315;&#185;&#8304; m (atom)</text>"
                     "<text x=\"160\" y=\"105\" text-anchor=\"middle\" fill=\"#1d4ed8\">&#916;v &#8776; 5.8 &#215; 10&#8310; m/s</text>"
                     "<text x=\"160\" y=\"125\" text-anchor=\"middle\" fill=\"#6b7280\">comparable to orbital speed</text>"
                     "<text x=\"500\" y=\"60\" text-anchor=\"middle\" fill=\"#374151\">&#916;x &#8776; 10&#8315;&#185;&#8308; m (nucleus)</text>"
                     "<text x=\"500\" y=\"105\" text-anchor=\"middle\" fill=\"#991b1b\">&#916;p &#8776; 5.3 &#215; 10&#8315;&#185;&#8312; kg m/s</text>"
                     "<text x=\"500\" y=\"125\" text-anchor=\"middle\" fill=\"#6b7280\">MeV energies &#8594; no electrons inside nuclei</text>"
                     "<text x=\"320\" y=\"190\" text-anchor=\"middle\" fill=\"#111827\" font-size=\"15\">&#916;x&#183;&#916;p &#8805; h/4&#960;</text>"
                     "<text x=\"320\" y=\"230\" text-anchor=\"middle\" fill=\"#374151\">shrink the position window and the momentum spread explodes —</text>"
                     "<text x=\"320\" y=\"252\" text-anchor=\"middle\" fill=\"#374151\">the trade-off is nature's law, not a measurement flaw</text>"
                     "<text x=\"320\" y=\"282\" text-anchor=\"middle\" fill=\"#6b7280\">for a 1 g object the spread is ~10&#8315;&#178;&#8312; of its momentum: classical physics survives</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/07-quantum-numbers.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the four-number address and its consistency rules\n\n"
                    "Every electron in an atom carries four quantum numbers that act like a postal address, "
                    "and they must be mutually consistent:\n\n"
                    "- **n** (principal, 1, 2, 3, …) — shell, size and energy; for hydrogen E depends on n "
                    "alone.\n"
                    "- **l** (azimuthal, 0 to n−1) — subshell and shape: s, p, d, f. Rule: l < n always; "
                    "\u201cn = 3, l = 3\u201d is impossible.\n"
                    "- **mₗ** (magnetic, −l … +l) — orientation; a subshell holds 2l+1 orbitals, so the d "
                    "subshell has five and can hold 10 electrons.\n"
                    "- **mₛ** (spin, ±½) — the two electrons of a filled orbital.\n\n"
                    "Capacity bookkeeping: a shell holds 2n² electrons, a subshell 2(2l+1), an orbital 2. "
                    "The classic NEB task — quantum numbers of the last electron of an element — is solved by "
                    "writing the configuration, finding the last electron's subshell and slot, then assigning "
                    "n, l, mₗ (by Hund's rule the electron enters an empty orbital with mₛ = +½ first). For "
                    "example, the last electron of Na (3s¹) is n = 3, l = 0, mₗ = 0, mₛ = +½.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the four-number address and its consistency rules\n\n"
                    "Every electron in an atom carries four quantum numbers that act like a postal address, "
                    "and they must be mutually consistent:\n\n"
                    "- **n** (principal, 1, 2, 3, …) — shell, size and energy; for hydrogen E depends on n "
                    "alone.\n"
                    "- **l** (azimuthal, 0 to n−1) — subshell and shape: s, p, d, f. Rule: l < n always; "
                    "\u201cn = 3, l = 3\u201d is impossible.\n"
                    "- **mₗ** (magnetic, −l … +l) — orientation; a subshell holds 2l+1 orbitals, so the d "
                    "subshell has five and can hold 10 electrons.\n"
                    "- **mₛ** (spin, ±½) — the two electrons of a filled orbital.\n\n"
                    "Capacity bookkeeping: a shell holds 2n² electrons, a subshell 2(2l+1), an orbital 2. "
                    "The classic NEB task — quantum numbers of the last electron of an element — is solved by "
                    "writing the configuration, finding the last electron's subshell and slot, then assigning "
                    "n, l, mₗ (by Hund's rule the electron enters an empty orbital with mₛ = +½ first). For "
                    "example, the last electron of Na (3s¹) is n = 3, l = 0, mₗ = 0, mₛ = +½."),
             "table": ("The four quantum numbers — ranges, meaning, capacities",
                       ["Quantum number", "Allowed values", "Determines", "Capacity rule"],
                       [["Principal n", "1, 2, 3, …", "Shell, size, main energy", "Shell holds 2n&#178; electrons"],
                        ["Azimuthal l", "0 to n&#8722;1 (s, p, d, f)", "Subshell shape", "Subshell holds 2(2l+1) electrons"],
                        ["Magnetic m&#8342;", "&#8722;l … 0 … +l", "Orbital orientation", "2l+1 orbitals per subshell"],
                        ["Spin m&#8347;", "+&#189; or &#8722;&#189;", "Electron spin direction", "2 electrons per orbital"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Quantum-number tree — how many electrons each label can hold",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<rect x=\"270\" y=\"30\" width=\"100\" height=\"40\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"55\" text-anchor=\"middle\" fill=\"#1d4ed8\">n = 3 shell</text>"
                     "<g font-size=\"12\" fill=\"#111827\">"
                     "<rect x=\"60\" y=\"130\" width=\"130\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"125\" y=\"150\" text-anchor=\"middle\">3s: l = 0</text>"
                     "<text x=\"125\" y=\"166\" text-anchor=\"middle\" fill=\"#6b7280\">1 orbital, 2 e&#8722;</text>"
                     "<rect x=\"255\" y=\"130\" width=\"130\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"320\" y=\"150\" text-anchor=\"middle\">3p: l = 1</text>"
                     "<text x=\"320\" y=\"166\" text-anchor=\"middle\" fill=\"#6b7280\">3 orbitals, 6 e&#8722;</text>"
                     "<rect x=\"450\" y=\"130\" width=\"130\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"515\" y=\"150\" text-anchor=\"middle\">3d: l = 2</text>"
                     "<text x=\"515\" y=\"166\" text-anchor=\"middle\" fill=\"#6b7280\">5 orbitals, 10 e&#8722;</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"300\" y1=\"70\" x2=\"125\" y2=\"130\"/>"
                     "<line x1=\"320\" y1=\"70\" x2=\"320\" y2=\"130\"/>"
                     "<line x1=\"340\" y1=\"70\" x2=\"515\" y2=\"130\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"220\" text-anchor=\"middle\" fill=\"#374151\">shell total: 2 + 6 + 10 = 18 = 2n&#178; = 2 &#215; 9</text>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#6b7280\">m&#8342; for 3d: &#8722;2, &#8722;1, 0, +1, +2 — five boxes, Hund fills each singly first</text>"
                     "<text x=\"320\" y=\"280\" text-anchor=\"middle\" fill=\"#6b7280\">last electron of Na: n=3, l=0, m&#8342;=0, m&#8347;=+&#189;</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/09-aufbau-pauli-hund.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the three filling rules and where each one bites\n\n"
                    "- **Aufbau** — fill subshells in order of increasing n + l; for ties, lower n wins. "
                    "Hence 4s (n+l = 4) fills before 3d (n+l = 5), and the familiar order 1s 2s 2p 3s 3p 4s "
                    "3d 4p 5s 4d 5p 6s 4f 5d 6p follows. Remember that after filling, 4s electrons are "
                    "*removed first* when cations form (Fe²⁺ is 3d⁶, not 3d⁴4s²).\n"
                    "- **Pauli** — no two electrons in the same atom share all four quantum numbers; an "
                    "orbital holds at most two, with opposite spins. This is why shells cap at 2n².\n"
                    "- **Hund** — in a degenerate set, electrons enter singly with parallel spins before "
                    "pairing; half-filled and fully-filled sets (d⁵, d¹⁰, f⁷, f¹⁴) have exchange "
                    "stabilisation, which is why Cr is [Ar]3d⁵4s¹ and Cu is [Ar]3d¹⁰4s¹, not the naive "
                    "aufbau predictions.\n\n"
                    "The exam trio: write the configuration of Fe (26): 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² — and "
                    "explain Cr and Cu as exceptions via Hund's extra stability.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the three filling rules and where each one bites\n\n"
                    "- **Aufbau** — fill subshells in order of increasing n + l; for ties, lower n wins. "
                    "Hence 4s (n+l = 4) fills before 3d (n+l = 5), and the familiar order 1s 2s 2p 3s 3p 4s "
                    "3d 4p 5s 4d 5p 6s 4f 5d 6p follows. Remember that after filling, 4s electrons are "
                    "*removed first* when cations form (Fe²⁺ is 3d⁶, not 3d⁴4s²).\n"
                    "- **Pauli** — no two electrons in the same atom share all four quantum numbers; an "
                    "orbital holds at most two, with opposite spins. This is why shells cap at 2n².\n"
                    "- **Hund** — in a degenerate set, electrons enter singly with parallel spins before "
                    "pairing; half-filled and fully-filled sets (d⁵, d¹⁰, f⁷, f¹⁴) have exchange "
                    "stabilisation, which is why Cr is [Ar]3d⁵4s¹ and Cu is [Ar]3d¹⁰4s¹, not the naive "
                    "aufbau predictions.\n\n"
                    "The exam trio: write the configuration of Fe (26): 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s² — and "
                    "explain Cr and Cu as exceptions via Hund's extra stability."),
             "table": ("Filling rules — statement, exception, exam example",
                       ["Rule", "Statement", "Famous exception / bite", "Exam example"],
                       [["Aufbau", "Fill lowest n+l first; tie &#8594; lower n", "4s fills before 3d; cations lose 4s first", "Fe&#178;&#8314; = [Ar]3d&#8310;"],
                        ["Pauli exclusion", "No two electrons share all four quantum numbers", "Caps every orbital at 2", "Shell capacity 2n&#178;"],
                        ["Hund's rule", "Single fill with parallel spins before pairing", "d&#8309;/d&#185;&#8304; extra stability", "Cr = [Ar]3d&#8309;4s&#185;; Cu = [Ar]3d&#185;&#8304;4s&#185;"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Filling order by n + l — the map behind every configuration",
                     "<svg viewBox=\"0 0 640 330\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"330\" fill=\"#ffffff\"/>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"60\" y=\"50\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"95\" y=\"72\" text-anchor=\"middle\">1s</text>"
                     "<rect x=\"150\" y=\"90\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"185\" y=\"112\" text-anchor=\"middle\">2s</text>"
                     "<rect x=\"240\" y=\"90\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"275\" y=\"112\" text-anchor=\"middle\">2p</text>"
                     "<rect x=\"150\" y=\"150\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"185\" y=\"172\" text-anchor=\"middle\">3s</text>"
                     "<rect x=\"240\" y=\"150\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"275\" y=\"172\" text-anchor=\"middle\">3p</text>"
                     "<rect x=\"330\" y=\"130\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#fefce8\" stroke=\"#a16207\"/><text x=\"365\" y=\"152\" text-anchor=\"middle\">4s</text>"
                     "<rect x=\"330\" y=\"190\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"365\" y=\"212\" text-anchor=\"middle\">3d</text>"
                     "<rect x=\"420\" y=\"170\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/><text x=\"455\" y=\"192\" text-anchor=\"middle\">4p</text>"
                     "<rect x=\"420\" y=\"240\" width=\"70\" height=\"34\" rx=\"6\" fill=\"#fefce8\" stroke=\"#a16207\"/><text x=\"455\" y=\"262\" text-anchor=\"middle\">5s</text>"
                     "</g>"
                     "<path d=\"M95 84 L 185 90 M 220 124 L 275 90 M 310 124 L 185 150 M 275 184 L 365 130 M 365 164 L 365 190 M 400 224 L 455 170 M 455 204 L 455 240\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"1.6\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"320\" y=\"305\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">diagonal order = increasing n+l (ties: lower n first) — 4s before 3d, 5s before 4d</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
