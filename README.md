# React Tasks

Two small React features:

1. **Users (Parent/Child + fetch)** — `src/components/UserParent.jsx` fetches
   from `https://jsonplaceholder.typicode.com/users` and passes the data to
   `src/components/UserChild.jsx` via props. Clicking a user's button shows
   their name in the `<p>` in the parent.

2. **Dynamic flexbox boxes** — `src/components/BoxContainer.jsx` renders a
   configurable number of red/black-bordered boxes (starts at 6, buttons 1–10
   change the count) using `.map()`, no hard-coded boxes.

## Run it

Requires [Node.js](https://nodejs.org/) (v18+ recommended).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```
