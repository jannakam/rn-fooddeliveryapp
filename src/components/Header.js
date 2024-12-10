import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeTranslateX = useRef(new Animated.Value(50)).current;
  const prevCount = useRef(0);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const currentCount = getTotalItems();
    
    if (currentCount > prevCount.current) {
      // First item added - slide in from right
      if (prevCount.current === 0) {
        badgeScale.setValue(0);
        badgeTranslateX.setValue(50);

        Animated.parallel([
          Animated.timing(badgeScale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(badgeTranslateX, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.back(1.5)),
            useNativeDriver: true,
          }),
        ]).start();
      } 
      // Subsequent items - just bounce
      else {
        Animated.sequence([
          Animated.timing(badgeScale, {
            toValue: 1.3,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(badgeScale, {
            toValue: 1,
            friction: 3,
            tension: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
    prevCount.current = currentCount;
  }, [cartItems]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity
            style={styles.roundBorder}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo2.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("Cart")}
          >
            <Feather name="shopping-cart" size={24} color={COLORS.WHITE} />
            {getTotalItems() > 0 && (
              <Animated.View 
                style={[
                  styles.badge,
                  {
                    transform: [
                      { scale: badgeScale },
                      { translateX: badgeTranslateX }
                    ]
                  }
                ]}
              >
                <Text style={styles.badgeText}>{getTotalItems()}</Text>
              </Animated.View>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: COLORS.ACCENT,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontFamily: "OpenSans_700Bold",
  },
});
