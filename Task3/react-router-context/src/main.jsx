import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FormProvider } from "./context/FormContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ShowForm from "./pages/ShowForm.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./styles.css";

/*
 * createBrowserRouter: defines all routes as a plain JS array of objects.
 * - path:     the URL
 * - element:  the component to show
 * - children: nested routes, rendered inside the parent's <Outlet />
 * RouterProvider then turns this config into a working router.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },          // "/"
      { path: "show-form", element: <ShowForm /> }, // "/show-form"
      { path: "about", element: <About /> },        // "/about"
      { path: "*", element: <NotFound /> },         // anything else
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // Provider wraps RouterProvider so every page can use the context
  <FormProvider>
    <RouterProvider router={router} />
  </FormProvider>
);
