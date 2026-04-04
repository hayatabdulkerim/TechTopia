import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        TechTopia
      </Link>

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
        {/*  Tabs (Categories) */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/category/Headsets">
              Headsets
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Earbuds">
              Earbuds
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Smart Glasses">
              Smart Glasses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Accessories">
              Accessories
            </Link>
          </li>
        </ul>

        {/*  Auth Buttons */}
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-light">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-light fw-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}