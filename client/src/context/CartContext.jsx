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
  const [discount, setDiscount] = useState(null);

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

  // Function to decrease quantity or remove if it hits 0
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity by 1
        return prevItems.map(item => 
          item._id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      // If quantity is 1 and they hit minus, remove the item completely
      return prevItems.filter(item => item._id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // function to apply the discount object to state
  const applyDiscount = (discountData) => {
    setDiscount(discountData);
  };

  // function to remove the discount
  const removeDiscount = () => {
    setDiscount(null);
  };

  // Financial Calculations
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const rawSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate Discount Amount
  let discountAmount = 0;
  
  if (discount) {
    if (discount.type === 'percentage') {
      discountAmount = rawSubtotal * (discount.value / 100);
    } else if (discount.type === 'fixed') {
      discountAmount = discount.value;
    } else if (discount.type === 'bogo') {
      
      // BOGO ALGORITHM:
      // 1. Flatten the cart so every single item (based on quantity) is its own entry in an array
      let allIndividualItems = [];
      cartItems.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          allIndividualItems.push(item.price);
        }
      });

      // 2. Sort the array from highest price to lowest price
      allIndividualItems.sort((a, b) => b - a);

      // 3. Loop through the array and apply the discount to every 2nd item (index 1, 3, 5, etc.)
      for (let i = 1; i < allIndividualItems.length; i += 2) {
        // If value is 100, it makes the item free. If 50, it halves the price.
        discountAmount += allIndividualItems[i] * (discount.value / 100);
      }
    }
  }
  // Prevent subtotal from dropping below zero
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);
  
  // Calculate Shipping (Free if over $50, OR if they have a free_shipping code)
  let shipping = subtotalAfterDiscount > 50 ? 0 : 10.00;
  if (discount && discount.type === 'free_shipping') {
    shipping = 0;
  }

  const tax = subtotalAfterDiscount * 0.08;
  const total = subtotalAfterDiscount + shipping + tax;

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, clearCart, cartCount, decreaseQuantity,
      discount, applyDiscount, removeDiscount, // Expose new discount functions
      rawSubtotal, discountAmount, shipping, tax, total // Expose calculated financials
    }}>
      {children}
    </CartContext.Provider>
  );
};