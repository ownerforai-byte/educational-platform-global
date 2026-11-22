/*
 * a4-paginate.js — turn one long study document into a vertical stack of
 * real A4 pages, the way a PDF viewer shows them.
 *
 * Loaded with `defer` next to a4-document.css. On load it:
 *
 *   1. snapshots the document body (so a resize can rebuild from scratch),
 *   2. creates .a4-page sheets with a running label, a measured flow area and a
 *      "page N of M" foot,
 *   3. moves the top-level blocks into the current sheet, opening a new sheet
 *      whenever a block would overflow it,
 *   4. splits long tables by row, repeating the header on every continuation,
 *   5. lets a single block taller than one sheet grow that one sheet instead of
 *      clipping it.
 *
 * Nothing is thrown away and no markup has to be authored for it: any content
 * added to a document later simply flows onto the next page. If anything goes
 * wrong the script restores the snapshot and the document stays readable as one
 * continuous column, so pagination can never lose content.
 *
 * Debug handle: window.__a4 = { pages, rebuild }.
 */
(function () {
  "use strict";

  var MARK = "a4-paginated";
  var PAGE_CLASS = "a4-page";
  var MAX_SPLIT_DEPTH = 6; // table-in-table nesting we are willing to split
  var TOLERANCE = 1; // px of rounding slack when testing a fit

  var snapshot = null; // original body HTML without scripts
  var lastWidth = 0;
  var rebuildTimer = null;

  function bodyLabel() {
    var crumb = document.querySelector(".crumb");
    var text = "";

    if (crumb) text = crumb.textContent || "";
    if (!text.trim()) {
      var meta = document.querySelector(".meta");
      if (meta) text = meta.textContent || "";
    }
    if (!text.trim()) text = document.title || "";

    text = text.replace(/\s+/g, " ").trim();
    if (text.length > 78) text = text.slice(0, 75).trim() + "\u2026";
    return text;
  }

  function isChrome(node) {
    if (node.nodeType !== 1) return true; // text nodes ride along with blocks
    var tag = node.tagName;
    return (
      tag === "SCRIPT" ||
      tag === "STYLE" ||
      tag === "LINK" ||
      tag === "META" ||
      tag === "NOSCRIPT" ||
      node.classList.contains(PAGE_CLASS) ||
      node.classList.contains("a4-desk")
    );
  }

  function takeSnapshot() {
    var holder = document.createElement("div");
    holder.innerHTML = document.body.innerHTML;

    var junk = holder.querySelectorAll("script, .a4-page, .a4-desk");
    for (var i = 0; i < junk.length; i++) {
      if (junk[i].parentNode) junk[i].parentNode.removeChild(junk[i]);
    }
    snapshot = holder.innerHTML;
  }

  function newPage(desk, label) {
    var page = document.createElement("section");
    page.className = PAGE_CLASS;
    page.setAttribute("data-a4-page", "");

    if (label) {
      var head = document.createElement("header");
      head.className = "a4-page__head";

      var left = document.createElement("span");
      left.textContent = label;

      var right = document.createElement("span");
      right.className = "a4-page__head-right";

      head.appendChild(left);
      head.appendChild(right);
      page.appendChild(head);
    }

    var flow = document.createElement("div");
    flow.className = "a4-page__body";
    page.appendChild(flow);

    var foot = document.createElement("footer");
    foot.className = "a4-page__foot";

    var footLeft = document.createElement("span");
    footLeft.textContent = label || "";

    var footRight = document.createElement("span");
    footRight.className = "a4-page__foot-page";

    foot.appendChild(footLeft);
    foot.appendChild(footRight);
    page.appendChild(foot);

    desk.appendChild(page);
    return { page: page, flow: flow, foot: footRight };
  }

  /* Split an oversized wrapper (a section/div that is taller than a sheet) at its
     own child boundaries, cloning the wrapper on each continuation so its styling
     survives. Returns the flow it finished in, or null when not splittable. */
  function splitWrapper(el, flow, desk, label) {
    var tag = el.tagName;
    if (tag !== "SECTION" && tag !== "DIV" && tag !== "ARTICLE" && tag !== "MAIN") return null;
    if (el.classList.contains("qgrid") || el.classList.contains("item")) return null;
    if (el.children.length < 2) return null;

    var children = [].slice.call(el.childNodes);
    if (el.parentNode) el.parentNode.removeChild(el);

    var current = el.cloneNode(false);
    flow.appendChild(current);

    for (var i = 0; i < children.length; i++) {
      current.appendChild(children[i]);
      if (!overflows(flow)) continue;
      if (current.children.length < 2) continue; // too big even alone: leave it

      var last = current.lastChild;
      current.removeChild(last);

      var next = newPage(desk, label);
      carryHeading(flow, next.flow);
      flow = next.flow;
      current = el.cloneNode(false);
      flow.appendChild(current);
      current.appendChild(last);
    }

    return flow;
  }

  function overflows(flow) {
    return flow.scrollHeight > flow.clientHeight + TOLERANCE;
  }

  function isEmpty(flow) {
    return flow.childNodes.length === 0;
  }

  /* A heading must never be the last thing on a sheet: carry it forward. */
  function isHeading(el) {
    return el && /^H[1-4]$/.test(el.tagName);
  }

  function carryHeading(prevFlow, nextFlow) {
    var last = prevFlow.lastElementChild;
    if (!isHeading(last)) return;
    if (!prevFlow.children.length) return;
    nextFlow.insertBefore(last, nextFlow.firstChild);
  }

  /* Split a table across sheets by row, repeating <thead> on each part. */
  function splitTable(table, flow, desk, label, depth) {
    if (depth > MAX_SPLIT_DEPTH) return null;

    var head = table.querySelector("thead");
    var rows = [];
    var bodySections = table.querySelectorAll("tbody");

    if (bodySections.length) {
      for (var s = 0; s < bodySections.length; s++) {
        for (var r = 0; r < bodySections[s].rows.length; r++) {
          rows.push(bodySections[s].rows[r].cloneNode(true));
        }
      }
    } else {
      for (var k = 0; k < table.rows.length; k++) {
        rows.push(table.rows[k].cloneNode(true));
      }
    }

    if (!rows.length) return null;

    function part() {
      var clone = table.cloneNode(false);
      if (head) clone.appendChild(head.cloneNode(true));
      var body = document.createElement("tbody");
      clone.appendChild(body);
      return { table: clone, body: body };
    }

    var pending = rows.slice();
    var current = part();
    flow.appendChild(current.table);

    while (pending.length) {
      var row = pending.shift();
      current.body.appendChild(row);

      if (overflows(flow) && current.body.rows.length > 1) {
        current.body.removeChild(row);
        pending.unshift(row);

        // move to a fresh sheet and start the next part there
        var next = newPage(desk, label);
        carryHeading(flow, next.flow); // the part's heading travels with it
        flow = next.flow;
        current = part();
        flow.appendChild(current.table);
      }
    }

    return flow;
  }

  function paginate() {
    for (var attempt = 0; attempt < 2; attempt++) {
      try {
        build();
        return true;
      } catch (err) {
        // restore and fall back to a single continuous column
        if (window.console && console.warn) console.warn("a4-paginate:", err);
        document.documentElement.classList.remove(MARK);
        if (snapshot !== null) document.body.innerHTML = snapshot;
      }
    }
    return false;
  }

  function build() {
    var label = bodyLabel();

    if (snapshot === null) takeSnapshot();
    else document.body.innerHTML = snapshot;

    var nodes = [];
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
      var node = children[i];
      if (!isChrome(node)) nodes.push(node);
      else if (node.tagName === "SCRIPT" || node.tagName === "STYLE") {
        node.parentNode && node.parentNode.removeChild(node);
      }
    }

    if (!nodes.length) return;

    var desk = document.createElement("div");
    desk.className = "a4-desk";

    // detach the blocks, then re-place them page by page
    var detached = nodes.slice();
    for (var d = 0; d < detached.length; d++) {
      if (detached[d].parentNode) detached[d].parentNode.removeChild(detached[d]);
    }

    document.body.appendChild(desk);

    var current = newPage(desk, label);
    var pages = [current];

    function nextPage() {
      current = newPage(desk, label);
      pages.push(current);
      return current;
    }

    var queue = detached.slice();

    while (queue.length) {
      var block = queue.shift();

      // honour an explicit break
      if (block.classList && block.classList.contains("page-break") && !isEmpty(current.flow)) {
        nextPage();
      }

      current.flow.appendChild(block);

      if (!overflows(current.flow)) continue;

      // does not fit on a page that already has content: try the next sheet
      if (current.flow.childNodes.length > 1) {
        var previous = current;
        current.flow.removeChild(block);
        var carried = nextPage();
        carryHeading(previous.flow, carried.flow);
        carried.flow.appendChild(block);
      }

      if (!overflows(current.flow)) continue;

      // still too big on an empty sheet
      if (block.tagName === "TABLE") {
        current.flow.removeChild(block);
        var resumed = splitTable(block, current.flow, desk, label, 0);
        if (resumed) {
          current = { page: resumed.parentNode, flow: resumed, foot: null };
          continue;
        }
        // splitting was not possible: put the table back whole
        current.flow.appendChild(block);
      } else {
        // an oversized section: split it at its own children, keeping its styling
        var wrapped = splitWrapper(block, current.flow, desk, label);
        if (wrapped) {
          current = { page: wrapped.parentNode, flow: wrapped, foot: null };
          continue;
        }
      }

      // a single block taller than A4: let exactly this sheet grow
      if (current.page) current.page.classList.add("a4-page--tall");
    }

    // final sweep: nothing may overflow its sheet and no heading may sit alone at a
    // page foot. Repeats until stable, because both moves can push a block onwards.
    var allSheets = [].slice.call(desk.querySelectorAll("." + PAGE_CLASS));
    for (var pass = 0; pass < 40; pass++) {
      var changed = false;

      for (var s = 0; s < allSheets.length; s++) {
        var pageFlow = allSheets[s].querySelector(".a4-page__body");
        var nextFlow = allSheets[s + 1]
          ? allSheets[s + 1].querySelector(".a4-page__body")
          : null;

        if (!pageFlow) continue;

        if (!nextFlow) {
          if (overflows(pageFlow) && pageFlow.children.length) {
            allSheets[s].classList.add("a4-page--tall");
          }
          continue;
        }

        // a heading must never be the last thing on a sheet
        if (isHeading(pageFlow.lastElementChild)) {
          nextFlow.insertBefore(pageFlow.lastElementChild, nextFlow.firstChild);
          changed = true;
        }

        // spill anything that still does not fit onto the next sheet
        var guard = 0;
        while (overflows(pageFlow) && pageFlow.children.length > 1 && guard++ < 60) {
          var spill = pageFlow.lastElementChild;
          pageFlow.removeChild(spill);
          nextFlow.insertBefore(spill, nextFlow.firstChild);
          changed = true;
          if (isHeading(pageFlow.lastElementChild)) {
            nextFlow.insertBefore(pageFlow.lastElementChild, nextFlow.firstChild);
          }
        }
      }

      if (!changed) break;
    }

    // carrying headings can leave a sheet holding nothing at all: drop it
    for (var e = 0; e < allSheets.length; e++) {
      var emptyFlow = allSheets[e].querySelector(".a4-page__body");
      if (emptyFlow && !emptyFlow.children.length) {
        if (allSheets[e].parentNode) allSheets[e].parentNode.removeChild(allSheets[e]);
      }
    }

    // page numbers and running labels
    var sheets = desk.querySelectorAll("." + PAGE_CLASS);
    for (var p = 0; p < sheets.length; p++) {
      var footPage = sheets[p].querySelector(".a4-page__foot-page");
      if (footPage) footPage.textContent = "page " + (p + 1) + " of " + sheets.length;
    }

    document.documentElement.classList.add(MARK);

    window.__a4 = {
      pages: sheets.length,
      rebuild: function () {
        paginate();
      },
    };
  }

  function start() {
    lastWidth = window.innerWidth;
    paginate();
  }

  function onResize() {
    if (Math.abs(window.innerWidth - lastWidth) < 120) return;
    lastWidth = window.innerWidth;
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(function () {
      paginate();
    }, 250);
  }

  if (document.documentElement.getAttribute("data-a4") === "off") return;

  function boot() {
    if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
      document.fonts.ready.then(start, start);
    } else {
      start();
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("beforeprint", function () {
      // printing relies on the same sheets; nothing extra needed
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
