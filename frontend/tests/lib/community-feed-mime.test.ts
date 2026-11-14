import { describe, expect, it } from "vitest";
import { mimeForAttachment } from "@/lib/api/community-feed";

describe("mimeForAttachment", () => {
  it("fills empty File.type from the extension", () => {
    expect(mimeForAttachment({ name: "notes.pdf", type: "" })).toBe("application/pdf");
    expect(mimeForAttachment({ name: "essay.docx", type: "" })).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    expect(mimeForAttachment({ name: "photo.JPG", type: "" })).toBe("image/jpeg");
  });

  it("keeps a matching browser type", () => {
    expect(mimeForAttachment({ name: "a.png", type: "image/png" })).toBe("image/png");
  });
});
