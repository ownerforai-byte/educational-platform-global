export const metadata = {
  title: "Ad P Table — NEB & CEE",
  description:
    "The Ad P periodic table: 118 elements, live hover preview, and the CEE entrance hub. Opens at Plus.",
};

export default function AdPTablePage() {
  return (
    <iframe
      title="Ad P Table"
      src="/ad-p-table.html"
      className="h-[calc(100vh-7rem)] w-full rounded-2xl border border-border bg-white"
    />
  );
}
