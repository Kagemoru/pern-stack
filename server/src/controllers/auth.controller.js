import bcrypt from "bcryptjs";
import { findByEmail, createUser } from "../utils/users.db.js";
import { signToken } from "../utils/jwt.js";
import { COOKIE_OPTIONS, COOKIE_CLEAR_OPTIONS } from "../config/cookie.js";
import { generateResetCode } from "../utils/code.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body ?? {};

    // check fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, Email and Password are required" });
    }

    // check if user already exists
    if (await findByEmail(email)) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // hash the original password
    const passwordHashed = await bcrypt.hash(password, 10);

    // save to database
    const newUser = await createUser({
      username,
      email,
      password: passwordHashed,
      role: "user",
    });

    // set token
    const token = signToken({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });

    // set cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    // response
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    // check fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are missing" });
    }

    // find user
    const user = await findByEmail(email);

    // if not found
    if (!user) {
      return res
        .status(401)
        .json({ message: "User do not exist or not found" });
    }

    // check password
    const passwordMatches = await bcrypt.compare(password, user.password);

    // if password do not match
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // set token
    const token = signToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // set cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    // response
    return res.status(200).json({
      message: "User logged-in successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while logging-in user" });
  }
};

export const profile = async (req, res) => {
  return res.status(200).json({
    authenticated: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", COOKIE_CLEAR_OPTIONS);
    return res.status(200).json({ message: "User logged-out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while logging-out user" });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").trim();

    // check fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // find user
    const user = await findByEmail(email);

    // if not found
    if (!user) {
      return res
        .status(401)
        .json({ message: "User do not exist or not found" });
    }

    // generate code for user
    const code = generateResetCode();

    // save the user's code in the database

    // send code
  } catch (error) {
    console.error("Password reset request error:", error.message);
    return res.status(500).json({ message: "Unable to process request" });
  }
};

export const verifyPasswordResetCode = async (req, res) => {
  try {
    const email = String(req.body?.email ?? "").trim();
    const code = String(req.body?.code ?? "");

    // check fields
    if (!email || !/^\d{6}$/.test(code)) {
      return res
        .status(400)
        .json({ message: "Email and valid code is required" });
    }

    // find user

    // codeHash

    // generate reset token for user

    // save the user's reset token in the database
  } catch (error) {
    console.error("Code verification failed:", error.message);
    return res.status(500).json({ message: "Unable to verify code" });
  }
};


export const resetPassword = async (params) => {
  try {
    
  } catch (error) {
    
  }
}