import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import IngredientsList from '../components/IngredientsList';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const Detail = ({ menuItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} 
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* SemiCircle Background */}
          <View style={styles.semiCircle} />

          {/* Item Name and Price */}
          <View>
            <Text style={styles.name}>{menuItem.name}</Text>
            <Text style={styles.price}>{menuItem.price} KWD</Text>
          </View>

          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: menuItem.image }} style={styles.image} />
          </View>

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

          {/* Ingredients List */}
          <View style={styles.ingredientsContainer}>
            <IngredientsList />
          </View>

          {/* Description */}
          <View style={styles.detailsContainer}>
            <View style={styles.descriptionContainer}>
              <Text>{menuItem.description}</Text>
            </View>

            {/* Custom Notes Section */}
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Add Notes</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Add any special requests or notes here..."
                placeholderTextColor="grey"
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  semiCircle: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: '120%',
    height: height * 0.2,
    backgroundColor: 'darkslategrey',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    zIndex: 1,
  },
  imageContainer: {
    zIndex: 10,
    alignItems: 'center',
    marginTop: height * 0.015,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    zIndex: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    zIndex: 10,
    color: 'white',
  },
  ingredientsContainer: {
    height: height * 0.14,
  },
  notesContainer: {
    marginTop: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  quantityModifier: {
    width: '25%',
    marginVertical: 15,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    zIndex: 10,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkslategrey',
  },
});
