# GoalTicker

**GoalTicker** is a full-stack goal-tracking application built with **Next.js**. It empowers users to define their ambitions and visualize their progress through a modern, clock-style countdown interface.

---

## Features

* **Custom Authentication**: Fully integrated **NextAuth.js** using the Credentials Provider. Secure sign-up and login flows with encrypted password handling.
* **Persistent Database**: Powered by **PostgreSQL**. All user profiles and goal data are stored reliably in a relational structure.
* **Full CRUD Operations**: A seamless interface to **Create, Read, Update, and Delete** goals with instant UI feedback.
* **Clock-Style Countdown**: A custom circular "clock" component for every goal that dynamically calculates and displays the time remaining until the target date.
* **Route Protection (Middleware)**: Global authentication guard using Next.js Middleware. Unauthorized access to `/goals` or private API routes triggers an automatic redirect to the login page.
* **Type Safety**: End-to-end **TypeScript** support, including module augmentation for NextAuth to ensure the `userId` is globally accessible and type-safe across the app.
* **Modern UI/UX**: A dark-themed, responsive dashboard built with **Tailwind CSS** and **Lucide React** icons.

---

## Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Authentication**: [NextAuth.js](https://next-auth.js.org/)
* **Database**: PostgreSQL (via `pg` library)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Language**: TypeScript

---

## Getting Started

Follow these instructions to set up the project locally.

### 1. Prerequisites
* **Node.js** (v18.x or higher)
* **PostgreSQL** (Local instance or a cloud provider)

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone this repo
cd goalticker
pnpm install
