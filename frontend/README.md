# Frontend Guide

This frontend provides the user interface for the Martian Robots simulator. It sends mission input to the backend API and displays the simulation output in a more polished experience.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 in your browser.

## Prerequisites

The frontend expects the backend API to be running at:

- http://localhost:3001/api/simulate

Make sure the backend is started first before trying to run a simulation.

## What you can do here

- Paste mission input into the editor panel
- Load a sample mission with one click
- Run the simulator and view the resulting robot positions
- See helpful loading and error states while the request is processing

## Main files

- [src/app/page.tsx](src/app/page.tsx) - the main simulator UI
- [src/app/layout.tsx](src/app/layout.tsx) - the app shell and metadata
- [src/app/globals.css](src/app/globals.css) - global Tailwind styling and theme setup

## Development notes

- This app uses Next.js with Tailwind styling.
- The main simulation request is sent from the homepage to the backend API.
- If you change the backend endpoint, update the request URL in [src/app/page.tsx](src/app/page.tsx).

## Useful commands

```bash
npm run dev
npm run build
npm run lint
```
