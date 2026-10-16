const secure = process.env.NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure,
  sameSite: "lax",
  path: "/",
  maxAge: 30 * 60 * 1000,
};

export const COOKIE_CLEAR_OPTIONS = {
  httpOnly: true,
  secure,
  sameSite: "lax",
  path: "/",
};