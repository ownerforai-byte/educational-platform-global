"use client";

import * as THREE from "three";

export interface LeaderLine {
  label: THREE.Object3D;
  target: THREE.Vector3;
  color: string;
  id?: string;
}

export interface LeaderLineRuntimeState {
  expanded: boolean;
}

export function createLeaderLayer(
  mount: HTMLElement,
  initialState?: Record<string, LeaderLineRuntimeState>
): {
  draw: (camera: THREE.Camera, lines: LeaderLine[]) => void;
  dispose: () => void;
  toggle: (id: string) => boolean;
  isExpanded: (id: string) => boolean;
  setExpanded: (id: string, expanded: boolean) => void;
  getPinIds: () => string[];
} {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("data-leader-layer", "true");
  svg.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9";
  mount.appendChild(svg);

  const stateStore: Record<string, LeaderLineRuntimeState> = initialState ?? {};
  const lastIds: Set<string> = new Set();

  svg.addEventListener(
    "click",
    (evt) => {
      const target = evt.target as Element | null;
      if (!target) return;
      const pinId = target.getAttribute && target.getAttribute("data-pin-id");
      if (!pinId) return;
      evt.stopPropagation();
      evt.preventDefault();
      const cur = stateStore[pinId] ?? { expanded: false };
      stateStore[pinId] = { expanded: !cur.expanded };
      svg.dispatchEvent(
        new CustomEvent("leader-line-toggle", {
          bubbles: true,
          detail: { id: pinId, expanded: stateStore[pinId].expanded },
        })
      );
    },
    true
  );

  function project2(
    cam: THREE.Camera,
    p: THREE.Vector3,
    w: number,
    h: number
  ): [number, number] {
    const v = p.clone().project(cam);
    return [(v.x + 1) * (w / 2), (1 - v.y) * (h / 2)];
  }

  function draw(camera: THREE.Camera, lines: LeaderLine[]) {
    svg.innerHTML = "";
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    const ns = "http://www.w3.org/2000/svg";
    const tmp = new THREE.Vector3();
    const currentIds = new Set<string>();

    lines.forEach((l, idx) => {
      if (!l.label.visible) return;
      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const [sx, sy] = project2(camera, tmp, w, h);
      const [tx, ty] = project2(camera, l.target, w, h);
      if (Math.abs(sx - tx) < 1 && Math.abs(sy - ty) < 1) return;
      if (sx < -80 || sy < -80 || sx > w + 80 || sy > h + 80) return;

      const lineId = l.id ?? `line-${idx}`;
      currentIds.add(lineId);
      if (!(lineId in stateStore)) {
        stateStore[lineId] = { expanded: false };
      }
      const expanded = stateStore[lineId].expanded;

      const baseBend = expanded ? 88 : 26;
      const my = Math.min(sy, ty) - baseBend;
      const mx = (sx + tx) / 2;
      const path =
        `M ${sx.toFixed(1)} ${sy.toFixed(1)}` +
        ` Q ${mx.toFixed(1)} ${my.toFixed(1)}` +
        ` ${tx.toFixed(1)} ${ty.toFixed(1)}`;
      const angle = Math.atan2(ty - my, tx - mx);

      const strokeWidth = expanded ? 4.0 : 2.4;
      const opacity = expanded ? 1 : 0.95;
      const headLen = expanded ? 14 : 8;
      const halfApex = 0.42;
      const a1x = tx - headLen * Math.cos(angle - halfApex);
      const a1y = ty - headLen * Math.sin(angle - halfApex);
      const a2x = tx - headLen * Math.cos(angle + halfApex);
      const a2y = ty - headLen * Math.sin(angle + halfApex);

      const line = document.createElementNS(ns, "path");
      line.setAttribute("d", path);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", l.color);
      line.setAttribute("stroke-width", String(strokeWidth));
      line.setAttribute("stroke-opacity", String(opacity));
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("data-line-id", lineId);
      svg.appendChild(line);

      const head = document.createElementNS(ns, "path");
      head.setAttribute(
        "d",
        `M ${a1x.toFixed(1)} ${a1y.toFixed(1)}` +
          ` L ${tx.toFixed(1)} ${ty.toFixed(1)}` +
          ` L ${a2x.toFixed(1)} ${a2y.toFixed(1)}`
      );
      head.setAttribute("fill", l.color);
      head.setAttribute("stroke", "none");
      head.setAttribute("data-arrowhead-id", lineId);
      svg.appendChild(head);

      const pinR = expanded ? 8.5 : 5.5;
      const pinInnerR = expanded ? 3.5 : 2.2;
      const pin = document.createElementNS(ns, "circle");
      pin.setAttribute("cx", `${mx.toFixed(1)}`);
      pin.setAttribute("cy", `${my.toFixed(1)}`);
      pin.setAttribute("r", String(pinR));
      pin.setAttribute("fill", "#ffffff");
      pin.setAttribute("stroke", l.color);
      pin.setAttribute("stroke-width", "2.2");
      pin.setAttribute("data-pin-id", lineId);
      pin.setAttribute("data-expanded", expanded ? "1" : "0");
      pin.style.cssText = "pointer-events:auto;cursor:pointer;";
      svg.appendChild(pin);

      const pinInner = document.createElementNS(ns, "circle");
      pinInner.setAttribute("cx", `${mx.toFixed(1)}`);
      pinInner.setAttribute("cy", `${my.toFixed(1)}`);
      pinInner.setAttribute("r", String(pinInnerR));
      pinInner.setAttribute("fill", l.color);
      pinInner.setAttribute("stroke", "none");
      pinInner.setAttribute("data-pin-inner-id", lineId);
      pinInner.style.cssText = "pointer-events:none;";
      svg.appendChild(pinInner);

      if (expanded) {
        const glyphRadius = 2.8;
        const minusBar = document.createElementNS(ns, "rect");
        minusBar.setAttribute("x", `${(mx - glyphRadius).toFixed(1)}`);
        minusBar.setAttribute("y", `${(my - 0.8).toFixed(1)}`);
        minusBar.setAttribute("width", `${(glyphRadius * 2).toFixed(1)}`);
        minusBar.setAttribute("height", "1.6");
        minusBar.setAttribute("fill", l.color);
        minusBar.setAttribute("rx", "0.8");
        minusBar.style.cssText = "pointer-events:none;";
        svg.appendChild(minusBar);
      } else {
        const glyphRadius = 2.6;
        const plusH = document.createElementNS(ns, "rect");
        plusH.setAttribute("x", `${(mx - glyphRadius).toFixed(1)}`);
        plusH.setAttribute("y", `${(my - 0.8).toFixed(1)}`);
        plusH.setAttribute("width", `${(glyphRadius * 2).toFixed(1)}`);
        plusH.setAttribute("height", "1.6");
        plusH.setAttribute("fill", l.color);
        plusH.setAttribute("rx", "0.8");
        plusH.style.cssText = "pointer-events:none;";
        svg.appendChild(plusH);

        const plusV = document.createElementNS(ns, "rect");
        plusV.setAttribute("x", `${(mx - 0.8).toFixed(1)}`);
        plusV.setAttribute("y", `${(my - glyphRadius).toFixed(1)}`);
        plusV.setAttribute("width", "1.6");
        plusV.setAttribute("height", `${(glyphRadius * 2).toFixed(1)}`);
        plusV.setAttribute("fill", l.color);
        plusV.setAttribute("rx", "0.8");
        plusV.style.cssText = "pointer-events:none;";
        svg.appendChild(plusV);
      }
    });

    for (const existingId of Array.from(lastIds)) {
      if (!currentIds.has(existingId)) {
        delete stateStore[existingId];
      }
    }
    lastIds.clear();
    currentIds.forEach((id) => lastIds.add(id));
  }

  function toggle(id: string): boolean {
    const cur = stateStore[id] ?? { expanded: false };
    stateStore[id] = { expanded: !cur.expanded };
    svg.dispatchEvent(
      new CustomEvent("leader-line-toggle", {
        bubbles: true,
        detail: { id, expanded: stateStore[id].expanded },
      })
    );
    return stateStore[id].expanded;
  }

  function isExpanded(id: string): boolean {
    return !!stateStore[id]?.expanded;
  }

  function setExpanded(id: string, expanded: boolean): void {
    stateStore[id] = { expanded: !!expanded };
  }

  function getPinIds(): string[] {
    return Object.keys(stateStore);
  }

  function dispose() {
    if (svg.parentNode) svg.parentNode.removeChild(svg);
  }

  return { draw, dispose, toggle, isExpanded, setExpanded, getPinIds };
}

export default createLeaderLayer;
