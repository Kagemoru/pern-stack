import pool from "../config/pooldb.js";

export async function findByEmail(email) {
  const { rows } = await pool.query(
    'SELECT id, username, email, password, role FROM users WHERE email = $1',
    [email]
  )

  return rows[0] ?? null;
}

export async function createUser({ username, email, password, role = "user" }) {
  const { rows } = await pool.query(
    'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
    [username, email, password, role]
  )

  return rows[0] ?? null;
}