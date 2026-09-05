/**
 * Diagnostic script for AI features
 * Run: node backend/scripts/diagnose-ai.js
 */

const dotenv = require('dotenv');
const path = require('path');

// Load backend env
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

console.log('='.repeat(60));
console.log('AI & Auth Diagnostic');
console.log('='.repeat(60));

// Check environment variables
console.log('\n[ENV CHECK]');
console.log('  SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('  SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
console.log('  GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
console.log('  AGNES_API_KEY:', process.env.AGNES_API_KEY ? '✅ Set' : '❌ Missing');
console.log('  AI_DEFAULT_PROVIDER:', process.env.AI_DEFAULT_PROVIDER || '(not set)');
console.log('  NODE_ENV:', process.env.NODE_ENV || 'development');

// Test Agnes API
async function testAgnes() {
  console.log('\n[AGNES API TEST]');
  try {
    const res = await fetch('https://api.agnes.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AGNES_API_KEY}`
      },
      body: JSON.stringify({
        model: 'agnes-2.5-flash',
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

// Test Gemini API
async function testGemini() {
  console.log('\n[GEMINI API TEST]');
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Say hello' }] }],
          generationConfig: { maxOutputTokens: 50 }
        })
      }
    );
    
    if (res.ok) {
      const data = await res.json();
      console.log('  ✅ Gemini API working');
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('  Response:', text?.trim()?.substring(0, 100));
      return true;
    } else {
      const text = await res.text();
      console.log(`  ❌ Gemini API error: ${res.status}`);
      console.log('  Details:', text.substring(0, 200));
      return false;
    }
  } catch (err) {
    console.log('  ❌ Gemini API connection failed:', err.message);
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
    gemini: await testGemini(),
    supabase: await testSupabase()
  };
  
  console.log('\n' + '='.repeat(60));
  console.log('DIAGNOSTIC SUMMARY');
  console.log('='.repeat(60));
  console.log('  Agnes API:', results.agnes ? '✅ Working' : '❌ Failed');
  console.log('  Gemini API:', results.gemini ? '✅ Working' : '❌ Failed');
  console.log('  Supabase DB:', results.supabase ? '✅ Working' : '❌ Failed');
  
  const allGood = results.agnes || results.gemini;
  console.log('\n  Overall AI Status:', allGood ? '✅ At least one provider working' : '❌ No AI providers available');
  
  if (!allGood) {
    console.log('\n  ⚠️  Fix needed: Check API keys in backend/.env');
  }
}

main().catch(console.error);
