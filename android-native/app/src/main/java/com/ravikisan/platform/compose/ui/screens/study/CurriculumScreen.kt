package com.ravikisan.platform.compose.ui.screens.study

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/** One configuration for the 28 web curriculum routes; the navigation owner maps paths to this value. */
data class CurriculumEntry(
    val surface: CurriculumSurface,
    val classSlug: String? = null,
    val subjectSlug: String? = null,
)

enum class CurriculumSurface { SYLLABUS, SUBJECTS, CLASS_HUB, SUBJECT_HUB, THEORY }

/** Canonical path map for review and parent-owned route promotion. */
object CurriculumRouteMap {
    private val subjectSlugs = listOf("physics", "chemistry", "biology", "mathematics", "english", "nepali")
    private val classes = listOf("class-11-notes", "class-12-notes")

    val paths: Set<String> = buildSet {
        add("/syllabus")
        add("/subjects")
        classes.forEach { classSlug ->
            add("/$classSlug")
            subjectSlugs.forEach { subjectSlug ->
                add("/$classSlug/$subjectSlug")
                add("/$classSlug/$subjectSlug/theory")
            }
        }
    }

    fun resolve(path: String): CurriculumEntry? {
        val normalized = path.trim().trimEnd('/').ifEmpty { "/" }
        if (normalized == "/syllabus") return CurriculumEntry(CurriculumSurface.SYLLABUS)
        if (normalized == "/subjects") return CurriculumEntry(CurriculumSurface.SUBJECTS)
        val segments = normalized.removePrefix("/").split('/')
        val classSlug = segments.getOrNull(0)?.takeIf { it in classes } ?: return null
        return when (segments.size) {
            1 -> CurriculumEntry(CurriculumSurface.CLASS_HUB, classSlug)
            2 -> segments[1].takeIf { it in subjectSlugs }?.let {
                CurriculumEntry(CurriculumSurface.SUBJECT_HUB, classSlug, it)
            }
            3 -> if (segments[1] in subjectSlugs && segments[2] == "theory") {
                CurriculumEntry(CurriculumSurface.THEORY, classSlug, segments[1])
            } else null
            else -> null
        }
    }
}

/**
 * Shared native surface for the class hubs, subject hubs, theory variants,
 * /subjects and /syllabus. Data always comes from SyllabusViewModel →
 * SyllabusRepository → RnApi/Room; this composable never substitutes fixtures.
 */
