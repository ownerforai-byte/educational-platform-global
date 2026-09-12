export type MindmapNode = {
  id: string;
  label: string;
  children?: MindmapNode[];
};

export type MindmapSource = "syllabus" | "imported" | "override";

export type MindmapDocument = {
  id: string;
  title: string;
  classSlug: string;
  subjectSlug: string;
  unitId?: string;
  topicSlug?: string;
  source: MindmapSource;
  root: MindmapNode;
  mediaUrl: string | null;
  href?: string;
};

export type MindmapItem = {
  id: string;
  title: string;
  mediaUrl: string | null;
  href?: string;
  source: MindmapSource;
  root: MindmapNode;
};
