const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function apiReq(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}/api/auth${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? `Request failed (${res.status})`);
  }

  return data;
}

export default apiReq;
