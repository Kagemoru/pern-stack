import { Link } from "react-router";

export default function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Home Page</Link>
    </main>
  );
}