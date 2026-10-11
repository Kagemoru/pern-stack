import { generateResetCode, hashResetCode } from "../utils/code.js";
import { deleteResetRequest, saveResetCode } from "../utils/passwordReset.db.js";
import { sendPasswordResetCode } from "../services/email.service.js";

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
    await saveResetCode(user.id, hashResetCode(code));

    // send the generated code to user's email
    try {
      await sendPasswordResetCode(email, code);
    } catch (error) {
      await deleteResetRequest(user.id);
      console.error("Password reset email failed:", error.message);
    }

    return res.status(200).json({ message:genericMessage })
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
  } catch (error) {}
};