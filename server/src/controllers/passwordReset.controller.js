import bcrypt from "bcryptjs";
import { findByEmail } from "../utils/users.db.js";
import { sendPasswordResetCode } from "../services/email.service.js";
import {
  generateResetCode,
  generateResetToken,
  hashResetCode,
  hashResetToken,
  verifyResetCode,
} from "../utils/code.js";
import {
  deleteResetRequest,
  getCodeHashAndCountAttempt,
  saveResetCode,
  saveResetToken,
} from "../utils/passwordReset.db.js";

const genericMessage = "The provided email shall recieve a reset code.";

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

    return res.status(200).json({ message: genericMessage });
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
    const user = await findByEmail(email);

    // if not found
    if (!user) {
      return res
        .status(401)
        .json({ message: "User do not exist or not found" });
    }

    // get codeHash
    const codeHash = await getCodeHashAndCountAttempt(user.id);

    // verify the code
    if (!codeHash || !verifyResetCode(code, codeHash)) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // generate reset token for user
    const resetToken = generateResetToken();

    // save the user's reset token in the database
    const saved = await saveResetToken(user.id, hashResetToken(resetToken));

    if (!saved) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    return res.status(200).json({ resetToken });
  } catch (error) {
    console.error("Code verification failed:", error.message);
    return res.status(500).json({ message: "Unable to verify code" });
  }
};

export const resetPassword = async (params) => {
  try {
    const resetToken = String(req.body?.resetToken ?? "");
    const newPassword = String(req.body?.newPassword ?? "").trim();

    if (!/^[a-f0-9]{64}$/.test(resetToken)) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // confirm new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // hash new password
    const passwordHashed = await bcrypt.hash(newPassword, 10);

    // update user password in db plus the reset token
    const updated = await updatePasswordWithResetToken(
      hashResetToken(resetToken),
      passwordHashed,
    );

    if (!updated) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset failed:", error.message);
    return res.status(500).json({ message: "Unable to reset password" });
  }
};
