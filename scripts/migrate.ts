import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

async function main() {
  const url = process.env.DATABASE_URL || process.env.DRIZZLE_DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required to migrate the Najah Code CMS database.");
  const pool = mysql.createPool({ uri: url, connectionLimit: 1 });
  const database = drizzle(pool);
  await migrate(database, { migrationsFolder: "./drizzle/migrations" });
  await pool.end();
  console.log("Database migrations applied.");
}

main().catch((error) => { console.error(error); process.exit(1); });
