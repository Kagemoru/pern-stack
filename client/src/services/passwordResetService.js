const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function postResetRequest(path, body) {
  const res = await fetch(`${API_BASE_URL}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export const requestPasswordReset = (email) =>
  postResetRequest("forgot-password", { email });

export const verifyPasswordResetCode = (email, code) =>
  postResetRequest("verify-reset-code", { email, code });

export const resetPassword = (resetToken, newPassword) =>
  postResetRequest("reset-password", { resetToken, newPassword });
