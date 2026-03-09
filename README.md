# MaisonFlorae Backend (Beginner Guide)

This is the server part of MaisonFlorae.
It sends data to the frontend.

## What You Need Installed

1. Node.js (version 20 or newer): https://nodejs.org/
2. npm (comes with Node.js)

Check both are installed:

```bash
node -v
npm -v
```

If both commands return version numbers, you are ready.

## Project Folder Structure

- `src/controllers`: request handlers
- `src/routes`: API routes
- `src/services`: business logic
- `src/models`: data models
- `src/middlewares`: request middlewares
- `src/config`: app configuration

## How To Run Locally

1. Open terminal in this folder (`MaisonFloraeBackend`).
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in this folder with:

```env
PORT=5005
```

4. Start the server:

```bash
npm run dev
```

5. The backend should be available at `http://localhost:5005`.

## Useful Commands

- `npm run dev`: run locally with auto-restart
- `npm start`: run with Node.js

## Common Problems

- `npm` command not found:
	Node.js is not installed correctly. Reinstall from nodejs.org.
- Port already in use:
	Change `PORT` in `.env` (example: `PORT=5006`).
- App does not start:
	Run `npm install` again and verify `.env` exists.