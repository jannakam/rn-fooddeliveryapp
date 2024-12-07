import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';

const Ingredient = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
    </View>
  )
}

export default Ingredient

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8, // Reduced for a smaller look
        backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
        padding: 10, // Reduced padding
    },
    image: {
        width: 40, // Smaller width
        height: 40, // Smaller height
    }
})
