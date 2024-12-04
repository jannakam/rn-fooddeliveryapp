import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Restaurants from "../components/Restaurants";
import Categories from "../components/Categories";
import WavySeparator from "../components/WavySeparator.js";


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
    },
    categories: {
        backgroundColor: '#442e54',
    },
    separator: {
        top: -30,
    },
    restaurants: {
        padding: 10,
        top: -50,
    },
});
