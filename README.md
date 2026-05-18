#  TradeBoard — Local Job Board for Tradespeople

A full-stack web application that connects homeowners with skilled tradespeople. Browse open service requests, post jobs, and manage listings — all in one place.

---



## ⚙️ Prerequisites

Make sure you have the following installed before starting:

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | v18 or higher |
| [npm](https://www.npmjs.com/) | v9 or higher |
| [MongoDB](https://www.mongodb.com/) | v6+ (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster |
| [Git](https://git-scm.com/) | Any recent version |

---

##  Environment Variables

### Backend — `backend/.env`

Create a file named `.env` inside the `backend/` folder and add the following:

```env
# Server
PORT=5000

# MongoDB connection string
# Local:  mongodb://localhost:27017/tradeboard
# Atlas:  mongodb+srv://<user>:<password>@cluster.mongodb.net/tradeboard
MONGO_URI=mongodb://localhost:27017/tradeboard

# JWT secret — use a long, random string in production
JWT_SECRET=your_super_secret_jwt_key_here

# Node environment
NODE_ENV=development
```

### Frontend — `frontend/.env.local`

Create a file named `.env.local` inside the `frontend/` folder and add the following:

```env
# Base URL of your running backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

>  **Never commit `.env` or `.env.local` to version control.** Both files are listed in `.gitignore` by default.

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tradeboard.git
cd tradeboard
```

### 2. Set up the Backend

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create and fill in your environment file
cp .env.example .env
# (then edit .env with your values — see Environment Variables above)
```

### 3. Set up the Frontend

```bash
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Create and fill in your environment file
cp .env.example .env.local
# (then edit .env.local with your values — see Environment Variables above)
```

---

## ▶️ Run Instructions

### Running the Backend

```bash
cd backend

# Development mode (auto-restarts on file changes)
npm run dev

# Production mode
npm start
```

The API will be available at: **`http://localhost:5000`**

> The backend uses [Nodemon](https://nodemon.io/) for development. If it's not installed, run `npm install -g nodemon` or add it as a dev dependency.

---

### Running the Frontend

```bash
cd frontend

# Development mode (hot reload)
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start
```

The app will be available at: **`http://localhost:3000`**

---

### Running Both Together (Recommended for Development)

Open **two terminal windows** and run each server side by side:

**Terminal 1 — Backend**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend**
```bash
cd frontend && npm run dev
```

Alternatively, install [concurrently](https://www.npmjs.com/package/concurrently) at the root level to run both with one command:

```bash
# From the project root
npm install concurrently --save-dev

# Add this to root package.json scripts:
# "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""

npm run dev
```

---

##  Database Setup

### Option A — Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service:
   ```bash
   # macOS (Homebrew)
   brew services start mongodb-community

   # Ubuntu / Debian
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```
3. Use the connection string: `mongodb://localhost:27017/tradeboard`

### Option B — MongoDB Atlas (Cloud, Free Tier)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new **Shared (Free)** cluster
3. Under **Database Access**, add a database user with a username and password
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` for development)
5. Click **Connect → Connect your application** and copy the connection string
6. Paste it into `backend/.env` as `MONGO_URI`, replacing `<password>` with your actual password

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | Get all jobs |
| `GET` | `/api/jobs/:id` | Get a single job |
| `POST` | `/api/jobs` | Create a new job |
| `PATCH` | `/api/jobs/:id` | Update job status |
| `DELETE` | `/api/jobs/:id` | Delete a job |

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | [Next.js 14](https://nextjs.org/), React, Tailwind CSS |
| Backend | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) |
| Database | [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/) |
| Auth | JWT (JSON Web Tokens) |

---

##  Troubleshooting

**`ECONNREFUSED` on API calls**
Make sure the backend server is running on port `5000` and that `NEXT_PUBLIC_API_URL` in `.env.local` points to the correct address.

**MongoDB connection error**
Check that your `MONGO_URI` is correct and that MongoDB is running locally, or that your Atlas cluster is accessible from your IP.

**Port already in use**
Change the `PORT` value in `backend/.env`, and update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` to match.

**`next: command not found`**
Run `npm install` inside the `frontend/` folder to install all dependencies first.

---

