# Supabase Database Setup

This directory contains the database schema for Snackify.

## Quick Setup

1. **Open Supabase Dashboard**:
   - Go to [app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Run the Schema**:
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"
   - Copy the entire contents of `schema.sql`
   - Paste into the SQL editor
   - Click "Run" (or press Ctrl+Enter)

3. **Verify Tables**:
   - Go to "Table Editor" in the left sidebar
   - You should see three tables: `snacks`, `ratings`, `comments`

4. **Seed Data** (optional):
   ```bash
   npm run seed
   ```

## Schema Overview

### Tables

- **snacks**: Main snack data
  - `id` (SERIAL PRIMARY KEY)
  - `name`, `country`, `description`, `type`
  - `image_url`, `photographer`
  - `tags` (TEXT array)
  - Base ratings: `base_taste_rating`, `base_spiciness_rating`, `base_uniqueness_rating`, `base_rating_count`
  - Timestamps: `created_at`, `updated_at`

- **ratings**: User-submitted ratings
  - `id` (UUID PRIMARY KEY)
  - `snack_id` (FOREIGN KEY → snacks.id)
  - `taste`, `spiciness`, `uniqueness` (1-5 integers)
  - `created_at`

- **comments**: User comments
  - `id` (UUID PRIMARY KEY)
  - `snack_id` (FOREIGN KEY → snacks.id)
  - `text` (max 1000 chars)
  - `author` (defaults to 'Anonymous')
  - `created_at`

### Security

- **Row Level Security (RLS)** is enabled on all tables
- Public read access (anyone can view)
- Public write access (anyone can create/update) - adjust policies if you need authentication

### Indexes

Indexes are created for optimal query performance:
- Ratings by `snack_id` and `created_at`
- Comments by `snack_id` and `created_at`
- Snacks by `country` and `type`

## Troubleshooting

**Error: "relation does not exist"**
- Make sure you ran the schema.sql in the correct project
- Check that all tables were created in Table Editor

**Error: "permission denied"**
- Check RLS policies in Authentication → Policies
- Ensure policies allow public access if needed

**Seeding fails**
- Verify your `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Check that the schema has been run successfully
- Ensure your Supabase project is active (not paused)

