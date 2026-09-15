#!/usr/bin/env python3
"""Expand ALL Class 11 Biology concept files with detailed topic-specific content."""
import json
import os
import sys
from pathlib import Path

# Set UTF-8 mode for Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = Path(r"C:\Users\ASUS\Desktop\rn\content\ravikishan\class-11-notes\biology")

# Comprehensive content for each biology topic - focus on topics that need expansion
CONTENT_DATA = {
    'biomolecules-functions': {
        "notes": [
            "**Carbohydrates ($(CH_2O)_n$):** Polyhydroxy aldehydes or ketones classified into monosaccharides (triose: glyceraldehyde; pentose: ribose/deoxyribose; hexose: glucose/fructose/galactose), disaccharides linked by glycosidic bonds (maltose: alpha-1,4-glucose+glucose [reducing]; sucrose: alpha-1,2-glucose+fructose [NON-reducing]; lactose: beta-1,4-galactose+glucose [reducing]), and polysaccharides (storage: starch with amylose alpha-1,4 and amylopectin alpha-1,6 branches in plants, glycogen in animal liver/muscle; structural: cellulose beta-1,4-glucan [most abundant organic polymer on Earth], chitin in fungal cell walls and arthropod exoskeletons).",
            "**Proteins (Polypeptides of L-alpha-Amino Acids):** 20 standard proteinogenic amino acids linked covalently via peptide bonds (-CO-NH-) formed by dehydration synthesis. Amino acids exist as dipolar zwitterions at their isoelectric point (pI). Four organizational hierarchies: Primary (linear sequence dictated by mRNA), Secondary (alpha-helix stabilized by intrachain H-bonds every 3.6 residues or beta-pleated sheets), Tertiary (overall 3D globular conformation stabilized by hydrophobic interactions, ionic bridges, hydrogen bonds, and covalent disulfide -S-S- bonds), and Quaternary (assembly of multiple polypeptide subunits, e.g., adult hemoglobin alpha2beta2 with heme Fe2+ prosthetic group).",
            "**Lipids (Esters of Fatty Acids & Glycerol):** Hydrophobic water-insoluble biomolecules soluble in organic solvents. Simple lipids: Triglycerides (triacylglycerols stored in adipose tissue for insulation and metabolic energy yielding ~9.3 kcal/g). Compound lipids: Phospholipids (amphipathic molecules with hydrophilic choline-phosphate head and two hydrophobic fatty acid tails forming the lipid bilayer of cellular membranes), Glycolipids, and Sphingolipids. Derived lipids: Steroids (four fused carbon rings cyclopentanoperhydrophenanthrene, e.g., cholesterol regulating membrane fluidity, steroid hormones cortisol/testosterone/estrogen, and bile salts).",
            "**Nucleic Acids (Polynucleotides of Genetic Information):** Linear polymers of nucleotides linked via 3'-to-5' phosphodiester linkages. Each nucleotide comprises a pentose sugar (ribose in RNA, 2'-deoxyribose in DNA), a purine (Adenine, Guanine) or pyrimidine (Cytosine, Thymine in DNA, Uracil in RNA) nitrogenous base, and 1 to 3 phosphate groups. DNA forms an antiparallel right-handed B-DNA double helix (Watson & Crick model: 2 nm diameter, 3.4 nm pitch with 10 base pairs per turn) governed by Chargaff's parity rules: [A] = [T] (2 hydrogen bonds) and [G]≡[C] (3 hydrogen bonds). RNA is predominantly single-stranded and functions in information transfer (mRNA), aminoacyl-tRNA decoding (cloverleaf tRNA), and peptidyl transferase catalysis (ribosomal 28S/23S rRNA).",
            "**Enzymes & Biocatalysis:** Specialized globular protein catalysts that accelerate biochemical reaction rates by factors of 10^6 to 10^12 by stabilizing the transition state and dramatically decreasing the activation energy barrier (Ea) without altering thermodynamic equilibrium constant (Keq) or standard Gibbs free energy change (Delta G°). Catalytic cycle operates via the induced-fit model (Koshland). Many require non-protein cofactors: inorganic metal activators (Fe2+, Zn2+ in carbonic anhydrase, Mg2+ in kinases) or organic coenzymes derived from B-vitamins (NAD+ from niacin, FAD from riboflavin, TPP from thiamine)."
        ],
        "confusion": [
            "Misconception: Sucrose is a reducing sugar because it is made of glucose and fructose. Correction: Sucrose is NON-REDUCING because both anomeric carbons (C1 of glucose and C2 of fructose) are tied up in the alpha-1,2-glycosidic bond.",
            "Misconception: All enzymes are proteins. Correction: Ribozymes (such as 23S rRNA in prokaryotes) are catalytic RNA molecules capable of peptide bond synthesis.",
            "Misconception: Lipids are true macromolecules formed by polymer chains. Correction: Lipids are NOT true polymers; they are relatively small hydrophobic molecules assembled into supramolecular non-covalent aggregates (bilayers and micelles).",
            "Misconception: Cellulose can be digested by humans because it is made of glucose. Correction: Humans lack the enzyme cellulase to cleave the beta-1,4-glycosidic bonds of cellulose; it passes as dietary fiber.",
            "Misconception: Disulfide bonds stabilize the primary structure of proteins. Correction: Disulfide (-S-S-) bonds form between cysteine side chains and stabilize TERTIARY and QUATERNARY structure, not primary."
        ],
        "examples": [
            "Hemoglobin: Allosteric tetramer (alpha2beta2) transporting 4 molecules of O2 with sigmoidal cooperative binding curve.",
            "Rubisco (Ribulose-1,5-bisphosphate carboxylase-oxygenase): The most abundant protein and enzyme on Earth, catalyzing carbon fixation.",
            "Collagen: Triple-helical structural protein rich in glycine and proline, providing tensile strength to connective tissues and bones.",
            "ATP (Adenosine Triphosphate): Universal bioenergetic currency containing two high-energy phosphoanhydride bonds releasing ~7.3 kcal/mol upon hydrolysis."
        ],
        "universalFacts": [
            "Cellulose is the most abundant biopolymer on Earth, constituting over 50% of all organic carbon in the biosphere.",
            "Proteins contain exclusively L-stereoisomers of amino acids, whereas carbohydrates in biological systems are predominantly D-stereoisomers.",
            "Double-stranded B-DNA has a helical pitch of 3.4 nm containing 10 base pairs, with an inter-base rise of 0.34 nm.",
            "Phospholipids are amphipathic molecules whose spontaneous self-assembly into bilayers drives cellular compartmentalization."
        ],
        "summary": "Biomolecules are the organic building blocks of cellular life. Carbohydrates provide immediate metabolic energy and structural cellulose/chitin matrices. Proteins, composed of 20 L-amino acids folded into specific 3D tertiary conformations, execute enzymatic catalysis, signal transduction, and structural support. Lipids provide hydrophobic membrane barriers and high-density caloric storage. Nucleic acids (DNA and RNA) encode, replicate, and translate genetic information with complementary base pairing. Water and essential minerals provide the aqueous solvent and catalytic cofactors necessary for life's metabolic machinery."
    }
}

def process_file(filepath, slug, data):
    """Update a single JSON file with expanded content."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = json.load(f)
        
        if slug in data:
            entry = data[slug]
            
            # Update fields if they exist in entry
            for key in ['notes', 'confusion', 'examples', 'universalFacts', 'summary']:
                if key in entry:
                    content[key] = entry[key]
            
            # Write back
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(content, f, indent=2, ensure_ascii=False)
            
            return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

# Find all concept JSON files
updated_count = 0
for concept_dir in ROOT.rglob('concepts'):
    for json_file in concept_dir.glob('*.json'):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            slug = data.get('topicSlug', '')
            if slug in CONTENT_DATA:
                if process_file(json_file, slug, CONTENT_DATA):
                    print(f"Updated: {json_file.name}")
                    updated_count += 1
        except Exception as e:
            print(f"Error reading {json_file}: {e}")

print(f"\nContent expansion complete: {updated_count} files updated")
