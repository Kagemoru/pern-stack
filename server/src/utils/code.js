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
