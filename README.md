# Task-Flow: MERN Stack Task Manager

A complete frontend + backend project implementing responsive UI, JWT-based authentication, protected dashboard routes, profile management, and CRUD APIs. Created for the Frontend Developer Intern assignment to demonstrate full-stack integration, security, and scalability.

## 🎯 Project Overview

Task-Flow is a full-stack web application designed for personal task management. It features a secure API layer for authentication and standard CRUD (Create, Read, Update, Delete) operations on user-specific tasks.

### Core Technologies

| Layer | Primary Tools | Notes |
| :--- | :--- | :--- |
| **Frontend** | Next.js (14+) / TypeScript | React hooks, client-side routing, Tailwind CSS. |
| **Backend** | Node.js / Express | REST API structure, ES Modules (`"type": "module"`). |
| **Database** | MongoDB / Mongoose | ODM used for schema definition and interaction. |
| **Security** | JWT, bcrypt | Token-based authentication, password hashing. |

---

## ⚙️ Local Development Setup

This project uses a standard split-repo setup (API and UI).

### Prerequisites

* Node.js (v18 or higher)
* npm (or yarn/pnpm)
* MongoDB access (local instance or Atlas connection string)

### Step 1: Backend (API) Configuration

1. Navigate into the backend folder:
    ```bash
    cd backend
    ```
2. Install all required Node modules:
    ```bash
    npm install
    ```
3. **Environment Setup:** Create a file named `.env` in the `/backend` directory.

    * **CRITICAL:** Set a secure value for `JWT_SECRET` and ensure your `MONGO_URI` is correct.

    ```
    # --- .env file content ---
    PORT=5000
    MONGO_URI=mongodb+srv://<dbUser>:<dbPass>@cluster.mongodb.net/taskdb?retryWrites=true&w=majority
    JWT_SECRET=this_should_be_a_long_random_string_interviewers_love_security
    NODE_ENV=development
    ```
4. Launch the API server:
    ```bash
    npm run dev
    # Server should confirm connection to MongoDB and start on port 5000.
    ```

### Step 2: Frontend (UI) Configuration

1. Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```
2. Install dependencies (React, Next.js, Axios, etc.):
    ```bash
    npm install
    ```
3. Start the Next.js development server:
    ```bash
    npm run dev
    # UI available at http://localhost:3000
    ```

---

## 🚀 How to Use the Application

1. Ensure **both** the backend and frontend servers are running in separate terminals.
2. Open **`http://localhost:3000`** in your browser.
3. The application will redirect to the `/login` page.
4. **Registration:** Use the `/register` link to create a new user account.
5. **Task Management:** Successfully registered users are redirected to the Dashboard to begin creating, viewing, and completing tasks.

---

## 🔒 API Documentation & Testing

Full API endpoints, methods, and payload structures are defined in the `docs/` folder:

* **`docs/api-documentation.md`**: Human-readable endpoint documentation.
* **`docs/Postman_Collection.json`**: File for direct import into Postman/Insomnia for quick testing of the backend API.
