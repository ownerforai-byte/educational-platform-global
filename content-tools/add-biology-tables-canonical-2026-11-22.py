"""One-shot: insert tables into CANONICAL (rendered) biology topic files.

These are the class-12 syllabus topics whose canonical notes have zero tables,
plus the class-11 animalia phyla master table. Anchors are unique substrings;
the script fails loudly if an anchor is missing or a table already exists.
"""
import json
import sys

BASE = "content/notes/concepts/"

def table(title, header, rows):
    lines = [f"**{title}**", ""]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("|" + "|".join(["---"] * len(header)) + "|")
    for r in rows:
        lines.append("| " + " | ".join(r) + " |")
    return "\n".join(lines)

JOBS = [
    ("class-11/biology/heredity-and-evolution/03-mendels-laws-of-inheritance.json", [
        ("- **Dihybrid cross**: Cross involving two traits", table(
            "Genetic vocabulary — the ten terms every cross needs",
            ["Term", "Meaning", "Example"],
            [
                ["Gene", "Unit of heredity that determines a trait", "The gene for plant height in pea"],
                ["Allele", "Alternative form of a gene", "T (tall) and t (dwarf)"],
                ["Dominant", "Expressed whenever present", "T — tall in Tt plants"],
                ["Recessive", "Expressed only when homozygous", "t — dwarf only in tt"],
                ["Genotype", "The genetic makeup", "TT, Tt, tt"],
                ["Phenotype", "The visible appearance", "Tall vs dwarf"],
                ["Homozygous", "Two identical alleles", "TT or tt — pure line"],
                ["Heterozygous", "Two different alleles", "Tt — hybrid"],
                ["Monohybrid cross", "A cross tracking one trait", "Tt × Tt"],
                ["Dihybrid cross", "A cross tracking two traits", "Round-yellow × wrinkled-green"],
            ])),
        ("Dihybrid cross ratio: Phenotypic 9:3:3:1", table(
            "Mendel's three laws at a glance",
            ["Law", "Statement", "Classical ratio", "Based on"],
            [
                ["Law of Dominance", "In a heterozygote one allele masks the expression of the other", "3:1 phenotype (monohybrid F₂)", "Monohybrid cross"],
                ["Law of Segregation", "The two alleles of a gene separate cleanly during gamete formation; gametes carry only one", "1:2:1 genotype, 3:1 phenotype (F₂)", "Monohybrid cross — the F₂ recessives reappearing"],
                ["Law of Independent Assortment", "Genes for different traits assort independently of one another during gamete formation", "9:3:3:1 phenotype (dihybrid F₂)", "Dihybrid cross (round/wrinkled × yellow/green)"],
            ])),
    ]),
    ("class-11/biology/heredity-and-evolution/04-incomplete-dominance-and-codominance.json", [
        ("Roan cattle - red and white hairs both appear", table(
            "Incomplete dominance vs codominance vs Mendelian dominance",
            ["Feature", "Complete dominance (Mendel)", "Incomplete dominance", "Codominance"],
            [
                ["Heterozygote phenotype", "Looks like the dominant parent", "Intermediate blend of both parents", "Shows BOTH parental characters together"],
                ["F₂ phenotypic ratio", "3:1", "1:2:1 (same as genotypic)", "1:2:1"],
                ["Dominance relationship", "One allele masks the other", "Neither allele dominates", "Both alleles express equally"],
                ["Classic example", "Tall × dwarf pea → all tall", "Red × white snapdragon → pink", "IA × IB → blood group AB; roan cattle"],
                ["Effect of the recessive allele", "Hidden completely", "Partially expressed (diluted)", "Fully expressed in a different spot"],
            ])),
        ("Anti-A antibodies in type B and O; Anti-B antibodies in type A and O", table(
            "ABO blood groups — genotype, antigen and antibody",
            ["Blood group", "Genotypes", "Antigen on RBC", "Antibody in plasma", "Can donate to"],
            [
                ["A", "IAIA, IAi", "A", "anti-B", "A, AB"],
                ["B", "IBIB, IBi", "B", "anti-A", "B, AB"],
                ["AB", "IAIB", "A and B", "none — universal recipient", "AB only"],
                ["O", "ii", "none", "anti-A and anti-B", "O, A, B, AB — universal donor"],
            ])),
    ]),
    ("class-11/biology/human-health-and-diseases/06-immune-system-and-immunity.json", [
        ("- **Cell-mediated immunity**: T cells destroy infected cells", table(
            "Innate vs adaptive immunity — the two lines of defense",
            ["Feature", "Innate immunity", "Adaptive immunity"],
            [
                ["Origin", "Present from birth", "Develops over a lifetime of exposures"],
                ["Specificity", "Non-specific — attacks anything foreign", "Specific to one particular antigen"],
                ["Memory", "None — same response every time", "Immunological memory — faster, stronger on re-exposure"],
                ["Main players", "Skin, mucus, stomach acid, lysozyme, phagocytes (neutrophils, macrophages), NK cells, inflammation, fever", "B lymphocytes (antibodies) and T lymphocytes (killer and helper cells)"],
                ["Speed", "Immediate (minutes to hours)", "Slow on first meeting (days), rapid afterwards"],
                ["Type", "First line of defense", "Second/third line of defense"],
            ])),
        ("- **IgD**: B cell receptor", table(
            "The five antibody classes (immunoglobulins)",
            ["Antibody", "Structure and abundance", "Where it acts", "Role"],
            [
                ["IgG", "Monomer; most abundant in blood", "Blood and tissue fluid; crosses the placenta", "Long-term immunity; protects the newborn"],
                ["IgM", "Large pentamer; first antibody made", "Blood — earliest responder", "First response to a new infection; agglutinates pathogens"],
                ["IgA", "Dimer", "Tears, saliva, breast milk, gut mucosa", "Mucosal immunity — passes to infants through milk"],
                ["IgE", "Monomer; rare", "Mucous membranes and skin", "Allergic reactions; defense against parasites"],
                ["IgD", "Monomer; on B-cell surface", "B cell membrane", "Acts as the B cell antigen receptor"],
            ])),
        ("- **Passive**: Receives pre-made antibodies (mother to baby, antivenom)", table(
            "Active vs passive immunity",
            ["Feature", "Active immunity", "Passive immunity"],
            [
                ["Source of antibodies", "The body makes its own antibodies and memory cells", "Ready-made antibodies are received from outside"],
                ["How acquired", "Infection or vaccination", "Across the placenta / breast milk; antivenom, antitoxin injections"],
                ["Time to protection", "Slow to develop (days to weeks)", "Immediate"],
                ["Duration", "Long-lasting — memory cells persist", "Short-lived — antibodies degrade in weeks"],
                ["Memory formed?", "Yes", "No"],
            ])),
    ]),
    ("class-11/biology/human-health-and-diseases/05-pathogens-and-diseases.json", [
        ("- **Athlete's foot**: Dermatophytes, foot fungus", table(
            "Master disease table — pathogen, transmission and key feature",
            ["Disease", "Pathogen", "Transmission / vector", "Key feature"],
            [
                ["Tuberculosis", "Mycobacterium tuberculosis (bacterium)", "Airborne droplets", "Chronic lung infection; night sweats"],
                ["Cholera", "Vibrio cholerae (bacterium)", "Contaminated water", "Severe watery diarrhoea, dehydration"],
                ["Typhoid", "Salmonella typhi (bacterium)", "Faecal-oral route", "Prolonged fever, abdominal pain"],
                ["Diphtheria", "Corynebacterium diphtheriae (bacterium)", "Respiratory droplets", "Pseudomembrane in the throat"],
                ["Whooping cough", "Bordetella pertussis (bacterium)", "Respiratory droplets", "Violent coughing fits"],
                ["Influenza", "Influenza virus", "Airborne droplets", "Respiratory illness with fever"],
                ["Dengue", "Dengue virus", "Aedes aegypti mosquito", "High fever, joint pain, bleeding"],
                ["Hepatitis B", "Hepatitis B virus", "Blood and body fluids", "Liver inflammation"],
                ["HIV/AIDS", "HIV (retrovirus)", "Blood, sexual contact", "Destroys CD4+ T cells — immunity collapses"],
                ["Rabies", "Rabies virus", "Bite of an infected animal", "Attacks the nervous system; fatal once symptoms start"],
                ["Malaria", "Plasmodium (P. falciparum, P. vivax)", "Female Anopheles mosquito", "Recurring fever with chills; RBC destruction"],
                ["Amoebiasis", "Entamoeba histolytica (protozoan)", "Contaminated food and water", "Dysentery, abdominal cramps"],
                ["Sleeping sickness", "Trypanosoma (protozoan)", "Tsetse fly", "Fever, then neurological decline"],
                ["Kala-azar", "Leishmania donovani (protozoan)", "Sandfly", "Enlarged spleen, anaemia"],
                ["Ascariasis", "Ascaris lumbricoides (roundworm)", "Soil-contaminated food", "Intestinal obstruction"],
                ["Filariasis", "Wuchereria bancrofti (worm)", "Mosquito", "Elephantiasis — swollen limbs"],
                ["Taeniasis", "Taenia solium (tapeworm)", "Undercooked pork", "Adult worm in the intestine"],
                ["Ringworm", "Trichophyton, Microsporum (fungi)", "Direct contact, shared items", "Ring-shaped itchy skin patches"],
            ])),
    ]),
    ("class-11/biology/biotechnology-principles/07-principles-of-biotechnology.json", [
        ("- **Competent Host**: Modified to accept foreign DNA (CaCl2 treatment fo", table(
            "Tools of recombinant DNA technology",
            ["Tool", "What it is", "Key examples", "Why it matters"],
            [
                ["Restriction enzymes", "Molecular scissors — cut DNA at specific palindromic recognition sites", "EcoRI (GAATTC), HindIII (AAGCTT)", "Create sticky ends that let foreign DNA be spliced into a vector"],
                ["Sticky ends", "Overhanging single-stranded ends left after a staggered cut", "The overhang of EcoRI-cut DNA", "Complementary overhangs anneal, then ligase seals the join"],
                ["Blunt ends", "Straight cuts with no overhang", "Some restriction enzymes", "Harder to ligate — no base pairing to hold fragments"],
                ["Vectors", "Molecular vehicles that carry foreign DNA into a host", "Plasmids, bacteriophages, cosmids, Ti plasmid of Agrobacterium", "Replicate inside the host so the cloned gene is copied with them"],
                ["Competent host", "A cell made able to take up foreign DNA", "E. coli treated with CaCl₂, then heat-shocked", "Transformation succeeds only if the membrane is made permeable"],
            ])),
        ("- **Applications**: Forensics, disease diagnosis, genetic research", table(
            "PCR — the three temperatures of every cycle",
            ["Step", "Temperature", "What happens"],
            [
                ["1. Denaturation", "~94°C", "The double-stranded template separates into two single strands"],
                ["2. Annealing", "50–65°C", "Primers bind (anneal) to the complementary sequences flanking the target"],
                ["3. Extension", "~72°C", "Taq polymerase extends the primers, building new DNA strands"],
                ["Result", "—", "Each cycle doubles the target DNA — millions of copies in ~30 cycles; Taq from Thermus aquaticus survives the heat"],
            ])),
    ]),
    ("class-11/biology/biotechnology-applications/08-applications-in-agriculture-and-medicine.json", [
        ("- **Drought-resistant crops**: Modified for water stress tolerance", table(
            "Genetically modified crops — the flagship examples",
            ["Crop", "Added or altered trait", "How it works", "Benefit"],
            [
                ["Bt cotton", "Insect resistance", "Carries a Bacillus thuringiensis toxin gene; the Bt protein kills bollworm larvae that bite the plant", "Less pesticide spraying, higher yield"],
                ["Bt corn", "Insect resistance", "Expresses Bt toxin against corn borers", "Protected ears without insecticide"],
                ["Golden rice", "Nutrition enhancement", "Beta-carotene (pro-vitamin A) built into the grain", "Fights vitamin-A deficiency and blindness"],
                ["Herbicide-tolerant crops", "Weed control", "Tolerant to specific herbicides, so weeds die and the crop survives", "Simpler, cleaner weed management"],
                ["Flavr Savr tomato", "Delayed ripening", "Ripening gene silenced so the fruit softens later", "Longer shelf life and better transport"],
                ["Drought-resistant crops", "Water-stress tolerance", "Modified stress-response pathways", "Survives dry spells and marginal land"],
            ])),
        ("- **CRISPR-Cas9**: Gene editing for therapeutic purposes", table(
            "Medical products of biotechnology",
            ["Product", "How it is made", "Use"],
            [
                ["Human insulin", "Human insulin gene inserted into E. coli; bacteria ferment it in vats", "Diabetes treatment — replaced extracted animal insulin"],
                ["Growth hormone", "Recombinant expression of the human GH gene", "Treatment of dwarfism"],
                ["Hepatitis B vaccine", "Hepatitis-B surface antigen produced in yeast cells", "Vaccination against hepatitis B"],
                ["Gene therapy", "A functional gene is delivered to replace a faulty one", "Treating inherited genetic disorders"],
                ["Monoclonal antibodies", "Laboratory-produced identical antibodies", "Cancer therapy and diagnostic tests"],
                ["CRISPR-Cas9", "Guide RNA + Cas9 nuclease edit genes precisely", "Gene correction for therapeutic purposes"],
            ])),
    ]),
    ("class-11/biology/environmental-issues/09-air-water-and-solid-waste-pollution.json", [
        ("- **Control**: Catalytic converters, scrubbers, renewable energy, affore", table(
            "Air pollutants — source and effect",
            ["Pollutant", "Main source", "Key effect"],
            [
                ["SO₂ (sulphur dioxide)", "Burning coal and oil, smelters", "Acid rain; respiratory irritation"],
                ["NOₓ (nitrogen oxides)", "Vehicle engines, power plants", "Acid rain, smog, ozone formation"],
                ["CO (carbon monoxide)", "Incomplete fuel combustion", "Binds haemoglobin — starves the body of oxygen"],
                ["Particulates (PM)", "Dust, smoke, diesel exhaust", "Lung disease; visibility loss"],
                ["Ground-level ozone (O₃)", "Secondary — formed from NOₓ + VOCs in sunlight", "Smog; damages lungs and crops"],
            ])),
        ("- **Paris Agreement (2015)**: Limit warming to well below 2°C above pre-", table(
            "The major greenhouse gases",
            ["Gas", "Main human source", "Notable point"],
            [
                ["CO₂", "Fossil-fuel burning, deforestation", "The largest contributor by volume; the benchmark gas"],
                ["CH₄ (methane)", "Rice paddies, livestock, landfills, natural gas leaks", "Far more potent than CO₂ per molecule"],
                ["N₂O (nitrous oxide)", "Nitrogen fertilisers, combustion", "Also depletes ozone"],
                ["CFCs", "Older refrigerants and aerosols", "Banned by the Montreal Protocol — they also destroy ozone"],
                ["Water vapour", "Natural (evaporation)", "The most abundant greenhouse gas — a feedback, not a primary driver"],
            ])),
    ]),
    ("class-11/biology/faunal-diversity/02-animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class.json", [
        ("Segmentation (Metamerism)", table(
            "The animal phyla — one row each",
            ["Phylum", "Symmetry", "Coelom", "Diagnostic features", "Examples"],
            [
                ["Porifera", "Asymmetric", "—", "Canal system with ostia; spicules; cellular level of organization", "Sycon, Spongilla"],
                ["Cnidaria", "Radial", "Acoelomate", "Cnidoblasts (stinging cells); gastrovascular cavity; polyp ↔ medusa", "Hydra, Obelia, Aurelia"],
                ["Platyhelminthes", "Bilateral", "Acoelomate", "Flat body; flame cells; mostly hermaphrodite", "Planaria, Taenia, Fasciola"],
                ["Aschelminthes (Nematoda)", "Bilateral", "Pseudocoelomate", "Round body; complete gut; sexual dimorphism", "Ascaris, Wuchereria"],
                ["Annelida", "Bilateral", "True coelom", "Metameric segmentation; nephridia; closed blood system", "Earthworm, Nereis, Leech"],
                ["Arthropoda", "Bilateral", "True (reduced)", "Jointed legs; chitinous exoskeleton; open blood system — the largest phylum", "Prawn, crab, butterfly, mosquito"],
                ["Mollusca", "Bilateral", "True coelom", "Muscular foot; mantle; often a shell", "Pila, Unio, Octopus"],
                ["Echinodermata", "Radial (adult)", "True coelom", "Water vascular system with tube feet; marine only", "Starfish, sea urchin"],
                ["Chordata", "Bilateral", "True coelom", "Notochord; dorsal hollow nerve cord; pharyngeal slits", "Fishes, frog, birds, man"],
            ])),
    ]),
]

changed = []
for rel, inserts in JOBS:
    path = BASE + rel
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    notes = d["notes"]
    for anchor, tbl in inserts:
        idx = next((i for i, n in enumerate(notes) if anchor in n), None)
        if idx is None:
            print(f"ANCHOR NOT FOUND in {rel}: {anchor!r}")
            sys.exit(1)
        if any(tbl[:60] in n for n in notes):
            print(f"SKIP (already present) {rel} :: {anchor}")
            continue
        notes.insert(idx + 1, tbl)
        changed.append((rel, idx + 1, tbl[:36]))
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")

print(f"inserted {len(changed)} tables:")
for rel, at, head in changed:
    print(f"  {rel} @block {at}: {head}...")
