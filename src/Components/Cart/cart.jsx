import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: "20px" }}>
             {/* Display product image */}
             {item.image && (
                <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              )}
               <br />
              <br />
              <strong>{item.name}</strong> - ${item.price} - Quantity: {item.quantity}
              <br/>
               Options:{" "}
              <br />
              Options:{" "}
              {item.options && typeof item.options === "object" ? (
                Object.entries(item.options)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")
              ) : (
                "No options available"
              )}
              <br />
              <button onClick={() => increaseQuantity(item)}>+</button>
              <button onClick={() => decreaseQuantity(item)}>-</button>
              <button onClick={() => removeItemFromCart(item)}>Remove</button>
            </li> 
          ))}
        </ul>
      )}
      {/* Calculate and display the total price */}
      <h3>
        Total Price: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </h3>
    </div>
  );
};
export default Cart;


