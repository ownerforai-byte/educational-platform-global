package com.ravikisan.platform.compose.ui.screens.study.local

import com.ravikisan.platform.compose.ui.screens.study.ClassSyllabus
import com.ravikisan.platform.compose.ui.screens.study.SubjectSyllabus
import com.ravikisan.platform.compose.ui.screens.study.SyllabusUnit

/**
 * Local fake syllabus — Agent 4 renders UI without waiting for Agent 3's API
 * layer. Unit ids/titles/hours mirror the real NEB syllabus ordering from the
 * website's canonical `frontend/lib/core/syllabus.ts` (subset only — enough
 * subjects/units to exercise the drill-down; full corpus streams from the API
 * once the data layer lands).
 */
object FakeSyllabus {

    val classes: List<ClassSyllabus> = listOf(
        ClassSyllabus(
            slug = "class-11-notes",
            name = "Class 11 Notes",
            subjects = listOf(
                SubjectSyllabus(
                    slug = "physics",
                    name = "Physics",
                    description = "Official NEB Physics XI (Phy. 101) — Mechanics, Heat, Waves/Optics, Electricity and Modern Physics in curriculum order.",
                    units = listOf(
                        SyllabusUnit(
                            id = "physical-quantities",
                            title = "Physical Quantities",
                            hours = 3,
                            introducedIn = 2077,
                            topics = listOf(
                                "Precision and significant figures",
                                "Dimensions and uses of dimensional analysis",
                            ),
                        ),
                        SyllabusUnit(
                            id = "vectors",
                            title = "Vectors",
                            hours = 4,
                            introducedIn = 2077,
                            topics = listOf(
                                "Triangle, parallelogram and polygon laws of vectors",
                                "Resolution of vectors; unit vectors",
                                "Scalar and vector products",
                            ),
                        ),
                        SyllabusUnit(
                            id = "kinematics",
                            title = "Kinematics",
                            hours = 5,
                            introducedIn = 2077,
                            topics = listOf(
                                "Instantaneous velocity and acceleration",
                                "Relative velocity",
                                "Equation of motion (graphical treatment)",
                                "Motion of a freely falling body",
                                "Projectile motion and its applications",
                            ),
                        ),
                        SyllabusUnit(
                            id = "dynamics",
                            title = "Dynamics",
                            hours = 6,
                            introducedIn = 2077,
                            topics = listOf(
                                "Linear momentum, impulse",
                                "Conservation of linear momentum",
                                "Application of Newton's laws",
                                "Moment, torque and equilibrium",
                                "Solid friction: laws of solid friction and their verifications",
                            ),
                        ),
                        SyllabusUnit(
                            id = "work-energy-and-power",
                            title = "Work, Energy and Power",
                            hours = 6,
                            introducedIn = 2077,
                            topics = listOf(
                                "Work done by a constant force and a variable force",
                                "Power",
                                "Work-energy theorem; kinetic and potential energy",
                                "Conservation of energy",
                                "Conservative and non-conservative forces",
                                "Elastic and inelastic collisions",
                            ),
                        ),
                        SyllabusUnit(
                            id = "circular-motion",
                            title = "Circular Motion",
                            hours = 6,
                            introducedIn = 2077,
                            topics = listOf(
                                "Angular displacement, velocity and acceleration",
                                "Centripetal acceleration and force",
                                "Motion on a level road and banked road",
                            ),
                        ),
                    ),
                ),
                SubjectSyllabus(
                    slug = "biology",
                    name = "Biology",
                    description = "Official NEB Biology XI (Bio. 201) — Botany and Zoology in curriculum order.",
                    units = listOf(
                        SyllabusUnit(
                            id = "biomolecules-and-cell-biology",
                            title = "Biomolecules and Cell Biology",
                            hours = 15,
                            introducedIn = 2077,
                            topics = listOf(
                                "Biomolecules: Introduction and functions of carbohydrates, proteins, lipids, nucleic acids, minerals, enzymes and water",
                                "Cell: Introduction of cell, concepts of prokaryotic and eukaryotic cells",
                                "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids, endoplasmic reticulum, golgi bodies, lysosomes, ribosomes, nucleus, chromosomes, cilia, flagella and cell inclusions",
                                "Cell division: Concept of cell cycle, types of cell division (amitosis, mitosis and meiosis) and significances",
                            ),
                        ),
                        SyllabusUnit(
                            id = "floral-diversity",
                            title = "Floral Diversity",
                            hours = 30,
                            introducedIn = 2077,
                            topics = listOf(
                                "Introduction: Three domains of life, binomial nomenclature, five kingdom classification system (Monera, Protista, Fungi, Plantae and Animalia)",
                                "Status of flora in Nepal and world representation",
                                "Fungi: General introduction and characteristic features of phycomycetes, ascomycetes, basidiomycetes and deuteromycetes",
                                "Structure and reproduction of Mucor and Yeast",
                            ),
                        ),
                        SyllabusUnit(
                            id = "introductory-microbiology",
                            title = "Introductory Microbiology",
                            hours = 5,
                            introducedIn = 2077,
                            topics = listOf(
                                "Monera: General introduction, structure of bacterial cell, mode of nutrition, bacterial growth; cyanobacteria (blue green algae)",
                                "Virus: General introduction, structure and importance of virus, bacteriophage",
                                "Impacts of biotechnology in the field of microbiology",
                            ),
                        ),
                        SyllabusUnit(
                            id = "ecology",
                            title = "Ecology",
                            hours = 11,
                            introducedIn = 2077,
                            topics = listOf(
                                "Ecosystem ecology: Concept of ecology, biotic and abiotic factors, species interactions",
                                "Concept of ecosystem, structural and functional aspects of pond and forest ecosystem",
                                "Food chain, food web, trophic level, ecological pyramids, productivity",
                                "Biogeochemical cycles: carbon and nitrogen cycles; concept of succession",
                            ),
                        ),
                    ),
                ),
                SubjectSyllabus(
                    slug = "mathematics",
                    name = "Mathematics",
                    description = "Official NEB Mathematics XI (Mat. 103) — Algebra, Trigonometry, Geometry, Statistics and Calculus in curriculum order.",
                    units = listOf(
                        SyllabusUnit(
                            id = "sets-and-functions",
                            title = "Sets and Functions",
                            hours = 12,
                            introducedIn = 2077,
                            topics = listOf(
                                "Set and set operations; real number system",
                                "Function: domain and range of a function; inverse function",
                                "Composite functions; polynomial and rational functions",
                            ),
                        ),
                        SyllabusUnit(
                            id = "curve-sketching",
                            title = "Curve Sketching",
                            hours = 6,
                            introducedIn = 2077,
                            topics = listOf(
                                "Curve sketching; monotonicity",
                                "Extrema of functions; concavity and points of inflection",
                            ),
                        ),
                    ),
                ),
            ),
        ),
        ClassSyllabus(
            slug = "class-12-notes",
            name = "Class 12 Notes",
            subjects = listOf(
                SubjectSyllabus(
                    slug = "physics",
                    name = "Physics",
                    description = "Official NEB Physics XII (Phy. 102) — Mechanics, Heat, Waves/Optics, Electricity and Modern Physics in curriculum order.",
                    units = listOf(
                        SyllabusUnit(
                            id = "rotational-dynamics",
                            title = "Rotational Dynamics",
                            hours = 7,
                            introducedIn = 2078,
                            topics = listOf(
                                "Moment of inertia; torque and angular acceleration",
                                "Conservation of angular momentum",
                                "Rotational kinetic energy; work and power in rotation",
                            ),
                        ),
                        SyllabusUnit(
                            id = "periodic-motion",
                            title = "Periodic Motion",
                            hours = 7,
                            introducedIn = 2078,
                            topics = listOf(
                                "Simple harmonic motion; energy in SHM",
                                "Damped and forced oscillations; resonance",
                            ),
                        ),
                    ),
                ),
                SubjectSyllabus(
                    slug = "chemistry",
                    name = "Chemistry",
                    description = "Official NEB Chemistry XII (Chem. 102) — Physical, Organic and Inorganic Chemistry in curriculum order.",
                    units = listOf(
                        SyllabusUnit(
                            id = "volumetric-analysis",
                            title = "Volumetric Analysis",
                            hours = 4,
                            introducedIn = 2078,
                            topics = listOf(
                                "Volumetric analysis: solution, molarity, normality, titration",
                                "Indicators and acid-base titrations",
                            ),
                        ),
                        SyllabusUnit(
                            id = "ionic-equilibrium",
                            title = "Ionic Equilibrium",
                            hours = 5,
                            introducedIn = 2078,
                            topics = listOf(
                                "Ionization of acids and bases; pH and buffers",
                                "Solubility product; common ion effect",
                            ),
                        ),
                    ),
                ),
            ),
        ),
    )

    fun findUnit(unitId: String): Triple<ClassSyllabus, SubjectSyllabus, SyllabusUnit>? {
        for (klass in classes) {
            for (subject in klass.subjects) {
                val unit = subject.units.firstOrNull { it.id == unitId }
                if (unit != null) return Triple(klass, subject, unit)
            }
        }
        return null
    }
}
