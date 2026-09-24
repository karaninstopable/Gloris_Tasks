# Router + Context API Demo

## Run
```bash
npm install
npm run dev
```

## What it does
- Navbar with **Home**, **Show Form**, **About**.
- Click **Show Form** before submitting → shows "No data available yet."
- Submit the form on **Home** → auto-redirects to **Show Form** and shows all the data.

## Concepts

### createBrowserRouter (`src/main.jsx`)
Defines routes as an array of objects (`path`, `element`, `children`) and uses
the browser's History API, so URLs look clean (`/about`, not `/#/about`).
`<RouterProvider router={router} />` runs it. Related pieces:
- `<Outlet />` – where a child route renders inside its parent layout (`Layout.jsx`)
- `<NavLink />` – link that gets an `active` class for the current page (`Navbar.jsx`)
- `useNavigate()` – redirect from code, used after submit (`Home.jsx`)

### Context API (`src/context/FormContext.jsx`)
Shares data between components without passing props through every level.
1. `createContext()` – create the container
2. `<FormContext.Provider value={...}>` – supply the data (wraps the app in `main.jsx`)
3. `useContext()` – read it anywhere (`Home` writes, `ShowForm` reads)

Data flow: `Home` → `setFormData(form)` → Context → `ShowForm` reads `formData`.

Note: Context lives in memory, so refreshing the browser resets it to "No data available yet."
