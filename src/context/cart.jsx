// src/context/cart.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const addCartItem = (cartItems, productToAdd) => {
  console.log("STEP 1: Product to add:", JSON.stringify(productToAdd, null, 2));

  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productToAdd.id &&
      JSON.stringify(cartItem.options) === JSON.stringify(productToAdd.options)
  );

  if (existingCartItem) {
    console.log("STEP 2: Existing item found:", JSON.stringify(existingCartItem, null, 2));
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id &&
      JSON.stringify(cartItem.options) === JSON.stringify(productToAdd.options)
        ? { ...cartItem, quantity: cartItem.quantity + (productToAdd.quantity || 1) }
        : cartItem
    );
  }

  const imageUrl = Array.isArray(productToAdd.imageUrl) && productToAdd.imageUrl.length > 0
    ? productToAdd.imageUrl
    : productToAdd.imageUrl
    ? [productToAdd.imageUrl]
    : ["https://placehold.co/150"];

  const newItem = { ...productToAdd, quantity: productToAdd.quantity || 1, imageUrl };
  console.log("STEP 3: New item added:", JSON.stringify(newItem, null, 2));
  return [...cartItems, newItem];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const increaseCartItemQuantity = (cartItems, cartItemToIncrease) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

const decreaseCartItemQuantity = (cartItems, cartItemToDecrease) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToDecrease.id
      ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
      : cartItem
  );
};

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + (cartItem.quantity || 0), 0);
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + (cartItem.quantity || 0) * (cartItem.price || 0),
      0
    );

    setCartCount(newCartCount);
    setCartTotal(newCartTotal);
    console.log("STEP 4: Updated cartItems:", JSON.stringify(cartItems, null, 2));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems((prevCartItems) => addCartItem(prevCartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems((prevCartItems) => removeCartItem(prevCartItems, cartItemToRemove));
  };

  const increaseQuantity = (cartItemToIncrease) => {
    setCartItems((prevCartItems) => increaseCartItemQuantity(prevCartItems, cartItemToIncrease));
  };

  const decreaseQuantity = (cartItemToDecrease) => {
    setCartItems((prevCartItems) => decreaseCartItemQuantity(prevCartItems, cartItemToDecrease));
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addItemToCart,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;