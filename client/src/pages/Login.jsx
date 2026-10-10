import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../services/authService.js";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <br />
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <br />
        <button type="submit">
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <p role="alert">{error}</p>}
      </form>
      <p>
        Need an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Back to <Link to="/">Home Page</Link>
      </p>
    </main>
  );
}
