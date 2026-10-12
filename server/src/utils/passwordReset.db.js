import pool from "../config/pooldb.js";

export async function saveResetCode(userId, codeHash) {
  await pool.query(
    `INSERT INTO users_password_reset_req
        (id, code_hash, code_expires_at, attempts,
        reset_token_hash, reset_token_expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '10 minutes', 0, NULL, NULL)
      ON CONFLICT (id) DO UPDATE SET
        code_hash = EXCLUDED.code_hash,
        code_expires_at = EXCLUDED.code_expires_at,
        attempts = 0,
        reset_token_hash = NULL,
        reset_token_expires_at = NULL`,
    [userId, codeHash],
  );
}

export async function deleteResetRequest(userId) {
  await pool.query(`DELETE FROM users_password_reset_req WHERE id = $1`, [
    userId,
  ]);
}

export async function getCodeHashAndCountAttempt(userId) {
  const { rows } = await pool.query(
    `UPDATE users_password_reset_req
      SET attempts = attempts + 1
      WHERE id = $1
        AND code_expires_at > NOW()
        AND attempts < 5
      RETURNING code_hash`,
    [userId],
  );

  return rows[0]?.code_hash ?? null;
}

export async function saveResetToken(userId, tokenHash) {
  const { rows } = await pool.query(
    `UPDATE users_password_reset_req
      SET code_expires_at = NOW(),
        reset_token_hash = $2,
        reset_token_expires_at = NOW() + INTERVAL '10 minutes'
      WHERE id = $1
        AND code_expires_at > NOW()
        AND attempts <= 5
      RETURNING id`,
    [userId, tokenHash]
  );

  return Boolean(rows[0]);
}