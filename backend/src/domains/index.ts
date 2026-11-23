/**
 * Domain aggregation layer (PLATFORM_UPGRADE_MASTER_PLAN §2.1).
 * New code should import routers from here; the legacy `api/` tree remains
 * the mount point until each domain is fully extracted.
 */
export { default as apiRouter } from "../api/index.js";
export { default as v2Router } from "../api/v2/index.js";

export { default as authRoutes } from "../api/auth/index.js";
export { default as aiRoutes } from "../api/ai/index.js";
export { default as contentRoutes } from "../api/content/index.js";
export { default as userRoutes } from "../api/user/index.js";
export { default as socialRoutes } from "../api/social/index.js";
export { default as adminRoutes } from "../api/admin/index.js";
export { default as platformRoutes } from "../api/platform/index.js";