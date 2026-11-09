import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/data-loader", () => ({
  loadData: vi.fn(),
}));

import { loadData } from "@/lib/data-loader";
import { getTopicMindmap } from "@/features/mindmap/queries";

const topicSlug = "projectile-motion-and-its-applications";
const topicTitle = "Projectile motion and its applications";

const manifest = [
  {
    path: `visuals/mindmaps/class-11/physics/kinematics/05-${topicSlug}.json`,
    data: {
      title: "Class 11 authored map",
      topicSlug,
      root: { id: "class-11-root", label: "Class 11 authored map" },
    },
  },
  {
    path: `visuals/mindmaps/class-12/physics/kinematics/05-${topicSlug}.json`,
    data: {
      title: "Class 12 authored map",
      topicSlug,
      root: { id: "class-12-root", label: "Class 12 authored map" },
    },
  },
  {
    path: "visuals/mindmaps/class-11/physics/kinematics/_unit-kinematics.json",
    data: {
      title: "Unit map, not the requested topic map",
      topicSlug: "",
      root: { id: "unit-root", label: "Unit map" },
    },
  },
];

const mockedLoadData = vi.mocked(loadData);

describe("classified imported mindmap content", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedLoadData.mockResolvedValue(manifest as never);
  });

  it.each([
    ["class-11-notes", "Class 11 authored map"],
    ["class-12-notes", "Class 12 authored map"],
  ])("loads the topic map at the correct class path for %s", async (classSlug, expectedLabel) => {
    const result = await getTopicMindmap({
      classSlug,
      subjectSlug: "physics",
      unitId: "kinematics",
      topicSlug,
      topicTitle,
    });

    expect(result.source).toBe("imported");
    expect(result.root.label).toBe(expectedLabel);
  });
});
