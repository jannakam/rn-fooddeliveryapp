import { SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import restaurantCategories from '../data/categories'
import CategoryCard from '../components/CategoryCard'

const Categories = () => {
  return (
    <SafeAreaView>
        <StatusBar style="auto" />
        <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        
            <View style={styles.categoryContainer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {restaurantCategories.map((category, index) => (
            <CategoryCard key={index} category={category} />
            ))}
            </ScrollView>
            </View>
          
        </View>
    </SafeAreaView>
  )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginVertical: 10,
      gap:10,
    },
})