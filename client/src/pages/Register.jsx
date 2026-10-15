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
      navigate("/dashboard", {replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Username
          <input name="username" autoComplete="username" required />
        </label>
        <br />
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
            autoComplete="new-password"
            required
          />
        </label>
        <br />
        <button type="submit">
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p role="alert">{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p>
        Back to <Link to="/">Home Page</Link>
      </p>
    </main>
  );
}
