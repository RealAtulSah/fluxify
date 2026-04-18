# Fluxify Media - Digital Marketing Agency Website & Admin Panel

A comprehensive, full-stack Next.js application tailored for "Fluxify Media," a modern digital marketing agency. Features a stunning public-facing website and a secure, fully-featured administrative dashboard for content management.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Database**: PostgreSQL (Aiven recommended) via Prisma ORM
- **Authentication**: NextAuth.js v5 (Auth.js) with JWT credentials strategy
- **Styling**: Vanilla CSS with CSS Variables for a responsive, fast, and scalable design system
- **Icons**: Lucide React
- **Rich Text Editing**: TipTap (for Blog posts)
- **Email Notifications**: Nodemailer (Google SMTP)

## ✨ Features

### Public Website
- **Bold & Modern Design**: Uses a vibrant gradient palette (Electric Purple #7B2FFF to Hot Orange #FF6B35) with smooth animations and responsive layouts.
- **Dynamic Content**: Pages fetch live data from the database.
- **Pages Included**: Home, About, Services, Portfolio, Case Studies, Testimonials, Blog, and Contact.
- **Lead Capture**: Delayed exit-intent/audit popup and a dedicated contact form with real-time lead ingestion into the admin panel.

### Secure Admin Dashboard
- **Authentication Check**: Protected routes that require admin login (Default: `admin` / `1234`).
- **11-Module Content Management**:
  - **Blog Manager**: Full Rich Text Editor (TipTap), draft/publish toggles, and tagging.
  - **Leads Inbox**: View, filter, and track leads captured from the contact form or popups. Includes CSV export and internal notes.
  - **Portfolio & Case Studies**: Easily add and display your agency's best work.
  - **Services & Pricing**: Modify offerings, features, and package prices dynamically.
  - **Testimonials**: Approve and feature client reviews. Includes video testimonial placeholder cards.
  - **Team Members & Client Logos**: Build trust by showcasing your experts and past clients.
  - **Site Settings**: Globally update the site's tagline, contact information, social links, and SEO metadata directly from the dashboard.

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Update the `.env` file with your database connection, secrets, and SMTP settings.
   ```env
   # Example: Aiven PostgreSQL
   DATABASE_URL="postgresql://user:password@host:port/defaultdb?sslmode=require"
   
   # Generate a random secret (e.g. using `npx auth secret`)
   AUTH_SECRET="your-random-secret"
   ```

3. **Database Migration & Seeding**:
   Run the following commands to create the database schema and populate it with initial data (including the default `admin` user).
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Directory Structure

- `src/app/(public)`: All public-facing marketing pages (Home, About, Services, Blog, etc.)
- `src/app/admin`: Secure administrative dashboard layout and pages.
- `src/components`: Reusable UI components (Navbar, Footer, Admin Tables, etc.)
- `src/lib`: Core utility functions (Prisma client singleton, email logic, Server Actions).
- `prisma`: Database schema, Prisma v7 configuration, and seeding scripts.

## 📋 Deployment

This project is configured to run smoothly on platforms like **Render**, **Vercel**, or **Railway**. 
- Ensure you set the environment variables in your hosting provider's dashboard.
- Update the build command to `prisma generate && next build`.

---
*Built with ❤️ for Fluxify Media.*
