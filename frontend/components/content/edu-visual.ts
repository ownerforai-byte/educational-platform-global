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

let isRegistered = false;
let activeModal: HTMLElement | null = null;
let activePartElement: SVGElement | null = null;

function closeModal() {
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
      hideTip();
    }
  });

  // Delegated mouseenter/mouseover
  document.addEventListener("mouseover", (e) => {
    const target = e.target as Element | null;
    const partG = target?.closest<SVGGElement>(".edu-visual svg g");
    if (!partG) {
      hideTip();
      return;
    }

    const titleEl = partG.querySelector(":scope > title");
    const raw = (titleEl?.textContent ?? "").trim();
    if (!raw) return;

    partG.classList.add("edu-visual__part");
    partG.setAttribute("tabindex", "0");
    partG.setAttribute("role", "button");

    const info = parsePartTitle(raw);
    showTip(partG, info);
  });

  // Delegated mouseleave
  document.addEventListener("mouseout", (e) => {
    const target = e.target as Element | null;
    if (target?.closest(".edu-visual svg g")) {
      hideTip();
    }
  });

  // Delegated click
  document.addEventListener("click", (e) => {
    const target = e.target as Element | null;
    const partG = target?.closest<SVGGElement>(".edu-visual svg g");
    if (!partG) return;

    const titleEl = partG.querySelector(":scope > title");
    const raw = (titleEl?.textContent ?? "").trim();
    if (!raw) return;

    hideTip();

    // Find all parts in the same figure
    const figure = partG.closest(".edu-visual");
    const allParts: Array<{ element: SVGGElement; info: ParsedPartInfo }> = [];
    if (figure) {
      figure.querySelectorAll<SVGGElement>("svg g").forEach((g) => {
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
      const partG = active?.closest<SVGGElement>(".edu-visual svg g");
      if (partG) {
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
