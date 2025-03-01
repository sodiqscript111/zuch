// src/components/Navbar/navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Fetch all products from Firestore on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const collectionsRef = collection(db, "collections");
        const collectionsSnapshot = await getDocs(collectionsRef);
        const productsList = [];

        for (const collectionDoc of collectionsSnapshot.docs) {
          const productsRef = collection(db, "collections", collectionDoc.id, "products");
          const productsSnapshot = await getDocs(productsRef);
          productsSnapshot.forEach((doc) => {
            const data = doc.data();
            productsList.push({
              id: doc.id,
              collectionId: collectionDoc.id,
              name: data.name || "Unknown",
              price: data.price || 0,
              imageUrl: Array.isArray(data.imageUrl) && data.imageUrl.length > 0
                ? data.imageUrl[0]
                : data.imageUrl || "",
            });
          });
        }

        setAllProducts(productsList);
      } catch (error) {
        console.error("Error fetching products for search:", error);
      }
    };

    fetchAllProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  // Handle search result click
  const handleSearchResultClick = (collectionId, productId) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/product/${collectionId}/${productId}`);
    setMenuOpen(false); // Close mobile menu if open
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

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
    { path: "https://instagram.com/Zuch_Collection", label: "Book Appointment", external: true },
  ];

  const regularNavItems = navItems.filter(item => !item.external);
  const bookAppointmentItem = navItems.find(item => item.external);

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
          <div className="regular-nav-links">
            {regularNavItems.map((item) => (
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
          {bookAppointmentItem && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="book-appointment-wrapper"
            >
              <a
                href={bookAppointmentItem.path}
                className="book-appointment-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {bookAppointmentItem.label}
              </a>
            </motion.div>
          )}
        </div>

        {/* Right Section (Cart, Search, and Mobile Toggle) */}
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
            className="mobile-search-wrapper"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0.9 }}
          >
            <SearchIcon className="mobile-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="mobile-search-input"
            />
          </motion.div>
          <motion.div
            className="mobile-toggle"
            onClick={handleMenuToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </motion.div>
          <AnimatePresence>
            {searchResults.length > 0 && !menuOpen && (
              <motion.div
                className="mobile-search-results"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {searchResults.map((result) => (
                  <div
                    key={`${result.collectionId}-${result.id}`}
                    className="mobile-search-result-item"
                    onClick={() => handleSearchResultClick(result.collectionId, result.id)}
                  >
                    <img
                      src={result.imageUrl || "https://via.placeholder.com/50"}
                      alt={result.name}
                      className="mobile-search-result-image"
                    />
                    <div className="mobile-search-result-info">
                      <span>{result.name}</span>
                      <span>₦{result.price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
                  {item.external ? (
                    <a
                      href={item.path}
                      className="mobile-link book-appointment-link-mobile"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMenuToggle}
                    >
                      {item.label}
                    </a>
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