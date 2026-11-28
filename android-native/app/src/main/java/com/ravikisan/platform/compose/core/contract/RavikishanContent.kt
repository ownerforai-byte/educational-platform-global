package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

/**
 * Wire DTO for the WEBSITE content API `GET /api/ravikishan-notes?path=<key>`
 * (`backend/src/api/content/ravikishan-notes.controller.ts` — the same route
 * `frontend/lib/api/content.ts` uses for classified content files). The
 * response body is the RAW content file (NOT the mobile `{ ok, data }`
 * wrapper), so unknown paths are signalled by the HTTP status (404), never
 * the body.
 *
 * WAVE 1 (class-12 science theory surface): the PYQ bank files
 * (`practice/questions/class-12/<subject>/<unit>/NN-neb-YYYY.json`) carry
 * `questions[].solution` — the worked solutions the website's theory page
 * (`frontend/features/syllabus/components/theory-section-view.tsx` →
 * `getSubjectPyqBank`) renders as step-by-step PYQ year cards. The mobile
 * `/api/mobile/pyqs/file` endpoint serves question LINES only
 * (`MobilePyqFileDto.questions: List<String>`) and drops solutions, so this
 * existing endpoint is the only landed contract that carries the solution
 * payload. Pair it with the `/api/mobile/pyqs` catalog (path/year/unit rows,
 * filtered by class+subject) to reproduce the website's year aggregation
 * with zero new backend work.
 *
 * ADDITIVE + shape-tolerant: classified files vary (theory banks carry
 * `notes`, PYQ banks carry `questions`, textbooks carry extra keys), so every
 * field is optional/defaulted and the shared `Json { ignoreUnknownKeys = true }`
 * converter tolerates the rest.
 */
@Serializable
data class RavikishanContentFile(
    val title: String? = null,
    val year: Int? = null,
    val examSource: String? = null,
    val unitSlug: String? = null,
    /** Theory-block banks (`notes/theory/…`): authored section blocks. */
    val notes: List<String> = emptyList(),
    /** Theory-block banks: optional long-form detail alongside the blocks. */
    val detail: String? = null,
    /** PYQ bank files (`practice/questions/…`): question + marks + solution. */
    val questions: List<RavikishanQuestionDto> = emptyList(),
)

@Serializable
data class RavikishanQuestionDto(
    val question: String = "",
    /** Authored as string OR number across banks — kept raw for the reader. */
    val marks: JsonElement? = null,
    /** Worked step-by-step solution (Markdown/LaTeX) — the parity payload. */
    val solution: String? = null,
)
