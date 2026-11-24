# Class 12 Biology — Heredity and Evolution, topics 01-04.
# Authored classified tables + labeled SVG diagrams, placed at the concept
# order the notes already follow (chronological order of concepts).

PART_A = [
{
    "file": "class-12/biology/heredity-and-evolution/01-mendel-s-laws-of-inheritance-monohybrid-and-dihybrid-cross.json",
    "blocks": [
        {"after": "# Mendel's laws of inheritance — monohybrid and dihybrid cross",
         "md": "Gregor Mendel (1822–1884), a monk in Brno, bred garden peas (*Pisum sativum*) from 1856–1863 and published in 1866. Peas were the right organism: true-breeding varieties, seven clearly contrasting traits, short life cycle, large numbers of offspring, and easy self- plus cross-pollination. He counted thousands of offspring and used mathematics — the first quantitative study of heredity. His work was ignored until 1900, when Correns, de Vries and Tschermak rediscovered it."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — how Mendel built the two laws (study in this order)",
                   ["Step", "What Mendel did", "Result", "What it proved"],
                   [["1", "Grew true-breeding (pure) lines for 7 traits for 2 years", "Every line bred true", "A clean starting material"],
                    ["2", "Crossed pure tall (TT) × pure dwarf (tt) — the P generation", "All F₁ plants tall (Tt)", "One trait can mask the other → dominance"],
                    ["3", "Self-pollinated the F₁ — the F₂ generation", "787 tall : 277 dwarf ≈ 3 : 1", "The dwarf factor had not vanished, only hidden → segregation"],
                    ["4", "Self-pollinated the F₂ tall plants", "1/3 bred true (TT), 2/3 split 3:1 (Tt)", "Genotype ≠ phenotype — two kinds of tall plants"],
                    ["5", "Crossed F₁ back to the recessive parent (test cross)", "1 tall : 1 dwarf", "Confirms F₁ carries both factors"],
                    ["6", "Crossed pure round-yellow × pure wrinkled-green (dihybrid)", "F₁ all round-yellow", "Dominance holds per trait"],
                    ["7", "Self-pollinated the dihybrid F₁", "F₂ = 315:108:101:32 ≈ 9:3:3:1", "Traits assort independently → second law"],
                    ["8", "Test-crossed the dihybrid F₁", "1:1:1:1", "Four gamete types in equal numbers"]])},
        {"after": "## 3. Classified tables",
         "table": ("Monohybrid vs dihybrid cross — classified side by side",
                   ["Feature", "Monohybrid cross", "Dihybrid cross"],
                   [["Traits tracked", "One pair of contrasting traits (height)", "Two pairs (seed shape + seed colour)"],
                    ["Pure parents", "TT × tt", "RRYY × rryy"],
                    ["F₁ genotype", "Tt", "RrYy"],
                    ["F₁ gametes", "T and t (2 types)", "RY, Ry, rY, ry (4 types)"],
                    ["F₂ genotypic ratio", "1 TT : 2 Tt : 1 tt", "1:2:1:2:4:2:1:2:1 (9 classes)"],
                    ["F₂ phenotypic ratio", "3 tall : 1 dwarf", "9 round-yellow : 3 round-green : 3 wrinkled-yellow : 1 wrinkled-green"],
                    ["Law demonstrated", "Law of Segregation (dominance shows in the 3:1)", "Law of Independent Assortment"],
                    ["Punnett square size", "2 × 2", "4 × 4"]])},
        {"after": "## 3. Classified tables",
         "table": ("Ratios cheat sheet — what each number tells you",
                   ["Ratio", "Seen in", "Meaning"],
                   [["3 : 1", "Monohybrid F₂ phenotype", "Complete dominance of one allele"],
                    ["1 : 2 : 1", "Monohybrid F₂ genotype (or phenotype in incomplete dominance / codominance)", "Heterozygote is a distinct class"],
                    ["1 : 1", "Test cross of a monohybrid (Tt × tt)", "Heterozygote identified"],
                    ["9 : 3 : 3 : 1", "Dihybrid F₂ phenotype", "Two independent genes, each dominant"],
                    ["1 : 1 : 1 : 1", "Dihybrid test cross (RrYy × rryy)", "Four gamete types in equal numbers"],
                    ["Deviation from 9:3:3:1", "Same cross with linkage", "Genes are on the same chromosome"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Monohybrid cross — Punnett square of Tt × Tt",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="17">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="#14161a">Tt (F1 tall) &#215; Tt (F1 tall)</text>'
                 '<text x="150" y="78" text-anchor="middle" font-weight="bold" fill="#1d4ed8">T</text>'
                 '<text x="290" y="78" text-anchor="middle" font-weight="bold" fill="#1d4ed8">t</text>'
                 '<text x="70" y="128" text-anchor="middle" font-weight="bold" fill="#b91c1c">T</text>'
                 '<text x="70" y="228" text-anchor="middle" font-weight="bold" fill="#b91c1c">t</text>'
                 '<rect x="110" y="95" width="120" height="70" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="170" y="140" text-anchor="middle" font-weight="bold" fill="#14532d">TT tall</text>'
                 '<rect x="250" y="95" width="120" height="70" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="310" y="140" text-anchor="middle" font-weight="bold" fill="#14532d">Tt tall</text>'
                 '<rect x="110" y="195" width="120" height="70" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="170" y="240" text-anchor="middle" font-weight="bold" fill="#14532d">Tt tall</text>'
                 '<rect x="250" y="195" width="120" height="70" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="310" y="240" text-anchor="middle" font-weight="bold" fill="#7f1d1d">tt dwarf</text>'
                 '<text x="470" y="130" font-size="18" fill="#14161a">Phenotype  3 tall : 1 dwarf</text>'
                 '<text x="470" y="165" font-size="18" fill="#14161a">Genotype  1 TT : 2 Tt : 1 tt</text>'
                 '<text x="470" y="215" font-size="15" fill="#4b5563">The recessive tt reappears in F2:</text>'
                 '<text x="470" y="240" font-size="15" fill="#4b5563">proof of the Law of Segregation.</text>'
                 '<text x="470" y="285" font-size="15" fill="#4b5563">Blue = gametes of one parent,</text>'
                 '<text x="470" y="308" font-size="15" fill="#4b5563">red = gametes of the other.</text>'
                 '</svg>')},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Dihybrid cross — four gamete types give the 9:3:3:1 grid",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="15">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="28" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">RrYy &#215; RrYy  &#8212;  16 offspring classes</text>'
                 '<rect x="120" y="55" width="80" height="240" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5"/>'
                 '<rect x="200" y="55" width="80" height="240" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>'
                 '<rect x="280" y="55" width="80" height="240" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>'
                 '<rect x="360" y="55" width="80" height="240" fill="#fecaca" stroke="#dc2626" stroke-width="1.5"/>'
                 '<text x="160" y="90" text-anchor="middle" font-weight="bold">RY&#215;RY</text>'
                 '<text x="160" y="112" text-anchor="middle">RRYY</text>'
                 '<text x="160" y="290" text-anchor="middle" font-size="13">4 of 16</text>'
                 '<text x="240" y="90" text-anchor="middle" font-weight="bold">Ry&#215;Ry</text>'
                 '<text x="240" y="112" text-anchor="middle">RRyy</text>'
                 '<text x="240" y="290" text-anchor="middle" font-size="13">1 of 16</text>'
                 '<text x="320" y="90" text-anchor="middle" font-weight="bold">rY&#215;rY</text>'
                 '<text x="320" y="112" text-anchor="middle">rrYY</text>'
                 '<text x="320" y="290" text-anchor="middle" font-size="13">1 of 16</text>'
                 '<text x="400" y="90" text-anchor="middle" font-weight="bold">ry&#215;ry</text>'
                 '<text x="400" y="112" text-anchor="middle">rryy</text>'
                 '<text x="400" y="290" text-anchor="middle" font-size="13">1 of 16</text>'
                 '<text x="480" y="90" font-size="14" fill="#14161a">9 round-yellow</text>'
                 '<text x="480" y="112" font-size="14" fill="#14161a">3 round-green</text>'
                 '<text x="480" y="134" font-size="14" fill="#14161a">3 wrinkled-yellow</text>'
                 '<text x="480" y="156" font-size="14" fill="#14161a">1 wrinkled-green</text>'
                 '<text x="480" y="200" font-size="13" fill="#4b5563">Yellow band = both dominant</text>'
                 '<text x="480" y="222" font-size="13" fill="#4b5563">traits together (the 9 class).</text>'
                 '<text x="480" y="252" font-size="13" fill="#4b5563">Independent assortment of</text>'
                 '<text x="480" y="274" font-size="13" fill="#4b5563">R/r and Y/y produces the</text>'
                 '<text x="480" y="296" font-size="13" fill="#4b5563">classic 9:3:3:1 phenotypes.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A tall pea plant of unknown genotype is test-crossed with a dwarf plant (tt). The offspring are 58 tall and 54 dwarf. Because dwarf offspring (tt) can only receive a **t** from each parent, the unknown parent must have supplied **t** gametes — so it was **Tt** (heterozygous), not TT. A 1:1 test-cross result is the standard proof of heterozygosity. If all offspring had been tall, the parent would have been homozygous TT."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) State the three laws and give the ratio each is based on. (2) Why did Mendel succeed where others failed — pure lines, discrete traits, large numbers, counting, mathematics. (3) Define test cross and back cross and give the expected ratios. (4) Draw the monohybrid Punnett square and label genotype vs phenotype ratios. (5) A 9:3:3:1 ratio that shifts toward the parental combinations signals linkage, not a broken law."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Mendel's factors (genes) occur in pairs, separate cleanly during gamete formation (Law of Segregation — 3:1, 1:2:1), and pairs for different traits assort independently (Law of Independent Assortment — 9:3:3:1). Dominance hides recessive alleles in the phenotype but never destroys them. **Self-check:** can you reproduce the 2×2 and 4×4 grids from memory, and explain why the test cross is the single most useful cross in genetics?"},
    ],
},
{
    "file": "class-12/biology/heredity-and-evolution/02-incomplete-dominance-and-codominance.json",
    "blocks": [
        {"after": "# Incomplete dominance and codominance",
         "md": "Mendel's peas showed **complete dominance**: the heterozygote looks exactly like the dominant parent. Most genes are not that polite. When the heterozygote is intermediate, the inheritance is **incomplete dominance**; when both alleles are fully and separately visible, it is **codominance**. Neither pattern breaks the Law of Segregation — in both, the F₂ genotypic ratio is still 1:2:1. What changes is that phenotype now reveals genotype."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from Mendel to the exceptions (study in this order)",
                   ["Step", "Concept", "Classic example", "Key observation"],
                   [["1", "Complete dominance (the Mendelian baseline)", "Tall vs dwarf pea", "Tt looks like TT — recessive hidden"],
                    ["2", "Incomplete dominance", "Snapdragon / 4-o'clock flower colour", "Red × white → pink F₁; F₂ = 1 red : 2 pink : 1 white"],
                    ["3", "Codominance", "ABO blood group, roan cattle", "IA IB → AB blood group shows BOTH antigens"],
                    ["4", "Multiple alleles", "ABO series: IA, IB, i", "More than two alleles in the population, two per person"],
                    ["5", "Why 1:2:1 matters", "F₂ of snapdragon", "Phenotypic ratio = genotypic ratio — genotype is visible"]])},
        {"after": "## 3. Classified tables",
         "table": ("Complete dominance vs incomplete dominance vs codominance",
                   ["Feature", "Complete dominance", "Incomplete dominance", "Codominance"],
                   [["Heterozygote phenotype", "Looks like the dominant parent", "Intermediate blend of both", "Shows BOTH characters side by side"],
                    ["F₂ phenotypic ratio", "3 : 1", "1 : 2 : 1", "1 : 2 : 1"],
                    ["F₂ genotypic ratio", "1 : 2 : 1", "1 : 2 : 1", "1 : 2 : 1"],
                    ["Can you tell genotype from phenotype?", "No — TT and Tt look alike", "Yes — every genotype is visible", "Yes — every genotype is visible"],
                    ["Textbook example", "Tall × dwarf pea → all tall", "Red × white snapdragon → pink", "IA × IB → blood group AB; red × white roan cattle"],
                    ["Effect on the recessive allele", "Completely masked", "Partly expressed (diluted)", "Fully expressed in a different place"]])},
        {"after": "## 3. Classified tables",
         "table": ("ABO blood groups — the codominance + multiple-allele classic",
                   ["Blood group", "Genotypes", "Antigen on RBC", "Antibody in plasma", "Can donate to"],
                   [["A", "IAIA, IAi", "A", "anti-B", "A, AB"],
                    ["B", "IBIB, IBi", "B", "anti-A", "B, AB"],
                    ["AB", "IAIB", "A and B (both expressed — codominance)", "none — universal recipient", "AB only"],
                    ["O", "ii", "none", "anti-A and anti-B", "O, A, B, AB — universal donor"],
                    ["Rule", "IA and IB are dominant over i", "i is recessive", "IA and IB are codominant with each other", "—"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Incomplete dominance — snapdragon colour through two generations",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="16">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Snapdragon: Red (RR) &#215; White (WW)</text>'
                 '<circle cx="120" cy="95" r="26" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/>'
                 '<text x="120" y="150" text-anchor="middle">RR red</text>'
                 '<text x="185" y="100" text-anchor="middle" font-size="22">&#215;</text>'
                 '<circle cx="250" cy="95" r="26" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>'
                 '<text x="250" y="150" text-anchor="middle">WW white</text>'
                 '<line x1="185" y1="130" x2="185" y2="185" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="180,183 190,183 185,193" fill="#475569"/>'
                 '<circle cx="185" cy="230" r="26" fill="#f472b6" stroke="#be185d" stroke-width="2"/>'
                 '<text x="185" y="285" text-anchor="middle">RW pink (F1)</text>'
                 '<text x="320" y="235" font-size="15" fill="#14161a">Neither allele hides the other:</text>'
                 '<text x="320" y="258" font-size="15" fill="#14161a">one red dose gives half the pigment.</text>'
                 '<line x1="185" y1="300" x2="185" y2="330" stroke="#475569" stroke-width="2"/>'
                 '<polygon points="180,328 190,328 185,338" fill="#475569"/>'
                 '<text x="185" y="360" text-anchor="middle" font-size="15">F2 selfed: 1 red : 2 pink : 1 white</text>'
                 '<text x="420" y="360" font-size="15" fill="#4b5563">Ratio 1:2:1 = genotypic ratio.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** In 4-o'clock plants, red (RR) × white (rr) gives all pink Rr. Selfing the pink F₁ gives 1 RR red : 2 Rr pink : 1 rr white. A pink plant crossed with a red plant gives 1 red : 1 pink — a 1:1 ratio that proves the pink plant was the heterozygote. **Exam trap:** in incomplete dominance the heterozygote is *not* a new allele; the pink is simply one red dose expressing at half strength."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Distinguish incomplete dominance from codominance with one example each. (2) Why is the F₂ phenotypic ratio 1:2:1 instead of 3:1? (3) ABO blood group genotypes and transfusion compatibility. (4) Explain why codominance is not incomplete dominance — in AB blood the A and B antigens are both fully present, not blended into something weaker. (5) Roan cattle: red and white hairs both grow — a patchwork, not a blend."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Dominance is a matter of degree. Incomplete dominance dilutes the heterozygote (pink snapdragon), codominance displays both alleles at once (AB blood). Both keep the 1:2:1 genotypic ratio and both make genotype readable from phenotype. **Self-check:** given a pink flower, can you state its genotype, and predict the offspring of pink × white?"},
    ],
},
{
    "file": "class-12/biology/heredity-and-evolution/03-linkage-and-crossing-over.json",
    "blocks": [
        {"after": "# Linkage and crossing over",
         "md": "Mendel's second law assumes genes assort independently — but genes live on chromosomes, and a chromosome carries hundreds of them. Genes on the **same chromosome** tend to be inherited together: this is **linkage**, and it was proved by T. H. Morgan's work on *Drosophila* (1910–1915). During prophase I of meiosis, homologous chromosomes swap segments at chiasmata — **crossing over** — which breaks linkage apart in proportion to the distance between the genes. Recombination frequency became the ruler of the genetic map."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from Mendel's exception to the genetic map (study in this order)",
                   ["Step", "Concept", "Who / when", "Key result"],
                   [["1", "Chromosomes carry Mendel's factors", "Sutton & Boveri, 1902–03", "Gene behaviour parallels chromosome behaviour"],
                    ["2", "Two genes on one chromosome stay together", "Bateson & Punnett (sweet pea)", "Deviations from 9:3:3:1 toward parental types"],
                    ["3", "Sex-linkage proves genes ride on chromosomes", "Morgan, white-eyed fly, 1910", "Eye colour inherited with sex"],
                    ["4", "Complete linkage — no recombination", "Morgan's mutant strains", "Only parental gametes"],
                    ["5", "Crossing over at chiasma in prophase I", "Cytology of meiosis", "Recombinant gametes appear"],
                    ["6", "Recombination frequency ∝ distance", "Sturtevant, 1913", "First genetic map, 6 loci on the X chromosome"],
                    ["7", "1% recombination = 1 map unit (centimorgan)", "Modern usage", "Map distance, not physical distance"]])},
        {"after": "## 3. Classified tables",
         "table": ("Complete vs incomplete linkage — classified comparison",
                   ["Feature", "Complete linkage", "Incomplete linkage"],
                   [["Crossing over", "Does not occur between the genes", "Occurs between them at a chiasma"],
                    ["Gamete types", "Only 2 parental types (AB, ab)", "All 4: parental (AB, ab) + recombinant (Ab, aB)"],
                    ["Recombinant frequency", "0%", "Between 0% and 50%"],
                    ["F₂ ratio", "Not 9:3:3:1 — only parental phenotypes", "9:3:3:1 distorted toward parental classes"],
                    ["Distance between genes", "Very close on the chromosome", "Far enough apart for a chiasma in between"],
                    ["Example", "Genes inside a Y chromosome or pericentric inversion", "Most autosomal gene pairs in Drosophila"]])},
        {"after": "## 3. Classified tables",
         "table": ("Coupling vs repulsion phase — how the alleles sit on the chromosomes",
                   ["Feature", "Coupling (cis)", "Repulsion (trans)"],
                   [["Arrangement", "Dominant alleles on one homologue: AB / ab", "Dominant alleles on different homologues: Ab / aB"],
                    ["Parental gametes", "AB and ab", "Ab and aB"],
                    ["Recombinant gametes", "Ab and aB", "AB and ab"],
                    ["Test-cross offspring", "Mostly round-yellow and wrinkled-green", "Mostly round-green and wrinkled-yellow"],
                    ["How to tell them apart", "Phenotypes of the most frequent progeny", "Same rule — the frequent classes are the parentals"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Crossing over — one chiasma between loci A and B makes recombinant gametes",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="16">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">Prophase I: single crossover between A and B</text>'
                 '<rect x="90" y="70" width="300" height="18" rx="9" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="120" y="85" font-size="14" font-weight="bold" fill="#1e3a8a">A</text>'
                 '<text x="370" y="85" font-size="14" font-weight="bold" fill="#1e3a8a">B</text>'
                 '<rect x="90" y="200" width="300" height="18" rx="9" fill="#fca5a5" stroke="#b91c1c" stroke-width="2"/>'
                 '<text x="120" y="215" font-size="14" font-weight="bold" fill="#7f1d1d">a</text>'
                 '<text x="370" y="215" font-size="14" font-weight="bold" fill="#7f1d1d">b</text>'
                 '<line x1="245" y1="88" x2="245" y2="200" stroke="#475569" stroke-width="2" stroke-dasharray="6 5"/>'
                 '<text x="245" y="150" text-anchor="middle" font-size="14" fill="#475569">chiasma</text>'
                 '<text x="245" y="170" text-anchor="middle" font-size="13" fill="#475569">(crossing over here)</text>'
                 '<line x1="390" y1="110" x2="470" y2="150" stroke="#1d4ed8" stroke-width="2"/>'
                 '<polygon points="468,146 474,152 464,156" fill="#1d4ed8"/>'
                 '<line x1="390" y1="260" x2="470" y2="230" stroke="#b91c1c" stroke-width="2"/>'
                 '<polygon points="468,226 474,232 464,236" fill="#b91c1c"/>'
                 '<text x="480" y="150" font-size="15" fill="#1e3a8a">AB parental</text>'
                 '<text x="480" y="235" font-size="15" fill="#7f1d1d">ab parental</text>'
                 '<line x1="390" y1="88" x2="470" y2="300" stroke="#1d4ed8" stroke-width="2"/>'
                 '<polygon points="468,296 474,302 464,306" fill="#1d4ed8"/>'
                 '<line x1="390" y1="215" x2="470" y2="330" stroke="#b91c1c" stroke-width="2"/>'
                 '<polygon points="468,326 474,332 464,336" fill="#b91c1c"/>'
                 '<text x="480" y="305" font-size="15" fill="#475569">Ab recombinant</text>'
                 '<text x="480" y="350" font-size="15" fill="#475569">aB recombinant</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A test cross of a female *Drosophila* heterozygous for b (black body) and vg (vestigial wings) gives: b+vg+ 860, b vg 880, b+ vg 45, b vg+ 40. The two large classes are the parentals; the two small classes are recombinants. Recombination frequency = (45 + 40) / 1825 ≈ **4.7%**, so b and vg are about **4.7 map units** apart. The farther apart two genes are, the more often a chiasma falls between them — up to a maximum of 50 cM, where the genes behave as if unlinked."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Define linkage and crossing over and state where and when crossing over happens (pachytene of prophase I, at chiasmata). (2) Why does linkage violate the 9:3:3:1 ratio? (3) Calculate map distance from test-cross data. (4) Distinguish coupling from repulsion phase. (5) State the chromosome theory of inheritance and how Morgan's white-eyed male supported it."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Genes on the same chromosome are linked; crossing over in prophase I breaks the linkage in proportion to distance, and the recombination percentage is the map distance in centimorgans. Linkage is the great exception to independent assortment — and the tool that let Sturtevant draw the first chromosome map. **Self-check:** from a test-cross table, can you spot the parentals, count the recombinants and compute the cM distance?"},
    ],
},
{
    "file": "class-12/biology/heredity-and-evolution/04-sex-determination-and-sex-linked-disorders.json",
    "blocks": [
        {"after": "# Sex determination and sex-linked disorders",
         "md": "In humans and most mammals, sex is fixed at fertilisation by the sex chromosomes: **XX** = female, **XY** = male. The Y chromosome carries **SRY**, the master switch that turns the embryonic gonads into testes; without it, development defaults to female. Because the X carries hundreds of genes the Y lacks, alleles on the X show **sex-linked inheritance**: a recessive allele that a heterozygous mother carries shows itself in sons, who have only one X."},
        {"after": "## 3. Classified tables",
         "table": ("Concept flow — from chromosomes to haemophilia (study in this order)",
                   ["Step", "Concept", "Key fact"],
                   [["1", "Sex chromosomes vs autosomes", "22 pairs of autosomes + 1 pair of sex chromosomes in humans"],
                    ["2", "XX / XY system", "The ovum is always X; the sperm is X or Y — the father determines sex"],
                    ["3", "SRY gene on Y", "Triggers testis development; without it, ovaries form"],
                    ["4", "X-linked recessive inheritance", "Haemophilia A, colour blindness — mostly males affected"],
                    ["5", "X-linked dominant inheritance", "Vitamin-D-resistant rickets — affected father passes it to ALL daughters"],
                    ["6", "Y-linkage", "Only father-to-son; e.g., hairy ears trait"],
                    ["7", "Lyonisation", "One X in each female cell is inactivated — the Barr body"]])},
        {"after": "## 3. Classified tables",
         "table": ("Sex determination systems across organisms",
                   ["Organism / group", "System", "Mechanism"],
                   [["Humans, most mammals", "XX / XY", "Y chromosome with SRY determines maleness"],
                    ["Birds, butterflies", "ZZ / ZW", "The FEMALE is the heterogametic sex (ZW)"],
                    ["Honeybee", "Haplodiploidy", "Fertilised eggs (2n) = females; unfertilised (n) = males"],
                    ["Some reptiles (turtle, crocodile)", "Temperature-dependent", "Incubation temperature of the egg decides sex"],
                    ["Drosophila", "XX / XY", "Sex is set by the RATIO of X chromosomes to autosome sets, not by the Y"]])},
        {"after": "## 3. Classified tables",
         "table": ("X-linked recessive vs X-linked dominant inheritance",
                   ["Feature", "X-linked recessive", "X-linked dominant"],
                   [["Who is affected more", "Males far more (only one X)", "Females slightly more (two chances to inherit)"],
                    ["Carrier state", "Heterozygous females are silent carriers", "No silent carriers — one allele is enough"],
                    ["Affected father's sons", "NONE affected (Y goes to sons)", "ALL daughters affected, no sons"],
                    ["Affected father's daughters", "All carriers (if mother normal)", "All affected"],
                    ["Transmission pattern", "Mother → son; skips generations", "Can be passed by either parent"],
                    ["Examples", "Haemophilia A, red-green colour blindness, Duchenne MD", "Vitamin-D-resistant rickets, Rett syndrome"]])},
        {"after": "## 4. Diagrams and figures",
         "svg": ("Haemophilia — carrier mother × normal father (X-linked recessive)",
                 '<svg viewBox="0 0 640 380" font-family="Segoe UI" font-size="16">'
                 '<rect x="0" y="0" width="640" height="380" fill="#ffffff"/>'
                 '<text x="320" y="30" text-anchor="middle" font-size="19" font-weight="bold" fill="#14161a">X(H) X(h) &#215; X(H) Y   &#8212;  haemophilia carrier mother</text>'
                 '<rect x="80" y="70" width="130" height="70" rx="10" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>'
                 '<text x="145" y="98" text-anchor="middle" font-weight="bold">Mother</text>'
                 '<text x="145" y="122" text-anchor="middle" font-size="14">carrier, healthy</text>'
                 '<rect x="430" y="70" width="130" height="70" rx="10" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>'
                 '<text x="495" y="98" text-anchor="middle" font-weight="bold">Father</text>'
                 '<text x="495" y="122" text-anchor="middle" font-size="14">normal</text>'
                 '<rect x="120" y="180" width="100" height="55" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="170" y="203" text-anchor="middle" font-size="14" font-weight="bold">XH XH</text>'
                 '<text x="170" y="224" text-anchor="middle" font-size="13">daughter normal</text>'
                 '<rect x="240" y="180" width="100" height="55" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>'
                 '<text x="290" y="203" text-anchor="middle" font-size="14" font-weight="bold">XH Xh</text>'
                 '<text x="290" y="224" text-anchor="middle" font-size="13">daughter carrier</text>'
                 '<rect x="360" y="180" width="100" height="55" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>'
                 '<text x="410" y="203" text-anchor="middle" font-size="14" font-weight="bold">XH Y</text>'
                 '<text x="410" y="224" text-anchor="middle" font-size="13">son normal</text>'
                 '<rect x="480" y="180" width="100" height="55" rx="8" fill="#fecaca" stroke="#dc2626" stroke-width="2"/>'
                 '<text x="530" y="203" text-anchor="middle" font-size="14" font-weight="bold">Xh Y</text>'
                 '<text x="530" y="224" text-anchor="middle" font-size="13">son HAEMOPHILIA</text>'
                 '<text x="320" y="290" text-anchor="middle" font-size="15" fill="#14161a">Each child: 25% chance of each class.</text>'
                 '<text x="320" y="320" text-anchor="middle" font-size="15" fill="#4b5563">Only the son with the single Xh bleeds &#8212;</text>'
                 '<text x="320" y="344" text-anchor="middle" font-size="15" fill="#4b5563">no second X to supply a normal allele.</text>'
                 '</svg>')},
        {"after": "## 5. Worked examples and applications",
         "md": "**Worked example.** A colour-blind man marries a woman with normal vision whose father was colour-blind. The woman is an obligate carrier (X^C X^c). Children: 25% colour-blind sons, 25% carrier daughters, 25% normal sons, 25% normal daughters. Note the criss-cross pattern: the son's single X came from the mother, so a colour-blind son always points to a carrier (or affected) mother — never to the father."},
        {"after": "## 7. Exam Zone",
         "md": "**Most-asked points (NEB).** (1) Why is the father, not the mother, the parent who determines a child's sex? (2) Draw the Punnett square for a carrier mother × normal father for haemophilia. (3) Why can an affected father never pass an X-linked recessive trait to his sons? (4) What is a Barr body and why do normal females have one? (5) Compare the ZZ/ZW and XX/XY systems — in birds it is the female that determines sex."},
        {"after": "## 8. Summary and self-check",
         "md": "**Summary.** Sex in humans is chromosomal (XX/XY) with SRY as the switch. Genes on the X follow sex-linked patterns: recessive ones hit males hardest and skip generations through carrier females; dominant ones show father-to-all-daughters transmission. **Self-check:** given any pedigree, can you decide recessive vs dominant and autosomal vs X-linked from who is affected and how?"},
    ],
},
]
