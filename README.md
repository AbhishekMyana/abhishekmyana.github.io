# Abhishek Myana — Portfolio

Personal portfolio and blog built with **React + Vite**, deployable to GitHub Pages.

## Stack

- React 18 + React Router v6 (HashRouter)
- Vite
- Plain CSS with CSS custom properties
- `gh-pages` for deployment

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Deploy to GitHub Pages

Deployment is fully automated via **GitHub Actions**.

Push to `main` and the site rebuilds and deploys automatically:

```bash
git add .
git commit -m "your changes"
git push
```

The workflow file is at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Project Structure

```
src/
├── components/     # Navbar, Hero, About, Experience, Projects, Skills, Contact, Footer, Cursor
├── context/        # ThemeContext (light/dark mode)
├── data/           # resume.js, posts.jsx
├── hooks/          # useReveal.js (scroll animations)
└── pages/          # Home, BlogList, BlogPost
```

## Features

- Dark / Light mode toggle (persists via localStorage, respects `prefers-color-scheme`)
- Scroll-reveal animations
- Custom cursor (desktop)
- Responsive — mobile & desktop
- Blog with sample posts
