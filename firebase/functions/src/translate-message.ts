import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

/**
 * Automatically translate chat messages in Firestore.
 * Triggered when a message is created or updated in
 * `realtime_chats/{roomId}/messages/{messageId}`.
 *
 * Replaces the `firebase/firestore-translate-text` extension.
 * Uses the Google Cloud Translation API (Basic / v2) via REST.
 *
 * The translated text is written back to the same document under
 * `translations.{targetLang}` so the client can read it directly.
 *
 * Optional: set GOOGLE_TRANSLATE_API_KEY in `firebase/functions/.env` or
 * via `firebase functions:secrets:set GOOGLE_TRANSLATE_API_KEY`.
 * When unset, the function falls back to the `@google-cloud/translate`
 * client library using default application credentials.
 */

/** Target languages for auto-translation. */
const TARGET_LANGUAGES = ["en", "hi", "ne"] as const;

/** Source language field on the message doc (optional — auto-detected if missing). */
const SOURCE_LANG_FIELD = "lang";

/** Firestore field where translations are stored. */
const TRANSLATIONS_FIELD = "translations";

/** Meta field to prevent infinite write loops. */
const TRANSLATED_BY = "__translatedBy";

export const translateChatMessage = onDocumentWritten(
  {
    document: "realtime_chats/{roomId}/messages/{messageId}",
    region: "asia-south1",
  },
  async (event) => {
    const afterSnap = event.data?.after;
    if (!afterSnap || !afterSnap.exists) {
      logger.info("[translate] document deleted — skipping");
      return;
    }

    const data = afterSnap.data();
    if (!data) {
      logger.info("[translate] no data on snapshot — skipping");
      return;
    }

    const text = typeof data.text === "string" ? data.text.trim() : "";

    if (!text) {
      logger.info("[translate] empty text — skipping");
      return;
    }

    // Prevent infinite loop: skip if we just wrote translations
    if (data[TRANSLATED_BY] === "translateChatMessage") {
      return;
    }

    // Skip if translations already exist and text hasn't changed
    const beforeSnap = event.data?.before;
    if (beforeSnap && beforeSnap.exists) {
      const beforeData = beforeSnap.data();
      if (
        beforeData &&
        beforeData.text === data.text &&
        data[TRANSLATIONS_FIELD] &&
        Object.keys(data[TRANSLATIONS_FIELD] as Record<string, unknown>).length >=
          TARGET_LANGUAGES.length
      ) {
        logger.info("[translate] text unchanged and translations exist — skipping");
        return;
      }
    }

    const sourceLang =
      typeof data[SOURCE_LANG_FIELD] === "string"
        ? (data[SOURCE_LANG_FIELD] as string)
        : undefined;

    const apiKey = (process.env.GOOGLE_TRANSLATE_API_KEY ?? "").trim();

    const translations: Record<string, string> = {};

    if (apiKey) {
      // Use Google Translate REST API v2 with API key
      await Promise.all(
        TARGET_LANGUAGES.map(async (targetLang) => {
          // Skip translating to the source language
          if (sourceLang === targetLang) {
            translations[targetLang] = text;
            return;
          }

          try {
            const url = new URL(
              "https://translation.googleapis.com/language/translate/v2",
            );
            url.searchParams.set("key", apiKey);

            const res = await fetch(url.toString(), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                q: text,
                target: targetLang,
                ...(sourceLang ? { source: sourceLang } : {}),
                format: "text",
              }),
            });

            if (!res.ok) {
              const errText = await res.text().catch(() => "");
              logger.warn("[translate] API error", {
                targetLang,
                status: res.status,
                detail: errText.slice(0, 200),
              });
              return;
            }

            const json = (await res.json()) as {
              data?: { translations?: Array<{ translatedText?: string }> };
            };
            const translated = json.data?.translations?.[0]?.translatedText;
            if (translated) {
              translations[targetLang] = translated;
            }
          } catch (err) {
            logger.warn("[translate] fetch failed", {
              targetLang,
              detail: err instanceof Error ? err.message : String(err),
            });
          }
        }),
      );
    } else {
      // No API key — use @google-cloud/translate with default credentials
      try {
        const { Translate } = await import("@google-cloud/translate/build/src/v2");
        const translate = new Translate();

        await Promise.all(
          TARGET_LANGUAGES.map(async (targetLang) => {
            if (sourceLang === targetLang) {
              translations[targetLang] = text;
              return;
            }
            try {
              const [result] = await translate.translate(text, targetLang);
              translations[targetLang] = result;
            } catch (err) {
              logger.warn("[translate] client lib failed", {
                targetLang,
                detail: err instanceof Error ? err.message : String(err),
              });
            }
          }),
        );
      } catch (err) {
        logger.error(
          "[translate] @google-cloud/translate not available and no API key set",
          {
            detail: err instanceof Error ? err.message : String(err),
          },
        );
        return;
      }
    }

    if (Object.keys(translations).length === 0) {
      logger.warn("[translate] no translations produced");
      return;
    }

    // Write translations back to the document
    const { getFirestoreAdmin } = await import("./firestore");
    await getFirestoreAdmin()
      .doc(afterSnap.ref.path)
      .update({
        [TRANSLATIONS_FIELD]: translations,
        [TRANSLATED_BY]: "translateChatMessage",
      });

    logger.info("[translate] done", {
      messageId: event.params.messageId,
      roomId: event.params.roomId,
      languages: Object.keys(translations),
    });
  },
);
