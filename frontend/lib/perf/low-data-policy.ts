/**
 * Global low-data policy for optional media and images.
 *
 * Existing route/content requests remain untouched. Only eagerly requested
 * images and metadata-preloaded video are deferred; visible essential content,
 * links, navigation and user-triggered playback continue to work normally.
 */
function hasPolicyValue(dataset: DOMStringMap, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(dataset, key);
}

export function applyLiteResourcePolicy(root: ParentNode, active: boolean): void {
  const images = root.querySelectorAll<HTMLImageElement>("img");
  for (const image of images) {
    if (active) {
      if (image.hasAttribute("data-lite-priority") || hasPolicyValue(image.dataset, "liteOriginalLoading")) continue;
      image.dataset.liteOriginalLoading = image.hasAttribute("loading")
        ? image.getAttribute("loading") ?? ""
        : "__absent__";
      image.setAttribute("loading", "lazy");
      continue;
    }
    if (hasPolicyValue(image.dataset, "liteOriginalLoading")) {
      const originalLoading = image.dataset.liteOriginalLoading;
      if (originalLoading && originalLoading !== "__absent__") image.setAttribute("loading", originalLoading);
      else image.removeAttribute("loading");
      delete image.dataset.liteOriginalLoading;
    }
  }

  const videos = root.querySelectorAll<HTMLVideoElement>("video");
  for (const video of videos) {
    if (active) {
      if (!hasPolicyValue(video.dataset, "liteOriginalPreload")) {
        video.dataset.liteOriginalPreload = video.getAttribute("preload") ?? "";
      }
      video.setAttribute("preload", "none");
      continue;
    }
    if (hasPolicyValue(video.dataset, "liteOriginalPreload")) {
      const originalPreload = video.dataset.liteOriginalPreload;
      if (originalPreload) video.setAttribute("preload", originalPreload);
      else video.removeAttribute("preload");
      delete video.dataset.liteOriginalPreload;
    }
  }
}

/** Observe the document so route changes and late-mounted widgets are covered. */
export function observeLiteResourcePolicy(root: HTMLElement): () => void {
  const update = () => applyLiteResourcePolicy(root, root.dataset.lite === "true");
  update();

  const observer = new MutationObserver((records) => {
    // Avoid reacting to the policy's own attribute updates.
    if (records.some((record) => record.type === "childList")) update();
  });
  observer.observe(root, { childList: true, subtree: true });

  const preferenceObserver = new MutationObserver(update);
  preferenceObserver.observe(root, { attributes: true, attributeFilter: ["data-lite"] });

  return () => {
    observer.disconnect();
    preferenceObserver.disconnect();
    applyLiteResourcePolicy(root, false);
  };
}
