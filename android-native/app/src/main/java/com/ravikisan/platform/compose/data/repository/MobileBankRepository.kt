package com.ravikisan.platform.compose.data.repository

import com.ravikisan.platform.compose.core.contract.MobilePyqItemDto
import com.ravikisan.platform.compose.core.logic.BankPyqQuestion
import com.ravikisan.platform.compose.core.logic.BankPyqYear
import com.ravikisan.platform.compose.core.logic.FormulaSheetTopic
import com.ravikisan.platform.compose.core.logic.FormulaSheetUnit
import com.ravikisan.platform.compose.core.logic.SubjectPyqBank
import com.ravikisan.platform.compose.core.logic.resolveUnitSlug
import com.ravikisan.platform.compose.data.api.RnApi
import com.ravikisan.platform.compose.data.session.SessionStore
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Real data source for the Wave 1 bank seams (/srs cards, /downloads packs,
 * /mock-exams written section) over the already-landed mobile endpoints:
 *
 * - `GET /api/mobile/pyqs` (+ `/file`) — the same generated content manifest
 *   the website's `getSubjectPyqBank` reads (practice/questions entries).
 * - `GET /api/mobile/formulas` (+ `/file`) — the same formulas entries
 *   the website's formula sheets build from.
 *
 * Both families are `requireAuth` + `requireTier("plus")` on the backend
 * (mirroring the website's minLevel "plus" for /pyqs and /formulas), so the
 * session Bearer token is attached per call via [SessionStore]; when there is
 * no session the source reports no bank (the screen then shows the website's
 * honest empty state — the website gates the whole route the same way).
 *
 * Honest scope note: the mobile endpoints expose question/formula LINES only.
 * The website bank additionally carries authored theory blocks and concept
 * drills (content/notes/theory and content/drills entries); those have no
 * mobile endpoint yet, so a mobile-built bank holds `pyqs` only — a genuine
 * but smaller deck than the website for the same subject.
 */
@Singleton
class MobileBankRepository @Inject constructor(
    private val api: RnApi,
    private val session: SessionStore,
) {

    /** Auth header for the gated endpoints, or null when signed out. */
    private fun bearer(): String? = session.getAccessToken()?.let { "Bearer $it" }

    /** `class-11-notes/physics` → manifest class dir `class-11` + subject `physics`. */
    private fun splitKey(subjectKey: String): Pair<String, String> {
        val (classSlug, subjectSlug) = subjectKey.split("/", limit = 2).let {
            it.getOrElse(0) { "" } to it.getOrElse(1) { "" }
        }
        // The manifest path uses `class-11` / `class-12`; the website key is
        // `class-11-notes` / `class-12-notes` (syllabus track slugs).
        return classSlug.removeSuffix("-notes") to subjectSlug
    }

    /**
     * Subject PYQ bank for `classSlug/subjectSlug`, newest year first — the
     * shape `core/logic/Bank.kt::SubjectPyqBank` expects. Null when the
     * subject has no indexed PYQ files or the gated endpoint is unavailable.
     *
     * Every catalog row's file is read (the catalog's `questionCount` only
     * mirrors the manifest's `notes` mirror, which the real files do not
     * carry); files that yield no lines drop out. Rows are then AGGREGATED
     * BY YEAR across files — one card per exam year with the unit list
     * merged, exactly like the website's `getSubjectPyqBank` buckets
     * (`frontend/features/pyqs/pyq-bank.ts`), because one NEB paper draws
     * questions from several unit folders.
     */
    suspend fun subjectPyqBank(subjectKey: String): SubjectPyqBank? {
        val (classDir, subjectSlug) = splitKey(subjectKey)
        if (classDir.isEmpty() || subjectSlug.isEmpty()) return null
        val auth = bearer() ?: return null // plus-tier gate: signed out → no bank
        val rows = runCatching { loadPyqRows(classDir, subjectSlug, auth) }.getOrDefault(emptyList())
        if (rows.isEmpty()) return null

        // year → { questions, units, titles } — the website's YearBucket.
        class YearBucket {
            val questions = ArrayList<String>()
            val units = LinkedHashSet<String>()
            val titles = LinkedHashSet<String>()
        }
        val byYear = LinkedHashMap<Int, YearBucket>()
        for (row in rows) {
            val file = runCatching { api.mobilePyqFile(row.id, auth) }.getOrNull()
            val questions = file?.body()?.data?.questions.orEmpty()
                .filter { it.isNotBlank() }
            if (questions.isEmpty()) continue
            val bucket = byYear.getOrPut(row.year ?: 0) { YearBucket() }
            bucket.questions.addAll(questions)
            row.unit?.let { bucket.units.add(it) }
            row.title.takeIf { it.isNotBlank() }?.let { bucket.titles.add(it) }
        }
        if (byYear.isEmpty()) return null

        val years = byYear.map { (year, bucket) ->
            BankPyqYear(
                year = year,
                title = bucketTitle(year, bucket.titles),
                units = bucket.units.toList(),
                questions = bucket.questions.map { BankPyqQuestion(question = it) },
            )
        }
        // Website bank contract: pyqs sorted newest first.
        return SubjectPyqBank(pyqs = years.sortedByDescending { it.year })
    }

    /**
     * Website bucket-title rule: a year can span several unit files, so a
     * unit-specific card title would be wrong — fall back to the titles'
     * longest shared meaningful prefix plus the year (else `NEB <year>`).
     */
    private fun bucketTitle(year: Int, titles: Set<String>): String = when (titles.size) {
        0 -> "NEB $year"
        1 -> titles.first()
        else -> commonPrefix(titles).takeIf { it.isNotEmpty() }?.let { "$it — $year" } ?: "NEB $year"
    }

    /**
     * Port of the website's `commonPrefix`: longest shared leading substring
     * of the titles, trimmed of trailing separators; "" below 4 meaningful
     * characters (a one-letter prefix is noise, not a card title).
     */
    private fun commonPrefix(titles: Set<String>): String {
        if (titles.isEmpty()) return ""
        val list = titles.toList()
        var prefix = list[0]
        for (title in list.drop(1)) {
            var i = 0
            while (i < prefix.length && i < title.length && prefix[i] == title[i]) i++
            prefix = prefix.take(i)
            if (prefix.isEmpty()) return ""
        }
        val trimmed = prefix.trimEnd(' ', '—', '–', '-', ':', '|', '/')
        return if (trimmed.length >= 4) trimmed else ""
    }

    /** Catalog rows for one class+subject, following cursor pages (bounded). */
    private suspend fun loadPyqRows(
        classDir: String,
        subjectSlug: String,
        auth: String?,
    ): List<MobilePyqItemDto> {
        val rows = ArrayList<MobilePyqItemDto>()
        var cursor: String? = null
        repeat(MAX_PAGES) {
            val response = api.mobilePyqs(
                classDir = classDir,
                subject = subjectSlug,
                limit = PAGE_LIMIT,
                cursor = cursor,
                authorization = auth,
            )
            val page = response.body()?.data ?: return rows
            rows += page.items
            cursor = page.nextCursor ?: return rows
        }
        return rows
    }

    /**
     * Formula sheet for one unit (the /downloads unit pack's formula input),
     * or null when the subject/unit has none or the endpoint is unavailable.
     * `unitSlug` comes from the syllabus units endpoint; manifest folders may
     * use short-form aliases, resolved through the shared alias table.
     */
    suspend fun formulaUnit(
        subjectKey: String,
        unitSlug: String,
    ): FormulaSheetUnit? {
        val (classDir, subjectSlug) = splitKey(subjectKey)
        if (classDir.isEmpty() || subjectSlug.isEmpty() || unitSlug.isEmpty()) return null
        val auth = bearer() ?: return null // plus-tier gate: signed out → no sheet
        val response = runCatching {
            api.mobileFormulas(
                classDir = classDir,
                subject = subjectSlug,
                unit = unitSlug,
                limit = PAGE_LIMIT,
                authorization = auth,
            )
        }.getOrNull()
        val rows = response?.body()?.data?.items.orEmpty()
        val row = rows.firstOrNull { resolveUnitSlug(it.unit) == resolveUnitSlug(unitSlug) }
            ?: return null
        val file = runCatching { api.mobileFormulaFile(row.id, auth) }.getOrNull()
        val formulas = file?.body()?.data?.formulas.orEmpty().filter { it.isNotBlank() }
        if (formulas.isEmpty()) return null
        return FormulaSheetUnit(
            id = row.unit,
            title = file?.body()?.data?.title?.ifBlank { row.title } ?: row.title,
            topics = listOf(FormulaSheetTopic(title = row.title, formulas = formulas)),
        )
    }

    private companion object {
        /** `parseCursorPagination` clamps to 50; walk at most a few pages. */
        const val PAGE_LIMIT = 50
        const val MAX_PAGES = 4
    }
}
