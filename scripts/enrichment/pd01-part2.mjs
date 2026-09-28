import { writeDual } from "./enrich-helper.mjs";
import { fullPd01 } from "./pd01-full.mjs";

// Write canonical Topic 1
writeDual(
  "physics/potential-potential-difference-and-potential-energy/01-potential-difference-potential-due-to-point-charge-potential-energy-and-electron-volt.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/01-potential-difference-potential-due-to-point-charge-potential-energy-and-electron-volt.json",
  fullPd01
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/potential-potential-difference-and-potential-energy/01-potential-difference-point-charge.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/01-potential-difference-point-charge.json",
  {
    ...fullPd01,
    title: "Potential Difference and Point Charge",
    topicSlug: "potential-difference-point-charge",
    duplicateType: 2,
    tabGroup: "potential-difference-potential-due-to-point-charge-potential-energy-and-electron-volt"
  }
);

writeDual(
  "physics/potential-potential-difference-and-potential-energy/01-potential-difference-point-charge-2.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/01-potential-difference-point-charge.json",
  {
    ...fullPd01,
    title: "Potential Difference and Point Charge",
    topicSlug: "potential-difference-point-charge",
    duplicateType: 2,
    tabGroup: "potential-difference-potential-due-to-point-charge-potential-energy-and-electron-volt"
  }
);
