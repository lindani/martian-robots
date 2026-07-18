const DIRECTIONS = ['N', 'E', 'S', 'W'];
const MOVEMENT_MAP = {
	N: { x: 0, y: 1 },
	E: { x: 1, y: 0 },
	S: { x: 0, y: -1 },
	W: { x: -1, y: 0 },
};

export class InputValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = 'InputValidationError';
	}
}

class Robot {
	constructor(x, y, orientation, bounds, scents) {
		this.x = x;
		this.y = y;
		this.dirIndex = DIRECTIONS.indexOf(orientation);
		this.bounds = bounds;
		this.scents = scents;
		this.isLost = false;

		// Extensibility: Command map for future instructions
		this.commands = {
			'L': () => { this.dirIndex = (this.dirIndex + 3) % 4; },
			'R': () => { this.dirIndex = (this.dirIndex + 1) % 4; },
			'F': () => { this.moveForward(); }
		};
	}

	execute(instructions) {
		for (const cmd of instructions) {
			if (this.isLost) break;

			const action = this.commands[cmd];
			if (action) {
				action();
			}
		}
	}

	moveForward() {
		const { x: dx, y: dy } = MOVEMENT_MAP[DIRECTIONS[this.dirIndex]];
		const nextX = this.x + dx;
		const nextY = this.y + dy;

		if (nextX < 0 || nextX > this.bounds.maxX || nextY < 0 || nextY > this.bounds.maxY) {
			const scentKey = `${this.x},${this.y}`;
			if (!this.scents.has(scentKey)) {
				this.scents.add(scentKey);
				this.isLost = true;
			}
		} else {
			this.x = nextX;
			this.y = nextY;
		}
	}

	toString() {
		const direction = DIRECTIONS[this.dirIndex];
		return `${this.x} ${this.y} ${direction}${this.isLost ? ' LOST' : ''}`;
	}
}

function parseNonNegativeInteger(value, context) {
	if (!/^[0-9]+$/.test(value)) {
		throw new InputValidationError(`${context} must be a non-negative integer.`);
	}
	return Number(value);
}

export function processMartianRobots(input) {
	if (typeof input !== 'string') {
		throw new InputValidationError('Input must be a string.');
	}

	const lines = input
		.trim()
		.split(/\r?\n/)
		.map(line => line.trim())
		.filter(Boolean);

	if (lines.length === 0) {
		throw new InputValidationError('Input must contain grid size and robot definitions.');
	}

	const gridTokens = lines[0].split(/\s+/);
	if (gridTokens.length !== 2) {
		throw new InputValidationError('Grid size line must contain exactly two space-separated integers.');
	}

	const bounds = {
		maxX: parseNonNegativeInteger(gridTokens[0], 'Grid max X'),
		maxY: parseNonNegativeInteger(gridTokens[1], 'Grid max Y'),
	};

	// Constraint Check: Max coordinate is 50
	if (bounds.maxX > 50 || bounds.maxY > 50) {
		throw new InputValidationError('The maximum value for any coordinate is 50.');
	}

	if ((lines.length - 1) % 2 !== 0) {
		throw new InputValidationError('Robot definitions must consist of a start line followed by an instruction line for each robot.');
	}

	const scents = new Set();
	const outputs = [];

	for (let i = 1; i < lines.length; i += 2) {
		const positionTokens = lines[i].split(/\s+/);
		if (positionTokens.length !== 3) {
			throw new InputValidationError(`Robot starting position on line ${i + 1} must contain exactly three values: x y orientation.`);
		}

		const x = parseNonNegativeInteger(positionTokens[0], `Robot x coordinate on line ${i + 1}`);
		const y = parseNonNegativeInteger(positionTokens[1], `Robot y coordinate on line ${i + 1}`);

		// Constraint Check: Max coordinate is 50
		if (x > 50 || y > 50) {
			throw new InputValidationError(`Robot coordinates on line ${i + 1} cannot exceed the maximum value of 50.`);
		}

		if (x > bounds.maxX || y > bounds.maxY) {
			throw new InputValidationError(`Robot coordinates on line ${i + 1} are outside the grid bounds.`);
		}

		const orientation = positionTokens[2].toUpperCase();
		if (!DIRECTIONS.includes(orientation)) {
			throw new InputValidationError(`Robot orientation on line ${i + 1} must be one of ${DIRECTIONS.join(', ')}.`);
		}

		const instructions = lines[i + 1];

		// Constraint Check: Instruction length less than 100
		if (instructions.length >= 100) {
			throw new InputValidationError(`Instruction line ${i + 2} must be less than 100 characters in length.`);
		}

		if (!/^[LRF]*$/.test(instructions)) {
			throw new InputValidationError(`Instruction line ${i + 2} may only contain the commands L, R, and F without spaces.`);
		}

		const robot = new Robot(x, y, orientation, bounds, scents);
		robot.execute(instructions);
		outputs.push(robot.toString());
	}

	return outputs.join('\n');
}