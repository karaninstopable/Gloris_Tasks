import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

// Parent route: Navbar is always visible, <Outlet /> is where the child page renders
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
