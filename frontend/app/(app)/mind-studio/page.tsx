import { MindStudio } from "@/features/mindmap-studio";

export const metadata = {
  title: "Mind Studio — Ravikisan's Platform",
  description:
    "Generate mindmaps, trees, flowcharts, hierarchies, timelines and sequence diagrams with Agnes AI (guest pool and puter.js fallbacks), then edit on a draggable canvas. Maps stay on your device.",
};

/**
 * Signed-in Mind Studio route.
 *
 * MindStudio is a self-contained client workspace; this page only places it
 * edge-to-edge inside the (app) shell. Its floating panels are laid out for a
 * ~1500px-wide desk (the Classifier/Data View sit at x=1060 inside the
 * workspace), so the wrapper scrolls horizontally instead of clipping them on
 * narrower screens — mind-studio.tsx itself is untouched.
 */
export default function MindStudioPage() {
  return (
    /* Cancel <main>'s px/py so the dark workspace bleeds to the shell edges. */
    <div className="-mx-4 -my-6 md:-mx-6 lg:-mx-8">
      <h1 className="sr-only">Mind Studio</h1>

      {/* Panels sit side-by-side at fixed offsets — pan to reach them all.
          Hidden once the viewport is wide enough for the full layout. */}
      <p className="border-b border-white/10 bg-[#040916] px-4 py-2 text-center text-[11px] text-slate-400 min-[1820px]:hidden">
        The workspace is wider than your screen — scroll sideways to reach the
        Classifier, Data View and Inspector.
      </p>

      <div className="overflow-x-auto overscroll-x-contain bg-[#040916]">
        <div className="min-w-[1500px]">
          <MindStudio />
        </div>
      </div>
    </div>
  );
}
