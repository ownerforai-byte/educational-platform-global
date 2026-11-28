package com.ravikisan.platform.compose.data.session

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Account-scoped storage namespaces (`lib/state/scoped-storage.ts` port):
 * the website keys records as `<base>:<scope>` (`u:<id>` / `anon:<id>`);
 * the native personal store requires `[a-z0-9_-]{1,64}`, so both `:` fold to
 * `-` and the suffix is sanitized + truncated to keep the record valid.
 */
class AccountScopeTest {

    @Test
    fun `signed-in scope folds into a valid namespace`() {
        assertEquals(
            "neb-my-notes-v1-u-1073abcd",
            scopedNamespace("neb-my-notes-v1", "u:1073ABCD"),
        )
    }

    @Test
    fun `anonymous scope is stable and valid`() {
        assertEquals(
            "neb-srs-v1-anon-5f2c",
            scopedNamespace("neb-srs-v1", "anon:5f2c"),
        )
    }

    @Test
    fun `long user ids are truncated to the store's 64-char contract`() {
        val ns = scopedNamespace("neb-my-notes-v1", "u:" + "a".repeat(80))
        assertTrue(ns.length <= 64)
        assertTrue(ns.matches(Regex("[a-z0-9_-]{1,64}")))
        assertTrue(ns.startsWith("neb-my-notes-v1-"))
    }

    @Test
    fun `hostile id characters never break the namespace`() {
        val ns = scopedNamespace("neb-offline-packs-v1", "u:bad/id with spaces")
        assertTrue(ns.matches(Regex("[a-z0-9_-]{1,64}")))
        assertEquals("neb-offline-packs-v1-u-bad-id-with-spaces", ns)
    }
}
