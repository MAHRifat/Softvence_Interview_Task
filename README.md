# 📝 Tasko – Full Stack Task Management App

**Tasko** is a complete full-stack web application built for the **Softvence Interview Task**. It features user authentication, task management (CRUD), and a fun category selection feature using a spin wheel. Built using modern technologies: React, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

🔗 **Live Website**: [https://tasko-nu.vercel.app](https://tasko-nu.vercel.app)
🔗 **Backend API**: [https://tasko-l7bf.onrender.com](https://tasko-l7bf.onrender.com)

---

## 🚀 Features Overview

### Common Features

* JWT-based user authentication
* Protected routes and API
* Responsive UI for mobile & desktop
* Full CRUD for tasks
* Confirmation modals for delete and completion
* Spin Wheel for category-based task selection

---

## 💻 Frontend

### 📁 Tech Stack

* **React 19**
* **Vite 7**
* **Tailwind CSS 4.1**
* **React Router v7**
* **Lucide React + React Icons**
* **date-fns** (date formatting)

### 🗂️ Key Pages & Components

* **Login / Signup**: Handles user auth
* **Dashboard**: Displays user-specific task cards
* **Add/Edit Task Modal**: Overlay form components
* **Task Details Page**: Detailed view with status update
* **Spin Wheel Page**: Randomly select task category
* **Navbar**: Persistent top menu with route state

### 🛍️ Routing Structure

* `/login`, `/signup`: Authentication pages
* `/dashboard`: Main dashboard after login
* `/task/:id`: Task details
* `/spin`: Category spin wheel

### 🔧 Vite Scripts

```bash
npm install     # Install dependencies
npm run dev     # Start dev server
npm run build   # Build for production
```

---

## 🌐 Backend

### ⚙️ Tech Stack

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* **jsonwebtoken** for JWT
* **bcrypt** for password hashing
* **dotenv** for environment configs
* **helmet + cors** for security
* **express-validator** for validation

### 📦 API Endpoints

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/api/users/register` | User registration             |
| POST   | `/api/users/login`    | User login + token            |
| GET    | `/api/users/profile`  | Authenticated user profile    |
| GET    | `/api/tasks`          | Get all tasks (auth required) |
| POST   | `/api/tasks`          | Create new task               |
| GET    | `/api/tasks/:id`      | Get single task               |
| PUT    | `/api/tasks/:id`      | Update task                   |
| DELETE | `/api/tasks/:id`      | Delete task                   |

### 🔐 Authentication Middleware

Protects all `/api/tasks` routes with JWT verification. Only logged-in users can access their own tasks.

### 🌍 .env Variables (Backend)

```env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

### 🔧 Scripts

```bash
npm install     # Install backend dependencies
npm run dev     # Start with nodemon (development)
npm start       # Start in production
```

---

## 🌐 Deployment

| Layer    | Platform | Link                                                               |
| -------- | -------- | ------------------------------------------------------------------ |
| Frontend | Vercel   | [https://tasko-nu.vercel.app](https://tasko-nu.vercel.app)         |
| Backend  | Render   | [https://tasko-l7bf.onrender.com](https://tasko-l7bf.onrender.com) |

### ♻️ Auto Deployment

* Pushing to the `main` branch on GitHub triggers deploys.
* Vercel handles all React routes with rewrite rules (via `vercel.json`).

---

## 📁 Folder Structure

```bash
Softvence_Interview_Task/
├── backend/                  # Express API with MongoDB
│   ├── src/
│   │   ├── config/
│   │   │   └── db.config.js
│   │   ├── controllers/
│   │   │   ├── task.controller.js
│   │   │   └── user.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   ├── task.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── task.routes.js
│   │   │   └── user.routes.js
│   │   ├── utils/
│   │   │   └── email.validator.js
│   │   └── app.js
│   └── index.js
│
├── frontend/                 # React + Tailwind + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
└── README.md
```

---

## 🙋 Author

**Md Ahsanur Rahman Rifat**
GitHub: [@MAHRifat](https://github.com/MAHRifat)

---

## 📄 License

This project was developed for educational and interview use only.
