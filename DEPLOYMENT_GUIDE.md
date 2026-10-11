# Deployment Guide - Lalit Chaudhari Portfolio

This guide explains how to deploy your portfolio for **free** with:
- **Frontend**: [Vercel](https://vercel.com) (fast, free SSL, global CDN)
- **Backend API**: [Render](https://render.com) (free Node.js web service)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (free cloud database)

---

## Step 1: Push Code to GitHub

1. Create a new repository on your GitHub account (`https://github.com/new`), name it `Portfolio`.
2. In your terminal run:

```bash
git add .
git commit -m "feat: complete fullstack portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/Roa07/Portfolio.git
git push -u origin main
```

---

## Step 2: Deploy the Backend on Render (Free)

1. Sign up / Log in to [Render](https://render.com) using your GitHub account.
2. Click **New +** &rarr; **Web Service**.
3. Connect your `Portfolio` repository.
4. Configure the service:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Instance Type**: `Free`
5. Click **Advanced** &rarr; **Add Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=https://your-portfolio-frontend.vercel.app
   MONGO_URI=your_mongodb_atlas_connection_string
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=chaudharivlalit16@gmail.com
   EMAIL_PASS=your_16_character_gmail_app_password
   CONTACT_RECEIVER_EMAIL=chaudharivlalit16@gmail.com
   ```
6. Click **Deploy Web Service**.
7. Once deployed, Render will give you a backend URL (e.g. `https://portfolio-backend-xyz.onrender.com`). Copy it!

---

## Step 3: Deploy the Frontend on Vercel (Free)

1. Sign up / Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New...** &rarr; **Project**.
3. Import your `Portfolio` repository.
4. In project configuration:
   - **Root Directory**: Click edit and choose `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Open **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://portfolio-backend-xyz.onrender.com` *(your Render URL from Step 2)*
6. Click **Deploy**.
7. In ~1 minute, Vercel gives you your live portfolio URL (e.g., `https://lalit-chaudhari.vercel.app`)!

---

## Step 4: Final Connection (CORS Check)

1. Go back to Render &rarr; `portfolio-backend` &rarr; **Environment**.
2. Update `CLIENT_URL` to your actual Vercel URL (e.g. `https://lalit-chaudhari.vercel.app`).
3. Click **Save Changes** (Render will automatically re-deploy in seconds).

---

## All Set!
Your portfolio is now live with:
- Custom domain support (optional)
- HTTPS encryption
- Contact form delivering directly to `chaudharivlalit16@gmail.com`
