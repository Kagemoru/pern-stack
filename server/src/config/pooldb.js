import pg from "pg";

const { Pool } = pg;

// option1: parameter connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// option2: url connection
// const pool = new Pool({
//   connectionString: process.env.DB_URL,
// })

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

export const CloseDbConnection = async () => {
  try {
    await pool.end();
    console.log("Database closed.");
  } catch (error) {
    console.error("Failed to close database:", error);
    throw error;
  }
};

export default pool;
