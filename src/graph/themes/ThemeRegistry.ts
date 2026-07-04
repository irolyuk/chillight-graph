import { GraphTheme } from "./GraphTheme";

function glow(g: any, color: number, glowSize: number, pulse: number): void {
	g.beginFill(color, 0.18 * pulse);
	g.drawCircle(0, 0, glowSize);
	g.endFill();

	g.beginFill(color, 0.28 * pulse);
	g.drawCircle(0, 0, glowSize * 0.6);
	g.endFill();
}

function starPoints(size: number): number[] {
	const points: number[] = [];

	for (let i = 0; i < 10; i++) {
		const radius = i % 2 === 0 ? size : size * 0.42;
		const angle = (Math.PI * i) / 5 - Math.PI / 2;

		points.push(Math.cos(angle) * radius);
		points.push(Math.sin(angle) * radius);
	}

	return points;
}

export const THEMES: Record<string, GraphTheme> = {
	christmas: {
		id: "christmas",
		palette: [0xff3030, 0x30ff50, 0xfff060],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(0x333333, 1);
			g.drawRect(-size * 0.28, -size * 0.8, size * 0.56, size * 0.32);
			g.endFill();

			g.beginFill(color, 1);
			g.drawCircle(0, 0, size);
			g.endFill();

			g.beginFill(0xffffff, 0.65);
			g.drawCircle(-size * 0.28, -size * 0.28, size * 0.16);
			g.endFill();
		},
	},

	gold: {
		id: "gold",
		palette: [0xffd36a, 0xffb52e, 0xffffaa, 0xffe27a],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, 0xffcc55, glowSize * 1.15, pulse);

			g.beginFill(color, 1);
			g.drawCircle(0, 0, size * 0.8);
			g.endFill();

			g.lineStyle(size * 0.1, 0xffffff, 0.85);
			g.moveTo(-size, 0);
			g.lineTo(size, 0);
			g.moveTo(0, -size);
			g.lineTo(0, size);

			g.lineStyle(size * 0.06, 0xffffff, 0.55);
			g.moveTo(-size * 0.7, -size * 0.7);
			g.lineTo(size * 0.7, size * 0.7);
			g.moveTo(size * 0.7, -size * 0.7);
			g.lineTo(-size * 0.7, size * 0.7);
		},
	},

	neon: {
		id: "neon",
		palette: [0xff00ff, 0x00ffff, 0x8a2bff, 0xff0080, 0x00ff88],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize * 1.25, pulse);

			g.beginFill(color, 0.35);
			g.drawCircle(0, 0, size * 0.78);
			g.endFill();

			g.lineStyle(size * 0.18, color, 1);
			g.drawCircle(0, 0, size * 0.78);

			g.beginFill(0xffffff, 0.7);
			g.drawCircle(-size * 0.25, -size * 0.25, size * 0.13);
			g.endFill();
		},
	},

	sakura: {
		id: "sakura",
		palette: [0xffb7d5, 0xff8fc7, 0xffd6e8, 0xff6faf],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize * 0.9, pulse);

			const petalWidth = size * 0.55;
			const petalHeight = size * 0.55;
			const distance = size * 0.38;

			for (let i = 0; i < 5; i++) {
				const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;

				g.beginFill(color, 0.95);
				g.drawEllipse(
					Math.cos(angle) * distance,
					Math.sin(angle) * distance,
					petalWidth,
					petalHeight
				);
				g.endFill();
			}

			g.beginFill(0xfff08a, 1);
			g.drawCircle(0, 0, size * 0.2);
			g.endFill();
		},
	},

	stars: {
		id: "stars",
		palette: [0xffff88, 0xffffff, 0xffcc44, 0x99ccff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(color, 1);
			g.drawPolygon(starPoints(size));
			g.endFill();

			g.beginFill(0xffffff, 0.5);
			g.drawCircle(-size * 0.18, -size * 0.18, size * 0.12);
			g.endFill();
		},
	},

	snow: {
		id: "snow",
		palette: [0xffffff, 0xdff6ff, 0xaeefff, 0xf5fdff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, 0xbbeeff, glowSize, pulse);

			g.lineStyle(size * 0.12, color, 1);

			for (let i = 0; i < 6; i++) {
				const a = (Math.PI * 2 * i) / 6;
				const x = Math.cos(a);
				const y = Math.sin(a);

				g.moveTo(0, 0);
				g.lineTo(x * size, y * size);

				const bx = x * size * 0.55;
				const by = y * size * 0.55;

				g.moveTo(bx, by);
				g.lineTo(
					bx + Math.cos(a + 0.65) * size * 0.25,
					by + Math.sin(a + 0.65) * size * 0.25
				);

				g.moveTo(bx, by);
				g.lineTo(
					bx + Math.cos(a - 0.65) * size * 0.25,
					by + Math.sin(a - 0.65) * size * 0.25
				);
			}

			g.beginFill(0xffffff, 1);
			g.drawCircle(0, 0, size * 0.18);
			g.endFill();
		},
	},

	vines: {
		id: "vines",
		palette: [0x55cc55, 0x77dd66, 0x2e8b57, 0xa8ff8a],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, 0x55cc55, glowSize * 0.8, pulse);

			g.lineStyle(size * 0.15, 0x2e8b57, 1);
			g.moveTo(-size * 0.9, size * 0.35);
			g.quadraticCurveTo(-size * 0.25, -size * 0.65, size * 0.9, size * 0.3);

			g.beginFill(color, 1);
			g.drawEllipse(-size * 0.35, -size * 0.15, size * 0.55, size * 0.55);
			g.drawEllipse(size * 0.1, -size * 0.35, size * 0.55, size * 0.55);
			g.drawEllipse(size * 0.45, size * 0.05, size * 0.48, size * 0.48);
			g.endFill();

			g.beginFill(0xa8ff8a, 0.8);
			g.drawCircle(0, 0, size * 0.18);
			g.endFill();
		},
	},

	mushrooms: {
		id: "mushrooms",
		palette: [0xff4444, 0xff8844, 0xffddaa, 0xffffff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(0xffeed0, 1);
			g.drawRect(-size * 0.25, -size * 0.05, size * 0.5, size * 0.65);
			g.endFill();

			g.beginFill(color, 1);
			g.drawEllipse(0, -size * 0.25, size * 0.82, size * 0.62);
			g.endFill();

			g.beginFill(0xffffff, 0.95);
			g.drawCircle(-size * 0.28, -size * 0.32, size * 0.22);
			g.drawCircle(size * 0.05, -size * 0.7, size * 0.07);
			g.drawCircle(size * 0.32, -size * 0.22, size * 0.12);
			g.endFill();
		},
	},

	planets: {
		id: "planets",
		palette: [0x66aaff, 0xffaa55, 0xdd88ff, 0x88ffcc, 0xffdd66],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.lineStyle(size * 0.13, 0xffffff, 0.8);
			g.drawEllipse(0, 0, size * 1.15, size * 0.38);

			g.beginFill(color, 1);
			g.drawCircle(0, 0, size * 0.68);
			g.endFill();

			g.beginFill(0xffffff, 0.45);
			g.drawCircle(-size * 0.22, -size * 0.2, size * 0.13);
			g.endFill();

			g.beginFill(0x000000, 0.18);
			g.drawCircle(size * 0.2, size * 0.18, size * 0.16);
			g.endFill();
		},
	},

	moon: {
		id: "moon",
		palette: [0xffffcc, 0xdde6ff, 0xffffff, 0xbcc7ff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(color, 1);
			g.drawCircle(0, 0, size);
			g.endFill();

			g.beginFill(0x111820, 1);
			g.drawCircle(size * 0.38, -size * 0.1, size * 0.9);
			g.endFill();
		},
	},

	water: {
		id: "water",
		palette: [0x55ccff, 0x33aaff, 0x99eeff, 0xffffff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(color, 0.95);
			g.drawCircle(0, size * 0.22, size * 0.68);
			g.drawPolygon([
				0, -size,
				size * 0.58, size * 0.12,
				-size * 0.58, size * 0.12,
			]);
			g.endFill();

			g.beginFill(0xffffff, 0.6);
			g.drawCircle(-size * 0.18, -size * 0.05, size * 0.13);
			g.endFill();
		},
	},

	butterflies: {
		id: "butterflies",
		palette: [0xff77cc, 0x77ccff, 0xffff77, 0xcc77ff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize, pulse);

			g.beginFill(color, 0.95);
			g.drawEllipse(-size * 0.4, -size * 0.15, size * 0.4, size * 0.58);
			g.drawEllipse(size * 0.4, -size * 0.15, size * 0.4, size * 0.58);
			g.drawEllipse(-size * 0.28, size * 0.42, size * 0.3, size * 0.38);
			g.drawEllipse(size * 0.28, size * 0.42, size * 0.3, size * 0.38);
			g.endFill();

			g.lineStyle(size * 0.08, 0x222222, 1);
			g.moveTo(0, -size * 0.58);
			g.lineTo(0, size * 0.6);
		},
	},

	energy: {
		id: "energy",
		palette: [0x66ffff, 0x44ff99, 0xffff44, 0xffffff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, color, glowSize * 1.2, pulse);

			g.lineStyle(size * 0.13, color, 1);
			g.drawCircle(0, 0, size * 0.6);

			g.lineStyle(size * 0.09, 0xffffff, 0.9);
			g.moveTo(-size * 0.8, 0);
			g.lineTo(-size * 0.25, -size * 0.25);
			g.lineTo(size * 0.15, size * 0.12);
			g.lineTo(size * 0.75, -size * 0.2);
		},
	},

	pinkClouds: {
		id: "pinkClouds",
		palette: [0xffb7e8, 0xff8fd8, 0xffd6f2, 0xffa6df, 0xffffff],
		draw({ g, color, size, glow: glowSize, pulse }) {
			glow(g, 0xff9fe3, glowSize, pulse);

			g.beginFill(color, 0.95);
			g.drawCircle(-size * 0.45, size * 0.08, size * 0.42);
			g.drawCircle(-size * 0.12, -size * 0.12, size * 0.55);
			g.drawCircle(size * 0.3, size * 0.02, size * 0.48);
			g.drawCircle(size * 0.62, size * 0.18, size * 0.35);
			g.drawEllipse(size * 0.05, size * 0.28, size * 0.9, size * 0.35);
			g.endFill();

			g.beginFill(0xffffff, 0.45);
			g.drawCircle(-size * 0.2, -size * 0.28, size * 0.15);
			g.endFill();
		},
	},
};

export function getTheme(id: string): GraphTheme {
	const normalizedId = id.trim();

	const aliases: Record<string, string> = {
		Snow: "snow",
		Vines: "vines",
		Mushrooms: "mushrooms",
		Planets: "planets",
		Moon: "moon",
		Water: "water",
		Butterflies: "butterflies",
		Energy: "energy",
		PinkClouds: "pinkClouds",
		PinkCloud: "pinkClouds",
		Christmas: "christmas",
		Gold: "gold",
		Neon: "neon",
		Sakura: "sakura",
		Stars: "stars",
	};

	const realId = aliases[normalizedId] ?? normalizedId;

	return THEMES[realId] ?? THEMES.christmas!;
}