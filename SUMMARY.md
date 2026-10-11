# Portfolio Project - Quick Summary

## Overview
Full-stack personal portfolio website for **Lalit Chaudhari** (AI/ML & Software Developer, M.Sc. Industrial Mathematics).

---

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with automatic in-memory fallback)
- **Email**: Nodemailer
- **Testing**: Vitest, React Testing Library, Supertest

---

## Quick Start Commands

```bash
# 1. Install all dependencies
npm install
npm --prefix client install
npm --prefix server install

# 2. Run both frontend & backend together
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## Run Tests
```bash
npm test
```

---

## Key Files to Edit

- **Personal Details, Skills & Projects**:  
  [`client/src/config/portfolioData.js`](file:///c:/Users/Asus/Desktop/Assignment/Portfolio/client/src/config/portfolioData.js)
- **Resume PDF**:  
  [`client/public/resume.pdf`](file:///c:/Users/Asus/Desktop/Assignment/Portfolio/client/public/resume.pdf)
- **Backend API Routes**:  
  [`server/src/routes/api.js`](file:///c:/Users/Asus/Desktop/Assignment/Portfolio/server/src/routes/api.js)
- **Environment Variables**:  
  [`.env.example`](file:///c:/Users/Asus/Desktop/Assignment/Portfolio/.env.example)

---

## API Endpoints
- `GET /api/health` - Server health check
- `GET /api/projects` - Get portfolio projects
- `POST /api/contact` - Submit contact message (with rate limit & validation)
