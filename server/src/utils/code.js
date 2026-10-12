import {
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from "node:crypto";

// generates code for reset password
export function generateResetCode() {
  return randomInt(0, 1000000).toString().padStart(6, "0");
}

// hash the generated code
export function hashResetCode(code) {
  const secret = process.env.RESET_TOKEN_SECRET;
  if (!secret) throw new Error("RESET_CODE_SECRET is not configured");

  return createHmac("sha256", secret).update(code).digest("hex");
}

// verify the codes (hashed code by the user & hashed code in db)
export function verifyResetCode(submittedCode, storedCode) {
  const hashSubmittedCode = Buffer.from(hashResetCode(submittedCode), "hex");
  const hashedStoredCode = Buffer.from(storedCode, "hex");

  return (
    hashSubmittedCode.length === hashedStoredCode.length &&
    timingSafeEqual(hashSubmittedCode, hashedStoredCode)
  );
}

// generates token for new password
export function generateResetToken() {
  return randomBytes(32).toString("hex");
}

// hash the generated token
export function hashResetToken(token) {
  return createHash("sha256").update(token).digest("hex");
}