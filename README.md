# Blog API

A full-stack blog application built as part of The Odin Project.

The project uses a separate API backend to manage blog posts, authentication, and comments.

## Features

* User authentication
* Create, edit, and delete blog posts
* Publish/unpublish posts
* Comment system
* REST API
* Server-side validation

## Tech Stack

### Backend

* Node.js
* Express
* Prisma
* PostgreSQL
* Passport.js
* bcrypt

### Frontend

* React
* React Router
* Vite

## Installation

```bash
git clone <repo-url>
cd blog-api
npm install
```

Create a `.env` file:

```env
DATABASE_URL=
SESSION_SECRET=
PORT=3000
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

## API Routes

```text
/api/posts
/api/posts/:postId
/api/posts/:postId/comments
/api/auth/login
```

## Goals

The main purpose of the project was to practice:

* Building a REST API
* Authentication and authorization
* Database modeling with Prisma
* Backend validation
* Separating frontend and backend concerns

## License

MIT
