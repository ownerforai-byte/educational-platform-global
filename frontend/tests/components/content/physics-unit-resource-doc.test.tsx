import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PhysicsUnitResourceDoc } from "@/components/content/physics-unit-resource-doc";
import unit3Data from "../../../public/data/physics-xi-resources/unit-03-kinematics.json";

describe("PhysicsUnitResourceDoc component", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) => {
        if (url.includes("unit-03-kinematics.json")) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(unit3Data),
          });
        }
        return Promise.reject(new Error("Not found"));
      })
    );
  });

  it("renders Unit 3 Kinematics title block and download button", async () => {
    render(<PhysicsUnitResourceDoc unitId="kinematics" />);

    // Title Block checks
    expect(screen.getByText(/Physics XI/)).toBeDefined();
    expect(screen.getByText(/UNIT 3: KINEMATICS/i)).toBeDefined();
    expect(screen.getByText(/All-possible NEB questions/i)).toBeDefined();

    // Download button check
    const downloadBtn = screen.getByRole("link", { name: /Download \.docx/i });
    expect(downloadBtn).toBeDefined();
    expect(downloadBtn.getAttribute("href")).toBe(
      "/materials/physics-xi/Physics_XI_Unit_03_kinematics.docx"
    );

    // Wait for questions to load
    await waitFor(() => {
      expect(screen.getByText(/Define instantaneous velocity/i)).toBeDefined();
    });
  });
});
