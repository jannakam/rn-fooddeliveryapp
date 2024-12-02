import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

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
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        padding: 15,
        width: "10%",
    },
    image: {
        width: 50,
        height: 50,
    }
})