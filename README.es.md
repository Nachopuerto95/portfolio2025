<p align="end">
   <strong>🌐 Cambiar idioma:</strong><br>
   <a href="/README.es.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/ES.png" alt="Español" width="50">
  </a>&nbsp;&nbsp;&nbsp;
  <a href="/README.md">
    <img src="https://github.com/Nachopuerto95/multilang/blob/main/EN.png" alt="English" width="50">
  </a>
</p>

# 🪐 Portfolio 2025

<!-- TODO: añadir gif de demo del fondo canvas + las project cards -->

## 📜 Sobre el proyecto

Este es mi portfolio personal de 2025 — un sitio single-page dividido en tres secciones: **sobre mí**, **trabajo full-stack** y **proyectos low-level / algoritmos** de 42.

Quería algo a medio camino entre una landing y un canvas interactivo: el fondo sigue al ratón, las cards abren un panel lateral con capturas y stack, y todo se mantiene legible sin inflar el bundle. Sin CMS, sin backend, solo React y un JSON con la lista de proyectos.

## 🧱 Stack

- **React 19** + **Vite 7** (rolldown)
- **Tailwind CSS v4**
- `@fontsource/inter`
- ESLint + Prettier

Y ya. Sin router, sin librería de estado: los anchor links se encargan de la navegación y el estado local del componente maneja el panel lateral.

## ✨ Qué tiene

- **Fondo animado** (`Canvas.jsx`) que reacciona a la posición del ratón.
- **Grid de proyectos** alimentado desde `projects.json` — cada proyecto lleva nombre, descripción, stack, imágenes y enlaces a GitHub / live.
- **Panel lateral de detalle** (`Info.jsx`) que se abre al hacer click.
- Sección **About** con una bio corta.
- Dos categorías de proyectos en la misma página:
  - *Desarrollo full-stack*
  - *Low-level y algoritmos*
- Enlaces sociales cableados en `App.jsx` (GitHub, LinkedIn).

## 🔧 Ejecución local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # salida → dist/
npm run preview    # sirve dist/
```

Añadir un proyecto es editar `public/projects.json` y meter las capturas en `public/`.

## 📂 Estructura

```
portfolio2025/
├── public/
│   └── projects.json     # fuente de verdad de la lista de proyectos
├── src/
│   ├── components/
│   │   ├── Canvas.jsx    # fondo animado
│   │   ├── ProjectCard.jsx
│   │   └── Info.jsx      # panel lateral de detalle
│   └── App.jsx
├── index.html
├── vite.config.js
└── config de tailwind
```

## 🚀 Deploy

Aún sin desplegar — pensado para meter en cualquier host estático (Netlify, Vercel, GitHub Pages, Fly.io).
