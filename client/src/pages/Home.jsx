import psqlIcon from "../assets/psql.svg";
import expressIcon from "../assets/express.svg";
import reactIcon from "../assets/react.svg";
import nodeIcon from "../assets/node.svg";

export default function Home() {
  return (
    <div className="container home-container">
      <h1 className="title">Project Details</h1>
      <div className="project-details">
        <p>
          This project is a hands-on learning exercise focused on building a
          full-stack authentication application with:
        </p>
        
        <ul>
          <li>
            <img src={psqlIcon} className="svg" alt="postgresql icon" />{" "}
            PostgreSQL
          </li>
          <li>
            <img src={expressIcon} className="svg" alt="express icon" />{" "}
            Express.js
          </li>
          <li>
            <img src={reactIcon} className="svg" alt="react icon" /> React
          </li>
          <li>
            <img src={nodeIcon} className="svg" alt="nodejs icon" /> Node.js
          </li>
        </ul>

        <p>
          It includes user registration, login and logout, a protected
          dashboard, and a password reset flow using email verification codes.
          It also explores REST API development, database integration, and
          communication between a frontend and backend.
        </p>
      </div>
    </div>
  );
}
