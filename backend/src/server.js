import express from 'express';
import cors from 'cors'; // Import cors
import { InputValidationError, processMartianRobots } from './engine/simulator.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/simulate', (req, res) => {
	const inputData = req.body;

	if (!Array.isArray(inputData) || inputData.length === 0 || !inputData.every(item => typeof item === 'string')) {
		return res.status(400).json({ error: 'Input must be an array of strings.' });
	}

	try {
		// Convert the array to the newline-delimited string the simulator expects
		const inputString = inputData.join('\n');
		const result = processMartianRobots(inputString);
		res.json({ output: result });
	} catch (error) {
		console.error('Simulation error:', error);
		if (error instanceof InputValidationError) {
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Failed to process simulation.' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});