# Saw Ltd

Custom furniture customization demo. Vue 3 + TypeScript + Vite + Tailwind v4 + Pinia + Vue Router + Three.js.

A small SaaS-style app where a logged-in user can customize a 3D wooden cube (wood finish, dimensions, backdrop) and rotate the camera around it.

## Stack

- **Vue 3** (`<script setup>`, Composition API)
- **TypeScript**
- **Vite** (bundler + dev server)
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **Pinia** (auth store, persisted to `localStorage`)
- **Vue Router** (route guards redirect logged-out users to `/login` and logged-in users away from it)
- **Three.js** (vanilla, with `OrbitControls`)
- **vite-svg-loader** (SVGs imported as Vue components from `src/assets/icons/`)

## Setup

### 1. Install Node.js

Download and install the latest LTS from [https://nodejs.org](https://nodejs.org).

Verify:

```bash
node -v
```

### 2. Install pnpm

Install pnpm from `https://pnpm.io/`.

Verify:

```bash
pnpm -v
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Run the dev server

```bash
pnpm dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Demo login

Hardcoded in [src/stores/auth.ts](src/stores/auth.ts):

- **Username:** `demo`
- **Password:** `demo123`

Login state is persisted in `localStorage` under the key `auth.user`.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the Vite dev server with HMR |
| `pnpm build` | Type-check (`vue-tsc`) and produce a production build |
| `pnpm preview` | Serve the production build locally |

## Project structure

```
src/
  Views/           page-level components (Home, Login)
  components/      reusable components (CubeViewer)
  stores/          Pinia stores (auth)
  router/          Vue Router config + auth guard
  assets/icons/    SVGs auto-loaded as Vue components
  App.vue          shell + nav
  main.ts          app bootstrap (Pinia, Router)
  style.css        Tailwind import + @theme tokens
```
