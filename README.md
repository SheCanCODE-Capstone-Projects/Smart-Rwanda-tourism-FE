# Smart-Rwanda-tourism — Frontend

React + TypeScript frontend, built with Vite.

## Prerequisites

- Node.js 20+
- npm
- Docker & Docker Compose (optional, for containerized run)

## Clone

```bash
git clone <repository-url>
cd SRT-FE
```

## Run locally

```bash
npm install
npm run dev
```

The app is served at http://localhost:5173.

## Run with Docker

```bash
docker compose up --build
```

The app is served via nginx at http://localhost:8080.

## Environment variables

Copy `.env.example` to create your own env file and set `VITE_API_URL`:

```bash
cp .env.example .env.local
```
