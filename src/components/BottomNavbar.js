// BottomNavbar.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";

const BottomNavbar = () => {
  return (
    <SafeAreaView>
    <View style={styles.navbar}>
      {/* Home Tab */}
      <TouchableOpacity style={styles.navItem}>
        <Feather name="home" size={24} color="white" />
      </TouchableOpacity>

      {/* Explore Tab (Center Tab) */}
      <TouchableOpacity style={styles.exploreButton}>
        <View style={styles.exploreIconContainer}>
          <Feather name="search" size={32} color="white" />
        </View>
      </TouchableOpacity>

      {/* Orders Tab */}
      <TouchableOpacity style={styles.navItem}>
        <Feather name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ae445a",
    borderTopWidth: 1,
    borderColor: "#ddd",
    zIndex:30,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#442e54",
  },
  exploreButton: {
    alignItems: "center",
    marginTop: -40,
  },
  exploreIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#442e54",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  exploreText: {
    fontSize: 12,
    marginTop: 8,
    color: "white",
  },
});

export default BottomNavbar;
