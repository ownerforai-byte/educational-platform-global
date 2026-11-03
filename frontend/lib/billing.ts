/**
 * Billing ledger reader: presents the existing spark transaction history
 * (lib/api/credits) as a receipt list with totals. Pure, no I/O, no writes.
 * There is no payment backend, so receipts are spark ledger entries only.
 */
import type { CreditTransaction } from "@/lib/api/credits";

export interface LedgerSummary {
  granted: number;
  spent: number;
  adjusted: number;
  net: number;
  count: number;
}

export interface Receipt {
  id: string;
  date: string;
  kind: CreditTransaction["type"];
  label: string;
  amount: number;
  reference: string | null;
}

const KIND_LABEL: Record<CreditTransaction["type"], string> = {
  GRANT: "Spark grant",
  SPEND: "Content unlock",
  ADJUST: "Adjustment",
};

/** Newest-first receipts; unknown/invalid rows are skipped. */
export function buildReceipts(txs: readonly CreditTransaction[]): Receipt[] {
  return txs
    .filter((t) => t && typeof t.id === "string" && typeof t.amount === "number" && t.type in KIND_LABEL)
    .map((t) => ({
      id: t.id,
      date: t.created_at,
      kind: t.type,
      label: t.reason?.trim() || KIND_LABEL[t.type],
      amount: t.amount,
      reference: t.reference_id,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function summarizeLedger(receipts: readonly Receipt[]): LedgerSummary {
  let granted = 0;
  let spent = 0;
  let adjusted = 0;
  for (const r of receipts) {
    if (r.kind === "GRANT") granted += Math.abs(r.amount);
    else if (r.kind === "SPEND") spent += Math.abs(r.amount);
    else adjusted += r.amount;
  }
  return { granted, spent, adjusted, net: granted - spent + adjusted, count: receipts.length };
}
