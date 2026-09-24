# React Hooks + Responsive CSS

A small library-browser app that demonstrates every concept from the task.

## Run
```bash
npm install
npm run dev
```
Open the URL shown (usually http://localhost:5173) and resize the browser window.

## Where each concept is used
| Concept | File | What it does |
|---|---|---|
| useState | `App.jsx` | query, sortBy, favs, width |
| useEffect | `App.jsx` | resize listener (with cleanup) + updates page title when favs change |
| useMemo | `App.jsx` | filtered + sorted list only recomputed when query/sortBy change |
| useCallback | `App.jsx` | stable `toggleFav` passed to memoized cards |
| useRef | `App.jsx`, `BookCard.jsx` | focus the search box; count card renders |
| Flexbox | `styles.css` | header, toolbar, card grid (`flex-wrap`), card internals |
| Media queries | `styles.css` | 900px / 700px / 600px breakpoints, dark mode |
| Responsive design | `styles.css`, `index.html` | viewport meta, `clamp()`, `flex: 1 1 …`, fluid columns |

Tip: type in the search box and watch "Rendered N×" on each card — cards don't re-render when you save a *different* book, thanks to `React.memo` + `useCallback`.
