import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import myFood from "../data/myFood";
import COLORS from "../constants/colors";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import IngredientsList from "../components/IngredientsList";

const { width, height } = Dimensions.get("window");

const Detail = ({ route }) => {
  const { menuItem } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(0));
  const buttonScale = useRef(new Animated.Value(1)).current;
  const { addToCart } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const increaseQuantity = () => {
    animateButton();
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      animateButton();
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      _id: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image,
      description: menuItem.description,
      ...menuItem,
    };

    addToCart(itemToAdd, quantity);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.semiCircle} />

      <View>
        <Text style={styles.name}>{menuItem.name}</Text>
        <Text style={styles.price}>{menuItem.price} KWD</Text>
      </View>

      <View style={styles.imageContainer}>
        <Animated.Image
          source={
            myFood[menuItem.name.toLowerCase().trim()] || {
              uri: menuItem.image,
            }
          }
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </View>

      <View style={styles.quantityModifier}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <Icon name="minus" size={16} color={COLORS.WHITE} />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <Icon name="plus" size={16} color={COLORS.WHITE} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.ingredientsContainer}>
        <IngredientsList menuItemId={menuItem._id} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.description}>
          {menuItem.description.length > 100
            ? `${menuItem.description.slice(0, 100)}...`
            : menuItem.description}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "space-between",
  },
  semiCircle: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    width: "125%",
    height: height * 0.23,
    backgroundColor: COLORS.PRIMARY,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    zIndex: 1,
  },
  imageContainer: {
    zIndex: 10,
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: COLORS.WHITE,
    zIndex: 10,
  },
  price: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
    zIndex: 10,
    color: COLORS.WHITE,
  },
  description: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    textAlign: "center",
    lineHeight: 24,
  },
  quantityModifier: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    alignSelf: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.ACCENT,
  },
  quantity: {
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
    color: COLORS.SECONDARY,
  },
  addToCartButton: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 30,
    alignItems: "center",
  },
  addToCartText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  ingredientsContainer: {
    height: height * 0.1,
    marginTop: -20,
  },
});
