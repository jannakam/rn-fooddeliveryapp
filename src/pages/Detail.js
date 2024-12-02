import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ingredients } from '../data/ingredients';
import Ingredient from '../components/Ingredient';

const Detail = ({ menuItem }) => {
  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.header}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
        <Ionicons name="cart-sharp" size={24} color="black" />
      </View>

      {/* <ScrollView nestedScrollEnabled contentContainerStyle={styles.scrollContent}> */}
        <View style={styles.imageContainer}>
          <Text style={styles.name}>{menuItem.name}</Text>
          <Image source={{ uri: menuItem.image }} style={styles.image} />
          <Text style={styles.price}>{menuItem.price}</Text>
        </View>

        <View style={styles.ingredientsContainer}>
          <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
            {ingredients.map((ingredient, index) => (
              <Ingredient key={index} image={ingredient.image} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.descriptionContainer}>
          <Text>{menuItem.description}</Text>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1, 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
    gap:10,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  ingredientsContainer: {
    marginVertical: 20, 
  },
});
