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
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
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
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.core.contract.MobileSubjectDto
import com.ravikisan.platform.compose.core.contract.MobileUnitDto

/**
 * Syllabus drill-down: class → subject → unit lists.
 *
 * REAL DATA (fake→real swap, study phase 1): the class/subject tree comes from
 * `GET /api/mobile/syllabus` and the units of a subject from
 * `GET /api/mobile/units?subject=<slug>`, both through [SyllabusViewModel] →
 * [com.ravikisan.platform.compose.data.repository.SyllabusRepository] with the
 * Room cache serving airplane mode (offline banner via [OfflineBanner]).
 * Tapping a unit fires [onOpenUnit] with `<subjectSlug>:<unitSlug>` — the
 * route string stays a single segment so navigation is untouched.
 *
 * Fakes (`local/FakeSyllabus`) are for unit tests only — never rendered here.
 */
@Composable
fun SyllabusScreen(
    onOpenUnit: (unitId: String) -> Unit = {},
    viewModel: SyllabusViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    // Drill-down state survives process death and bottom-bar tab switches.
    var selectedClassSlug by rememberSaveable { mutableStateOf<String?>(null) }
    var selectedSubjectSlug by rememberSaveable { mutableStateOf<String?>(null) }

    LaunchedEffect(Unit) { viewModel.loadTree() }

    val selectedClass = state.tree.firstOrNull { it.slug == selectedClassSlug }
    val selectedSubject = selectedClass?.subjects?.firstOrNull { it.slug == selectedSubjectSlug }

    // Load units when entering level 3; clear them on the way back.
    LaunchedEffect(selectedSubjectSlug) {
        if (selectedSubjectSlug != null) viewModel.loadUnits(selectedSubjectSlug!!)
    }

    when {
        selectedClass == null -> ClassList(
            state = state,
            onPickClass = { selectedClassSlug = it },
            onRetry = viewModel::loadTree,
        )
        selectedSubject == null -> SubjectList(
            klass = selectedClass,
            onBack = {
                selectedClassSlug = null
            },
            onPickSubject = { selectedSubjectSlug = it },
        )
        else -> UnitList(
            state = state,
            klass = selectedClass,
            subject = selectedSubject,
            onBack = {
                selectedSubjectSlug = null
                viewModel.closeUnits()
            },
            onOpenUnit = onOpenUnit,
        )
    }
}

@Composable
private fun ClassList(
    state: SyllabusUiState,
    onPickClass: (String) -> Unit,
    onRetry: () -> Unit,
) {
    ScreenScaffold(title = "Syllabus", subtitle = "Choose a class") {
        when {
            state.loading -> item {
                LoadingRow()
            }
            state.error != null -> item {
                ErrorCard(message = state.error!!, onRetry = onRetry)
            }
            else -> {
                if (state.fromCache) item { OfflineBanner() }
                items(state.tree, key = { it.slug }) { klass ->
                    ListCard(
                        title = klass.name,
                        subtitle = "${klass.subjects.size} subjects",
                        onClick = { onPickClass(klass.slug) },
                    )
                }
            }
        }
    }
}

@Composable
private fun SubjectList(
    klass: MobileClassDto,
    onBack: () -> Unit,
    onPickSubject: (String) -> Unit,
) {
    ScreenScaffold(
        title = klass.name,
        subtitle = "Choose a subject",
        onBack = onBack,
    ) {
        items(klass.subjects, key = { it.slug }) { subject ->
            ListCard(
                title = subject.name,
                subtitle = "Open units",
                onClick = { onPickSubject(subject.slug) },
            )
        }
    }
}

@Composable
private fun UnitList(
    state: SyllabusUiState,
    klass: MobileClassDto,
    subject: MobileSubjectDto,
    onBack: () -> Unit,
    onOpenUnit: (String) -> Unit,
) {
    ScreenScaffold(
        title = subject.name,
        subtitle = "${klass.name} · official NEB curriculum order",
        onBack = onBack,
    ) {
        when {
            state.unitsLoading -> item { LoadingRow() }
            state.error != null -> item { ErrorCard(message = state.error!!, onRetry = null) }
            else -> {
                if (state.unitsFromCache) item { OfflineBanner() }
                items(state.units, key = { it.id }) { unit ->
                    ListCard(
                        title = unit.title,
                        subtitle = buildString {
                            append("${unit.topicCount} topics")
                            append(" · unit ${unit.order}")
                        },
                        onClick = { onOpenUnit("${subject.slug}:${unit.slug}") },
                    )
                }
            }
        }
    }
}

@Composable
private fun LoadingRow() {
    Row(
        modifier = Modifier.fillMaxWidth().padding(24.dp),
        horizontalArrangement = Arrangement.Center,
    ) {
        CircularProgressIndicator()
    }
}

/** Honest offline marker: the list came from the Room cache, not the network. */
@Composable
private fun OfflineBanner() {
    Row(
        modifier = Modifier.fillMaxWidth().padding(bottom = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(
            Icons.Filled.CloudOff,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.height(16.dp),
        )
        Spacer(Modifier.width(6.dp))
        Text(
            "Offline — showing saved copy",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun ErrorCard(message: String, onRetry: (() -> Unit)?) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.errorContainer,
        ),
    ) {
        Column(Modifier.padding(16.dp)) {
            Text(message, color = MaterialTheme.colorScheme.onErrorContainer)
            if (onRetry != null) {
                Spacer(Modifier.height(8.dp))
                Text(
                    "Tap to retry",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onErrorContainer,
                    modifier = Modifier.clickable(onClick = onRetry),
                )
            }
        }
    }
}

/** Shared list scaffold for all three drill-down levels. */
@Composable
private fun ScreenScaffold(
    title: String,
    subtitle: String,
    onBack: (() -> Unit)? = null,
    content: androidx.compose.foundation.lazy.LazyListScope.() -> Unit,
) {
    Column(Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            if (onBack != null) {
                IconButton(onClick = onBack) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                }
                Spacer(Modifier.width(4.dp))
            }
            Column {
                Text(title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Text(
                    subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 16.dp, vertical = 8.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            content = content,
        )
    }
}

@Composable
private fun ListCard(
    title: String,
    subtitle: String,
    onClick: () -> Unit,
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(Modifier.weight(1f)) {
                Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Spacer(Modifier.height(2.dp))
                Text(
                    subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            Icon(
                Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

/** Small helper chip used by previews and (later) the unit header. */
@Composable
fun UnitHoursChip(hours: Int?) {
    AssistChip(
        onClick = {},
        label = { Text(hours?.let { "$it hours" } ?: "hours n/a") },
        leadingIcon = { Icon(Icons.Filled.MenuBook, contentDescription = null, Modifier.height(18.dp)) },
    )
}
