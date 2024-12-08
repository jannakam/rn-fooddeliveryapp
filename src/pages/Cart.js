import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import CartItemCard from '../components/CartItemCard';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../constants/colors';
import { useCart } from '../context/CartContext';
import { useNavigation, CommonActions } from '@react-navigation/native';


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
  const { cartItems, updateQuantity, clearCart, getCartTotal } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        'Cart Empty',
        'Please add items to your cart before checking out.',
        [{
          text: 'OK',
          style: 'default'
        }],
        { cancelable: true }
      );
      return;
    }

    if (!selectedAddress) {
      Alert.alert(
        'Address Required',
        'Please select a delivery address.',
        [{
          text: 'OK',
          style: 'default'
        }],
        { cancelable: true }
      );
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Total amount: ${getCartTotal().toFixed(2)} KWD\nDeliver to: ${selectedAddress.name}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'default',
          onPress: () => {
            const orderDetails = {
              orderNumber: Math.floor(100000 + Math.random() * 900000), // Generate random 6-digit number
              total: getCartTotal(),
              address: `${selectedAddress.street}, ${selectedAddress.area}, ${selectedAddress.block}, ${selectedAddress.building}`,
              items: cartItems
            };
            clearCart();
            navigation.navigate('OrderConfirmation', { orderDetails });
          },
        },
      ],
      { cancelable: true }
    );
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

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="shopping-cart" size={50} color={COLORS.SECONDARY} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItemCard menuItem={item} updateQuantity={updateQuantity} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Total Price Section */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>{getCartTotal().toFixed(2)} KWD</Text>
        </View>
      )}

      {/* Checkout Button */}
      <TouchableOpacity 
        style={[
          styles.checkoutButton,
          (!selectedAddress || cartItems.length === 0) && styles.checkoutButtonDisabled
        ]}
        disabled={!selectedAddress || cartItems.length === 0}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutButtonText}>
          {cartItems.length === 0 
            ? 'Add items to cart' 
            : !selectedAddress 
              ? 'Select an address to checkout'
              : 'Checkout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
  },
  checkoutButton: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  checkoutButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  addressSection: {
    marginBottom: 20,
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 5,
    overflow: 'hidden',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
  },
  addressHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.PRIMARY,
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: COLORS.SECONDARY,
    marginTop: 10,
  },
});
