import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';


// Helper functions
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id && cartItem.options === productToAdd.options
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id && cartItem.options === productToAdd.options
        ? { ...cartItem, quantity: cartItem.quantity + productToAdd.quantity }
        : cartItem
    );
  }

    return [...cartItems, { ...productToAdd, quantity: productToAdd.quantity, image:productToAdd.image }];

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
      ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) } // Prevent quantity from going below 1
      : cartItem
  );
};

// Cart Context
export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);


  // Update cart count and total whenever cartItems changes
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setCartCount(newCartCount);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // Cart actions
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

// Prop Types for the provider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CartProvider;
