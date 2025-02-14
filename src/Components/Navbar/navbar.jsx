import React, { useState } from "react";
import "./navbar.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cart";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Access `cartItems` from `CartContext`
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="wrapper">
        {/* Left Section (Logo) */}
        <div className="left">
          <Link to="/">
            <img
              src="https://i.ibb.co/3pbkQt5/walklogoo-removebg-preview.png"
              className="logo"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Center Section (Empty - For spacing) */}
        <div className="center"></div>

        {/* Right Section (Cart & Menu Icon) */}
        <div className="right">
          <Link to="/cart">
            <div className="cart-icon">
              <ShoppingBagOutlinedIcon />
              <span className="cart-badge">{cartItems.length}</span>
            </div>
          </Link>
          <div className="menu-icon" onClick={handleMenuToggle}>
            {menuOpen ? <CancelOutlinedIcon /> : <MenuOutlinedIcon />}
          </div>
        </div>
      </div>

      {/* Links (Mobile Menu) */}
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link to="/clothes" className="link">
          Shop
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/contact" className="link">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
