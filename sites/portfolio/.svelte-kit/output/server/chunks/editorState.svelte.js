import "./server.js";
//#region src/lib/editorState.svelte.ts
var EditorState = class {
	isLogMode = false;
	inPoint = null;
	outPoint = null;
	isPlaying = false;
	fps = 24;
	toggleLogMode = () => {
		this.isLogMode = !this.isLogMode;
	};
	clearSelection = () => {
		this.inPoint = null;
		this.outPoint = null;
	};
};
var editorState = new EditorState();
//#endregion
export { editorState as t };
