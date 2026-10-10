import { COOKIE_CLEAR_OPTIONS } from "../config/cookie.js";
import { verifyToken } from "../utils/jwt.js";

export default function authenticate(req, res, next) {
  let token = req.cookies?.token ?? null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.clearCookie("token", COOKIE_CLEAR_OPTIONS);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
