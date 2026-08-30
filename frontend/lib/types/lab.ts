/**
 * Lab Type Definitions
 * Central type definitions for the lab system
 */

export type LabType = "3d" | "theory" | "calculator";
export type LabStatus = "active" | "new" | "premium" | "development";
export type LabCategory = "physics" | "chemistry" | "mathematics" | "biology" | "class11";

export interface LabMeta {
  id: string;
  title: string;
  description: string;
  category: LabCategory;
  type: LabType;
  status: LabStatus;
  color: string;
  unit?: string;
  creditCost?: number;
  component: React.ReactNode | (() => React.ReactNode);
}

export interface LabItem {
  id: string;
  title: string;
  description: string;
  category: LabCategory;
  icon?: React.ReactNode;
  status?: LabStatus;
  component: React.ComponentType<any>;
  creditCost?: number;
}
