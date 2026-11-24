/**
 * Regression gate for the authored biology visuals batch (class-12 Heredity &
 * Evolution): every ```svg fence must survive the note pipeline as a real
 * inline figure (edu-visual), and every markdown table must render as a table.
 * If the visuals guard starts rejecting the authored drawings (new forbidden
 * construct, oversize, bad fence syntax) this fails loudly here.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";

const BASE = "../content/notes/concepts";

const FILES = [
  "class-12/biology/heredity-and-evolution/01-mendel-s-laws-of-inheritance-monohybrid-and-dihybrid-cross.json",
  "class-12/biology/heredity-and-evolution/02-incomplete-dominance-and-codominance.json",
  "class-12/biology/heredity-and-evolution/03-linkage-and-crossing-over.json",
  "class-12/biology/heredity-and-evolution/04-sex-determination-and-sex-linked-disorders.json",
  "class-12/biology/heredity-and-evolution/05-chromosome-theory-of-inheritance.json",
  "class-12/biology/heredity-and-evolution/06-molecular-basis-of-inheritance-dna-structure-replication-transcription-translation-gene-regulati.json",
  "class-12/biology/heredity-and-evolution/07-human-genome-project-objectives-and-significance.json",
  "class-12/biology/heredity-and-evolution/08-evolution-evidences-adaptive-radiation-hardy-weinberg-equilibrium-human-evolution.json",
  "class-12/biology/human-health-and-diseases/01-pathogens-and-diseases-malaria-dengue-filariasis-ascariasis-pneumonia-typhoid-tuberculosis-commo.json",
  "class-12/biology/human-health-and-diseases/02-immune-system-innate-and-adaptive-immunity.json",
  "class-12/biology/human-health-and-diseases/03-antigens-and-antibodies-immune-response.json",
  "class-12/biology/human-health-and-diseases/04-vaccination-and-immunization.json",
  "class-12/biology/human-health-and-diseases/05-allergy-and-autoimmune-diseases.json",
  "class-12/biology/microbes-in-human-welfare/01-microorganisms-in-household-products.json",
  "class-12/biology/microbes-in-human-welfare/02-industrial-production-of-antibiotics-alcoholic-beverages-citric-acid.json",
  "class-12/biology/microbes-in-human-welfare/03-microbes-as-biocontrol-agents-and-biofertilizers.json",
  "class-12/biology/microbes-in-human-welfare/04-bioremediation-biogas.json",
  "class-12/biology/organisms-and-environment/01-adaptations-of-organisms-to-environmental-conditions.json",
  "class-12/biology/organisms-and-environment/02-population-ecology-growth-regulation-interactions.json",
  "class-12/biology/organisms-and-environment/03-ecosystem-structure-and-function-productivity-decomposition.json",
  "class-12/biology/organisms-and-environment/04-ecological-succession.json",
  "class-12/biology/organisms-and-environment/05-nutrient-cycling-carbon-nitrogen-phosphorus.json",
  "class-12/biology/organisms-and-environment/06-ecological-pyramids-and-energy-flow.json",
  "class-12/biology/environmental-issues/01-air-pollution-causes-effects-and-control.json",
  "class-12/biology/environmental-issues/02-water-pollution-causes-effects-and-control.json",
  "class-12/biology/environmental-issues/03-solid-waste-management.json",
  "class-12/biology/environmental-issues/04-nuclear-radiation-hazards.json",
  "class-12/biology/environmental-issues/05-greenhouse-effect-global-warming-climate-change.json",
  "class-12/biology/environmental-issues/06-ozone-layer-depletion.json",
  "class-12/biology/environmental-issues/07-rainwater-harvesting-and-wasteland-development.json",
  "class-12/biology/biodiversity-and-conservation/01-biodiversity-genetic-species-and-ecosystem-levels.json",
  "class-12/biology/biodiversity-and-conservation/02-patterns-of-biodiversity-global-and-nepal.json",
  "class-12/biology/biodiversity-and-conservation/03-biodiversity-loss-causes-and-consequences.json",
  "class-12/biology/biodiversity-and-conservation/04-conservation-strategies-in-situ-and-ex-situ.json",
  "class-12/biology/biodiversity-and-conservation/05-red-data-book-and-iucn-categories.json",
  "class-12/biology/biotechnology-principles/01-principles-of-biotechnology-recombinant-dna-technology.json",
  "class-12/biology/biotechnology-principles/02-tools-restriction-enzymes-vectors-competent-host.json",
  "class-12/biology/biotechnology-principles/03-processes-dna-isolation-pcr-gel-electrophoresis-gene-transfer.json",
  "class-12/biology/biotechnology-principles/04-applications-of-recombinant-dna-technology.json",
  "class-12/biology/biotechnology-applications/01-biotechnological-applications-in-agriculture-bt-cotton-nematode-resistant-tobacco.json",
  "class-12/biology/biotechnology-applications/02-biotechnological-applications-in-medicine-insulin-gene-therapy-therapeutic-proteins.json",
  "class-12/biology/biotechnology-applications/03-transgenic-animals.json",
  "class-12/biology/biotechnology-applications/04-biopiracy-and-patent-issues.json",
  "class-12/biology/strategies-for-food-production/01-plant-breeding-methods-and-examples.json",
  "class-12/biology/strategies-for-food-production/02-single-cell-protein-scp.json",
  "class-12/biology/strategies-for-food-production/03-animal-husbandry-breeds-and-management.json",
  "class-12/biology/strategies-for-food-production/04-biofertilizers-and-sustainable-agriculture.json",
  "class-11/biology/faunal-diversity/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json",
  "class-11/biology/faunal-diversity/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with.json",
  "class-11/biology/faunal-diversity/02-paramecium-caudatum-plasmodium-vivax-habits-and-habitat-structure-reproduction-life-cycle.json",
  "class-11/biology/faunal-diversity/03-economic-importance-of-p-falciparum.json",
  "class-11/biology/faunal-diversity/04-animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals.json",
  "class-11/biology/faunal-diversity/05-diagnostic-features-and-classification-of-phyla-up-to-class-porifera-coelenterata-cnidaria-platy.json",
  "class-11/biology/faunal-diversity/06-earthworm-pheretima-posthuma-habit-and-habitat-external-features-digestive-system-alimentary-can.json",
  "class-11/biology/faunal-diversity/06-frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration.json",
  "class-11/biology/faunal-diversity/07-earthworm-excretory-system-types-of-nephridia-structure-and-arrangement-of-septal-nephridia-nerv.json",
  "class-11/biology/faunal-diversity/07-frog-reproductive-system-male-and-female-reproductive-organs.json",
  "class-11/biology/faunal-diversity/08-earthworm-reproductive-systems-male-and-female-reproductive-organs-copulation-cocoon-formation-a.json",
  "class-11/biology/faunal-diversity/09-frog-rana-tigrina-habit-and-habitat-external-features-digestive-system-alimentary-canal-digestiv.json",
  "class-11/biology/faunal-diversity/10-frog-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respirato.json",
  "class-11/biology/faunal-diversity/11-frog-reproductive-system-male-and-female-reproductive-organs.json",
  "class-11/biology/floral-diversity/01-introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system-mone.json",
  "class-11/biology/floral-diversity/02-fungi-general-introduction-and-characteristic-features.json",
  "class-11/biology/floral-diversity/02-status-of-flora-in-nepal-and-world-representation.json",
  "class-11/biology/floral-diversity/03-fungi-general-introduction-and-characteristic-features-of-phycomycetes-ascomycetes-basidiomycete.json",
  "class-11/biology/floral-diversity/04-bryophytes-detailed.json",
  "class-11/biology/floral-diversity/04-structure-and-reproduction-of-mucor-and-yeast.json",
  "class-11/biology/floral-diversity/05-introduction-of-mushrooms-poisonous-and-non-poisonous-mushrooms-economic-importance-of-fungi.json",
  "class-11/biology/floral-diversity/05-pteridophytes-detailed.json",
  "class-11/biology/floral-diversity/06-gymnosperms-detailed.json",
  "class-11/biology/floral-diversity/06-lichen-general-introduction-characteristic-features-and-economic-importance-of-lichen.json",
  "class-11/biology/floral-diversity/07-algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-an.json",
  "class-11/biology/floral-diversity/08-bryophyta-general-introduction-and-characteristic-features-of-liverworts-hornworts-and-moss-morp.json",
  "class-11/biology/floral-diversity/09-pteridophyta-general-introduction-and-characteristic-features-of-pteridophytes-morphological-str.json",
  "class-11/biology/floral-diversity/10-gymnosperm-general-introduction-and-characteristic-features-of-gymnosperms-morphology-and-reprod.json",
  "class-11/biology/floral-diversity/11-angiosperm-morphology-of-root-stem-leaves-inflorescences-flowers-and-fruit.json",
  "class-11/biology/floral-diversity/12-taxonomic-study-definition-taxonomic-hierarchy-classification-systems-artificial-natural-and-phy.json",
  "class-11/biology/floral-diversity/13-angiosperm-families-with-economic-importance-brassicaceae-fabaceae-solanaceae-and-liliaceae.json",
  "class-11/biology/biomolecules-and-cell-biology/01-biomolecules-introduction-and-functions-of-carbohydrates-proteins-lipids-nucleic-acids-minerals-.json",
  "class-11/biology/biomolecules-and-cell-biology/01-biomolecules-introduction-and-functions.json",
  "class-11/biology/biomolecules-and-cell-biology/02-cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells.json",
  "class-11/biology/biomolecules-and-cell-biology/02-cell-introduction-prokaryotic-and-eukaryotic.json",
  "class-11/biology/biomolecules-and-cell-biology/03-detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r.json",
  "class-11/biology/biomolecules-and-cell-biology/03-detail-structure-of-eukaryotic-cells.json",
  "class-11/biology/biomolecules-and-cell-biology/04-cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign.json",
  "class-11/biology/biota-and-environment/01-animal-adaptation-aquatic-primary-and-secondary-terrestrial-cursorial-fossorial-and-arboreal-and.json",
  "class-11/biology/biota-and-environment/01-animal-adaptation-aquatic-terrestrial-and-volant-adaptation.json",
  "class-11/biology/biota-and-environment/02-animal-behavior-reflex-action-taxes-dominance-and-leadership.json",
  "class-11/biology/biota-and-environment/03-fish-and-bird-migration.json",
  "class-11/biology/biota-and-environment/04-environmental-pollution-sources-effects-and-control-measures-of-air-water-and-soil-pollution.json",
  "class-11/biology/biota-and-environment/05-pesticides-and-their-effects.json",
  "class-11/biology/conservation-biology/03-wildlife-importance-causes-of-extinction-and-conservation-strategies.json",
  "class-11/biology/conservation-biology/05-endangered-species-in-nepal.json",
  "class-11/biology/ecology/01-ecosystem-ecology-concept-of-ecology-biotic-and-abiotic-factors-species-interactions.json",
  "class-11/biology/ecology/02-concept-of-ecosystem-structural-and-functional-aspects-of-pond-and-forest-ecosystem.json",
  "class-11/biology/ecology/02-food-chain-food-web-trophic-level-ecological-pyramids-productivity.json",
  "class-11/biology/ecology/03-food-chain-food-web-trophic-level-ecological-pyramids-productivity.json",
  "class-11/biology/ecology/04-biogeochemical-cycles-carbon-and-nitrogen-cycles-concept-of-succession.json",
  "class-11/biology/ecology/05-ecological-adaptation-concept-of-adaptation-hydrophytes-and-xerophytes.json",
  "class-11/biology/ecology/06-ecological-imbalances-greenhouse-effects-and-climate-change-depletion-of-ozone-layer-acid-rain-a.json",
  "class-11/biology/evolutionary-biology/01-life-and-its-origin-oparin-haldane-theory-miller-and-urey-s-experiment.json",
  "class-11/biology/evolutionary-biology/03-theories-of-evolution-lamarckism-darwinism-and-concept-of-neo-darwinism.json",
  "class-11/biology/evolutionary-biology/04-human-evolution-position-of-man-in-animal-kingdom.json",
  "class-11/biology/evolutionary-biology/05-differences-between-new-world-monkeys-and-old-world-monkeys-apes-and-man.json",
  "class-11/biology/evolutionary-biology/06-evolution-of-modern-man-starting-from-anthropoid-ancestor.json",
  "class-11/biology/introduction-to-biology/02-relation-of-biology-with-other-sciences.json",
  "class-11/biology/introductory-microbiology/01-monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyano.json",
  "class-11/biology/introductory-microbiology/02-impacts-of-biotechnology-in-the-field-of-microbiology.json",
  "class-11/biology/introductory-microbiology/02-virus-general-introduction-structure-and-importance-of-virus-bacteriophage.json",
  "class-11/biology/introductory-microbiology/03-impacts-of-biotechnology-in-the-field-of-microbiology.json",
  "class-11/biology/vegetation/01-vegetation-introduction-types-of-vegetation-in-nepal.json",
  "class-11/biology/vegetation/02-in-situ-protected-areas-and-ex-situ-botanical-garden-seed-bank-conservation.json",
  "class-11/biology/vegetation/03-natural-environment-vegetation-and-human-activities.json",
];

describe("authored biology tables + svg diagrams render", () => {
  for (const rel of FILES) {
    it(`renders tables and figures for ${rel.split("/").pop()}`, () => {
      const data = JSON.parse(readFileSync(`${BASE}/${rel}`, "utf8"));
      const notes: string[] = data.notes;
      const tableCount = notes.reduce((acc, n) => acc + (n.match(/\|---/g) || []).length, 0);
      const svgs = notes.filter((n) => n.startsWith("```svg"));

      expect(tableCount).toBeGreaterThanOrEqual(2);
      expect(svgs.length).toBeGreaterThanOrEqual(1);

      for (const t of notes.filter((n) => n.includes("|---"))) {
        const html = renderNoteHtml(t);
        expect(html).toContain("<table");
      }
      for (const s of svgs) {
        const html = renderNoteHtml(s);
        // The fence must become a real inline figure, not fall back to a code block.
        expect(html).toContain("edu-visual");
        expect(html).toContain("<svg");
        expect(html).not.toContain("&lt;svg");
      }
    });
  }
});
