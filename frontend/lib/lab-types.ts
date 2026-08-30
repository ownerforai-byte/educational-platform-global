/**
 * Lab Type Definitions
 * Central type definitions for the lab system
 */

/**
 * Lab type classification
 */
export type LabType = "3d" | "theory" | "calculator";

/**
 * Lab status
 */
export type LabStatus = "active" | "new" | "premium" | "development";

/**
 * Lab category
 */
export type LabCategory = "physics" | "chemistry" | "mathematics" | "biology" | "class11";

/**
 * Lab metadata interface
 * This is the central data structure for all labs
 */
export interface LabMeta {
  /** Unique lab identifier */
  id: string;

  /** Display title */
  title: string;

  /** Description shown in cards */
  description: string;

  /** Subject category */
  category: LabCategory;

  /** Lab type */
  type: LabType;

  /** Status */
  status: LabStatus;

  /** Color for theming */
  color: string;

  /** Unit/topic grouping */
  unit?: string;

  /** Credit cost for premium labs */
  creditCost?: number;

  /** React component to render - can be a component reference or a render function */
  component: React.ReactNode | React.ComponentType<any> | (() => React.ReactNode);
}

/**
 * Dashboard item interface (for lab-dashboard.tsx)
 * Matches the LabItem interface used in the dashboard
 */
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

/**
 * Convert LabMeta to LabItem for dashboard compatibility
 */
export function labMetaToLabItem(lab: LabMeta): LabItem {
   
  const component: any =
    typeof lab.component === "function"
      ? lab.component
      : () => lab.component;

  return {
    id: lab.id,
    title: lab.title,
    description: lab.description,
    category: lab.category,
    status: lab.status,
    creditCost: lab.creditCost,
    component,
  };
}
