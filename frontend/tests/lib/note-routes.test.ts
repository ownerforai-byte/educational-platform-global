import { describe, expect, it } from "vitest";
import { noteRoute, noteRoutes } from "@/lib/note-routes";
import type { ImportedNote } from "@/lib/imported-notes";

function note(overrides: Partial<ImportedNote>): ImportedNote {
  return {
    title: "Sample",
    path: "class-11-notes/physics/ideal-gas/concepts/01-ideal-gas-equation.json",
    subject: "physics",
    unit: "ideal-gas",
    target: "class-11-notes",
    source: "ravikishan",
    ...overrides,
  };
}

describe("noteRoute", () => {
  it("routes ravikishan notes with a unit to the chapter page", () => {
    expect(noteRoute(note({}))).toBe(
      "/class-11-notes/physics/chapters/ideal-gas"
    );
  });

  it("routes class-12 targets to the class-12 track", () => {
    expect(
      noteRoute(note({ target: "class-12-notes", unit: "heredity-and-evolution" }))
    ).toBe("/class-12-notes/physics/chapters/heredity-and-evolution");
  });

  it("falls back to the subject hub when no unit resolves", () => {
    expect(noteRoute(note({ unit: undefined }))).toBe(
      "/class-11-notes/physics"
    );
  });

  it("routes r-export chapter notes to the subject hub", () => {
    expect(
      noteRoute(
        note({
          source: "r-export",
          subject: "chemistry",
          path: "chemistry/atomic structure/rutherford's-atomic-model",
          unit: undefined,
        })
      )
    ).toBe("/class-11-notes/chemistry");
  });

  it("never emits the removed /r-notes or /ravikishan-notes routes", () => {
    const samples = [
      note({}),
      note({ unit: undefined, source: "r-export" as const }),
      note({ path: "class-11e/physics/kinematics/examples/01-extra.json" }),
      note({ path: "class-12/english/writing-skills/concepts/01-essay.json", target: "class-12-notes" as const }),
    ];
    for (const href of samples.map(noteRoute)) {
      expect(href.startsWith("/r-notes")).toBe(false);
      expect(href.startsWith("/ravikishan-notes")).toBe(false);
    }
  });

  it("treats legacy class-12 paths as the class-12 track", () => {
    const route = noteRoute(
      note({
        path: "class-12/english/writing-skills/concepts/01-essay.json",
        subject: "english",
        target: "class-11-notes",
        unit: undefined,
      })
    );
    expect(route.startsWith("/class-12-notes/")).toBe(true);
  });
});

describe("noteRoutes", () => {
  it("maps groups preserving order", () => {
    const [a, b] = noteRoutes([note({}), note({ unit: undefined })]);
    expect(a.href).toBe("/class-11-notes/physics/chapters/ideal-gas");
    expect(b.href).toBe("/class-11-notes/physics");
  });
});
