import { redirect } from "next/navigation";

/**
 * Periodic Table 3D — duplicate of the registry entry "ch-3d-periodic".
 * Consolidated: the CEE all-blocks periodic table at /periodic-table is the
 * canonical table (registry id "ch-3d-periodic" now renders it), so this
 * legacy route redirects there.
 */
export default function ChPeriodicRedirect() {
  redirect("/periodic-table");
}
