/**
 * EDU-VISUAL INTERACTIVE — interactive diagram labelling engine.
 *
 * Owner request (2026-10-03): "make it search (mandatory from google - get the
 * idea then draw then write all labelling and each labelling has an interface
 * opening when hovered or clicked".
 *
 * Every labelled part in an SVG figure (<g> with a <title>) is turned into an
 * interactive learning instrument:
 *   · Hover: shows a sleek floating badge tooltip with the part's name and quick role.
 *   · Click / Tap / Enter: opens a rich inspection interface card displaying the
 *     part's title, deep mechanism/function, properties, and exam significance,
 *     while highlighting the active part in the SVG.
 *   · Navigation: allows cycling through all labelled parts in the diagram.
 *
 * Safe everywhere: idempotent registration, works across MathMarkdown, chat,
 * notes, and lessons.
 */

export interface ParsedPartInfo {
  name: string;
  mechanism: string;
  significance?: string;
  raw: string;
}

export function parsePartTitle(rawText: string): ParsedPartInfo {
  const clean = (rawText || "").trim();
  if (!clean) {
    return { name: "Labelled Part", mechanism: "No details provided.", raw: "" };
  }

  // Handle pipe-separated: "Bowman's Capsule | Ultrafiltration | Podocyte filtration barrier"
  if (clean.includes("|")) {
    const segments = clean.split("|").map((s) => s.trim()).filter(Boolean);
    return {
      name: segments[0] || "Labelled Part",
      mechanism: segments[1] || "Core functional component.",
      significance: segments[2] || undefined,
      raw: clean,
    };
  }

  // Handle colon-separated: "Bowman's Capsule: Ultrafiltration of blood plasma"
  const colonIdx = clean.indexOf(":");
  if (colonIdx > 0 && colonIdx < 50) {
    return {
      name: clean.slice(0, colonIdx).trim(),
      mechanism: clean.slice(colonIdx + 1).trim(),
      raw: clean,
    };
  }

  // Handle dash-separated: "Anode - site of oxidation"
  const dashIdx = clean.indexOf(" — ") !== -1 ? clean.indexOf(" — ") : clean.indexOf(" - ");
  if (dashIdx > 0 && dashIdx < 50) {
    const sepLen = clean.includes(" — ") ? 3 : 3;
    return {
      name: clean.slice(0, dashIdx).trim(),
      mechanism: clean.slice(dashIdx + sepLen).trim(),
      raw: clean,
    };
  }

  return {
    name: clean.length > 40 ? clean.slice(0, 36) + "…" : clean,
    mechanism: clean,
    raw: clean,
  };
}

/* ── DETAIL DOTS — floating knowledge widgets (owner 2026-11-12) ─────────────
 *
 * "add more details (related, contrasts) as floating widget in the diagram in
 * dots, after hovering or clicking those dots reveals all the information from
 * there". The Diagram Hub therefore packs the extra teaching material into
 * small `<g class="edu-detail-dot">` groups inside the SVG. Each dot carries
 * ONE machine-readable <title> built from `Label: value` fields separated by
 * `|`, with `;`-separated items inside a field:
 *
 *   DETAIL DOT | Diffusion | Related: Osmosis; Active transport |
 *   Relations: Gradient drives flux because J = -D dC/dx |
 *   Contrasts: Diffusion vs Osmosis — solvent only in osmosis |
 *   Detail: Particles move down a concentration gradient… | Exam: no ATP
 *
 * The payload lives in the <title> (an already-allowed SVG element), so it
 * survives the sanitizer unchanged — no new attributes, no scripts. Hovering
 * or clicking the dot expands that payload into a floating widget right next
 * to the dot; clicking pins it so it can be scrolled and read in full.
 */

export const DETAIL_DOT_CLASS = "edu-detail-dot";
export const DETAIL_DOT_SELECTOR = `.edu-visual svg g.${DETAIL_DOT_CLASS}`;

export interface DetailDotSection {
  label: string;
  value: string;
  /** Semicolon-separated entries, e.g. each related term or each contrast. */
  items: string[];
}

