/**
 * Public site identity assets (repo-root `site-assets.json` + `profile-picture.jpg`).
 * Image is served as-is — no resize or re-encode in the build.
 */
export const SITE_PROFILE_PICTURE_URL = "/profile-picture.jpg" as const;
export const SITE_FAVICON_URL = "/profile-picture.jpg" as const;
export const SITE_ICON_SIZE = { width: 460, height: 1024 } as const;