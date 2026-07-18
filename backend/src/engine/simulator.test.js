import { processMartianRobots } from './simulator.js';

describe('Martian Robots Core Engine', () => {
	it('should process sample input and output the exact expected results', () => {
		const sampleInput = [
			'5 3',
			'1 1 E',
			'RFRFRFRF',
			'3 2 N',
			'FRRFLLFFRRFLL',
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

	it('should reject unsupported orientation with a validation error', () => {
		expect(() => processMartianRobots(['5 5', '1 1 X', 'F'].join('\n'))).toThrow('Robot orientation on line 2 must be one of N, E, S, W.');
	});

	it('should reject invalid instruction commands', () => {
		expect(() => processMartianRobots(['5 5', '1 1 E', 'RFX'].join('\n'))).toThrow('Instruction line 3 may only contain the commands L, R, and F without spaces.');
	});

	it('should reject a robot starting position outside grid bounds', () => {
		expect(() => processMartianRobots(['5 5', '6 0 E', 'F'].join('\n'))).toThrow('Robot coordinates on line 2 are outside the grid bounds.');
	});

	it('should reject unpaired robot instructions', () => {
		expect(() => processMartianRobots(['5 5', '1 1 E'].join('\n'))).toThrow('Robot definitions must consist of a start line followed by an instruction line for each robot.');
	});

	it('should reject grid coordinates exceeding the maximum value of 50', () => {
		expect(() => processMartianRobots(['51 5', '1 1 E', 'F'].join('\n'))).toThrow('The maximum value for any coordinate is 50.');
	});

	it('should reject robot starting coordinates exceeding the maximum value of 50', () => {
		expect(() => processMartianRobots(['50 50', '51 5 E', 'F'].join('\n'))).toThrow('Robot coordinates on line 2 cannot exceed the maximum value of 50.');
	});

	it('should reject instruction strings of 100 characters or more', () => {
		const longInstruction = 'F'.repeat(100);
		expect(() => processMartianRobots(['5 5', '1 1 E', longInstruction].join('\n'))).toThrow('Instruction line 3 must be less than 100 characters in length.');
	});
});