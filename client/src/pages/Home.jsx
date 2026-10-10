import { Link } from "react-router";

export default function Home() {
  return (
    <main>
      <h1>Learning the PERN Stack</h1>
      <p>
        This project is a learning exercise for building a simple
        authentication app with PostgreSQL, Express, React, and Node.js.
      </p>
      <p>
        Users can register, log in, access a protected Home page, and log out.
      </p>

      <nav>
        <Link to="/register">Register</Link>
        {" | "}
        <Link to="/login">Login</Link>
      </nav>
    </main>
  );
}