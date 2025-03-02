// src/components/Navbar/navbar.jsx
import React, { useState, useMemo, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart";
import { ProductContext } from "../../context/productContext"; // New import
import { motion, AnimatePresence } from "framer-motion";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { products, collections, loading } = useContext(ProductContext); // Use context
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (searchQuery.trim() === "") return [];
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchResults(filteredProducts);
  };

  const handleSearchResultClick = (collectionId, productId) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/product/${collectionId}/${productId}`);
    setMenuOpen(false);
  };

  const handleMenuToggle = () => setMenuOpen(prev => !prev);
  const toggleCollections = () => setIsCollectionsOpen(prev => !prev);

  const menuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const navItems = [
    { path: "/shopall", label: "Shop" },
    { path: "/collections", label: "Collections", hasDropdown: true },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
    { path: "https://instagram.com/Zuch_Collection", label: "Book Appointment", external: true },
  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <motion.img
              src="https://i.ibb.co/Fq362M1t/Whats-App-Image-2025-02-16-at-10-54-10-65e00f92.jpg"
              alt="Logo"
              className="logo-img"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            />
          </Link>
          <div className="nav-links">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                className="nav-item"
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                custom={index}
              >
                {item.external ? (
                  <a
                    href={item.path}
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                    onClick={item.hasDropdown ? toggleCollections : null}
                  >
                    {item.label}
                  </NavLink>
                )}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {isCollectionsOpen && (
                      <motion.div
                        className="collections-dropdown"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {collections.map((collection) => (
                          <Link
                            key={collection.id}
                            to={`/shopall/${collection.id}`}
                            className="dropdown-item"
                            onClick={() => setIsCollectionsOpen(false)}
                          >
                            {collection.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="navbar-right">
          <div className="search-container">
            <motion.div
              className="search-wrapper"
              initial={{ opacity: 1 }}
              whileHover={{ opacity: 0.9 }}
            >
              <SearchIcon className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="search-input"
              />
            </motion.div>
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  className="search-results"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {searchResults.map((result) => (
                    <div
                      key={`${result.collectionId}-${result.id}`}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(result.collectionId, result.id)}
                    >
                      <img
                        src={result.imageUrl || "https://via.placeholder.com/50"}
                        alt={result.name}
                        className="search-result-image"
                        loading="lazy"
                      />
                      <div className="search-result-info">
                        <span>{result.name}</span>
                        <span>₦{result.price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                  {item.external ? (
                    <a
                      href={item.path}
                      className="mobile-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMenuToggle}
                    >
                      {item.label}
                    </a>
                  ) : item.hasDropdown ? (
                    <>
                      <div
                        className="mobile-link mobile-collections"
                        onClick={toggleCollections}
                      >
                        {item.label}
                      </div>
                      <AnimatePresence>
                        {isCollectionsOpen && (
                          <motion.div
                            className="mobile-collections-dropdown"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {collections.map((collection) => (
                              <Link
                                key={collection.id}
                                to={`/shopall/${collection.id}`}
                                className="mobile-dropdown-item"
                                onClick={handleMenuToggle}
                              >
                                {collection.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
                      onClick={handleMenuToggle}
                    >
                      {item.label}
                    </NavLink>
                  )}
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