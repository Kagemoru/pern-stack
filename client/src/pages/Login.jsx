import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { login } from "../services/authService.js";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await login(formData);
      setAuthenticated(true);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <h1 className="title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-field">
          Email:
          <input
            name="email"
            type="email"
            placeholder="user@example.com"
            required
          />
        </label>

        <label className="form-field">
          Password:
          <input
            name="password"
            type="password"
            placeholder="Your password"
            required
          />
        </label>

        <p className="forgot-password-link">
          Can't remember password?{" "}
          <Link to="/forgot-password">Forgot Password</Link>
        </p>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
