# Modern Full-Stack Personal Portfolio Website

A modern, responsive, and production-ready **Personal Developer Portfolio Website** built with **React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Node.js, Express.js, MongoDB**, and **Nodemailer**.

---

## 🌟 Key Features

- **Modern & Responsive UI**: Seamlessly adapts to smartphones, tablets, laptops, and ultra-wide screens without horizontal overflow.
- **Dark & Light Mode**: Instant theme toggle with local storage persistence and system preference detection.
- **Glassmorphism & Micro-Interactions**: Ambient gradient backdrops, smooth scroll spy navigation, and subtle Framer Motion entrance transitions.
- **Centralized Data Configuration**: Customize all personal information, career objectives, education, skills, projects, and achievements easily in `client/src/config/portfolioData.js`.
- **Project Showcase & Filtering**: Category-based project filtering (`All`, `Web Development`, `AI/ML`, `Other`), direct source code links, live demo links, detailed project modals, and offline demo indicators.
- **Skills Categorization**: Tabbed organization across Languages, Frontend, Backend, Databases, AI/ML, and Developer Tools with proficiency indicators.
- **Education & Experience Timelines**: Cards for degrees, institutions, CGPA/grades, coursework, internships, hackathons, and certifications.
- **Working Contact System**:
  - Client-side validation with React Hook Form.
  - Express.js backend validation with `express-validator`.
  - Rate limiting (max 10 requests / 15 minutes per IP) to prevent spam.
  - Automatic persistence to MongoDB (with graceful in-memory storage fallback if MongoDB is not running locally).
  - Nodemailer email notifications (with simulated mode for safe local testing).
- **Downloadable Resume**: Verified resume PDF download link located in `client/public/resume.pdf`.
- **Automated Testing**: 100% passing test suites for both frontend (Vitest + React Testing Library) and backend (Vitest + Supertest).

---

## 🛠️ Technology Stack

| Domain | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, React Hook Form |
| **Backend** | Node.js, Express.js, Helmet, CORS, Express-Rate-Limit, Express-Validator |
| **Database** | MongoDB with Mongoose (with in-memory resilience fallback) |
| **Email Service** | Nodemailer |
| **Testing** | Vitest, React Testing Library, Supertest, JSDOM |

---

## 📁 Project Structure

```text
Portfolio/
├── client/                     # Frontend Application
│   ├── public/
│   │   ├── images/             # Project screenshots and assets
│   │   └── resume.pdf          # Downloadable resume PDF
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, SectionHeading, SocialIcons)
│   │   ├── config/
│   │   │   └── portfolioData.js # Centralized portfolio content
│   │   ├── hooks/              # Custom hooks (useTheme)
│   │   ├── sections/           # Portfolio sections (Hero, About, Education, Skills, Projects, Achievements, Resume, Contact)
│   │   ├── App.jsx             # Root layout and section integration
│   │   ├── index.css           # Global Tailwind CSS and glassmorphism styling
│   │   └── main.jsx            # Application entry
│   ├── tests/                  # Client component tests
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend REST API
│   ├── src/
│   │   ├── config/             # DB connection logic (db.js)
│   │   ├── controllers/        # Contact and project handlers (contactController.js)
│   │   ├── middleware/         # Input sanitization, validation, and error handler
│   │   ├── models/             # Mongoose schemas (Contact.js)
│   │   ├── routes/             # API routes (/health, /contact, /projects)
│   │   ├── utils/              # Nodemailer email notification service
│   │   └── server.js           # Express app setup and server listener
│   └── tests/                  # Server integration tests
│
├── .env.example                # Sample environment variables
├── .gitignore
├── package.json                # Root package for coordinated development and testing
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later
- **MongoDB** *(Optional)*: Local MongoDB server or MongoDB Atlas connection string. (The backend automatically falls back to an in-memory store if MongoDB is not present, allowing instant development testing).

---

### 1. Installation

Clone or open the repository folder, then install root, client, and server dependencies:

```bash
# In the project root directory
npm install
npm --prefix client install
npm --prefix server install
```

---

### 2. Environment Configuration

Copy `.env.example` in the server directory or set your root configuration:

```bash
cp .env.example server/.env
```

Default `.env` values:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db

# Optional Email Settings (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
CONTACT_RECEIVER_EMAIL=your_email@gmail.com
```

> **Note**: If `EMAIL_USER` is unconfigured or left as default, the server safely runs in **Simulated Mode**, returning a successful status code while printing notifications to console without throwing SMTP auth failures.

---

### 3. Running the Application

You can run both client and server concurrently from the root directory:

```bash
# Start both client (Vite on :5173) and server (Express on :5000)
npm run dev
```

Or run them individually:

```bash
# Start backend API (http://localhost:5000)
npm run dev:server

# Start frontend application (http://localhost:5173)
npm run dev:client
```

Open your browser at `http://localhost:5173`.

---

### 4. Running Automated Tests

To run the complete test suite (both server and client tests):

```bash
npm test
```

To run individual test suites:

```bash
# Run server API tests only
npm run test:server

# Run frontend tests only
npm run test:client
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint returning server status, uptime, and database connection state |
| `POST` | `/api/contact` | Submits a contact inquiry (includes rate limiting, validation, DB persistence, and email notification) |
| `GET` | `/api/projects` | Retrieves portfolio projects list dynamically |

#### Example Contact Request (`POST /api/contact`)
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "subject": "Collaboration Opportunity",
  "message": "Hi, I checked your portfolio and would like to connect about an open role."
}
```

---

## 🎨 How to Customize Personal Details

All portfolio content is decoupled from UI layout code. To customize the information:

1. Open [`client/src/config/portfolioData.js`](file:///c:/Users/Asus/Desktop/Assignment/Portfolio/client/src/config/portfolioData.js).
2. Edit:
   - `personal`: Name, title, avatar URL, bio, location, email, and social links.
   - `about`: Introduction paragraph, career objectives, learning goals, and key strengths.
   - `education`: Degrees, institutions, CGPA, graduation years, and course lists.
   - `skills`: Skill categories and proficiency indicators (`Advanced`, `Proficient`, `Intermediate`).
   - `projects`: Project title, description, categories, tech stack, github link, and live demo link.
   - `experienceAndAchievements`: Internships, certifications, hackathons, and leadership roles.
3. Replace the resume PDF at [`client/public/resume.pdf`](file:///c:/Users/Asus/Desktop/Assignment/Portfolio/client/public/resume.pdf) with your own CV.

---

## 🚢 Deployment Guide

### Deploying Frontend (Vercel / Netlify / GitHub Pages)
1. Run `npm run build:client` to generate production assets in `client/dist`.
2. Connect your Git repository to **Vercel** or **Netlify**.
3. Set build command to `npm --prefix client run build` and output directory to `client/dist`.
4. Add environment variable `VITE_API_URL` pointing to your deployed backend URL.

### Deploying Backend (Render / Railway / Heroku)
1. Deploy the `server/` folder to a Node.js hosting platform (such as Render or Railway).
2. Set environment variables (`PORT`, `MONGO_URI`, `CLIENT_URL`, `EMAIL_USER`, `EMAIL_PASS`).
3. Set start command to `node src/server.js`.

---

## 📄 License
MIT License. Free to use and modify for your personal portfolio.
