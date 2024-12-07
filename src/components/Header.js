import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, Platform, StatusBar, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Back Button */}
        <View style={styles.backButton}>
          <TouchableOpacity 
            style={styles.roundBorder}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        </View>

        {/* Cart Icon with Badge */}
        <View style={styles.rightIcons}>
          <TouchableOpacity 
            style={styles.iconContainer}
            onPress={() => navigation.navigate('Cart')}
          >
            <Feather name="shopping-cart" size={24} color={COLORS.WHITE} />
            {getTotalItems() > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{getTotalItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.PRIMARY,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  header: {
    height: 70, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.PRIMARY,
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
    backgroundColor: COLORS.ACCENT,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: COLORS.ACCENT,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
