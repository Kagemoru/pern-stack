import {
  createHash,
  createHmac,
  randomInt,
  timingSafeEqual,
} from "node:crypto";

// function that generates code for reset password
export function generateResetCode() {
  return randomInt(0, 1000000).toString().padStart(6, "0");
}

export function hashResetCode(code) {
  const secret = process.env.RESET_TOKEN_SECRET;
  if (!secret) throw new Error("RESET_CODE_SECRET is not configured");

  return createHmac("sha256", secret).update(code).digest("hex");
}
