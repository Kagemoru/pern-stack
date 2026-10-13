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
    [userId, tokenHash],
  );

  return Boolean(rows[0]);
}

export async function updatePasswordWithResetToken(tokenHash, passwordHash) {
  const client = await pool.connect();
  let transactionStarted = false;

  try {
    // Start a transaction so the password change and reset-request cleanup
    // happen atomically.
    await client.query("BEGIN");
    transactionStarted = true;

    // Find the matching reset request for this token and lock the row
    // so no other request can change it at the same time.
    const { rows } = await client.query(
      `SELECT id
        FROM users_password_reset_req
        WHERE reset_token_hash = $1
          AND reset_token_expires_at > NOW()
        FOR UPDATE`,
      [tokenHash],
    );

    // No valid reset request was found for this token, so the request
    // is invalid or expired.
    if (!rows[0]) {
      await client.query("ROLLBACK");
      transactionStarted = false;
      return false;
    }

    const userId = rows[0].id;

    // Update the user's password only after verifying the reset token.
    await client.query(`UPDATE users SET password = $1 WHERE id = $2`, [
      passwordHash,
      userId,
    ]);

    // Remove the reset request so the same token cannot be reused.
    await client.query(`DELETE FROM users_password_reset_req WHERE id = $1`, [
      userId,
    ]);

    // Commit the password update and reset cleanup together.
    await client.query("COMMIT");
    transactionStarted = false;
    return true;
  } catch (error) {
    // If anything fails, undo the whole transaction to keep the database consistent.
    if (transactionStarted) await client.query("ROLLBACK");
    throw error;
  } finally {
    // Return the database client to the pool.
    client.release();
  }
}
