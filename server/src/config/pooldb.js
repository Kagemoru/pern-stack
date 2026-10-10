import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "120603",
  database: process.env.DB_NAME || "pern_db",
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error:", err.message);
});

export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully...");
    client.release();
  } catch (error) {
    console.error("Connection to database failed:", error.message);
  }
};

export default pool;