export interface ParsedDetailDot {
  name: string;
  sections: DetailDotSection[];
  raw: string;
}

const LABELLED_FIELD = /^([A-Za-z][A-Za-z0-9 /&+-]{0,30}):\s*(.+)$/;

/** True when a group is one of the diagram's floating detail dots. */
export function isDetailDotElement(element: Element | null | undefined): boolean {
  return Boolean(element && element.classList?.contains(DETAIL_DOT_CLASS));
}

/**
 * Parse a dot's <title> into labelled sections. Tolerates the strict hub
 * format, a leading "DETAIL DOT" marker, and the older plain-pipe label
 * format ("Part | mechanism | significance") so legacy figures still open.
 */
export function parseDetailDot(rawText: string): ParsedDetailDot {
  const raw = (rawText || "").trim();
  if (!raw) return { name: "Detail", sections: [], raw };

  const segments = raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  if (segments.length && /^(detail\s*dot|edu-dot)$/i.test(segments[0])) segments.shift();
  if (!segments.length) return { name: "Detail", sections: [], raw };

  const hasFields = segments.some((s) => LABELLED_FIELD.test(s));
  let name = "Detail";
  let body: string[];

  if (hasFields) {
    // A leading unlabelled segment is the dot's topic; otherwise the topic is
    // simply "Detail" and every segment is a field.
    if (!LABELLED_FIELD.test(segments[0])) {
      name = segments[0];
      body = segments.slice(1);
    } else {
      body = segments;
    }
  } else {
    // Legacy "Name | Mechanism | Significance" pipe label.
    name = segments[0];
    body = [];
    if (segments[1]) body.push(`Mechanism: ${segments[1]}`);
    if (segments[2]) body.push(`Exam significance: ${segments[2]}`);
    for (const extra of segments.slice(3)) body.push(`Detail: ${extra}`);
  }

  const sections: DetailDotSection[] = [];
  for (const segment of body) {
    const match = LABELLED_FIELD.exec(segment);
    const label = match ? match[1].trim() : "Detail";
    const value = (match ? match[2] : segment).trim();
    if (!value) continue;
    const items = value.includes(";")
      ? value
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    sections.push({ label, value, items });
  }
  if (!sections.length) {
    sections.push({ label: "Detail", value: raw, items: [] });
  }
  return { name, sections, raw };
}

/** Every dot + its parsed payload inside one figure, in document order. */
export function collectDetailDots(figure: Element | null): Array<{ element: SVGGElement; info: ParsedDetailDot }> {
  if (!figure) return [];
  const dots: Array<{ element: SVGGElement; info: ParsedDetailDot }> = [];
  figure.querySelectorAll<SVGGElement>(`svg g.${DETAIL_DOT_CLASS}`).forEach((g) => {
    const raw = (g.querySelector(":scope > title")?.textContent ?? "").trim();
    if (raw) dots.push({ element: g, info: parseDetailDot(raw) });
  });
  return dots;
}

let isRegistered = false;
let activeModal: HTMLElement | null = null;
let activePartElement: SVGElement | null = null;

function closeModal() {
  closeDotWidget();
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
  }
  if (activePartElement) {
    activePartElement.classList.remove("edu-visual__part--active");
    activePartElement = null;
  }
}

