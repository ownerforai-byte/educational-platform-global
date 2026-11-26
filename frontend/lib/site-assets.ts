/**
 * Public site identity assets.
 *
 * Pro pass (2026-11-27): the favicon, Apple touch icon and PWA manifest icons
 * previously all pointed at `/profile-picture.jpg` — a 460x1024 personal photo
 * that browsers squashed into the tab strip and installers scaled into app
 * icons. The real square icons (`/icon-192.png`, `/icon-512.png`) already sat
 * in `public/` unused. Everything now points at the proper square PNGs, plus a
 * real 1200x630 Open Graph share image.
 */
export const SITE_PROFILE_PICTURE_URL = "/profile-picture.jpg" as const;
export const SITE_FAVICON_URL = "/icon-192.png" as const;
export const SITE_APPLE_TOUCH_ICON_URL = "/icon-192.png" as const;
export const SITE_OG_IMAGE_URL = "/og-image.jpg" as const;
export const SITE_ICON_SIZE = { width: 192, height: 192 } as const;
