package com.ravikisan.platform.compose.ui.screens.pyqs

import androidx.lifecycle.ViewModel
import com.ravikisan.platform.compose.ui.screens.pyqs.local.FakePyqBank
import com.ravikisan.platform.compose.ui.screens.pyqs.local.PyqBankSource
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * PYQs ViewModel — synchronous over an injectable [PyqBankSource] (fake today,
 * Worker 2's repository later), so it unit-tests on the JVM exactly like the
 * search/practice VMs did before their swap.
 *
 * Parity note: the website gates /pyqs at `minLevel: "plus"`
 * (frontend/lib/core/navigation.ts). Tier enforcement belongs to the data
 * layer when the real source lands (Worker 3 parity task 11) — the UI here
 * renders whatever the source authorizes, and never invents a gate.
 */
data class PyqsHubUiState(
    val subjects: List<PyqSubjectSummary> = emptyList(),
)

data class PyqSubjectUiState(
    val loading: Boolean = false,
    val classSlug: String = "",
    val subjectSlug: String = "",
    val subjectName: String = "",
    val bank: SubjectPyqBank? = null,
)

class PyqsViewModel(
    private val source: PyqBankSource = FakePyqBank(),
) : ViewModel() {

    private val _hub = MutableStateFlow(PyqsHubUiState())
    val hub: StateFlow<PyqsHubUiState> = _hub.asStateFlow()

    private val _subject = MutableStateFlow(PyqSubjectUiState())
    val subject: StateFlow<PyqSubjectUiState> = _subject.asStateFlow()

    init {
        _hub.value = PyqsHubUiState(subjects = source.subjects())
    }

    /** Called on navigation into `pyq/{classSlug}/{subjectSlug}`. */
    fun openSubject(classSlug: String, subjectSlug: String) {
        if (_subject.value.classSlug == classSlug && _subject.value.subjectSlug == subjectSlug) return
        _subject.value = PyqSubjectUiState(
            loading = true,
            classSlug = classSlug,
            subjectSlug = subjectSlug,
            subjectName = subjectSlug.replaceFirstChar { it.uppercase() },
        )
        val bank = source.bank(classSlug, subjectSlug)
        _subject.value = if (bank == null) {
            // Honest empty state — no invented content (same rule as the reader).
            PyqSubjectUiState(
                classSlug = classSlug,
                subjectSlug = subjectSlug,
                subjectName = subjectSlug.replaceFirstChar { it.uppercase() },
            )
        } else {
            PyqSubjectUiState(
                classSlug = classSlug,
                subjectSlug = subjectSlug,
                subjectName = subjectSlug.replaceFirstChar { it.uppercase() },
                bank = bank,
            )
        }
    }

    fun closeSubject() {
        _subject.value = PyqSubjectUiState()
    }
}
