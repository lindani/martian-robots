import express from 'express';
import { processMartianRobots } from './engine/simulator.js';

const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

app.post('/api/simulate', (req, res) => {
	const { input } = req.body;

	if (!input) {
		return res.status(400).json({ error: 'Input string is required.' });
	}

	try {
		const result = processMartianRobots(input);
		res.json({ output: result });
	} catch (error) {
		console.error('Simulation error:', error);
		res.status(500).json({ error: 'Failed to process robot simulation.' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});