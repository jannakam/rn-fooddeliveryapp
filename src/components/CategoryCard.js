import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import flags from '../data/myFlags'
import cuisines from '../data/cuisines'

const CategoryCard = ({category}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={flags[category.categoryName]} style={styles.image2}/>
        <Image source={cuisines[category.categoryName]} style={styles.image}/>
      </View>

      <View style={styles.flagContainer}>
      <Text style={styles.text}>{category.categoryName}</Text>
      </View>
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap:10,
    },
    image: {
        width: 80,
        height: 80,
    },
    image2: {
        width: 30,
        height: 30,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      borderRadius: 10,
      width: 150,
      height: 150,
      padding: 15,
    },
    flagContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    }
})