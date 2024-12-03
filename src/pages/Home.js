import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Restaurants from "../components/Restaurants";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <View style={styles.container}>
        <View style={styles.categories}>
        <Categories />
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
    },
    categories: {
        padding: 10,
        backgroundColor: "lightgrey",
    },
    restaurants: {
        padding: 10,
    },
});
