import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';

const MenuItemCard = ({ menuItem }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative quantity
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{menuItem.name}</Text>
      <Text style={styles.itemDescription}>{menuItem.description}</Text>

      <View style={styles.container2}>
        <Text style={styles.price}>{menuItem.price}</Text>

        {/* Quantity Modifier */}
        <View style={styles.quantityModifier}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
            <Icon name="minus" size={16} color="darkseagreen" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
            <Icon name="plus" size={16} color="darkseagreen" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemDescription: {
    color: 'grey',
    marginBottom: 5,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'darkseagreen',
  },
  quantityModifier: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
