import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import { PaystackButton } from "react-paystack";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart } =
    useContext(CartContext);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY; // Updated for Vite
  const amount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity * 100,
    0
  );
  const reference = new Date().getTime().toString();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.phone || !userInfo.address) {
      alert("Please fill in all fields.");
      return;
    }
    setIsPopupOpen(false);
  };

  const sendNotification = async (ref) => {
    try {
      const response = await fetch("/api/notify", { // Update to Vercel URL after deployment
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: ref,
          email: userInfo.email,
          phone: userInfo.phone,
          address: userInfo.address,
          cartItems: JSON.stringify(cartItems),
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Notification sent to your email!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Notification error:", error);
      toast.error("Failed to send notification.");
    }
  };

  const onSuccess = (reference) => {
    console.log("Payment Successful! Reference:", reference);
    toast.success(`Payment completed! Reference: ${reference.reference}`);
    sendNotification(reference.reference);
  };

  const onClose = () => {
    console.log("Payment window closed.");
    toast.info("Payment window closed.");
  };

  const paystackProps = {
    reference,
    email: userInfo.email,
    amount,
    publicKey,
    text: "Pay with Paystack",
    onSuccess,
    onClose,
    metadata: {
      phone: userInfo.phone,
      address: userInfo.address,
      cartItems: JSON.stringify(cartItems),
    },
    className: "paystack-btn",
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="cart-container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Cart
      </motion.h2>
      {cartItems.length === 0 ? (
        <motion.p
          className="cart-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <motion.ul
          className="cart-items"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {cartItems.map((item) => (
            <motion.li
              key={item.id}
              className="cart-item"
              variants={itemVariants}
              layout
            >
              {item.imageUrl && (
                <motion.img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="cart-item-details">
                <strong className="cart-item-name">{item.name}</strong>
                <p className="cart-item-price">${item.price}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <p className="cart-item-options">
                  Options:{" "}
                  {item.options && typeof item.options === "object" ? (
                    Object.entries(item.options)
                      .map(([key, value]) => {
                        if (key === "size" && typeof value === "object") {
                          return `${key}: ${Object.entries(value)
                            .map(([k, v]) => `${k}: ${v}cm`)
                            .join(", ")}`;
                        }
                        return `${key}: ${value}`;
                      })
                      .join(", ")
                  ) : (
                    "No options available"
                  )}
                </p>
                <div className="cart-item-actions">
                  <motion.button
                    onClick={() => increaseQuantity(item)}
                    className="quantity-btn increase"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    +
                  </motion.button>
                  <motion.button
                    onClick={() => decreaseQuantity(item)}
                    className="quantity-btn decrease"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    -
                  </motion.button>
                  <motion.button
                    onClick={() => removeItemFromCart(item)}
                    className="remove-btn"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
      <motion.h3
        className="cart-total"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Total Price: $
        {cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}
      </motion.h3>

      {cartItems.length > 0 && (
        <motion.button
          className="checkout-btn"
          onClick={() => setIsPopupOpen(true)}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Proceed to Checkout
        </motion.button>
      )}

      {isPopupOpen && (
        <motion.div
          className="cart-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="cart-popup"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3>Enter Your Details</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <motion.input
                  type="text"
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter your delivery address"
                  required
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
              </div>
              <div className="popup-actions">
                <motion.button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsPopupOpen(false)}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cancel
                </motion.button>
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <PaystackButton {...paystackProps} />
                </motion.div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;