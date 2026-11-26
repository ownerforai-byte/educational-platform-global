package com.ravikisan.platform.compose.ui.screens.study.local

import com.ravikisan.platform.compose.ui.components.reader.NoteSection

/**
 * Local fake notes — Agent 4 renders the reader without waiting for Agent 3's
 * note API. One fixture per syllabus unit the UI demos; plain-text sections
 * only (math/LaTeX rendering is a later reader milestone).
 */
data class FakeNote(
    val unitId: String,
    val intro: String,
    val sections: List<Pair<String, List<String>>>, // heading to paragraphs
)

object FakeNotes {

    private val notes = mapOf(
        "physical-quantities" to FakeNote(
            unitId = "physical-quantities",
            intro = "Measurement is the foundation of physics. This unit covers precision, " +
                "significant figures and how dimensional analysis checks and derives equations.",
            sections = listOf(
                "Precision and significant figures" to listOf(
                    "Precision refers to the agreement among repeated measurements. " +
                        "The number of significant figures in a reported value shows how precise it is.",
                    "Rules: all non-zero digits are significant; zeros between non-zero digits are " +
                        "significant; leading zeros are not; trailing zeros after a decimal point are.",
                    "When multiplying or dividing, the result keeps the smallest number of " +
                        "significant figures of any input. When adding or subtracting, it keeps the " +
                        "smallest number of decimal places.",
                ),
                "Dimensions and dimensional analysis" to listOf(
                    "A dimension is the type of physical quantity — mass [M], length [L], " +
                        "time [T] and so on. Dimensions are not the same as units.",
                    "Uses: (1) check the homogeneity of an equation, (2) derive relations between " +
                        "physical quantities, (3) convert one system of units to another.",
                    "Limitations: dimensional analysis cannot determine dimensionless constants, " +
                        "cannot involve trigonometric, exponential or logarithmic functions, and " +
                        "cannot distinguish between two quantities with the same dimensions.",
                ),
            ),
        ),
        "vectors" to FakeNote(
            unitId = "vectors",
            intro = "Vectors carry both magnitude and direction. This unit builds the laws of " +
                "vector addition, resolution, and products used throughout mechanics.",
            sections = listOf(
                "Laws of vectors" to listOf(
                    "Triangle law: if two vectors are represented in magnitude and direction by " +
                        "two sides of a triangle taken in order, their sum is the third side taken " +
                        "in the opposite order.",
                    "Parallelogram law: the resultant of two vectors along adjacent sides is the " +
                        "diagonal of the parallelogram they form, R = √(A² + B² + 2AB·cosθ).",
                    "Polygon law extends the triangle law to any number of vectors placed " +
                        "head-to-tail.",
                ),
                "Resolution and unit vectors" to listOf(
                    "A vector can be resolved into components: Ax = A·cosθ along x and " +
                        "Ay = A·sinθ along y. Unit vectors î and ĵ give A = Ax·î + Ay·ĵ.",
                ),
                "Scalar and vector products" to listOf(
                    "The scalar (dot) product A·B = AB·cosθ gives a scalar; it is zero for " +
                        "perpendicular vectors.",
                    "The vector (cross) product A×B = AB·sinθ·n̂ gives a vector perpendicular to " +
                        "both; it is zero for parallel vectors.",
                ),
            ),
        ),
        "kinematics" to FakeNote(
            unitId = "kinematics",
            intro = "Kinematics describes motion without asking what causes it: velocity, " +
                "acceleration, the equations of motion and projectile flight.",
            sections = listOf(
                "Instantaneous velocity and acceleration" to listOf(
                    "Instantaneous velocity is the limit of average velocity as the time interval " +
                        "shrinks to zero — the slope of the position–time graph.",
                    "Instantaneous acceleration is the slope of the velocity–time graph.",
                ),
                "Equations of motion" to listOf(
                    "For uniform acceleration: v = u + at, s = ut + ½at², and v² = u² + 2as. " +
                        "Each follows graphically from the velocity–time relation.",
                ),
                "Projectile motion" to listOf(
                    "A projectile's horizontal and vertical motions are independent. Horizontal " +
                        "velocity stays constant; vertical motion is uniformly accelerated.",
                    "Time of flight T = 2u·sinθ/g, range R = u²·sin2θ/g, and the maximum range is " +
                        "at θ = 45°.",
                ),
            ),
        ),
    )

    /** Returns the fake note for [unitId], or a neutral placeholder so the reader still renders. */
    fun forUnit(unitId: String): FakeNote = notes[unitId] ?: FakeNote(
        unitId = unitId,
        intro = "Notes for this unit are being prepared. The outline below follows the " +
            "official NEB curriculum order.",
        sections = listOf(
            "Overview" to listOf(
                "Full note content for this unit arrives with the online data layer " +
                    "(Agent 3 integration). This placeholder keeps the reader flow testable.",
            ),
        ),
    )
}
