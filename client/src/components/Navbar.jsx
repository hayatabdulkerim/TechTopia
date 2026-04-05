
import { NavLink } from "react-router-dom"; // to have an active state on the currently selected tab

export default function Navbar() {
  const navClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-bold text-info" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
      <NavLink className="navbar-brand fw-bold" to="/">
        TechTopia
      </NavLink>

      {/* Toggle (for mobile) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Tabs (Categories) */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item ">
            <NavLink to="/category/headphones" className={navClass}>
              Headphones
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category/earbuds" className={navClass}>
              Earbuds
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category/smart-glasses" className={navClass}>
              Smart Glasses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/category/accessories" className={navClass}>
              Accessories
            </NavLink>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="d-flex gap-2">
          <NavLink to="/login" className="btn btn-outline-light">
            Login
          </NavLink>
          <NavLink to="/signup" className="btn btn-outline-light fw-bold">
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}