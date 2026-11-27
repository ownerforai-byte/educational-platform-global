package com.ravikisan.platform.compose.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material.icons.filled.Forum
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.ravikisan.platform.compose.core.contract.MobileClassDto
import com.ravikisan.platform.compose.data.repository.RecentUnit

/**
 * Home dashboard — the app's cold-start surface, fully wired to the real API:
 * - auth state banner (validated against `/api/auth/me`, sign-in → `auth`);
 * - search bar → `search`;
 * - continue-studying row from device-local recents → `study/{unitId}`;
 * - subject/class quick-launch cards (live syllabus tree) → `learn`;
 * - quick links to Practice, Veer AI and Community.
 */
@Composable
fun HomeScreen(
    onOpenSearch: () -> Unit = {},
    onOpenUnit: (unitId: String) -> Unit = {},
    onOpenLearn: () -> Unit = {},
    onOpenPractice: () -> Unit = {},
    onOpenAiTutor: () -> Unit = {},
    onOpenCommunity: () -> Unit = {},
    onOpenAuth: () -> Unit = {},
    viewModel: HomeViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    LaunchedEffect(Unit) { viewModel.refresh() }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
    ) {
        item { Header(state.user?.fullName) }

        item {
            AuthBanner(
                user = state.user,
                sessionChecked = state.sessionChecked,
                onOpenAuth = onOpenAuth,
            )
        }

        item {
            SearchBarCard(onClick = onOpenSearch)
        }

        if (state.recents.isNotEmpty()) {
            item { SectionTitle("Continue studying", Icons.Filled.History) }
            items(state.recents, key = { "recent-${it.id}" }) { recent ->
                RecentUnitCard(recent = recent, onClick = { onOpenUnit(recent.id) })
            }
        }

        item { SectionTitle("Quick links", Icons.Filled.AutoAwesome) }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                QuickLinkTile("Practice", Icons.Filled.Quiz, Modifier.weight(1f), onOpenPractice)
                QuickLinkTile("Veer AI", Icons.Filled.AutoAwesome, Modifier.weight(1f), onOpenAiTutor)
                QuickLinkTile("Community", Icons.Filled.Forum, Modifier.weight(1f), onOpenCommunity)
            }
        }

        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                SectionTitle("Study by class", Icons.Filled.MenuBook)
                Spacer(Modifier.weight(1f))
                Text(
                    "Open syllabus",
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.clickable(onClick = onOpenLearn),
                )
            }
        }

        when {
            state.loading && state.classes.isEmpty() -> item { LoadingRow() }
            state.error != null && state.classes.isEmpty() -> item {
                ErrorCard(message = state.error!!, onRetry = viewModel::refresh)
            }
            else -> {
                if (state.fromCache) {
                    item { OfflineBanner() }
                }
                items(state.classes, key = { it.slug }) { klass ->
                    ClassCard(klass = klass, onClick = onOpenLearn)
                }
            }
        }
    }
}

@Composable
private fun Header(name: String?) {
    Column {
        Text("Ravikisan", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
        Text(
            if (name != null) "Namaste, $name — ready to study?"
            else "Notes, practice and Veer — for Nepali students.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun AuthBanner(
    user: com.ravikisan.platform.compose.core.contract.UserDto?,
    sessionChecked: Boolean,
    onOpenAuth: () -> Unit,
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (user != null) MaterialTheme.colorScheme.primary.copy(alpha = 0.08f)
            else MaterialTheme.colorScheme.surfaceVariant,
        ),
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Icon(
                Icons.Filled.Person,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(22.dp),
            )
            Spacer(Modifier.width(10.dp))
            Column(Modifier.weight(1f)) {
                Text(
                    when {
                        user != null -> "Signed in as ${user.fullName ?: user.email ?: "student"}"
                        sessionChecked -> "Sign in to sync progress and chat with Veer"
                        else -> "Checking your session…"
                    },
                    style = MaterialTheme.typography.bodyMedium,
                    fontWeight = FontWeight.SemiBold,
                )
                if (user == null && sessionChecked) {
                    Text(
                        "Your notes, quizzes and community feed work offline too.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            if (user == null && sessionChecked) {
                Button(onClick = onOpenAuth) { Text("Sign in") }
            }
        }
    }
}

@Composable
private fun SearchBarCard(onClick: () -> Unit) {
    OutlinedTextField(
        value = "",
        onValueChange = {},
        readOnly = true,
        enabled = false,
        placeholder = { Text("Search units, topics, notes…") },
        leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
        colors = OutlinedTextFieldDefaults.colors(
            disabledTextColor = MaterialTheme.colorScheme.onSurfaceVariant,
            disabledBorderColor = MaterialTheme.colorScheme.outline,
            disabledPlaceholderColor = MaterialTheme.colorScheme.onSurfaceVariant,
            disabledLeadingIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
        ),
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
    )
}

@Composable
private fun SectionTitle(title: String, icon: ImageVector) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary, modifier = Modifier.size(18.dp))
        Spacer(Modifier.width(6.dp))
        Text(title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
    }
}

@Composable
private fun RecentUnitCard(recent: RecentUnit, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(
                Icons.Filled.MenuBook,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(20.dp),
            )
            Spacer(Modifier.width(10.dp))
            Column {
                Text(recent.title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                Text(
                    "Pick up where you left off",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}

@Composable
private fun QuickLinkTile(
    label: String,
    icon: ImageVector,
    modifier: Modifier = Modifier,
    onClick: () -> Unit,
) {
    Card(
        modifier = modifier.clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 14.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.height(6.dp))
            Text(label, style = MaterialTheme.typography.labelMedium)
        }
    }
}

@Composable
private fun ClassCard(klass: MobileClassDto, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
    ) {
        Column(Modifier.padding(16.dp)) {
            Text(klass.name, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
            Spacer(Modifier.height(4.dp))
            Text(
                klass.subjects.joinToString(" · ") { it.name },
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
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

@Composable
private fun OfflineBanner() {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
            Icons.Filled.CloudOff,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.size(16.dp),
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
private fun ErrorCard(message: String, onRetry: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer),
    ) {
        Column(Modifier.padding(16.dp)) {
            Text(message, color = MaterialTheme.colorScheme.onErrorContainer)
            Spacer(Modifier.height(8.dp))
            Button(onClick = onRetry) { Text("Retry") }
        }
    }
}
