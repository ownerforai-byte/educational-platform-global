const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'moecdc-extraction', 'out-biology');
const BIOLOGY_DIR = path.join(__dirname, 'content', 'ravikishan', 'class-11-notes', 'biology');

const UNIT_DATA = {
    'biomolecules-and-cell-biology': {
        topics: ['Biomolecules', 'Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids', 'Enzymes', 'Cell', 'Cell Theory', 'Prokaryotic Cell', 'Eukaryotic Cell', 'Cell Organelles', 'Cell Membrane', 'Cell Division', 'Mitosis', 'Meiosis'],
        summary: 'Study of biological molecules (carbohydrates, proteins, lipids, nucleic acids) and cell structure/function including cell theory, organelles, and cell division (mitosis/meiosis).',
        keyConcepts: [
            'Biomolecules are organic compounds (C,H,O,N,S,P) that make up living organisms',
            'Carbohydrates: monosaccharides (glucose), disaccharides (sucrose), polysaccharides (starch, glycogen, cellulose)',
            'Proteins: amino acids linked by peptide bonds; primary→secondary→tertiary→quaternary structure',
            'Lipids: fats, oils, phospholipids, steroids; hydrophobic molecules forming cell membranes',
            'Nucleic acids: DNA (double helix) and RNA (single strand); genetic information storage and transfer',
            'Enzymes: biological catalysts that lower activation energy; specific to substrates',
            'Cell theory: all living things made of cells; cells are basic unit of life; all cells from pre-existing cells',
            'Prokaryotic cells: no nucleus, no membrane-bound organelles; bacteria and archaea',
            'Eukaryotic cells: nucleus, membrane-bound organelles; plants, animals, fungi, protists',
            'Mitosis: cell division producing 2 identical daughter cells; maintains chromosome number',
            'Meiosis: cell division producing 4 haploid gametes; reduces chromosome number by half'
        ]
    },
    'floral-diversity': {
        topics: ['Classification Systems', 'Five Kingdom Classification', 'Monera', 'Protista', 'Fungi', 'Plantae', 'Animalia', 'Algae', 'Bryophytes', 'Pteridophytes', 'Gymnosperms', 'Angiosperms'],
        summary: 'Classification of living organisms into kingdoms, with focus on plant diversity from algae to angiosperms.',
        keyConcepts: [
            'Five kingdom classification by Whittaker: Monera, Protista, Fungi, Plantae, Animalia',
            'Kingdom Monera: prokaryotes — bacteria and cyanobacteria (blue-green algae)',
            'Kingdom Protista: unicellular eukaryotes — amoeba, paramecium, euglena',
            'Kingdom Fungi: heterotrophic eukaryotes — mushrooms, molds, yeasts; cell wall of chitin',
            'Algae: photosynthetic protists — green, red, brown algae; aquatic habitats',
            'Bryophytes: non-vascular plants — mosses; need water for reproduction',
            'Pteridophytes: vascular plants without seeds — ferns; reproduce by spores',
            'Gymnosperms: naked-seeded plants — conifers; seeds not enclosed in fruit',
            'Angiosperms: flowering plants with enclosed seeds; divided into monocots and dicots',
            'Taxonomic hierarchy: Kingdom → Phylum → Class → Order → Family → Genus → Species'
        ]
    },
    'introductory-microbiology': {
        topics: ['Kingdom Monera', 'Bacteria', 'Bacterial Structure', 'Bacterial Nutrition', 'Bacterial Growth', 'Cyanobacteria', 'Virus', 'Virus Structure', 'HIV/AIDS', 'Biotechnology in Microbiology'],
        summary: 'Study of microorganisms — bacteria, cyanobacteria, and viruses — including their structure, nutrition, and economic importance.',
        keyConcepts: [
            'Kingdom Monera: most ancient, smallest, simplest organisms; all prokaryotes',
            'Bacteria: unicellular prokaryotes; shapes include cocci (spherical), bacilli (rod), spirilla (spiral)',
            'Bacterial cell structure: cell wall (peptidoglycan), cell membrane, cytoplasm, ribosomes, nucleoid, flagella, pili, capsule',
            'Gram-positive bacteria: thick peptidoglycan layer, retain crystal violet stain',
            'Gram-negative bacteria: thin peptidoglycan layer, outer membrane, pink stain',
            'Modes of nutrition: autotrophic (photosynthetic/chemosynthetic) and heterotrophic (saprophytic/parasitic)',
            'Cyanobacteria: photosynthetic bacteria; blue-green algae; produce oxygen; fix atmospheric nitrogen',
            'Viruses: acellular, obligate parasites; consist of nucleic acid (DNA or RNA) + protein coat (capsid)',
            'HIV: human immunodeficiency virus; RNA virus attacking CD4+ T cells; causes AIDS',
            'Biotechnology in microbiology: recombinant DNA technology, vaccines, antibiotics, fermentation'
        ]
    },
    'ecology': {
        topics: ['Concept of Ecology', 'Ecosystem', 'Ecosystem Structure', 'Food Chain', 'Food Web', 'Pyramids of Ecosystem', 'Biogeochemical Cycles', 'Ecological Adaptation', 'Ecological Imbalances'],
        summary: 'Study of interactions between organisms and their environment; includes ecosystem structure, energy flow, and biogeochemical cycles.',
        keyConcepts: [
            'Ecology: study of interrelationships between organisms and their environment; coined by Haeckel (1866)',
            'Biotic components: all living organisms (producers, consumers, decomposers)',
            'Abiotic components: non-living factors — sunlight, temperature, water, soil, air',
            'Ecosystem: functional unit of ecology; community of organisms interacting with their physical environment',
            'Ecotone: transition zone between two ecosystems; often has higher biodiversity',
            'Food chain: sequence of organism-through-organism energy transfer; producer→consumer→decomposer',
            'Food web: interconnected food chains; more realistic representation of feeding relationships',
            'Energy flow: unidirectional; ~10% energy transferred between trophic levels (Lindeman\'s 10% law)',
            'Carbon cycle: CO₂ fixation by photosynthesis; respiration and combustion return CO₂ to atmosphere',
            'Nitrogen cycle: N₂ fixation (Rhizobium, cyanobacteria) → nitrification → assimilation → denitrification'
        ]
    },
    'vegetation': {
        topics: ['Vegetation Types', 'Biodiversity Conservation', 'In-situ Conservation', 'Ex-situ Conservation'],
        summary: 'Study of plant communities and vegetation types, and conservation strategies including in-situ and ex-situ methods.',
        keyConcepts: [
            'Vegetation: collective plant life in a particular region; shaped by climate, soil, and disturbances',
            'Tropical rainforests: high rainfall, evergreen trees, highest biodiversity; found in Nepal\'s mid-hills',
            'Temperate forests: deciduous and coniferous trees; moderate climate',
            'Grasslands: dominated by grasses; found in dry regions; support grazing ecosystems',
            'Biodiversity: variety of life at genetic, species, and ecosystem levels',
            'In-situ conservation: protecting species in their natural habitat — national parks, conservation areas',
            'Ex-situ conservation: protecting species outside natural habitat — botanical gardens, seed banks, zoos',
            'Nepal\'s conservation approach: protected areas network including Chitwan National Park and Sagarmatha National Park'
        ]
    },
    'introduction-to-biology': {
        topics: ['Scope and Fields of Biology', 'Relation with Other Sciences'],
        summary: 'Introduction to biology as a science — its scope, branches, levels of organisation, and relationship with other sciences.',
        keyConcepts: [
            'Biology: scientific study of living organisms and their interactions (Greek: bios=life, logos=study)',
            'Father of biology: Aristotle; father of botany: Theophrastus; father of medicine: Hippocrates',
            'Levels of organisation: molecule → organelle → cell → tissue → organ → organ system → organism → population → community → ecosystem → biosphere',
            'Major branches: botany (plants), zoology (animals), microbiology (microorganisms)',
            'Botany sub-disciplines: phycology, bryology, pteridology, mycology, paleobotany',
            'Zoology sub-disciplines: entomology, ornithology, mammalogy, herpetology, ichthyology',
            'Biology relates to chemistry (biochemistry), physics (biophysics), mathematics (biostatistics)',
            'Biotechnology: application of living systems to develop products; medicine, agriculture, industry',
            'Evolution: change in heritable traits over generations; driven by natural selection',
            'Homeostasis: maintenance of stable internal environment despite external changes'
        ]
    },
    'evolutionary-biology': {
        topics: ['Origin and Evolution of Life', 'Evidences of Evolution', 'Theories of Evolution'],
        summary: 'Study of how life has changed over time — evidence from fossils, comparative anatomy, embryology, and molecular biology.',
        keyConcepts: [
            'Evolution: change in the heritable characteristics of biological populations over successive generations',
            'Darwin\'s theory of natural selection: variation, inheritance, high rate of population growth, differential survival/reproduction',
            'Lamarckism: inheritance of acquired characteristics; now largely discredited but historically important',
            'Fossil evidence: preserved remains/traces in sedimentary rock; shows progression of life forms',
            'Comparative anatomy: homologous structures (common origin, different function) vs analogous structures (different origin, same function)',
            'Embryological evidence: similar early developmental stages across vertebrates (gill slits, tail)',
            'Molecular evidence: DNA/protein sequence similarities; cytochrome c, hemoglobin comparisons',
            'Genetic drift: random changes in allele frequencies; founder effect and bottleneck effect',
            'Speciation: formation of new species; allopatric (geographic isolation) and sympatric (without geographic isolation)',
            'Modern evolutionary synthesis: combines Darwinian selection with Mendelian genetics and population genetics'
        ]
    },
    'faunal-diversity': {
        topics: ['Protista and Protozoa', 'Animalia Classification', 'Earthworm', 'Frog'],
        summary: 'Study of animal diversity from protozoa through invertebrates to vertebrates, focusing on classification and morphology.',
        keyConcepts: [
            'Ernst Haeckel proposed kingdom Protista; animal diversity spans from unicellular to complex multicellular organisms',
            'Protozoa: unicellular animals; classified by locomotion — flagellates (Euglena), ciliates (Paramecium), amoeboids (Amoeba), sporozoans (Plasmodium)',
            'Plasmodium vivax causes malaria; Plasmodium falciparum causes malignant malaria',
            'Animal body plans: asymmetrical (sponges), radial (jellyfish), bilateral (most animals)',
            'Body cavities: acoelomate (no cavity), pseudocoelomate (false cavity), coelomate (true cavity)',
            'Segmentation: body divided into repeated units (metamerism); seen in annelids and arthropods',
            'Phylum Porifera: sponges; sessile filter feeders; canal system for water flow',
            'Phylum Coelenterata: jellyfish, corals, hydra; radially symmetrical; cnidoblasts for defense',
            'Phylum Annelida: earthworms; segmented worms with closed circulatory system and setae',
            'Amphibia: frogs; dual life (aquatic larvae, terrestrial adults); three-chambered heart'
        ]
    },
    'biota-and-environment': {
        topics: ['Animal Adaptation', 'Animal Behavior', 'Environmental Pollution'],
        summary: 'How animals adapt to their environment and the impacts of pollution on biota and ecosystems.',
        keyConcepts: [
            'Adaptation: structural, physiological, or behavioral traits that improve survival and reproduction',
            'Structural adaptations: body shape, coloration, camouflage, mimicry',
            'Physiological adaptations: temperature regulation, toxin resistance, hibernation',
            'Behavioral adaptations: migration, hibernation, courtship rituals, social organization',
            'Pollution: introduction of harmful substances into environment — air, water, soil pollution',
            'Air pollution: particulate matter, SO₂, NOₓ, CO, ozone; causes respiratory diseases and acid rain',
            'Water pollution: industrial waste, agricultural runoff, sewage; eutrophication from nutrient excess',
            'Soil pollution: pesticides, heavy metals, plastic waste; affects soil organisms and crop productivity',
            'Biomagnification: increase in concentration of toxins at higher trophic levels (e.g., DDT, mercury)',
            'Environmental impact assessment (EIA): systematic process to predict environmental effects before project implementation'
        ]
    },
    'conservation-biology': {
        topics: ['Biodiversity Conservation', 'Protected Areas'],
        summary: 'Strategies and approaches for conserving biodiversity, including protected areas and sustainable development.',
        keyConcepts: [
            'Conservation biology: applied science dedicated to protecting Earth\'s biodiversity and natural processes',
            'Biodiversity hotspots: regions with exceptional species richness and high endemism under threat',
            'IUCN Red List categories: Extinct (EX), Extinct in Wild (EW), Critically Endangered (CR), Endangered (EN), Vulnerable (VU)',
            'In-situ conservation: protecting species within natural habitats — national parks, wildlife sanctuaries, biosphere reserves',
            'Ex-situ conservation: protecting species outside natural habitats — zoos, botanical gardens, seed banks, gene banks',
            'Nepal\'s protected areas: 10 national parks, 3 conservation areas, 9 wildlife reserves, 1 hunting reserve',
            'Chitwan National Park: UNESCO World Heritage Site; home to Bengal tiger, one-horned rhinoceros',
            'Sagarmatha National Park: Mount Everest region; preserved for cultural and natural significance',
            'Sustainable development: development meeting present needs without compromising future generations',
            'Community-based conservation: involving local communities in conservation planning and management'
        ]
    }
};

