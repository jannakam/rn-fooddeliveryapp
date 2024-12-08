import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ingredients from '../data/ingredients'
import Ingredient from './Ingredient'
import COLORS from '../constants/colors'


const IngredientsList = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Ingredients</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {ingredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientItem}>
                <Ingredient image={ingredient.image} />
              </View>
            ))}
          </ScrollView>
        </View>
      );
    };
  
  export default IngredientsList;
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 5,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: COLORS.PRIMARY,
    },
    scrollContainer: {
      flexDirection: 'row',
      gap: 10, // Reduced spacing between items
    },
    ingredientItem: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5,
    },
    name: {
      fontSize: 14,
      textAlign: 'center',
      marginTop: 5,
    },
  });
