import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CartItemCard from '../components/CartItemCard';
import restaurants from '../data/restaurants';
import Icon from 'react-native-vector-icons/Feather';

// Add this mock data at the top of the file
const sampleAddresses = [
  {
    id: 1,
    name: 'Home',
    street: '123 Al Salem Street',
    area: 'Salmiya',
    block: 'Block 12',
    building: 'Building 45',
    postCode: '12345',
  },
  {
    id: 2,
    name: 'Work',
    street: '456 Kuwait City Avenue',
    area: 'Sharq',
    block: 'Block 3',
    building: 'Tower 789',
    postCode: '54321',
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    [restaurants[0].menuItems[0], restaurants[2].menuItems[0]].map((item) => ({
      ...item,
      quantity: 1, // Initialize each item's quantity
    }))
  );
  // Add new state for address selection
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);

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
      
      {/* Address Selector Accordion */}
      <View style={styles.addressSection}>
        <TouchableOpacity 
          style={styles.addressHeader}
          onPress={() => setIsAddressDropdownOpen(!isAddressDropdownOpen)}
        >
          <Text style={styles.addressHeaderText}>
            {selectedAddress ? `Deliver to: ${selectedAddress.name}` : 'Select Delivery Address'}
          </Text>
          <Text style={styles.dropdownIcon}>{isAddressDropdownOpen ? <Icon name="chevron-down"/> : <Icon name="chevron-right" />}</Text>
        </TouchableOpacity>
        
        {isAddressDropdownOpen && (
          <View style={styles.addressList}>
            {sampleAddresses.map((address) => (
              <TouchableOpacity
                key={address.id}
                style={[
                  styles.addressItem,
                  selectedAddress?.id === address.id && styles.selectedAddress
                ]}
                onPress={() => {
                  setSelectedAddress(address);
                  setIsAddressDropdownOpen(false);
                }}
              >
                <Text style={styles.addressName}>{address.name}</Text>
                <Text style={styles.addressDetails}>
                  {`${address.street}, ${address.area}`}
                </Text>
                <Text style={styles.addressDetails}>
                  {`${address.block}, ${address.building}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

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
      <TouchableOpacity 
        style={[
          styles.checkoutButton,
          !selectedAddress && styles.checkoutButtonDisabled
        ]}
        disabled={!selectedAddress}
      >
        <Text style={styles.checkoutButtonText}>
          {selectedAddress ? 'Checkout' : 'Select an address to checkout'}
        </Text>
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
    borderRadius: 5,
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
  addressSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  addressHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#442e54',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#442e54',
  },
  addressList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedAddress: {
    backgroundColor: '#f0f0f0',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#442e54',
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#9c9c9c',
  },
});