function generateMindmap(unitSlug) {
    const data = UNIT_DATA[unitSlug];
    if (!data) return null;

    return {
        title: `${unitSlug} Mindmap`,
        unitSlug: unitSlug,
        topicSlug: `${unitSlug}-mindmap`,
        topicTitle: `${unitSlug.replace(/-/g, ' ')} — interactive concept map`,
        relevance: 0,
        notes: [
            data.summary,
            ...data.keyConcepts.slice(0, 8)
        ]
    };
}

async function processAll() {
    const unitDirs = Object.keys(UNIT_DATA);
    console.log(`Generating mindmaps for ${unitDirs.length} biology units...`);

    for (const unitSlug of unitDirs) {
        const mindmapPath = path.join(BIOLOGY_DIR, unitSlug, 'mindmap', 'mindmap.json');
        const mm = generateMindmap(unitSlug);
        if (!mm) {
            console.log(`  ${unitSlug}: no data found`);
            continue;
        }
        fs.mkdirSync(path.dirname(mindmapPath), { recursive: true });
        fs.writeFileSync(mindmapPath, JSON.stringify(mm, null, 2), 'utf8');
        console.log(`  ✓ ${unitSlug} (${mm.notes.length} notes)`);
    }

    console.log('\nDone! Generated all biology mindmaps.');
}

processAll().catch(e => {
    console.error('FAILED:', e);
    process.exit(1);
});
