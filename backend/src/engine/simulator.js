const DIRECTIONS = ['N', 'E', 'S', 'W'];
const MOVEMENT_MAP = {
	N: { x: 0, y: 1 },
	E: { x: 1, y: 0 },
	S: { x: 0, y: -1 },
	W: { x: -1, y: 0 },
};

class Robot {
	constructor(x, y, orientation, bounds, scents) {
		this.x = x;
		this.y = y;
		this.dirIndex = DIRECTIONS.indexOf(orientation);
		if (this.dirIndex === -1) {
			this.dirIndex = 0;
		}
		this.bounds = bounds;
		this.scents = scents;
		this.isLost = false;
	}

	execute(instructions) {
		for (const cmd of instructions) {
			if (this.isLost) break;
			if (cmd === 'L') this.dirIndex = (this.dirIndex + 3) % 4;
			if (cmd === 'R') this.dirIndex = (this.dirIndex + 1) % 4;
			if (cmd === 'F') this.moveForward();
		}
	}

	moveForward() {
		const { x: dx, y: dy } = MOVEMENT_MAP[DIRECTIONS[this.dirIndex]];
		const nextX = this.x + dx;
		const nextY = this.y + dy;

		if (this.isOffGrid(nextX, nextY)) {
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

	isOffGrid(x, y) {
		return x < 0 || x > this.bounds.maxX || y < 0 || y > this.bounds.maxY;
	}

	toString() {
		const dir = DIRECTIONS[this.dirIndex];
		return `${this.x} ${this.y} ${dir}${this.isLost ? ' LOST' : ''}`;
	}
}

export function processMartianRobots(input) {
	const lines = input.trim().split('\n').map(l => l.trim()).filter(Boolean);
	if (lines.length === 0) return '';

	const [maxX, maxY] = lines[0].split(' ').map(Number);
	const bounds = { maxX, maxY };
	const scents = new Set();
	const results = [];

	// Process robots in pairs (start position + instructions)
	for (let i = 1; i < lines.length; i += 2) {
		const [x, y, dir] = lines[i].split(' ');
		const instructions = lines[i + 1] || '';

		const robot = new Robot(parseInt(x), parseInt(y), dir, bounds, scents);
		robot.execute(instructions);
		results.push(robot.toString());
	}

	return results.join('\n');
}