import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState, useRef } from "react";
import myFood from "../data/myFood";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import { useCart } from "../context/CartContext";

const MenuItemCard = ({ menuItem }) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [showQuantityModifier, setShowQuantityModifier] = useState(false);
  const { addToCart } = useCart();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const showModifier = () => {
    setShowQuantityModifier(true);
    setQuantity(1);
    addToCart(menuItem, 1);

    // Run both animations in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 400, // Slightly longer for color transition
        useNativeDriver: false,
      }),
    ]).start();
  };

  const hideModifier = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setShowQuantityModifier(false);
    });
  };

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.WHITE, COLORS.ACCENT],
  });

  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.ACCENT, COLORS.WHITE],
  });

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      addToCart(menuItem, 1);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev <= 1) {
        hideModifier();
        addToCart(menuItem, -prev);
        return 0;
      }
      addToCart(menuItem, -1);
      return prev - 1;
    });
  };

  const displayCartItem = (item) => {
    if (!item) return null;
    
    return (
      <View>
        <Text>{item?.name || 'Unknown Item'}</Text>
        <Text>{item?.price?.toString() || '0'}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate("Detail", { menuItem })}
    >
      {/* Image positioned absolutely */}
      <View style={styles.imageContainer}>
        <Image
          source={
            myFood[menuItem.name.toLowerCase().trim()] || {
              uri: menuItem.image,
            }
          }
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

        {/* Quantity Modifier and Add Button in Column */}
        <View style={styles.actionsColumn}>
          {showQuantityModifier ? (
            <Animated.View
              style={[styles.quantityContainer, { opacity: fadeAnim }]}
            >
              <Animated.View
                style={[
                  styles.quantityModifier,
                  {
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={decreaseQuantity}
                  style={styles.buttonContainer}
                >
                  <Animated.View
                    style={[
                      styles.button,
                      { backgroundColor: backgroundColor },
                    ]}
                  >
                    <Icon name="minus" size={14} color={COLORS.WHITE} />
                  </Animated.View>
                </TouchableOpacity>

                <Animated.Text
                  style={[styles.quantity, { color: COLORS.PRIMARY }]}
                >
                  {quantity}
                </Animated.Text>

                <TouchableOpacity
                  onPress={increaseQuantity}
                  style={styles.buttonContainer}
                >
                  <Animated.View
                    style={[
                      styles.button,
                      { backgroundColor: backgroundColor },
                    ]}
                  >
                    <Icon name="plus" size={14} color={COLORS.WHITE} />
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          ) : (
            <TouchableOpacity
              onPress={showModifier}
              style={styles.initialAddButton}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItemCard;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 25, // Space between cards
  },
  imageContainer: {
    position: "absolute",
    top: -60, // Position the image above the card
    left: "50%",
    transform: [{ translateX: -90 }], // Center the image horizontally
    zIndex: 1, // Place the image above the card
  },
  image: {
    width: 180, // Larger size
    height: 180,
    borderRadius: 100, // Half of the new dimensions
  },

  container: {
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 30, // Push content down to avoid overlapping with the image
    height: 270,
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
    color: "#442e54",
    textAlign: "center",
  },
  actionsColumn: {
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    width: "100%",
  },
  quantityContainer: {
    alignItems: "center",
    width: "100%",
  },
  quantityModifier: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonContainer: {
    padding: 5,
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
  initialAddButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 8,
    paddingHorizontal: 35,
    borderRadius: 25,
    alignItems: "center",
    minWidth: 120,
  },
  addButtonText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 14,
  },
});
