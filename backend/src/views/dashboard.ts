export function renderApiDashboardHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Educational Platform Global — NEB Study Vault API</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-hover: #0ea5e9;
      --success: #34d399;
      --font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font);
      line-height: 1.6;
      padding: 2rem 1.5rem;
      min-height: 100vh;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 1.5rem;
    }
    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.1);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.25);
    }
    .badge.success {
      background: rgba(52, 211, 153, 0.1);
      color: var(--success);
      border-color: rgba(52, 211, 153, 0.25);
    }
    h1 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }
    p.lead {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 750px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
    }
    .card h2 {
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card p {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .endpoint-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .endpoint-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      border: 1px solid var(--card-border);
      color: var(--text-main);
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-family: monospace;
      font-size: 0.82rem;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;
      text-decoration: none;
    }
    .endpoint-btn:hover {
      border-color: var(--accent);
      background: #1e293b;
      color: var(--accent);
    }
    .method {
      font-weight: 700;
      color: var(--accent);
      margin-right: 0.5rem;
    }
    .live-console {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .console-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .console-header h3 {
      font-size: 1.05rem;
    }
    pre {
      background: #090d16;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      font-family: monospace;
      font-size: 0.85rem;
      color: #38bdf8;
      max-height: 360px;
      border: 1px solid #1e293b;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge-row">
        <span class="badge success">● Service Operational</span>
        <span class="badge">Port 3000 (0.0.0.0)</span>
        <span class="badge">Node 22</span>
        <span class="badge">NEB Curriculum 2076/2078</span>
      </div>
      <h1>Educational Platform Global</h1>
      <p class="lead">
        Comprehensive NEB curriculum study vault with API endpoints for classes, subjects, notes, past questions, and AI tutoring.
      </p>
    </header>

    <div class="live-console">
      <div class="console-header">
        <h3>Live API Response Console</h3>
        <span id="tested-url" style="font-family: monospace; font-size: 0.85rem; color: var(--accent);">GET /health</span>
      </div>
      <pre id="output">Loading initial health check...</pre>
    </div>

    <div class="grid">
      <div class="card">
        <h2>Core API Endpoints</h2>
        <p>System health check and available AI model providers.</p>
        <div class="endpoint-list">
          <button class="endpoint-btn" onclick="fetchApi('/health')">
            <span><span class="method">GET</span>/health</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/ai/providers')">
            <span><span class="method">GET</span>/api/ai/providers</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/biology/units')">
            <span><span class="method">GET</span>/api/biology/units</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/biology/labs')">
            <span><span class="method">GET</span>/api/biology/labs</span>
            <span>Run ↗</span>
          </button>
        </div>
      </div>

      <div class="card">
        <h2>Curriculum & Syllabus</h2>
        <p>Classes, subjects, and chapters mapped to official NEB syllabus.</p>
        <div class="endpoint-list">
          <button class="endpoint-btn" onclick="fetchApi('/api/classes/grade-11')">
            <span><span class="method">GET</span>/api/classes/grade-11</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/subjects/physics')">
            <span><span class="method">GET</span>/api/subjects/physics</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/chapters/vectors')">
            <span><span class="method">GET</span>/api/chapters/vectors</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/topics/01-scalars-and-vectors')">
            <span><span class="method">GET</span>/api/topics/01-scalars-and-vectors</span>
            <span>Run ↗</span>
          </button>
        </div>
      </div>

      <div class="card">
        <h2>Notes & Question Sets</h2>
        <p>Exported notes, 732 concept JSONs, and practice resources.</p>
        <div class="endpoint-list">
          <button class="endpoint-btn" onclick="fetchApi('/api/ravikishan-notes?path=class-11-notes/physics/capacitor/concepts/01-capacitance-and-capacitor.json')">
            <span><span class="method">GET</span>/api/ravikishan-notes (Single JSON)</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/ravikishan-notes?subject=physics')">
            <span><span class="method">GET</span>/api/ravikishan-notes?subject=physics</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/r-notes')">
            <span><span class="method">GET</span>/api/r-notes</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/pyqs')">
            <span><span class="method">GET</span>/api/pyqs</span>
            <span>Run ↗</span>
          </button>
          <button class="endpoint-btn" onclick="fetchApi('/api/exams')">
            <span><span class="method">GET</span>/api/exams</span>
            <span>Run ↗</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    async function fetchApi(url) {
      const output = document.getElementById("output");
      const urlLabel = document.getElementById("tested-url");
      urlLabel.textContent = "GET " + url;
      output.textContent = "Loading " + url + "...";
      try {
        const res = await fetch(url);
        const data = await res.json();
        output.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        output.textContent = "Error: " + err.message;
      }
    }

    // Auto-run health check on load
    fetchApi('/health');
  </script>
</body>
</html>`;
}
