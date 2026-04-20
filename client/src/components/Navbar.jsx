
import { NavLink } from "react-router-dom"; // to have an active state on the currently selected tab
import { useCartContext } from "../hooks/useCartContext";
import { useState } from "react";
import Cart from "./Cart"; 
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { cartItems } = useCartContext();
  const [cartOpen, setCartOpen] = useState(false); // React state for cart drawer

  const navClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-bold text-info" : "");


  const { user } = useAuthContext();
  const {logout} = useLogout()
  const handleClick = () => {
    logout();
  };

  return (
    <>
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
          <button
            className="btn btn-light position-relative mx-3 my-2"
            onClick={() => setCartOpen(true)} // open cart with React state
          >
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Auth Buttons */}
          <div className="d-flex gap-2">
            {user && (
              <div>
                <span className="text-white">{user.email}</span>
                <button onClick={handleClick}>Logout</button>
              </div>
            )}

            {!user && (
              <div>
                <NavLink to="/login" className="btn btn-outline-light">
                  Login
                </NavLink>
                <NavLink to="/signup" className="btn btn-outline-light fw-bold">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Cart drawer rendered conditionally */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
}