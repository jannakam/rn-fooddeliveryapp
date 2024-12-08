import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import RestaurantCard from "./RestaurantCard";
import COLORS from "../constants/colors";
import { useCategory } from '../context/CategoryContext';
import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "../api/items";

const Restaurants = () => {
  const { selectedCategory } = useCategory();
  const { data: restaurants, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading restaurants...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Error loading restaurants. Please try again.</Text>
      </View>
    );
  }

  // Filter restaurants based on selected category
  const filteredRestaurants = selectedCategory
    ? restaurants.filter(restaurant => restaurant.category.name === selectedCategory)
    : restaurants;

  const openCount = filteredRestaurants?.length || 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
        style={styles.gradient}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {selectedCategory || 'All Restaurants'}
          </Text>
          <Text style={styles.open}>{openCount} are open</Text>
        </View>
      </LinearGradient>

      {filteredRestaurants?.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No restaurants found</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {filteredRestaurants?.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </View>
        </ScrollView>
      )}
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
    paddingHorizontal: 10,
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
    fontSize: 20,
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
    zIndex: 2,
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.SECONDARY,
  },
});
