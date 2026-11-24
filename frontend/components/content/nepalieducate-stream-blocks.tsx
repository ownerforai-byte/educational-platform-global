"use client";

import type { NepalieducateStreamPdf } from "@/lib/streams/nepalieducate-catalog";
import {
  DriveSolutionStreamBlocks,
  type DriveSolutionStreamPdf,
} from "@/components/content/drive-solution-stream-blocks";

export function NepalieducateStreamBlocks({
  pdfs,
  unitTitle,
}: {
  pdfs: NepalieducateStreamPdf[];
  unitTitle?: string;
}) {
  return (
    <DriveSolutionStreamBlocks
      pdfs={pdfs as DriveSolutionStreamPdf[]}
      unitTitle={unitTitle}
      heading="Nepali Educate · exercise solutions (Class 11)"
      footerLabel="Nepali Educate solution PDF · read in place"
      accent="emerald"
    />
  );
}