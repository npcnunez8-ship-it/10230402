# Snackify Backend

Minimal Express API to back Snackify with snacks, ratings, comments, and leaderboard data.

## Quick start

```bash
cd backend
npm install
npm run dev
# server defaults to http://localhost:4000
```

## Environment

- Node 18+ recommended
- Supabase account and project (free tier works)
- Create a `.env` file in the `backend` directory (see `.env.example` for template)
- Required environment variables:
  - `PORT` (optional, defaults to 4000)
  - `SUPABASE_URL` - Your Supabase project URL
  - `SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Setting up Supabase

1. **Create a Supabase project**:
   - Go to [supabase.com](https://supabase.com) and sign up/login
   - Create a new project
   - Wait for the project to be ready

2. **Set up the database schema**:
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the SQL to create tables, indexes, and policies

3. **Get your credentials**:
   - Go to Project Settings → API
   - Copy your Project URL (this is `SUPABASE_URL`)
   - Copy your `anon` `public` key (this is `SUPABASE_ANON_KEY`)

4. **Set up .env**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```
   This will populate your database with initial snack data from `seed/snacks.json`

The `.env` file is gitignored and will not be committed to version control.

## API overview

- `GET /api/health` — uptime check
- `GET /api/snacks` — list snacks with rating summary
- `GET /api/snacks/:id` — single snack with ratings summary + entries
- `POST /api/snacks` — create snack `{ name, country, description, type, imageUrl, photographer?, tags?, taste?, spiciness?, uniqueness? }`
- `GET /api/snacks/:id/ratings` — rating summary and entries
- `POST /api/snacks/:id/ratings` — add rating `{ taste, spiciness, uniqueness }`
- `GET /api/snacks/:id/comments` — list comments
- `POST /api/snacks/:id/comments` — add comment `{ text, author? }`
- `GET /api/leaderboard` — computed leaderboards (top rated, spiciest, most unique, by country, sweet foods)

## Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers (business logic)
│   │   ├── healthController.js
│   │   ├── snackController.js
│   │   ├── ratingController.js
│   │   ├── commentController.js
│   │   └── leaderboardController.js
│   ├── routes/              # Route definitions (URLs)
│   │   ├── healthRoutes.js
│   │   ├── snackRoutes.js
│   │   ├── ratingRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   └── index.js         # Combines all routes
│   ├── middleware/          # Express middleware
│   │   ├── validation.js    # Request validation middleware
│   │   └── errorHandler.js  # Error handling middleware
│   ├── validators/          # Joi validation schemas
│   │   ├── snackValidator.js
│   │   ├── ratingValidator.js
│   │   └── commentValidator.js
│   ├── db/                  # Database layer
│   │   └── supabaseDb.js    # Supabase database operations
│   ├── snackService.js      # Business logic layer
│   ├── supabase.js          # Supabase client setup
│   └── server.js            # Express app entry point
├── supabase/                # Database schema
│   └── schema.sql           # Supabase table definitions
├── scripts/                 # Utility scripts
│   └── seedSupabase.js      # Database seeding script
├── seed/                    # Seed data
└── package.json
```

### Architecture

- **Routes** (`routes/`) - Define URL endpoints and map them to controllers with validation
- **Controllers** (`controllers/`) - Handle HTTP requests/responses and call services
- **Validators** (`validators/`) - Joi schemas for request validation
- **Middleware** (`middleware/`) - Validation and error handling middleware
- **Services** (`snackService.js`) - Business logic and data operations
- **Database** (`db/supabaseDb.js`) - Supabase database operations layer

This separation makes the codebase more maintainable and scalable.

## Database

The backend uses **Supabase** (PostgreSQL) as the database:

- **Tables**: `snacks`, `ratings`, `comments`
- **Schema**: Defined in `supabase/schema.sql`
- **Row Level Security**: Enabled with public read, authenticated write policies
- **Indexes**: Optimized for common queries (by snack_id, country, type, etc.)

### Database Schema

- **snacks**: Stores snack information with base ratings
- **ratings**: Stores individual user ratings (linked to snacks)
- **comments**: Stores user comments (linked to snacks)

All tables include timestamps and proper foreign key relationships with cascade deletes.

## Validation & Error Handling

### Request Validation

All incoming requests are validated using **Joi** schemas before reaching controllers:

- **Snacks**: Validates name, country, description, type, imageUrl, and optional fields
- **Ratings**: Validates taste, spiciness, and uniqueness (1-5 integers)
- **Comments**: Validates text (1-1000 chars) and optional author
- **IDs**: Validates all route parameters are positive integers

Invalid requests return `400 Bad Request` with detailed error messages:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Snack name is required"
    }
  ]
}
```

### Error Handling

The backend includes comprehensive error handling:

- **Global Error Middleware**: Catches all unhandled errors and prevents server crashes
- **Async Error Wrapper**: Automatically catches errors in async route handlers
- **Custom Error Messages**: Provides user-friendly error responses
- **Development Mode**: Shows detailed error messages in development, generic messages in production

Error response format:
```json
{
  "error": "Error type",
  "message": "Human-readable error message"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors, invalid data)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (unexpected errors)

## Notes

- Ratings are averaged using the seeded counts plus submitted ratings.
- Leaderboard calculations mirror the front-end logic: overall average is the mean of taste, spiciness, and uniqueness.
- Static serving of the repo root is enabled for convenience; feel free to remove if you host frontend separately.
- All route handlers are wrapped with async error handling to prevent uncaught promise rejections.

