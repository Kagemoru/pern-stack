import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuthenticated } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await register(formData);
      setAuthenticated(true);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container register-container">
      <h1 className="title">Register</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <label className="form-field">
          Username:
          <input name="username" type="text" placeholder="user123" required />
        </label>

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
            placeholder="Create a password"
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && (
          <p className="register-error" role="alert">
            {error}
          </p>
        )}
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
