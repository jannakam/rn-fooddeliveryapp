import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Back Button */}
      
      <View style={styles.backButton}>
      <TouchableOpacity style={styles.roundBorder}>
        <Feather name="arrow-left" size={24} color="#442e54" />
      </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>

      {/* Profile and Cart Icons */}
      <View style={styles.rightIcons}>
        {/* <TouchableOpacity style={styles.iconContainer}>
          <Feather name="user" size={24} color="white" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.iconContainer}>
          <Feather name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 70, 
    padding: 20,

    flexDirection: "row",
    alignItems: "evenly",
    justifyContent: "space-between",
    backgroundColor: "#442e54",
    width: "100%",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
    
  },
  logo: {
    width: 300, 
    height: 120, 
    resizeMode: "contain", 
  },
  rightIcons: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  roundBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  }
});
