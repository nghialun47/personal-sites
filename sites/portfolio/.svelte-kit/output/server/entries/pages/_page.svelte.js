import "../../chunks/internal.js";
import { s as base } from "../../chunks/internal2.js";
import { a as head, b as attr, i as ensure_array_like, n as attr_style, s as stringify, t as attr_class, x as escape_html } from "../../chunks/server.js";
import { t as editorState } from "../../chunks/editorState.svelte.js";
import "../../chunks/paths.js";
import { n as Nav, t as Footer } from "../../chunks/Footer.js";
//#region src/lib/components/Hero.svelte
function Hero($$renderer) {
	$$renderer.push(`<header class="hero svelte-1q37ri0" id="hero"><div class="wrap hero-inner svelte-1q37ri0"><h1 class="svelte-1q37ri0">Editing that turns raw footage into stories that <span class="highlight svelte-1q37ri0">resonate</span></h1> <div class="hero-ctas svelte-1q37ri0"><a href="https://www.linkedin.com/in/ethan-van/" target="_blank" rel="noopener" class="btn svelte-1q37ri0">Work with me <svg class="btn-arrow svelte-1q37ri0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></div></div></header>`);
}
//#endregion
//#region src/lib/components/VelocityTicker.svelte
function VelocityTicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="ticker-wrapper svelte-wp8slv" id="ticker" aria-hidden="true"><div class="caution-tape svelte-wp8slv"><div class="ticker-track svelte-wp8slv"${attr_style(`transform: translate3d(${stringify(0)}px, 0, 0)`)}><div class="ticker-text svelte-wp8slv">RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • </div> <div class="ticker-text svelte-wp8slv">RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • </div> <div class="ticker-text svelte-wp8slv">RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • RETENTION • PACING • STORYTELLING • AUDIENCE FIRST • SOUND DESIGN • KEYFRAME PRECISION • </div></div></div></div>`);
	});
}
//#endregion
//#region src/lib/config/videos.ts
var videoConfig = {
	longform: [
		{
			id: "9GbA2tv93mg",
			title: "The Legal Drug Destroying Your Life!",
			embedUrl: "https://www.youtube.com/embed/9GbA2tv93mg",
			views: "450K+ Views",
			role: "Multicam Editing · B-Roll",
			desc: "Cut between A/B cams to keep the delivery dynamic, and layered in b-roll to give each point visual weight — refining the edit pass by pass during footage review."
		},
		{
			id: "h_e7gdMyLPw",
			title: "Rewire Your Brain For Success In 276 Seconds",
			embedUrl: "https://www.youtube.com/embed/h_e7gdMyLPw",
			views: "200K+ Views",
			role: "A/B Cam Cuts · B-Roll Selection",
			desc: "Switched angles to match the energy of the delivery and placed supporting footage where the script needed reinforcement, keeping the pace tight throughout."
		},
		{
			id: "B8BJyaoyAFE",
			title: "Discipline's Lie That's Making You Miserable",
			embedUrl: "https://www.youtube.com/embed/B8BJyaoyAFE",
			views: "260K+ Views",
			role: "Multicam · B-Roll · Footage Review",
			desc: "Handled the A/B cam switching and wove b-roll into the narrative where it needed visual support, tightening moments I caught while reviewing the footage."
		}
	],
	shortform: [
		{
			src: "https://www.instagram.com/p/DYsXv7zP0kP/embed",
			title: "Short-Form Edit",
			views: "800K+ Views"
		},
		{
			src: "https://www.instagram.com/reel/DYKTZHlh3t5/embed",
			title: "Short-Form Edit",
			views: "360K+ Views"
		},
		{
			src: "https://www.instagram.com/reel/DYHy4tchT7X/embed",
			title: "Short-Form Edit",
			views: "375K+ Views"
		}
	]
};
//#endregion
//#region src/lib/components/Work.svelte
function Work($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let dynamicViews = {};
		let activeVideos = {};
		function extractVideoId(urlStr) {
			try {
				const url = new URL(urlStr);
				if (url.hostname.includes("youtube") || url.hostname.includes("youtu.be")) {
					if (url.pathname.startsWith("/embed/")) return url.pathname.substring(7);
					if (url.searchParams.has("v")) return url.searchParams.get("v") || "UNKNOWN";
					return url.pathname.substring(1);
				}
				if (url.hostname.includes("instagram")) {
					const parts = url.pathname.split("/").filter(Boolean);
					const idx = parts.findIndex((p) => p === "p" || p === "reel");
					if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
					const embedIdx = parts.indexOf("embed");
					if (embedIdx > 0) return parts[embedIdx - 1];
					return parts[parts.length - 1] || "UNKNOWN";
				}
				return url.pathname.split("/").filter(Boolean).pop() || "UNKNOWN";
			} catch {
				return "UNKNOWN";
			}
		}
		$$renderer.push(`<section id="work" class="work-showcase-section svelte-17ndl8v"><div class="wrap reveal"><div class="section-header"><h2>Showcase</h2></div></div> <div class="wrap longform-wrap svelte-17ndl8v" id="work-longform"><div class="section-tag-row svelte-17ndl8v"><span class="label-telemetry">LONG-FORM CUTS</span></div> <div class="embed-list svelte-17ndl8v"><!--[-->`);
		const each_array = ensure_array_like(videoConfig.longform);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<div class="work-card reveal svelte-17ndl8v"><div class="embed-workspace-frame svelte-17ndl8v"><div class="ratio-box svelte-17ndl8v">`);
			if (activeVideos[item.id]) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<iframe${attr("src", `${stringify(item.embedUrl)}?autoplay=1`)}${attr("title", item.title)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" class="svelte-17ndl8v"></iframe>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button class="facade-btn svelte-17ndl8v"${attr("aria-label", `Play ${stringify(item.title)}`)}><picture class="svelte-17ndl8v"><source media="(max-width: 480px)"${attr("srcset", `https://img.youtube.com/vi/${stringify(item.id)}/mqdefault.jpg`)}/> <source media="(max-width: 900px)"${attr("srcset", `https://img.youtube.com/vi/${stringify(item.id)}/hqdefault.jpg`)}/> <source media="(min-width: 901px)"${attr("srcset", `https://img.youtube.com/vi/${stringify(item.id)}/maxresdefault.jpg`)}/> <img class="facade-img svelte-17ndl8v"${attr("src", `https://img.youtube.com/vi/${stringify(item.id)}/sddefault.jpg`)}${attr("alt", item.title)} loading="lazy"/></picture> <div class="play-overlay svelte-17ndl8v"><div class="play-circle svelte-17ndl8v"><svg class="play-icon svelte-17ndl8v" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg></div></div></button>`);
			}
			$$renderer.push(`<!--]--></div> <div class="frame-footer svelte-17ndl8v"><span class="frame-title svelte-17ndl8v">SOURCE_MONITOR: ${escape_html(extractVideoId(item.embedUrl))}.MP4</span> <span class="footer-views svelte-17ndl8v">${escape_html(dynamicViews[item.id] || item.views)}</span></div></div> <div class="card-copy svelte-17ndl8v"><span class="role-tag svelte-17ndl8v">${escape_html(item.role)}</span> <h3 class="svelte-17ndl8v">${escape_html(item.title)}</h3> <p class="svelte-17ndl8v">${escape_html(item.desc)}</p></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="wrap shorts-wrap" id="work-shortform"><div class="section-tag-row svelte-17ndl8v"><span class="label-telemetry">SHORT-FORM CUTS</span></div> <div class="shorts-grid reveal svelte-17ndl8v"><!--[-->`);
		const each_array_1 = ensure_array_like(videoConfig.shortform);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let item = each_array_1[$$index_1];
			$$renderer.push(`<div class="short-card svelte-17ndl8v"><div class="embed-workspace-frame vertical-frame svelte-17ndl8v"><div class="vertical-embed-container svelte-17ndl8v"><iframe${attr("src", item.src)}${attr("title", item.title)} loading="lazy" allowfullscreen="" scrolling="no" class="svelte-17ndl8v"></iframe></div> <div class="frame-footer svelte-17ndl8v"><span class="frame-title svelte-17ndl8v">REEL: ${escape_html(extractVideoId(item.src))}.MP4</span> <span class="footer-views svelte-17ndl8v">${escape_html(item.views)}</span></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/Clients.svelte
function Clients($$renderer) {
	$$renderer.push(`<section class="clients-section svelte-1gy0eo" id="clients-section"><div class="wrap reveal" id="clients-wrap"><div class="sub-section-header"><span class="label-telemetry">CLIENTS</span> <h3>Worked with creators like</h3></div> <div class="clients-grid svelte-1gy0eo"><div class="client-item svelte-1gy0eo"><div class="avatar-initials svelte-1gy0eo">ND</div> <div class="client-info svelte-1gy0eo"><div class="name svelte-1gy0eo">Noel Deyzel</div> <div class="meta svelte-1gy0eo">7 Million Subscribers</div></div></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/Testimony.svelte
function Testimony($$renderer) {
	$$renderer.push(`<section class="testimony-header-section svelte-rzsi1i"><div class="wrap reveal"><div class="section-tag-row"><span class="label-telemetry">TESTIMONIALS</span></div></div></section> <section class="testi-banner svelte-rzsi1i" id="testimony-section"><div class="wrap testi-banner-inner reveal svelte-rzsi1i" id="testimony-wrap"><div class="testi-avatar-badge svelte-rzsi1i">ND</div> <div class="testi-quote-wrap svelte-rzsi1i"><p class="testi-quote svelte-rzsi1i">"Fuck yeah, you killed it — this is perfect."</p> <span class="testi-author svelte-rzsi1i">— Noel Deyzel</span></div></div></section>`);
}
//#endregion
//#region src/lib/components/About.svelte
function About($$renderer) {
	$$renderer.push(`<section id="about" class="about-section svelte-7hpc9t"><div class="wrap reveal"><div class="section-header"><h2>Ethan Van</h2></div></div> <div class="wrap about-container svelte-7hpc9t" id="about-container"><div class="about-portrait reveal svelte-7hpc9t"><div class="portrait-frame svelte-7hpc9t"><span class="crosshair-tl svelte-7hpc9t">+</span> <span class="crosshair-tr svelte-7hpc9t">+</span> <span class="crosshair-bl svelte-7hpc9t">+</span> <span class="crosshair-br svelte-7hpc9t">+</span> <img${attr("src", `${stringify(base)}/ethan-photo.jpg`)} alt="Ethan Van Portrait" class="svelte-7hpc9t"/></div></div> <div class="about-copy reveal"><p class="about-bio svelte-7hpc9t">I am a professional editor dedicated to pacing, rhythm, sound design, and retention. I
				translate raw footage into narrative threads that keep audiences hooked from frame 00:00 to
				the final cut.</p> <div class="about-grid svelte-7hpc9t"><div class="stat-card svelte-7hpc9t"><div class="stat-num svelte-7hpc9t">4+</div> <div class="stat-label svelte-7hpc9t">Years Experience</div></div> <div class="stat-card svelte-7hpc9t"><div class="stat-num svelte-7hpc9t">4M+</div> <div class="stat-label svelte-7hpc9t">Short-Form Views</div></div> <div class="stat-card svelte-7hpc9t"><div class="stat-num svelte-7hpc9t">1M+</div> <div class="stat-label svelte-7hpc9t">Long-Form Views</div></div></div> <div class="contact-trigger svelte-7hpc9t"><a href="https://www.linkedin.com/in/ethan-van/" target="_blank" rel="noopener" class="btn svelte-7hpc9t">Work with me <svg class="btn-arrow svelte-7hpc9t" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></div></div></div></section>`);
}
globalThis.Date;
globalThis.Set;
globalThis.Map;
globalThis.URL;
globalThis.URLSearchParams;
//#endregion
//#region src/lib/components/Timeline.svelte
function Timeline($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let scrollPct = 0;
		let timecode = "00:00:00:00";
		let isDragging = false;
		let scrollHeight = 2e3;
		let v1Clips = [];
		let v2Clips = [];
		let y_work = 0;
		let y_about = 0;
		function percentToScrollY(pct) {
			const docH = Math.max(1, scrollHeight - window.innerHeight);
			const t2 = v1Clips[0]?.end || 25;
			const t6 = v1Clips[1]?.end || 75;
			const t7 = 100;
			if (pct <= t2) return pct / (t2 || 1) * y_work;
			else if (pct <= t6) return y_work + (pct - t2) / (t6 - t2 || 1) * (y_about - y_work);
			else return y_about + (pct - t6) / (t7 - t6 || 1) * (docH - y_about);
		}
		function formatPercentToTimecode(pct) {
			const totalSeconds = scrollHeight / 100;
			const fps = 24;
			const totalFrames = Math.floor(pct / 100 * totalSeconds * fps);
			const frames = totalFrames % fps;
			const seconds = Math.floor(totalFrames / fps) % 60;
			const minutes = Math.floor(totalFrames / (fps * 60)) % 60;
			const hours = Math.floor(totalFrames / (fps * 3600));
			const fStr = String(frames).padStart(2, "0");
			const sStr = String(seconds).padStart(2, "0");
			const mStr = String(minutes).padStart(2, "0");
			return `${String(hours).padStart(2, "0")}:${mStr}:${sStr}:${fStr}`;
		}
		let elapsedSeconds = 0;
		let lastFrameTime = 0;
		function playbackLoop(timestamp) {
			if (!editorState.isPlaying) {
				lastFrameTime = 0;
				return;
			}
			if (!lastFrameTime) lastFrameTime = timestamp;
			const deltaSec = (timestamp - lastFrameTime) / 1e3;
			lastFrameTime = timestamp;
			const totalSeconds = Math.max(.1, scrollHeight / 100);
			elapsedSeconds += deltaSec;
			if (elapsedSeconds >= totalSeconds) elapsedSeconds = 0;
			scrollPct = elapsedSeconds / totalSeconds * 100;
			timecode = formatPercentToTimecode(scrollPct);
			const targetY = percentToScrollY(scrollPct);
			window.scrollTo(0, targetY);
			if (editorState.isPlaying) requestAnimationFrame(playbackLoop);
		}
		$$renderer.push(`<div${attr_class("timeline-dock svelte-112n2zp", void 0, { "dragging": isDragging })} role="slider" aria-label="Video Editor Scrubber Timeline" aria-valuemin="0" aria-valuemax="100"${attr("aria-valuenow", scrollPct)}><div class="timeline-meta svelte-112n2zp"><div class="telemetry svelte-112n2zp"><span${attr_class("status-dot svelte-112n2zp", void 0, { "playing": editorState.isPlaying })}></span> <span class="status-txt svelte-112n2zp">${escape_html(editorState.isPlaying ? "PLAYBACK" : "SCRUBBING")}</span> `);
		if (editorState.inPoint !== null || editorState.outPoint !== null) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="telemetry-sep svelte-112n2zp">|</span> <span class="range-telemetry svelte-112n2zp" title="Marked In/Out range duration">IN ${escape_html(formatPercentToTimecode(editorState.inPoint ?? 0))} → OUT ${escape_html(formatPercentToTimecode(editorState.outPoint ?? 100))} (DUR ${escape_html(formatPercentToTimecode(Math.max(0, (editorState.outPoint ?? 100) - (editorState.inPoint ?? 0))))})</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="timecode-display svelte-112n2zp" title="Current playhead timecode">${escape_html(timecode)} <span class="fps-indicator svelte-112n2zp">[60fps]</span></div></div> <div class="timeline-workspace svelte-112n2zp"><div class="timeline-labels-column svelte-112n2zp"><div class="track-label-row label-ruler svelte-112n2zp" title="Personal capture: 60fps"></div> <div class="track-label-row label-v2 svelte-112n2zp">V2</div> <div class="track-label-row label-v1 svelte-112n2zp">V1</div></div> <div class="timeline-active-area svelte-112n2zp" role="presentation"><div class="timeline-ruler svelte-112n2zp"><!--[-->`);
		const each_array = ensure_array_like(Array(11));
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			each_array[i];
			$$renderer.push(`<div class="ruler-tick svelte-112n2zp"${attr_style(`left: ${stringify(i * 10)}%`)}><span class="svelte-112n2zp">${escape_html(Math.floor(i * 10 / 100 * (scrollHeight / 100)))}s</span></div>`);
		}
		$$renderer.push(`<!--]--></div> `);
		if (editorState.inPoint !== null || editorState.outPoint !== null) {
			$$renderer.push("<!--[0-->");
			const start = editorState.inPoint ?? 0;
			const end = editorState.outPoint ?? 100;
			$$renderer.push(`<div class="in-out-range svelte-112n2zp"${attr_style(`left: ${stringify(start)}%; width: ${stringify(Math.max(0, end - start))}%`)}>`);
			if (editorState.inPoint !== null) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="in-bracket svelte-112n2zp">{</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (editorState.outPoint !== null) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="out-bracket svelte-112n2zp">}</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="timeline-track video-track-v2 svelte-112n2zp"><div class="track-lane svelte-112n2zp"><!--[-->`);
		const each_array_1 = ensure_array_like(v2Clips);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let clip = each_array_1[$$index_1];
			$$renderer.push(`<button type="button"${attr_class("timeline-clip clip-v2 svelte-112n2zp", void 0, { "active": scrollPct >= clip.start && scrollPct < clip.end })}${attr_style(`left: ${stringify(clip.start)}%; width: ${stringify(clip.end - clip.start)}%`)}><span class="clip-name svelte-112n2zp">${escape_html(clip.name)}</span></button>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="timeline-track video-track-v1 svelte-112n2zp"><div class="track-lane svelte-112n2zp"><!--[-->`);
		const each_array_2 = ensure_array_like(v1Clips);
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let sec = each_array_2[$$index_2];
			$$renderer.push(`<button type="button"${attr_class("timeline-clip clip-v1 svelte-112n2zp", void 0, { "active": scrollPct >= sec.start && scrollPct < sec.end })}${attr_style(`left: ${stringify(sec.start)}%; width: ${stringify(sec.end - sec.start)}%`)}><span class="clip-name svelte-112n2zp">${escape_html(sec.name)}</span></button>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="playhead svelte-112n2zp"${attr_style(`left: ${stringify(scrollPct)}%`)}><div class="playhead-handle svelte-112n2zp"></div> <div class="playhead-line svelte-112n2zp"></div></div></div></div></div>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Video Editor Portfolio - Ethan Van</title>`);
			});
			$$renderer.push(`<meta name="description" content="Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling."/> <meta property="og:type" content="website"/> <meta property="og:title" content="Video Editor Portfolio - Ethan Van"/> <meta property="og:description" content="Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling."/> <meta property="og:image"${attr("content", `${stringify(base)}/ethan-photo.jpg`)}/> <meta property="twitter:card" content="summary_large_image"/> <meta property="twitter:title" content="Video Editor Portfolio - Ethan Van"/> <meta property="twitter:description" content="Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling."/> <meta property="twitter:image"${attr("content", `${stringify(base)}/ethan-photo.jpg`)}/> `);
			$$renderer.push(`<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Ethan Van",
			"jobTitle": "Professional Video Editor",
			"description": "Portfolio of Ethan Van, a professional video editor focusing on retention, pacing, sound design, and storytelling.",
			"image": "{base}/ethan-photo.jpg",
			"url": "https://www.linkedin.com/in/ethan-van/",
			"sameAs": ["https://www.linkedin.com/in/ethan-van/"],
			"knowsAbout": [
				"Video Editing",
				"Pacing",
				"Sound Design",
				"Audience Retention",
				"Storytelling",
				"Short-form Video Creation",
				"Multicam Editing"
			]
		}
	<\/script>`);
		});
		Nav($$renderer, {
			logoFirst: "Ethan",
			logoLast: "Van"
		});
		$$renderer.push(`<!----> <div class="viewport-wrap">`);
		Hero($$renderer, {});
		$$renderer.push(`<!----> `);
		VelocityTicker($$renderer, {});
		$$renderer.push(`<!----> `);
		Work($$renderer, {});
		$$renderer.push(`<!----> `);
		Clients($$renderer, {});
		$$renderer.push(`<!----> `);
		Testimony($$renderer, {});
		$$renderer.push(`<!----> `);
		About($$renderer, {});
		$$renderer.push(`<!----> `);
		Footer($$renderer, {});
		$$renderer.push(`<!----></div> `);
		Timeline($$renderer, {});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
