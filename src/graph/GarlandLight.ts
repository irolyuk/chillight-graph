import { MyPluginSettings } from "../settings";

export class GarlandLight {
	private static rainbow = [
		0xff4040,
		0xffa040,
		0xffff40,
		0x40ff40,
		0x40ffff,
		0x4080ff,
		0xff40ff,
	];

	private static christmas = [
		0xff3030,
		0x30ff50,
		0xfff060,
	];

	constructor(
		private PIXI: any,
		private circle: any,
		private settings: MyPluginSettings,
		x: number,
		y: number,
		changeColor: boolean,
		index: number,
		tick: number
	) {
		let g: any = this.circle.getChildByName("garland-light");

		if (!g) {
			g = new this.PIXI.Graphics();
			g.name = "garland-light";
			g.zIndex = 999;
			g.__colorIndex = Math.floor(Math.random() * 7);
			g.__phase = Math.random() * Math.PI * 2;

			this.circle.sortableChildren = true;
			this.circle.addChild(g);
		}

		if (changeColor) {
			g.__colorIndex++;
		}

		g.x = x;
		g.y = y;

		this.repaint(g, index, tick);
	}

	private repaint(g: any, index: number, tick: number): void {
		const color = this.getColor(g, index, tick);
		const size = this.settings.bulbSize;
		const glow = this.settings.bulbGlowSize;

		const pulse =
			this.settings.mode === "pulse"
				? 0.75 + Math.sin(tick * 0.08 + g.__phase) * 0.25
				: 1;

		g.clear();

		g.beginFill(color, 0.18 * pulse);
		g.drawCircle(0, 0, glow);
		g.endFill();

		g.beginFill(color, 0.35 * pulse);
		g.drawCircle(0, 0, glow * 0.65);
		g.endFill();

		// simple cap
		g.beginFill(0x444444, 1);
		g.drawRect(
			-size * 0.22,
			-size * 0.72,
			size * 0.44,
			size * 0.28
		);
		g.endFill();

		g.beginFill(color, 0.95 * pulse);
		g.drawCircle(0, 0, size);
		g.endFill();

		g.beginFill(0xffffff, 0.7);
		g.drawCircle(-size * 0.25, -size * 0.25, size * 0.15);
		g.endFill();
	}

	private getColor(g: any, index: number, tick: number): number {
		if (this.settings.mode === "static") {
			return 0xfff060;
		}

		if (this.settings.mode === "christmas") {
			return GarlandLight.christmas[
				g.__colorIndex % GarlandLight.christmas.length
			];
		}

		if (this.settings.mode === "rainbow") {
			return GarlandLight.rainbow[
				g.__colorIndex % GarlandLight.rainbow.length
			];
		}

		if (this.settings.mode === "wave") {
			const waveIndex =
				Math.floor(index + tick / 8) % GarlandLight.rainbow.length;

			return GarlandLight.rainbow[waveIndex];
		}

		if (this.settings.mode === "pulse") {
			return GarlandLight.rainbow[index % GarlandLight.rainbow.length];
		}

		return GarlandLight.rainbow[
			g.__colorIndex % GarlandLight.rainbow.length
		];
	}
}