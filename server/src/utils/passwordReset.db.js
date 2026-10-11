import pool from "../config/pooldb.js";

export async function saveResetCode(userId, codeHash) {
  await pool.query(
    `INSERT INTO users_password_reset_req (id, code_hash, code_expires_at) VALUES ($1, $2, NOW() + '10 minutes', 0, NULL, NULL) ON CONFLICT (id) DO UPDATE SET code_hash = EXCLUDED.code_hash, EXCLUDED.code_expires_at, attempts = 0, reset_token_hash = NULL, reset_token_expires_at = NULL`,
    [userId, codeHash]
  );
}