@Composable
fun CurriculumScreen(
    entry: CurriculumEntry,
    onOpenUnit: (unitId: String) -> Unit = {},
    viewModel: SyllabusViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    var selectedClassSlug by rememberSaveable(entry) {
        mutableStateOf(entry.classSlug ?: if (entry.surface == CurriculumSurface.SUBJECTS) "class-11-notes" else null)
    }
    var selectedSubjectSlug by rememberSaveable(entry) { mutableStateOf(entry.subjectSlug) }

    LaunchedEffect(Unit) { viewModel.loadTree() }
    LaunchedEffect(selectedSubjectSlug) {
        selectedSubjectSlug?.let { subject ->
            viewModel.loadUnits(subject, selectedClassSlug)
            if (entry.surface == CurriculumSurface.THEORY) viewModel.loadNotes(subject)
        }
    }

    val klass = state.tree.firstOrNull { it.slug == selectedClassSlug }
    val subject = klass?.subjects?.firstOrNull { it.slug == selectedSubjectSlug }
    val title = when {
        subject != null && entry.surface == CurriculumSurface.SUBJECTS -> subject.name
        else -> when (entry.surface) {
            CurriculumSurface.SYLLABUS -> "Syllabus & Curriculum Guidelines"
            CurriculumSurface.SUBJECTS -> "My Subjects"
            CurriculumSurface.CLASS_HUB -> klass?.name ?: "Class Hub"
            CurriculumSurface.SUBJECT_HUB, CurriculumSurface.THEORY -> subject?.name ?: "Subject"
        }
    }
    val subtitle = when {
        selectedSubjectSlug != null && entry.surface == CurriculumSurface.THEORY -> "Theory & published notes"
        selectedSubjectSlug != null -> "${klass?.name.orEmpty()} · official curriculum order"
        selectedClassSlug != null -> "Choose a subject"
        entry.surface == CurriculumSurface.SUBJECTS -> "Class 11 or Class 12 · pick a subject to study"
        else -> "Official NEB curriculum · choose a class"
    }
    val canGoBack = selectedSubjectSlug != null ||
        selectedClassSlug != null && entry.classSlug == null && entry.surface != CurriculumSurface.CLASS_HUB

    Column(Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 8.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (canGoBack) {
                IconButton(onClick = {
                    if (selectedSubjectSlug != null) {
                        selectedSubjectSlug = null
                        viewModel.closeUnits()
                        viewModel.closeNotes()
                    } else if (entry.classSlug == null) {
                        selectedClassSlug = null
                    }
                }) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                }
                Spacer(Modifier.width(4.dp))
            }
            Column {
                Text(title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            if (entry.surface == CurriculumSurface.SYLLABUS && selectedClassSlug == null) {
                if (state.loading) item { LoadingMessage() }
                else if (state.error != null) item { ErrorMessage(state.error!!, viewModel::loadTree) }
                else {
                    if (state.fromCache) item { OfflineMessage() }
                    val aggregated = state.tree.flatMap { row -> row.subjects.map { row to it } }
                        .groupBy { it.second.slug }
                    items(aggregated.keys.toList(), key = { it }) { slug ->
                        val offerings = aggregated[slug].orEmpty()
                        val label = offerings.firstOrNull()?.second?.name ?: slug
                        CurriculumCard(label, "Class 11 & 12 curriculum · ${offerings.size} tracks") {
                            offerings.firstOrNull()?.let { (offeredClass, offeredSubject) ->
                                selectedClassSlug = offeredClass.slug
                                selectedSubjectSlug = offeredSubject.slug
                            }
                        }
                    }
                }
            } else if (selectedClassSlug == null) {
                if (state.loading) item { LoadingMessage() }
                else if (state.error != null) item { ErrorMessage(state.error!!, viewModel::loadTree) }
                else {
                    if (state.fromCache) item { OfflineMessage() }
                    items(state.tree, key = { it.slug }) { row ->
                        CurriculumCard(row.name, "${row.subjects.size} subjects") { selectedClassSlug = row.slug }
                    }
                }
            } else if (klass == null) {
                if (state.loading || state.tree.isEmpty() && state.error == null) item { LoadingMessage() }
                else if (state.error != null) item { ErrorMessage(state.error!!, viewModel::loadTree) }
                else item { ErrorMessage("This class is not in the published syllabus.", viewModel::loadTree) }
            } else if (selectedSubjectSlug == null) {
                if (state.fromCache) item { OfflineMessage() }
                if (entry.surface == CurriculumSurface.SUBJECTS) {
                    items(state.tree.filter { it.slug != selectedClassSlug }, key = { it.slug }) { otherClass ->
                        CurriculumCard("Switch to ${otherClass.name}", "Browse ${otherClass.subjects.size} subjects") {
                            selectedClassSlug = otherClass.slug
                        }
                    }
                }
                items(klass.subjects, key = { it.slug }) { row ->
                    CurriculumCard(row.name, "Official NEB subject") { selectedSubjectSlug = row.slug }
                }
            } else if (subject == null) {
                item { ErrorMessage("This subject is not in the official syllabus for this class.", null) }
            } else if (entry.surface == CurriculumSurface.THEORY) {
                if (state.unitsFromCache || state.notesFromCache) item { OfflineMessage() }
                when {
                    state.notesLoading -> item { LoadingMessage("Loading published notes…") }
                    state.notesError != null -> item { ErrorMessage(state.notesError!!, { viewModel.loadNotes(subject.slug) }) }
                    state.notes.isEmpty() -> item {
                        EmptyMessage("No published notes yet", "The mobile notes catalog has no published entries for this subject.")
                    }
                    else -> items(state.notes, key = { it.id }) { note ->
                        val matchedUnit = state.units.firstOrNull { it.title.equals(note.chapter, ignoreCase = true) }
                        CurriculumCard(
                            note.title,
                            "${note.chapter} · ${note.noteCount} note sections",
                            enabled = matchedUnit != null,
                        ) {
                            matchedUnit?.let { onOpenUnit("${subject.slug}:${it.slug}") }
                        }
                    }
                }
                if (state.unitsLoading && state.notes.isNotEmpty()) item { LoadingMessage("Loading unit links…") }
            } else {
                if (state.unitsLoading) item { LoadingMessage("Loading syllabus units…") }
                else if (state.error != null) item { ErrorMessage(state.error!!, { viewModel.loadUnits(subject.slug, selectedClassSlug) }) }
                else {
                    if (state.unitsFromCache) item { OfflineMessage() }
                    if (state.units.isEmpty()) item {
                        EmptyMessage("No units published", "No units are available for this subject in the current syllabus feed.")
                    }
                    items(state.units, key = { it.id }) { unit ->
                        CurriculumCard(
                            "Unit ${unit.order} · ${unit.title}",
                            "${unit.topicCount} curriculum topics",
                        ) { onOpenUnit("${selectedClassSlug}:${subject.slug}:${unit.slug}") }
                    }
                }
            }
        }
    }
}

@Composable
private fun CurriculumCard(title: String, subtitle: String, enabled: Boolean = true, onClick: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth().clickable(enabled = enabled, onClick = onClick),
    ) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Spacer(Modifier.height(3.dp))
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                if (!enabled) Text("Unit detail is not available for this catalog entry", style = MaterialTheme.typography.labelSmall)
            }
            Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun LoadingMessage(message: String = "Loading curriculum…") {
    Row(Modifier.fillMaxWidth().padding(24.dp), horizontalArrangement = Arrangement.Center, verticalAlignment = Alignment.CenterVertically) {
        CircularProgressIndicator()
        Spacer(Modifier.width(12.dp))
        Text(message, style = MaterialTheme.typography.bodyMedium)
    }
}

@Composable
private fun OfflineMessage() {
    Row(Modifier.fillMaxWidth().padding(vertical = 4.dp), verticalAlignment = Alignment.CenterVertically) {
        Icon(Icons.Filled.CloudOff, contentDescription = null, modifier = Modifier.height(16.dp), tint = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.width(6.dp))
        Text("Offline — showing saved copy", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun ErrorMessage(message: String, retry: (() -> Unit)?) {
    Column(Modifier.fillMaxWidth().padding(16.dp)) {
        Text(message, color = MaterialTheme.colorScheme.error)
        if (retry != null) Button(onClick = retry, modifier = Modifier.padding(top = 8.dp)) { Text("Retry") }
    }
}

@Composable
private fun EmptyMessage(title: String, detail: String) {
    Column(Modifier.fillMaxWidth().padding(16.dp)) {
        Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
        Text(detail, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}
