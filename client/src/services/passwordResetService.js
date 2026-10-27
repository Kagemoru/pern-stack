import apiReq from "./api.js";

export const requestPasswordReset = (email) =>
  apiReq("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const verifyPasswordResetCode = (email, code) =>
  apiReq("/verify-reset-code", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });

export const resetPassword = (resetToken, newPassword) =>
  apiReq("/reset-password", {
    method: "POST",
    body: JSON.stringify({ resetToken, newPassword }),
  });