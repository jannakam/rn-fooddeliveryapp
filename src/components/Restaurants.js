import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RestaurantCard from "./RestaurantCard";
import COLORS from "../constants/colors";
import { useCategory } from '../context/CategoryContext';
import { useQuery } from "@tanstack/react-query";
import { getAllRestaurants } from "../api/items";

const LoadingSkeleton = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonCard,
            { opacity: fadeAnim }
          ]}
        />
      ))}
    </View>
  );
};

const Restaurants = () => {
  const { selectedCategory } = useCategory();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const { data: restaurants, isLoading, isError } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
  });

  useEffect(() => {
    if (restaurants) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [restaurants]);

  // Filter restaurants based on selected category
  const filteredRestaurants = selectedCategory
    ? restaurants?.filter(restaurant => restaurant.category.name === selectedCategory)
    : restaurants;

  const openCount = filteredRestaurants?.length || 0;

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Error loading restaurants. Please try again.</Text>
      </View>
    );
  }

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

      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredRestaurants?.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No restaurants found</Text>
        </View>
      ) : (
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
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
        </Animated.View>
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
  skeletonContainer: {
    paddingTop: 60,
    gap: 20,
  },
  skeletonCard: {
    height: 200,
    backgroundColor: COLORS.BACKGROUND_LIGHT_TRANSPARENT,
    borderRadius: 15,
    marginHorizontal: 10,
  },
});
