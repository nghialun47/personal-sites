import "./internal.js";
import { s as base } from "./internal2.js";
import { b as attr, s as stringify, t as attr_class, x as escape_html } from "./server.js";
import { t as editorState } from "./editorState.svelte.js";
import "./paths.js";
//#region src/lib/components/Nav.svelte
function Nav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { logoFirst = "Ethan", logoLast = "Van" } = $$props;
		$$renderer.push(`<nav${attr_class("nav-bar svelte-1h32yp1", void 0, { "scrolled": false })}><div class="nav-container svelte-1h32yp1"><a${attr("href", `${stringify(base)}/`)} class="logo svelte-1h32yp1"><span class="logo-dot svelte-1h32yp1"></span> <span class="logo-text">${escape_html(logoFirst)}<span class="last-name svelte-1h32yp1">${escape_html(logoLast)}</span></span></a> <div class="nav-telemetry svelte-1h32yp1"><span class="telemetry-badge svelte-1h32yp1">${escape_html("FINAL CUT")}</span> <span class="telemetry-sep svelte-1h32yp1">|</span> <button type="button"${attr_class("log-badge svelte-1h32yp1", void 0, { "active-log": editorState.isLogMode })} title="Toggle color grading LUT (REC.709 vs raw flat LOG)">LUT: ${escape_html(editorState.isLogMode ? "LOG" : "REC.709")}</button></div></div></nav>`);
	});
}
//#endregion
//#region src/lib/components/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		$$renderer.push(`<footer class="footer-dock svelte-jz8lnl"><div class="wrap footer-container svelte-jz8lnl"><div class="footer-copy svelte-jz8lnl">© ${escape_html(year)} ETHAN VAN <span class="footer-sep svelte-jz8lnl">•</span> <a${attr("href", `${stringify(base)}/privacy`)} class="privacy-link svelte-jz8lnl">PRIVACY POLICY</a></div></div></footer>`);
	});
}
//#endregion
export { Nav as n, Footer as t };
