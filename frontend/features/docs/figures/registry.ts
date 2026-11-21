/**
 * Topic figure registry — maps an exact syllabus topic slug to authored SVG
 * figures. Same discipline as the TopicVideo registry: explicit slugs only,
 * no fuzzy matching, guarded by a test.
 *
 * Each entry places one or more figures into the doc flow. `afterNoteIndex`
 * anchors a figure right after that note block (0-based); `keyword` anchors
 * after the first note block whose text contains it. Use whichever anchors
 * more robustly. Slugs verified against slugifySyllabusTopic() output.
 */

import type { ComponentType } from "react";
import { SnellsLawRayDiagram } from "./snells-law-ray-diagram";
import { OhmsLawCircuit } from "./ohms-law-circuit";
import { IonicCovalentBonding } from "./ionic-covalent-bonding";
import { EnergyFlowEcosystem } from "./energy-flow-ecosystem";
import { DerivativeTangentLine } from "./derivative-tangent-line";
import { WaveProperties } from "./wave-properties";
import { PeriodicTrendsDiagram } from "./periodic-trends";
import { HybridisationShapes } from "./hybridisation-shapes";
import { GalvanicCell } from "./galvanic-cell";
import { ThinLensRays } from "./thin-lens-rays";
import { ConcaveMirrorRays } from "./concave-mirror-rays";
import { ProjectileMotion } from "./projectile-motion";
import { FaradayInduction } from "./faraday-induction";
import { EukaryoticCell } from "./eukaryotic-cell";
import { MitosisStages } from "./mitosis-stages";
import { BiomoleculeClasses } from "./biomolecule-classes";
import { BacterialCell } from "./bacterial-cell";
import { BacteriophageStructure } from "./bacteriophage-structure";
import { NitrogenCycle } from "./nitrogen-cycle";
import { EarthwormDigestive } from "./earthworm-digestive";
import { FrogHeartCirculation } from "./frog-heart-circulation";
import { PlasmaMembraneFluidMosaic } from "./plasma-membrane-fluid-mosaic";
import { MitochondrionCutaway } from "./mitochondrion-cutaway";
import { ChloroplastCutaway } from "./chloroplast-cutaway";
import { NucleusStructure } from "./nucleus-structure";
import { GolgiSecretoryPathway } from "./golgi-secretory-pathway";
import { CarbohydrateTypes } from "./carbohydrate-types";
import { ProteinStructureLevels } from "./protein-structure-levels";
import { TriglycerideFormation } from "./triglyceride-formation";
import { NucleotideDnaHelix } from "./nucleotide-dna-helix";
import { CellTheoryTimeline } from "./cell-theory-timeline";
import { ProkaryoteVsEukaryote } from "./prokaryote-vs-eukaryote";
import { CellSizeScale } from "./cell-size-scale";
import { UnicellularToMulticellular } from "./unicellular-to-multicellular";
import { MicroscopeComparison } from "./microscope-comparison";
import { CellCyclePhases } from "./cell-cycle-phases";
import { MeiosisIStages } from "./meiosis-one-stages";
import { CrossingOver } from "./crossing-over";
import { MitosisVsMeiosisOutcome } from "./mitosis-vs-meiosis-outcome";
import { GlucoseRingForms } from "./glucose-ring-forms";
import { PeptideBondFormation } from "./peptide-bond-formation";
import { LipidTypesChart } from "./lipid-types-chart";
import { DnaDoubleHelixDetail } from "./dna-double-helix-detail";
import { ProteinDenaturationCurve } from "./protein-denaturation-curve";
import { FoodTestsChart } from "./food-tests-chart";
import { CondensationVsHydrolysis } from "./condensation-vs-hydrolysis";
import { ProkaryoticCellDetailed } from "./prokaryotic-cell-detailed";
import { EukaryoticCellGeneral } from "./eukaryotic-cell-general";
import { CellTheoryContributors } from "./cell-theory-contributors";
import { EndosymbioticTheory } from "./endosymbiotic-theory";
import { RibosomeTypesChart } from "./ribosome-types-chart";
import { MicroscopeResolutionScale } from "./microscope-resolution-scale";
import { CellSizeLogScale } from "./cell-size-log-scale";
import { CellWallLayers } from "./cell-wall-layers";
import { MembraneTransportModes } from "./membrane-transport-modes";
import { EndoplasmicReticulumDetail } from "./endoplasmic-reticulum-detail";
import { GolgiLysosomeTeam } from "./golgi-lysosome-team";
import { ChloroplastGranaDetail } from "./chloroplast-grana-detail";
import { NuclearPoreDetail } from "./nuclear-pore-detail";
import { CytoskeletonTypes } from "./cytoskeleton-types";
import { MitosisStagesPanel } from "./mitosis-stages-panel";
import { MeiosisTwoStages } from "./meiosis-two-stages";
import { ChromosomeMorphology } from "./chromosome-morphology";
import { CytokinesisContrast } from "./cytokinesis-contrast";
import { CellCycleCheckpoints } from "./cell-cycle-checkpoints";
import { AmitosisMitosisMeiosis } from "./amitosis-mitosis-meiosis";
import { ThreeDomainsFeatures } from "./three-domains-features";
import { MoneraCharacters } from "./monera-characters";
import { NomenclatureCodes } from "./nomenclature-codes";
import { FiveKingdomNutrition } from "./five-kingdom-nutrition";
import { BacteriaVsArchaea } from "./bacteria-vs-archaea";
import { VirusKingdomQuestion } from "./virus-kingdom-question";
import { BinomialNameExamples } from "./binomial-name-examples";
import { NepalFloraComposition } from "./nepal-flora-composition";
import { WorldPlantDiversity } from "./world-plant-diversity";
import { FloraThreatsChain } from "./flora-threats-chain";
import { RhododendronCaseStudy } from "./rhododendron-case-study";
import { FloraAltitudeTurnover } from "./flora-altitude-turnover";
import { FloraUsesPanels } from "./flora-uses-panels";
import { FloraEndemicWhy } from "./flora-endemic-why";
import { FungalLifeCycleGeneral } from "./fungal-life-cycle-general";
import { MycorrhizaSymbiosis } from "./mycorrhiza-symbiosis";
import { FungalVsPlantCell } from "./fungal-vs-plant-cell";
import { MyceliumNetwork } from "./mycelium-network";
import { FungalEconomicBalance } from "./fungal-economic-balance";
import { PhycomycetesProfile } from "./phycomycetes-profile";
import { AscoVsBasidio } from "./asco-vs-basidio";
import { MucorLifeCycleStages } from "./mucor-life-cycle-stages";
import { ZygosporeFormationDetail } from "./zygospore-formation-detail";
import { YeastIndustrialUses } from "./yeast-industrial-uses";
import { MucorBreadHabitat } from "./mucor-bread-habitat";
import { YeastVsBacteria } from "./yeast-vs-bacteria";
import { YeastLifeCycleFull } from "./yeast-life-cycle-full";
import { SporangiumZoom } from "./sporangium-zoom";
import { BacterialShapes } from "./bacterial-shapes";
import { BacterialNutritionModes } from "./bacterial-nutrition-modes";
import { BacterialGrowthCurve } from "./bacterial-growth-curve";
import { BinaryFissionRecombination } from "./binary-fission-recombination";
import { VirusShapeTypes } from "./virus-shape-types";
import { LyticLysogenicCycle } from "./lytic-lysogenic-cycle";
import { VirusVsBacteria } from "./virus-vs-bacteria";
import { HivRetrovirus } from "./hiv-retrovirus";
import { RecombinantDnaSteps } from "./recombinant-dna-steps";
import { PcrSteps } from "./pcr-steps";
import { CloningVectorPlasmid } from "./cloning-vector-plasmid";
import { IndustrialMicrobiology } from "./industrial-microbiology";
import { BiotechApplicationsMap } from "./biotech-applications-map";
import { EcologyOrganisationLevels } from "./ecology-organisation-levels";
import { AbioticFactors } from "./abiotic-factors";
import { SpeciesInteractionsMatrix } from "./species-interactions-matrix";
import { PopulationGrowthCurves } from "./population-growth-curves";
import { EcosystemComponents } from "./ecosystem-components";
import { PondEcosystemZonation } from "./pond-ecosystem-zonation";
import { ForestStratification } from "./forest-stratification";
import { PondVsForestEcosystem } from "./pond-vs-forest-ecosystem";
import { GrazingVsDetritusChain } from "./grazing-vs-detritus-chain";
import { FoodWeb } from "./food-web";
import { EcologicalPyramids } from "./ecological-pyramids";
import { CarbonCycle } from "./carbon-cycle";
import { WaterCycle } from "./water-cycle";
import { SuccessionStages } from "./succession-stages";
import { PhosphorusSulphurCycles } from "./phosphorus-sulphur-cycles";
import { AdaptationTypes } from "./adaptation-types";
import { HydrophyteAdaptations } from "./hydrophyte-adaptations";
import { XerophyteAdaptations } from "./xerophyte-adaptations";
import { HydrophyteVsXerophyte } from "./hydrophyte-vs-xerophyte";
import { PlantHabitatSpectrum } from "./plant-habitat-spectrum";
import { AnimalAdaptationModes } from "./animal-adaptation-modes";
import { GreenhouseEffect } from "./greenhouse-effect";
import { OzoneDepletion } from "./ozone-depletion";
import { AcidRainFormation } from "./acid-rain-formation";
import { EutrophicationSequence } from "./eutrophication-sequence";
import { ClimateChangeImpacts } from "./climate-change-impacts";
import { HabitatVsNiche } from "./habitat-vs-niche";
import { ForestNutrientCycle } from "./forest-nutrient-cycle";
import { EnergyFlowTenPercent } from "./energy-flow-ten-percent";
import { ProductivityGppNpp } from "./productivity-gpp-npp";
import { ProtozoaLocomotion } from "./protozoa-locomotion";
import { ProtozoaClassification } from "./protozoa-classification";
import { AmoebaStructure } from "./amoeba-structure";
import { ProtozoaNutritionModes } from "./protozoa-nutrition-modes";
import { ProtozoaReproduction } from "./protozoa-reproduction";
import { ParameciumStructure } from "./paramecium-structure";
import { PlasmodiumLifeCycle } from "./plasmodium-life-cycle";
import { MalarialFeverTimeline } from "./malarial-fever-timeline";
import { PlasmodiumRbcStages } from "./plasmodium-rbc-stages";
import { MalariaControlTriangle } from "./malaria-control-triangle";
import { PlasmodiumSpeciesComparison } from "./plasmodium-species-comparison";
import { MalariaDiseaseBurden } from "./malaria-disease-burden";
import { MalariaFeverPatterns } from "./malaria-fever-patterns";
import { MalariaControlMeasures } from "./malaria-control-measures";
import { MalariaDiagnosisTreatment } from "./malaria-diagnosis-treatment";
import { MalariaComplications } from "./malaria-complications";
import { BodySymmetryTypes } from "./body-symmetry-types";
import { GermLayers } from "./germ-layers";
import { BodyCavityTypes } from "./body-cavity-types";
import { PhylaOverviewTree } from "./phyla-overview-tree";
import { SegmentationBodyPlans } from "./segmentation-body-plans";
import { PoriferaCanalSystem } from "./porifera-canal-system";
import { CnidariaPolypMedusa } from "./cnidaria-polyp-medusa";
import { WormPhylaComparison } from "./worm-phyla-comparison";
import { ArthropodaBodyPlan } from "./arthropoda-body-plan";
import { MolluscaEchinodermata } from "./mollusca-echinodermata";
import { EarthwormExternalFeatures } from "./earthworm-external-features";
import { EarthwormAlimentaryCanal } from "./earthworm-alimentary-canal";
import { EarthwormSetaeLocomotion } from "./earthworm-setae-locomotion";
import { EarthwormCirculationRespiration } from "./earthworm-circulation-respiration";
import { EarthwormDigestiveGlands } from "./earthworm-digestive-glands";
import { EarthwormEconomicImportance } from "./earthworm-economic-importance";
import { SeptalNephridiaStructure } from "./septal-nephridia-structure";
import { NephridiaTypesComparison } from "./nephridia-types-comparison";
import { EarthwormExcretoryProducts } from "./earthworm-excretory-products";
import { EarthwormNervousSystem } from "./earthworm-nervous-system";
import { EarthwormReflexArc } from "./earthworm-reflex-arc";
import { EarthwormReproductiveSystem } from "./earthworm-reproductive-system";
import { EarthwormCopulationCocoon } from "./earthworm-copulation-cocoon";
import { EarthwormMaleFemaleOrgans } from "./earthworm-male-female-organs";
import { EarthwormSpermPathway } from "./earthworm-sperm-pathway";
import { EarthwormLifeCycle } from "./earthworm-life-cycle";
import { FrogHabitHabitat } from "./frog-habit-habitat";
import { FrogExternalFeatures } from "./frog-external-features";
import { FrogAlimentaryCanal } from "./frog-alimentary-canal";
import { FrogFeedingMechanics } from "./frog-feeding-mechanics";
import { FrogDigestionChemistry } from "./frog-digestion-chemistry";
import { FrogHeartInternal } from "./frog-heart-internal";
import { FrogBloodComposition } from "./frog-blood-composition";
import { FrogCirculationPath } from "./frog-circulation-path";
import { FrogRespirationModes } from "./frog-respiration-modes";
import { FrogMaleReproductiveSystem } from "./frog-male-reproductive-system";
import { FrogFemaleReproductiveSystem } from "./frog-female-reproductive-system";
import { FrogAmplexusFertilisation } from "./frog-amplexus-fertilisation";
import { FrogGametogenesis } from "./frog-gametogenesis";
import { FrogDevelopmentStages } from "./frog-development-stages";
import { FrogMetamorphosis } from "./frog-metamorphosis";
import { ThreeDomainsTree } from "./three-domains-tree";
import { FiveKingdomsChart } from "./five-kingdoms-chart";
import { BinomialNomenclatureRules } from "./binomial-nomenclature-rules";
import { TaxonomicHierarchyLadder } from "./taxonomic-hierarchy-ladder";
import { KingdomsComparisonTable } from "./kingdoms-comparison-table";
import { NepalFloraStats } from "./nepal-flora-stats";
import { NepalVegetationZones } from "./nepal-vegetation-zones";
import { FloraHotspotMap } from "./flora-hotspot-map";
import { FloraSpeciesStatus } from "./flora-species-status";
import { FloraConservationStrategies } from "./flora-conservation-strategies";
import { FungalHyphaeTypes } from "./fungal-hyphae-types";
import { FungalCellStructure } from "./fungal-cell-structure";
import { FungalClassesChart } from "./fungal-classes-chart";
import { FungalNutritionModes } from "./fungal-nutrition-modes";
import { FungalSporeCases } from "./fungal-spore-cases";
import { MucorStructure } from "./mucor-structure";
import { MucorReproduction } from "./mucor-reproduction";
import { YeastCellStructure } from "./yeast-cell-structure";
import { YeastReproduction } from "./yeast-reproduction";
import { MucorVsYeast } from "./mucor-vs-yeast";
import { YeastFermentation } from "./yeast-fermentation";
import { MushroomStructure } from "./mushroom-structure";
import { MushroomLifeCycle } from "./mushroom-life-cycle";
import { PoisonousVsEdibleMushrooms } from "./poisonous-vs-edible-mushrooms";
import { MushroomCultivationSteps } from "./mushroom-cultivation-steps";
import { FungiEconomicImportance } from "./fungi-economic-importance";
import { LichenSymbiosis } from "./lichen-symbiosis";
import { LichenGrowthForms } from "./lichen-growth-forms";
import { LichenReproduction } from "./lichen-reproduction";
import { LichenImportance } from "./lichen-importance";
import { LichenPioneerSuccession } from "./lichen-pioneer-succession";
import { AlgaeThreeClasses } from "./algae-three-classes";
import { AlgalThallusTypes } from "./algal-thallus-types";
import { SpirogyraStructure } from "./spirogyra-structure";
import { SpirogyraConjugation } from "./spirogyra-conjugation";
import { AlgaeEconomicUses } from "./algae-economic-uses";
import { AlgaeVsLandPlants } from "./algae-vs-land-plants";
import { BryophyteGroups } from "./bryophyte-groups";
import { MossLifeCycle } from "./moss-life-cycle";
import { MarchantiaStructure } from "./marchantia-structure";
import { ArchegoniumAntheridium } from "./archegonium-antheridium";
import { BryophyteImportance } from "./bryophyte-importance";
import { BryophyteVsFernDominance } from "./bryophyte-vs-fern-dominance";
import { MushroomSectionLayers } from "./mushroom-section-layers";
import { MushroomSporePrintSteps } from "./mushroom-spore-print-steps";
import { MushroomDeathCapWarning } from "./mushroom-death-cap-warning";
import { MushroomVsPlant } from "./mushroom-vs-plant";
import { MushroomGillZoom } from "./mushroom-gill-zoom";
import { MushroomMycorrhizaLink } from "./mushroom-mycorrhiza-link";
import { MushroomHabitatMoisture } from "./mushroom-habitat-moisture";
import { LichenCrossSection } from "./lichen-cross-section";
import { LichenPartnersBenefit } from "./lichen-partners-benefit";
import { LichenIsidiaFragment } from "./lichen-isidia-fragment";
import { LichenPollutionBioindicator } from "./lichen-pollution-bioindicator";
import { LichenUsesChart } from "./lichen-uses-chart";
import { LichenVsMoss } from "./lichen-vs-moss";
import { LichenMycobiontPhycobiont } from "./lichen-mycobiont-phycobiont";
import { AlgaePigmentsChart } from "./algae-pigments-chart";
import { AlgaeHabitatZones } from "./algae-habitat-zones";
import { ChlamydomonasStructure } from "./chlamydomonas-structure";
import { SpirogyraPyrenoidZoom } from "./spirogyra-pyrenoid-zoom";
import { AlgaeReproductionModes } from "./algae-reproduction-modes";
import { AlginIodineProducts } from "./algin-iodine-products";
import { KelpBrownStructure } from "./kelp-brown-structure";
import { MarchantiaGemmaeCups } from "./marchantia-gemmae-cups";
import { MossCapsuleDetail } from "./moss-capsule-detail";
import { BryophyteSporophyteDependence } from "./bryophyte-sporophyte-dependence";
import { HornwortStructure } from "./hornwort-structure";
import { RhizoidVsRoot } from "./rhizoid-vs-root";
import { PeatBogFormation } from "./peat-bog-formation";
import { ProtonemaToLeafyShoot } from "./protonema-to-leafy-shoot";
import { FernSoriDetail } from "./fern-sori-detail";
import { HomosporousVsHeterosporous } from "./homosporous-vs-heterosporous";
import { SelaginellaHeterosporyZoom } from "./selaginella-heterospory-zoom";
import { PteridophyteVsBryophyte } from "./pteridophyte-vs-bryophyte";
import { PteridophyteHabitatsCoal } from "./pteridophyte-habitats-coal";
import { PteridophyteEconomicUses } from "./pteridophyte-economic-uses";
import { PteridophyteSporophyteIndependent } from "./pteridophyte-sporophyte-independent";
import { FernWaterDependence } from "./fern-water-dependence";
import { PinusNeedleCrossSection } from "./pinus-needle-cross-section";
import { PineOvuleZoom } from "./pine-ovule-zoom";
import { GymnospermGametophyteReduction } from "./gymnosperm-gametophyte-reduction";
import { CycasProfile } from "./cycas-profile";
import { ConiferForestBelt } from "./conifer-forest-belt";
import { PineSeedWingedFlight } from "./pine-seed-winged-flight";
import { SeedVsSpore } from "./seed-vs-spore";
import { StemModifications } from "./stem-modifications";
import { RootTipZones } from "./root-tip-zones";
import { LeafPhyllotaxyDetail } from "./leaf-phyllotaxy-detail";
import { FlowerSymmetryTypes } from "./flower-symmetry-types";
import { MonocotVsDicotFull } from "./monocot-vs-dicot-full";
import { PlacentationTypes } from "./placentation-types";
import { AestivationTypes } from "./aestivation-types";
import { HerbariumSheetAnatomy } from "./herbarium-sheet-anatomy";
import { LivingCollectionsGardens } from "./living-collections-gardens";
import { MonographFloraManual } from "./monograph-flora-manual";
import { BenthamHookerSystem } from "./bentham-hooker-system";
import { LinnaeusBinomialRules } from "./linnaeus-binomial-rules";
import { SpecimenCollectionSteps } from "./specimen-collection-steps";
import { PhylogeneticTreeReading } from "./phylogenetic-tree-reading";
import { MustardEconomy } from "./mustard-economy";
import { FabaceaeNodulesRhizobium } from "./fabaceae-nodules-rhizobium";
import { SolanaceaeAlkaloidCrops } from "./solanaceae-alkaloid-crops";
import { LiliaceaeMonocotBlueprint } from "./liliaceae-monocot-blueprint";
import { FamilyFruitTypes } from "./family-fruit-types";
import { FamilyStamensIdChart } from "./family-stamens-id-chart";
import { OnionGarlicAloe } from "./onion-garlic-aloe";
import { GramStainingSteps } from "./gram-staining-steps";
import { BacterialFlagellaTypes } from "./bacterial-flagella-types";
import { CyanobacteriaHeterocyst } from "./cyanobacteria-heterocyst";
import { BacterialCurdAntibiotics } from "./bacterial-curd-antibiotics";
import { BacterialPlasmidMesosome } from "./bacterial-plasmid-mesosome";
import { MoneraOverview } from "./monera-overview";
import { BacterialCapsuleSlime } from "./bacterial-capsule-slime";
import { BacterialGrowthConditions } from "./bacterial-growth-conditions";
import { VirusBorderlineLife } from "./virus-borderline-life";
import { TMVStructure } from "./tmv-structure";
import { ProphageLysogenicDetail } from "./prophage-lysogenic-detail";
import { VirusGenomeTypes } from "./virus-genome-types";
import { PhageInfectionSteps } from "./phage-infection-steps";
import { VirusVaccines } from "./virus-vaccines";
import { PrionDisease } from "./prion-disease";
import { InsulinProductionFlow } from "./insulin-production-flow";
import { GeneTherapyCycle } from "./gene-therapy-cycle";
import { GoldenRiceBtCrops } from "./golden-rice-bt-crops";
import { DnaFingerprinting } from "./dna-fingerprinting";
import { BioremediationOil } from "./bioremediation-oil";
import { BiofertiliserBiopesticide } from "./biofertiliser-biopesticide";
import { EnzymeTechnology } from "./enzyme-technology";
import { FernStructure } from "./fern-structure";
import { FernLifeCycle } from "./fern-life-cycle";
import { FernProthallus } from "./fern-prothallus";
import { PteridophyteDiversity } from "./pteridophyte-diversity";
import { VascularTissueBundle } from "./vascular-tissue-bundle";
import { GymnospermVsAngiosperm } from "./gymnosperm-vs-angiosperm";
import { PinusMorphology } from "./pinus-morphology";
import { PineConesMaleFemale } from "./pine-cones-male-female";
import { PinePollinationSeed } from "./pine-pollination-seed";
import { GymnospermDiversityUses } from "./gymnosperm-diversity-uses";
import { RootTypes } from "./root-types";
import { StemMorphology } from "./stem-morphology";
import { LeafVenationPhyllotaxy } from "./leaf-venation-phyllotaxy";
import { InflorescenceTypes } from "./inflorescence-types";
import { FlowerStructure } from "./flower-structure";
import { FruitTypes } from "./fruit-types";
import { TaxonRanksLadder } from "./taxon-ranks-ladder";
import { TaxonomicAids } from "./taxonomic-aids";
import { ClassificationSystemsTimeline } from "./classification-systems-timeline";
import { DichotomousKeyExample } from "./dichotomous-key-example";
import { SpeciesConcept } from "./species-concept";
import { FloralFormulaAnatomy } from "./floral-formula-anatomy";
import { BrassicaceaeFeatures } from "./brassicaceae-features";
import { FabaceaeFeatures } from "./fabaceae-features";
import { SolanaceaeFeatures } from "./solanaceae-features";
import { LiliaceaeFeatures } from "./liliaceae-features";
import { FamiliesComparisonTable } from "./families-comparison-table";
import { FamiliesEconomicImportance } from "./families-economic-importance";
import { AquaticAdaptations } from "./aquatic-adaptations";
import { CursorialFossorialAdaptations } from "./cursorial-fossorial-adaptations";
import { ArborealVolantAdaptations } from "./arboreal-volant-adaptations";
import { PrimaryTerrestrialAdaptations } from "./primary-terrestrial-adaptations";
import { PopulationParametersEquation } from "./population-parameters-equation";
import { ReflexArcPath } from "./reflex-arc-path";
import { TaxesTypes } from "./taxes-types";
import { TaxisVsKinesis } from "./taxis-vs-kinesis";
import { DominanceHierarchy } from "./dominance-hierarchy";
import { InnateLearnedBehavior } from "./innate-learned-behavior";
import { MigrationDefinition } from "./migration-definition";
import { MigrationPurposes } from "./migration-purposes";
import { FishMigrationTypes } from "./fish-migration-types";
import { BirdMigrationRoutes } from "./bird-migration-routes";
import { MigrationSurvivalValue } from "./migration-survival-value";
import { PollutionSourcesMap } from "./pollution-sources-map";
import { AirPollutantEffects } from "./air-pollutant-effects";
import { WaterPollutionBod } from "./water-pollution-bod";
import { SewageTreatmentStages } from "./sewage-treatment-stages";
import { SoilErosionControl } from "./soil-erosion-control";
import { PesticideClassesChart } from "./pesticide-classes-chart";
import { BiomagnificationDdt } from "./biomagnification-ddt";
import { PesticideBackfire } from "./pesticide-backfire";
import { InsecticideNerveAction } from "./insecticide-nerve-action";
import { IpmStrategy } from "./ipm-strategy";
import { BiodiversityLevels } from "./biodiversity-levels";
import { ConservationBiologyGoals } from "./conservation-biology-goals";
import { InSituVsExSitu } from "./in-situ-vs-ex-situ";
import { HippoDrivers } from "./hippo-drivers";
import { BiodiversityValues } from "./biodiversity-values";
import { ProtectedAreaNetwork } from "./protected-area-network";
import { ProtectedAreaTypes } from "./protected-area-types";
import { NepalHotspots } from "./nepal-hotspots";
import { RamsarSitesNepal } from "./ramsar-sites-nepal";
import { MajorProtectedAreas } from "./major-protected-areas";
import { WildlifeValues } from "./wildlife-values";
import { ExtinctionCauses } from "./extinction-causes";
import { HabitatLossChain } from "./habitat-loss-chain";
import { ConservationStrategies } from "./conservation-strategies";
import { CitesAppendices } from "./cites-appendices";
import { IucnCategoriesLadder } from "./iucn-categories-ladder";
import { IucnNepalExamples } from "./iucn-nepal-examples";
import { RareVsThreatened } from "./rare-vs-threatened";
import { RedListScale } from "./red-list-scale";
import { NepalEndangeredSpecies } from "./nepal-endangered-species";
import { SpeciesThreatActions } from "./species-threat-actions";
import { RhinoTigerRecovery } from "./rhino-tiger-recovery";
import { SpeciesRolesEcology } from "./species-roles-ecology";
import { EndangeredSpeciesDefinition } from "./endangered-species-definition";
import { ScopeLevels } from "./scope-levels";
import { BranchesOfBiology } from "./branches-of-biology";
import { BasicVsApplied } from "./basic-vs-applied";
import { WhyBiologyMatters } from "./why-biology-matters";
import { BridgeScienceMap } from "./bridge-science-map";
import { ScienceRelationsTable } from "./science-relations-table";
import { BiologicalMethodCycle } from "./biological-method-cycle";
import { MethodWorkedExample } from "./method-worked-example";
import { PasteurExperiment } from "./pasteur-experiment";
import { MethodPrinciples } from "./method-principles";
import { EarlyEarthConditions } from "./early-earth-conditions";
import { OparinHaldaneHypothesis } from "./oparin-haldane-hypothesis";
import { MillerUreyApparatus } from "./miller-urey-apparatus";
import { OriginGrandTimeline } from "./origin-grand-timeline";
import { OriginTheories } from "./origin-theories";
import { HomologousForelimbs } from "./homologous-forelimbs";
import { AnalogousOrgans } from "./analogous-organs";
import { VestigialOrgans } from "./vestigial-organs";
import { ConnectingLinks } from "./connecting-links";
import { EmbryoSimilarity } from "./embryo-similarity";
import { MolecularEvidenceTree } from "./molecular-evidence-tree";
import { FossilRecordSequence } from "./fossil-record-sequence";
import { LamarckismPropositions } from "./lamarckism-propositions";
import { WeismannGermplasm } from "./weismann-germplasm";
import { DarwinFiveObservations } from "./darwin-five-observations";
import { IndustrialMelanism } from "./industrial-melanism";
import { LamarckVsDarwinGiraffe } from "./lamarck-vs-darwin-giraffe";
import { NeoDarwinismSynthesis } from "./neo-darwinism-synthesis";
import { LamarckVsDarwinTable } from "./lamarck-vs-darwin-table";
import { ManClassificationLadder } from "./man-classification-ladder";
import { PrimateRelativesTree } from "./primate-relatives-tree";
import { ManVsApes } from "./man-vs-apes";
import { HumanEvolutionStages } from "./human-evolution-stages";
import { BrainExpansionChart } from "./brain-expansion-chart";
import { NewVsOldWorldMonkeys } from "./new-vs-old-world-monkeys";
import { MonkeysApesMan } from "./monkeys-apes-man";
import { PlatyrrhineVsCatarrhine } from "./platyrrhine-vs-catarrhine";
import { LesserVsGreatApes } from "./lesser-vs-great-apes";
import { AnthropoidAncestorSplit } from "./anthropoid-ancestor-split";
import { BipedalismAdvantages } from "./bipedalism-advantages";
import { FourGrandTrends } from "./four-grand-trends";
import { OutOfAfricaSpread } from "./out-of-africa-spread";
import { CulturalEvolutionAges } from "./cultural-evolution-ages";
import { TropicalVsTemperateForest } from "./tropical-vs-temperate-forest";
import { TeraiVsBhabarVegetation } from "./terai-vs-bhabar-vegetation";
import { ZonationFactors } from "./zonation-factors";
import { AltitudeLatitudeRule } from "./altitude-latitude-rule";
import { InSituNepalCategories } from "./in-situ-nepal-categories";
import { ExSituMethods } from "./ex-situ-methods";
import { InSituVsExSituContrast } from "./in-situ-vs-ex-situ-contrast";
import { SeedBankCryopreservation } from "./seed-bank-cryopreservation";
import { NepalHotspotContext } from "./nepal-hotspot-context";
import { ForestEcosystemServices } from "./forest-ecosystem-services";
import { VegetationDamageActivities } from "./vegetation-damage-activities";
import { DeforestationConsequences } from "./deforestation-consequences";
import { ForestCoverRecovery } from "./forest-cover-recovery";
import { CommunityForestryRoles } from "./community-forestry-roles";

