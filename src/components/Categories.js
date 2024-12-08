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
// import restaurantCategories from "../data/categories";
import CategoryCard from "./CategoryCard";
import COLORS from "../constants/colors";
import { getAllCategories } from "../api/items";
import { useQuery } from "@tanstack/react-query";

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading categories...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Error loading categories. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {data?.map((category, index) => (
            <TouchableOpacity 
              key={category._id} 
              onPress={() => onSelectCategory(selectedCategory === category.name ? null : category.name)}
            >
              <CategoryCard 
                category={{
                  categoryName: category.name,
                  image: category.image
                }}
                isSelected={selectedCategory === category.name}
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
  message: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.WHITE,
  },
});
