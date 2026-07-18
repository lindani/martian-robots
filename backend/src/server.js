import express from 'express';
import cors from 'cors'; // Import cors
import { processMartianRobots } from './engine/simulator.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/simulate', (req, res) => {
	// req.body is now your array (e.g., ["5 3", "1 1 E", ...])
	const inputData = req.body;

	if (!Array.isArray(inputData) || inputData.length === 0) {
		return res.status(400).json({ error: 'Input must be an array of strings.' });
	}

	try {
		// Convert the array to the newline-delimited string the simulator expects
		const inputString = inputData.join('\n');
		const result = processMartianRobots(inputString);
		res.json({ output: result });
	} catch (error) {
		console.error('Simulation error:', error);
		res.status(500).json({ error: 'Failed to process simulation.' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});