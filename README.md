# PERN Stack App

A beginner-friendly starter app built with PostgreSQL, Express, React, and Node.js. It includes account authentication, password-reset flows, and a protected dashboard.

## Features

- Register and sign in with an email and password
- Store passwords as bcrypt hashes
- Authenticate with an HTTP-only JWT cookie
- Protect the dashboard and log out
- Request and verify a password-reset code, then set a new password
- Toggle dark mode
- Check API availability at `/api/health`

## Requirements

- Node.js and npm
- PostgreSQL
- SMTP credentials for password-reset emails

## Local setup

### 1. Create the database

In PostgreSQL, create a database. For example:

```sql
CREATE DATABASE pern_db;
```

Connect to `pern_db`, then create the application tables:

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

### 2. Configure and install the server

```bash
cd server
npm install
```

Create `server/.env` and configure your database connection, secrets, and SMTP settings. See `server/.env.example` for the expected variables.

Keep your `.env` file private. Use strong, unique secrets and never commit real credentials.

### 3. Configure and install the client

In a new terminal:

```bash
cd client
npm install
```

Create `client/.env` and set the local API URL. See `client/.env.example` for the expected variable.

### 4. Start the app

Start the backend:

```bash
cd server
npm start
```

In a second terminal, start the frontend:

```bash
cd client
npm run dev
```

Open the local URL printed by the frontend development server.

## API endpoints

All endpoints are prefixed with `/api`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Check API availability |
| `POST` | `/auth/register` | Create an account |
| `POST` | `/auth/login` | Sign in |
| `POST` | `/auth/logout` | Sign out |
| `GET` | `/auth/profile` | Check the authenticated session |
| `POST` | `/auth/forgot-password` | Request a reset code |
| `POST` | `/auth/verify-reset-code` | Verify a reset code |
| `POST` | `/auth/reset-password` | Set a new password |

## Frontend routes

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/register` | Create an account |
| `/login` | Sign in |
| `/forgot-password` | Reset a password |
| `/dashboard` | Protected page; requires authentication |