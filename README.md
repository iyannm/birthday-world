# Birthday World ❤️

A small personalized 3D birthday gift — a cute low-poly walkable world with a memory trail,
a wishing tree, a birthday letter, and a fireworks finale. Built with Vite, React, TypeScript,
Three.js, and `@react-three/fiber`. No backend, no database — it's a static site made to be
hosted on GitHub Pages.

## Running Locally

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173/birthday-world/` URL. On a touch device use the
bottom-left joystick to walk and the bottom-right heart button to interact; on desktop use
WASD/arrow keys to move and `E` to interact.

Add `?debugWorld=1` to the URL for an on-screen FPS/position/zone overlay.

## Adding Photos

1. Drop your final images into `public/photos/`, named `memory-01.jpg` through `memory-06.jpg`
   (jpg/png/webp all work — just update the extension in the next step if needed).
2. Edit `src/data/memories.ts` to update each entry's `image` path and `caption`.

If a photo is missing, the app automatically shows a pretty placeholder instead of crashing.

## Changing Birthday Message

Everything personalized — recipient name, intro text, the wishing tree prompt, the full
birthday letter, and the finale message — lives in one file: `src/config/birthday.ts`.

## Adding Music

Drop an MP3 at `public/audio/music.mp3`. If it's present, a sound toggle appears in the
top-right HUD and music plays after the first tap (browsers block autoplay before a user
gesture). If it's absent, the app works exactly the same without the toggle.

## Developer Photo Manager

Run the dev server and visit `http://localhost:5173/birthday-world/dev/photos` to preview
photos in the 3D world before committing them. Uploaded images are stored only in your
browser's IndexedDB for local testing — this route is unavailable in the production build
(it redirects back to the normal experience).

## Building

```bash
npm run build   # type-checks then builds to dist/
npm run preview # serve the production build locally
```

## GitHub Pages Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically on every push
to `main`. The Vite `base` path is derived from the repository name at build time
(`GITHUB_REPOSITORY`, set automatically by GitHub Actions), so no username/repo needs to be
hardcoded. The first deploy may require enabling GitHub Pages once under
**Settings → Pages → Source → GitHub Actions**.

## Visual layout and rendering

`worldConfig.ts` remains the source of zone anchors, terrain heights and route waypoints.
`trailLayout.ts` samples those routes once; the trail mesh, planting, lantern rhythm and
bridge crossings all use those samples. Ambient geometry is batched by route so it can be
culled. Add a bend to a route and its landscaping follows it automatically.

Props use small procedural meshes with vertex pigment gradients. Composite parts share a
single material/draw call; lantern glass is a separate unlit batch, without extra point
lights. The sun's 1024px shadow map covers the nearby camera area. Fog and planting colors
shift gradually as the path climbs. No models, textures or runtime dependencies were added.

Run the geometry regression checks with Node 22.18+:

```bash
node scripts/verify-world.mjs
```

This checks upward-facing trail triangles, clearance above the rendered terrain, connection
of all routes/zone anchors/memory stations, and deterministic tree/flower geometry.
The debug overlay also reports draw calls and rendered triangles (including shadow passes).

The visual pass was reviewed at 320px and 390px phone widths and 1280px desktop width.
Reviewed route/zone samples used roughly 35–120 draw calls; these are desktop-browser viewport
checks, not a physical-phone GPU benchmark. The compressed JS/CSS payload increased by
approximately 6 KB from the original build. Player movement, interaction targets, height
anchors and the GitHub Actions deployment workflow are unchanged.
