import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="container not-found-container">
      <h1 className="title">404</h1>
      <p>Page not found.</p>
      <Link to="/">Home Page</Link>
    </div>
  );
}