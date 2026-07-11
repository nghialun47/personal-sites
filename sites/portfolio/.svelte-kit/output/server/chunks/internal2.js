//#region ../../node_modules/.pnpm/@sveltejs+kit@2.69.2_@sveltejs+vite-plugin-svelte@7.2.0_svelte@5.56.4_@typescript-eslin_3c012378edb3d5f93bb27430032ac8cd/node_modules/@sveltejs/kit/src/runtime/app/paths/internal/server.js
var base = "/personal-sites/portfolio";
var assets = base;
var app_dir = "_app";
var initial = {
	base,
	assets
};
initial.base;
/**
* @param {{ base: string, assets: string }} paths
*/
function override(paths) {
	base = paths.base;
	assets = paths.assets;
}
function reset() {
	base = initial.base;
	assets = initial.assets;
}
/** @param {string} path */
function set_assets(path) {
	assets = initial.assets = path;
}
//#endregion
//#region ../../node_modules/.pnpm/@sveltejs+kit@2.69.2_@sveltejs+vite-plugin-svelte@7.2.0_svelte@5.56.4_@typescript-eslin_3c012378edb3d5f93bb27430032ac8cd/node_modules/@sveltejs/kit/src/runtime/app/env/internal.js
var version = "1783788598188";
var prerendering = false;
function set_building() {}
function set_prerendering() {
	prerendering = true;
}
//#endregion
export { app_dir as a, override as c, version as i, reset as l, set_building as n, assets as o, set_prerendering as r, base as s, prerendering as t, set_assets as u };
