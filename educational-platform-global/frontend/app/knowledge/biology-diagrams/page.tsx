import Link from "next/link";
import { ArrowLeft, Dna } from "lucide-react";

const DIAGRAMS = [
  // Class 11
  {
    unit: "Unit 1 — Biomolecules & Cell",
    diagrams: [
      { title: "Plant Cell", desc: "Cell wall, membrane, nucleus, mitochondria, chloroplast, ER, Golgi, vacuole" },
      { title: "Animal Cell", desc: "Cell membrane, nucleus, mitochondria, ER, Golgi, lysosome, ribosomes" },
      { title: "DNA Double Helix", desc: "Sugar-phosphate backbone, base pairs (A-T, G-C), hydrogen bonds" },
      { title: "Enzyme Structure", desc: "Active site, substrate, enzyme-substrate complex, product release" },
    ],
  },
  {
    unit: "Unit 2 — Floral Diversity",
    diagrams: [
      { title: "Flower Structure", desc: "Sepal, petal, stamen (anther, filament), carpel (stigma, style, ovary)" },
      { title: "Moss (Funaria)", desc: "Protonema, leafy gametophore, capsule, peristome teeth" },
      { title: "Fern (Dryopteris)", desc: "Frond, sori, indusium, rhizome, roots" },
      { title: "Pinus (Gymnosperm)", desc: "Male cone, female cone, ovule, pollen grain" },
      { title: "Angiosperm Flower", desc: "Complete flower with all whorls, bisexual structure" },
    ],
  },
  {
    unit: "Unit 3 — Microbiology",
    diagrams: [
      { title: "Bacterial Cell", desc: "Cell wall, capsule, flagellum, pili, nucleoid, plasmid, ribosomes" },
      { title: "Coccus/Bacillus/ spirillum", desc: "Three bacterial shapes with labels" },
      { title: "Virus Structure", desc: "Capsid, genetic material (DNA/RNA), envelope (if present)" },
      { title: "Bacteriophage", desc: "Head, collar, tail sheath, tail fibers, base plate" },
    ],
  },
  {
    unit: "Unit 4 — Ecology",
    diagrams: [
      { title: "Ecosystem Components", desc: "Biotic (producers, consumers, decomposers) and abiotic factors" },
      { title: "Food Chain", desc: "Grass → Grasshopper → Frog → Snake → Hawk" },
      { title: "Food Web", desc: "Interconnected food chains in a ecosystem" },
      { title: "Energy Pyramid", desc: "Producers → Primary → Secondary → Tertiary consumers (10% rule)" },
      { title: "Carbon Cycle", desc: "Photosynthesis, respiration, decomposition, combustion, ocean uptake" },
      { title: "Nitrogen Cycle", desc: "Nitrogen fixation, nitrification, assimilation, denitrification" },
    ],
  },
  {
    unit: "Unit 5 — Human Physiology",
    diagrams: [
      { title: "Heart", desc: "4 chambers, valves, major blood vessels, cardiac cycle" },
      { title: "Lungs", desc: "Trachea, bronchi, bronchioles, alveoli, gas exchange" },
      { title: "Nervous System", desc: "Brain, spinal cord, neurons, synapse" },
      { title: "Kidney & Nephron", desc: "External structure, internal anatomy, nephron with Bowman's capsule" },
      { title: "Digestive System", desc: "Alimentary canal, accessory organs, enzyme action sites" },
      { title: "Neuron", desc: "Dendrite, soma, axon, myelin sheath, axon terminal, synaptic knob" },
    ],
  },
  {
    unit: "Unit 6 — Genetics",
    diagrams: [
      { title: "Mitosis Phases", desc: "Prophase, Metaphase, Anaphase, Telophase with labels" },
      { title: "Meiosis Phases", desc: "Meiosis I & II showing crossing over and reduction division" },
      { title: "Punnett Square", desc: "Monohybrid cross (Tall × Dwarf = 3:1 ratio)" },
      { title: "DNA Replication", desc: "Unzipping, base pairing, leading/lagging strands" },
      { title: "Protein Synthesis", desc: "Transcription (DNA → mRNA) and Translation (mRNA → protein)" },
    ],
  },
  {
    unit: "Unit 7 — Evolution",
    diagrams: [
      { title: "Phylogenetic Tree", desc: "Evolutionary relationships among species" },
      { title: "Human Evolution Timeline", desc: "Australopithecus → Homo habilis → H. erectus → H. sapiens" },
      { title: "Homologous Structures", desc: "Forelimb comparison: human, bat, whale, cat" },
    ],
  },
  {
    unit: "Unit 8 — Faunal Diversity",
    diagrams: [
      { title: "Paramoecium", desc: "Cilia, oral groove, macronucleus, micronucleus, contractile vacuole" },
      { title: "Amoeba", desc: "Pseudopodia, cell membrane, food vacuole, nucleus" },
      { title: "Earthworm", desc: "Segments, clitellum, setae, coelom, digestive tract" },
      { title: "Frog (Rana tigrina)", desc: "External features, internal organs, respiratory system" },
      { title: "Fish (Rohu)", desc: "Fins, scales, lateral line, gills, swim bladder" },
    ],
  },
  {
    unit: "Units 9-10 — Biota & Conservation",
    diagrams: [
      { title: "Adaptations: Xerophyte", desc: "Thick cuticle, sunken stomata, reduced leaves, deep roots" },
      { title: "Adaptations: Hydrophyte", desc: "Thin cuticle, aerial stomata, large air spaces, weak roots" },
      { title: "Conservation Strategies", desc: "In-situ (national parks, sanctuaries) vs Ex-situ (zoos, seed banks)" },
      { title: "Biodiversity Hotspots", desc: "World map highlighting biodiversity hotspot regions" },
    ],
  },
];

export default function BiologyDiagramsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6 md:py-10 px-4">
      <Link href="/knowledge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
          <Dna className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Biology Diagrams</h1>
          <p className="text-xs text-muted-foreground">NEB XI & XII — Labeled diagrams for exam preparation</p>
        </div>
      </div>

      <div className="space-y-6">
        {DIAGRAMS.map((section) => (
          <div key={section.unit} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
              <h2 className="text-sm font-semibold text-foreground">{section.unit}</h2>
            </div>
            <div className="divide-y divide-border/50">
              {section.diagrams.map((d, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-green-600">{i + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground">{d.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
