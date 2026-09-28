import { writeDual } from "./enrich-helper.mjs";
import { fullPd03 } from "./pd03-full.mjs";

// Write canonical Topic 3 (no tab variant in public tree)
writeDual(
  "physics/potential-potential-difference-and-potential-energy/03-potential-gradient.json",
  "class-11-notes/physics/potential-potential-difference-and-potential-energy/concepts/03-potential-gradient.json",
  fullPd03
);
