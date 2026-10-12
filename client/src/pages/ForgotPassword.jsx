import { useState, useEffect } from "react";
import { Link } from "react-router";
import { requestPasswordReset } from "../services/passwordResetService.js";

export default function ForgotPassword() {
  const [step, setStep] = useState(
    () => sessionStorage.getItem("forgotPasswordStep") || "email",
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
        setStep("password");
      } else if (step === "password") {
        console.log(`${newPassword}, new password for ${email}`);
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
    <main>
      <h1>Reset Password</h1>

      {step !== "done" && (
        <form onSubmit={handleSubmit}>
          {step === "email" && (
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          )}

          {step === "code" && (
            <label>
              Code
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </label>
          )}

          {step === "password" && (
            <label>
              New password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          )}

          <button type="submit">
            {loading ? "Please wait..." : "Continue"}
          </button>
        </form>
      )}

      {step === "done" ? (
        <Link
          to="/login"
          onClick={() => sessionStorage.removeItem("forgotPasswordStep")}
        >
          Return to login
        </Link>
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
    </main>
  );
}
