import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import myFood from "../data/myFood";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import { useCart } from '../context/CartContext';

const MenuItemCard = ({ menuItem }) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative quantity
  };

  const handleAdd = () => {
    if (quantity > 0) {
      addToCart(menuItem, quantity);
      setQuantity(0); // Reset quantity after adding
      Alert.alert(
        'Added to Cart',
        `${quantity} ${menuItem.name}${quantity > 1 ? 's' : ''} added to cart`,
        [
          {
            text: 'Continue Shopping',
            style: 'cancel',
          },
          {
            text: 'Go to Cart',
            onPress: () => navigation.navigate('Cart'),
          },
        ]
      );
    }
  };

  return (
    <TouchableOpacity 
      style={styles.wrapper}
      onPress={() => navigation.navigate('Detail', { menuItem })}
    >
      {/* Image positioned absolutely */}
      <View style={styles.imageContainer}>
        <Image
          source={myFood[menuItem.name.toLowerCase().trim()] || { uri: menuItem.image }}
          style={styles.image}
        />
      </View>

      {/* Card content */}
      <View style={styles.container}>
        <Text style={styles.itemName}>{menuItem.name}</Text>
        <Text style={styles.itemDescription}>
          {menuItem.description.length > 50
            ? `${menuItem.description.slice(0, 50)}...`
            : menuItem.description}
        </Text>

        <Text style={styles.price}>{menuItem.price} KWD</Text>

        {/* Actions Container */}
        <View style={styles.actionsContainer}>
          {/* Quantity Modifier */}
          <View style={styles.quantityModifier}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
              <Icon name="minus" size={16} color={COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
              <Icon name="plus" size={16} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>

          {/* Add Button */}
          <TouchableOpacity 
            onPress={handleAdd} 
            style={[
              styles.addButton,
              quantity === 0 && styles.addButtonDisabled
            ]}
            disabled={quantity === 0}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 25,
  },
  imageContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -90 }],
    zIndex: 1,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
    height: 310,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  itemDescription: {
    color: COLORS.PRIMARY,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLORS.SECONDARY,
    textAlign: "center",
  },
  actionsContainer: {
    alignItems: "center",
    gap: 15,
    marginTop: 10,
    width: "100%",
  },
  quantityModifier: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    padding: 5,
    borderRadius: 15,
    backgroundColor: COLORS.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
  },
  quantity: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: "center",
  },
  addButtonDisabled: {
    backgroundColor: COLORS.SECONDARY,
    opacity: 0.5,
  },
  addButtonText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 14,
  },
});
