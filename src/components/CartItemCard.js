import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import myFood from '../data/myFood';
import COLORS from '../constants/colors';

const CartItemCard = ({ menuItem, updateQuantity }) => {
  return (
    <View style={styles.container}>
      {/* Image on the left */}
      <Image source={myFood[menuItem.name.toLowerCase().trim()] || { uri: menuItem.image }} style={styles.image} />

      {/* Item Details and Quantity Modifier */}
      <View style={styles.detailsContainer}>
        {/* Details */}
        <View style={styles.details}>
          <Text style={styles.itemName}>{menuItem.name}</Text>
          {/* <Text style={styles.itemDescription}>
            {menuItem.description.length > 50
              ? `${menuItem.description.slice(0, 50)}...`
              : menuItem.description}
          </Text> */}
          <Text style={styles.price}>{menuItem.price.toFixed(2)} KWD</Text>
        </View>

        {/* Quantity Modifier */}
        <View style={styles.quantityModifier}>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem.id, Math.max(0, menuItem.quantity - 1))}
            style={styles.button}
          >
            <Icon name="minus" size={12} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{menuItem.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem.id, menuItem.quantity + 1)}
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
    padding: 10,
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
    // paddingHorizontal: 10,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.PRIMARY, 
    marginBottom: 5,
  },
  itemDescription: {
    color: COLORS.SECONDARY, 
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
