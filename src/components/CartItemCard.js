import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import myFood from '../data/myFood';
import COLORS from '../constants/colors';

const CartItemCard = ({ menuItem, updateQuantity }) => {
  if (!menuItem) return null;

  return (
    <View style={styles.container}>
      {/* Image on the left */}
      <Image 
        source={myFood[menuItem?.name?.toLowerCase()?.trim()] || { uri: menuItem?.image }} 
        style={styles.image} 
      />

      {/* Item Details and Quantity Modifier */}
      <View style={styles.detailsContainer}>
        {/* Details */}
        <View style={styles.details}>
          <Text style={styles.itemName}>{menuItem?.name || 'Unknown Item'}</Text>
          <Text style={styles.price}>{(menuItem?.price || 0).toFixed(2)} KWD</Text>
        </View>

        {/* Quantity Modifier */}
        <View style={styles.quantityModifier}>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem?._id, Math.max(0, (menuItem?.quantity || 0) - 1))}
            style={styles.button}
          >
            <Icon name="minus" size={12} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{menuItem?.quantity || 0}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem?._id, (menuItem?.quantity || 0) + 1)}
            style={styles.button}
          >
            <Icon name="plus" size={12} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: '#fff', // Matching MenuItemCard background color
    // shadowColor: 'grey',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // elevation: 2,
    // borderRadius: 10,
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 40, // Circular image
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    padding: 10,
    paddingVertical: 15,
    shadowOpacity: 0.2,
    elevation: 2,
    // paddingHorizontal: 10,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 16,
    color: COLORS.PRIMARY, 
    marginBottom: 5,
  },
  itemDescription: {
    color: COLORS.SECONDARY, 
    fontSize: 12,
    fontFamily: 'OpenSans_400Regular',
  },
  price: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 14,
    color: COLORS.SECONDARY, 
    marginTop: 5,
  },
  quantityModifier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.ACCENT, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 14,
    fontFamily: 'OpenSans_600SemiBold',
    marginHorizontal: 10,
  },
});
