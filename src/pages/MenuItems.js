import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  Dimensions,
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

const MenuItems = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { height } = Dimensions.get('window');
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animations when component mounts
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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

      {/* Fixed Background Section */}
      <View style={styles.imageOverlay} />
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: restaurant.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Animated Card Content */}
      <Animated.View 
        style={[
          styles.cardContainer,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          }
        ]}
      >
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
              {restaurant.items?.map((menuItem, index) => (
                <View key={menuItem._id} style={styles.gridItem}>
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
      </Animated.View>
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
    height: "200",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.PRIMARY,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Restored to original 0.5 opacity
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    marginTop: -30,
    borderTopLeftRadius: 30,
    marginTop: -30, // Pull the card up over the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
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
    fontFamily: 'OpenSans_400Regular',
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans_700Bold',
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
    height: 50, 
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "gray",
    fontFamily: 'OpenSans_400Regular',
  },
});
