import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    if (!item || !item._id) return; // Add validation

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i._id === item._id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }

      return [...prevItems, { ...item, quantity }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (!itemId) return; // Add validation

    setCartItems((prevItems) => {
      if (newQuantity === 0) {
        return prevItems.filter((item) => item._id !== itemId);
      }
      return prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
