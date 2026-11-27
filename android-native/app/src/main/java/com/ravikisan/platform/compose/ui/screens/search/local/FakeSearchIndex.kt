package com.ravikisan.platform.compose.ui.screens.search.local

import com.ravikisan.platform.compose.core.logic.ResultKind
import com.ravikisan.platform.compose.core.logic.SearchEntry
import com.ravikisan.platform.compose.ui.screens.study.local.FakeNotes
import com.ravikisan.platform.compose.ui.screens.study.local.FakeSyllabus

/**
 * Local fake search index (Agent 4 task 3) — built from the study feature's
 * fakes so search and syllabus always agree on unit ids. Replaced by the
 * API-backed index when the Supervisor orders the fake→real swap.
 */
object FakeSearchIndex {

    fun index(): List<SearchEntry> {
        val entries = mutableListOf<SearchEntry>()
        FakeSyllabus.classes.forEach { klass ->
            klass.subjects.forEach { subject ->
                subject.units.forEach { unit ->
                    entries += SearchEntry(
                        kind = ResultKind.UNIT,
                        unitId = unit.id,
                        className = klass.name,
                        subjectName = subject.name,
                        unitTitle = unit.title,
                        matchText = unit.title,
                        snippet = unit.topics.firstOrNull() ?: subject.description,
                    )
                    unit.topics.forEach { topic ->
                        entries += SearchEntry(
                            kind = ResultKind.TOPIC,
                            unitId = unit.id,
                            className = klass.name,
                            subjectName = subject.name,
                            unitTitle = unit.title,
                            matchText = topic,
                            snippet = topic,
                        )
                    }
                    val note = FakeNotes.forUnit(unit.id)
                    // Intro paragraph as a NOTE entry — makes unit-level prose searchable
                    // (e.g. "kinematics" matches the intro even though no topic does).
                    if (note.intro.isNotBlank()) {
                        entries += SearchEntry(
                            kind = ResultKind.NOTE,
                            unitId = unit.id,
                            className = klass.name,
                            subjectName = subject.name,
                            unitTitle = unit.title,
                            matchText = note.intro,
                            snippet = note.intro,
                        )
                    }
                    note.sections.forEach { (heading, paragraphs) ->
                        entries += SearchEntry(
                            kind = ResultKind.NOTE,
                            unitId = unit.id,
                            className = klass.name,
                            subjectName = subject.name,
                            unitTitle = unit.title,
                            matchText = heading,
                            snippet = paragraphs.firstOrNull() ?: heading,
                        )
                    }
                }
            }
        }
        return entries
    }
}
