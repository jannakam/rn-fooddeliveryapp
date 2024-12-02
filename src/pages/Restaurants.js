import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import restaurants from '../data/restaurants';

const Restaurants = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Restaurants</Text>
        </View>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />} // Fix here
          keyExtractor={(item) => item.id.toString()} // Fix keyExtractor to use `item`
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  gridContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});
