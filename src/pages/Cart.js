import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CartItemCard from '../components/CartItemCard';
import restaurants from '../data/restaurants';

const CartPage = () => {
  // Initialize cart items with a quantity of 1
  const [cartItems, setCartItems] = useState(
    [restaurants[0].menuItems[0], restaurants[1].menuItems[1]].map((item) => ({
      ...item,
      quantity: 1, // Add a default quantity
    }))
  );

  // Update quantity in the cart
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
      />
      {/* Total Price */}
      <View style={styles.checkoutContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.total2}>{calculateTotal()} KWD</Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  total: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  total2: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: 'darkslategrey',
    padding: 15,
    marginBottom: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:20,
  }
});