function openPartInterface(
  partG: SVGGElement,
  info: ParsedPartInfo,
  allPartsInFigure: Array<{ element: SVGGElement; info: ParsedPartInfo }>,
  currentIndex: number,
) {
  closeModal();

  activePartElement = partG;
  partG.classList.add("edu-visual__part--active");

  const modal = document.createElement("div");
  modal.className = "edu-visual__modal-backdrop";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", info.name);

  modal.innerHTML = `
    <div class="edu-visual__modal-card" onclick="event.stopPropagation()">
      <div class="edu-visual__modal-header">
        <div class="edu-visual__modal-badge">
          <span class="edu-visual__modal-icon">🏷️</span>
          <span class="edu-visual__modal-index">Part ${currentIndex + 1} of ${allPartsInFigure.length}</span>
        </div>
        <button class="edu-visual__modal-close" aria-label="Close dialog" title="Close (Esc)">✕</button>
      </div>

      <h3 class="edu-visual__modal-title">${escapeText(info.name)}</h3>

      <div class="edu-visual__modal-body">
        <div class="edu-visual__modal-section">
          <div class="edu-visual__modal-label">⚙️ Mechanism & Function</div>
          <div class="edu-visual__modal-text">${escapeText(info.mechanism)}</div>
        </div>

        ${
          info.significance
            ? `<div class="edu-visual__modal-section">
                 <div class="edu-visual__modal-label">💡 Exam & Core Significance</div>
                 <div class="edu-visual__modal-text">${escapeText(info.significance)}</div>
               </div>`
            : ""
        }
      </div>

      ${
        allPartsInFigure.length > 1
          ? `<div class="edu-visual__modal-footer">
               <button class="edu-visual__modal-nav" data-dir="prev" ${currentIndex === 0 ? "disabled" : ""}>
                 ← Previous Part
               </button>
               <button class="edu-visual__modal-nav" data-dir="next" ${currentIndex === allPartsInFigure.length - 1 ? "disabled" : ""}>
                 Next Part →
               </button>
             </div>`
          : ""
      }
    </div>
  `;

  modal.addEventListener("click", () => closeModal());

  const closeBtn = modal.querySelector(".edu-visual__modal-close");
  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  const prevBtn = modal.querySelector<HTMLButtonElement>('[data-dir="prev"]');
  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      const prev = allPartsInFigure[currentIndex - 1];
      openPartInterface(prev.element, prev.info, allPartsInFigure, currentIndex - 1);
    }
  });

  const nextBtn = modal.querySelector<HTMLButtonElement>('[data-dir="next"]');
  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex < allPartsInFigure.length - 1) {
      const next = allPartsInFigure[currentIndex + 1];
      openPartInterface(next.element, next.info, allPartsInFigure, currentIndex + 1);
    }
  });

  document.body.appendChild(modal);
  activeModal = modal;
}

