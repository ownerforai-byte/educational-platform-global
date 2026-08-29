require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  // 1. Reset ravikishan password
  const { data: users } = await sb.auth.admin.listUsers();
  const ravikishan = users.users.find(u => u.email === 'ravikishan1814@gmail.com');
  console.log('ravikishan id:', ravikishan?.id);
  if (ravikishan) {
    const { error } = await sb.auth.admin.updateUserById(ravikishan.id, { password: 'Ravikisan@1814' });
    console.log('password reset:', error?.message || 'OK');
  }

  // 2. Fix profiles table - add full_name column if missing
  console.log('\nSeeding data...');
  
  // Seed education_levels
  const levels = [
    { slug: 'neb', name: 'NEB (+2)', description: 'National Examination Board - Class 11 & 12', order_col: 1, is_active: true },
    { slug: 'loksewa', name: 'Loksewa Prep', description: 'Public Service Commission exam preparation', order_col: 2, is_active: true },
    { slug: 'general', name: 'General', description: 'General education content', order_col: 3, is_active: true },
  ];
  for (const lvl of levels) {
    const { error } = await sb.from('education_levels').upsert({ slug: lvl.slug, name: lvl.name, description: lvl.description, order: lvl.order_col, is_active: lvl.is_active }, { onConflict: 'slug' });
    console.log(`  level ${lvl.slug}:`, error?.message || 'OK');
  }

  // Seed classes
  const { data: neb } = await sb.from('education_levels').select('id').eq('slug', 'neb').single();
  if (neb) {
    for (const cls of ['class-11', 'class-12']) {
      const { error } = await sb.from('classes').upsert({ slug: cls, name: cls.replace('class-', 'Class '), education_level_id: neb.id, order: cls === 'class-11' ? 1 : 2, is_active: true }, { onConflict: 'slug' });
      console.log(`  class ${cls}:`, error?.message || 'OK');
    }
  }

  // Seed subjects for class-11
  const { data: c11 } = await sb.from('classes').select('id').eq('slug', 'class-11').single();
  if (c11) {
    for (const subj of [
      { slug: 'physics', name: 'Physics' },
      { slug: 'chemistry', name: 'Chemistry' },
      { slug: 'mathematics', name: 'Mathematics' },
      { slug: 'nepali', name: 'Nepali' },
      { slug: 'english', name: 'English' },
      { slug: 'biology', name: 'Biology' },
    ]) {
      const { error } = await sb.from('subjects').upsert({ slug: subj.slug, name: subj.name, class_id: c11.id, is_active: true }, { onConflict: 'slug' });
      console.log(`  subject ${subj.slug}:`, error?.message || 'OK');
    }
  }

  // Update profiles to OWNER
  for (const u of users.users) {
    const { error } = await sb.from('profiles').upsert({ id: u.id, email: u.email, role: 'OWNER' }, { onConflict: 'id' });
    console.log(`  profile ${u.email}:`, error?.message || 'OK');
  }

  console.log('\nDone!');
}

main().catch(e => console.error(e));
