import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import IngredientsList from '../components/IngredientsList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import myFood from '../data/myFood';

const { width, height } = Dimensions.get('window');

const Detail = ({ menuItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for image

  // Trigger fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    // Logic to add item to cart can be implemented here
    console.log(`Added ${quantity} ${menuItem.name}(s) to the cart.`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      {/* SemiCircle Background */}
      <View style={styles.semiCircle} />

      {/* Item Name and Price */}
      <View>
        <Text style={styles.name}>{menuItem.name}</Text>
        <Text style={styles.price}>{menuItem.price} KWD</Text>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={myFood[menuItem.name]}
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </View>

      {/* Quantity Modifier */}
      <View style={styles.quantityModifier}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
          <Icon name="minus" size={16} color="white" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
          <Icon name="plus" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Ingredients List */}
      <View style={styles.ingredientsContainer}>
        <IngredientsList />
      </View>

      {/* Description */}
      <View style={styles.detailsContainer}>
        <Text>
          {menuItem.description.length > 100
            ? `${menuItem.description.slice(0, 100)}...`
            : menuItem.description}
        </Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  semiCircle: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: '125%',
    height: height * 0.23,
    backgroundColor: '#442e54',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    zIndex: 1,
  },
  imageContainer: {
    zIndex: 10,
    alignItems: 'center',
    // marginTop: height * 0.01,
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
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    zIndex: 10,
  },
  price: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
    zIndex: 10,
    color: '#e9bcb9',
  },
  ingredientsContainer: {
    height: height * 0.1,
    marginTop: -20,
  },
  quantityModifier: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ae445a',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b4376',
  },
  addToCartButton: {
    backgroundColor: '#4b4376',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
