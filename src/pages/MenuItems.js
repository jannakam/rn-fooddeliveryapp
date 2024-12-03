import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import MenuItemCard from "../components/MenuItemCard";
import { StatusBar } from "expo-status-bar";
import renderStars from "../components/renderStars";

const MenuItems = ({ restaurant }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <View style={styles.overlay}>
          <Image source={{ uri: restaurant.image }} style={styles.image} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text>{restaurant.deliveryTime}</Text>
          <Text>{renderStars(restaurant.rating)}</Text>
        </View>

        <View style={styles.itemsContainer}>
          <Text style={styles.menuItems}>Menu Items</Text>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.items}>
              {restaurant.menuItems.map((menuItem, index) => (
                <View key={index}>
                  <MenuItemCard menuItem={menuItem} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex:1
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 160,
  },
  header: {
    marginVertical: 15,
    alignItems: "center",
    gap: 10,
  },
  itemsContainer: {
    padding: 10,
  },
  menuItems: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  items: {
    gap: 10,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  
});
