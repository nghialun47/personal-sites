class EditorState {
	isLogMode = $state(false);
	inPoint = $state<number | null>(null);
	outPoint = $state<number | null>(null);
	isPlaying = $state(false);
	fps = 24; // Static timeline frame rate

	toggleLogMode = () => {
		this.isLogMode = !this.isLogMode;
	};

	clearSelection = () => {
		this.inPoint = null;
		this.outPoint = null;
	};
}

export const editorState = new EditorState();
