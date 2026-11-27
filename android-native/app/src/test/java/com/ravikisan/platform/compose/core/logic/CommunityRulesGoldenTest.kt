package com.ravikisan.platform.compose.core.logic

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Golden vectors from the REAL website TypeScript
 * (`frontend/features/community/index.ts`, executed by
 * `android-native/golden/generate-golden.ts`). The catalog is injected
 * (web reads the static SYLLABUS); the golden carries the REAL catalog rows
 * so the port must reproduce `expected` exactly — parity plan §5.
 */
class CommunityRulesGoldenTest {

    private fun golden() = Golden.obj("community-golden.json")

    private fun JsonObject.toGoalSubject() = GoalSubject(
        key = str("key"),
        classSlug = str("classSlug"),
        className = str("className"),
        subjectSlug = str("subjectSlug"),
        subjectName = str("subjectName"),
    )

    private fun JsonObject.toSpace() = CommunitySpace(
        id = str("id"),
        title = str("title"),
        classSlug = str("classSlug"),
        className = str("className"),
        subjectSlug = str("subjectSlug"),
        subjectName = str("subjectName"),
        subjectHref = str("subjectHref"),
    )

    @Test
    fun `listCommunitySpaces reproduces the real catalog mapping`() {
        val c = golden().obj("spaces")
        val catalog = c.arr("catalog").jsonArray.map { it.jsonObject.toGoalSubject() }
        val result = listCommunitySpaces(catalog)
        val expected = c.arr("expected").jsonArray.map { it.jsonObject.toSpace() }
        assertEquals(expected, result)
    }

    @Test
    fun `getCommunitySpace hit and miss`() {
        val c = golden().obj("getSpace")
        val catalog = golden().obj("spaces").arr("catalog").jsonArray.map { it.jsonObject.toGoalSubject() }
        val hit = c.obj("hit")
        assertEquals(hit.obj("expected").toSpace(), getCommunitySpace(hit.str("id"), catalog))
        val miss = c.obj("miss")
        assertNull(getCommunitySpace(miss.str("id"), catalog))
    }

    @Test
    fun `buildAskPrompt matches TS truthiness on the subject prefix`() {
        val cases = golden().arr("askPrompt").jsonArray.map { it.jsonObject }
        for (c in cases) {
            assertEquals(c.str("expected"), buildAskPrompt(c.str("question"), c.strOrNull("subjectName")))
        }
    }

    @Test
    fun `validateQuestion matches TS boundaries`() {
        val cases = golden().obj("validateQuestion")
        assertEquals("Write a little more so the question is clear (at least 8 characters).", cases.obj("short").str("expected").let {
            validateQuestion(cases.obj("short").str("q"))
        })
        assertNull(validateQuestion(cases.obj("exactly8").str("q")))
        assertEquals("Keep the question under 1000 characters.", validateQuestion(cases.obj("long").str("q")))
        assertNull(validateQuestion(cases.obj("valid").str("q")))
    }
}
