package com.ravikisan.platform.compose.ui.screens.wave2

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlin.math.cos
import kotlin.math.sin

// ── Periodic Table (Device-local, matches /periodic-table & /ad-p-table) ────

data class ElementInfo(
    val number: Int,
    val symbol: String,
    val name: String,
    val mass: String,
    val block: String,
    val group: String,
    val config: String,
    val ceeFact: String,
)

private val ELEMENTS_SAMPLE = listOf(
    ElementInfo(1, "H", "Hydrogen", "1.008", "s", "Nonmetal", "1s¹", "Lightest element; isotopes: Protium, Deuterium, Tritium."),
    ElementInfo(2, "He", "Helium", "4.0026", "s", "Noble Gas", "1s²", "Second most abundant element in universe; zero electron affinity."),
    ElementInfo(3, "Li", "Lithium", "6.94", "s", "Alkali Metal", "[He] 2s¹", "Lightest metal; strongest reducing agent in aqueous solution."),
    ElementInfo(4, "Be", "Beryllium", "9.0122", "s", "Alkaline Earth", "[He] 2s²", "Amphoteric oxide (BeO); shows diagonal relationship with Al."),
    ElementInfo(5, "B", "Boron", "10.81", "p", "Metalloid", "[He] 2s² 2p¹", "Forms electron-deficient compounds like BF₃, B₂H₆."),
    ElementInfo(6, "C", "Carbon", "12.011", "p", "Nonmetal", "[He] 2s² 2p²", "Shows maximum catenation; diamond (sp³) & graphite (sp²)."),
    ElementInfo(7, "N", "Nitrogen", "14.007", "p", "Nonmetal", "[He] 2s² 2p³", "Triple bond N≡N (941 kJ/mol); inert at room temperature."),
    ElementInfo(8, "O", "Oxygen", "15.999", "p", "Nonmetal", "[He] 2s² 2p⁴", "Paramagnetic (2 unpaired e⁻ in π*2p); most abundant element in crust."),
    ElementInfo(9, "F", "Fluorine", "18.998", "p", "Halogen", "[He] 2s² 2p⁵", "Most electronegative element (3.98); always -1 oxidation state."),
    ElementInfo(10, "Ne", "Neon", "20.180", "p", "Noble Gas", "[He] 2s² 2p⁶", "Used in discharge tubes and advertising signs."),
    ElementInfo(11, "Na", "Sodium", "22.990", "s", "Alkali Metal", "[Ne] 3s¹", "Stored in kerosene; reacts vigorously with water."),
    ElementInfo(12, "Mg", "Magnesium", "24.305", "s", "Alkaline Earth", "[Ne] 3s²", "Present at the center of chlorophyll molecule."),
    ElementInfo(13, "Al", "Aluminium", "26.982", "p", "Post-transition", "[Ne] 3s² 3p¹", "Most abundant metal in Earth's crust; extracted from bauxite."),
    ElementInfo(14, "Si", "Silicon", "28.085", "p", "Metalloid", "[Ne] 3s² 3p²", "Core semiconductor material; second most abundant element in crust."),
    ElementInfo(17, "Cl", "Chlorine", "35.45", "p", "Halogen", "[Ne] 3s² 3p⁵", "Highest electron gain enthalpy among all elements."),
    ElementInfo(24, "Cr", "Chromium", "51.996", "d", "Transition Metal", "[Ar] 3d⁵ 4s¹", "Anomalous configuration (half-filled d⁵); stainless steel component."),
    ElementInfo(26, "Fe", "Iron", "55.845", "d", "Transition Metal", "[Ar] 3d⁶ 4s²", "Extracted from haematite (Fe₂O₃); catalyst in Haber process."),
    ElementInfo(29, "Cu", "Copper", "63.546", "d", "Transition Metal", "[Ar] 3d¹⁰ 4s¹", "Anomalous configuration (full d¹⁰); high electrical conductivity."),
    ElementInfo(30, "Zn", "Zinc", "65.38", "d", "Transition Metal", "[Ar] 3d¹⁰ 4s²", "Not a typical transition metal (full d¹⁰ in Zn and Zn²⁺)."),
    ElementInfo(57, "La", "Lanthanum", "138.91", "f", "Lanthanoid", "[Xe] 5d¹ 6s²", "Lanthanoid contraction affects 5d series atomic radii."),
    ElementInfo(92, "U", "Uranium", "238.03", "f", "Actinoid", "[Rn] 5f³ 6d¹ 7s²", "Nuclear fuel (U-235 fissile isotope); radioactive."),
)

