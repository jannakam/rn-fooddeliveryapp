import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import restaurantCategories from "../data/categories";
import CategoryCard from "./CategoryCard";
import COLORS from "../constants/colors";

const Categories = ({ onSelectCategory, selectedCategory }) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {restaurantCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => onSelectCategory(selectedCategory === category.categoryName ? null : category.categoryName)}
            >
              <CategoryCard 
                category={category} 
                isSelected={selectedCategory === category.categoryName}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginTop: 40,
    gap: 10,
  },
});
