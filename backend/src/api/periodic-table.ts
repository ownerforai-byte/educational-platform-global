import { Router, Request, Response } from "express";
import { readFile } from "fs/promises";
import fs from "fs";
import { resolveDataPath } from "../utils/paths";
import {
  PERIODIC_FILTERS,
  PERIODIC_ELEMENTS,
  getFilterById,
  getElementsByFilter,
} from "../data/periodicTableFilters";

const router = Router();

/**
 * GET /api/periodic-table/filters
 * Returns all periodic table filter categories with characteristics and NEB exam notes
 */
router.get("/filters", (_req: Request, res: Response) => {
  try {
    const filters = Object.values(PERIODIC_FILTERS).map((f) => {
      const { testCondition, ...rest } = f;
      return {
        ...rest,
        count: PERIODIC_ELEMENTS.filter(testCondition).length,
      };
    });
    res.json(filters);
  } catch (err: any) {
    console.error("Failed to load periodic table filters:", err);
    res.status(500).json({ error: "Failed to load filters" });
  }
});

/**
 * GET /api/periodic-table/elements
 * Returns all periodic table elements, optionally filtered by ?filter=<filter_id> or ?search=<query>
 */
router.get("/elements", (req: Request, res: Response) => {
  try {
    const filterId = req.query.filter as string | undefined;
    const search = (req.query.search as string | undefined)?.toLowerCase().trim();

    let elements = [...PERIODIC_ELEMENTS];

    if (filterId) {
      const filter = getFilterById(filterId);
      if (filter) {
        elements = elements.filter(filter.testCondition);
      }
    }

    if (search) {
      elements = elements.filter(
        (el) =>
          el.symbol.toLowerCase() === search ||
          el.name.toLowerCase().includes(search) ||
          el.atomicNumber.toString() === search ||
          el.category.toLowerCase().includes(search) ||
          el.block.toLowerCase() === search
      );
    }

    res.json({
      total: elements.length,
      filterApplied: filterId || null,
      elements,
    });
  } catch (err: any) {
    console.error("Failed to load periodic table elements:", err);
    res.status(500).json({ error: "Failed to load elements" });
  }
});

/**
 * GET /api/periodic-table/filters/:filterId
 * Returns detailed characteristics and matching elements for a specific filter
 */
router.get("/filters/:filterId", (req: Request, res: Response) => {
  try {
    const { filterId } = req.params;
    const filter = getFilterById(filterId);

    if (!filter) {
      res.status(404).json({ error: `Filter category '${filterId}' not found` });
      return;
    }

    const { testCondition, ...filterData } = filter;
    const matchingElements = PERIODIC_ELEMENTS.filter(testCondition);

    res.json({
      ...filterData,
      count: matchingElements.length,
      elements: matchingElements,
    });
  } catch (err: any) {
    console.error("Failed to load filter detail:", err);
    res.status(500).json({ error: "Failed to load filter detail" });
  }
});

/**
 * GET /api/periodic-table/notes
 * Returns the deep NEB Class 11 and 12 Chemistry lesson and theory notes
 */
router.get("/notes", async (_req: Request, res: Response) => {
  try {
    const lessonPath = resolveDataPath("lessons/classification-of-elements-and-periodic-table.md");
    let markdownContent = "";
    if (fs.existsSync(lessonPath)) {
      markdownContent = await readFile(lessonPath, "utf-8");
    }

    const jsonPath = resolveDataPath("periodic-table-filters.json");
    let jsonContent: any = null;
    if (fs.existsSync(jsonPath)) {
      jsonContent = JSON.parse(await readFile(jsonPath, "utf-8"));
    }

    const theoryPath = resolveDataPath("ravikishan/class-11/chemistry/theory/periodic-table.json");
    let theoryContent: any = null;
    if (fs.existsSync(theoryPath)) {
      theoryContent = JSON.parse(await readFile(theoryPath, "utf-8"));
    }

    res.json({
      title: "Classification of Elements and Periodic Table (NEB Grade 11 & 12)",
      markdownLesson: markdownContent,
      structuredFilters: jsonContent,
      theorySummary: theoryContent,
    });
  } catch (err: any) {
    console.error("Failed to load periodic table notes:", err);
    res.status(500).json({ error: "Failed to load notes" });
  }
});

export default router;
