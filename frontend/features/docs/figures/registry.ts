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

import { EqRatesCross } from "./eq-rates-cross";
import { PhysicalVsChemicalEq } from "./physical-vs-chemical-eq";
import { TracerDynamismProof } from "./tracer-dynamism-proof";
import { EitherSideArrival } from "./either-side-arrival";
import { CatalystNoShift } from "./catalyst-no-shift";
import { ClosedVsOpenVessel } from "./closed-vs-open-vessel";
import { EqCharacteristicsPanel } from "./eq-characteristics-panel";
import { ActiveMassAnatomy } from "./active-mass-anatomy";
import { MassActionStatement } from "./mass-action-statement";
import { KcDerivationSteps } from "./kc-derivation-steps";
import { ExpressionGalleryEq } from "./expression-gallery-eq";
import { SolidsOmittedRule } from "./solids-omitted-rule";
import { FlipScaleRules } from "./flip-scale-rules";
import { KcUnitsLadder } from "./kc-units-ladder";
import { KcSizeLadder } from "./kc-size-ladder";
import { QcDirectionCompass } from "./qc-direction-compass";
import { Nh3KcNumerical } from "./nh3-kc-numerical";
import { KcImportanceMap } from "./kc-importance-map";
import { IceTableSteps } from "./ice-table-steps";
import { DgKcBridge } from "./dg-kc-bridge";
import { KcTemperatureRule } from "./kc-temperature-rule";
import { KpExpressionAnatomy } from "./kp-expression-anatomy";
import { PartialPressureIdea } from "./partial-pressure-idea";
import { BridgeDerivationFlow } from "./bridge-derivation-flow";
import { DnSignTable } from "./dn-sign-table";
import { KpKcEqualityCases } from "./kp-kc-equality-cases";
import { KpConversionDrill } from "./kp-conversion-drill";
import { KpUnitsPanel } from "./kp-units-panel";
import { LeChatelierStatement } from "./le-chatelier-statement";
import { ConcentrationShiftMap } from "./concentration-shift-map";
import { PressureMoleCount } from "./pressure-mole-count";
import { TemperatureHeatSide } from "./temperature-heat-side";
import { HaberConditionsPanel } from "./haber-conditions-panel";
import { ContactProcessPanel } from "./contact-process-panel";
import { N2o4ColorThermometer } from "./n2o4-color-thermometer";
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
import { MastigophoraFlagella } from "./mastigophora-flagella";
import { CiliophoraCiliaRows } from "./ciliophora-cilia-rows";
import { SporozoaNoLocomotion } from "./sporozoa-no-locomotion";
import { TrypanosomaProfile } from "./trypanosoma-profile";
import { OsmoregulationContractileVacuole } from "./osmoregulation-contractile-vacuole";
import { EncystmentSurvival } from "./encystment-survival";
import { ProtozoaHabitatsWater } from "./protozoa-habitats-water";
import { ParameciumConjugation } from "./paramecium-conjugation";
import { ParameciumFeedingCurrent } from "./paramecium-feeding-current";
import { PlasmodiumLiverPhase } from "./plasmodium-liver-phase";
import { AnophelesVectorIdentity } from "./anopheles-vector-identity";
import { ParameciumDualVacuoles } from "./paramecium-dual-vacuoles";
import { PlasmodiumGametocyteExit } from "./plasmodium-gametocyte-exit";
import { ParameciumTrichocystDefence } from "./paramecium-trichocyst-defence";
import { MalariaGeographyBurden } from "./malaria-geography-burden";
import { CerebralMalariaMechanism } from "./cerebral-malaria-mechanism";
import { MalariaDrugResistance } from "./malaria-drug-resistance";
import { InsecticideTreatedNets } from "./insecticide-treated-nets";
import { AnaemiaMalariaMechanism } from "./anaemia-malaria-mechanism";
import { BlackwaterFeverMechanism } from "./blackwater-fever-mechanism";
import { MalariaVaccineProgress } from "./malaria-vaccine-progress";
import { CoelomEvolutionAdvantage } from "./coelom-evolution-advantage";
import { ProtostomeDeuterostomeSplit } from "./protostome-deuterostome-split";
import { SymmetrySurvivalValue } from "./symmetry-survival-value";
import { SegmentationAdvantages } from "./segmentation-advantages";
import { DiploblasticTriploblasticJobs } from "./diploblastic-triploblastic-jobs";
import { BodyPlanClassificationFlow } from "./body-plan-classification-flow";
import { PseudocoelomRoundwormNiche } from "./pseudocoelom-roundworm-niche";
import { PoriferaSkeletonSpicules } from "./porifera-skeleton-spicules";
import { PlatyhelminthesFlatBody } from "./platyhelminthes-flat-body";
import { ArthropodaAppendageMechanics } from "./arthropoda-appendage-mechanics";
import { MolluscaBodyPlanTrio } from "./mollusca-body-plan-trio";
import { EchinodermataWaterVascular } from "./echinodermata-water-vascular";
import { ChordataFourMarks } from "./chordata-four-marks";
import { NematodaParasitesRound } from "./nematoda-parasites-round";
import { EarthwormBodyWallLayers } from "./earthworm-body-wall-layers";
import { EarthwormGizzardGrinding } from "./earthworm-gizzard-grinding";
import { EarthwormTyphlosoleAbsorption } from "./earthworm-typhlosole-absorption";
import { EarthwormCutaneousRespiration } from "./earthworm-cutaneous-respiration";
import { EarthwormClosedCirculation } from "./earthworm-closed-circulation";
import { EarthwormHumicAcidCalciferous } from "./earthworm-humic-acid-calciferous";
import { EarthwormHydrostaticSkeleton } from "./earthworm-hydrostatic-skeleton";
import { NephridiumFilterCycle } from "./nephridium-filter-cycle";
import { EnteronephricWaterSaving } from "./enteronephric-water-saving";
import { EarthwormBrainLadder } from "./earthworm-brain-ladder";
import { SeptalNephridiaNumbers } from "./septal-nephridia-numbers";
import { EarthwormReflexSegment } from "./earthworm-reflex-segment";
import { EarthwormSensesPhotoreceptors } from "./earthworm-senses-photoreceptors";
import { EarthwormSegmentMap } from "./earthworm-segment-map";
import { EarthwormHermaphroditeTradeoff } from "./earthworm-hermaphrodite-tradeoff";
import { EarthwormCopulationPositions } from "./earthworm-copulation-positions";
import { EarthwormCocoonFormation } from "./earthworm-cocoon-formation";
import { EarthwormRegenerationHalves } from "./earthworm-regeneration-halves";
import { EarthwormReproductivePores } from "./earthworm-reproductive-pores";
import { EarthwormJuvenileAdultGrowth } from "./earthworm-juvenile-adult-growth";
import { EarthwormSeminalVesicleMaturation } from "./earthworm-seminal-vesicle-maturation";
import { FrogMonsoonBreeding } from "./frog-monsoon-breeding";
import { FrogWebbedFeetPhysics } from "./frog-webbed-feet-physics";
import { FrogTeethGripOnly } from "./frog-teeth-grip-only";
import { FrogStomachAcidChemistry } from "./frog-stomach-acid-chemistry";
import { FrogDuodenumIleumLength } from "./frog-duodenum-ileum-length";
import { FrogCloacaJunction } from "./frog-cloaca-junction";
import { FrogCroakVocalSacs } from "./frog-croak-vocal-sacs";
import { FrogHibernationWinterMud } from "./frog-hibernation-winter-mud";
import { FrogTympanumEardrum } from "./frog-tympanum-eardrum";
import { FrogBinocularVision } from "./frog-binocular-vision";
import { FrogSkinMucusGlands } from "./frog-skin-mucus-glands";
import { FrogHeartDoubleCirculation } from "./frog-heart-double-circulation";
import { FrogPortalSystems } from "./frog-portal-systems";
import { FrogSpleenLymphHearts } from "./frog-spleen-lymph-hearts";
import { FrogRespirationThreeModesShare } from "./frog-respiration-three-modes-share";
import { FrogBuccalPumpMechanism } from "./frog-buccal-pump-mechanism";
import { FrogCutaneousUnderwater } from "./frog-cutaneous-underwater";
import { FrogSinusVenosusPacemaker } from "./frog-sinus-venosus-pacemaker";
import { PulmocutaneousArch } from "./pulmocutaneous-arch";
import { FrogBuccopharyngealBreathing } from "./frog-buccopharyngeal-breathing";
import { FrogSkinWaterDrinkingPatch } from "./frog-skin-water-drinking-patch";
import { FrogSpermPathwayMale } from "./frog-sperm-pathway-male";
import { FrogOvarySeasonalCycle } from "./frog-ovary-seasonal-cycle";
import { FrogEggJellyLayers } from "./frog-egg-jelly-layers";
import { FrogAmplexusMechanics } from "./frog-amplexus-mechanics";
import { FrogSexualDimorphismFeatures } from "./frog-sexual-dimorphism-features";
import { FrogTadpoleGillsToLungs } from "./frog-tadpole-gills-to-lungs";
import { FrogMetamorphosisHormonalTrigger } from "./frog-metamorphosis-hormonal-trigger";
import { FrogDevelopmentSpeedFactors } from "./frog-development-speed-factors";
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
import { MutualismCaseStudies } from "./mutualism-case-studies";
import { CommensalismExamples } from "./commensalism-examples";
import { PredationArmsRace } from "./predation-arms-race";
import { CompetitionOverlap } from "./competition-overlap";
import { ParasitismHostTypes } from "./parasitism-host-types";
import { AbioticFactorDials } from "./abiotic-factor-dials";
import { EcologyLevelsLadder } from "./ecology-levels-ladder";
import { FoodChainTypes } from "./food-chain-types";
import { EcologicalPyramidsThree } from "./ecological-pyramids-three";
import { InvertedPyramidsWhy } from "./inverted-pyramids-why";
import { TenPercentLawSteps } from "./ten-percent-law-steps";
import { GppNppEquation } from "./gpp-npp-equation";
import { TrophicLevelPositions } from "./trophic-level-positions";
import { FoodWebComplexity } from "./food-web-complexity";
import { PondFunctionalGroups } from "./pond-functional-groups";
import { EcosystemStructureFunction } from "./ecosystem-structure-function";
import { PondZonationDetail } from "./pond-zonation-detail";
import { DecomposerRoleCycle } from "./decomposer-role-cycle";
import { PondFoodWeb } from "./pond-food-web";
import { EcosystemHomeostasis } from "./ecosystem-homeostasis";
import { PondForestContrast } from "./pond-forest-contrast";
import { CarbonCycleHumanWarp } from "./carbon-cycle-human-warp";
import { NitrogenFixationRoutes } from "./nitrogen-fixation-routes";
import { XerosereStages } from "./xerosere-stages";
import { ClimaxCommunityTraits } from "./climax-community-traits";
import { DenitrificationLoopClosure } from "./denitrification-loop-closure";
import { SuccessionDirectionRules } from "./succession-direction-rules";
import { HydrarchSuccession } from "./hydrarch-succession";
import { CamPhotosynthesisNight } from "./cam-photosynthesis-night";
import { HydrophyteInternalAnatomy } from "./hydrophyte-internal-anatomy";
import { XerophyteRootLeafTrade } from "./xerophyte-root-leaf-trade";
import { HalophyteMangroveKit } from "./halophyte-mangrove-kit";
import { AnimalWaterSavingKit } from "./animal-water-saving-kit";
import { AdaptationCompromise } from "./adaptation-compromise";
import { MesophyteMiddlePath } from "./mesophyte-middle-path";
import { GreenhouseGasSources } from "./greenhouse-gas-sources";
import { MontrealProtocolSuccess } from "./montreal-protocol-success";
import { AcidRainPhScale } from "./acid-rain-ph-scale";
import { UvPenetrationComparison } from "./uv-penetration-comparison";
import { MitigationAdaptationPair } from "./mitigation-adaptation-pair";
import { ImbalanceChainReaction } from "./imbalance-chain-reaction";
import { OzoneVsGreenhouse } from "./ozone-vs-greenhouse";
import { SalTreeProfile } from "./sal-tree-profile";
import { ChirPineBelt } from "./chir-pine-belt";
import { RhododendronTemperateBelt } from "./rhododendron-temperate-belt";
import { AlpineNivalLife } from "./alpine-nival-life";
import { VegetationTypesSummary } from "./vegetation-types-summary";
import { EastWestGradient } from "./east-west-gradient";
import { WetlandAquaticVegetation } from "./wetland-aquatic-vegetation";
import { VegetationZoneConservation } from "./vegetation-zone-conservation";
import { ProtectedAreaCategories } from "./protected-area-categories";
import { BotanicalGardenRole } from "./botanical-garden-role";
import { ZooCaptiveBreeding } from "./zoo-captive-breeding";
import { GeneBankTissueCulture } from "./gene-bank-tissue-culture";
import { ConservationDecisionTree } from "./conservation-decision-tree";
import { BufferZoneBenefits } from "./buffer-zone-benefits";
import { ConservationSuccessNumbers } from "./conservation-success-numbers";
import { FuelwoodFodderBalance } from "./fuelwood-fodder-balance";
import { MedicinalHerbEconomy } from "./medicinal-herb-economy";
import { LandslideErosionLink } from "./landslide-erosion-link";
import { InvasiveSpeciesThreat } from "./invasive-species-threat";
import { KhoriyaShiftingCycle } from "./khoriya-shifting-cycle";
import { OvergrazingSpiral } from "./overgrazing-spiral";
import { HumanVegetationRelationships } from "./human-vegetation-relationships";
import { BranchTreeDivisions } from "./branch-tree-divisions";
import { MolecularToOrganismBranches } from "./molecular-to-organism-branches";
import { SpecialistBranchCareers } from "./specialist-branch-careers";
import { BiologyTodayFrontiers } from "./biology-today-frontiers";
import { LocalBranchExamples } from "./local-branch-examples";
import { AppliedFieldsTriple } from "./applied-fields-triple";
import { ZoologyBotanySplit } from "./zoology-botany-split";
import { ChemistryBiologyLink } from "./chemistry-biology-link";
import { PhysicsBiologyLink } from "./physics-biology-link";
import { MathsBiologyLink } from "./maths-biology-link";
import { GeographySocietyLinks } from "./geography-society-links";
import { InterdisciplinaryMap } from "./interdisciplinary-map";
import { ControlGroupDesign } from "./control-group-design";
import { HypothesisTheoryLadder } from "./hypothesis-theory-ladder";
import { RNAWorldHypothesis } from "./rna-world-hypothesis";
import { CoacervateProtobiont } from "./coacervate-protobiont";
import { AminoAcidYieldChart } from "./amino-acid-yield-chart";
import { EnergySourcesEarlyEarth } from "./energy-sources-early-earth";
import { AnaerobicFirstCells } from "./anaerobic-first-cells";
import { ReducingAtmosphereChemistry } from "./reducing-atmosphere-chemistry";
import { AbiogenesisBiogenesisContrast } from "./abiogenesis-biogenesis-contrast";
import { ArchaeopteryxMosaic } from "./archaeopteryx-mosaic";
import { ConnectingLinksTrio } from "./connecting-links-trio";
import { DivergentVsConvergent } from "./divergent-vs-convergent";
import { FossilDatingLayers } from "./fossil-dating-layers";
import { EmbryologyEvidenceStages } from "./embryology-evidence-stages";
import { BiochemicalMolecularTests } from "./biochemical-molecular-tests";
import { PaleontologyStrataStory } from "./paleontology-strata-story";
import { DarwinVoyageBeagle } from "./darwin-voyage-beagle";
import { StruggleForExistence } from "./struggle-for-existence";
import { OverproductionMath } from "./overproduction-math";
import { NaturalSelectionSteps } from "./natural-selection-steps";
import { MutationVariationSources } from "./mutation-variation-sources";
import { IsolationGeneFlowBarriers } from "./isolation-gene-flow-barriers";
import { SpeciationSteps } from "./speciation-steps";
import { AustralopithecusLucy } from "./australopithecus-lucy";
import { HomoHabilisTools } from "./homo-habilis-tools";
import { HomoErectusFire } from "./homo-erectus-fire";
import { NeanderthalProfile } from "./neanderthal-profile";
import { CroMagnonArt } from "./cro-magnon-art";
import { HominidTimelineDates } from "./hominid-timeline-dates";
import { ManKingdomTraits } from "./man-kingdom-traits";
import { PrehensileTailDemo } from "./prehensile-tail-demo";
import { NostrilSeptumZoom } from "./nostril-septum-zoom";
import { CheekPouchIschial } from "./cheek-pouch-ischial";
import { GibbonBrachiation } from "./gibbon-brachiation";
import { BaboonGroundLife } from "./baboon-ground-life";
import { MonkeyApeThumbGrip } from "./monkey-ape-thumb-grip";
import { PrimateGradeLadder } from "./primate-grade-ladder";
import { SavannaPressure } from "./savanna-pressure";
import { BipedalSkeletonCompare } from "./bipedal-skeleton-compare";
import { HomoErectusSpread } from "./homo-erectus-spread";
import { NeanderthalBurial } from "./neanderthal-burial";
import { NeolithicFarmingShift } from "./neolithic-farming-shift";
import { LanguageBrainCircuit } from "./language-brain-circuit";
import { HomoSapiensIdentity } from "./homo-sapiens-identity";
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
import { AcidRainBuildings } from "./acid-rain-buildings";
import { AcidRainDamagePath } from "./acid-rain-damage-path";
import { AcidRainFormationChemistry } from "./acid-rain-formation-chemistry";
import { AgeingPopulationJapan } from "./ageing-population-japan";
import { AirQualityIndexReading } from "./air-quality-index-reading";
import { AlcoholLiverDamageStages } from "./alcohol-liver-damage-stages";
import { AlcoholProhibitionLessons } from "./alcohol-prohibition-lessons";
import { AlienInvasionPathways } from "./alien-invasion-pathways";
import { AllergyMechanism } from "./allergy-mechanism";
import { AmniocentesisChromosomeTest } from "./amniocentesis-chromosome-test";
import { AmniocentesisEthics } from "./amniocentesis-ethics";
import { AnaemiaIronDeficiency } from "./anaemia-iron-deficiency";
import { AntibioticMechanismTargets } from "./antibiotic-mechanism-targets";
import { AntibioticOveruseLivestock } from "./antibiotic-overuse-livestock";
import { AntibioticResistanceFarms } from "./antibiotic-resistance-farms";
import { AntibodyStructureYShape } from "./antibody-structure-y-shape";
import { AntimicrobialResistanceTimeline } from "./antimicrobial-resistance-timeline";
import { ArborealGrippingAdaptations } from "./arboreal-gripping-adaptations";
import { BalancedDietPlate } from "./balanced-diet-plate";
import { BioaccumulationTrophicLadder } from "./bioaccumulation-trophic-ladder";
import { BioaccumulationVsBiodegradation } from "./bioaccumulation-vs-biodegradation";
import { BiodiversityHotspotsMap } from "./biodiversity-hotspots-map";
import { BiodiversityLevelsTrio } from "./biodiversity-levels-trio";
import { BiodiversityValueLedger } from "./biodiversity-value-ledger";
import { BiogasPlantCycle } from "./biogas-plant-cycle";
import { BiogasPlantNepalNumbers } from "./biogas-plant-nepal-numbers";
import { BiologicalControlCaseStudies } from "./biological-control-case-studies";
import { BirdMigrationNavigation } from "./bird-migration-navigation";
import { BloodDonationCycle } from "./blood-donation-cycle";
import { BloodDonationProcess } from "./blood-donation-process";
import { BloodGroupsCompatibility } from "./blood-groups-compatibility";
import { BloodPressureReadingsChart } from "./blood-pressure-readings-chart";
import { BufferZoneCommunityForestry } from "./buffer-zone-community-forestry";
import { CancerCausesPrevention } from "./cancer-causes-prevention";
import { CancerHallmarks } from "./cancer-hallmarks";
import { CarbamatePyrethroidContrast } from "./carbamate-pyrethroid-contrast";
import { CarbonCycleReservoirsFluxes } from "./carbon-cycle-reservoirs-fluxes";
import { CarbonFootprintReductionActions } from "./carbon-footprint-reduction-actions";
import { CaseinProteinSources } from "./casein-protein-sources";
import { CholeraPandemicHistory } from "./cholera-pandemic-history";
import { CircularEconomyModel } from "./circular-economy-model";
import { CITESAppendicesDetail } from "./cites-appendices-detail";
import { ClimateChangeStrategies } from "./climate-change-strategies";
import { ClimateRefugeeDisplacement } from "./climate-refugee-displacement";
import { CloningEthicsDebate } from "./cloning-ethics-debate";
import { ColourBlindnessTest } from "./colour-blindness-test";
import { CommunicableVsNonCommunicable } from "./communicable-vs-non-communicable";
import { CommunityHealthWorkers } from "./community-health-workers";
import { CompostingProcessStages } from "./composting-process-stages";
import { ConservationStrategiesPair } from "./conservation-strategies-pair";
import { CrisprMechanismSteps } from "./crispr-mechanism-steps";
import { CursorialSpeedAdaptations } from "./cursorial-speed-adaptations";
import { DemographicTransitionModel } from "./demographic-transition-model";
import { DemographicTransitionModelStages } from "./demographic-transition-model-stages";
import { DengueVectorControl } from "./dengue-vector-control";
import { DesertWaterEconomy } from "./desert-water-economy";
import { DiabetesInsulinMechanism } from "./diabetes-insulin-mechanism";
import { DiabetesTypesContrast } from "./diabetes-types-contrast";
import { DominanceHierarchyPayoffs } from "./dominance-hierarchy-payoffs";
import { DownSyndromeTrisomy21 } from "./down-syndrome-trisomy-21";
import { DrugAbuseTypesChart } from "./drug-abuse-types-chart";
import { DrugAddictionRewardLoop } from "./drug-addiction-reward-loop";
import { EWasteCompositionHazards } from "./e-waste-composition-hazards";
import { EWasteHeavyMetalFlow } from "./e-waste-heavy-metal-flow";
import { EarthOvershootDay } from "./earth-overshoot-day";
import { EarthwormCastingsVermicompost } from "./earthworm-castings-vermicompost";
import { EcologicalFootprintCalculation } from "./ecological-footprint-calculation";
import { EcologicalFootprintComponents } from "./ecological-footprint-components";
import { EcosystemServicesCategories } from "./ecosystem-services-categories";
import { EcotourismProsCons } from "./ecotourism-pros-cons";
import { EcotourismRevenueLoop } from "./ecotourism-revenue-loop";
import { EndemicNepalSpecies } from "./endemic-nepal-species";
import { EnergyConsumptionLadder } from "./energy-consumption-ladder";
import { EnergyLadderDevelopment } from "./energy-ladder-development";
import { EnvironmentalEthicsWorldviews } from "./environmental-ethics-worldviews";
import { EnvironmentalImpactAssessmentSteps } from "./environmental-impact-assessment-steps";
import { EnvironmentalLegislationNepal } from "./environmental-legislation-nepal";
import { EutrophicationAlgalCycle } from "./eutrophication-algal-cycle";
import { ExtinctionDebtCascade } from "./extinction-debt-cascade";
import { FirstAidABCPriorities } from "./first-aid-abc-priorities";
import { FishMigrationReasons } from "./fish-migration-reasons";
import { FlagshipUmbrellaSpecies } from "./flagship-umbrella-species";
import { FoodAdulterationExamples } from "./food-adulteration-examples";
import { FoodSecurityFourPillars } from "./food-security-four-pillars";
import { ForestResourcesPressure } from "./forest-resources-pressure";
import { FossilFuelFormationTimescales } from "./fossil-fuel-formation-timescales";
import { FossorialDiggingToolkit } from "./fossorial-digging-toolkit";
import { FrogParentalCareAbsence } from "./frog-parental-care-absence";
import { GeneTherapyConcept } from "./gene-therapy-concept";
import { GeneticCounsellingSession } from "./genetic-counselling-session";
import { GeneticEngineeringInsulin } from "./genetic-engineering-insulin";
import { GeneticEngineeringStepsDetail } from "./genetic-engineering-steps-detail";
import { GillBreathingWater } from "./gill-breathing-water";
import { GlofMechanism } from "./glof-mechanism";
import { GmoDebateVerdicts } from "./gmo-debate-verdicts";
import { GoitreIodineDeficiency } from "./goitre-iodine-deficiency";
import { GreenAccountingGdpCritique } from "./green-accounting-gdp-critique";
import { GreenRevolutionImpacts } from "./green-revolution-impacts";
import { GreenRevolutionTradeoffs } from "./green-revolution-tradeoffs";
import { GreenhouseEffectMechanism } from "./greenhouse-effect-mechanism";
import { GreenhouseGasLadder } from "./greenhouse-gas-ladder";
import { GreenhouseGasSourcesSectors } from "./greenhouse-gas-sources-sectors";
import { GroundwaterArsenicTerai } from "./groundwater-arsenic-terai";
import { GroundwaterDepletionIndia } from "./groundwater-depletion-india";
import { HaemophiliaInheritance } from "./haemophilia-inheritance";
import { HandwashingCriticalMoments } from "./handwashing-critical-moments";
import { HerbicideCropSelectivity } from "./herbicide-crop-selectivity";
import { HimalayanSpringsDrying } from "./himalayan-springs-drying";
import { HippocraticOathEthics } from "./hippocratic-oath-ethics";
import { HIVTransmissionRoutes } from "./hiv-transmission-routes";
import { HotspotCriteriaMap } from "./hotspot-criteria-map";
import { HumanWildlifeConflictFence } from "./human-wildlife-conflict-fence";
import { HydroelectricDamHowItWorks } from "./hydroelectric-dam-how-it-works";
import { HydropowerNepalPotential } from "./hydropower-nepal-potential";
import { HypertensionSilentKiller } from "./hypertension-silent-killer";
import { ImmunisationScheduleChart } from "./immunisation-schedule-chart";
import { ImmunisationVsVaccination } from "./immunisation-vs-vaccination";
import { ImmunityTypesMap } from "./immunity-types-map";
import { ImprovedCookstovesSmoke } from "./improved-cookstoves-smoke";
import { InvasiveSpeciesNepal } from "./invasive-species-nepal";
import { IPMStepsLadder } from "./ipm-steps-ladder";
import { IvfEthicsSurplusEmbryos } from "./ivf-ethics-surplus-embryos";
import { IVFStepsTimeline } from "./ivf-steps-timeline";
import { KathmanduValleyAirQuality } from "./kathmandu-valley-air-quality";
import { KidneyDialysisMachine } from "./kidney-dialysis-machine";
import { KoshiTappuProfile } from "./koshi-tappu-profile";
import { KwashiorkorMarasmusContrast } from "./kwashiorkor-marasmus-contrast";
import { LandResourcesDegradation } from "./land-resources-degradation";
import { LandslideCausesNepalMonsoon } from "./landslide-causes-nepal-monsoon";
import { LatrineTypesSanitationLadder } from "./latrine-types-sanitation-ladder";
import { LeadPoisoningSources } from "./lead-poisoning-sources";
import { LeadershipWolfPack } from "./leadership-wolf-pack";
import { LearnedBehaviourStages } from "./learned-behaviour-stages";
import { MalariaControlNepalProgress } from "./malaria-control-nepal-progress";
import { MendelDihybridRatioDetail } from "./mendel-dihybrid-ratio-detail";
import { MentalHealthDepressionMyths } from "./mental-health-depression-myths";
import { MentalHealthStigma } from "./mental-health-stigma";
import { MigrationPushPullModel } from "./migration-push-pull-model";
import { MineralResourcesExtraction } from "./mineral-resources-extraction";
import { MriCtXrayUltrasoundComparison } from "./mri-ct-xray-ultrasound-comparison";
import { NationalParksHistoryNepal } from "./national-parks-history-nepal";
import { NationalParksListNepal } from "./national-parks-list-nepal";
import { NeonicotinoidPollinatorRisk } from "./neonicotinoid-pollinator-risk";
import { NepalRedListExamples } from "./nepal-red-list-examples";
import { NitrogenCycleHumanDisruption } from "./nitrogen-cycle-human-disruption";
import { NoisePollutionDbScale } from "./noise-pollution-db-scale";
import { NoiseThermalPollution } from "./noise-thermal-pollution";
import { NuclearEnergyProsCons } from "./nuclear-energy-pros-cons";
import { NuclearFissionReactor } from "./nuclear-fission-reactor";
import { NutritionAdolescenceNeeds } from "./nutrition-adolescence-needs";
import { ObesityBmiEpidemic } from "./obesity-bmi-epidemic";
import { OneHealthApproach } from "./one-health-approach";
import { OrganDonationTransplantImmunologyDetail } from "./organ-donation-transplant-immunology-detail";
import { OrganTransplantImmunology } from "./organ-transplant-immunology";
import { OrganicFarmingPrinciples } from "./organic-farming-principles";
import { OrganicFarmingPrinciplesDetail } from "./organic-farming-principles-detail";
import { OrganochlorinePersistence } from "./organochlorine-persistence";
import { OrganophosphateNerveBlock } from "./organophosphate-nerve-block";
import { OverexploitationBushmeat } from "./overexploitation-bushmeat";
import { OzoneDepletionChemistry } from "./ozone-depletion-chemistry";
import { OzoneHoleDiscovery } from "./ozone-hole-discovery";
import { OzoneProtectionSuccess } from "./ozone-protection-success";
import { PacemakersDefibrillators } from "./pacemakers-defibrillators";
import { ParkCategoriesCompare } from "./park-categories-compare";
import { ParksVsCommunityForests } from "./parks-vs-community-forests";
import { ParticulateMatterSizes } from "./particulate-matter-sizes";
import { PesticideLabelSafety } from "./pesticide-label-safety";
import { PesticidePoisoningFirstAid } from "./pesticide-poisoning-first-aid";
import { PesticideResidueWashing } from "./pesticide-residue-washing";
import { PesticideVsBiopesticide } from "./pesticide-vs-biopesticide";
import { PoachingEconomics } from "./poaching-economics";
import { PollinationServicesBees } from "./pollination-services-bees";
import { PopulationEcologyGrowthModels } from "./population-ecology-growth-models";
import { PopulationGrowthCurvesDetail } from "./population-growth-curves-detail";
import { PopulationGrowthCurvesShapes } from "./population-growth-curves-shapes";
import { PopulationMomentum } from "./population-momentum";
import { PopulationPyramidStages } from "./population-pyramid-stages";
import { RachelCarsonSilentSpring } from "./rachel-carson-silent-spring";
import { RadioactiveWasteDecayChain } from "./radioactive-waste-decay-chain";
import { ReddPlusMechanism } from "./redd-plus-mechanism";
import { ReflexArcSpeedMath } from "./reflex-arc-speed-math";
import { ReflexVsInstinctLayers } from "./reflex-vs-instinct-layers";
import { RemittanceEconomyNepal } from "./remittance-economy-nepal";
import { RenewableSourcesComparison } from "./renewable-sources-comparison";
import { ResistanceEvolutionSpray } from "./resistance-evolution-spray";
import { ResourceScarcityConflicts } from "./resource-scarcity-conflicts";
import { RhesusFactorPregnancy } from "./rhesus-factor-pregnancy";
import { RhinoTranslocationSuccess } from "./rhino-translocation-success";
import { RoadSafetyStatistics } from "./road-safety-statistics";
import { SafeDrinkingWaterMethods } from "./safe-drinking-water-methods";
import { SanitationToiletTypes } from "./sanitation-toilet-types";
import { ScurvyRicketsDeficiency } from "./scurvy-rickets-deficiency";
import { SeaLevelRiseMechanism } from "./sea-level-rise-mechanism";
import { SewageTreatmentStagesDetail } from "./sewage-treatment-stages-detail";
import { SewageTreatmentThreeStages } from "./sewage-treatment-three-stages";
import { SexDeterminationMechanism } from "./sex-determination-mechanism";
import { SexRatioSkewCauses } from "./sex-ratio-skew-causes";
import { SickleCellMalariaBalance } from "./sickle-cell-malaria-balance";
import { SlumsUrbanisationChallenge } from "./slums-urbanisation-challenge";
import { SmogFormationChemistry } from "./smog-formation-chemistry";
import { SmokingCessationSteps } from "./smoking-cessation-steps";
import { SmokingOrganDamageMap } from "./smoking-organ-damage-map";
import { SnakebiteFirstAidProtocol } from "./snakebite-first-aid-protocol";
import { SoilPollutionRemediation } from "./soil-pollution-remediation";
import { SolarHomeSystemsNepal } from "./solar-home-systems-nepal";
import { SolarPvHowItWorks } from "./solar-pv-how-it-works";
import { SolidWasteHierarchy } from "./solid-waste-hierarchy";
import { SolidWasteSegregationBins } from "./solid-waste-segregation-bins";
import { SpaceScienceApplications } from "./space-science-applications";
import { SpaceScienceSpinoffs } from "./space-science-spinoffs";
import { SpeciesAreaRule } from "./species-area-rule";
import { SpeciesReintroductionPrograms } from "./species-reintroduction-programs";
import { StemCellsTypesPotency } from "./stem-cells-types-potency";
import { StreamlinedDragReduction } from "./streamlined-drag-reduction";
import { StressResponseBiology } from "./stress-response-biology";
import { SustainableDevelopmentGoals } from "./sustainable-development-goals";
import { SwimBladderBuoyancy } from "./swim-bladder-buoyancy";
import { TaxesKinesisContrast } from "./taxes-kinesis-contrast";
import { TelemedicineRuralAccess } from "./telemedicine-rural-access";
import { TestTubeBabyMilestones } from "./test-tube-baby-milestones";
import { TestTubeBabyMilestonesDetail } from "./test-tube-baby-milestones-detail";
import { ThalassemiaInheritance } from "./thalassemia-inheritance";
import { ThreatAssessmentCriteria } from "./threat-assessment-criteria";
import { TissueCultureMicropropagation } from "./tissue-culture-micropropagation";
import { TissueCultureSteps } from "./tissue-culture-steps";
import { TrophicCascadeWolvesYellowstone } from "./trophic-cascade-wolves-yellowstone";
import { TuberculosisTransmissionCycle } from "./tuberculosis-transmission-cycle";
import { TyphoidFeverTransmission } from "./typhoid-fever-transmission";
import { UrbanAirPollutionSourcesKathmandu } from "./urban-air-pollution-sources-kathmandu";
import { UrbanisationCausesConsequences } from "./urbanisation-causes-consequences";
import { UrbanisationPressurePoints } from "./urbanisation-pressure-points";
import { VaccineColdChain } from "./vaccine-cold-chain";
import { VaccineHesitancyInfodemic } from "./vaccine-hesitancy-infodemic";
import { VaccineTypesChart } from "./vaccine-types-chart";
import { VitaminANightBlindness } from "./vitamin-a-night-blindness";
import { VolantFlightAdaptations } from "./volant-flight-adaptations";
import { VultureDiclofenacCrash } from "./vulture-diclofenac-crash";
import { WasteToEnergyOptions } from "./waste-to-energy-options";
import { WaterBorneWaterWashed } from "./water-borne-water-washed";
import { WaterPurificationStepsHousehold } from "./water-purification-steps-household";
import { WaterQualityParameters } from "./water-quality-parameters";
import { WaterResourcesStress } from "./water-resources-stress";
import { WetlandEcosystemServices } from "./wetland-ecosystem-services";
import { WildlifeTradeRoutes } from "./wildlife-trade-routes";
import { WindEnergyTurbines } from "./wind-energy-turbines";
import { WomenEducationFertilityLink } from "./women-education-fertility-link";
import { WormInfectionLifecycle } from "./worm-infection-lifecycle";
import { ZoonoticSpillover } from "./zoonotic-spillover";
import { HydrogenEnergyLevels } from "./hydrogen-energy-levels";
import { BalmerVisibleLines } from "./balmer-visible-lines";
import { Neb2022HydrogenSolution } from "./neb2022-hydrogen-solution";
import { EmissionVsAbsorption } from "./emission-vs-absorption";
import { SeriesLimitDiagram } from "./series-limit-diagram";
import { BohrDefectsMap } from "./bohr-defects-map";
import { FineStructureSplit } from "./fine-structure-split";
import { ZeemanStarkContrast } from "./zeeman-stark-contrast";
import { OrbitVsOrbitalDefect } from "./orbit-vs-orbital-defect";
import { BohrSurvivors } from "./bohr-survivors";
import { DeBroglieRelation } from "./de-broglie-relation";
import { StandingWaveOrbit } from "./standing-wave-orbit";
import { DavissonGermerApparatus } from "./davisson-germer-apparatus";
import { DualNaturePanel } from "./dual-nature-panel";
import { ElectronVsBallWavelength } from "./electron-vs-ball-wavelength";
import { FourQuantumNumbersMap } from "./four-quantum-numbers-map";
import { SodiumValenceAddress } from "./sodium-valence-address";
import { SubshellCapacityLadder } from "./subshell-capacity-ladder";
import { ImpossibleSetChecker } from "./impossible-set-checker";
import { PauliSpinOrbital } from "./pauli-spin-orbital";
import { AufbauDiagonalRule } from "./aufbau-diagonal-rule";
import { NlRuleComparison } from "./nl-rule-comparison";
import { HundNitrogenDiagram } from "./hund-nitrogen-diagram";
import { CrCuExceptions } from "./cr-cu-exceptions";
import { FeIonRemoval } from "./fe-ion-removal";
import { MendeleevVsModern } from "./mendeleev-vs-modern";
import { TeIAnomaly } from "./te-i-anomaly";
import { LongFormMap } from "./long-form-map";
import { Neb2024Locator } from "./neb2024-locator";
import { PeriodicityCause } from "./periodicity-cause";
import { PeriodSizesChart } from "./period-sizes-chart";
import { FourBlocksMap } from "./four-blocks-map";
import { GroupCountingRules } from "./group-counting-rules";
import { FePositionDrill } from "./fe-position-drill";
import { BlockCharacterPanel } from "./block-character-panel";
import { IupacGroupMapping } from "./iupac-group-mapping";
import { DigitRootNaming } from "./digit-root-naming";
import { EnnRuleCallout } from "./enn-rule-callout";
import { Element118Timeline } from "./element118-timeline";
import { Period7Completion } from "./period7-completion";
import { ZeffEquation } from "./zeff-equation";
import { ShieldingLayers } from "./shielding-layers";
import { NaClZeffContrast } from "./na-cl-zeff-contrast";
import { ZeffTrendArrows } from "./zeff-trend-arrows";
import { SlaterContributions } from "./slater-contributions";
import { TrendDirectionCompass } from "./trend-direction-compass";
import { IrregularityPairPanel } from "./irregularity-pair-panel";
import { IsoelectronicSeriesChart } from "./isoelectronic-series-chart";
import { IeJumpSodium } from "./ie-jump-sodium";
import { IeDipsPanel } from "./ie-dips-panel";
import { RydbergFormulaDrill } from "./rydberg-formula-drill";
import { SeriesWavelengthTable } from "./series-wavelength-table";
import { SommerfeldEllipsePatch } from "./sommerfeld-ellipse-patch";
import { DefectFixMap } from "./defect-fix-map";
import { ElectronMicroscopeLink } from "./electron-microscope-link";
import { ProtonWavelengthDrill } from "./proton-wavelength-drill";
import { SpinQuantumNumberPanel } from "./spin-quantum-number-panel";
import { ShellAddressDrill } from "./shell-address-drill";
import { ExchangeEnergyPanel } from "./exchange-energy-panel";
import { FilledSymmetryPanel } from "./filled-symmetry-panel";
import { EkaPredictionPanel } from "./eka-prediction-panel";
import { MoseleyXrayPanel } from "./moseley-xray-panel";
import { LanthanideActinideRows } from "./lanthanide-actinide-rows";
import { NobleGasPositions } from "./noble-gas-positions";
import { OganessonNaming } from "./oganesson-naming";
import { SymbolNotationRules } from "./symbol-notation-rules";
import { ScreeningVsPenetration } from "./screening-vs-penetration";
import { CoreValenceSplit } from "./core-valence-split";
import { RadiusTypesTrio } from "./radius-types-trio";
import { MetallicCharacterLadder } from "./metallic-character-ladder";
import { BranchesOfChemistryMap } from "./branches-of-chemistry-map";
import { MatterClassificationTree } from "./matter-classification-tree";
import { PureVsMixturePanel } from "./pure-vs-mixture-panel";
import { HomogeneousHeterogeneousContrast } from "./homogeneous-heterogeneous-contrast";
import { ElementCompoundMoleculeTrio } from "./element-compound-molecule-trio";
import { SolutionComponentsPanel } from "./solution-components-panel";
import { ChemistryInDailyLife } from "./chemistry-in-daily-life";
import { ChemistryContributionMap } from "./chemistry-contribution-map";
import { MedicineChemistryPanel } from "./medicine-chemistry-panel";
import { FoodChemistryPanel } from "./food-chemistry-panel";
import { EnergyChemistryPanel } from "./energy-chemistry-panel";
import { EnvironmentDoubleEdge } from "./environment-double-edge";
import { AgricultureChemistryPanel } from "./agriculture-chemistry-panel";
import { DetergentChemistryPanel } from "./detergent-chemistry-panel";
import { AtomMoleculeContrast } from "./atom-molecule-contrast";
import { RadicalTypesPanel } from "./radical-types-panel";
import { AmuScalePanel } from "./amu-scale-panel";
import { EmpiricalVsMolecularFlow } from "./empirical-vs-molecular-flow";
import { RelativeMassLadder } from "./relative-mass-ladder";
import { IonFormationPanel } from "./ion-formation-panel";
import { AvogadroNumberPanel } from "./avogadro-number-panel";
import { PercentCompositionFormula } from "./percent-composition-formula";
import { UreaPercentDrill } from "./urea-percent-drill";
import { MolarMassAssembly } from "./molar-mass-assembly";
import { PercentFromFormulaSteps } from "./percent-from-formula-steps";
import { NitrogenFertilizerDrill } from "./nitrogen-fertilizer-drill";
import { MolePercentBridge } from "./mole-percent-bridge";
import { LimestoneAssayDrill } from "./limestone-assay-drill";
import { DaltonPostulatesLadder } from "./dalton-postulates-ladder";
import { IndivisibleVsModern } from "./indivisible-vs-modern";
import { IsotopeChallengePanel } from "./isotope-challenge-panel";
import { CombineRatioPanel } from "./combine-ratio-panel";
import { DaltonLimitationsTable } from "./dalton-limitations-table";
import { ConservationFromPostulate } from "./conservation-from-postulate";
import { ElectronDiscoveryTimeline } from "./electron-discovery-timeline";
import { FiveLawsMap } from "./five-laws-map";
import { ConservationLavoisierDrill } from "./conservation-lavoisier-drill";
import { DefiniteProportionDrill } from "./definite-proportion-drill";
import { MultipleProportionDrill } from "./multiple-proportion-drill";
import { ReciprocalProportionPanel } from "./reciprocal-proportion-panel";
import { GayLussacVolumePanel } from "./gay-lussac-volume-panel";
import { LawsVsAtomicTheoryLink } from "./laws-vs-atomic-theory-link";
import { AvogadroLawStatement } from "./avogadro-law-statement";
import { VapourDensityDrill } from "./vapour-density-drill";
import { StpMolarVolumePanel } from "./stp-molar-volume-panel";
import { StpVolumeDrill } from "./stp-volume-drill";
import { AvogadroVsDaltonReconcile } from "./avogadro-vs-dalton-reconcile";
import { AvogadroDeductionsLadder } from "./avogadro-deductions-ladder";
import { GasDensityDrill } from "./gas-density-drill";
import { MoleConceptTriangle } from "./mole-concept-triangle";
import { MoleConversionDrill } from "./mole-conversion-drill";
import { ParticleCountPanel } from "./particle-count-panel";
import { MolarMassTablePanel } from "./molar-mass-table-panel";
import { MoleStpVolumePanel } from "./mole-stp-volume-panel";
import { NumberOfParticlesDrill } from "./number-of-particles-drill";
import { GramAtomMoleTerms } from "./gram-atom-mole-terms";
import { ConcentrationUnitsPanel } from "./concentration-units-panel";
import { MolarityDrill } from "./molarity-drill";
import { MolalityVsMolarity } from "./molality-vs-molarity";
import { DilutionFormulaDrill } from "./dilution-formula-drill";
import { NormalityEquivalentsPanel } from "./normality-equivalents-panel";
import { MassPercentDrill } from "./mass-percent-drill";
import { SolutionPrepSteps } from "./solution-prep-steps";
import { LimitingReactantConcept } from "./limiting-reactant-concept";
import { LimitingReactantSteps } from "./limiting-reactant-steps";
import { LimitingReactantDrill } from "./limiting-reactant-drill";
import { ExcessLeftoverPanel } from "./excess-leftover-panel";
import { LimitingReagentRecipeDrill } from "./limiting-reagent-recipe-drill";
import { LimitingVsExcessTable } from "./limiting-vs-excess-table";
import { LimitingReagentStoichiometryFlow } from "./limiting-reagent-stoichiometry-flow";
import { YieldTypesTrio } from "./yield-types-trio";
import { YieldCalculationDrill } from "./yield-calculation-drill";
import { YieldLossCauses } from "./yield-loss-causes";
import { AtomEconomyPanel } from "./atom-economy-panel";
import { TheoreticalYieldLadder } from "./theoretical-yield-ladder";
import { YieldImprovementPanel } from "./yield-improvement-panel";
import { YieldVsAtomEconomy } from "./yield-vs-atom-economy";
import { EmpiricalFormulaSteps } from "./empirical-formula-steps";
import { EmpiricalFormulaDrill } from "./empirical-formula-drill";
import { CombustionAnalysisPanel } from "./combustion-analysis-panel";
import { MolecularFromEmpiricalDrill } from "./molecular-from-empirical-drill";
import { HydrationFormulaDrill } from "./hydration-formula-drill";
import { RatioClearingPanel } from "./ratio-clearing-panel";
import { PercentToFormulaFlow } from "./percent-to-formula-flow";
import { OctetRuleLadder } from "./octet-rule-ladder";
import { ElectronTransferReaction } from "./electron-transfer-reaction";
import { DuetRulePanel } from "./duet-rule-panel";
import { OctetLimitationsPanel } from "./octet-limitations-panel";
import { KosselLewisContrast } from "./kossel-lewis-contrast";
import { ValenceElectronAddress } from "./valence-electron-address";
import { OctetAchievementDrill } from "./octet-achievement-drill";
import { IonicFormationReaction } from "./ionic-formation-reaction";
import { LatticeEnergyPanel } from "./lattice-energy-panel";
import { IonicPropertyTable } from "./ionic-property-table";
import { FajansPolarisationPanel } from "./fajans-polarisation-panel";
import { IonicConductionDrill } from "./ionic-conduction-drill";
import { IonicVsCovalentProperties } from "./ionic-vs-covalent-properties";
import { IonicSolubilityPanel } from "./ionic-solubility-panel";
import { CovalentBondTypes } from "./covalent-bond-types";
import { CoordinateAmmoniumReaction } from "./coordinate-ammonium-reaction";
import { HydroniumFormationRxn } from "./hydronium-formation-rxn";
import { CoordinateExamplesTrio } from "./coordinate-examples-trio";
import { CovalentPropertyContrast } from "./covalent-property-contrast";
import { H2EnergyProfile } from "./h2-energy-profile";
import { InterVsIntramolecular } from "./inter-vs-intramolecular";
import { LewisProcedureSteps } from "./lewis-procedure-steps";
import { LewisGallerySimple } from "./lewis-gallery-simple";
import { LewisGalleryMultiple } from "./lewis-gallery-multiple";
import { LewisGalleryExpanded } from "./lewis-gallery-expanded";
import { FormalChargeDrill } from "./formal-charge-drill";
import { ElectronBudgetPanel } from "./electron-budget-panel";
import { LewisIonicVsMolecular } from "./lewis-ionic-vs-molecular";
import { ResonanceOzonePair } from "./resonance-ozone-pair";
import { ResonanceCarbonateTrio } from "./resonance-carbonate-trio";
import { ResonanceBenzenePanel } from "./resonance-benzene-panel";
import { ResonanceVsEquilibrium } from "./resonance-vs-equilibrium";
import { ResonanceBondOrderDrill } from "./resonance-bond-order-drill";
import { ResonanceConditionsPanel } from "./resonance-conditions-panel";
import { ResonanceEnergyPanel } from "./resonance-energy-panel";
import { VseprPostulatesPanel } from "./vsepr-postulates-panel";
import { RepulsionOrderPanel } from "./repulsion-order-panel";
import { ParentGeometriesTrio } from "./parent-geometries-trio";
import { VseprAngleLadder } from "./vsepr-angle-ladder";
import { Pcl5TbpShape } from "./pcl5-tbp-shape";
import { Sf6OctahedralShape } from "./sf6-octahedral-shape";
import { BentLinearDrill } from "./bent-linear-drill";
import { VbtOverlapMechanism } from "./vbt-overlap-mechanism";
import { SigmaOverlapTypes } from "./sigma-overlap-types";
import { PiCloudPanel } from "./pi-cloud-panel";
import { EtheneBondingMap } from "./ethene-bonding-map";
import { EthyneBondingMap } from "./ethyne-bonding-map";
import { RotationLockPanel } from "./rotation-lock-panel";
import { BondCompositionAudit } from "./bond-composition-audit";
import { MethaneSp3Stages } from "./methane-sp3-stages";
import { EtheneSp2Plan } from "./ethene-sp2-plan";
import { EthyneSpLinear } from "./ethyne-sp-linear";
import { SCharacterLadder } from "./s-character-ladder";
import { LonePairHybridPanel } from "./lone-pair-hybrid-panel";
import { HybridCountDrill } from "./hybrid-count-drill";
import { ExtendedHybridPanel } from "./extended-hybrid-panel";
import { BondLengthLadder } from "./bond-length-ladder";
import { DipoleVectorConvention } from "./dipole-vector-convention";
import { ZeroDipoleClub } from "./zero-dipole-club";
import { IonicCharacterScale } from "./ionic-character-scale";
import { HannaySmythDrill } from "./hannay-smyth-drill";
import { Nf3Nh3DipoleContrast } from "./nf3-nh3-dipole-contrast";
import { HfHiBondTrend } from "./hf-hi-bond-trend";
import { VdwForceLadder } from "./vdw-force-ladder";
import { DispersionSizeLadder } from "./dispersion-size-ladder";
import { HydrogenBondAnatomy } from "./hydrogen-bond-anatomy";
import { WaterHbondNetwork } from "./water-hbond-network";
import { BpAnomalyChart } from "./bp-anomaly-chart";
import { IceDensityPanel } from "./ice-density-panel";
import { NitrophenolContrast } from "./nitrophenol-contrast";
import { ElectronSeaModel } from "./electron-sea-model";
import { MetallicPropertyMap } from "./metallic-property-map";
import { SlidingTestContrast } from "./sliding-test-contrast";
import { BandTheoryPanel } from "./band-theory-panel";
import { MpLadderMetals } from "./mp-ladder-metals";
import { AlloyTypesPanel } from "./alloy-types-panel";
import { ConductivityDrill } from "./conductivity-drill";
import { KineticPostulatesPanel } from "./kinetic-postulates-panel";
import { WallCollisionPressure } from "./wall-collision-pressure";
import { MaxwellSpeedDistribution } from "./maxwell-speed-distribution";
import { SpeedFormulaLadder } from "./speed-formula-ladder";
import { KeTemperatureLine } from "./ke-temperature-line";
import { RmsSpeedDrill } from "./rms-speed-drill";
import { KineticEquationBridge } from "./kinetic-equation-bridge";
import { BoyleLawHyperbola } from "./boyle-law-hyperbola";
import { CharlesLawLine } from "./charles-law-line";
import { AvogadroVolumeDrill } from "./avogadro-volume-drill";
import { CombinedGasFlow } from "./combined-gas-flow";
import { DaltonPartialSum } from "./dalton-partial-sum";
import { AqueousTensionCorrection } from "./aqueous-tension-correction";
import { GrahamDiffusionRace } from "./graham-diffusion-race";
import { IdealEquationDerivation } from "./ideal-equation-derivation";
import { RUnitTablePanel } from "./r-unit-table-panel";
import { PvNrtSolveFlow } from "./pv-nrt-solve-flow";
import { BoltzmannBridgePanel } from "./boltzmann-bridge-panel";
import { IdealVsRealZone } from "./ideal-vs-real-zone";
import { TyrePressureCharles } from "./tyre-pressure-charles";
import { VdwEquationAnatomy } from "./vdw-equation-anatomy";
import { ZFactorCurve } from "./z-factor-curve";
import { DeviationRegimesPanel } from "./deviation-regimes-panel";
import { AConstantLadder } from "./a-constant-ladder";
import { BoyleTemperaturePanel } from "./boyle-temperature-panel";
import { RealGasCompressDrill } from "./real-gas-compress-drill";
import { LiquefactionEasePanel } from "./liquefaction-ease-panel";
import { EvaporationCoolingCycle } from "./evaporation-cooling-cycle";
import { VapourPressureEquilibrium } from "./vapour-pressure-equilibrium";
import { BoilingPressureRule } from "./boiling-pressure-rule";
import { SurfaceTensionAnatomy } from "./surface-tension-anatomy";
import { CapillaryRisePanel } from "./capillary-rise-panel";
import { ViscosityLayerFlow } from "./viscosity-layer-flow";
import { EvapVsBoilingContrast } from "./evap-vs-boiling-contrast";
import { MesophaseOrderLadder } from "./mesophase-order-ladder";
import { NematicSmecticCholesteric } from "./nematic-smectic-cholesteric";
import { ThermoLyotropicSplit } from "./thermo-lyotropic-split";
import { LcdPixelSwitch } from "./lcd-pixel-switch";
import { CholestericThermometry } from "./cholesteric-thermometry";
import { ReinitzerTransitionPanel } from "./reinitzer-transition-panel";
import { LcApplicationsMap } from "./lc-applications-map";
import { CrystalVsAmorphousOrder } from "./crystal-vs-amorphous-order";
import { FourSolidTypesGrid } from "./four-solid-types-grid";
import { MpLadderSolids } from "./mp-ladder-solids";
import { DiamondGraphiteContrast } from "./diamond-graphite-contrast";
import { SolidSlidingTest } from "./solid-sliding-test";
import { IsotropyAnisotropyDrill } from "./isotropy-anisotropy-drill";
import { SupercooledLiquidPanel } from "./supercooled-liquid-panel";
import { WaterVapourGradient } from "./water-vapour-gradient";
import { ThreeBehaviourTable } from "./three-behaviour-table";
import { WatersOfCrystallisation } from "./waters-of-crystallisation";
import { Cuso4WaterTest } from "./cuso4-water-test";
import { DesiccatorPanel } from "./desiccator-panel";
import { CrystallisationStages } from "./crystallisation-stages";
import { VpRuleDrill } from "./vp-rule-drill";
import { StpMolarVolumeCheck } from "./stp-molar-volume-check";
import { IsotopeTrioPanel } from "./isotope-trio-panel";
import { NascentVsMolecularH2 } from "./nascent-vs-molecular-h2";
import { H2oVsD2oProps } from "./h2o-vs-d2o-props";
import { PositionDebateMap } from "./position-debate-map";
import { NascentGenerationRoutes } from "./nascent-generation-routes";
import { WoodsBridgeAfterglow } from "./woods-bridge-afterglow";
import { D2oReactorRole } from "./d2o-reactor-role";
import { H2FuelLedger } from "./h2-fuel-ledger";
import { FuelCellElectrodes } from "./fuel-cell-electrodes";
import { StorageTrioPanel } from "./storage-trio-panel";
import { HeavyWaterPrepFlow } from "./heavy-water-prep-flow";
import { IsotopeEffectEngine } from "./isotope-effect-engine";
import { CleanCombustionMap } from "./clean-combustion-map";
import { AllotropyDefinitionPanel } from "./allotropy-definition-panel";
import { O2O3ContrastPanel } from "./o2o3-contrast-panel";
import { OxideFamilySort } from "./oxide-family-sort";
import { AmphotericDoubleDuty } from "./amphoteric-double-duty";
import { PeroxideVsOxideOs } from "./peroxide-vs-oxide-os";
import { MixedOxideAnatomy } from "./mixed-oxide-anatomy";
import { OxidePeriodTrend } from "./oxide-period-trend";
import { H2o2UseMap } from "./h2o2-use-map";
import { VolumeStrengthConversion } from "./volume-strength-conversion";
import { DecompositionEquationHub } from "./decomposition-equation-hub";
import { StorageRuleTrio } from "./storage-rule-trio";
import { OxygenUseLedger } from "./oxygen-use-ledger";
import { LdConverterFlow } from "./ld-converter-flow";
import { H2o2DualRedox } from "./h2o2-dual-redox";
import { OzoneStructurePanel } from "./ozone-structure-panel";
import { OzoniserFlow } from "./ozoniser-flow";
import { StarchIodideTestFlow } from "./starch-iodide-test-flow";
import { OzoneUseMap } from "./ozone-use-map";
import { OzoneUvShield } from "./ozone-uv-shield";
import { NascentORelease } from "./nascent-o-release";
import { ClRadicalCycle } from "./cl-radical-cycle";
import { CfcLifecyclePath } from "./cfc-lifecycle-path";
import { AntarcticHoleRecipe } from "./antarctic-hole-recipe";
import { OdpLadder } from "./odp-ladder";
import { DepletionEffectsMap } from "./depletion-effects-map";
import { MontrealTimeline } from "./montreal-timeline";
import { DobsonColumnPanel } from "./dobson-column-panel";
import { TripleBondAnatomy } from "./triple-bond-anatomy";
import { InertnessFourReasons } from "./inertness-four-reasons";
import { LiExceptionPanel } from "./li-exception-panel";
import { ActiveNitrogenGlow } from "./active-nitrogen-glow";
import { FixationVsHaber } from "./fixation-vs-haber";
import { N2PreparationRoutes } from "./n2-preparation-routes";
import { KineticVsThermoPanel } from "./kinetic-vs-thermo-panel";
import { Nh3StructureLonePair } from "./nh3-structure-lone-pair";
import { Cuso4TwoStepLadder } from "./cuso4-two-step-ladder";
import { Fecl3AmmoniaTest } from "./fecl3-ammonia-test";
import { WhiteFumesTest } from "./white-fumes-test";
import { TwoOxygenEquations } from "./two-oxygen-equations";
import { Nh3UseMap } from "./nh3-use-map";
import { DryingAgentTrap } from "./drying-agent-trap";
import { OxyacidLadderN } from "./oxyacid-ladder-n";
import { OstwaldThreeSteps } from "./ostwald-three-steps";
import { Hno3ConcentrationCodes } from "./hno3-concentration-codes";
import { No3ResonancePanel } from "./no3-resonance-panel";
import { AquaRegiaPanel } from "./aqua-regia-panel";
import { PassivityFilmPanel } from "./passivity-film-panel";
import { Hno2DualRedox } from "./hno2-dual-redox";
import { Hno3ReactionMatrix } from "./hno3-reaction-matrix";
import { ConcentrationCodeLadder } from "./concentration-code-ladder";
import { NonmetalOxyacidMap } from "./nonmetal-oxyacid-map";
import { BrownRingJunction } from "./brown-ring-junction";
import { Hno3LabPrepPanel } from "./hno3-lab-prep-panel";
import { Hno3UseMap } from "./hno3-use-map";
import { HalogenTrendLadder } from "./halogen-trend-ladder";
import { HalogenDisplacementSeries } from "./halogen-displacement-series";
import { ChlorineWaterEquilibrium } from "./chlorine-water-equilibrium";
import { DisproportionationSplit } from "./disproportionation-split";
import { OxoacidStrengthOrder } from "./oxoacid-strength-order";
import { HalogenPrepRoutes } from "./halogen-prep-routes";
import { HalogenUseMap } from "./halogen-use-map";
import { HalogenFingerprintTable } from "./halogen-fingerprint-table";
import { StarchHelixComplex } from "./starch-helix-complex";
import { AgxColourLadder } from "./agx-colour-ladder";
import { BleachingSpeedContrast } from "./bleaching-speed-contrast";
import { IodineSublimationPanel } from "./iodine-sublimation-panel";
import { HalideTestFlowchart } from "./halide-test-flowchart";
import { HalideBondLadder } from "./halide-bond-ladder";
import { H2so4VsH3po4Prep } from "./h2so4-vs-h3po4-prep";
import { HiReducesH2so4 } from "./hi-reduces-h2so4";
import { AcidityStabilityScissors } from "./acidity-stability-scissors";
import { HclGastricPickling } from "./hcl-gastric-pickling";
import { FumingHxMist } from "./fuming-hx-mist";
import { HalideReducingLadder } from "./halide-reducing-ladder";
import { CarbonHybridisationTrio } from "./carbon-hybridisation-trio";
import { FullereneFootball } from "./fullerene-football";
import { CatenationChampion } from "./catenation-champion";
import { AmorphousAdsorptionPower } from "./amorphous-adsorption-power";
import { CarbonUseMap } from "./carbon-use-map";
import { C14DatingPanel } from "./c14-dating-panel";
import { CoPrepRoutes } from "./co-prep-routes";
import { CoBlueFlame } from "./co-blue-flame";
import { CoBlastFurnaceReduction } from "./co-blast-furnace-reduction";
import { CarboxyhaemoglobinHijack } from "./carboxyhaemoglobin-hijack";
import { MondProcessLoop } from "./mond-process-loop";
import { CoVsCo2Contrast } from "./co-vs-co2-contrast";
import { CoUseMap } from "./co-use-map";
import { P4StrainTetrahedron } from "./p4-strain-tetrahedron";
import { WhiteVsRedPContrast } from "./white-vs-red-p-contrast";
import { AllotropeConversionCycle } from "./allotrope-conversion-cycle";
import { PGlowChemiluminescence } from "./p-glow-chemiluminescence";
import { SafetyMatchAnatomy } from "./safety-match-anatomy";
import { BlackPLayers } from "./black-p-layers";
import { PUseMap } from "./p-use-map";
import { Nh3VsPh3Contrast } from "./nh3-vs-ph3-contrast";
import { Ph3PrepRoutes } from "./ph3-prep-routes";
import { Ph3MetalSaltTests } from "./ph3-metal-salt-tests";
import { HolmesSignalSequence } from "./holmes-signal-sequence";
import { Ph4SaltFormation } from "./ph4-salt-formation";
import { Ph3CombustionH3po4 } from "./ph3-combustion-h3po4";
import { P2h4SelfIgnition } from "./p2h4-self-ignition";
import { S8CrownRing } from "./s8-crown-ring";
import { SulphurAllotropeLadder } from "./sulphur-allotrope-ladder";
import { ViscosityMountainCurve } from "./viscosity-mountain-curve";
import { PlasticSulphurQuench } from "./plastic-sulphur-quench";
import { VulcanisationCrosslinks } from "./vulcanisation-crosslinks";
import { FineSulphurForms } from "./fine-sulphur-forms";
import { SulphurUseMap } from "./sulphur-use-map";
import { KippsApparatus3bulb } from "./kipps-apparatus-3bulb";
import { H2sDibasicLadder } from "./h2s-dibasic-ladder";
import { H2sReducerYellowS } from "./h2s-reducer-yellow-s";
import { SulphideGroupSplit } from "./sulphide-group-split";
import { H2sCombustionSplit } from "./h2s-combustion-split";
import { H2sHazardPanel } from "./h2s-hazard-panel";
import { H2sPrepRoutes } from "./h2s-prep-routes";
import { So2DualRedoxMap } from "./so2-dual-redox-map";
import { So2PrepRoutes } from "./so2-prep-routes";
import { So2BleachVsCl2 } from "./so2-bleach-vs-cl2";
import { SulphurFogDemo } from "./sulphur-fog-demo";
import { So2MoleculeShape } from "./so2-molecule-shape";
import { So2AcidAnhydride } from "./so2-acid-anhydride";
import { So2UseMap } from "./so2-use-map";
import { H2so4PersonalityTrio } from "./h2so4-personality-trio";
import { DilVsConcSwitch } from "./dil-vs-conc-switch";
import { NonvolatileDisplacer } from "./nonvolatile-displacer";
import { SugarSnakeDehydration } from "./sugar-snake-dehydration";
import { AcidToWaterRule } from "./acid-to-water-rule";
import { H2so4OxidationEqs } from "./h2so4-oxidation-eqs";
import { H2so4UseMap } from "./h2so4-use-map";
import { ThiosulphateAnatomy } from "./thiosulphate-anatomy";
import { IodometryEndpoint } from "./iodometry-endpoint";
import { PhotoFixerComplex } from "./photo-fixer-complex";
import { AntichlorAction } from "./antichlor-action";
import { HypoAcidDecomposition } from "./hypo-acid-decomposition";
import { CyanideAntidotePath } from "./cyanide-antidote-path";
import { HypoUseMap } from "./hypo-use-map";

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
  "spectrum-of-hydrogen-atom": {
    title: "Hydrogen spectrum",
    figures: [
      {
        Component: HydrogenEnergyLevels,
        caption:
          "Every spectral line is one downward jump between quantised orbits: Lyman lands on n = 1 (UV), Balmer on n = 2 (visible), Paschen on n = 3 (IR) - one series per landing level.",
        alt: "Hydrogen energy level ladder with Lyman Balmer and Paschen series arrows and orbital energies in electron volts",
        keyword: "spectrum",
      },
      {
        Component: BalmerVisibleLines,
        caption:
          "The Balmer series is the only one the eye can see: H alpha 656.3 nm, H beta 486.1 nm, H gamma 434 nm and H delta 410.2 nm crowd toward the 364.6 nm series limit.",
        alt: "Visible spectrum bar with four Balmer emission lines at 656.3 486.1 434 and 410.2 nanometres",
        keyword: "Balmer",
      },
      {
        Component: Neb2022HydrogenSolution,
        caption:
          "NEB 2022 worked example: E2 = -5.45 x 10^-19 J, then delta-E for 3 to 2 is 3.03 x 10^-19 J, then lambda = hc/delta-E gives 656 nm - the H alpha line.",
        alt: "Three step solved panel computing the second orbit energy and the 656 nanometre wavelength for the three to two hydrogen transition",
        keyword: "656",
      },
      {
        Component: EmissionVsAbsorption,
        caption:
          "Emission shows bright lines on a dark background from downward jumps; absorption shows dark lines on a continuous band from upward jumps - same wavelengths, opposite journeys.",
        alt: "Emission spectrum with bright lines versus absorption spectrum with dark lines and electron jump directions",
        keyword: "absorption",
      },
      {
        Component: SeriesLimitDiagram,
        caption:
          "Lines crowd as n2 grows because level gaps shrink; the limit is lambda = n1 squared over R - 91.2 nm for Lyman, 364.6 nm for Balmer.",
        alt: "Spectral lines converging to a dashed series limit with the lambda equals n one squared over R formula",
        keyword: "limit",
      },
      {
        Component: RydbergFormulaDrill,
        caption:
          "The Rydberg route lands on the same answer: 1/lambda = R(1/n1^2 - 1/n2^2) with R = 1.097 x 10^7 m^-1 gives 656.3 nm for the Balmer 3 to 2 jump.",
        alt: "Solved Rydberg formula calculation giving 656.3 nanometres for the three to two Balmer transition",
        keyword: "Rydberg",
      },
      {
        Component: SeriesWavelengthTable,
        caption:
          "Five series, five landing levels: Lyman n1 = 1 (UV), Balmer 2 (visible), Paschen 3 and Brackett 4 (IR), Pfund 5 (far IR) - each series' longest line is the smallest jump into its landing level.",
        alt: "Hydrogen spectral series table with landing level region and longest wavelength for Lyman through Pfund",
        keyword: "Lyman",
      },
    ],
  },
  "defects-of-bohr-s-theory": {
    title: "Defects of Bohr's theory",
    figures: [
      {
        Component: BohrDefectsMap,
        caption:
          "Five stock defects surround the Bohr atom: failure for multi-electron atoms, no fine structure, no Zeeman or Stark splitting, orbits forbidden by uncertainty, and no line intensities.",
        alt: "Bohr atom centre with five defect callouts covering multi-electron failure fine structure Zeeman Stark uncertainty and intensities",
        keyword: "defect",
      },
      {
        Component: FineStructureSplit,
        caption:
          "Under a high-resolution spectrograph each Bohr line resolves into a close doublet - spin and relativistic effects split every level slightly, something circular orbits cannot predict.",
        alt: "Single Bohr spectral line resolving into a close doublet under high resolution",
        keyword: "fine",
      },
      {
        Component: ZeemanStarkContrast,
        caption:
          "Zeeman splits lines with a magnetic field, Stark with an electric field - both need the magnetic quantum number m-l, which Bohr's model simply does not have.",
        alt: "Zeeman magnetic splitting beside Stark electric splitting of the same spectral line",
        keyword: "Zeeman",
      },
      {
        Component: OrbitVsOrbitalDefect,
        caption:
          "A definite orbit fixes position and momentum exactly, breaking delta-x times delta-p at least h over four pi; the quantum model replaces it with a probability cloud.",
        alt: "Bohr circular orbit crossed out beside a quantum probability cloud obeying the uncertainty principle",
        keyword: "uncertainty",
      },
      {
        Component: BohrSurvivors,
        caption:
          "Keep the credit line balanced: quantised levels, h-nu = delta-E, the 13.6 eV ionisation energy and the Rydberg constant all survive into modern physics.",
        alt: "Four cards of Bohr results that survive quantised levels photon rule ionisation energy and Rydberg constant",
        keyword: "quantised",
      },
      {
        Component: SommerfeldEllipsePatch,
        caption:
          "Sommerfeld added elliptical orbits and sub-energy levels to rescue fine structure, yet the patched model still fails for multi-electron atoms, Zeeman and Stark splitting, and uncertainty.",
        alt: "Sommerfeld elliptical orbits patch with the defects it still cannot fix",
        keyword: "Sommerfeld",
      },
      {
        Component: DefectFixMap,
        caption:
          "Each defect maps to one missing quantum number: repulsion to shielding, fine structure to l and m-s, Zeeman and Stark to m-l, forbidden orbits to the probability cloud.",
        alt: "Defect to fix map pairing each Bohr defect with the quantum mechanical concept that repairs it",
        keyword: "multi-electron",
      },
    ],
  },
  "elementary-idea-of-quantum-mechanical-model-de-broglie-s-wave-equation": {
    title: "de Broglie waves",
    figures: [
      {
        Component: DeBroglieRelation,
        caption:
          "lambda = h/mv gives every moving particle a wavelength: an electron at 10^6 m/s has about 0.73 nm, while a cricket ball's wavelength is 10^-34 m - real but unobservable.",
        alt: "de Broglie relation lambda equals h over mv with electron and cricket ball wavelength comparison",
        keyword: "wavelength",
      },
      {
        Component: StandingWaveOrbit,
        caption:
          "Only whole wavelengths fit around an orbit: 2 pi r = n lambda with lambda = h/mv gives mvr = nh/2 pi - Bohr's quantisation derived, not assumed.",
        alt: "Standing wave fitting three wavelengths around a circular orbit with the derivation chain to Bohr quantisation",
        keyword: "standing",
      },
      {
        Component: DavissonGermerApparatus,
        caption:
          "Davisson and Germer fired electrons at a nickel crystal and recorded a diffraction pattern - the measured wavelength matched h/mv, proving wave nature experimentally.",
        alt: "Davisson Germer apparatus with electron gun nickel crystal and detector recording diffraction maxima",
        keyword: "diffraction",
      },
      {
        Component: DualNaturePanel,
        caption:
          "One entity, two faces: diffraction and interference expose the wave, the photoelectric effect and collisions expose the particle - the experiment chooses the face.",
        alt: "Dual nature panel with wave face evidence and particle face evidence for light and matter",
        keyword: "dual",
      },
      {
        Component: ElectronVsBallWavelength,
        caption:
          "Same equation, 25 orders apart: the electron's 0.73 nm matches crystal spacings so diffraction appears; the ball's 10^-34 m is 20 orders below a proton.",
        alt: "Solved electron versus cricket ball de Broglie wavelength calculation panel",
        keyword: "cricket",
      },
      {
        Component: ElectronMicroscopeLink,
        caption:
          "The electron microscope is de Broglie's idea industrialised: accelerating electrons shrinks lambda = h/mv to a few thousandths of a nanometre, resolving detail light cannot touch.",
        alt: "Electron microscope versus light microscope resolution explained by de Broglie wavelength",
        keyword: "microscope",
      },
      {
        Component: ProtonWavelengthDrill,
        caption:
          "Same speed, proton vs electron: the proton's wavelength comes out 1836 times shorter because mass sits in the denominator of lambda = h/mv.",
        alt: "Solved proton versus electron wavelength calculation at equal speed showing the mass ratio",
        keyword: "proton",
      },
    ],
  },
  "quantum-numbers": {
    title: "Quantum numbers",
    figures: [
      {
        Component: FourQuantumNumbersMap,
        caption:
          "Four numbers give every electron a full address: n the shell, l the subshell shape, m-l the orientation, m-s the spin - like country, city, street and side of street.",
        alt: "Four quantum numbers table with names meanings and allowed values plus address analogy",
        keyword: "quantum numbers",
      },
      {
        Component: SodiumValenceAddress,
        caption:
          "NEB 2024 worked example: Na is 1s2 2s2 2p6 3s1, so the valence electron carries n = 3, l = 0, m-l = 0, m-s = +1/2 - configuration first, numbers second.",
        alt: "Solved sodium valence electron quantum numbers n three l zero m l zero m s plus one half",
        keyword: "sodium",
      },
      {
        Component: SubshellCapacityLadder,
        caption:
          "Shells hold 2n squared electrons: K holds 2, L holds 8, M holds 18, N holds 32 - built from subshell capacities 2, 6, 10 and 14.",
        alt: "Shell capacity ladder K to N with two eight eighteen and thirty two electrons and subshell breakdown",
        keyword: "2n",
      },
      {
        Component: ImpossibleSetChecker,
        caption:
          "NEB 2023 check: n = 2, l = 2 is impossible because l must stay below n; the other two sets pass the 0 to n-1, -l to +l and plus-minus one-half tests.",
        alt: "Three quantum number sets checked for validity with set b rejected because l equals n",
        keyword: "possible",
      },
      {
        Component: PauliSpinOrbital,
        caption:
          "One orbital holds at most two electrons with opposed spins; a third would repeat all four quantum numbers, which Pauli's principle forbids.",
        alt: "Orbital box with spin up and spin down electrons illustrating the Pauli exclusion principle",
        keyword: "Pauli",
      },
      {
        Component: SpinQuantumNumberPanel,
        caption:
          "m-s takes exactly two values, plus and minus one-half, independent of n, l and m-l - the fourth number that completed every electron's address and explained fine-structure doublets.",
        alt: "Spin quantum number panel with clockwise and anticlockwise spin values plus one half and minus one half",
        keyword: "spin",
      },
      {
        Component: ShellAddressDrill,
        caption:
          "The highest n in a configuration names the shell - K for n = 1, L for 2, M for 3, N for 4 - read it straight off H, C, Cl and Ca.",
        alt: "Shell address drill reading the highest occupied shell from four configurations",
        keyword: "shell",
      },
    ],
  },
  "aufbau-principle-pauli-s-exclusion-principle-hund-s-rule-and-electronic-configurations-of-atoms-": {
    title: "Aufbau, Pauli and Hund",
    figures: [
      {
        Component: AufbauDiagonalRule,
        caption:
          "Follow the diagonal arrows to fill in energy order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p - the 4s-before-3d crossing is the most-tested detail.",
        alt: "Aufbau diagonal rule chart with orbital boxes and arrows showing filling order",
        keyword: "Aufbau",
      },
      {
        Component: NlRuleComparison,
        caption:
          "The (n + l) rule decides the order: 4s sums to 4 and fills before 3d which sums to 5; when sums tie, the lower n wins.",
        alt: "Comparison of 4s and 3d energies using the n plus l rule with worked sums",
        keyword: "energy",
      },
      {
        Component: HundNitrogenDiagram,
        caption:
          "Nitrogen's 2p3 fills three boxes singly with parallel spins - pairing waits until every degenerate orbital has one electron, giving maximum multiplicity.",
        alt: "Nitrogen orbital boxes with three unpaired parallel spins in separate p orbitals",
        keyword: "nitrogen",
      },
      {
        Component: CrCuExceptions,
        caption:
          "Chromium settles at 4s1 3d5 and copper at 4s1 3d10 - exactly half-filled and fully-filled subshells gain symmetry and exchange energy.",
        alt: "Chromium and copper configuration exceptions with expected versus actual configurations",
        keyword: "chromium",
      },
      {
        Component: FeIonRemoval,
        caption:
          "Fe is [Ar] 4s2 3d6, but Fe2+ is [Ar] 3d6 and Fe3+ reaches the stable [Ar] 3d5 - electrons leave the highest n shell first.",
        alt: "Iron atom and ion configurations showing 4 s electrons removed before 3 d",
        keyword: "Fe",
      },
      {
        Component: ExchangeEnergyPanel,
        caption:
          "Exchange energy is the arithmetic behind the exceptions: d5 offers ten parallel-spin exchange pairs against d4's three, so chromium and Fe3+ pay the 4s price to reach it.",
        alt: "Exchange energy comparison of d four and d five subshells counting parallel spin pairs",
        keyword: "exchange",
      },
      {
        Component: FilledSymmetryPanel,
        caption:
          "Half-filled p3 d5 f7 and fully-filled p6 d10 f14 subshells spread their charge cloud evenly in every direction - a symmetry that resists change and lowers energy.",
        alt: "Symmetrical charge clouds of half filled and fully filled subshells",
        keyword: "symmetry",
      },
    ],
  },
  "modern-periodic-law-and-modern-periodic-table": {
    title: "Modern periodic law",
    figures: [
      {
        Component: MendeleevVsModern,
        caption:
          "Mendeleev ordered by atomic mass and left gaps; Moseley's X-ray work re-ordered by atomic number Z - the true cause of periodicity.",
        alt: "Mendeleev versus modern periodic law contrast panel with Moseley evidence",
        keyword: "Mendeleev",
      },
      {
        Component: TeIAnomaly,
        caption:
          "Tellurium (127.6) weighs more than iodine (126.9) yet must precede it: mass order breaks the families, atomic number order 52 then 53 repairs them.",
        alt: "Tellurium iodine anomaly showing mass order wrong versus atomic number order right",
        keyword: "tellurium",
      },
      {
        Component: LongFormMap,
        caption:
          "The long-form table runs 7 periods by 18 groups, with s, p, d and f blocks marking where each element's differentiating electron lands.",
        alt: "Long form periodic table block map with seven periods and eighteen groups",
        keyword: "periodic table",
      },
      {
        Component: Neb2024Locator,
        caption:
          "NEB 2024 drill: Z = 19 is potassium in group 1, Z = 20 calcium, Z = 31 gallium in group 13, Z = 36 krypton the noble gas, Z = 55 caesium in period 6.",
        alt: "Solved locator table for atomic numbers 19 20 31 36 and 55 with group period and block",
        keyword: "potassium",
      },
      {
        Component: PeriodicityCause,
        caption:
          "Lithium, sodium and potassium all end in a single outer s electron - the same valence shell keeps returning, and identical chemistry follows.",
        alt: "Repeating outer electronic configurations of lithium sodium and potassium explaining periodicity",
        keyword: "configuration",
      },
      {
        Component: EkaPredictionPanel,
        caption:
          "Mendeleev left eka-silicon with predicted mass 72, density 5.5 and EO2/ECl4 chemistry; germanium arrived at 72.6 and 5.36 with exactly those formulas.",
        alt: "Eka silicon prediction table matched against discovered germanium properties",
        keyword: "eka",
      },
      {
        Component: MoseleyXrayPanel,
        caption:
          "Moseley bombarded metal targets and found the square root of X-ray frequency plots linearly against Z, not mass - the experimental foundation of the modern periodic law.",
        alt: "Moseley X-ray experiment with cathode rays metal targets and the root nu versus Z relation",
        keyword: "x-ray",
      },
    ],
  },
  "classification-of-elements-into-different-groups-periods-and-blocks": {
    title: "Groups, periods and blocks",
    figures: [
      {
        Component: PeriodSizesChart,
        caption:
          "Periods hold 2, 8, 8, 18, 18, 32, 32 electrons - periods 3 and 5 stop early because 4s dips below 3d under the (n + l) rule.",
        alt: "Bar chart of period lengths two eight eight eighteen eighteen thirty two thirty two",
        keyword: "period",
      },
      {
        Component: FourBlocksMap,
        caption:
          "The block is where the last electron lands: s-block groups 1-2, p-block 13-18, d-block 3-12, f-block the two inner-transition rows.",
        alt: "Four blocks of the periodic table with group ranges and character notes",
        keyword: "block",
      },
      {
        Component: GroupCountingRules,
        caption:
          "Count the group from the configuration: s-block uses the ns count, p-block adds 12 to the np count, d-block adds 2 to the d count.",
        alt: "Group number formulas for s p and d blocks with worked examples",
        keyword: "group",
      },
      {
        Component: FePositionDrill,
        caption:
          "Fe is [Ar] 4s2 3d6: period 4, group 2 + 6 = 8, d-block - the differentiating 3d electron fixes all three labels at once.",
        alt: "Solved iron position drill showing period four group eight d block",
        keyword: "iron",
      },
      {
        Component: BlockCharacterPanel,
        caption:
          "s-block is all metal, d-block is transition, p-block sweeps metal to non-metal, f-block is inner transition - character tracks the block.",
        alt: "Block character panel comparing metallic character across s p d and f blocks",
        keyword: "transition",
      },
      {
        Component: LanthanideActinideRows,
        caption:
          "The f-block is parked as two 14-element rows below the table - lanthanides filling 4f after lanthanum, actinides filling 5f after actinium - keeping every period drawable.",
        alt: "Lanthanide and actinide rows placed below the main periodic table",
        keyword: "lanthan",
      },
      {
        Component: NobleGasPositions,
        caption:
          "Every period closes with a noble gas - He, Ne, Ar, Kr, Xe, Rn, Og - a closed outer shell that forced Mendeleev's successors to add the zero group, now group 18.",
        alt: "Noble gas row helium through oganesson at the end of each period",
        keyword: "noble",
      },
    ],
  },
  "iupac-classification-of-elements": {
    title: "IUPAC classification",
    figures: [
      {
        Component: IupacGroupMapping,
        caption:
          "IUPAC's 1988 scheme replaces Roman numerals with plain numbers 1 to 18 - one number per column, ending the A/B confusion between Europe and America.",
        alt: "IUPAC group numbering mapping old Roman numeral groups to numbers one to eighteen",
        keyword: "IUPAC",
      },
      {
        Component: DigitRootNaming,
        caption:
          "Element 104 becomes un-nil-quad + ium = unnilquadium (Unq): split Z into digits, convert each to its root, join, then add -ium.",
        alt: "Four step solved derivation of the temporary name unnilquadium for element 104",
        keyword: "Unnilquadium",
      },
      {
        Component: EnnRuleCallout,
        caption:
          "The one spelling trap: enn + nil becomes ennil, so Z = 119 is ununennium and Z = 120 is unbinilium.",
        alt: "Enn plus nil spelling rule callout with ununennium and unbinilium examples",
        keyword: "enn",
      },
      {
        Component: Element118Timeline,
        caption:
          "Element 118 carried the temporary name ununoctium until IUPAC confirmed it in 2016 and it became Oganesson (Og).",
        alt: "Element 118 timeline from synthesis through temporary name to permanent name Oganesson",
        keyword: "118",
      },
      {
        Component: Period7Completion,
        caption:
          "Period 7 is now full to oganesson at Z = 118; elements 119 and 120 would open period 8, and their systematic names are already waiting.",
        alt: "Period seven completion row with oganesson highlighted and future elements 119 120",
        keyword: "temporary",
      },
      {
        Component: OganessonNaming,
        caption:
          "Oganesson (Og, Z = 118) honours Yuri Oganessian of Dubna; its temporary name ununoctium was retired the day IUPAC confirmed the discovery in 2016.",
        alt: "Oganesson naming panel honouring Yuri Oganessian with element identity card",
        keyword: "oganesson",
      },
      {
        Component: SymbolNotationRules,
        caption:
          "Symbols follow the name: take the roots' first letters, capitalise, keep three letters - unnilquadium became Unq until confirmation retired it for rutherfordium, Rf.",
        alt: "Systematic symbol notation rules with unnilquadium to rutherfordium example",
        keyword: "notation",
      },
    ],
  },
  "nuclear-charge-and-effective-nuclear-charge": {
    title: "Effective nuclear charge",
    figures: [
      {
        Component: ZeffEquation,
        caption:
          "Z effective = Z minus sigma: the pull an outer electron actually feels, after inner electrons have taken their share.",
        alt: "Effective nuclear charge equation anatomy with Z and screening constant labels",
        keyword: "effective",
      },
      {
        Component: ShieldingLayers,
        caption:
          "Ten inner electrons stand between sodium's +11 nucleus and its 3s electron, leaving an effective pull of about +1 - screening in one picture.",
        alt: "Shielding layers diagram with inner shell electrons screening the outer electron in sodium",
        keyword: "shielding",
      },
      {
        Component: NaClZeffContrast,
        caption:
          "Na and Cl share the same ten inner electrons, so shielding is constant while Z climbs from 11 to 17 - Z effective rises from about +1 to +7.",
        alt: "Solved sodium versus chlorine effective nuclear charge contrast panel",
        keyword: "sodium",
      },
      {
        Component: ZeffTrendArrows,
        caption:
          "Z effective climbs across a period and stays roughly constant down a group - the single cause behind radius, ionisation energy and electronegativity trends.",
        alt: "Effective nuclear charge trend arrows across a period and down a group with consequences",
        keyword: "across",
      },
      {
        Component: SlaterContributions,
        caption:
          "Slater's bookkeeping: 0.35 per same-shell electron, 0.85 per (n-1) electron, 1.00 for deeper cores - add them up to get sigma.",
        alt: "Slater rules contribution table with screening values per shell",
        keyword: "Slater",
      },
      {
        Component: ScreeningVsPenetration,
        caption:
          "Penetration order s over p over d over f decides energy: the s cloud dives closest to the nucleus, feels least screening, and sits lowest - the reason 4s can undercut 3d.",
        alt: "Penetration diagram of s p and d orbitals with energy order consequence",
        keyword: "penetration",
      },
      {
        Component: CoreValenceSplit,
        caption:
          "Split any configuration into core and valence: lithium keeps 2 core electrons, sodium 10, yet both hold Z effective near plus one - the constancy that makes group 1 a family.",
        alt: "Core versus valence electron split for lithium and sodium with effective nuclear charge",
        keyword: "core",
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
      {
        Component: TrendDirectionCompass,
        caption:
          "One compass covers six properties: radius falls across and rises down; ionisation energy, electron affinity and electronegativity do the opposite; metallic character is anti-ionisation.",
        alt: "Six property cards showing trend direction across a period and down a group for radius, ionisation energy, electron affinity, electronegativity, metallic character and shielding",
        keyword: "electronegativity",
      },
      {
        Component: IrregularityPairPanel,
        caption:
          "The two ionisation-energy dips of period 3: Mg beats Al because its full 3s subshell is harder to empty, and Na sits far below Cl because its outer electron feels only about +1.",
        alt: "Solved NEB 2022 panel explaining the magnesium aluminium and sodium chlorine ionisation energy irregularities with configurations",
        keyword: "irregular",
      },
      {
        Component: IsoelectronicSeriesChart,
        caption:
          "O2-, F-, Na+, Mg2+ and Al3+ all carry ten electrons, yet their radii fall from 140 to 45 pm as the nuclear charge climbs from +8 to +13 - same shielding, stronger squeeze.",
        alt: "Isoelectronic series circles shrinking from oxide to aluminium ion with radii in picometres",
        keyword: "isoelectronic",
      },
      {
        Component: IeJumpSodium,
        caption:
          "Sodium's successive ionisation energies jump from 496 to 4562 kJ/mol - a nine-fold leap that marks the shell boundary and proves sodium carries exactly one valence electron.",
        alt: "Bar chart of sodium first second and third ionisation energies showing the giant jump after the first electron",
        keyword: "4562",
      },
      {
        Component: IeDipsPanel,
        caption:
          "Be to B and N to O: the first dip is a new 2p electron above the filled 2s; the second is pair-pair repulsion inside the 2p box of oxygen.",
        alt: "Two dip panels showing beryllium boron and nitrogen oxygen configurations with reasons for the ionisation energy fall",
        keyword: "dip",
      },
      {
        Component: RadiusTypesTrio,
        caption:
          "Radius has three definitions: covalent (half the bonded distance), van der Waals (half the closest non-bonded approach - always larger) and ionic (cations shrink, anions swell).",
        alt: "Three radius definitions covalent van der Waals and ionic compared with circles",
        keyword: "covalent",
      },
      {
        Component: MetallicCharacterLadder,
        caption:
          "Across period 3 metallic character falls from sodium through the metalloid silicon to chlorine, and the oxides swing basic to acidic in step; down a group the ladder reverses.",
        alt: "Metallic character ladder across period three from sodium to chlorine",
        keyword: "metallic",
      },
    ],
  },
  "hybridization-involving-s-and-p-orbitals-only": {
    title: "Hybrid orbitals and molecular shape",
    figures: [
      {
        Component: MethaneSp3Stages,
        caption:
          "Methane in four stages: ground state, promotion to 2s1 2p3, hybridisation into four sp3 orbitals, and four identical C-H bonds at 109.5 degrees (NEB 2024).",
        alt: "Methane sp3 hybridisation four stages promotion overlap tetrahedral",
        keyword: "promotion",
      },
      {
        Component: EtheneSp2Plan,
        caption:
          "sp2 carbon: three hybrids in a plane at 120 degrees and one unhybridised p orbital standing perpendicular, ready for the pi bond.",
        alt: "Ethene sp2 hybridisation three orbitals plane perpendicular p orbital",
        keyword: "trigonal",
      },
      {
        Component: EthyneSpLinear,
        caption:
          "sp carbon: two hybrids in a line at 180 degrees and two spare p orbitals that build the two pi bonds of the triple bond.",
        alt: "Ethyne sp hybridisation two hybrids linear two leftover p orbitals",
        keyword: "linear",
      },
      {
        Component: SCharacterLadder,
        caption:
          "The s-character ladder: sp carries 50 percent s, sp2 33, sp3 25 - more s means stronger, shorter bonds and wider angles.",
        alt: "S character ladder sp sp2 sp3 percent bond strength angles",
        keyword: "character",
      },
      {
        Component: LonePairHybridPanel,
        caption:
          "Lone pairs occupy hybrids too: ammonia is sp3 with one lone pair (107 degrees), water sp3 with two (104.5 degrees).",
        alt: "Lone pairs in sp3 hybrids ammonia water compressed angles",
        keyword: "lone",
      },
      {
        Component: HybridCountDrill,
        caption:
          "Count domains, name the hybrid: two gives sp, three sp2, four sp3 - VSEPR and hybridisation agree by construction.",
        alt: "Hybrid count drill electron domains to hybridisation type table",
        keyword: "domains",
      },
      {
        Component: ExtendedHybridPanel,
        caption:
          "Beyond s and p: SF6 is sp3d2 octahedral, IF7 sp3d3 pentagonal bipyramidal - the same hybrids-equal-domains rule (NEB 2024).",
        alt: "Extended hybridisation sulphur hexafluoride sp3d2 iodine heptafluoride sp3d3",
        keyword: "octahedral",
      },
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
        Component: IonicFormationReaction,
        caption:
          "Magnesium chloride as a balanced electron ledger: Mg loses two electrons, each chlorine takes one, and MgCl2 crystallises in a 1:2 lattice.",
        alt: "Magnesium chloride formation reaction with electron transfer balanced oxidation reduction",
        keyword: "electron",
      },
      {
        Component: LatticeEnergyPanel,
        caption:
          "Lattice energy is the glue: the energy released when gaseous ions pack into the solid lattice - about 787 kJ per mole for NaCl, more for MgO.",
        alt: "Sodium chloride cubic lattice with lattice energy definition and values",
        keyword: "lattice",
      },
      {
        Component: IonicPropertyTable,
        caption:
          "Properties with numbers: NaCl melts at 801 C, MgO at 2852 C; hard but brittle; conducts only when molten or dissolved.",
        alt: "Ionic compound properties table melting point hardness conduction solubility volatility",
        keyword: "melting",
      },
      {
        Component: FajansPolarisationPanel,
        caption:
          "Fajan's rules in one picture: the tiny Li+ distorts the chloride cloud far more than Na+ does, so LiCl carries more covalent character (NEB 2024).",
        alt: "Fajans rules polarisation of chloride by lithium and sodium cations covalent character",
        keyword: "fajan",
      },
      {
        Component: IonicConductionDrill,
        caption:
          "When does salt conduct? Only when ions can move - never as a solid, always when molten or dissolved.",
        alt: "Ionic conduction drill solid molten aqueous sodium chloride mobile ions",
        keyword: "molten",
      },
      {
        Component: IonicVsCovalentProperties,
        caption:
          "Side-by-side properties: ionic compounds are hard high-melting solids that dissolve in water; covalent compounds span gases to soft solids and favour hexane.",
        alt: "Ionic versus covalent compound properties contrast table",
        keyword: "covalent",
      },
      {
        Component: IonicSolubilityPanel,
        caption:
          "Water dissolves salt by hydration: the oxygen end turns to Na+, the hydrogen ends to Cl-, and hydration energy pays the lattice bill.",
        alt: "Water hydrating sodium and chloride ions dissolving ionic crystal ion dipole",
        keyword: "water",
      },
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
        Component: CovalentBondTypes,
        caption:
          "Single, double, triple: more shared pairs mean shorter, stronger bonds - C-C 154 pm and 348 kJ/mol up to C-C triple at 120 pm and 839.",
        alt: "Single double triple covalent bonds with lengths and energies",
        keyword: "triple",
      },
      {
        Component: CoordinateAmmoniumReaction,
        caption:
          "The coordinate bond as a reaction: ammonia donates its lone pair to H+ and ammonium forms - once made, all four N-H bonds are identical.",
        alt: "Ammonia plus hydrogen ion reaction forming ammonium coordinate covalent bond",
        keyword: "lone",
      },
      {
        Component: HydroniumFormationRxn,
        caption:
          "Water as a base: H2O donates a lone pair to H+ and the hydronium ion H3O+ forms - the acid of aqueous chemistry.",
        alt: "Hydronium ion formation reaction water donating lone pair to proton",
        keyword: "coordinate",
      },
      {
        Component: CoordinateExamplesTrio,
        caption:
          "The coordinate-bond gallery: NH4+, H3O+ and the NH3-BF3 adduct - each with a donor, an acceptor, and one pair from a single source.",
        alt: "Coordinate bond examples ammonium hydronium ammonia boron trifluoride adduct",
        keyword: "coordinate",
      },
      {
        Component: CovalentPropertyContrast,
        caption:
          "Both covalent, wildly different: diamond is a giant network melting at 3550 C, iodine a molecular solid melting at 114 C.",
        alt: "Diamond giant covalent network versus iodine molecular solid melting points",
        keyword: "diamond",
      },
      {
        Component: H2EnergyProfile,
        caption:
          "The energy dip that is a bond: as two hydrogens approach, potential energy bottoms out at 74 pm and 436 kJ per mole.",
        alt: "Hydrogen molecule potential energy curve minimum at 74 picometres 436 kilojoules",
        keyword: "436",
      },
      {
        Component: InterVsIntramolecular,
        caption:
          "Inside strong, between weak: covalent O-H bonds survive boiling at 463 kJ/mol; the forces between molecules break at 100 C.",
        alt: "Intramolecular covalent bonds versus intermolecular forces in water",
        keyword: "intermolecular",
      },
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
      {
        Component: BalancedDietPlate,
        caption:
          "The plate as a pie chart: half vegetables and fruit, a quarter cereals, a quarter protein, plus dairy and water — the balanced diet is fractions, not fashion.",
        alt: "Balanced diet plate proportions vegetables cereals protein",
        keyword: "diet",
      },
      {
        Component: CaseinProteinSources,
        caption:
          "Casein is the slow protein: about 80% of milk protein, it clots in stomach acid and drips amino acids for hours — the contrast with fast whey is why milk feeds overnight.",
        alt: "Casein protein in milk slow digestion sources",
        keyword: "casein",
      },
      {
        Component: KwashiorkorMarasmusContrast,
        caption:
          "Two faces of starvation: kwashiorkor (protein-poor, oedema, fatty liver, the swollen belly) versus marasmus (total-calorie-poor, wasted, old-face) — deficiency type writes the symptom list.",
        alt: "Kwashiorkor versus marasmus protein energy malnutrition contrast",
        keyword: "kwashiorkor",
      },
      {
        Component: ScurvyRicketsDeficiency,
        caption:
          "Two deficiency classics: scurvy (no vitamin C → collagen fails → bleeding gums, old-sailor's disease) and rickets (no vitamin D/calcium → soft bones, bowed legs) — both cured by a nutrient, not a drug.",
        alt: "Scurvy and rickets vitamin C and D deficiency contrast",
        keyword: "rickets",
      },
      {
        Component: GoitreIodineDeficiency,
        caption:
          "Iodine's thin margin: too little and the thyroid swells into goitre, children lose IQ points (cretinism at the extreme) — iodised salt is the cheapest public-health intervention ever scaled.",
        alt: "Goitre from iodine deficiency and iodised salt",
        keyword: "goitre",
      },
      {
        Component: AnaemiaIronDeficiency,
        caption:
          "Anaemia's arithmetic: iron sits in haem's centre, so iron shortage means fewer working red cells, pale skin and fatigue — adolescent girls and pregnant women carry the highest risk.",
        alt: "Anaemia iron deficiency haemoglobin fatigue",
        keyword: "anaemia",
      },
      {
        Component: VitaminANightBlindness,
        caption:
          "Vitamin A's night shift: rhodopsin in retinal rods needs vitamin A, so deficiency shows first as night blindness and can end in keratomalacia — a red capsule prevents an avoidable blindness.",
        alt: "Vitamin A deficiency night blindness rhodopsin",
        keyword: "vitamin",
      },
      {
        Component: NutritionAdolescenceNeeds,
        caption:
          "Adolescence is a nutrition surge: rapid growth raises iron, calcium and protein demands exactly when body image and busy schedules push them down — the mismatch shows up as anaemia and stunting.",
        alt: "Adolescence nutrition needs iron calcium protein",
        keyword: "mineral",
      },
      {
        Component: ObesityBmiEpidemic,
        caption:
          "BMI in one line: weight (kg) ÷ height² (m²), with 25–30 overweight and above 30 obese — a crude but useful alarm for a problem now outpacing undernutrition worldwide.",
        alt: "Obesity BMI calculation and epidemic",
        keyword: "energy",
      },
      {
        Component: DiabetesTypesContrast,
        caption:
          "Type 1 vs type 2: type 1 is autoimmune beta-cell loss needing insulin from day one; type 2 is insulin resistance, weight-linked and often manageable with diet, exercise and tablets.",
        alt: "Diabetes type 1 versus type 2 contrast",
        keyword: "insulin",
      },
      {
        Component: DiabetesInsulinMechanism,
        caption:
          "Insulin's door-opener act: it binds receptors on muscle and fat cells, GLUT4 transporters move to the surface, glucose floods in and blood sugar falls — the mechanism type 2 resists.",
        alt: "Insulin mechanism GLUT4 glucose uptake",
        keyword: "insulin",
      },
      {
        Component: HypertensionSilentKiller,
        caption:
          "Why hypertension is silent: 140/90 mmHg damages vessels for years without a symptom, until stroke, heart failure or kidney failure arrives — the reading you never take is the one that matters.",
        alt: "Hypertension silent killer 140/90 complications",
        keyword: "blood",
      },
      {
        Component: BloodPressureReadingsChart,
        caption:
          "Read the two numbers: systole over diastole — 120/80 normal, 140/90 hypertensive, and the gap (pulse pressure) widens with stiff arteries; a cuff plus a chart is cardiovascular screening.",
        alt: "Blood pressure readings chart systolic diastolic categories",
        keyword: "blood",
      },
      {
        Component: AlcoholLiverDamageStages,
        caption:
          "The liver's three-stage surrender: fatty liver (reversible) → alcoholic hepatitis (inflamed, painful) → cirrhosis (scarred, permanent) — the stages map neatly onto how long and how heavily one drinks.",
        alt: "Alcohol liver damage stages fatty hepatitis cirrhosis",
        keyword: "alcohol",
      },
      {
        Component: AlcoholProhibitionLessons,
        caption:
          "Prohibition's report card: US alcohol ban (1920–33) cut drinking but built organised crime — Nepal's own alcohol debates echo it: demand persists, enforcement fails, regulation beats bans.",
        alt: "Alcohol prohibition lessons from US history",
        keyword: "alcohol",
      },
      {
        Component: SmokingOrganDamageMap,
        caption:
          "Smoke's organ map: lungs (cancer, COPD), heart and blood vessels (atherosclerosis, clots), mouth and throat, bladder, pancreas, and the fetus through the placenta — one habit, a body-wide invoice.",
        alt: "Smoking organ damage map lungs heart blood vessels",
        keyword: "heart",
      },
      {
        Component: SmokingCessationSteps,
        caption:
          "Quitting, staged: pick a date, expect nicotine withdrawal's two-week peak, use patches or gum for the cravings, and count the wins — 20 minutes to pulse recovery, a year to halved heart risk.",
        alt: "Smoking cessation steps nicotine withdrawal timeline",
        keyword: "heart",
      },
      {
        Component: DrugAbuseTypesChart,
        caption:
          "The drug families: depressants (alcohol, opioids — slow the brain), stimulants (cocaine, amphetamine — rev it), hallucinogens (LSD — distort it), cannabis and inhalants — each with its own harm profile.",
        alt: "Drug abuse types chart depressants stimulants hallucinogens",
        keyword: "alcohol",
      },
      {
        Component: DrugAddictionRewardLoop,
        caption:
          "Addiction hijacks a circuit: dopamine reward fires for survival behaviour; drugs fire it tenfold, the brain downshifts its own production, and ordinary joy stops registering — dependence, not weakness.",
        alt: "Drug addiction reward loop dopamine hijack",
        keyword: "hormone",
      },
      {
        Component: StressResponseBiology,
        caption:
          "Stress in two axes: adrenaline in seconds (heart races, glucose floods) and cortisol in minutes (mobilises energy, suppresses immunity) — designed for escapes, harmful when the escape never comes.",
        alt: "Stress response biology adrenaline cortisol axes",
        keyword: "hormone",
      },
      {
        Component: MentalHealthStigma,
        caption:
          "Stigma is a barrier with numbers: most mental disorders begin by the mid-teens, yet treatment lags years behind because shame delays help-seeking — naming depression a treatable illness is the first fix.",
        alt: "Mental health stigma delaying treatment",
        keyword: "mental",
      },
      {
        Component: MentalHealthDepressionMyths,
        caption:
          "Myth vs fact: depression is not weakness, not laziness, not cured by willpower — it involves serotonin and stress circuits, responds to therapy and medication, and affects about one in twenty at any time.",
        alt: "Mental health depression myths versus facts",
        keyword: "mental",
      },
      {
        Component: FoodAdulterationExamples,
        caption:
          "Adulteration's greatest hits: water in milk, brick dust in chilli, metanil yellow in turmeric, argemone in mustard oil — simple tests (iodine, dilute acid) expose most of them at home.",
        alt: "Food adulteration examples and simple tests",
        keyword: "food",
      },
      {
        Component: BloodGroupsCompatibility,
        caption:
          "The compatibility grid: A gives to A and AB, O gives to all, AB receives all — and Rh− mothers need anti-D after an Rh+ baby; mismatched blood clots in the recipient's veins.",
        alt: "Blood group compatibility ABO Rh grid",
        keyword: "blood",
      },
      {
        Component: RhesusFactorPregnancy,
        caption:
          "The Rh story: an Rh− mother sensitised by an Rh+ baby makes antibodies that attack the next baby's cells — anti-D immunoglobulin at 28 weeks and after birth breaks the cycle.",
        alt: "Rhesus factor pregnancy anti-D immunoglobulin",
        keyword: "blood",
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
      {
        Component: CancerCausesPrevention,
        caption:
          "Cancer is mitosis out of control: carcinogens mutate the checkpoint genes (oncogenes on, tumour suppressors off), clones expand, metastasis spreads — no single cause, so prevention stacks: no tobacco, vaccines, screens.",
        alt: "Cancer causes carcinogens mutation and prevention",
        keyword: "cancer",
      },
      {
        Component: DownSyndromeTrisomy21,
        caption:
          "Trisomy 21 explained: non-disjunction in meiosis leaves an extra chromosome 21 — risk rises with maternal age, and the karyotype (47 chromosomes) is the diagnostic picture.",
        alt: "Down syndrome trisomy 21 non-disjunction karyotype",
        keyword: "trisomy",
      },
      {
        Component: MendelDihybridRatioDetail,
        caption:
          "The 9:3:3:1 in detail: two heterozygous loci assort independently, the Punnett grid yields 9 round-yellow, 3 round-green, 3 wrinkled-yellow, 1 wrinkled-green — Mendel's second law in sixteen boxes.",
        alt: "Mendel dihybrid cross 9:3:3:1 Punnett square detail",
        keyword: "gene",
      },
      {
        Component: SexDeterminationMechanism,
        caption:
          "The XX/XY coin toss: the mother's ovum always carries X; the father's sperm carries X or Y — SRY on the Y switches the embryonic gonads toward testes; sex is a sperm-level lottery.",
        alt: "Sex determination XX XY mechanism SRY",
        keyword: "chromosome",
      },
      {
        Component: HaemophiliaInheritance,
        caption:
          "Haemophilia rides the X: a carrier mother (XᴴXʰ) passes the bleeding disorder to half her sons — queen-carrier pedigrees made this the textbook sex-linked cross.",
        alt: "Haemophilia X-linked inheritance pedigree",
        keyword: "gene",
      },
      {
        Component: ColourBlindnessTest,
        caption:
          "Ishihara's hidden numbers: red-green colour blindness is X-linked (about 8% of men, 0.5% of women), and the dot-plate test turns a genotype into a five-second diagnosis.",
        alt: "Colour blindness Ishihara test X-linked inheritance",
        keyword: "gene",
      },
      {
        Component: ThalassemiaInheritance,
        caption:
          "Thalassaemia's autosomal recessive maths: two carrier parents give a 1-in-4 affected child — in Nepal's Tharu and hill populations, carrier screening before marriage is the intervention.",
        alt: "Thalassemia autosomal recessive inheritance carrier screening",
        keyword: "gene",
      },
      {
        Component: GeneticCounsellingSession,
        caption:
          "A counselling session, staged: pedigree drawn → risk calculated → options laid out (testing, prenatal diagnosis, none) → decision left to the family — the counsellor informs, never decides.",
        alt: "Genetic counselling session pedigree risk options",
        keyword: "karyotype",
      },
      {
        Component: CancerHallmarks,
        caption:
          "Cancer's hallmarks in one panel: evades checkpoints, resists apoptosis, invites its own blood supply, ignores stop signals, replicates without limits and finally metastasises — mitosis with the brakes removed.",
        alt: "Cancer hallmarks checkpoints apoptosis angiogenesis metastasis",
        keyword: "cancer",
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
      {
        Component: AntibioticMechanismTargets,
        caption:
          "Why antibiotics choose sides: they target bacterial 70S ribosomes, cell walls, DNA gyrase or folate synthesis — our 80S ribosomes and absent walls are why the bullets miss us.",
        alt: "Antibiotic mechanism targets ribosomes cell wall folate",
        keyword: "antibiotic",
      },
      {
        Component: AntibioticOveruseLivestock,
        caption:
          "Antibiotics on the farm: routine low doses for growth promotion breed resistant gut bacteria that reach people through food, workers and water — the WHO now lists this among the top health threats.",
        alt: "Antibiotic overuse in livestock breeding resistance",
        keyword: "antibiotic",
      },
      {
        Component: AntimicrobialResistanceTimeline,
        caption:
          "The resistance clock: penicillin (1928) resisted by the 1940s; each new class buys a decade or two — the pipeline is thinning while use widens, which is why stewardship is now a global emergency.",
        alt: "Antimicrobial resistance timeline from penicillin onward",
        keyword: "antibiotic",
      },
      {
        Component: TuberculosisTransmissionCycle,
        caption:
          "TB's slow chain: airborne droplet nuclei from a cough → alveoli → latent pause (most people) → reactivation when immunity dips — the latent 25% is the world's reserve of future cases.",
        alt: "Tuberculosis transmission cycle latent and active TB",
        keyword: "tuberculosis",
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
      {
        Component: HIVTransmissionRoutes,
        caption:
          "HIV travels by fluid, not by touch: unprotected sex, shared needles, mother-to-child at birth or breastfeeding — and not by mosquitoes, hugging or shared meals; the distinctions are the whole public-health message.",
        alt: "HIV transmission routes and misconceptions",
        keyword: "HIV",
      },
      {
        Component: ImmunityTypesMap,
        caption:
          "Immunity's map: innate (skin, fever, phagocytes — from birth) versus adaptive (B-cell antibodies, T-cell killers — learned), active (your own response) versus passive (borrowed antibodies) — four quadrants.",
        alt: "Immunity types map innate adaptive active passive",
        keyword: "immune",
      },
      {
        Component: AllergyMechanism,
        caption:
          "Allergy is immune overkill: a harmless antigen triggers IgE, mast cells release histamine, and vasodilation, itching and bronchospasm follow — anaphylaxis is the same cascade at full volume.",
        alt: "Allergy mechanism IgE mast cells histamine anaphylaxis",
        keyword: "immune",
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
      {
        Component: GeneticEngineeringInsulin,
        caption:
          "Insulin from a fermenter: the human insulin gene inserted into a plasmid, carried into E. coli, expressed, harvested and purified — the 1982 switch from pig pancreas to bacterial breweries.",
        alt: "Genetic engineering of insulin in bacteria steps",
        keyword: "insulin",
      },
      {
        Component: GeneTherapyConcept,
        caption:
          "Gene therapy in one sentence: deliver a working copy of a broken gene with a vector (often a disabled virus) — approved for some immune defects and inherited blindness, still priced like a moonshot.",
        alt: "Gene therapy concept vector delivering functional gene",
        keyword: "therapy",
      },
      {
        Component: CrisprMechanismSteps,
        caption:
          "CRISPR's three steps: guide RNA matches the target DNA, Cas9 cuts both strands, and repair or replacement follows — bacterial immunity repurposed into the cheapest editing tool in biology.",
        alt: "CRISPR Cas9 mechanism steps guide RNA cut repair",
        keyword: "crispr",
      },
      {
        Component: GeneticEngineeringStepsDetail,
        caption:
          "Recombinant DNA, the full recipe: isolate the gene, cut with restriction enzymes, ligate into a vector, transform the host, select with markers, then screen, express and scale up.",
        alt: "Genetic engineering steps restriction ligation transformation selection",
        keyword: "recombinant",
      },
      {
        Component: TissueCultureMicropropagation,
        caption:
          "Micropropagation's assembly line: explant → sterile medium with auxin and cytokinin → shoots → roots → hardening off — one orchid bud becomes a million identical plants in months.",
        alt: "Tissue culture micropropagation stages explant to plantlet",
        keyword: "culture",
      },
      {
        Component: GmoDebateVerdicts,
        caption:
          "The GMO verdict sheet: Bt cotton and golden rice deliver real gains; gene flow, corporate seed lock-in and labelling demands are real costs — judge trait by trait, not slogan by slogan.",
        alt: "GMO debate benefits and risks verdicts",
        keyword: "gmo",
      },
      {
        Component: CloningEthicsDebate,
        caption:
          "Cloning's two doors: reproductive cloning (Dolly, 1996 — inefficient and ethically blocked for humans) versus therapeutic cloning for stem cells — the same technique, two different moral ledgers.",
        alt: "Cloning ethics reproductive versus therapeutic debate",
        keyword: "clone",
      },
      {
        Component: StemCellsTypesPotency,
        caption:
          "Stem cells by potency: totipotent (everything, from the first divisions), pluripotent (any tissue, from the blastocyst), multipotent (blood, skin) — potency is the whole ethical argument.",
        alt: "Stem cell types potency totipotent pluripotent multipotent",
        keyword: "stem",
      },
      {
        Component: OrganDonationTransplantImmunologyDetail,
        caption:
          "Transplant immunology in one line: HLA mismatch triggers hyperacute, acute or chronic rejection, so matching plus lifelong immunosuppression is the price — infection risk traded for survival.",
        alt: "Organ transplant immunology HLA matching rejection immunosuppression",
        keyword: "organ",
      },
      {
        Component: OrganTransplantImmunology,
        caption:
          "Why transplants reject: the recipient's T cells read donor HLA molecules as foreign — cross-matching, tissue typing and immunosuppressants like ciclosporin manage the standoff.",
        alt: "Organ transplant rejection immunology HLA tissue typing",
        keyword: "organ",
      },
      {
        Component: PacemakersDefibrillators,
        caption:
          "Two machines, two jobs: a pacemaker paces a heart that beats too slowly; a defibrillator resets one that quivers — implantable versions now talk to phones and run a decade on one battery.",
        alt: "Pacemakers and defibrillators roles comparison",
        keyword: "medicine",
      },
      {
        Component: MriCtXrayUltrasoundComparison,
        caption:
          "Four windows into the body: X-ray for bones, CT for fast 3-D slices, MRI for soft tissue without radiation, ultrasound for live motion and unborn children — each trades detail, speed and dose.",
        alt: "MRI CT X-ray ultrasound imaging comparison",
        keyword: "medicine",
      },
      {
        Component: TelemedicineRuralAccess,
        caption:
          "Telemedicine closes distance: a phone camera, a rural health post and a specialist in Kathmandu — for Nepal's terrain, teleconsults are not a luxury but the only scalable specialist reach.",
        alt: "Telemedicine rural access remote consultation",
        keyword: "medicine",
      },
      {
        Component: KidneyDialysisMachine,
        caption:
          "The dialysis machine is a kidney's understudy: blood passes a semipermeable membrane against dialysate, waste diffuses out, clean blood returns — three sessions a week substitutes for one organ.",
        alt: "Kidney dialysis machine membrane dialysate diffusion",
        keyword: "medicine",
      },
      {
        Component: VaccineColdChain,
        caption:
          "The cold chain is the vaccine's lifeline: 2–8 °C from factory to arm, with ice-lined refrigerators, vaccine vial monitors and outreach plans — a broken link is a wasted dose and a missed child.",
        alt: "Vaccine cold chain 2-8 degrees storage transport",
        keyword: "vaccine",
      },
      {
        Component: VaccineTypesChart,
        caption:
          "Vaccines by recipe: live-attenuated (measles, BCG), inactivated (rabies), toxoid (tetanus), subunit/conjugate (Hepatitis B, Hib) and mRNA — each trades effectiveness against stability and safety.",
        alt: "Vaccine types live attenuated inactivated toxoid subunit mRNA",
        keyword: "vaccine",
      },
      {
        Component: ImmunisationVsVaccination,
        caption:
          "Vaccination vs immunisation: vaccination is the act (the jab), immunisation is the outcome (protection) — you can vaccinate without immunising if the cold chain or schedule fails.",
        alt: "Vaccination versus immunisation distinction",
        keyword: "vaccine",
      },
      {
        Component: ImmunisationScheduleChart,
        caption:
          "Nepal's immunisation timetable: BCG and OPV at birth, pentavalent and PCV in the first months, measles-rubella at 9 and 12 months — a schedule is immunity engineering, not a suggestion.",
        alt: "Immunisation schedule chart Nepal BCG OPV measles",
        keyword: "vaccine",
      },
      {
        Component: VaccineHesitancyInfodemic,
        caption:
          "Hesitancy's three Cs: complacency, convenience and confidence — the retracted autism myth outlived its paper, so empathy and trusted local messengers now matter more than data posters.",
        alt: "Vaccine hesitancy 3Cs complacency convenience confidence",
        keyword: "vaccine",
      },
      {
        Component: BloodDonationCycle,
        caption:
          "The donation loop: a 450 ml unit, tested and separated into red cells, plasma and platelets, can serve three patients — red cells for anaemia, plasma for burns, platelets for dengue and cancer care.",
        alt: "Blood donation cycle separation into components",
        keyword: "blood",
      },
      {
        Component: BloodDonationProcess,
        caption:
          "Donation, minute by minute: registration, haemoglobin and pressure checks, 8–10 minutes of collection, juice and rest — a healthy adult replaces the plasma in a day and the cells in weeks.",
        alt: "Blood donation process steps registration to refreshments",
        keyword: "blood",
      },
      {
        Component: HippocraticOathEthics,
        caption:
          "The oath's four load-bearing beams: do no harm, benefit the patient, keep confidence, never exploit — modern bioethics adds autonomy, justice and informed consent to the same frame.",
        alt: "Hippocratic oath ethics principles do no harm confidentiality",
        keyword: "ethical",
      },
      {
        Component: IvfEthicsSurplusEmbryos,
        caption:
          "IVF's surplus question: extra embryos from one cycle can be frozen, donated, used in research or discarded — each option is a different answer to 'when does moral status begin?'",
        alt: "IVF ethics surplus embryo options freezing donation research",
        keyword: "ethical",
      },
      {
        Component: TestTubeBabyMilestonesDetail,
        caption:
          "From failure to routine: 1978's Louise Brown followed decades of scepticism; ICSI (1992) let one injected sperm overcome male infertility — IVF now accounts for a few percent of births in many countries.",
        alt: "Test tube baby milestones Louise Brown ICSI IVF history",
        keyword: "ethical",
      },
      {
        Component: AmniocentesisEthics,
        caption:
          "Amniocentesis cuts both ways: it diagnoses chromosomal disorders at 15–18 weeks, and its misuse for sex selection is why Nepal bans disclosure of fetal sex — a test is never neutral.",
        alt: "Amniocentesis ethics diagnosis versus sex selection ban",
        keyword: "ethical",
      },
      {
        Component: AmniocentesisChromosomeTest,
        caption:
          "What the amniotic fluid holds: fetal cells shed into the sample are karyotyped and tested — trisomy 21, thalassaemia and neural-tube markers (AFP) all readable from one 15 ml draw.",
        alt: "Amniocentesis chromosome test karyotype procedure",
        keyword: "test",
      },
      {
        Component: AntibodyStructureYShape,
        caption:
          "The Y is the function: two heavy and two light chains form an antibody whose arms bind one antigen and whose stem calls the immune system — the shape that makes monoclonal antibody drugs possible.",
        alt: "Antibody Y-shaped structure heavy light chains antigen binding",
        keyword: "monoclonal",
      },
      {
        Component: IVFStepsTimeline,
        caption:
          "IVF, step by step: hormonal stimulation → egg retrieval → sperm preparation → fertilisation in vitro → 3–5 day embryo culture → transfer or freeze — about two weeks per attempt.",
        alt: "IVF steps timeline stimulation retrieval fertilisation transfer",
        keyword: "in vitro",
      },
      {
        Component: TestTubeBabyMilestones,
        caption:
          "Milestones of the test-tube era: Louise Brown (1978) proved it possible; ICSI (1992) overcame male infertility; today several percent of births in some countries begin in a dish.",
        alt: "Test tube baby milestones Louise Brown 1978 ICSI 1992",
        keyword: "in vitro",
      },
      {
        Component: TissueCultureSteps,
        caption:
          "Tissue culture's five steps: select an explant, sterilise it, place it on nutrient medium with hormones, induce shoots then roots, and harden plantlets off — cloning a plant without seeds.",
        alt: "Tissue culture steps explant sterilise medium hardening",
        keyword: "tissue",
      },
    ],
  },
  "ecosystem-ecology-concept-of-ecology-biotic-and-abiotic-factors-species-interactions": {
    title: "Ecology, factors and interactions",
    figures: [
      {
        Component: EcologyLevelsLadder,
        caption:
          "Ecology climbs four rungs: organism, population, community, ecosystem — each level adds the one below plus new interactions.",
        alt: "Ecology levels organism population community ecosystem ladder with examples",
        keyword: "population",
      },
      {
        Component: AbioticFactorDials,
        caption:
          "Four abiotic dials set the scene: light, temperature, water and soil — every species is tuned to a narrow band on each dial.",
        alt: "Abiotic factors light temperature water soil dial diagram",
        keyword: "abiotic",
      },
      {
        Component: MutualismCaseStudies,
        caption:
          "Mutualism (++): lichen, mycorrhiza, pollination and Rhizobium — four partnerships where both partners profit and neither does as well alone.",
        alt: "Mutualism case studies lichen mycorrhiza pollination Rhizobium",
        keyword: "mutualism",
      },
      {
        Component: CommensalismExamples,
        caption:
          "Commensalism (+/0): the egret follows the cattle, the orchid rides the branch, the remora rides the shark — one gains, the other never notices.",
        alt: "Commensalism examples cattle egret epiphytes remora dung beetle",
        keyword: "commensalism",
      },
      {
        Component: PredationArmsRace,
        caption:
          "Predation (+/−) drives an arms race: camouflage, warning colours and speed against sharper eyes and better ambush — with predator peaks trailing prey peaks.",
        alt: "Predation arms race prey defences and population oscillation",
        keyword: "predation",
      },
      {
        Component: ParasitismHostTypes,
        caption:
          "Parasitism (+/−) by address: ectoparasites on the surface, endoparasites inside, vector-borne via mosquitoes, and Cuscuta tapping another plant's plumbing.",
        alt: "Parasitism host types ecto endo vector borne plant parasite",
        keyword: "parasitism",
      },
      {
        Component: CompetitionOverlap,
        caption:
          "Competition (−/−): overlapping resource needs end either in competitive exclusion or in resource partitioning — one survivor or two specialists.",
        alt: "Competition niche overlap exclusion and resource partitioning",
        keyword: "competition",
      },
      {
        Component: EcosystemServicesCategories,
        caption:
          "Ecosystem services in four baskets: provisioning (food, timber), regulating (climate, flood), cultural (recreation, sacred sites) and supporting (soil, nutrient cycles) — the framework that prices a forest properly.",
        alt: "Ecosystem services four categories provisioning regulating cultural supporting",
        keyword: "ecosystem",
      },
      {
        Component: PollinationServicesBees,
        caption:
          "Pollination is a service with a bill: about a third of food crops depend on animal pollinators, and bee declines carry a measurable yield cost — mutualism, monetised.",
        alt: "Pollination services by bees and crop dependence",
        keyword: "pollination",
      },
    ],
  },
  "food-chain-food-web-trophic-level-ecological-pyramids-productivity": {
    title: "Food chains, pyramids and productivity",
    figures: [
      {
        Component: FoodChainTypes,
        caption:
          "Two energy highways: the grazing chain runs producer → herbivore → carnivore on living tissue; the detritus chain runs litter → decomposer → predator on dead tissue.",
        alt: "Grazing versus detritus food chain comparison",
        keyword: "grazing",
      },
      {
        Component: TrophicLevelPositions,
        caption:
          "Trophic addresses: T1 producers, T2 herbivores, T3 carnivores, T4 top carnivores — omnivores straddle levels and decomposers run their own channel.",
        alt: "Trophic level positions with examples at each level",
        keyword: "trophic",
      },
      {
        Component: EcologicalPyramidsThree,
        caption:
          "Three pyramids: numbers can invert (one tree, many insects), biomass can invert in the ocean, but the energy pyramid never inverts — thermodynamics forbids it.",
        alt: "Ecological pyramids of number biomass and energy compared",
        keyword: "pyramid",
      },
      {
        Component: InvertedPyramidsWhy,
        caption:
          "Why pyramids flip: numbers count heads not size, and ocean biomass inverts because phytoplankton multiply in days — high turnover, small standing crop.",
        alt: "Inverted pyramids tree insects and ocean phytoplankton explanation",
        keyword: "inverted",
      },
      {
        Component: TenPercentLawSteps,
        caption:
          "The 10% law in action: each transfer keeps about a tenth of the energy as tissue and loses the rest as heat — which is why chains stop at 4–5 steps.",
        alt: "Ten percent law energy shrinking per trophic level",
        keyword: "percent",
      },
      {
        Component: GppNppEquation,
        caption:
          "NPP = GPP − R: gross productivity is the plant's full income, net is what survives its own respiration — the food every consumer depends on.",
        alt: "GPP NPP equation with respiration and worked example",
        keyword: "NPP",
      },
      {
        Component: FoodWebComplexity,
        caption:
          "A chain is fragile, a web is resilient: interwoven food paths give every species alternatives, so one missing link no longer starves the top.",
        alt: "Food web complexity resilience versus simple chain fragility",
        keyword: "web",
      },
      {
        Component: TrophicCascadeWolvesYellowstone,
        caption:
          "The wolf rewrote Yellowstone: wolves → fewer elk → taller willows and aspen → songbirds, beavers and stabilised rivers — a trophic cascade is ecology's proof that predators are infrastructure.",
        alt: "Trophic cascade of wolves in Yellowstone elk willows rivers",
        keyword: "trophic",
      },
    ],
  },
  "concept-of-ecosystem-structural-and-functional-aspects-of-pond-and-forest-ecosystem": {
    title: "Pond and forest ecosystems",
    figures: [
      {
        Component: EcosystemStructureFunction,
        caption:
          "Structure is the cast — producers, consumers, decomposers plus abiotic factors; function is the play — energy flow, cycling, productivity, homeostasis.",
        alt: "Ecosystem structure versus function components and processes",
        keyword: "functional",
      },
      {
        Component: PondFunctionalGroups,
        caption:
          "One pond, three working groups: rooted plants and phytoplankton fix sunlight, zooplankton and fish eat, bacteria and fungi in the mud recycle.",
        alt: "Pond functional groups producers consumers decomposers",
        keyword: "pond",
      },
      {
        Component: PondZonationDetail,
        caption:
          "Pond zones follow light: littoral edge with rooted plants, limnetic open water, dark profundal, and the benthic mud where decomposers finish the work.",
        alt: "Pond zonation littoral limnetic profundal benthic with organisms",
        keyword: "littoral",
      },
      {
        Component: PondFoodWeb,
        caption:
          "The pond food web: algae and water plants feed zooplankton and larvae, which feed small fish, which feed big fish — arrows point where the energy goes.",
        alt: "Pond food web with algae zooplankton fish energy arrows",
        keyword: "plankton",
      },
      {
        Component: DecomposerRoleCycle,
        caption:
          "Decomposers close the loop: saprophytic enzymes digest dead matter outside the body, releasing nutrients back to soil — the bridge between biotic and abiotic.",
        alt: "Decomposer role cycle bacteria fungi nutrient recycling",
        keyword: "decomposer",
      },
      {
        Component: EcosystemHomeostasis,
        caption:
          "Homeostasis by feedback: deer rise, grass falls, deer starve, grass recovers — the loop corrects itself, but only within limits and only with diversity intact.",
        alt: "Ecosystem homeostasis negative feedback loop deer grass",
        keyword: "homeostasis",
      },
      {
        Component: PondForestContrast,
        caption:
          "Pond vs forest: same three functional groups and the same energy flow — only the players and the geometry differ, zones by depth versus layers by height.",
        alt: "Pond versus forest ecosystem comparison table",
        keyword: "forest",
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
      {
        Component: NitrogenFixationRoutes,
        caption:
          "Four doors into the nitrogen cycle: lightning, Rhizobium in nodules, free-living fixers, and the Haber industry — all breaking the N₂ triple bond.",
        alt: "Nitrogen fixation routes lightning Rhizobium free living Haber",
        keyword: "fixation",
      },
      {
        Component: DenitrificationLoopClosure,
        caption:
          "After fixation: ammonification, nitrification, assimilation — and denitrification returning N₂ to the air, closing the loop that fertiliser opens.",
        alt: "Ammonification nitrification assimilation denitrification steps",
        keyword: "denitrification",
      },
      {
        Component: CarbonCycleHumanWarp,
        caption:
          "The human warp on carbon: fossil combustion and deforestation push sources above sinks, so atmospheric CO₂ climbs instead of holding steady.",
        alt: "Carbon cycle human disruption fossil fuels deforestation sinks",
        keyword: "fossil",
      },
      {
        Component: XerosereStages,
        caption:
          "Xerosere on bare rock: crustose lichens dissolve stone, mosses catch crumbs, grasses bind soil, shrubs shade pioneers — a forest built from nothing.",
        alt: "Xerosere stages lichen moss grass shrub forest on bare rock",
        keyword: "xerosere",
      },
      {
        Component: HydrarchSuccession,
        caption:
          "Hydrarch succession: open water fills with silt through submerged, floating and reed stages until sedge-meadow and finally forest own the old pond bed.",
        alt: "Hydrarch succession pond to forest stages",
        keyword: "hydrarch",
      },
      {
        Component: ClimaxCommunityTraits,
        caption:
          "The climax community: stable composition, maximum biomass, near-perfect recycling and self-replacement — set by climate, not by chance.",
        alt: "Climax community traits stable biomass efficient",
        keyword: "climax",
      },
      {
        Component: SuccessionDirectionRules,
        caption:
          "Succession has a direction: biomass, diversity, soil and food-web length all rise — primary starts from bare rock, secondary from disturbed soil.",
        alt: "Succession direction trends and primary versus secondary",
        keyword: "sere",
      },
      {
        Component: CarbonCycleReservoirsFluxes,
        caption:
          "Carbon's four reservoirs: atmosphere (~870 GtC), oceans (~38,000), soils and fossil deposits, and living biomass — photosynthesis and respiration balance the short-term fluxes; we are unbalancing the deep ones.",
        alt: "Carbon cycle reservoirs atmosphere ocean soil biomass fluxes",
        keyword: "carbon",
      },
      {
        Component: NitrogenCycleHumanDisruption,
        caption:
          "We broke the nitrogen cycle: Haber-Bosch now fixes more nitrogen than all land plants, and the surplus runs off as eutrophication, N₂O warming and acid rain — fertiliser's fine print.",
        alt: "Nitrogen cycle human disruption Haber-Bosch runoff",
        keyword: "nitrogen",
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
      {
        Component: CamPhotosynthesisNight,
        caption:
          "CAM, the night shift: stomata open in cool darkness to bank CO₂ as malic acid, then close all day while photosynthesis runs on the stored gas.",
        alt: "CAM photosynthesis night CO2 fixation day acid release",
        keyword: "CAM",
      },
      {
        Component: HydrophyteInternalAnatomy,
        caption:
          "Inside a hydrophyte leaf: aerenchyma air canals for buoyancy, thin cuticle, reduced xylem and no stomata — every drought defence switched off.",
        alt: "Hydrophyte leaf anatomy aerenchyma reduced xylem",
        keyword: "aerenchyma",
      },
      {
        Component: XerophyteRootLeafTrade,
        caption:
          "The xerophyte budget: water-storage tissue, thick cuticle and CAM are bought with the loss of broad leaves — survival over speed.",
        alt: "Xerophyte root leaf trade-off investment sacrifice",
        keyword: "succulent",
      },
      {
        Component: HalophyteMangroveKit,
        caption:
          "The mangrove kit: salt glands excrete crystals, roots filter salt, pneumatophores breathe above the mud, and seedlings plant themselves while still on the tree.",
        alt: "Halophyte mangrove adaptations salt glands pneumatophores vivipary",
        keyword: "halophyte",
      },
      {
        Component: AnimalWaterSavingKit,
        caption:
          "The desert mammal's kit: concentrated urine, moisture-recycling noses, night-time habits and metabolic water from fat — every drop counted twice.",
        alt: "Animal water saving adaptations desert mammals",
        keyword: "desert",
      },
      {
        Component: MesophyteMiddlePath,
        caption:
          "Mesophytes, the balanced majority: normal cuticle and stomata, broad leaves, good roots — nearly all our crops, and helpless in true drought.",
        alt: "Mesophyte middle path features between hydrophyte and xerophyte",
        keyword: "mesophyte",
      },
      {
        Component: AdaptationCompromise,
        caption:
          "Adaptation is a compromise: cactus spines save water but cost growth, peacock tails win mates but invite predators — every trait is paid for.",
        alt: "Adaptation compromise trade-offs benefit and cost",
        keyword: "trade",
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
      {
        Component: GreenhouseGasSources,
        caption:
          "Four greenhouse gases, four sources: CO₂ from fuel and felled forest, CH₄ from paddies and cattle, N₂O from fertiliser, CFCs from old appliances.",
        alt: "Greenhouse gas sources CO2 CH4 N2O CFCs",
        keyword: "methane",
      },
      {
        Component: MontrealProtocolSuccess,
        caption:
          "Montreal Protocol, the treaty that worked: CFCs phased out worldwide, chlorine now falling, ozone healing — proof that global problems can be fixed.",
        alt: "Montreal Protocol timeline ozone healing success",
        keyword: "montreal",
      },
      {
        Component: AcidRainPhScale,
        caption:
          "Acid rain on the pH scale: normal rain is already 5.6 from CO₂; SO₂ and NOx push it toward 4 — fish eggs fail, soil turns toxic, marble dissolves.",
        alt: "Acid rain pH scale comparison with damage effects",
        keyword: "pH",
      },
      {
        Component: UvPenetrationComparison,
        caption:
          "Healthy ozone stops UV-B and UV-C at 25 km; thinned ozone lets them through — skin cancer, cataracts and plankton die-off follow.",
        alt: "UV penetration healthy versus thinned ozone layer",
        keyword: "UV",
      },
      {
        Component: OzoneVsGreenhouse,
        caption:
          "Two different sky problems: ozone depletion lets UV through the stratosphere, the greenhouse effect traps heat near the surface — CFCs do both.",
        alt: "Ozone depletion versus greenhouse effect comparison",
        keyword: "CFCs",
      },
      {
        Component: MitigationAdaptationPair,
        caption:
          "Two answers to warming: mitigation cuts the cause (solar, EVs, forests kept standing); adaptation softens the impact (embankments, hardier crops).",
        alt: "Mitigation versus adaptation climate responses",
        keyword: "mitigation",
      },
      {
        Component: ImbalanceChainReaction,
        caption:
          "The imbalance cascade: CO₂ → temperature → ice and sea level → monsoon shift → failing crops — one push, and everything downstream moves.",
        alt: "Imbalance chain reaction climate cascade effects",
        keyword: "monsoon",
      },
      {
        Component: ClimateChangeStrategies,
        caption:
          "Two strategies, one crisis: mitigation cuts emissions at the source (renewables, efficiency, forests), adaptation redesigns life around the change already locked in — Nepal needs both, because the Himalaya warms faster than the average.",
        alt: "Climate change mitigation and adaptation strategies",
        keyword: "climate",
      },
      {
        Component: OzoneProtectionSuccess,
        caption:
          "The Montreal Protocol is environmentalism's best news: every nation signed, CFCs phased out, and the ozone hole is projected to heal near mid-century — proof that a global problem can meet a global answer.",
        alt: "Montreal Protocol ozone layer recovery success",
        keyword: "Montreal",
      },
      {
        Component: GreenhouseEffectMechanism,
        caption:
          "The mechanism in three lines: sunlight passes in, the warm surface re-radiates infrared, greenhouse gases absorb and re-emit it downward — a blanket that works only because we keep thickening it.",
        alt: "Greenhouse effect mechanism solar radiation infrared absorption",
        keyword: "greenhouse",
      },
      {
        Component: SeaLevelRiseMechanism,
        caption:
          "Two engines of sea-level rise: warming water expands (steric), and melting land ice adds mass — thermal expansion alone has already contributed more than many coastal planners assumed.",
        alt: "Sea level rise mechanism thermal expansion and ice melt",
        keyword: "sea",
      },
      {
        Component: AcidRainBuildings,
        caption:
          "Acid rain eats marble: H₂SO₄ converts calcium carbonate into gypsum, which washes away — the Taj Mahal and Kathmandu's shrines wear the same chemical signature.",
        alt: "Acid rain damage to marble buildings and statues",
        keyword: "marble",
      },
      {
        Component: AcidRainFormationChemistry,
        caption:
          "The chemistry of acid rain: SO₂ + H₂O → H₂SO₃ → H₂SO₄; NO₂ + H₂O → HNO₃ — sulfuric and nitric acids condensed on dust and droplets, delivered with the next shower.",
        alt: "Acid rain formation chemistry SO2 NO2 to sulfuric nitric acid",
        keyword: "acid",
      },
      {
        Component: OzoneDepletionChemistry,
        caption:
          "One chlorine atom, a thousand holes: Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂ — the catalyst regenerates, so a single CFC molecule destroys ozone for decades.",
        alt: "Ozone depletion chemistry chlorine catalytic cycle",
        keyword: "ozone",
      },
      {
        Component: GreenhouseGasSourcesSectors,
        caption:
          "Where emissions come from: energy tops every chart, then industry, agriculture, transport and buildings — methane leaks from rice, ruminants and landfills make agriculture the surprise second column.",
        alt: "Greenhouse gas sources by sector energy agriculture transport",
        keyword: "warming",
      },
      {
        Component: ClimateRefugeeDisplacement,
        caption:
          "Climate moves people: sea-level rise, drought, floods and glacial-lake outbursts displace millions — climate refugees are the migration story the twenty-first century will be measured by.",
        alt: "Climate refugee displacement from sea level drought floods",
        keyword: "warming",
      },
      {
        Component: InvasiveSpeciesNepal,
        caption:
          "Biological invasion, Nepali edition: water hyacinth choking lakes, mikania smothering Chitwan's grasslands, argemone in fallows — the second-greatest extinction driver, arriving as an ornamental.",
        alt: "Invasive alien species in Nepal water hyacinth mikania",
        keyword: "invasion",
      },
      {
        Component: RenewableSourcesComparison,
        caption:
          "The renewable scoreboard: hydro is Nepal's giant (tens of thousands of MW potential), solar is the fastest to install, wind is site-specific, biogas is rural gold — each has a capacity factor and a cost.",
        alt: "Renewable energy sources comparison hydro solar wind biogas",
        keyword: "renewable",
      },
      {
        Component: EnergyConsumptionLadder,
        caption:
          "Energy use climbs with income: firewood → kerosene → LPG → electricity — the ladder's rungs are development's rungs, and each step up cuts indoor smoke but raises emissions.",
        alt: "Energy consumption ladder firewood to electricity",
        keyword: "energy",
      },
      {
        Component: EnergyLadderDevelopment,
        caption:
          "Households climb the energy ladder as income allows: wood and dung indoors (smoke, deforestation) → kerosene → LPG and electricity — Nepal's LPG imports tell the climb's speed.",
        alt: "Energy ladder of development household cooking fuels",
        keyword: "energy",
      },
      {
        Component: SolarHomeSystemsNepal,
        caption:
          "Solar home systems lit the off-grid hills: a panel, battery, controller and a few lamps replaced kerosene for hundreds of thousands of Nepali households before the grid arrived.",
        alt: "Solar home systems in Nepal off-grid electrification",
        keyword: "renewable",
      },
      {
        Component: SolarPvHowItWorks,
        caption:
          "The photovoltaic effect: a photon knocks an electron across a silicon p-n junction, DC flows, an inverter makes it usable — no moving parts, no fuel, decades of output from one panel.",
        alt: "Solar PV how it works photon silicon p-n junction",
        keyword: "renewable",
      },
      {
        Component: WindEnergyTurbines,
        caption:
          "Wind power's maths: output scales with the cube of wind speed, so siting is everything — Nepal's valleys are channellers, but turbulence and monsoon lulls set the limits.",
        alt: "Wind energy turbines cubic power law siting",
        keyword: "renewable",
      },
      {
        Component: NuclearEnergyProsCons,
        caption:
          "Nuclear's ledger: one pellet ≈ a tonne of coal, near-zero carbon in operation — against waste that outlives civilisations, high build costs and rare but unforgettable accidents.",
        alt: "Nuclear energy pros and cons waste carbon accidents",
        keyword: "energy",
      },
      {
        Component: NuclearFissionReactor,
        caption:
          "Inside the reactor: U-235 fissions, neutrons chain, control rods throttle, water carries heat to a turbine — the same steam cycle as coal, with a different fire.",
        alt: "Nuclear fission reactor components chain reaction control rods",
        keyword: "energy",
      },
      {
        Component: FossilFuelFormationTimescales,
        caption:
          "Fossil fuel's timescale trap: coal from 300-million-year-old swamp forests, oil and gas from ancient marine plankton — we burn in decades what took geological ages to bank.",
        alt: "Fossil fuel formation timescales coal oil gas",
        keyword: "energy",
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
      {
        Component: MastigophoraFlagella,
        caption:
          "Mastigophora move by flagella — one long forward whip plus a shorter trailing one, with a blind flagellar pocket at the front and pellicle-backed undulation for swimming.",
        alt: "Mastigophora flagella arrangement with forward and trailing whips and flagellar pocket",
        keyword: "mastigophora",
      },
      {
        Component: CiliophoraCiliaRows,
        caption:
          "Ciliophora row their cilia in precise longitudinal lines — coordinated beating rows make Paramecium the fastest swimmer among protozoa, reversible to back up.",
        alt: "Ciliophora cilia rows in longitudinal lines with coordinated beating and reversal",
        keyword: "ciliophora",
      },
      {
        Component: SporozoaNoLocomotion,
        caption:
          "Sporozoans have no locomotor organelles at all — they glide passively inside host cells, an entirely parasitic life with no need to swim or crawl.",
        alt: "Sporozoa without locomotor organelles living inside host cells",
        keyword: "sporozoa",
      },
      {
        Component: TrypanosomaProfile,
        caption:
          "Trypanosoma: a single flagellum runs the body length as an undulating membrane — the sleeper's whip that drives sleeping sickness via tsetse fly bites.",
        alt: "Trypanosoma with undulating membrane flagellum and tsetse fly transmission",
        keyword: "trypanosoma",
      },
      {
        Component: OsmoregulationContractileVacuole,
        caption:
          "Freshwater protozoa constantly take in water by osmosis — the contractile vacuole collects it radially and squeezes it out, keeping the cell from bursting.",
        alt: "Contractile vacuole osmoregulation with radiating canals expelling excess water",
        keyword: "contractile",
      },
      {
        Component: EncystmentSurvival,
        caption:
          "When ponds dry, amoeba encysts: a protective wall seals in the dormant cell until water returns — cysts also spread infection between hosts.",
        alt: "Encystment survival with protective cyst wall during drying conditions",
        keyword: "encystment",
      },
      {
        Component: ProtozoaHabitatsWater,
        caption:
          "Protozoa live wherever water persists: pond bottoms, damp soil films, ocean plankton, and inside hosts — moisture is the one non-negotiable.",
        alt: "Protozoa habitats from ponds and soil to seas and host bodies",
        keyword: "protozoa",
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
      {
        Component: ParameciumConjugation,
        caption:
          "Conjugation: two Paramecium align oral grooves, exchange haploid micronuclei, and separate — genetic refresh without any increase in numbers.",
        alt: "Paramecium conjugation with aligned oral grooves exchanging micronuclei",
        keyword: "conjugation",
      },
      {
        Component: ParameciumFeedingCurrent,
        caption:
          "The feeding current: cilia beat food particles into the oral groove, down the gullet into a food vacuole that circulates the cell as digestion proceeds.",
        alt: "Paramecium feeding current with oral groove gullet and circulating food vacuole",
        keyword: "cilia",
      },
      {
        Component: PlasmodiumLiverPhase,
        caption:
          "Liver phase: sporozoites injected by the mosquito invade hepatocytes, multiply silently into thousands of merozoites — no symptoms yet, the disease's quiet first act.",
        alt: "Plasmodium liver phase with sporozoites invading hepatocytes producing merozoites",
        keyword: "liver",
      },
      {
        Component: AnophelesVectorIdentity,
        caption:
          "Only female Anopheles transmit malaria: long palps equal to the proboscis, abdomen held at an angle, and a 45-degree resting posture — the vector's signature.",
        alt: "Female Anopheles mosquito identification with angled resting posture and palps",
        keyword: "anopheles",
      },
      {
        Component: ParameciumDualVacuoles,
        caption:
          "Two contractile vacuoles at opposite ends take turns expelling water — one fills while the other empties, so the cell never pauses its osmoregulation.",
        alt: "Paramecium dual contractile vacuoles alternating water expulsion at opposite ends",
        keyword: "vacuole",
      },
      {
        Component: PlasmodiumGametocyteExit,
        caption:
          "Gametocytes are the mosquito's ticket: only these staged cells survive the blood meal's digestion and gamete-fuse in the insect gut — every cycle needs them.",
        alt: "Plasmodium gametocytes exiting to mosquito gut for fertilisation",
        keyword: "gametocyte",
      },
      {
        Component: ParameciumTrichocystDefence,
        caption:
          "Trichocysts fire barbed threads on contact — a split-second harpoon defence that discourages predators trying to swallow the slipper animalcule.",
        alt: "Paramecium trichocysts discharging barbed defensive threads",
        keyword: "trichocyst",
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
      {
        Component: MalariaGeographyBurden,
        caption:
          "Malaria maps onto the tropics: the Anopheles belt covers sub-Saharan Africa, South Asia and Nepal's Terai — where warmth and standing water sustain the vector.",
        alt: "Malaria geography and burden across tropical belts including Nepal Terai",
        keyword: "malaria",
      },
      {
        Component: CerebralMalariaMechanism,
        caption:
          "Cerebral malaria: infected red cells clog brain capillaries, oxygen starves tissue, and consciousness fades — the fastest route from fever to fatality.",
        alt: "Cerebral malaria mechanism with infected red cells blocking brain capillaries",
        keyword: "cerebral",
      },
      {
        Component: MalariaDrugResistance,
        caption:
          "Drug resistance evolves under pressure: chloroquine failed first, then replacements in turn — artemisinin combination therapy is today's answer, and vigilance continues.",
        alt: "Malaria drug resistance timeline from chloroquine to artemisinin combination therapy",
        keyword: "resistance",
      },
      {
        Component: InsecticideTreatedNets,
        caption:
          "Insecticide-treated nets kill on contact: the mosquito that lands dies before biting again — a physical barrier and a chemical trap in one cheap tool.",
        alt: "Insecticide treated nets protecting sleepers and killing mosquitoes on contact",
        keyword: "insecticide",
      },
      {
        Component: AnaemiaMalariaMechanism,
        caption:
          "Anaemia accumulates as each cycle destroys red cells faster than the marrow replaces them — pallor, weakness and breathlessness shadow every chronic infection.",
        alt: "Malaria anaemia mechanism with red cell destruction exceeding replacement",
        keyword: "anaemia",
      },
      {
        Component: BlackwaterFeverMechanism,
        caption:
          "Blackwater fever: massive red-cell destruction floods urine with haemoglobin, turning it dark — a dramatic complication of untreated falciparum infection.",
        alt: "Blackwater fever mechanism with haemoglobinuria from massive red cell lysis",
        keyword: "blackwater",
      },
      {
        Component: MalariaVaccineProgress,
        caption:
          "Vaccine progress: RTS,S became the first licensed malaria vaccine, deployed where transmission is heaviest — partial protection, but a genuine milestone.",
        alt: "Malaria vaccine progress with RTS,S deployment milestones",
        keyword: "vaccine",
      },
      {
        Component: MalariaControlNepalProgress,
        caption:
          "Nepal's malaria scorecard: from tens of thousands of annual cases in the 1990s toward elimination, driven by LLIN nets, rapid diagnostics and artemisinin therapy — the district map now holds only low-risk pockets.",
        alt: "Malaria control progress in Nepal nets diagnostics",
        keyword: "malaria",
      },
      {
        Component: DengueVectorControl,
        caption:
          "Dengue's vector rules: Aedes aegypti breeds in clean standing water in containers, bites by day, and its eggs survive drying — source reduction (empty the containers) beats fogging.",
        alt: "Dengue vector control Aedes aegypti container breeding",
        keyword: "mosquito",
      },
      {
        Component: SickleCellMalariaBalance,
        caption:
          "The sickle-cell bargain: one copy of HbS distorts red cells but blocks Plasmodium, so in malarial regions the allele persists — balancing selection, the classic evolutionary trade-off.",
        alt: "Sickle cell trait malaria resistance balancing selection",
        keyword: "anaemia",
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
      {
        Component: CoelomEvolutionAdvantage,
        caption:
          "A true coelom cushions organs, allows gut independence from the body wall, and enables bigger bodies — the single upgrade that separates advanced phyla from flatworms.",
        alt: "Coelom evolution advantage with cushioned organs and independent gut movement",
        keyword: "coelom",
      },
      {
        Component: ProtostomeDeuterostomeSplit,
        caption:
          "Two embryonic roads: protostomes (mouth first — arthropods, molluscs, annelids) versus deuterostomes (anus first — echinoderms, chordates) — a blastopore decision with a whole kingdom attached.",
        alt: "Protostome versus deuterostome development split by blastopore fate",
        keyword: "protostome",
      },
      {
        Component: SymmetrySurvivalValue,
        caption:
          "Symmetry is a lifestyle: radial suits sessile filterers meeting the world from all sides; bilateral suits movers with a head leading the charge.",
        alt: "Symmetry survival value comparing radial sessile and bilateral motile lifestyles",
        keyword: "symmetry",
      },
      {
        Component: SegmentationAdvantages,
        caption:
          "Segmentation is redundancy: repeated modules mean one damaged segment does not kill the animal — and each can specialise into hearts, gonads or nephridia.",
        alt: "Segmentation advantages with repeated modules and specialisation",
        keyword: "segmentation",
      },
      {
        Component: DiploblasticTriploblasticJobs,
        caption:
          "Two germ layers build a jellyfish; three build a worm, with mesoderm supplying muscle, bone and blood — the third layer is the body's workshop.",
        alt: "Diploblastic versus triploblastic germ layers and mesoderm derivatives",
        keyword: "diploblastic",
      },
      {
        Component: BodyPlanClassificationFlow,
        caption:
          "The classification flow: symmetry first, then germ layers, then coelom type — three questions that place any animal in its phylum.",
        alt: "Body plan classification flow from symmetry through germ layers to coelom",
        keyword: "deuterostome",
      },
      {
        Component: PseudocoelomRoundwormNiche,
        caption:
          "Roundworms exploit the pseudocoelom: a fluid-filled blastocoel pressurises the body for thrashing movement — cheap skeleton, no mesoderm lining.",
        alt: "Pseudocoelom in roundworms with fluid-filled body cavity for movement",
        keyword: "pseudocoelomate",
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
      {
        Component: PoriferaSkeletonSpicules,
        caption:
          "The sponge's skeleton is mineral or protein: calcareous spicules, siliceous spicules or spongin fibres — scaffolding that choanocyte chambers hold in place.",
        alt: "Porifera skeleton spicules types with choanocyte chambers",
        keyword: "choanocyte",
      },
      {
        Component: PlatyhelminthesFlatBody,
        caption:
          "Flat on purpose: no circulatory or respiratory system means every cell must sit near the surface — flattening is the price of life without internals.",
        alt: "Platyhelminthes flat body enabling diffusion to every cell",
        keyword: "platyhelminthes",
      },
      {
        Component: ArthropodaAppendageMechanics,
        caption:
          "Jointed appendages work like levers with hinges: each joint lets the limb fold and extend, powering walking, swimming, chewing and sensing from one design.",
        alt: "Arthropoda jointed appendage mechanics with lever and hinge joints",
        keyword: "arthropoda",
      },
      {
        Component: MolluscaBodyPlanTrio,
        caption:
          "Three molluscan body plans from one blueprint: gastropod foot crawls, bivalve shell filters, cephalopod mantle jets — muscular foot, mantle and shell remade three ways.",
        alt: "Mollusca body plan trio gastropod bivalve and cephalopod variations",
        keyword: "mollusca",
      },
      {
        Component: EchinodermataWaterVascular,
        caption:
          "The water vascular system: seawater pumped through canals extends tube feet with hydraulic suction — locomotion and feeding powered by plumbing, not muscle.",
        alt: "Echinodermata water vascular system with tube feet hydraulics",
        keyword: "water vascular",
      },
      {
        Component: ChordataFourMarks,
        caption:
          "Four marks define the phylum: notochord, dorsal hollow nerve cord, pharyngeal slits and post-anal tail — all visible at some stage, even if only in the embryo.",
        alt: "Chordata four defining marks notochord nerve cord slits and tail",
        keyword: "chordata",
      },
      {
        Component: NematodaParasitesRound,
        caption:
          "Roundworm parasites: Ascaris in the gut, Wuchereria in lymph vessels, hookworms at the feet — the pseudocoelomate phylum rides everywhere on persistence.",
        alt: "Nematoda parasites Ascaris Wuchereria and hookworm in hosts",
        keyword: "nematoda",
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
      {
        Component: EarthwormBodyWallLayers,
        caption:
          "The body wall in layers: thin cuticle over epidermis, then circular and longitudinal muscle, lined inside by coelomic epithelium — four layers that squeeze and glide.",
        alt: "Earthworm body wall layers cuticle epidermis muscles and coelomic epithelium",
        keyword: "coelomic",
      },
      {
        Component: EarthwormGizzardGrinding,
        caption:
          "The gizzard grinds without teeth: swallowed soil particles mill decaying leaves against the muscular wall — a stone mortar the worm carries everywhere.",
        alt: "Earthworm gizzard grinding food with soil particles",
        keyword: "gizzard",
      },
      {
        Component: EarthwormTyphlosoleAbsorption,
        caption:
          "The typhlosole folds the intestine into a U, tripling absorptive surface inside a narrow tube — the worm's answer to a small gut in a small body.",
        alt: "Earthworm typhlosole fold increasing intestinal absorption surface",
        keyword: "typhlosole",
      },
      {
        Component: EarthwormCutaneousRespiration,
        caption:
          "Breathing through the skin: mucus keeps the surface wet, oxygen dissolves and diffuses into dense sub-cutaneous capillaries — no lungs required.",
        alt: "Earthworm cutaneous respiration with oxygen diffusing through moist skin",
        keyword: "cutaneous",
      },
      {
        Component: EarthwormClosedCirculation,
        caption:
          "A closed circulation: blood stays in vessels, pushed by five lateral hearts and dorsal-ventral pumping — pressure-driven delivery to every segment.",
        alt: "Earthworm closed circulation with lateral hearts and dorsal ventral vessels",
        keyword: "blood",
      },
      {
        Component: EarthwormHumicAcidCalciferous,
        caption:
          "The calciferous glands neutralise humic acids from decaying leaves, precipitating excess calcium — chemistry that protects the gut and enriches the soil.",
        alt: "Earthworm calciferous glands neutralising humic acids with calcium",
        keyword: "calciferous",
      },
      {
        Component: EarthwormHydrostaticSkeleton,
        caption:
          "The hydrostatic skeleton: incompressible coelomic fluid turns muscle squeeze into shape change — circular muscles stretch the worm, longitudinal muscles shorten it, and the worm moves.",
        alt: "Earthworm hydrostatic skeleton with coelomic fluid and antagonistic muscles",
        keyword: "locomotion",
      },
      {
        Component: EarthwormCastingsVermicompost,
        caption:
          "Castings are fertiliser: earthworm faeces are neutral, finely granulated and microbe-rich — vermicomposting turns the habit into an industry Darwin called agriculture's oldest plough.",
        alt: "Earthworm castings vermicompost fertiliser value",
        keyword: "vermicompost",
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
      {
        Component: NephridiumFilterCycle,
        caption:
          "Inside one nephridium: the ciliated nephrostome scoops coelomic fluid, the body loop reabsorbs useful salts and water, and only waste exits through the pore.",
        alt: "Nephridium filter cycle from nephrostome through body loop to pore",
        keyword: "nephrostome",
      },
      {
        Component: EnteronephricWaterSaving,
        caption:
          "Enteronephric nephridia dump waste into the intestine, where water is reabsorbed before excretion — a conservation trick for life in damp soil.",
        alt: "Enteronephric nephridia excreting into intestine for water conservation",
        keyword: "enteronephric",
      },
      {
        Component: EarthwormBrainLadder,
        caption:
          "The ladder brain: bilobed cerebral ganglia, circumpharyngeal connectives around the pharynx, then a double ventral nerve cord with a ganglion per segment.",
        alt: "Earthworm brain ladder with ganglia connectives and ventral nerve cord",
        keyword: "nerve cord",
      },
      {
        Component: SeptalNephridiaNumbers,
        caption:
          "Septal nephridia from segment 15 onward, one pair per segment, all opening into the intestine — over two hundred filters working in parallel.",
        alt: "Septal nephridia numbers and arrangement per segment opening into intestine",
        keyword: "septal",
      },
      {
        Component: EarthwormReflexSegment,
        caption:
          "A segment's reflex arc: skin receptor to sensory fibre to ganglion to motor fibre — the local decision fires before the brain even hears about it.",
        alt: "Earthworm segment reflex arc with receptor sensory fibre ganglion and motor fibre",
        keyword: "reflex",
      },
      {
        Component: EarthwormSensesPhotoreceptors,
        caption:
          "Photoreceptor cells scattered in the skin give the worm light sense without eyes — enough to flee daylight and find darkness, negative phototaxis in action.",
        alt: "Earthworm photoreceptors in skin detecting light without eyes",
        keyword: "photoreceptor",
      },
      {
        Component: EarthwormSegmentMap,
        caption:
          "The segment map: brain and pharyngeal nephridia up front, hearts and gizzard at 7–12, clitellum at 14–16, male pores at 18 — every organ has an address.",
        alt: "Earthworm segment map showing organ positions by segment number",
        keyword: "segment",
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
      {
        Component: EarthwormHermaphroditeTradeoff,
        caption:
          "Hermaphrodite but not self-fertile: one worm carries both kits, yet sperm goes only to a partner's spermathecae — efficiency for rare meetings, variety kept intact.",
        alt: "Earthworm hermaphrodite tradeoff with cross fertilisation not selfing",
        keyword: "hermaphrodite",
      },
      {
        Component: EarthwormCopulationPositions,
        caption:
          "Copulation on a rainy night: head-to-tail alignment, male pores (18) facing spermathecal pores (6–9), mucus bonding the pair for mutual sperm exchange.",
        alt: "Earthworm copulation head to tail with pore alignment and sperm exchange",
        keyword: "copulation",
      },
      {
        Component: EarthwormCocoonFormation,
        caption:
          "Cocoon formation in four steps: the clitellum secretes a ring, the ring slides forward collecting eggs, albumen and stored sperm, then seals off as a lemon-shaped capsule.",
        alt: "Earthworm cocoon formation steps with clitellum ring sliding forward",
        keyword: "cocoon",
      },
      {
        Component: EarthwormRegenerationHalves,
        caption:
          "Cut in half: the head end regrows a tail and some segments, but the tail half dies — vital organs crowd the anterior third, and the 'two worms' myth fails.",
        alt: "Earthworm regeneration halves myth with head end surviving tail dying",
        keyword: "clitellum",
      },
      {
        Component: EarthwormReproductivePores,
        caption:
          "The pore map: spermathecal pores at 6–9, female pore at 14, male pores at 18, genital papillae at 17 and 19 — geometry that forces head-to-tail copulation.",
        alt: "Earthworm reproductive pores map with segment addresses",
        keyword: "pore",
      },
      {
        Component: EarthwormJuvenileAdultGrowth,
        caption:
          "From cocoon to adult: a miniature worm hatches with no larval stage, adds segments at the tail, and the appearance of the clitellum marks sexual maturity.",
        alt: "Earthworm juvenile to adult growth with clitellum as maturity marker",
        keyword: "young",
      },
      {
        Component: EarthwormSeminalVesicleMaturation,
        caption:
          "The sperm nursery: tiny testes release immature cells into large seminal vesicles (11–12), where they mature and wait for the vasa deferentia's call.",
        alt: "Earthworm seminal vesicle sperm maturation with testes and vasa deferentia",
        keyword: "seminal vesicle",
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
      {
        Component: FrogMonsoonBreeding,
        caption:
          "The frog's calendar: breeding in the monsoon, tadpoles after, hibernation through winter, aestivation in dry summers — water availability writes the schedule.",
        alt: "Frog monsoon breeding calendar with seasons of activity and dormancy",
        keyword: "breeding",
      },
      {
        Component: FrogWebbedFeetPhysics,
        caption:
          "Webbed hind feet work as paddles: the web spreads for the power stroke and folds on recovery — the same physics as a swimmer's hand, no engine needed.",
        alt: "Frog webbed feet physics with power and recovery strokes",
        keyword: "webbed",
      },
      {
        Component: FrogTeethGripOnly,
        caption:
          "Frog teeth grip, never chew: maxillary teeth line the upper jaw, vomerine patches stud the roof — the lower jaw has none, and prey is swallowed whole.",
        alt: "Frog teeth grip only with maxillary and vomerine teeth in upper jaw",
        keyword: "vomerine",
      },
      {
        Component: FrogStomachAcidChemistry,
        caption:
          "The stomach is an acid vat: HCl activates pepsin and kills swallowed microbes, letting whole insects digest chemically where chewing never happened.",
        alt: "Frog stomach acid chemistry with HCl and pepsin digesting whole prey",
        keyword: "pepsin",
      },
      {
        Component: FrogDuodenumIleumLength,
        caption:
          "A short gut marks a carnivore: duodenum receives bile and pancreatic juice, the coiled ileum absorbs, and the reduced large intestine finishes — no cellulose to fight.",
        alt: "Frog duodenum ileum short gut compared with herbivore long intestine",
        keyword: "intestine",
      },
      {
        Component: FrogCloacaJunction,
        caption:
          "The cloaca is a three-way junction: intestine, urinary ducts and gonads all converge on one exit — the amphibian's shared back door.",
        alt: "Frog cloaca junction where digestive urinary and reproductive tracts meet",
        keyword: "cloaca",
      },
      {
        Component: FrogCroakVocalSacs,
        caption:
          "The croak is a male broadcast: vocal sacs resonate the call, each species keeps its own rhythm, and females choose — sound as advertisement and species filter.",
        alt: "Frog croak vocal sacs resonating mating call of male",
        keyword: "vocal",
      },
      {
        Component: FrogHibernationWinterMud,
        caption:
          "Hibernation is shutdown, not sleep: buried in pond mud, the heart slows to a trickle, fat reserves burn slowly, and spring warmth restarts the system.",
        alt: "Frog hibernation in winter mud with slowed metabolism until spring",
        keyword: "hibernation",
      },
      {
        Component: FrogTympanumEardrum,
        caption:
          "The tympanum is an eardrum on the surface: a bare vibrating disc behind the eye, larger in males — hearing without any external ear.",
        alt: "Frog tympanum eardrum behind the eye larger in males",
        keyword: "tympanum",
      },
      {
        Component: FrogBinocularVision,
        caption:
          "Protruding eyes give near all-round vision with a binocular overlap in front — depth judgement for the tongue-strike, and a retina tuned to moving prey.",
        alt: "Frog binocular vision with protruding eyes and wide field of view",
        keyword: "eyes",
      },
      {
        Component: FrogSkinMucusGlands,
        caption:
          "Skin is a multi-tool: mucus glands keep it wet for breathing, granular glands store distasteful secretions, and pigment cells shift colour for camouflage.",
        alt: "Frog skin mucus glands granular glands and pigment cells in cross-section",
        keyword: "mucus",
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
      {
        Component: FrogHeartDoubleCirculation,
        caption:
          "Two loops, one pump: pulmonary circulation refreshes blood at lungs and skin, systemic delivers it to the body — and the single ventricle lets the streams mix slightly.",
        alt: "Frog heart double circulation with pulmonary and systemic loops",
        keyword: "ventricle",
      },
      {
        Component: FrogPortalSystems,
        caption:
          "Portal systems are inspection stops: the hepatic portal vein lets the liver process gut blood, the renal portal lets kidneys filter blood from the hind body.",
        alt: "Frog portal systems hepatic and renal veins starting and ending in capillaries",
        keyword: "portal",
      },
      {
        Component: FrogSpleenLymphHearts,
        caption:
          "Auxiliary pumps: the spleen recycles worn red cells and stores blood, while two pairs of lymph hearts push lymph back into the veins — three pumps in one body.",
        alt: "Frog spleen and lymph hearts as auxiliary circulation pumps",
        keyword: "heart",
      },
      {
        Component: FrogRespirationThreeModesShare,
        caption:
          "Three breathing modes share one rule: a thin, moist surface — skin (always on, even underwater), mouth lining, and lungs for active moments.",
        alt: "Frog respiration three modes cutaneous buccopharyngeal and pulmonary",
        keyword: "cutaneous",
      },
      {
        Component: FrogBuccalPumpMechanism,
        caption:
          "The buccal pump: mouth floor drops to draw air in through the nostrils, then rises with nostrils shut to push it into the lungs — positive pressure, no ribs.",
        alt: "Frog buccal pump mechanism filling lungs with positive pressure",
        keyword: "buccal",
      },
      {
        Component: FrogCutaneousUnderwater,
        caption:
          "Underwater, the skin is scuba gear: dissolved oxygen diffuses across the wet surface into skin capillaries — enough for rest and hibernation with lungs closed.",
        alt: "Frog cutaneous respiration underwater with oxygen diffusing through skin",
        keyword: "oxygen",
      },
      {
        Component: FrogSinusVenosusPacemaker,
        caption:
          "The sinus venosus does double duty: all venous blood enters here, and its muscular wall fires the heartbeat — the frog's version of the mammalian SA node.",
        alt: "Frog sinus venosus as pacemaker and venous blood entry chamber",
        keyword: "sinus venosus",
      },
      {
        Component: PulmocutaneousArch,
        caption:
          "The pulmocutaneous arch is the frog's signature vessel: one outflow splitting to lungs and skin, plumbing that mirrors dual respiration.",
        alt: "Pulmocutaneous arch dividing blood flow to lungs and skin",
        keyword: "pulmocutaneous",
      },
      {
        Component: FrogBuccopharyngealBreathing,
        caption:
          "Buccopharyngeal breathing: the throat pulses rhythmically, air washes across the mouth lining while the glottis stays shut — lungs untouched, oxygen still gathered.",
        alt: "Frog buccopharyngeal breathing with mouth floor oscillation and closed glottis",
        keyword: "buccopharyngeal",
      },
      {
        Component: FrogSkinWaterDrinkingPatch,
        caption:
          "Frogs drink through the belly: a densely capillarised pelvic patch absorbs water by osmosis from dew, wet soil or pond — the mouth is for prey only.",
        alt: "Frog skin water drinking patch absorbing water through belly skin",
        keyword: "water",
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
      {
        Component: FrogSpermPathwayMale,
        caption:
          "The sperm pathway detours through the kidney: testes to vasa efferentia, along Bidder's canal inside the kidney, out via the urinogenital duct shared with urine.",
        alt: "Frog sperm pathway from testes through vasa efferentia and bidder canal to cloaca",
        keyword: "vasa efferentia",
      },
      {
        Component: FrogOvarySeasonalCycle,
        caption:
          "The ovary swells with the seasons: ova accumulate yolk toward the monsoon, ovulation releases eggs into the coelom, and cilia sweep them to the oviduct's mouth.",
        alt: "Frog ovary seasonal cycle from yolk accumulation to ovulation",
        keyword: "oviduct",
      },
      {
        Component: FrogEggJellyLayers,
        caption:
          "Three jelly layers, five jobs: cushioning, predator deterrence, clumping eggs where males find them, sunlight warming, and water held around each egg.",
        alt: "Frog egg jelly layers with yolk inner middle and outer coats",
        keyword: "jelly",
      },
      {
        Component: FrogAmplexusMechanics,
        caption:
          "Amplexus is fertilisation machinery: the male grips behind the female's forelimbs with nuptial pads, synchronising egg and sperm release into the water.",
        alt: "Frog amplexus with male clasping female for synchronized spawning",
        keyword: "amplexus",
      },
      {
        Component: FrogSexualDimorphismFeatures,
        caption:
          "Five field marks separate the sexes: female size, male tympanum, male vocal sacs, male nuptial pads, and rougher breeding-season skin.",
        alt: "Frog sexual dimorphism features comparing male and female traits",
        keyword: "nuptial",
      },
      {
        Component: FrogTadpoleGillsToLungs,
        caption:
          "The breathing switchover: external gills to internal gills to lungs, while the two-chambered heart rebuilds into three — a fish remade into an amphibian.",
        alt: "Frog tadpole gills to lungs transition across metamorphic stages",
        keyword: "tadpole",
      },
      {
        Component: FrogMetamorphosisHormonalTrigger,
        caption:
          "Metamorphosis runs on thyroid hormone: a maturing gland triggers the rebuild — feed hormone and tadpoles change early; remove the thyroid and they never do.",
        alt: "Frog metamorphosis hormonal trigger by thyroid gland hormone",
        keyword: "metamorphosis",
      },
      {
        Component: FrogDevelopmentSpeedFactors,
        caption:
          "What sets the clock: warm water and rich food speed development, crowding slows it — and a drying pond can rush tadpoles into early metamorphosis.",
        alt: "Frog development speed factors temperature food water level and crowding",
        keyword: "development",
      },
      {
        Component: FrogParentalCareAbsence,
        caption:
          "No parents, thousands of eggs: frogs abandon the spawn because jelly coats, numbers and timing replace care — the trade-off between egg quantity and parental investment.",
        alt: "Frog parental care absence many eggs strategy",
        keyword: "tadpole",
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
      {
        Component: SwimBladderBuoyancy,
        caption:
          "The swim bladder as a buoyancy dial: a gas-filled sac tuned by the gas gland lets a fish hold depth without swimming effort — the neutral-buoyancy trick sharks never evolved.",
        alt: "Fish swim bladder buoyancy adjustment with gas gland",
        keyword: "buoyancy",
      },
      {
        Component: GillBreathingWater,
        caption:
          "Gills solve water breathing: thin lamellae, a countercurrent blood flow and a huge surface area strip over 80% of the dissolved oxygen from water passing one way while blood flows the other.",
        alt: "Fish gill lamellae with countercurrent exchange",
        keyword: "gill",
      },
      {
        Component: CursorialSpeedAdaptations,
        caption:
          "Built for speed: long limbs, reduced digits, digitigrade stance, a flexible spine and lightened bones — the cursorial package that turns muscle into metres per second.",
        alt: "Cursorial running adaptations long limbs digitigrade stance",
        keyword: "cursorial",
      },
      {
        Component: FossorialDiggingToolkit,
        caption:
          "The digger's toolkit: powerful clawed forelimbs, a tapered head, reduced eyes, sensitive vibrissae and tolerance for low oxygen — life underground demands each one.",
        alt: "Fossorial burrowing adaptations claws reduced eyes vibrissae",
        keyword: "fossorial",
      },
      {
        Component: ArborealGrippingAdaptations,
        caption:
          "Life in the canopy: opposable thumbs, prehensile tails, sharp curved claws, pads and binocular vision — gripping, judging distances and never falling are the arboreal job description.",
        alt: "Arboreal climbing adaptations opposable thumbs prehensile tail",
        keyword: "arboreal",
      },
      {
        Component: VolantFlightAdaptations,
        caption:
          "The flight package: wings with an aerofoil shape, hollow pneumatic bones, a keeled sternum for flight muscles, air sacs through the body and a beak instead of heavy teeth.",
        alt: "Volant flight adaptations wings pneumatic bones keeled sternum air sacs",
        keyword: "volant",
      },
      {
        Component: StreamlinedDragReduction,
        caption:
          "Drag is the enemy of motion: a streamlined teardrop profile, mucus or smooth plumage, and a shape that lets water or air part and rejoin — the same physics serves fish, dolphins and falcons.",
        alt: "Streamlined body shape reducing drag in water and air",
        keyword: "streamlined",
      },
      {
        Component: DesertWaterEconomy,
        caption:
          "Desert life is an accounting problem: concentrated urine, dry faeces, nocturnal habits, concentrated milk and nasal water recovery — every drop spent must be earned back.",
        alt: "Desert animal water economy adaptations concentrated urine nocturnal habits",
        keyword: "desert",
      },
      {
        Component: PopulationPyramidStages,
        caption:
          "Three pyramid shapes tell three stories: expansive (broad base, fast growth), stationary (near-zero growth) and constrictive (narrow base, ageing) — the census drawn as a picture.",
        alt: "Population pyramid stages expansive stationary constrictive",
        keyword: "natality",
      },
      {
        Component: DemographicTransitionModel,
        caption:
          "The demographic transition: birth and death rates both start high, deaths fall first (stage 2 boom), births follow later (stage 3), and both settle low (stage 4) — development rewrites demography.",
        alt: "Demographic transition model four stages birth death rates",
        keyword: "mortality",
      },
      {
        Component: PopulationGrowthCurvesDetail,
        caption:
          "Two curves, two futures: the J-shaped exponential curve ignores limits; the S-shaped logistic curve bends at carrying capacity (K) as resistance catches up with biotic potential.",
        alt: "Exponential J and logistic S population growth curves with carrying capacity",
        keyword: "density",
      },
      {
        Component: PopulationMomentum,
        caption:
          "Population momentum: even after fertility reaches replacement level, growth continues for decades because the huge young cohorts of yesterday are today's parents — the pyramid's base becomes the engine.",
        alt: "Population momentum young cohorts driving future growth",
        keyword: "population",
      },
      {
        Component: AgeingPopulationJapan,
        caption:
          "Japan's age structure in one stat: about 29% of its people are over 65 — the first nation to walk fully into stage 5, with shrinking workforces and rising care costs as the bill.",
        alt: "Ageing population of Japan percentage over 65",
        keyword: "population",
      },
      {
        Component: PopulationGrowthCurvesShapes,
        caption:
          "J or S? Biotic potential (r) pushes the curve up; environmental resistance (food, space, disease, predators) bends it — which wins decides whether a population explodes or levels off.",
        alt: "Population growth curve shapes J shaped and S shaped with resistance",
        keyword: "growth",
      },
      {
        Component: PopulationEcologyGrowthModels,
        caption:
          "The growth maths: dN/dt = rN for exponential, dN/dt = rN(1 − N/K) for logistic — one term, (1 − N/K), is all that separates boom from balance.",
        alt: "Population growth models exponential and logistic equations",
        keyword: "density",
      },
      {
        Component: MigrationPushPullModel,
        caption:
          "Migration is push meeting pull: conflict, drought and landlessness push people out; jobs, safety and services pull them in — Nepal's remittance economy is this model running at national scale.",
        alt: "Migration push and pull factors model",
        keyword: "migration",
      },
      {
        Component: SexRatioSkewCauses,
        caption:
          "Why sex ratios skew: son preference, sex-selective practices and male out-migration tilt Nepal's ratio — a demographic distortion with social consequences that last generations.",
        alt: "Sex ratio skew causes son preference and migration",
        keyword: "ratio",
      },
      {
        Component: WomenEducationFertilityLink,
        caption:
          "The strongest contraceptive is a classroom: female literacy correlates with lower fertility everywhere — educated women marry later, choose family size and raise healthier children.",
        alt: "Women education and fertility rate link",
        keyword: "population",
      },
      {
        Component: UrbanisationCausesConsequences,
        caption:
          "Urbanisation's engine and exhaust: rural push and urban pull fill cities, while housing, water, waste and traffic strain them — Kathmandu's growth is the case study in real time.",
        alt: "Urbanisation causes and consequences push pull rural urban",
        keyword: "population",
      },
      {
        Component: UrbanisationPressurePoints,
        caption:
          "Where the city hurts: water supply, sewage, housing, air and traffic are the five pressure points every fast-growing city must fix — and every exam answer should name.",
        alt: "Urbanisation pressure points water sewage housing air traffic",
        keyword: "population",
      },
      {
        Component: SlumsUrbanisationChallenge,
        caption:
          "Slums are urbanisation's invoice: informal housing, shared taps and insecure tenure house the workers a city needs but hasn't planned for — upgrading beats eviction, evidence says.",
        alt: "Slums as urbanisation challenge informal housing",
        keyword: "population",
      },
      {
        Component: RemittanceEconomyNepal,
        caption:
          "Remittances are Nepal's hidden export: over a quarter of GDP arrives as money earned abroad — migration economics written in household budgets, from school fees to brick houses.",
        alt: "Remittance economy of Nepal share of GDP from migrant workers",
        keyword: "migration",
      },
      {
        Component: DemographicTransitionModelStages,
        caption:
          "Five stages, one arc: high-stationary → early-expanding → late-expanding → low-stationary → declining — the demographic transition is development measured in birth and death rates.",
        alt: "Demographic transition model five stages",
        keyword: "mortality",
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
      {
        Component: ReflexVsInstinctLayers,
        caption:
          "Behaviour in layers: reflexes are wired and instant, instincts are inherited programmes, and learned behaviour is edited by experience — three floors of one building.",
        alt: "Reflex instinct and learned behaviour layers",
        keyword: "reflex",
      },
      {
        Component: TaxesKinesisContrast,
        caption:
          "Taxis steers, kinesis scurries: directional movement toward or away from a stimulus versus random movement whose rate simply rises — moth to lamp (taxis), woodlice speeding up in the dry (kinesis).",
        alt: "Taxes directional versus kinesis random movement contrast",
        keyword: "kinesis",
      },
      {
        Component: DominanceHierarchyPayoffs,
        caption:
          "The pecking order pays both ways: dominant animals win food and mates but pay in constant vigilance and fights; subordinates lose resources but escape injury — a stable truce, not a tyranny.",
        alt: "Dominance hierarchy payoffs for alpha and subordinate animals",
        keyword: "hierarchy",
      },
      {
        Component: LeadershipWolfPack,
        caption:
          "Leadership is a job description: the alpha pair decides when to hunt and where to travel, but leadership in a wolf pack is coordination, not cruelty — the old 'alpha fight' story has been revised by field studies.",
        alt: "Wolf pack leadership and coordination during hunt",
        keyword: "leader",
      },
      {
        Component: LearnedBehaviourStages,
        caption:
          "Learning has a ladder: habituation (ignoring the harmless), imprinting (the gosling's first hours), classical and operant conditioning, then insight — each rung adds flexibility.",
        alt: "Learned behaviour stages habituation imprinting conditioning insight",
        keyword: "behaviour",
      },
      {
        Component: ReflexArcSpeedMath,
        caption:
          "Reflex speed, worked out: a 1-metre reflex pathway at nerve conduction speeds lands the knee-jerk at roughly 30–50 ms — the spinal cord's shortcut is worth every millisecond.",
        alt: "Reflex arc speed calculation milliseconds",
        keyword: "reflex",
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
      {
        Component: FishMigrationReasons,
        caption:
          "Why fish migrate: spawning grounds, feeding grounds and wintering grounds are three different addresses — salmon run upstream to spawn, eels run to the sea, and the reasons are written in eggs and food.",
        alt: "Fish migration reasons spawning feeding wintering grounds",
        keyword: "migration",
      },
      {
        Component: BirdMigrationNavigation,
        caption:
          "The Arctic tern's commute: about 70,000 km a year between poles, navigated by sun compass, star patterns, magnetite and landmarks — the longest migration in the animal kingdom.",
        alt: "Bird migration navigation sun compass stars magnetite Arctic tern",
        keyword: "navigation",
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
      {
        Component: SmogFormationChemistry,
        caption:
          "Photochemical smog, step by step: NO₂ + sunlight → NO + O; O + O₂ → O₃; hydrocarbons + O₃ → PAN — London's grey smog and Los Angeles' brown smog are two different chemistries.",
        alt: "Photochemical smog formation chemistry NO2 ozone PAN",
        keyword: "smog",
      },
      {
        Component: AcidRainDamagePath,
        caption:
          "The acid rain damage path: SO₂ and NOx dissolve into H₂SO₄ and HNO₃, acidify lakes below pH 5, leach soil calcium, mobilise toxic aluminium and dissolve marble statues.",
        alt: "Acid rain damage path from emissions to lakes soil and buildings",
        keyword: "acid",
      },
      {
        Component: EutrophicationAlgalCycle,
        caption:
          "Eutrophication's deadly loop: fertiliser runoff feeds an algal bloom, the bloom dies, decomposers strip the dissolved oxygen, fish suffocate — the lake chokes on its own feast.",
        alt: "Eutrophication algal bloom decomposition oxygen depletion cycle",
        keyword: "eutrophication",
      },
      {
        Component: SewageTreatmentStagesDetail,
        caption:
          "Sewage treatment in three acts: primary settling removes solids, secondary aeration lets microbes eat the dissolved waste, tertiary polishing strips nutrients — BOD falls at every stage.",
        alt: "Sewage treatment stages primary secondary tertiary with BOD",
        keyword: "sewage",
      },
      {
        Component: ParticulateMatterSizes,
        caption:
          "Size decides fate: PM₁₀ lodges in the airways, PM₂.₅ crosses into the bloodstream and reaches the heart and brain — the smaller the particle, the deeper the damage.",
        alt: "Particulate matter sizes PM10 PM2.5 penetration into lungs",
        keyword: "particulate",
      },
      {
        Component: LeadPoisoningSources,
        caption:
          "Lead's quiet routes: petrol exhaust (now phased out), old paint, batteries, pipes and glazed pottery — lead damages the developing brain before any symptom shows.",
        alt: "Lead poisoning sources petrol paint batteries pipes",
        keyword: "lead",
      },
      {
        Component: GreenhouseGasLadder,
        caption:
          "The greenhouse ladder: CO₂ leads by volume, methane warms 28× per molecule, N₂O 265×, CFCs thousands× — potency and abundance are different rungs of the same ladder.",
        alt: "Greenhouse gas ladder CO2 methane N2O CFC warming potentials",
        keyword: "greenhouse",
      },
      {
        Component: SoilPollutionRemediation,
        caption:
          "Cleaning poisoned soil: remove and dump, cap and seal, wash the soil, or let plants and microbes do it — phytoremediation and bioremediation are the gentle ends of the toolkit.",
        alt: "Soil pollution remediation methods phytoremediation bioremediation",
        keyword: "soil",
      },
      {
        Component: NoiseThermalPollution,
        caption:
          "The forgotten pollutants: noise above 85 dB damages hearing permanently, and thermal discharge from power plants drops dissolved oxygen — pollution is not always a chemical.",
        alt: "Noise and thermal pollution effects decibel scale dissolved oxygen",
        keyword: "thermal",
      },
      {
        Component: KathmanduValleyAirQuality,
        caption:
          "Kathmandu's air, decoded: vehicle exhaust, brick kilns, road dust and winter inversion trap the valley's PM in a bowl — the geography makes the pollution worse, not just the sources.",
        alt: "Kathmandu valley air quality sources and inversion",
        keyword: "kathmandu",
      },
      {
        Component: RadioactiveWasteDecayChain,
        caption:
          "Radioactive waste keeps its own calendar: half-lives from days to millennia mean storage must outlast nations — decay chains from uranium through radon show why containment is forever.",
        alt: "Radioactive waste decay chain and half lives",
        keyword: "radiation",
      },
      {
        Component: WaterQualityParameters,
        caption:
          "Reading a river in numbers: dissolved oxygen above 5 mg/L, BOD low, pH near 7, coliform absent — four readings that turn 'clean' from an opinion into a measurement.",
        alt: "Water quality parameters dissolved oxygen BOD pH coliform",
        keyword: "water",
      },
      {
        Component: OzoneHoleDiscovery,
        caption:
          "The hole that was almost missed: Farman's 1985 Antarctic data revealed CFC-driven ozone collapse — a ground-based measurement that rewrote global chemical policy.",
        alt: "Ozone hole discovery Antarctic measurements CFCs",
        keyword: "ozone",
      },
      {
        Component: SolidWasteHierarchy,
        caption:
          "The waste hierarchy in order: reduce, reuse, recycle, recover (energy), and only then dispose — every step up the ladder saves money, energy and land.",
        alt: "Solid waste management hierarchy reduce reuse recycle recover dispose",
        keyword: "waste",
      },
      {
        Component: EWasteHeavyMetalFlow,
        caption:
          "E-waste anatomy: circuit boards carry lead and mercury, batteries carry cadmium, screens carry barium — informal burning releases them into ash, air and rivers.",
        alt: "E-waste heavy metal flow from devices to environment",
        keyword: "heavy",
      },
      {
        Component: BioaccumulationVsBiodegradation,
        caption:
          "Two fates of a pollutant: bioaccumulation concentrates it up the food chain (mercury in tuna); biodegradation breaks it down (oil-eating bacteria) — persistence decides which story a chemical gets.",
        alt: "Bioaccumulation versus biodegradation of pollutants",
        keyword: "BOD",
      },
      {
        Component: CholeraPandemicHistory,
        caption:
          "Cholera's map changed medicine: John Snow's 1854 Broad Street pump investigation founded epidemiology, and ORS — a sugar-salt sachet — became the cheapest life-saver in history.",
        alt: "Cholera pandemics history John Snow water pump ORS",
        keyword: "cholera",
      },
      {
        Component: TyphoidFeverTransmission,
        caption:
          "Typhoid's chain: Salmonella typhi in faeces-contaminated water and food, carriers like the famous 'Typhoid Mary' who spread it symptom-free — the case for safe water and carrier screening.",
        alt: "Typhoid fever transmission chain and carrier",
        keyword: "typhoid",
      },
      {
        Component: SafeDrinkingWaterMethods,
        caption:
          "Making water safe, cheapest first: boiling, chlorination, solar disinfection (SODIS), ceramic and biosand filters — each method trades cost, speed and volume; boiling wins for one cup, chlorination for a village.",
        alt: "Safe drinking water methods boiling chlorination SODIS filters",
        keyword: "water",
      },
      {
        Component: WaterPurificationStepsHousehold,
        caption:
          "Household purification in order: sediment (let it settle), filtration (cloth or ceramic), disinfection (boil, chlorine, sun) and safe storage — skip a step and the last one fails.",
        alt: "Household water purification steps sedimentation filtration disinfection storage",
        keyword: "water",
      },
      {
        Component: WaterBorneWaterWashed,
        caption:
          "Two water diseases, two fixes: waterborne cholera needs clean water; water-washed trachoma and scabies need enough water for washing — more water, not cleaner water, is the second cure.",
        alt: "Water-borne versus water-washed diseases cholera trachoma",
        keyword: "water",
      },
      {
        Component: SanitationToiletTypes,
        caption:
          "The toilet ladder: open defecation → simple pit → improved pit with slab → pour-flush with water seal → sewerage — each rung blocks a different disease route.",
        alt: "Sanitation toilet types ladder from pit latrine to sewerage",
        keyword: "sanitation",
      },
      {
        Component: LatrineTypesSanitationLadder,
        caption:
          "Latrine anatomy matters: a water seal blocks flies and smell, a lined pit protects groundwater, ventilation improves use — the simple design details that decide whether a latrine actually protects.",
        alt: "Latrine types sanitation design water seal pit lining",
        keyword: "sanitation",
      },
      {
        Component: HandwashingCriticalMoments,
        caption:
          "Handwashing's four critical moments: after the toilet, before cooking, before eating, after handling a child's waste — soap at these moments cuts diarrhoeal disease by about a third.",
        alt: "Handwashing critical moments soap disease prevention",
        keyword: "disease",
      },
      {
        Component: CommunicableVsNonCommunicable,
        caption:
          "Nepal's double burden: communicable diseases (typhoid, TB, dengue) still dominate rural areas while non-communicable diseases (diabetes, heart disease, cancer) rise in cities — two epidemics, one health system.",
        alt: "Communicable versus non-communicable diseases double burden",
        keyword: "disease",
      },
      {
        Component: CommunityHealthWorkers,
        caption:
          "The last-mile workforce: female community health volunteers (FCHVs) deliver ORS, antenatal advice and immunisation reminders door to door — Nepal's child-survival gains have their names on them.",
        alt: "Community health workers FCHV last mile healthcare",
        keyword: "disease",
      },
      {
        Component: FirstAidABCPriorities,
        caption:
          "First aid's order is the alphabet: Airway, then Breathing, then Circulation — a blocked airway kills in minutes, bleeding in tens of minutes; the order is not negotiable.",
        alt: "First aid ABC priorities airway breathing circulation",
        keyword: "first",
      },
      {
        Component: SnakebiteFirstAidProtocol,
        caption:
          "Snakebite do's and don'ts: immobilise the limb, keep it below heart level, get to hospital for antivenom — do NOT cut, suck, tourniquet or apply ice; those make it worse.",
        alt: "Snakebite first aid protocol dos and donts antivenom",
        keyword: "first",
      },
      {
        Component: SewageTreatmentThreeStages,
        caption:
          "Three stages, one target: primary (settling removes ~60% of solids), secondary (aeration + microbes strip most BOD), tertiary (nutrient and pathogen polishing) — the minimum recipe for a clean outfall.",
        alt: "Sewage treatment three stages primary secondary tertiary",
        keyword: "sewage",
      },
      {
        Component: SolidWasteSegregationBins,
        caption:
          "Segregation is the master switch: wet (compostable), dry (recyclable) and hazardous (batteries, tubes, sharps) — a city that separates at source recycles twice as much at half the cost.",
        alt: "Solid waste segregation bins wet dry hazardous",
        keyword: "waste",
      },
      {
        Component: CompostingProcessStages,
        caption:
          "Composting's cast list: greens (nitrogen) + browns (carbon) + air + moisture → mesophilic warm-up → thermophilic 55–65 °C kill of pathogens → cooling and maturation — six weeks to black gold.",
        alt: "Composting process stages greens browns thermophilic maturation",
        keyword: "waste",
      },
      {
        Component: WasteToEnergyOptions,
        caption:
          "Waste to energy, ranked: biogas from wet waste is cleanest; incineration with strict filters comes next; open burning is the disaster option — the technology must match the waste stream.",
        alt: "Waste to energy options biogas incineration ranking",
        keyword: "waste",
      },
      {
        Component: AirQualityIndexReading,
        caption:
          "Reading an AQI number: 0–50 good, 51–100 moderate, 101–200 unhealthy for sensitive groups, above 300 hazardous — and Kathmandu's winter readings regularly cross the line where masks matter.",
        alt: "Air quality index reading bands and meaning",
        keyword: "air",
      },
      {
        Component: UrbanAirPollutionSourcesKathmandu,
        caption:
          "Kathmandu's source stack: vehicles (especially old diesel), brick kilns, road dust, open burning and winter inversion — a bowl-shaped valley holding its own smoke.",
        alt: "Urban air pollution sources in Kathmandu valley",
        keyword: "kathmandu",
      },
      {
        Component: NoisePollutionDbScale,
        caption:
          "The decibel ladder: 30 dB quiet bedroom, 60 dB conversation, 85 dB hearing-damage threshold, 120 dB jet pain — and horn-happy city streets sit uncomfortably high on it.",
        alt: "Noise pollution decibel scale thresholds",
        keyword: "pollution",
      },
      {
        Component: EnvironmentalLegislationNepal,
        caption:
          "Nepal's legal shield: the Environment Protection Act, vehicle emission standards, EIA requirements for big projects and constitutional rights to a clean environment — the paper exists; enforcement is the exam question.",
        alt: "Environmental legislation in Nepal Protection Act EIA",
        keyword: "act",
      },
      {
        Component: GroundwaterArsenicTerai,
        caption:
          "Terai's hidden poison: arsenic from natural sediments contaminates shallow tubewells across the plains — deep wells and tested filters are the escape; the well sticker tells the story.",
        alt: "Groundwater arsenic contamination in Terai tubewells",
        keyword: "arsenic",
      },
      {
        Component: EWasteCompositionHazards,
        caption:
          "What is inside your phone: lead in solder, mercury in backlights, cadmium in batteries, brominated flame retardants in cases — a computer's worth of toxins in every discarded device.",
        alt: "E-waste composition lead mercury cadmium flame retardants",
        keyword: "waste",
      },
      {
        Component: WormInfectionLifecycle,
        caption:
          "The roundworm route: eggs in soil from untreated faeces → contaminated hands or vegetables → intestine → adult worms shedding thousands of eggs a day — deworming tablets break the cycle twice a year.",
        alt: "Worm infection lifecycle Ascaris soil to intestine deworming",
        keyword: "water",
      },
      {
        Component: ZoonoticSpillover,
        caption:
          "How zoonoses jump: wildlife reservoir → contact at the edge (farms, markets, hunting) → human adaptation → spread — rabies, bird flu and COVID-19 all followed this script.",
        alt: "Zoonotic spillover from wildlife reservoirs to humans",
        keyword: "disease",
      },
      {
        Component: OneHealthApproach,
        caption:
          "One Health in practice: human, animal and environmental health as one system — rabies control vaccinates dogs, pandemic preparedness watches wildlife markets, antimicrobial resistance spans all three.",
        alt: "One Health approach human animal environmental",
        keyword: "disease",
      },
      {
        Component: RoadSafetyStatistics,
        caption:
          "Roads as a health hazard: Nepal's highways record thousands of deaths a year, with speeding, overloaded buses and mountain roads the recurring causes — helmets, seatbelts and speed limits are biology too.",
        alt: "Road safety statistics accidents prevention",
        keyword: "vehicle",
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
      {
        Component: OrganochlorinePersistence,
        caption:
          "Organochlorines never leave: DDT's half-life runs to decades, so it persists in soil, dissolves into fat and biomagnifies — persistence was the property that made it famous and infamous.",
        alt: "Organochlorine DDT persistence and biomagnification",
        keyword: "organochlorine",
      },
      {
        Component: OrganophosphateNerveBlock,
        caption:
          "The nerve block: organophosphates inhibit acetylcholinesterase, so acetylcholine floods the synapse and muscles contract without pause — the same chemistry as nerve gas, diluted.",
        alt: "Organophosphate inhibition of acetylcholinesterase at synapse",
        keyword: "insecticide",
      },
      {
        Component: CarbamatePyrethroidContrast,
        caption:
          "Carbamate vs pyrethroid: both hit the nervous system, but carbamates block acetylcholinesterase reversibly while pyrethroids hold sodium channels open — different locks, similar paralysis.",
        alt: "Carbamate versus pyrethroid mode of action contrast",
        keyword: "pesticide",
      },
      {
        Component: HerbicideCropSelectivity,
        caption:
          "Selective weedkillers: 2,4-D mimics auxin and kills broad-leaved dicots while cereal monocots shrug — selectivity is chemistry, not luck, and it decided the shape of modern farming.",
        alt: "Herbicide selectivity 2,4-D dicot versus monocot",
        keyword: "herbicide",
      },
      {
        Component: ResistanceEvolutionSpray,
        caption:
          "Resistance is evolution at spray speed: each application kills the susceptible and spares the resistant, so the population re-sprays itself into futility within generations.",
        alt: "Pesticide resistance evolution under repeated spraying",
        keyword: "resistance",
      },
      {
        Component: BioaccumulationTrophicLadder,
        caption:
          "The trophic ladder concentrates poison: water at 0.000003 ppm → plankton → fish → fish-eating birds at 25 ppm — biomagnification multiplies DDT a million-fold up the chain.",
        alt: "Biomagnification trophic ladder DDT concentrations",
        keyword: "biomagnification",
      },
      {
        Component: IPMStepsLadder,
        caption:
          "IPM climbs before it sprays: cultural control, biological control, resistant varieties, pheromone traps — chemicals are the last rung, used at the economic threshold only.",
        alt: "Integrated pest management steps ladder",
        keyword: "IPM",
      },
      {
        Component: PesticideLabelSafety,
        caption:
          "The label is the manual: dose, interval, protective gear, waiting period before harvest — most pesticide accidents are label violations, not chemistry surprises.",
        alt: "Pesticide label safety instructions dose protective gear",
        keyword: "label",
      },
      {
        Component: RachelCarsonSilentSpring,
        caption:
          "One book changed the law: Rachel Carson's Silent Spring (1962) traced DDT through food chains to thin eggshells — and seeded the environmental movement and the EPA.",
        alt: "Rachel Carson Silent Spring book impact on pesticide policy",
        keyword: "DDT",
      },
      {
        Component: NeonicotinoidPollinatorRisk,
        caption:
          "Neonicotinoids and the bees: systemic insecticides ride nectar to the hive, scrambling bee navigation — pollination services worth billions hang on this debate.",
        alt: "Neonicotinoid effects on bee pollinators",
        keyword: "pollinator",
      },
      {
        Component: AntibioticResistanceFarms,
        caption:
          "Farms as resistance factories: routine low-dose antibiotics in livestock breed resistant bacteria that jump to people — one reason doctors now beg farmers to stop growth-promotion doses.",
        alt: "Antibiotic resistance from livestock farms to humans",
        keyword: "antibiotic",
      },
      {
        Component: BiologicalControlCaseStudies,
        caption:
          "Biological control's hall of fame: ladybirds against aphids, Bacillus thuringiensis against caterpillars, Trichoderma against fungi — predators and pathogens as pesticides.",
        alt: "Biological control case studies ladybird BT Trichoderma",
        keyword: "control",
      },
      {
        Component: PesticideVsBiopesticide,
        caption:
          "Synthetic vs biopesticide: synthetics act fast but persist and select for resistance; biopesticides (neem, Bt, pheromones) are narrower, gentler and resistance-friendly — the trade-off is speed.",
        alt: "Synthetic pesticide versus biopesticide comparison",
        keyword: "pesticide",
      },
      {
        Component: PesticidePoisoningFirstAid,
        caption:
          "Poisoning first aid: move the victim from the source, remove contaminated clothing, wash skin, keep airway clear — and never induce vomiting for petroleum-based products.",
        alt: "Pesticide poisoning first aid steps",
        keyword: "poisoning",
      },
      {
        Component: PesticideResidueWashing,
        caption:
          "Residue on the plate: washing removes surface pesticide, peeling removes systemic residues poorly — cooking helps for some compounds, never for all; the label's waiting period is the real control.",
        alt: "Pesticide residue removal washing peeling cooking",
        keyword: "washing",
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
      {
        Component: BiodiversityLevelsTrio,
        caption:
          "Biodiversity in three layers: genetic diversity within a population, species diversity in a community, ecosystem diversity across a landscape — lose one layer and the others wobble.",
        alt: "Biodiversity three levels genetic species ecosystem",
        keyword: "biodiversity",
      },
      {
        Component: BiodiversityValueLedger,
        caption:
          "The value ledger: direct use (food, timber, medicine), indirect use (climate, water, pollination), option value (future drugs) and existence value — biodiversity is an asset with four columns.",
        alt: "Biodiversity values direct indirect option existence",
        keyword: "value",
      },
      {
        Component: HotspotCriteriaMap,
        caption:
          "Hotspot maths: at least 1,500 endemic plant species plus 70% habitat lost — both conditions must hold; the Himalaya qualifies, which makes Nepal a shareholder in a global emergency.",
        alt: "Biodiversity hotspot criteria endemic plants and habitat loss",
        keyword: "hotspot",
      },
      {
        Component: SpeciesAreaRule,
        caption:
          "The species–area rule: S = cA^z — halve the habitat and species richness does not halve, it collapses along a power curve; the maths behind every habitat-loss warning.",
        alt: "Species area relationship curve S = cA^z",
        keyword: "area",
      },
      {
        Component: FlagshipUmbrellaSpecies,
        caption:
          "Flagship, umbrella, keystone: the tiger raises funds (flagship), its large reserve shelters lesser species (umbrella), and its removal rewrites the food web (keystone) — three roles, one animal.",
        alt: "Flagship umbrella and keystone species roles of tiger",
        keyword: "species",
      },
      {
        Component: AlienInvasionPathways,
        caption:
          "How aliens arrive: ornamental planting, aquaculture, shipping ballast, pets released, hitchhiking produce — invasive species ride every trade route humans open.",
        alt: "Alien invasive species introduction pathways",
        keyword: "alien",
      },
      {
        Component: ExtinctionDebtCascade,
        caption:
          "Extinction debt: habitat loss today bills species that will vanish decades later — the walking dead of fragmented forests, already doomed but not yet gone.",
        alt: "Extinction debt cascade after habitat loss",
        keyword: "extinction",
      },
      {
        Component: OverexploitationBushmeat,
        caption:
          "Overexploitation's empty forest: bushmeat hunting, illegal timber and wildlife trade empty forests faster than habitat loss fills them — the forest looks intact and sounds silent.",
        alt: "Overexploitation bushmeat hunting and wildlife trade",
        keyword: "overexploitation",
      },
      {
        Component: EcologicalFootprintCalculation,
        caption:
          "The footprint's arithmetic: how many hectares of biologically productive land and sea does one lifestyle demand? — when humanity's total exceeds Earth's biocapacity, we are drawing down the principal.",
        alt: "Ecological footprint calculation hectares biocapacity",
        keyword: "sustainable",
      },
      {
        Component: EcologicalFootprintComponents,
        caption:
          "What goes into a footprint: food, housing, transport, goods, services — each converted into global hectares; diet and travel are the two levers an individual actually holds.",
        alt: "Ecological footprint components food housing transport goods",
        keyword: "ecosystem",
      },
      {
        Component: EarthOvershootDay,
        caption:
          "Earth Overshoot Day: the date each year when consumption passes the planet's annual regeneration — it has moved from late December in the 1970s into July and August.",
        alt: "Earth overshoot day date moving earlier",
        keyword: "sustainable",
      },
      {
        Component: CarbonFootprintReductionActions,
        caption:
          "Cutting carbon, ranked: fly less, eat less meat, electrify heating and transport, insulate homes, plant and protect forests — the biggest levers are the least advertised ones.",
        alt: "Carbon footprint reduction actions ranked",
        keyword: "forest",
      },
      {
        Component: CircularEconomyModel,
        caption:
          "Linear vs circular: take-make-waste ends in a landfill; the circular loop designs out waste — repair, remanufacture, recycle — so materials orbit the economy instead of falling off it.",
        alt: "Circular economy model linear versus circular loops",
        keyword: "sustainable",
      },
      {
        Component: GreenAccountingGdpCritique,
        caption:
          "GDP's blind spot: a felled forest raises GDP twice (timber sold, cleanup paid) while subtracting nothing — green accounting subtracts natural-capital depreciation to show the real balance.",
        alt: "Green accounting GDP critique natural capital",
        keyword: "value",
      },
      {
        Component: EnvironmentalEthicsWorldviews,
        caption:
          "Three worldviews, one planet: anthropocentrism (nature serves people), biocentrism (every living thing counts), ecocentrism (the system itself is sacred) — your ethic decides your economics.",
        alt: "Environmental ethics worldviews anthropocentrism biocentrism ecocentrism",
        keyword: "ethics",
      },
      {
        Component: SustainableDevelopmentGoals,
        caption:
          "The SDGs in one grid: 17 goals from poverty to peace, with 13, 14 and 15 (climate, life below water, life on land) carrying the biology — the 2030 deadline is the exam hook.",
        alt: "Sustainable development goals 17 grid climate life on land",
        keyword: "goal",
      },
      {
        Component: EnvironmentalImpactAssessmentSteps,
        caption:
          "EIA's sequence: screening → scoping → baseline study → impact prediction → mitigation plan → public hearing → decision → monitoring — a project must walk the whole ladder in Nepal's law.",
        alt: "Environmental impact assessment steps screening to monitoring",
        keyword: "sustainable",
      },
      {
        Component: ReddPlusMechanism,
        caption:
          "REDD+ pays for standing trees: developing countries earn results-based payments for avoided deforestation and restoration — carbon markets meet conservation, with monitoring satellites as the referee.",
        alt: "REDD+ mechanism avoided deforestation payments",
        keyword: "forest",
      },
      {
        Component: FoodSecurityFourPillars,
        caption:
          "Food security stands on four pillars: availability (enough grown), access (money and markets), utilisation (nutrition and clean water), stability (no shocks) — a full granary fails if any pillar cracks.",
        alt: "Food security four pillars availability access utilisation stability",
        keyword: "food",
      },
      {
        Component: BiodiversityHotspotsMap,
        caption:
          "The global hotspot map: 36 regions qualify — the Himalaya, Indo-Burma and the Western Ghats–Sri Lanka flank Nepal — together holding most of Earth's endemic plants on a sliver of land.",
        alt: "Biodiversity hotspots world map Himalaya Indo-Burma Western Ghats",
        keyword: "hotspots",
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
      {
        Component: NationalParksHistoryNepal,
        caption:
          "Nepal's conservation timeline: Chitwan National Park (1973) started it, and the network grew to 12 national parks, wildlife reserves, conservation areas and buffer zones covering about 23.39% of the country.",
        alt: "History of national parks in Nepal from Chitwan 1973",
        keyword: "national",
      },
      {
        Component: ParkCategoriesCompare,
        caption:
          "Not all protected areas are equal: national parks ban hunting and settlement, reserves protect particular species, conservation areas blend community use — the category decides the rules.",
        alt: "Protected area categories comparison national park reserve conservation area",
        keyword: "park",
      },
      {
        Component: KoshiTappuProfile,
        caption:
          "Koshi Tappu in numbers: Nepal's first wildlife reserve (1976), a 175 km² wetland, the last refuge of about 150 wild water buffalo (arna) and a Ramsar site for 485+ bird species.",
        alt: "Koshi Tappu wildlife reserve profile wetland birds arna",
        keyword: "koshi",
      },
      {
        Component: EcotourismRevenueLoop,
        caption:
          "The ecotourism loop: tourist fees fund rangers, rangers protect wildlife, wildlife attracts tourists — when the loop holds, conservation pays for itself; when it leaks, poachers outbid it.",
        alt: "Ecotourism revenue loop funding conservation",
        keyword: "revenue",
      },
      {
        Component: NationalParksListNepal,
        caption:
          "The roll call: Chitwan, Bardiya, Langtang, Sagarmatha, Rara, Khaptad, Shey-Phoksundo, Makalu-Barun, Shivapuri-Nagarjun, Banke, Shuklaphanta, Parsa — twelve parks from Terai to alpine.",
        alt: "List of national parks of Nepal",
        keyword: "park",
      },
      {
        Component: ParksVsCommunityForests,
        caption:
          "Two conservation models: parks fence people out; community forests hand the forest to user groups with a constitution — Nepal runs both, and community forestry is the world's quiet success story.",
        alt: "National parks versus community forests comparison",
        keyword: "reserve",
      },
      {
        Component: BufferZoneCommunityForestry,
        caption:
          "Buffer zones share the edge: 30–50% of park revenue funds community projects in buffer villages, turning former opponents of the park into its stakeholders.",
        alt: "Buffer zone community forestry revenue sharing",
        keyword: "buffer",
      },
      {
        Component: EcotourismProsCons,
        caption:
          "Ecotourism's two faces: income, jobs and conservation funding on one side; trail erosion, waste, wildlife disturbance and cultural dilution on the other — managed ecotourism keeps the first column.",
        alt: "Ecotourism advantages and disadvantages",
        keyword: "tourism",
      },
      {
        Component: WetlandEcosystemServices,
        caption:
          "What a wetland does for free: water storage, flood buffering, groundwater recharge, nutrient filtering, fish nurseries and carbon storage — Ramsar lists what accounting forgets.",
        alt: "Wetland ecosystem services water storage flood buffering",
        keyword: "wetland",
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
      {
        Component: PoachingEconomics,
        caption:
          "Poaching is an economy: a rhino horn can outprice gold by weight, so guards must outbid smugglers — better incomes, intelligence networks and demand reduction are the three-front answer.",
        alt: "Poaching economics rhino horn value and enforcement",
        keyword: "poaching",
      },
      {
        Component: RhinoTranslocationSuccess,
        caption:
          "Translocation worked: rhinos moved from Chitwan's crowded core to Bardiya and Shuklaphanta spread the risk — from 752 rhinos counted in 2021 (694 Chitwan, 38 Bardiya, 17 Shuklaphanta, 3 Parsa).",
        alt: "Rhino translocation from Chitwan to Bardiya and Shuklaphanta",
        keyword: "rhino",
      },
      {
        Component: HumanWildlifeConflictFence,
        caption:
          "Conflict at the edge: crop-raiding elephants and leopards take livestock where park meets farm — fences, palisades, chili-tobacco deterrents and compensation schemes manage the boundary.",
        alt: "Human wildlife conflict mitigation fence and compensation",
        keyword: "wildlife",
      },
      {
        Component: ConservationStrategiesPair,
        caption:
          "In-situ or ex-situ? Protecting species in place keeps evolution running; zoos, seed banks and tissue culture are the insurance copy — every serious plan uses both.",
        alt: "In-situ and ex-situ conservation strategies pair",
        keyword: "ex-situ",
      },
      {
        Component: SpeciesReintroductionPrograms,
        caption:
          "Reintroduction, done right: captive breeding, pre-release conditioning, soft release, monitoring — the gharial and vulture programmes show that rewilding is a protocol, not a truck ride.",
        alt: "Species reintroduction programme steps captive breeding release",
        keyword: "captive",
      },
      {
        Component: WildlifeTradeRoutes,
        caption:
          "The trade routes: pelts, horns, bones, live birds and orchids flow from source forests through border towns to markets — CITES exists because the routes are international.",
        alt: "Illegal wildlife trade routes from forest to market",
        keyword: "trade",
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
      {
        Component: ThreatAssessmentCriteria,
        caption:
          "How a species earns its label: rate of decline, population size, range area and fragmentation — measured against quantitative thresholds, the Red List is criteria, not sentiment.",
        alt: "IUCN threat assessment criteria decline population range",
        keyword: "threatened",
      },
      {
        Component: NepalRedListExamples,
        caption:
          "Nepal's Red List roll: Bengal tiger (endangered), greater one-horned rhino (vulnerable), gharial (critically endangered), Bengal florican (critically endangered) — the national A-list of risk.",
        alt: "Nepal Red List examples tiger rhino gharial florican",
        keyword: "red",
      },
      {
        Component: CITESAppendicesDetail,
        caption:
          "CITES in three appendices: Appendix I bans commercial trade, Appendix II regulates it with permits, Appendix III records national requests — 184 parties, one permit system.",
        alt: "CITES appendices I II III trade regulation",
        keyword: "iucn",
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
      {
        Component: EndemicNepalSpecies,
        caption:
          "Endemic means found nowhere else: Nepal's endemic flowering plants and restricted-range species live on isolated mountain islands — endemism is fragility with a Latin name.",
        alt: "Endemic species of Nepal restricted range",
        keyword: "species",
      },
      {
        Component: VultureDiclofenacCrash,
        caption:
          "The vulture crash: diclofenac in cattle carcasses caused renal failure in Oriental white-backed vultures — populations fell over 97%, and meloxicam is the safe substitute now promoted.",
        alt: "Vulture population crash from diclofenac and meloxicam switch",
        keyword: "habitat",
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
      {
        Component: BranchTreeDivisions,
        caption:
          "Three main divisions: botany studies plants, zoology studies animals, microbiology studies the invisible kingdom — each with its own sub-branches.",
        alt: "Botany zoology microbiology three divisions of biology",
        keyword: "botany",
      },
      {
        Component: ZoologyBotanySplit,
        caption:
          "Why botany and zoology split: plants sit and photosynthesise, animals move and eat — an old division that fungi, microbes and modern fields now cut across.",
        alt: "Zoology versus botany split with examples",
        keyword: "zoology",
      },
      {
        Component: MolecularToOrganismBranches,
        caption:
          "Four zoom levels: molecular biology reads DNA, cytology reads cells, histology reads tissues, morphology reads the whole external form.",
        alt: "Molecular cytology histology morphology levels of study",
        keyword: "cytology",
      },
      {
        Component: SpecialistBranchCareers,
        caption:
          "Specialist branches and their jobs: ornithology studies birds, entomology insects, mycology fungi, paleontology fossils — narrow focus, real careers.",
        alt: "Specialist branches ornithology entomology mycology paleontology",
        keyword: "entomology",
      },
      {
        Component: AppliedFieldsTriple,
        caption:
          "Applied biology in three professions: agriculture breeds better crops, medicine fights disease, industry ferments and catalyses — all fed by basic research.",
        alt: "Applied biology agriculture medicine industry",
        keyword: "applied",
      },
      {
        Component: LocalBranchExamples,
        caption:
          "Every branch, seen locally: ecology in the paddy field, taxonomy in the herbarium, physiology in the buffalo, genetics in rust-resistant wheat.",
        alt: "Local examples of biology branches in Nepal",
        keyword: "taxonomy",
      },
      {
        Component: BiologyTodayFrontiers,
        caption:
          "Biology's frontiers: genomics reads whole genomes, biotechnology edits genes, ecology tracks a warming biosphere, neurobiology maps the brain.",
        alt: "Biology today frontiers genomics CRISPR ecology neurobiology",
        keyword: "genomics",
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
      {
        Component: InterdisciplinaryMap,
        caption:
          "Biology at the centre: borrowing chemistry's molecules, physics's instruments, mathematics's models — and lending its questions to medicine and agriculture.",
        alt: "Interdisciplinary map biology connected to other sciences",
        keyword: "bridge science",
      },
      {
        Component: ChemistryBiologyLink,
        caption:
          "Chemistry lends biology its logic: photosynthesis is redox, digestion is hydrolysis, DNA pairing follows bonding rules — life is chemistry that replicates.",
        alt: "Chemistry biology link biochemistry molecules enzymes",
        keyword: "chemistry",
      },
      {
        Component: PhysicsBiologyLink,
        caption:
          "Physics lends instruments and laws: microscopes found cells, MRI sees brains, and the 10% energy law is thermodynamics wearing a lab coat.",
        alt: "Physics biology link instruments and laws biophysics",
        keyword: "physics",
      },
      {
        Component: MathsBiologyLink,
        caption:
          "Mathematics turns biology predictive: growth curves, Hardy-Weinberg algebra, chi-square tests on Mendel's counts — description becomes prediction.",
        alt: "Mathematics biology link biostatistics models graphs",
        keyword: "mathematics",
      },
      {
        Component: GeographySocietyLinks,
        caption:
          "The wider links: geography explains where life lives, sociology what people do to it, economics what it is worth — each with a Nepali example.",
        alt: "Geography sociology economics links with biology",
        keyword: "geography",
      },
      {
        Component: ControlGroupDesign,
        caption:
          "The fair test: a control group differing in nothing but the factor tested, with independent, dependent and controlled variables named.",
        alt: "Controlled experiment design control group variables",
        keyword: "control",
      },
      {
        Component: HypothesisTheoryLadder,
        caption:
          "How ideas earn trust: observation → hypothesis → prediction → experiment → theory — and a theory keeps its title only while tests keep passing.",
        alt: "Hypothesis to theory ladder scientific progression",
        keyword: "hypothesis",
      },
      {
        Component: SpaceScienceSpinoffs,
        caption:
          "Space research pays biology back: satellite imaging tracks vegetation and epidemics, spaceflight studies bone loss and immunity, and miniaturised sensors became medical devices — physics funding, biology dividends.",
        alt: "Space science spinoffs satellite imaging space medicine",
        keyword: "physics",
      },
      {
        Component: SpaceScienceApplications,
        caption:
          "Satellites as biology's eyes: remote sensing maps deforestation and crop health, GPS tracks collared tigers and elephants, and communication links link rural clinics — conservation now runs on orbital hardware.",
        alt: "Space science applications remote sensing GPS wildlife tracking",
        keyword: "physics",
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
      {
        Component: ReducingAtmosphereChemistry,
        caption:
          "Why 'reducing' matters: with no free O₂ organics were not burnt back to CO₂, and with no ozone UV drove reactions — today's air would destroy the same soup in hours.",
        alt: "Reducing atmosphere chemistry methane ammonia hydrogen no free oxygen",
        keyword: "methane",
      },
      {
        Component: AbiogenesisBiogenesisContrast,
        caption:
          "Abiogenesis vs biogenesis: claim, champions, test and verdict — biogenesis won for today, but chemical evolution happened once under the early atmosphere.",
        alt: "Abiogenesis versus biogenesis debate table Pasteur Redi",
        keyword: "abiogenesis",
      },
      {
        Component: RNAWorldHypothesis,
        caption:
          "The RNA world: one molecule storing information and catalysing reactions — ribozymes could copy themselves, later handing those jobs to DNA and protein.",
        alt: "RNA world hypothesis ribozyme information and catalysis",
        keyword: "RNA",
      },
      {
        Component: CoacervateProtobiont,
        caption:
          "From soup to droplet: Oparin's coacervates concentrated enzymes and substrates inside a boundary — chemistry became local, protected and selectable.",
        alt: "Coacervate protobiont droplets with boundary and concentrated reactions",
        keyword: "coacervate",
      },
      {
        Component: AminoAcidYieldChart,
        caption:
          "Product yields from the spark: glycine and alanine most abundant, aspartic and glutamic acid next — exactly what a non-enzymatic discharge would make first.",
        alt: "Miller Urey amino acid yield chart glycine alanine",
        keyword: "amino acid",
      },
      {
        Component: EnergySourcesEarlyEarth,
        caption:
          "Four energy sources cooked the soup: hard UV (no ozone), lightning, volcanic heat and meteor impacts — bonds do not re-form for free.",
        alt: "Energy sources early Earth UV lightning volcanic meteor",
        keyword: "lightning",
      },
      {
        Component: AnaerobicFirstCells,
        caption:
          "The first cells were anaerobic heterotrophs feeding on the soup; when it ran short, autotrophs appeared — and their O₂ triggered the oxygen crisis.",
        alt: "Anaerobic first cells to autotrophs oxygen crisis sequence",
        keyword: "anaerobic",
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
      {
        Component: PaleontologyStrataStory,
        caption:
          "Fossils are history's pages: life was different in the past, complexity increases upward, and index fossils date the layer they sit in.",
        alt: "Paleontology strata story fossils in rock layers",
        keyword: "paleontology",
      },
      {
        Component: FossilDatingLayers,
        caption:
          "Dating the layers: C-14 for recent remains, U-Pb and K-Ar for ancient rock — deeper strata are older, and no layer contradicts the order.",
        alt: "Fossil dating layers strata isotope methods",
        keyword: "fossil",
      },
      {
        Component: EmbryologyEvidenceStages,
        caption:
          "von Baer's law: general characters (gill pouches, tail, notochord) appear before special ones — embryos agree early and argue late.",
        alt: "Embryology evidence early embryos agree late diverge",
        keyword: "embryological",
      },
      {
        Component: BiochemicalMolecularTests,
        caption:
          "Counting differences in cytochrome c: chimpanzee 0, rhesus 1, horse 12, yeast 44 — a molecular family tree that matches the fossil tree.",
        alt: "Biochemical molecular tests cytochrome c differences chart",
        keyword: "biochemical",
      },
      {
        Component: ArchaeopteryxMosaic,
        caption:
          "Archaeopteryx in detail: teeth, bony tail and clawed wings (reptile) beside feathers and a wishbone (bird) — the classic connecting link.",
        alt: "Archaeopteryx mosaic reptilian and avian characters",
        keyword: "archaeopteryx",
      },
      {
        Component: ConnectingLinksTrio,
        caption:
          "Three links, one lesson: Peripatus bridges annelid-arthropod, Euglena bridges plant-animal, Archaeopteryx bridges reptile-bird.",
        alt: "Connecting links Peripatus Euglena Archaeopteryx",
        keyword: "peripatus",
      },
      {
        Component: DivergentVsConvergent,
        caption:
          "The rule: same structure, different function = divergent evolution (homology); same function, different structure = convergent evolution (analogy).",
        alt: "Divergent versus convergent evolution homology analogy",
        keyword: "divergent",
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
      {
        Component: DarwinVoyageBeagle,
        caption:
          "The voyage that built the theory: South American fossils, Galapagos finches, Lyell's deep time and Malthus's populations — five years of notes became one idea.",
        alt: "Darwin voyage HMS Beagle Galapagos finches route",
        keyword: "darwin",
      },
      {
        Component: OverproductionMath,
        caption:
          "Darwin's elephant arithmetic: one pair breeding unchecked would cover every continent — the gap between potential and actual numbers is the struggle.",
        alt: "Overproduction math elephant example geometric growth",
        keyword: "overproduction",
      },
      {
        Component: StruggleForExistence,
        caption:
          "Three struggles: intraspecific (same species, most severe), interspecific (between species) and environmental (climate, drought) — all caused by limited resources.",
        alt: "Struggle for existence intraspecific interspecific environmental",
        keyword: "struggle for existence",
      },
      {
        Component: MutationVariationSources,
        caption:
          "Four suppliers of variation: mutation (the only source of new alleles), recombination, gene flow and chance fertilisation — selection needs them all.",
        alt: "Mutation variation sources mutation recombination gene flow",
        keyword: "mutation",
      },
      {
        Component: NaturalSelectionSteps,
        caption:
          "Selection in five moves: variation appears, struggle intervenes, the best-suited survive and reproduce more, genes pass on, adaptation results.",
        alt: "Natural selection steps variation struggle selection adaptation",
        keyword: "natural selection",
      },
      {
        Component: IsolationGeneFlowBarriers,
        caption:
          "Isolation blocks gene flow: geographical barriers start the split, reproductive barriers finish it — no gene flow is the key phrase.",
        alt: "Isolation gene flow barriers geographical reproductive genetic",
        keyword: "isolation",
      },
      {
        Component: SpeciationSteps,
        caption:
          "Speciation in five steps: one population → barrier → independent change → divergence → reproductive isolation. The species test: reunited, do they still interbreed?",
        alt: "Speciation steps from population to two species",
        keyword: "speciation",
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
      {
        Component: ManKingdomTraits,
        caption:
          "Three rungs that make us human: mammal characters, primate characters (opposable thumb, stereoscopic vision) and hominid characters (bipedal, speech, culture).",
        alt: "Man kingdom traits mammal primate hominid characters",
        keyword: "hominidae",
      },
      {
        Component: HominidTimelineDates,
        caption:
          "The line-up with dates: Dryopithecus ~20–14 mya, Ramapithecus ~14–10, Australopithecus ~4–2, habilis ~2.4–1.4, erectus ~1.8 mya–300 kya, Neanderthal, sapiens.",
        alt: "Hominid timeline dates from Dryopithecus to sapiens",
        keyword: "dryopithecus",
      },
      {
        Component: AustralopithecusLucy,
        caption:
          "Lucy (A. afarensis, ~3.2 mya): chimp-sized brain, human-like pelvis — bipedalism came before big brains, the single most examinable fact in this topic.",
        alt: "Australopithecus Lucy first biped fact card",
        keyword: "lucy",
      },
      {
        Component: HomoHabilisTools,
        caption:
          "Homo habilis, the handy man: first Oldowan stone tools, first brain jump to ~650–750 cc, precision grip — tools and brain grew together.",
        alt: "Homo habilis first stone tools Oldowan chopper",
        keyword: "tools",
      },
      {
        Component: HomoErectusFire,
        caption:
          "Homo erectus: fire (warmth, defence, cooking), ~900–1100 cc brain, fully modern walk — and the first to leave Africa.",
        alt: "Homo erectus fire hearth migration",
        keyword: "fire",
      },
      {
        Component: NeanderthalProfile,
        caption:
          "Neanderthal man: ~1400 cc brain, heavy brow, stocky ice-age build, Mousterian tools, buried their dead — a cousin line, not our ancestor.",
        alt: "Neanderthal profile stocky build large brain",
        keyword: "neanderthal",
      },
      {
        Component: CroMagnonArt,
        caption:
          "Cro-Magnon (Homo sapiens): cave painting, ornaments, grave goods, blades and needles — art is the clearest evidence of symbolic thought.",
        alt: "Cro Magnon cave art symbolic thought",
        keyword: "cro-magnon",
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
      {
        Component: PrehensileTailDemo,
        caption:
          "The tail as a fifth hand: New World monkeys grip branches with a hairless tail tip; Old World monkeys never do; apes and man have no tail at all.",
        alt: "Prehensile tail spider monkey hanging fifth hand",
        keyword: "prehensile",
      },
      {
        Component: NostrilSeptumZoom,
        caption:
          "The nose knows: Platyrrhini — flat, wide septum, sideways nostrils; Catarrhini — narrow downward nostrils, the inheritance we share with Old World monkeys and apes.",
        alt: "Platyrrhine versus catarrhine nostril septum comparison",
        keyword: "nostrils",
      },
      {
        Component: CheekPouchIschial,
        caption:
          "Two Old World-only markers: cheek pouches carry food for later; ischial callosities are hard sitting pads on the rump — New World monkeys have neither.",
        alt: "Cheek pouches and ischial callosities Old World markers",
        keyword: "cheek pouches",
      },
      {
        Component: GibbonBrachiation,
        caption:
          "The gibbon: lesser ape (Hylobatidae), smallest and lightest, brachiates through the canopy with hook hands, lives in monogamous duetting pairs.",
        alt: "Gibbon brachiation arm swinging lesser ape",
        keyword: "gibbon",
      },
      {
        Component: BaboonGroundLife,
        caption:
          "The baboon: an Old World monkey that left the trees — dog-like muzzle, ground-foraging troops, omnivorous, with callosities and cheek pouches.",
        alt: "Baboon ground life terrestrial Old World monkey",
        keyword: "baboon",
      },
      {
        Component: MonkeyApeThumbGrip,
        caption:
          "The thumb tells the story: monkey clasp, ape hook grip with partial opposition, human fully opposable thumb and precision grip — every tool rests on that joint.",
        alt: "Monkey ape thumb grip precision grip progression",
        keyword: "thumb",
      },
      {
        Component: PrimateGradeLadder,
        caption:
          "Six grades in order: prosimians → New World monkeys → Old World monkeys → lesser apes → great apes → man — a grade ladder, not a family tree.",
        alt: "Primate grade ladder prosimians to man",
        keyword: "great ape",
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
      {
        Component: SavannaPressure,
        caption:
          "The savanna pressure: Miocene cooling shrank the African forest ~7 mya — edge populations faced a choice between the forest line (apes) and the ground line (hominins).",
        alt: "Savanna pressure forest shrinkage open grassland",
        keyword: "savanna",
      },
      {
        Component: BipedalSkeletonCompare,
        caption:
          "Four bones that walk upright: foramen magnum under the skull, S-curved spine, bowl pelvis, femur angled inward — any two prove bipedalism from a fossil.",
        alt: "Bipedal skeleton ape versus human comparison",
        keyword: "bipedal",
      },
      {
        Component: HomoErectusSpread,
        caption:
          "The first diaspora: erectus left Africa ~1.8 mya — Georgia, Java man, Peking man, Europe — fire and long legs made forest optional.",
        alt: "Homo erectus spread out of Africa map",
        keyword: "homo erectus",
      },
      {
        Component: NeanderthalBurial,
        caption:
          "The first funerals: Shanidar's flower burial, healed fractures showing care, grave goods — behaviour, not anatomy, marks the Neanderthal mind.",
        alt: "Neanderthal burial Shanidar cave care compassion",
        keyword: "burial",
      },
      {
        Component: NeolithicFarmingShift,
        caption:
          "The Neolithic turn: farming ~10,000 years ago brought villages, surplus, specialisation and states — cultural evolution then outran biology.",
        alt: "Neolithic farming shift agriculture villages surplus",
        keyword: "agriculture",
      },
      {
        Component: LanguageBrainCircuit,
        caption:
          "The speech circuit: Broca's area produces, Wernicke's area understands, a dropped larynx shapes the sounds — language made evolution collaborative.",
        alt: "Language brain circuit Broca Wernicke larynx",
        keyword: "language",
      },
      {
        Component: HomoSapiensIdentity,
        caption:
          "Homo sapiens — 'wise man': bipedal body, symbolic mind, spoken word and cumulative culture, where a child learns in an hour what took a thousand generations.",
        alt: "Homo sapiens identity anatomy mind voice culture",
        keyword: "homo sapiens",
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
      {
        Component: SalTreeProfile,
        caption:
          "Sal (Shorea robusta), the Terai's timber king: straight branch-free trunk, deciduous habit below 1000 m, and timber that built houses and railway sleepers.",
        alt: "Sal tree profile Shorea robusta Terai timber uses",
        keyword: "sal",
      },
      {
        Component: ChirPineBelt,
        caption:
          "Chir pine owns the 1000–2000 m slopes: evergreen needles, resin for turpentine, acidic litter and a taste for dry south-facing ground.",
        alt: "Chir pine belt subtropical slope resin uses",
        keyword: "chir",
      },
      {
        Component: RhododendronTemperateBelt,
        caption:
          "Rhododendron (lali gurans), Nepal's national flower: evergreen broadleaf of the 2000–3000 m temperate forest, painting hillsides red each spring.",
        alt: "Rhododendron temperate belt national flower lali gurans",
        keyword: "rhododendron",
      },
      {
        Component: AlpineNivalLife,
        caption:
          "Above the tree line: alpine bugyal meadows with cushion plants and yarsagumba, then the nival zone where only lichens and mosses persist.",
        alt: "Alpine meadow and nival zone life above tree line",
        keyword: "nival",
      },
      {
        Component: VegetationTypesSummary,
        caption:
          "The revision card: six zones with altitude bands and one dominant species each — tropical sal to nival lichen, memorise the triple.",
        alt: "Vegetation types summary table six zones",
        keyword: "tropical",
      },
      {
        Component: EastWestGradient,
        caption:
          "The hidden second axis: rainfall weakens east to west, so the wet east grows tall forest while the dry west and rain-shadow valleys turn to pine and steppe.",
        alt: "East west vegetation gradient rainfall monsoon Nepal",
        keyword: "rain",
      },
      {
        Component: WetlandAquaticVegetation,
        caption:
          "Wetland vegetation: reed beds of Saccharum and Phragmites, floating-leaf plants and the invasive water hyacinth — fish nurseries and flood sponges worth protecting.",
        alt: "Wetland aquatic vegetation reeds floating plants hyacinth",
        keyword: "wetland",
      },
      {
        Component: VegetationZoneConservation,
        caption:
          "Every zone carries something worth keeping: sal parks protect rhino country, temperate forests guard springs, alpine meadows grow medicine — lose a zone, lose its gifts.",
        alt: "Vegetation zone conservation value protected areas by altitude",
        keyword: "conservation",
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
      {
        Component: ProtectedAreaCategories,
        caption:
          "Five kinds of in-situ area: national park, wildlife reserve, conservation area, hunting reserve and Ramsar wetland — differing in rules, managers and targets.",
        alt: "Protected area categories national park wildlife reserve Ramsar",
        keyword: "national park",
      },
      {
        Component: BotanicalGardenRole,
        caption:
          "Botanical gardens, the living plant museum: conservation of rare species, education, propagation research and recreation — Godawari does all four.",
        alt: "Botanical garden role ex-situ Godawari beds",
        keyword: "botanical garden",
      },
      {
        Component: ZooCaptiveBreeding,
        caption:
          "Zoos breed the nearly lost: gharial and vulture programmes show ex-situ at work — an ark, not a destination, with reintroduction as the goal.",
        alt: "Zoo captive breeding gharial vulture Central Zoo",
        keyword: "captive",
      },
      {
        Component: GeneBankTissueCulture,
        caption:
          "Gene banks and tissue culture: seeds stored dry and cold, meristems grown virus-free on agar, cryopreservation at −196 °C pausing life itself.",
        alt: "Gene bank tissue culture cryopreservation Khumaltar",
        keyword: "tissue",
      },
      {
        Component: ConservationDecisionTree,
        caption:
          "Which method, when? Habitat intact → in-situ; habitat gone or population critical → ex-situ, breed and store, then return to the wild.",
        alt: "Conservation decision tree in-situ versus ex-situ",
        keyword: "habitat",
      },
      {
        Component: BufferZoneBenefits,
        caption:
          "Buffer zones pay the neighbours: shared tourism revenue, community forests and conflict insurance turn villagers into the park's guardians.",
        alt: "Buffer zone benefits community revenue sharing",
        keyword: "buffer",
      },
      {
        Component: ConservationSuccessNumbers,
        caption:
          "Proof it works: tigers up from ~120 to 350+, rhinos from ~100 to 750+, forest cover recovered to ~45% — conservation, measured.",
        alt: "Conservation success numbers tiger rhino forest recovery",
        keyword: "tiger",
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
      {
        Component: FuelwoodFodderBalance,
        caption:
          "The daily withdrawals: fuelwood for cooking, fodder lopped for livestock, leaf litter for bedding — sustainable only while harvest stays under regrowth.",
        alt: "Fuelwood fodder balance daily forest withdrawals sustainability",
        keyword: "fuelwood",
      },
      {
        Component: MedicinalHerbEconomy,
        caption:
          "The herbal economy: yarsagumba in alpine meadows, chiraito and timur in the hills — high value brings overharvesting, so rules and cultivation must follow.",
        alt: "Medicinal herb economy yarsagumba chiraito timur jatamashi",
        keyword: "medicinal",
      },
      {
        Component: LandslideErosionLink,
        caption:
          "Why a felled hillside slides: roots die, monsoon saturates the slope, topsoil slides, rivers and reservoirs silt, springs dry — a five-link chain.",
        alt: "Landslide erosion link deforestation to siltation chain",
        keyword: "landslide",
      },
      {
        Component: InvasiveSpeciesThreat,
        caption:
          "Invasives win by cheating: Mikania smothers saplings, lantana thickets poison the ground, water hyacinth carpets lakes — disturbed land is their door.",
        alt: "Invasive species Mikania lantana water hyacinth threat",
        keyword: "lantana",
      },
      {
        Component: KhoriyaShiftingCycle,
        caption:
          "Khoriya, shifting cultivation: slash, burn, farm two or three years, fallow for decades — sustainable only while the fallow outlasts the damage.",
        alt: "Khoriya shifting cultivation slash burn fallow cycle",
        keyword: "khoriya",
      },
      {
        Component: OvergrazingSpiral,
        caption:
          "Overgrazing tightens a spiral: palatable grasses grazed out, soil compacts, unpalatable invasives take over — unless herd size is matched to carrying capacity.",
        alt: "Overgrazing spiral grass loss soil compaction invasives",
        keyword: "grazing",
      },
      {
        Component: HumanVegetationRelationships,
        caption:
          "Three relationships with vegetation: use (timber, fodder, medicine), misuse (clear-felling, overgrazing) and stewardship (community forestry, plantations).",
        alt: "Human vegetation relationships use misuse stewardship",
        keyword: "stewardship",
      },
      {
        Component: HimalayanSpringsDrying,
        caption:
          "The springs are the warning: hundreds of Himalayan spring sources have dried as deforestation, road cuts and declining recharge break the hills' water plumbing — vegetation is infrastructure.",
        alt: "Himalayan springs drying from deforestation and road cuts",
        keyword: "spring",
      },
      {
        Component: LandslideCausesNepalMonsoon,
        caption:
          "Why hillsides fail: steep slopes, monsoon saturation, road cuts and deforested roots — landslides are geology loaded by land use, and Nepal pays the annual bill.",
        alt: "Landslide causes in Nepal monsoon slopes deforestation",
        keyword: "landslide",
      },
      {
        Component: GlofMechanism,
        caption:
          "The glacial lake outburst flood: a moraine dam holding back a meltwater lake fails suddenly — Tsho Rolpa's lowering and early-warning siren show the engineering response.",
        alt: "Glacial lake outburst flood GLOF mechanism moraine dam",
        keyword: "glacier",
      },
      {
        Component: HydroelectricDamHowItWorks,
        caption:
          "The dam's physics: height × flow = power — a penstock drops water past turbines, generators spin, and Nepal's rivers (theoretical potential ~83,000 MW) are the country's biggest banked asset.",
        alt: "Hydroelectric dam how it works penstock turbine generator",
        keyword: "dam",
      },
      {
        Component: HydropowerNepalPotential,
        caption:
          "Nepal's hydropower ledger: ~83,000 MW theoretical, ~42,000 economically viable, a few thousand installed — the gap between the Himalaya's gift and the grid's reality is the development story.",
        alt: "Hydropower potential of Nepal theoretical viable installed",
        keyword: "hydropower",
      },
      {
        Component: ImprovedCookstovesSmoke,
        caption:
          "The smoke in the kitchen: traditional stoves waste most of the wood's energy and fill lungs with PM — improved stoves cut fuelwood use and indoor smoke with a chimney and a hotter burn.",
        alt: "Improved cookstoves reduce fuelwood and indoor smoke",
        keyword: "fuelwood",
      },
      {
        Component: LandResourcesDegradation,
        caption:
          "How land degrades: erosion strips topsoil at millimetres-per-century speed, salinisation follows bad irrigation, urban concrete seals the rest — soil is renewable only at geological patience.",
        alt: "Land resources degradation erosion salinisation urbanisation",
        keyword: "soil",
      },
      {
        Component: WaterResourcesStress,
        caption:
          "Water stress by numbers: under 1,700 m³ per person per year is 'stressed', under 1,000 'scarce' — Nepal is water-rich in aggregate and water-poor in the dry season and the taps.",
        alt: "Water resources stress scarcity thresholds",
        keyword: "water",
      },
      {
        Component: ForestResourcesPressure,
        caption:
          "What the forest gives and what we take: timber, fuelwood, fodder, NTFPs, grazing — demand grew while the forest base shrank; community forestry is how the graph turned around.",
        alt: "Forest resources pressure timber fuelwood fodder NTFP",
        keyword: "timber",
      },
      {
        Component: MineralResourcesExtraction,
        caption:
          "Extraction's footprint: quarries for stone and sand feed construction but scar hillsides, muddy rivers and dust the air — minerals are finite, and the holes stay after the money leaves.",
        alt: "Mineral resources extraction quarry footprint",
        keyword: "quarry",
      },
      {
        Component: GroundwaterDepletionIndia,
        caption:
          "India's underground overdraft: tube-wells pump more than the rain recharges, water tables fall metres a decade, and the energy subsidy that powers the pumps makes the hole deeper.",
        alt: "Groundwater depletion in India tube-wells water table",
        keyword: "water",
      },
      {
        Component: ResourceScarcityConflicts,
        caption:
          "Scarcity turns political: water disputes between farmers, fuelwood conflicts with parks, sand-mine mafias — when a resource runs out, the conflict arrives before the solution does.",
        alt: "Resource scarcity conflicts water fuel land",
        keyword: "fuel",
      },
      {
        Component: GreenRevolutionImpacts,
        caption:
          "The Green Revolution's two columns: HYV wheat and rice tripled harvests and ended famine risk — against falling water tables, soil fatigue and a narrowed gene pool; the verdict is 'both'.",
        alt: "Green revolution impacts HYV yields and costs",
        keyword: "cultivation",
      },
      {
        Component: GreenRevolutionTradeoffs,
        caption:
          "Trade-offs in one field: fertiliser feeds the crop and the algae downstream; tube-wells raise yields and drop the water table; monoculture simplifies the farm and the menu.",
        alt: "Green revolution tradeoffs fertiliser water monoculture",
        keyword: "cultivation",
      },
      {
        Component: OrganicFarmingPrinciples,
        caption:
          "Organic farming's four rules: feed the soil (compost, green manure), rotate crops, encourage natural enemies, refuse synthetics — slower yields, living soil, premium prices.",
        alt: "Organic farming principles soil rotation biocontrol",
        keyword: "cultivation",
      },
      {
        Component: OrganicFarmingPrinciplesDetail,
        caption:
          "Organic in practice: vermicompost and farmyard manure replace urea; neem and Bt replace synthetic sprays; crop rotation breaks pest cycles — certification and premiums make the maths work.",
        alt: "Organic farming practices vermicompost neem Bt rotation",
        keyword: "cultivation",
      },
      {
        Component: BiogasPlantCycle,
        caption:
          "The biogas loop: dung and slurry in, methane for the kitchen, spent slurry out as fertiliser — one plant saves cooking fuel, forest wood and firewood trips in a single cycle.",
        alt: "Biogas plant cycle dung methane slurry fertiliser",
        keyword: "biogas",
      },
      {
        Component: BiogasPlantNepalNumbers,
        caption:
          "Biogas by the numbers: hundreds of thousands of household plants built across Nepal's hills, each saving tonnes of fuelwood a year — a subsidy programme that quietly rewired rural kitchens.",
        alt: "Biogas plants in Nepal numbers and fuelwood savings",
        keyword: "biogas",
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
  "general-introduction-of-chemistry": {
    title: "Foundations of chemistry",
    figures: [
      {
        Component: BranchesOfChemistryMap,
        caption:
          "The five main branches of chemistry with the questions each one answers - organic for carbon compounds, inorganic for the rest, physical for energy and rates, analytical for identification and biochemistry for life.",
        alt: "Five branches of chemistry organic inorganic physical analytical and biochemistry with example topics",
        keyword: "branch",
      },
      {
        Component: MatterClassificationTree,
        caption:
          "Every sample of matter sorts into pure substances (elements and compounds) or mixtures (homogeneous and heterogeneous) - one tree, four leaves.",
        alt: "Classification of matter tree elements compounds homogeneous and heterogeneous mixtures",
        keyword: "matter",
      },
      {
        Component: PureVsMixturePanel,
        caption:
          "Four decisive tests separate a pure substance from a mixture: composition, separation method, sharpness of melting or boiling point and energy change on mixing.",
        alt: "Pure substance versus mixture comparison fixed composition separation melting point tests",
        keyword: "pure",
      },
      {
        Component: HomogeneousHeterogeneousContrast,
        caption:
          "A salt solution looks uniform everywhere (homogeneous); sand and water shows a visible boundary (heterogeneous). Fog and smoke fool the eye but are heterogeneous.",
        alt: "Homogeneous mixture salt solution versus heterogeneous sand water with visible boundary",
        keyword: "homogeneous",
      },
      {
        Component: ElementCompoundMoleculeTrio,
        caption:
          "Element means one kind of atom, compound means different atoms in a fixed ratio, molecule means any bonded group - water's properties unlike hydrogen or oxygen prove compounds are new substances.",
        alt: "Element compound and molecule comparison with examples hydrogen oxygen water carbon dioxide",
        keyword: "element",
      },
      {
        Component: SolutionComponentsPanel,
        caption:
          "A solution spreads solute particles evenly through the solvent as one phase; saturated means the solvent holds all it can at that temperature.",
        alt: "Solution components solute solvent homogeneous solution saturated unsaturated states",
        keyword: "solution",
      },
      {
        Component: ChemistryInDailyLife,
        caption:
          "Fuels, clothes, food and medicines are all built on catenated carbon chains - the property that makes organic chemistry a branch of its own.",
        alt: "Organic chemistry in daily life fuels clothes food medicines carbon compounds",
        keyword: "daily",
      },
    ],
  },
  "importance-and-scope-of-chemistry": {
    title: "Chemistry across industries and life",
    figures: [
      {
        Component: ChemistryContributionMap,
        caption:
          "Chemical knowledge feeds four industries at once - fertilisers, pharmaceuticals, petroleum and textiles - each with a named product to quote in answers.",
        alt: "Chemistry contribution to fertiliser pharmaceutical petroleum and textile industries",
        keyword: "industry",
      },
      {
        Component: MedicineChemistryPanel,
        caption:
          "From aspirin synthesis to cisplatin's platinum complex and glucose test strips, medicine runs on designed molecules and measured reactions.",
        alt: "Chemistry in medicine drug synthesis anaesthetics diagnostics cisplatin aspirin",
        keyword: "medicine",
      },
      {
        Component: FoodChemistryPanel,
        caption:
          "Preservation, ripening control, additives and food tests are all chemistry - and adulteration detection is applied analytical chemistry.",
        alt: "Chemistry in food preservatives ripening additives nutrition testing",
        keyword: "food",
      },
      {
        Component: EnergyChemistryPanel,
        caption:
          "Combustion, fuel cells, lithium-ion electrodes and biogas digesters are all electron-transfer stories - electrochemistry in disguise.",
        alt: "Chemistry in energy fossil fuels fuel cells solar biogas reactions",
        keyword: "energy",
      },
      {
        Component: EnvironmentDoubleEdge,
        caption:
          "CFCs thinned ozone and carbon dioxide warms the planet, but the fixes - catalytic converters, CFC replacements, effluent treatment - are also chemistry.",
        alt: "Chemistry double edge benefits versus pollution problems green chemistry solutions",
        keyword: "pollution",
      },
      {
        Component: AgricultureChemistryPanel,
        caption:
          "Fertilisers supply NPK, soil testing sets the dose, pesticides protect the crop - all chemistry, all dose-dependent.",
        alt: "Chemistry in agriculture fertilisers pesticides soil testing NPK",
        keyword: "agriculture",
      },
      {
        Component: DetergentChemistryPanel,
        caption:
          "A detergent's hydrophilic head loves water while its hydrophobic tail buries into grease; micelles lift the grease into the wash water.",
        alt: "Detergent molecule hydrophilic head hydrophobic tail micelle grease cleaning action",
        keyword: "detergent",
      },
    ],
  },
  "basic-concepts-of-chemistry-atoms-molecules-relative-masses-of-atoms-and-molecules-atomic-mass-u": {
    title: "Basic concepts: atoms, ions, radicals, amu",
    figures: [
      {
        Component: AtomMoleculeContrast,
        caption:
          "An atom is the smallest particle of an element taking part in a reaction; a molecule is the smallest free particle of an element or compound - H2 versus H is the classic trap.",
        alt: "Atom versus molecule smallest particle definitions with examples hydrogen oxygen water",
        keyword: "atom",
      },
      {
        Component: RadicalTypesPanel,
        caption:
          "Basic radicals are positive cations (Na+, Ca2+, NH4+), acidic radicals are negative anions (Cl-, SO4 2-); criss-crossing their charges builds every formula.",
        alt: "Radical panel cationic basic and anionic acidic radicals with valencies ammonium sulphate nitrate carbonate",
        keyword: "radical",
      },
      {
        Component: AmuScalePanel,
        caption:
          "One amu is one twelfth of a carbon-12 atom's mass, 1.66 x 10^-24 g - relative masses make atomic-scale arithmetic human-sized.",
        alt: "Atomic mass unit scale one twelfth carbon twelve hydrogen oxygen iron comparisons",
        keyword: "amu",
      },
      {
        Component: EmpiricalVsMolecularFlow,
        caption:
          "The molecular formula is the empirical formula multiplied by n, where n is molecular mass divided by empirical formula mass - HO times 2 gives H2O2.",
        alt: "Empirical formula to molecular formula flowchart with n multiplier hydrogen peroxide benzene glucose",
        keyword: "empirical",
      },
      {
        Component: RelativeMassLadder,
        caption:
          "Multiply each element's atomic mass by its subscript and add: H2O is 18, CO2 is 44 - bracketed groups count the whole bracket.",
        alt: "Relative mass ladder from atomic masses to molecular mass water carbon dioxide",
        keyword: "relative",
      },
      {
        Component: IonFormationPanel,
        caption:
          "Metals lose electrons to become cations, non-metals gain them to become anions; both can end isoelectronic with a noble gas.",
        alt: "Ion formation sodium cation chlorine anion octet electron transfer",
        keyword: "ion",
      },
      {
        Component: AvogadroNumberPanel,
        caption:
          "One mole is 6.022 x 10^23 particles - the same number counts atoms in 12 g of carbon-12, molecules in 22.4 L of any gas at STP and electrons in one faraday.",
        alt: "Avogadro number six point zero two two times ten twenty three particles per mole",
        keyword: "avogadro",
      },
    ],
  },
  "percentage-composition-from-molecular-formula": {
    title: "Percentage composition",
    figures: [
      {
        Component: PercentCompositionFormula,
        caption:
          "Percentage of an element equals its mass in one mole divided by the molar mass, times 100 - subscripts count before the division.",
        alt: "Percentage composition formula element mass over molar mass times hundred",
        keyword: "percentage",
      },
      {
        Component: UreaPercentDrill,
        caption:
          "Urea CO(NH2)2: molar mass 60, nitrogen 28, so 46.6 percent N - the strongest solid nitrogen fertiliser in common use.",
        alt: "Solved percentage of nitrogen in urea forty six point six percent",
        keyword: "urea",
      },
      {
        Component: MolarMassAssembly,
        caption:
          "Four worked molar masses - water 18, ammonia 17, sulphuric acid 98, calcium carbonate 100 - plus the hydrate trap of copper sulphate pentahydrate.",
        alt: "Molar mass assembly worked examples water ammonia sulphuric acid calcium carbonate hydrate",
        keyword: "molar",
      },
      {
        Component: PercentFromFormulaSteps,
        caption:
          "The four-step method: correct formula, molar mass, element mass over molar mass times 100, then check the percentages sum to 100.",
        alt: "Percentage composition four step method with calcium hydroxide bracket trap",
        keyword: "steps",
      },
      {
        Component: NitrogenFertilizerDrill,
        caption:
          "Urea 46.6 percent N beats ammonium nitrate 35 and ammonium sulphate 21 - the same method ranks fertilisers by nitrogen per kilogram.",
        alt: "Nitrogen percentage comparison of fertilisers urea ammonium nitrate ammonium sulphate",
        keyword: "nitrogen",
      },
      {
        Component: MolePercentBridge,
        caption:
          "Computing on a one-mole basis makes grams cancel and the mass fraction read directly as a percentage - and feeds empirical-formula problems too.",
        alt: "Mole to percentage composition bridge one mole basis sodium bicarbonate example",
        keyword: "mole",
      },
      {
        Component: LimestoneAssayDrill,
        caption:
          "Pure limestone is 40 percent calcium by mass (40 over 100); run backwards, a 2 g calcium yield from 5 g ore means 40 percent purity.",
        alt: "Solved limestone assay calcium carbonate forty percent calcium content",
        keyword: "limestone",
      },
    ],
  },
  "dalton-s-atomic-theory-and-its-postulates": {
    title: "Dalton's atomic theory",
    figures: [
      {
        Component: DaltonPostulatesLadder,
        caption:
          "Five postulates in order: indivisible atoms, identical atoms per element, different atoms across elements, simple whole-number ratios, and rearrangement without creation or destruction.",
        alt: "Dalton atomic theory five postulates ladder with explanations",
        keyword: "postulate",
      },
      {
        Component: IndivisibleVsModern,
        caption:
          "Dalton's solid billiard ball gave way to a nucleus of protons and neutrons with electrons outside - the atom turned out to be divisible.",
        alt: "Dalton indivisible billiard ball atom versus modern atom with nucleus and electrons",
        keyword: "indivisible",
      },
      {
        Component: IsotopeChallengePanel,
        caption:
          "Chlorine-35 and chlorine-37 break the identical-atoms claim, but the weighted average 35.5 preserves every stoichiometric law.",
        alt: "Isotopes challenge identical atoms postulate chlorine thirty five thirty seven weighted average",
        keyword: "isotope",
      },
      {
        Component: CombineRatioPanel,
        caption:
          "H2O, NH3, CH4 and CO2 all show simple whole-number atom ratios - postulate 4 is the ancestor of the law of definite proportions.",
        alt: "Atoms combine in simple whole number ratios water ammonia methane carbon dioxide",
        keyword: "ratio",
      },
      {
        Component: DaltonLimitationsTable,
        caption:
          "Five Dalton claims against their modern corrections - from subatomic particles to isotopes to non-stoichiometric compounds.",
        alt: "Dalton postulate versus modern correction comparison table limitations",
        keyword: "limitation",
      },
      {
        Component: ConservationFromPostulate,
        caption:
          "Because atoms are only rearranged, total mass is fixed: 4 g hydrogen plus 32 g oxygen gives exactly 36 g water - balancing is bookkeeping.",
        alt: "Conservation of mass from Dalton postulate five hydrogen oxygen water mass balance",
        keyword: "conservation",
      },
      {
        Component: ElectronDiscoveryTimeline,
        caption:
          "Electron 1897, nucleus 1911, proton 1919, neutron 1932 - thirty-five years that dismantled indivisibility one discovery at a time.",
        alt: "Subatomic particle discovery timeline Thomson Rutherford Chadwick electron proton neutron",
        keyword: "electron",
      },
    ],
  },
  "laws-of-stoichiometry": {
    title: "The five laws of stoichiometry",
    figures: [
      {
        Component: FiveLawsMap,
        caption:
          "Conservation, definite proportions, multiple proportions, reciprocal proportions and Gay-Lussac's gaseous volumes - five laws, one map.",
        alt: "Five laws of stoichiometry map with discoverers Lavoisier Proust Dalton Richter Gay-Lussac",
        keyword: "law",
      },
      {
        Component: ConservationLavoisierDrill,
        caption:
          "10 g calcium carbonate decomposes to 5.6 g calcium oxide and 4.4 g carbon dioxide - the sum is exactly 10 g, mass conserved.",
        alt: "Solved conservation of mass numerical calcium carbonate decomposition",
        keyword: "conservation",
      },
      {
        Component: DefiniteProportionDrill,
        caption:
          "Two different copper oxide samples both give copper to oxygen ratio 4 to 1 - fixed composition whatever the source.",
        alt: "Solved definite proportions copper oxide samples same four to one ratio",
        keyword: "definite",
      },
      {
        Component: MultipleProportionDrill,
        caption:
          "With 12 g of carbon fixed, the oxygen masses in CO and CO2 stand in the ratio 1 to 2 - simple whole numbers.",
        alt: "Solved multiple proportions carbon monoxide carbon dioxide oxygen ratio one to two",
        keyword: "multiple",
      },
      {
        Component: ReciprocalProportionPanel,
        caption:
          "From CH4 (3 to 1) and CO2 (3 to 8), the reciprocal law predicts hydrogen to oxygen in water as 1 to 8 - exactly what H2O shows.",
        alt: "Reciprocal proportions law methane carbon dioxide water exchange ratio prediction",
        keyword: "reciprocal",
      },
      {
        Component: GayLussacVolumePanel,
        caption:
          "Two volumes of hydrogen combine with one of chlorine to give two of hydrogen chloride - 2 to 1 to 2, simple whole numbers at fixed temperature and pressure.",
        alt: "Gay lussac law of combining volumes hydrogen chlorine hydrogen chloride two one two",
        keyword: "gay",
      },
      {
        Component: LawsVsAtomicTheoryLink,
        caption:
          "Each law leans on a Dalton postulate: conservation on rearrangement, definite proportions on fixed ratios - the mapping exam answers reward.",
        alt: "Laws of stoichiometry linked to Dalton postulates mapping table",
        keyword: "link",
      },
    ],
  },
  "avogadro-s-law-and-some-deductions-molecular-mass-and-vapour-density-molecular-mass-and-volume-o": {
    title: "Avogadro's law and deductions",
    figures: [
      {
        Component: AvogadroLawStatement,
        caption:
          "Equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules - leading straight to V proportional to n and the 22.4 L molar volume.",
        alt: "Avogadro law statement equal volumes equal molecules deduction molar volume",
        keyword: "avogadro",
      },
      {
        Component: VapourDensityDrill,
        caption:
          "Vapour density 22 means molecular mass 44 (M = 2 x VD) - the factor 2 comes from hydrogen's diatomic molecule.",
        alt: "Solved vapour density to molecular mass factor two gas twenty two forty four",
        keyword: "vapour",
      },
      {
        Component: StpMolarVolumePanel,
        caption:
          "Hydrogen, oxygen and carbon dioxide fill the same 22.4 L box at STP with the same 6.022 x 10^23 molecules - mass differs, count does not.",
        alt: "Molar volume twenty two point four litres at STP one mole any gas same count",
        keyword: "stp",
      },
      {
        Component: StpVolumeDrill,
        caption:
          "8.8 g of carbon dioxide is 0.2 mol, occupying 4.48 L at STP - the n times 22.4 conversion used in nearly every gaseous numerical.",
        alt: "Solved STP volume of carbon dioxide eight point eight grams four point four eight litres",
        keyword: "volume",
      },
      {
        Component: AvogadroVsDaltonReconcile,
        caption:
          "Avogadro's molecule concept resolved Dalton versus Gay-Lussac: oxygen travels as O2, so one volume of O2 can furnish two half-units to two volumes of water.",
        alt: "Avogadro hypothesis reconciles Dalton and Gay lussac diatomic oxygen molecule explanation",
        keyword: "molecule",
      },
      {
        Component: AvogadroDeductionsLadder,
        caption:
          "Five deductions: molar volume, M from density, M from vapour density, diatomic gas formulae, and the explanation of Gay-Lussac.",
        alt: "Five deductions from Avogadro law molar volume density vapour density diatomic",
        keyword: "deduction",
      },
      {
        Component: GasDensityDrill,
        caption:
          "Density 1.965 g per litre at STP times 22.4 gives molecular mass 44 - but density alone cannot distinguish CO2 from C3H8.",
        alt: "Solved gas density to molecular mass one point nine six five forty four",
        keyword: "density",
      },
    ],
  },
  "mole-and-its-relation-with-mass-volume-and-number-of-particles": {
    title: "The mole concept",
    figures: [
      {
        Component: MoleConceptTriangle,
        caption:
          "One mole connects three doors: molar mass in grams, 22.4 L at STP for gases, and 6.022 x 10^23 particles - every stoichiometry problem walks this triangle.",
        alt: "Mole concept triangle mass volume particles conversions",
        keyword: "mole",
      },
      {
        Component: MoleConversionDrill,
        caption:
          "18 g of water is 1 mol: 6.022 x 10^23 molecules, 1.807 x 10^24 atoms, 22.4 L as steam - four answers from one mass.",
        alt: "Solved mole conversions for eighteen grams water molecules atoms volume",
        keyword: "conversion",
      },
      {
        Component: ParticleCountPanel,
        caption:
          "One mole of H2 (2 g), O2 (32 g) and Na (23 g) all hold 6.022 x 10^23 particles - the mole counts, grams weigh.",
        alt: "Particle counts in one mole of hydrogen oxygen sodium same number different masses",
        keyword: "particle",
      },
      {
        Component: MolarMassTablePanel,
        caption:
          "Eight molar masses worth memorising - water 18, carbon dioxide 44, sodium chloride 58.5, sulphuric acid 98 and more - cover most NEB numericals.",
        alt: "Molar mass quick reference table common compounds",
        keyword: "table",
      },
      {
        Component: MoleStpVolumePanel,
        caption:
          "The volume ladder n times 22.4: half a mole is 11.2 L, one mole 22.4 L, two moles 44.8 L - used in both directions.",
        alt: "Mole and volume relationship ladder half one two three moles litres STP",
        keyword: "volume",
      },
      {
        Component: NumberOfParticlesDrill,
        caption:
          "4.4 g of carbon dioxide is 0.1 mol, so 6.022 x 10^22 molecules or 1.807 x 10^23 atoms - always name the particle counted.",
        alt: "Solved number of molecules in carbon dioxide four point four grams",
        keyword: "particles",
      },
      {
        Component: GramAtomMoleTerms,
        caption:
          "Gram atom, gram molecule and gram ion are older names for one mole of atoms, molecules or ions - all 6.022 x 10^23 of the named particle.",
        alt: "Gram atom gram molecule gram ion terminology one mole equivalents",
        keyword: "gram",
      },
    ],
  },
  "calculations-based-on-mole-concept": {
    title: "Mole-based calculations",
    figures: [
      {
        Component: ConcentrationUnitsPanel,
        caption:
          "Molarity, molality, normality and mass percent each express concentration - the denominator (litre of solution vs kilogram of solvent) decides temperature dependence.",
        alt: "Concentration units molarity molality normality mass percent definitions",
        keyword: "molarity",
      },
      {
        Component: MolarityDrill,
        caption:
          "4 g of sodium hydroxide in 500 mL is 0.1 mol in 0.5 L, hence 0.2 M - grams to grams, litres to litres.",
        alt: "Solved molarity of sodium hydroxide four grams five hundred millilitres zero point two",
        keyword: "molarity",
      },
      {
        Component: MolalityVsMolarity,
        caption:
          "Molarity uses solution volume (temperature-sensitive); molality uses solvent mass (temperature-proof) - dilute aqueous solutions make them numerically close.",
        alt: "Molality versus molarity comparison solvent mass solution volume temperature",
        keyword: "molality",
      },
      {
        Component: DilutionFormulaDrill,
        caption:
          "M1V1 = M2V2: making 500 mL of 0.5 M from 2 M stock needs 125 mL of stock diluted to the mark - moles are conserved, only water is added.",
        alt: "Solved dilution M one V one equals M two V two stock solution",
        keyword: "dilution",
      },
      {
        Component: NormalityEquivalentsPanel,
        caption:
          "Normality equals molarity times the n-factor: sulphuric acid is 2 N per 1 M, sodium hydroxide 1 N per 1 M - and N1V1 = N2V2 settles titrations.",
        alt: "Normality equals molarity times n factor equivalents sulphuric acid sodium hydroxide",
        keyword: "normality",
      },
      {
        Component: MassPercentDrill,
        caption:
          "10 g of salt in 90 g water is a 100 g solution, hence 10 percent by mass - divide by the solution, never the solvent.",
        alt: "Solved mass percent ten gram salt ninety gram water ten percent",
        keyword: "percent",
      },
      {
        Component: SolutionPrepSteps,
        caption:
          "Weigh, dissolve, transfer with rinsings, make up to the mark, mix - preparing 250 mL of 0.1 M sodium carbonate needs exactly 2.65 g.",
        alt: "Standard solution preparation steps volumetric flask technique sodium carbonate",
        keyword: "solution",
      },
    ],
  },
  "limiting-reactant-and-excess-reactant": {
    title: "Limiting and excess reactants",
    figures: [
      {
        Component: LimitingReactantConcept,
        caption:
          "Ten slices of bread and seven of cheese make only five sandwiches - the exhausted ingredient rules. In chemistry, the reactant giving the smaller quotient is limiting.",
        alt: "Limiting reactant sandwich analogy bread cheese runs out first controls product",
        keyword: "limiting",
      },
      {
        Component: LimitingReactantSteps,
        caption:
          "Balance, convert to moles, divide by coefficients, compare - the smaller quotient marks the limiting reactant every time.",
        alt: "Limiting reactant four step method balance moles coefficients compare",
        keyword: "steps",
      },
      {
        Component: LimitingReactantDrill,
        caption:
          "4 mol H2 with 3 mol O2: hydrogen's quotient 2.0 beats oxygen's 3.0, so 4 mol water form and 1 mol oxygen (32 g) remains.",
        alt: "Solved limiting reactant hydrogen oxygen water four mole product leftover",
        keyword: "limiting",
      },
      {
        Component: ExcessLeftoverPanel,
        caption:
          "Leftover equals initial minus consumed, converted through the equation ratio - and never subtract moles from grams.",
        alt: "Excess reactant leftover calculation initial minus consumed remaining",
        keyword: "excess",
      },
      {
        Component: LimitingReagentRecipeDrill,
        caption:
          "28 g N2 with 9 g H2: nitrogen's quotient 1.0 is smaller, so 34 g ammonia form and 3 g hydrogen remains - Haber logic in one table.",
        alt: "Solved limiting reagent ammonia synthesis nitrogen hydrogen yield thirty four grams",
        keyword: "reagent",
      },
      {
        Component: LimitingVsExcessTable,
        caption:
          "The limiting reactant is fully consumed and sets the yield; the excess reactant is partly left over and has no say in the product amount.",
        alt: "Limiting versus excess reactant comparison table consumption yield leftover",
        keyword: "excess",
      },
      {
        Component: LimitingReagentStoichiometryFlow,
        caption:
          "In every calculation the limiting branch sits between mole conversion and product computation - single-reactant problems skip straight through.",
        alt: "Stoichiometry flowchart limiting reactant branch moles coefficients product",
        keyword: "flow",
      },
    ],
  },
  "theoretical-yield-experimental-yield-and-yield": {
    title: "Yield calculations",
    figures: [
      {
        Component: YieldTypesTrio,
        caption:
          "Theoretical yield comes from the equation, experimental from the flask, and percentage yield is their ratio times 100 - actual can never exceed theoretical.",
        alt: "Yield types theoretical experimental percentage yield relationship",
        keyword: "yield",
      },
      {
        Component: YieldCalculationDrill,
        caption:
          "50 g calcium carbonate promises 28 g calcium oxide; the lab gave 21 g, so the percentage yield is 75 percent.",
        alt: "Solved percentage yield calcium oxide fifty gram calcium carbonate seventy five percent",
        keyword: "yield",
      },
      {
        Component: YieldLossCauses,
        caption:
          "Side reactions, reversibility, mechanical transfer losses and purification losses each shave the yield - name two causes and one remedy for full marks.",
        alt: "Causes of yield loss side reactions reversibility mechanical purification",
        keyword: "loss",
      },
      {
        Component: AtomEconomyPanel,
        caption:
          "Atom economy measures how much reactant mass the equation places in the desired product - a design score, independent of lab skill.",
        alt: "Atom economy green chemistry desired product mass percentage",
        keyword: "atom",
      },
      {
        Component: TheoreticalYieldLadder,
        caption:
          "Given mass to moles, mole ratio, product mass, report - the four-rung ladder that ends at the 100 percent benchmark.",
        alt: "Theoretical yield computation ladder moles ratio product mass",
        keyword: "theoretical",
      },
      {
        Component: YieldImprovementPanel,
        caption:
          "Push the equilibrium with excess reactant, remove product as it forms, catalyse, transfer quantitatively and recycle unreacted material - the Haber plant does all five.",
        alt: "Improving yield strategies equilibrium catalysts technique recycling Haber",
        keyword: "improve",
      },
      {
        Component: YieldVsAtomEconomy,
        caption:
          "Percentage yield judges the lab; atom economy judges the route - a 100 percent yield can still waste atoms, and vice versa.",
        alt: "Percentage yield versus atom economy comparison lab versus design efficiency",
        keyword: "economy",
      },
    ],
  },
  "calculation-of-empirical-and-molecular-formula-from-composition-solving-related-numerical-proble": {
    title: "Empirical and molecular formulae",
    figures: [
      {
        Component: EmpiricalFormulaSteps,
        caption:
          "Assume 100 g, convert to moles, divide by the smallest, clear fractions, write the ratio - the five-step machine for empirical formulae.",
        alt: "Empirical formula determination five steps percentages moles whole number ratio",
        keyword: "empirical",
      },
      {
        Component: EmpiricalFormulaDrill,
        caption:
          "40 percent C, 6.7 percent H, 53.3 percent O gives mole ratio 1 to 2 to 1, hence CH2O - and with M = 180, glucose C6H12O6.",
        alt: "Solved empirical formula forty percent carbon hydrogen oxygen CH2O",
        keyword: "empirical",
      },
      {
        Component: CombustionAnalysisPanel,
        caption:
          "Burning a compound and absorbing the water in calcium chloride and the carbon dioxide in potassium hydroxide recovers carbon and hydrogen masses directly.",
        alt: "Combustion analysis apparatus water carbon dioxide absorbers calcium chloride potassium hydroxide",
        keyword: "combustion",
      },
      {
        Component: MolecularFromEmpiricalDrill,
        caption:
          "Empirical CH2O with molar mass 60: formula mass 30, multiplier n = 2, molecular formula C2H4O2 (acetic acid) - and M = 180 would give glucose.",
        alt: "Solved molecular formula from empirical CH2O molar mass sixty acetic acid",
        keyword: "molecular",
      },
      {
        Component: HydrationFormulaDrill,
        caption:
          "Copper sulphate pentahydrate loses 90 g of its 250 g as water - 36 percent exactly; the same ratio method finds x in any hydrate.",
        alt: "Solved water of crystallisation copper sulphate pentahydrate thirty six percent",
        keyword: "water",
      },
      {
        Component: RatioClearingPanel,
        caption:
          "Fractional mole ratios are cleared by multiplying every element by the same factor - 0.5 means times 2, 0.33 times 3, 0.25 times 4.",
        alt: "Ratio clearing fractional mole ratios multiply whole numbers empirical formula",
        keyword: "ratio",
      },
      {
        Component: PercentToFormulaFlow,
        caption:
          "Percentages give the empirical formula; molar mass from vapour density or STP density gives n; the product is the molecular formula - the most examined chain in stoichiometry.",
        alt: "Percentage data to molecular formula flowchart empirical molar mass multiplier",
        keyword: "formula",
      },
    ],
  },
  "valence-shell-valence-electron-and-octet-theory": {
    title: "The octet rule at work",
    figures: [
      {
        Component: OctetRuleLadder,
        caption:
          "Kossel and Lewis proposed that atoms bond to copy a noble gas: helium holds 2, neon 2 and 8, argon 2, 8 and 8 - the stability targets every bond chases.",
        alt: "Octet rule ladder of noble gas electron configurations helium neon argon stability targets",
        keyword: "octet",
      },
      {
        Component: ElectronTransferReaction,
        caption:
          "The ionic bond written as a reaction: sodium gives one electron, chlorine takes it, and the two ions lock into a lattice - give, take, combine.",
        alt: "Electron transfer reaction sequence sodium chlorine ions forming sodium chloride",
        keyword: "transfer",
      },
      {
        Component: DuetRulePanel,
        caption:
          "Hydrogen, helium and the lithium cation stop at two electrons - the duet rule is the smallest exception to the octet story.",
        alt: "Duet rule panel hydrogen helium lithium cation first shell two electrons",
        keyword: "duet",
      },
      {
        Component: OctetLimitationsPanel,
        caption:
          "Five places the octet rule fails: incomplete octets in BeCl2 and BF3, expanded octets in PCl5 and SF6, odd electrons in NO, noble-gas compounds like XeF2, and no shape prediction.",
        alt: "Limitations of octet rule with beryllium chloride boron trifluoride phosphorus pentachloride examples",
        keyword: "limitation",
      },
      {
        Component: KosselLewisContrast,
        caption:
          "Two routes to the same octet: Kossel transfers electrons between metal and non-metal; Lewis shares pairs between non-metals.",
        alt: "Kossel transfer versus Lewis sharing routes to complete octets",
        keyword: "kossel",
      },
      {
        Component: ValenceElectronAddress,
        caption:
          "Only the outermost shell bonds: sodium carries one valence electron in 3s, chlorine carries seven in 3s and 3p - the addresses that decide chemistry.",
        alt: "Valence shell and valence electron addresses of sodium and chlorine",
        keyword: "valence",
      },
      {
        Component: OctetAchievementDrill,
        caption:
          "Drill: match each ion to the noble gas it copies - sodium and magnesium ions reach neon, oxide reaches neon, chloride reaches argon.",
        alt: "Ion to noble gas configuration drill sodium magnesium oxide chloride",
        keyword: "noble",
      },
    ],
  },
  "lewis-dot-structure-of-some-common-compounds-of-s-and-p-block-elements": {
    title: "Lewis structures, drawn to order",
    figures: [
      {
        Component: LewisProcedureSteps,
        caption:
          "Five moves to any Lewis structure: count electrons, build the skeleton, add single bonds, park leftovers, then promote to multiple bonds where needed.",
        alt: "Five step Lewis structure drawing procedure electron count skeleton bonds",
        keyword: "skeleton",
      },
      {
        Component: LewisGallerySimple,
        caption:
          "The simple hydrides: water with two lone pairs (bent, 104.5), ammonia with one (pyramidal, 107), methane with none (tetrahedral, 109.5).",
        alt: "Lewis dot structures of water ammonia methane with lone pairs and angles",
        keyword: "bent",
      },
      {
        Component: LewisGalleryMultiple,
        caption:
          "Carbon dioxide spends its 16-electron budget on two double bonds (linear); boron trifluoride leaves boron with six electrons - a stable incomplete octet.",
        alt: "Lewis structures carbon dioxide double bonds and boron trifluoride incomplete octet",
        keyword: "linear",
      },
      {
        Component: LewisGalleryExpanded,
        caption:
          "Period 3 opens the third shell: PCl5 carries ten electrons around phosphorus, SF6 twelve around sulphur - expanded octets, stable and real.",
        alt: "Lewis structures phosphorus pentachloride and sulphur hexafluoride expanded octets",
        keyword: "expanded",
      },
      {
        Component: FormalChargeDrill,
        caption:
          "Formal charge audit on ozone: FC = V - N - B/2 gives +1 on the central oxygen, -1 on the single-bonded end, 0 on the double-bonded end.",
        alt: "Formal charge calculation table for ozone valence nonbonding bonding electrons",
        keyword: "formal",
      },
      {
        Component: ElectronBudgetPanel,
        caption:
          "Step one is always the budget: CO2 has 16 valence electrons, ozone 18, carbonate 24 - anions add, cations subtract.",
        alt: "Valence electron budget counting for common molecules and ions",
        keyword: "valence",
      },
      {
        Component: LewisIonicVsMolecular,
        caption:
          "Two notations, two meanings: brackets and charges for ions, shared pairs drawn between atoms for molecules.",
        alt: "Lewis notation contrast bracketed ions versus shared electron pairs",
        keyword: "octet",
      },
    ],
  },
  "resonance": {
    title: "Resonance: the average is the truth",
    figures: [
      {
        Component: ResonanceOzonePair,
        caption:
          "Ozone's two canonical forms flip the double bond, yet experiment finds both bonds equal at 128 pm - the resonance hybrid, not either drawing.",
        alt: "Ozone resonance two canonical forms with 128 picometre equal bonds",
        keyword: "128",
      },
      {
        Component: ResonanceCarbonateTrio,
        caption:
          "Carbonate's three equivalent forms share one double bond three ways: every C-O measures 129 pm and the bond order is one and a third.",
        alt: "Carbonate ion resonance three forms equal bonds bond order one third",
        keyword: "carbonate",
      },
      {
        Component: ResonanceBenzenePanel,
        caption:
          "Benzene's Kekule pair and the circle notation: all six C-C bonds read 139 pm, between single and double - the classic resonance proof.",
        alt: "Benzene resonance Kekule structures circle notation 139 picometre bonds",
        keyword: "139",
      },
      {
        Component: ResonanceVsEquilibrium,
        caption:
          "The resonance arrow is not the equilibrium arrow: one is bookkeeping with no reaction, the other is real molecules interconverting.",
        alt: "Resonance arrow versus equilibrium arrow contrast bookkeeping versus reaction",
        keyword: "arrow",
      },
      {
        Component: ResonanceBondOrderDrill,
        caption:
          "Bond order under resonance is the total shared out: ozone 1.5, carbonate and nitrate one and a third, benzene 1.5.",
        alt: "Resonance bond order drill ozone carbonate nitrate benzene averaged orders",
        keyword: "bond order",
      },
      {
        Component: ResonanceConditionsPanel,
        caption:
          "What may move: only electrons shift, atoms never do; forms must share the same framework, similar energy, and tidy charges.",
        alt: "Conditions for valid resonance structures electrons move atoms fixed",
        keyword: "electrons",
      },
      {
        Component: ResonanceEnergyPanel,
        caption:
          "Resonance energy measured by shortfall: benzene hydrogenates 152 kJ per mole less than three isolated double bonds would predict.",
        alt: "Resonance energy of benzene from hydrogenation enthalpy shortfall 150 kilojoules",
        keyword: "150",
      },
    ],
  },
  "vsepr-theory-and-shapes-of-simple-molecules-bef2-bf3-ch4-ch3cl-pcl5-sf6-h2o-nh3-co2-h2s-ph3": {
    title: "VSEPR: shapes from repulsion",
    figures: [
      {
        Component: VseprPostulatesPanel,
        caption:
          "Five postulates do all the work: count domains, maximise separation, rank repulsions, count multiple bonds once, and let lone pairs compress angles.",
        alt: "Five postulates of VSEPR theory electron domains separation repulsion",
        keyword: "postulates",
      },
      {
        Component: RepulsionOrderPanel,
        caption:
          "The repulsion ladder: lone pair-lone pair squeezes hardest, lone pair-bond pair next, bond pair-bond pair least - this alone explains every compressed angle.",
        alt: "Repulsion order lone pair lone pair strongest bond pair weakest",
        keyword: "repulsion",
      },
      {
        Component: ParentGeometriesTrio,
        caption:
          "The parent geometries: two domains linear at 180, three trigonal planar at 120, four tetrahedral at 109.5.",
        alt: "Parent electron geometries linear trigonal planar tetrahedral with angles",
        keyword: "tetrahedral",
      },
      {
        Component: VseprAngleLadder,
        caption:
          "Each lone pair squeezes further: methane 109.5, ammonia 107, water 104.5 - the classic compression ladder.",
        alt: "Bond angle compression ladder methane ammonia water lone pairs",
        keyword: "109.5",
      },
      {
        Component: Pcl5TbpShape,
        caption:
          "PCl5 is trigonal bipyramidal with two bond species: axial bonds stretch to 219 pm under 90-degree crowding, equatorial stay at 204 pm.",
        alt: "Phosphorus pentachloride trigonal bipyramidal axial equatorial bond lengths",
        keyword: "axial",
      },
      {
        Component: Sf6OctahedralShape,
        caption:
          "SF6: six bonds at exactly 90 degrees, octahedral and nonpolar by symmetry.",
        alt: "Sulphur hexafluoride octahedral shape six bonds ninety degrees",
        keyword: "octahedral",
      },
      {
        Component: BentLinearDrill,
        caption:
          "Why is water bent but carbon dioxide linear? Count domains, not atoms: water has two lone pairs squeezing a bent shape; CO2 has none and stays straight (NEB 2024).",
        alt: "Bent water versus linear carbon dioxide domain counting drill",
        keyword: "bent",
      },
    ],
  },
  "elementary-idea-of-valence-bond-theory": {
    title: "Valence bond theory: overlap makes bonds",
    figures: [
      {
        Component: VbtOverlapMechanism,
        caption:
          "VBT in three frames: half-filled orbitals approach, overlap with opposite spins, and settle at the energy minimum we call the bond length.",
        alt: "Valence bond theory overlap mechanism approach overlap bond formation",
        keyword: "overlap",
      },
      {
        Component: SigmaOverlapTypes,
        caption:
          "Three sigma recipes: s-s in H2, s-p in HCl, p-p head-on in Cl2 - density concentrated on the internuclear axis, the strongest link.",
        alt: "Sigma bond overlap types s-s s-p p-p head-on with examples",
        keyword: "sigma",
      },
      {
        Component: PiCloudPanel,
        caption:
          "The pi bond: two parallel p orbitals overlap sideways, piling density above and below the axis - weaker than sigma, rotation-locked, never alone.",
        alt: "Pi bond sideways overlap of parallel p orbitals electron cloud above below axis",
        keyword: "sideways",
      },
      {
        Component: EtheneBondingMap,
        caption:
          "Ethene mapped: two sp2 carbons, five sigma bonds in the plane, one pi cloud above and below - H-C-H at 120 degrees (NEB 2023).",
        alt: "Ethene bonding map five sigma one pi bond planar 120 degrees",
        keyword: "ethene",
      },
      {
        Component: EthyneBondingMap,
        caption:
          "Ethyne mapped: sp carbons in a line, one sigma plus two perpendicular pi clouds wrapping the triple bond.",
        alt: "Ethyne bonding map linear triple bond two perpendicular pi clouds",
        keyword: "isomerism",
      },
      {
        Component: RotationLockPanel,
        caption:
          "Rotation: ethane's sigma bond spins freely; ethene's pi bond locks the molecule planar - the origin of cis and trans isomers.",
        alt: "Rotation free in ethane locked in ethene by pi bond cis trans isomerism",
        keyword: "rotation",
      },
      {
        Component: BondCompositionAudit,
        caption:
          "Audit every bond: single is 1 sigma, double 1 sigma plus 1 pi, triple 1 sigma plus 2 pi - sigma always comes first.",
        alt: "Bond composition audit sigma and pi counts single double triple bonds",
        keyword: "audit",
      },
    ],
  },
  "bond-characteristics-bond-length-ionic-character-dipole-moment": {
    title: "Measuring bonds: length, character, dipole",
    figures: [
      {
        Component: BondLengthLadder,
        caption:
          "Bond lengths at a glance: bond order squeezes (154, 134, 120 pm down the C-C family) while atomic size stretches (H-F 92 to H-I 160 pm).",
        alt: "Bond length ladder carbon carbon and hydrogen halide bonds picometres",
        keyword: "154",
      },
      {
        Component: DipoleVectorConvention,
        caption:
          "The dipole arrow runs from positive to negative with a crossbar at the tail; mu = q x d, measured in debye (1 D = 3.33564 x 10^-30 C m).",
        alt: "Dipole moment vector convention crossed arrow formula debye unit",
        keyword: "debye",
      },
      {
        Component: ZeroDipoleClub,
        caption:
          "The zero-dipole club: CO2, BF3, CH4 and CCl4 all carry polar bonds that cancel by symmetry - molecular polarity is vector arithmetic.",
        alt: "Zero dipole molecules carbon dioxide boron trifluoride methane carbon tetrachloride symmetry",
        keyword: "symmetry",
      },
      {
        Component: IonicCharacterScale,
        caption:
          "Ionic character falls with electronegativity difference: HF about 43 percent, HCl 17, HBr 11, HI 5 - no bond is purely either.",
        alt: "Ionic character scale hydrogen halides percent ionic character bars",
        keyword: "ionic",
      },
      {
        Component: HannaySmythDrill,
        caption:
          "Worked: HF's ionic character by two routes - dipole ratio 1.91 over 4.42 debye, and Hannay-Smyth 16(1.9) + 3.5(1.9)^2 - both land on 43 percent.",
        alt: "Percentage ionic character of hydrogen fluoride worked calculation Hannay Smyth",
        keyword: "hannay",
      },
      {
        Component: Nf3Nh3DipoleContrast,
        caption:
          "Same pyramidal shape, opposite outcomes: NH3 reads 1.47 D because its bond dipoles reinforce the lone pair; NF3 reads 0.24 D because they fight it.",
        alt: "Ammonia versus nitrogen trifluoride dipole moment direction contrast",
        keyword: "direction",
      },
      {
        Component: HfHiBondTrend,
        caption:
          "Longer means weaker: from H-F (92 pm, 565 kJ/mol) to H-I (160 pm, 297 kJ/mol), size grows, overlap worsens, ionic character fades.",
        alt: "Hydrogen halide bond length versus strength trend chart",
        keyword: "297",
      },
    ],
  },
  "vander-waal-s-force-and-molecular-solids-hydrogen-bonding-and-its-application": {
    title: "Weak forces, large consequences",
    figures: [
      {
        Component: VdwForceLadder,
        caption:
          "The intermolecular ladder: London dispersion in everything, Debye and Keesom dipole terms above, and hydrogen bonding an order of magnitude stronger still.",
        alt: "Intermolecular force ladder London dispersion Debye Keesom hydrogen bond",
        keyword: "london",
      },
      {
        Component: DispersionSizeLadder,
        caption:
          "Dispersion grows with electron count: F2 boils at -188 C, Cl2 at -34, Br2 at 59, I2 at 184 - same bonding, bigger clouds, solid iodine.",
        alt: "Halogen boiling points dispersion forces fluorine chlorine bromine iodine",
        keyword: "polarisab",
      },
      {
        Component: HydrogenBondAnatomy,
        caption:
          "Anatomy of the hydrogen bond: X-H with X = F, O or N reaching a lone pair on Y - 5 to 40 kJ per mole, directional and demanding.",
        alt: "Hydrogen bond anatomy donor acceptor requirements fluorine oxygen nitrogen",
        keyword: "acceptor",
      },
      {
        Component: WaterHbondNetwork,
        caption:
          "Water's four-connected network: two hydrogens to donate, two lone pairs to accept - the 3-D lattice behind the 100 C boiling point (NEB 2024).",
        alt: "Water hydrogen bond network four connections tetrahedral high boiling point",
        keyword: "network",
      },
      {
        Component: BpAnomalyChart,
        caption:
          "The hydrogen-bond signature: H2O boils 160 degrees above H2S, HF 105 above HCl, NH3 55 above PH3 - gaps only hydrogen bonding explains.",
        alt: "Boiling point anomalies water hydrogen fluoride ammonia versus group neighbours",
        keyword: "boiling",
      },
      {
        Component: IceDensityPanel,
        caption:
          "Ice floats because its tetrahedral lattice holds about 11 percent empty space: 0.92 against water's 1.00 g per cubic centimetre.",
        alt: "Ice open hexagonal lattice density 0.92 versus water 1.00 floating",
        keyword: "0.92",
      },
      {
        Component: NitrophenolContrast,
        caption:
          "Architecture matters: ortho-nitrophenol spends its hydrogen bond internally and stays steam-volatile; para links molecules and boils high.",
        alt: "Ortho versus para nitrophenol intra and intermolecular hydrogen bonding",
        keyword: "nitrophenol",
      },
    ],
  },
  "metallic-bonding-and-properties-of-metallic-solids": {
    title: "The bond that bends",
    figures: [
      {
        Component: ElectronSeaModel,
        caption:
          "The electron sea: fixed metal cations bathed in delocalised valence electrons that belong to the whole crystal - the metallic bond itself.",
        alt: "Electron sea model metal cations delocalised valence electrons",
        keyword: "delocalised",
      },
      {
        Component: MetallicPropertyMap,
        caption:
          "One mechanism, four properties: conduction, heat transfer, lustre and malleability all trace back to the mobile, non-directional electron cloud.",
        alt: "Metallic property map conduction lustre malleability electron sea mechanism",
        keyword: "malleab",
      },
      {
        Component: SlidingTestContrast,
        caption:
          "The sliding test: metal layers slide and the sea re-adjusts (malleable); ionic layers slide, like charges meet, the crystal shatters (brittle).",
        alt: "Metal bends ionic crystal shatters layer sliding contrast",
        keyword: "brittle",
      },
      {
        Component: BandTheoryPanel,
        caption:
          "Band theory in three gaps: conductors overlap, silicon spans about 1 eV (a semiconductor), diamond about 5.5 eV (an insulator).",
        alt: "Band theory conductor semiconductor insulator energy gaps",
        keyword: "band",
      },
      {
        Component: MpLadderMetals,
        caption:
          "Melting climbs with the sea's cargo: sodium 98 C with one electron, magnesium 650 with two, aluminium 660 with three per atom.",
        alt: "Melting point ladder sodium magnesium aluminium valence electrons",
        keyword: "660",
      },
      {
        Component: AlloyTypesPanel,
        caption:
          "Alloys are guests the sea tolerates: zinc substitutes in brass, carbon squeezes between iron atoms in steel - both block slip planes and harden the metal.",
        alt: "Alloy types substitutional brass interstitial steel lattice diagrams",
        keyword: "brass",
      },
      {
        Component: ConductivityDrill,
        caption:
          "Who carries the charge: electrons in copper, ions only when salt is molten or dissolved - solid NaCl conducts nothing.",
        alt: "Conductivity drill copper molten aqueous solid sodium chloride charge carriers",
        keyword: "conduction",
      },
    ],
  },

  "gaseous-state-kinetic-theory-of-gas-and-its-postulates": {
    title: "Kinetic theory: the gas in five sentences",
    figures: [
      {
        Component: KineticPostulatesPanel,
        caption:
          "Five postulates do all the work: tiny point molecules, random straight-line flight, no intermolecular forces, perfectly elastic collisions, and average kinetic energy proportional to absolute temperature (NEB 2024).",
        alt: "Five postulates of kinetic molecular theory tiny random elastic kinetic energy temperature",
        keyword: "postulates",
      },
      {
        Component: WallCollisionPressure,
        caption:
          "Pressure is a drumbeat: every wall impact transfers momentum 2mv, and billions of collisions per second average into the steady pressure a gauge reads.",
        alt: "Gas molecules colliding with container walls transferring momentum pressure",
        keyword: "collision",
      },
      {
        Component: MaxwellSpeedDistribution,
        caption:
          "The Maxwell curve: most molecules cluster near the most probable speed, with average and RMS trailing right - a distribution, not a single value.",
        alt: "Maxwell Boltzmann speed distribution curve most probable average rms speeds",
        keyword: "distribution",
      },
      {
        Component: SpeedFormulaLadder,
        caption:
          "The three speeds ranked: most probable sqrt(2RT/M), average sqrt(8RT/pi M), root mean square sqrt(3RT/M) - relative sizes 1 : 1.128 : 1.225.",
        alt: "Three molecular speeds most probable average root mean square formulas",
        keyword: "speed",
      },
      {
        Component: KeTemperatureLine,
        caption:
          "One line, three gases: average kinetic energy plotted against absolute temperature is the same straight line for He, O2 and CO2 - KE depends on T alone.",
        alt: "Average kinetic energy versus absolute temperature same line all gases",
        keyword: "kinetic",
      },
      {
        Component: RmsSpeedDrill,
        caption:
          "Speed drill at one temperature: hydrogen's M = 2 outruns oxygen's M = 32 by sqrt(32/2) = 4 times - heavier is slower.",
        alt: "Root mean square speed comparison hydrogen helium oxygen carbon dioxide",
        keyword: "rms",
      },
      {
        Component: KineticEquationBridge,
        caption:
          "The bridge equation PV = one-third nMu(rms) squared links the lab dials (P, V) with the invisible molecular world - and yields u(rms) = sqrt(3RT/M).",
        alt: "Kinetic gas equation bridging macroscopic pressure volume with molecular speeds",
        keyword: "bridge",
      },
    ],
  },
  "gas-laws-boyle-s-law-charles-law-avogadro-s-law-combined-gas-equation-dalton-s-law-of-partial-pr": {
    title: "Five laws, one toolkit",
    figures: [
      {
        Component: BoyleLawHyperbola,
        caption:
          "Boyle's law as a curve: P against V at constant temperature traces a hyperbola - halve the volume, double the pressure.",
        alt: "Boyle's law pressure volume hyperbola at constant temperature",
        keyword: "hyperbola",
      },
      {
        Component: CharlesLawLine,
        caption:
          "Charles's law as a line: every gas extrapolates to zero volume at -273.15 C, the origin of the absolute scale - and Kelvin first, always.",
        alt: "Charles's law volume temperature line extrapolating to absolute zero",
        keyword: "charles",
      },
      {
        Component: AvogadroVolumeDrill,
        caption:
          "Avogadro's law in three flasks: equal volumes of H2, O2 and CO2 at STP hold equal numbers of molecules - 22.4 L each.",
        alt: "Equal volumes of different gases at STP contain equal molecules Avogadro law",
        keyword: "avogadro",
      },
      {
        Component: CombinedGasFlow,
        caption:
          "The state changer: P1V1/T1 = P2V2/T2 handles any two-step change - and collapses to Boyle or Charles when one variable holds still.",
        alt: "Combined gas equation P1V1 T1 equals P2V2 T2 with branch cases",
        keyword: "combined",
      },
      {
        Component: DaltonPartialSum,
        caption:
          "Air adds up: nitrogen 0.78 plus oxygen 0.21 plus argon and CO2 0.01 atm - Dalton's law sums the partial pressures to one atmosphere.",
        alt: "Dalton's law partial pressures of air nitrogen oxygen argon sum",
        keyword: "dalton",
      },
      {
        Component: AqueousTensionCorrection,
        caption:
          "Gas over water: the collected gas shares its flask with water vapour, so the dry gas pressure is the wet reading minus the aqueous tension.",
        alt: "Gas collected over water correcting for aqueous tension Dalton's law",
        keyword: "aqueous",
      },
      {
        Component: GrahamDiffusionRace,
        caption:
          "The diffusion race: rates fall as one over square root of molar mass - hydrogen outruns O2 fourfold and unmasks an unknown gas as M = 32 (NEB 2024).",
        alt: "Graham's law diffusion rates versus molar mass hydrogen fastest",
        keyword: "graham",
      },
    ],
  },
  "ideal-gas-and-ideal-gas-equation-universal-gas-constant-and-its-significance": {
    title: "One equation to rule the gas laws",
    figures: [
      {
        Component: IdealEquationDerivation,
        caption:
          "The derivation in five moves: Boyle's V proportional to 1/P, Charles's V proportional to T, Avogadro's V proportional to n, combined into V proportional to nT/P, then PV = nRT (NEB 2023 and 2024).",
        alt: "Derivation of ideal gas equation from Boyle Charles and Avogadro laws",
        keyword: "boyle",
      },
      {
        Component: RUnitTablePanel,
        caption:
          "R in three costumes: 0.0821 L atm per mol K for laboratory units, 8.314 J per mol K in SI, 1.987 calories per mol K - match the constant to your data.",
        alt: "Universal gas constant values in litre atmosphere joule and calorie units",
        keyword: "constant",
      },
      {
        Component: StpMolarVolumeCheck,
        caption:
          "The molar volume is R's fingerprint: one mole at 1 atm and 273 K fills 22.4 L, giving R = 22.4/273 = 0.0821 L atm per mol K.",
        alt: "Molar volume 22.4 litres at STP confirming the gas constant",
        keyword: "molar",
      },
      {
        Component: PvNrtSolveFlow,
        caption:
          "Four working forms: n = PV/RT for moles, m = nM for mass, d = PM/RT for density, M = dRT/P for identity - one equation, four answers.",
        alt: "Working forms of ideal gas equation moles mass density molar mass",
        keyword: "forms",
      },
      {
        Component: BoltzmannBridgePanel,
        caption:
          "R shrinks to k: dividing by Avogadro's number turns the molar constant into Boltzmann's 1.38e-23 J per K - the same dial at single-molecule size.",
        alt: "Boltzmann constant as gas constant per molecule bridge",
        keyword: "boltzmann",
      },
      {
        Component: IdealVsRealZone,
        caption:
          "Where the equation works: hot and dilute is the ideal zone; crowded and cold is where real gases break rank - the preview of topic 46.",
        alt: "Ideal behaviour zone low pressure high temperature versus real gas zone",
        keyword: "ideal",
      },
      {
        Component: TyrePressureCharles,
        caption:
          "Charles's law on the road: a tyre reading 32 psi at 20 C climbs near 35 psi after an hour of driving - volume fixed, pressure tracks Kelvin temperature.",
        alt: "Tyre pressure rising with temperature Charles's law example",
        keyword: "psi",
      },
    ],
  },
  "deviation-of-real-gas-from-ideality-solving-related-numerical-problems-based-on-gas-laws": {
    title: "When gases stop being ideal",
    figures: [
      {
        Component: VdwEquationAnatomy,
        caption:
          "The van der Waals equation dissected: a n squared over V squared patches the softened pressure from attraction, V minus nb patches the lost free volume.",
        alt: "Van der Waals equation anatomy attraction and volume correction terms",
        keyword: "waals",
      },
      {
        Component: ZFactorCurve,
        caption:
          "The Z curve dips then rises: attraction pulls Z below 1 at moderate pressure, molecular volume pushes it above 1 at high pressure - the real gas signature.",
        alt: "Compressibility factor Z versus pressure curve dip and rise",
        keyword: "compressibility",
      },
      {
        Component: DeviationRegimesPanel,
        caption:
          "Three regimes: high pressure means Z above 1 (harder to compress), low temperature means Z below 1 (easier), hot and dilute returns Z to 1 (NEB 2024).",
        alt: "Deviation regimes high pressure low temperature ideal conditions compressibility",
        keyword: "dominates",
      },
      {
        Component: AConstantLadder,
        caption:
          "The a-ladder ranks stickiness: water 5.46, ammonia 4.17, CO2 3.59 down to helium 0.034 - large a means easy liquefaction.",
        alt: "Van der Waals attraction constants ranked water ammonia carbon dioxide helium",
        keyword: "attraction",
      },
      {
        Component: BoyleTemperaturePanel,
        caption:
          "The Boyle temperature is the cancellation point: there the attraction and volume effects balance, so Z stays near 1 across a wide pressure range.",
        alt: "Boyle temperature where attraction and volume corrections cancel",
        keyword: "boyle",
      },
      {
        Component: RealGasCompressDrill,
        caption:
          "The compression test: ideal points shrink to nothing, real molecules keep their size - which is why high pressure resists compression beyond Boyle's law.",
        alt: "Compression test ideal point molecules versus real finite molecules",
        keyword: "compress",
      },
      {
        Component: LiquefactionEasePanel,
        caption:
          "Liquefaction tracks a: ammonia condenses at 8 atm at room temperature, nitrogen needs 77 K, helium resists to 4 K - attraction decides.",
        alt: "Liquefaction ease ammonia nitrogen helium van der Waals attraction",
        keyword: "77",
      },
    ],
  },
  "liquid-state-physical-properties-of-liquids-evaporation-and-condensation-vapour-pressure-and-boi": {
    title: "The in-between state, measured",
    figures: [
      {
        Component: EvaporationCoolingCycle,
        caption:
          "Evaporation is selective: only the fastest surface molecules escape, so the average kinetic energy of those left falls - the liquid cools.",
        alt: "Evaporation removing fastest molecules cooling remaining liquid",
        keyword: "evaporation",
      },
      {
        Component: VapourPressureEquilibrium,
        caption:
          "In a closed flask escape and return balance: the vapour's steady pressure depends only on the liquid and the temperature - not on how much liquid sits there.",
        alt: "Dynamic equilibrium vapour pressure closed flask evaporation condensation",
        keyword: "vapour",
      },
      {
        Component: BoilingPressureRule,
        caption:
          "Boiling is an appointment with the external pressure: about 70 C on Everest, 100 C at sea level, about 120 C in a pressure cooker - same water, three boiling points.",
        alt: "Boiling point versus external pressure Everest sea level pressure cooker",
        keyword: "boiling",
      },
      {
        Component: SurfaceTensionAnatomy,
        caption:
          "Surface molecules feel a net inward pull - the surface contracts like a stretched membrane, pulling drops into spheres (water 0.072 N/m, mercury nearly seven times more).",
        alt: "Surface tension unbalanced inward force on surface molecules",
        keyword: "surface",
      },
      {
        Component: CapillaryRisePanel,
        caption:
          "Capillarity cuts both ways: water's concave meniscus climbs the tube, mercury's convex meniscus sinks - adhesion versus cohesion.",
        alt: "Capillary rise of water and depression of mercury in glass tubes",
        keyword: "meniscus",
      },
      {
        Component: ViscosityLayerFlow,
        caption:
          "Viscosity is layers that rub: intermolecular attraction resists sliding - water near 1 centipoise, glycerine a thousand times thicker, both loosened by heat.",
        alt: "Viscosity as friction between flowing liquid layers",
        keyword: "viscosity",
      },
      {
        Component: EvapVsBoilingContrast,
        caption:
          "Same escape, different arenas: evaporation works at the surface at any temperature and cools; boiling needs the whole bulk at the VP-equals-external-P temperature.",
        alt: "Evaporation versus boiling comparison surface bulk temperature",
        keyword: "evap",
      },
    ],
  },
  "liquid-crystals-and-their-applications": {
    title: "Matter between order and melt",
    figures: [
      {
        Component: MesophaseOrderLadder,
        caption:
          "The order ladder: crystal keeps everything, liquid keeps nothing, and the mesophases between trade order for mobility step by step.",
        alt: "Order ladder crystal smectic nematic liquid decreasing order",
        keyword: "mesophase",
      },
      {
        Component: NematicSmecticCholesteric,
        caption:
          "Three textures: nematic lines up parallel, smectic adds layers, cholesteric twists the alignment into a helix - each with its own application.",
        alt: "Nematic smectic and cholesteric liquid crystal molecular arrangements",
        keyword: "nematic",
      },
      {
        Component: ThermoLyotropicSplit,
        caption:
          "Two doors into the mesophase: thermotropic systems answer temperature (cholesteryl benzoate, 145.5 to 178.5 C), lyotropic ones answer solvent concentration (soaps).",
        alt: "Thermotropic temperature driven versus lyotropic concentration driven liquid crystals",
        keyword: "thermotropic",
      },
      {
        Component: LcdPixelSwitch,
        caption:
          "The LCD pixel: with no voltage the nematic rods twist light through crossed polarisers (bright); with voltage they align and the twist fails (dark).",
        alt: "LCD pixel switching bright and dark by voltage reorienting molecules",
        keyword: "lcd",
      },
      {
        Component: CholestericThermometry,
        caption:
          "The cholesteric thermometer: helix pitch answers temperature, so the reflected colour walks the spectrum - fever strips read to a tenth of a degree.",
        alt: "Cholesteric liquid crystal colour changes with temperature fever strip",
        keyword: "cholesteric",
      },
      {
        Component: ReinitzerTransitionPanel,
        caption:
          "Reinitzer's 1888 observation: cholesteryl benzoate melts at 145.5 C into a milky flowing state and clears at 178.5 C - the first liquid crystal seen.",
        alt: "Cholesteryl benzoate transitions crystal mesophase clear liquid 1888",
        keyword: "reinitzer",
      },
      {
        Component: LcApplicationsMap,
        caption:
          "The application map: displays and smart windows answer voltage, thermography and fault-mapping answer temperature - one mesophase, two dials.",
        alt: "Applications of liquid crystals displays thermography smart windows",
        keyword: "application",
      },
    ],
  },
  "solid-state-types-of-solids-amorphous-and-crystalline-solids": {
    title: "Order you can hold",
    figures: [
      {
        Component: CrystalVsAmorphousOrder,
        caption:
          "The architecture test: a crystal repeats its pattern across the whole solid, an amorphous solid knows only its neighbourhood - quartz versus glass, same SiO2.",
        alt: "Crystalline long range order versus amorphous short range order lattice",
        keyword: "crystalline",
      },
      {
        Component: FourSolidTypesGrid,
        caption:
          "Four families: ionic (NaCl, hard and brittle), molecular (ice, soft), covalent network (diamond, hardest), metallic (copper, malleable) - bonding predicts behaviour.",
        alt: "Four types of solids ionic molecular covalent network metallic with properties",
        keyword: "ionic",
      },
      {
        Component: MpLadderSolids,
        caption:
          "Melting points rank the glue: iodine 114 C (molecular), copper 1083 (metallic), NaCl 801 and MgO 2852 (ionic), diamond near 3550 C (network).",
        alt: "Melting point ladder iodine copper sodium chloride magnesium oxide diamond",
        keyword: "melting",
      },
      {
        Component: DiamondGraphiteContrast,
        caption:
          "Same carbon, opposite worlds: diamond's sp3 network is the hardest insulator; graphite's sp2 sheets slide and conduct through delocalised pi electrons.",
        alt: "Diamond sp3 network versus graphite sp2 layers structure contrast",
        keyword: "diamond",
      },
      {
        Component: SolidSlidingTest,
        caption:
          "The sliding test: ionic layers slip, like charges meet and the crystal shatters; metal layers slide and the electron sea forgives - brittleness versus malleability.",
        alt: "Sliding layer test sodium chloride shatters copper bends",
        keyword: "shatter",
      },
      {
        Component: IsotropyAnisotropyDrill,
        caption:
          "Direction matters: a crystal's properties change with the direction you measure (anisotropic); glass is the same every way (isotropic) because randomness averages out.",
        alt: "Anisotropic crystal versus isotropic glass property directions",
        keyword: "anisotropy",
      },
      {
        Component: SupercooledLiquidPanel,
        caption:
          "The glass curve softens instead of dropping: no lattice, no sharp melting point - an amorphous solid is a liquid frozen before it could order.",
        alt: "Volume temperature curve glass softening range versus crystal sharp melt",
        keyword: "glass",
      },
    ],
  },
  "efflorescent-deliquescent-and-hygroscopic-solids-crystallization-and-crystal-growth-water-of-cry": {
    title: "Solids that fight the air",
    figures: [
      {
        Component: WaterVapourGradient,
        caption:
          "One rule decides everything: water migrates from higher to lower vapour pressure - hydrates above the air's moisture dry out, salts whose solutions sit below it keep drinking.",
        alt: "Water vapour pressure gradient efflorescence deliquescence rule",
        keyword: "vapour",
      },
      {
        Component: ThreeBehaviourTable,
        caption:
          "The trio compared: efflorescent loses lattice water to a powder, hygroscopic dampens without dissolving, deliquescent dissolves into its own puddle.",
        alt: "Efflorescent hygroscopic deliquescent comparison water movement examples",
        keyword: "efflorescent",
      },
      {
        Component: WatersOfCrystallisation,
        caption:
          "Lattice water is stoichiometric: five waters in blue vitriol, seven in green vitriol and Epsom salt, ten in washing soda, two in gypsum.",
        alt: "Waters of crystallisation copper sulphate iron sulphate washing soda gypsum",
        keyword: "crystallisation",
      },
      {
        Component: Cuso4WaterTest,
        caption:
          "The water test: white anhydrous CuSO4 turns blue the moment it meets water, re-forming the pentahydrate - sharp, reversible, standard.",
        alt: "Anhydrous copper sulphate white to blue water test",
        keyword: "blue",
      },
      {
        Component: DesiccatorPanel,
        caption:
          "The desiccator: a floor of silica gel, CaCl2 or P2O5 holds a dry atmosphere - cool hot crucibles weight-free, store damp-shy samples safe.",
        alt: "Desiccator vessel with drying agent layers silica gel calcium chloride",
        keyword: "desiccator",
      },
      {
        Component: CrystallisationStages,
        caption:
          "Crystal growth in four stages: dissolve hot, saturate by cooling, nucleate on a seed, grow the lattice layer by layer - the reverse of efflorescence's decay.",
        alt: "Crystallisation stages dissolve saturate nucleate grow crystals",
        keyword: "crystallisation",
      },
      {
        Component: VpRuleDrill,
        caption:
          "Classify by the rule: washing soda effloresces, CaO absorbs and reacts, CaCl2.6H2O and FeCl3 deliquesce - one vapour-pressure comparison sorts them all.",
        alt: "Classifying salts by vapour pressure rule efflorescent deliquescent hygroscopic",
        keyword: "rule",
      },
    ],
  },

  "physical-and-chemical-equilibrium-dynamic-nature-of-chemical-equilibrium": {
    title: "Equilibrium: the dynamic tie",
    figures: [
      { Component: EqRatesCross, caption: "Rates cross: how equilibrium arrives", alt: "Graph of forward rate falling and reverse rate rising until they cross at the equilibrium point", keyword: "rates" },
      { Component: PhysicalVsChemicalEq, caption: "Physical vs chemical equilibrium", alt: "Side-by-side comparison of physical equilibrium changing only state and chemical equilibrium forming new substances", keyword: "physical equilibrium" },
      { Component: TracerDynamismProof, caption: "The tracer test proves dynamism", alt: "Radioactive tracer injected at equilibrium appears in the products while concentrations stay constant", keyword: "tracer" },
      { Component: EitherSideArrival, caption: "One destination, two roads", alt: "Diagram showing the same equilibrium mixture is reached starting from pure reactants or pure products", keyword: "either side" },
      { Component: CatalystNoShift, caption: "Catalyst: faster arrival, same destination", alt: "Concentration-time curves showing a catalyst shortens the time to equilibrium but leaves the plateau unchanged", keyword: "catalyst" },
      { Component: ClosedVsOpenVessel, caption: "The lid decides the outcome", alt: "Closed flask where products accumulate and push back versus open dish where products escape and the reaction completes", keyword: "closed" },
      { Component: EqCharacteristicsPanel, caption: "Five fingerprints of equilibrium", alt: "Panel listing constant composition, dynamic activity, either-side arrival, catalyst neutrality and condition sensitivity", keyword: "characteristics" },
    ],
  },
  "law-of-mass-action": {
    title: "Law of mass action and Kc",
    figures: [
      { Component: ActiveMassAnatomy, caption: "Active mass: who speaks in Kc", alt: "Table showing gases and solutes enter Kc while pure solids and liquids with constant active mass are omitted", keyword: "active mass" },
      { Component: MassActionStatement, caption: "Guldberg and Waage, 1864", alt: "Statement panel of the law of mass action with the general rate equation rate equals k A to the a times B to the b", keyword: "law of mass action" },
      { Component: KcDerivationSteps, caption: "From rate tie to Kc in four moves", alt: "Four derivation steps from equal forward and reverse rates to Kc equals kf over kr", keyword: "derive" },
      { Component: ExpressionGalleryEq, caption: "The expression gallery", alt: "Gallery of equilibrium constant expressions for ammonia synthesis, nitrogen dioxide, phosphorus pentachloride and calcite decomposition", keyword: "expression" },
      { Component: SolidsOmittedRule, caption: "Why the chalk drops out", alt: "Calcium carbonate decomposition with the two solids crossed out so Kc equals only the carbon dioxide concentration", keyword: "solids" },
      { Component: FlipScaleRules, caption: "Rewrite the equation, rewrite the constant", alt: "Rules mapping reversing, doubling, halving coefficients and temperature change to their effect on Kc", keyword: "reverse" },
      { Component: KcUnitsLadder, caption: "Units of Kc from delta n", alt: "Ladder showing units of Kc as mol per litre raised to delta n for three reactions", keyword: "units" },
    ],
  },
  "expression-for-equilibrium-constant-and-its-importance": {
    title: "Kc: reading and computing the constant",
    figures: [
      { Component: KcSizeLadder, caption: "What the number says", alt: "Ladder of Kc sizes from product-dominated through balanced to reactant-dominated with examples", keyword: "large" },
      { Component: QcDirectionCompass, caption: "Qc: the compass needle", alt: "Compass diagram showing Qc below Kc drives forward, above Kc drives reverse, equal means equilibrium", keyword: "direction" },
      { Component: Nh3KcNumerical, caption: "NEB 2024: the ammonia numerical", alt: "Step-by-step solution finding ammonia concentration 0.25 molar from Kc 0.5, nitrogen 1.0 and hydrogen 0.5 molar", keyword: "0.25" },
      { Component: KcImportanceMap, caption: "Four jobs for one constant", alt: "Map of Kc uses: extent of reaction, direction prediction, thermodynamic bridge and industrial design", keyword: "importance" },
      { Component: IceTableSteps, caption: "The five-line recipe", alt: "Five step recipe for equilibrium calculations from balancing the equation to checking the answer", keyword: "steps" },
      { Component: DgKcBridge, caption: "The yield-energy bridge", alt: "Diagram linking equilibrium constant to standard free energy through dG equals minus RT ln K", keyword: "free energy" },
      { Component: KcTemperatureRule, caption: "Who moves the position, who rewrites Kc", alt: "Panel separating concentration and pressure shifts from temperature being the only factor that changes Kc", keyword: "temperature" },
    ],
  },
  "relationship-between-kp-and-kc": {
    title: "Kp and Kc: one bridge",
    figures: [
      { Component: KpExpressionAnatomy, caption: "Kp: same fraction, pressure currency", alt: "Kp expression for ammonia synthesis written with partial pressures replacing concentrations", keyword: "partial pressure" },
      { Component: PartialPressureIdea, caption: "Partial pressure: concentration in disguise", alt: "Diagram deriving partial pressure as molar concentration times RT from the ideal gas law", keyword: "partial pressure" },
      { Component: BridgeDerivationFlow, caption: "One gas law builds the bridge", alt: "Five step derivation of Kp equals Kc times RT to the delta n starting from p equals i RT", keyword: "derive" },
      { Component: DnSignTable, caption: "One sign decides the relationship", alt: "Table of delta n zero, positive and negative cases with example reactions and the resulting Kp-Kc relation", keyword: "gas moles" },
      { Component: KpKcEqualityCases, caption: "Spot the dn, write the answer", alt: "Four reactions classified by delta n showing when Kp equals Kc or differs by an RT factor", keyword: "0" },
      { Component: KpConversionDrill, caption: "Conversion drill: Kc to Kp", alt: "Worked conversion of Kc 0.16 at 300 kelvin to Kp 3.94 for the nitrogen dioxide equilibrium", keyword: "3.94" },
      { Component: KpUnitsPanel, caption: "Units of Kp from delta n", alt: "Panel of Kp units as pressure raised to delta n for three reactions with R matching guidance", keyword: "units" },
    ],
  },
  "le-chatelier-s-principle-numericals-not-required": {
    title: "Le Chatelier: oppose the change",
    figures: [
      { Component: LeChatelierStatement, caption: "Le Chatelier, 1888", alt: "Statement panel of Le Chatelier's principle with the three levers of concentration, pressure and temperature", keyword: "le chatelier" },
      { Component: ConcentrationShiftMap, caption: "Concentration levers", alt: "Map of concentration changes and their equilibrium shifts driven by the reaction quotient restoring Kc", keyword: "concentration" },
      { Component: PressureMoleCount, caption: "Squeeze test: count the gas moles", alt: "Pressure effects on three equilibria decided by gas mole counts including the no-shift case", keyword: "pressure" },
      { Component: TemperatureHeatSide, caption: "Write heat into the equation", alt: "Exothermic and endothermic equations with heat written on the appropriate side to predict temperature shifts", keyword: "temperature" },
      { Component: HaberConditionsPanel, caption: "Haber: the principle as a factory manual", alt: "Haber process conditions of high pressure, moderate temperature, ammonia removal and iron catalyst explained by Le Chatelier", keyword: "haber" },
      { Component: ContactProcessPanel, caption: "Contact process: 2SO2 + O2 ⇌ 2SO3", alt: "Contact process conditions of excess air, atmospheric pressure, moderate temperature and sulfur trioxide removal", keyword: "contact process" },
      { Component: N2o4ColorThermometer, caption: "A visible equilibrium: the colour thermometer", alt: "Nitrogen dioxide equilibrium shown as a colour thermometer with heating deepening the brown and pressure paling it", keyword: "brown" },
    ],
  },
  "hydrogen-chemistry-of-atomic-and-nascent-hydrogen-isotopes-of-hydrogen-and-their-uses": {
    title: "Hydrogen: isotopes and the nascent mystery",
    figures: [
      { Component: IsotopeTrioPanel, caption: "Three isotopes, one proton", alt: "Ladder of protium deuterium and tritium with neutron counts abundances and key facts", keyword: "isotopes" },
      { Component: NascentVsMolecularH2, caption: "Two hydrogens, two powers", alt: "Comparison of mild molecular hydrogen needing heat with nascent hydrogen reducing permanganate cold", keyword: "nascent" },
      { Component: H2oVsD2oProps, caption: "H2O vs D2O: the isotope ledger", alt: "Property table comparing ordinary and heavy water in mass melting point boiling point density and reactor role", keyword: "heavy water" },
      { Component: PositionDebateMap, caption: "Where does hydrogen sit?", alt: "Debate map of hydrogen's resemblance to alkali metals and halogens ending in the unique element verdict", keyword: "position" },
      { Component: NascentGenerationRoutes, caption: "Born at the moment of use", alt: "Three routes for generating nascent hydrogen in situ with equations", keyword: "zinc" },
      { Component: WoodsBridgeAfterglow, caption: "Wood's bridge: atomic hydrogen made visible", alt: "Wood's bridge tube where hydrogen becomes atomic at the discharge arc and recombines as a third flame", keyword: "wood" },
      { Component: D2oReactorRole, caption: "Why reactors drink heavy water", alt: "Heavy water slowing fast neutrons to thermal speeds while absorbing very few enabling natural uranium fission", keyword: "moderator" },
    ],
  },
  "application-of-hydrogen-as-fuel-heavy-water-and-its-applications": {
    title: "Hydrogen as fuel and heavy water",
    figures: [
      { Component: H2FuelLedger, caption: "Energy per gram: hydrogen wins", alt: "Bar chart of energy per gram for hydrogen petrol and coal with the clean steam-only exhaust note", keyword: "142" },
      { Component: FuelCellElectrodes, caption: "The H2-O2 fuel cell", alt: "Hydrogen oxygen fuel cell with anode and cathode half reactions and electron flow through the external circuit", keyword: "fuel cell" },
      { Component: StorageTrioPanel, caption: "The storage problem, three ways", alt: "Three hydrogen storage strategies of compressed gas cryogenic liquid and metal hydrides with their drawbacks", keyword: "storage" },
      { Component: HeavyWaterPrepFlow, caption: "Making D2O: separate what chemistry cannot", alt: "Flow of heavy water preparation by prolonged electrolysis exploiting the isotope effect", keyword: "electrolysis" },
      { Component: IsotopeEffectEngine, caption: "The isotope effect: speed decides the split", alt: "Diagram of O-H bonds breaking faster than O-D bonds during electrolysis", keyword: "isotope effect" },
      { Component: CleanCombustionMap, caption: "What each fuel leaves behind", alt: "Exhaust products of hydrogen petrol and coal showing hydrogen yields only water", keyword: "clean" },
      { Component: D2oReactorRole, caption: "Why reactors drink heavy water", alt: "Heavy water slowing fast neutrons to thermal speeds while absorbing very few enabling natural uranium fission", keyword: "moderator" },
    ],
  },
  "allotropes-of-oxygen-definition-of-allotropy-and-examples-oxygen-types-of-oxides-acidic-basic-ne": {
    title: "Oxygen allotropes and the oxide families",
    figures: [
      { Component: AllotropyDefinitionPanel, caption: "Allotropy: one element, several faces", alt: "Definition of allotropy with dioxygen and ozone as the example pair", keyword: "allotropes" },
      { Component: O2O3ContrastPanel, caption: "Siblings, opposite temperaments", alt: "Six row comparison of dioxygen and ozone covering odour colour magnetism stability bond order and oxidising power", keyword: "ozone" },
      { Component: OxideFamilySort, caption: "Sort every oxide by behaviour", alt: "Grid of four oxide families acidic basic neutral and amphoteric with examples and defining behaviour", keyword: "acidic" },
      { Component: AmphotericDoubleDuty, caption: "ZnO answers both callers", alt: "Zinc oxide reacting with hydrochloric acid as a base and with sodium hydroxide as an acid", keyword: "amphoteric" },
      { Component: PeroxideVsOxideOs, caption: "Count oxygen's charge before labelling", alt: "Comparison of oxygen oxidation states in normal oxides peroxides and superoxides", keyword: "peroxide" },
      { Component: MixedOxideAnatomy, caption: "Two oxides, one lattice", alt: "Mixed oxides written as combinations of simpler oxides with magnetite and red lead examples", keyword: "mixed" },
      { Component: OxidePeriodTrend, caption: "Across period 3: basic to amphoteric to acidic", alt: "Oxide character trend across period three from basic sodium oxide through amphoteric alumina to acidic sulfur trioxide", keyword: "basic" },
    ],
  },
  "applications-of-hydrogen-peroxide-medical-and-industrial-application-of-oxygen": {
    title: "H2O2 applications and industrial oxygen",
    figures: [
      { Component: H2o2UseMap, caption: "From medicine cabinet to launch pad", alt: "Four applications of hydrogen peroxide from antiseptic to rocket propellant", keyword: "antiseptic" },
      { Component: VolumeStrengthConversion, caption: "10-volume to molarity, step by step", alt: "Worked conversion of ten-volume hydrogen peroxide to 0.893 molarity and about three percent", keyword: "volume strength" },
      { Component: DecompositionEquationHub, caption: "One equation, four careers", alt: "Hub diagram showing one decomposition equation powering antiseptic bleaching rocketry and storage behaviour", keyword: "decomposition" },
      { Component: StorageRuleTrio, caption: "Keep it cold, dark, and unwetted by metal", alt: "Three storage rules for hydrogen peroxide with stabilisers and vented caps", keyword: "wax" },
      { Component: OxygenUseLedger, caption: "Where the oxygen goes", alt: "Four industrial uses of oxygen with brief explanations", keyword: "welding" },
      { Component: LdConverterFlow, caption: "The LD converter: oxygen refines steel", alt: "Basic oxygen LD converter with oxygen lance blowing into molten pig iron and impurities leaving as gases and slag", keyword: "converter" },
      { Component: H2o2DualRedox, caption: "Oxidant on Monday, reductant on Tuesday", alt: "Hydrogen peroxide acting as oxidant with iron two plus and as reductant with permanganate", keyword: "oxidant" },
    ],
  },
  "ozone-occurrence-preparation-of-ozone-from-oxygen-structure-of-ozone-test-for-ozone-uses-of-ozon": {
    title: "Ozone: structure, preparation, tests",
    figures: [
      { Component: OzoneStructurePanel, caption: "Bent, resonating, 128 pm", alt: "Bent ozone molecule with 117 degree angle and two resonance structures giving bond order 1.5", keyword: "resonance" },
      { Component: OzoniserFlow, caption: "Siemen's ozoniser", alt: "Siemens ozoniser with dry oxygen entering silent discharge between cooled electrodes and ten percent ozone exiting", keyword: "ozoniser" },
      { Component: O2O3ContrastPanel, caption: "Siblings, opposite temperaments", alt: "Six row comparison of dioxygen and ozone covering odour colour magnetism stability bond order and oxidising power", keyword: "colourless" },
      { Component: StarchIodideTestFlow, caption: "The test, and its catch", alt: "Starch iodide test sequence for ozone with turpentine discrimination from hydrogen peroxide", keyword: "iodide" },
      { Component: OzoneUseMap, caption: "Ozone at work", alt: "Four uses of ozone with brief notes", keyword: "bleaching" },
      { Component: OzoneUvShield, caption: "The planetary sunscreen", alt: "Stratospheric ozone layer at 15 to 35 kilometres absorbing UV-B and UV-C before it reaches the ground", keyword: "ultraviolet" },
      { Component: NascentORelease, caption: "O3 to O2 plus O: the workhorse split", alt: "Ozone splitting into oxygen and nascent oxygen which performs all oxidising work", keyword: "nascent" },
    ],
  },
  "ozone-layer-depletion-causes-effects-and-control-measures": {
    title: "Ozone depletion: cause, cost, cure",
    figures: [
      { Component: ClRadicalCycle, caption: "One Cl atom, ~100,000 ozone deaths", alt: "Two step chlorine radical cycle destroying ozone catalytically and regenerating the chlorine atom", keyword: "chlorine" },
      { Component: CfcLifecyclePath, caption: "A CFC's journey to crime", alt: "Five stage journey of a CFC from release through inert drift to stratospheric UV cleavage and ozone destruction", keyword: "refrigerant" },
      { Component: AntarcticHoleRecipe, caption: "Why the hole is Antarctic and seasonal", alt: "Four stage recipe for the Antarctic ozone hole involving polar stratospheric clouds and spring sunlight", keyword: "polar" },
      { Component: OdpLadder, caption: "The refrigerant staircase", alt: "Ozone depletion potential ladder from CFCs through HCFCs and HFCs to newer refrigerants", keyword: "depletion potential" },
      { Component: DepletionEffectsMap, caption: "What thinner ozone costs", alt: "Four categories of effects from ozone depletion on health plants marine life and materials", keyword: "cancer" },
      { Component: MontrealTimeline, caption: "Treaty timeline", alt: "Timeline from the 1987 Montreal Protocol through Kigali to projected ozone recovery", keyword: "montreal" },
      { Component: DobsonColumnPanel, caption: "DU: ozone measured as a squeezed column", alt: "Dobson unit concept measuring total column ozone as thickness of pure ozone at STP", keyword: "dobson" },
    ],
  },
  "nitrogen-reason-for-inertness-of-nitrogen-and-active-nitrogen": {
    title: "Nitrogen: why so inert, and the active form",
    figures: [
      { Component: TripleBondAnatomy, caption: "The strongest bond in the simple diatomics", alt: "Nitrogen molecule with triple bond 941 kilojoules per mole and 110 picometre bond length explaining inertness", keyword: "941" },
      { Component: InertnessFourReasons, caption: "Why N2 ignores almost everything", alt: "Four reasons for nitrogen inertness: bond energy bond length zero dipole and electronic structure", keyword: "inert" },
      { Component: LiExceptionPanel, caption: "The exception that proves the wall", alt: "Lithium reacting with nitrogen at room temperature forming ruby red lithium nitride", keyword: "lithium" },
      { Component: ActiveNitrogenGlow, caption: "Active nitrogen: atoms with a memory", alt: "Glow discharge tube converting nitrogen to active nitrogen atoms which recombine with yellow afterglow", keyword: "discharge" },
      { Component: FixationVsHaber, caption: "Same reaction, two engineering styles", alt: "Comparison of biological nitrogen fixation by nitrogenase with the industrial Haber process", keyword: "nitrogenase" },
      { Component: N2PreparationRoutes, caption: "Getting N2: cheap vs pure", alt: "Four routes to prepare nitrogen with purity notes", keyword: "distillation" },
      { Component: KineticVsThermoPanel, caption: "Willing but blocked: thermo vs kinetics", alt: "Thermodynamics favouring nitrogen compound formation blocked by the kinetic barrier of the triple bond", keyword: "kinetic" },
    ],
  },
  "chemical-properties-of-ammonia-action-with-cuso4-solution-water-fecl3-solution-conc-hcl-mercurou": {
    title: "Ammonia: the reaction checklist",
    figures: [
      { Component: Nh3StructureLonePair, caption: "One lone pair runs the show", alt: "Pyramidal ammonia structure with 107 degree bond angle and lone pair driving basicity and donor behaviour", keyword: "lone pair" },
      { Component: Cuso4TwoStepLadder, caption: "The two-step copper drama", alt: "Two step reaction of copper sulfate with ammonia: pale blue precipitate then deep blue complex on excess ammonia", keyword: "cuso4" },
      { Component: Fecl3AmmoniaTest, caption: "FeCl3 plus NH4OH: brown and stubborn", alt: "Ferric chloride solution with ammonia giving reddish brown ferric hydroxide precipitate insoluble in excess ammonia", keyword: "fecl3" },
      { Component: WhiteFumesTest, caption: "Two rods, one white cloud", alt: "Ammonia and hydrogen chloride gases meeting to form dense white fumes of ammonium chloride", keyword: "hcl" },
      { Component: TwoOxygenEquations, caption: "Same flame, two products - catalyst decides", alt: "Ammonia burning in oxygen without catalyst gives nitrogen while catalytic oxidation over platinum gives nitric oxide", keyword: "oxygen" },
      { Component: Nh3UseMap, caption: "Where NH3 goes", alt: "Four major uses of ammonia in fertilisers refrigeration nitric acid production and the laboratory", keyword: "fertiliser" },
      { Component: DryingAgentTrap, caption: "Dry it - but with what?", alt: "Quicklime as the correct drying agent for ammonia while sulfuric acid and calcium chloride react with it", keyword: "quicklime" },
    ],
  },
  "oxy-acids-of-nitrogen-name-and-formula": {
    title: "Oxyacids of nitrogen",
    figures: [
      { Component: OxyacidLadderN, caption: "The nitrogen oxyacid ladder", alt: "Ladder of nitrogen oxyacids with formulas and oxidation states from hyponitrous to pernitric acid", keyword: "hyponitrous" },
      { Component: OstwaldThreeSteps, caption: "Ostwald: NH3 to HNO3 in three moves", alt: "Ostwald process three steps with conditions including platinum rhodium gauze at 800 to 900 degrees", keyword: "ostwald" },
      { Component: Hno3ConcentrationCodes, caption: "The concentration code", alt: "Nitric acid reduction products depend on concentration: nitrogen dioxide nitric oxide or ammonium nitrate", keyword: "no2" },
      { Component: No3ResonancePanel, caption: "NO3 minus: three drawings, one ion", alt: "Nitrate ion with three equivalent resonance structures giving bond order one and one third", keyword: "resonance" },
      { Component: AquaRegiaPanel, caption: "Aqua regia: the king-dissolver", alt: "Aqua regia three parts hydrochloric acid to one part nitric acid dissolving gold and platinum", keyword: "aqua regia" },
      { Component: PassivityFilmPanel, caption: "Passivity: the acid that builds its own wall", alt: "Concentrated nitric acid passivating iron aluminium and chromium with a thin oxide film", keyword: "passivity" },
      { Component: Hno2DualRedox, caption: "HNO2 at +3: can go up or down", alt: "Nitrous acid acting as oxidant with hydrogen iodide and as reductant with acidified permanganate", keyword: "nitrites" },
    ],
  },
  "chemical-properties-of-nitric-acid-hno3-as-an-acid-and-oxidizing-agent-action-with-zinc-magnesiu": {
    title: "HNO3: acid, oxidant, and the brown ring",
    figures: [
      { Component: Hno3ReactionMatrix, caption: "HNO3 reaction matrix", alt: "Matrix of nitric acid reactions with copper zinc and non-metals at different concentrations showing the reduction product", keyword: "nitric acid" },
      { Component: ConcentrationCodeLadder, caption: "The deeper the dilution, the deeper the cut", alt: "Ladder of nitric acid concentration against reduction product from nitrogen dioxide to ammonium nitrate", keyword: "dilute" },
      { Component: NonmetalOxyacidMap, caption: "No cation? Then the oxyacid gets made", alt: "Non-metals sulphur carbon and phosphorus oxidised by concentrated nitric acid to their highest oxyacids", keyword: "oxidis" },
      { Component: BrownRingJunction, caption: "The brown ring at the junction", alt: "Test tube with layered sulphuric acid and ferrous sulphate showing the brown nitrosyl ring at the junction", keyword: "brown ring" },
      { Component: Hno3LabPrepPanel, caption: "Lab HNO3: distil, don't exceed 200 C", alt: "Laboratory preparation of nitric acid distilling potassium nitrate with concentrated sulphuric acid below 200 degrees", keyword: "nitrate" },
      { Component: Hno3UseMap, caption: "Where the +5 state goes to work", alt: "Four uses of nitric acid in fertilisers explosives nylon and metal pickling", keyword: "nitric acid" },
      { Component: PassivityFilmPanel, caption: "Passivity: the acid that builds its own wall", alt: "Concentrated nitric acid passivating iron aluminium and chromium with a thin oxide film", keyword: "passivity" },
    ],
  },
  "halogens-general-characteristics-of-halogens-comparative-study-on-preparation-chemical-propertie": {
    title: "Halogens: the family portrait",
    figures: [
      { Component: HalogenTrendLadder, caption: "Down the group: bigger, softer, weaker", alt: "Ladder of halogens with state colour electronegativity and oxidising power from fluorine to iodine", keyword: "fluorine" },
      { Component: HalogenDisplacementSeries, caption: "The bully always wins", alt: "Displacement series showing lighter halogens liberating heavier halides with observed colours", keyword: "displacement" },
      { Component: ChlorineWaterEquilibrium, caption: "Chlorine water is HOCl in disguise", alt: "Chlorine water equilibrium forming hydrochloric and hypochlorous acids with nascent oxygen bleaching", keyword: "hypochlorous" },
      { Component: DisproportionationSplit, caption: "Same reagents, temperature picks the product", alt: "Chlorine disproportionation in cold dilute alkali stopping at plus one and in hot concentrated alkali reaching plus five", keyword: "disproportionation" },
      { Component: OxoacidStrengthOrder, caption: "More oxygen, stronger acid (NEB 2024)", alt: "Acid strength order of chlorine oxoacids from hypochlorous to perchloric explained by conjugate base charge delocalisation", keyword: "perchloric" },
      { Component: HalogenPrepRoutes, caption: "Making the halogens", alt: "Preparation routes for chlorine bromine and iodine in laboratory and industry", keyword: "mno2" },
      { Component: HalogenUseMap, caption: "Three halogens, three industries", alt: "Uses of chlorine bromine and iodine", keyword: "photographic" },
    ],
  },
  "test-for-cl2-br2-and-i2": {
    title: "Tests for Cl2, Br2 and I2",
    figures: [
      { Component: HalogenFingerprintTable, caption: "Three gases, three fingerprints", alt: "Fingerprint table for chlorine bromine and iodine covering colour litmus starch and ammonia tests", keyword: "starch" },
      { Component: StarchHelixComplex, caption: "The guest in the helix", alt: "Iodine molecules inside the amylose helix forming the blue-black charge transfer complex reversible with heat", keyword: "blue" },
      { Component: AgxColourLadder, caption: "The AgX colour ladder", alt: "Silver halide colour ladder white cream yellow with ammonia solubility", keyword: "agno" },
      { Component: BleachingSpeedContrast, caption: "Bleaching power tracks oxidising power", alt: "Bleaching speed on moist litmus fast for chlorine slow for bromine and none for iodine", keyword: "bleach" },
      { Component: IodineSublimationPanel, caption: "Sublimation: solid to violet cloud and back", alt: "Iodine subliming from grey black crystals to violet vapour and depositing back on the cold surface", keyword: "sublim" },
      { Component: HalideTestFlowchart, caption: "Which halide? Follow the ladder", alt: "Flowchart for identifying chloride bromide and iodide using silver nitrate colour and ammonia solubility", keyword: "ammonia" },
      { Component: WhiteFumesTest, caption: "Two rods, one white cloud", alt: "Ammonia and hydrogen chloride gases meeting to form dense white fumes of ammonium chloride", keyword: "nh4cl" },
    ],
  },
  "haloacids-hcl-hbr-and-hi-comparative-study-on-preparation-properties-reducing-strength-acidic-na": {
    title: "Haloacids: HCl, HBr, HI",
    figures: [
      { Component: HalideBondLadder, caption: "The bond weakens, everything follows", alt: "Bond energy ladder of hydrogen halides 431 366 and 299 kilojoules per mole", keyword: "bond" },
      { Component: H2so4VsH3po4Prep, caption: "Pick the acid to match the halide", alt: "Choice of sulphuric acid for hydrogen chloride and phosphoric acid for hydrogen bromide and iodide", keyword: "h3po4" },
      { Component: HiReducesH2so4, caption: "The acid that eats its own product", alt: "Hydrogen iodide reducing concentrated sulphuric acid to iodine and sulphur dioxide contaminating its own preparation", keyword: "sulphuric acid" },
      { Component: AcidityStabilityScissors, caption: "One bond, two opposite arrows", alt: "Opposing trends of increasing acidity and decreasing thermal stability down the hydrogen halides", keyword: "acidity" },
      { Component: HclGastricPickling, caption: "The same acid digests lunch and de-scales steel", alt: "Hydrochloric acid in the stomach at pH 1.5 to 3.5 and in steel pickling baths", keyword: "stomach" },
      { Component: FumingHxMist, caption: "Why the bottle mouth smokes", alt: "Hydrogen halide gas meeting moist air to form white acidic mist of hydrohalic acid droplets", keyword: "fumes" },
      { Component: HalideReducingLadder, caption: "Reducing power climbs as the ion grows", alt: "Reducing power ladder of halides increasing from chloride to iodide", keyword: "reducing" },
    ],
  },
  "carbon-allotropes-of-carbon-crystalline-and-amorphous-including-fullerenes-structure-general-pro": {
    title: "Carbon: allotropes and uses",
    figures: [
      { Component: CarbonHybridisationTrio, caption: "Hybridisation is destiny", alt: "Three hybridisations of carbon building diamond graphite and fullerene", keyword: "diamond" },
      { Component: DiamondGraphiteContrast, caption: "Same element, opposite characters", alt: "Comparison of diamond and graphite in bonding hardness conductivity and lubrication", keyword: "graphite" },
      { Component: FullereneFootball, caption: "C60: the football molecule", alt: "Buckminsterfullerene C60 football of twenty hexagons and twelve pentagons with endohedral doping", keyword: "fullerene" },
      { Component: CatenationChampion, caption: "Why carbon chains and silicon doesn't", alt: "Carbon carbon bond 355 versus silicon silicon 222 kilojoules per mole explaining catenation", keyword: "catenation" },
      { Component: AmorphousAdsorptionPower, caption: "A tennis court folded into a sugar cube", alt: "Activated charcoal with enormous internal surface area about 1000 square metres per gram adsorbing gases and impurities", keyword: "adsorption" },
      { Component: CarbonUseMap, caption: "One element, four industries", alt: "Uses of carbon allotropes and amorphous forms", keyword: "lubricant" },
      { Component: C14DatingPanel, caption: "C14: the radioactive clock", alt: "Carbon fourteen dating with 5730 year half-life decay curve", keyword: "radioactive" },
    ],
  },
  "properties-reducing-action-reaction-with-metals-and-nonmetals-and-uses-of-carbon-monoxide": {
    title: "Carbon monoxide",
    figures: [
      { Component: CoPrepRoutes, caption: "Four doors into CO", alt: "Four routes to carbon monoxide from formic acid dehydration to fuel gases", keyword: "formic" },
      { Component: CoBlueFlame, caption: "The blue flame test", alt: "Carbon monoxide burning with characteristic blue flame to carbon dioxide releasing 283 kilojoules per mole", keyword: "blue" },
      { Component: CoBlastFurnaceReduction, caption: "The blast furnace's quiet worker", alt: "Blast furnace reduction of iron oxide by carbon monoxide", keyword: "blast furnace" },
      { Component: CarboxyhaemoglobinHijack, caption: "The hijacking ligand", alt: "Carbon monoxide binding haemoglobin iron 200 times more strongly than oxygen forming carboxyhaemoglobin", keyword: "haemoglobin" },
      { Component: MondProcessLoop, caption: "Mond: nickel travels as a vapour", alt: "Mond process loop forming nickel tetracarbonyl at 50 degrees and decomposing at 230 degrees", keyword: "nickel" },
      { Component: CoVsCo2Contrast, caption: "One oxygen apart, worlds apart", alt: "Five row comparison of carbon monoxide and carbon dioxide", keyword: "co2" },
      { Component: CoUseMap, caption: "The formal anhydride earns its keep", alt: "Four uses of carbon monoxide as fuel reducer synthesis feedstock and nickel refining", keyword: "phosgene" },
    ],
  },
  "phosphorus-allotropes-of-phosphorus-name-only": {
    title: "Phosphorus allotropes",
    figures: [
      { Component: P4StrainTetrahedron, caption: "P4: a spring compressed into a tetrahedron", alt: "White phosphorus P4 tetrahedron with 60 degree bond angles versus normal 109.5 degrees showing strain", keyword: "tetra" },
      { Component: WhiteVsRedPContrast, caption: "Same element, different danger", alt: "Six row comparison of white and red phosphorus", keyword: "white" },
      { Component: AllotropeConversionCycle, caption: "Heat one way, heat further the other", alt: "Reversible conversion between white and red phosphorus at 250 to 300 degrees and above 400 degrees", keyword: "red" },
      { Component: PGlowChemiluminescence, caption: "Why white phosphorus glows", alt: "White phosphorus glowing in dark air by slow oxidation with phosphorus trioxide and ozone products", keyword: "glow" },
      { Component: SafetyMatchAnatomy, caption: "Safety match: the reaction needs both sides", alt: "Safety match head of potassium chlorate and antimony sulphide striking on red phosphorus side of the box", keyword: "match" },
      { Component: BlackPLayers, caption: "Black P: the calm sibling", alt: "Black phosphorus puckered layered structure most stable allotrope made under high pressure", keyword: "black" },
      { Component: PUseMap, caption: "Phosphorus at work", alt: "Uses of phosphorus in fertilisers matches pesticides and military applications", keyword: "match" },
    ],
  },
  "phosphine-preparation-properties-basic-nature-reducing-nature-action-with-halogens-and-oxygen-an": {
    title: "Phosphine",
    figures: [
      { Component: Nh3VsPh3Contrast, caption: "Same shape, weaker grip", alt: "Six row comparison of ammonia and phosphine", keyword: "93.6" },
      { Component: Ph3PrepRoutes, caption: "Two prep routes, both from P3-", alt: "Preparation of phosphine from white phosphorus with sodium hydroxide and from calcium phosphide with water", keyword: "sodium hydroxide" },
      { Component: Ph3MetalSaltTests, caption: "Black precipitates and a mirror", alt: "Phosphine tests with copper mercury and silver salts giving black phosphides and silver mirror", keyword: "copper" },
      { Component: HolmesSignalSequence, caption: "Holme's signal: the sea's flare", alt: "Holmes signal of spontaneously burning phosphine used by wrecked ships", keyword: "signal" },
      { Component: Ph4SaltFormation, caption: "A base, but barely", alt: "Phosphonium salts formed by phosphine with hydrogen iodide and hydrobromic acid", keyword: "phosphonium" },
      { Component: Ph3CombustionH3po4, caption: "PH3 burns where NH3 won't", alt: "Phosphine burning in air to phosphoric acid with white smoke of metaphosphoric acid", keyword: "phosphoric" },
      { Component: P2h4SelfIgnition, caption: "The P2H4 troublemaker", alt: "Diphosphine P2H4 impurity spontaneously igniting phosphine air mixture in the preparation flask", keyword: "spontaneous" },
    ],
  },
  "sulphur-allotropes-of-sulphur-name-only-and-uses-of-sulphur": {
    title: "Sulphur: allotropes and uses",
    figures: [
      { Component: S8CrownRing, caption: "S8: the puckered crown", alt: "S8 puckered crown ring of eight sulphur atoms in rhombic and monoclinic sulphur", keyword: "rhombic" },
      { Component: SulphurAllotropeLadder, caption: "Three sulphurs, one 96 C border", alt: "Three allotropes of sulphur with temperature stability ranges and the 96 degree transition point", keyword: "monoclinic" },
      { Component: ViscosityMountainCurve, caption: "The viscosity mountain", alt: "Viscosity of molten sulphur rising to a maximum near 200 degrees then falling as chains break", keyword: "viscosity" },
      { Component: PlasticSulphurQuench, caption: "Making plastic sulphur", alt: "Molten sulphur boiled and poured into cold water forming plastic amorphous sulphur that slowly reverts to rhombic", keyword: "plastic" },
      { Component: VulcanisationCrosslinks, caption: "Sulphur as the bridge-builder", alt: "Vulcanisation adding 3 to 5 percent sulphur crosslinks between rubber chains versus 30 percent for ebonite", keyword: "vulcanis" },
      { Component: FineSulphurForms, caption: "Powder, milk and colloid", alt: "Three fine forms of sulphur flowers milk and colloidal with preparation", keyword: "milk" },
      { Component: SulphurUseMap, caption: "Brimstone's resume", alt: "Uses of sulphur in acid manufacture vulcanisation pyrotechnics and agriculture", keyword: "gunpowder" },
    ],
  },
  "hydrogen-sulphide-preparation-from-kipp-s-apparatus-with-diagram-properties-acidic-nature-reduci": {
    title: "Hydrogen sulphide",
    figures: [
      { Component: KippsApparatus3bulb, caption: "Kipp's apparatus: gas on demand", alt: "Kipps apparatus three bulbs with acid reservoir marble and ferrous sulphide lumps stopcock and pressure valve action", keyword: "Kipp" },
      { Component: H2sDibasicLadder, caption: "Weak, dibasic, two steps", alt: "Hydrogen sulphide as weak dibasic acid losing two protons in steps", keyword: "dibasic" },
      { Component: H2sReducerYellowS, caption: "H2S gives electrons, S rains out", alt: "Hydrogen sulphide reducing oxidants to precipitated yellow sulphur with equations", keyword: "reducing" },
      { Component: SulphideGroupSplit, caption: "The qualitative-analysis split", alt: "Qualitative analysis split of metal sulphides into acid insoluble group two and acid soluble group four", keyword: "group" },
      { Component: H2sCombustionSplit, caption: "How much air decides the product", alt: "Hydrogen sulphide burning with limited air to sulphur and excess air to sulphur dioxide", keyword: "combustion" },
      { Component: H2sHazardPanel, caption: "The smell that switches itself off", alt: "Hydrogen sulphide hazard rotten egg smell paralysis of olfactory nerves making high concentrations odourless", keyword: "rotten" },
      { Component: H2sPrepRoutes, caption: "FeS + acid, dried over P2O5", alt: "Hydrogen sulphide preparation from ferrous sulphide with dilute sulphuric acid dried by phosphorus pentoxide", keyword: "fes" },
    ],
  },
  "sulphur-dioxide-properties-acidic-nature-reducing-nature-oxidising-nature-and-bleaching-action-a": {
    title: "Sulphur dioxide",
    figures: [
      { Component: So2DualRedoxMap, caption: "+4: high enough to give, low enough to take", alt: "Sulphur dioxide dual redox nature as reducer to sulphate and oxidiser to sulphur", keyword: "reducing" },
      { Component: So2PrepRoutes, caption: "Four doors into SO2", alt: "Four routes to sulphur dioxide in laboratory and industry", keyword: "sodium sulphite" },
      { Component: So2BleachVsCl2, caption: "Two chemistries, two fates for colour", alt: "Temporary reduction bleaching by sulphur dioxide versus permanent oxidation bleaching by chlorine", keyword: "bleach" },
      { Component: SulphurFogDemo, caption: "The sulphur fog demo", alt: "Sulphur fog demonstration mixing hydrogen sulphide and sulphur dioxide to precipitate fine sulphur", keyword: "sulphur" },
      { Component: So2MoleculeShape, caption: "Bent, 119 degrees, resonating", alt: "Bent sulphur dioxide molecule with 119 degree bond angle and resonance structures", keyword: "angle" },
      { Component: So2AcidAnhydride, caption: "Acidic oxide: anhydride of H2SO3", alt: "Sulphur dioxide as acid anhydride of sulphurous acid forming bisulphite and sulphite in alkali", keyword: "sulphurous" },
      { Component: So2UseMap, caption: "From the acid plant to the raisin packet", alt: "Four uses of sulphur dioxide from sulphuric acid to food preservative", keyword: "preservative" },
    ],
  },
  "sulphuric-acid-properties-acidic-nature-oxidising-nature-dehydrating-nature-and-uses": {
    title: "Sulphuric acid: three personalities",
    figures: [
      { Component: H2so4PersonalityTrio, caption: "One molecule, three jobs", alt: "Three personalities of sulphuric acid as acid oxidant and dehydrating agent with equations", keyword: "dehydrating" },
      { Component: DilVsConcSwitch, caption: "Same metal, different gas", alt: "Dilute sulphuric acid acting as ordinary acid releasing hydrogen and concentrated sulphuric acid acting as oxidant releasing sulphur dioxide", keyword: "dilute" },
      { Component: NonvolatileDisplacer, caption: "The acid that makes other acids", alt: "Concentrated sulphuric acid as high boiling nonvolatile acid displacing more volatile acids from their salts", keyword: "volatile" },
      { Component: SugarSnakeDehydration, caption: "The sugar snake experiment", alt: "Concentrated sulphuric acid poured on sugar producing black carbon column steam and heat", keyword: "sugar" },
      { Component: AcidToWaterRule, caption: "Dilution is a heat bomb", alt: "Always add acid to water slowly with stirring never water to acid because dilution is highly exothermic", keyword: "water" },
      { Component: H2so4OxidationEqs, caption: "Hot conc. H2SO4 always ends at SO2", alt: "Hot concentrated sulphuric acid oxidising copper carbon sulphur and mercury with sulphur dioxide evolution", keyword: "oxidising" },
      { Component: H2so4UseMap, caption: "King of chemicals: production as GDP proxy", alt: "Four major uses of sulphuric acid", keyword: "batter" },
    ],
  },
  "sodium-thiosulphate-formula-and-uses": {
    title: "Sodium thiosulphate (hypo)",
    figures: [
      { Component: ThiosulphateAnatomy, caption: "S2O3 2-: two sulphurs, two jobs", alt: "Thiosulphate ion structure sulphate-like sulphur plus sulfane sulphur with two different oxidation states", keyword: "thiosulphate" },
      { Component: IodometryEndpoint, caption: "Iodometry: watch the blue vanish", alt: "Iodometric titration with thiosulphate reducing iodine to iodide with starch endpoint fading from blue black to colourless", keyword: "iodine" },
      { Component: PhotoFixerComplex, caption: "Why the fixer is called hypo", alt: "Hypo fixing unexposed silver halide in photographic film by forming soluble silver thiosulphate complex", keyword: "photograph" },
      { Component: AntichlorAction, caption: "Antichlor: undoing the bleach", alt: "Sodium thiosulphate as antichlor removing excess chlorine after bleaching in textile mills", keyword: "antichlor" },
      { Component: HypoAcidDecomposition, caption: "Acid + hypo = the milky test", alt: "Thiosulphate with dilute acid giving sulphur dioxide precipitated sulphur and water with milkiness", keyword: "sulphur" },
      { Component: CyanideAntidotePath, caption: "The cyanide antidote", alt: "Thiosulphate as cyanide antidote converting cyanide to harmless thiocyanate by trans-sulphuration enzyme rhodanese", keyword: "cyanide" },
      { Component: HypoUseMap, caption: "One salt, four careers", alt: "Four uses of sodium thiosulphate in photography titration textiles and medicine", keyword: "titration" },
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
