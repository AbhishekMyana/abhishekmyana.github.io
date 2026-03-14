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

### User Page (`username.github.io`)

Keep `vite.config.js` as-is (`base: './'`) and run:

```bash
npm run deploy
```

### Project Page (`username.github.io/portfolio`)

In `vite.config.js`, set:

```js
base: '/portfolio/',
```

Then run:

```bash
npm run deploy
```

The `predeploy` script builds automatically before pushing to the `gh-pages` branch.

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
