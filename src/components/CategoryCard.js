import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import flags from '../data/myFlags';
import COLORS from '../constants/colors';
import { useCategory } from '../context/CategoryContext';

const CategoryCard = ({ category }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const isSelected = selectedCategory === category.categoryName;

  const handlePress = () => {
    setSelectedCategory(isSelected ? null : category.categoryName);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, isSelected && styles.selectedContainer]}>
        <View style={[styles.imageContainer, isSelected && styles.selectedImageContainer]}>
          <Image source={flags[category.categoryName]} style={styles.image2} />
          <Text style={[styles.text, isSelected && styles.selectedText]}>
            {category.categoryName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 13,
  },
  selectedContainer: {
    transform: [{ scale: 1.05 }],
  },
  image2: {
    width: 60,
    height: 60,
    top: -40,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -25,
    color: 'white',
  },
  selectedText: {
    color: COLORS.ACCENT,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT, 
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderRadius: 10,
    width: 130,
    height: 100,
    padding: 15,
  },
  selectedImageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 2,
    borderColor: COLORS.ACCENT,
  },
});
