import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';

const CartItemCard = ({ menuItem, updateQuantity }) => {
  return (
    <View style={styles.container}>
      {/* Image on the left */}
      <Image source={{ uri: menuItem.image }} style={styles.image} />

      {/* Item Details and Quantity Modifier */}
      <View style={styles.detailsContainer}>
        {/* Details */}
        <View style={styles.details}>
          <Text style={styles.itemName}>{menuItem.name}</Text>
          {/* <Text style={styles.itemDescription}>{menuItem.description}</Text> */}
          <Text style={styles.price}>{menuItem.price.toFixed(2)} KWD</Text>
        </View>

        {/* Quantity Modifier */}
        <View style={styles.quantityModifier}>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem.id, Math.max(0, menuItem.quantity - 1))}
            style={styles.button}
          >
            <Icon name="minus" size={16} color="darkseagreen" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{menuItem.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(menuItem.id, menuItem.quantity + 1)}
            style={styles.button}
          >
            <Icon name="plus" size={16} color="darkseagreen" />
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
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    width: "90%",
  },
  itemDescription: {
    color: 'grey',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'darkseagreen',
    marginTop: 5,
  },
  quantityModifier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
