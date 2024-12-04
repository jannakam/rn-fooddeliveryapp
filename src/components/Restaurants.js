import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants";

const Restaurants = () => {
  const randomOpen = Math.floor(Math.random() * restaurants.length) + 1;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]} // Gradient colors
        style={styles.gradient}
      >
        <View style={styles.titleContainer}>
        <Text style={styles.title}>Restaurants</Text>
        <Text style={styles.open}>{randomOpen} are open</Text>
        </View>

      </LinearGradient>
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
    marginTop: 50,
  },
  container: {
    flex: 1,
    width: "100%",
    maxHeight: 470,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100, 
    zIndex: 1, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  open: {
    fontSize: 14,
    fontWeight: "bold",
    color: 'grey',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    zIndex: 2, // Ensure the text appears above the gradient
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});