export interface TopicFigure {
  /** Rendered SVG component (theme-aware, uses currentColor). */
  Component: ComponentType<{ className?: string }>;
  /** Figure caption shown under the diagram. */
  caption: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Anchor: insert after this 0-based note block index. */
  afterNoteIndex?: number;
  /** Or: insert after the first note block containing this keyword. */
  keyword?: string;
}

interface TopicFiguresEntry {
  title: string;
  figures: TopicFigure[];
}

const REGISTRY: Record<string, TopicFiguresEntry> = {
  // ── Physics ──────────────────────────────────────────────────────────────
  "laws-of-refraction-refractive-index": {
    title: "Refraction at a boundary",
    figures: [
      {
        Component: SnellsLawRayDiagram,
        caption:
          "A ray bends towards the normal entering a denser medium (n₂ > n₁) and away when leaving it. Snell's law n₁ sin i = n₂ sin r fixes the angles.",
        alt: "Ray diagram showing incident, refracted and normal lines at a boundary between two media with different refractive indices",
        keyword: "Snell",
      },
    ],
  },
  "ohm-s-law-electrical-resistance-resistivity-conductivity": {
    title: "Ohm's law circuit",
    figures: [
      {
        Component: OhmsLawCircuit,
        caption:
          "A cell drives current I through a resistor R; the voltmeter reads V = IR across the element. Doubling R at fixed V halves I — the straight-line V–I graph is Ohm's law.",
        alt: "Simple circuit diagram with a cell, ammeter in series, resistor and voltmeter in parallel with the resistor",
        keyword: "Ohm",
      },
    ],
  },
  "wavefront-and-huygens-principle": {
    title: "Anatomy of a progressive wave",
    figures: [
      {
        Component: WaveProperties,
        caption:
          "Amplitude a, wavelength λ and one full oscillation period T on a progressive wave; on the right, Huygens' wavefronts with every point acting as a new source.",
        alt: "Sine wave with amplitude and wavelength labelled beside circular wavefronts radiating from a point source",
        keyword: "wavefront",
      },
    ],
  },
  "projectile-motion-and-its-applications": {
    title: "Anatomy of a projectile path",
    figures: [
      {
        Component: ProjectileMotion,
        caption:
          "Horizontal velocity stays constant while the vertical velocity falls to zero at the apex and grows again on the way down — the two independent motions add to a parabola.",
        alt: "Parabolic projectile trajectory with launch velocity, angle, apex, horizontal and vertical velocity components and range",
        keyword: "projectile",
      },
    ],
  },
  "mirror-formula": {
    title: "Rays at a concave mirror",
    figures: [
      {
        Component: ConcaveMirrorRays,
        caption:
          "Parallel rays reflect off a convex mirror and diverge; traced back they meet at the virtual focus behind the mirror. The mirror formula 1/u + 1/v = 1/f uses f < 0.",
        alt: "Concave mirror diagram with parallel incident rays spreading out from a virtual focus behind the mirror",
        keyword: "mirror",
      },
    ],
  },
  "spherical-lenses-angular-magnification": {
    title: "Ray construction for a thin lens",
    figures: [
      {
        Component: ThinLensRays,
        caption:
          "Three construction rays — parallel-to-axis, through the optical centre, and through F — meet at the image. An object between F and 2F gives a real, inverted, enlarged image beyond 2F′.",
        alt: "Thin converging lens with three construction rays forming a real inverted image beyond the second focal point",
        keyword: "lens",
      },
    ],
  },
  "faraday-s-laws-of-electromagnetic-induction": {
    title: "Faraday's induction experiment",
    figures: [
      {
        Component: FaradayInduction,
        caption:
          "Sliding a magnet in or out of a coil changes the flux linked with it, so an emf ε = −N dΦ/dt appears and the galvanometer needle deflects. No motion, no emf.",
        alt: "Bar magnet moving through a solenoid connected to a galvanometer, with the emf formula",
        keyword: "magnet",
      },
    ],
  },
  // ── Chemistry ────────────────────────────────────────────────────────────
  "periodic-trend-and-periodicity-atomic-radii-ionic-radii-ionization-energy-electron-affinity-elec": {
    title: "Periodic trends",
    figures: [
      {
        Component: PeriodicTrendsDiagram,
        caption:
          "Across a period the added protons pull the same shell tighter, so radius falls while ionisation energy and electronegativity rise. Down a group each new shell makes the atom larger and the outer electron easier to remove.",
        alt: "Grid of elements in periods and groups with arrows showing atomic radius falling across a period and rising down a group",
        keyword: "atomic radius",
      },
    ],
  },
  "hybridization-involving-s-and-p-orbitals-only": {
    title: "Hybrid orbitals and molecular shape",
    figures: [
      {
        Component: HybridisationShapes,
        caption:
          "Hybrid orbitals arrange themselves as far apart as possible: four sp³ orbitals at 109.5°, three sp² orbitals at 120° plus a perpendicular p orbital, two sp orbitals at 180°.",
        alt: "Comparison of sp3 tetrahedral, sp2 trigonal planar and sp linear hybrid orbital shapes with bond angles",
        keyword: "hybrid",
      },
    ],
  },
  "electrochemical-cells-galvanic-cell-cell-potential-standard-electrode-potential": {
    title: "A galvanic cell at work",
    figures: [
      {
        Component: GalvanicCell,
        caption:
          "Zinc is oxidised at the anode and copper ions are reduced at the cathode; electrons travel through the wire while the salt bridge keeps charge balanced in both solutions.",
        alt: "Galvanic cell with zinc anode, copper cathode, salt bridge, electron flow and half equations",
        keyword: "galvanic",
      },
    ],
  },
  "ionic-bond-and-its-properties": {
    title: "Ionic bond formation",
    figures: [
      {
        Component: IonicCovalentBonding,
        caption:
          "Left: sodium transfers its valence electron to chlorine — the Na⁺ and Cl⁻ ions then attract electrostatically. Compare with the shared pair on the right.",
        alt: "Diagram of ionic bond formation via electron transfer from sodium to chlorine",
        keyword: "transfer",
      },
    ],
  },
  "covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds": {
    title: "Covalent bond formation",
    figures: [
      {
        Component: IonicCovalentBonding,
        caption:
          "Right: two hydrogen atoms share an electron pair — both nuclei attract the same pair, which is the covalent bond. Compare with full transfer on the left.",
        alt: "Diagram of covalent bond formation via a shared electron pair between two hydrogen atoms",
        keyword: "shared",
      },
    ],
  },
  // ── Biology ──────────────────────────────────────────────────────────────
  "biomolecules-introduction-and-functions-of-carbohydrates-proteins-lipids-nucleic-acids-minerals-": {
    title: "The four classes of biomolecules",
    figures: [
      {
        Component: BiomoleculeClasses,
        caption:
          "The four great biomolecule classes with their monomers, elements and functions. Carbohydrates and lipids store energy; proteins do the work; nucleic acids store and transmit information.",
        alt: "Four panels showing carbohydrates, proteins, lipids and nucleic acids with monomers and functions",
        keyword: "carbohydrates",
      },
      {
        Component: CarbohydrateTypes,
        caption:
          "Carbohydrates from three angles: single monosaccharides (glucose, fructose), pairs joined by glycosidic bonds (sucrose, lactose, maltose), and long storage or structural polysaccharide chains (starch, glycogen, cellulose).",
        alt: "Carbohydrate classification from monosaccharides through glycosidic-bonded disaccharides to polysaccharide chains",
        keyword: "monosaccharide",
      },
      {
        Component: ProteinStructureLevels,
        caption:
          "Protein structure at four levels: the amino-acid sequence (primary), hydrogen-bonded α-helices and β-sheets (secondary), the folded 3-D globule (tertiary), and multi-subunit assemblies like haemoglobin (quaternary).",
        alt: "Four levels of protein structure from amino acid sequence to quaternary subunit assembly",
        keyword: "peptide",
      },
      {
        Component: TriglycerideFormation,
        caption:
          "How a fat is built: glycerol's three −OH groups each ester-bond to a fatty acid, releasing three water molecules. Straight saturated tails pack into solid fats; kinked unsaturated tails stay liquid as oils.",
        alt: "Triglyceride formation from glycerol and three fatty acids with ester bonds and saturated versus unsaturated tails",
        keyword: "ester",
      },
      {
        Component: NucleotideDnaHelix,
        caption:
          "Nucleic acids in three zoom levels: one nucleotide (phosphate + sugar + base), the phosphodiester-linked backbone of a chain, and the double helix held together by A=T and G≡C complementary pairing.",
        alt: "Nucleotide anatomy, polynucleotide chain and DNA double helix with complementary base pairing",
        keyword: "nucleotide",
      },
      {
        Component: GlucoseRingForms,
        caption:
          "One glucose, three portraits: the open-chain Fischer form with its reactive aldehyde, the Haworth ring that forms when C1 meets C5, and the stable chair conformation — the shape cells actually build starch and cellulose from.",
        alt: "Glucose shown as Fischer open chain, Haworth pyranose ring and chair conformation with numbered carbons",
        keyword: "glucose",
      },
      {
        Component: PeptideBondFormation,
        caption:
          "The peptide bond: the –COOH of one amino acid meets the –NH2 of the next and a water molecule leaves — a condensation reaction. Chains of these bonds fold into proteins; hydrolysis by proteases reverses it during digestion.",
        alt: "Peptide bond formation between two amino acids releasing water to give a dipeptide",
        keyword: "amino acid",
      },
      {
        Component: LipidTypesChart,
        caption:
          "Four lipid families, one property: hydrophobic. Triglycerides store concentrated energy, phospholipids build every membrane with their water-loving head and water-hating tails, waxes waterproof, and steroids like cholesterol signal and stiffen.",
        alt: "Four lipid types compared: triglyceride, phospholipid, wax and steroid with structures and roles",
        keyword: "phospholipid",
      },
      {
        Component: DnaDoubleHelixDetail,
        caption:
          "The double helix measured: two antiparallel strands, a 2 nm diameter, 3.4 nm per turn, and rungs of paired bases — A with T by two hydrogen bonds, G with C by three — the pairing rule that makes DNA copyable.",
        alt: "DNA double helix detail with antiparallel strands, base pairs, hydrogen bonds and dimensions",
        keyword: "double helix",
      },
      {
        Component: ProteinDenaturationCurve,
        caption:
          "Denaturation: heat, pH extremes and heavy metals unravel a protein's 3-D shape — and with the shape goes the function. Primary sequence survives, so some proteins refold when the insult is removed; egg-white albumin never does.",
        alt: "Protein denaturation from native fold through heat pH and agents to unfolded loss of function",
        keyword: "denaturation",
      },
      {
        Component: FoodTestsChart,
        caption:
          "The lab toolkit for spotting biomolecules: Benedict's turns brick-red for reducing sugars, iodine blue-black for starch, biuret violet for peptide bonds, Sudan III stains lipids, and the emulsion test confirms fats.",
        alt: "Food tests table with Benedict's iodine biuret and Sudan III reagents procedures and positive colours",
        keyword: "Benedict",
      },
      {
        Component: CondensationVsHydrolysis,
        caption:
          "Every biomolecule is built and unbuilt by the same two moves: condensation joins monomers and releases water; hydrolysis splits polymers and spends water. Maltase, pepsin and lipase all run the second reaction in your gut.",
        alt: "Condensation joining monomers releasing water versus hydrolysis splitting polymer adding water",
        keyword: "hydrolysis",
      },
    ],
  },
  "cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells": {
    title: "Cell introduction: prokaryotic and eukaryotic",
    figures: [
      {
        Component: CellTheoryTimeline,
        caption:
          "Cell theory assembled over 190 years: Hooke names 'cells' in cork, Leeuwenhoek sees living microbes, Schleiden and Schwann claim all life is cellular, Virchow adds that cells come only from cells.",
        alt: "Timeline of cell theory from Hooke 1665 to Virchow 1855 with the three tenets",
        keyword: "cell theory",
      },
      {
        Component: ProkaryoteVsEukaryote,
        caption:
          "Side-by-side: the prokaryote keeps its DNA naked in a nucleoid with 70S ribosomes and no internal compartments; the eukaryote wraps its DNA in a nuclear envelope and partitions work into membrane-bound organelles.",
        alt: "Prokaryotic and eukaryotic cells side by side showing nucleoid versus true nucleus and organelles",
        keyword: "prokaryotic",
      },
      {
        Component: CellSizeScale,
        caption:
          "A logarithmic size ladder from virus (nm) through mycoplasma, bacterium and red blood cell (µm) to the egg (mm) — and why diffusion forces cells to stay small: surface area grows as r² but volume as r³.",
        alt: "Logarithmic scale comparing virus, mycoplasma, bacterium, red blood cell, plant cell and egg sizes",
        keyword: "unicellular",
      },
      {
        Component: UnicellularToMulticellular,
        caption:
          "Levels of organisation: a unicellular Amoeba does every job alone, a Volvox colony shares the work, and multicellular life specialises cells into tissues, organs and organ systems — division of labour at every step.",
        alt: "Organisation ladder from unicellular cell through colony, tissue and organ to complete organism",
        keyword: "unicellular",
      },
      {
        Component: MicroscopeComparison,
        caption:
          "How we see cells: the light microscope resolves about 0.2 µm and can watch living cells; the electron microscope resolves about 0.2 nm — revealing ribosomes, membranes and viruses — but only on dead, prepared specimens.",
        alt: "Light microscope versus electron microscope with resolution limits and what each reveals",
        keyword: "microscope",
      },
      {
        Component: ProkaryoticCellDetailed,
        caption:
          "A prokaryote opened up: capsule, peptidoglycan wall and plasma membrane armour a naked circular DNA in the nucleoid, 70S ribosomes, mesosome, plasmid, pili and a rotating flagellum — no nucleus, no membrane-bound organelles.",
        alt: "Detailed prokaryotic bacterium with capsule, wall, membrane, nucleoid, plasmid, ribosomes, mesosome, pili and flagellum",
        keyword: "flagella",
      },
      {
        Component: EukaryoticCellGeneral,
        caption:
          "The generalised eukaryotic cell: a true nucleus plus a full organelle set — rough and smooth ER, Golgi, mitochondrion, lysosome, centrioles and free 80S ribosomes — each compartment running its own chemistry in parallel.",
        alt: "Generalised eukaryotic animal cell with nucleus, RER, SER, Golgi, mitochondrion, lysosome and centrioles labelled",
        keyword: "organelles",
      },
      {
        Component: CellTheoryContributors,
        caption:
          "Five scientists, one theory: Hooke names the cell (1665), Leeuwenhoek sees living ones (1674), Schleiden and Schwann claim all life is cellular (1838–39), and Virchow closes the loop — every cell from a cell (1855).",
        alt: "Timeline portraits of Hooke, Leeuwenhoek, Schleiden, Schwann and Virchow with their contributions",
        keyword: "Virchow",
      },
      {
        Component: EndosymbioticTheory,
        caption:
          "Where organelles came from: an anaerobic host engulfed an aerobic bacterium and kept it as a mitochondrion; a cyanobacterium became the chloroplast. Double membranes, circular DNA, 70S ribosomes and binary fission are the fingerprints.",
        alt: "Endosymbiotic theory in three steps with four lines of evidence for mitochondrial and chloroplast origin",
        keyword: "endosymbiotic",
      },
      {
        Component: RibosomeTypesChart,
        caption:
          "Two ribosome sizes, one job: prokaryotic 70S (50S + 30S) in bacteria, mitochondria and chloroplasts; eukaryotic 80S (60S + 40S) free in the cytosol or bound to rough ER. Svedberg units are not additive — shape matters.",
        alt: "70S versus 80S ribosomes with subunit sizes, locations and antibiotic targets",
        keyword: "70S",
      },
      {
        Component: MicroscopeResolutionScale,
        caption:
          "Resolution beats magnification: the light microscope stops at 200 nm, TEM reaches 0.1 nm for 2-D ultrastructure, SEM renders 3-D surfaces. Cells and bacteria yield to light; viruses and DNA demand electrons.",
        alt: "Resolution scale from millimetre to 0.1 micrometre with LM TEM and SEM capability cards",
        keyword: "electron",
      },
      {
        Component: CellSizeLogScale,
        caption:
          "The seven-orders-of-magnitude ladder: Mycoplasma at 0.1 µm, bacteria at a few µm, red cells at 7 µm, plant cells at tens of µm, the human egg at 100 µm, the ostrich egg at 15 cm — and one nerve cell a metre long.",
        alt: "Logarithmic size ladder from Mycoplasma through bacteria, red blood cell, plant cell and egg to ostrich egg",
        keyword: "surface",
      },
    ],
  },
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r": {
    title: "Eukaryotic cell structure",
    figures: [
      {
        Component: EukaryoticCell,
        caption:
          "Animal cell (left) and plant cell (right). Shared organelles — nucleus, mitochondria, ER, Golgi, ribosomes — plus the plant-only set: cell wall, chloroplasts and the large central vacuole.",
        alt: "Labelled animal and plant cell diagrams showing nucleus, mitochondria, ER, Golgi, ribosomes, lysosome, chloroplast, vacuole and cell wall",
        keyword: "mitochondria",
      },
      {
        Component: PlasmaMembraneFluidMosaic,
        caption:
          "Zooming into the plasma membrane: a fluid mosaic of phospholipids — hydrophilic heads out, hydrophobic tails in — studded with integral and peripheral proteins, channel proteins, glycoproteins and cholesterol that tune fluidity.",
        alt: "Fluid mosaic model of the plasma membrane with phospholipid bilayer, proteins, glycoprotein chains and cholesterol",
        keyword: "plasma membrane",
      },
      {
        Component: NucleusStructure,
        caption:
          "Zooming into the nucleus: a double envelope (continuous with rough ER) pierced by pores that export mRNA and import enzymes, the dense nucleolus making rRNA, and chromatin — DNA wound on histones — suspended in nucleoplasm.",
        alt: "Nucleus with double nuclear envelope, pores, nucleolus, chromatin threads and nucleoplasm",
        keyword: "nucleus",
      },
      {
        Component: MitochondrionCutaway,
        caption:
          "Zooming into a mitochondrion: the inner membrane folds into cristae carrying the electron-transport chain, while the matrix holds Krebs-cycle enzymes, its own circular DNA and 70S ribosomes — a semi-autonomous endosymbiont.",
        alt: "Mitochondrion cutaway with outer membrane, cristae, matrix, circular DNA and ribosomes",
        keyword: "mitochondria",
      },
      {
        Component: ChloroplastCutaway,
        caption:
          "Zooming into a chloroplast: grana stacks of thylakoid membranes run the light reaction (chlorophyll), while the surrounding stroma fixes CO₂ into sugar in the Calvin cycle — also with its own DNA and ribosomes.",
        alt: "Chloroplast cutaway with double membrane, grana stacks, stroma lamellae, circular DNA and ribosomes",
        keyword: "chloroplast",
      },
      {
        Component: GolgiSecretoryPathway,
        caption:
          "Zooming into the endomembrane assembly line: rough ER synthesises proteins, transport vesicles carry them to the Golgi (cis → trans) for modification and addressing, then secretory vesicles ship them out or lysosomes digest with them.",
        alt: "Secretory pathway from rough ER through transport vesicles and Golgi cisternae to secretory vesicles and lysosome",
        keyword: "Golgi",
      },
      {
        Component: CellWallLayers,
        caption:
          "The plant cell wall in layers: pectin-rich middle lamella cements neighbours, the thin primary wall stretches with growth, the lignified secondary wall (S1–S3) adds strength, and plasmodesmata tunnel through it all.",
        alt: "Two adjacent plant cells showing middle lamella, primary and secondary wall layers and plasmodesmata",
        keyword: "cellulose",
      },
      {
        Component: MembraneTransportModes,
        caption:
          "Four ways across the membrane: simple diffusion for small nonpolar molecules, facilitated diffusion through channels, ATP-driven pumps that defy the gradient, and vesicle bulk transport that swallows or exports cargo wholesale.",
        alt: "Four membrane transport mechanisms: simple diffusion, facilitated diffusion, active transport with ATP and bulk vesicle transport",
        keyword: "diffusion",
      },
      {
        Component: EndoplasmicReticulumDetail,
        caption:
          "The ER, the cell's internal highway: rough ER — flattened cisternae studded with ribosomes, continuous with the nuclear envelope — makes and ships proteins; smooth ER tubules make lipids, detoxify drugs and store calcium.",
        alt: "Rough ER with ribosome-studded cisternae versus smooth ER tubules with their functions",
        keyword: "endoplasmic",
      },
      {
        Component: GolgiLysosomeTeam,
        caption:
          "Golgi and lysosome as one system: the cis face receives ER cargo, cisternae modify and tag it, the trans face ships secretory vesicles — and buds off lysosomes, the acidic sacs of hydrolytic enzymes that digest food and worn organelles.",
        alt: "Golgi stack with cis and trans faces feeding secretory vesicles and lysosomes performing heterophagy and autophagy",
        keyword: "lysosome",
      },
      {
        Component: ChloroplastGranaDetail,
        caption:
          "Inside the chloroplast: grana stacks of thylakoid discs run the light reaction — splitting water and loading H⁺ into the lumen — while the stroma around them fixes CO₂ in the Calvin cycle; its own DNA and ribosomes make it semi-autonomous.",
        alt: "Chloroplast with double envelope, stroma, three grana stacks, stroma lamellae and thylakoid membrane detail",
        keyword: "grana",
      },
      {
        Component: NuclearPoreDetail,
        caption:
          "The nuclear envelope up close: two membranes with a perinuclear space, the outer one continuous with rough ER, and pore complexes — eight-protein annuli that export mRNA and ribosomal subunits while importing polymerases and histones.",
        alt: "Nuclear envelope cross-section with pore complex of eight subunits and two-way molecular traffic",
        keyword: "pores",
      },
      {
        Component: CytoskeletonTypes,
        caption:
          "Three filament families, three diameters: hollow tubulin microtubules (25 nm) build spindles and cilia, actin microfilaments (7 nm) contract muscle and pinch cells, and keratin intermediate filaments (10 nm) anchor and armour.",
        alt: "Cytoskeleton three types: microtubules, actin microfilaments and intermediate filaments with functions",
        keyword: "microtubules",
      },
    ],
  },
  "cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-sign": {
    title: "Stages of mitosis",
    figures: [
      {
        Component: MitosisStages,
        caption:
          "Mitosis in six stages: interphase replicates the DNA, prophase condenses it, metaphase lines it on the equator, anaphase splits the chromatids, telophase rebuilds nuclei, and cytokinesis separates two identical daughter cells.",
        alt: "Six-cell sequence showing interphase, prophase, metaphase, anaphase, telophase and cytokinesis with chromosome behaviour",
        keyword: "prophase",
      },
      {
        Component: CellCyclePhases,
        caption:
          "The cell cycle as a ring: G₁ growth, S DNA synthesis, G₂ preparation make up interphase (~90% of the cycle); the M phase then divides. Checkpoints between phases stop damaged cells from dividing.",
        alt: "Cell cycle ring with G1, S, G2 interphase and M phase annotated",
        keyword: "cell cycle",
      },
      {
        Component: MeiosisIStages,
        caption:
          "Meiosis I, the reduction division: homologous chromosomes pair and cross over in prophase I, line up as pairs in metaphase I, and separate whole chromosomes in anaphase I — halving 2n to n without splitting centromeres.",
        alt: "Meiosis I stages showing synapsis, crossing over, paired metaphase alignment and homolog separation",
        keyword: "meiosis",
      },
      {
        Component: CrossingOver,
        caption:
          "Crossing over close-up: paired maternal and paternal chromosomes break and rejoin at a chiasma, so two chromatids leave with swapped segments — new gene combinations that make every gamete unique.",
        alt: "Crossing over between homologous chromosomes at a chiasma producing recombinant chromatids",
        keyword: "crossing over",
      },
      {
        Component: MitosisVsMeiosisOutcome,
        caption:
          "The decisive contrast: mitosis yields two identical diploid daughters for growth and repair; meiosis yields four different haploid gametes — the raw variation on which evolution acts.",
        alt: "Mitosis producing two identical diploid cells versus meiosis producing four different haploid gametes",
        keyword: "haploid",
      },
      {
        Component: MitosisStagesPanel,
        caption:
          "Mitosis in four moves: prophase condenses chromosomes and breaks the envelope, metaphase aligns them on the equator, anaphase splits the centromeres, telophase rebuilds two nuclei — number stays 2n → 2n.",
        alt: "Four mitosis stage circles showing prophase, metaphase, anaphase and telophase chromosome behaviour",
        keyword: "metaphase",
      },
      {
        Component: MeiosisTwoStages,
        caption:
          "Meiosis II is the equational division: the two haploid cells from meiosis I separate their sister chromatids — centromeres finally split — leaving four haploid cells, each genetically unique thanks to meiosis I.",
        alt: "Meiosis II four stages from prophase II to telophase II ending in four haploid cells",
        keyword: "equational",
      },
      {
        Component: ChromosomeMorphology,
        caption:
          "Chromosome anatomy: two sister chromatids joined at the centromere with its kinetochore, p and q arms, telomere caps and a nucleolar organiser — and the four shapes named by centromere position: metacentric, submetacentric, acrocentric, telocentric.",
        alt: "Chromosome parts labelled plus four centromere-position shapes V L J and I",
        keyword: "centromere",
      },
      {
        Component: CytokinesisContrast,
        caption:
          "Splitting the cytoplasm two ways: plants cannot pinch, so Golgi vesicles build a cell plate outward from the centre; animals contract an actin–myosin purse-string that draws the cleavage furrow until two cells separate.",
        alt: "Plant cell plate formation versus animal cleavage furrow with actin ring contraction",
        keyword: "cytokinesis",
      },
      {
        Component: CellCycleCheckpoints,
        caption:
          "Three quality gates guard the cycle: G1 checks size, nutrients and DNA damage; G2 checks replication is complete; the M spindle checkpoint checks every kinetochore is attached. Cyclin–CDK switches run them — and cancer is a failed gate.",
        alt: "Cell cycle ring with G1, G2 and M checkpoints and cyclin CDK control panel",
        keyword: "cyclin",
      },
      {
        Component: AmitosisMitosisMeiosis,
        caption:
          "Three kinds of division compared: amitosis splits directly with no spindle, mitosis runs one division to two identical 2n cells, meiosis runs two divisions to four different n cells with crossing over — growth, repair and reproduction.",
        alt: "Three-way comparison table of amitosis, mitosis and meiosis across six rows",
        keyword: "amitosis",
      },
    ],
  },
  "monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyano": {
    title: "Bacterial cell structure",
    figures: [
      {
        Component: BacterialCell,
        caption:
          "A prokaryotic cell: genetic material free in the nucleoid (no nuclear membrane), 70S ribosomes, mesosome for respiration, and the capsule–wall–membrane armour with flagellum and pili outside.",
        alt: "Labelled rod-shaped bacterial cell showing capsule, peptidoglycan wall, plasma membrane, nucleoid DNA, ribosomes, mesosome, pili and flagellum",
        keyword: "nucleoid",
      },
      {
        Component: BacterialShapes,
        caption:
          "Shape is the first ID step: cocci named by arrangement (single, diplo-, strepto-, staphylo-), rods (bacilli), commas (vibrio) and spirals (spirillum) — combined with the Gram reaction for lab identification.",
        alt: "Bacterial shapes and arrangements: cocci in singles pairs chains and clusters, bacilli, vibrio and spirillum",
        keyword: "cocci",
      },
      {
        Component: BacterialNutritionModes,
        caption:
          "The nutrition map: autotrophs make their own food — photoautotrophs from light (cyanobacteria) or chemoautotrophs from inorganic chemistry — while heterotrophs feed as saprophytes, parasites or symbionts.",
        alt: "Classification tree of bacterial nutrition with photoautotroph chemoautotroph saprophytic parasitic and symbiotic examples",
        keyword: "cyanobacteria",
      },
      {
        Component: BacterialGrowthCurve,
        caption:
          "The growth curve in a closed batch: lag (adapting), log (exponential doubling — most antibiotic-sensitive), stationary (nutrients run out) and decline (waste wins). Label it — a standard NEB diagram question.",
        alt: "Bacterial growth curve with lag log stationary and decline phases annotated",
        keyword: "growth curve",
      },
      {
        Component: BinaryFissionRecombination,
        caption:
          "Reproduction two ways: binary fission copies one cell into two identical ones in ~20 minutes, while conjugation, transformation and transduction swap genes without making new cells.",
        alt: "Binary fission sequence plus conjugation transformation and transduction recombination routes",
        keyword: "binary fission",
      },
      {
        Component: GramStainingSteps,
        caption:
          "Gram staining in four steps: crystal violet, iodine, alcohol, safranin — thick-walled positives stay purple, thin-walled negatives turn pink, and the antibiotic choice follows.",
        alt: "Gram staining steps crystal violet iodine alcohol safranin gram positive purple gram negative pink",
        keyword: "gram",
      },
      {
        Component: BacterialFlagellaTypes,
        caption:
          "Flagella come wired four ways: single polar, polar tuft, both poles, or all around — rotating motors drive the run and the tumble that steers bacteria toward food.",
        alt: "Bacterial flagella arrangements monotrichous lophotrichous amphitrichous peritrichous",
        keyword: "flagella",
      },
      {
        Component: CyanobacteriaHeterocyst,
        caption:
          "The heterocyst is a sealed nitrogen workshop: thick walls exclude the oxygen that would destroy nitrogenase, so cyanobacteria fix N₂ while their neighbours photosynthesise.",
        alt: "Cyanobacteria filament with heterocysts fixing nitrogen Nostoc Anabaena",
        keyword: "heterocyst",
      },
      {
        Component: BacterialCurdAntibiotics,
        caption:
          "Bacteria at work: Lactobacillus sours milk into curd, Rhizobium feeds legumes nitrogen, Streptomyces yields antibiotics, and sewage plants run on bacterial digestion.",
        alt: "Useful bacteria curd Lactobacillus Rhizobium antibiotics sewage treatment",
        keyword: "curd",
      },
      {
        Component: BacterialPlasmidMesosome,
        caption:
          "Two bacterial extras: the plasmid, a small self-replicating circle carrying resistance genes that biotech borrows as a vector, and the mesosome, the membrane infolding that boosts respiration.",
        alt: "Bacterial plasmid circular DNA and mesosome membrane infolding",
        keyword: "plasmid",
      },
      {
        Component: MoneraOverview,
        caption:
          "Four shelves in Monera: bacteria with peptidoglycan walls, photosynthetic cyanobacteria, wall-less mycoplasma, and the extreme-environment archaebacteria-like line — all prokaryotic.",
        alt: "Monera kingdom overview bacteria cyanobacteria mycoplasma archaebacteria",
        keyword: "monera",
      },
      {
        Component: BacterialCapsuleSlime,
        caption:
          "The outermost layer: an organised capsule blocks phagocytosis and makes pneumococcus dangerous, while a loose slime layer glues cells into biofilms.",
        alt: "Bacterial capsule versus slime layer glycocalyx virulence biofilm",
        keyword: "capsule",
      },
      {
        Component: BacterialGrowthConditions,
        caption:
          "Four dials control the doubling: temperature, pH, moisture and oxygen — and every food-preservation trick is just one of the dials turned against the bacteria.",
        alt: "Bacterial growth conditions temperature pH moisture oxygen food preservation",
        keyword: "growth",
      },
    ],
  },
  "virus-general-introduction-structure-and-importance-of-virus-bacteriophage": {
    title: "Bacteriophage structure",
    figures: [
      {
        Component: BacteriophageStructure,
        caption:
          "A T4-type bacteriophage: the polyhedral head stores dsDNA, the contractile sheath injects it, and the tail fibres anchor to the host's wall — a complete parasite with no metabolism of its own.",
        alt: "T4 bacteriophage with labelled head, DNA, collar, sheath, base plate and tail fibres on a bacterial surface",
        keyword: "capsid",
      },
      {
        Component: VirusShapeTypes,
        caption:
          "Four ways to pack a genome: helical rods (TMV), icosahedral shells (adenovirus), membrane-enveloped spheres with spikes (influenza, HIV) and the complex head-plus-tail syringe of T4.",
        alt: "Helical icosahedral enveloped and complex virus architectures compared",
        keyword: "TMV",
      },
      {
        Component: LyticLysogenicCycle,
        caption:
          "Two phage strategies: the lytic cycle hijacks and bursts the host in ~25 minutes; the lysogenic cycle hides as a prophage in the host chromosome, replicating silently until stress switches it to lytic.",
        alt: "Lytic versus lysogenic bacteriophage cycles side by side with induction pathway",
        keyword: "lytic",
      },
      {
        Component: VirusVsBacteria,
        caption:
          "Why antibiotics fail against flu: viruses are non-cellular, non-metabolic and untouched by antibiotics, while bacteria are living cells with walls and ribosomes to attack — the clinical consequence of the comparison.",
        alt: "Comparison table of virus versus bacteria across size structure genome metabolism reproduction and antibiotic response",
        keyword: "lytic",
      },
      {
        Component: HivRetrovirus,
        caption:
          "HIV, the retrovirus: gp120 spikes dock on helper-T CD4 receptors, reverse transcriptase writes RNA backwards into DNA, the provirus hides in the genome, and dying T cells collapse immunity into AIDS.",
        alt: "HIV structure with envelope spikes capsid RNA and reverse transcriptase plus replication steps",
        keyword: "HIV",
      },
      {
        Component: VirusBorderlineLife,
        caption:
          "Living or not? Viruses carry genes, replicate and evolve — yet have no cell, no metabolism, and can be crystallised like salt. The exam answer: obligate intracellular parasites.",
        alt: "Borderline of life arguments for virus living versus nonliving crystallised TMV",
        keyword: "borderline",
      },
      {
        Component: TMVStructure,
        caption:
          "TMV, the helical rod: 2,130 identical capsomeres wound around a single RNA strand — the first virus crystallised, and the crystal still infected tobacco plants.",
        alt: "TMV tobacco mosaic virus helical rod capsomeres RNA mosaic disease leaf",
        keyword: "TMV",
      },
      {
        Component: ProphageLysogenicDetail,
        caption:
          "Inside lysogeny: the prophage sits inserted in the host chromosome, copied with every division, until UV or chemicals induce it to excise and switch to the lytic cycle.",
        alt: "Prophage integrated in host chromosome induction switch to lytic cycle",
        keyword: "prophage",
      },
      {
        Component: VirusGenomeTypes,
        caption:
          "A virus carries DNA or RNA, never both: dsDNA, ssDNA, plus-sense RNA or minus-sense RNA — and retroviruses bend the rule by writing RNA backwards into DNA.",
        alt: "Virus genome types dsDNA ssDNA positive and negative sense RNA",
        keyword: "genome",
      },
      {
        Component: PhageInfectionSteps,
        caption:
          "The phage syringe in four beats: tail fibres dock, the sheath contracts, DNA shoots down the tail tube, and only the genome enters — the empty capsid stays outside.",
        alt: "Phage infection steps adsorption penetration injection eclipse phase",
        keyword: "sheath",
      },
      {
        Component: VirusVaccines,
        caption:
          "Vaccines are rehearsals: live attenuated, inactivated or subunit preparations train memory cells so the real virus meets antibodies before it meets you.",
        alt: "Vaccine types live attenuated inactivated subunit and immune memory response",
        keyword: "vaccine",
      },
      {
        Component: PrionDisease,
        caption:
          "Prions break the rule: infection with no nucleic acid at all — one misfolded protein templates the rest, surviving boiling and causing spongiform brain disease.",
        alt: "Prion misfolded protein conversion scrapie BSE CJD spongiform disease",
        keyword: "prion",
      },
    ],
  },
  "impacts-of-biotechnology-in-the-field-of-microbiology": {
    title: "Impacts of biotechnology in microbiology",
    figures: [
      {
        Component: RecombinantDnaSteps,
        caption:
          "Recombinant DNA in five steps: restriction enzymes cut donor gene and plasmid into matching sticky ends, ligase seals them, bacteria take up the chimera, and selected clones churn out the protein.",
        alt: "Recombinant DNA technology steps from donor DNA and plasmid through ligation to transformed bacterial clones",
        keyword: "recombinant",
      },
      {
        Component: PcrSteps,
        caption:
          "PCR's three-temperature cycle — denature at 94 °C, anneal primers at 55 °C, extend with heat-stable Taq at 72 °C — doubles the target DNA every cycle, reaching a billion copies in thirty.",
        alt: "PCR cycle diagram with denaturation annealing and extension steps and exponential amplification",
        keyword: "PCR",
      },
      {
        Component: CloningVectorPlasmid,
        caption:
          "Anatomy of a cloning vector: an origin of replication so it copies itself, an antibiotic-resistance marker to select transformants, and a multiple cloning site where the foreign gene is spliced in.",
        alt: "Plasmid cloning vector with ori antibiotic marker multiple cloning site and inserted gene in a bacterium",
        keyword: "plasmid",
      },
      {
        Component: IndustrialMicrobiology,
        caption:
          "Microbes as factories: a stirred, aseptic fermenter holds pH, temperature and oxygen steady while the culture converts sugar medium into antibiotics, enzymes, vitamins, single-cell protein and biofuels.",
        alt: "Industrial fermenter with stirrer pH temperature and aeration controls and product list",
        keyword: "industry",
      },
      {
        Component: BiotechApplicationsMap,
        caption:
          "One toolkit, four arenas: insulin and vaccines in medicine, Bt cotton and golden rice in agriculture, oil-eating bacteria in the environment, and DNA fingerprinting in forensics.",
        alt: "Four panels mapping biotechnology applications in medicine agriculture environment and forensics",
        keyword: "vaccine",
      },
      {
        Component: InsulinProductionFlow,
        caption:
          "Insulin in five steps: isolate the human gene, splice it into a plasmid, transform E. coli, ferment in tanks, purify — the first medicine ever made by genetic engineering.",
        alt: "Insulin production flow recombinant DNA plasmid E coli fermentation purification",
        keyword: "insulin",
      },
      {
        Component: GeneTherapyCycle,
        caption:
          "Gene therapy repairs the instruction, not the symptom: a disabled virus delivers a healthy gene to target cells, which then make the protein the patient was born without.",
        alt: "Gene therapy cycle diagnosis vector delivery expression correction SCID",
        keyword: "therapy",
      },
      {
        Component: GoldenRiceBtCrops,
        caption:
          "Two transgenic crops: golden rice makes beta-carotene against vitamin-A blindness, Bt cotton grows its own insecticide — agriculture rewritten by single genes.",
        alt: "Golden rice beta carotene and Bt cotton Bacillus thuringiensis transgenic crops",
        keyword: "golden",
      },
      {
        Component: DnaFingerprinting,
        caption:
          "DNA fingerprinting reads VNTR bands: extract, cut, amplify by PCR, run the gel, compare — the band pattern that convicts, acquits or confirms paternity.",
        alt: "DNA fingerprinting gel electrophoresis band comparison forensics paternity",
        keyword: "fingerprint",
      },
      {
        Component: BioremediationOil,
        caption:
          "Bioremediation lets microbes do the cleanup: hydrocarbon-eating bacteria, fed with nitrogen and phosphorus, digest an oil spill to CO₂ and water in place.",
        alt: "Bioremediation oil spill bacteria digestion stages recovery",
        keyword: "bioremediation",
      },
      {
        Component: BiofertiliserBiopesticide,
        caption:
          "Living inputs replace chemicals: Rhizobium and Azolla fix nitrogen as biofertilisers, while Bt toxin and Trichoderma kill only the target pest — not everything else.",
        alt: "Biofertiliser Rhizobium nodules and biopesticide Bt toxin Trichoderma",
        keyword: "biofertiliser",
      },
      {
        Component: EnzymeTechnology,
        caption:
          "Enzymes by the tonne: amylase sweetens bread, protease cleans cold-wash clothes, lipase strips fats, lactase makes milk drinkable — immobilised for thousands of reuse cycles.",
        alt: "Enzyme technology amylase protease lipase lactase industrial uses immobilised",
        keyword: "enzyme",
      },
    ],
  },
  "biogeochemical-cycles-carbon-and-nitrogen-cycles-concept-of-succession": {
    title: "The nitrogen cycle",
    figures: [
      {
        Component: NitrogenCycle,
        caption:
          "N₂ from the air is fixed by lightning, Rhizobium and industry into ammonia, oxidised by Nitrosomonas and Nitrobacter to nitrate, assimilated by plants, eaten by animals, and returned by ammonification and denitrification.",
        alt: "Nitrogen cycle flow diagram with fixation, nitrification, assimilation, ammonification and denitrification pathways",
        keyword: "nitrification",
      },
      {
        Component: CarbonCycle,
        caption:
          "The carbon cycle: photosynthesis pulls CO₂ in, respiration and combustion push it out, oceans dissolve the buffer, and fossil fuels inject ancient carbon faster than plants can fix it.",
        alt: "Carbon cycle with atmosphere producers consumers dead matter fossil fuels and ocean pool",
        keyword: "carbon",
      },
      {
        Component: WaterCycle,
        caption:
          "The water cycle: the sun pumps evaporation and transpiration up, condensation builds clouds, precipitation returns it, and runoff plus infiltration route it back to sea and groundwater.",
        alt: "Water cycle with evaporation transpiration condensation precipitation runoff and groundwater",
        keyword: "runoff",
      },
      {
        Component: PhosphorusSulphurCycles,
        caption:
          "Sedimentary cycles without an atmospheric pool: phosphorus and sulphur move rock → soil → organisms → decomposers — slower and more local than the gaseous carbon and nitrogen cycles.",
        alt: "Phosphorus and sulphur sedimentary cycles between rock soil organisms and decomposers",
        keyword: "atmosphere",
      },
      {
        Component: SuccessionStages,
        caption:
          "Succession as a relay: lichens build the first soil on bare rock, mosses, grasses and shrubs take over in turn, until the stable climax forest — diversity and biomass rising at every stage.",
        alt: "Succession sere from bare rock through lichen moss grass shrub to climax forest",
        keyword: "pioneer",
      },
    ],
  },
  "ecological-adaptation-concept-of-adaptation-hydrophytes-and-xerophytes": {
    title: "Ecological adaptation: hydrophytes and xerophytes",
    figures: [
      {
        Component: AdaptationTypes,
        caption:
          "Three kinds of answer to the environment: morphological (shape — spines, webbed feet), physiological (chemistry — camel tolerance, salt excretion) and behavioural (habits — nocturnality, hibernation).",
        alt: "Morphological physiological and behavioural adaptation panels with examples",
        keyword: "mesophyte",
      },
      {
        Component: HydrophyteAdaptations,
        caption:
          "Hydrophytes in three forms: free-floating (swollen, air-filled petioles), submerged (thin ribbon leaves, no cuticle) and emergent (stomata on top, air channels to the roots).",
        alt: "Hydrophyte adaptations for free floating submerged and emergent plants",
        keyword: "hydrophyte",
      },
      {
        Component: XerophyteAdaptations,
        caption:
          "The cactus manual: leaves become spines, cuticle thickens, the succulent stem stores water, CAM opens stomata only at night, and roots spread wide and deep for rare rain.",
        alt: "Xerophyte cactus adaptations with spines cuticle succulent stem CAM and roots",
        keyword: "xerophyte",
      },
      {
        Component: HydrophyteVsXerophyte,
        caption:
          "Mirror-image strategies for water balance: every character flips between the water-loving hydrophyte and the drought-proofed xerophyte.",
        alt: "Hydrophyte versus xerophyte adaptation comparison table",
        keyword: "hydrophyte",
      },
      {
        Component: PlantHabitatSpectrum,
        caption:
          "The full habitat spectrum: hydrophyte, mesophyte, xerophyte, plus the salty halophyte (mangroves with salt glands and breathing roots) and the perching epiphyte.",
        alt: "Plant life forms across habitats with key adaptations",
        keyword: "mesophyte",
      },
      {
        Component: AnimalAdaptationModes,
        caption:
          "Animals adapt by lifestyle: streamlined swimmers, long-limbed cursors, blind burrowers, grasping climbers and the desert specialist's water-saving kit.",
        alt: "Animal adaptation modes aquatic cursorial fossorial arboreal and desert",
        keyword: "mesophyte",
      },
    ],
  },
  "ecological-imbalances-greenhouse-effects-and-climate-change-depletion-of-ozone-layer-acid-rain-a": {
    title: "Ecological imbalances",
    figures: [
      {
        Component: GreenhouseEffect,
        caption:
          "The greenhouse mechanism: sunlight passes in, Earth re-radiates infrared, greenhouse gases absorb and re-emit it back — a natural blanket we are thickening with fossil CO₂.",
        alt: "Greenhouse effect with solar input infrared trapping and enhanced effect",
        keyword: "greenhouse",
      },
      {
        Component: OzoneDepletion,
        caption:
          "Ozone depletion chemistry: UV cracks CFCs into chlorine radicals, and one Cl• catalytically destroys about 100,000 O₃ molecules — the Montreal Protocol is healing the layer.",
        alt: "Ozone depletion by CFC chlorine radicals and UV consequences",
        keyword: "CFC",
      },
      {
        Component: AcidRainFormation,
        caption:
          "Acid rain's supply chain: SO₂ from coal and NOx from vehicles dissolve in cloud droplets to sulphuric and nitric acid, falling at pH 4–5 on lakes, soils, forests and marble.",
        alt: "Acid rain formation from SO2 and NOx and its effects",
        keyword: "acid rain",
      },
      {
        Component: EutrophicationSequence,
        caption:
          "Eutrophication in seven steps: fertiliser runoff feeds an algal bloom, the bloom shades out plants, decomposition crashes the oxygen, fish die — and released nutrients restart the loop.",
        alt: "Eutrophication sequence from runoff to algal bloom oxygen crash and fish kill",
        keyword: "eutrophication",
      },
      {
        Component: ClimateChangeImpacts,
        caption:
          "Impacts and answers: melting Himalayan glaciers and rising seas, shifting species and failing monsoons — answered by mitigation (cut emissions) and adaptation (defend and adjust).",
        alt: "Climate change impacts on ice ecosystems agriculture and responses",
        keyword: "mitigation",
      },
    ],
  },
  "ecological-pyramids-and-energy-flow": {
    title: "Energy flow through an ecosystem",
    figures: [
      {
        Component: EnergyFlowEcosystem,
        caption:
          "Solar energy fixed by producers passes to herbivores and carnivores with ~90% lost as heat at each step — energy flows one way, nutrients cycle back through decomposers.",
        alt: "Flow diagram of ecosystem energy flow from the sun through producers, herbivores, carnivores and decomposers with heat loss",
        keyword: "energy",
      },
    ],
  },
  // ── Biology Unit 4 — Faunal diversity ──────────────────────────────────
  "protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with": {
    title: "Protista & Protozoa",
    figures: [
      {
        Component: ProtozoaClassification,
        caption:
          "The four protozoan locomotion groups: amoeboid pseudopodia (Sarcodina), flagella (Mastigophora), cilia (Ciliophora) and the non-motile sporozoans (Sporozoa) — the whole classification in one look.",
        alt: "Protozoa classification tree with sarcodina mastigophora ciliophora and sporozoa and their locomotor organelles",
        keyword: "pseudopodia",
      },
      {
        Component: ProtozoaLocomotion,
        caption:
          "Pseudopodial locomotion: the ectoplasm streams forward into a hyaline cap, endoplasm follows, and the amoeba advances — sol-to-gel reversal in motion.",
        alt: "Amoeboid movement diagram with ectoplasm endoplasm and advancing pseudopodium",
        keyword: "locomotion",
      },
      {
        Component: AmoebaStructure,
        caption:
          "Amoeba's organelle kit: nucleus, contractile vacuole for osmoregulation, food vacuoles for digestion — a single cell doing every job of a body.",
        alt: "Amoeba structure with nucleus contractile vacuole food vacuole and pseudopodia",
        keyword: "contractile vacuole",
      },
      {
        Component: ProtozoaNutritionModes,
        caption:
          "Feeding across Protozoa: holozoic engulfment in Amoeba, pinocytosis, saprozoic absorption, and the parasitic absorption of Sporozoa — one phylum, four strategies.",
        alt: "Protozoa nutrition modes holozoic saprozoic and parasitic compared",
        keyword: "nutrition",
      },
      {
        Component: ProtozoaReproduction,
        caption:
          "Reproduction routes: binary fission doubles a population, multiple fission (schizogony) explodes it, and conjugation reshuffles genes in ciliates.",
        alt: "Protozoa reproduction binary fission multiple fission and conjugation",
        keyword: "binary fission",
      },
    ],
  },
  "paramecium-caudatum-plasmodium-vivax-habits-and-habitat-structure-reproduction-life-cycle": {
    title: "Paramecium & Plasmodium",
    figures: [
      {
        Component: ParameciumStructure,
        caption:
          "Paramecium caudatum, the slipper animalcule: pellicle with cilia rows, oral groove leading to the gullet, two nuclei, trichocysts and contractile vacuoles with radiating canals.",
        alt: "Paramecium structure with oral groove cilia trichocyst nuclei and contractile vacuole",
        keyword: "oral groove",
      },
      {
        Component: PlasmodiumLifeCycle,
        caption:
          "Plasmodium's double life: sporozoites enter with an Anopheles bite, multiply in liver then RBCs, gametocytes leave, and fertilisation completes in the mosquito gut — two hosts, two phases.",
        alt: "Plasmodium life cycle between human and female Anopheles mosquito with liver and RBC phases",
        keyword: "sporozoite",
      },
      {
        Component: PlasmodiumRbcStages,
        caption:
          "Inside the red cell: ring form (signet ring) → trophozoite → schizont bursting into merozoites, each invading a fresh RBC — the 48-hour clock behind the fever.",
        alt: "Plasmodium stages inside red blood cell ring trophozoite schizont and merozoite release",
        keyword: "schizogony",
      },
      {
        Component: MalarialFeverTimeline,
        caption:
          "The paroxysm in three acts: shaking cold stage, burning hot stage, then drenching sweat — timed to the synchronised release of merozoites and toxins from RBCs.",
        alt: "Malarial fever paroxysm timeline with cold hot and sweating stages",
        keyword: "fever",
      },
      {
        Component: MalariaControlTriangle,
        caption:
          "Malaria control is a triangle: treat the patient, break the mosquito vector, remove the breeding water — weakening any side collapses transmission.",
        alt: "Malaria control triangle linking patient treatment vector control and environmental measures",
        keyword: "mosquito",
      },
      {
        Component: PlasmodiumSpeciesComparison,
        caption:
          "P. vivax vs P. falciparum: benign tertian 48-hour fever vs malignant irregular fever, RBC selectivity, relapse from dormant liver forms, and why falciparum kills.",
        alt: "Comparison of Plasmodium vivax and falciparum fever cycles RBC preference and relapse",
        keyword: "gametocyte",
      },
    ],
  },
  "economic-importance-of-p-falciparum": {
    title: "Economic importance of P. falciparum",
    figures: [
      {
        Component: MalariaDiseaseBurden,
        caption:
          "The economic weight of falciparum: hundreds of millions of cases, hundreds of thousands of deaths, children under five hit hardest — plus lost workdays that keep endemic regions poor.",
        alt: "Malaria disease burden stat cards with annual cases deaths and child mortality",
        keyword: "mortality",
      },
      {
        Component: MalariaFeverPatterns,
        caption:
          "Reading the chart: P. vivax spikes cleanly every third day (benign tertian) while P. falciparum burns continuously and irregularly — the fever curve is a diagnostic clue.",
        alt: "Fever chart comparing tertian periodic spikes with continuous malignant fever",
        keyword: "tertian",
      },
      {
        Component: MalariaControlMeasures,
        caption:
          "Control on three fronts: chemotherapy (quinine → chloroquine → artemisinin), vector attack (sprays, nets, larvivorous fish), and environmental drainage of breeding sites.",
        alt: "Three columns of malaria control chemotherapy vector control and environmental measures",
        keyword: "quinine",
      },
      {
        Component: MalariaDiagnosisTreatment,
        caption:
          "The clinical pipeline: suspect fever → confirm with blood smear or rapid test → treat with antimalarials → follow up, because vivax hides in the liver and relapses.",
        alt: "Malaria diagnosis and treatment pathway from suspicion to confirmation to drugs and follow up",
        keyword: "diagnosis",
      },
      {
        Component: MalariaComplications,
        caption:
          "Why falciparum is an emergency: cerebral malaria clogs brain capillaries, anaemia follows mass RBC loss, and blackwater fever dumps haemoglobin into the urine.",
        alt: "Malaria complications cerebral malaria severe anaemia and blackwater fever",
        keyword: "blackwater",
      },
    ],
  },
  "animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals": {
    title: "Animalia — body plans",
    figures: [
      {
        Component: BodySymmetryTypes,
        caption:
          "Symmetry ladder: asymmetric (sponges), radial (cnidarians — any cut through the centre matches), bilateral (a single head-tail plane) — the first big branching in animal classification.",
        alt: "Body symmetry types asymmetric radial and bilateral with cut planes",
        keyword: "symmetry",
      },
      {
        Component: GermLayers,
        caption:
          "Diploblastic ectoderm+endoderm (cnidarians) vs triploblastic mesoderm-in-the-middle (flatworms onward) — every organ you own is labelled by its layer.",
        alt: "Germ layers diploblastic versus triploblastic embryonic layers",
        keyword: "diploblastic",
      },
      {
        Component: BodyCavityTypes,
        caption:
          "Coelom options: acoelomate (solid flatworm), pseudocoelomate (fluid-filled, unlined — roundworm), true coelomate (lined — annelids onward); the cavity frees organs to move and grow.",
        alt: "Body cavity types acoelomate pseudocoelomate and coelomate cross sections",
        keyword: "coelom",
      },
      {
        Component: PhylaOverviewTree,
        caption:
          "The animal tree at a glance: symmetry splits, coelom splits, and the nine major phyla hang from the branches — Porifera to Chordata.",
        alt: "Animal phylum overview tree from porifera to chordata",
        keyword: "phylum",
      },
      {
        Component: SegmentationBodyPlans,
        caption:
          "Metamerism: annelid segments repeat like train cars, arthropods tag them into head-thorax-abdomen, vertebrates chain vertebrae — segmentation enables specialisation.",
        alt: "Segmentation patterns in annelids arthropods and vertebrates",
        keyword: "metamerism",
      },
    ],
  },
  "diagnostic-features-and-classification-of-phyla-up-to-class-porifera-coelenterata-cnidaria-platy": {
    title: "Phyla up to class",
    figures: [
      {
        Component: PoriferaCanalSystem,
        caption:
          "The sponge's water highway: water enters through ostia, choanocytes with flagella trap food, and it exits via the osculum — filter-feeding with no mouth at all.",
        alt: "Porifera canal system with ostia choanocyte chamber and osculum water flow",
        keyword: "canal system",
      },
      {
        Component: CnidariaPolypMedusa,
        caption:
          "Two body plans, one phylum: sessile polyp (hydra) and floating medusa (jellyfish) — the same sack-in-a-sack turned upside down, both armed with cnidoblast stingers.",
        alt: "Cnidaria polyp and medusa forms with cnidoblast cells",
        keyword: "cnidoblast",
      },
      {
        Component: WormPhylaComparison,
        caption:
          "Three worm phyla in one table: flat unsegmented acoelomate Platyhelminthes, round pseudocoelomate Nematoda, and long true-coelom segmented Annelida.",
        alt: "Comparison of platyhelminthes nematoda and annelida body plans",
        keyword: "Platyhelminthes",
      },
      {
        Component: ArthropodaBodyPlan,
        caption:
          "Arthropod engineering: jointed appendages, chitinous exoskeleton moulted at each growth step, segmented body tagmatism and compound eyes — the phylum with the most species.",
        alt: "Arthropoda body plan with exoskeleton jointed legs and tagmata",
        keyword: "jointed appendages",
      },
      {
        Component: MolluscaEchinodermata,
        caption:
          "Soft body + shell (Mollusca: foot, mantle, visceral mass) versus spiny skin + water-vascular tube feet (Echinodermata) — two very different solutions to life on the sea floor.",
        alt: "Mollusca versus Echinodermata body plans with mantle foot and tube feet",
        keyword: "water vascular",
      },
    ],
  },
  "earthworm-pheretima-posthuma-habit-and-habitat-external-features-digestive-system-alimentary-can": {
    title: "Earthworm — external & digestive",
    figures: [
      {
        Component: EarthwormExternalFeatures,
        caption:
          "Reading Pheretima from outside: prostomium, peristomium, 100+ segments, the glandular clitellum at 14–16, genital papillae, and S-shaped setae on every segment but the first and last.",
        alt: "Earthworm external features with clitellum setae segments and body regions",
        keyword: "clitellum",
      },
      {
        Component: EarthwormAlimentaryCanal,
        caption:
          "The alimentary canal station by station: buccal cavity → muscular pharynx → oesophagus → grinding gizzard → calciferous stomach → typhlosole-boosted intestine → anus.",
        alt: "Earthworm alimentary canal from mouth to anus with gizzard and typhlosole",
        keyword: "typhlosole",
      },
      {
        Component: EarthwormSetaeLocomotion,
        caption:
          "Locomotion mechanics: setae anchor a segment, circular muscles stretch it forward, longitudinal muscles pull it up — peristalsis powered by a hydrostatic skeleton.",
        alt: "Earthworm S-shaped locomotion with setae anchoring and muscle alternation",
        keyword: "setae",
      },
      {
        Component: EarthwormCirculationRespiration,
        caption:
          "Closed circulation with dorsal and ventral vessels joined by lateral hearts, and respiration through the moist skin — no lungs, just a capillary net at the surface.",
        alt: "Earthworm closed circulatory system vessels and cutaneous respiration",
        keyword: "chloragogen",
      },
      {
        Component: EarthwormDigestiveGlands,
        caption:
          "The gland trio: pharyngeal glands start digestion, calciferous glands neutralise humic acid, and chloragogen cells around the gut act as the worm's liver.",
        alt: "Earthworm digestive glands pharyngeal calciferous and chloragogen functions",
        keyword: "calciferous",
      },
      {
        Component: EarthwormEconomicImportance,
        caption:
          "Farmers' friend ledger: vermicompost from castings, burrows that aerate and drain soil, Darwin's tonnage estimate — against a darker side as parasite host.",
        alt: "Earthworm economic importance vermicomposting cycle and soil benefits",
        keyword: "vermicompost",
      },
      {
        Component: EarthwormDigestive,
        caption:
          "The earthworm's straight alimentary canal in side view: pharynx sucks, the gizzard grinds, calciferous glands neutralise humic acid, and the typhlosole-folded intestine is the main absorption zone.",
        alt: "Horizontal alimentary canal of earthworm from mouth through pharynx, gizzard, stomach, intestine with typhlosole to anus",
        keyword: "gizzard",
      },
    ],
  },
  "earthworm-excretory-system-types-of-nephridia-structure-and-arrangement-of-septal-nephridia-nerv": {
    title: "Earthworm — excretory & nervous",
    figures: [
      {
        Component: SeptalNephridiaStructure,
        caption:
          "Septal nephridium anatomy: ciliated nephrostome funnel → neck through the septum → lipped body loop → terminal duct emptying into the intestine — the filtering unit in detail.",
        alt: "Septal nephridium structure with nephrostome neck body loop and terminal duct",
        keyword: "nephrostome",
      },
      {
        Component: NephridiaTypesComparison,
        caption:
          "Three nephridia, three addresses: septal (into intestine), integumentary (out through skin), pharyngeal (into pharynx) — same blueprint, different plumbing.",
        alt: "Septal integumentary and pharyngeal nephridia compared by position and opening",
        keyword: "integumentary",
      },
      {
        Component: EarthwormExcretoryProducts,
        caption:
          "What leaves, and through which door: urea and ammonia, discharged enteronephrically into the intestine (saving water) or exonephrically through skin pores.",
        alt: "Earthworm excretory products and enteronephric versus exonephric routes",
        keyword: "urea",
      },
      {
        Component: EarthwormNervousSystem,
        caption:
          "The ladder plan: bilobed brain on the roof, circumpharyngeal commissures around the pharynx, then a double ventral nerve cord with a ganglion and three nerve pairs per segment.",
        alt: "Earthworm nervous system with brain commissures ventral nerve cord and segmental ganglia",
        keyword: "nerve cord",
      },
      {
        Component: EarthwormReflexArc,
        caption:
          "One segment's fast lane: skin receptor → sensory fibre → ventral-cord ganglion → motor fibre → muscle — most reflexes never consult the brain.",
        alt: "Earthworm reflex arc from skin receptor to muscle response via ganglion",
        keyword: "reflex",
      },
    ],
  },
  "earthworm-reproductive-systems-male-and-female-reproductive-organs-copulation-cocoon-formation-a": {
    title: "Earthworm — reproduction",
    figures: [
      {
        Component: EarthwormReproductiveSystem,
        caption:
          "Hermaphrodite kit in one diagram: testes (10–11), seminal vesicles (11–12), spermathecae ×4 (6–9) on the male side; ovaries (13) and oviduct (14) on the female side — all crowded into the anterior third.",
        alt: "Earthworm reproductive system with testes seminal vesicles spermathecae ovaries and pores",
        keyword: "spermatheca",
      },
      {
        Component: EarthwormMaleFemaleOrgans,
        caption:
          "Male vs female kit side by side: two testes vs one ovary pair, prostates vs ovisac, male pore on segment 18 vs female pore on 14 — and the spacing that forbids self-fertilisation.",
        alt: "Earthworm male and female reproductive organs compared in a table",
        keyword: "prostate",
      },
      {
        Component: EarthwormSpermPathway,
        caption:
          "The sperm's journey: made in testes, matured in seminal vesicles, carried by vasa deferentia, activated by prostatic fluid, and exchanged into the partner's spermathecae during copulation.",
        alt: "Earthworm sperm pathway from testes to male pore via seminal vesicles",
        keyword: "seminal vesicle",
      },
      {
        Component: EarthwormCopulationCocoon,
        caption:
          "Copulation head-to-tail on a rainy night, then the clitellum spins a cocoon carrying eggs and stored sperm — a miniature worm hatches, no larva.",
        alt: "Earthworm copulation and cocoon formation leading to young worms",
        keyword: "copulation",
      },
      {
        Component: EarthwormLifeCycle,
        caption:
          "Direct development: cocoon → juvenile (no clitellum yet) → growing worm → adult — the hatchling is a small version of the parent, skipping any larval stage.",
        alt: "Earthworm life cycle from cocoon to juvenile to adult worm",
        keyword: "cocoon",
      },
    ],
  },
  "frog-rana-tigrina-habit-and-habitat-external-features-digestive-system-alimentary-canal-digestiv": {
    title: "Frog — habit, habitat & digestive",
    figures: [
      {
        Component: FrogHabitHabitat,
        caption:
          "A double life: webbed swimming and skin respiration in water, lung breathing on land — with hibernation in winter, aestivation in summer and monsoon breeding.",
        alt: "Frog amphibious habitat with hibernation aestivation and breeding seasons",
        keyword: "hibernation",
      },
      {
        Component: FrogExternalFeatures,
        caption:
          "Rana tigrina outside in: protruding eyes with nictitating membranes, tympanum for hearing, webbed hind limbs for swimming, four-fingered forelimbs for landing.",
        alt: "Frog external features with eyes tympanum webbed feet and body regions",
        keyword: "tympanum",
      },
      {
        Component: FrogFeedingMechanics,
        caption:
          "The feeding sequence: spot, flip the sticky forked tongue (attached at the front), and swallow whole — with the eyeballs retracting to push the meal down.",
        alt: "Frog feeding sequence tongue flip and swallowing with eye retraction",
        keyword: "tongue",
      },
      {
        Component: FrogAlimentaryCanal,
        caption:
          "A carnivore's short canal: buccal cavity with maxillary and vomerine teeth (grip only), oesophagus, acidic stomach, duodenum-ileum, reduced large intestine, single cloaca.",
        alt: "Frog alimentary canal from buccal cavity to cloaca with liver and pancreas",
        keyword: "vomerine",
      },
      {
        Component: FrogDigestionChemistry,
        caption:
          "Digestion chemistry by station: pepsin and HCl in the stomach, enzyme-free bile emulsifying fat, pancreatic amylase-lipase-trypsin, then intestinal maltase and peptidase finishing the job.",
        alt: "Frog digestion table of sites enzymes and substrates",
        keyword: "pepsin",
      },
    ],
  },
  "frog-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respirato": {
    title: "Frog — blood vascular & respiratory",
    figures: [
      {
        Component: FrogHeartCirculation,
        caption:
          "The frog's three-chambered heart in cross-section: two atria receive oxygenated and deoxygenated blood separately, but the single ventricle mixes them — an incomplete double circulation.",
        alt: "Frog heart with sinus venosus, two atria, single ventricle, truncus arteriosus and three pairs of arches",
        keyword: "ventricle",
      },
      {
        Component: FrogHeartInternal,
        caption:
          "Inside the three-chambered heart: sinus venosus feeding both atria, a single ventricle, and a truncus arteriosus whose spiral valve sorts blood into carotid, systemic and pulmocutaneous arches.",
        alt: "Frog heart internal structure with sinus venosus atria ventricle truncus and arches",
        keyword: "sinus venosus",
      },
      {
        Component: FrogBloodComposition,
        caption:
          "Frog blood: plasma plus cells — and the exam twist that frog RBCs are nucleated and oval, unlike mammalian discs; WBCs defend, platelets clot.",
        alt: "Frog blood composition plasma RBC WBC platelets with nucleated red cells",
        keyword: "nucleated",
      },
      {
        Component: FrogCirculationPath,
        caption:
          "Trace a drop: body veins → sinus venosus → right atrium → ventricle → truncus → pulmocutaneous arch to lungs AND skin → back via left atrium — incomplete double circulation.",
        alt: "Frog circulation pathway between body lungs skin and heart chambers",
        keyword: "pulmocutaneous",
      },
      {
        Component: FrogRespirationModes,
        caption:
          "Three breathing modes on one animal: cutaneous (always on, even underwater), buccopharyngeal (mouth-floor pump), and positive-pressure pulmonary breathing on land.",
        alt: "Frog respiration modes cutaneous buccopharyngeal and pulmonary compared",
        keyword: "buccopharyngeal",
      },
      {
        Component: FrogHeartCirculation,
        caption:
          "The frog's three-chambered heart in cross-section: two atria receive oxygenated and deoxygenated blood separately, but the single ventricle mixes them — an incomplete double circulation carried by carotid, systemic and pulmocutaneous arches.",
        alt: "Frog heart with sinus venosus, two atria, single ventricle, truncus arteriosus and three pairs of arches",
        keyword: "ventricle",
      },
    ],
  },
  "frog-reproductive-system-male-and-female-reproductive-organs": {
    title: "Frog — reproductive system",
    figures: [
      {
        Component: FrogMaleReproductiveSystem,
        caption:
          "Male system: yellow oval testes on the kidneys, 10–12 vasa efferentia threading into Bidder's canal inside the kidney, out through the urinogenital duct — sperm and urine share the exit.",
        alt: "Frog male reproductive system with testes vasa efferentia bidder canal and cloaca",
        keyword: "vasa efferentia",
      },
      {
        Component: FrogFemaleReproductiveSystem,
        caption:
          "Female system: lobed ovaries shedding eggs into the coelom, ciliated oviducal funnels sweeping them in, jelly coat added along the coiled oviduct, storage in the ovisac until amplexus.",
        alt: "Frog female reproductive system with ovaries oviducts and cloaca",
        keyword: "oviduct",
      },
      {
        Component: FrogGametogenesis,
        caption:
          "Making gametes: thousands of cheap motile sperm vs hundreds of yolk-loaded eggs — an asymmetry that external fertilisation in water demands.",
        alt: "Spermatogenesis versus oogenesis in the frog with gamete sizes",
        keyword: "gamete",
      },
      {
        Component: FrogAmplexusFertilisation,
        caption:
          "Amplexus: the male grips the female's back with nuptial pads, both release gametes into water, and fertilisation happens outside — hundreds of eggs for low odds.",
        alt: "Amplexus with male clasping female and external fertilisation in water",
        keyword: "amplexus",
      },
      {
        Component: FrogDevelopmentStages,
        caption:
          "Early development: zygote → cleavage → blastula → gastrula (three germ layers) → neurula — with the organ fate table for ectoderm, mesoderm and endoderm.",
        alt: "Frog development stages from zygote to neurula with germ layer fates",
        keyword: "gastrula",
      },
      {
        Component: FrogMetamorphosis,
        caption:
          "Metamorphosis end to end: jelly egg → gilled tadpole → limbed froglet → adult — gills become lungs, the tail is absorbed, and thyroxine (which needs iodine) drives the whole switch.",
        alt: "Frog metamorphosis stages from egg through tadpole and froglet to adult",
        keyword: "metamorphosis",
      },
    ],
  },
  // ── Biology Unit 5 — Floral diversity ──────────────────────────────────
  "introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system-mone": {
    title: "Three domains, binomial nomenclature, five kingdoms",
    figures: [
      {
        Component: ThreeDomainsTree,
        caption:
          "Above the kingdoms sit three domains: Bacteria and Archaea split the old prokaryotes by rRNA and membrane chemistry, while every eukaryote — amoeba to baobab — belongs to Eukarya.",
        alt: "Three domain tree with bacteria archaea and eukarya branches",
        keyword: "three domains",
      },
      {
        Component: FiveKingdomsChart,
        caption:
          "Whittaker's 1969 sorting machine: cell structure, body organisation and nutrition place every organism into Monera, Protista, Fungi, Plantae or Animalia.",
        alt: "Five kingdom chart comparing cell type body organisation and nutrition",
        keyword: "five kingdom",
      },
      {
        Component: KingdomsComparisonTable,
        caption:
          "The three 'difficult' kingdoms side by side: Monera has no nucleus, Protista is a single eukaryotic cell, and Fungi is multicellular but absorbs its food through chitin walls.",
        alt: "Monera protista fungi comparison across nucleus wall organelles and nutrition",
        keyword: "whittaker",
      },
      {
        Component: BinomialNomenclatureRules,
        caption:
          "Binomial nomenclature anatomy: Mangifera indica — genus capitalised, epithet small, printed in italics; Linnaeus' 1753 rules made one name mean the same thing worldwide.",
        alt: "Binomial nomenclature with genus and specific epithet and naming rules",
        keyword: "binomial",
      },
      {
        Component: TaxonomicHierarchyLadder,
        caption:
          "Seven rungs from Kingdom to Species, shown for human and mango — descending the ladder, groups shrink and shared features sharpen.",
        alt: "Taxonomic hierarchy ladder with human and mango examples per rank",
        keyword: "hierarchy",
      },
      {
        Component: ThreeDomainsFeatures,
        caption:
          "Three domains, character by character: membrane lipid chemistry (ester vs ether), wall chemistry, RNA polymerase complexity and intron frequency — the molecular evidence that split prokaryotes in two.",
        alt: "Three domain comparison table bacteria archaea eukarya across six characters",
        keyword: "archaea",
      },
      {
        Component: MoneraCharacters,
        caption:
          "Kingdom Monera in one panel: unicellular prokaryotes with naked circular DNA and 70S ribosomes, feeding autotrophically or heterotrophically — from soil bacteria to cyanobacteria to wall-less Mycoplasma.",
        alt: "Monera characters with prokaryotic cell diagram and major groups",
        keyword: "monera",
      },
      {
        Component: NomenclatureCodes,
        caption:
          "How names stay legal: two Latin words, author citation, priority of the earliest valid publication, a type specimen as anchor — and the violations (tautonyms, duplicates) that void a name.",
        alt: "Nomenclature rules anatomy of Mangifera indica with ICBN principles and invalid names",
        keyword: "linnaeus",
      },
      {
        Component: FiveKingdomNutrition,
        caption:
          "Whittaker's sorting key: ask how an organism eats — making food points to Plantae, absorbing it points to Fungi, swallowing it points to Animalia — then cell structure refines the placement.",
        alt: "Nutrition-based sorting flow diagram into five kingdoms",
        keyword: "autotroph",
      },
      {
        Component: BacteriaVsArchaea,
        caption:
          "Bacteria vs Archaea: both prokaryotic, but ester- vs ether-linked membrane lipids, peptidoglycan vs pseudopeptidoglycan walls, and antibiotic sensitivity vs extremophile lifestyles set them apart.",
        alt: "Bacteria versus archaea molecular contrast with halophiles thermophiles methanogens",
        keyword: "peptidoglycan",
      },
      {
        Component: VirusKingdomQuestion,
        caption:
          "The classification outcast: viruses are acellular, metabolically inert outside hosts, and carry DNA or RNA but never both — so no kingdom can hold them and biology treats them separately.",
        alt: "Virus structure with reasons it fits no kingdom and the living non-living debate",
        keyword: "virus",
      },
      {
        Component: BinomialNameExamples,
        caption:
          "Six binomials decoded: Mangifera indica, Homo sapiens, Oryza sativa and friends — genus capitalised, epithet lower-case, both italicised, epithets often descriptive or geographic.",
        alt: "Six binomial name examples with genus epithet and meaning",
        keyword: "binomial",
      },
    ],
  },
  "status-of-flora-in-nepal-and-world-representation": {
    title: "Status of flora in Nepal",
    figures: [
      {
        Component: NepalFloraStats,
        caption:
          "Nepal's flora by numbers: about 7,000 flowering plants, thousands of fungi and algae, and just 30 gymnosperms — roughly 2% of the world's flowering plants on 0.1% of its land.",
        alt: "Nepal flora species counts as horizontal bars by plant group",
        keyword: "nepal",
      },
      {
        Component: NepalVegetationZones,
        caption:
          "Altitude is Nepal's climate dial: six vegetation belts from tropical sal forests to the nival snowline — climb 1,000 m and cross what driving 1,000 km north would show.",
        alt: "Nepal vegetation zones from tropical to nival with altitude bands",
        keyword: "forest",
      },
      {
        Component: FloraHotspotMap,
        caption:
          "Where the unique plants live — Himal endemics, mid-hill orchids and Rhododendron, Terai sal — and what threatens them: deforestation, over-harvest, invasives, climate shift.",
        alt: "Flora hotspots of Nepal with threats listed",
        keyword: "hotspot",
      },
      {
        Component: FloraSpeciesStatus,
        caption:
          "Status vocabulary decoded: endemic (found only here), native, exotic, and the IUCN threat ladder — high endemism plus high threat is what makes a region a priority.",
        alt: "Species status categories endemic native exotic threatened",
        keyword: "endemic",
      },
      {
        Component: FloraConservationStrategies,
        caption:
          "Two conservation strategies: in situ reserves protect species where they evolve; ex situ seed banks and botanic gardens keep the insurance copy.",
        alt: "In situ versus ex situ flora conservation strategies",
        keyword: "conservation",
      },
      {
        Component: NepalFloraComposition,
        caption:
          "Nepal's flora by group: ~7,000 flowering plants lead, followed by fungi, bryophytes, lichens, ferns — and just ~30 gymnosperms, some of them Himalayan endemics found nowhere else.",
        alt: "Bar chart of Nepal plant groups with species counts",
        keyword: "flowering",
      },
      {
        Component: WorldPlantDiversity,
        caption:
          "Nepal in the world picture: 0.1% of Earth's land carrying 2–3% of its flowering plants — altitude compresses what latitude would otherwise spread across continents.",
        alt: "World versus Nepal flowering plant species and land area comparison bars",
        keyword: "world",
      },
      {
        Component: FloraThreatsChain,
        caption:
          "The threat chain: deforestation, overgrazing, over-harvest and invasives converge on habitat loss, which produces local extinction, genetic erosion and landslides — habitat loss is the biggest driver.",
        alt: "Threat drivers converging on habitat loss with consequences for flora",
        keyword: "threat",
      },
      {
        Component: RhododendronCaseStudy,
        caption:
          "Case study — lali gurans: 30+ Rhododendron species bloom across 1,200–3,600 m, feeding pollinators, drawing trekkers and anchoring mid-hill forests; one genus, many reasons to conserve.",
        alt: "Rhododendron flower with facts about Nepal species range and importance",
        keyword: "rhododendron",
      },
      {
        Component: FloraAltitudeTurnover,
        caption:
          "Climb and the flora changes: sal gives way to chir pine, oak and rhododendron, then birch, juniper and cushion herbs — six belts, six floras, species richness falling with every 1,000 m.",
        alt: "Mountain cross-section with six vegetation belts and representative species",
        keyword: "altitude",
      },
      {
        Component: FloraUsesPanels,
        caption:
          "What flora gives: food grains, medicinal herbs, timber and fuel, leaf fodder for livestock — plus the cultural value of tulsi and peepal that gives conservation religious allies.",
        alt: "Five panels of plant uses food medicine timber fodder culture",
        keyword: "species",
      },
      {
        Component: FloraEndemicWhy,
        caption:
          "Why the Himalaya breeds endemics: valley isolation, steep climate gradients, Ice Age refugia and continuing uplift create narrow ranges — and narrow ranges mean one road can erase a species.",
        alt: "Four causes of Himalayan plant endemism and resulting vulnerability",
        keyword: "climate",
      },
    ],
  },
  "fungi-general-introduction-and-characteristic-features-of-phycomycetes-ascomycetes-basidiomycete": {
    title: "Fungi — general introduction",
    figures: [
      {
        Component: FungalHyphaeTypes,
        caption:
          "The fungal body is threads, not tissue: septate hyphae divide into cells, coenocytic hyphae stream as one multinucleate tube — and both grow only at their tips.",
        alt: "Septate versus coenocytic fungal hyphae compared",
        keyword: "hypha",
      },
      {
        Component: FungalCellStructure,
        caption:
          "Inside one fungal cell: chitin wall, eukaryotic nucleus, vacuole, glycogen stores — and no chloroplast, which is why fungi never photosynthesise.",
        alt: "Fungal cell structure with chitin wall and organelles",
        keyword: "chitin",
      },
      {
        Component: FungalNutritionModes,
        caption:
          "Absorbers, not swallowers: saprophytes digest dead matter outside the body, parasites pierce hosts with haustoria, symbionts trade minerals for sugars.",
        alt: "Fungal nutrition saprophytic parasitic and symbiotic modes",
        keyword: "saprophytic",
      },
      {
        Component: FungalClassesChart,
        caption:
          "Four classes sorted by spore case: Phycomycetes (sporangium), Ascomycetes (8-spored ascus), Basidiomycetes (4-spored basidium), Deuteromycetes (sex unknown).",
        alt: "Four fungal classes with spore structures and examples",
        keyword: "ascus",
      },
      {
        Component: FungalSporeCases,
        caption:
          "Count the spores: hundreds in a sporangium, exactly eight in an ascus, four on a basidium — the case tells you the class.",
        alt: "Sporangium ascus and basidium spore cases compared",
        keyword: "sporangium",
      },
      {
        Component: FungalLifeCycleGeneral,
        caption:
          "The general fungal life cycle: haploid spores germinate into mycelium, plasmogamy makes a dikaryon, karyogamy gives a brief diploid cell, and meiosis restores spores — the body spends its life as n, not 2n.",
        alt: "Six step fungal life cycle ring with plasmogamy karyogamy and meiosis",
        keyword: "spore",
      },
      {
        Component: MycorrhizaSymbiosis,
        caption:
          "Mycorrhiza: the fungus wraps the root and extends its hyphal network a hundredfold, mining phosphorus and water for the plant, which pays in sugars — a trade that made land life possible.",
        alt: "Root with fungal sheath and hyphal network exchanging minerals and sugars",
        keyword: "mycorrhiza",
      },
      {
        Component: FungalVsPlantCell,
        caption:
          "Fungal cell vs plant cell — three tells: chitin vs cellulose wall, glycogen vs starch storage, absorption vs photosynthesis; otherwise the two cells look like twins.",
        alt: "Fungal cell and plant cell side by side highlighting wall storage and nutrition differences",
        keyword: "glycogen",
      },
      {
        Component: MyceliumNetwork,
        caption:
          "The mycelium is the real fungus: kilometres of hyphae per teaspoon of soil, growing only at tips, digesting litter externally and moving nutrients across the network — the mushroom is just the fruit.",
        alt: "Soil cross-section with mushroom above and branching mycelium network below",
        keyword: "mycelium",
      },
      {
        Component: FungalEconomicBalance,
        caption:
          "The two ledgers: yeast's bread and beer, Penicillium's penicillin and mycorrhiza's plant feeding on one side; rusts, blights, aflatoxins and ringworm on the other — same biology, opposite outcomes.",
        alt: "Beneficial versus harmful fungi two ledgers with examples",
        keyword: "antibiotic",
      },
      {
        Component: PhycomycetesProfile,
        caption:
          "Phycomycetes, the 'algal fungi': coenocytic hyphae, asexual sporangiospores or zoospores, sexual conjugation — Mucor, Rhizopus and the downy mildews.",
        alt: "Phycomycetes characters and examples with sporangium diagram",
        keyword: "phycomycetes",
      },
      {
        Component: AscoVsBasidio,
        caption:
          "Sac vs club: ascomycetes shoot eight ascospores from inside an ascus (yeast, Penicillium, morels); basidiomycetes hang four basidiospores outside a club (mushrooms, rusts, smuts).",
        alt: "Ascomycetes versus basidiomycetes with ascus and basidium diagrams and examples",
        keyword: "basidium",
      },
    ],
  },
  "structure-and-reproduction-of-mucor-and-yeast": {
    title: "Mucor and Yeast",
    figures: [
      {
        Component: MucorStructure,
        caption:
          "Mucor's blueprint: coenocytic hyphae, anchoring rhizoids, and vertical sporangiophores lifting globous sporangia — the black dust on old bread is thousands of ripe sporangia.",
        alt: "Mucor structure with rhizoids mycelium and sporangium on sporangiophore",
        keyword: "mucor",
      },
      {
        Component: MucorReproduction,
        caption:
          "Two modes: asexual sporangiospores for speed, sexual conjugation between + and − strains producing a thick-walled zygospore that survives harsh times.",
        alt: "Mucor asexual sporangiospores and sexual conjugation to zygospore",
        keyword: "zygospore",
      },
      {
        Component: YeastCellStructure,
        caption:
          "Yeast gave up filaments: single oval cells with a large vacuole, budding daughters, and bud scars marking every division — a fungus built for sugary juices.",
        alt: "Yeast cell with bud vacuole nucleus and bud scar",
        keyword: "yeast",
      },
      {
        Component: YeastReproduction,
        caption:
          "Budding sequence in four frames — bud emerges, nucleus divides, cells separate — with the sexual back-up: two cells fuse and become an ascus of ascospores.",
        alt: "Yeast budding sequence and ascospore formation",
        keyword: "budding",
      },
      {
        Component: MucorVsYeast,
        caption:
          "Same kingdom, different architecture: filamentous Mucor vs unicellular yeast, sporangiospores vs budding, zygospore vs ascus — compared feature by feature.",
        alt: "Mucor versus yeast comparison table",
        keyword: "fermentation",
      },
      {
        Component: YeastFermentation,
        caption:
          "Fermentation economics: glucose → pyruvate → ethanol + CO₂ with only 2 ATP per glucose — inefficient for yeast, but the waste products are bread, beer and wine.",
        alt: "Yeast fermentation pathway to ethanol and carbon dioxide with uses",
        keyword: "fermentation",
      },
      {
        Component: MucorLifeCycleStages,
        caption:
          "Mucor's speed run: spore → mycelium → sporangiophore → bursting sporangium → thousands of new spores, all within days; the zygospore is only the survival backup.",
        alt: "Mucor life cycle six steps from spore to new colony",
        keyword: "sporangiophore",
      },
      {
        Component: ZygosporeFormationDetail,
        caption:
          "Conjugation close-up: + and − hyphae meet, progametangia and suspensors form, gametangia fuse, nuclei unite, and a thick warty zygospore waits out hard times before meiosis.",
        alt: "Seven step zygospore formation between plus and minus strains",
        keyword: "conjugation",
      },
      {
        Component: YeastIndustrialUses,
        caption:
          "One fungus, six industries: baking, brewing, wine, biofuel, single-cell protein and genetics — yeast grows fast on cheap sugar and tolerates its own ethanol.",
        alt: "Yeast industrial uses four panels plus reasons yeast suits industry",
        keyword: "alcohol",
      },
      {
        Component: MucorBreadHabitat,
        caption:
          "Mucor's address: a moist, warm, starchy bread slice — white fuzz on day one, black pinhead sporangia by day four, and thousands of new spores by day five.",
        alt: "Bread slice with Mucor colonies and five day time lapse",
        keyword: "bread",
      },
      {
        Component: YeastVsBacteria,
        caption:
          "Yeast vs bacterium: both unicellular, but yeast has a nucleus, chitin wall, 80S ribosomes and budding while bacteria have naked DNA, peptidoglycan, 70S ribosomes and fission — the reason antibiotics can tell them apart.",
        alt: "Yeast cell versus bacterial cell with four contrasting features",
        keyword: "fission",
      },
      {
        Component: YeastLifeCycleFull,
        caption:
          "Yeast's two-phase life: diploid budding dominates in good times; stress triggers meiosis to four ascospores, and two haploids fuse back to diploid — a cycle geneticists exploit.",
        alt: "Yeast diploid budding phase and haploid ascospore phase with meiosis and fusion arrows",
        keyword: "ascospore",
      },
      {
        Component: SporangiumZoom,
        caption:
          "The sporangium as a spore bomb: a columella dome pushes spores apart, the dried wall splits, and hundreds of sporangiospores shoot into the wind from atop a tall sporangiophore.",
        alt: "Sporangium cutaway with columella spores and dispersal mechanism",
        keyword: "columella",
      },
    ],
  },
  "introduction-of-mushrooms-poisonous-and-non-poisonous-mushrooms-economic-importance-of-fungi": {
    title: "Mushrooms & economic importance of fungi",
    figures: [
      {
        Component: MushroomStructure,
        caption:
          "Mushroom anatomy: pileus cap, spore-bearing gills, stipe with annulus ring, volva cup at the base — and the real body, the mycelium, hidden underground.",
        alt: "Mushroom structure with pileus gills stipe annulus volva and mycelium",
        keyword: "pileus",
      },
      {
        Component: MushroomLifeCycle,
        caption:
          "The spore circle: basidiospores → primary mycelium → dikaryotic secondary mycelium → basidiocarp → meiosis on the basidia → spores again.",
        alt: "Mushroom life cycle from spores to basidiocarp and back",
        keyword: "basidiospores",
      },
      {
        Component: PoisonousVsEdibleMushrooms,
        caption:
          "The Amanita warning signs: warty cap, ring, cup-like volva, white gills — against the plain button mushroom. Never identify wild fungi by folklore alone.",
        alt: "Poisonous Amanita versus edible button mushroom features",
        keyword: "poisonous",
      },
      {
        Component: MushroomCultivationSteps,
        caption:
          "Five controlled steps: compost → spawning → casing → pinning → cropping, with temperature and humidity tuned at each stage — Nepal's oyster-mushroom cash crop.",
        alt: "Mushroom cultivation steps from compost to cropping",
        keyword: "edible",
      },
      {
        Component: FungiEconomicImportance,
        caption:
          "Four ledgers: food (mushrooms, bread), medicine (penicillin, statins), industry (alcohol, enzymes) — and harm (rusts, moulds, mycotoxins) from the same absorptive lifestyle.",
        alt: "Fungi economic importance food medicine industry and harm",
        keyword: "antibiotic",
      },
      {
        Component: MushroomSectionLayers,
        caption:
          "Cut-away anatomy with jobs: pileus cap, gills that pack the hymenium, annulus ring left by the veil, volva cup from the universal veil, and the mycelium that runs the whole show underground.",
        alt: "Mushroom cross-section layers with annulus volva gills and mycelium",
        keyword: "gills",
      },
      {
        Component: MushroomSporePrintSteps,
        caption:
          "The spore print, step by step: cap gill-side down on paper, cover and wait hours, lift to reveal a mirror of the gill pattern — spore colour is a species fingerprint.",
        alt: "Four step spore print technique with colour key panel",
        keyword: "spore print",
      },
      {
        Component: MushroomDeathCapWarning,
        caption:
          "Amanita phalloides, the death cap: volva, ring, white gills — an amatoxin killer whose symptoms pause for 6–24 hours before liver failure. Cooking does not save you.",
        alt: "Death cap Amanita warning with amatoxin poisoning facts and field rules",
        keyword: "poisonous",
      },
      {
        Component: MushroomVsPlant,
        caption:
          "Fungus vs plant, six features: no chlorophyll, chitin not cellulose, glycogen not starch, absorption not photosynthesis, hyphae not organs, spores not seeds.",
        alt: "Mushroom versus plant comparison table chitin glycogen spores",
        keyword: "chitin",
      },
      {
        Component: MushroomGillZoom,
        caption:
          "Zoom into a gill: the hymenium lines each lamella, club basidia bud off four basidiospores each, and millions of spores drop into the air current below.",
        alt: "Gill cross-section with hymenium basidia and basidiospores",
        keyword: "hymenium",
      },
      {
        Component: MushroomMycorrhizaLink,
        caption:
          "Mycorrhiza, the win-win underground: fungal sheaths and hyphal highways feed the tree phosphorus, nitrogen and water, and are paid in photosynthetic sugar.",
        alt: "Mycorrhiza fungus tree root exchange phosphorus and sugars",
        keyword: "mycorrhiza",
      },
      {
        Component: MushroomHabitatMoisture,
        caption:
          "Where fruiting bodies appear: damp leaf litter, decaying logs, humid lawns, old stumps — the mycelium feeds all year and mushrooms are only its brief fruiting stage.",
        alt: "Mushroom habitats damp logs leaf litter and growth checklist",
        keyword: "moisture",
      },
    ],
  },
  "lichen-general-introduction-characteristic-features-and-economic-importance-of-lichen": {
    title: "Lichen",
    figures: [
      {
        Component: LichenSymbiosis,
        caption:
          "A lichen slice: fungal cortex shielding an algal layer — the phycobiont photosynthesises sugars, the mycobiont supplies water, minerals and UV armour.",
        alt: "Lichen cross section with cortex algal layer and medulla",
        keyword: "symbiosis",
      },
      {
        Component: LichenGrowthForms,
        caption:
          "Three growth forms: crustose glued flat to rock, foliose leafy and peelable, fruticose shrubby and free-hanging — form follows attachment.",
        alt: "Crustose foliose and fruticose lichen growth forms",
        keyword: "crustose",
      },
      {
        Component: LichenReproduction,
        caption:
          "Reproducing a two-in-one body: soredia are ready-made symbiosis packets, isidia are warty outgrowths, fragmentation carries both partners in every broken piece.",
        alt: "Lichen reproduction by soredia isidia and fragmentation",
        keyword: "soredia",
      },
      {
        Component: LichenPioneerSuccession,
        caption:
          "First life on bare rock: lichen acids etch minerals, dead thalli become the first humus, mosses follow, then grasses — primary succession, starting from stone.",
        alt: "Lichen pioneer succession from bare rock to grasses",
        keyword: "pioneer",
      },
      {
        Component: LichenImportance,
        caption:
          "Lichens at work: litmus dye, perfumes, usnic-acid antibiotic, reindeer food — plus their day job as air-pollution monitors that die near SO₂.",
        alt: "Lichen importance in industry ecology pollution monitoring",
        keyword: "litmus",
      },
      {
        Component: LichenCrossSection,
        caption:
          "Layered like a sandwich: upper cortex shields, the algal layer photosynthesises, the loose medulla stores air, the lower cortex grips via rhizines — attachment, not absorption.",
        alt: "Lichen thallus cross-section cortex algal layer medulla rhizines",
        keyword: "medulla",
      },
      {
        Component: LichenPartnersBenefit,
        caption:
        "The deal, itemised: the alga cooks sugar by photosynthesis, the fungus pays back shelter, water and minerals — together they colonise bare rock where neither survives alone.",
        alt: "Lichen partners alga gives food fungus gives shelter mutualism",
        keyword: "symbiosis",
      },
      {
        Component: LichenIsidiaFragment,
        caption:
          "Three cloning routes: powdery soredia blown by wind, warty cortex-covered isidia snapped off by rain, or simple thallus fragments — every propagule carries both partners.",
        alt: "Lichen soredia isidia and fragmentation reproduction compared",
        keyword: "isidia",
      },
      {
        Component: LichenPollutionBioindicator,
        caption:
          "A living air-quality meter: lichen deserts beside SO₂ sources, crustose species return first, full foliose and fruticose communities only where the air runs clean.",
        alt: "Lichen pollution bioindicator zones from lichen desert to full community",
        keyword: "pollution",
      },
      {
        Component: LichenUsesChart,
        caption:
          "Six ledgers of lichen value: litmus indicator, oakmoss perfume fixative, usnic-acid medicine, reindeer winter fodder, soil-starting pioneer — even careful food.",
        alt: "Lichen uses chart litmus dye perfume medicine fodder food soil",
        keyword: "litmus",
      },
      {
        Component: LichenVsMoss,
        caption:
          "Lichen vs moss: a two-organism symbiosis versus a true green plant — rhizines grip where rhizoids hold, and the lichen always colonises the barer rock first.",
        alt: "Lichen versus moss comparison table symbiosis versus plant",
        keyword: "moss",
      },
      {
        Component: LichenMycobiontPhycobiont,
        caption:
          "Name the partners: mycobiont builds the body and names the species; phycobiont (green alga or cyanobacterium) feeds it — cyanobacteria even fix nitrogen, and Cladonia feeds reindeer.",
        alt: "Mycobiont and phycobiont roles with nitrogen fixation and reindeer moss",
        keyword: "phycobiont",
      },
    ],
  },
  "algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-an": {
    title: "Algae — green, brown, red",
    figures: [
      {
        Component: AlgaeThreeClasses,
        caption:
          "Algae by colour: Chlorophyceae (green, starch, freshwater), Phaeophyceae (brown, fucoxanthin, kelps to 30 m), Rhodophyceae (red, phycoerythrin, deepest-living).",
        alt: "Green brown and red algal classes with pigments and habitats",
        keyword: "chlorophyceae",
      },
      {
        Component: AlgalThallusTypes,
        caption:
          "Every body plan algae invented: one cell, a colony like Volvox, unbranched filaments like Spirogyra, and sheet-like parenchymatous thalli — no roots, stems or leaves.",
        alt: "Algal thallus forms unicellular colonial filamentous and parenchymatous",
        keyword: "thallus",
      },
      {
        Component: SpirogyraStructure,
        caption:
          "Spirogyra, the water silk: cylindrical cells in a slippery sheath, each with a spiral ribbon chloroplast studded with pyrenoids — the fastest field identification.",
        alt: "Spirogyra filament with spiral chloroplasts and nucleus",
        keyword: "spirogyra",
      },
      {
        Component: SpirogyraConjugation,
        caption:
          "Conjugation without flagella: tube bridges between two filaments make the ladder pattern, one cell's whole contents crawl across, and a thick-walled zygospore forms.",
        alt: "Spirogyra ladder conjugation with zygospore formation",
        keyword: "gametes",
      },
      {
        Component: AlgaeVsLandPlants,
        caption:
          "Why algae are not plants: thallus without tissues, no vascular bundle, no retained embryo, no cuticle — the gap bryophytes later half-closed.",
        alt: "Algae versus land plants comparison table",
        keyword: "algae",
      },
      {
        Component: AlgaeEconomicUses,
        caption:
          "Algae in the economy: nori and kelp as food, agar from Gelidium in every petri dish, algin in ice cream, seaweed fertiliser — and half the world's oxygen.",
        alt: "Algae economic uses food phycocolloids agriculture environment",
        keyword: "agar",
      },
      {
        Component: AlgaePigmentsChart,
        caption:
          "Pigments are the ID card: chlorophyll a in all three, plus fucoxanthin masking green in browns and phycoerythrin reddening the reds — each class with its own stored food.",
        alt: "Algae pigment chart chlorophyceae phaeophyceae rhodophyceae pigments",
        keyword: "fucoxanthin",
      },
      {
        Component: AlgaeHabitatZones,
        caption:
          "Habitats from ponds to hot springs: freshwater Spirogyra and Chlamydomonas, marine kelp forests, and specialists on wet soil, bark, snow — anywhere water touches.",
        alt: "Algae habitat zones freshwater marine and special places",
        keyword: "freshwater",
      },
      {
        Component: ChlamydomonasStructure,
        caption:
          "One cell that swims: two equal flagella, a cup-shaped chloroplast with pyrenoid, a red eyespot for light, a contractile vacuole — the motile green alga blueprint.",
        alt: "Chlamydomonas single cell with flagella chloroplast eyespot pyrenoid",
        keyword: "chlamydomonas",
      },
      {
        Component: SpirogyraPyrenoidZoom,
        caption:
          "Inside one Spirogyra cell: the ribbon chloroplast spirals through the cytoplasm, studded with starch-making pyrenoids, around a central nucleus in a slimy sheath.",
        alt: "Spirogyra cell zoom spiral chloroplast pyrenoids nucleus",
        keyword: "pyrenoid",
      },
      {
        Component: AlgaeReproductionModes,
        caption:
          "Three routes to a new alga: fragmentation, swimming flagellated zoospores, and gamete fusion — in Spirogyra, isogamy by conjugation with no flagella at all.",
        alt: "Algae reproduction vegetative asexual zoospores sexual isogamy",
        keyword: "zoospore",
      },
      {
        Component: AlginIodineProducts,
        caption:
          "Seaweed to shelf: algin from brown kelps thickens ice cream and shampoo, agar from red algae sets every lab petri dish, kelp-concentrated iodine prevents goitre.",
        alt: "Algin agar and iodine products from brown and red algae",
        keyword: "algin",
      },
      {
        Component: KelpBrownStructure,
        caption:
          "Kelp anatomy: holdfast grips rock (not roots), a flexible stipe, blade solar panels lifted by gas floats — 60-metre brown forests sheltering whole fish nurseries.",
        alt: "Kelp brown alga structure holdfast stipe blades gas floats",
        keyword: "kelp",
      },
    ],
  },
  "bryophyta-general-introduction-and-characteristic-features-of-liverworts-hornworts-and-moss-morp": {
    title: "Bryophyta — liverworts, hornworts, moss",
    figures: [
      {
        Component: BryophyteGroups,
        caption:
          "Three bryophyte lines: liverworts with flat thalli and gemma cups, hornworts with long horn capsules, mosses with leafy shoots and protonema — all rhizoid-rooted and vascular-free.",
        alt: "Liverworts hornworts and mosses compared with key structures",
        keyword: "liverwort",
      },
      {
        Component: MarchantiaStructure,
        caption:
          "Marchantia's body plan: dichotomous branching thallus, dorsal air pores, gemma cups for cloning, rhizoids below — and umbrella stalks raising the sex organs.",
        alt: "Marchantia thallus with gemma cups rhizoids and archegoniophore",
        keyword: "marchantia",
      },
      {
        Component: ArchegoniumAntheridium,
        caption:
          "The sex organs: a flask-shaped archegonium holding one egg, and a sac-like antheridium releasing biflagellate sperm that must swim — water dependence in one diagram.",
        alt: "Archegonium and antheridium structure with swimming sperm",
        keyword: "archegonium",
      },
      {
        Component: MossLifeCycle,
        caption:
          "Moss alternation: spore → protonema filament → leafy gametophyte → dependent sporophyte capsule → meiosis → spores. The green plant is the haploid generation.",
        alt: "Moss life cycle with protonema gametophyte and sporophyte",
        keyword: "protonema",
      },
      {
        Component: BryophyteVsFernDominance,
        caption:
          "The great flip: in mosses the gametophyte dominates and the sporophyte is a guest; in ferns it reverses — the diploid generation took over as plants conquered land.",
        alt: "Gametophyte versus sporophyte dominance in moss and fern",
        keyword: "gametophyte",
      },
      {
        Component: BryophyteImportance,
        caption:
          "Why bryophytes matter: amphibians of the plant kingdom, peat-forming Sphagnum, pioneer soil-builders, and cheap pollution indicators.",
        alt: "Bryophyte importance peat pioneers and pollution indicators",
        keyword: "amphibians",
      },
      {
        Component: MarchantiaGemmaeCups,
        caption:
          "Gemma cups on the thallus surface: raindrops splash out lens-shaped gemmae, each one growing into a genetically identical new Marchantia — cloning by weather.",
        alt: "Marchantia gemma cups with splashed gemmae on thallus",
        keyword: "gemmae",
      },
      {
        Component: MossCapsuleDetail,
        caption:
          "The capsule as a salt shaker: operculum lid falls, hygroscopic peristome teeth twist open only in dry air, and millions of spores ride the wind — closing when wet.",
        alt: "Moss capsule with peristome teeth operculum and spore release",
        keyword: "peristome",
      },
      {
        Component: BryophyteSporophyteDependence,
        caption:
          "The green moss is the boss: its brown sporophyte — foot, seta, capsule — stays plugged into the gametophyte, drawing water and sugar like a partly parasitic guest.",
        alt: "Moss sporophyte dependent on dominant gametophyte leafy shoots",
        keyword: "sporophyte",
      },
      {
        Component: HornwortStructure,
        caption:
          "Anthoceros earns its name: needle-like horn sporophytes rise from a flat thallus, growing continuously from the base — cells with a single chloroplast each.",
        alt: "Hornwort Anthoceros horn sporophytes on flat thallus",
        keyword: "hornwort",
      },
      {
        Component: RhizoidVsRoot,
        caption:
          "Rhizoid vs true root: hair-like anchoring threads with no xylem or phloem cap bryophytes at small size — real vascular roots unlock the forests that follow.",
        alt: "Rhizoid versus true root comparison with vascular tissue",
        keyword: "rhizoid",
      },
      {
        Component: PeatBogFormation,
        caption:
          "Sphagnum builds bogs: living carpet over waterlogged acid layers where decay stalls, pressing centuries of dead moss into peat — fuel, soil amendment and carbon vault.",
        alt: "Peat bog cross-section with living Sphagnum and compressed peat layers",
        keyword: "peat",
      },
      {
        Component: ProtonemaToLeafyShoot,
        caption:
          "A moss begins as a green alga look-alike: spore → creeping filamentous protonema → buds → upright leafy shoots — living evidence of algal ancestry.",
        alt: "Protonema filament to leafy shoot moss development stages",
        keyword: "protonema",
      },
    ],
  },
  "pteridophyta-general-introduction-and-characteristic-features-of-pteridophytes-morphological-str": {
    title: "Pteridophyta — ferns",
    figures: [
      {
        Component: FernStructure,
        caption:
          "Dryopteris's body: underground rhizome with true roots, and great fronds divided into pinnae — the first plants tall enough to need plumbing.",
        alt: "Fern structure with rhizome roots frond pinnae and sori",
        keyword: "frond",
      },
      {
        Component: VascularTissueBundle,
        caption:
          "The plumbing that changed everything: xylem carries water up through dead hollow vessels, phloem moves sugars both ways — pteridophytes are the first owners.",
        alt: "Vascular bundle with xylem and phloem roles",
        keyword: "xylem",
      },
      {
        Component: FernLifeCycle,
        caption:
          "Two free-living generations: sorus → spores → heart-shaped prothallus → fertilisation in water → new sporophyte — both generations photosynthesise independently.",
        alt: "Fern life cycle from sorus to prothallus to sporophyte",
        keyword: "sorus",
      },
      {
        Component: FernProthallus,
        caption:
          "The prothallus: a 5–10 mm, one-cell-thick heart carrying both archegonia and antheridia — the fern's weakest link, which seed plants later hid inside pollen and ovules.",
        alt: "Fern prothallus with archegonia antheridia and rhizoids",
        keyword: "prothallus",
      },
      {
        Component: PteridophyteDiversity,
        caption:
          "Four faces of the group: clubmoss Lycopodium, heterosporous Selaginella, silica-armoured horsetail Equisetum, and true fern Dryopteris — Selaginella's two spore sizes preview the seed.",
        alt: "Lycopodium Selaginella Equisetum and Dryopteris compared",
        keyword: "lycopodium",
      },
      {
        Component: FernSoriDetail,
        caption:
          "Under the frond: sori are brown spore clusters on the pinna underside, each sporangium armed with a snapping annulus that flings spores on dry days.",
        alt: "Fern sori clusters under pinna with sporangium annulus zoom",
        keyword: "sorus",
      },
      {
        Component: HomosporousVsHeterosporous,
        caption:
          "One spore or two: homosporous ferns make a single bisexual prothallus; heterosporous Selaginella makes micro- and megaspores — the seed habit's first draft.",
        alt: "Homosporous versus heterosporous spores and gametophytes",
        keyword: "homosporous",
      },
      {
        Component: SelaginellaHeterosporyZoom,
        caption:
          "Selaginella's strobilus: microsporophylls above carry microspores, megasporophylls below carry megaspores — and the megaspore stays on the parent.",
        alt: "Selaginella strobilus with microsporophylls and megasporophylls",
        keyword: "megaspore",
      },
      {
        Component: PteridophyteVsBryophyte,
        caption:
          "The vascular leap: xylem and phloem, true roots and an independent sporophyte lift ferns from moss-sized cushions to 20-metre tree ferns.",
        alt: "Pteridophyte versus bryophyte comparison vascular tissue roots size",
        keyword: "vascular",
      },
      {
        Component: PteridophyteHabitatsCoal,
        caption:
          "Shady corners today, coal seams yesterday: pteridophytes were the first vascular land plants, and Carboniferous forests of tree ferns became our coal.",
        alt: "Pteridophyte habitats damp shade and Carboniferous coal forests",
        keyword: "coal",
      },
      {
        Component: PteridophyteEconomicUses,
        caption:
          "What ferns give us: ornamental shade plants, Lycopodium spores in pharmacy, edible fiddleheads, and Azolla as a rice-paddy biofertiliser.",
        alt: "Pteridophyte economic uses ornamental medicine food biofertiliser",
        keyword: "ornamental",
      },
      {
        Component: PteridophyteSporophyteIndependent,
        caption:
          "The fern's secret: its young sporophyte grows its own fronds and roots, then drops the prothallus — independence the moss sporophyte never earns.",
        alt: "Young fern sporophyte leaving prothallus independent adult",
        keyword: "independent",
      },
      {
        Component: FernWaterDependence,
        caption:
          "Still tied to water: flagellate sperms must swim a film of dew from antheridium to archegonium — the weak point seeds and pollen tubes later removed.",
        alt: "Fern fertilisation needs water film swimming sperm prothallus",
        keyword: "archegonium",
      },
    ],
  },
  "gymnosperm-general-introduction-and-characteristic-features-of-gymnosperms-morphology-and-reprod": {
    title: "Gymnosperm — Pinus",
    figures: [
      {
        Component: GymnospermVsAngiosperm,
        caption:
          "'Naked seed' decoded: gymnosperm ovules sit exposed on cone scales with no ovary or fruit; angiosperm ovules hide inside an ovary that becomes the fruit.",
        alt: "Naked seed on cone versus enclosed seed in fruit",
        keyword: "naked seed",
      },
      {
        Component: PinusMorphology,
        caption:
          "Pinus's mountain toolkit: needle leaves in fascicles, thick cuticle, sunken stomata, resin canals sealing wounds — xerophyte engineering in an evergreen.",
        alt: "Pinus morphology with needle fascicles and resin canals",
        keyword: "needle",
      },
      {
        Component: PineConesMaleFemale,
        caption:
          "Two cones, one tree: small soft male cones releasing yellow pollen below, large woody female cones with naked ovules above — the arrangement discourages self-pollination.",
        alt: "Male and female pine cones with positions and structures",
        keyword: "male cone",
      },
      {
        Component: PinePollinationSeed,
        caption:
          "Wind-borne to winged seed: two-winged pollen lands at the micropyle, a pollen tube delivers sperm without water, and two years later a winged seed flies.",
        alt: "Pine pollination to winged seed formation over two years",
        keyword: "pollen",
      },
      {
        Component: GymnospermDiversityUses,
        caption:
          "Living gymnosperms and their uses: Cycas the sago palm, Pinus the timber-and-resin tree — chir pine forests of the mid-hills supply resin, turpentine and pulp.",
        alt: "Gymnosperm diversity Cycas and Pinus with economic uses",
        keyword: "cycas",
      },
      {
        Component: PinusNeedleCrossSection,
        caption:
          "Slice a needle: thick cuticle, sunken stomata, sclerenchyma hypodermis and resin canals — every layer engineered against mountain drought.",
        alt: "Pinus needle cross-section cuticle sunken stomata resin canals",
        keyword: "resin",
      },
      {
        Component: PineOvuleZoom,
        caption:
          "The naked ovule, layer by layer: integument, nucellus, female gametophyte with archegonia — sitting exposed on the scale, entered through the micropyle.",
        alt: "Pine ovule anatomy integument nucellus micropyle archegonia",
        keyword: "ovule",
      },
      {
        Component: GymnospermGametophyteReduction,
        caption:
          "The shrinking gametophyte: mosses wear it, ferns free it, gymnosperms pack it inside pollen and ovule — the male gametophyte IS the pollen grain.",
        alt: "Gametophyte reduction trend from moss to angiosperm",
        keyword: "gametophyte",
      },
      {
        Component: CycasProfile,
        caption:
          "Cycas, the living fossil: unbranched trunk, crown of stiff leaflets, coralloid roots hosting nitrogen-fixing cyanobacteria, and sago starch inside.",
        alt: "Cycas profile trunk crown coralloid roots sago starch",
        keyword: "sago",
      },
      {
        Component: ConiferForestBelt,
        caption:
          "Climb a Himalayan slope: chir pine owns the mid-hills, fir and spruce take the cold, and the timberline ends the trees — conifers win by needles and cones.",
        alt: "Conifer forest belts on Himalayan slope chir pine to timberline",
        keyword: "conifer",
      },
      {
        Component: PineSeedWingedFlight,
        caption:
          "A one-way helicopter: the off-centre papery wing spins the seed as it falls, wind stretches the glide, and every seed lands away from the parent's shade.",
        alt: "Pine winged seed autorotation wind dispersal from parent",
        keyword: "winged",
      },
      {
        Component: SeedVsSpore,
        caption:
          "Spore vs seed: one bare cell versus embryo plus food plus coat — seeds removed water from fertilisation, added dormancy, and packaged a lunch.",
        alt: "Seed versus spore comparison embryo food coat dormancy",
        keyword: "seed",
      },
    ],
  },
  "angiosperm-morphology-of-root-stem-leaves-inflorescences-flowers-and-fruit": {
    title: "Angiosperm morphology",
    figures: [
      {
        Component: RootTypes,
        caption:
          "Three root systems: dicot tap root with laterals, monocot fibrous cluster, and adventitious roots arising from stems or leaves for support, climbing or storage.",
        alt: "Tap fibrous and adventitious root systems compared",
        keyword: "tap root",
      },
      {
        Component: StemMorphology,
        caption:
          "Reading a stem: nodes carry leaves and axillary buds, internodes stretch between them, and the same bud can become a branch, tendril, thorn or runner.",
        alt: "Stem morphology with nodes internodes buds and modifications",
        keyword: "node",
      },
      {
        Component: LeafVenationPhyllotaxy,
        caption:
          "Leaf fingerprints: reticulate nets in dicots, parallel veins in monocots — plus phyllotaxy, the alternate/opposite/whorled rhythm of leaves on the stem.",
        alt: "Reticulate and parallel venation with phyllotaxy patterns",
        keyword: "venation",
      },
      {
        Component: InflorescenceTypes,
        caption:
          "Flower packing: raceme stalks each flower, spike sits them sessile, umbel rays from one point, head compacts a disc — grouped flowers pollinate in one visit.",
        alt: "Inflorescence types raceme spike umbel and head",
        keyword: "inflorescence",
      },
      {
        Component: FlowerStructure,
        caption:
          "Four whorls on a receptacle: green calyx, colourful corolla, pollen-bearing androecium, and the ovary-style-stigma gynoecium — outside-in order matters.",
        alt: "Flower structure with four whorls calyx corolla androecium gynoecium",
        keyword: "sepal",
      },
      {
        Component: FruitTypes,
        caption:
          "The ovary's afterlife: ovary becomes fruit, ovule becomes seed — drupe with a stony stone, berry fleshy throughout, legume a splitting pod.",
        alt: "Fruit types drupe berry and legume with pericarp layers",
        keyword: "drupe",
      },
      {
        Component: StemModifications,
        caption:
          "One bud, four disguises: tendril coils for climbing, thorn defends, runner spreads plantlets, tuber stores starch — all still stems with axillary buds.",
        alt: "Stem modifications tendril thorn runner tuber with examples",
        keyword: "tendril",
      },
      {
        Component: RootTipZones,
        caption:
          "Four working zones from the tip up: root cap shields, meristem divides, elongation stretches, maturation grows the root hairs that actually absorb.",
        alt: "Root tip zones cap meristem elongation maturation root hairs",
        keyword: "radicle",
      },
      {
        Component: LeafPhyllotaxyDetail,
        caption:
          "Phyllotaxy by the numbers: one leaf per node alternate, two opposite, three or more whorled — each rhythm keeps leaves from shading each other.",
        alt: "Phyllotaxy alternate opposite whorled leaf arrangements",
        keyword: "phyllotaxy",
      },
      {
        Component: FlowerSymmetryTypes,
        caption:
          "Cut a flower: actinomorphic splits anywhere into equal halves, zygomorphic only one way, asymmetric never — the ⊕ and % of floral formulae.",
        alt: "Flower symmetry actinomorphic zygomorphic asymmetric examples",
        keyword: "actinomorphic",
      },
      {
        Component: MonocotVsDicotFull,
        caption:
          "Every organ agrees: one cotyledon, fibrous roots, parallel veins, trimerous flowers, scattered bundles — or the dicot mirror image of all five.",
        alt: "Monocot versus dicot full body comparison six features",
        keyword: "monocot",
      },
      {
        Component: PlacentationTypes,
        caption:
          "The ovule's address inside the ovary: marginal on the seam, axile on a central column, parietal on the wall, free-central, or basal at the floor.",
        alt: "Placentation types marginal axile parietal free central basal",
        keyword: "placentation",
      },
      {
        Component: AestivationTypes,
        caption:
          "How petals fold in the bud: valvate edges touch, twisted overlaps one way, imbricate mixes in and out, vexillary stacks banner over wings and keel.",
        alt: "Aestivation types valvate twisted imbricate vexillary in bud",
        keyword: "aestivation",
      },
    ],
  },
  "taxonomic-study-definition-taxonomic-hierarchy-classification-systems-artificial-natural-and-phy": {
    title: "Taxonomic study",
    figures: [
      {
        Component: TaxonRanksLadder,
        caption:
          "Seven obligatory categories from Kingdom to Species — each rank is a taxon, and descending the ladder trades breadth for shared detail.",
        alt: "Taxonomic categories ladder kingdom to species",
        keyword: "hierarchy",
      },
      {
        Component: ClassificationSystemsTimeline,
        caption:
          "Three generations of classification: artificial (few characters, Linnaeus), natural (overall similarity, Bentham & Hooker), phylogenetic (evolutionary ancestry, DNA-informed).",
        alt: "Artificial natural and phylogenetic classification systems timeline",
        keyword: "taxonomy",
      },
      {
        Component: SpeciesConcept,
        caption:
          "Species — the only real rung: an interbreeding population, reproductively isolated from others, sharing one gene pool; higher ranks are human convenience.",
        alt: "Species concept with interbreeding and reproductive isolation",
        keyword: "species",
      },
      {
        Component: TaxonomicAids,
        caption:
          "The taxonomist's toolkit: herbarium sheets, museum jars, living botanical gardens, and paper aids — keys, floras, monographs and manuals.",
        alt: "Taxonomic aids herbarium museum botanical garden and keys",
        keyword: "herbarium",
      },
      {
        Component: DichotomousKeyExample,
        caption:
          "A key in action: each couplet offers two contrasting choices; pick the matching one and follow its pointer until a single name survives.",
        alt: "Dichotomous key couplets leading to species identification",
        keyword: "key",
      },
      {
        Component: HerbariumSheetAnatomy,
        caption:
          "A herbarium sheet is evidence: pressed, dried, mounted plant plus a label carrying name, family, place, date and collector — no label, no science.",
        alt: "Herbarium sheet with pressed plant tape and data label",
        keyword: "herbarium",
      },
      {
        Component: LivingCollectionsGardens,
        caption:
          "Three houses of biodiversity: botanical gardens grow living labelled plants, museums pin and jar preserved ones, zoos breed live animals for conservation.",
        alt: "Botanical garden museum and zoological park collections compared",
        keyword: "botanical",
      },
      {
        Component: MonographFloraManual,
        caption:
          "The taxonomist's bookshelf: a flora covers an area, a monograph one taxon exhaustively, a manual gives quick ID, a catalogue indexes names.",
        alt: "Flora monograph manual and catalogue paper aids compared",
        keyword: "monograph",
      },
      {
        Component: BenthamHookerSystem,
        caption:
          "Bentham & Hooker's natural system: overall similarity in three blocks — dicots, gymnosperms wedged between, monocots — practical, pre-Darwinian, still used in herbaria.",
        alt: "Bentham and Hooker natural system three blocks strengths limits",
        keyword: "bentham",
      },
      {
        Component: LinnaeusBinomialRules,
        caption:
          "Linnaeus's two-word promise: capitalised Genus plus lowercase epithet, italicised, latinised, with abbreviated author — one valid name per species worldwide.",
        alt: "Binomial nomenclature rules with Mangifera indica example",
        keyword: "linnaeus",
      },
      {
        Component: SpecimenCollectionSteps,
        caption:
          "Field to name in five steps: collect the whole plant, record the data, press and dry, mount and label, then run a key against named sheets.",
        alt: "Specimen collection workflow collect record press mount identify",
        keyword: "specimen",
      },
      {
        Component: PhylogeneticTreeReading,
        caption:
          "Reading an evolutionary tree: the root is the oldest ancestor, nodes are branchings, and neighbouring tips share the most recent common ancestor.",
        alt: "Phylogenetic tree with root nodes and sister groups",
        keyword: "phylogenetic",
      },
    ],
  },
  "angiosperm-families-with-economic-importance-brassicaceae-fabaceae-solanaceae-and-liliaceae": {
    title: "Angiosperm families",
    figures: [
      {
        Component: FloralFormulaAnatomy,
        caption:
          "Reading a floral formula: symbols for bract, symmetry and sex, then K C A G with numbers, brackets for fusion and an underline for an inferior ovary.",
        alt: "Floral formula symbols decoded with worked example",
        keyword: "floral formula",
      },
      {
        Component: BrassicaceaeFeatures,
        caption:
          "Brassicaceae: four petals in a cross, six tetradynamous stamens (2+4), silique fruit — the mustard family's formula ⊕ ⚥ K₂+₂ C₄ A₂+₄ G(₂).",
        alt: "Brassicaceae cruciform corolla tetradynamous stamens and silique",
        keyword: "brassicaceae",
      },
      {
        Component: FabaceaeFeatures,
        caption:
          "Fabaceae: butterfly-shaped papilionaceous corolla (banner, wings, keel), diadelphous stamens 9+1, legume fruit — plus Rhizobium nodules that fix nitrogen.",
        alt: "Fabaceae papilionaceous flower diadelphous stamens and legume",
        keyword: "papilionaceous",
      },
      {
        Component: SolanaceaeFeatures,
        caption:
          "Solanaceae: wheel-shaped five-lobed corolla, epipetalous stamens stuck to the petals, berry fruit — the alkaloid family of potato, tomato and tobacco.",
        alt: "Solanaceae rotate corolla epipetalous stamens and berry",
        keyword: "solanaceae",
      },
      {
        Component: LiliaceaeFeatures,
        caption:
          "Liliaceae, the monocot blueprint: trimerous flowers with six look-alike tepals, 3+3 stamens, superior tricarpellary ovary, capsule fruit — onion, garlic, aloe.",
        alt: "Liliaceae trimerous flower tepals and capsule",
        keyword: "liliaceae",
      },
      {
        Component: FamiliesComparisonTable,
        caption:
          "Four families at a glance: symmetry, merosity, stamens, carpels, fruit and placentation — the stamens row alone separates all four.",
        alt: "Comparison table of four angiosperm families",
        keyword: "placentation",
      },
      {
        Component: FamiliesEconomicImportance,
        caption:
          "Why these families matter: mustard oil and pulses, potato and chilli, onion and aloe — food and pharmacy, each family a distinct chemistry kit.",
        alt: "Economic importance of the four families with crops",
        keyword: "crops",
      },
      {
        Component: MustardEconomy,
        caption:
          "Brassicaceae pays the bills: mustard oil for the kitchen, cabbage and radish bred from one plan, rayo saag on the plate, pungent seed in the pickle.",
        alt: "Mustard plant with siliques and four economic uses",
        keyword: "mustard",
      },
      {
        Component: FabaceaeNodulesRhizobium,
        caption:
          "Root nodules, the free fertiliser: Rhizobium bacteria housed in pea-family roots turn N₂ into ammonia, are paid in sugar, and leave nitrogen behind.",
        alt: "Fabaceae root nodules with Rhizobium nitrogen fixation",
        keyword: "rhizobium",
      },
      {
        Component: SolanaceaeAlkaloidCrops,
        caption:
          "Food and pharmacy in one family: potato tuber, tomato berry, chilli heat, tobacco nicotine — with solanine and atropine as the dose-decided poisons.",
        alt: "Solanaceae crops potato tomato chilli tobacco with alkaloids",
        keyword: "potato",
      },
      {
        Component: LiliaceaeMonocotBlueprint,
        caption:
          "The monocot blueprint: six look-alike tepals in two whorls of three, 3+3 stamens, superior tricarpellary ovary — and a bulb storing the next season.",
        alt: "Liliaceae trimerous flower tepals stamens bulb blueprint",
        keyword: "tepals",
      },
      {
        Component: FamilyFruitTypes,
        caption:
          "One fruit each, four fingerprints: legume splits both seams, silique carries seeds on a rim, berry stays fleshy, capsule opens in three.",
        alt: "Legume silique berry and capsule fruits by family",
        keyword: "legume",
      },
      {
        Component: FamilyStamensIdChart,
        caption:
          "Stamens never lie: 2+4 tetradynamous, 9+1 diadelphous, 5 epipetalous, 3+3 in two whorls — one stamen row identifies all four families.",
        alt: "Stamen identification chart for four angiosperm families",
        keyword: "tetradynamous",
      },
      {
        Component: OnionGarlicAloe,
        caption:
          "Three plants, one family: onion's layered bulb, garlic's clove cluster with allicin, aloe's succulent leaf dispensing aloin — kitchen and cabinet in Liliaceae.",
        alt: "Onion bulb garlic cloves and aloe leaf with uses",
        keyword: "onion",
      },
    ],
  },
  // ── Biology Unit 6 — Biota and environment ─────────────────────────────
  "animal-adaptation-aquatic-primary-and-secondary-terrestrial-cursorial-fossorial-and-arboreal-and": {
    title: "Animal adaptation",
    figures: [
      {
        Component: AquaticAdaptations,
        caption:
          "Living in water: streamlined body, swim bladder for buoyancy, gills for dissolved oxygen, fins and flippers — with primary aquatic fish distinguished from secondary aquatic mammals like the whale and seal.",
        alt: "Aquatic adaptations with swim bladder gills and primary versus secondary aquatic animals",
        keyword: "swim bladder",
      },
      {
        Component: PrimaryTerrestrialAdaptations,
        caption:
          "The drying problem: waterproof scales or cuticle, internal fertilisation with amniote eggs, lungs replacing gills, and water-saving kidneys — the four fixes that let animals leave water.",
        alt: "Primary terrestrial adaptations against drying with amniote egg and lungs",
        keyword: "amniote",
      },
      {
        Component: CursorialFossorialAdaptations,
        caption:
          "Runners vs diggers: cursorial animals get long limbs, reduced digits and digitigrade stance; fossorial animals get powerful clawed forelimbs, reduced eyes and sensitive vibrissae.",
        alt: "Cursorial running versus fossorial burrowing adaptations",
        keyword: "cursorial",
      },
      {
        Component: ArborealVolantAdaptations,
        caption:
          "Climbers vs flyers: arboreal animals use opposable thumbs, prehensile tails and binocular vision; volant animals use wings, hollow pneumatic bones, a keeled sternum and air sacs.",
        alt: "Arboreal climbing versus volant flight adaptations",
        keyword: "volant",
      },
      {
        Component: PopulationParametersEquation,
        caption:
          "Population change in one equation: (natality + immigration) − (mortality + emigration) — the four flows that move population density.",
        alt: "Population change equation with natality mortality immigration and emigration",
        keyword: "change = (natality",
      },
    ],
  },
  "animal-behavior-reflex-action-taxes-dominance-and-leadership": {
    title: "Animal behavior",
    figures: [
      {
        Component: ReflexArcPath,
        caption:
          "The reflex arc in five stations: receptor → sensory neuron → CNS → motor neuron → effector — fast because the spinal cord decides without the brain (knee-jerk: ~30–50 ms).",
        alt: "Reflex arc pathway from receptor to effector",
        keyword: "reflex arc",
      },
      {
        Component: TaxesTypes,
        caption:
          "The four taxes: phototaxis (light), chemotaxis (chemicals), thigmotaxis (touch), geotaxis (gravity) — each a directed movement toward or away from the stimulus.",
        alt: "Four types of taxes with examples",
        keyword: "phototaxis",
      },
      {
        Component: TaxisVsKinesis,
        caption:
          "Taxis vs kinesis: taxis is directional steering toward or away from a stimulus; kinesis is random, non-directional movement whose rate simply rises with the stimulus.",
        alt: "Taxis directional versus kinesis random movement",
        keyword: "kinesis",
      },
      {
        Component: DominanceHierarchy,
        caption:
          "Dominance and leadership: the dominant individual holds priority access to food, mates and territory, and leads group movement — hierarchy reduces fighting in primates, wolves and fish.",
        alt: "Dominance hierarchy pyramid with priority access",
        keyword: "dominance",
      },
      {
        Component: InnateLearnedBehavior,
        caption:
          "Two sources of behaviour: innate (genetically programmed, same in all members — reflexes, taxes, migration) versus learned (shaped by experience — habituation, imprinting, conditioning).",
        alt: "Innate versus learned behaviour comparison",
        keyword: "learned",
      },
    ],
  },
  "fish-and-bird-migration": {
    title: "Fish and bird migration",
    figures: [
      {
        Component: MigrationDefinition,
        caption:
          "The word and the meaning: from Latin 'migrare' — the regular and periodic passing of animals from one place to another, an inborn behaviour shown by insects, birds, fishes, mammals and turtles.",
        alt: "Migration definition from Latin migrare with animal groups",
        keyword: "migrare",
      },
      {
        Component: MigrationPurposes,
        caption:
          "Five purposes of migration: in search of food, to escape adverse environmental conditions, to find mate, and for shelter and reproduction.",
        alt: "Purposes of migration food safety mate shelter reproduction",
        keyword: "in search of food",
      },
      {
        Component: FishMigrationTypes,
        caption:
          "Fish migration classics: salmon fighting upstream to spawn in the stream where they were born; mackerel migrating seasonally in the Kosi and Gandaki rivers to feed and breed.",
        alt: "Fish migration salmon upstream and mackerel in Nepal rivers",
        keyword: "salmon",
      },
      {
        Component: BirdMigrationRoutes,
        caption:
          "Bird migration in Nepal: Himalayan birds such as the bar-headed goose descend to the Terai in winter; storks gather at lowland lakes.",
        alt: "Bird migration routes Himalaya to Terai",
        keyword: "bar-headed goose",
      },
      {
        Component: MigrationSurvivalValue,
        caption:
          "Why migration works: it is genetically programmed, locked to a seasonal clock, and astonishingly precise — salmon home to their natal stream; some birds fly over 10,000 km per year.",
        alt: "Migration survival value genetic programming and precision",
        keyword: "genetically programmed",
      },
    ],
  },
  "environmental-pollution-sources-effects-and-control-measures-of-air-water-and-soil-pollution": {
    title: "Environmental pollution",
    figures: [
      {
        Component: PollutionSourcesMap,
        caption:
          "One problem, three arenas: air (vehicle exhaust, industry, brick kilns, indoor biomass smoke), water (sewage, heavy metals, fertiliser runoff) and soil (excess chemicals, mining spoil, plastics).",
        alt: "Pollution sources by medium air water and soil",
        keyword: "air pollution",
      },
      {
        Component: AirPollutantEffects,
        caption:
          "What polluted air does: photochemical smog (ozone, PAN), acid rain acidifying lakes and corroding buildings, the greenhouse effect driving global warming, and CO binding haemoglobin into hypoxia.",
        alt: "Air pollution effects smog acid rain greenhouse and toxicity",
        keyword: "acid rain",
      },
      {
        Component: WaterPollutionBod,
        caption:
          "How water suffocates: high BOD means microbes consume dissolved oxygen; fertiliser runoff feeds algal blooms whose decay crashes oxygen and kills fish — Phewa Lake's creeping eutrophication.",
        alt: "BOD and eutrophication cascade with algal bloom and fish kill",
        keyword: "eutrophication",
      },
      {
        Component: SewageTreatmentStages,
        caption:
          "Sewage treatment in three stages: primary screening and sedimentation, secondary microbial digestion (activated sludge, trickling filter), tertiary chemical polishing before discharge.",
        alt: "Sewage treatment stages primary secondary tertiary",
        keyword: "activated sludge",
      },
      {
        Component: SoilErosionControl,
        caption:
          "Saving the topsoil: terracing and contour farming, afforestation and community forestry, cover crops and rotation, check dams and gully plugging, controlled grazing.",
        alt: "Soil erosion control measures in Nepal",
        keyword: "check dam",
      },
    ],
  },
  "pesticides-and-their-effects": {
    title: "Pesticides and their effects",
    figures: [
      {
        Component: PesticideClassesChart,
        caption:
          "The pesticide shelf: organochlorines (DDT — persistent), organophosphates and carbamates (nerve poisons), pyrethroids (fast-breaking), herbicides and fungicides — each class with its own trade-off.",
        alt: "Pesticide classes with examples and persistence notes",
        keyword: "organochlorine",
      },
      {
        Component: BiomagnificationDdt,
        caption:
          "Biomagnification: DDT concentration rises from water → plankton → small fish → large fish → fish-eating birds, thinning eggshells — the bald eagle and osprey collapse.",
        alt: "DDT biomagnification up the food chain to eggshell thinning",
        keyword: "biomagnification",
      },
      {
        Component: InsecticideNerveAction,
        caption:
          "Nerve poisons: organophosphates and carbamates inhibit acetylcholinesterase, so the nerve signal never switches off — convulsions and respiratory failure in insects and humans alike.",
        alt: "Acetylcholinesterase inhibition by organophosphates and carbamates",
        keyword: "acetylcholinesterase",
      },
      {
        Component: PesticideBackfire,
        caption:
          "Ecological backfire: pest resurgence when natural enemies die, resistance through selection — the pesticide treadmill — and secondary pests released from competition.",
        alt: "Pesticide resurgence resistance and secondary pests",
        keyword: "resurgence",
      },
      {
        Component: IpmStrategy,
        caption:
          "Integrated Pest Management: tolerant varieties, crop rotation, biological control (ladybird beetles, Bacillus thuringiensis), pheromone traps — chemicals only as a last resort at the economic threshold.",
        alt: "IPM strategy components with chemical last resort",
        keyword: "integrated pest management",
      },
    ],
  },
  // ── Biology Unit 7 — Conservation biology ──────────────────────────────
  "conservation-biology-concept-of-biodiversity-biodiversity-conservation": {
    title: "Conservation biology: concept of biodiversity and biodiversity conservation",
    figures: [
      {
        Component: BiodiversityLevels,
        caption:
          "Biodiversity at three nested levels: genetic diversity (rice landraces like Jumli marshi), species diversity (Nepal's ~208 mammals, ~900 birds) and ecosystem diversity (sal forests to alpine meadows).",
        alt: "Three levels of biodiversity genetic species and ecosystem with Nepal examples",
        keyword: "genetic diversity",
      },
      {
        Component: ConservationBiologyGoals,
        caption:
          "Conservation biology is a crisis discipline applying ecology, genetics and social science — its three goals: document biodiversity, understand human effects, prevent extinctions.",
        alt: "Conservation biology three goals document understand prevent",
        keyword: "crisis discipline",
      },
      {
        Component: InSituVsExSitu,
        caption:
          "In-situ vs ex-situ conservation: in-situ protects whole ecosystems in the natural habitat (national parks, reserves); ex-situ conserves species or genes off-site (zoos, botanical gardens, seed banks, cryopreservation).",
        alt: "In-situ versus ex-situ conservation comparison",
        keyword: "ex-situ conservation",
      },
      {
        Component: HippoDrivers,
        caption:
          "HIPPO — the five drivers of biodiversity loss: Habitat loss, Invasive species (Mikania, water hyacinth), Pollution, human Population, Overexploitation — with Nepal examples for each.",
        alt: "HIPPO drivers of biodiversity loss with Nepal examples",
        keyword: "hippo",
      },
      {
        Component: BiodiversityValues,
        caption:
          "Why biodiversity matters: ecosystem services, food security, medicine and ethical-aesthetic value — losing genes weakens species, losing species weakens ecosystems.",
        alt: "Why biodiversity matters ecosystem services food medicine aesthetic",
        keyword: "ecosystem services",
      },
    ],
  },
  "national-parks-wildlife-reserves-conservation-areas-biodiversity-hotspots-wetland-and-ramsar-sit": {
    title: "National parks, wildlife reserves, conservation areas, hotspots, wetlands and Ramsar sites",
    figures: [
      {
        Component: ProtectedAreaNetwork,
        caption:
          "Nepal's network in numbers: 12 national parks, 1 wildlife reserve, 1 hunting reserve, 6 conservation areas, 13 buffer zones — nearly 24% of the country, plus Ramsar wetlands.",
        alt: "Nepal protected area network numbers",
        keyword: "12 national parks",
      },
      {
        Component: ProtectedAreaTypes,
        caption:
          "Seven designations defined: national park (no consumptive use), wildlife reserve, hunting reserve (Dhorpatan only), conservation area, buffer zone, biodiversity hotspot, Ramsar site.",
        alt: "Protected area designation types with definitions",
        keyword: "hunting reserve",
      },
      {
        Component: NepalHotspots,
        caption:
          "Nepal's two biodiversity hotspots: the Himalaya hotspot along the whole mountain arc, and the Indo-Burma edge in the far-eastern Terai (Kanchenjunga–Singalila and eastern plains).",
        alt: "Nepal biodiversity hotspots Himalaya and Indo-Burma",
        keyword: "himalaya hotspot",
      },
      {
        Component: RamsarSitesNepal,
        caption:
          "Nine Ramsar wetlands: Bishazari Tal, Ghodaghodi Tal, Jagadishpur Reservoir, Koshi Tappu, Gosaikunda, Rara Lake, Mai Pokhari, Phoksundo Lake and Gokyo lakes — protecting migratory waterbirds.",
        alt: "Nepal's nine Ramsar wetland sites",
        keyword: "ramsar convention (1971, iran)",
      },
      {
        Component: MajorProtectedAreas,
        caption:
          "The flagship map: Chitwan (rhino, tiger, gharial), Bardia (dolphin in the Karnali), Sagarmatha (snow leopard, tahr), Langtang (red panda), Koshi Tappu (arna), Dhorpatan (blue sheep), Annapurna and Kanchenjunga CAs.",
        alt: "Nepal major protected areas with flagship species",
        keyword: "blue sheep",
      },
    ],
  },
  "wildlife-importance-causes-of-extinction-and-conservation-strategies": {
    title: "Wildlife: importance, causes of extinction and conservation strategies",
    figures: [
      {
        Component: WildlifeValues,
        caption:
          "Wildlife's three values: ecological (pollination, seed dispersal, nutrient cycling, pest control, food webs), economic (ecotourism, medicine, genetic diversity for agriculture) and cultural (aesthetic, ethical, indigenous knowledge).",
        alt: "Wildlife values ecological economic and cultural",
        keyword: "ecosystem services",
      },
      {
        Component: ExtinctionCauses,
        caption:
          "Six roads to extinction: habitat destruction and fragmentation (the leading cause), overexploitation (ivory poaching, overfishing), invasive species (Lantana camara), pollution, climate change and disease.",
        alt: "Six major causes of extinction",
        keyword: "habitat loss is the leading cause",
      },
      {
        Component: HabitatLossChain,
        caption:
          "The habitat-loss chain: deforestation, agriculture, urbanisation and infrastructure destroy habitat; fragmentation then isolates populations, cutting gene flow toward local extinction.",
        alt: "Habitat loss chain from drivers to fragmentation to extinction",
        keyword: "habitat destruction and fragmentation",
      },
      {
        Component: ConservationStrategies,
        caption:
          "Six conservation strategies: legal protection (CITES, national laws), protected areas, captive breeding, habitat restoration, community-based conservation and international cooperation.",
        alt: "Conservation strategies legal protected areas captive breeding community",
        keyword: "captive breeding",
      },
      {
        Component: CitesAppendices,
        caption:
          "CITES regulates cross-border trade in threatened species through three appendices: Appendix I bans commercial trade, II requires permits, III is a single-country listing.",
        alt: "CITES appendix I II and III trade rules",
        keyword: "appendix i, ii, and iii listings",
      },
    ],
  },
  "iucn-categories-of-threatened-species-meaning-of-extinct-endangered-vulnerable-rare-and-threaten": {
    title: "IUCN categories of threatened species",
    figures: [
      {
        Component: IucnCategoriesLadder,
        caption:
          "The Red List ladder in decreasing severity: EX, EW, CR, EN, VU, NT, LC, plus DD and NE — with the definition of each category.",
        alt: "IUCN Red List categories severity ladder",
        keyword: "in decreasing severity",
      },
      {
        Component: IucnNepalExamples,
        caption:
          "The ladder with faces: tiger and red panda (EN), one-horned rhinoceros and snow leopard (VU), the dodo (EX) — and the scale: 42,000+ species threatened worldwide, 27 threatened mammals in Nepal.",
        alt: "IUCN categories with Nepal examples",
        keyword: "tiger — endangered (en)",
      },
      {
        Component: RareVsThreatened,
        caption:
          "The three word-traps: rare ≠ endangered (population trend matters), threatened = CR+EN+VU collectively (not one category), and extinct in the wild ≠ extinct (EW species survive in captivity).",
        alt: "Rare versus threatened versus endangered misconceptions",
        keyword: "rarity alone",
      },
      {
        Component: RedListScale,
        caption:
          "The Red List in numbers: more than 42,000 species threatened with extinction globally; Nepal lists 27 mammal species as threatened.",
        alt: "IUCN Red List global and Nepal numbers",
        keyword: "more than 42,000 species threatened with extinction",
      },
      {
        Component: EndangeredSpeciesDefinition,
        caption:
          "'Endangered species' has two meanings: strictly IUCN EN (very high risk in the wild), loosely any threatened species (CR, EN, VU) — plus Nepal's own schedules under the National Parks and Wildlife Conservation Act.",
        alt: "Endangered species strict and loose meanings",
        keyword: "very high risk of extinction in the wild",
      },
    ],
  },
  "endangered-species-in-nepal": {
    title: "Endangered species in Nepal",
    figures: [
      {
        Component: NepalEndangeredSpecies,
        caption:
          "Nepal's threatened roster: greater one-horned rhinoceros (VU), Bengal tiger (EN), snow leopard (VU), red panda (EN), gharial (CR), arna (EN), spiny babbler (Nepal-endemic) and Bengal florican (CR).",
        alt: "Nepal endangered species with IUCN status",
        keyword: "greater one-horned rhinoceros",
      },
      {
        Component: SpeciesThreatActions,
        caption:
          "Threat → action for six species: anti-poaching and translocation for the rhino, camera-trap surveys for the tiger, insurance schemes for the snow leopard, corridors for the red panda, captive release for the gharial.",
        alt: "Species threats and conservation actions table",
        keyword: "poaching for horn",
      },
      {
        Component: RhinoTigerRecovery,
        caption:
          "Recovery stories: the rhinoceros grew from ~100 in the 1960s to 750+ through zero-poaching years; tigers nearly tripled from 121 (2009) to 355 (2022), meeting the Tx2 goal ahead of schedule.",
        alt: "Rhino and tiger recovery numbers in Nepal",
        keyword: "zero-poaching years",
      },
      {
        Component: SpeciesRolesEcology,
        caption:
          "Four conservation roles: flagship (rhino, tiger — appeal and funding), umbrella (large habitats shelter co-occurring species), indicator (gharial for river health), keystone (elephants, seed dispersers).",
        alt: "Flagship umbrella indicator and keystone species roles",
        keyword: "umbrella effect",
      },
      {
        Component: EndangeredSpeciesDefinition,
        caption:
          "The definition trap: 'endangered' strictly means IUCN EN — very high risk of extinction in the wild — but is used loosely for all threatened species (CR, EN, VU).",
        alt: "Endangered species definition strict versus loose",
        keyword: "very high risk of extinction in the wild",
      },
    ],
  },
  // ── Biology Unit 8 — Introduction to biology ────────────────────────────
  "introduction-to-biology-scope-and-fields-of-biology": {
    title: "Introduction to biology: scope and fields of biology",
    figures: [
      {
        Component: ScopeLevels,
        caption:
          "The scope of biology from molecules to the biosphere: each level asks its own question — from how DNA codes protein to how we name and classify life.",
        alt: "Scope of biology levels from molecules to biosphere",
        keyword: "molecules to the biosphere",
      },
      {
        Component: BranchesOfBiology,
        caption:
          "The major branches of biology, each paired with a problem it studies: botany, zoology, microbiology, ecology and genetics — from sal regeneration to haemophilia inheritance.",
        alt: "Major branches of biology with example problems",
        keyword: "major branches of biology",
      },
      {
        Component: BasicVsApplied,
        caption:
          "Basic vs applied research: basic research seeks knowledge for its own sake (how DNA replicates, the lac operon); applied research targets a practical problem (insulin in E. coli, Bt cotton, a malaria vaccine).",
        alt: "Basic versus applied research comparison",
        keyword: "basic (pure) research",
      },
      {
        Component: WhyBiologyMatters,
        caption:
          "Why biology matters today: medicine and public health, agriculture and food security, environment and conservation, biotechnology and industry, and understanding ourselves.",
        alt: "Why biology matters today application areas",
        keyword: "why biology matters today",
      },
      {
        Component: ScopeLevels,
        caption:
          "Specialist branches narrow further — ornithology, entomology and mycology study birds, insects and fungi, down to migration routes of demoiselle cranes.",
        alt: "Specialist branches of biology",
        keyword: "specialist branches",
      },
    ],
  },
  "relation-of-biology-with-other-sciences": {
    title: "Relation of biology with other sciences",
    figures: [
      {
        Component: BridgeScienceMap,
        caption:
          "Biology as a bridge science: it borrows chemistry's molecules, physics's instruments and mathematics's models, and lends its findings to medicine, agriculture and society.",
        alt: "Biology as a bridge science between physical sciences and the human world",
        keyword: "bridge science",
      },
      {
        Component: ScienceRelationsTable,
        caption:
          "What biology borrows from other sciences: chemistry's molecules and reactions, physics's instruments, mathematics's models, geology's Earth history, and computing's sequencing algorithms.",
        alt: "Relations of biology with other sciences",
        keyword: "what biology borrows",
      },
      {
        Component: BiologicalMethodCycle,
        caption:
          "The biological method of investigation — the shared logic of all science: observe, question, hypothesise, predict, experiment, analyse, conclude, communicate.",
        alt: "Biological method eight-step cycle",
        keyword: "biological method of investigation",
      },
      {
        Component: MethodWorkedExample,
        caption:
          "Worked example — why do leaves of sal fall in winter? From the dry-season observation through the water-stress question, hypothesis and prediction to the leaf-retention experiment and conclusion.",
        alt: "Worked method example sal leaf fall",
        keyword: "why do leaves of sal fall in winter",
      },
      {
        Component: PasteurExperiment,
        caption:
          "Pasteur's swan-neck flasks: broth sterilised with the neck curved so dust and microbes settle in the bend stays sterile for months; break the neck and the broth spoils — life comes from existing life (biogenesis).",
        alt: "Pasteur swan-neck flask experiment disproving spontaneous generation",
        keyword: "swan-neck flasks",
      },
    ],
  },
  // ── Biology Unit 9 — evolutionary biology ───────────────────────────────
  "life-and-its-origin-oparin-haldane-theory-miller-and-urey-s-experiment": {
    title: "Life and its origin — Oparin–Haldane theory, Miller and Urey's experiment",
    figures: [
      {
        Component: EarlyEarthConditions,
        caption:
          "Early Earth (~4.0–3.5 bya): a reducing atmosphere of CH₄, NH₃, H₂ and H₂O with no free O₂, energised by UV rays, lightning and volcanic heat — organics could accumulate in the primordial soup.",
        alt: "Early Earth reducing atmosphere of methane ammonia hydrogen and water vapour over primordial oceans",
        keyword: "reducing atmosphere",
      },
      {
        Component: OparinHaldaneHypothesis,
        caption:
          "Oparin–Haldane chemical evolution: simple inorganics → simple organics ('hot dilute soup') → macromolecules → coacervates/protobionts → self-replicating RNA → first anaerobic heterotrophic cells.",
        alt: "Oparin Haldane hypothesis six steps of chemical evolution",
        keyword: "hot dilute soup",
      },
      {
        Component: MillerUreyApparatus,
        caption:
          "Miller–Urey (1953): a sealed loop circulated CH₄/NH₃/H₂/H₂O past electric discharges; the condenser 'rained' products into the flask — amino acids (glycine, alanine, aspartic, glutamic) appeared within about a week.",
        alt: "Miller Urey experiment apparatus with electrodes condenser and amino acid products",
        keyword: "electric discharge",
      },
      {
        Component: OriginGrandTimeline,
        caption:
          "From molecules to cells: Earth forms 4.6 bya → oceans condense → first prokaryotes (~3.8–3.5 bya, stromatolite fossils) → cyanobacteria oxygenate the air → eukaryotes → multicellular life and the Cambrian explosion.",
        alt: "Grand timeline from Earth formation to Cambrian explosion",
        keyword: "stromatolite",
      },
      {
        Component: OriginTheories,
        caption:
          "Four views of life's origin: special creation (not testable), spontaneous generation (disproved by Pasteur), panspermia (cosmic seeding) and chemical evolution — the only testable, experiment-supported account.",
        alt: "Theories of origin of life compared special creation spontaneous generation panspermia abiogenesis",
        keyword: "panspermia",
      },
    ],
  },
  "evidences-of-evolution-morphological-anatomical-paleontological-embryological-and-biochemical": {
    title: "Evidences of evolution",
    figures: [
      {
        Component: HomologousForelimbs,
        caption:
          "Homologous forelimbs of human (grasping), whale (flipper), bat (wing) and horse (running) share the same bones — humerus, radius-ulna, carpals, digits — divergent evolution from a common ancestor.",
        alt: "Homologous forelimbs of human whale bat and horse showing divergent evolution",
        keyword: "homologous organs",
      },
      {
        Component: AnalogousOrgans,
        caption:
          "Analogous organs: butterfly wing (chitin membrane) vs bird wing (feathered bone-limb); octopus vs mammal eye — different structures, same function → convergent evolution under similar selection pressures.",
        alt: "Analogous organs butterfly and bird wings octopus and mammal eyes convergent evolution",
        keyword: "analogous organs",
      },
      {
        Component: VestigialOrgans,
        caption:
          "Vestigial organs — human appendix, coccyx, wisdom teeth, nictitating membrane and whale pelvic bones: reduced, functionless remnants of useful ancestral organs.",
        alt: "Vestigial organs appendix coccyx wisdom teeth nictitating membrane whale pelvis",
        keyword: "vestigial organs",
      },
      {
        Component: ConnectingLinks,
        caption:
          "Connecting links bridge two groups: Archaeopteryx (reptile→bird: feathers plus teeth/tail), Peripatus (annelid→arthropod), Euglena (plant→animal: chloroplasts plus movement).",
        alt: "Connecting links Archaeopteryx Peripatus Euglena bridging two groups",
        keyword: "connecting links",
      },
      {
        Component: EmbryoSimilarity,
        caption:
          "Early embryos of fish, salamander, chick and human share gill pouches (pharyngeal arches), tail and notochord, diverging later (von Baer) — shared embryonic stages reveal common ancestry.",
        alt: "Early embryos of fish salamander chick and human showing gill pouches tail notochord",
        keyword: "gill pouches",
      },
      {
        Component: MolecularEvidenceTree,
        caption:
          "Molecular evidence: human cytochrome c is identical to chimpanzee's, differs by 1 amino acid from rhesus and by many from yeast — the molecular tree matches the fossil tree.",
        alt: "Cytochrome c similarity tree human chimpanzee rhesus horse yeast",
        keyword: "cytochrome c",
      },
      {
        Component: FossilRecordSequence,
        caption:
          "The fossil record runs simple prokaryotes (3.5 bya) → eukaryotes → invertebrates → fish → amphibians → reptiles → birds/mammals → humans; deeper strata are older, with C-14, U-Pb and K-Ar dating.",
        alt: "Fossil record sequence from prokaryotes to humans complexity increases with time",
        keyword: "transitional fossils",
      },
    ],
  },
  "theories-of-evolution-lamarckism-darwinism-and-concept-of-neo-darwinism": {
    title: "Theories of evolution — Lamarckism, Darwinism and neo-Darwinism",
    figures: [
      {
        Component: LamarckismPropositions,
        caption:
          "Lamarckism's four propositions: internal vital forces, environment and need, use and disuse, and inheritance of acquired characters — the last is the fatal one.",
        alt: "Lamarckism four propositions internal vital forces use and disuse inheritance of acquired characters",
        keyword: "use and disuse",
      },
      {
        Component: WeismannGermplasm,
        caption:
          "Weismann's germplasm theory: cutting mice's tails for 22 generations — tailless mice still born with tails. Somatic changes never reach the germ line, so acquired characters are not inherited.",
        alt: "Weismann germplasm experiment mice tails cut for 22 generations",
        keyword: "germplasm theory",
      },
      {
        Component: DarwinFiveObservations,
        caption:
          "Darwin's five observations and deductions — the NEB 5-mark skeleton: overproduction → struggle for existence → variation → survival of the fittest → natural selection and inheritance (descent with modification).",
        alt: "Darwin five observations overproduction struggle variation survival of the fittest natural selection",
        keyword: "survival of the fittest",
      },
      {
        Component: IndustrialMelanism,
        caption:
          "Industrial melanism in the peppered moth: pale moths camouflaged on lichen trunks; soot darkened the trunks and the rare dark mutant became camouflaged — dark forms rose above 90% (Kettlewell's confirmation).",
        alt: "Industrial melanism peppered moth pale and dark forms before and after soot",
        keyword: "industrial melanism",
      },
      {
        Component: LamarckVsDarwinGiraffe,
        caption:
          "Two answers to one giraffe: Lamarck — the stretched neck is inherited; Darwin — long-necked variants survived droughts and bred more. Selection acts on pre-existing heritable variation.",
        alt: "Lamarck versus Darwin giraffe neck explanation",
        keyword: "giraffe",
      },
      {
        Component: NeoDarwinismSynthesis,
        caption:
          "Neo-Darwinism (the modern synthesis): genetic variation by mutation, recombination and gene flow; selection changes allele frequencies; drift, isolation and speciation complete the picture.",
        alt: "Neo Darwinism modern synthesis five pillars mutation selection drift isolation",
        keyword: "genetic drift",
      },
      {
        Component: LamarckVsDarwinTable,
        caption:
          "Lamarckism vs Darwinism (NEB 2024 comparison): driving force, mechanism, direction, origin of variation and final fate — one disproved, one confirmed and extended.",
        alt: "Lamarckism versus Darwinism comparison table",
        keyword: "inheritance of acquired characters",
      },
    ],
  },
  "human-evolution-position-of-man-in-animal-kingdom": {
    title: "Human evolution — position of man in animal kingdom",
    figures: [
      {
        Component: ManClassificationLadder,
        caption:
          "Man's place in the animal kingdom: Animalia → Chordata → Mammalia (hair, mammary glands, diaphragm, three ear ossicles) → Primates (opposable thumb, stereoscopic vision) → Hominidae → Homo sapiens.",
        alt: "Position of man in animal kingdom classification ladder",
        keyword: "opposable thumb",
      },
      {
        Component: PrimateRelativesTree,
        caption:
          "Our primate relatives: prosimians (lemurs, lorises), Old World monkeys (macaque, langur), New World monkeys (spider monkey), apes (gibbon, orangutan, gorilla, chimpanzee) — and humans.",
        alt: "Primate relatives tree prosimians monkeys apes humans",
        keyword: "stereoscopic vision",
      },
      {
        Component: ManVsApes,
        caption:
          "Man vs apes: fully erect bipedal posture, ~1350–1450 cc brain, flat face with chin and small canines, free hands with fully opposable thumb, speech (Broca's area) and cumulative culture.",
        alt: "Man versus apes posture brain face hands language comparison",
        keyword: "knuckle-walking",
      },
      {
        Component: HumanEvolutionStages,
        caption:
          "Stages from Dryopithecus (~20–14 mya forest ape) through Ramapithecus, Australopithecus (Lucy), Homo habilis (first stone tools), H. erectus (fire, Java and Peking man), Neanderthal man, to Homo sapiens.",
        alt: "Stages of human evolution from Dryopithecus to Homo sapiens",
        keyword: "Homo erectus",
      },
      {
        Component: BrainExpansionChart,
        caption:
          "Brain expansion along the line: ~450–500 cc in Australopithecus → 650–750 (habilis) → 900–1100 (erectus) → ~1400 (Neanderthal) → 1350–1450 cc in modern humans.",
        alt: "Brain size expansion chart through hominid line",
        keyword: "bipedalism",
      },
    ],
  },
  "differences-between-new-world-monkeys-and-old-world-monkeys-apes-and-man": {
    title: "Differences between New World monkeys, Old World monkeys, apes and man",
    figures: [
      {
        Component: NewVsOldWorldMonkeys,
        caption:
          "New World vs Old World monkeys: America vs Africa/Asia; flat wide-septum sideways nostrils vs narrow downward nostrils; long often prehensile tail vs never prehensile; no vs yes cheek pouches and ischial callosities.",
        alt: "New World versus Old World monkeys comparison table",
        keyword: "prehensile",
      },
      {
        Component: MonkeysApesMan,
        caption:
          "Monkeys vs apes vs man: tail (present/absent/absent), posture, arms vs legs, brain volume, locomotion, language and examples — gibbon is the lesser ape; orangutan, gorilla and chimpanzee are great apes.",
        alt: "Monkeys apes and man three-way comparison table",
        keyword: "ischial callosities",
      },
      {
        Component: PlatyrrhineVsCatarrhine,
        caption:
          "The two monkey noses: Platyrrhini — flat, wide septum, nostrils facing sideways; Catarrhini — narrow nostrils facing downward. And two tails: prehensile (New World) vs never prehensile (Old World).",
        alt: "Platyrrhine versus catarrhine nose and tail anatomy",
        keyword: "nostrils",
      },
      {
        Component: LesserVsGreatApes,
        caption:
          "Lesser ape vs great apes: gibbon (Hylobatidae — small, brachiating, monogamous) versus orangutan, gorilla and chimpanzee (Hominidae — large, and grouped with humans).",
        alt: "Lesser ape gibbon versus great apes orangutan gorilla chimpanzee",
        keyword: "brachiation",
      },
      {
        Component: PrimateRelativesTree,
        caption:
          "The primate family album: prosimians, two monkey lineages separated by ~40 million years of ocean, the tailless apes, and us — the anatomical grades behind the human-evolution story.",
        alt: "Primate family tree with all grades",
        keyword: "40 million years",
      },
    ],
  },
  "evolution-of-modern-man-starting-from-anthropoid-ancestor": {
    title: "Evolution of modern man starting from anthropoid ancestor",
    figures: [
      {
        Component: AnthropoidAncestorSplit,
        caption:
          "The split (~6–7 mya): forest shrinkage in Africa (Miocene cooling) divided a Dryopithecus-like forest ape — one branch stayed forest-adapted (chimpanzee/gorilla), the other took to open woodland and savanna (hominins).",
        alt: "Anthropoid ancestor split into ape and hominin lines",
        keyword: "forest shrinkage",
      },
      {
        Component: BipedalismAdvantages,
        caption:
          "Why bipedalism came first on open ground: scanning over grass for predators and food, freeing the hands for carrying food, tools and infants, reduced sun exposure, and energy-efficient long-distance travel.",
        alt: "Four advantages of bipedalism on open savanna",
        keyword: "predator vigilance",
      },
      {
        Component: FourGrandTrends,
        caption:
          "The four grand trends: posture (quadrupedal → striding bipedal), hands (knuckle support → precision grip), brain and face (~450 → ~1400 cc, flat face with chin), and cumulative culture — with the feedback loop that drove them.",
        alt: "Four grand trends of human evolution posture hands brain culture",
        keyword: "feedback loop",
      },
      {
        Component: OutOfAfricaSpread,
        caption:
          "Out of Africa: H. erectus left ~1.8 mya; modern H. sapiens left ~60–70 kya, reaching Australia (~50 kya) and the Americas (~15 kya) — and every ecological zone from Nepal's Terai to high Himalaya.",
        alt: "Out of Africa spread of Homo erectus and Homo sapiens",
        keyword: "out of africa",
      },
      {
        Component: CulturalEvolutionAges,
        caption:
          "Cultural evolution — the fourth engine: Paleolithic (tools, fire) → Mesolithic (microliths) → Neolithic (agriculture, villages) → metal ages (writing, cities) → industrial/scientific — now faster than biological evolution.",
        alt: "Cultural evolution ages from Paleolithic to industrial",
        keyword: "agriculture",
      },
    ],
  },
  // ── Biology Unit 10 — vegetation ────────────────────────────────────────
  "vegetation-introduction-types-of-vegetation-in-nepal": {
    title: "Vegetation: introduction, types of vegetation in Nepal",
    figures: [
      {
        Component: NepalVegetationZones,
        caption:
          "Nepal's six vegetation zones by altitude: tropical sal (below ~1000 m), subtropical chir pine, temperate oak–fir–rhododendron, subalpine birch–juniper, alpine meadows (bugyals), and the nival snowline with only lichens and mosses.",
        alt: "Vegetation zones of Nepal by altitude from tropical sal to nival lichens",
        keyword: "altitudinal zonation",
      },
      {
        Component: TropicalVsTemperateForest,
        caption:
          "Tropical deciduous sal forest vs temperate evergreen oak–conifer: altitude, climate, dominant species, leaf habit and commercial value — deciduous shedding is a drought strategy, evergreen needles a year-round strategy.",
        alt: "Tropical deciduous sal forest versus temperate evergreen oak conifer comparison",
        keyword: "deciduous",
      },
      {
        Component: TeraiVsBhabarVegetation,
        caption:
          "Terai (alluvial plain): tall sal forests, riverine sissoo–khair, tall grasslands (Saccharum, Phragmites, Themeda) — rhino and tiger habitat. Bhabar (porous boulder belt): drier sal and khair–sissoo forest with deep water tables.",
        alt: "Terai versus Bhabar vegetation alluvial plain and porous boulder belt",
        keyword: "Bhabar",
      },
      {
        Component: ZonationFactors,
        caption:
          "What controls the zones: temperature falls ~6 °C per 1000 m (the master variable), monsoon vs rain-shadow rainfall, thin air and intense UV at height, and soil depth and drainage.",
        alt: "Factors controlling vegetation zonation temperature rainfall altitude soil",
        keyword: "rain-shadow",
      },
      {
        Component: AltitudeLatitudeRule,
        caption:
          "Rule of thumb: climbing 1000 m in Nepal ≈ travelling 1000 km toward the poles — a day's walk crosses climate zones that span a continent, from tropical sal to alpine meadow within 200 km.",
        alt: "Climbing 1000 metres equals travelling 1000 kilometres toward the poles",
        keyword: "toward the poles",
      },
    ],
  },
  "in-situ-protected-areas-and-ex-situ-botanical-garden-seed-bank-conservation": {
    title: "In-situ (protected areas) and Ex-situ (botanical garden, seed bank) conservation",
    figures: [
      {
        Component: InSituNepalCategories,
        caption:
          "In-situ conservation in Nepal: national parks (Chitwan 1973 — first; Shey-Phoksundo largest), wildlife reserves (Koshi Tappu — arna), conservation areas (Annapurna ACAP), the Dhorpatan hunting reserve, and Ramsar wetlands.",
        alt: "In-situ conservation protected area categories in Nepal",
        keyword: "wild water buffalo",
      },
      {
        Component: ExSituMethods,
        caption:
          "Ex-situ conservation methods with Nepali examples: botanical gardens (Godawari), zoos (Central Zoo, Jawalakhel), seed banks (Khumaltar genebank; Svalbard), tissue culture, cryopreservation at −196 °C, captive breeding.",
        alt: "Ex-situ conservation methods botanical gardens zoos seed banks cryopreservation",
        keyword: "cryopreservation",
      },
      {
        Component: InSituVsExSituContrast,
        caption:
          "In-situ vs ex-situ — the master contrast: location, what is conserved (whole ecosystem vs species alone), cost, whether evolution continues, and Nepali examples on each side.",
        alt: "In-situ versus ex-situ conservation comparison table",
        keyword: "outside their habitat",
      },
      {
        Component: SeedBankCryopreservation,
        caption:
          "Seed banks — from field to frozen: collect → dry to low humidity → store in low-temperature vaults (Khumaltar; Svalbard globally) → freeze in liquid nitrogen at −196 °C and revive by germination when needed.",
        alt: "Seed bank flow collect dry store freeze and revive",
        keyword: "seed banks",
      },
      {
        Component: NepalHotspotContext,
        caption:
          "Why Nepal needs both strategies: ~2% of the world's flowering plants, flagship megafauna (tiger, rhino) and Himalaya-hotspot status — while habitat loss, poaching and climate change shift zones beyond fixed borders.",
        alt: "Nepal biodiversity hotspot context for in-situ and ex-situ conservation",
        keyword: "biodiversity hotspot",
      },
    ],
  },
  "natural-environment-vegetation-and-human-activities": {
    title: "Natural environment — vegetation and human activities",
    figures: [
      {
        Component: ForestEcosystemServices,
        caption:
          "What forests give: provisioning (timber, fuelwood, fodder, medicinal herbs like yarsagumba and chiraito), regulating (watershed protection, spring recharge, flood control, carbon storage), supporting and cultural services.",
        alt: "Forest ecosystem services provisioning regulating supporting cultural",
        keyword: "watershed protection",
      },
      {
        Component: VegetationDamageActivities,
        caption:
          "Human activities that damage vegetation: deforestation for agriculture and settlement (khoriya), overgrazing, fuelwood harvest, illegal logging of sal and khair, roads, fire, and invasives — Mikania, lantana, water hyacinth.",
        alt: "Human activities that damage vegetation deforestation overgrazing logging invasives",
        keyword: "slash-and-burn",
      },
      {
        Component: DeforestationConsequences,
        caption:
          "When the forest goes: tree loss → erosion and landslides on fragile slopes, springs dry → siltation of rivers and hydropower reservoirs → biodiversity loss (habitat specialists first), plus local climate drying and carbon release.",
        alt: "Deforestation consequence chain erosion landslides siltation biodiversity loss",
        keyword: "springs drying",
      },
      {
        Component: ForestCoverRecovery,
        caption:
          "Nepal's forest cover fell from ~35% (1960s) to under 30% (1990s), then recovered to ~45% (2010s) — driven by community forestry: over 22,000 CFUGs managing ~2.3 million hectares.",
        alt: "Nepal forest cover recovery curve 35 percent to 45 percent",
        keyword: "community forestry",
      },
      {
        Component: CommunityForestryRoles,
        caption:
          "Community forestry (1993 Forest Act): the government hands management to Community Forest User Groups — protection and regeneration, regulated use, income for reinvestment, local stewardship, equity and women's participation.",
        alt: "Community forestry CFUG five roles Nepal",
        keyword: "Community Forest User Groups",
      },
    ],
  },
  // ── Mathematics ──────────────────────────────────────────────────────────
  "geometric-interpretation-tangent-and-normal": {
    title: "Tangent and normal to a curve",
    figures: [
      {
        Component: DerivativeTangentLine,
        caption:
          "The derivative at P is the slope of the tangent; the normal is perpendicular to it (product of slopes = −1).",
        alt: "Curve with a tangent line touching at point P and a normal line perpendicular to it",
        keyword: "tangent",
      },
    ],
  },
};

/**
 * Look up figures for a topic. Exact slug match only — never fuzzy, so a
 * typo'd or renamed slug can never put the wrong diagram on a page.
 */
export function getTopicFigures(topicSlug: string): TopicFiguresEntry | undefined {
  return REGISTRY[topicSlug];
}

/** All registered slugs (for tests and tooling). */
export function registeredFigureSlugs(): string[] {
  return Object.keys(REGISTRY);
}
