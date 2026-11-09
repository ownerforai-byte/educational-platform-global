import type { Metadata } from "next";
import { Award } from "lucide-react";
import { CertificatesBoard } from "@/components/certificates/certificates-board";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Your unit completion certificates.",
};

/**
 * /certificates — the award shelf.
 *
 * The board below derives every certificate from the account's journey rows
 * (unit certified = every topic in the unit complete; subject certified =
 * every unit certified), so the shelf always reflects real study progress.
 */
export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="mt-1 text-muted-foreground">
            Earn a certificate for each unit you complete. Finish all units in a
            subject to unlock the subject completion certificate.
          </p>
        </div>
      </div>

      <CertificatesBoard />
    </div>
  );
}
