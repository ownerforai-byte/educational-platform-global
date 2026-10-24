import { afterEach, describe, expect, it, vi } from "vitest";
import { applyLiteResourcePolicy, observeLiteResourcePolicy } from "@/lib/perf/low-data-policy";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("global low-data resource policy", () => {
  it("defers eager images while preserving explicitly prioritized assets", () => {
    document.body.innerHTML = `
      <img id="optional" src="/optional.png">
      <img id="priority" data-lite-priority src="/logo.png">
      <img id="lazy" loading="lazy" src="/content.png">
    `;
    const root = document.body;

    applyLiteResourcePolicy(root, true);

    expect(document.querySelector("#optional")).toHaveAttribute("loading", "lazy");
    expect(document.querySelector("#priority")).not.toHaveAttribute("loading");
    expect(document.querySelector("#lazy")).toHaveAttribute("loading", "lazy");

    applyLiteResourcePolicy(root, false);
    expect(document.querySelector("#optional")).not.toHaveAttribute("loading");
  });

  it("stops video metadata downloads in low-data mode and restores the previous setting", () => {
    document.body.innerHTML = '<video id="lecture" preload="metadata"></video>';
    const video = document.querySelector("video")!;

    applyLiteResourcePolicy(document.body, true);
    expect(video.preload).toBe("none");
    applyLiteResourcePolicy(document.body, false);
    expect(video.preload).toBe("metadata");
  });

  it("covers newly mounted elements and live low-data preference changes", async () => {
    document.documentElement.dataset.lite = "false";
    const stop = observeLiteResourcePolicy(document.documentElement);
    const image = document.createElement("img");
    document.body.append(image);

    await vi.waitFor(() => expect(image.hasAttribute("loading")).toBe(false));
    document.documentElement.dataset.lite = "true";
    await vi.waitFor(() => expect(image.getAttribute("loading")).toBe("lazy"));
    stop();
    expect(image.hasAttribute("loading")).toBe(false);
  });
});
