const https = require('https');
const fs = require('fs');
const out = [];

function get(url, cb, depth = 0) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && depth < 5) {
      return get(new URL(res.headers.location, url).href, cb, depth + 1);
    }
    let data = '';
    res.on('data', (c) => (data += c));
    res.on('end', () => cb(data));
  }).on('error', (e) => cb('ERROR: ' + e.message));
}

get('https://moecdc.gov.np/content/600/physics-grade---11/', (html) => {
  if (html.startsWith('ERROR')) { fs.writeFileSync(__dirname + '/extract_result.txt', html); return; }
  out.push('PAGE SIZE: ' + html.length);
  // all hrefs and srcs
  const links = [...html.matchAll(/(?:href|src|data-src)="([^"]+)"/g)].map((m) => m[1]);
  const interesting = links.filter((l) => /\.pdf|storage|uploads|content|download/i.test(l));
  out.push('--- RELEVANT LINKS ---');
  out.push([...new Set(interesting)].join('\n'));
  // iframe tags
  const iframes = [...html.matchAll(/<iframe[^>]*>/g)].map((m) => m[0]);
  out.push('--- IFRAMES ---');
  out.push(iframes.join('\n'));
  // pdf mentions
  const pdfs = [...html.matchAll(/[^"' ]+\.pdf[^"' ]*/gi)].map((m) => m[0]);
  out.push('--- PDF MENTIONS ---');
  out.push([...new Set(pdfs)].join('\n'));
  // main content area
  const body = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const h1 = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].trim());
  out.push('--- H1 ---');
  out.push(h1.join(' | '));
  fs.writeFileSync(__dirname + '/extract_result.txt', out.join('\n'));
});
