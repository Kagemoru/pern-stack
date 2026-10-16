import { COOKIE_CLEAR_OPTIONS } from "../config/cookie.js";
import { verifyToken } from "../utils/jwt.js";

import { COOKIE_CLEAR_OPTIONS } from "../config/cookie.js";
import { verifyToken } from "../utils/jwt.js";

// Creates middleware that either allows anonymous requests or requires a valid token.
function createAuthenticate({ required = false } = {}) {
  return function authenticate(req, res, next) {
    const token = req.cookies?.token ?? null;

    // No cookie means anonymous access for optional auth, or 401 for required auth.
    if (!token) {
      req.user = null;

      if (required) {
        return res.status(401).json({ message: "No token provided" });
      }

      return next();
    }

    try {
      req.user = verifyToken(token);
      return next();
    } catch {
      // Remove stale cookies. Optional auth continues as anonymous; required auth rejects.
      res.clearCookie("token", COOKIE_CLEAR_OPTIONS);
      req.user = null;

      if (required) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      return next();
    }
  };
}

// Use for routes that work for both signed-in and anonymous users.
export const optionalAuth = createAuthenticate();
// Use for routes that must only be accessed by signed-in users.
export const requireAuth = createAuthenticate({ required: true });