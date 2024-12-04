import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import restaurants from "../data/restaurants";
import MenuItemCard from "../components/MenuItemCard";

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Extract unique categories from the restaurants data
  const uniqueCategories = [
    ...new Set(restaurants.map((restaurant) => restaurant.category)),
  ];

  // Perform search
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter restaurants and menu items by category or menu item name
    const results = [];
    restaurants.forEach((restaurant) => {
      if (restaurant.category === query) {
        // Add all menu items from matching category
        restaurant.menuItems.forEach((item) => {
          results.push({ ...item, restaurant });
        });
      } else if (
        restaurant.menuItems.some((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      ) {
        // Add matching menu items with restaurant info
        restaurant.menuItems.forEach((item) => {
          if (item.name.toLowerCase().includes(query.toLowerCase())) {
            results.push({ ...item, restaurant });
          }
        });
      }
    });

    setFilteredResults(results);
  };

  // Render keyword labels
  const renderKeywordLabels = () => {
    return uniqueCategories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={styles.keywordLabel}
        onPress={() => handleSearch(category)}
      >
        <Text style={styles.keywordText}>{category}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="grey" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants or food..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Keyword Labels */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.keywordsContainer}
      >
        {renderKeywordLabels()}
      </ScrollView>

      {/* Search Results */}
      <FlatList
        data={filteredResults}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <MenuItemCard
              menuItem={{
                ...item,
                namewithRestaurant: `${item.name} (${item.restaurant.name})`,
              }}
            />
          </View>
        )}
        contentContainerStyle={[
          styles.resultsContainer,
          filteredResults.length === 0 && styles.emptyContainer
        ]}
        ListEmptyComponent={
          searchQuery ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.noResults}>No results found.</Text>
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.noResults}>
                Search for restaurants or food items!
              </Text>
            </View>
          )
        }
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default DiscoverPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  keywordsContainer: {
    marginBottom: 20,
    height: 40,
  },
  keywordLabel: {
    backgroundColor: "#4b4376",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  keywordText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize", // Ensures category names are capitalized
  },
  resultsContainer: {
    paddingHorizontal: 5,
    flexGrow: 1,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  gridItem: {
    flex: 0.5, // Ensure proper spacing for all columns
    margin: 5, // Add spacing between items
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    textAlign: "center",
    color: "grey",
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between", // Ensure items are evenly distributed
  },
});
