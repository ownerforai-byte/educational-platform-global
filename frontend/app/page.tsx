import { redirect } from "next/navigation";

/** The website home is stable for every role. R1 remains available in navigation. */
export default function RootEntry() {
  redirect("/home");
}
