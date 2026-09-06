const https = require('https');
const fs = require('fs');

https.get('https://moecdc.gov.np/content/601/biology-grade---11/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract PDF links
    const pdfLinks = data.match(/href=["']([^"']*?\.pdf)["']/gi) || [];
    console.log('=== PDF LINKS ===');
    pdfLinks.forEach(l => console.log(l.replace(/href=["']([^"']+?)["']/i, '$1')));

    // Extract all links
    const allLinks = data.match(/href=["']([^"']+)["']/gi) || [];
    console.log('\n=== ALL LINKS (filtered) ===');
    allLinks.map(l => l.replace(/href=["']([^"']+?)["']/i, '$1'))
      .filter(l => !l.startsWith('#') && !l.startsWith('http') && l.length > 3)
      .slice(0, 50)
      .forEach(l => console.log(l));

    // Extract titles/headings
    const headings = data.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi) || [];
    console.log('\n=== HEADINGS ===');
    headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

    // Save raw HTML for inspection
    fs.writeFileSync('cdc-biology-page.html', data);
    console.log('\nSaved raw HTML to cdc-biology-page.html (' + data.length + ' bytes)');
  });
});
