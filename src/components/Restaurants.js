import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants";

const Restaurants = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    width: "100%",
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
});
