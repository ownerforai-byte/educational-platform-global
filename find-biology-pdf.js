const https = require('https');
const fs = require('fs');

// Try to find the biology PDF from the CDC website
const options = {
  hostname: 'moecdc.gov.np',
  path: '/content/601/biology-grade---11/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find PDF URLs
    const pdfs = data.match(/giwmscdnone\.gov\.np[^"'`\s>]*\.pdf/gi) || [];
    console.log('PDF URLs found:', pdfs.length);
    pdfs.forEach(p => console.log('https://' + p));

    // Find iframes (flipbook viewers often use iframes)
    const iframes = data.match(/<iframe[^>]*src=["']([^"'`]+)["']/gi) || [];
    console.log('\nIframes:', iframes.length);
    iframes.forEach(i => console.log(i.substring(0, 300)));

    // Find any media/upload URLs
    const mediaUrls = data.match(/giwmscdnone\.gov\.np[^"'`\s>]+/gi) || [];
    const uniqueMedia = [...new Set(mediaUrls)].filter(u => !u.endsWith('.css') && !u.endsWith('.js') && !u.endsWith('.png') && !u.endsWith('.jpg') && !u.endsWith('.gif') && !u.endsWith('.webp'));
    console.log('\nUnique media/content URLs:', uniqueMedia.length);
    uniqueMedia.forEach(u => console.log('https://' + u));

    // Save full HTML for later inspection
    fs.writeFileSync('cdc-bio-full.html', data);
    console.log('\nFull page saved:', data.length, 'bytes');
  });
});
