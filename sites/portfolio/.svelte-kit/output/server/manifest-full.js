export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "personal-sites/portfolio/_app",
	assets: new Set(["ethan-photo.jpg","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.mYPsBzU6.js",app:"_app/immutable/entry/app.ATr9zjU_.js",imports:["_app/immutable/entry/start.mYPsBzU6.js","_app/immutable/chunks/C49r7UAc.js","_app/immutable/chunks/CuTYY9Hp.js","_app/immutable/entry/app.ATr9zjU_.js","_app/immutable/chunks/CuTYY9Hp.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
