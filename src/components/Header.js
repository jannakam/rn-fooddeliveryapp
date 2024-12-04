import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, Platform, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Back Button */}
        <View style={styles.backButton}>
          <TouchableOpacity 
            style={styles.roundBorder}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#442e54" />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        </View>

        {/* Cart Icon */}
        <View style={styles.rightIcons}>
          <TouchableOpacity 
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Cart')}
          >
            <Feather name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#442e54",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  header: {
    height: 70, 
    flexDirection: "row",
    alignItems: "center",
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
    flex: 4,
  },
  logo: {
    width: "30%", 
    height: "100%",
    resizeMode: "contain", 
  },
  rightIcons: {
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
  },
  iconContainer: {
    padding: 8,
  }
});
