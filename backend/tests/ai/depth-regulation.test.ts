import { describe, expect, test } from "vitest";
import {
  classifyInquiryMode,
  depthDirectiveForMode,
  DEPTH_REGULATION_RULES,
} from "../../src/ai/depth-regulation";

describe("classifyInquiryMode", () => {
  test("generic greetings stay concise mode", () => {
    expect(classifyInquiryMode("Hello!")).toBe("generic");
    expect(classifyInquiryMode("Thanks for the help")).toBe("generic");
  });

  test("academic signals select deep mode", () => {
    expect(classifyInquiryMode("Derive the lens maker formula")).toBe("academic");
    expect(classifyInquiryMode("What is mitosis?")).toBe("academic");
    expect(classifyInquiryMode("Explain thermodynamics for NEB class 11")).toBe("academic");
  });
});

describe("depthDirectiveForMode", () => {
  test("generic directive waives the word floor", () => {
    expect(depthDirectiveForMode("generic")).toMatch(/250-word floor/i);
    expect(depthDirectiveForMode("generic")).toMatch(/60–180 words/i);
  });

  test("academic directive includes expert framework pillars", () => {
    const d = depthDirectiveForMode("academic");
    expect(d).toMatch(/Chronological evolution/i);
    expect(d).toMatch(/Mermaid/i);
    expect(d).toMatch(/Explore further/i);
  });
});

describe("DEPTH_REGULATION_RULES", () => {
  test("documents both modes for the model", () => {
    expect(DEPTH_REGULATION_RULES).toMatch(/GENERIC MODE/i);
    expect(DEPTH_REGULATION_RULES).toMatch(/ACADEMIC MODE/i);
  });
});
