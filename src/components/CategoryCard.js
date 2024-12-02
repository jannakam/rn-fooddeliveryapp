import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import flags from '../data/myFlags'
import cuisines from '../data/cuisines'

const CategoryCard = ({category}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={cuisines[category.categoryName]} style={styles.image}/>
      </View>

      <View style={styles.flagContainer}>
      <Image source={flags[category.categoryName]} style={styles.image2}/>
      <Text style={styles.text}>{category.categoryName}</Text>
      </View>
    </View>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    image2: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'gray',
      width: 150,
      height: 150,
    },
    flagContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    }
})