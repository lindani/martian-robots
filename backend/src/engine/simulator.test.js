import { processMartianRobots } from './simulator.js';

describe('Martian Robots Core Engine', () => {
	it('should process sample input and output the exact expected results', () => {
		const sampleInput = [
			'5 3',
			'1 1 E',
			'RERERERE',
			'3 2 N',
			'FRRELLFERRELL',
			'0 3 W',
			'LLFFFLFLFL'
		].join('\n');

		const expectedOutput = [
			'1 1 E',
			'3 3 N LOST',
			'2 3 S'
		].join('\n');

		const result = processMartianRobots(sampleInput);

		expect(result).toBe(expectedOutput);
	});

	it('should default to north when the starting orientation is unsupported', () => {
		const result = processMartianRobots(['5 5', '1 1 X', 'F'].join('\n'));

		expect(result).toBe('1 2 N');
	});
});