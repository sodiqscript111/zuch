// src/components/Cart/cart.jsx
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "", phone: "", address: "" });
  const [isPaystackLoaded, setIsPaystackLoaded] = useState(false);

  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const amountInKobo = totalAmount * 100;
  const reference = `order_${new Date().getTime()}`;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setIsPaystackLoaded(true);
    script.onerror = () => toast.error("Failed to load Paystack.");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    console.log("STEP 5: Cart Items in Cart.jsx:", JSON.stringify(cartItems, null, 2));
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => userInfo.email && userInfo.phone && userInfo.address && totalAmount > 0;

  const saveOrderToFirestore = async (ref) => {
    try {
      const orderData = {
        reference: ref,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price || 0,
          quantity: item.quantity || 1,
          imageUrl: Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? item.imageUrl[0] : item.imageUrl || "https://placehold.co/150",
          options: item.options || { size: "N/A" },
        })),
        timestamp: new Date().toISOString(),
        status: "Pending",
      };
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order saved!");
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error("Failed to save order.");
    }
  };

  const handlePaystackPayment = () => {
    if (!isPaystackLoaded || !window.PaystackPop) {
      toast.error("Paystack not loaded yet.");
      return;
    }
    if (!validateForm()) {
      toast.error("Please complete all fields.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: userInfo.email,
      amount: amountInKobo,
      ref: reference,
      metadata: { phone: userInfo.phone, address: userInfo.address, cartItems: JSON.stringify(cartItems) },
      callback: (response) => {
        if (response.status === "success") {
          saveOrderToFirestore(response.reference);
          toast.success(`Payment successful! Ref: ${response.reference}`);
          setIsCheckoutOpen(false);
        }
      },
      onClose: () => toast.info("Payment cancelled."),
    });
    handler.openIframe();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div className="cart-page" initial="hidden" animate="visible" variants={containerVariants}>
      <h1 className="cart-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <ul className="cart-list">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.li
                  key={`${item.id}-${index}`}
                  className="cart-card"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "2px 5px",
                        fontSize: "12px",
                      }}
                    >
                      {item.name} (ID: {item.id})
                    </span>
                    {item.id === "bt02" && (
                      <img
                        src="https://i.ibb.co/nXQqcHc/BT-02-80-00.jpg"
                        alt="BT02 Test"
                        className="cart-image test-image"
                        style={{ marginLeft: "20px" }}
                      />
                    )}
                  </div>
                  <div className="cart-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₦{(item.price || 0).toLocaleString()}</p>
                    <p className="cart-item-options">
                      {item.options?.size ? `Size: ${item.options.size}` : "No options"}
                    </p>
                    <div className="cart-controls">
                      <button onClick={() => decreaseQuantity(item)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                      <button className="remove-btn" onClick={() => removeItemFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="cart-summary">
            <h2>Total: ₦{totalAmount.toLocaleString()}</h2>
            <motion.button
              className="checkout-btn"
              onClick={() => setIsCheckoutOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Checkout
            </motion.button>
          </div>
        </>
      )}

      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            className="checkout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="checkout-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <h2>Checkout</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+234..."
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    placeholder="Delivery address"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsCheckoutOpen(false)}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="button"
                    className="pay-btn"
                    onClick={handlePaystackPayment}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!validateForm()}
                  >
                    Pay Now
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </motion.div>
  );
};

export default Cart;