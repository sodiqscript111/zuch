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
          imageUrl: item.imageUrl || "https://placehold.co/150",
          options: item.options || { size: "N/A" },
        })),
        timestamp: new Date().toISOString(),
        status: "Pending",
      };
      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order saved!");
    } catch (error) {
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

  return (
    <motion.div className="cart-page" initial="hidden" animate="visible">
      <h1 className="cart-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <ul className="cart-list">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.li key={`${item.id}-${index}`} className="cart-card">
                  <div className="cart-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₦{(item.price || 0).toLocaleString()}</p>
                    <div className="cart-controls">
                      <button onClick={() => decreaseQuantity(item)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                      <button className="remove-btn" onClick={() => removeItemFromCart(item)}>Remove</button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="cart-summary">
            <h2>Total: ₦{totalAmount.toLocaleString()}</h2>
            <button className="checkout-btn" onClick={() => setIsCheckoutOpen(true)}>Checkout</button>
          </div>
        </>
      )}

      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div className="checkout-modal">
            <h2>Checkout</h2>
            <form>
              <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Email" />
              <input type="tel" name="phone" value={userInfo.phone} onChange={handleInputChange} placeholder="Phone" />
              <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} placeholder="Address" />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsCheckoutOpen(false)}>Cancel</button>
                <button type="button" onClick={handlePaystackPayment} disabled={!validateForm()}>Pay Now</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </motion.div>
  );
};

export default Cart;