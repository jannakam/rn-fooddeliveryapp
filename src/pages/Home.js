import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Restaurants from "../components/Restaurants";
import Categories from "../components/Categories";
import WavySeparator from "../components/WavySeparator.js";
import COLORS from "../constants/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        <Categories />
      </View>

      <View style={styles.separator}>
        <WavySeparator />
      </View>

      <View style={styles.restaurants}>
        <Restaurants />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "space-between",
    alignItems: "center",
  },
  categories: {
    backgroundColor: COLORS.PRIMARY,
  },
  separator: {
    top: -30,
  },
  restaurants: {
    paddingHorizontal: 10,
    marginTop: -50,
    width: "100%",
    flex:1
  },
});
