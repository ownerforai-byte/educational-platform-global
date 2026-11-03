"use client";

import { useEffect, useState } from "react";
import { getSubjectPyqBank, type SubjectPyqBank } from "@/lib/pyq-bank";

/** Loads the pyq-bank for a `classSlug/subjectSlug` key (existing reader, static JSON). */
export function useSubjectBank(subjectKey: string | null) {
  const [bank, setBank] = useState<SubjectPyqBank | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!subjectKey) return;
    const [classSlug, subjectSlug] = subjectKey.split("/");
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    getSubjectPyqBank(classSlug, subjectSlug)
      .then((b) => !cancelled && setBank(b))
      .catch(() => !cancelled && (setBank(null), setFailed(true)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [subjectKey]);

  return { bank, loading, failed };
}
