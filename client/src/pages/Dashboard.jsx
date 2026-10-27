import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="container dashboard-container">
      <h1 className="title">Dashboard</h1>

      <div className="dashboard-content">
        <section
          className="dashboard-welcome"
          aria-labelledby="welcome-heading"
        >
          <h2 id="welcome-heading">Welcome, {username}!</h2>
          <p>You’re signed in and viewing your protected dashboard.</p>
        </section>

        <section
          className="dashboard-account"
          aria-labelledby="account-heading"
        >
          <h2 id="account-heading">Your account</h2>
          <p className="dashboard-account-row">
            <span
              className="dashboard-avatar"
              aria-label={`Profile initial: ${initial}`}
            >
              <strong>{initial}</strong>
            </span>{" "}
            <span className="dashboard-account-details">
              <strong>{username}</strong>
              <span>{user?.email}</span>
            </span>
          </p>
        </section>

        <section
          className="dashboard-security"
          aria-labelledby="security-heading"
        >
          <h2 id="security-heading">Account security</h2>
          <p>Need to update your password?</p>
          <Link className="dashboard-security-link" to="/forgot-password">
            Reset your password
          </Link>
        </section>
      </div>
    </div>
  );
}
