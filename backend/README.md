# Backend API Guide

This backend powers the Martian Robots simulator. It exposes a small HTTP API that accepts mission input as an array of strings and returns the simulation output.

## What this service does

- Receives robot mission instructions from the frontend
- Runs the simulation engine from [src/engine/simulator.js](src/engine/simulator.js)
- Returns the final robot positions and any lost-robot markers

## Getting started

1. Change into the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

The API will be available at:

- http://localhost:3001

## API endpoint

### POST /api/simulate

Send an array of strings representing the mission input.

#### Example request

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 3","1 1 E","RFRFRFRF","3 2 N","FRRFLLFFRRFLL"]'
```

#### Example response

```json
{
  "output": "1 1 E\n3 3 N LOST"
}
```

## Input format

The request body should be an array where each item is one line of input:

```text
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
```

Rules:
- The first line defines the grid size.
- Each robot is represented by a starting position and movement string.
- The movement string uses the letters `L`, `R`, and `F`.

## Testing

### Run unit tests

```bash
npm test
```

### Test the API manually

You can use curl, Postman, or Insomnia.

Example with curl:

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 3","1 1 E","RFRFRFRF"]'
```

### Example scenarios

1. Valid mission with two robots:

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 3","1 1 E","RFRFRFRF","3 2 N","FRRFLLFFRRFLL"]'
```

Expected response:

```json
{
  "output": "1 1 E\n3 3 N LOST"
}
```

2. Valid mission with a robot that goes lost:

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 3","0 3 W","LLFFFLFLFL"]'
```

Expected response:

```json
{
  "output": "2 3 S"
}
```

3. Invalid orientation:

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 5","1 1 X","F"]'
```

Expected response:

```json
{
  "error": "Robot orientation on line 2 must be one of N, E, S, W."
}
```

4. Invalid instruction characters:

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 5","1 1 E","RFX"]'
```

Expected response:

```json
{
  "error": "Instruction line 3 may only contain the commands L, R, and F without spaces."
}
```

5. Robot starting outside grid bounds:

```bash
curl -X POST http://localhost:3001/api/simulate \
  -H "Content-Type: application/json" \
  -d '["5 5","6 0 E","F"]'
```

Expected response:

```json
{
  "error": "Robot coordinates on line 2 are outside the grid bounds."
}
```

## Project structure

- [src/server.js](src/server.js) - Express server and API route
- [src/engine/simulator.js](src/engine/simulator.js) - Simulation logic
- [src/engine/simulator.test.js](src/engine/simulator.test.js) - Example test coverage

## Notes

- The backend currently runs on port 3001.
- The frontend expects the backend at http://localhost:3001/api/simulate.