function escapeText(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── Floating detail widget: hover reveals it, click pins it ─────────────── */

let activeDotWidget: HTMLElement | null = null;
let activeDotElement: SVGGElement | null = null;
let dotWidgetPinned = false;
let dotHideTimer: ReturnType<typeof setTimeout> | null = null;

function cancelDotHide() {
  if (dotHideTimer) {
    clearTimeout(dotHideTimer);
    dotHideTimer = null;
  }
}

function closeDotWidget() {
  cancelDotHide();
  if (activeDotWidget) {
    activeDotWidget.remove();
    activeDotWidget = null;
  }
  if (activeDotElement) {
    activeDotElement.classList.remove("edu-visual__dot--active");
    activeDotElement = null;
  }
  dotWidgetPinned = false;
}

/** Hover-out is delayed so the pointer can travel into the widget to scroll. */
function scheduleDotHide() {
  cancelDotHide();
  if (dotWidgetPinned || !activeDotWidget) return;
  dotHideTimer = setTimeout(() => closeDotWidget(), 260);
}

function dotSectionHtml(section: DetailDotSection): string {
  const slug = section.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  // Relations and contrasts are full clauses (often with formulas), so they
  // read far better as stacked rows than as cramped chips.
  const isRowList = /contrast|versus|difference|relation/i.test(section.label);
  const isList = section.items.length > 1;
  let body: string;
  if (isRowList && isList) {
    body = `<div class="edu-visual__dot-rows">${section.items
      .map((item) => `<div class="edu-visual__dot-row">${escapeText(item)}</div>`)
      .join("")}</div>`;
  } else if (isList) {
    body = `<div class="edu-visual__dot-chips">${section.items
      .map((item) => `<span class="edu-visual__dot-chip">${escapeText(item)}</span>`)
      .join("")}</div>`;
  } else {
    body = `<div class="edu-visual__dot-text">${escapeText(section.value)}</div>`;
  }
  return `<div class="edu-visual__dot-section edu-visual__dot-section--${slug}">
      <div class="edu-visual__dot-label">${escapeText(section.label)}</div>
      ${body}
    </div>`;
}

function positionDotWidget(widget: HTMLElement, dotG: SVGGElement) {
  const rect = dotG.getBoundingClientRect();
  const width = Math.min(360, Math.max(240, window.innerWidth - 24));
  widget.style.width = `${width}px`;
  widget.style.maxHeight = `${Math.min(440, Math.max(200, window.innerHeight - 24))}px`;
  widget.style.left = `${Math.max(
    12,
    Math.min(window.innerWidth - width - 12, rect.left + rect.width / 2 - width / 2),
  )}px`;
  if (window.innerHeight - rect.bottom >= 260) {
    widget.style.top = `${rect.bottom + 10}px`;
  } else {
    widget.style.bottom = `${Math.max(12, window.innerHeight - rect.top + 10)}px`;
  }
}

function showDotWidget(
  dotG: SVGGElement,
  info: ParsedDetailDot,
  allDots: Array<{ element: SVGGElement; info: ParsedDetailDot }>,
  currentIndex: number,
  pinned: boolean,
) {
  closeDotWidget();
  hideTip();

  dotWidgetPinned = pinned;
  activeDotElement = dotG;
  dotG.classList.add("edu-visual__dot", "edu-visual__dot--active");
  dotG.setAttribute("tabindex", "0");
  dotG.setAttribute("role", "button");
  dotG.setAttribute("aria-label", `More detail: ${info.name}`);

  const widget = document.createElement("div");
  widget.className = `edu-visual__dot-popover${pinned ? " edu-visual__dot-popover--pinned" : ""}`;
  widget.setAttribute("role", "dialog");
  widget.setAttribute("aria-label", `Detail: ${info.name}`);
  widget.innerHTML = `
    <div class="edu-visual__dot-header">
      <span class="edu-visual__dot-badge">Detail ${currentIndex + 1} of ${allDots.length}</span>
      <button type="button" class="edu-visual__dot-close" aria-label="Close details" title="Close (Esc)">✕</button>
    </div>
    <h4 class="edu-visual__dot-title">${escapeText(info.name)}</h4>
    <div class="edu-visual__dot-body">${info.sections.map(dotSectionHtml).join("")}</div>
    <div class="edu-visual__dot-footer">
      <span class="edu-visual__dot-hint">${pinned ? "Esc or ✕ to close" : "Click the dot to pin these details"}</span>
      ${
        allDots.length > 1
          ? `<div class="edu-visual__dot-nav">
               <button type="button" class="edu-visual__dot-nav-btn" data-dir="prev" ${currentIndex === 0 ? "disabled" : ""} aria-label="Previous detail">←</button>
               <button type="button" class="edu-visual__dot-nav-btn" data-dir="next" ${currentIndex === allDots.length - 1 ? "disabled" : ""} aria-label="Next detail">→</button>
             </div>`
          : ""
      }
    </div>`;

  document.body.appendChild(widget);
  activeDotWidget = widget;
  positionDotWidget(widget, dotG);

  widget.addEventListener("mouseenter", cancelDotHide);
  widget.addEventListener("mouseleave", scheduleDotHide);
  widget.querySelector(".edu-visual__dot-close")?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeDotWidget();
  });
  widget.querySelector('[data-dir="prev"]')?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      const prev = allDots[currentIndex - 1];
      showDotWidget(prev.element, prev.info, allDots, currentIndex - 1, true);
    }
  });
  widget.querySelector('[data-dir="next"]')?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex < allDots.length - 1) {
      const next = allDots[currentIndex + 1];
      showDotWidget(next.element, next.info, allDots, currentIndex + 1, true);
    }
  });
}

let activeTip: HTMLElement | null = null;

