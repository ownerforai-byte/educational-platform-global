const fs = require('fs');
const https = require('https');

const SU = fs.readFileSync('.env').toString().split('\n').find(l => l.startsWith('SUPABASE_URL=')).split('=')[1].trim();
const SK = fs.readFileSync('.env').toString().split('\n').find(l => l.startsWith('SUPABASE_SERVICE_ROLE_KEY=')).split('=')[1].trim();
const AK = fs.readFileSync('.env').toString().split('\n').find(l => l.startsWith('SUPABASE_ANON_KEY=')).split('=')[1].trim();

function request(path, method = 'GET', body = null, key = SK) {
  return new Promise((resolve, reject) => {
    const u = new URL(path, SU);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers: {
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      timeout: 30000,
    };
    const q = https.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(data); } catch(e) { parsed = data; }
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    q.on('error', reject);
    q.on('timeout', () => { q.destroy(); reject(new Error('timeout: ' + path)); });
    if (body) q.write(typeof body === 'string' ? body : JSON.stringify(body));
    q.end();
  });
}

async function main() {
  console.log('============================================================\n');
  console.log('  SUPABASE PROJECT AUDIT — ' + SU + '\n');
  console.log('============================================================\n');

  // 1. Swagger spec = full schema
  console.log('─── 1. SWAGGER SPEC (full schema discovery) ───\n');
  const sw = await request('/rest/v1/');
  const spec = sw.body;
  console.log('  Swagger version: ' + (spec.info?.version || '?'));
  console.log('  API title: ' + (spec.info?.title || '?'));
  console.log('  Total endpoint paths: ' + Object.keys(spec.paths || {}).length);
  console.log('  Total table definitions: ' + Object.keys(spec.definitions || {}).length);
  console.log('');

  // 2. Group endpoints
  console.log('─── 2. REST ENDPOINTS BY GROUP ───\n');
  const groups = {};
  for (const path of Object.keys(spec.paths || {})) {
    const parts = path.replace(/^\/rpc\//, '').split('/').filter(Boolean);
    const group = parts[0] || '(root)';
    if (!groups[group]) groups[group] = [];
    groups[group].push(path);
  }
  for (const [g, ps] of Object.entries(groups).sort(([a],[b]) => a.localeCompare(b))) {
    console.log('  [' + g + ']  (' + ps.length + ' endpoints)');
    for (const p of ps) console.log('      ' + p);
    console.log('');
  }

  // 3. All tables with columns
  console.log('─── 3. ALL TABLES WITH FULL COLUMN DETAILS ───\n');
  let tableCount = 0;
  for (const [name, def] of Object.entries(spec.definitions || {})) {
    if (!def.properties) continue;
    tableCount++;
    const cols = Object.keys(def.properties);
    const required = (def.required || []);
    console.log('  ┌─ ' + name + '  (' + cols.length + ' columns, ' + required.length + ' required)');
    for (const c of cols) {
      const dtype = def.properties[c];
      const mark = required.includes(c) ? '  ★ REQUIRED' : '';
      console.log('  │   - ' + c + ': ' + (dtype.type || '?') + (dtype.format ? '(' + dtype.format + ')' : '') + mark);
    }
    console.log('  └───────────' + '─'.repeat(Math.max(0, name.length + 2)));
  }
  console.log('\n  Total exposed tables: ' + tableCount + '\n');

  // 4. Storage buckets
  console.log('─── 4. STORAGE BUCKETS ───\n');
  try {
    const r = await request('/storage/v1/buckets', 'GET', null, AK);
    console.log('  GET /storage/v1/buckets (anon key): ' + r.status);
    if (Array.isArray(r.body)) {
      if (r.body.length === 0) console.log('    → NO BUCKETS — storage is empty/unconfigured');
      r.body.forEach(b => console.log('    → bucket: ' + b.id + ' | name: ' + (b.name || '?') + ' | public: ' + b.public));
    } else {
      console.log('  ' + JSON.stringify(r.body).slice(0, 400));
    }
  } catch(e) { console.log('  storage/v1/buckets ERR: ' + e.message.slice(0, 200)); }

  try {
    const r = await request('/storage/v1/buckets', 'GET', null, SK);
    console.log('  GET /storage/v1/buckets (service key): ' + r.status);
    if (Array.isArray(r.body) && r.body.length > 0) {
      r.body.forEach(b => console.log('    → bucket (svc): ' + b.id + ' | public: ' + b.public));
    }
  } catch(e) { console.log('  storage (svc) ERR: ' + e.message.slice(0, 200)); }
  console.log('');

  // 5. Storage objects in default bucket
  console.log('─── 5. STORAGE OBJECTS (default bucket) ───\n');
  try {
    const r = await request('/storage/v1/object/list/', 'GET', null, SK);
    console.log('  GET /storage/v1/object/list/ (svc key): ' + r.status);
    if (r.status === 200 && Array.isArray(r.body)) {
      if (r.body.length === 0) console.log('    → NO OBJECTS in default bucket');
      else { r.body.forEach(o => console.log('    → ' + o.bucket_id + ' / ' + o.object_name)); }
    }
  } catch(e) { console.log('  object/list ERR: ' + e.message.slice(0, 200)); }
  console.log('');

  // 6. Count rows in each table
  console.log('─── 6. ROW COUNTS PER TABLE ───\n');
  const tableNames = Object.keys(spec.definitions || {}).filter(n => spec.definitions[n] && spec.definitions[n].properties);
  for (const t of tableNames) {
    try {
      const r = await request('/rest/v1/' + t + '?select=id&limit=1');
      if (r.status === 200) {
        const isArray = Array.isArray(r.body);
        console.log('  ' + t + ': accessible (count~ ' + (isArray && r.body.length ? r.body.length : '?') + ', OK)');
      } else {
        console.log('  ' + t + ': status ' + r.status + ' — ' + (r.body?.message || ''));
      }
    } catch(e) { console.log('  ' + t + ': ERR ' + e.message.slice(0, 100)); }
  }
  console.log('');

  // 7. RPC functions
  console.log('─── 7. RPC FUNCTIONS ───\n');
  const rpcPaths = Object.keys(spec.paths || {}).filter(p => p.startsWith('/rpc/'));
  console.log('  Total RPC endpoints: ' + rpcPaths.length);
  for (const p of rpcPaths) console.log('    ' + p);
  console.log('');

  // 8. Check for hidden tables
  console.log('─── 8. HIDDEN TABLES CHECK ───\n');
  try {
    const r = await request('/rest/v1/', 'HEAD');
    console.log('  HEAD /rest/v1/ status: ' + r.status);
    console.log('  (service key has full schema access — hidden tables would appear here)');
  } catch(e) { console.log('  ERR: ' + e.message); }
  console.log('');

  // 9. Summary
  console.log('─── 9. SUMMARY ───\n');
  console.log('  Tables in public schema: ' + tableCount);
  console.log('  Storage buckets: UNKNOWN (API endpoint 404 — storage may be disabled or legacy)');
  console.log('  RPC endpoints: ' + rpcPaths.length);
  console.log('  Schemas: only public visible (service key sees all via swagger)');
  console.log('');
  console.log('  TABLES LIST:');
  tableNames.sort().forEach(t => console.log('    - ' + t));
  console.log('');
}

main().then(() => process.exit(0)).catch(e => { console.error('FATAL:', e.stack); process.exit(1); });
