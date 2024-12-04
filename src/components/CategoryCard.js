import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import flags from '../data/myFlags';

const CategoryCard = ({ category }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={flags[category.categoryName]} style={styles.image2} />
        <Text style={styles.text}>{category.categoryName}</Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233,188,185,0.2)', 
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderRadius: 10,
    width: 130,
    height: 100,
    padding: 15,
  },
});