function showTip(partG: SVGGElement, info: ParsedPartInfo) {
  hideTip();
  if (activeModal) return; // Don't show tooltip when full modal is open

  const tip = document.createElement("div");
  tip.className = "edu-visual__tip";
  tip.setAttribute("role", "tooltip");
  tip.innerHTML = `<strong>${escapeText(info.name)}</strong>${
    info.mechanism !== info.name ? `<div style="font-size:0.75rem;opacity:0.88;margin-top:2px">${escapeText(info.mechanism)}</div>` : ""
  }<div style="font-size:0.68rem;opacity:0.7;margin-top:4px;color:#93c5fd">Click to open full inspection</div>`;

  document.body.appendChild(tip);
  activeTip = tip;

  const rect = partG.getBoundingClientRect();
  const tipX = rect.left + rect.width / 2;
  const tipY = rect.top - 8;

  // Viewport clamping
  tip.style.left = `${Math.max(12, Math.min(window.innerWidth - 280, tipX))}px`;
  tip.style.top = `${Math.max(12, tipY)}px`;
  tip.style.position = "fixed";
  tip.style.transform = "translate(-50%, -100%)";
  tip.style.zIndex = "9999";
  tip.style.pointerEvents = "none";
}

function hideTip() {
  if (activeTip) {
    activeTip.remove();
    activeTip = null;
  }
}

/**
 * Register global event delegation for all `.edu-visual svg g` elements.
 * Runs once, client-side.
 */
