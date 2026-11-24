"use client";

import type { NoteswiftStreamPdf } from "@/lib/streams/noteswift-catalog";
import {
  DriveSolutionStreamBlocks,
  type DriveSolutionStreamPdf,
} from "@/components/content/drive-solution-stream-blocks";

export function NoteswiftStreamBlocks({
  pdfs,
  unitTitle,
}: {
  pdfs: NoteswiftStreamPdf[];
  unitTitle?: string;
}) {
  return (
    <DriveSolutionStreamBlocks
      pdfs={pdfs as DriveSolutionStreamPdf[]}
      unitTitle={unitTitle}
      heading="NoteSwift · exercise solutions"
      footerLabel="NoteSwift solution PDF · read in place"
      accent="violet"
    />
  );
}