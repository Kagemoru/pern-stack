import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword,
} from "../services/passwordResetService";

export default function ForgotPassword() {
  const [step, setStep] = useState(
    () => sessionStorage.getItem("forgotPasswordStep") || "email",
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (step === "email") {
        console.log(`${email}, requests a password reset code`);
        const result = await requestPasswordReset(email);
        console.log(result.message);
        setStep("code");
      } else if (step === "code") {
        console.log(`${code}, code for confirming a password reset`);
        const result = await verifyPasswordResetCode(email, code);
        console.log(result);
        setResetToken(result.resetToken);
        setStep("password");
      } else if (step === "password") {
        console.log(`${newPassword}, new password for ${email}`);
        const result = await resetPassword(resetToken, newPassword);
        console.log(result);
        setStep("done");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "done") {
      sessionStorage.removeItem("forgotPasswordStep");
    } else {
      sessionStorage.setItem("forgotPasswordStep", step);
    }
  }, [step]);

  return (
    <div className="container forgot-password-container">
      <h1>Reset Password</h1>

      {step !== "done" && (
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          {step === "email" && (
            <label className="form-field">
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
          )}

          {step === "code" && (
            <label className="form-field">
              Code:
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the code here"
                required
              />
            </label>
          )}

          {step === "password" && (
            <label className="form-field">
              New password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Set your new password"
                required
              />
            </label>
          )}

          <button type="submit">
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      )}

      <p id="reset-password-note">
        <b>Note:</b> A password reset code will be sent to the email address you
        provided.
      </p>

      {step === "done" ? (
        <>
          <p id="reset-successfull-msg">
            Your password has been successfully updated! You can now log in
            using your new password.
          </p>
          <br />
          <Link
            to="/login"
            onClick={() => sessionStorage.removeItem("forgotPasswordStep")}
          >
            Return to login
          </Link>
        </>
      ) : (
        <p>
          Cancel password reset? Back to{" "}
          <Link
            to="/"
            onClick={() => sessionStorage.removeItem("forgotPasswordStep")}
          >
            Home Page
          </Link>
        </p>
      )}
    </div>
  );
}
