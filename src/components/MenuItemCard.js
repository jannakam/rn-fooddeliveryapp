import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

const MenuItemCard = ({ menuItem, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative quantity
  };

  const handleAdd = () => {
    if (quantity > 0) {
      onAdd(menuItem, quantity); // Trigger the add function with item and quantity
      setQuantity(0); // Reset quantity after adding
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Image positioned absolutely */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: menuItem.image }} style={styles.image} />
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

        {/* Quantity Modifier and Add Button Row */}
        <View style={styles.actionsRow}>
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

          {/* Add Button */}
          <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20, // Space between cards
  },
  imageContainer: {
    position: "absolute",
    top: -10, // Position the image above the card
    left: "50%",
    transform: [{ translateX: -50 }], // Center the image horizontally
    zIndex: 1, // Place the image above the card
  },
  image: {
    width: 90, // Adjust image size
    height: 90,
    borderRadius: 40, // Make the image circular
    borderWidth: 4,
    borderColor: "white", // Add a border to match card background
  },
  container: {
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 30, // Push content down to avoid overlapping with the image
    height: 310,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  itemDescription: {
    color: "grey",
    marginBottom: 5,
    textAlign: "center",
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    color: "darkseagreen",
    textAlign: "center",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10, // Add spacing above the row
    width: "100%",
  },
  quantityModifier: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    padding: 5,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "seagreen",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
