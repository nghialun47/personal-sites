# Ethan Van - Professional Video Editor Portfolio

A high-performance, interactive portfolio site for **Ethan Van**, a professional video editor specializing in pacing, rhythm, sound design, and audience retention.

## Tech Stack & Architecture

- **Framework**: [SvelteKit](https://svelte.dev/) (v2) & [Svelte 5](https://svelte.dev/docs/svelte/runes) (leveraging Svelte 5 runes for state management)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/) (Strict checking enabled)
- **Styling**: Vanilla CSS (highly customizable custom properties, responsive grids, and fluid layout scales)
- **Static Export**: [@sveltejs/adapter-static](https://svelte.dev/docs/kit/adapter-static) for pre-rendered, serverless deployment (e.g. GitHub Pages)
- **Testing**: [Vitest](https://vitest.dev/) with [JSDOM](https://github.com/jsdom/jsdom) and `@testing-library/svelte`

## Key Features

1. **Interactive Timeline / Scrubber**:
   - Represents the page's scroll position as a video editing timeline (V1 and V2 tracks).
   - Allows users to scrub (click and drag) the timeline to navigate the page.
   - Premiere Pro keyboard shortcuts:
     - `Space`: Toggle play (auto-scroll) / pause.
     - `i` / `o`: Set custom In and Out loop points.
     - `x`: Clear selection.
     - `Arrow Left` / `Arrow Right`: Snap-jump to adjacent cuts.
2. **Showcase Modules**:
   - YouTube embeds with custom video facades (lazy loading placeholder images for optimal load times).
   - Responsive short-form content grid for Instagram Reels.
   - Dynamic view count fetching from the YouTube Data API.
3. **Responsive Design & Typography**:
   - Sleek dark theme with gold accents.
   - Dynamic custom fonts loaded with custom fallback timeout to avoid layout shift.
   - Strict mobile responsiveness from modern desktop down to small viewport widths.

---

## Local Configuration

To configure the live view counter for portfolio videos, obtain a YouTube Data API Key and create a `.env` file:

```bash
# From within sites/portfolio/
cp .env.example .env
```

Define the API key inside `.env`:

```env
VITE_YOUTUBE_API_KEY=your_google_youtube_api_key_here
```

---

## Execution Commands

You can run commands either from the workspace **root directory** or from within the **portfolio site directory**.

### 1. From the Workspace Root

Run these scripts using `pnpm`:

| Command                  | Action                                                      |
| :----------------------- | :---------------------------------------------------------- |
| `pnpm dev:portfolio`     | Start local development server                              |
| `pnpm build:portfolio`   | Generate optimized static build in `sites/portfolio/build/` |
| `pnpm preview:portfolio` | Preview the production build locally                        |
| `pnpm test:portfolio`    | Execute unit test suite via Vitest                          |

### 2. From `sites/portfolio/`

Alternatively, you can run commands directly inside the portfolio site folder:

| Command        | Action                                              |
| :------------- | :-------------------------------------------------- |
| `pnpm dev`     | Start local development server                      |
| `pnpm build`   | Compile code and run SvelteKit static adapter build |
| `pnpm preview` | Preview production static site locally              |
| `pnpm test`    | Run Vitest unit tests                               |
| `pnpm check`   | Run TypeScript compilation and Svelte diagnostics   |
