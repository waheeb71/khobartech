import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

async function main() {
  const url = process.env.DATABASE_URL || process.env.DRIZZLE_DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required to migrate the Khobar Tech CMS database.");
  const sql = neon(url);
  const database = drizzle(sql);
  await migrate(database, { migrationsFolder: "./drizzle/migrations" });
  console.log("Database migrations applied.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
