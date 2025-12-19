/**
 * Seed script to populate Supabase database with initial snack data
 * Run with: node scripts/seedSupabase.js
 */

require('dotenv').config();
const { snacksDb } = require('../src/db/supabaseDb');
const seedSnacks = require('../seed/snacks.json');

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Check if snacks already exist
    const existingSnacks = await snacksDb.getAll();
    
    if (existingSnacks.length > 0) {
      console.log(`⚠️  Database already contains ${existingSnacks.length} snacks.`);
      console.log('   Skipping seed to avoid duplicates.');
      console.log('   To reseed, delete existing data from Supabase dashboard.\n');
      return;
    }

    console.log(`📦 Seeding ${seedSnacks.length} snacks...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const snack of seedSnacks) {
      try {
        await snacksDb.create({
          name: snack.name,
          country: snack.country,
          description: snack.description,
          type: snack.type,
          imageUrl: snack.imageUrl,
          photographer: snack.photographer || 'Photo by Unsplash',
          tags: snack.tags || [snack.type],
          taste: snack.ratings?.taste || 3.0,
          spiciness: snack.ratings?.spiciness || 1.0,
          uniqueness: snack.ratings?.uniqueness || 3.0
        });
        successCount++;
        console.log(`✅ ${snack.name} (${snack.country})`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to seed ${snack.name}:`, error.message);
      }
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    if (errorCount > 0) {
      console.log(`   ❌ Errors: ${errorCount}`);
    }
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error('   Make sure:');
    console.error('   1. Your .env file has SUPABASE_URL and SUPABASE_ANON_KEY');
    console.error('   2. You have run the schema.sql in Supabase SQL Editor');
    console.error('   3. Your Supabase project is active');
    process.exit(1);
  }
};

// Run seed
seedDatabase()
  .then(() => {
    console.log('\n🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });

