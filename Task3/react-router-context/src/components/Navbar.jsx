import { NavLink } from "react-router-dom";

// NavLink automatically adds the class "active" to the link of the current page
export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="logo">MyApp</span>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/show-form">Show Form</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </nav>
  );
}
