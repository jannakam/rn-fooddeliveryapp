import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import flags from '../data/myFlags';
import COLORS from '../constants/colors';
import { useCategory } from '../context/CategoryContext';

const CategoryCard = ({ category }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const isSelected = selectedCategory === category.categoryName;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  useEffect(() => {
    if (isSelected) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1.05,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelected]);

  const handlePress = () => {
    setSelectedCategory(isSelected ? null : category.categoryName);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [
              { scale: scaleAnim },
              { scale: bounceAnim }
            ]
          }
        ]}
      >
        <View style={[styles.imageContainer, isSelected && styles.selectedImageContainer]}>
          <Image source={flags[category.categoryName]} style={styles.image2} />
          <Text style={[styles.text, isSelected && styles.selectedText]}>
            {category.categoryName}
          </Text>
        </View>
      </Animated.View>
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
    fontFamily: 'OpenSans_700Bold',
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
