# Martian Robots

Martian Robots is a small full-stack app that simulates robot movement across a 2D grid. The frontend collects mission input, the backend runs the simulation logic, and the result is shown back to the user in a polished interface.

## Project overview

This project is split into two main parts:

- Frontend: a Next.js app for entering mission data and viewing results
- Backend: an Express API that runs the simulator engine

## Project structure

```text
backend/
  src/
    engine/
      simulator.js
      simulator.test.js
    server.js
  package.json
  README.md

frontend/
  src/
    app/
      globals.css
      layout.tsx
      page.tsx
  package.json
  README.md
```

## How to get started

### Option 1: Start both services separately

#### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend listens on port 3001.

#### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

### Option 2: Run both from the project root

Open two terminals and run:

```bash
cd backend && npm run dev
```

and

```bash
cd frontend && npm run dev
```

This is the easiest workflow if you want to test the UI and API together.

## How to navigate the project

- Use the frontend to enter robot instructions and run simulations.
- Use the backend API if you want to test the logic directly or integrate it elsewhere.
- Review the simulator engine in [backend/src/engine/simulator.js](backend/src/engine/simulator.js) if you want to understand the movement rules.
- Review the main UI in [frontend/src/app/page.tsx](frontend/src/app/page.tsx) if you want to tweak the experience.

## Testing

### Backend tests

```bash
cd backend
npm test
```

### Frontend development

```bash
cd frontend
npm run dev
```

## Notes

- The frontend expects the backend to be running at http://localhost:3001/api/simulate.
- The simulator uses a simple set of movement rules with support for lost robots.

## Future improvements

Possible next steps for the project include:

- Add a database to save past missions, robot histories, and user-created scenarios.
- Build a more graphical interface with an animated grid, robot movement visualization, and step-by-step playback.
- Turn the experience into a game-like simulator with levels, challenges, and scoring.
- Add authentication and user accounts so multiple people can manage and compare simulations.
- Introduce analytics and export options to review mission outcomes and share results.
- Improve the overall experience with richer visual feedback, presets, and support for more complex robot behaviors.
