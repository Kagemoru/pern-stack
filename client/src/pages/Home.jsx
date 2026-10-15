import { Link } from "react-router";

export default function Home() {
  return (
    <main>
      <h1>About</h1>
      <p>
        This project is a hands-on learning exercise focused on building a
        full-stack authentication application with PostgreSQL, Express.js,
        React, and Node.js.
      </p>
      <p>
        It includes user registration, login and logout, a protected dashboard,
        and a password reset flow using email verification codes. It also
        explores REST API development, database integration, and communication
        between a frontend and backend.
      </p>
    </main>
  );
}
