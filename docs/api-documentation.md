### Task Management RESTful API Documentation

**Project:** Task Manager Full Stack Project
**Base URL:** `http://localhost:5000/api`
**Authentication:** All protected routes require a JSON Web Token (JWT) in the `Authorization` header, formatted as: `Bearer <token>`.

---

### 1. Authentication Endpoints (Public)

| Method | Path | Description | Request Body Example | Success Response (200/201) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/auth/signup` | Register a new user and return a JWT. | `{ "name": "Test User", "email": "user@test.com", "password": "password123" }` | `{ "_id": "...", "name": "...", "token": "<JWT>" }` |
| **POST** | `/auth/login` | Authenticate user and return a JWT. | `{ "email": "user@test.com", "password": "password123" }` | `{ "_id": "...", "name": "...", "token": "<JWT>" }` |

---

### 2. User Profile Endpoints (Protected)

| Method | Path | Description | Request Body Example | Success Response (200) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/users/profile` | Retrieve the logged-in user's data. | None | `{ "_id": "...", "name": "...", "email": "...", "createdAt": "..." }` |
| **PUT** | `/users/profile` | Update the user's name or email. | `{ "name": "New Name" }` | `{ "_id": "...", "name": "New Name", "email": "..." }` |

---

### 3. Task Management Endpoints (Protected)

| Method | Path | Description | Request Body Example | Success Response (200/201) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/tasks` | Create a new task. | `{ "title": "Buy groceries", "description": "Milk and eggs" }` | The created Task object. |
| **GET** | `/tasks` | Retrieve all tasks owned by the user. | None | `[{...task1}, {...task2}, ...]` |
| **PUT** | `/tasks/:id`| Update an existing task. | `{ "isCompleted": true }` | The updated Task object. |
| **DELETE** | `/tasks/:id`| Delete a task by ID. | None | `{ "message": "Task removed successfully" }` |