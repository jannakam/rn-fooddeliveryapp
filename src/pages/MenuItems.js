import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import MenuItemCard from "../components/MenuItemCard";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import renderStars from "../components/renderStars";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";

const getTagStyle = (rating) => {
  if (rating > 4.5) return { label: "Excellent", color: "seagreen" };
  if (rating > 4) return { label: "Great", color: "goldenrod" };
  if (rating > 3) return { label: "Good", color: "orangered" };
  if (rating > 2) return { label: "Fair", color: "firebrick" };
  return { label: "Poor", color: "darkred" };
};

const MenuItems = ({ route }) => {
  const { restaurant } = route.params;

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No restaurant data available.</Text>
      </View>
    );
  }

  const { label: ratingLabel, color: ratingColor } = getTagStyle(
    restaurant.rating
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Image Section with Overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <View style={styles.imageOverlay} />
      </View>

      {/* Card-like Content Section */}
      <View style={styles.cardContainer}>
        {/* Header Content */}
        <View style={styles.header}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={16} color="gray" />
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={styles.ratingRow}>
            {renderStars(restaurant.rating)}
            <Text style={[styles.ratingLabel, { color: ratingColor }]}>
              {ratingLabel}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.itemsContainer}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.items}>
              {restaurant.menuItems.map((menuItem, index) => (
                <View key={index} style={styles.gridItem}>
                  <MenuItemCard 
                    menuItem={{
                      ...menuItem,
                      restaurant: restaurant
                    }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          {/* Gradient at the bottom */}
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={styles.bottomGradient}
          />
        </View>
      </View>
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  image: {
    width: 430,
    height: "80%",
    resizeMode: "contain",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay on the image 
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    marginTop: -30, // Pull the card up over the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: "gray",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  items: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap items to the next row
    justifyContent: "space-between", // Space items evenly
    gap: 10, // Space between items
  },
  gridItem: {
    width: "48%", // Take up half the width with some margin
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, // Adjust the height of the gradient
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "gray",
  },
});