export function registerEduVisualInteractive(): void {
  if (typeof window === "undefined" || isRegistered) return;
  isRegistered = true;

  // Global keydown for Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeDotWidget();
      hideTip();
    }
  });

  // Dots must be visibly interactive and keyboard-reachable BEFORE the first
  // hover (the figures are injected as innerHTML, so React never sees them).
  const markDots = () => {
    document.querySelectorAll<SVGGElement>(DETAIL_DOT_SELECTOR).forEach((dotG) => {
      if (dotG.getAttribute("data-edu-dot-ready")) return;
      dotG.setAttribute("data-edu-dot-ready", "1");
      dotG.classList.add("edu-visual__dot");
      dotG.setAttribute("tabindex", "0");
      dotG.setAttribute("role", "button");
      const raw = (dotG.querySelector(":scope > title")?.textContent ?? "").trim();
      dotG.setAttribute(
        "aria-label",
        raw ? `More detail: ${parseDetailDot(raw).name}` : "More detail",
      );
    });
  };
  markDots();
  if (typeof MutationObserver !== "undefined" && document.body) {
    // Attribute-only writes above are deliberately not observed, so this
    // cannot loop back into itself.
    new MutationObserver(() => markDots()).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Delegated mouseover: detail dots open the floating widget, ordinary
  // labelled parts keep the small badge tooltip.
  let lastHoveredPart: SVGGElement | null = null;
  document.addEventListener("mouseover", (e) => {
    const target = e.target as Element | null;
    if (!target || typeof target.closest !== "function") return;

    const dotG = target.closest<SVGGElement>(DETAIL_DOT_SELECTOR);
    if (dotG) {
      if (dotG === lastHoveredPart && activeDotElement === dotG) return;
      lastHoveredPart = dotG;
      // A pinned widget belongs to the student now — a stray hover must not
      // replace the details they are reading.
      if (dotWidgetPinned) return;
      const raw = (dotG.querySelector(":scope > title")?.textContent ?? "").trim();
      if (!raw) return;
      const allDots = collectDetailDots(dotG.closest(".edu-visual"));
      if (!allDots.length) return;
      const index = Math.max(0, allDots.findIndex((d) => d.element === dotG));
      showDotWidget(dotG, parseDetailDot(raw), allDots, index, false);
      return;
    }

    const partG = target.closest<SVGGElement>(".edu-visual svg g");
    if (!partG) {
      if (lastHoveredPart) {
        lastHoveredPart = null;
        hideTip();
      }
      return;
    }
    // A dot's children are never an ordinary labelled part.
    if (partG.closest(`.${DETAIL_DOT_CLASS}`)) return;

    if (partG === lastHoveredPart) return;
    lastHoveredPart = partG;

    const titleEl = partG.querySelector(":scope > title");
    const raw = (titleEl?.textContent ?? "").trim();
    if (!raw) return;

    partG.classList.add("edu-visual__part");
    partG.setAttribute("tabindex", "0");
    partG.setAttribute("role", "button");

    const info = parsePartTitle(raw);
    showTip(partG, info);
  }, { passive: true });

  // Delegated mouseleave
  document.addEventListener("mouseout", (e) => {
    const target = e.target as Element | null;
    if (!target || typeof target.closest !== "function") return;
    const related = (e as MouseEvent).relatedTarget as Element | null;

    const dotG = target.closest<SVGGElement>(DETAIL_DOT_SELECTOR);
    if (dotG) {
      // Travelling from the dot into its own widget must NOT dismiss it.
      if (related && (dotG.contains(related) || activeDotWidget?.contains(related))) return;
      scheduleDotHide();
      return;
    }
    const partG = target.closest<SVGGElement>(".edu-visual svg g");
    if (partG && !partG.closest(`.${DETAIL_DOT_CLASS}`)) {
      if (related && partG.contains(related)) return;
      lastHoveredPart = null;
      hideTip();
    }
  }, { passive: true });

  // Delegated click
  document.addEventListener("click", (e) => {
    const target = e.target as Element | null;

    // Close / navigation buttons inside the widget own their own handlers.
    if (activeDotWidget && target && activeDotWidget.contains(target)) return;

    const dotG = target?.closest<SVGGElement>(DETAIL_DOT_SELECTOR);
    if (dotG) {
      const raw = (dotG.querySelector(":scope > title")?.textContent ?? "").trim();
      if (!raw) return;
      const allDots = collectDetailDots(dotG.closest(".edu-visual"));
      if (!allDots.length) return;
      const index = Math.max(0, allDots.findIndex((d) => d.element === dotG));
      // Clicking pins the widget so it can be scrolled and read in full.
      showDotWidget(dotG, parseDetailDot(raw), allDots, index, true);
      return;
    }

    // Clicking anywhere else dismisses a pinned widget.
    closeDotWidget();

    const partG = target?.closest<SVGGElement>(".edu-visual svg g");
    if (!partG || partG.closest(`.${DETAIL_DOT_CLASS}`)) return;

    const titleEl = partG.querySelector(":scope > title");
    const raw = (titleEl?.textContent ?? "").trim();
    if (!raw) return;

    hideTip();

    // Find all parts in the same figure (dots are their own instrument).
    const figure = partG.closest(".edu-visual");
    const allParts: Array<{ element: SVGGElement; info: ParsedPartInfo }> = [];
    if (figure) {
      figure.querySelectorAll<SVGGElement>("svg g").forEach((g) => {
        if (isDetailDotElement(g)) return;
        const t = (g.querySelector(":scope > title")?.textContent ?? "").trim();
        if (t) {
          allParts.push({ element: g, info: parsePartTitle(t) });
        }
      });
    }

    const info = parsePartTitle(raw);
    const currentIndex = allParts.findIndex((p) => p.element === partG);
    openPartInterface(
      partG,
      info,
      allParts.length ? allParts : [{ element: partG, info }],
      currentIndex >= 0 ? currentIndex : 0,
    );
  });

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const active = document.activeElement as Element | null;
      const dotG = active?.closest<SVGGElement>(DETAIL_DOT_SELECTOR);
      if (dotG) {
        const raw = (dotG.querySelector(":scope > title")?.textContent ?? "").trim();
        if (raw) {
          e.preventDefault();
          const info = parseDetailDot(raw);
          const allDots = collectDetailDots(dotG.closest(".edu-visual"));
          const dots = allDots.length ? allDots : [{ element: dotG, info }];
          const index = Math.max(0, dots.findIndex((d) => d.element === dotG));
          showDotWidget(dotG, info, dots, index, true);
          return;
        }
      }
      const partG = active?.closest<SVGGElement>(".edu-visual svg g");
      if (partG && !partG.closest(`.${DETAIL_DOT_CLASS}`)) {
        const titleEl = partG.querySelector(":scope > title");
        const raw = (titleEl?.textContent ?? "").trim();
        if (raw) {
          e.preventDefault();
          hideTip();
          const info = parsePartTitle(raw);
          openPartInterface(partG, info, [{ element: partG, info }], 0);
        }
      }
    }
  });
}
