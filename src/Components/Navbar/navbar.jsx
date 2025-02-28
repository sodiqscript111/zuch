import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  // Menu animation variants for mobile
  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  // Link animation variants
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  const navItems = [
    { path: "/shopall", label: "Shop" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  
  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <motion.img
            src="https://i.ibb.co/Fq362M1t/Whats-App-Image-2025-02-16-at-10-54-10-65e00f92.jpg"
            alt="Logo"
            className="logo-img"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* Right Section (Cart and Mobile Toggle) */}
        <div className="navbar-right">
          <Link to="/cart" className="cart-action">
            <motion.div
              className="cart-icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBagOutlinedIcon />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </motion.div>
          </Link>
          <motion.div
            className="mobile-toggle"
            onClick={handleMenuToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={linkVariants}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
                    onClick={handleMenuToggle}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;