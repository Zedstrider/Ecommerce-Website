// client/src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook for easy access
export const useCart = () => {
  return useContext(CartContext);
};

// Provider component to wrap our app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Increase quantity if it exists
        return prevItems.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      // Add new item with a base quantity of 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Function to remove an item completely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
  };

  // Calculate total number of items for the Navbar badge
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};