@Composable
fun PeriodicTableScreen(isAdvanced: Boolean = false) {
    var selectedBlock by remember { mutableStateOf("All") }
    var query by remember { mutableStateOf("") }
    var selectedElement by remember { mutableStateOf<ElementInfo?>(ELEMENTS_SAMPLE.first()) }
    val blocks = listOf("All", "s", "p", "d", "f")

    val filtered = remember(selectedBlock, query) {
        ELEMENTS_SAMPLE.filter { el ->
            (selectedBlock == "All" || el.block == selectedBlock) &&
                (query.isBlank() || el.name.contains(query, ignoreCase = true) || el.symbol.contains(query, ignoreCase = true))
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text(
                if (isAdvanced) "Advanced Periodic Table" else "Periodic Table & CEE Bank",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
            )
            Text(
                "s/p/d/f Block Explorer, electron configurations, and CEE high-frequency facts.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 4.dp),
            )
            Spacer(Modifier.height(8.dp))
            OutlinedTextField(
                value = query,
                onValueChange = { query = it },
                label = { Text("Search element or symbol") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            Spacer(Modifier.height(8.dp))
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(blocks) { block ->
                    FilterChip(
                        selected = selectedBlock == block,
                        onClick = { selectedBlock = block },
                        label = { Text(if (block == "All") "All Blocks" else "$block-block") },
                    )
                }
            }
        }

        selectedElement?.let { el ->
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                ) {
                    Column(Modifier.padding(16.dp)) {
                        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                            Text("${el.number} · ${el.symbol} — ${el.name}", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                            Text("${el.block}-block", style = MaterialTheme.typography.labelMedium)
                        }
                        Text("Mass: ${el.mass} u · ${el.group}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                        Text("Config: ${el.config}", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.Medium, modifier = Modifier.padding(top = 2.dp))
                        Text("CEE Note: ${el.ceeFact}", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 6.dp))
                    }
                }
            }
        }

        items(filtered) { el ->
            Card(
                modifier = Modifier.fillMaxWidth().clickable { selectedElement = el },
                colors = CardDefaults.cardColors(
                    containerColor = if (selectedElement?.number == el.number) MaterialTheme.colorScheme.secondaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                ),
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Column {
                        Text("${el.number}. ${el.symbol} — ${el.name}", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                        Text("${el.config} · ${el.group}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Surface(shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.primaryContainer) {
                        Text("${el.block}-block", style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
                    }
                }
            }
        }
    }
}

// ── Interactive Labs & Theory (Device-local Canvas 2D + Organelles + Theory) ─

data class LabCatalogItem(
    val id: String,
    val title: String,
    val subject: String,
    val summary: String,
)

private val LAB_CATALOG = listOf(
    LabCatalogItem("projectile", "Projectile Motion Simulator", "Physics", "Adjust launch angle and speed to inspect parabolic trajectory and range."),
    LabCatalogItem("ohms-law", "Ohm's Law Circuit Lab", "Physics", "Vary voltage and resistance to observe current I = V / R in real time."),
    LabCatalogItem("bio-3d-organelles", "Cell Organelles Explorer", "Biology", "Inspect Nucleus, Mitochondria, Chloroplast, ER, and Golgi apparatus."),
    LabCatalogItem("3d", "3D Lab Visualizations Hub", "STEM", "Key 3D concepts across Physics, Chemistry, and Biology."),
    LabCatalogItem("theory", "Lab Theory & Viva Manual", "Practical", "Apparatus, principle, precautions, and viva questions."),
)

@Composable
fun LabHubScreen(onOpenLab: (String) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp),
        contentPadding = PaddingValues(vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Interactive Labs", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
            Text(
                "Explore Physics simulations, Cell Organelles, and Lab Theory natively.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 4.dp),
            )
            Spacer(Modifier.height(8.dp))
        }
        items(LAB_CATALOG) { lab ->
            Card(
                modifier = Modifier.fillMaxWidth().clickable { onOpenLab(lab.id) },
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
            ) {
                Column(Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(lab.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Surface(shape = MaterialTheme.shapes.small, color = MaterialTheme.colorScheme.primaryContainer) {
                            Text(lab.subject, style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
                        }
                    }
                    Text(lab.summary, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}

@Composable
fun LabDetailScreen(labId: String) {
    when (labId) {
        "bio-3d-organelles" -> CellOrganellesLab()
        "theory" -> LabTheoryScreen()
        "3d" -> Lab3DHubScreen()
        else -> ProjectileMotionLab()
    }
}

@Composable
private fun ProjectileMotionLab() {
    var angleDeg by remember { mutableFloatStateOf(45f) }
    var velocity by remember { mutableFloatStateOf(20f) }
    val g = 9.8f
    val rad = Math.toRadians(angleDeg.toDouble())
    val range = ((velocity * velocity * sin(2 * rad)) / g).toFloat()
    val maxHeight = ((velocity * velocity * sin(rad) * sin(rad)) / (2 * g)).toFloat()
    val primaryColor = MaterialTheme.colorScheme.primary

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Projectile Motion Lab", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text("R = u² sin(2θ) / g  ·  H = u² sin²(θ) / 2g", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        item {
            Card(modifier = Modifier.fillMaxWidth().height(200.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Canvas(modifier = Modifier.fillMaxSize().padding(16.dp)) {
                    val path = Path()
                    val steps = 40
                    val maxR = 60f
                    val maxH = 30f
                    path.moveTo(0f, size.height)
                    for (i in 0..steps) {
                        val frac = i / steps.toFloat()
                        val xPhys = range * frac
                        val t = if (velocity * cos(rad) > 0.01) xPhys / (velocity * cos(rad)).toFloat() else 0f
                        val yPhys = (velocity * sin(rad) * t - 0.5 * g * t * t).toFloat().coerceAtLeast(0f)
                        val px = (xPhys / maxR).coerceIn(0f, 1f) * size.width
                        val py = size.height - (yPhys / maxH).coerceIn(0f, 1f) * size.height
                        path.lineTo(px, py)
                    }
                    drawPath(path, color = primaryColor, style = Stroke(width = 6f))
                    drawLine(Color.Gray, start = Offset(0f, size.height), end = Offset(size.width, size.height), strokeWidth = 2f)
                }
            }
        }
        item {
            Text("Launch Angle: ${angleDeg.toInt()}°", style = MaterialTheme.typography.labelLarge)
            Slider(value = angleDeg, onValueChange = { angleDeg = it }, valueRange = 10f..85f)
            Text("Initial Velocity: ${velocity.toInt()} m/s", style = MaterialTheme.typography.labelLarge)
            Slider(value = velocity, onValueChange = { velocity = it }, valueRange = 5f..25f)
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer)) {
                Column(Modifier.padding(16.dp)) {
                    Text("Horizontal Range: ${"%.2f".format(range)} m", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                    Text("Maximum Height: ${"%.2f".format(maxHeight)} m", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                }
            }
        }
    }
}

@Composable
private fun CellOrganellesLab() {
    val organelles = listOf(
        "Nucleus" to "Double-membraned control center containing chromatin DNA and nucleolus (ribosome synthesis).",
        "Mitochondria" to "Powerhouse of the cell; double membrane with cristae; site of Krebs cycle & oxidative phosphorylation (ATP).",
        "Chloroplast" to "Plant-cell plastid with chlorophyll; thylakoids (light reaction) and stroma (Calvin cycle).",
        "Endoplasmic Reticulum" to "Rough ER (ribosomes → protein synthesis) and Smooth ER (lipid synthesis & detoxification).",
        "Golgi Apparatus" to "Packages, modifies, and sorts proteins/lipids into vesicles for secretion or lysosomes.",
        "Ribosomes (70S / 80S)" to "Non-membranous organelles responsible for translation of mRNA into polypeptides.",
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Cell Organelles Explorer", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text("Eukaryotic cell structures and their exam-focused functions.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        items(organelles) { (name, desc) ->
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(16.dp)) {
                    Text(name, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(desc, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}

@Composable
private fun LabTheoryScreen() {
    val sections = listOf(
        "Vernier Callipers & Screw Gauge" to "Zero error correction, least count = 1 MSD - 1 VSD (0.01 cm for Vernier; 0.001 cm for Screw Gauge).",
        "Ohm's Law & Meter Bridge" to "Null point condition: R₁/R₂ = l / (100 - l). Avoid passing current continuously to prevent heating.",
        "Titration (KMnO₄ vs Oxalic Acid)" to "Self-indicator (KMnO₄); warm oxalic acid to 60–70 °C in acidic medium (dil. H₂SO₄).",
        "Mitosis in Onion Root Tip" to "Acetocarmine staining; prophase, metaphase (equatorial plate), anaphase (chromatid separation), telophase.",
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("Lab Theory Hub", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text("Core NEB practical principles, formulas, and precautions.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        items(sections) { (title, body) ->
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(16.dp)) {
                    Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(body, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}

@Composable
private fun Lab3DHubScreen() {
    val itemsList = listOf(
        "Molecular Geometry (VSEPR)" to "Linear (180°), Trigonal Planar (120°), Tetrahedral (109.5°), Octahedral (90°).",
        "Electromagnetic Wave Propagation" to "E and B fields oscillate perpendicular to each other and to wave direction.",
        "DNA Double Helix" to "Antiparallel strands, A=T (2 H-bonds), G≡C (3 H-bonds), 3.4 nm per helical turn.",
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Text("3D Concepts Hub", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            Text("Spatial STEM models & key structural parameters.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
        items(itemsList) { (title, body) ->
            Card(modifier = Modifier.fillMaxWidth(), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(Modifier.padding(16.dp)) {
                    Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(body, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp))
                }
            }
        }
    }
}
