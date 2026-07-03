export class GraphService {
	constructor(private app: any) {}

	getGraphView(): any | null {
		const leaves = this.app.workspace.getLeavesOfType("graph");
		if (leaves.length === 0) return null;
		return leaves[0].view;
	}
}