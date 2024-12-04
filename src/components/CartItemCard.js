import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import myFood from '../data/myFood';

const CartItemCard = ({ menuItem, updateQuantity }) => {
  return (
    <View style={styles.container}>
      {/* Image on the left */}
      <Image source={myFood[menuItem.name]} style={styles.image} />

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
            <Icon name="minus" size={16} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{menuItem.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem.id, menuItem.quantity + 1)}
            style={styles.button}
          >
            <Icon name="plus" size={16} color="white" />
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
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 40, // Circular image
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#442e54', // Matching MenuItemCard text color
    marginBottom: 5,
  },
  itemDescription: {
    color: '#4b4376', // Matching MenuItemCard text color
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#442e54', // Matching MenuItemCard text color
    marginTop: 5,
  },
  quantityModifier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ae445a', // Matching MenuItemCard button color
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
