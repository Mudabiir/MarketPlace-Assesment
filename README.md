## Introduction

A minimalist web-based marketplace app: users can sign up, log in, list products (with images), and manage their items. Built with React (frontend), Node.js/Express (backend), and Prisma/Postgres.

## Setup Instructions

### Clone repository

```bash
git clone https://github.com/Mudabiir/MarketPlace-Assesment.git
cd MarketPlace-Assesment
```

### Backend

```bash
cd backend
npm install
```

- Create `.env` and add:
  ```
  DATABASE_URL=your_postgres_url
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_URL=your_cloudinary_connection
  ```

- Prepare database:
  ```bash
  npx prisma generate
  npx prisma migrate dev --name init
  # Optional: npx prisma studio
  ```

- Start server:
  ```bash
  npm run dev
  ```
  or
  ```bash
  npm start
  ```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---
