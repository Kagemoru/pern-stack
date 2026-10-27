import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword,
} from "../services/passwordResetService.js";

export default function ForgotPassword() {
  const [step, setStep] = useState(
    () => sessionStorage.getItem("forgotPasswordStep") || "email",
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(
    <>
      <b>Note:</b> A password reset code will be sent to the email address you provide for the password reset process.
    </>,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      if (step === "email") {
        const result = await requestPasswordReset(email);
        setMsg(result.message);
        setStep("code");
      } else if (step === "code") {
        const result = await verifyPasswordResetCode(email, code);
        setResetToken(result.resetToken);
        setStep("password");
      } else if (step === "password") {
        const result = await resetPassword(resetToken, newPassword);
        setMsg(`${result.message} You can now log in using your new password.`);
        setStep("done");
      }
    } catch (error) {
      setMsg(error.message);
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
      <h1 className="title">Reset Password</h1>

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

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      )}

      {msg && (
        <p className="reset-password-msg" role="alert">
          {msg}
        </p>
      )}

      {step === "done" ? (
        <>
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
