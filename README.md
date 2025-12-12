# Task-Flow: MERN Stack Task Manager

A complete frontend + backend project implementing responsive UI, JWT-based authentication, protected dashboard routes, profile management, and CRUD APIs. Created for the **Frontend Developer Intern Assignment** to demonstrate frontend skills, backend integration, security, and scalability.

---

## 🎯 Project Overview

Task-Flow is a full-stack web application designed for personal task management.  
It features:

- Secure user authentication  
- Protected dashboard  
- Task CRUD operations  
- User profile fetch & update  
- Responsive UI  
- Fully documented API layer  

---

## 🛠️ Tech Stack

| Layer | Technologies | Description |
|------|--------------|-------------|
| **Frontend** | Next.js 14+, React 18, TailwindCSS | Client-side pages, protected routes, auth context |
| **Backend** | Node.js, Express.js | REST API, routing, validation, JWT auth |
| **Database** | MongoDB, Mongoose | Schema-based modeling |
| **Security** | JWT, bcrypt | Hashed passwords, token validation |
| **Tools** | Axios, Postman, Render, GitHub | API calls, testing, deployment |

---

# ✨ Features

### 🔐 **Authentication**
- User Registration (JWT-based)
- Login / Logout
- Protected dashboard routes
- Password hashing using bcrypt

### 👤 **User Profile**
- Fetch logged-in user data
- Update username/email

### 📋 **Task Management (CRUD)**
- Create new task  
- View tasks  
- Update task  
- Delete task  
- User-specific tasks only  
- Optional search & filter bar

### 🖥️ **Frontend Features**
- Responsive layout  
- Client-side validation  
- Global auth context  
- Axios-based API integration  
- Error handling, toast messages  

### ⚙️ **Backend Features**
- RESTful API structure  
- JWT middleware  
- Error-handling middleware  
- Request validation  
- MongoDB connection handling  

---

# 📁 Folder Structure

```
Task-Flow/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env (not committed)
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── app/
│   ├── context/
│   ├── package.json
│   └── next.config.js
│
│── docs/
│   ├── Postman_Collection.json
│   └── api-documentation.md
│
│── logs/
│   └── backend.log
│
└── README.md
```

---

# ⚙️ Local Development Setup

## 🔧 1. Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_long_random_key
NODE_ENV=development
```

### Start backend server:

```
npm run dev
```

Server starts on `http://localhost:5000`.

---

## 🎨 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The UI runs on:  
👉 http://localhost:3000

---

# 🚀 Using the App

1. Start frontend + backend  
2. Go to `http://localhost:3000`  
3. Register → Login  
4. Access dashboard  
5. Create/update/delete tasks  
6. Edit profile  
7. Logout  

---

# 🔌 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | Login user & return JWT |

### **User**
| GET | `/api/profile` | Get logged-in user |
| PUT | `/api/profile/update` | Update user |

### **Tasks**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

Full documentation in `/docs/Postman_Collection.json`.

---

# 📦 Logs

Log files stored in:

```
logs/backend.log
```

Includes:
- Server startup logs  
- MongoDB connection logs  
- Request logs  
- Authorization logs  

---

# 📈 Scaling Notes (Very Important)

To make this app production-ready:

### **1. Frontend Scaling**
- Use **Server Components** & caching in Next.js for faster profile/task data
- Implement **token refresh mechanism**
- Integrate **React Query** or **SWR** for smoother API states
- Add **SEO meta tags** for pages
- Enable **CI/CD** with Vercel or GitHub Actions

### **2. Backend Scaling**
- Move validation to a dedicated library (e.g., Zod/Joi)
- Add **rate limiting** & **request throttling**
- Add **Redis caching** for commonly fetched resources
- Use **PM2 + Cluster Mode** for multi-core performance
- Implement **API versioning** (`/api/v1/...`)

### **3. Database Scaling**
- Use MongoDB Atlas with:
  - Auto-scaling  
  - Indexes on userId, createdAt fields  
  - Sharded collections (for high traffic)

### **4. Security Improvements**
- HTTPS & secure cookies  
- Helmet.js security middleware  
- CORS restrictions to specific domains  
- Store JWT in HttpOnly cookies  

---

# 📥 API Testing

All Postman tests are available in:

```
docs/Postman_Collection.json
```

Import into Postman → test all endpoints easily.

---

# 📬 Assignment Submission

Include:

- GitHub repository link  
- Postman collection  
- Log files  
- README.md (this file)  

---

# ✅ Thank You!

If you need help running or reviewing the code, feel free to reach out.

