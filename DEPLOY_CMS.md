# CMS Deployment Guide

This guide explains how to deploy the Payload CMS (located in the `cms/` folder) to **Railway**.

## Prerequisites
- A GitHub account (you already have this).
- A [Railway](https://railway.app/) account (free trial available).
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available).

## Part 1: Database Setup (MongoDB Atlas)
1.  Log in to MongoDB Atlas and create a new **Cluster** (Shared/Free tier is fine).
2.  Go to **Database Access** > **Add New Database User**.
    -   Create a username and password (e.g., `cms_user` / `your_secure_password`).
    -   **Important:** Remember this password!
3.  Go to **Network Access** > **Add IP Address**.
    -   Choose **Allow Access from Anywhere** (`0.0.0.0/0`).
4.  Go to **Database** > **Connect** > **Drivers**.
    -   Copy the connection string. It looks like:
        `mongodb+srv://cms_user:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
    -   Replace `<password>` with the password you created.

## Part 2: Cloud Storage (Optional but Recommended)
For image uploads to work permanently, you need an S3 bucket (AWS S3, Cloudflare R2, or Railway's generic storage). 
*If you skip this, images uploaded to the CMS will disappear if the server restarts.*

## Part 3: Deploy to Railway
1.  Log in to [Railway](https://railway.app/).
2.  Click **New Project** > **Deploy from GitHub repo**.
3.  Select your repository: `lahirutw85/bibalaya.com`.
4.  **Important:** Railway will try to deploy the root. We need to tell it to deploy the `cms` folder.
    -   Click on the new service "bibalaya.com".
    -   Go to **Settings**.
    -   Scroll down to **Root Directory**.
    -   Change it from `/` to `/cms`.
5.  Go to the **Variables** tab.
    -   Add `DATABASE_URI`. Value: Your MongoDB connection string from Part 1.
    -   Add `PAYLOAD_SECRET`. Value: A long random string (e.g., `a1b2c3d4e5...`).
    -   Add `NEXT_PUBLIC_SERVER_URL`. Value: The URL Railway gives you (e.g. `https://bibalaya-cms-production.up.railway.app`).
        *   *Note: You get the URL from the Settings > Networking tab. Generate a domain if one isn't there.*

## Part 4: Finalize
1.  Railway will automatically redeploy when you change settings.
2.  Once deployed, go to `https://<your-railway-url>/admin` to create your first admin user.
3.  Update your Frontend environment variables (`VITE_CMS_URL` or similar) to point to this new URL.
