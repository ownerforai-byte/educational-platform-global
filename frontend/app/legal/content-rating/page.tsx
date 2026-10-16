import type { Metadata } from "next";
import { LegalDoc } from "../legal-doc";

export const metadata: Metadata = {
  title: "Content Rating — Ravikisan's Platform",
  description:
    "Google Play Content Rating declaration for Ravikisan's Platform.",
};

export default function ContentRating() {
  return (
    <LegalDoc
      title="Content Rating"
      updated="14 October 2026"
      intro="This page summarizes the Google Play Content Rating questionnaire for Ravikisan's Platform."
      doc="content-rating"
    >
      <section>
        <h2>1. Content classification (IARC)</h2>
        <ul>
          <li><strong>Profanity</strong> — None</li>
          <li><strong>Alcohol/tobacco/drug use</strong> — None</li>
          <li><strong>Violence</strong> — None</li>
          <li><strong>Sexual content</strong> — None</li>
          <li><strong>Medical/scaring content</strong> — None</li>
          <li><strong>Horror</strong> — None</li>
          <li><strong>Mature themes</strong> — None</li>
        </ul>
      </section>

      <section>
        <h2>2. Monetization & Ads</h2>
        <ul>
          <li><strong>In-game Purchases / real-money value</strong> — As per app configuration (credits/premium if enabled; None if free)</li>
          <li><strong>Ads</strong> — No</li>
        </ul>
      </section>

      <section>
        <h2>3. Social</h2>
        <ul>
          <li><strong>Social features</strong> — No social layer</li>
        </ul>
      </section>

      <section>
        <h2>4. Expected rating</h2>
        <p><strong>Everyone</strong> (or <strong>Everyone 10+</strong> if in-app purchases are enabled)</p>
        <p><strong>Target audience</strong> — 13+ (secondary school / NEB +2 students)</p>
      </section>
    </LegalDoc>
  );
}
