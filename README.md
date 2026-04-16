<p align="end">
   <strong>🌐 Change language:</strong><br>
   <a href="README.es.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/ES.png" alt="Español" width="50">
  </a>&nbsp;&nbsp;&nbsp;
  <a href="/README.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/EN.png" alt="English" width="50">
  </a>
</p>

# 🪐 Portfolio 2025

<!-- TODO: add demo gif of the canvas background + project cards -->

## 📜 About

This is my personal portfolio for 2025 — a single-page site split into three sections: **about me**, **full-stack web work**, and **low-level / algorithm** projects from 42.

I wanted something between a landing page and an interactive canvas: the background tracks the mouse, cards open a side panel with screenshots and the tech stack, and the whole thing stays readable without blowing up the bundle. No CMS, no backend, just React and a JSON file with the list of projects.

## 🧱 Stack

- **React 19** + **Vite 7** (rolldown)
- **Tailwind CSS v4**
- `@fontsource/inter`
- ESLint + Prettier

That's it — no router, no state library. Anchor links handle the navigation, local component state handles the side panel.

## ✨ What's in it

- **Canvas background** (`Canvas.jsx`) that reacts to mouse position.
- **Project grid** fed from `projects.json` — each project has name, description, tech, images and GitHub / live links.
- **Project detail** side panel (`Info.jsx`) that opens on click.
- **About** section with a short bio.
- Two project categories on the same page:
  - *Full-stack web development*
  - *Low-level & algorithms*
- Social links hardcoded in `App.jsx` (GitHub, LinkedIn).

## 🔧 Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output → dist/
npm run preview    # serve dist/
```

Adding a project is just editing `public/projects.json` and dropping screenshots in `public/`.

## 📂 Layout

```
portfolio2025/
├── public/
│   └── projects.json     # source of truth for the project list
├── src/
│   ├── components/
│   │   ├── Canvas.jsx    # animated background
│   │   ├── ProjectCard.jsx
│   │   └── Info.jsx      # detail side panel
│   └── App.jsx
├── index.html
├── vite.config.js
└── tailwind config
```

## 🚀 Deploy

Live on Netlify: [nachopuertoportfolio.netlify.app](https://nachopuertoportfolio.netlify.app/) — auto-deploys from `main` via the included `netlify.toml`.
