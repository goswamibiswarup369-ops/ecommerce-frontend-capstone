import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { user, login, logout } = useContext(AuthContext);

  const handleAuthClick = () => {
    if (user) logout();
    else login({ name: "Demo User" });
  };

  return (
    <header className="nav">
      <Link className="nav-logo" to="/">Shop<span>X</span></Link>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
      </nav>
      <button className="nav-auth-btn" onClick={handleAuthClick}>
        {user ? `Logout (${user.name})` : "Login"}
      </button>
    </header>
  );
}

export default Navbar;
