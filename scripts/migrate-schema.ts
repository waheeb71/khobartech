import { neon } from "@neondatabase/serverless";

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_JuoFU72jrHTs@ep-muddy-sunset-bdnjc921-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require";

async function runMigration() {
  console.log("Connecting to Neon PostgreSQL for schema migration...");
  const sql = neon(dbUrl);

  // 1. Alter contact_inquiries table if columns do not exist
  console.log("Altering contact_inquiries with new columns...");
  await sql.query(`
    ALTER TABLE contact_inquiries
    ADD COLUMN IF NOT EXISTS inquiry_type TEXT NOT NULL DEFAULT 'general',
    ADD COLUMN IF NOT EXISTS rfp_file_url TEXT,
    ADD COLUMN IF NOT EXISTS metadata JSONB;
  `);

  // 2. Create job_applications table
  console.log("Creating job_applications table if not exists...");
  await sql.query(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      role_applied TEXT NOT NULL,
      application_type TEXT NOT NULL DEFAULT 'job',
      university TEXT,
      experience_years TEXT,
      cv_url TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  console.log("Migration executed successfully!");
}

runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

