/**
 * Diagnostic script for AI features
 * Run: node backend/scripts/diagnose-ai.cjs
 */

const dotenv = require('dotenv');
const path = require('path');

// Load backend env
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('='.repeat(60));
console.log('AI & Auth Diagnostic');
console.log('='.repeat(60));

// Check environment variables
console.log('\n[ENV CHECK]');
console.log('  SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('  SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
console.log('  AGNES_API_KEY:', process.env.AGNES_API_KEY ? '✅ Set (length: ' + process.env.AGNES_API_KEY.length + ')' : '❌ Missing');
console.log('  AI_DEFAULT_PROVIDER:', process.env.AI_DEFAULT_PROVIDER || '(not set)');
console.log('  NODE_ENV:', process.env.NODE_ENV || 'development');

// Test Agnes API
async function testAgnes() {
  console.log('\n[AGNES API TEST]');
  try {
    const res = await fetch('https://apihub.agnes-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AGNES_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.AGNES_MODEL || 'agnes-3.0-flash',
        messages: [{ role: 'user', content: 'Say hello' }],
        max_tokens: 50
      })
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('  ✅ Agnes API working');
      console.log('  Response:', data.choices?.[0]?.message?.content?.trim()?.substring(0, 100));
      return true;
    } else {
      const text = await res.text();
      console.log(`  ❌ Agnes API error: ${res.status}`);
      console.log('  Details:', text.substring(0, 200));
      return false;
    }
  } catch (err) {
    console.log('  ❌ Agnes API connection failed:', err.message);
    return false;
  }
}

// Test Supabase DB connection
async function testSupabase() {
  console.log('\n[SUPABASE DB TEST]');
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error) {
      console.log('  ❌ Supabase query failed:', error.message);
      return false;
    }
    
    console.log('  ✅ Supabase connection working');
    console.log('  Sample profiles:', data?.length || 0);
    return true;
  } catch (err) {
    console.log('  ❌ Supabase connection failed:', err.message);
    return false;
  }
}

// Run all tests
async function main() {
  const results = {
    agnes: await testAgnes(),
    supabase: await testSupabase()
  };
  
  console.log('\n' + '='.repeat(60));
  console.log('DIAGNOSTIC SUMMARY');
  console.log('='.repeat(60));
  console.log('  Agnes API:', results.agnes ? '✅ Working' : '❌ Failed');
  console.log('  Supabase DB:', results.supabase ? '✅ Working' : '❌ Failed');
  
  const allGood = results.agnes;
  console.log('\n  Overall AI Status:', allGood ? '✅ Agnes provider working' : '❌ No AI providers available');
  
  if (!allGood) {
    console.log('\n  ⚠️  Fix needed: Check API keys in backend/.env');
  }
}

main().catch(console.error);
