import { Router } from "express";
import subjectsRouter from "./subjects.controller.js";
import chaptersRouter from "./chapters.controller.js";
import topicsRouter from "./topics.controller.js";
import lessonsRouter from "./lessons.controller.js";
import resourcesRouter from "./resources.controller.js";
import ravikishanNotesRouter from "./ravikishan-notes.controller.js";
import rNotesRouter from "./r-notes.controller.js";
import revealRouter from "./reveal.controller.js";
import classesRouter from "./classes.controller.js";
import biologyRouter from "./biology.controller.js";
import periodicTableRouter from "./periodic-table.controller.js";
import periodicUnlockRouter from "./periodic-unlock.controller.js";

const router = Router();

router.use("/subjects", subjectsRouter);
router.use("/chapters", chaptersRouter);
router.use("/topics", topicsRouter);
router.use("/lessons", lessonsRouter);
router.use("/resources", resourcesRouter);
router.use("/ravikishan-notes", ravikishanNotesRouter);
router.use("/r-notes", rNotesRouter);
router.use("/content", revealRouter);
router.use("/classes", classesRouter);
router.use("/biology", biologyRouter);
// Unlock must win over /periodic-table (also mounted explicitly in api/index).
router.use("/periodic-table/unlock", periodicUnlockRouter);
router.use("/periodic-table", periodicTableRouter);

export const contentRoutes = router;
export default router;
