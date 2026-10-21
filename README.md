# PERN Stack App

## About

A full-stack web application built with the PERN stack. It includes user registration, login and logout, a protected dashboard, and password recovery. The client also supports light and dark themes.

## Stack

- **PostgreSQL** for the database
- **Express 5** and **Node.js** for the API
- **React 19** and **React Router** for the client
- **Vite** for client development and builds
- **pg** for PostgreSQL access
- **JWT** and **bcryptjs** for authentication
- **Nodemailer** for email
- **Helmet**, **CORS**, and **express-rate-limit** for API security and request handling

## Deployment

- **Neon** for hosted PostgreSQL
- **Render** for server deployment
- **Vercel** for client deployment

## Local Setup

### Prerequisites

- Node.js and npm
- A PostgreSQL database with SSL enabled. Neon is one option; the server’s database connection is configured to require SSL.
- SMTP credentials if you want to test password recovery emails

### 1. Set Up the Database

Create a database, then connect to it with `psql` or your database client and run:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS users_password_reset_req (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL,
  code_expires_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  reset_token_hash TEXT,
  reset_token_expires_at TIMESTAMPTZ
);
```

### 2. Configure the Backend

Install dependencies and create the local environment file:

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and set your database connection string and secrets:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=replace-with-a-long-random-secret
RESET_TOKEN_SECRET=replace-with-another-long-random-secret
DB_URL=your-ssl-enabled-postgresql-connection-string
CLIENT_ORIGIN=http://localhost:5173
```

To test password recovery emails, also set the `SMTP_*` values in `server/.env`. Gmail users generally need an app password for `SMTP_PASS`. Registration and login can be tested without SMTP credentials; password recovery email delivery requires a working SMTP configuration.

### 3. Configure the Frontend

Install the frontend dependencies and set the local API URL:

```bash
cd ../client
npm install
```

Create `client/.env.local` with:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Start the App

Run the backend in one terminal:

```bash
cd server
npm start
```

Run the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The backend health endpoint is available at `http://localhost:3000/api/health`.

## Folder Structure

### Frontend (`client/`)

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DarkModeBtn.jsx
│   │   ├── LogoutBtn.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useDarkMode.js
│   ├── layout/
│   │   └── AppLayout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── passwordResetService.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

### Backend (`server/`)

```text
server/
├── public/
├── src/
│   ├── config/
│   │   ├── cookie.js
│   │   ├── nodemailer.js
│   │   └── pooldb.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── passwordReset.controller.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   └── rateLimiter.js
│   ├── routes/
│   │   └── auth.route.js
│   ├── services/
│   │   └── email.service.js
│   ├── templates/
│   │   └── email.html
│   └── utils/
│       ├── code.js
│       ├── jwt.js
│       ├── passwordReset.db.js
│       └── users.db.js
├── package.json
└── server.js
```