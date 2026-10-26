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

  test("casual non-study questions stay generic (no loose catch-all)", () => {
    expect(classifyInquiryMode("do I have time for lunch?")).toBe("generic");
    expect(classifyInquiryMode("is it raining?")).toBe("generic");
  });

  test("advice-seeking questions classify advisory", () => {
    expect(classifyInquiryMode("which should I study first, physics or chemistry?")).toBe("advisory");
    expect(classifyInquiryMode("give me advice on my exam prep plan")).toBe("advisory");
    expect(classifyInquiryMode("is it a good idea to skip class tomorrow?")).toBe("advisory");
    expect(classifyInquiryMode("which option is better for me, CEE or a job?")).toBe("advisory");
  });

  test("academic + advice overlap stays academic (academic outranks advisory)", () => {
    expect(classifyInquiryMode("which NEB model is better for the derivation of lens maker formula?")).toBe("academic");
    expect(classifyInquiryMode("should I revise my proof before the exam?")).toBe("academic");
  });
});

describe("depthDirectiveForMode", () => {
  test("generic directive waives the word floor", () => {
    expect(depthDirectiveForMode("generic")).toMatch(/250-word floor/i);
    expect(depthDirectiveForMode("generic")).toMatch(/60–180 words/i);
  });

  test("academic directive includes the expert framework + biography + no-repeat", () => {
    const d = depthDirectiveForMode("academic");
    expect(d).toMatch(/biography/i);
    expect(d).toMatch(/Mermaid/i);
    expect(d).toMatch(/Explore further/i);
    expect(d).toMatch(/NO-REPEAT LAW/i);
    expect(d).toMatch(/units/i);
  });

  test("advisory directive waives the floor and shapes options", () => {
    const d = depthDirectiveForMode("advisory");
    expect(d).toMatch(/250-word floor/i);
    expect(d).toMatch(/recommendation/i);
    expect(d).toMatch(/100–220 words/i);
  });
});

describe("DEPTH_REGULATION_RULES", () => {
  test("documents all three modes for the model", () => {
    expect(DEPTH_REGULATION_RULES).toMatch(/GENERIC MODE/i);
    expect(DEPTH_REGULATION_RULES).toMatch(/ACADEMIC MODE/i);
    expect(DEPTH_REGULATION_RULES).toMatch(/ADVISORY MODE/i);
  });

  test("documents the no-repeat law and the academic-only floor", () => {
    expect(DEPTH_REGULATION_RULES).toMatch(/NO-REPEAT LAW/i);
    expect(DEPTH_REGULATION_RULES).toMatch(/APPLIES ONLY IN THIS MODE/i);
  });
});
