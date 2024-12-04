import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CartItemCard from '../components/CartItemCard';
import restaurants from '../data/restaurants';

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    [restaurants[0].menuItems[0], restaurants[2].menuItems[0]].map((item) => ({
      ...item,
      quantity: 1, // Initialize each item's quantity
    }))
  );

  // Update quantity function
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard menuItem={item} updateQuantity={updateQuantity} />
        )}
        contentContainerStyle={styles.listContent}
      />
      {/* Total Price Section */}
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>{calculateTotal()} KWD</Text>
      </View>
      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#442e54',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#442e54',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#442e54',
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // shadowOffset: { width: 0, height: 2 },
  },
  checkoutButton: {
    backgroundColor: '#4b4376',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
