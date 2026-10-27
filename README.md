# PERN Stack App

A full-stack web application built with PostgreSQL, Express, React, and Node.js. It supports account registration and sign-in, a protected dashboard, password recovery, and light and dark themes.

## Features

- Register and sign in with an email and password
- Store passwords as bcrypt hashes
- Authenticate sessions with an HTTP-only JWT cookie
- Access a protected dashboard
- Reset passwords by email
- Switch between light and dark themes

## Tech Stack

- **PostgreSQL** for data storage
- **Express 5** and **Node.js** for the API
- **React 19**, **React Router**, and **Vite** for the client
- **pg** for PostgreSQL access
- **JWT** and **bcryptjs** for authentication
- **Nodemailer** for email delivery
- **Helmet**, **CORS**, and **express-rate-limit** for API security and request handling

## Deployment

- **Neon** for hosted PostgreSQL
- **Render** for the server
- **Vercel** for the client

## API Endpoints

All API endpoints are prefixed with `/api`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check API availability |
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/logout` | Sign out |
| `GET` | `/api/auth/profile` | Check the authenticated session |
| `POST` | `/api/auth/forgot-password` | Request a password reset code |
| `POST` | `/api/auth/verify-reset-code` | Verify a password reset code |
| `POST` | `/api/auth/reset-password` | Set a new password |

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Kagemoru/pern-stack.git
cd pern-stack
```

### Branches

- `main`: The PERN stack application.
- `feature/core-functionality`: A working baseline with the app’s core features, intended as a starting point for anyone who wants to improve it or explore their own approach.

### 2. Create the database

Create a PostgreSQL database, connect to it, and create the application tables:

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

### 3. Configure and install the server

```bash
cd server
npm install
```

Create `server/.env` and configure the database connection, secrets, and SMTP settings. See `server/.env.example` for the required variables.

### 4. Configure and install the client

```bash
cd ../client
npm install
```

Create `client/.env` and set the local API URL. See `client/.env.example` for the required variable.

### 5. Start the app

In one terminal, start the backend:

```bash
cd server
npm start
```

In a second terminal, start the frontend:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The backend health endpoint is available at `http://localhost:3000/api/health`.