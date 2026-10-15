import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  PHYSICS_XI_UNIT_RESOURCES,
  getPhysicsUnitResource,
  getPhysicsUnitResourceByNumber
} from "@/lib/physics-xi-resources";

describe("Physics XI Unit Resources (1–26)", () => {
  it("contains exactly 26 unit resources", () => {
    expect(PHYSICS_XI_UNIT_RESOURCES.length).toBe(26);
  });

  it("has strictly sequential unit numbers from 1 to 26", () => {
    const unitNumbers = PHYSICS_XI_UNIT_RESOURCES.map((u) => u.unitNo);
    expect(unitNumbers).toEqual(Array.from({ length: 26 }, (_, i) => i + 1));
  });

  it("every unit has an authoritative docx file that exists in public/materials/physics-xi", () => {
    PHYSICS_XI_UNIT_RESOURCES.forEach((unit) => {
      expect(unit.docxFileName).toMatch(/^Physics_XI_Unit_\d{2}_[\w-]+\.docx$/);
      const docxPath = path.resolve(
        process.cwd(),
        "public/materials/physics-xi",
        unit.docxFileName
      );
      expect(fs.existsSync(docxPath), `Missing docx for unit ${unit.unitNo}: ${docxPath}`).toBe(true);
      const stat = fs.statSync(docxPath);
      expect(stat.size, `File ${unit.docxFileName} is too small`).toBeGreaterThan(30000);
    });
  });

  it("every unit has an authoritative json file in public/data/physics-xi-resources", () => {
    PHYSICS_XI_UNIT_RESOURCES.forEach((unit) => {
      const jsonRelPath = unit.jsonFile.replace(/^\//, "");
      const jsonFullPath = path.resolve(process.cwd(), "public", jsonRelPath);
      expect(fs.existsSync(jsonFullPath), `Missing JSON for unit ${unit.unitNo}`).toBe(true);
      const content = JSON.parse(fs.readFileSync(jsonFullPath, "utf8"));
      expect(content.unitNo).toBe(unit.unitNo);
      expect(content.unitId).toBe(unit.unitId);
      expect(content.questions.length).toBeGreaterThanOrEqual(10);
      expect(content.tables.length).toBeGreaterThanOrEqual(2);
      expect(content.theoryItems.length).toBeGreaterThanOrEqual(5);
      expect(content.formulas.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("correctly resolves unit resources by unitId and unit number", () => {
    expect(getPhysicsUnitResource("kinematics")?.unitNo).toBe(3);
    expect(getPhysicsUnitResource("reflection-at-curved-mirror")?.unitNo).toBe(14);
    expect(getPhysicsUnitResource("nuclear-physics")?.unitNo).toBe(24);

    expect(getPhysicsUnitResourceByNumber(3)?.unitId).toBe("kinematics");
    expect(getPhysicsUnitResourceByNumber(14)?.unitId).toBe("reflection-at-curved-mirror");
    expect(getPhysicsUnitResourceByNumber(24)?.unitId).toBe("nuclear-physics");
  });

  // ── Spot-check Requirements: Units 3, 14, 24 ─────────────────────────────
  describe("Spot-checks for Units 3, 14, 24", () => {
    it("Unit 3 (Kinematics) opens with the correct unit title block", () => {
      const unit3 = getPhysicsUnitResourceByNumber(3);
      expect(unit3).toBeDefined();
      expect(unit3?.unitName).toBe("Kinematics");
      expect(unit3?.contentArea).toBe("Mechanics");
      expect(unit3?.docxFileName).toBe("Physics_XI_Unit_03_kinematics.docx");
      expect(unit3?.titleBlock.course).toContain("Physics XI");
      expect(unit3?.titleBlock.course).toContain("Phy. 101");
      expect(unit3?.titleBlock.heading).toContain("UNIT 3: KINEMATICS");
      expect(unit3?.titleBlock.heading).toContain("Mechanics");
      expect(unit3?.titleBlock.subtitle).toContain("All-possible NEB questions");
    });

    it("Unit 14 (Reflection at Curved Mirrors) opens with the correct unit title block", () => {
      const unit14 = getPhysicsUnitResourceByNumber(14);
      expect(unit14).toBeDefined();
      expect(unit14?.unitName).toBe("Reflection at Curved Mirrors");
      expect(unit14?.contentArea).toBe("Waves & Optics");
      expect(unit14?.docxFileName).toBe("Physics_XI_Unit_14_curved-mirrors.docx");
      expect(unit14?.titleBlock.course).toContain("Physics XI");
      expect(unit14?.titleBlock.course).toContain("Phy. 101");
      expect(unit14?.titleBlock.heading).toContain("UNIT 14: REFLECTION AT CURVED MIRRORS");
      expect(unit14?.titleBlock.heading).toContain("Waves & Optics");
      expect(unit14?.titleBlock.subtitle).toContain("All-possible NEB questions");
    });

    it("Unit 24 (Nuclear Physics) opens with the correct unit title block", () => {
      const unit24 = getPhysicsUnitResourceByNumber(24);
      expect(unit24).toBeDefined();
      expect(unit24?.unitName).toBe("Nuclear Physics");
      expect(unit24?.contentArea).toBe("Modern Physics");
      expect(unit24?.docxFileName).toBe("Physics_XI_Unit_24_nuclear-physics.docx");
      expect(unit24?.titleBlock.course).toContain("Physics XI");
      expect(unit24?.titleBlock.course).toContain("Phy. 101");
      expect(unit24?.titleBlock.heading).toContain("UNIT 24: NUCLEAR PHYSICS");
      expect(unit24?.titleBlock.heading).toContain("Modern Physics");
      expect(unit24?.titleBlock.subtitle).toContain("All-possible NEB questions");
    });
  });
});
