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

## Folder Structure

```text
pern-stack/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── DarkModeBtn.jsx
│   │   │   ├── LogoutBtn.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useDarkMode.js
│   │   ├── layout/
│   │   │   └── AppLayout.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── passwordResetService.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── server/
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