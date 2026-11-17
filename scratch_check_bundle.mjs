async function run() {
  const res = await fetch('https://harindrasah.com.np/login');
  const html = await res.text();
  console.log('Login HTML length:', html.length);
  const regex = /src="(\/_next\/static\/chunks\/[^"]+)"/g;
  let match;
  const scripts = [];
  while ((match = regex.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  console.log('Found chunks count:', scripts.length);
  for (const src of scripts) {
    const js = await (await fetch('https://harindrasah.com.np' + src)).text();
    const hasKey = js.includes('AIzaSyBGJm9');
    const hasProject = js.includes('rn01-af00b');
    const hasAuth = js.includes('NEXT_PUBLIC_USE_FIREBASE_AUTH') || js.includes('"true"') && js.includes('rn01-af00b');
    if (hasKey || hasProject) {
      console.log('Match in chunk:', src, { hasKey, hasProject, hasAuth });
      // Search for snippets around rn01-af00b
      const idx = js.indexOf('rn01-af00b');
      console.log('Snippet around rn01-af00b:', js.substring(Math.max(0, idx - 100), idx + 100));
    }
  }
}
run().catch(console.error);
