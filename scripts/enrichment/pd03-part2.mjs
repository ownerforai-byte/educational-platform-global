import { writeDual } from "./enrich-helper.mjs";
import { fullPd03 } from "./pd03-full.mjs";

// Write canonical Topic 3 (no tab variant in public tree)
writeDual(
  "physics/potential-potential-difference-and-potential-energy/03-potential-gradient.json",
  "notes/concepts/class-11/physics/potential-potential-difference-and-potential-energy/03-potential-gradient.json",
  fullPd03
);
