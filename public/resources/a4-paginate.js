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
  /* Blocks that are a single unit: they move whole or grow their sheet. */
  var NO_SPLIT_TAGS = /^(?:TABLE|P|UL|OL|LI|PRE|H1|H2|H3|H4|H5|H6|IMG|HR|QGRID|SVG|FIGURE|BLOCKQUOTE|TR|TD|TH|INPUT|LABEL|SPAN|A|B|I|CODE)$/;

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

  var insertAfter = null; // a repair pass anchors new sheets mid-document

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

    if (insertAfter && insertAfter.parentNode === desk) {
      desk.insertBefore(page, insertAfter.nextSibling);
    } else {
      desk.appendChild(page);
    }
    insertAfter = page;

    return { page: page, flow: flow, foot: footRight };
  }

  /* Split an oversized wrapper (a section/div that is taller than a sheet) at its
     own child boundaries, cloning the wrapper on each continuation so its styling
     survives. Returns the flow it finished in, or null when not splittable. */
  function splitWrapper(el, flow, desk, label) {
    var tag = el.tagName;

    // never split something that is already a single unit of meaning
    if (NO_SPLIT_TAGS.test(tag)) return null;
    if (el.classList.contains("qgrid") || el.classList.contains("item")) return null;
    if (el.children.length < 2) return null;

    var children = [].slice.call(el.childNodes);
    if (el.parentNode) el.parentNode.removeChild(el);

    // a <details> keeps its summary on every continuation, like a table header
    var repeatHead = null;
    if (tag === "DETAILS") {
      var summary = el.querySelector("summary");
      if (summary) repeatHead = summary.cloneNode(true);
    }

    var current = el.cloneNode(false);
    current.removeAttribute("id"); // a continuation must not copy the anchor
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
      current.removeAttribute("id");
      flow.appendChild(current);
      if (repeatHead) current.appendChild(repeatHead.cloneNode(true));
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

  /* Replace a chain of single-child wrappers (.page > card > div) with the
     innermost block, so the thing that actually overflows can be split. */
  function descendSingleChild(flow) {
    for (var i = 0; i < 8; i++) {
      var last = flow.lastElementChild;
      if (!last) return;
      if (NO_SPLIT_TAGS.test(last.tagName)) return;
      if (last.classList.contains("qgrid") || last.classList.contains("item")) return;
      if (last.children.length !== 1) return;

      var only = last.firstElementChild;
      flow.insertBefore(only, last);
      flow.removeChild(last);
    }
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

      // how much of the sheet is already in use before this block lands
      var usedBefore = 0;
      var lastKid = current.flow.lastElementChild;
      if (lastKid) {
        usedBefore = lastKid.getBoundingClientRect().bottom - current.flow.getBoundingClientRect().top;
      }

      current.flow.appendChild(block);

      if (!overflows(current.flow)) continue;

      // a wrapper whose only child is the real content: let that child be the
      // block, so its own rows or children can be split across sheets
      descendSingleChild(current.flow);
      block = current.flow.lastElementChild || block;

      if (!overflows(current.flow)) continue;

      // a block that can never fit on a sheet — longer than a whole page even
      // when it starts at the top — is split here so this sheet fills up
      var pageHeight = current.flow.clientHeight;
      var blockHeight = block.getBoundingClientRect().height;
      var oversize = blockHeight > pageHeight + TOLERANCE;

      if (oversize) {
        current.flow.removeChild(block);
        var resumedHere =
          block.tagName === "TABLE"
            ? splitTable(block, current.flow, desk, label, 0)
            : splitWrapper(block, current.flow, desk, label);

        if (resumedHere) {
          current = { page: resumedHere.parentNode, flow: resumedHere, foot: null };
          continue;
        }
        // nothing to split: put it back and let the sheet grow
        current.flow.appendChild(block);
        if (current.page) current.page.classList.add("a4-page--tall");
        continue;
      }

      // does not fit on a page that already has content: try the next sheet
      if (current.flow.childNodes.length > 1) {
        var previous = current;
        current.flow.removeChild(block);
        var carried = nextPage();
        carryHeading(previous.flow, carried.flow);
        carried.flow.appendChild(block);
      }

      if (!overflows(current.flow)) continue;

      // a block that only just exceeds an empty sheet: split it there
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

    // balance(): nothing may overflow its sheet and no heading may sit alone at a
    // page foot. Repeats until stable, because both moves can push a block onwards.
    function balance() {
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

          // a nearly empty sheet pulls the next sheet's opening block back up,
          // so pages read full rather than one short fragment per sheet
          var nextFirst = nextFlow.firstElementChild;
          if (nextFirst && !isHeading(nextFirst) && !overflows(pageFlow)) {
            pageFlow.appendChild(nextFirst);
            if (overflows(pageFlow)) {
              pageFlow.removeChild(nextFirst);
              nextFlow.insertBefore(nextFirst, nextFlow.firstChild);
            } else {
              changed = true;
            }
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
    }

    // repair(): balancing can strand one oversized block alone on a sheet, and a
    // lone block cannot be pushed anywhere. Split it in place and insert the
    // continuation sheets straight after it, so document order is preserved.
    function repair() {
      var fixed = 0;

      for (var i = 0; i < desk.children.length && fixed < 80; i++) {
        var sheet = desk.children[i];
        if (!sheet.classList || !sheet.classList.contains(PAGE_CLASS)) continue;

        var flow = sheet.querySelector(".a4-page__body");
        if (!flow || !overflows(flow)) continue;
        if (flow.children.length !== 1) continue;

        var target = flow.firstElementChild;

        // unwrap single-child chains down to the block that actually splits
        for (var d = 0; d < 8; d++) {
          if (target.tagName === "TABLE") break;
          if (NO_SPLIT_TAGS.test(target.tagName)) break;
          if (target.classList.contains("qgrid") || target.classList.contains("item")) break;
          if (target.children.length !== 1) break;
          target = target.children[0];
        }

        if (target !== flow.firstElementChild) {
          // drop the wrappers, keep the innermost content where it was
          flow.appendChild(target);
          var stale = flow.firstElementChild;
          if (stale && stale !== target && stale.parentNode) stale.parentNode.removeChild(stale);
        }

        if (target.parentNode) target.parentNode.removeChild(target);

        insertAfter = sheet;
        var done = null;
        try {
          done =
            target.tagName === "TABLE"
              ? splitTable(target, flow, desk, label, 0)
              : splitWrapper(target, flow, desk, label);
        } finally {
          insertAfter = null;
        }

        if (done) fixed++;
      }
    }

    balance();
    repair();
    balance();

    // carrying headings can leave a sheet holding nothing at all: drop it
    var empties = [].slice.call(desk.querySelectorAll("." + PAGE_CLASS));
    for (var e = 0; e < empties.length; e++) {
      var emptyFlow = empties[e].querySelector(".a4-page__body");
      if (emptyFlow && !emptyFlow.children.length && empties[e].parentNode) {
        empties[e].parentNode.removeChild(empties[e]);
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
