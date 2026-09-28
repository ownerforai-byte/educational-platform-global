import { writeDual } from "./enrich-helper.mjs";
import { fullPd02 } from "./pd02-full.mjs";

// Write canonical Topic 2
writeDual(
  "physics/potential-potential-difference-and-potential-energy/02-equipotential-lines-and-surfaces.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/02-equipotential-lines-and-surfaces.json",
  fullPd02
);

// Write variant duplicateType: 2 files
writeDual(
  "physics/potential-potential-difference-and-potential-energy/02-equipotential-surfaces-2.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/02-equipotential-surfaces.json",
  {
    ...fullPd02,
    topicSlug: "equipotential-surfaces",
    duplicateType: 2,
    tabGroup: "equipotential-lines-and-surfaces"
  }
);

writeDual(
  "physics/potential-potential-difference-and-potential-energy/02-equipotential-surfaces-2.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/02-equipotential-surfaces.json",
  {
    ...fullPd02,
    topicSlug: "equipotential-surfaces",
    duplicateType: 2,
    tabGroup: "equipotential-lines-and-surfaces"
  }
);
